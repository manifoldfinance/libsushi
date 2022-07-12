
export const RESOURCE_ERROR = 'RESOURCE_ERROR';
export const PARSE_ERROR = 'PARSE_ERROR';
export const INVALID_REQUEST = 'INVALID_REQUEST';
export const METHOD_NOT_FOUND = 'METHOD_NOT_FOUND';
export const INVALID_PARAMS = 'INVALID_PARAMS';
export const INTERNAL_ERROR = 'INTERNAL_ERROR';
export const SERVER_ERROR = 'SERVER_ERROR';

export const RESERVED_ERROR_CODES = [-32001, -32700, -32600, -32601, -32602, -32603];
export const SERVER_ERROR_CODE_RANGE = [-32000, -32099];

export const STANDARD_ERROR_MAP = {
  [RESOURCE_ERROR]: { code: -32001, message: 'Err.32001# Resource not found' },
  [PARSE_ERROR]: { code: -32700, message: 'Err.32700# Parse error' },
  [INVALID_REQUEST]: { code: -32600, message: 'Err.32601# Invalid Request' },
  [METHOD_NOT_FOUND]: { code: -32601, message: 'Err.32601# Method not found' },
  [INVALID_PARAMS]: { code: -32602, message: 'Err.32602# Invalid params' },
  [INTERNAL_ERROR]: { code: -32603, message: 'Err.32603# Internal error' },
  [SERVER_ERROR]: { code: -32000, message: 'Err.32000# Server unable to locate canonical block' },
};
