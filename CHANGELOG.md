## [1.12.5](https://github.com/mentumm/mentumm-ts-api/compare/v1.12.4...v1.12.5) (2023-10-01)


### Bug Fixes

* **tsconfig/knex:** fixing broken knexfile imports, tsconfig ([#142](https://github.com/mentumm/mentumm-ts-api/issues/142)) ([9a85e4b](https://github.com/mentumm/mentumm-ts-api/commit/9a85e4bf0506f406959674be1eb82ddc38ef0dc8))

## [1.12.4](https://github.com/mentumm/mentumm-ts-api/compare/v1.12.3...v1.12.4) (2023-10-01)


### Bug Fixes

* **coaches/users:** Add error handling for users and coaches route ([#140](https://github.com/mentumm/mentumm-ts-api/issues/140)) ([d113f71](https://github.com/mentumm/mentumm-ts-api/commit/d113f710153f330bbb00a58bebb2c929be44c399))

## [1.12.3](https://github.com/mentumm/mentumm-ts-api/compare/v1.12.2...v1.12.3) (2023-09-29)


### Bug Fixes

* **release token:** updated token with hopefully the correct permissions ([#136](https://github.com/mentumm/mentumm-ts-api/issues/136)) ([d872062](https://github.com/mentumm/mentumm-ts-api/commit/d8720627cf05acefa9df5e0f1c6352dd4a3c6638))

## [1.12.2](https://github.com/mentumm/mentumm-ts-api/compare/v1.12.1...v1.12.2) (2023-09-29)


### Bug Fixes

* **release:** modified release file again for most up to date versions ([#134](https://github.com/mentumm/mentumm-ts-api/issues/134)) ([c255c7f](https://github.com/mentumm/mentumm-ts-api/commit/c255c7f974da56717898bd9a762da8ae3823b4de))

## [1.12.1](https://github.com/mentumm/mentumm-ts-api/compare/v1.12.0...v1.12.1) (2023-09-29)


### Bug Fixes

* **release:** typo, [#132](https://github.com/mentumm/mentumm-ts-api/issues/132) ([d19d993](https://github.com/mentumm/mentumm-ts-api/commit/d19d993f32aa7082b437f23172d3d8b909403ce9))
* **release:** updated release file to properly back merge from main to develop ([03e6233](https://github.com/mentumm/mentumm-ts-api/commit/03e6233c2f8d4907e142ba6d311c9b5a54f0bf3e))

# [1.12.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.11.1...v1.12.0) (2023-09-19)


### Features

* **booking:** remove dupe event ([#124](https://github.com/mentumm/mentumm-ts-api/issues/124)) ([d646a65](https://github.com/mentumm/mentumm-ts-api/commit/d646a654b4ed9cfcbc5d8abe901222831a11f09b))

## [1.11.1](https://github.com/mentumm/mentumm-ts-api/compare/v1.11.0...v1.11.1) (2023-09-18)


### Bug Fixes

* **Users/Coaches:** added route validation for test accounts; MEN-209 ([#126](https://github.com/mentumm/mentumm-ts-api/issues/126)) ([88b343b](https://github.com/mentumm/mentumm-ts-api/commit/88b343bff5d6cc428ce0a67a20d2529792ef8bf2))

# [1.11.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.10.2...v1.11.0) (2023-09-18)


### Features

* **coach/user:** modify create+update for coach+user for retool upgrade; MEN-205 ([#123](https://github.com/mentumm/mentumm-ts-api/issues/123)) ([83b15d0](https://github.com/mentumm/mentumm-ts-api/commit/83b15d00e0f3d7e3a6984e18b62520333d898df2))

## [1.10.2](https://github.com/mentumm/mentumm-ts-api/compare/v1.10.1...v1.10.2) (2023-09-08)


### Bug Fixes

* **search:** ensure no coach test accounts appear on search; MEN-199 ([#121](https://github.com/mentumm/mentumm-ts-api/issues/121)) ([9939352](https://github.com/mentumm/mentumm-ts-api/commit/99393528defe6dc140f4f0f362aa80bdf77d7cbe))

## [1.10.1](https://github.com/mentumm/mentumm-ts-api/compare/v1.10.0...v1.10.1) (2023-08-30)


### Bug Fixes

* **node:** adjusted node version in package.json to comply with Render ([#119](https://github.com/mentumm/mentumm-ts-api/issues/119)) ([67dadb9](https://github.com/mentumm/mentumm-ts-api/commit/67dadb9e75f83293f018d7bb74e6ff827a4b3d7d))

# [1.10.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.9.1...v1.10.0) (2023-08-30)


### Bug Fixes

* **search:** query builder order of operations for coach search; MEN-182 ([#116](https://github.com/mentumm/mentumm-ts-api/issues/116)) ([201a5e9](https://github.com/mentumm/mentumm-ts-api/commit/201a5e91f29e28412fb8c123fdfc8ae05fac094e))


### Features

* **coach:** coach registration; Men-184 ([#117](https://github.com/mentumm/mentumm-ts-api/issues/117)) ([265da9b](https://github.com/mentumm/mentumm-ts-api/commit/265da9b99eaa2a759ec35c40f06e609e46288613))

## [1.9.1](https://github.com/mentumm/mentumm-ts-api/compare/v1.9.0...v1.9.1) (2023-08-11)


### Bug Fixes

* **database:** remove empty strings achievements hobbies; MEN-179 ([#111](https://github.com/mentumm/mentumm-ts-api/issues/111)) ([8f30df2](https://github.com/mentumm/mentumm-ts-api/commit/8f30df2550216a9edfbcc1b2dd71146feba78af8))

# [1.9.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.8.0...v1.9.0) (2023-08-07)


### Features

* **user:** created migration to split location data to city, state; MEN-169 ([b0925a0](https://github.com/mentumm/mentumm-ts-api/commit/b0925a0443118d4b428d7f125b6e46e6b3206088))
* **users:** add is_test column to users table to hide test accounts; MEN-165 ([664c978](https://github.com/mentumm/mentumm-ts-api/commit/664c978768770da03363d37aeba5700e2e62edd6))

# [1.8.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.7.0...v1.8.0) (2023-07-12)


### Bug Fixes

* **reset-password:** Allow reset password links to work on staging ([0b7c706](https://github.com/mentumm/mentumm-ts-api/commit/0b7c70644b5ca187bcb0784b504096397c6fb796))
* **user-service:** Allow emails in staging to point to correct render url ([6d45073](https://github.com/mentumm/mentumm-ts-api/commit/6d4507393bf286e9784bbfd1e69b585bc8dc7316))


### Features

* **profile:** edit and save password, men-71 ([#102](https://github.com/mentumm/mentumm-ts-api/issues/102)) ([2052dbb](https://github.com/mentumm/mentumm-ts-api/commit/2052dbb4f26a7d30d0928f2de5e384698b1c35c1))
* **users:** [MEN-36] Implement Forgot Password & New User Emails ([#105](https://github.com/mentumm/mentumm-ts-api/issues/105)) ([ff768e0](https://github.com/mentumm/mentumm-ts-api/commit/ff768e053d759bb0031a8284d931f5c70913ca5a))

# [1.7.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.6.0...v1.7.0) (2023-05-23)


### Features

* **coaches:** migration and new fields for coach edit, men-54 ([#98](https://github.com/mentumm/mentumm-ts-api/issues/98)) ([f701f99](https://github.com/mentumm/mentumm-ts-api/commit/f701f99727ab239ca2cfbc9baadd7f9932928763))

# [1.6.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.5.0...v1.6.0) (2023-05-12)


### Features

* **be:** [MEN-127] New Workshops Page ([9d9b0ef](https://github.com/mentumm/mentumm-ts-api/commit/9d9b0ef1953bc133002177fdd56506996890dc79))

# [1.5.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.4.3...v1.5.0) (2023-05-10)


### Features

* **tags:** Consolidate Style Types into Tags ([ce728aa](https://github.com/mentumm/mentumm-ts-api/commit/ce728aa43f202f9c70c29e9d37df1fffadecf041))

## [1.4.3](https://github.com/mentumm/mentumm-ts-api/compare/v1.4.2...v1.4.3) (2023-04-11)


### Bug Fixes

* **users:** [MEN-117] Fix last_sign_in getting set for all users ([bba3c2f](https://github.com/mentumm/mentumm-ts-api/commit/bba3c2ffc0fc75ed1a3d375dea504f1d059971c7))

## [1.4.2](https://github.com/mentumm/mentumm-ts-api/compare/v1.4.1...v1.4.2) (2023-04-05)


### Bug Fixes

* **coaches:** Hotfix deleted coaches still showing ([fbdfc94](https://github.com/mentumm/mentumm-ts-api/commit/fbdfc947826efea8aa17c0f5520a62ad15508aa8))

## [1.4.1](https://github.com/mentumm/mentumm-ts-api/compare/v1.4.0...v1.4.1) (2023-04-05)


### Bug Fixes

* **coaches:** [MEN-113] Fix Deleted Coaches Showing In Search ([bded479](https://github.com/mentumm/mentumm-ts-api/commit/bded47917f2b369ffcfc18668b464f372d1e8477))

# [1.4.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.3.0...v1.4.0) (2023-03-28)


### Bug Fixes

* **action plans:** remove 404 to fix front end error, men-87 ([#85](https://github.com/mentumm/mentumm-ts-api/issues/85)) ([414a1c8](https://github.com/mentumm/mentumm-ts-api/commit/414a1c8410cea4d80f6e5547827fa731927842ee))
* **ts:** adjust config to keep knexfile from erroring in db setup ([4acac86](https://github.com/mentumm/mentumm-ts-api/commit/4acac8675ac66f8d2d9f1d5130e3e8e5e416cdc7))


### Features

* **action plans:** action plan CRUD routes, men-81 ([#80](https://github.com/mentumm/mentumm-ts-api/issues/80)) ([17064db](https://github.com/mentumm/mentumm-ts-api/commit/17064db616bd1f1d6f5362100811134e6d4321c8))
* **api:** [#MEN-63] Add Style Types API ([9675d0d](https://github.com/mentumm/mentumm-ts-api/commit/9675d0dab99adbeb083671bd6ffedd44eb1aaf1a)), closes [#MEN-63](https://github.com/mentumm/mentumm-ts-api/issues/MEN-63)
* **coachReview:** add coach review routes, update db columns, men-40 ([#70](https://github.com/mentumm/mentumm-ts-api/issues/70)) ([c17beb5](https://github.com/mentumm/mentumm-ts-api/commit/c17beb55fbc2af04cfa7b583a587bf2df4e2ed7e))
* **database:** [MEN-63] allow saving of style types for users ([90084ac](https://github.com/mentumm/mentumm-ts-api/commit/90084acdffc6ba4d97ca8346dc89ac6d8c79b539))
* **styles:** new tables and seeds to create coaching styles, men-78 ([#78](https://github.com/mentumm/mentumm-ts-api/issues/78)) ([1146a6a](https://github.com/mentumm/mentumm-ts-api/commit/1146a6a5433ecb5cedcb18e96ca82799d4fec164))
* **tags:** add category column to tag ([#71](https://github.com/mentumm/mentumm-ts-api/issues/71)) ([737f66a](https://github.com/mentumm/mentumm-ts-api/commit/737f66ab78719e995b2c5d93e782c552b776a184))

# [1.3.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.2.0...v1.3.0) (2022-09-13)


### Features

* **coachTag:** add update/delete routes, men-32, men-33 ([#68](https://github.com/mentumm/mentumm-ts-api/issues/68)) ([52e7475](https://github.com/mentumm/mentumm-ts-api/commit/52e7475d5fed84abdd3dda6563f140ba97b78a71))

# [1.2.0](https://github.com/mentumm/mentumm-ts-api/compare/v1.1.0...v1.2.0) (2022-09-13)


### Features

* **ratings:** add ratings table, men-17 ([#63](https://github.com/mentumm/mentumm-ts-api/issues/63)) ([bc53c51](https://github.com/mentumm/mentumm-ts-api/commit/bc53c51b213b81bf251e70e1b2013f4fbadce72b))
* **tags:** add delete tag route w/adding cascade, men-24 ([#66](https://github.com/mentumm/mentumm-ts-api/issues/66)) ([6e2e311](https://github.com/mentumm/mentumm-ts-api/commit/6e2e31123eb338871105240a55e3abaa85e6c0fb))

# [1.1.0](https://github.com/denvermullets/mentumm-ts-api/compare/v1.0.0...v1.1.0) (2022-08-30)


### Features

* **tags:** add edit tag route, men-22 ([6030612](https://github.com/denvermullets/mentumm-ts-api/commit/60306125339c4e85b0aaa19877e244bd442f73dc))
* **tags:** add update Tag route/service, men-23 ([6f82aec](https://github.com/denvermullets/mentumm-ts-api/commit/6f82aec9e845cbe36ef735751d71128b342577c7))

# 1.0.0 (2022-08-03)


### Bug Fixes

* **build:** add clean command ([deb8ebb](https://github.com/denvermullets/growth-ts-api/commit/deb8ebb001573ccb87b40e6f13e7473fc872be21))
* **cors:** fix public whitelist ([b916b4f](https://github.com/denvermullets/growth-ts-api/commit/b916b4fc19f16d98658d0bd099b895f6a2cd50c8))
* **knex:** add ssl to connection string ([4323010](https://github.com/denvermullets/growth-ts-api/commit/432301031546d056fe5eda108b13626bda2d6e5d))
* **knex:** trying to fix render knex timeout issue ([#49](https://github.com/denvermullets/growth-ts-api/issues/49)) ([0c13c4a](https://github.com/denvermullets/growth-ts-api/commit/0c13c4a2ad6228c5470ec5f9aac66bc87d3fd9fd))
* **knex:** update knex default timeout ([#47](https://github.com/denvermullets/growth-ts-api/issues/47)) ([603d962](https://github.com/denvermullets/growth-ts-api/commit/603d9627efbea0bed5e5439a48e45b860d035ef3))
* **knex:** update knex prod variable to prevent crash w/render ([5eedf34](https://github.com/denvermullets/growth-ts-api/commit/5eedf34cc33a3d904a50a2d7a27386ab2d3abaaf))
* **logs:** remove console.logs ([#51](https://github.com/denvermullets/growth-ts-api/issues/51)) ([6dd5588](https://github.com/denvermullets/growth-ts-api/commit/6dd55884a570ff706d30fa19a46626d2a294c0db))
* **package.json:** remove migrate command ([f23fc59](https://github.com/denvermullets/growth-ts-api/commit/f23fc5968f89cf11a39025dbe16fc6b47ded5d1c))
* **package.json:** try to add migration command ([b5c62d3](https://github.com/denvermullets/growth-ts-api/commit/b5c62d3647240ac3c89a1b22225221337f20f71b))
* **package.json:** update repo name/url ([#61](https://github.com/denvermullets/growth-ts-api/issues/61)) ([4a58cec](https://github.com/denvermullets/growth-ts-api/commit/4a58cec882041f03bd398917fbb22b1c68c01606))
* **readme:** update readme ([9984601](https://github.com/denvermullets/growth-ts-api/commit/9984601273655dc3104ebc93051a076be1066a81))
* **tags:** remove comments ([86ceb70](https://github.com/denvermullets/growth-ts-api/commit/86ceb70b62f65687308a0e50dd1874a33e21cb50))
* **tags:** remove nullable description, for real this time ([#39](https://github.com/denvermullets/growth-ts-api/issues/39)) ([e7904c7](https://github.com/denvermullets/growth-ts-api/commit/e7904c7ef44fcab9862c51beec61c185ab9abd1c))
* **tags:** remove required description ([#37](https://github.com/denvermullets/growth-ts-api/issues/37)) ([fcc2471](https://github.com/denvermullets/growth-ts-api/commit/fcc247111ecab3009c7b52b3bb90dbe95bfacf98))
* **users:** update users service so retool can update/create users, mtm-90 ([6fe5adb](https://github.com/denvermullets/growth-ts-api/commit/6fe5adbde286a96528972228b0268b7d88c7b36f))
* **yarn:** update build command ([4dbeb02](https://github.com/denvermullets/growth-ts-api/commit/4dbeb02c5f324191d4a7c290f02c05445bb163f0))


### Features

* **bookings:** add route for user coach booking, g10-59 ([#35](https://github.com/denvermullets/growth-ts-api/issues/35)) ([c6579b0](https://github.com/denvermullets/growth-ts-api/commit/c6579b0710f9c99b98b7f039e99b4658139c6a1b))
* **coaches:** add coach routes, g10-12 ([#5](https://github.com/denvermullets/growth-ts-api/issues/5)) ([06fa9e2](https://github.com/denvermullets/growth-ts-api/commit/06fa9e2445e30773c29cd71ab6b3721514b077bf))
* **coach:** join tags on coach response by id/name ([#33](https://github.com/denvermullets/growth-ts-api/issues/33)) ([29a16aa](https://github.com/denvermullets/growth-ts-api/commit/29a16aa9eb29e7bda565c55da83a9f12585d1d28))
* **coachTags:** add bulk import route ([#45](https://github.com/denvermullets/growth-ts-api/issues/45)) ([d88a711](https://github.com/denvermullets/growth-ts-api/commit/d88a7116f83bb35c7f9434809d0f094624096c4b))
* **database:** configure database/knex connection ([7bc9a22](https://github.com/denvermullets/growth-ts-api/commit/7bc9a226fbd72e5753f32807eab3616e5865c6a6))
* **database:** create tables, update knex ([7bae022](https://github.com/denvermullets/growth-ts-api/commit/7bae022179678ecd134298635bfb0f807eb60905))
* **employers:** add update route for employers ([56bfcca](https://github.com/denvermullets/growth-ts-api/commit/56bfccabd55aadab5c4f278980abf48d87deac18))
* **employers:** create route w/create/delete/find, g10-11 ([f7915df](https://github.com/denvermullets/growth-ts-api/commit/f7915dfe465e50a754722fa2037d2460788f05ba))
* **limit:** set default limit to 100 ([#43](https://github.com/denvermullets/growth-ts-api/issues/43)) ([b4c3a9f](https://github.com/denvermullets/growth-ts-api/commit/b4c3a9fdc08824a85ddbaa983baef5e31c6f7bd4))
* **mixpanel:** update mixpanel for registration and bookings ([#41](https://github.com/denvermullets/growth-ts-api/issues/41)) ([fc57543](https://github.com/denvermullets/growth-ts-api/commit/fc57543c7a1f7041a8b8661eba3e7517c16efbc5))
* **routes:** allow for all records to be returned with a limit ([#20](https://github.com/denvermullets/growth-ts-api/issues/20)) ([7563082](https://github.com/denvermullets/growth-ts-api/commit/7563082acd3e15f7495276648dfdffab911986fa))
* **setup:** first commit ([bcc5c5b](https://github.com/denvermullets/growth-ts-api/commit/bcc5c5b40a1075bc44e02267b3c4e68672cec1dc))
* **tags:** add tags routes, update migrations, update limit req ([e9fe1bc](https://github.com/denvermullets/growth-ts-api/commit/e9fe1bca081fd0c63fd647e0e1b5796c5451e41d))
* **tags:** find coaches w/related tags by searching tag slug ([75d8b64](https://github.com/denvermullets/growth-ts-api/commit/75d8b6449406731e83cc10fd94c5fcec4728d673))
* **tags:** tags db migration ([11a05f3](https://github.com/denvermullets/growth-ts-api/commit/11a05f3ced9dda851222a0d659a2c1a80c3db9f8))
* **user:** new user registration route/service ([#31](https://github.com/denvermullets/growth-ts-api/issues/31)) ([2aa912a](https://github.com/denvermullets/growth-ts-api/commit/2aa912a7d46fabcea5606ab25ae0bc1ec3ff9f24))
* **users:** add login route ([0a103f6](https://github.com/denvermullets/growth-ts-api/commit/0a103f632c57214a193d081edc35ff9c1fe8bde6))
* **users:** add password for new user signin ([5a7cd3c](https://github.com/denvermullets/growth-ts-api/commit/5a7cd3cb91ca234223b2885baeb5d4fdb9366af5))
* **users:** add users routes, g10-8 ([#4](https://github.com/denvermullets/growth-ts-api/issues/4)) ([5406c4d](https://github.com/denvermullets/growth-ts-api/commit/5406c4d58bebdb4037213029fc3e904ef568488a))
* **users:** split name into first and last, mtm-89 ([#53](https://github.com/denvermullets/growth-ts-api/issues/53)) ([f49eb05](https://github.com/denvermullets/growth-ts-api/commit/f49eb05a04b550e570d7841bb1b7b45f725f30ee))
* **users:** update new user registration to account for first/last name ([#54](https://github.com/denvermullets/growth-ts-api/issues/54)) ([bc08bd4](https://github.com/denvermullets/growth-ts-api/commit/bc08bd490c179e0a1a9b83680b89f8506ebf622e))
* **workflow:** setup semantic / add slack ([#58](https://github.com/denvermullets/growth-ts-api/issues/58)) ([e2b2767](https://github.com/denvermullets/growth-ts-api/commit/e2b2767f9db6dbb383481e8491adacdcb21ba4f5))
