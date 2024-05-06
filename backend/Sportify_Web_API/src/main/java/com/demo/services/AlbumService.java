package com.demo.services;

import com.demo.dtos.AlbumDto;
import com.demo.models.Album;

public interface AlbumService {
	
	public AlbumDto findByIdDto(int id);
	
	public Album find(int id);
	
	public  Iterable<AlbumDto> findAll();
	
	public boolean save(AlbumDto albumDto);
	
	public boolean delete(int id);

}
