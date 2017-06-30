package com.instil.webflix.basket.data;

import com.instil.webflix.basket.model.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
}
