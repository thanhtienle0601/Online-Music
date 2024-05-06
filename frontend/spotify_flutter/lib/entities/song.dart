class Song{
  int? id;
  String? title;
  String? album_name;
  String? artist_name;
  String? album_photo;
  int? album_id;
  String? url;

  Song({this.id,this.title,this.album_name, this.artist_name,this.album_photo, this.album_id,this.url});
  Song.fromJson(Map<String, dynamic> map){
    this.id = map['id'];
    this.title = map['title'];
    this.album_name = map['album_name'];
    this.artist_name = map['artist_name'];
    this.album_photo = map['album_photo'];
    this.album_id = map['album_id'];
    this.url = map['url'];
  }

  Map<String, dynamic> toJson(){
    var map = <String,dynamic>{
      'id' : this.id,
      'album_name': this.album_name,
      'artist_name': this.artist_name,
      'album_photo': this.album_photo,
      'album_id': this.album_id,
      'url': this.url
    };
    return map;
  }
}