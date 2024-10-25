module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'telegramPremium', {
      type: Sequelize.BOOLEAN,
      after: 'telegramId',
    });
  },
};
