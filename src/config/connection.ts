const mongoose = require('mongoose');
const models = require('../models');
import logger from '../log/logger';

import { DB_URL } from './config';

// We need to define the URL

mongoose.set('useCreateIndex', true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
logger.info(`Connecting to DB at ${DB_URL}`);
//Connection establishment
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', () => {
    logger.error(`Error occured in db connection to ${DB_URL}`);
});

db.on('open', () => {
    logger.info(`DB Connection to ${DB_URL} established successfully`);
});
