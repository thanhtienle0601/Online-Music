package com.demo.configurations;

import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import com.demo.dtos.AlbumDto;
import com.demo.dtos.ArtistDto;
import com.demo.dtos.InvoiceDto;
import com.demo.dtos.PlaylistDto;
import com.demo.dtos.PlaylistSongDto;
import com.demo.dtos.PlaylistSongDto2;
import com.demo.dtos.SongAritstDto;
import com.demo.dtos.SongDto;
import com.demo.dtos.UserDto;
import com.demo.models.Album;
import com.demo.models.Artist;
import com.demo.models.Genre;
import com.demo.models.Invoice;
import com.demo.models.Pack;
import com.demo.models.Playlist;
import com.demo.models.PlaylistSong;
import com.demo.models.Song;
import com.demo.models.User;


@Configuration
public class ModelMapperConfiguration {
	
	@Autowired
	private Environment environment;
	
	@Bean
	public ModelMapper mapper() {
		
		ModelMapper modelMapper = new ModelMapper();		
				
		PlaylistSongMapping(modelMapper);
		PlaylistSongMapping2(modelMapper);
		PlaylistMapping(modelMapper);
		InvoiceMapping(modelMapper);		
		AlbumMapping(modelMapper);
		ArtistMapping(modelMapper);
		SongMapping(modelMapper);
		SongAritsMapping(modelMapper);
		UserMapping(modelMapper);
		
		return modelMapper;
	}
		
