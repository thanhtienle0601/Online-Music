package com.demo.dtos;

public class PlaylistDto {
	private Integer id;	
	private String name;
	private Integer user_id;
	private String user_username;
	
	public PlaylistDto() {}
	
	public PlaylistDto(Integer id, String name, Integer user_id, String user_username) {
		super();
		this.id = id;
		this.name = name;
		this.user_id = user_id;
		this.user_username = user_username;
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
	public Integer getUser_id() {
		return user_id;
	}
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	public String getUser_username() {
		return user_username;
	}
	public void setUser_username(String user_username) {
		this.user_username = user_username;
	}
	
	
}
