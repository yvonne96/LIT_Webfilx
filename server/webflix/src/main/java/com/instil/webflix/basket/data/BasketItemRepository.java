package com.instil.webflix.basket.data;

import com.instil.webflix.movies.model.BasketItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BasketItemRepository extends JpaRepository<BasketItem, Long> {
}
