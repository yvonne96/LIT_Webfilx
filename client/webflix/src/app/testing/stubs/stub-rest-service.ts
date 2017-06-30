import {RestService, RequestBuilder} from '../../service/api-client/rest.service';
import {StubRequestBuilder} from './stub-request-builder';
import {Observable} from 'rxjs';
import {Response} from '@angular/http';

export class StubRestService extends RestService {
  private builder: StubRequestBuilder;

  constructor() {
    super();
    this.builder = new StubRequestBuilder();
  }

  setBuildResult(response: Observable<Response>) {
    this.builder.setStubResult(response);
  }

  get(url: String, authenticate?: boolean): RequestBuilder {
    return this.builder;
  }

  post(url: String, authenticate?: boolean): RequestBuilder {
    return this.builder;
  }

  delete(url: String, authenticate?: boolean): RequestBuilder {
    return this.builder;
  }
}
