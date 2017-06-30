import {Response, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

export const getResponse = function (body: any) {
  let responseOptions = new ResponseOptions();
  responseOptions.body = body;
  return new Response(responseOptions);
};

export const getObservableResponse = function(body: any) {
  return Observable.of(getResponse(body));
};
