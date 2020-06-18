const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router');

const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname + '/../public')));
app.use('/reviews', router);

app.listen(port, () => console.log(`Review Modules app listening at http://localhost:${port}`));