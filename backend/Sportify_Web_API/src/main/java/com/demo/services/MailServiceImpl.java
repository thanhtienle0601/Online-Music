package com.demo.services;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.activation.DataHandler;
import jakarta.activation.FileDataSource;
import jakarta.mail.BodyPart;
import jakarta.mail.Multipart;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;

@Service
public class MailServiceImpl implements MailService {

	@Autowired
	private JavaMailSender mailSender;
	
	@Override
	public void send(String from, String to, String title, String content) throws Exception {
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setFrom(from);
		mimeMessageHelper.setTo(to);
		mimeMessageHelper.setSentDate(new Date());
		mimeMessageHelper.setSubject(title);
		mimeMessageHelper.setText(content, true);
		mailSender.send(mimeMessage);
		
	}

	@Override
	public void send(String from, String to, String title, String content, MultipartFile file) throws Exception {
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setFrom(from);
		mimeMessageHelper.setTo(to);
		mimeMessageHelper.setSubject(title);
		
		//Chua noi dung va file dinh kem
		Multipart multipart = new MimeMultipart();
		
		//Noi dung email
		BodyPart bodyPart = new MimeBodyPart();
		bodyPart.setContent(content, "text/html");
		multipart.addBodyPart(bodyPart);
		
		//File dinh kem
		MimeBodyPart mimeBodyPart = new MimeBodyPart();
		mimeBodyPart.setFileName(file.getOriginalFilename());
		FileDataSource fileDataSource = new FileDataSource(convert(file));
		mimeBodyPart.setDataHandler(new DataHandler(fileDataSource));
		multipart.addBodyPart(mimeBodyPart);
		
		mimeMessage.setContent(multipart);
		
		mailSender.send(mimeMessage);
	
	}
	
	private File convert(MultipartFile multipartFile) {
		try {
			File file = new File(multipartFile.getOriginalFilename());
			file.createNewFile();
			FileOutputStream fileOutputStream = new FileOutputStream(file);
			fileOutputStream.write(multipartFile.getBytes());
			fileOutputStream.close();
			return file;
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public void send(String from, String to, String title, String content, MultipartFile[] files) throws Exception {
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setFrom(from);
		mimeMessageHelper.setTo(to);
		mimeMessageHelper.setSubject(title);
		
		//Chua noi dung va file dinh kem
		Multipart multipart = new MimeMultipart();
		
		//Noi dung email
		BodyPart bodyPart = new MimeBodyPart();
		bodyPart.setContent(content, "text/html");
		multipart.addBodyPart(bodyPart);
		
		//Cac file dinh kem
		for(MultipartFile file : files) {
			MimeBodyPart mimeBodyPart = new MimeBodyPart();
			mimeBodyPart.setFileName(file.getOriginalFilename());
			FileDataSource fileDataSource = new FileDataSource(convert(file));
			mimeBodyPart.setDataHandler(new DataHandler(fileDataSource));
			multipart.addBodyPart(mimeBodyPart);
		}
		
		mimeMessage.setContent(multipart);
		
		mailSender.send(mimeMessage);
		
	}

}
