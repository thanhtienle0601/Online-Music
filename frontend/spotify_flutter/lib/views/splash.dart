import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:spotify/config/config_api.dart';

import '../navigations/tabbar.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => SplashPageState();
}

class SplashPageState extends State<SplashPage> {
  toNextPage() {
    Future.delayed(const Duration(seconds: 3))
        .then((value) => Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => TabbarPage()),
          (route) => false,
    ));
  }

  @override
  void initState() {
    toNextPage();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        color: CupertinoColors.systemGreen,
        child: Center(
          // child: Text("AudioPlayer",
          //     style: TextStyle(
          //         color: Colors.white,
          //         fontWeight: FontWeight.w600,
          //         fontSize: 24)),
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
      ),
    );
  }
}
