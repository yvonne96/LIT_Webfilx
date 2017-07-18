package com.instil.webflix.security;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import static org.mockito.Mockito.when;

import org.springframework.http.ResponseEntity;

import com.instil.webflix.security.controllers.AccountRestController;
import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.model.LoginResponse;
import com.instil.webflix.security.service.SecurityContextAccountService;

@RunWith(MockitoJUnitRunner.class)
public class AccountRestControllerTest {
	
	@Mock
	SecurityContextAccountService acMock;
	
	@Mock
	ResponseEntity<LoginResponse> reMock;
	
	@Mock
	ResponseEntity<Object> registerMock;
	
	@Mock
	Account accountMock;
	
	@InjectMocks
	AccountRestController rest;
	
	@Before
	public void setUp(){
		rest = new AccountRestController();
		
		MockitoAnnotations.initMocks(this);
	}
	
	
	@Test(expected = RuntimeException.class)
	public void testCallAccountServiceLoginFailWithException(){
		doThrow(new RuntimeException()).when(acMock).login("admin","password"); 
		rest.login("admin","password");	
	}
	
	
	@Test
	public void testAccountServiceReturnsLoginResponse()
	{
		when(acMock.login("admin","password")).thenReturn(reMock);
		ResponseEntity resp = rest.login("admin","password");
		verify(acMock,times(1)).login("admin", "password");
		assertEquals("Didn't receive response",resp,reMock);
	}
	
	@Test
	public void testCallAccountServiceRegister(){
		when(acMock.register(null)).thenReturn(registerMock);
		rest.register(null);
		verify(acMock).register(null);
		
	}
	
	
	@Test
	public void testAccountServiceReturnsRegisterResponse()
	{
		when(acMock.register(accountMock)).thenReturn(registerMock);
		ResponseEntity resp = rest.register(accountMock);	
		assertEquals("Didn't receive response", resp, registerMock);
	}

}
