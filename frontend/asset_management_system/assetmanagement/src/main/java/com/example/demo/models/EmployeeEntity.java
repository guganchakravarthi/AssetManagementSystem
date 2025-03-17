package com.example.demo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="employee_table")
public class EmployeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String domain;
    private Date dateOfJoin;
    private int salary;

    public EmployeeEntity(String name, String domain,Date dateOfJoin,int salary, AssetModel assetModel) {
		super();
		this.name = name;
		this.domain = domain;
		this.dateOfJoin=dateOfJoin;
		this.salary=salary;
		this.assetModel = assetModel;
	}



	public EmployeeEntity( String name, String domain, Date dateOfJoin, int salary) {
		super();
		
		this.name = name;
		this.domain = domain;
		this.dateOfJoin = dateOfJoin;
		this.salary = salary;
	}



	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "asset_id", referencedColumnName = "id")  
	@JsonManagedReference 
	private AssetModel assetModel;
}
