import 'dart:convert';

import 'package:spotify/config/config_api.dart';
import 'package:spotify/entities/album.dart';
import 'package:http/http.dart' as http;
class AlbumAPI{
  String BASE_URL = '$url/album';

  Future<List<Album>> findAll() async{
    var response = await http.get(Uri.parse('$BASE_URL/findAll'));
    if(response.statusCode == 200){
      // response.body
      List<dynamic> body = jsonDecode(response.body);
      return body.map((item) => Album.fromJson(item)).toList();
    }
    else{
      throw Exception('Failed');
    }
  }


  
}