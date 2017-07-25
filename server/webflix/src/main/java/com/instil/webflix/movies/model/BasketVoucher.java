package com.instil.webflix.movies.model;

import javax.persistence.*;

import com.instil.webflix.security.model.Account;
import com.instil.webflix.voucher.model.Voucher;

@Entity
public class BasketVoucher {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne()
	@JoinColumn(name="account_id")
	private Account account;

	@ManyToOne()
	@JoinColumn(name="voucher_id")
	private Voucher voucher;

	public BasketVoucher() {}

	public BasketVoucher(Account account, Voucher voucher) {
		this.account = account;
		this.voucher = voucher;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Account getAccount() {
		return account;
	}

	public void setBasket(Account account) {
		this.account = account;
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
		if (account != null ? !account.equals(that.account) : that.account != null) return false;
		return voucher != null ? voucher.equals(that.voucher) : that.voucher == null;

	}

	@Override
	public int hashCode() {
		int result = id != null ? id.hashCode() : 0;
		result = 31 * result + (account != null ? account.hashCode() : 0);
		result = 31 * result + (voucher != null ? voucher.hashCode() : 0);
		return result;
	}
}
