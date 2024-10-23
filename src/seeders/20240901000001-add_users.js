const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const array = [
        {
          telegramId: '100000001',
          userGroupId: 6,
          password: '123456',
          firstName: 'User 601',
          lastName: 'Test',
          email: 'test_user_601@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
        {
          telegramId: '100000002',
          userGroupId: 6,
          password: '123456',
          firstName: 'User 602',
          lastName: 'Test',
          email: 'test_user_602@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
        {
          telegramId: '100000003',
          userGroupId: 1,
          password: '123456',
          firstName: 'User 101',
          lastName: 'Test',
          email: 'test_user_101@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
        {
          telegramId: '100000004',
          userGroupId: 1,
          password: '123456',
          firstName: 'User 102',
          lastName: 'Test',
          email: 'test_user_102@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
        {
          telegramId: '100000005',
          userGroupId: 2,
          password: '123456',
          firstName: 'User 201',
          lastName: 'Test',
          email: 'test_user_201@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
        {
          telegramId: '100000006',
          userGroupId: 2,
          password: '123456',
          firstName: 'User 202',
          lastName: 'Test',
          email: 'test_user_202@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
        {
          telegramId: '100000007',
          userGroupId: 2,
          password: '123456',
          firstName: 'User 203',
          lastName: 'Test',
          email: 'test_user_203@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
        {
          telegramId: '100000008',
          userGroupId: 2,
          password: '123456',
          firstName: 'User 204',
          lastName: 'Test',
          email: 'test_user_204@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
        {
          telegramId: '100000009',
          userGroupId: 2,
          password: '123456',
          firstName: 'User 205',
          lastName: 'Test',
          email: 'test_user_205@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
        {
          telegramId: '100000010',
          userGroupId: 2,
          password: '123456',
          firstName: 'User 206',
          lastName: 'Test',
          email: 'test_user_206@teleapps.store',
          phone: '0123456789',
          avatar: null,
          gender: 1,
          dob: '1990-01-01',
          status: 1,
          lastLogin: new Date(),
          referrerId: null,
        },
      ];
      const baseTime = new Date();
      for (const item of array) {
        const object = {
          ...item,
          password: await bcrypt.hash(item.password, bcrypt.genSaltSync(8)),
          id: Sequelize.literal('UUID()'),
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('users', [object], {});
        baseTime.setSeconds(baseTime.getSeconds() + 1);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
