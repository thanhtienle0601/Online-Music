package com.demo.dtos;

public class ArtistDto {
	
	private Integer id;
	private String name;
	private String photo;
	
	public ArtistDto() {}
	
	public ArtistDto(Integer id, String name, String photo) {
		super();
		this.id = id;
		this.name = name;
		this.photo = photo;
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
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
	
}
