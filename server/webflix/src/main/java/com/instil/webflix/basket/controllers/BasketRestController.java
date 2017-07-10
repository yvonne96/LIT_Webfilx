package com.instil.webflix.basket.controllers;

import com.instil.webflix.basket.service.BasketService;
import com.instil.webflix.basket.model.BasketSummary;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.security.service.AccountService;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/basket")
public class BasketRestController {
    private final Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    private BasketService basketService;

    @Autowired
    private AccountService accountService;

    @RequestMapping(method = GET, value = "/count", produces = "application/json")
    public int getItemCount() {
        return basketService.getItemCount(accountService.getCurrent());
    }

    @RequestMapping(method = GET, produces = "application/json")
    public BasketSummary getBasket() {
        return basketService.getSummary(accountService.getCurrent());
    }

    @RequestMapping(method = POST, value = "/addItem", produces = "application/json")
    public void addMovie(@RequestBody() Movie movie) {
    	boolean inBasket = false;
    	Iterable<Movie> itemsInBasket = getBasket().getMovies();
    	
    	for(Movie m: itemsInBasket){
    		
    		if(m.equals(movie))
    		{
    			inBasket = true;
    		}
    		
    		
    	}
    	if(!inBasket)
    	{
    		basketService.addMovieToBasket(accountService.getCurrent(), movie);
    	}
    	
    }

    @RequestMapping(method = DELETE, value = "/", produces = "application/json")
    public void clear() {
        basketService.clearBasket(accountService.getCurrent());
    }

    @RequestMapping(method = DELETE, value = "/movieId/{movieId}", produces = "application/json")
    public void clearMovie(@PathVariable("movieId") Long movieId) {
        logger.info("Deleting movie " + movieId);
        basketService.clearMovie(accountService.getCurrent(), movieId);
    }

    @RequestMapping(method = POST, value = "/checkout",  produces = "application/json")
    public void checkout() {
        basketService.checkout(accountService.getCurrent());
    }
}
