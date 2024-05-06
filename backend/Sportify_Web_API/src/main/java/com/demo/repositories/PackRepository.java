package com.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.models.Pack;

@Repository
public interface PackRepository extends CrudRepository<Pack, Integer> {

}
