/**
 * @test JsonRpcRequest interface
 */

/**
 * Edge Cases
 */
const JsonRpcResponse0 = {
  jsonrpc: 'https://croplands.org/app/a/confirm?t=',
  id: undefined,
  result: undefined,
  error: undefined,
};
/**
 * Edge Cases
 */
const JsonRpcResponse1 = {
  jsonrpc: 'https://twitter.com/path?abc',
  id: -100,
  result: undefined,
  error: undefined,
};
/**
 * Edge Cases
 */
const JsonRpcResponse2 = {
  jsonrpc: 'https://croplands.org/app/a/confirm?t=',
  id: undefined,
  result: undefined,
  error: undefined,
};
console.log('JsonRpcResponse2', JsonRpcResponse0);

/**
 * Edge Cases
 */
const JsonRpcResponse3 = {
  jsonrpc: 'https://croplands.org/app/a/reset?token=',
  id: 1,
  result: undefined,
  error: undefined,
};
console.log('JsonRpcResponse3', JsonRpcResponse0);
/**
 * Edge Cases
 */
const JsonRpcResponse4 = {
  jsonrpc: 'https://api.telegram.org/bot',
  id: Infinity,
  result: undefined,
  error: undefined,
};
console.log('JsonRpcResponse4', JsonRpcResponse0);

/**
 * Edge Cases
 */
const JsonRpcResponse5 = {
  jsonrpc: 'https://croplands.org/app/a/reset?token=',
  id: Infinity,
  result: undefined,
  error: undefined,
};
console.log('JsonRpcResponse5', JsonRpcResponse0);
