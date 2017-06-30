import {RequestBuilder} from '../../service/api-client/rest.service';
import {ResponseContentType, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {getObservableResponse} from './http-utils';

export class StubRequestBuilder extends RequestBuilder {
  private response: Observable<Response>;

  constructor() {
    super();
    this.response = getObservableResponse('');
  }

  setStubResult(response: Observable<Response>) {
    this.response = response;
  }

  build(): Observable<Response> {
    return this.response;
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
}
