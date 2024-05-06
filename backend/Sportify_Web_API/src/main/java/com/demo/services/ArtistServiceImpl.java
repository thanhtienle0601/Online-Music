package com.demo.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dtos.ArtistDto;
import com.demo.models.Artist;
import com.demo.repositories.ArtistRepository;

@Service
public class ArtistServiceImpl implements ArtistService {
	
	@Autowired
	private ArtistRepository artistRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public boolean save(ArtistDto artistDto) {
		try {
			Artist artist = modelMapper.map(artistDto, Artist.class);
			artistRepository.save(artist);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			artistRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<ArtistDto> findAll() {
		return modelMapper.map(artistRepository.findAll(), new TypeToken<List<ArtistDto>>(){}.getType());
	}

	@Override
	public ArtistDto findByIdDto(int id) {
		Artist artist = artistRepository.findById(id).get();
		return modelMapper.map(artist, ArtistDto.class);
	}

	@Override
	public Artist find(int id) {
		return artistRepository.findById(id).get();
	}

	
}
