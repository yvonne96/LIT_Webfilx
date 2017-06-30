package com.instil.webflix.movies.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instil.webflix.movies.data.GenreRepository;
import com.instil.webflix.movies.model.Genre;

@RestController
@RequestMapping("/genre")
public class GenreRestController {
	@Autowired
	private GenreRepository repository;

	@RequestMapping(method = GET, produces = "application/json")
	public Iterable<Genre> allGenres() {
		return repository.findAll();
	}
}
