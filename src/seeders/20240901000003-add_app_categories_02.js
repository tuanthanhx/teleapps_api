module.exports = {
  async up (queryInterface) {
    try {
      const array = [
        {
          name: 'Audit',
          slug: 'audit',
          subTitle: 'Smart Contract Audit',
          description: 'Smart Contract Audit',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/audit.svg',
        },
        {
          name: 'Channels',
          slug: 'channels',
          subTitle: 'Stay updated and engaged with Telegram channels about TON',
          description: 'Stay updated and engaged with Telegram channels about TON. Find curated content, announcements, and discussions that keep you informed about the latest developments, events, and opportunities within the TON community.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/channels.svg',
        },
        {
          name: 'Dex',
          slug: 'dex',
          subTitle: 'Buy, sell and swap TON or wTON',
          description: 'Buy, sell and swap TON or wTON. Trade cryptocurrencies directly on TON Blockchain using decentralized exchange apps. Explore platforms that allow you to swap tokens, provide liquidity, and participate in the decentralized finance (DeFi) ecosystem.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/dex.svg',
        },
      ];
      const baseTime = new Date();
      for (const item of array) {
        const object = {
          icon: item.icon,
          name: item.name,
          slug: item.slug,
          subTitle: item.subTitle,
          description: item.description,
          order: array.indexOf(item) + 17 + 1,
          status: 1,
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_categories', [object], {});
        baseTime.setSeconds(baseTime.getSeconds() + 1);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
