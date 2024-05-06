package com.demo.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import static jakarta.persistence.GenerationType.IDENTITY;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "album")
public class Album implements java.io.Serializable {

	private Integer id;
	private Artist artist;
	private String name;
	private String description;
	private String photo;
	private Set<Song> songs = new HashSet<Song>(0);

	public Album() {
	}

	public Album(Artist artist, String name, String description,String photo) {
		this.artist = artist;
		this.name = name;
		this.description = description;
		this.photo = photo;
	}

	public Album(Artist artist, String name, String description,String photo, Set<Song> songs) {
		this.artist = artist;
		this.name = name;
		this.description = description;
		this.photo = photo;
		this.songs = songs;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "artistid", nullable = false)
	public Artist getArtist() {
		return this.artist;
	}

	public void setArtist(Artist artist) {
		this.artist = artist;
	}

	@Column(name = "name", nullable = false, length = 200)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "description", nullable = false, length = 65535)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	@Column(name = "photo", nullable = false, length = 65535)
	public String getPhoto() {
		return this.photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "album")
	public Set<Song> getSongs() {
		return this.songs;
	}

	public void setSongs(Set<Song> songs) {
		this.songs = songs;
	}

}
