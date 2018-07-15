import mongoose from 'mongoose';
import _ from 'lodash';
import app from './config/server';
import startup from './startup';
import log from './libs/logger';

global._ = _;

const port = process.env.PORT || 3000;
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

log.log();
log.note('Staring server');
db.once('open', () => {
  log.success('Established connection to database server');
  app.listen(port, () => {
    startup(port);
  });
});

db.on('error', (err) => {
  log.error('Unable to connect to database server');
  log.error(`${err.message}`);
  log.error('Server has been stopped');
});

log.info('Connecting to database');
mongoose.connect('mongodb://ds247007.mlab.com:47007/hackathon', {
  user: '3knull',
  pass: '3knull123',
  connectTimeoutMS: 30000,
});