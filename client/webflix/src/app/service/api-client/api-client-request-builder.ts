/**
 * Created by mattmccomb on 09/12/2016.
 */
import {
  Http,
  RequestMethod,
  Headers,
  ResponseContentType,
  Response
} from '@angular/http';

import {Observable} from 'rxjs';
import {RequestBuilder} from './rest.service';

/**
 * A builder object which simplifies the creation of http requests targeted at the API.  The
 * returned requests are generated using Angular's http module.  The builder wraps Angular's http module,
 * initializing the requests with default configuration and providing methods to further configure requests.
 *
 */
export class ApiRequestBuilder extends RequestBuilder {
  private body: any;
  private contentType: ResponseContentType;
  private path: string;
  private jwtToken: string;
  private method: RequestMethod;
  private headers: Headers;
  private http: Http;

  constructor(http: Http, private baseUrl: string) {
    super();
    this.contentType = ResponseContentType.Json;
    this.headers = new Headers();
    this.http = http;
  }

  /**
   * Set the HTTP method of the request.
   * @param method the HTTP method
   * @returns {ApiRequestBuilder} this builder.
   */
  setMethod(method: RequestMethod): ApiRequestBuilder {
    this.method = method;
    return this;
  }

  /**
   * Sets the body of the HTTP request.
   * @param body the body.
   * @returns {ApiRequestBuilder} this builder.
   */
  setBody(body: any): RequestBuilder {
    this.body = body;
    return this;
  }

  /**
   * Set the HTTP Content-Type of the request.
   * Defaults to 'application/json' if not set.
   * @param contentType the content type being requested by the client.
   * @returns {ApiRequestBuilder} this builder.
   */
  setContentType(contentType: ResponseContentType): ApiRequestBuilder {
    this.contentType = contentType;
    return this;
  }

  /**
   * Sets the path component of the HTTP request URL.
   * Note that the host component of the URL is set automatically based on the
   * API_HOST build / environment variable.
   * @param path the path component of the URL.
   * @returns {ApiRequestBuilder} this builder.
   */
  setPath(path: string): ApiRequestBuilder {
    this.path = path;
    return this;
  }

  /**
   * Sets the JWT token used to authenticate this HTTP request (only required when accessing
   * protected resources)
   * @param token the authenticated user's JWT token.
   * @returns {ApiRequestBuilder} this builder.
   */
  setJwtToken(token: string): ApiRequestBuilder {
    this.jwtToken = token;
    if (token) {
      this.headers.append('Authorization', this.jwtToken);
    } else {
      this.headers.delete('Authorization');
    }
    return this;
  }

  /**
   * Adds an HTTP header to the request.
   * @param key the identifier of the HTTP header.
   * @param value the value of the HTTP header.
   * @returns {ApiRequestBuilder} this builder.
   */
  addHeader(key: string, value: string): ApiRequestBuilder {
    this.headers.append(key, value);
    return this;
  }

  requestUrl(): string {
    return this.baseUrl + this.path;
  }

  /**
   * Builds the HTTP request based on the configuration supplied to the builder.
   * @returns {Observable<Response>} the Observable
   */
  build(): Observable<Response> {

    switch (this.contentType) {
      case ResponseContentType.Json:
        this.headers.append('Content-Type', 'application/json');
        break;
      default:
        this.headers.append('Content-Type', 'application/json');
    }

    switch (this.method) {
      case RequestMethod.Get:
        return this.http.get(this.requestUrl(), {headers: this.headers});
      case RequestMethod.Post:
        return this.http.post(this.requestUrl(), this.body, {headers: this.headers});
      case RequestMethod.Delete:
        return this.http.delete(this.requestUrl(), {headers: this.headers});
      case RequestMethod.Options:
        return this.http.options(this.requestUrl(), {headers: this.headers});
      case RequestMethod.Put:
        return this.http.put(this.requestUrl(), this.body, {headers: this.headers});
      default:
        throw new Error('Unmapped request method');
    }
  }
}

