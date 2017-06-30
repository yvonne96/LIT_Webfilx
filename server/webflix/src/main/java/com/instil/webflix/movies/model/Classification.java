package com.instil.webflix.movies.model;

import javax.persistence.*;

@Entity
public class Classification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String value;

	public Classification() {
		super();
	}

	public Classification(String value) {
		this();
		this.value = value;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
