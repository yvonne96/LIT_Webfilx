package com.instil.webflix.security;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.junit.Assert.*;

import static org.mockito.Mockito.*;

import static org.mockito.Mockito.when;

import com.instil.webflix.security.controllers.AccountRestController;
import com.instil.webflix.security.service.SecurityContextAccountService;

@RunWith(MockitoJUnitRunner.class)
public class SecurityContextAccountServiceTests {
	
	@Mock
	ResponseEntity rMock;
	
	@Mock
	AuthenticationManager authMMock;
	
	@Mock
	Authentication authMock;
	
	@Mock
	UserDetails userDMock;
	
	@Mock
	
	
	@InjectMocks
	SecurityContextAccountService scas = new SecurityContextAccountService();
	
	@Test
	public void failLogin(){
		scas.login("amin", "password");
		verify(scas, times(1)).login("amin", "password");
	}
	
	@Test
	public void successfulLogin(){
		scas.login("admin", "password");
		when(scas.login("admin", "password")).thenReturn(rMock);
		when(authMMock.authenticate(null)).thenReturn(authMock);
		verify(scas, times(1)).login("admin", "password");
	}
	
//	@Test
	

}
