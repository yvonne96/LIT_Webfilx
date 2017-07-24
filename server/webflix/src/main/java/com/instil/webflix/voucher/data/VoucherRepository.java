package com.instil.webflix.voucher.data;


import com.instil.webflix.voucher.model.Voucher;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
	public Voucher findByName(String name);
	public List<Voucher> findAll();
	public List<Voucher> findByGlobalTrue();
	
}
