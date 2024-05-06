package com.demo.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dtos.PlaylistSongDto;
import com.demo.dtos.PlaylistSongDto2;
import com.demo.models.PlaylistSong;
import com.demo.repositories.PlaylistSongRepository;

@Service
public class PlaylistSongServiceImpl implements PlaylistSongService {
	
	@Autowired
	private PlaylistSongRepository playlistSongRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public PlaylistSong find(int id) {
		return playlistSongRepository.findById(id).get();
	}
	
	@Override
	public PlaylistSongDto findByIdDto(int id) {
		PlaylistSong playlistSong = playlistSongRepository.findById(id).get();
		return modelMapper.map(playlistSong, PlaylistSongDto.class);
	}

	@Override
	public List<PlaylistSongDto> findAll() {
		return modelMapper.map(playlistSongRepository.findAll(), new TypeToken<List<PlaylistSongDto>>(){}.getType());
	}

	@Override
	public boolean save(PlaylistSongDto playlistSongDto) {
		try {
			PlaylistSong playlistSong = modelMapper.map(playlistSongDto, PlaylistSong.class);
			playlistSongRepository.save(playlistSong);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			playlistSongRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public PlaylistSongDto findBySongIdAndPlaylist(int songId) {
		return playlistSongRepository.findBySongIdAndPlaylist(songId);
	}

	@Override
	public List<PlaylistSongDto2> findSongsByPlaylistId(int playlistId) {
		return modelMapper.map(playlistSongRepository.findSongsByPlaylistId(playlistId), new TypeToken<List<PlaylistSongDto2>>(){}.getType());
	}

	
}
