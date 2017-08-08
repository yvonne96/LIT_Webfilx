package com.instil.webflix.wishlist.data;

import com.instil.webflix.movies.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

}
