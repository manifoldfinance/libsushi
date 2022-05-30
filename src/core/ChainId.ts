export enum ChainId {
  MAINNET = '1',
  OPENMEV = '73300705280', // 0x1111100000
  GORELI = '5',
}

export let OPENMEV_SUPPORTED_NETWORKS = [ChainId.MAINNET];

export enum OPENMEV_METAMASK_CHAIN_ID {
  MAINNET = '0x1',
}

export const OPENMEV_METAMASK_SUPPORTED_NETWORKS = [OPENMEV_METAMASK_CHAIN_ID.MAINNET];

const defaultRpcUrl = (network: string) => `https://api.sushirelay.com/v1`;

export const MAINNET_RPC_URL = defaultRpcUrl('mainnet');

export default ChainId;
