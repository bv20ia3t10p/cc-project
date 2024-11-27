import { HeaderConfiguration } from "./../../../models/api/HeaderConfiguration";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IApiClient } from "./IApiClient";
import { IApiClientException } from "../exceptions/ApiClientException";

export class ApiClient<T> implements IApiClient<T> {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, headerConfiguration: HeaderConfiguration) {
    const config: AxiosRequestConfig = {
      baseURL: baseUrl,
      headers: headerConfiguration.toHeaders(),
    };
    this.axiosInstance = axios.create(config);
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log("Request made: ", config);
        return config;
      },
      (error) => {
        console.log("Request error: ", error);
        return Promise.reject(error);
      }
    );
    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Handle successful responses
        console.log("Response received:", response);
        return response;
      },
      (error) => {
        // Handle error responses globally
        const statusCode: number = error.repsonse.status;
        if (statusCode >= 500) return this.onInternalError(error);
        if (statusCode >= 400) return this.onBadRequest(error);
      }
    );
  }

  onBadRequest(exception: IApiClientException): Promise<T> {
    console.log("Request error: ", exception);
    return Promise.reject(exception);
  }

  onInternalError(exception: IApiClientException): Promise<T> {
    console.log("Request error: ", exception);
    throw new Error("Method not implemented.");
  }

  public async get({
    path,
    params,
  }: {
    path: string;
    params?: Record<string, string>;
  }): Promise<T> {
    const response = await this.axiosInstance.get<T>(path, { params });
    return response.data;
  }

  public async post({
    path,
    params,
    body,
  }: {
    path: string;
    params?: Record<string, string>;
    body?: Record<string, string>;
  }): Promise<T> {
    const response = await this.axiosInstance.post<T>(path, body, { params });
    return response.data;
  }

  public async put({
    path,
    params,
    body,
  }: {
    path: string;
    params?: Record<string, string>;
    body?: Record<string, string>;
  }): Promise<T> {
    const response = await this.axiosInstance.put<T>(path, body, { params });
    return response.data;
  }

  public async delete({
    path,
    params,
  }: {
    path: string;
    params?: Record<string, string>;
  }): Promise<T> {
    const response = await this.axiosInstance.delete<T>(path, { params });
    return response.data;
  }
}
