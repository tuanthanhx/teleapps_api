const db = require('../models');

module.exports = {
  async up () {
    try {
      const apps = await db.app.findAll({
        order: [['createdAt', 'ASC']],
      });

      for (const [index, app] of apps.entries()) {
        let categoryId;

        if (index < 10) {
          categoryId = 100;
        } else if (index < 20) {
          categoryId = 101;
        } else if (index < 30) {
          categoryId = 102;
        } else if (index < 40) {
          categoryId = 103;
        } else if (index < 50) {
          categoryId = 104;
        } else if (index < 60) {
          categoryId = 105;
        } else if (index < 70) {
          categoryId = 106;
        } else if (index < 80) {
          categoryId = 107;
        } else if (index < 90) {
          categoryId = 108;
        } else if (index < 100) {
          categoryId = 109;
        } else {
          categoryId = 110;
        }

        const position = (index % 10) + 1;
        await app.update({
          appCategoryId: categoryId,
          position,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
