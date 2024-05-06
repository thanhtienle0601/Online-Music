package com.demo.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dtos.GenreDto;
import com.demo.models.Genre;
import com.demo.repositories.GenreRepository;

@Service
public class GenrServiceImpl implements GenreService {
	
	@Autowired
	private GenreRepository genreRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public boolean save(GenreDto gerneDto) {
		try {
			Genre genre = modelMapper.map(gerneDto, Genre.class);
			genreRepository.save(genre);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public boolean delete(int id) {
		try {
			genreRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Genre find(int id) {
		return genreRepository.findById(id).get();
	}

	@Override
	public  List<GenreDto> findAll() {
		return modelMapper.map(genreRepository.findAll(), new TypeToken<List<GenreDto>>(){}.getType());
	}

	@Override
	public GenreDto findByIdDto(int id) {
		Genre genre = genreRepository.findById(id).get();
		return modelMapper.map(genre, GenreDto.class);
	}
}
