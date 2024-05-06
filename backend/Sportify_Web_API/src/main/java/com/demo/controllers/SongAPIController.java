package com.demo.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

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

import com.demo.dtos.SongAritstDto;
import com.demo.dtos.SongDto;
import com.demo.helpers.FileHelper;
import com.demo.models.Album;
import com.demo.models.Genre;
import com.demo.services.AlbumService;
import com.demo.services.GenreService;
import com.demo.services.SongService;

@RestController
@RequestMapping("api/song")
@CrossOrigin(origins = "*")
public class SongAPIController {
	
	@Autowired
	private SongService songService;
	
	@Autowired
	private AlbumService albumService;

	@Autowired
	private GenreService genreService;
	
	@RequestMapping(value = "find/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<SongAritstDto> find(@PathVariable("id") int id){
		try {
			return new ResponseEntity<SongAritstDto>(songService.findSongById(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<SongAritstDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<Iterable<SongDto>> findAll(){
		try {
			return new ResponseEntity<Iterable<SongDto>>(songService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Iterable<SongDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll2", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<List<SongAritstDto>> findAll2(){
		try {
			return new ResponseEntity<List<SongAritstDto>>(songService.findAll2(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<SongAritstDto>>(HttpStatus.BAD_REQUEST);
		}
	}
		
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestPart SongDto songDto, @RequestParam("songFile") MultipartFile songFile){
		Album album = albumService.find(songDto.getAlbum_id());		
		if(album == null) 
			return new ResponseEntity<Object>("Album is not exist",HttpStatus.BAD_REQUEST);
				
		Genre genre = genreService.find(songDto.getGenre_id());
		if(genre == null) 
			return new ResponseEntity<Object>("Genre is not exist",HttpStatus.BAD_REQUEST);
				
		try {									
//			songDto.setPhoto(uploadPhoto(file, null));
			songDto.setUrl(uploadSong(songFile, null));
			return new ResponseEntity<Object>(new Object() {
				public boolean status = songService.save(songDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<Object> update(@RequestPart SongDto songDto,@RequestParam("songFile") MultipartFile songFile){
		
		Album album = albumService.find(songDto.getAlbum_id());		
		if(album == null) 
			return new ResponseEntity<Object>("Album is not exist",HttpStatus.BAD_REQUEST);
				
		Genre genre = genreService.find(songDto.getGenre_id());
		if(genre == null) 
			return new ResponseEntity<Object>("Genre is not exist",HttpStatus.BAD_REQUEST);
				
		try {		
//			String songPhoto = songService.find(songDto.getId()).getPhoto();
			String songUrl = songService.find(songDto.getId()).getUrl();
			
//			if(file.isEmpty()) {
//				songDto.setPhoto(songPhoto);
//			} else {
//				songDto.setPhoto(uploadPhoto(file, songPhoto));
//			}
			if(songFile.isEmpty()) {
				songDto.setUrl(songUrl);	
			} else {
				songDto.setUrl(uploadSong(songFile, songUrl));
			}
			
			return new ResponseEntity<Object>(new Object() {
				public boolean status = songService.save(songDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "delete/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		try {
			var songDetele = songService.find(id);
			File saveFile = new ClassPathResource("static/uploads").getFile();
			Files.delete(Paths.get(saveFile.getAbsolutePath() + File.separator + songDetele.getUrl()));
			return new ResponseEntity<Object>(new Object() {
				public boolean status = songService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}	
	
	@RequestMapping(value = "findByKeyword/{keyword}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<List<SongAritstDto>> findByKeyword(@PathVariable("keyword") String keyword) {
		try {
			return new ResponseEntity<List<SongAritstDto>>(songService.findByKeyword(keyword),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<SongAritstDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findByAlbumId/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<List<SongAritstDto>> findByAlbumId(@PathVariable("id") int id) {
		try {
			return new ResponseEntity<List<SongAritstDto>>(songService.findSongByAlbumId(id),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<SongAritstDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findByArtistId/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<List<SongAritstDto>> findByArtistId(@PathVariable("id") int id) {
		try {
			return new ResponseEntity<List<SongAritstDto>>(songService.findSongByArtistId(id),HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<SongAritstDto>>(HttpStatus.BAD_REQUEST);
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
	
	private String uploadSong(MultipartFile file, String fileName) throws IOException {
		File uploadFolder = new File(new ClassPathResource(".").getFile().getPath() + "/static/sources");
		if (!uploadFolder.exists()) {
			uploadFolder.mkdirs();
		}	
		String Filename = FileHelper.generateFileName(file.getOriginalFilename());
		
		File saveFile = new ClassPathResource("static/sources").getFile();
		Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + Filename);
		if(fileName != null) {
			Files.delete(Paths.get(saveFile.getAbsolutePath() + File.separator + fileName));
		}
		Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
		return Filename;
	}
}
