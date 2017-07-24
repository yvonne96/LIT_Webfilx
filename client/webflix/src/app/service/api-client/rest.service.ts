import {ResponseContentType, Response} from '@angular/http';
import {Observable} from 'rxjs';

export abstract class RestService {
  public abstract get(url: String, authenticate?: boolean): RequestBuilder;
  public abstract post(url: String, authenticate?: boolean): RequestBuilder;
  public abstract delete(url: String, authenticate?: boolean): RequestBuilder;
  public abstract put(url: String, authenticate?: boolean): RequestBuilder;
}

export abstract class RequestBuilder {
  /**
   * Sets the body of the HTTP request.
   * @param body the body.
   * @returns {RequestBuilder} this builder.
   */
  abstract setBody(body: any): RequestBuilder;

  /**
   * Set the HTTP Content-Type of the request.
   * Defaults to 'application/json' if not set.
   * @param contentType the content type being requested by the client.
   * @returns {RequestBuilder} this builder.
   */
  abstract setContentType(contentType: ResponseContentType): RequestBuilder;

  /**
   * Sets the path component of the HTTP request URL.
   * Note that the host component of the URL is set automatically based on the
   * API_HOST build / environment variable.
   * @param path the path component of the URL.
   * @returns {RequestBuilder} this builder.
   */
  abstract setPath(path: string): RequestBuilder;

  /**
   * Adds an HTTP header to the request.
   * @param key the identifier of the HTTP header.
   * @param value the value of the HTTP header.
   * @returns {RequestBuilder} this builder.
   */
  abstract addHeader(key: string, value: string): RequestBuilder;

  /**
   * Builds the HTTP request based on the configuration supplied to the builder.
   * @returns {Observable<Response>} the Observable
   */
  abstract build(): Observable<Response>;
}
