package com.demo.dtos;

public class AlbumDto {
	
	private int id;
	private int artist_id;
	private String artist_name;
	private String artist_photo;
	private String name;
	private String description;	
	private String photo;
	
	public AlbumDto() {}
	
	public AlbumDto(int id, String name, String description,String photo,int artist_id, String artist_name,String artist_photo) {
		super();
		this.id = id;		
		this.name = name;
		this.description = description;
		this.photo = photo;
		this.artist_id = artist_id;
		this.artist_name = artist_name;
		this.artist_photo = artist_photo;
	}
	
	public int getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public int getArtist_id() {
		return artist_id;
	}
	public void setArtist_id(int artist_id) {
		this.artist_id = artist_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getArtist_name() {
		return artist_name;
	}
	public void setArtist_name(String artist_name) {
		this.artist_name = artist_name;
	}

	public String getArtist_photo() {
		return artist_photo;
	}

	public void setArtist_photo(String artist_photo) {
		this.artist_photo = artist_photo;
	}

	public void setId(int id) {
		this.id = id;
	}	
	
	
}
