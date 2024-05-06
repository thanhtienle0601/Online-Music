package com.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.models.Genre;

@Repository
public interface GenreRepository extends CrudRepository<Genre, Integer> {

}
