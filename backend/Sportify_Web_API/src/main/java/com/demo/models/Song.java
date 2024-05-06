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
@Table(name = "song")
public class Song implements java.io.Serializable {

	private Integer id;
	private Album album;
	private Genre genre;
	private String title;
	private String url;
	private boolean ispremium;
	private boolean liked;
	private Set<PlaylistSong> playlistSongs = new HashSet<PlaylistSong>(0);

	public Song() {
	}

	public Song(Album album, Genre genre, String title, String url, boolean ispremium, boolean liked) {
		this.album = album;
		this.genre = genre;
		this.title = title;
		this.liked = liked;
		this.url = url;
		this.ispremium = ispremium;
	}

	public Song(Album album, Genre genre, String title, String url, boolean ispremium,boolean liked,
			Set<PlaylistSong> playlistSongs) {
		this.album = album;
		this.genre = genre;
		this.title = title;
		this.liked = liked;
		this.url = url;
		this.ispremium = ispremium;
		this.playlistSongs = playlistSongs;
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
	@JoinColumn(name = "albumid", nullable = false)
	public Album getAlbum() {
		return this.album;
	}

	public void setAlbum(Album album) {
		this.album = album;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "genreid", nullable = false)
	public Genre getGenre() {
		return this.genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}

	@Column(name = "title", nullable = false, length = 200)
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

//	@Column(name = "photo", nullable = false, length = 200)
//	public String getPhoto() {
//		return this.photo;
//	}
//
//	public void setPhoto(String photo) {
//		this.photo = photo;
//	}
	

	@Column(name = "url", nullable = false, length = 200)
	public String getUrl() {
		return this.url;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}
	
	
	@Column(name = "liked", nullable = false)
	public boolean isLiked() {
		return liked;
	}

	public void setLiked(boolean liked) {
		this.liked = liked;
	}


	@Column(name = "ispremium", nullable = false)
	public boolean isIspremium() {
		return this.ispremium;
	}

	public void setIspremium(boolean ispremium) {
		this.ispremium = ispremium;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "song")
	public Set<PlaylistSong> getPlaylistSongs() {
		return this.playlistSongs;
	}

	public void setPlaylistSongs(Set<PlaylistSong> playlistSongs) {
		this.playlistSongs = playlistSongs;
	}

}
