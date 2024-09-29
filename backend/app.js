const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const centralErrorHandler = require('./middlewares/central-error-handler');
const path = require('path');

require('dotenv').config();

const { PORT = 3005 } = process.env;

const app = express();

app.disable('etag');

app.use(cors({
  origin: [
    'http://localhost:3005',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'img-src': ['*'],
    },
  },
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
// app.use(limiter);
app.use('/api', routes);
app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('*', (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, '../frontend/build')});
})

app.listen(PORT);
