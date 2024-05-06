package com.demo.dtos;

public class GenreDto {
	
	private Integer id;
	private String name;
	
	public GenreDto() {	}
	
	public GenreDto(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
