package com.demo.services;

import org.springframework.web.multipart.MultipartFile;

public interface MailService {
	
	public void send(String from, String to, String title, String content) throws Exception;
	
	public void send(String from, String to, String title, String content, MultipartFile file) throws Exception;
	
	public void send(String from, String to, String title, String content, MultipartFile[] files) throws Exception;
	
}
