package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.HomeService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:5174") 
public class HomeController {
	
	@Autowired
	HomeService homeService;
	
	@GetMapping("/")
	public Map<String, Long> getStatusCounts() {
		 Map<String, Long> statusCount= new HashMap<>();
		 statusCount.put("asset",homeService.home());
		 statusCount.put("onprocess", homeService.getcount());
		 statusCount.put("fixed", homeService.getfixedcount());
		 return statusCount;
		 
	}

}
