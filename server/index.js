const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const reviewsRouter = require('./reviews/reviewsRouter');
const usersRouter = require('./users/usersRouter');

const mongoRouter = require('./routers/mongoRouter.js);

const app = express();
const port = 3010;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/', express.static(path.join(`${__dirname}/../public`)));
app.use('/reviews', reviewsRouter);
// Users endpoint was created to be used for authorization, but currently not being used
app.use('/users', usersRouter);

app.use('/mongo', mongoRouter);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Reviews module app listening at http://localhost:${port}`));
