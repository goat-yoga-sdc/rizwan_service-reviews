const nr = require('newrelic');
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const postgresRouter = require('./postgresRouter.js');

const app = express();
const port = 3010;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/', express.static(path.join(`${__dirname}/../public`)));

app.use('/reviews', postgresRouter);

app.listen(port, () =>
  console.log(`Reviews module app listening at http://localhost:${port}`)
);
