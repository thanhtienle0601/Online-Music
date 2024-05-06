package com.demo.services;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dtos.UserDto;
import com.demo.models.User;
import com.demo.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public User find(int id) {
		return userRepository.findById(id).get();
	}

	@Override
	public UserDto findByIdDto(int id) {
		User user = userRepository.findById(id).get();
		return modelMapper.map(user, UserDto.class);
	}
	
	@Override
	public UserDto findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	@Override
	public UserDto findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public List<UserDto> findAll() {
		return modelMapper.map(userRepository.findAll(), new TypeToken<List<UserDto>>(){}.getType());
	}

	@Override
	public boolean save(UserDto userDto) {
		try {
			User user = modelMapper.map(userDto, User.class);
			userRepository.save(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			userRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean login(String email, String password) {
		try {
			UserDto account = userRepository.findByEmail(email);
			
			if (account != null && account.isStatus()) {
				return BCrypt.checkpw(password, account.getPassword());
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public UserDto findByEmail2(String email) {
		User user = userRepository.findByEmail2(email);
		return modelMapper.map(user, UserDto.class);
	}
}
