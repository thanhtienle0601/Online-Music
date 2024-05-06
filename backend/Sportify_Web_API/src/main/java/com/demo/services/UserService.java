package com.demo.services;

import java.util.List;

import com.demo.dtos.UserDto;
import com.demo.models.User;

public interface UserService {
	
	public User find(int id);
	
	public UserDto findByIdDto(int id);
	
	public UserDto findByUsername(String username);
	
	public boolean login(String username, String password);
	
	public UserDto findByEmail(String email);
	
	public UserDto findByEmail2(String email);
	
	public  List<UserDto> findAll();
	
	public boolean save(UserDto userDto);
	
	public boolean delete(int id);

}
