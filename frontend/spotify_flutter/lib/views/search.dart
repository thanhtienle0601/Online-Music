import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:spotify/views/play_audio.dart';

import '../apis/song_api.dart';
import '../entities/song.dart';

class Search extends StatefulWidget {
  const Search({super.key});

  @override
  State<Search> createState() => SearchState();
}

class SearchState extends State<Search> {
  SongAPI? songAPI;
  Future<List<Song>>? songs;
  bool? load;
  var keyword = TextEditingController();
  @override
  void initState() {
    songAPI = SongAPI();
    songs = null;
    load = false;
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:  Padding(
        padding: EdgeInsets.all(10),
        child: Center(
          child: Column(
            children: [
              SizedBox(height: 50,),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Search your music',
                      style: Theme.of(context).textTheme.headlineLarge,
                    ),
                  ],
                ),
              ),
              SizedBox(height: 20,),
              TextFormField(
                controller: keyword,
                decoration: InputDecoration(
                  suffixIcon: Icon(Icons.search),
                  suffixIconColor: Colors.grey.shade600,
                  hintText: 'Search music,artist, alubum.....',
                  hintStyle: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                  enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide(color: Colors.grey.shade400)
                  ),
                    focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide(color: CupertinoColors.systemGreen)
                    )
                ),
                onChanged:(value){
                  setState(() {
                    songs = songAPI!.findByKeyword(value!);
                  });
                }
              ),
              FutureBuilder(
                  future: songs,
                  builder: (context, AsyncSnapshot<List<Song>> snapshot){
                    if(snapshot.hasData){
                      return  Column(
                        children: [
                          ListView.builder(
                            shrinkWrap: true,
                            itemCount: snapshot.data!.length,
                            itemBuilder:(context,index){
                              return ListTile(
                                title: Text(utf8.decode(snapshot.data![index].title!.codeUnits)),
                                subtitle: Text(utf8.decode(snapshot.data![index].artist_name!.codeUnits)),
                                onTap: ()=> Navigator.push(context, MaterialPageRoute(builder:
                                    (context) => PlayAudio(
                                  url: snapshot.data![index].url!,
                                  title: snapshot.data![index].title!,
                                  img: snapshot.data![index].album_photo!,
                                  index: index,
                                  artist: snapshot.data![index].artist_name!,)))
                              );
                            })
                        ],
                      );
                    }
                    else{
                      return Visibility(
                        child: CircularProgressIndicator(),
                        visible: load!,
                      );
                    }
                  }),
            ],
          ),
        ) ,
      )
    );
  }
}
