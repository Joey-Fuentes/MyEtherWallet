import Configs from '../configs';
import { toWei } from 'web3-utils';
import nodeList from '@/utils/networks';
import { gasPriceTypes } from '@/core/helpers/gasPriceHelper';

const state = {
  localStore: true,
  addressBook: [],
  Errors: {},
  online: true,
  linkQuery: {},
  locale: 'en_US',
  stateVersion: Configs.stateVersion,
  gasLimitWarning: 100,
  gasPrice: toWei('41', 'gwei'),
  gasPriceType: gasPriceTypes.ECONOMY,
  currentNetwork: Object.assign({}, nodeList['ETH'][0]),
  preferredCurrency: 'USD'
};
state.currentNetwork.type = {
  name: state.currentNetwork.type.name
};

export default state;