package com.demo.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.dtos.PlaylistDto;
import com.demo.dtos.UserDto;
import com.demo.models.Playlist;

@Repository
public interface PlaylistRepository extends CrudRepository<Playlist, Integer> {
	@Query("select new com.demo.dtos.PlaylistDto"
			+ "(p.id, p.name,user.id,user.fullname) from Playlist as p where user.id = :userId and p.name = :name")
	public PlaylistDto findPlaylistByNameAndUserId(@Param("userId") int userId,@Param("name") String name);

}