	private void PlaylistSongMapping(ModelMapper modelMapper) {
		Converter<String, String> converterPhotoToPhotoURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-upload") + source;
			}
		};
		
		modelMapper.typeMap(PlaylistSongDto.class, PlaylistSongDto2.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToPhotoURL).map(PlaylistSongDto::geturl, PlaylistSongDto2::seturl);
		});
		
		Converter<Integer, Playlist> converterIntegerToPlaylist = new AbstractConverter<Integer, Playlist>() {
			@Override
			protected Playlist convert(Integer source) {
				Playlist playlist = new Playlist();
				playlist.setId(source);
				return playlist;
			}
		};
		
		modelMapper.typeMap(PlaylistSongDto.class, PlaylistSong.class).addMappings(mapper -> {
			mapper.using(converterIntegerToPlaylist).map(PlaylistSongDto::getPlaylist_id, PlaylistSong::setPlaylist);
		});
		
		Converter<Integer, Song> converterIntegerToSong = new AbstractConverter<Integer, Song>() {
			@Override
			protected Song convert(Integer source) {
				Song song = new Song();
				song.setId(source);
				return song;
			}
		};
				
		modelMapper.typeMap(PlaylistSongDto.class, PlaylistSong.class).addMappings(mapper -> {
			mapper.using(converterIntegerToSong).map(PlaylistSongDto::getSong_id, PlaylistSong::setSong);
		});		
		
		modelMapper.addMappings(new PropertyMap<PlaylistSong, PlaylistSongDto>() {
			@Override
			protected void configure() {
				map().setPlaylist_id(source.getPlaylist().getId());
				map().setPlaylist_name(source.getPlaylist().getName());		
				map().setSong_id(source.getSong().getId());;
				map().settitle(source.getSong().getTitle());
				map().seturl(source.getSong().getUrl());
				map().setalbum_photo(source.getSong().getAlbum().getPhoto());
				map().setArtist_name(source.getSong().getAlbum().getArtist().getName());
				map().setLiked(source.getSong().isLiked());
			}
		});
	}
	
	private void PlaylistSongMapping2(ModelMapper modelMapper) {
		Converter<String, String> converterPhotoToPhotoURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-upload") + source;
			}
		};
		
		modelMapper.typeMap(PlaylistSongDto.class, PlaylistSongDto2.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToPhotoURL).map(PlaylistSongDto::getalbum_photo, PlaylistSongDto2::setalbum_photo);
		});
		
		Converter<String, String> converterPhotoToSongFileURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-source") + source;
			}
		};
		
		modelMapper.typeMap(PlaylistSongDto.class, PlaylistSongDto2.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToSongFileURL).map(PlaylistSongDto::geturl, PlaylistSongDto2::seturl);
		});
		
		
	}
	
	private void InvoiceMapping(ModelMapper modelMapper) {
		
		Converter<Integer, Pack> converterIntegerToInvoice = new AbstractConverter<Integer, Pack>() {
			@Override
			protected Pack convert(Integer source) {
				Pack pack = new Pack();
				pack.setId(source);
				return pack;
			}
		};
		
		modelMapper.typeMap(InvoiceDto.class, Invoice.class).addMappings(mapper -> {
			mapper.using(converterIntegerToInvoice).map(InvoiceDto::getPack_id, Invoice::setPack);
		});
		
		Converter<Integer, User> converterIntegerToUser = new AbstractConverter<Integer, User>() {
			@Override
			protected User convert(Integer source) {
				User user = new User();
				user.setId(source);
				return user;
			}
		};
				
		modelMapper.typeMap(InvoiceDto.class, Invoice.class).addMappings(mapper -> {
			mapper.using(converterIntegerToUser).map(InvoiceDto::getUser_id, Invoice::setUser);
		});
		
		
		modelMapper.addMappings(new PropertyMap<Invoice, InvoiceDto>() {
			@Override
			protected void configure() {
				map().setPack_id(source.getPack().getId());
				map().setPack_name(source.getPack().getName());		
				map().setUser_id(source.getUser().getId());
				map().setUser_name(source.getUser().getUsername());		
			}
		});
	}
	
	private void AlbumMapping(ModelMapper modelMapper) {
		Converter<String, String> converterPhotoToPhotoURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-upload") + source;
			}
		};
		
		modelMapper.typeMap(Album.class, AlbumDto.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToPhotoURL).map(Album::getPhoto, AlbumDto::setPhoto);
		});
		
		
		
		Converter<Integer, Artist> converterIntegerToAlbum = new AbstractConverter<Integer, Artist>() {
			@Override
			protected Artist convert(Integer source) {
				Artist artist = new Artist();
				artist.setId(source);
				return artist;
			}
		};
		
		modelMapper.typeMap(AlbumDto.class, Album.class).addMappings(mapper -> {
			mapper.using(converterIntegerToAlbum).map(AlbumDto::getArtist_id, Album::setArtist);
		});
		
		modelMapper.addMappings(new PropertyMap<Album, AlbumDto>() {
			@Override
			protected void configure() {
				map().setArtist_id(source.getArtist().getId());
				map().setArtist_name(source.getArtist().getName());
				map().setArtist_photo(source.getArtist().getPhoto());
			}
		});
		
	}
	
	private void PlaylistMapping(ModelMapper modelMapper) {
				
		Converter<Integer, User> converterIntegerToUser = new AbstractConverter<Integer, User>() {
			@Override
			protected User convert(Integer source) {
				User user = new User();
				user.setId(source);
				return user;
			}
		};
		
		modelMapper.typeMap(PlaylistDto.class, Playlist.class).addMappings(mapper -> {
			mapper.using(converterIntegerToUser).map(PlaylistDto::getUser_id, Playlist::setUser);
		});		
		
		modelMapper.addMappings(new PropertyMap<Playlist, PlaylistDto>() {
			@Override
			protected void configure() {
				map().setUser_id(source.getUser().getId());
				map().setUser_username(source.getUser().getUsername());		
			}
		});
	}
	
	private void ArtistMapping(ModelMapper modelMapper) {
		Converter<String, String> converterPhotoToPhotoURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-upload") + source;
			}
		};
		
		modelMapper.typeMap(Artist.class, ArtistDto.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToPhotoURL).map(Artist::getPhoto, ArtistDto::setPhoto);
		});
	}
	
	private void UserMapping(ModelMapper modelMapper) {
		Converter<String, String> converterPhotoToPhotoURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-upload") + source;
			}
		};
		
		modelMapper.typeMap(User.class, UserDto.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToPhotoURL).map(User::getAvt, UserDto::setAvt);
		});
	}
	
	private void SongMapping(ModelMapper modelMapper) {
		Converter<String, String> converterPhotoToPhotoURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-upload") + source;
			}
		};
		
		modelMapper.typeMap(Album.class, SongDto.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToPhotoURL).map(Album::getPhoto, SongDto::setAlbum_photo);
		});
		
		Converter<String, String> converterPhotoToSongFileURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-source") + source;
			}
		};
		
		modelMapper.typeMap(Song.class, SongDto.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToSongFileURL).map(Song::getUrl, SongDto::setUrl);
		});
		
		Converter<Integer, Album> converterIntegerToAlbum = new AbstractConverter<Integer, Album>() {
			@Override
			protected Album convert(Integer source) {
				Album album = new Album();
				album.setId(source);
				return album;
			}
		};
		
		modelMapper.typeMap(SongDto.class, Song.class).addMappings(mapper -> {
			mapper.using(converterIntegerToAlbum).map(SongDto::getAlbum_id, Song::setAlbum);
		});
		
		Converter<Integer, Genre> converterIntegerToGenre = new AbstractConverter<Integer, Genre>() {
			@Override
			protected Genre convert(Integer source) {
				Genre genre = new Genre();
				genre.setId(source);
				return genre;
			}
		};
		
		modelMapper.typeMap(SongDto.class, Song.class).addMappings(mapper -> {
			mapper.using(converterIntegerToGenre).map(SongDto::getGenre_id, Song::setGenre);
		});
		
		//Cơ chế Property map
		modelMapper.addMappings(new PropertyMap<Song, SongDto>() {
			@Override
			protected void configure() {
				map().setAlbum_id(source.getAlbum().getId());
				map().setAlbum_name(source.getAlbum().getName());
				map().setGenre_id(source.getGenre().getId());
				map().setGenre_name(source.getGenre().getName());
			}
		});
	}
	
	private void SongAritsMapping(ModelMapper modelMapper) {
		Converter<String, String> converterPhotoToPhotoURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-upload") + source;
			}
		};
		
		modelMapper.typeMap(SongDto.class, SongAritstDto.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToPhotoURL).map(SongDto::getAlbum_photo, SongAritstDto::setAlbum_photo);
		});
		
		Converter<String, String> converterPhotoToSongFileURL = new AbstractConverter<String, String>() {

			@Override
			protected String convert(String source) {
				return environment.getProperty("base-url-source") + source;
			}
		};
		
		modelMapper.typeMap(SongDto.class, SongAritstDto.class)
		.addMappings(mapper -> {
			mapper.using(converterPhotoToSongFileURL).map(SongDto::getUrl, SongAritstDto::setUrl);
		});
		
		
	}
}
