export interface ISubmitRegisterResult {
  result: string
}

export interface ISubmitRegisterParams {
  name: string
}

export interface ResponseError extends Error {
  status?: number
}
