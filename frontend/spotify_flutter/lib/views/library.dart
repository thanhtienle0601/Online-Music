import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:spotify/widgets/list_song.dart';
import 'package:spotify/widgets/row_album_card.dart';

import '../apis/song_api.dart';
import '../entities/song.dart';
import '../widgets/albumCard.dart';

class Library extends StatefulWidget {
  const Library({super.key});

  @override
  State<Library> createState() => LibraryState();
}

class LibraryState extends State<Library> {
  SongAPI? songAPI;
  Future<List<Song>>? songs;
  @override
  void initState() {
    songAPI = SongAPI();
    songs = songAPI!.findAll();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:  Stack(
        children: [
          SingleChildScrollView(
            physics: BouncingScrollPhysics(),
            child: SafeArea(
              child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: Padding(
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
                                'My favorite music',
                                style: Theme.of(context).textTheme.headlineMedium,
                              ),
                            ],
                          ),
                        ),
                        FutureBuilder(
                          future: songs,
                          builder: (context, AsyncSnapshot<List<Song>>snapshot){
                            if(snapshot.hasData){
                              return Column(
                                children: [
                                  Padding(
                                    padding: EdgeInsets.all(10),
                                    child: ListView.builder(
                                        shrinkWrap: true,
                                        itemCount: snapshot.data!.length,
                                        itemBuilder: (context, index){
                                          return GestureDetector(
                                            onTap: (){
                                            },
                                            child: Card(
                                              color: Colors.black,
                                              margin: EdgeInsets.only(top: 10,bottom: 10),
                                              child: ListSongCard(
                                                title: snapshot.data![index].title!,
                                                img: snapshot.data![index].album_photo!,
                                                artist: snapshot.data![index].artist_name!,
                                                index: index,
                                                url: snapshot.data![index].url!,
                                              ),
                                            ),
                                          );
                                        }),

                                  ),
                                ],
                              );
                            }
                            else{
                              return CircularProgressIndicator();
                            }
                          },
                        ),
                      ],
                    ),
                  ) ,
                ),
              ),
            )
          )
        ],
      )
    );
  }
}
