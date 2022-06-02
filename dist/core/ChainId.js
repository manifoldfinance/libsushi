export var ChainId;
(function (ChainId) {
    ChainId["MAINNET"] = "1";
    ChainId["OPENMEV"] = "73300705280";
    ChainId["GORELI"] = "5";
})(ChainId || (ChainId = {}));
export let OPENMEV_SUPPORTED_NETWORKS = [ChainId.MAINNET];
export var OPENMEV_METAMASK_CHAIN_ID;
(function (OPENMEV_METAMASK_CHAIN_ID) {
    OPENMEV_METAMASK_CHAIN_ID["MAINNET"] = "0x1";
})(OPENMEV_METAMASK_CHAIN_ID || (OPENMEV_METAMASK_CHAIN_ID = {}));
export const OPENMEV_METAMASK_SUPPORTED_NETWORKS = [OPENMEV_METAMASK_CHAIN_ID.MAINNET];
const defaultRpcUrl = (network) => `https://api.sushirelay.com/v1`;
export const MAINNET_RPC_URL = defaultRpcUrl('mainnet');
export default ChainId;
