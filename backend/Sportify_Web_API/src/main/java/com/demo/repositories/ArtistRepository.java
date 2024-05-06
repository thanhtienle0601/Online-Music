package com.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.models.Artist;

@Repository
public interface ArtistRepository extends CrudRepository<Artist, Integer> {

}
