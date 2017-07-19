package com.instil.webflix.security;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.junit.Assert.*;
import org.junit.Before;
import org.junit.Ignore;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.instil.webflix.security.controllers.AccountRestController;
import com.instil.webflix.security.data.AccountRepository;
import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.model.LoginResponse;
import com.instil.webflix.security.service.DbUserDetailsService;
import com.instil.webflix.security.service.Roles;
import com.instil.webflix.security.service.SecurityContextAccountService;
import com.instil.webflix.security.service.TokenUtil;

@RunWith(MockitoJUnitRunner.class)
public class SecurityContextAccountServiceTests {
	
	@Mock
	ResponseEntity rMock;
	
	@Mock
	AuthenticationManager authMMock;
	
	@Mock
	Authentication authMock;
	
	@Mock
	User userDMock;
	
	@Mock
	LoginResponse logResMock;
	
	@Mock
	UserDetailsService uDSMock ;
	
	@Mock
	TokenUtil tokenUMock;
	
	@Mock 
	Account accMock;
	
	@Mock
	PasswordEncoder passEMock;
	
	@Mock
	Roles rolesMock;
	
	@Mock
	AccountRepository accRMock;
	
	@Mock
	SecurityContextHolder secCHMock;
	
	@InjectMocks
	SecurityContextAccountService scas;
	
	@Before
	public void setUp(){
		scas = new SecurityContextAccountService();
		MockitoAnnotations.initMocks(this);
	}
	
	@Test(expected = UsernameNotFoundException.class)
	public void failLoginBadUsername(){
		when(uDSMock.loadUserByUsername("amin")).thenReturn(userDMock);
		when(scas.login("amin", "password")).thenThrow(new UsernameNotFoundException("Bad User"));
		scas.login("amin", "password");
	}
	
	@Test
	@Ignore
	public void failLoginBadPassword(){
		
	}
	
	@Test
	public void loginIfEmailIsNullSendBackBadRequest(){
		ResponseEntity<LoginResponse> resp = new ResponseEntity<LoginResponse>((LoginResponse) null, HttpStatus.BAD_REQUEST);
		assertEquals("Incorrect ResponseEntity returned", resp, scas.login(null, "password"));
	}
	
	@Test
	public void loginIfPasswordIsNullSendBackBadRequest(){
		ResponseEntity<LoginResponse> resp = new ResponseEntity<LoginResponse>((LoginResponse) null, HttpStatus.BAD_REQUEST);
		assertEquals("Incorrect ResponseEntity returned", resp, scas.login("admin", null));
	}
	
	@Test
	@Ignore
	public void successfulLogin(){
		when(uDSMock.loadUserByUsername("admin")).thenReturn(userDMock);
		assertEquals("Login was not successful", null , scas.login("admin", "password"));
	}

	@Test
	public void registerIfAccountIsNullSendBackBadRequest(){
		ResponseEntity<Object> resp = new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		assertEquals("Incorrect ResponseEntity returned", resp, scas.register(null));
	} 
	
	@Test
	public void successfulRegistration(){
		ResponseEntity<Object> resp = ResponseEntity.ok().build();
		assertEquals("Registration was not successful", resp, scas.register(new Account("test", "ing", "testing@gmail.com", "atest")));
	}
	
	@Test(expected = UsernameNotFoundException.class)
	@Ignore
	public void failFindAccountBadEmail(){
		when(scas.getCurrent()).thenThrow(new UsernameNotFoundException("Unknown user"));
		when(secCHMock.getContext().getAuthentication()).thenReturn(authMock);
		when(authMock.getName()).thenReturn(new String());
		scas.getCurrent();
	}

}
