const { LoremIpsum } = require('lorem-ipsum');
const db = require('../models');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 1,
    min: 1,
  },
  wordsPerSentence: {
    max: 8,
    min: 5,
  },
});

module.exports = {
  async up (queryInterface) {
    try {
      const array1 = await db.app.findAll({
        where: {
          appCategoryId: 100,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array2 = await db.app.findAll({
        where: {
          appCategoryId: 101,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array3 = await db.app.findAll({
        where: {
          appCategoryId: 102,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array4 = await db.app.findAll({
        where: {
          appCategoryId: 103,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array5 = await db.app.findAll({
        where: {
          appCategoryId: 104,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array6 = await db.app.findAll({
        where: {
          appCategoryId: 105,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array7 = await db.app.findAll({
        where: {
          appCategoryId: 106,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array8 = await db.app.findAll({
        where: {
          appCategoryId: 107,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array9 = await db.app.findAll({
        where: {
          appCategoryId: 108,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array10 = await db.app.findAll({
        where: {
          appCategoryId: 109,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const baseTime = new Date();
      for (const item of array1) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array1.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
      for (const item of array2) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array2.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
      for (const item of array3) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array3.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
      for (const item of array4) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array4.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
      for (const item of array5) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array5.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
      for (const item of array6) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array6.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
      for (const item of array7) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array7.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
      for (const item of array8) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array8.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
      for (const item of array9) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array9.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
      for (const item of array10) {
        const object = {
          appCategoryId: item.appCategoryId,
          appId: item.id,
          order: array10.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_category_slider_items', [object], {});
      }
    } catch (error) {
      console.error(error);
    }
  },
};
