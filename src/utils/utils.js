const path = require('path');
const logger = require('./logger');

require('dotenv').config();

exports.generateRandomNumber = (length) => {
  const maxNumber = 10 ** length - 1;
  const randomNumber = Math.floor(Math.random() * (maxNumber + 1));
  const paddedNumber = randomNumber.toString().padStart(length, '0');
  return paddedNumber;
};

exports.generateUniqueId = () => {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString().slice(2, 9);
  return timestamp + randomPart;
};

exports.getFilename = (filename) => filename.split('.')[0];

exports.getExtension = (filename) => filename.split('.').pop();

exports.isImage = (file) => {
  const { mimetype } = file;
  const extname = path.extname(file.originalname).toLowerCase();
  const isValidExtension = ['.jpeg', '.jpg', '.png', '.gif'].includes(extname);
  const validImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const isValidMimeType = validImageMimeTypes.includes(mimetype);
  return isValidExtension && isValidMimeType;
};

exports.isValidJson = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

exports.tryParseJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return jsonString;
  }
};

exports.delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

exports.toHex = (str) => Buffer.from(str, 'utf8').toString('hex');

exports.fromHex = (hex) => Buffer.from(hex, 'hex').toString('utf8');

exports.insertAfterProperty = (obj, key, newKey, newValue) => {
  const newObject = {};
  for (const [k, v] of Object.entries(obj)) {
    newObject[k] = v;
    if (k === key) {
      newObject[newKey] = newValue;
    }
  }
  return newObject;
};
