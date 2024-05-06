import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:spotify/config/config_api.dart';
import 'package:spotify/views/register.dart';

import '../apis/user_api.dart';
import '../entities/user.dart';
import '../navigations/tabbar.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => LoginState();
}

class LoginState extends State<Login> {
  UserAPI? userApi;
  Future<User>? user;
  var username = TextEditingController();
  var password = TextEditingController();

  @override
  void initState() {
    userApi = UserAPI();
  }

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
                height: (MediaQuery.of(context).size.height)/3,
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
                          height: 70,
                          child: Image.asset('assets/images/logo.png')),
                      const SizedBox(height: 20,),
                      const Text('MIllions of songs, free on spotify', style: TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.w600, fontFamily: 'Roboto', fontStyle: FontStyle.normal),)
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
                        height: (MediaQuery.of(context).size.height)/1.4,
                        padding: EdgeInsets.symmetric(horizontal: 32,vertical: 40),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(40)
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Text(
                              'Login Account',
                              style: TextStyle(
                                  fontSize: 33, fontWeight: FontWeight.w500,color: CupertinoColors.black
                              ),
                              textAlign: TextAlign.center,
                            ),
                            SizedBox(height: 15,),
                            TextFormField(
                              style: TextStyle(color: Colors.black87),
                              controller: username,
                              decoration: InputDecoration(
                                suffixIcon: Icon(Icons.email_rounded),
                                suffixIconColor: Colors.grey.shade600,
                                hintText: 'Email or username', hintStyle: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                                enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(25),
                                    borderSide: BorderSide(color: Colors.grey)
                                ),
                                focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(25),
                                    borderSide: BorderSide(color: CupertinoColors.systemGreen)
                                )
                              ),

                            ),
                            SizedBox(height: 15,),
                            TextFormField(
                              style: TextStyle(color: Colors.black87),
                              controller: password,
                              decoration: InputDecoration(
                                hintText: 'Password....',
                                suffixIcon: Icon(Icons.password_outlined),
                                suffixIconColor: Colors.grey.shade600,
                                hintStyle: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(25),
                                  borderSide: BorderSide(color: Colors.grey)
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(25),
                                  borderSide: BorderSide(color: CupertinoColors.systemGreen)
                                ),
                              ),
                              obscureText: true,
                            ),
                            SizedBox(height: 25,),
                            Row(
                              children: [
                                Expanded(
                                  child: ElevatedButton.icon(
                                    onPressed: () {
                                      var user1 = User(
                                        email: username.text,
                                        password: password.text
                                      );
                                      user = userApi!.login(user1);
                                      Fluttertoast.showToast(msg: 'success');
                                    },
                                    icon: Icon(
                                      Icons.login_rounded,
                                      color: Colors.black,
                                    ),
                                    label: Text(
                                      'login'.toUpperCase(),
                                      style: TextStyle(color: Colors.black, fontSize: 25),
                                    ),
                                    style: ElevatedButton.styleFrom(
                                        fixedSize: Size(40, 40),
                                        backgroundColor: CupertinoColors.systemGreen,
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(10))),
                                  ),
                                )
                              ],
                            ),
                            Container(
                              padding: EdgeInsets.all(5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text("Don't have an account? ",style: TextStyle(color: Colors.black),),
                                    GestureDetector(
                                      onTap: (){
                                        Fluttertoast.showToast(msg: 'Sign Up');
                                        Navigator.push(context, MaterialPageRoute(builder: (context) => Register()));
                                      },
                                      child: Text('Sign Up',style: TextStyle(color: Colors.green,fontWeight: FontWeight.bold,decoration: TextDecoration.underline))),
                                    SizedBox(width: 5,),
                                    Text("here! ",style: TextStyle(color: Colors.black),),
                                  ],
                                )
                              ),
                          ],
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
}
