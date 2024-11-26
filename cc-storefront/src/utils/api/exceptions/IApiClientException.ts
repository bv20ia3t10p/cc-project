export interface IApiClientException extends Error{
    errorCode: Number;
    errorCause: object;
}