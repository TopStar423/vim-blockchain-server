import { thorify } from 'thorify';
import Web3 from 'web3';
import { THOR_URL, EXCHANGE, OWNERSHIP } from '../config/config';
import { exchange as abi_exchange, ownership as abi_ownership } from '../abi';

export const web3 = thorify(new Web3(), THOR_URL);

export const exchange = new web3.eth.Contract(abi_exchange, EXCHANGE);
export const ownership = new web3.eth.Contract(abi_ownership, OWNERSHIP);
