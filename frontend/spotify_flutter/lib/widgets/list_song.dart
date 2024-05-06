import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:spotify/views/albumSong.dart';

import '../views/play_audio.dart';

class ListSongCard extends StatelessWidget {
  final String? title;
  final String? artist;
  final String? img;
  final String? url;
  final int? index;

  const ListSongCard({Key? key, this.title, this.artist,this.img,this.url,this.index}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white10,
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20)
      ),
      child: ListTile(
        leading: Image.network(img!,fit: BoxFit.cover,width: 60,),
        title: Text(utf8.decode(title!.codeUnits)),
        subtitle: Text(utf8.decode(artist!.codeUnits)),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            IconButton(
                onPressed: (){
                },
                icon: Icon(Icons.download)),
            IconButton(
                onPressed: (){
                },
                icon: Icon(Icons.heart_broken))
          ],
        ),
        onTap: (){
          Navigator.push(context, MaterialPageRoute(builder:
              (context) => PlayAudio(
                url: url,
                title: title,
                img: img,
                index: index,
                artist: artist,)));
        },
      ),
    );
  }
}
