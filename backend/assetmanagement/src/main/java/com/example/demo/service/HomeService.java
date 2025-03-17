package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.AssetRepository;
import com.example.demo.repository.MaintanceRepository;

@Service
public class HomeService {
	
	@Autowired
	AssetRepository assetRepository;
	
	@Autowired
	MaintanceRepository maintanceRepository;
//
	public long home() {
		return assetRepository.count();
	}
	
	
	public long getcount() {
		return maintanceRepository.onProcess();
	}
	
	public long getfixedcount() {
		return maintanceRepository.fixedCount();
	}

}
