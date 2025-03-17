package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.MaintanceDto;
import com.example.demo.models.MaintanceEntity;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.MaintanceService;

@RestController
@RequestMapping("/maintance")
@CrossOrigin(origins = "http://localhost:5174") 
public class MaintanaceController {
	
	@Autowired
	MaintanceService maintanceService;
	
	@PostMapping("/insert/{empId}")
	public MaintanceEntity insert(@PathVariable("empId") int empId,@RequestBody MaintanceDto maintanceDto) {
		return maintanceService.insertToService(empId,maintanceDto);
	}
	
	@PutMapping("/update/{maintanceId}")
	public MaintanceEntity updateStatus(@PathVariable("maintanceId")int maintanceId, @RequestBody MaintanceDto maintanceDto) {
		return maintanceService.updateStatus(maintanceId,maintanceDto);
	}
	
	@GetMapping("/get")
	public List<MaintanceEntity>get(){
		return maintanceService.get();
	}
}
