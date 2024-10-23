const db = require('../models');

module.exports = {
  async up () {
    try {
      const coverImages = [];
      for (let i = 1; i <= 42; i++) {
        const coverNumber = String(i).padStart(2, '0');
        coverImages.push(`https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_covers/cover_${coverNumber}.jpg`);
      }

      const apps = await db.app.findAll({
        attributes: ['id', 'cover'],
        order: [['createdAt', 'ASC']],
      });

      const updates = apps.map((appInstance, index) => {
        const coverImage = coverImages[index % coverImages.length];
        return db.app.update({ cover: coverImage }, { where: { id: appInstance.id } });
      });

      await Promise.all(updates);
    } catch (error) {
      console.error(error);
    }
  },
};
