require('dotenv').config();

module.exports = {
  async up (queryInterface) {
    try {
      const array = [
        {
          name: 'Hot Today',
          description: null,
        },
        {
          name: '$Duck Airdrop Checklist',
          description: null,
        },
        {
          name: 'Daily Task',
          description: null,
        },
        {
          name: 'Collab',
          description: null,
        },
      ];
      const baseTime = new Date();
      for (const item of array) {
        const object = {
          name: item.name,
          description: item.description,
          order: array.indexOf(item) + 1,
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('task_categories', [object], {});
        baseTime.setSeconds(baseTime.getSeconds() + 1);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
