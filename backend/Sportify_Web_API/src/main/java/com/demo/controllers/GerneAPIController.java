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

import com.demo.dtos.GenreDto;
import com.demo.services.GenreService;

@RestController
@RequestMapping("api/genre")
@CrossOrigin(origins = "*")
public class GerneAPIController {
	
	@Autowired
	private GenreService genreService;
	
	@RequestMapping(value = "find/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<GenreDto> find(@PathVariable("id") int id){
		try {
			return new ResponseEntity<GenreDto>(genreService.findByIdDto(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<GenreDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<Iterable<GenreDto>> findAll(){
		try {
			return new ResponseEntity<Iterable<GenreDto>>(genreService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Iterable<GenreDto>>(HttpStatus.BAD_REQUEST);
		}
	}
		
	@RequestMapping(value = "create", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Object> create(@RequestBody GenreDto genreDto){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = genreService.save(genreDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "update", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
	public ResponseEntity<Object> update(@RequestBody GenreDto genreDto){		
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = genreService.save(genreDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "delete/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = genreService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}	
}
