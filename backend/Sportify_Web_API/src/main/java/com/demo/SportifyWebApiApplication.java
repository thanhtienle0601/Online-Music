package com.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SportifyWebApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SportifyWebApiApplication.class, args);
	}

}
