package com.instil.webflix.basket;

import static java.util.stream.Collectors.toList;
import static org.hamcrest.CoreMatchers.equalTo;
//import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.iterableWithSize;
import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.instil.webflix.basket.data.BasketRepository;
import com.instil.webflix.basket.service.DbBasketService;
import com.instil.webflix.movies.model.Basket;
import com.instil.webflix.movies.model.BasketItem;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.security.model.Account;

@RunWith(MockitoJUnitRunner.class)
public class DbBasketServiceTest {
    @Mock
    private BasketRepository basketRepository;

    @Mock
    private Account account;

    @Mock
    private Basket basket;

    @Mock
    private Movie movie;

    @InjectMocks
    private DbBasketService target;

    @Test
    public void shouldReturn0AsNumberOfItemsWhenUserNotLoggedIn() {
        when(basketRepository.findByAccount(account)).thenReturn(null);

        assertThat(target.getItemCount(account), is(equalTo(0)));
    }

    @Test
    public void shouldReturnNumberOfItemsForSpecificUser() {
        assertNumberOfItemsInBasketMatchesReturnedItemCount(new BasketItem[]{}, 0);
        assertNumberOfItemsInBasketMatchesReturnedItemCount(new BasketItem[]{null, null, null, null}, 4);
    }

    @Test
    public void shouldDeleteBasketIfCleared() {
        stubBasketForAccount();

        target.clearBasket(account);

        verify(basketRepository, times(1)).delete(basket);
    }

    @Test
    public void shouldNotThrowExceptionIfClearingBasketIfNoneExists() {
        target.clearBasket(account);

        verify(basketRepository, times(1)).delete((Basket) any());
    }

//    @Test
//    public void shouldAddNewMovieToBasketAndSave() {
//        stubBasketForAccount(withBasketSizeOf(2));
//
//        target.addMovieToBasket(account, movie);
//
//        verify(basketRepository, times(1)).save(basket);
//        assertThat(basket.getItems(), hasItem(new BasketItem(basket, movie)));
//        assertThat(basket.getItems(), hasSize(3));
//    }

//    @Test
//    public void shouldAddNewMovieToNewBasketIfAccountDoesNotHaveOne() {
//        ArgumentCaptor<Basket> basketCaptor = ArgumentCaptor.forClass(Basket.class);
//
//        target.addMovieToBasket(account, movie);
//
//        verify(basketRepository, times(1)).save(basketCaptor.capture());
//        Basket newBasket = basketCaptor.getValue();
//        assertThat(newBasket.getItems(), hasItem(new BasketItem(newBasket, movie)));
//        assertThat(newBasket.getItems(), hasSize(1));
//    }

    @Test
    public void shouldCalculateCorrectTotalForMoviesInBasketSummary() {
        Integer pennies = new Integer(1);
        stubBasketForAccount(withBasketSizeOf(3));
        for (BasketItem item: basket.getItems()) {
            item.getMovie().setPrice(new BigDecimal("0.0" + pennies++));
        }

        assertThat(target.getSummary(account).getTotal(), is(equalTo(new BigDecimal("0.06"))));
    }

    @Test
    @Ignore
    public void shouldHaveCorrectMoviesInBasketSummary() {
        stubBasketForAccount(withBasketSizeOf(4));
        List<Movie> basketMovies = basket.getItems().stream()
                .map(BasketItem::getMovie)
                .collect(toList());

        Iterable<Movie> summaryMovies = target.getSummary(account).getMovies();

        assertThat(summaryMovies, iterableWithSize(4));
        assertEquals(summaryMovies, basketMovies);
    }

    private void assertNumberOfItemsInBasketMatchesReturnedItemCount(BasketItem[] basketItems, int expectedNumberOfItems) {
        stubBasketForAccount();
        given(basket.getItems()).willReturn(Arrays.asList(basketItems));

        assertThat(target.getItemCount(account), is(equalTo(expectedNumberOfItems)));
    }

    private void stubBasketForAccount() {
        given(basketRepository.findByAccount(account)).willReturn(basket);
    }

    private void stubBasketForAccount(List<BasketItem> basketItems) {
        stubBasketForAccount();
        given(basket.getItems()).willReturn(basketItems);
    }

    private List<BasketItem> withBasketSizeOf(int itemCount) {
        return IntStream.range(0, itemCount)
                .mapToObj(x -> new BasketItem(null, new Movie("Title " + x)))
                .collect(toList());
    }
}
