package com.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.dtos.SongAritstDto;
import com.demo.dtos.SongDto;
import com.demo.models.Song;

@Repository
public interface SongRepository extends CrudRepository<Song, Integer> {
	@Query("select new com.demo.dtos.SongDto"
			+ "(s.id,s.title,s.album.photo,s.url,s.ispremium,s.liked,s.album.id,s.genre.id,s.album.name,s.genre.name,a.id,a.name) from Song s, Artist a where a.id = s.album.artist.id and s.id = :id")
	public SongDto findSongById(@Param("id") int id);
	
	@Query("select new com.demo.dtos.SongDto"
			+ "(s.id,s.title,s.album.photo,s.url,s.ispremium,s.liked,s.album.id,s.genre.id,s.album.name,s.genre.name,a.id,a.name) from Song s, Artist a where a.id = s.album.artist.id ")
	public List<SongDto> findAll2();
	
	@Query("select new com.demo.dtos.SongDto"
			+ "(s.id,s.title,s.album.photo,s.url,s.ispremium,s.liked,s.album.id,s.genre.id,s.album.name,s.genre.name,a.id,a.name) from Song s, Artist a where a.id = s.album.artist.id and s.album.id = :albumId ")
	public List<SongDto> findSongByAlbumId(@Param("albumId") int albumId);
	
	@Query("select new com.demo.dtos.SongDto"
			+ "(s.id,s.title,s.album.photo,s.url,s.ispremium,s.liked,s.album.id,s.genre.id,s.album.name,s.genre.name,a.id,a.name) from Song s, Artist a where a.id = s.album.artist.id and a.id = :artistId ")
	public List<SongDto> findSongByArtistId(@Param("artistId") int artistId);
	
	@Query("select new com.demo.dtos.SongDto"
			+ "(s.id,s.title,s.album.photo,s.url,s.ispremium,s.liked,s.album.id,s.genre.id,s.album.name,s.genre.name,a.id,a.name) from Song s, Artist a where a.id = s.album.artist.id "
			+ "and (s.title like %:keyword% or a.name like %:keyword%)")
	public List<SongDto> findByKeyword(@Param("keyword") String keyword);

}
