const { DateTime } = require('luxon');
const { config } = require('dotenv');
config();
import crypto from 'crypto';

// ADDRESSES
export const EXCHANGE = process.env.ADDRESS_EXCHANGE;
export const OWNERSHIP = process.env.ADDRESS_OWNERSHIP;

// ENDPOINTS
export const THOR_URL = process.env.THOR_URL;

export const VIM_API_URL =
  process.env.VIM_API_URL || 'https://data.8hoursfoundation.org/metadata/';

export const CURRENCY_API_URL =
  process.env.CURRENCY_API_URL ||
  'https://www.bitrue.com/api/v1/ticker/price?symbol=';

export const headers = {
  'CF-Access-Client-ID': 'a520834e8c7d294a320e87254ee95c83.access',
  'CF-Access-Client-Secret':
    '68ae7019269694aa4834c9cc004801c8504a8ef89f36794ca3a59942f9765887',
};

// Mongo Database URL
//export const DB_URL = process.env.DB_URL || 'mongodb://admin:admin123@ds054999.mlab.com:54999/vim-test';
//export const DB_URL = process.env.DB_URL || 'mongodb+srv://vimuser-1:vimworldisok123@vimworldserver-1.a0xjf.mongodb.net/vimworld-database';
//export const DB_URL = process.env.DB_URL ? process.env.DB_URL : "mongodb://mongo:27017/vimworld-database";
export const DB_URL = process.env.DB_URL
// Token to sign JWT with
export const SECRET = process.env.SECRET || 'secret@vimtoken';



// From vim-interface-web repo files (need a way to reference these directly from backend repo)

export const addresses = {
  vtho: process.env.REACT_APP_VTHO_CONTRACT,
  ehrt: process.env.REACT_APP_EHrT_CONTRACT,
  ownership: process.env.REACT_APP_OWNERSHIP_CONTRACT,
  nestedTokens: process.env.REACT_APP_NESTED_CONTRACT,
  old_tier: process.env.REACT_APP_OLD_TIER_CONTRACT,
  exchange: process.env.REACT_APP_EXCHANGE_CONTRACT,
  dispenser: process.env.REACT_APP_DISPENSER_CONTRACT,
  redemption: process.env.REACT_APP_REDEMPTION_CONTRACT,
  vimvsvim: process.env.REACT_APP_VIMVSVIM_CONTRACT,
  colored: process.env.REACT_APP_COLORED_CONTRACT,
  fetcher: process.env.REACT_APP_FETCHER_CONTRACT,
  tier: process.env.REACT_APP_TIER_CONTRACT,
  legacyToNewTier: process.env.REACT_APP_LEGACY_TO_NEW_CONTRACT,
  tierUpgrader: process.env.REACT_APP_TIER_UPGRADER_CONTRACT,
  marketplace: process.env.REACT_APP_MARKETPLACE_CONTRACT,
}

export const tierMap = {
  '0': 'F',
  '1': 'E',
  '2': 'D',
  '3': 'C',
  '4': 'B',
  '5': 'A',
  '6': 'S',
}

export const tierColorMap = {
  '0': '#a2a9c8',
  '1': '#9088f7',
  '2': '#684bff',
  '3': '#4d008c',
  '4': '#e149b2',
  '5': '#2fedb7',
  '6': '#7554e2',
}

// caching mechanism


export class LocalDBCache {
  public static m_maxCacheAgeInHours: Number = process.env.NODE_ENV_VIM_INTERFACE_SERVER_CACHE_AGE_IN_HOURS ? Number(process.env.NODE_ENV_VIM_INTERFACE_SERVER_CACHE_AGE_IN_HOURS) : 12;

  public static compareCacheAge(olderDate: Date, newerDate: Date): Boolean {
    let dtOlder = olderDate ? DateTime.fromISO(olderDate.toISOString()) : DateTime.fromISO(newerDate.toISOString()); // set it to newer date if undefined
    let dtNewer = DateTime.fromISO(newerDate.toISOString());

    let diffInHours = dtNewer.diff(dtOlder).as('hours');

    if (diffInHours >= LocalDBCache.m_maxCacheAgeInHours) return false; // refresh cache....no longer valid

    return true; // we return true if the cache can still be used
  }

}

// log level
export const LOG_LEVEL = process.env.LOG_LEVEL !== undefined ? process.env.LOG_LEVEL : 'debug'; // choices are debug or error - used in winston logger

// session ID
//export const SESSION_ID = process.env.SESSION_ID === undefined ? crypto.createHash('md5').update(new Date().toISOString()).digest('hex') : process.env.SESSION_ID;
//export const SESSION_ID = crypto.createHash('md5').update(new Date().toISOString()).digest('hex');

export const CLOUDWATCH_LOG_GROUP_NAME = process.env.CLOUDWATCH_LOG_GROUP_NAME !== undefined ? process.env.CLOUDWATCH_LOG_GROUP_NAME : 'vim-interface-server-logs';
// AWS
export const AWS_REGION = process.env.AWS_REGION;

// Vechain load balancer error text
export const VECHAIN_LB_ERROR_TEXT = "400 post accounts/*: revision: leveldb: not found";
