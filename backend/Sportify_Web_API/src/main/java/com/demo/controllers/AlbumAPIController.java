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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.dtos.AlbumDto;
import com.demo.dtos.ArtistDto;
import com.demo.dtos.SongDto;
import com.demo.helpers.FileHelper;
import com.demo.models.Album;
import com.demo.models.Genre;
import com.demo.services.AlbumService;

@RestController
@RequestMapping("api/album")
@CrossOrigin(origins = "*")
public class AlbumAPIController {
	
	@Autowired
	private AlbumService albumService;
	
	@RequestMapping(value = "find/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<AlbumDto> find(@PathVariable("id") int id){
		try {
			return new ResponseEntity<AlbumDto>(albumService.findByIdDto(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<AlbumDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<Iterable<AlbumDto>> findAll(){
		try {
			return new ResponseEntity<Iterable<AlbumDto>>(albumService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Iterable<AlbumDto>>(HttpStatus.BAD_REQUEST);
		}
	}
		
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestPart AlbumDto albumDto, @RequestParam("photo") MultipartFile file){	
		try {									
			albumDto.setPhoto(uploadPhoto(file, null));
			return new ResponseEntity<Object>(new Object() {
				public boolean status = albumService.save(albumDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<Object> update(@RequestPart AlbumDto albumDto, @RequestParam("photo") MultipartFile file){
		try {
			String albumPhoto = albumService.find(albumDto.getId()).getPhoto();
			if(file.isEmpty()) {
				albumDto.setPhoto(albumPhoto);
			} else {
				albumDto.setPhoto(uploadPhoto(file, albumPhoto));
			}
			
			return new ResponseEntity<Object>(new Object() {
				public boolean status = albumService.save(albumDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "delete/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		try {
			var albumDetele = albumService.find(id);
			File saveFile = new ClassPathResource("static/uploads").getFile();
			Files.delete(Paths.get(saveFile.getAbsolutePath() + File.separator + albumDetele.getPhoto()));
			return new ResponseEntity<Object>(new Object() {
				public boolean status = albumService.delete(id);
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
