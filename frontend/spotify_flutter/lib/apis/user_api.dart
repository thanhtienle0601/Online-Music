import 'dart:convert';

import 'package:spotify/config/config_api.dart';
import 'package:spotify/entities/album.dart';
import 'package:http/http.dart' as http;

import '../entities/user.dart';
class UserAPI{
  String BASE_URL = '$url/user';

  Future<User> login(User user) async{
    var response = await http.post(Uri.parse('$BASE_URL/login'),);
    if(response.statusCode == 200){
      // response.body
      return User.fromJson(json.decode(response.body));
    }
    else{
      throw Future.value(null);
    }
  }


}


