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

class ArtistSong extends StatefulWidget {
  final String? name;
  const ArtistSong({super.key,this.name});

  @override
  State<ArtistSong> createState() => ArtistSongState();
}

class ArtistSongState extends State<ArtistSong> {
  SongAPI? songAPI;
  Future<List<Song>>? songs;
  var keyword = TextEditingController();

  @override
  void initState(){
    // print('id of album: ${widget.id}');
    songAPI = SongAPI();
    songs = songAPI!.findByArtist(widget.name!);
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Album Name'),
        backgroundColor: CupertinoColors.black,
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
                          // leading: Image.network(snapshot.data![index].photo!,fit: BoxFit.cover,),
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


