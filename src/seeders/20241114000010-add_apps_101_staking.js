const slugify = require('slugify');
const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const array = [
        {
          ID: 541,
          pretty_url: 'mining',
          name: 'Bemo liquid staking',
          caption: 'High Yield Liquid Staking protocol on the TON blockchain',
          description: 'bemo is a non-custodial liquid staking protocol built on The Open Network (TON) blockchain. It is the first liquid staking application on TON that allows you to stake native TON tokens and, in return, get stTON tokens which you can use freely in DeFi.\n\nstTON token TON price grows in line with the accrual of the staking rewards after each validation round by bemo protocol.',
          appPlatforms: {
            web: 'https://bemo.fi/',
            tg_channel: 'https://t.me/bemofinance',
            twitter: 'https://x.com/bemo_finance',
            appId: 541,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/bf7a5ac3-312f-475f-b31b-61918a675916.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/bf7a5ac3-312f-475f-b31b-61918a675916.jpg',
          videoPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6689952c-2233-4937-bbb2-bf751173747e.mp4',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/927379ac-41f7-445e-a60c-524ec452a8c3.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/e44c7486-a7b1-4ca2-912f-74e2526578ff.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/66038e80-bd54-49cd-909f-b4280d51ce3f.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3d26243b-96f3-4489-8bc6-7adcba67127c.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/9dee3539-7653-433c-a6c1-e696bd7df9cd.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/2074a9dd-10d8-484d-9782-bc92d8001e8e.png',
          ],
          languageCodes: [
            'en',
            'ru',
          ],
          links: {
            webSite: 'https://bemo.fi/',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: 'https://t.me/bemofinance',
            tgChat: '',
            twitter: 'https://x.com/bemo_finance',
            youtube: '',
          },
        },
        {
          ID: 1181,
          pretty_url: 'hipo',
          name: 'Hipo Finance',
          caption: 'Stake any amout of TON, Earn more than staking rewards!',
          description: 'At Hipo, you can stake any amount of TON and gain more than just staking rewards: 1. Acquire hTON, usable across TON DeFi. 2. Earn $HPO, our governance token, as an incentive for your contributions.',
          appPlatforms: {
            web: 'https://app.hipo.finance/',
            github: 'https://github.com/HipoFinance',
            tg_channel: 'https://t.me/HipoFinance',
            tg_bot: 'https://t.me/HipoFinanceBot',
            tg_chat: 'https://t.me/hipo_chat',
            twitter: 'https://twitter.com/hipofinance',
            appId: 1181,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/7664f401-a81e-49c8-9d35-563010c9b50d.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/7664f401-a81e-49c8-9d35-563010c9b50d.jpg',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6bb396ae-e9d2-4cb7-88c9-5cbaf1a66108.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3d3c7ee8-55de-4343-8850-ad2312566ffb.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/773305e7-a454-4c8e-bd0a-50004e4df4b0.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/85e14b5a-ec88-463e-ae46-cdad415ea55e.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/e9c4de84-d1ae-4418-98e1-07c29ebb7364.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/959cdb57-939a-4021-af1f-9860c1248b26.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://app.hipo.finance/',
            github: 'https://github.com/HipoFinance',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/HipoFinanceBot',
            tgChannel: 'https://t.me/HipoFinance',
            tgChat: 'https://t.me/hipo_chat',
            twitter: 'https://twitter.com/hipofinance',
            youtube: '',
          },
        },
        {
          ID: 2764,
          name: 'Stable Metal',
          caption: 'RWA investment platform',
          description: "Stable Metal (STBL) is a hybrid startup that combines blockchain technology with the real economic sector. The project's objective is to launch a laboratory and processing line for converting existing SLAG into valuable metals in Europe. By leveraging blockchain technology and NFTs, the team enables every STBL jetton holder to participate in the launch of the metal exchange",
          appPlatforms: {
            web: 'https://stablemetal.com',
            github: 'https://github.com/Stable-Metal/SLAG-Collection',
            tg_channel: 'https://t.me/stablemetal',
            tg_bot: 'https://t.me/Stable_metal_bot',
            tg_chat: 'https://t.me/stable_metal',
            inst: 'https://instagram.com/stable_metal',
            twitter: 'https://x.com/stable_metal',
            appId: 2764,
            reviewId: 4522,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/b0e3d081-806f-40f3-a907-0c1c5dc2963a.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/b0e3d081-806f-40f3-a907-0c1c5dc2963a.png',
          videoPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/bb32ca3a-2d03-488f-8f12-b13abc1aec39.mp4',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/f3002c9b-f6ed-40f1-a22d-fa5cfb91cb56.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/9c628453-4bf8-4de7-a6da-df707b8e8648.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4d7cd9f7-6b6b-49e2-9080-26520b869504.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/5f5043e7-ec50-424d-9576-602a7e702e2a.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://stablemetal.com',
            github: 'https://github.com/Stable-Metal/SLAG-Collection',
            instagram: 'https://instagram.com/stable_metal',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/Stable_metal_bot',
            tgChannel: 'https://t.me/stablemetal',
            tgChat: 'https://t.me/stable_metal',
            twitter: 'https://x.com/stable_metal',
            youtube: '',
          },
        },
        {
          ID: 533,
          pretty_url: 'stakelottery',
          name: 'Ton Stake Lottery',
          caption: 'Stake TON together! \nNo Loss Smart Contract Lottery! ',
          description: 'Smart contract based lottery.\n\nThe smart contract will choose the winner of all the profits from staking every month. \n\nLarger deposit — more chances to win!\n\nDeposit Toncoins into the smart contract — each 10 TON deposit gives you one entry.\nAll Toncoins collected from entries will be transferred to the staking contract.\nAt the end of the month, our smart contract will generate a random number. The entry corresponding to that number will win all the staking profits.\nOn the day the winner is chosen, you can either withdraw your Toncoins or leave them in the smart contract for future participation.\nA lifetime opportunity to earn a good amount of Toncoins for the price of one lunch!',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/95bc5b58-61f8-47ed-b6fe-dc70b6223f6e.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/95bc5b58-61f8-47ed-b6fe-dc70b6223f6e.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/b3d3fc07-9e42-497b-80f5-700765bb6bde.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/5ab07338-981d-4e01-8f14-7ddea801c751.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/9988cdd6-2f2b-405e-8720-0232a5455b3d.jpg',
          ],
          languageCodes: [],
          links: {
            webSite: 'https://tonstakelottery.com/',
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
          ID: 1710,
          name: 'Tonoreum PoW & PoL',
          caption: 'Earn free $TOR tokens by completing tasks, referring friends and participating in the Tonoreum game.',
          description: "Tonoreum (TOR)\nEarn free $TOR tokens by completing tasks, referring friends and participating in the Tonoreum game. Don't miss your chance; join the $TOR community and start earning today!. Don’t miss this unique opportunity to be part of a revolutionary platform!. We reached 500 000 Users, don't miss your spot!\n\nJoin and earn free $TOR\nhttps://t.me/Tonoreum\nhttps://x.com/tonoreum",
          appPlatforms: {
            web: 'https://tonoreum.com/',
            tg_channel: 'https://t.me/Tonoreum',
            tg_bot: 'https://t.me/Tonoreum_Bot',
            twitter: 'https://twitter.com/tonoreum',
            appId: 1710,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/a87dff6a-da78-44dd-9740-4d67a7ba5b3f.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/a87dff6a-da78-44dd-9740-4d67a7ba5b3f.jpg',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/a3982441-34a3-473f-bcf4-9d4fa71ad431.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/8b0844dd-a168-46ff-8c78-1d2863e176d4.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/c6373243-6828-432a-8ebf-bdd7815c01af.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d7a5dd43-22e3-4630-92a7-7bd7f9a9a364.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/816f3458-12e5-4806-952c-948302653b2e.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/acc1fc2e-6139-4bfc-9e5f-cab434df7c46.jpg',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://tonoreum.com/',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/Tonoreum_Bot',
            tgChannel: 'https://t.me/Tonoreum',
            tgChat: '',
            twitter: 'https://twitter.com/tonoreum',
            youtube: '',
          },
        },
        {
          ID: 3079,
          name: 'TonStable',
          caption: 'TonStable protocol is a decentralized over-collateralized stablecoin protocol built on TON Network.',
          description: 'TonStable protocol is a decentralized over-collateralized stablecoin protocol built on TON Network, aiming to provide native earning for the TON ecosystem, and be the DeFi infrastructure of it.',
          appPlatforms: {
            web: 'https://tonstable.xyz/',
            tg_channel: 'https://t.me/TonStableOfficial',
            tg_bot: 'https://t.me/TonStableBot',
            twitter: 'https://x.com/TonStable',
            appId: 3079,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/bcf02faf-e63a-496d-9605-83c55cf74361.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/bcf02faf-e63a-496d-9605-83c55cf74361.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4d27d68f-4e77-4527-841b-7ac36e493ad9.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/88d4926b-973c-4a5a-bbad-c20474b368ed.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/cae7794d-697f-4776-a27e-166673bd19a8.jpg',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://tonstable.xyz/',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/TonStableBot',
            tgChannel: 'https://t.me/TonStableOfficial',
            tgChat: '',
            twitter: 'https://x.com/TonStable',
            youtube: '',
          },
        },
        {
          ID: 1343,
          name: 'JVault',
          caption: 'Decentralized tools for founders & holders',
          description: 'JVault is an ecosystem for project creators and investors that includes four active products: Staking (a service for creating and interacting with token staking pools), Launchpad (a platform for tokensales), Quest Bot (a MiniApp for running quest campaigns to reward active community members) and Locker (a service for locking tokens with vesting)',
          appPlatforms: {
            web: 'https://jvault.xyz',
            github: 'https://github.com/JVault-app/',
            tg_channel: 'https://t.me/JVault',
            tg_bot: 'https://t.me/JVaultBot',
            tg_chat: 'https://t.me/JVault_chat',
            appId: 1343,
            reviewId: 5070,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/7f05ffa8-9f35-4d99-a290-ac03adb23a85.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/7f05ffa8-9f35-4d99-a290-ac03adb23a85.png',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/253c857f-c751-434e-bc9a-2f7aa9d69bde.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/e5e1934f-1bb3-4b88-b6df-3089d4b26600.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/90726d45-9a92-49b4-9c69-f42d8b49caa5.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4de4183c-0746-4801-a376-ee1f254de462.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/2b2426c9-d948-4f09-9d3a-85cc0c68ffdc.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/c64fd8ae-1ccd-4f57-bc5b-14837fd5a270.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/62dc1a1b-9518-4a0e-89d8-a1488fd35251.png',
          ],
          languageCodes: [
            'en,ru',
          ],
          links: {
            webSite: 'https://jvault.xyz',
            github: 'https://github.com/JVault-app/',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/JVaultBot',
            tgChannel: 'https://t.me/JVault',
            tgChat: 'https://t.me/JVault_chat',
            twitter: '',
            youtube: '',
          },
        },
        {
          ID: 1361,
          name: 'Stakee',
          caption: 'Earn TON with best APY at most secure and profitable staking service',
          description: "🦄 Decentralized · All coins hold in official smart contract developed by TON Foundation.\n\n💰 Profitable · Your TON will generate up to 7% per annum, no additional actions, it's easier than a bank deposit.\n\n🔐 Safety · Our validators working steadily since 2021, at any time you can withdraw coins or contact 24/7 support.",
          appPlatforms: {
            web: 'https://app.stakee.org/',
            tg_channel: 'https://t.me/StakeeRu',
            tg_bot: 'https://t.me/StakeeBot',
            appId: 1361,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/e44b02bf-4adb-4765-a96f-c39cd987c99e.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/e44b02bf-4adb-4765-a96f-c39cd987c99e.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/07cdd8d9-e40f-4928-adc1-17a745f805ca.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/f38d255d-70f4-437a-9f72-919ae522b74c.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/8cc6cf76-d775-47f1-b0f6-26e1e0db0ff2.png',
          ],
          languageCodes: [
            'en',
            'ru',
          ],
          links: {
            webSite: 'https://app.stakee.org/',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/StakeeBot',
            tgChannel: 'https://t.me/StakeeRu',
            tgChat: '',
            twitter: '',
            youtube: '',
          },
        },
        {
          ID: 2393,
          name: 'UTYABSWAP STAKING',
          caption: 'JETTON STAKING FOR EVERYONE ON THE TON BLOCKCHAIN \nCLAIM YOUR REWARDS IN REAL-TIME',
          description: 'JETTON STAKING FOR EVERYONE ON THE TON BLOCKCHAIN \nCLAIM YOUR REWARDS IN REAL-TIME\n\nMade simple for the people on TON',
          appPlatforms: {
            web: 'https://utyabswap.com/stake',
            tg_channel: 'https://t.me/utyablack',
            tg_bot: 'https://t.me/UtyabSwapBot',
            twitter: 'https://twitter.com/TonUtyab',
            appId: 2393,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/9e58377d-1dd3-4bed-a915-c48e652cb6f7.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/9e58377d-1dd3-4bed-a915-c48e652cb6f7.jpg',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/30e6307c-1dc3-4098-857b-c4c8b7df2a87.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6abd00b3-053d-43d0-bb7d-3aba0b98c579.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/829197d7-a8fa-4ef9-b95a-d3d5556b5b5d.jpg',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://utyabswap.com/stake',
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
          ID: 104,
          pretty_url: 'tonstake',
          name: 'TonStake.com',
          caption: 'The first and largest staking pool',
          description: '**What is Staking?**\n\nThe TON blockchain employs a proof-of-stake(PoS) consensus protocol. This means that the blockchain functions through a network of validators who stake a large amount of TON and then receive rewards by processing transactions on the network.\n\n**What is TonStake?**\n\nTonStake.com is the first and largest staking pool in Ton. We provide leading custodial staking service on the TON blockchain. TonStake.com offers our TonStakers the ability to keep 90% of all staked rewards with just 10% going towards our processing fees, all while being able to safely stake on our secure and stable network. TonStake.com is also working towards a whole host of new features and support, so definitely stay tuned!\n\nWe also provide API for third-party service providers to integrate staking function. If you are building a cool TON application, please get in contact with us.\n\n**Stay tuned for much more!**\n\n[Official Website](https://tonstake.com)\n[TonStake Channel](https://t.me/tonstake_com_en)\n[TonStake Group](https://t.me/tonstake_en)\n[TonStake 中文频道](https://t.me/tonstake_com_zh)\n[TonStake 中文群](https://t.me/tonstake_zh)',
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/a04dcfe4-2160-4894-a684-29d356d68e1e.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/a04dcfe4-2160-4894-a684-29d356d68e1e.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4967f692-ebb5-432d-9f6f-6106393300f4.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/05fa771c-3bf6-41ee-88b9-c56aa089698f.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/9fc78d3d-b249-45bc-99be-c79c0025a6dd.jpg',
          ],
          languageCodes: [],
          links: {
            webSite: 'https://www.tonstake.com',
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
          ID: 374,
          pretty_url: 'tokentake',
          name: 'TonTake (TAKE)',
          caption: 'Electronic money of the TonTake project',
          description: 'The TAKE token is designed to pay for and purchase goods within the TonTake ecosystem as well as outside it. The TAKE token is already available on all popular platforms.\n\nTAKE tokenomics\nIssue = 7,000,000 tokens.\n - 89% (6230000 TAKE) is already locked in Pool Staking with 36.5% annual production in @xJetSwapBot bot \n -10% (700000 TAKE) initial liquidity: bots and DEX listing.\n - 1% (70000 TAKE) Expenses: influencers, development team, marketing, other rewards.\n    Mining will take approximately ~6-8 years.\n\n\nТокеномика TAKE \nЭмиссия = 7 000 000 токенов.\n- 89% (6230000 TAKE) уже заблокировано в Пул-стейкинг с добычей 36,5% годовых в боте @xJetSwapBot \n- 10% (700000 TAKE) начальная ликвидность: боты и листинг на DEX .\n- 1% (70000 TAKE) расходы: инфлюенсеры, команда разработчиков, маркетинг, прочие награды .',
          appPlatforms: {
            web: 'https://www.tontake.website/',
            tg_channel: 'https://t.me/TonTake',
            tg_bot: 'https://http://t.me/TonTakeChatbot',
            tg_chat: 'https://t.me/TonTakeChat',
            appId: 374,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/08de14d3-e6bc-49df-ae0f-cbf1bada6347.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/08de14d3-e6bc-49df-ae0f-cbf1bada6347.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/09268594-a9ee-4058-a0fe-a76ffe480f6c.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/bef2a76d-f08c-4c75-9222-a481f2884563.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/2c9aaab7-28c0-4b16-b288-b9533e13a658.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/5d57b3bb-0a5b-4184-a7ca-e8403123e2f5.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/20c01819-2a1d-4396-9f06-381bc0576fab.png',
          ],
          languageCodes: [
            'en',
            'ru',
          ],
          links: {
            webSite: 'https://www.tontake.website/',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://http://t.me/TonTakeChatbot',
            tgChannel: 'https://t.me/TonTake',
            tgChat: 'https://t.me/TonTakeChat',
            twitter: '',
            youtube: '',
          },
        },
        {
          ID: 1427,
          name: 'Whales Liquid Pool',
          caption: 'Liquid Pool from the authors of the first and largest staking in TON',
          description: 'In this pool, you can send your TON to staking and get wsTON tokens instead. The price of wsTON is constantly increasing due to staking, but the quantity in your wallet remains the same. You can sell wsTON to DEX anytime, or exchange them back to TON in pool.',
          appPlatforms: {
            web: 'https://tonwhales.com/ru/staking/liquid',
            github: 'https://github.com/tonwhales',
            tg_channel: 'https://t.me/stakeonwhales',
            twitter: 'https://twitter.com/whalescorp',
            appId: 1427,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/c86fa08e-f930-4b99-99d3-940d612ec6bb.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/c86fa08e-f930-4b99-99d3-940d612ec6bb.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/33e95344-d680-4946-8fa1-0860111e2cea.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/1fad73db-2594-4c2f-affc-d14b47f80056.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/10ca1f61-81e0-4f66-b1a0-93a5bf624368.png',
          ],
          languageCodes: [],
          links: {
            webSite: 'https://tonwhales.com/ru/staking/liquid',
            github: 'https://github.com/tonwhales',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: 'https://t.me/stakeonwhales',
            tgChat: '',
            twitter: 'https://twitter.com/whalescorp',
            youtube: '',
          },
        },
        {
          ID: 3013,
          name: 'Tonpools',
          caption: 'Win prizes while you stake on TON!',
          description: 'Experience no-loss prize-linked staking with Tonpools. Deposit your TON, join exciting pools, and get a chance to win weekly prizes without risking your principal.\n\nKey features:\n- No-loss staking: Your deposits are always safe\n- Weekly prize draws from staking yields\n- Community-themed pools\n- Stake smarter, earn rewards, and join a vibrant saving community with Tonpools!\n\nSupport: https://support.tonpools.com/hc/en-us\nDocs: https://docs.tonpools.com/',
          appPlatforms: {
            web: 'https://www.tonpools.com',
            tg_channel: 'https://t.me/tonpools_com',
            tg_bot: 'https://t.me/tonpools_bot',
            twitter: 'https://x.com/TonPools_Com',
            appId: 3013,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/60f9b803-a84e-4d9e-addf-9e7d506ff6c7.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/60f9b803-a84e-4d9e-addf-9e7d506ff6c7.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4d84b6f8-b242-4a5f-a676-6f343bc9ab6c.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d0bee4c8-b0ee-48b7-88a8-a56823780bde.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/9f3e087f-a486-4cdf-8806-8f5392d09cbe.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/03d279a2-972a-40bb-bee5-060691c5c9cf.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/456eca45-1e44-441b-83a7-39beb75614f0.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/2c321e5e-344e-4d9f-9841-a97178fde2c0.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://www.tonpools.com',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: 'https://t.me/tonpools_bot',
            tgChannel: 'https://t.me/tonpools_com',
            tgChat: '',
            twitter: 'https://x.com/TonPools_Com',
            youtube: '',
          },
        },
        {
          ID: 473,
          pretty_url: 'whalesstaking',
          name: 'Whales Staking',
          caption: 'The first largest decentralized TON staking',
          description: 'The first decentralized open-source TON staking\n\n- Powered by Ton Whales smart contract\n- Over 9000 active users\n- Over 30,000,000 TON already in staking\n- 7 staking pools available\n- From 50 TON\n- Available at tonwhales.com and directly in Tonhub',
          appPlatforms: {
            web: 'https://tonwhales.com/staking',
            github: 'https://github.com/tonwhales',
            tg_channel: 'https://t.me/stakeonwhales',
            twitter: 'https://twitter.com/whalescorp',
            appId: 473,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/ffdab128-0eee-45f1-9208-6fcd8a11755d.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/ffdab128-0eee-45f1-9208-6fcd8a11755d.jpg',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3a36797a-19cb-4661-846b-e0b39c594407.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/75ac71b4-a29f-4ce7-b76b-c7bc0127dd57.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/0ae531ce-c64f-4b96-a62a-59c8170477c0.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/942b39da-3fc2-48ee-ad38-3e6adbdf3825.jpg',
          ],
          languageCodes: [],
          links: {
            webSite: 'https://tonwhales.com/staking',
            github: 'https://github.com/tonwhales',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: 'https://t.me/stakeonwhales',
            tgChat: '',
            twitter: 'https://twitter.com/whalescorp',
            youtube: '',
          },
        },
        {
          ID: 1257,
          pretty_url: 'xbanking',
          name: 'XBANKING',
          caption: 'XBANKING is a non-custodial staking & liquid pools provider. Liquid hub.',
          description: 'XBANKING is a non-custodial staking & liquid pools provider. Liquid hub.',
          appPlatforms: {
            web: 'https://xbanking.org',
            appId: 1257,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/48c08d44-cf2b-4641-ac8c-35ac49655e1d.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/48c08d44-cf2b-4641-ac8c-35ac49655e1d.png',
          videoPath: '',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6c856f81-923a-4389-9f7d-31767a74d290.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6f4ded94-2799-46c8-8aeb-66e77173e7da.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/774bff3f-3899-4e2b-9763-ca33832584b6.png',
          ],
          languageCodes: [
            'en',
            'de',
            'ru',
          ],
          links: {
            webSite: 'https://xbanking.org',
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
          ID: 2037,
          name: 'UTN Staking',
          caption: 'Hold. Stake. Farm. Earn, With Simple Staking, UNITON tokens are available for yield earning.',
          description: 'Simple Staking is a feature that allows Uniton users to engage in single-sided staking of $UTN token within the TON Network. Diverging from traditional methods of staking in Farms and dual-asset liquidity pools, Simple Staking presents an opportunity to generate returns by staking just one kind of asset. This approach streamlines the staking process for our users.',
          appPlatforms: {
            web: 'https://app.unitontoken.com',
            tg_channel: 'https://t.me/uniton_token',
            tg_chat: 'https://t.me/official_uniton_token',
            twitter: 'https://twitter.com/uniton_official',
            appId: 2037,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4949982e-3496-4f7a-a272-d896c030d574.jpg',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4949982e-3496-4f7a-a272-d896c030d574.jpg',
          videoPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3d11266e-926c-4447-9337-4e5c33db1594.mp4',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/22b800f7-3fa1-4546-939d-ce95e7f80565.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/b1b32967-91d9-46c8-aa10-fd8cb24c0b59.jpg',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/d09081f4-9f76-4489-a951-a7142c7ede99.jpg',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://app.unitontoken.com',
            github: '',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: 'https://t.me/uniton_token',
            tgChat: 'https://t.me/official_uniton_token',
            twitter: 'https://twitter.com/uniton_official',
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
          platforms: JSON.stringify({
            web: item.links?.webSite || null,
            ios: item.links?.appStore || null,
            android: item.links?.googlePlay || null,
            telegram: item.links?.tgChannel || null,
          }),
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
          appCategoryId: 101,
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
