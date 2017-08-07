package com.instil.webflix.basket.data;

import com.instil.webflix.movies.model.BasketVoucher;
import com.instil.webflix.security.model.Account;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface BasketVoucherRepository extends JpaRepository<BasketVoucher, Long> {
	public Iterable<BasketVoucher> findByAccount(Account account);
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "SELECT voucher_id FROM basket_voucher WHERE account_id = :account_id")
	public List<Integer> getUsedVouchers(@Param("account_id") Long basket_id);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "INSERT INTO basket_voucher (account_id, voucher_id) VALUES (:account_id, :voucher_id)")
	public void addUsedVouchers(@Param("account_id") Long account_id, @Param("voucher_id") Long voucher_id);

}
