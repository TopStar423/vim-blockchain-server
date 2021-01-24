import express from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import logger from './log/logger';
import { VIMServices } from './lib/vimcontracts';
import { THOR_URL, DB_URL, LOG_LEVEL } from './config/config';
import crypto from 'crypto';
import httpContext from 'express-http-context';

const app = express();



const rawBodySaver = function (req: any, res: any, buf: any, encoding: any) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json({ verify: rawBodySaver, limit: '5mb' }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true, parameterLimit: 100000, limit: '5mb' }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*', limit: '5mb' }));

// import mongoose from 'mongoose';
// const { priceListener } = require('./lib');
// const rateLimitPolicy = require('./lib/rateLimitPolicy');
// const passport = require('./middleware/passport');
import passport from './config/passport';
const apiKeyAuth = require("./middleware/apiKeyAuthMiddleware");

app.use(passport.initialize());
app.use(morgan('short'));
app.use(cors());
// app.use(rateLimitPolicy);
app.use(express.json());

// Adding a unique session ID to each request

app.use(httpContext.middleware);
// Run the context for each request. Assign a unique identifier to each request
app.use(function(req, res, next) {
    httpContext.set('reqId', crypto.createHash('md5').update(new Date().toISOString()).digest('hex'));
    next();
});

logger.initializeLogger();

// End adding unique session ID to each request

const PORT = process.env.NODE_ENV_VIM_INTERFACE_SERVER_PORT === undefined ? 3000 : process.env.NODE_ENV_VIM_INTERFACE_SERVER_PORT;

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "*");
  res.header('Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  next();
});

// logger
const myStream = {
  write: (text: string) => {
    logger.info(text);
  }
}
morgan.token('sessionid', function (req, res) { return httpContext.get('reqId')}); //req['sessionID'] });
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"  ["SESSION_ID :sessionid"]', { stream: myStream }));
//app.use(morgan('combined', { stream: myStream }));

require('./config/connection');

// VIMWorldRoutes
import { VIMWorldRoutes } from './routes/vimworldroutes';

// APIRoutes
import { APIRoutes } from './routes/api';

const APIEndpoints = new APIRoutes();
APIEndpoints.routes(app);
// end APIRoutes

// TiersRoutes
import { TiersRoutes } from "./routes/tiers";

const TiersEndpoints = new TiersRoutes();
TiersEndpoints.routes(app);
// end TiersRoutes

// PaymentRoutes
import { PaymentRoutes } from './routes/payment';

const PaymentEndpoints = new PaymentRoutes();
PaymentEndpoints.routes(app);
// end PaymentRoutes

// MarketplaceRoutes
import { MarketplaceRoutes } from "./routes/marketplace";

const MarketplaceEndpoints = new MarketplaceRoutes();
MarketplaceEndpoints.routes(app);
// end MarketplaceRoutes

// AdoptRoutes
import { AdoptRoutes } from "./routes/adopt";

const AdoptEndpoints = new AdoptRoutes();
AdoptEndpoints.routes(app);
// end AdoptRoutes

// SwaggerRoutes
import { SwaggerRoutes } from './routes/swagger';
import VIMWorldLogger from './log/logger';
const SwaggerEndpoints = new SwaggerRoutes();
SwaggerEndpoints.routes(app);

/*
// API Routes for User Authentication
app.use('/api/auth', auth);
// Secure API Routes only accessible when logged in

app.use(
  '/api/secure',
  passport.authenticate('auth', { session: false }),
  secure
);

// Public API Routes
app.use('/api', api)
 */
app.listen(PORT, async () => {
  logger.info(`Using ${THOR_URL} for fetching blockchain data`);

  try {
    await VIMServices.initialize(THOR_URL);
    logger.info(`Initialized blockchain resources against node running at ${THOR_URL}`);
    const VIMWorldAPIEndpoints = new VIMWorldRoutes();
    VIMWorldAPIEndpoints.routes(app);
    // end VIMWorldRoutes
  }
  catch (e) {
    logger.crit(`Error message from main handler: ${e.message}`);
    logger.crit(`Fatal error. Exiting.`);
    process.exit(1);
  }
  logger.info(`VIMWorld Backend server listening on port ${PORT}`);
  logger.info(`Mongo URL is: ${DB_URL}`);
  logger.info(`Using ${THOR_URL} for fetching blockchain data`);
  logger.info(`Using LOG_LEVEL as ${LOG_LEVEL}`);
  logger.info(`Threshold for stale cache (in hours) is ${process.env.NODE_ENV_VIM_INTERFACE_SERVER_CACHE_AGE_IN_HOURS}`);
})

