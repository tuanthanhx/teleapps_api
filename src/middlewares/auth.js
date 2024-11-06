const jwt = require('jsonwebtoken');
const db = require('../models');

require('dotenv').config();

const apiVersion = process.env.VERSION || 'v1';

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;

exports.verifyToken = async (req, res, next) => {
  const publicPaths = [
    '/favicon.ico',
    '/public',
    '/api-common',
    '/api-public',
  ];
  const adminPaths = [
    '/api-admin',
  ];
  const developerPaths = [
    '/api-developer',
  ];
  const userPaths = [
    '/api-user',
  ];

  req.isPublicPaths = publicPaths.some((path) => req.path.startsWith(path));
  req.isAdminPaths = adminPaths.some((path) => req.path.startsWith(path));
  req.isDeveloperPaths = developerPaths.some((path) => req.path.startsWith(path));
  req.isUserPaths = userPaths.some((path) => req.path.startsWith(path));

  if (
    req.path === '/' || (
      req.isPublicPaths
      && req.path !== `/api-common/${apiVersion}/auth/is_login`
      && req.path !== `/api-common/${apiVersion}/auth/generate_session`
      && req.path !== `/api-common/${apiVersion}/auth/me`
    )
  ) {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  try {
    const decryptedToken = jwt.verify(token, accessTokenSecret);

    const user = await db.user.findOne({
      where: {
        id: decryptedToken.id,
      },
      attributes: ['id', 'userGroupId'],
      raw: true,
    });

    req.user = user;

    if (req.isAdminPaths && user?.userGroupId !== 6) {
      return res.status(403).json({ error: 'You are not authorized to access this API' });
    }

    if (req.isDeveloperPaths && user?.userGroupId !== 2) {
      return res.status(403).json({ error: 'You are not authorized to access this API' });
    }

    if (req.isUserPaths && user?.userGroupId !== 1 && user?.userGroupId !== 2) {
      return res.status(403).json({ error: 'You are not authorized to access this API' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
