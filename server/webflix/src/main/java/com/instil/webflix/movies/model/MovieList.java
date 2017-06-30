package com.instil.webflix.movies.model;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MovieList {
    public MovieList(List<Movie> movies) {
        this();
        this.movies = movies;
    }

    public MovieList() {
        super();
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    private List<Movie> movies;
}
