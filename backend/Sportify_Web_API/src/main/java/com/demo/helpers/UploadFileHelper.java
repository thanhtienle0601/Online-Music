package com.demo.helpers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.multipart.MultipartFile;

public class UploadFileHelper {
	
	public static String uploadPhoto(MultipartFile file, String fileName) throws IOException {
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
	
	public static String uploadSong(MultipartFile file, String fileName) throws IOException {
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
