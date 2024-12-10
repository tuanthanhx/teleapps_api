const crypto = require('crypto');
const axios = require('axios');
const s3 = require('./s3');
// const path = require('path');
// const logger = require('./logger');

require('dotenv').config();

exports.validateTelegramInitData = (initData) => {
  // Get the bot tokens as an array from the environment variable
  const BOT_TOKENS = (process.env.BOT_TOKENS || '').split(',');

  // Parse the URL-encoded initData string
  const parsedData = new URLSearchParams(initData);
  const receivedHash = parsedData.get('hash');
  parsedData.delete('hash'); // Remove the hash from the parameters

  // Create data-check-string by sorting the remaining fields alphabetically
  const dataCheckString = [...parsedData.entries()]
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join('\n');

  // Function to validate using a single token
  const validateWithToken = (token) => {
    // Generate secret key using the bot token and WebAppData
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(token.trim()) // Trim spaces for safety
      .digest();

    // Compute the HMAC-SHA256 hash of the data-check-string using the secret key
    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    // Compare the computed hash with the received hash
    return computedHash === receivedHash;
  };

  // Try validating with each token until one succeeds
  const isValid = BOT_TOKENS.some((token) => validateWithToken(token));

  if (!isValid) {
    return null; // Validation failed with all tokens
  }

  // Optionally validate the auth_date field
  const authDate = parseInt(parsedData.get('auth_date'), 10);
  const currentTime = Math.floor(Date.now() / 1000);
  const maxAllowedAge = 86400; // 1 day in seconds
  if (currentTime - authDate > maxAllowedAge && process.env.NODE_ENV !== 'development') {
    console.log('Auth date is too old');
    return null; // Validation failed
  }

  // Convert parsedData to a JavaScript object and return it
  const validatedData = Object.fromEntries(parsedData.entries());

  // Parse the user field to convert it into a real JavaScript object
  if (validatedData.user) {
    validatedData.user = JSON.parse(validatedData.user);
  }

  // Return validated data as an object
  return validatedData;
};

exports.getTelegramUserAvatar = async (telegramId) => {
  try {
    if (!telegramId) {
      return null;
    }

    // Step 1: Fetch user's profile photos
    const profilePhotosUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN_PRIMARY}/getUserProfilePhotos?user_id=${telegramId}`;
    const profilePhotosResponse = await axios.get(profilePhotosUrl);

    if (!profilePhotosResponse.data.ok || profilePhotosResponse.data.result.total_count === 0) {
      console.error('No profile pictures found for this user.');
      return null;
    }

    // Extract the first photo's file ID
    const fileId = profilePhotosResponse.data.result.photos[0][0].file_id;

    // Step 2: Retrieve the file path for the photo
    const filePathUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN_PRIMARY}/getFile?file_id=${fileId}`;
    const filePathResponse = await axios.get(filePathUrl);

    if (!filePathResponse.data.ok) {
      console.error('Failed to retrieve the file path for the profile picture.');
      return null;
    }

    const filePath = filePathResponse.data.result.file_path;

    // Step 3: Download the profile photo
    const downloadUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN_PRIMARY}/${filePath}`;
    const imageResponse = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

    // Prepare the file object
    const fileBuffer = Buffer.from(imageResponse.data);
    const file = [{
      fieldname: 'file',
      originalname: `user_${telegramId}_avatar.jpg`,
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: fileBuffer,
      size: fileBuffer.length,
    }];

    // Step 4: Upload to S3
    const uploadedFiles = await s3.upload(file, 'shared/user/avatars', {
      dimensions: [160, 160],
    });

    if (uploadedFiles && uploadedFiles.length) {
      return uploadedFiles[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching Telegram user avatar (Telegram ID: ${telegramId}):`, error.message);
    return null;
  }
};

exports.calculateInvitationReward = (count) => {
  let inviteCount = parseInt(count, 10);
  if (Number.isNaN(inviteCount) || inviteCount < 1) {
    inviteCount = 1;
  }

  const baseTon = 0.001;
  const baseCoin = 500;
  const scaleTon = 0.0002;
  const scaleCoin = 100;

  const rangeMultiplier = inviteCount <= 100 ? Math.min(Math.floor((inviteCount - 1) / 10), 9) : 10;

  const tonReward = (baseTon + scaleTon * rangeMultiplier).toFixed(4);
  const coinReward = Math.round(baseCoin + scaleCoin * rangeMultiplier);

  return { tonReward, coinReward };
};
