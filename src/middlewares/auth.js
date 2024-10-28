const jwt = require('jsonwebtoken');

require('dotenv').config();

const apiVersion = process.env.VERSION || 'v1';

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;

exports.verifyToken = (req, res, next) => {
  const publicPaths = [
    '/favicon.ico',
    '/public',
    '/api-common',
    '/api-public',
  ];
  const adminPaths = [
    '/api-admin',
  ];
  const userPaths = [
    '/api-user',
  ];
  const isPublicPaths = publicPaths.some((path) => req.path.startsWith(path));
  const isAdminPaths = adminPaths.some((path) => req.path.startsWith(path));
  const isUserPaths = userPaths.some((path) => req.path.startsWith(path));

  if (
    req.path === '/' || (
      isPublicPaths
      && req.path !== `/api-common/${apiVersion}/auth/is_login`
      && req.path !== `/api-common/${apiVersion}/auth/generate_session`
      && req.path !== `/api-common/${apiVersion}/auth/me`
      // && req.path !== `/api-common/${apiVersion}/auth/statistics`
      // && req.path !== `/api-common/${apiVersion}/auth/login_history`
    )
  ) {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, accessTokenSecret);
    req.user = user;

    if (isAdminPaths && user.userGroupId !== 6) {
      return res.status(403).json({ error: 'You are not authorized to access this API' });
    }

    if (isUserPaths && user.userGroupId !== 1 && user.userGroupId !== 2) {
      return res.status(403).json({ error: 'You are not authorized to access this API' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
