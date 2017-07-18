package com.instil.webflix.Registration;

import static org.junit.Assert.*;

import java.util.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import com.instil.webflix.security.model.Account;

@RunWith(Parameterized.class)
public class PasswordRestrictionTests {
	
	private static Account account = new Account();
	private String input;
	private boolean expected;
	@Parameters
	public static List<Object[]> data() {
		return Arrays.asList(new Object[][] {
			{ "1Abccccc", true},
			{ "cccccccc", false }, 
			{ "11111111", false }, 
			{ "AAAAAAAA", false }, 
			{ "AAAA1111", false },
			{ "cccc1111", false},
			{ "ccccAAAA", false },
			{ "ccccccc", false },
			{ "1111111", false},
			{ "AAAAAAA", false},
			{ "AAAA111", false},
			{ "aaa1111", false},
			{ "AAAaaa", false},
			{ "a1A", false },
		});
	}
	public PasswordRestrictionTests( String input, boolean expected) {
		this.input = input;
		this.expected =expected;
	}
	
	@Test
	public void PasswordTest() {
		account.setPassword(input);
		assertEquals(expected, account.passwordRestrictions());
	}

}
