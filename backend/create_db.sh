#!/bin/bash
rm -r src/database/database.sqlite &&
npm run knex:migrate &&
npm run knex:seed