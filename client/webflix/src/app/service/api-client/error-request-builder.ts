import {ResponseContentType, Response} from '@angular/http';
import {RequestBuilder} from './rest.service';
import {Observable} from 'rxjs/Observable';
import {ApiClientError, ApiClientErrorCode} from './api-client.service';

export class ErrorRequestBuilder extends RequestBuilder {
  constructor(private errorCode: ApiClientErrorCode) {
    super();
  }

  setBody(body: any): RequestBuilder {
    return this;
  }

  setContentType(contentType: ResponseContentType): RequestBuilder {
    return this;
  }

  setPath(path: string): RequestBuilder {
    return this;
  }

  addHeader(key: string, value: string): RequestBuilder {
    return this;
  }

  build(): Observable<Response> {
    return Observable.throw(new ApiClientError(this.errorCode));
  }
}

