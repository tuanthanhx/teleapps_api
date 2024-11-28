const Redis = require('ioredis');
const logger = require('./logger');

require('dotenv').config();

const redisDbIndex = process.env.NODE_ENV === 'production' ? 1 : 0; // Use DB 1 for production, DB 0 for others

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || null,
  db: redisDbIndex,
  // reconnectOnError: (err) => {
  //   logger.error('Redis connection error:', err);
  //   return true;
  // },
};

// Initialize Redis client
const redisClient = new Redis(redisConfig);

/*
// Event listeners for monitoring Redis connection
redisClient.on('connect', () => {
  logger.info(`Connected to Redis (DB ${redisDbIndex}) successfully`);
});

redisClient.on('error', (err) => {
  logger.error('Redis connection error:', err.message || err);
});

redisClient.on('reconnecting', () => {
  logger.info('Reconnecting to Redis...');
});

redisClient.on('end', () => {
  logger.info('Redis connection closed');
});
*/

// Helper to set a key with an optional expiration
const setCache = async (key, value, expiration = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(value), 'EX', expiration);
    if (process.env.NODE_ENV === 'development') console.log('>> Cache Set');
  } catch (error) {
    logger.error('Error setting cache:', error.message || error);
  }
};

// Helper to get a key
const getCache = async (key) => {
  try {
    const value = await redisClient.get(key);
    if (value && process.env.NODE_ENV === 'development') console.log('>> Cache Hit');
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.error('Error getting cache:', error.message || error);
    return null;
  }
};

// Helper to delete a key
const delCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    logger.error('Error deleting cache:', error.message || error);
  }
};

module.exports = {
  redisClient,
  setCache,
  getCache,
  delCache,
};
