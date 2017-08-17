package com.instil.webflix.movies.controllers;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instil.webflix.movies.data.ClassificationRepository;
import com.instil.webflix.movies.model.Classification;
import com.instil.webflix.movies.model.Genre;

@RestController
@RequestMapping("/classification")
public class ClassificationRestController {
	@Autowired
	private ClassificationRepository repository;

	@RequestMapping(method = GET, produces = "application/json")
	public Iterable<Classification> allClassifications() {
		return repository.findAll();
	}
}
	
