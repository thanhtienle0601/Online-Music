import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:spotify/views/login.dart';

import '../widgets/albumCard.dart';

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  State<Profile> createState() => ProfileState();
}

class ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Profile",style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 40
        ),),
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
              onPressed:(){}  ,
              icon: Icon(Icons.settings),iconSize: 30,),
          IconButton(
              onPressed:(){}  ,
              icon: Icon(Icons.notifications),iconSize: 30,),
          IconButton(
              onPressed:(){}  ,
              icon: Icon(Icons.search),iconSize: 30,),

        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(10),
        child: Center(
          child: Column(
            children: [
              Row(
                children: [
                  Expanded(
                    flex: 3,
                    child: Container(
                      height: 100,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          colors:[
                            Colors.greenAccent.withOpacity(1),
                            Colors.green.withOpacity(1),
                            Colors.red.withOpacity(0)
                          ],
                          end: Alignment.bottomRight,
                        )
                      ),
                      child: Icon(Icons.person,size: 70,),
                    ),
                  ),
                  SizedBox(width: 15,),
                  Expanded(
                    flex: 4,
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(50)
                      ),
                      child: ElevatedButton(
                        child: Text('Login'.toUpperCase(),style: TextStyle(fontSize: 20,color: Colors.black, fontWeight: FontWeight.bold),),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                          shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(40))),
                        onPressed: (){
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Login()));
                          },
                      ),
                    ),
                  ),
                  Expanded(flex:2,child: Text(''))
                ],
              ),
              SizedBox(height: 40,),
              SizedBox(height: 25,),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Go to Premium',
                      style: Theme.of(context).textTheme.headline6,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
