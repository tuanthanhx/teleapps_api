module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const array = [
        {
          name: 'Share $DUCK game',
          description: null,
          points: 100,
          type: 'link',
          data: { url: '#' },
          isDaily: false,
          status: 1,
        },
        {
          name: 'Follow TeleApps on X',
          description: null,
          points: 100,
          type: 'link',
          data: { url: '#' },
          isDaily: false,
          status: 1,
        },
        {
          name: 'Join TeleApps Channel',
          description: null,
          points: 100,
          type: 'link',
          data: { url: '#' },
          isDaily: false,
          status: 1,
        },
        {
          name: 'Join TeleApps Community',
          description: null,
          points: 100,
          type: 'link',
          data: { url: '#' },
          isDaily: false,
          status: 1,
        },
      ];
      const baseTime = new Date();
      for (const item of array) {
        const object = {
          id: Sequelize.literal('UUID()'),
          name: item.name,
          description: item.description,
          points: item.points,
          type: item.type,
          data: JSON.stringify(item.data),
          isDaily: item.isDaily,
          status: item.status,
          order: array.indexOf(item) + 1,
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('tasks', [object], {});
        baseTime.setSeconds(baseTime.getSeconds() + 1);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
