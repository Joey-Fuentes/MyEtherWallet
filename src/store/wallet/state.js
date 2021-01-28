import nodeList from '@/utils/networks';
import store from 'store';
import { toWei } from 'web3-utils';
const storedNetwork = store.get('network');
let network = nodeList['ETH'][0];
if (storedNetwork && storedNetwork.type.name !== 'CUS') {
  const iteratableArr = nodeList[storedNetwork.type.name];
  const matchNetwork = iteratableArr.find(item => {
    if (item.service === storedNetwork.service) {
      return item;
    }
  });
  // check and assign node if its a websocket node
  if (matchNetwork && matchNetwork.url.includes('wss')) {
    network = matchNetwork;
    network.type = nodeList[matchNetwork.type.name][0].type;
  }
} else if (storedNetwork && storedNetwork.type.name === 'CUS') {
  if (storedNetwork.url.includes('wss')) {
    network = storedNetwork;
    network.type = nodeList[storedNetwork.type.name][0].type;
  }
}
store.set('network', network);

const addressBook =
  store.get('addressBook') !== undefined ? store.get('addressBook') : [];
const notifications =
  store.get('notifications') !== undefined ? store.get('notifications') : {};
const gasPrice =
  store.get('gasPrice') !== undefined
    ? store.get('gasPrice')
    : toWei('41', 'gwei');
const customPaths =
  store.get('customPaths') !== undefined ? store.get('customPaths') : {};
const currency = store.get('currency') ? store.get('currency') : {};

const state = {
  address: null,
  addressBook: addressBook,
  balance: '0',
  blockNumber: 0,
  customPaths: customPaths,
  ens: null,
  gasLimitWarning: 100,
  gasPrice: gasPrice,
  identifier: '',
  isHardware: false,
  network: network,
  nickname: '',
  notifications: notifications,
  transactions: {},
  currency: currency,
  instance: null,
  web3: {}
};

export default state;