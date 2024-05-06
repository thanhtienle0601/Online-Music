package com.demo.services;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.demo.dtos.PlaylistSongDto;
import com.demo.dtos.PlaylistSongDto2;
import com.demo.models.PlaylistSong;

public interface PlaylistSongService {
	
	public PlaylistSong find(int id);
	
	public List<PlaylistSongDto2> findSongsByPlaylistId(@Param("playlistId") int playlistId);
	
	public PlaylistSongDto findBySongIdAndPlaylist( int songId);
	
	public PlaylistSongDto findByIdDto(int id);
	
	public  List<PlaylistSongDto> findAll();
	
	public boolean save(PlaylistSongDto playlistSongDto);
	
	public boolean delete(int id);

}
