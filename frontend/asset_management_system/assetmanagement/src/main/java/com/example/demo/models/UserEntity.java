package com.example.demo.models;

	import jakarta.persistence.*;
	import lombok.AllArgsConstructor;
	import lombok.Data;
	import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
	    
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private long id;

	    @Column(nullable = false)
	    private String name;

	    @Column(nullable = false)
	    private String role;

	    @Column(nullable = false, unique = true)
	    private String email;

	    @Column(nullable = false)
	    private String password;

		public UserEntity(String name, String role, String email, String password) {
			super();
			this.name = name;
			this.role = role;
			this.email = email;
			this.password = password;
		} 
	    
	    
	}


