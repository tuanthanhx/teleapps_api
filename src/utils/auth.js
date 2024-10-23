const crypto = require('crypto');
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
  if (currentTime - authDate > maxAllowedAge) {
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
