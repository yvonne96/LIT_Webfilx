package com.instil.webflix.security.model;

import com.instil.webflix.movies.model.BasketItem;
import com.instil.webflix.movies.model.Movie;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Entity
@Table(name="account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String firstname;
	private String lastname;
	private String emailAddress;
	private String password;

	@JoinTable(
			name = "account_role",
			joinColumns = @JoinColumn(name = "account_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id")
	)
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	private Collection<Role> roles;

	@JoinTable(
			name = "account_movie",
			joinColumns = @JoinColumn(name = "account_id"),
			inverseJoinColumns = @JoinColumn(name = "movie_id")
	)
	@OneToMany(cascade = CascadeType.DETACH)
	private Collection<Movie> myMovies;

	public Account(String firstname,
			String lastname,
			String emailAddress,
			String password) {
		this();
		this.firstname = firstname;
		this.lastname = lastname;
		this.emailAddress = emailAddress;
		this.password = password;
	}
	
	public Account() {
		this.roles = new ArrayList<>();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public boolean passwordRestrictions() {
		Pattern r = Pattern.compile("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{8,}");
		Matcher m = r.matcher(this.password);
	    // regular exp tests for specified test restrictions and white space
	    return m.matches();
	 }

	public Collection<Movie> getMyMovies() {
		return myMovies;
	}

	public void setMyMovies(Collection<Movie> myMovies) {
		this.myMovies = myMovies;
	}

	public Collection<Role> getRoles() {
		return roles;
	}

	public void setRoles(Collection<Role> roles) {
		this.roles = roles;
	}
}
