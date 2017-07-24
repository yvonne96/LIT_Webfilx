package com.instil.webflix.basket.data;

import com.instil.webflix.movies.model.Basket;
import com.instil.webflix.movies.model.BasketVoucher;
import com.instil.webflix.voucher.model.Voucher;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface BasketVoucherRepository extends JpaRepository<BasketVoucher, Long> {
	public Iterable<BasketVoucher> findByBasket(Basket basket);
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "SELECT voucher_id FROM basket_voucher WHERE basket_id = :basket_id")
	public List<Integer> getUsedVouchers(@Param("basket_id") Long basket_id);
}
