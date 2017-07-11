package com.instil.webflix.movies.model;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;
import com.instil.webflix.security.model.Account;

@Entity
public class Basket {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "account_id")
	private Account account;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "basket")
	private Collection<BasketItem> items;

	public Basket() {}
	
	public Basket(Account account) {
		this.account = account;
		this.items = new ArrayList<BasketItem>();
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

	public Collection<BasketItem> getItems() {
		return items;
	}

	public void setItems(Collection<BasketItem> items) {
		this.items = items;
	}

	
	
	
}
