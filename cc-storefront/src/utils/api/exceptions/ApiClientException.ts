export class IApiClientException extends Error {
  errorCode: number;
  errorCause: object;
  constructor(errorCode: number, errorCause: object) {
    super(
      `Api client failed with code: ${errorCode}, cause: ${JSON.stringify(
        errorCause
      )}`
    );
    this.errorCode = errorCode;
    this.errorCause = errorCause;
  }
}
