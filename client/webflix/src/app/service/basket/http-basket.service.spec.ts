import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {HttpBasketService} from './http-basket.service';
import {StubRestService} from '../../testing/stubs/stub-rest-service';
import {Movie} from '../../model/movie';
import {getResponse, getObservableResponse} from '../../testing/stubs/http-utils';
import {StubRequestBuilder} from '../../testing/stubs/stub-request-builder';

describe('Http Basket Service', () => {
  let target: HttpBasketService;
  let restService: StubRestService;

  beforeEach(() => {
    restService = new StubRestService();
    target = new HttpBasketService(restService);
  });

  it('Should have an empty basket initially', () => {
    target.basketCount.subscribe(value => expect(value).toBe(0));
  });

  it('Should get basket count from correct resource', () => {
    spyOn(restService, 'get').and.callThrough();
    restService.setBuildResult(Observable.of(getResponse('123')));

    target.getBasketItemCount().subscribe(x => expect(x).toBe(123));

    expect(restService.get).toHaveBeenCalledWith('/basket/count');
  });

  it('Should return 0 if error when reading basket count', () => {
    spyOn(restService, 'get').and.callThrough();
    restService.setBuildResult(Observable.throw('Bad Request'));

    target.getBasketItemCount().subscribe(x => expect(x).toBe(0));

    expect(restService.get).toHaveBeenCalledWith('/basket/count');
  });

  it('Should add item to to basket at correct resource', () => {
    spyOn(restService, 'post').and.callThrough();
    spyOn(target, 'refreshItemCount').and.stub();

    target.addToBasket(new Movie()).subscribe(x => expect(x).toBe(true));

    expect(restService.post).toHaveBeenCalledWith('/basket/addItem');
  });

  it('Should refresh the basket item count when  adding to basket', () => {
    spyOn(restService, 'get').and.callThrough();
    spyOn(restService, 'post').and.returnValue(new StubRequestBuilder());
    restService.setBuildResult(getObservableResponse('123'));

    target.addToBasket(new Movie()).subscribe();
    target.basketCount.subscribe(x => expect(x).toBe(123));

    expect(restService.get).toHaveBeenCalledWith('/basket/count');
  });
});
