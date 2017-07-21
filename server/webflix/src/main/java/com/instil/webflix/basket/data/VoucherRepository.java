package com.instil.webflix.basket.data;

import com.instil.webflix.basket.model.Voucher;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
	public Voucher findByName(String name);
	public List<Voucher> findAll();
}
