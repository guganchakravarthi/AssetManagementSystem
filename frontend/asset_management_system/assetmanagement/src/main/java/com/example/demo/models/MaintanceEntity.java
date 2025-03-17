package com.example.demo.models;


import java.sql.Date;
import java.time.LocalDate;



import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "maintance_table")
public class MaintanceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Date dateOfService;
    private String issue;
    private String status;

    @ManyToOne
    @JoinColumn(name = "asset_id", referencedColumnName = "id", nullable = true)
    private AssetModel asset;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = true)
    private EmployeeEntity employee;
}
