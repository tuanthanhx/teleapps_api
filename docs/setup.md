# SEED

npm run seed:dev

OR

cd src

#== OLD (TESTING)

NODE_ENV=production npx sequelize db:seed --seed 20240901000002-add_apps.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000003-add_app_categories.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000004-add_app_category_map.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000008-add_app_reviews.js # -- ONLY FOR TESTING

#== 20250111

NODE_ENV=production npx sequelize db:seed --seed 20240901000001-add_users.js
NODE_ENV=production npx sequelize db:seed --seed 20241026000015-add_wallets.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000007-add_app_languages.js

NODE_ENV=production npx sequelize db:seed --seed 20240901000003-add_app_categories.js

NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_100_exchange_cex.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_101_staking.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_102_wallets.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_103_explores.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_104_bridges.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_105_utilities.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_106_nft_collections.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_107_chats.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_108_social_networking.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_109_gambling.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_110_gaming.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_111_nft_services.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_112_vpn.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_113_dev_tools.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_114_shopping.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_115_launchpads.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_116_rwa.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_117_audit.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_118_channels.js
NODE_ENV=production npx sequelize db:seed --seed 20241114000010-add_apps_119_dex.js

NODE_ENV=production npx sequelize db:seed --seed 20240901000005-add_app_covers.js

NODE_ENV=production npx sequelize db:seed --seed 20240901000009-add_sliders.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000010-add_slider_items.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000011-add_app_category_slider_items.js

NODE_ENV=production npx sequelize db:seed --seed 20241026000020-add_task_categories.js
NODE_ENV=production npx sequelize db:seed --seed 20241026000030-add_tasks.js


# MIGRATION

npx sequelize-cli db:migrate --env production
npx sequelize-cli db:migrate --to 00000000000000-sample.js --env production
npx sequelize-cli db:migrate --to 20241025231113-add-columns-to-users.js --env production
npx sequelize-cli db:migrate --to 20241103193100-add-columns-to-tasks.js --env production
npx sequelize-cli db:migrate --to 20241103193110-remove-columns-from-user_games.js --env production


TEST:

  npm run test
  npm run test -- test/20240416114200_register.test.js
