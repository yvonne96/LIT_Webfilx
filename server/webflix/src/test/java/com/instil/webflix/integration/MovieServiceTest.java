package com.instil.webflix.integration;

import static javax.ws.rs.core.MediaType.*;
import static org.junit.Assert.*;

import java.util.List;
import java.util.Map;

import javax.ws.rs.client.*;
import org.junit.*;
import com.instil.webflix.movies.model.*;

public class MovieServiceTest {
	private static final String BASE_URL = "http://localhost:8080/movie";
	private Client client;
	
	@Before
	public void start() {
		client = ClientBuilder.newClient();
	}
	@After
	public void end() {
		client.close();
	}
	@Test
	public void allMoviesCanBeFoundAsXml() {
		MovieList result = client.target(BASE_URL)
	                             .request(APPLICATION_XML)
	                             .get(MovieList.class);
	    assertEquals(6,result.getMovies().size());
	}
	@Test
	@SuppressWarnings("unchecked")
	public void allMoviesCanBeFoundAsJson() {
		List<?> result = client.target(BASE_URL)
	                        	   .request(APPLICATION_JSON)
	                        	   .get(List.class);
	    assertEquals(6,result.size());
	    for(Object obj: result) {
			Map<String,?> entry = (Map<String, ?>)obj;
	    		assertTrue(entry.containsKey("title"));
	    		assertTrue(entry.containsKey("year"));
	    		assertTrue(entry.containsKey("genre"));
	    		assertTrue(entry.containsKey("classification"));
	    }
	}
}
