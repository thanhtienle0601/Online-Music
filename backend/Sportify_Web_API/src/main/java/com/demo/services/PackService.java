package com.demo.services;

import java.util.List;

import com.demo.dtos.PackDto;
import com.demo.models.Pack;

public interface PackService {
	
	public Pack find(int id);
	
	public PackDto findByIdDto(int id);
	
	public  List<PackDto> findAll();
	
	public boolean save(PackDto packDto);
	
	public boolean delete(int id);

}
