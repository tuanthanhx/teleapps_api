const logger = require('../utils/logger');
const db = require('../models');

require('dotenv').config();

exports.getReviewStatistics = async (appId, includeCount = true) => {
  try {
    const attributes = [
      [db.sequelize.fn('COUNT', '*'), 'totalReviews'],
      [db.sequelize.fn('AVG', db.sequelize.col('rate')), 'averageRating'],
    ];

    if (includeCount) {
      attributes.push(
        [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN rate = 1 THEN 1 ELSE 0 END')), 'star_1'],
        [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN rate = 2 THEN 1 ELSE 0 END')), 'star_2'],
        [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN rate = 3 THEN 1 ELSE 0 END')), 'star_3'],
        [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN rate = 4 THEN 1 ELSE 0 END')), 'star_4'],
        [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN rate = 5 THEN 1 ELSE 0 END')), 'star_5'],
      );
    }

    const reviewsCounts = await db.app_review.findAll({
      attributes,
      where: {
        appId,
      },
      raw: true,
    });

    const totalReviews = parseInt(reviewsCounts[0].totalReviews, 10) || 0;
    const averageRating = parseFloat(reviewsCounts[0].averageRating) || 0;

    const reviewsCount = includeCount ? [
      parseInt(reviewsCounts[0].star_1, 10) || 0,
      parseInt(reviewsCounts[0].star_2, 10) || 0,
      parseInt(reviewsCounts[0].star_3, 10) || 0,
      parseInt(reviewsCounts[0].star_4, 10) || 0,
      parseInt(reviewsCounts[0].star_5, 10) || 0,
    ] : [];

    return {
      totalReviews,
      averageRating: parseFloat(averageRating.toFixed(1)),
      reviewsCount,
    };
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
