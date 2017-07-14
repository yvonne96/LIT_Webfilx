package com.instil.webflix.security;


import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import static org.mockito.Mockito.when;

import org.springframework.http.ResponseEntity;

import com.instil.webflix.security.controllers.AccountRestController;
import com.instil.webflix.security.model.LoginResponse;
import com.instil.webflix.security.service.SecurityContextAccountService;

@RunWith(MockitoJUnitRunner.class)
public class AccountRestControllerTest {
	
	@Mock
	SecurityContextAccountService acMock;
	
	@Mock
	ResponseEntity reMock;
	
	@InjectMocks
	AccountRestController rest = new AccountRestController();
	
	
	@Test
	public void failLogin(){	
		rest.login("admin","password");	
		verify(acMock,times(1)).login("adin", "password");
	}
	
	@Test
	public void successfulLogin()
	{
		rest.login("admin","password");	
		when(acMock.login("admin","password")).thenReturn(reMock);
		verify(acMock,times(1)).login("admin", "password");
	}

}
