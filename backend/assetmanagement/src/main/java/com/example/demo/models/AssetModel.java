package com.example.demo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Asset_table")
public class AssetModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String type;
    private String status;
    private Date purchesDate; // Changed from Date to LocalDate
    private long price;

    // One-to-One Relationship with EmployeeEntity
    @OneToOne(mappedBy = "assetModel")
    @JsonBackReference("asset-employee") // Prevents infinite recursion
    private EmployeeEntity employeeEntity;

    
    // One-to-Many Relationship with MaintanceEntity
    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference("asset-maintenance") // Prevents infinite recursion
    private List<MaintanceEntity> maintenanceRecords;

    // Simplified constructor
    public AssetModel(String name, String type, String status, Date purchesDate, long price) {
        this.name = name;
        this.type = type;
        this.status = status;
        this.purchesDate = purchesDate;
        this.price = price;
    }
}
