package com.demo.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dtos.SongAritstDto;
import com.demo.dtos.SongDto;
import com.demo.models.Song;
import com.demo.repositories.SongRepository;

@Service
public class SongServiceImpl implements SongService {
	
	@Autowired
	private SongRepository songRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Song find(int id) {
		return songRepository.findById(id).get();
	}
	
	@Override
	public SongAritstDto findSongById(int id) {
		SongDto song = songRepository.findSongById(id);
		return modelMapper.map(song,SongAritstDto.class);
	}

	@Override
	public List<SongDto> findAll() {
		return modelMapper.map(songRepository.findAll(), new TypeToken<List<SongDto>>(){}.getType());
	}
	
	@Override
	public List<SongAritstDto> findAll2() {
		return modelMapper.map(songRepository.findAll2(), new TypeToken<List<SongAritstDto>>(){}.getType());
	}

	@Override
	public boolean save(SongDto songDto) {
		try {
			Song song = modelMapper.map(songDto, Song.class);
			songRepository.save(song);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			songRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<SongAritstDto> findByKeyword(String keyword) {
		return modelMapper.map(songRepository.findByKeyword(keyword), new TypeToken<List<SongAritstDto>>(){}.getType());
	}

	@Override
	public List<SongAritstDto> findSongByAlbumId(int albumId) {
		return modelMapper.map(songRepository.findSongByAlbumId(albumId), new TypeToken<List<SongAritstDto>>(){}.getType());
	}

	@Override
	public List<SongAritstDto> findSongByArtistId(int artistId) {
		return modelMapper.map(songRepository.findSongByArtistId(artistId), new TypeToken<List<SongAritstDto>>(){}.getType());
	}

	

	
}
