import { ownership, exchange } from './web3Provider';
import { compact } from 'lodash';
import { VIM_API_URL, headers, CURRENCY_API_URL } from '../config/config';
import { write } from './lowdb';
import request from 'request-promise';
import logger from '../log/logger';

let store: Record<number, any> = {};

const getBaseId = (uuid: any) => Math.floor(Number(uuid) / Math.pow(10, 9));

// Base function which runs every x seconds
export const listener = async () => {
  // Fetch total number of VIMs that exist
  const supply = Number(await ownership.methods.totalSupply().call());
  // Fetch all the UUIDs of the VIMs
  const uuidPromise = Array.from(Array(supply)).map(async (_d, i) => {
    if (i > 0) {
      return await ownership.methods.tokenByIndex(i).call();
    }
  });
  const uuids = compact(await Promise.all(uuidPromise));
  // Fetch the prices of each VIM and omit them if they're less than 0
  const listedPromise = uuids.map(async (d) => {
    const price = await exchange.methods
      .getListedPrice(d)
      .call()
      .catch(error=>{logger.error(error)});
    if (price && price != 0) {
      try {
        let vimData;
        if (!store[getBaseId(d)]) {
          const tokenData = await request(VIM_API_URL + d, {
            headers,
          }).catch((_e) => {});
          vimData = JSON.parse(tokenData);
          store[getBaseId(d)] = vimData;
        } else {
          vimData = store[getBaseId(d)];
        }

        return { ...vimData, price, uuid: d };
      } catch (e) {
        return undefined;
      }
    }

    return undefined;
  });
  const listed = compact(await Promise.all(listedPromise));
  // Write to lowdb
  write('listed', listed);
};
export const priceListener = async () => {
  try {
    const ehrtString = await request(CURRENCY_API_URL + 'EHRTBTC');
    const { price } = JSON.parse(ehrtString);
    const btcString = await request(CURRENCY_API_URL + 'BTCUSDT');
    const { price: btcPrice } = JSON.parse(btcString);
    write('price', Number(price) * Number(btcPrice));
  } catch (e) {
    logger.error(e);
  }
};
