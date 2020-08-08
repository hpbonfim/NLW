# [App] Proffy
<p align=center>
    <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"/>
    <img src="https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint" />
    <img src="https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb" />
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="https://github.com/hpbonfim/NLW/tree/master/2%23/backend" />
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="https://github.com/hpbonfim/NLW/tree/master/2%23/backend" />
</p>

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
    * [.env](#env)
    * [API](#api)
* [Usage](#usage)
  * [Expo](#expo)
  * [OS](#os)

# Installing
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
API_URL|API's url with version (v1)|`http://localhost:3030/v1`

### API
Start the [`API`](../backend) (see its README for more information). In case of any change in the API's port or host remember to update the `env`'s `API_URL` property too.
> Also, maybe you need run reverse command to the API's port: `adb reverse tcp:3030 tcp:3030`

# Usage
To start the app run:
```
$ npm run start
```
> This project was built with [Expo](https://expo.io), to know how to run it in your phone see [Expo client for iOS and Android](https://docs.expo.io/versions/v37.0.0/get-started/installation/#2-mobile-app-expo-client-for-ios) and in your computer see [Running the Expo client on your computer](https://docs.expo.io/versions/v37.0.0/get-started/installation/#running-the-expo-client-on-your-computer).

## OS
This app was tested only with Android through USB connection and [Genymotion](https://www.genymotion.com/) (Emulator), is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.
