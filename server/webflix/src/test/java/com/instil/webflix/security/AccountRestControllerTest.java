package com.instil.webflix.security;


import org.junit.Before;
import org.junit.Ignore;
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
import com.instil.webflix.security.model.LoginResponse;
import com.instil.webflix.security.service.SecurityContextAccountService;

@RunWith(MockitoJUnitRunner.class)
public class AccountRestControllerTest {
	
	@Mock
	SecurityContextAccountService acMock;
	
	@Mock
	ResponseEntity<LoginResponse> reMock;
	
	@InjectMocks
	AccountRestController rest;
	
	@Before
	public void setUp(){
		rest = new AccountRestController();
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void tesCallAccountServicePass(){	
		rest.login("admin","password");	
		verify(acMock,times(1)).login("admin", "password");
	}
	
	@Test(expected = RuntimeException.class)
	public void tesCallAccountServiceFail(){
		doThrow(new RuntimeException()).when(acMock).login("admin","password"); 
		rest.login("admin","password");	
	}
	
	
	@Test
	public void testAccountServiceReturnsResponse()
	{
		when(acMock.login("admin","password")).thenReturn(reMock);
		ResponseEntity resp = rest.login("admin","password");	
		assertEquals("Good One",resp,reMock);
	}

}
