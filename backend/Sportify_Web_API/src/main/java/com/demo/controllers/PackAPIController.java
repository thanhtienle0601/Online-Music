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

import com.demo.dtos.PackDto;
import com.demo.services.PackService;

@RestController
@RequestMapping("api/pack")
@CrossOrigin(origins = "*")
public class PackAPIController {
	
	@Autowired
	private PackService packService;
	
	@RequestMapping(value = "find/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<PackDto> find(@PathVariable("id") int id){
		try {
			return new ResponseEntity<PackDto>(packService.findByIdDto(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<PackDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<List<PackDto>> findAll(){
		try {
			return new ResponseEntity<List<PackDto>>(packService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<PackDto>>(HttpStatus.BAD_REQUEST);
		}
	}
		
	@RequestMapping(value = "create", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Object> create(@RequestBody PackDto packDto){		
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = packService.save(packDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "update", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
	public ResponseEntity<Object> update(@RequestBody PackDto packDto){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = packService.save(packDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "delete/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = packService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}	
}
