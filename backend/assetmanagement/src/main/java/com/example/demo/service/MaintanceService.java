package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.MaintanceDto;
import com.example.demo.models.AssetModel;
import com.example.demo.models.EmployeeEntity;
import com.example.demo.models.MaintanceEntity;
import com.example.demo.repository.AssetRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.MaintanceRepository;

@Service
public class MaintanceService {
	@Autowired
	MaintanceRepository maintanceRepository;
	@Autowired
	EmployeeRepository employeeRepository;
	@Autowired
	AssetRepository assetRepository;

	public MaintanceEntity insertToService(int empId, MaintanceDto maintanceDto) {
        EmployeeEntity model = employeeRepository.findById(empId).orElseThrow(() -> new RuntimeException("Employee not found with ID: " + empId));

        AssetModel asset = model.getAssetModel();
        

        if (asset == null) {
            throw new RuntimeException("No asset found for employee ID: " + empId);
        }

        MaintanceEntity maintenance = new MaintanceEntity();
        maintenance.setAsset(asset);
        maintenance.setEmployee(model);
        maintenance.setDateOfService(maintanceDto.getDateOfService());
        maintenance.setIssue(maintanceDto.getIssue());
        maintenance.setStatus(maintanceDto.getStatus());

        model.setAssetModel(null);
        employeeRepository.save(model);

        asset.setStatus("service");
        assetRepository.save(asset);

        return maintanceRepository.save(maintenance);
    }

	public MaintanceEntity updateStatus(int maintanceId, MaintanceDto maintanceDto) {
	    Optional<MaintanceEntity> existingMaintance = maintanceRepository.findById(maintanceId);

	    if (existingMaintance.isPresent()) {
	        MaintanceEntity model = existingMaintance.get();
	        AssetModel asset = model.getAsset();

	        model.setStatus(maintanceDto.getStatus());

	        if ("fixed".equalsIgnoreCase(model.getStatus())) {
	            if (asset != null) {
	                asset.setStatus("warehouse");
	                assetRepository.save(asset);
	            } else {
	                throw new RuntimeException("No asset associated with this maintenance record.");
	            }
	        }
	        return maintanceRepository.save(model);
	    } else {
	        throw new RuntimeException("Maintenance record not found with ID: " + maintanceId);
	    }
	}

	public List<MaintanceEntity> get() {
		// TODO Auto-generated method stub
		return null;
	}

}


