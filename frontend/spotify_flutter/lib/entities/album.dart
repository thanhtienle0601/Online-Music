class Album{
  int? id;
  String? name;
  String? description;
  String? photo;
  int? artistid;

  Album({this.id,this.name, this.description,this.photo, this.artistid});
  Album.fromJson(Map<String, dynamic> map){
    this.id = map['id'];
    this.name = map['name'];
    this.description = map['description'];
    this.photo = map['photo'];
    this.artistid = map['artistid'];
  }

  Map<String, dynamic> toJson(){
    var map = <String,dynamic>{
      'id' : this.id,
      'name': this.name,
      'description': this.description,
      'photo': this.photo,
      'artistid': this.artistid
    };
    return map;
  }
}