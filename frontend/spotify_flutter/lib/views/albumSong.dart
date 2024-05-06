import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:spotify/apis/album_api.dart';
import 'package:spotify/apis/song_api.dart';
import 'package:spotify/entities/album.dart';
import 'package:spotify/entities/song.dart';
import 'package:spotify/navigations/tabbar.dart';
import 'package:spotify/widgets/albumCard.dart';
import 'package:spotify/widgets/row_album_card.dart';

class AlbumSong extends StatefulWidget {
  final String? id;
  final String? title;
  const AlbumSong({super.key,this.id,this.title});

  @override
  State<AlbumSong> createState() => AlbumSongState();
}

class AlbumSongState extends State<AlbumSong> {
  SongAPI? songAPI;
  Future<List<Song>>? songs;
  var keyword = TextEditingController();
  String? titleAlbum = "";

  @override
  void initState(){
    // print('id of album: ${widget.id}');
    songAPI = SongAPI();
    songs = songAPI!.findByAlbum(widget.id!);
    titleAlbum = utf8.decode(widget.title!.codeUnits);
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(titleAlbum!.toUpperCase()),
        backgroundColor: CupertinoColors.black,
        centerTitle: true,
        leading:  GestureDetector(
        onTap: (){
          Navigator.push(context, MaterialPageRoute(
          builder: (context) => TabbarPage()));
         },
        child: Icon(Icons.arrow_back_ios),
      ),),
      body: FutureBuilder(
        future: songs,
        builder: (context, AsyncSnapshot<List<Song>> snapshot){
          if(snapshot.hasData){
            return Padding(
              padding: EdgeInsets.all(10),
              child: ListView.builder(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index){
                    return GestureDetector(
                      child: Card(
                        child: ListTile(
                          leading: Image.network(snapshot.data![index].album_photo!,fit: BoxFit.cover,width: 60,),
                          title: Text(utf8.decode(snapshot.data![index].title!.codeUnits)),
                          subtitle: Text(snapshot.data![index].artist_name!),
                        ),
                      ),
                    );
                  }),
            );
          }
          else{
            return CircularProgressIndicator();
          }
        },
      ),
    );
  }
}


