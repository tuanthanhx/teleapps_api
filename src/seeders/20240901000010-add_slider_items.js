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
        limit: 10,
        offset: 0,
        order: [['createdAt', 'asc']],
      });
      const array2 = await db.app.findAll({
        limit: 10,
        offset: 10,
        order: [['createdAt', 'asc']],
      });
      const array3 = await db.app.findAll({
        limit: 10,
        offset: 20,
        order: [['createdAt', 'asc']],
      });
      const array4 = await db.app.findAll({
        limit: 10,
        offset: 30,
        order: [['createdAt', 'asc']],
      });
      const baseTime = new Date();
      for (const item of array1) {
        const object = {
          sliderId: 1,
          appId: item.id,
          order: array1.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('slider_items', [object], {});
      }
      for (const item of array2) {
        const object = {
          sliderId: 2,
          appId: item.id,
          order: array2.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('slider_items', [object], {});
      }
      for (const item of array3) {
        const object = {
          sliderId: 3,
          appId: item.id,
          order: array3.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('slider_items', [object], {});
      }
      for (const item of array4) {
        const object = {
          sliderId: 4,
          appId: item.id,
          order: array4.indexOf(item) + 1,
          title: item.title,
          subTitle: lorem.generateSentences(1),
          label: 'Update',
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('slider_items', [object], {});
      }
    } catch (error) {
      console.error(error);
    }
  },
};
