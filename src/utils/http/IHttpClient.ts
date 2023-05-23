export interface IHttpClient {
  get<T>(parameters: IHttpClientRequestParameters): Promise<T>;
  post<T>(parameters: IHttpClientRequestParameters): Promise<T>;
}

export interface IHttpClientRequestParameters {
  contentType?: string;
  url: string;
  body?: any;
  authToken?: string;
} /* 

export interface IHttpClientRequestPostParameters
  extends IHttpClientRequestParameters {
  body: {};
}
 */
