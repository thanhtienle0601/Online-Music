package com.demo.services;

import java.util.List;

import com.demo.dtos.ArtistDto;
import com.demo.models.Artist;

public interface ArtistService {
		
	public List<ArtistDto> findAll();
	
	public ArtistDto findByIdDto(int id);
	
	public Artist find(int id);
	
	public boolean save(ArtistDto artistDto);
	
	public boolean delete(int id);

}
