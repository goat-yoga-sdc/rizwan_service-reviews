# Reviews-module

> Inherited the front-end replica of the legacy codebase for Glossier's review micro service. Inserted 10 million products and 25 million reviews for database benchmark testing between mongo and postgres. Optimized query time under 5ms with postgres as main database. Designed a system to hit a throughput of 2250 RPS, while maintaining an average latency of 95ms and 0.0% error rate.

## Related Projects

- https://github.com/goat-yoga-sdc/kimberly-service
- https://github.com/goat-yoga-sdc/wilson_service
- https://github.com/goat-yoga-sdc/russell-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

1. Install Dependencies & Front-End Transpilation

```sh
npm install
npm run build
```

2. Create postgreSQL credential file

```sh
cd db/postgreSQL
touch credentials.js
vim credentials.js  *vim/sudo nano, or other text editor of choice
```

3. Paste Snippet Below and Update in credentials.js

```sh
module.exports = {
  username: "Your Postgres Username here",
  password: "Your Postgres Password here"
};
```

4. Create Schema

```sh
log into psql shell with your credentials
go to `db` => `postgreSQL` => `seeds` => open `schema.sql`.
copy and paste all lines from `schema.sql` into psql shell.
```

5. Generate Data

```sh
npm run generate-products
npm run generate-reviews
```

Note: Computer intensive process. Run 1 script at a time.

6. Insert Data into Database & Create Indices

```sh
npm run seed-products
npm run seed-reviews
npm run create-indices
```

Note: Computer intensive process. Run 1 script at a time.

7. Start Server

```sh
npm run start
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Download PostgreSQL via `https://postgresapp.com/`. (Start psql server once downloaded)

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Notes

For code of Implementating database via Mongo

```sh
1. go to 2DBs branch of this repository
2. go to db => mongoDB folder.  // this folder contains the model that queries and connects to the database
3. go to server => routers => mongoRouter.js or mongoController.js. //this files contains the router and controller that points to the model
```
