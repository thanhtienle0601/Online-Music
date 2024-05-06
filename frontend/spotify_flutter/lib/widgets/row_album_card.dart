import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:spotify/views/play_audio.dart';

class RowAlbumCard extends StatelessWidget {
  final String? image;
  final String? label;
  final String? artist;
  final int? id;
  final String? url;

  const RowAlbumCard({super.key, this.image, this.label,this.artist,this.id,this.url});

  @override
  Widget build(BuildContext context) {
    final String? title;
    title = utf8.decode(label!.codeUnits);
    return Container(
      margin: EdgeInsets.only(left: 25),
      height: 20,
      child: GestureDetector(
        onTap: (){ Navigator.push(context, MaterialPageRoute(builder:
            (context) => PlayAudio(url: url,title: label,img: image,
              index: id,artist: artist,)));},
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Expanded(
              flex: 3,
              child:
            Image(
              image: NetworkImage(image!),
              height: 48,
              width: 48,
              fit: BoxFit.cover,
            ),),
            SizedBox(width: 20,),
            Expanded(
                flex: 7,
                child: Text(title,style: TextStyle(fontSize: 18),))
          ],
        ),
      ),
    );
  }
}
