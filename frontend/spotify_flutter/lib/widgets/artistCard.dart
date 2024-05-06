import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:spotify/views/albumArtist.dart';
import 'package:spotify/views/albumSong.dart';
import 'package:spotify/views/play_artirst.dart';

class ArtistCard extends StatelessWidget {
  final String? image;
  final String? label;
  final String? id;
  final String? name;

  const ArtistCard({Key? key, this.image, this.label,this.id,this.name}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(left: 8,right: 8),
      child: GestureDetector(
        onTap: (){
          Navigator.push(context, MaterialPageRoute(builder: (context) => PlayArtist(id: id,img: image,name: name,)));
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image(
              image: NetworkImage(image!),
              width: 120,
              height: 120,
              fit: BoxFit.cover,
            ),
            SizedBox(height: 10,),
            Text(utf8.decode(label!.codeUnits)),
          ],
        ),
      ),
    );
  }
}
