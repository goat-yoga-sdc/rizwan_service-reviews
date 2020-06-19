const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const reviewsRouter = require('./reviews/reviewsRouter');
const usersRouter = require('./users/usersRouter');

const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname + '/../public')));
app.use('/reviews', reviewsRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Reviews module app listening at http://localhost:${port}`));