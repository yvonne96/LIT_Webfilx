package com.instil.webflix.movies.data;
import org.springframework.data.repository.CrudRepository;
import com.instil.webflix.movies.model.Classification;

public interface ClassificationRepository extends CrudRepository<Classification, Long>{
}
