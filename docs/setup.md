# SEED

npm run seed:dev

OR

cd src

NODE_ENV=production npx sequelize db:seed --seed 20240901000001-add_users.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000002-add_apps.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000003-add_app_categories.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000004-add_app_category_map.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000005-add_app_covers.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000006-add_app_histories.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000007-add_app_languages.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000008-add_app_reviews.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000009-add_sliders.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000010-add_slider_items.js
NODE_ENV=production npx sequelize db:seed --seed 20240901000011-add_app_category_slider_items.js
NODE_ENV=production npx sequelize db:seed --seed 20241026000015-add_wallets.js
NODE_ENV=production npx sequelize db:seed --seed 20241026000020-add_task_categories.js
NODE_ENV=production npx sequelize db:seed --seed 20241026000030-add_tasks.js


# MIGRATION

npx sequelize-cli db:migrate --env production
npx sequelize-cli db:migrate --to 00000000000000-sample.js --env production
npx sequelize-cli db:migrate --to 20241025231113-add-columns-to-users.js --env production


TEST:

  npm run test
  npm run test -- test/20240416114200_register.test.js
