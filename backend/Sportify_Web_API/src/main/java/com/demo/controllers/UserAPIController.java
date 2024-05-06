package com.demo.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.demo.dtos.UserDto;
import com.demo.helpers.FileHelper;
import com.demo.helpers.RandomHelper;
import com.demo.helpers.UploadFileHelper;
import com.demo.services.MailService;
import com.demo.services.UserService;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "*")
public class UserAPIController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private Environment environment;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@RequestMapping(value = "find/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<UserDto> find(@PathVariable("id") int id){
		try {
			return new ResponseEntity<UserDto>(userService.findByIdDto(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<UserDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<Iterable<UserDto>> findAll(){
		try {
			return new ResponseEntity<Iterable<UserDto>>(userService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Iterable<UserDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<Object> update(@RequestPart UserDto userDto,@RequestParam("photo") MultipartFile file){
		try {
			String avt = userService.find(userDto.getId()).getAvt();
			if(file.isEmpty()) {
				userDto.setAvt(avt);
			} else {
				userDto.setAvt(uploadPhoto(file, avt));
			}
			return new ResponseEntity<Object>(new Object() {
				public boolean status = userService.save(userDto);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "delete/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = userService.delete(id);
			}, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}	

	@RequestMapping(value = "verify", method = RequestMethod.GET)
	public ResponseEntity<Object> verify(@RequestParam("email") String email, @RequestParam("security") String security,
			RedirectAttributes redirectAttributes) {
		UserDto user = userService.findByEmail(email);
		
		if (user == null) 
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);	
		
		if (!user.getCode().equals(security)) 
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);		
		
		user.setStatus(true);
		userService.save(user);
		
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@PostMapping("/register")	
	public ResponseEntity<Object> register(@RequestPart UserDto userDto,@RequestParam("avt") MultipartFile file){
		try {			
			if(file == null) {
				userDto.setAvt(null);
			} else {
				userDto.setAvt(UploadFileHelper.uploadPhoto(file, null));
			}
			
			userDto.setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
			userDto.setStatus(false);
			userDto.setCode(RandomHelper.generate(4));
						
			if (userService.save(userDto)) {
				try {
					// Gui email kich hoat
					String content = "Nhan vao <a href='http://localhost:8085/api/user/verify?email=" + userDto.getEmail()
							+ "&security=" + userDto.getCode() + "' onclick='alert('I am a popup!');'>day</a> de kich hoat tai khoan";
					String email = environment.getProperty("spring.mail.username");
					mailService.send(email,userDto.getEmail(), "Verify", content);
					return new ResponseEntity<Object>(new Object() {
						public boolean status = true;
					}, HttpStatus.OK);
				} catch (Exception e) {
					e.printStackTrace();					
				}
			} 			
			
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "login", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE , produces = MimeTypeUtils.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Object> login(@RequestBody UserDto userDto, HttpSession session) {
		if (userService.login(userDto.getEmail(), userDto.getPassword())) {
			UserDto user = userService.findByEmail(userDto.getEmail());
			int id = user.getId();
			session.setAttribute("email", userDto.getEmail());
			return new ResponseEntity<Object>(new Object() {public boolean status = true;
			public UserDto user = userService.findByIdDto(id);}, HttpStatus.OK);
		} 
		return new ResponseEntity<Object>(new Object() {public boolean status = false;}, HttpStatus.BAD_REQUEST);
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
