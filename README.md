# Reviews-module

A reviews module to be used as part of our 'Glossier' product page implementation

## Related Projects

  - https://github.com/Dumpling-Squad/nav-bar
  - https://github.com/Dumpling-Squad/product-description
  - https://github.com/Dumpling-Squad/suggested-items

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

Install Dependencies & Front-End Transpilation
```sh
npm install
npm run build
```

Create postgreSQL credential file
```sh
cd db/postgreSQL
touch credentials.js
vim credentials.js
```

Paste Snippet Below and Update in credentials.js
```sh
module.exports = {
  username: "Your Postgres Username here",
  password: "Your Postgres Password here"
};
```

Create Schema
log into psql shell with your credentials
go to `db` => `postgreSQL` => `seeds` => open `schema.sql`.
copy and paste all lines in `schema.sql` into psql shell.

Generate Data
```sh
npm run generate-products
npm run generate-reviews
```
Note: Computer intensive process. Run 1 script at a time.

Insert Data into Database & Create Indices
```sh
npm run seed-products
npm run seed-reviews
npm run create-indices
```
Note: Computer intensive process. Run 1 script at a time.

Start Server
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