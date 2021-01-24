import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import logger from '../log/logger';


const adapter = new FileSync('db.json');
const db = lowdb(adapter);

try {
  db.get('listed').value();
} catch (e) {
  db.defaults({ listed: [], bought: [] });
}

export const read = (prop: string) => {
  return db.get(prop).value();
};

export const write = (prop: string, value: any) => {
  db.set(prop, value).write();
  logger.info(`Written to ${prop}`);
};

const adapterConfig = new FileSync('config.json');
const configDb = lowdb(adapterConfig);

try {
  db.get('isDiscount').value();
  db.get('discountPercentage').value();
  db.get('originalPrice').value();
} catch (e) {
  db.defaults({ isDiscount: false, originalPrice: 0, discountPercentage: 0 });
}

export const readConfig = (prop: string) => {
  return configDb.get(prop).value();
};

export const writeConfig = (prop: string, value: any) => {
  configDb.set(prop, value).write();
  logger.info(`Written to ${prop}`);
};

const adapterAuth = new FileSync('auth.json');
const authDb = lowdb(adapterAuth);

try {
  db.get('isDiscount').value();
  db.get('discountPercentage').value();
  db.get('originalPrice').value();
  db.get('showAnyVims').value();
} catch (e) {
  db.defaults({
    isDiscount: false,
    originalPrice: 0,
    discountPercentage: 0,
    showAnyVims: true,
  });
}

export const readAuth = (prop: string) => {
  return authDb.get(prop).value();
};

export const writeAuth = (prop: string, value: any) => {
  authDb.set(prop, value).write();
  logger.info(`Written to ${prop}`);
};
