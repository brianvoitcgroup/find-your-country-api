const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
require('express-async-errors');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/countries', require('./controllers/countries'));
app.use('/api/comments', require('./controllers/comments'));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
