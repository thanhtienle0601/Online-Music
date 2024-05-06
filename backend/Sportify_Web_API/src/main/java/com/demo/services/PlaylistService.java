package com.demo.services;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.demo.dtos.PlaylistDto;
import com.demo.models.Playlist;

public interface PlaylistService {
	
	public Playlist find(int id);
	
	public PlaylistDto findByIdDto(int id);
	
	public  List<PlaylistDto> findAll();
	
	public boolean save(PlaylistDto playlistDto);
	
	public boolean delete(int id);
	
	public PlaylistDto findPlaylistByNameAndUserId(int userId,String name);

}
