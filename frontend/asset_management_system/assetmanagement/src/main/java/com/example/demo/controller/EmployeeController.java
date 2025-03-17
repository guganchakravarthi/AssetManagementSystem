package com.example.demo.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.models.EmployeeEntity;
import com.example.demo.service.EmployeeService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;




@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:5174",allowCredentials = "true") 

public class EmployeeController {
	@Autowired
	EmployeeService employeeService;
	
	@PostMapping("/insert")
	public EmployeeEntity insert(@RequestBody EmployeeDto employeeDto) {
		return employeeService.insert(employeeDto);
	}
	@PutMapping("/update/{id}")
	public Optional<EmployeeEntity> update(@PathVariable("id") int id, @RequestBody EmployeeDto employeeDto){
		return employeeService.update(id, employeeDto);
	}
	
	@GetMapping("/all")
	public List<EmployeeEntity> getAllEmployee(){
		return employeeService.getAllEmployee();
	}
	
//	@DeleteMapping("/delete/{id}")
//	public String deleteById(@PathVariable("id") int id) {
//		return employeeService.deletebyId(id);
//	}
	
	@PutMapping("/update/{empid}/asign/{assetId}")
	public EmployeeEntity asignAsset(@PathVariable("empid")int empId,@PathVariable("assetId")int assetId) {
		 return employeeService.assignExistingAssetToEmployee(empId, assetId);
	}
	
	@GetMapping("/getassetId/{assetid}")
	public Optional<EmployeeEntity> getAssetId(@PathVariable("assetid") int assetId){
		return employeeService.getEmployeeByAssetId(assetId);

	}
	@DeleteMapping("/delete/{id}")
	public String deleteEmployee(@PathVariable("id")int id) {
		return employeeService.deleteEmployeeAndAssetReturns(id);
}
	
	
	}