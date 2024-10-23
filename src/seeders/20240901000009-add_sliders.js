module.exports = {
  async up (queryInterface) {
    try {
      const array = [
        {
          name: 'Home - Featured Apps',
        },
        {
          name: 'Home - Recommended Apps',
        },
        {
          name: 'Home - Slider 1',
        },
        {
          name: 'Home - Slider 2',
        },
      ];
      const baseTime = new Date();
      for (const item of array) {
        const object = {
          name: item.name,
          status: 1,
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('sliders', [object], {});
        baseTime.setSeconds(baseTime.getSeconds() + 1);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
