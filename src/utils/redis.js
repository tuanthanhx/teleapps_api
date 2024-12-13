const Redis = require('ioredis');
// const logger = require('./logger');

require('dotenv').config();

let redisClient;
const redisDbIndex = process.env.NODE_ENV === 'production' ? 1 : 0; // Use DB 1 for production, DB 0 for others

async function initializeRedis () {
  try {
    if (!(process.env.REDIS_ENABLED === 'true')) {
      redisClient = null;
      return;
    }

    redisClient = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null,
      db: redisDbIndex,
      retryStrategy (times) {
        console.error(`Redis reconnect attempt #${times}`);
        return null;
      },
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });

    redisClient.on('close', () => {
      console.warn('Redis connection closed.');
      redisClient = null;
    });

    // Test connection
    // await redisClient.ping();
    // console.log('Redis connection successful');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    redisClient = null;
  }
}

initializeRedis();

async function setCache (key, value, ttl = 3600) {
  if (!redisClient) {
    console.warn('Redis client not initialized. Skipping cache set.');
    return;
  }
  try {
    const stringValue = JSON.stringify(value);
    await redisClient.set(key, stringValue, 'EX', ttl); // Use EX for TTL
    console.info('Cache set.');
  } catch (err) {
    console.error('Error setting cache:', err);
  }
}

async function getCache (key) {
  if (!redisClient) {
    console.warn('Redis client not initialized. Skipping cache get.');
    return null;
  }
  try {
    const data = await redisClient.get(key);
    console.info('Cache get.');
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error getting cache:', err);
    return null;
  }
}

async function deleteCache (key) {
  if (!redisClient) {
    console.warn('Redis client not initialized. Skipping cache delete.');
    return;
  }
  try {
    await redisClient.del(key);
    console.info('Cache deleted.');
  } catch (err) {
    console.error('Error deleting cache:', err);
  }
}

async function clearCache () {
  if (!redisClient) {
    console.warn('Redis client not initialized. Skipping cache clear.');
    return;
  }
  try {
    await redisClient.flushall();
  } catch (err) {
    console.error('Error clearing cache:', err);
  }
}

module.exports = {
  setCache,
  getCache,
  deleteCache,
  clearCache,
};
