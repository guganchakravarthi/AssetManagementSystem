package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.MaintanceEntity;

public interface MaintanceRepository extends JpaRepository<MaintanceEntity, Integer> {
	@Query(value = "SELECT COUNT(*) FROM maintance_table WHERE status = 'fixed'", nativeQuery = true)
	long fixedCount();

	@Query(value = "SELECT COUNT(*) FROM maintance_table WHERE status = 'Inprocess'", nativeQuery = true)
	long onProcess();




}
