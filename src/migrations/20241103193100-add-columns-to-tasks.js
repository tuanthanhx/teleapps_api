module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'image', {
      type: Sequelize.STRING,
      after: 'description',
    });
  },
};
