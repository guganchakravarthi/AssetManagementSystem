package com.example.demo.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class EmployeeDto {
	 private String name;
	    private String domain;
	    
	    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	    private Date dateOfJoin;
	    private int salary;
	
}
