package com.demo.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.dtos.ArtistDto;
import com.demo.helpers.FileHelper;
import com.demo.services.ArtistService;

@RestController
@RequestMapping("api/artist")
@CrossOrigin(origins = "*")
public class ArtistAPIController {
	
	@Autowired
	private ArtistService artistService;
		
	@RequestMapping(value = "find/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<ArtistDto> find(@PathVariable("id") int id){
		try {
			return new ResponseEntity<ArtistDto>(artistService.findByIdDto(id), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ArtistDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<Iterable<ArtistDto>> findAll(){
		try {
			return new ResponseEntity<Iterable<ArtistDto>>(artistService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Iterable<ArtistDto>>(HttpStatus.BAD_REQUEST);
		}
	}
		
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestPart String name, @RequestParam("photo") MultipartFile file){				
		try {			
			var artistDto = new ArtistDto();
			artistDto.setName(name);
			artistDto.setPhoto(uploadPhoto(file, null));
			
			return new ResponseEntity<Object>(new Object() {
				public boolean status = artistService.save(artistDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<Object> update(@RequestPart ArtistDto artistDto, @RequestParam("photo") MultipartFile file){
		try {
			String artistPhoto = artistService.find(artistDto.getId()).getPhoto();
			if(file.isEmpty()) {
				artistDto.setPhoto(artistPhoto);
			} else {
				artistDto.setPhoto(uploadPhoto(file, artistPhoto));
			}
			
			return new ResponseEntity<Object>(new Object() {
				public boolean status = artistService.save(artistDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "delete/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		try {
			var artistDetele = artistService.find(id);
			File saveFile = new ClassPathResource("static/uploads").getFile();
			Files.delete(Paths.get(saveFile.getAbsolutePath() + File.separator + artistDetele.getPhoto()));
			return new ResponseEntity<Object>(new Object() {
				public boolean status = artistService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}	
	
	private String uploadPhoto(MultipartFile file, String fileName) throws IOException {
		File uploadFolder = new File(new ClassPathResource(".").getFile().getPath() + "/static/uploads");
		if (!uploadFolder.exists()) {
			uploadFolder.mkdirs();
		}	
		String Filename = FileHelper.generateFileName(file.getOriginalFilename());
		File saveFile = new ClassPathResource("static/uploads").getFile();
		Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + Filename);
		if(fileName != null) {
			Files.delete(Paths.get(saveFile.getAbsolutePath() + File.separator + fileName));
		}
		Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
		return Filename;
	}
}
