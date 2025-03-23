package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dto.EmployeeDto;
import com.example.demo.models.AssetModel;
import com.example.demo.models.EmployeeEntity;
import com.example.demo.repository.AssetRepository;
import com.example.demo.repository.EmployeeRepository;

import jakarta.transaction.Transactional;


@Service
public class EmployeeService {
	@Autowired
	EmployeeRepository employeeRepository;
	@Autowired
	AssetRepository assetRepository;
	
	
	public EmployeeEntity insert(EmployeeDto employeeDto) {
		EmployeeEntity employee=new EmployeeEntity( employeeDto.getName(),employeeDto.getDomain(), employeeDto.getDateOfJoin(),employeeDto.getSalary());
	
		return employeeRepository.save(employee);
	}

	public Optional<EmployeeEntity> update(int id, EmployeeDto employeeDto) {
		Optional<EmployeeEntity> exictingEmployee= employeeRepository.findById(id);
		if(exictingEmployee.isPresent()) {
			EmployeeEntity model= exictingEmployee.get();
			model.setName(employeeDto.getName());
			model.setDomain(employeeDto.getDomain());
			model.setDateOfJoin(employeeDto.getDateOfJoin());
			model.setSalary(employeeDto.getSalary());
			employeeRepository.save(model);
		}
		return exictingEmployee ;
	}

	public List<EmployeeEntity> getAllEmployee() {
		return employeeRepository.findAll();
	}

//	public String deletebyId(int id) {
//		Optional<EmployeeEntity> exictingEmployee=employeeRepository.findById(id);
//		if(exictingEmployee.isPresent()) {
//			employeeRepository.deleteById(id);
//			return "successfully deleted";
//		}else {
//			return"user not found";
//		}
//	}

	public EmployeeEntity assignExistingAssetToEmployee(int empId, int assetId) {
		EmployeeEntity employee=employeeRepository.findById(empId).orElseThrow(() -> new RuntimeException("Employee not found"));
		
		AssetModel assetModel=assetRepository.findById(assetId).orElseThrow(()-> new RuntimeException(" asset not found"));
		
		 switch (assetModel.getStatus()) {
	        case "warehouse":
	            assetModel.setStatus("active");
	            assetModel.setEmployeeEntity(employee);
	            employee.setAssetModel(assetModel);
	            assetRepository.save(assetModel);
	            return employeeRepository.save(employee);

	        case "active":
	            throw new RuntimeException("Asset is already assigned to another employee.");

	        case "service":
	            throw new RuntimeException("The asset is under maintenance.");

	        default:
	            throw new RuntimeException("Invalid asset status.");
	    }
		
	
	}
	

	public Optional<EmployeeEntity> getEmployeeByAssetId(int assetId) {

		return employeeRepository.findByAssetModelId(assetId);
	}

	@Transactional
	public String deleteEmployeeAndAssetReturns(int id) {
	    Optional<EmployeeEntity> existingEmployee = employeeRepository.findById(id);
	    
	    if (existingEmployee.isPresent()) {
	        EmployeeEntity employee = existingEmployee.get();
	        
	        if (employee.getAssetModel() != null) {
	            AssetModel model = employee.getAssetModel();
	            model.setStatus("warehouse");
	            model.setEmployeeEntity(null);
	            assetRepository.save(model); // Update the asset before deleting the employee
	        }

	        employeeRepository.deleteById(id); // Now delete the employee
	        return "Successfully deleted";
	    } else {
	        return "Employee not found";
	    }
	}
}