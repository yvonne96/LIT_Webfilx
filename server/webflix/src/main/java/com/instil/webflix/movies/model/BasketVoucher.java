package com.instil.webflix.movies.model;

import javax.persistence.*;
import com.instil.webflix.voucher.model.Voucher;

@Entity
public class BasketVoucher {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne()
	@JoinColumn(name="basket_id")
	private Basket basket;

	@ManyToOne()
	@JoinColumn(name="voucher_id")
	private Voucher voucher;

	public BasketVoucher() {}

	public BasketVoucher(Basket basket, Voucher voucher) {
		this.basket = basket;
		this.voucher = voucher;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Basket getBasket() {
		return basket;
	}

	public void setBasket(Basket basket) {
		this.basket = basket;
	}

	public Voucher getVoucher() {
		return voucher;
	}

	public void setVoucher(Voucher voucher) {
		this.voucher = voucher;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		BasketVoucher that = (BasketVoucher) o;

		if (id != null ? !id.equals(that.id) : that.id != null) return false;
		if (basket != null ? !basket.equals(that.basket) : that.basket != null) return false;
		return voucher != null ? voucher.equals(that.voucher) : that.voucher == null;

	}

	@Override
	public int hashCode() {
		int result = id != null ? id.hashCode() : 0;
		result = 31 * result + (basket != null ? basket.hashCode() : 0);
		result = 31 * result + (voucher != null ? voucher.hashCode() : 0);
		return result;
	}
}
