import { IApiClientException } from "./../exceptions/IApiClientException";

export interface IApiClient<T> {
  onBadRequest(exception: IApiClientException): Promise<T>;
  onInternalError(exception: IApiClientException): Promise<T>;
  get(url: string, params: Record<string, string>): Promise<T>;
  post(
    url: string,
    params: Record<string, string>,
    body: Record<string, string>
  ): Promise<T>;
  put(
    url: string,
    params: Record<string, string>,
    body: Record<string, string>
  ): Promise<T>;
  delete(url: string, params: Record<string, string>): Promise<T>;
}
