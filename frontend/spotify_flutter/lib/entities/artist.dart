class Artist{
  int? id;
  String? name;
  String? photo;

  Artist({this.id,this.name,this.photo});
  Artist.fromJson(Map<String, dynamic> map){
    this.id = map['id'];
    this.name = map['name'];
    this.photo = map['photo'];
  }

  Map<String, dynamic> toJson(){
    var map = <String,dynamic>{
      'id' : this.id,
      'name': this.name,
      'photo': this.photo,
    };
    return map;
  }
}