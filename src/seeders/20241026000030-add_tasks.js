require('dotenv').config();

module.exports = {
  async up (queryInterface) {
    try {
      const array = [
        {
          name: 'Free ticket',
          description: null,
          image: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/task_images/1.png',
          taskCategoryId: 1,
          rewards: { ticket: 1 },
          type: 'claim_asset',
          repeatInterval: 10,
          repeatUnit: 'minute',
          status: 1,
        },
        {
          name: 'Play 3 game today',
          description: null,
          image: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/task_images/2.png',
          taskCategoryId: 2,
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
          image: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/task_images/3.png',
          taskCategoryId: 2,
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
          image: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/task_images/4.png',
          taskCategoryId: 2,
          rewards: { coin: 100 },
          type: 'visit_link',
          repeatInterval: 1,
          repeatUnit: 'day',
          data: { url: 'https://t.me/TeleAppsAnnouncement/33' },
          status: 1,
        },
        {
          name: 'Follow TeleApps on X',
          description: null,
          image: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/task_images/5.png',
          taskCategoryId: 3,
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
          image: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/task_images/6.png',
          taskCategoryId: 3,
          rewards: { coin: 100 },
          type: 'visit_link',
          repeatInterval: null,
          repeatUnit: null,
          data: { url: 'https://t.me/TeleAppsAnnouncement' },
          status: 1,
        },
        {
          name: 'Join TeleApps Community',
          description: null,
          image: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/task_images/7.png',
          taskCategoryId: 3,
          rewards: { coin: 100 },
          type: 'visit_link',
          repeatInterval: null,
          repeatUnit: null,
          data: { url: 'https://t.me/TeleAppsCommunity' },
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
