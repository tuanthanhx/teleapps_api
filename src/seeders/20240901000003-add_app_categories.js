module.exports = {
  async up (queryInterface) {
    try {
      const array = [
        {
          name: 'Exchange CEX',
          slug: 'exchange-cex',
          subTitle: 'Buy and sell Toncoin on DEXes and CEXes',
          description: 'Buy and sell Toncoin on DEXes and CEXes. Explore the top centralized exchanges on TON Blockchain. Discover a secure and efficient way to trade cryptocurrencies on these platforms, with detailed statistics, user reviews, and essential information to guide your trading journey.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/convert_card.svg',
        },
        {
          name: 'Staking',
          slug: 'staking',
          subTitle: 'Maximize your Toncoin with staking apps',
          description: 'Maximize your Toncoin with staking apps. Find reliable platforms to earn rewards by participating in the network\'s consensus mechanism.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/coin.svg',
        },
        {
          name: 'Wallets',
          slug: 'wallets',
          subTitle: 'Store and manage your crypto assets',
          description: 'Store and manage your crypto assets. Securely manage your Toncoin with the best wallets for TON available. Discover feature-rich wallet applications that provide seamless transactions, advanced security features, and user-friendly interfaces for a hassle-free crypto experience.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/empty_wallet.svg',
        },
        {
          name: 'Explores',
          slug: 'explores',
          subTitle: 'Browse transactions on The Open Network',
          description: 'Browse transactions on The Open Network. Dive deep into TON Blockchain with exploration tools. Uncover real-time data, transaction histories, and network insights using explorers that empower you to monitor the blockchain\'s activity and stay informed.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/receipt_search.svg',
        },
        {
          name: 'Bridges',
          slug: 'bridges',
          subTitle: 'Transfer crypto assets between chains',
          description: 'Transfer crypto assets between chains. Connect TON to other blockchains effortlessly with bridge apps. Explore interoperability solutions that allow you to move assets between different blockchains, expanding your options and enabling smoother interactions across ecosystems.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/link.svg',
        },
        {
          name: 'Utilities',
          slug: 'utilities',
          subTitle: 'Useful tools powered by TON',
          description: 'Useful tools powered by TON. Enhance your TON Blockchain experience with utility apps. Discover a range of tools designed to streamline tasks, analyze data, and manage your assets more efficiently, ensuring you get the most out of the decentralized TON Ecosystem.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/setting.svg',
        },
        {
          name: 'NFT Collections',
          slug: 'nft-collections',
          subTitle: 'Explore TON Blockchain\'s NFT Collections',
          description: 'Explore TON Blockchain\'s NFT Collections. Dive into digital art, collectibles, and unique creations by top artists and creators.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/gallery.svg',
        },
        {
          name: 'Chats',
          slug: 'chats',
          subTitle: 'Connect and communicate within the TON community in Telegram group chats',
          description: 'Connect and communicate within the TON community in Telegram group chats. Discover a variety of groups about TON where you can learn more about the blockchain, meet new friends, and ask questions about TON.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/messages.svg',
        },
        {
          name: 'Social Networking',
          slug: 'social-networking',
          subTitle: 'Experience social networks powered by TON Blockchain',
          description: 'Experience social networks powered by TON Blockchain. Discover platforms that empower users to share content, connect with like-minded individuals, and build communities.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/share.svg',
        },
        {
          name: 'Gambling',
          slug: 'gambling',
          subTitle: 'Discover gambling apps on TON',
          description: 'Discover gambling apps on TON. Explore platforms that offer a variety of games of chance, ensuring an enjoyable gaming environment.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/menu.svg',
        },
        {
          name: 'Gaming',
          slug: 'gaming',
          subTitle: 'Immerse yourself in blockchain-based games on TON',
          description: 'Immerse yourself in blockchain-based games on TON. Discover entertaining and interactive gaming experiences that leverage the blockchain\'s capabilities to offer unique gameplay, rewards, and ownership of in-game assets.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/game.svg',
        },
        {
          name: 'NFT Services',
          slug: 'nft-services',
          subTitle: 'Discover TON Blockchain\'s NFT Marketplaces & Tools',
          description: 'Discover TON Blockchain\'s NFT Marketplaces & Tools. Buy, sell, trade unique digital assets, and manage your NFT portfolio.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/gallery.svg',
        },
        {
          name: 'VPN',
          slug: 'vpn',
          subTitle: 'Boost online security and privacy with VPNs based on TON Blockchain',
          description: 'Boost online security and privacy with VPNs based on TON Blockchain. Access blocked content and protect your data with our curated VPN selection',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/shield_tick.svg',
        },
        {
          name: 'Dev tools',
          slug: 'dev-tools',
          subTitle: 'Empower your development with essential Dev Tools on TON Blockchain',
          description: 'Empower your development with essential Dev Tools on TON Blockchain. Streamline coding, testing, and deployment for your blockchain projects.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/code.svg',
        },
        {
          name: 'Shopping',
          slug: 'shopping',
          subTitle: 'Shop with ease using Toncoin',
          description: 'Shop with ease using Toncoin. Explore a variety of real-world items and online service subscriptions, combining the convenience of digital currency with your everyday needs.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/shopping_cart.svg',
        },
        {
          name: 'Launchpads',
          slug: 'launchpads',
          subTitle: 'Discover Launchpads on TON – the gateway to exciting new projects',
          description: 'Discover Launchpads on TON – the gateway to exciting new projects. Explore opportunities to participate in token launches, investments, and early-stage blockchain ventures.',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/rocket_launch.svg',
        },
        {
          name: 'RWA',
          slug: 'rwa',
          subTitle: 'Discover Real World Assets on TON Blockchain',
          description: 'Discover Real World Assets on TON Blockchain',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/assets/images/app_categories/moneys.svg',
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
          order: array.indexOf(item) + 1,
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
