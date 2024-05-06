package com.demo.dtos;

public class SongAritstDto {
	
	private Integer id;
	private String title;
	private String album_photo;
	private String url;
	private boolean ispremium;
	private boolean liked;
	private Integer album_id;
	private Integer genre_id;
	private String album_name;
	private String genre_name;
	private Integer artist_id;
	private String artist_name;
	
	public SongAritstDto() {}

	public SongAritstDto(Integer id, String title, String album_photo, String url, boolean ispremium,boolean liked, Integer album_id,
			Integer genre_id, String album_name, String genre_name,Integer artist_id, String artist_name) {
		super();
		this.id = id;
		this.title = title;
		this.album_photo = album_photo;
		this.url = url;
		this.ispremium = ispremium;
		this.liked = liked;
		this.album_id = album_id;
		this.genre_id = genre_id;
		this.album_name = album_name;
		this.genre_name = genre_name;
		this.artist_name = artist_name;
		this.artist_id = artist_id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAlbum_photo() {
		return album_photo;
	}

	public void setAlbum_photo(String album_photo) {
		this.album_photo = album_photo;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public boolean isIspremium() {
		return ispremium;
	}

	public void setIspremium(boolean ispremium) {
		this.ispremium = ispremium;
	}

	public Integer getAlbum_id() {
		return album_id;
	}

	public void setAlbum_id(Integer album_id) {
		this.album_id = album_id;
	}

	public Integer getGenre_id() {
		return genre_id;
	}

	public void setGenre_id(Integer genre_id) {
		this.genre_id = genre_id;
	}

	public String getAlbum_name() {
		return album_name;
	}

	public void setAlbum_name(String album_name) {
		this.album_name = album_name;
	}

	public String getGenre_name() {
		return genre_name;
	}

	public void setGenre_name(String genre_name) {
		this.genre_name = genre_name;
	}

	public String getArtist_name() {
		return artist_name;
	}

	public void setArtist_name(String artist_name) {
		this.artist_name = artist_name;
	}

	public boolean isLiked() {
		return liked;
	}

	public void setLiked(boolean liked) {
		this.liked = liked;
	}

	public Integer getArtist_id() {
		return artist_id;
	}

	public void setArtist_id(Integer artist_id) {
		this.artist_id = artist_id;
	}
	
	
}
