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


## Prisma docs

- https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction#3-importing-prisma-client