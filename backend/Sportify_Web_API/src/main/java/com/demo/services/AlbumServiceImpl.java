package com.demo.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dtos.AlbumDto;
import com.demo.models.Album;
import com.demo.repositories.AlbumRepository;

@Service
public class AlbumServiceImpl implements AlbumService {
	
	@Autowired
	private AlbumRepository albumRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public AlbumDto findByIdDto(int id) {
		Album album = albumRepository.findById(id).get();
		return modelMapper.map(album, AlbumDto.class);
	}

	@Override
	public Iterable<AlbumDto> findAll() {
		return modelMapper.map(albumRepository.findAll(), new TypeToken<List<AlbumDto>>(){}.getType());
	}

	@Override
	public boolean save(AlbumDto albumDto) {
		try {
			Album album = modelMapper.map(albumDto, Album.class);
			albumRepository.save(album);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			albumRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Album find(int id) {
		return albumRepository.findById(id).get();
	}

	
}
