interface ISuccessResponse<T> {
  isOk: true
  response: T
}

interface IErrorResponse {
  isOk: false
}

export type IResponse<T> = ISuccessResponse<T> | IErrorResponse
