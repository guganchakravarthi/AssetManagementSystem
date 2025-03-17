package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.models.UserEntity;
import com.example.demo.repository.UserRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		 UserEntity user=userRepository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("not founded"+username));
		return new CustomUserDetails(user);
	}

	
}
