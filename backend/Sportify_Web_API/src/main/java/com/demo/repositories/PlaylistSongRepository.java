package com.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.dtos.PlaylistSongDto;
import com.demo.dtos.UserDto;
import com.demo.models.PlaylistSong;

@Repository
public interface PlaylistSongRepository extends CrudRepository<PlaylistSong, Integer> {
	
	@Query("select new com.demo.dtos.PlaylistSongDto"
			+ "(id, playlist.id, playlist.name, song.id, song.title) from PlaylistSong where song.id = :songId ")
	public PlaylistSongDto findBySongIdAndPlaylist(@Param("songId") int songId);
	
	@Query("select new com.demo.dtos.PlaylistSongDto"
			+ "(p.id, p.playlist.id, p.playlist.name, p.song.id, p.song.title,p.song.url,song.liked,p.song.album.photo,a.name) from PlaylistSong as p ,Artist as a where p.song.album.artist.id = a.id and playlist.id = :playlistId")
	public List<PlaylistSongDto> findSongsByPlaylistId(@Param("playlistId") int playlistId);
}
