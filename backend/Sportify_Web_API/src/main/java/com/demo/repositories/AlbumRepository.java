package com.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.models.Album;

@Repository
public interface AlbumRepository extends CrudRepository<Album, Integer> {
	
	

	
}
