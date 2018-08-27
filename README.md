# daikin-usa

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Run your end-to-end tests
```
yarn run test:e2e
```

# Mobile

## Setup for all platforms

You need to [set up the cordova development environment](https://cordova.apache.org/docs/en/latest/guide/cli/index.html) beforehand.

```sh
$ npm run cordova-build   # make sure you can build your project
$ cordova prepare         # prepare cordova resources
```

NOTE: On Windows, admin authority requires to run `vue add cordova` command.
So that symlinks can be generated properly.

## Browser Platform

#### Start development
```sh
$ npm run cordova-serve
# open http://localhost:8080
```

#### Production Build
```sh
$ npm run cordova-build
$ cordova build browser
# The `platforms/browser/www` directory is ready to deployed.
```

## iOS Platform
- Your app runs on the WKWebview. This feature is provided by [cordova-plugin-ionic-webview](https://github.com/ionic-team/cordova-plugin-ionic-webview).


#### Init Configuration

* Open project in Xcode `daikin-usa/platforms/ios/DaikinUSA.xcodeproj`.
* Select main folder `DaikinUSA` in left bar.
* In Bundle Identifier, rename it with your account name.
* In signing section, select your team o create it.
* Launch app.

Verify the Developer App certificate for your account is trusted on your device.
* Open Settings on iPhone and navigate to General -> Device Management.
* Then select your Developer App certificate to trust it.


#### Generate custom icons and splash screens

```sh
ionic cordova resources
```

#### Start development
```sh
$ npm run cordova-serve

# in another tab
$ cordova run ios
```

#### Production Build
```sh
$ npm run cordova-build
$ cordova build ios
```

## Android Platform

#### Start development
```sh
$ npm run cordova-serve

# in another tab
$ cordova run android
```

#### Production Build
```sh
$ npm run cordova-build
$ cordova build android
```
