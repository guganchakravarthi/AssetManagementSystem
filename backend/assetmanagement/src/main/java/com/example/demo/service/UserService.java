package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserDto;
import com.example.demo.models.UserEntity;
import com.example.demo.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	AuthenticationManager authenticationManager;

	public String registerUser(UserDto userDto) {
		if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with this email!");
        }

        UserEntity user = new UserEntity(userDto.getName(),userDto.getRole().toUpperCase(), 
                                         userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()));
      
        userRepository.save(user);
        return "User registered successfully!";
	}

	public Authentication login(UserDto userDto) {
		UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword());
		return authenticationManager.authenticate(authenticationToken);
	}

	public void logout(HttpServletRequest request, HttpServletResponse response) {
	   HttpSession httpSession=request.getSession(false);
	   
	   if (httpSession != null) {
		   httpSession.invalidate();
	   }
	   
	   response.setHeader("Set-Cookie", "JSESSIONID=; HttpOnly; Path=/; Max-Age=0");
		
	}

}
