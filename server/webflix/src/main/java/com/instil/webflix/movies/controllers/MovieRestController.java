package com.instil.webflix.movies.controllers;

import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instil.webflix.movies.data.MovieRepository;
import com.instil.webflix.movies.model.*;

import static org.springframework.web.bind.annotation.RequestMethod.*;

import java.awt.List;
import java.io.Console;
import java.math.BigDecimal;
import java.util.Date;


@RestController
@RequestMapping("/movie")
public class MovieRestController {
	@Autowired
	private MovieRepository repository;

	@Autowired
	private AccountService accountService;
	
	
	//refractor this into another method!!!
	@RequestMapping(method = GET, produces = "application/json")
	public Iterable<Movie> allMoviesAsJson() {
		//return checkMyMovies(repository.findAll());
		return repository.findAll();
		
	}

	@RequestMapping(method = GET, value = "/mine", produces = "application/json")
	public Iterable<Movie> allMyMovies() {
		Account current = accountService.getCurrent();
		return current.getMyMovies();
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
	
	@RequestMapping(method = POST, value="/{title}/{year}/{genre}/{classification}/{director}/{mainCast}/{description}",  produces = "application/json")
	public void addMovie(@PathVariable("title") String title, @PathVariable("year") String year, @PathVariable("genre") Integer genre, @PathVariable("classification") Integer classification, @PathVariable("director") String director, @PathVariable("mainCast") String mainCast, @PathVariable("description") String description){
		System.out.print("test");
		repository.addMovie(title, year, genre, classification, director, mainCast, description);
	}
	
	@RequestMapping(method = POST, value="/{price}",  produces = "application/json")
	public void addPrice(@PathVariable("price") BigDecimal price){
		System.out.println("test2");
		long movie_id = 12;//= getAllMovies();
		repository.addPrice(movie_id, price);
	}
	
//	private long getAllMovies() {
//		Iterable<Movie> testID = repository.getAllMovies();
//		long idHighest = 0;
//		
//		for(Movie m: testID) {
//			if(m.getId() > idHighest) {
//				idHighest = m.getId();
//			}
//		}
//		
//		return idHighest;
//	}

}
