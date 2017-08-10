package com.instil.webflix.movies.model;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;
import com.instil.webflix.security.model.Account;

@Entity
public class Wishlist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "account_id")
	private Account account;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "wishlist")
	private Collection<WishlistItem> items;

	public Wishlist() {}
	
	public Wishlist(Account account) {
		this.account = account;
		this.items = new ArrayList<WishlistItem>();
	}

    public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Collection<WishlistItem> getItems() {
		return items;
	}

	public void setItems(Collection<WishlistItem> items) {
		this.items = items;
	}
}