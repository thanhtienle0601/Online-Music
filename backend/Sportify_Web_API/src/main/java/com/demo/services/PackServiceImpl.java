package com.demo.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dtos.PackDto;
import com.demo.models.Pack;
import com.demo.repositories.PackRepository;

@Service
public class PackServiceImpl implements PackService {
	
	@Autowired
	private PackRepository packRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public Pack find(int id) {
		return packRepository.findById(id).get();
	}
	
	@Override
	public PackDto findByIdDto(int id) {
		Pack pack = packRepository.findById(id).get();
		return modelMapper.map(pack, PackDto.class);
	}

	@Override
	public List<PackDto> findAll() {
		return modelMapper.map(packRepository.findAll(), new TypeToken<List<PackDto>>(){}.getType());
	}

	@Override
	public boolean save(PackDto packDto) {
		try {
			Pack pack = modelMapper.map(packDto, Pack.class);
			packRepository.save(pack);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			packRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	
}
