package com.example.demo.dto;


import java.sql.Date;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class AssetDto {

	private String name;
	private String type;
	private String status;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date purchaseDate;
	
	private long price;
}
