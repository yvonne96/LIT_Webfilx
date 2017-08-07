package com.instil.webflix.voucher.data;


import com.instil.webflix.voucher.model.Voucher;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
	public Voucher findByName(String name);
	public List<Voucher> findAll();

	public Voucher findById(Long id);
	public List<Voucher> findByGlobalTrue();
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "DELETE FROM voucher v WHERE v.id = :id")
	void deleteById(@Param("id") int id);
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "UPDATE voucher SET global = :global WHERE id = :id")
	void modifyById(@Param("id") int id, @Param("global") boolean global);
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "UPDATE voucher SET global = 'False'")
	void setAllGlobalFalse();
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "INSERT INTO voucher (name, offer,expire) VALUES (:code , :discount , :expiryDate)")
	void addVoucher(@Param("code") String code, @Param("discount") String discount, @Param("expiryDate") Date expiryDate);

}
