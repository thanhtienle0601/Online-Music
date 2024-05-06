package com.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.demo.dtos.PlaylistSongDto;
import com.demo.dtos.PlaylistSongDto2;
import com.demo.models.PlaylistSong;
import com.demo.services.PlaylistSongService;

@RestController
@RequestMapping("api/playlistSong")
@CrossOrigin(origins = "*")
public class PlaylistSongAPIController {
	
	@Autowired
	private PlaylistSongService playlistSongService;
	
	@RequestMapping(value = "find/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<PlaylistSongDto> find(@PathVariable("id") int id){
		try {
			return new ResponseEntity<PlaylistSongDto>(playlistSongService.findByIdDto(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<PlaylistSongDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findBySongId/{idSong}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<PlaylistSongDto> findBySongId(@PathVariable("idSong") int idSong){
		try {
			return new ResponseEntity<PlaylistSongDto>(playlistSongService.findBySongIdAndPlaylist(idSong), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<PlaylistSongDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<List<PlaylistSongDto>> findAll(){
		try {
			return new ResponseEntity<List<PlaylistSongDto>>(playlistSongService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<PlaylistSongDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findSongsByPlaylistId/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<List<PlaylistSongDto2>> findSongsByPlaylistId(@PathVariable("id") int id){
		try {
			return new ResponseEntity<List<PlaylistSongDto2>>(playlistSongService.findSongsByPlaylistId(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<PlaylistSongDto2>>(HttpStatus.BAD_REQUEST);
		}
	}
		
	@RequestMapping(value = "create", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Object> create(@RequestBody PlaylistSongDto playlistSong){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = playlistSongService.save(playlistSong);
			}, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "update", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
	public ResponseEntity<Object> update(@RequestBody PlaylistSongDto playlistSong){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = playlistSongService.save(playlistSong);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "delete/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = playlistSongService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}	
}
