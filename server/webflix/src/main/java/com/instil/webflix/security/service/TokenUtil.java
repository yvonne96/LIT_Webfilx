package com.instil.webflix.security.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
/*
 * Here we could encrypt our web token.
 * This is plain text concatenation.
 * You would never actually do this in production.
 */
@Service
public class TokenUtil {

    @SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(this.getClass());
	
	private static final String PREFIX = "Secret"; 
	
	public String generateToken(UserDetails account) {
		return PREFIX + "," + account.getUsername();
	}
	
	public String extractUsername(String token) {
		if (token == null || !token.startsWith(PREFIX)) {
			return null;
		}
		
		String[] parts = token.split(",");
		if (parts.length < 2) {
			return null;
		}
		
		return parts[1];
	}

	public boolean isValidToken(String authorisation, UserDetails userDetails) {
		return true;
	}
}
