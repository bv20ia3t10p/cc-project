import { IApiClientException } from "../exceptions/ApiClientException";

export interface IApiClient<T> {
  onBadRequest(exception: IApiClientException): Promise<T>;
  onInternalError(exception: IApiClientException): Promise<T>;
  get({
    path,
    params,
  }: {
    path: string;
    params?: Record<string, string>;
  }): Promise<T>;
  post({
    path,
    params,
    body,
  }: {
    path: string;
    params?: Record<string, string>;
    body?: Record<string, string>;
  }): Promise<T>;
  put({
    path,
    params,
    body,
  }: {
    path: string;
    params?: Record<string, string>;
    body?: Record<string, string>;
  }): Promise<T>;
  delete({
    path,
    params,
  }: {
    path: string;
    params?: Record<string, string>;
  }): Promise<T>;
}
