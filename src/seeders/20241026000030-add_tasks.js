require('dotenv').config();

module.exports = {
  async up (queryInterface) {
    try {
      const array = [
        {
          name: 'Play 3 game today',
          description: null,
          taskCategoryId: 1,
          rewards: { coin: 500 },
          type: 'play_game',
          repeatInterval: 1,
          repeatUnit: 'day',
          data: {
            count: 3,
          },
          status: 1,
        },
        {
          name: 'Invite a friend',
          description: null,
          taskCategoryId: 1,
          rewards: { coin: 500 },
          type: 'invite_friend',
          repeatInterval: 1,
          repeatUnit: 'day',
          data: {
            count: 1,
          },
          status: 1,
        },
        {
          name: 'Check news',
          description: null,
          taskCategoryId: 1,
          rewards: { coin: 100 },
          type: 'visit_link',
          repeatInterval: 1,
          repeatUnit: 'day',
          data: { url: 'https://t.me/TeleAppAnnouncement/33' },
          status: 1,
        },
        {
          name: 'Follow TeleApps on X',
          description: null,
          taskCategoryId: 2,
          rewards: { coin: 100 },
          type: 'visit_link',
          repeatInterval: null,
          repeatUnit: null,
          data: { url: 'https://twitter.com/TeleApps_Store' },
          status: 1,
        },
        {
          name: 'Join TeleApps Channel',
          description: null,
          taskCategoryId: 2,
          rewards: { coin: 100 },
          type: 'visit_link',
          repeatInterval: null,
          repeatUnit: null,
          data: { url: 'https://t.me/TeleAppAnnouncement' },
          status: 1,
        },
        {
          name: 'Join TeleApps Community',
          description: null,
          taskCategoryId: 2,
          rewards: { coin: 100 },
          type: 'visit_link',
          repeatInterval: null,
          repeatUnit: null,
          data: { url: 'https://t.me/TeleAppCommunity' },
          status: 1,
        },
      ];
      const baseTime = new Date();
      for (const item of array) {
        const object = {
          name: item.name,
          description: item.description,
          taskCategoryId: item.taskCategoryId,
          rewards: JSON.stringify(item.rewards),
          type: item.type,
          repeatInterval: item.repeatInterval,
          repeatUnit: item.repeatUnit,
          data: JSON.stringify(item.data),
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
