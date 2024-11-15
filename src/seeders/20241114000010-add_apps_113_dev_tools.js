const slugify = require('slugify');
const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const array = [
        {
          ID: 344,
          name: 'TON Verifier',
          pretty_url: 'ton-verifier',
          caption: 'TON Contract Verifier Beta — A tool to verify your contracts on the Ton blockchain',
          description: 'TON Contract Verifier — A tool to verify your contracts on the TON blockchain',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/be871c93-44ad-426f-8200-7863494ffa09.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/be871c93-44ad-426f-8200-7863494ffa09.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d07675bf-aab8-4333-905b-a8e6ce8558cc.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/5bed1ee8-661a-4ed1-b42e-730f5900af6c.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4cbeb566-2783-41cb-87f4-b19a118b56cf.jpg',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://verifier.ton.org',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: '',
            tgChat: '',
            twitter: '',
            youtube: '',
          },
        },
        {
          ID: 461,
          name: 'TON NoCode SDK',
          pretty_url: 'ton-nocode',
          caption: 'Build Apps on TON Blockchain without code',
          description: 'Unlock TON Network Potential\nIntegrating TON SDK into a plugin for Bubble.io platform where you can build Apps on TON Blockchain without a single line of code!\n\nPlugin features:\n- Connect a Wallet such as Tonkeeper, MyTonWallet, etc.\n- Disconnect\n- Provide a list of wallets that can be connected\n- Option to setup a custom provider\n- Get connected wallet address\n- Get wallet balance\n- Detect connected chain\n- Get a list of all transactions\n- Send tokens\n- Read a function from a Smart Contract',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3ce2f5d2-8e59-4d51-bf87-6dd691457051.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3ce2f5d2-8e59-4d51-bf87-6dd691457051.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/593c0c74-6b17-4f4c-9b00-d6d77a736f3d.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/0bec5dfb-6777-4663-a153-27311803609d.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/178ece17-bcaa-423f-a60a-ea8ecd91cafe.jpg',
          ],
          languageCodes: [],
          links: {
            webSite: 'https://novabloq.com/plugin/ton-connect-nocode-sdk-1679505489636x562684572799117440',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: '',
            tgChat: '',
            twitter: '',
            youtube: '',
          },
        },
        {
          ID: 526,
          name: 'Telegram ShopsRobot',
          pretty_url: 'shopsrobot',
          caption: 'ShopsRobot — best way to sell digital goods',
          description: "Create your own Bot Store and start selling you digital goods!\n\nWe're supporting TonCoin, USDT, BTC and other coins. It's very simple to use — all settings directly in Telegram. Welcome!",
          appPlatforms: {
            tg_bot: 'https://t.me/ShopsRobot',
            appId: 526,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/ab1016ab-8b80-4862-aa31-8f66c8eb6f74.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/ab1016ab-8b80-4862-aa31-8f66c8eb6f74.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/1978d3de-4e16-4d69-a856-39653b8d0270.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/737f1f7c-91fb-48d1-81b8-e5b88a951653.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/5f857ba4-9a1c-4602-99b2-1ae88181ea41.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/f291fd13-831d-447a-a9f7-9fbd55a3e8e6.jpg',
          ],
          languageCodes: [],
          links: {
            webSite: 'https://t.me/shopsrobot',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/ShopsRobot',
            tgChannel: '',
            tgChat: '',
            twitter: '',
            youtube: '',
          },
        },
        {
          ID: 326,
          name: 'WebDeployer',
          pretty_url: 'ratingers-deployer',
          caption: 'Deploy contracts with QR codes easily',
          description: 'Deploy contracts with QR codes easily',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6bf8f895-bf7f-4e38-9ece-73878863f9f0.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6bf8f895-bf7f-4e38-9ece-73878863f9f0.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/7f5f3fb5-31a4-46f5-8dc9-2ee09c82e647.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/1f5a96e6-432c-43ec-adbb-d6b90e4712a3.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/395d55dc-bb86-4e38-829d-5b3f169d9155.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/dfff33cc-50bf-4eea-b92f-101206d72288.jpg',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://ratingers.pythonanywhere.com/deployer/',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: '',
            tgChat: '',
            twitter: '',
            youtube: '',
          },
        },
        {
          ID: 1659,
          name: 'Chainbase Network',
          caption: 'A decentralized omnichain data network. ',
          description: 'Chainbase is the first omnichain data network powering the machine economy. It operates as a modular layer enabling interoperability and programmability between cross-chain data. It is designed to provide a trustless, permissionless, and permanent data access environment for Crypto and AI by building a global supercluster.\n\nChainbase has attracted a vibrant developer community of over 10,000 devs and data scientists contributing around the network. Currently, builders have access to over 2,000 pre-trained data models to integrate predictive analytics and insights into their applications.',
          appPlatforms: {
            web: 'https://chainbase.com',
            github: 'https://github.com/chainbase-labs',
            twitter: 'https://twitter.com/ChainbaseHQ',
            appId: 1659,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/a8208047-7d23-4330-98ad-792adffbc5ab.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/a8208047-7d23-4330-98ad-792adffbc5ab.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/19faa6dc-da41-41ec-b54b-7814f6d53700.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d7e7d5d0-c8eb-4b20-91c4-88bd2c6e6d96.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/dad8f788-decc-44b9-bd32-74e7caede8ee.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://chainbase.com',
            github: 'https://github.com/chainbase-labs',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: '',
            tgChat: '',
            twitter: 'https://twitter.com/ChainbaseHQ',
            youtube: '',
          },
        },
        {
          ID: 2703,
          name: 'Nimbus API',
          caption: 'Nimbus API for portfolio tracking',
          description: 'We are happy to collaborate to bring our data into more dAPP\nCurrently, we have integrated\n- 30+ EVM chains\n- TON\n- SUI\n- Solana\n\nWith Token, NFT, DEFI, Profit & Loss,...',
          appPlatforms: {
            web: 'https://getnimbus.io',
            tg_chat: 'https://t.me/thanhle27',
            appId: 2703,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/85f402a8-9879-4a90-b3a1-5cd6052eacd7.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/85f402a8-9879-4a90-b3a1-5cd6052eacd7.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/f7af8415-4623-46aa-8185-91302d53222b.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/a57ce9f2-7c1b-477e-b922-ac3a42273c3d.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/2a52653a-0776-4065-a686-d84571d4ed66.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/9a5cd6c3-598c-48cb-b708-45d1e5a8a084.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://getnimbus.io',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: '',
            tgChat: 'https://t.me/thanhle27',
            twitter: '',
            youtube: '',
          },
        },
        {
          ID: 1974,
          name: 'Directual no-code',
          caption: 'Build web apps and TMA integrated with TON, all without coding',
          description: 'Directual is a pro-level no-code platform that empowers non-tech users to build sophisticated web apps, chatbots, and Telegram mini-apps. The new TON plugin lets you integrate your Directual app with TON instantly, without writing a single line of code!',
          appPlatforms: {
            web: 'https://readme.directual.com/plugins/using-plugins/blockchain-web3/ton-the-open-network',
            tg_bot: 'https://t.me/Directual_bot',
            twitter: 'https://twitter.com/directual',
            youtube: 'https://youtube.com/@directual',
            appId: 1974,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3e85be5a-f2fb-440d-8ce7-e2b8ad3cad46.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3e85be5a-f2fb-440d-8ce7-e2b8ad3cad46.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d220dda0-b1fc-4f6c-a208-8bfedd77e553.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/061ca650-6f5b-4c9e-b3ce-5f71932262dd.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/9968a766-16df-442a-8e1c-ae245b94d626.png',
          ],
          languageCodes: [
            'en',
            'fr',
            'de',
            'ru',
            'es',
          ],
          links: {
            webSite: 'https://readme.directual.com/plugins/using-plugins/blockchain-web3/ton-the-open-network',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/Directual_bot',
            tgChannel: '',
            tgChat: '',
            twitter: 'https://twitter.com/directual',
            youtube: 'https://youtube.com/@directual',
          },
        },
      ];

      const normalizeLanguageCodes = (codes) => {
        if (!codes) return null;
        return codes
          .flatMap((code) => code.split(','))
          .map((code) => code.trim())
          .filter((code) => code);
      };

      const baseTime = new Date();
      for (const item of array) {
        const object = {
          id: Sequelize.literal('UUID()'),
          image: item.iconPath,
          title: item.name,
          subTitle: item.caption,
          slug: item.pretty_url,
          description: item.description,
          cover: null,
          screenshots: item.screenshotPaths ? JSON.stringify(item.screenshotPaths) : null,
          platforms: JSON.stringify({
            web: item.links?.webSite || null,
            ios: item.links?.appStore || null,
            android: item.links?.googlePlay || null,
            telegram: item.links?.tgChannel || null,
          }),
          languageIds: item.languageCodes?.length ? JSON.stringify(normalizeLanguageCodes(item.languageCodes)) : null,
          links: JSON.stringify({
            telegramBot: item.links?.tgBot || null,
            telegramChat: item.links?.tgChat || null,
            github: item.links?.github || null,
            instagram: item.links?.instagram || null,
            x: item.links?.twitter || null,
            youtube: item.links?.youtube || null,
            medium: item.links?.medium || null,
            reddit: item.links?.reddit || null,
            discord: item.links?.discord || null,
          }),
          status: 1,
          appCategoryId: 113,
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };

        if (!object.slug) {
          const slug = slugify(object.title, {
            lower: true,
            strict: true,
          });
          let uniqueSlug = slug;
          let suffix = 1;
          while (await db.app.findOne({ where: { slug: uniqueSlug } })) {
            suffix += 1;
            uniqueSlug = `${slug}-${suffix}`;
          }
          object.slug = uniqueSlug;
        }
        await queryInterface.bulkInsert('apps', [object], {});
        baseTime.setSeconds(baseTime.getSeconds() + 1);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
