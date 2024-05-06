package com.demo.dtos;

public class PlaylistSongDto {

	private Integer id;
	private Integer playlist_id;
	private String playlist_name;
	private Integer song_id;
	private String title;
	private String url;
	private boolean liked;
	private String album_photo;
	private String artist_name;
	
	public PlaylistSongDto() {
		super();
	}

	public PlaylistSongDto(Integer id, Integer playlist_id, String playlist_name, Integer song_id, String title,
			String url,boolean liked,String album_photo,String artist_name) {
		super();
		this.id = id;
		this.playlist_id = playlist_id;
		this.playlist_name = playlist_name;
		this.song_id = song_id;
		this.title = title;
		this.url = url;
		this.album_photo = album_photo;
		this.artist_name = artist_name;
		this.liked = liked;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPlaylist_id() {
		return playlist_id;
	}

	public void setPlaylist_id(Integer playlist_id) {
		this.playlist_id = playlist_id;
	}

	public String getPlaylist_name() {
		return playlist_name;
	}

	public void setPlaylist_name(String playlist_name) {
		this.playlist_name = playlist_name;
	}

	public Integer getSong_id() {
		return song_id;
	}

	public void setSong_id(Integer song_id) {
		this.song_id = song_id;
	}

	public String gettitle() {
		return title;
	}

	public void settitle(String title) {
		this.title = title;
	}

	public String geturl() {
		return url;
	}

	public void seturl(String url) {
		this.url = url;
	}

	public String getArtist_name() {
		return artist_name;
	}

	public void setArtist_name(String artist_name) {
		this.artist_name = artist_name;
	}

	public String getalbum_photo() {
		return album_photo;
	}

	public void setalbum_photo(String album_photo) {
		this.album_photo = album_photo;
	}

	public boolean isLiked() {
		return liked;
	}

	public void setLiked(boolean liked) {
		this.liked = liked;
	}
	
	
	
	
}
