package com.demo.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dtos.PlaylistDto;
import com.demo.models.Playlist;
import com.demo.repositories.PlaylistRepository;

@Service
public class PlaylistServiceImpl implements PlaylistService {
	
	@Autowired
	private PlaylistRepository playlistRepository;
	
	@Autowired
	private ModelMapper modelMapper;


	@Override
	public Playlist find(int id) {
		return playlistRepository.findById(id).get();
	}
	
	@Override
	public PlaylistDto findByIdDto(int id) {
		Playlist playlist = playlistRepository.findById(id).get();
		return modelMapper.map(playlist, PlaylistDto.class);
	}

	@Override
	public List<PlaylistDto> findAll() {
		return modelMapper.map(playlistRepository.findAll(), new TypeToken<List<PlaylistDto>>(){}.getType());
	}

	@Override
	public boolean save(PlaylistDto playlistDto) {
		try {
			Playlist playlist = modelMapper.map(playlistDto, Playlist.class);
			playlistRepository.save(playlist);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			playlistRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public PlaylistDto findPlaylistByNameAndUserId(int userId, String name) {
		return playlistRepository.findPlaylistByNameAndUserId(userId, name);	
	}

	
}
