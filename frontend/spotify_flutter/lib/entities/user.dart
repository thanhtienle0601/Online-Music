class User{
  int? id;
  String? fullname;
  String? email;
  String? phone;
  String? username;
  String? password;
  String? avt;
  String? code;
  bool? status;
  bool? ispremium;


  User({this.id,this.fullname, this.email,this.phone, this.username,
         this.password, this.avt, this.code, this.status, this.ispremium });
  User.fromJson(Map<String, dynamic> map){
    this.id = map['id'];
    this.fullname = map['fullname'];
    this.email = map['email'];
    this.phone = map['phone'];
    this.username = map['username'];
    this.password = map['password'];
    this.avt = map['avt'];
    this.code = map['code'];
    this.status = map['status'];
    this.ispremium = map['ispremium'];
  }

  Map<String, dynamic> toJson(){
    var map = <String,dynamic>{
      'id'       : this.id,
      'fullname' : this.fullname,
      'email'    : this.email,
      'phone'    : this.phone,
      'username' : this.username,
      'password' : this.password,
      'avt'      : this.avt,
      'code'     : this.code,
      'status'   : this.status,
      'ispremium': this.ispremium
    };
    return map;
  }
}