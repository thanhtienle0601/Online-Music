import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:spotify/config/config_api.dart';
import 'package:spotify/views/login.dart';

import '../navigations/tabbar.dart';

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => RegisterState();
}

class RegisterState extends State<Register> {
  var keyword = TextEditingController();
  var username = TextEditingController();
  var password = TextEditingController();
  var fullname = TextEditingController();
  var phone = TextEditingController();
  var email = TextEditingController();
  var registerForm = GlobalKey<FormState>();
  String msg = '';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: CupertinoColors.systemGreen,
        leading:  GestureDetector(
          onTap: (){
            Navigator.push(context, MaterialPageRoute(
                builder: (context) => TabbarPage()));
          },
          child: Icon(Icons.arrow_back_ios,color: Colors.black87,size: 30,),
        ),),
      body:
        SizedBox(
          height: MediaQuery.of(context).size.height,
          child: Stack(
            children: [
              Container(
                height: (MediaQuery.of(context).size.height)/6,
                width: double.infinity,
                decoration:BoxDecoration(
                  color: CupertinoColors.systemGreen,
                  borderRadius: BorderRadius.only(
                    bottomRight: Radius.circular(40),
                    bottomLeft:  Radius.circular(40)
                      )
                    ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      SizedBox(
                          height: 40,
                          child: Image.asset('assets/images/logo.png')),
                      SizedBox(height: 20,),
                      Text('MIllions of songs, free on spotify', style: TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.w600, fontFamily: 'Roboto', fontStyle: FontStyle.normal),)
                    ],
                  ),
              ),
              SingleChildScrollView(
                child: SizedBox(
                  height: MediaQuery.of(context).size.height,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Container(
                        height: (MediaQuery.of(context).size.height)/1.1,
                        padding: EdgeInsets.symmetric(horizontal: 32,vertical: 40),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(40)
                        ),
                        child: Center(
                          child: Form(
                            key: registerForm,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Text(
                                  'Register Account',
                                  style: TextStyle(
                                      fontSize: 33, fontWeight: FontWeight.w500,color: CupertinoColors.black
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                                SizedBox(height: 10,),
                                TextFormField(
                                  style: TextStyle(color: Colors.black87),
                                  controller: username,
                                  decoration: InputDecoration(
                                    hintText: 'Username.....',
                                    icon: Icon(Icons.people_alt_rounded,color: Colors.black54,size: 20,),
                                    hintStyle: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                                    enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: BorderSide(color: Colors.grey)
                                    ),
                                  ),
                                  validator: (value){
                                    if(value!.isEmpty){
                                      return 'Username khong duoc rong';
                                    }
                                    else if(value!.length < 3){
                                      return 'Username khong duoc it hon 3 ky tu';
                                    }
                                    else if(value!.length > 20){
                                      return 'Username khong duoc lon hon 20 ky tu';
                                    }
                                    return null;
                                  },
                                ),
                                SizedBox(height: 10,),
                                TextFormField(
                                  style: TextStyle(color: Colors.black87),
                                  controller: password,
                                  decoration: InputDecoration(
                                    hintText: 'Password...',
                                    icon: Icon(Icons.password,color: Colors.black54,size: 20,),
                                    hintStyle: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                                    enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: BorderSide(color: Colors.grey)
                                    ),
                                  ),
                                  obscureText: true,
                                  // keyboardType: TextInputType.visiblePassword,
                                  validator: (value){
                                    var reg = RegExp('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#%]).{6,20})');
                                    if(value!.isEmpty){
                                      return 'Password khong duoc rong';
                                    }
                                    else if(!reg.hasMatch(value!)){
                                      return 'Password khong du do phuc tap';
                                    }
                                    // else if(value!.length > 20){
                                    //   return 'Password khong duoc lon hon 20 ky tu';
                                    // }
                                    return null;
                                  },
                                ),
                                SizedBox(height: 10,),
                                TextFormField(
                                  style: TextStyle(color: Colors.black87),
                                  controller: email,
                                  decoration: InputDecoration(
                                    hintText: 'Your email...',
                                    icon: Icon(Icons.email ,color: Colors.black54,size: 20,),
                                    hintStyle: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                                    enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: BorderSide(color: Colors.grey)
                                    ),
                                  ),
                                  keyboardType: TextInputType.phone,
                                  validator: (value){
                                    if(value!.isEmpty){
                                      return 'Email khong duoc rong';
                                    }
                                    return null;
                                  },
                                ),
                                SizedBox(height: 10,),
                                TextFormField(
                                  style: TextStyle(color: Colors.black87),
                                  controller: fullname,
                                  decoration: InputDecoration(
                                    hintText: 'Fullname',
                                    icon: Icon(Icons.numbers,color: Colors.black54,size: 20,),
                                    hintStyle: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                                    enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: BorderSide(color: Colors.grey)
                                    ),
                                  ),
                                  keyboardType: TextInputType.name,
                                  validator: (value){
                                    if(value!.isEmpty){
                                      return 'Fullname khong duoc rong';
                                    }
                                    // else if(value!.length > 20){
                                    //   return 'Username khong duoc lon hon 20 ky tu';
                                    // }
                                    return null;
                                  },
                                ),
                                SizedBox(height: 10,),
                                TextFormField(
                                  style: TextStyle(color: Colors.black87),
                                  controller: phone,
                                  decoration: InputDecoration(
                                    hintText: 'Phone number',
                                    icon: Icon(Icons.phone ,color: Colors.black54,size: 20,),
                                    hintStyle: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                                    enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: BorderSide(color: Colors.grey)
                                    ),
                                  ),
                                  keyboardType: TextInputType.phone,
                                  validator: (value){
                                    if(value!.isEmpty){
                                      return 'Phone khong duoc rong';
                                    }
                                    else if(value!.length < 10){
                                      return 'So dien thoai khong hop le';
                                    }
                                    else if(value!.length > 10){
                                      return 'So dien thoai khong hop le';
                                    }
                                    return null;
                                  },
                                ),
                                SizedBox(height: 10,),
                                Row(
                                  children: [
                                    Expanded(
                                        child: ElevatedButton(
                                          style: ElevatedButton.styleFrom(
                                              fixedSize: Size(40, 40),
                                              backgroundColor: CupertinoColors.systemGreen,
                                              shape: RoundedRectangleBorder(
                                                  borderRadius: BorderRadius.circular(10))
                                          ),
                                          onPressed: (){
                                            Register();
                                          },
                                          child: Text('Save', style: TextStyle(fontSize: 18,color: Colors.black87),),
                                        )),
                                    SizedBox(width: 15,),
                                    Expanded(
                                        child: ElevatedButton(
                                          style: ElevatedButton.styleFrom(
                                            fixedSize: Size(40, 40),
                                            backgroundColor: CupertinoColors.destructiveRed,
                                            shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(10))
                                          ),
                                          onPressed: (){
                                            Navigator.push(context, MaterialPageRoute(
                                                builder: (context) => Login()));
                                          },
                                          child: Text('Cancel', style: TextStyle(fontSize: 18),),
                                        )),
                                  ],
                                ),
                                Text(msg),
                                Container(
                                  padding: EdgeInsets.all(5),
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Text("Do you already have an account? ",style: TextStyle(color: Colors.black),),
                                        GestureDetector(
                                          onTap: (){
                                            Navigator.push(context, MaterialPageRoute(
                                                builder: (context) => Login()));
                                          },
                                          child: Text('Log in',style: TextStyle(color: Colors.green,fontWeight: FontWeight.bold,decoration: TextDecoration.underline))),
                                        SizedBox(width: 5,),
                                        Text("here! ",style: TextStyle(color: Colors.black),),
                                      ],
                                    )
                                  ),
                              ],
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              )
            
            ],
          ),
      ),
    );
  }

  void Register() async{
    if(registerForm.currentState!.validate()){
      Fluttertoast.showToast(msg: 'Valid');
    }
    else{
      setState(() {
        username.text = '';
        password.text = '';
        fullname.text = '';
        phone.text = '';
        email.text = '';
        msg ='';
      });
    }
  }
}
