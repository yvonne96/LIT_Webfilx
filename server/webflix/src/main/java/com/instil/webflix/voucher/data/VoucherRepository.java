package com.instil.webflix.voucher.data;


import com.instil.webflix.voucher.model.Voucher;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
	public Voucher findByName(String name);
	public List<Voucher> findAll();
	public List<Voucher> findByGlobalTrue();
	public Voucher findById(Long id);
	
}
