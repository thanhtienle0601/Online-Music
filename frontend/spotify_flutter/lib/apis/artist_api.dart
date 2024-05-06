import 'dart:convert';

import 'package:spotify/config/config_api.dart';
import 'package:spotify/entities/album.dart';
import 'package:http/http.dart' as http;
import 'package:spotify/entities/artist.dart';
class ArtistAPI{
  String BASE_URL = '$url/artist';

  Future<List<Artist>> findAll() async{
    var response = await http.get(Uri.parse('$BASE_URL/findAll'));
    if(response.statusCode == 200){
      // response.body
      List<dynamic> body = jsonDecode(response.body);
      return body.map((item) => Artist.fromJson(item)).toList();
    }
    else{
      throw Exception('Failed');
    }
  }


  
}