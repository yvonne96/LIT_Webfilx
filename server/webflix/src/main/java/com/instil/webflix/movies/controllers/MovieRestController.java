package com.instil.webflix.movies.controllers;

import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.service.AccountService;
import com.instil.webflix.voucher.model.Voucher;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instil.webflix.movies.data.MovieRepository;
import com.instil.webflix.movies.model.*;

import static org.springframework.web.bind.annotation.RequestMethod.*;
import java.math.BigDecimal;

import java.io.Console;
import java.math.BigDecimal;
import java.util.Date;

import java.util.List;


@RestController
@RequestMapping("/movie")
public class MovieRestController {
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private MovieRepository repository;

	@Autowired
	private AccountService accountService;
	
	
	@RequestMapping(method = GET, produces = "application/json")
	public Iterable<Movie> allMoviesAsJson() {
		return repository.findAll();
		
	}
	
	@RequestMapping(method = GET, value = "/purchasableMovies", produces = "application/json")
	public List<Movie> allPurchasableMovies() {
		return repository.findByPurchasableTrue();
	}

	@RequestMapping(method = GET, value = "/mine", produces = "application/json")
	public Iterable<Movie> allMyMovies() {
		Account current = accountService.getCurrent();
		return current.getMyMovies();
	}
	
	@RequestMapping(method = POST, value = "/togglePurchasable/{movieID}/{purchasable}", produces = "application/json")
	public void togglePurchasableMovie(@PathVariable("movieID") int movieID, @PathVariable("purchasable") boolean purchasable) {
		repository.togglePurchasableMovie(movieID, purchasable);
	}

	@RequestMapping(method = GET, produces = "application/xml")
	public MovieList allMoviesAsXml() {
		return new MovieList(repository.findAll());
	}
	
	@RequestMapping(method = GET, value="/byGenre/{value}", produces = "application/json")
	public Iterable<Movie> moviesByGenre(@PathVariable("value") String value) {
		return repository.findByGenre(value);
	}
	
	@RequestMapping(method = GET, value="/byId/{id}", produces = "application/json")
	public ResponseEntity<Movie> singleMovie(@PathVariable("id") long id) {
		Movie result = repository.findOne(id);
		HttpStatus httpStatus = result == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
		return new ResponseEntity<Movie>(result, httpStatus);
	}
	
	@RequestMapping(method = GET, value="/byTitle/{title}", produces = "application/json")
	public Iterable<Movie> moviesByTitle(@PathVariable("title") String title) {
		return repository.findByTitleContainsAllIgnoreCase(title);
	}
	
	@RequestMapping(method = DELETE, value="/byId/{id}")
	public void deleteMovie(@PathVariable("id") long id) {
		repository.delete(id);
	}

	@RequestMapping(method = PUT, consumes = "application/json")
	public void createMovie(@RequestBody Movie movie) {
		repository.save(movie);
	}

	@RequestMapping(method = POST, value="/{price}/{title}/{year}/{genre}/{classification}/{director}/{mainCast}/{description}",  produces = "application/json")
	public void addMovie(@PathVariable("price") float price, @PathVariable("title") String title, @PathVariable("year") String year, @PathVariable("genre") Integer genre, @PathVariable("classification") Integer classification, @PathVariable("director") String director, @PathVariable("mainCast") String mainCast, @PathVariable("description") String description){
		System.out.print("test");
		repository.addMovie(price, title, year, genre, classification, director, mainCast, description);
	}
	
	@RequestMapping(method = POST,value="/{price}/{id}/{title}/{year}/{genre}/{classification}/{director}/{cast}/{description}", consumes = "application/json")
	public void editMovie(@PathVariable("price") float price, @PathVariable("id") int id, @PathVariable("title") String title, @PathVariable("year") String year, @PathVariable("genre") Integer genre, @PathVariable("classification") Integer classification,@PathVariable("director") String director, @PathVariable("cast") String mainCast, @PathVariable("description") String description) {
		repository.editMovie(price, id,title,year,genre,classification,director,mainCast,description);
	}
	
	@RequestMapping(method = POST, value="/{movie_id}/{favorite}",  produces = "application/json")
	public void toggleFavorite(@PathVariable("movie_id") Integer movie_id, @PathVariable("favorite") boolean favorite){
		Account current = accountService.getCurrent();
		Long account_id = current.getId();
		repository.toggleFavorite(movie_id, favorite, account_id);
	}
	
	@RequestMapping(method = GET, value="/favorite", produces = "application/json")
	public Iterable<Movie> getMyFavorites() {
		Account current = accountService.getCurrent();
		Long account_id = current.getId();
		return repository.findByFavoriteTrue(account_id);
	}
}
