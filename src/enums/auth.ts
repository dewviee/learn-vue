export enum EAuthErrCode {
  TOKEN_OK = 100,
  TOKEN_INVALID = 401,
  ACCESS_TOKEN_REVOKE = 201,
  ACCESS_TOKEN_EXPIRED = 202,
  ACCESS_TOKEN_INVALID = 204,
  REFRESH_TOKEN_REVOKE = 301,
  REFRESH_TOKEN_EXPIRED = 302,
  REFRESH_TOKEN_INVALID = 304
}
