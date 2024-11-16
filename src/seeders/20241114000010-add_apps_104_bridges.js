const slugify = require('slugify');
const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const array = [
        {
          ID: 540,
          pretty_url: 'cross-chain',
          name: 'Rubic',
          caption: 'Rubic is a Cross-Chain Tech Aggregator for users +Tools for dApps',
          description: 'Rubic is a Cross-Chain Tech Aggregator for users and dApps.\nOur vision is that Rubic’s new umbrella SDK will aggregate the best Web3 cross-chain tech - from signals and oracles, to tokens and NFT bridges, in ready-made templates for DEXs, Lending/Farms, and more. This will help developers easily make their Web3 dApps cross-chain, regardless of what their function is. \nRight now, Rubic aggregates 70+ major blockchains, 200+ DEXs and bridges, and enables swapping of 15,500+ assets with the best rates, highest liquidity, and transaction speeds - in one click. Users can do it on https://app.rubic.exchange/, but we also provide tools for dApps to enable cross-chain swaps.   \nOn top of that, Rubic’s app and our cross-chain widget provide fiat-on-ramp services, making crypto easy to access and buy.',
          appPlatforms: {
            web: 'https://app.rubic.exchange',
            tg_channel: 'https://t.me/cryptorubic',
            tg_bot: 'https://t.me/RubicSupportBot',
            tg_chat: 'https://t.me/cryptorubic_chat',
            appId: 540,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/1448defa-142d-4dde-a8cd-9a35bf7ba88b.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/1448defa-142d-4dde-a8cd-9a35bf7ba88b.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/270128b4-0e9d-4553-a317-d2aee973c572.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/b6d68829-0b80-4371-8154-a6bfe6d5a5f0.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/b42caf40-ae54-451f-8be3-d4d6af8ac72e.jpg',
          ],
          languageCodes: [],
          links: {
            webSite: 'https://app.rubic.exchange',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/RubicSupportBot',
            tgChannel: 'https://t.me/cryptorubic',
            tgChat: 'https://t.me/cryptorubic_chat',
            twitter: '',
            youtube: '',
          },
        },
        {
          ID: 1314,
          name: 'XP.NETWORK',
          caption: 'Multichain NFT Bridge',
          description: 'A powerful NFT bridge connecting 30+ EVM and non-EVM blockchains. Go multichain effortlessly: attract fresh liquidity and audiences across ecosystems.',
          appPlatforms: {
            web: 'https://bridge.xp.network/',
            github: 'https://github.com/XP-NETWORK',
            tg_channel: 'https://t.me/XP_NETWORK_Ann',
            tg_chat: 'https://t.me/XP_network',
            twitter: 'https://twitter.com/xpnetwork_',
            appId: 1314,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d278398d-488e-448b-9e13-b2881d7f10e9.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d278398d-488e-448b-9e13-b2881d7f10e9.jpg',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/1339a4f4-9418-4220-a591-b5f08fa9a97f.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d7fbecd1-fdfd-4b75-b6be-4e573bcfd422.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/b675cb4f-c2ee-4512-b37e-6315bf9ea5c6.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://bridge.xp.network/',
            github: 'https://github.com/XP-NETWORK',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: 'https://t.me/XP_NETWORK_Ann',
            tgChat: 'https://t.me/XP_network',
            twitter: 'https://twitter.com/xpnetwork_',
            youtube: '',
          },
        },
        {
          ID: 1324,
          name: 'Layerswap',
          caption: 'Transfer crypto to TON from Ethereum, Solana and 30+ more networks.',
          description: 'Layerswap handles millions of dollars in transactions every day across multiple networks. We ensure quick, reliable, and affordable crypto transfers, giving the freedom to move crypto anywhere. \n\nLayerswap allows seamless transfer of crypto assets across multiple ecosystems, including TON, Ethereum, Solana, L2s, CEXes and more.',
          appPlatforms: {
            web: 'https://layerswap.io',
            github: 'https://github.com/layerswap',
            twitter: 'https://twitter.com/layerswap',
            appId: 1324,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6551dedd-d12f-4808-aae3-2b4a12d320c3.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6551dedd-d12f-4808-aae3-2b4a12d320c3.png',
          videoPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d022acda-9833-48d2-bf80-4106542b6ed2.mp4',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/b3cfc3bb-ed8d-4728-a7ca-67ab7e05fdf2.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/cad6a75d-df05-4cbb-9573-05a84e2d2e78.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/cad5aff5-2ae3-4466-98b2-ce6f8b03f4ff.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://layerswap.io',
            github: 'https://github.com/layerswap',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: '',
            tgChat: '',
            twitter: 'https://twitter.com/layerswap',
            youtube: '',
          },
        },
        {
          ID: 2388,
          name: 'UTYABSWAP BRIDGE',
          caption: 'BRIDGE EASILY AND QUICKLY FROM ANY KNOWN BLOCKCHAIN TO THE TON BLOCKCHAIN\n',
          description: 'BRIDGE EASILY AND QUICKLY FROM ANY KNOWN BLOCKCHAIN TO THE TON BLOCKCHAIN\n\nMade simple for the people on TON',
          appPlatforms: {
            web: 'https://utyabswap.com/bridge',
            tg_channel: 'https://t.me/utyablack',
            tg_bot: 'https://t.me/UtyabSwapBot',
            twitter: 'https://twitter.com/TonUtyab',
            appId: 2388,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/0bc3d754-45ef-4426-9c00-a6c4ab259ec7.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/0bc3d754-45ef-4426-9c00-a6c4ab259ec7.jpg',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/ea41fcaa-fe4d-4e4b-bf00-9ce3a89ef0bd.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d01efda4-f137-4370-adbf-a94dcd57ee52.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/54a3b903-b3f9-441a-9367-4cadd8d80e48.jpg',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://utyabswap.com/bridge',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/UtyabSwapBot',
            tgChannel: 'https://t.me/utyablack',
            tgChat: '',
            twitter: 'https://twitter.com/TonUtyab',
            youtube: '',
          },
        },
        {
          ID: 1623,
          name: 'Cede.store',
          caption: 'Access and transfer your assets from 10+ Centralized Exchanges, with a DeFi UX',
          description: "Cede.store is a non-custodial solution bridging CeFi with DeFi.\nAccess CeFi liquidity with your Centralized Exchanges from your favorite dApps on the TON ecosystem and many others, while keeping DeFi values :\n- Self-custody : we don't store any data, everything is stored client side\n- DeFi UX : 1 click connection",
          appPlatforms: {
            web: 'https://send.cede.store/?tokenSymbol=TON&network=ton&source=ton_foundation',
            github: 'https://github.com/cedelabs/cede.store',
            twitter: 'https://twitter.com/cedelabs',
            appId: 1623,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/0e426479-49e3-4111-a741-9cc07ac5f45a.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/0e426479-49e3-4111-a741-9cc07ac5f45a.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/12a9e49e-8dab-472b-9d6d-b0054c645b70.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/236f2954-f348-4194-b617-06a6db2d7612.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/2692d700-bc6e-4329-b4a4-039d88199e3e.jpg',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://send.cede.store/?tokenSymbol=TON&network=ton&source=ton_foundation',
            github: 'https://github.com/cedelabs/cede.store',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: '',
            tgChat: '',
            twitter: 'https://twitter.com/cedelabs',
            youtube: '',
          },
        },
        {
          ID: 3698,
          name: 'Symbiosis',
          caption: 'Symbiosis is a cross-chain any-to-any token bridge. ',
          description: 'Symbiosis is a cross-chain bridge that pools together liquidity from different networks: L1s and L2s, EVM and non-EVM. With Symbiosis, you can easily swap any token and move your assets across different networks.\nBridge from TRON, native Bitcoin and 33 EVM chains directly to TON. ',
          appPlatforms: {
            web: 'https://app.symbiosis.finance/',
            github: 'https://github.com/symbiosis-finance',
            tg_channel: 'https://t.me/symbiosis_announcements',
            tg_chat: 'https://t.me/symbiosis_finance',
            twitter: 'https://x.com/symbiosis_fi',
            youtube: 'youtube.com/@symbiosis_finance',
            appId: 3698,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4a4c1759-1544-4c01-b5a5-5ccadd9fc3f3.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4a4c1759-1544-4c01-b5a5-5ccadd9fc3f3.png',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d5d764a3-b3dc-40b8-9a4f-8325b1c426d4.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/46b73a2b-dccc-4097-a761-bc13124d3860.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/60e59354-3db4-40f8-b6b5-a90808757637.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://app.symbiosis.finance/',
            github: 'https://github.com/symbiosis-finance',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: 'https://t.me/symbiosis_announcements',
            tgChat: 'https://t.me/symbiosis_finance',
            twitter: 'https://x.com/symbiosis_fi',
            youtube: 'youtube.com/@symbiosis_finance',
          },
        },
        {
          ID: 1663,
          name: 'Tonbridge',
          caption: 'Tonsbridge , best aggregator of bridges solutions of TON',
          description: "There are many bridges on TON for asserts to transfer cross chains . Some of them are official-bridges and some of them are support jetton token / NFT only . \n\nTonsbridge is working on building a aggregator of TON bridges , and build for mobile user to cross it's asserts anytime they want .",
          appPlatforms: {
            web: 'https://bridge.tonspay.top/',
            github: 'https://github.com/tonspay',
            tg_channel: 'https://t.me/tonspays',
            tg_bot: 'https://t.me/tonsbridge_bot',
            tg_chat: 'https://t.me/+5GkZeJOXluMxYWVl',
            twitter: 'https://twitter.com/tonsprotocols',
            youtube: 'https://youtube.com/channel/UCHw0zTMSvjKNqw5EsoWmiQg',
            appId: 1663,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4317a4ec-8158-4384-bd58-e77ce611e3c5.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4317a4ec-8158-4384-bd58-e77ce611e3c5.jpg',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/e254dc64-ae2b-4a2c-8f4f-0183267712ed.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/e5c3b0b0-3197-42fe-9b2c-e3986da93b72.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3e25cfeb-2817-42d8-b405-4509683e47a6.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/449cfdad-d410-45ce-9203-d0d2a940cb8b.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/c3e0305c-d65f-434a-ac85-e15d8ed70e49.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/538f2c59-a496-443a-ad95-648524df2d69.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://bridge.tonspay.top/',
            github: 'https://github.com/tonspay',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/tonsbridge_bot',
            tgChannel: 'https://t.me/tonspays',
            tgChat: 'https://t.me/+5GkZeJOXluMxYWVl',
            twitter: 'https://twitter.com/tonsprotocols',
            youtube: 'https://youtube.com/channel/UCHw0zTMSvjKNqw5EsoWmiQg',
          },
        },
        {
          ID: 2722,
          name: 'TON Bridge',
          caption: 'Unlimited TON Bridge for TONBANKCARD',
          description: 'Unlimited TON Bridge.\nDiscover TON Bridge from TONBANKCARD – a reliable bridge between TON and BSC blockchains. Learn how to quickly and safely conduct cryptocurrency transactions between two popular blockchain platforms using TON Bridge. Exchange up to 100 TON through our TON Bridge with a minimum commission.',
          appPlatforms: {
            web: 'https://bridge.tonbankcard.com',
            tg_channel: 'https://t.me/tonbankcard',
            tg_bot: 'https://t.me/TONBridge_robot',
            tg_chat: 'https://t.me/tonbankcard_chat',
            twitter: 'https://twitter.com/tonbankcard',
            youtube: 'https://youtube.com/@tonbankcard',
            appId: 2722,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/541a34f0-67bf-432b-b9ab-fb085793e578.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/541a34f0-67bf-432b-b9ab-fb085793e578.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/5acf2763-ef9b-4a7b-af4c-ab19561c1008.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/7a031f69-4761-41cb-b2e4-29f484c4a00d.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/0e38a656-9819-48cd-8c22-32e5d619557a.png',
          ],
          languageCodes: [
            'en',
            'ru',
          ],
          links: {
            webSite: 'https://bridge.tonbankcard.com',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/TONBridge_robot',
            tgChannel: 'https://t.me/tonbankcard',
            tgChat: 'https://t.me/tonbankcard_chat',
            twitter: 'https://twitter.com/tonbankcard',
            youtube: 'https://youtube.com/@tonbankcard',
          },
        },
        {
          ID: 432,
          pretty_url: 'orbit-bridge',
          name: 'Orbit Bridge',
          caption: 'Orbit Bridge: Fast and secure way for token conversion',
          description: "Orbit Bridge is a bridge service that supports token conversion between mainnets and supports 21 blockchains and 96 tokens.\nOne of the core keywords in the current crypto market is cross-chain. While there are currently at least 100 active public chains, the number of bridges that connect these ecosystems is only about 50. Many of them only support 1 to 3 public chains. The fragmented blockchain ecosystem inevitably faces limits to growth in all aspects, including market capitalization, users (including token holders), and the number of Dapps. Orbit Bridge, which supports users' platform access and interaction between protocols, will be the only key to solving this problem.\nIn the mid-to-long term, Orbit Bridge will add unique features such as atomic and native coin swaps.",
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/336fee43-f3cc-4542-943c-404a789c4bf4.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/336fee43-f3cc-4542-943c-404a789c4bf4.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/a3c4bf83-711c-4079-afeb-83590d1c3d49.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/93c9428c-c34e-42cf-9d58-99ca219bb113.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/62229220-9812-41d2-ae1c-293a35e1bb32.jpg',
          ],
          languageCodes: [],
          links: {
            webSite: 'https://bridge.orbitchain.io/',
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
          platforms: JSON.stringify([
            {
              id: 'ios',
              url: item.links?.ios || null,
            },
            {
              id: 'android',
              url: item.links?.android || null,
            },
            {
              id: 'telegram',
              url: item.links?.telegram || null,
            },
            {
              id: 'web',
              url: item.links?.web || null,
            },
          ]),
          languageIds: item.languageCodes?.length ? JSON.stringify(normalizeLanguageCodes(item.languageCodes)) : null,
          telegramChannels: JSON.stringify(
            [item.links?.tgBot, item.links?.tgChat].filter((link) => link !== null && link !== undefined),
          ),
          snsChannels: JSON.stringify([
            {
              id: 'github',
              url: item.links?.github || null,
            },
            {
              id: 'instagram',
              url: item.links?.instagram || null,
            },
            {
              id: 'x',
              url: item.links?.twitter || null,
            },
            {
              id: 'youtube',
              url: item.links?.youtube || null,
            },
            {
              id: 'medium',
              url: item.links?.instagram || null,
            },
            {
              id: 'reddit',
              url: item.links?.instagram || null,
            },
            {
              id: 'discord',
              url: item.links?.instagram || null,
            },
          ]),
          status: 1,
          position: array.indexOf(item) + 1,
          appCategoryId: 104,
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
