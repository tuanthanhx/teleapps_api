module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(
      'ALTER TABLE `user_games` DROP COLUMN `playCount`;',
    );
  },
};
