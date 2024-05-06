package com.demo.services;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.demo.dtos.SongAritstDto;
import com.demo.dtos.SongDto;
import com.demo.models.Song;

public interface SongService {
	
	public SongAritstDto findSongById(int id);
	
	public Song find(int id);
	
	public  List<SongDto> findAll();
	
	public  List<SongAritstDto> findAll2();
	
	public List<SongAritstDto> findSongByAlbumId(int albumId);
	
	public List<SongAritstDto> findSongByArtistId(int artistId);
	
	public boolean save(SongDto songDto);
	
	public boolean delete(int id);
	
	public List<SongAritstDto> findByKeyword(String keyword);

}
