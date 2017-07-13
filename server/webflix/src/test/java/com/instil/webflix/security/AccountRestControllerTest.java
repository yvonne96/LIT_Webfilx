package com.instil.webflix.security;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import static org.mockito.Mockito.*;


import static org.mockito.Mockito.when;

import org.springframework.http.HttpStatus;
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
		when(acMock.login("admin","password")).thenReturn(reMock);
		rest.login("admin","password");
		//when(acMock.login( "admin","password")).thenReturn(reMock);		
		verify(acMock,times(2)).login("admin", "password");
		
//		ResponseEntity<LoginResponse>((LoginResponse) null, HttpStatus.BAD_REQUEST)
	}
	
/*	@Test
	public void userWithCredentialsInDbLogsInSuccessfully() {
		
		PowerMockito.mockStatic(AccountRestController.class);
		//AccountRestController.login("D","admin");
		expect(AccountRestController.login("D","admin").andReturn("")
		
	}*/

}
