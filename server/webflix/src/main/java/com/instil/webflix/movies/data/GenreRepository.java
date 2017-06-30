package com.instil.webflix.movies.data;

import org.springframework.data.repository.CrudRepository;
import com.instil.webflix.movies.model.Genre;

public interface GenreRepository extends CrudRepository<Genre, Long> {
}
