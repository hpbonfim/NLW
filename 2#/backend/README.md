# BACKEND

  <center>
    <a href="https://github.com/hpbonfim/website#readme">
    <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"/>
    </a>
    <img src="https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint" />
    <img src="https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb" />
    <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"/>
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/hpbonfim/NLW/2#/backend/"/>
    <img alt="size" src="https://img.shields.io/github/repo-size/hpbonfim/NLW/2#/backend/"/>
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/hpbonfim/NLW/2#/backend/">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="https://github.com/hpbonfim/NLW/2#/backend/#readme" />
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="https://github.com/hpbonfim/NLW/2#/backend/#readme" />
</center>
<center>    
<a href="">
        <img src="https://insomnia.rest/images/run.svg"/>
    </a>
</center>

Responsible for provide data to the [`web`](https://github.com/hpbonfim/NLW/2#/frontend) and [`mobile`](https://github.com/hpbonfim/NLW/2#/mobile) front-ends. Permit to register your class availability and subject, also count the number of teacher connected to users (get contacted by whatsapp). The app has validation and a simple versioning was made.

## Table of Contents
* [Installing](#installing)
  * [Configuring](#configuring)
    * [SQLite](#sqlite)
      * [Migrations](#migrations)
    * [.env](#env)
* [Usage](#usage)
  * [Versioning](#versioning)
  * [Routes](#routes)
    * [Requests](#requests)

# Installing backend
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
The application use just one database: [SQLite](https://www.sqlite.org/index.html).

### SQLite
Store the NGOs and its incidents. For more information to how to setup your database see:
* [knexfile.ts](http://knexjs.org/#knexfile)
> You can find the application's `knexfile.ts` file in the root folder.

#### Migrations
Remember to run the SQLite database migrations:
```
$ yarn knex:migrate
```
Or:
```
$ npx knex migrate:latest
```
> See more information on [Knex Migrations](http://knexjs.org/#Migrations).

### .env
In this file you may configure your app's port. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

|key|description|default
|---|---|---
|API_PORT|Port number where the app will run.|`3030`

# Usage
To start up the app run:
```
$ yarn dev:server
```
Or:
```
npm run dev:server
```

## Versioning
A simple versioning was made. Just remember to set after the `host` the `/v1/` string to your requests.
```
GET http://localhost:3030/v1/classes
```

## Routes
|route|HTTP Method|params|description
|:---|:---:|:---:|:---:
|`/connections`|GET|`week_day`, `from` and `to` query parameters.|Lists connections total.
|`/connections`|POST|Body with `user_id`.|Increase the number of connections.
|`/classes`|GET|`page` query parameter.|Lists classes available.
|`/classes`|POST|Body with class `subject`, `cost`, user `name`, `avatar`, `whatsapp`, `bio` and class schedule `schedule.week_day`, `schedule.from`, `schedule.to`.|Create new class availability.

### Requests
* `POST /connections`

Request body:
```json
{
  "user_id": "98765"
}
```

* `POST /classes`

Request body:
```json
{
  "name": "John Doe da Silva",
  "avatar": "https://avatars2.githubusercontent.com/u/15165349?s=460&u=1013eaaceb8a54984f7f77bc21812ad68f6ef526&v=4",
  "whatsapp": "09887664213",
  "bio": "Thats me and I love do something",
  "cost": 50,
  "subject": "Node.js",
  "schedule": [
    {
      "week_day": 1,
      "from": "3:00",
      "to": "13:00"
    },
    {
      "week_day": 4,
      "from": "8:00",
      "to": "19:00"
    }
  ]
}
```
