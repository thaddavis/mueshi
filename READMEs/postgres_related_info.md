# TLDR

Useful PostgreSQL related info

##

https://authjs.dev/getting-started/adapters/prisma

##

- https://hub.docker.com/_/postgres
- docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

- psql -h 0.0.0.0 -p 5432 -U postgres

## Setup

- npx prisma generate
  - had to populate the `schema.prisma` file
- set up a PostgreSQL db in Docket
  - psql -h 0.0.0.0 -p 5432 -U postgres
  - CREATE DATABASE mueshi_music;
- run initial migration
  - npm exec prisma migrate dev √

## Running a migration

- update the `schema.prisma` with desired changes
- run the migration
  - ie: prisma migrate dev --name add_password_to_user

## Prisma docs

- https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction#3-importing-prisma-client

## Seeding the db with data

- STEP 1
  - mkdir prisma && touch prisma/seed.ts
    - populate with seeding code
  - npm i -D ts-node typescript @types/node
  - add key to root of `package.json`

```
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```
