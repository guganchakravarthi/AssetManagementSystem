package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class UserController {
	
	@Autowired
	UserService userService;
	
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody UserDto userDto){
		String response= userService.registerUser(userDto);
		
		return ResponseEntity.ok(response);
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserDto userDto, HttpServletRequest request) {
	    try {
	        Authentication authentication = userService.login(userDto);
	        SecurityContextHolder.getContext().setAuthentication(authentication);

	        HttpSession session = request.getSession(true); // Create session
	        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

	        return ResponseEntity.ok(Map.of(
	            "message", "Login successful",
	            "sessionId", session.getId()
	        ));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
	    }
	    
	    
	}
	@PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        userService.logout(request, response);
        return ResponseEntity.ok().body("{\"message\": \"Logout successful\"}");
    }

}
