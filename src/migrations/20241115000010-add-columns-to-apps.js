module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('apps', 'links', {
      type: Sequelize.JSON,
      after: 'platforms',
    });
    await queryInterface.sequelize.query(
      'ALTER TABLE `apps` DROP COLUMN `telegramChannels`;',
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE `apps` DROP COLUMN `snsChannels`;',
    );
  },
};
