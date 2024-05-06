package com.demo.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.dtos.UserDto;
import com.demo.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	@Query("select new com.demo.dtos.UserDto"
			+ "(id, fullname, email, phone, username, password, avt, code, status, ispremium) from User where email = :email")
	public UserDto findByEmail(@Param("email") String email);
	
	@Query("select new com.demo.dtos.UserDto"
			+ "(id, fullname, email, phone, username, password, avt, code, status, ispremium) from User where email = :email")
	public User findByEmail2(@Param("email") String email);
	
	@Query("select new com.demo.dtos.UserDto"
			+ "(id, fullname, email, phone, username, password, avt, code, status, ispremium) from User where username = :username")
	public UserDto findByUsername(@Param("username") String username);
}
