import 'dart:convert';

import 'package:spotify/config/config_api.dart';
import 'package:spotify/entities/album.dart';
import 'package:http/http.dart' as http;

import '../entities/song.dart';
class SongAPI{
  String BASE_URL = '$url/song';

  Future<List<Song>> findAll() async{
    var response = await http.get(Uri.parse('$BASE_URL/findAll2'));
    if(response.statusCode == 200){
      // response.body
      List<dynamic> body = jsonDecode(response.body);
      return body.map((item) => Song.fromJson(item)).toList();
    }
    else{
      throw Exception('Failed');
    }
  }

  Future<Song> findbyId(String id) async{
    var response = await http.get(Uri.parse('$BASE_URL/find2/$id'));
    if(response.statusCode == 200){
      // response.body
      return Song.fromJson(json.decode(response.body));
    }
    else{
      throw Future.value(null);
    }
  }

  Future<List<Song>> findByAlbum(String id) async{
    var response = await http.get(Uri.parse('$BASE_URL/find2/$id'));
    if(response.statusCode == 200){
      // response.body
      List<dynamic> body = jsonDecode(response.body);
      return body.map((item) => Song.fromJson(item)).toList();
    }
    else{
      throw Exception('Failed');
    }
  }

  Future<List<Song>> findByArtist(String name) async{
    var response = await http.get(Uri.parse('$BASE_URL/findArtist/$name'));
    if(response.statusCode == 200){
      // response.body
      List<dynamic> body = jsonDecode(response.body);
      return body.map((item) => Song.fromJson(item)).toList();
    }
    else{
      throw Exception('Failed');
    }
  }

  Future<List<Song>> findByArtistId(String id) async{
    var response = await http.get(Uri.parse('$BASE_URL/findArtistByid/$id'));
    if(response.statusCode == 200){
      // response.body
      List<dynamic> body = jsonDecode(response.body);
      return body.map((item) => Song.fromJson(item)).toList();
    }
    else{
      throw Exception('Failed');
    }
  }

  Future<List<Song>> findByKeyword(String keyword) async{
    var response = await http.get(Uri.parse('$BASE_URL/findByKeyword/$keyword'));
    if(response.statusCode == 200){
      // response.body
      List<dynamic> body = jsonDecode(response.body);
      return body.map((item) => Song.fromJson(item)).toList();
    }
    else{
      throw Exception('Failed');
    }
  }


  
}