package com.demo.controllers;

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

import com.demo.dtos.PlaylistDto;
import com.demo.dtos.UserDto;
import com.demo.services.PlaylistService;

@RestController
@RequestMapping("api/playlist")
@CrossOrigin(origins = "*")
public class PlaylistAPIController {
	
	@Autowired
	private PlaylistService playlistService;
		
	@RequestMapping(value = "find/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<PlaylistDto> find(@PathVariable("id") int id){
		try {
			return new ResponseEntity<PlaylistDto>(playlistService.findByIdDto(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<PlaylistDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findByUserIdAndName/{userid}/{name}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<PlaylistDto> findByUserIdAndName(@PathVariable("userid") int userid,@PathVariable("name") String name){
		try {
			return new ResponseEntity<PlaylistDto>(playlistService.findPlaylistByNameAndUserId(userid, name), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<PlaylistDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<Iterable<PlaylistDto>> findAll(){
		try {
			return new ResponseEntity<Iterable<PlaylistDto>>(playlistService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Iterable<PlaylistDto>>(HttpStatus.BAD_REQUEST);
		}
	}
		
	@RequestMapping(value = "create", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Object> create(@RequestBody PlaylistDto playlistDto){
		
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = playlistService.save(playlistDto);
				public PlaylistDto playlist = playlistService.findPlaylistByNameAndUserId(playlistDto.getUser_id(),playlistDto.getName()); 
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "update", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
	public ResponseEntity<Object> update(@RequestBody PlaylistDto playlistDto){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = playlistService.save(playlistDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "delete/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = playlistService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}	
}
