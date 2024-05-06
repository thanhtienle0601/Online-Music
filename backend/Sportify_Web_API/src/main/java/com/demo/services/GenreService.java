package com.demo.services;

import java.util.List;

import com.demo.dtos.GenreDto;
import com.demo.models.Genre;

public interface GenreService {
	
	public GenreDto findByIdDto(int id);
	
	public Genre find(int id);
	
	public  List<GenreDto> findAll();
	
	public boolean save(GenreDto gerneDto);
	
	public boolean delete(int id);

}
