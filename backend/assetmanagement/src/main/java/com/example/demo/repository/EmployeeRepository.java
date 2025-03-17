package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.demo.models.EmployeeEntity;


public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Integer>{
	
	Optional<EmployeeEntity> findByAssetModelId(Integer assetId);
	
	
}
