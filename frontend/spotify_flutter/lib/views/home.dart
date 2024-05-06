import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:spotify/apis/artist_api.dart';
import 'package:spotify/apis/song_api.dart';
import 'package:spotify/widgets/albumCard.dart';
import 'package:spotify/widgets/artistCard.dart';
import 'package:spotify/widgets/row_album_card.dart';

import '../apis/album_api.dart';
import '../entities/album.dart';
import '../entities/artist.dart';
import '../entities/song.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => HomeViewState();
}

class HomeViewState extends State<HomeView> {
  AlbumAPI? albumAPI;
  Future<List<Album>>? albums;
  SongAPI? songAPI;
  Future<List<Song>>? songs;
  ArtistAPI? artistAPI;
  Future<List<Artist>>? artists;

  @override
  void initState(){
    albumAPI = AlbumAPI();
    albums = albumAPI!.findAll();
    songAPI = SongAPI();
    songs = songAPI!.findAll();
    artistAPI = ArtistAPI();
    artists = artistAPI!.findAll();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:Stack(
        children: [
          Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height *.5,
            decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.white.withOpacity(0.5),
                      Colors.white.withOpacity(0.1),
                      Colors.black.withOpacity(0)
                    ]
                )
            ),
          ),
          SingleChildScrollView(
            physics: BouncingScrollPhysics(),
            child: SafeArea(
              child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    SizedBox(height: 50,),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Recently Played',
                            style: Theme.of(context).textTheme.headlineMedium,
                          ),
                          Row(
                            children: [
                              Icon(Icons.history),
                              SizedBox(width: 16,),
                              Icon(Icons.settings)
                            ],
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 20,),
                    FutureBuilder(
                        future: albums,
                        builder: (context, AsyncSnapshot<List<Album>> snapshot){
                          if(snapshot.hasData){
                            return  Container(
                              padding: EdgeInsets.only(right: 20,left: 20),
                              height: 200,
                              child: ListView.builder(
                                  scrollDirection: Axis.horizontal,
                                  itemCount: snapshot.data!.length,
                                  itemBuilder: (context,index){
                                    return AlbumCard(
                                      label: snapshot.data![index].name!,
                                      image: snapshot.data![index].photo,
                                      id: snapshot.data![index].id!.toString(),
                                    );
                                  }),
                            );
                          }
                          else{
                            return CircularProgressIndicator();
                          }
                        }),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Top Trending',
                            style: Theme.of(context).textTheme.headlineMedium,
                          ),
                        ],
                      ),
                    ),
                    FutureBuilder(
                        future: songs,
                        builder: (context, AsyncSnapshot<List<Song>> snapshot){
                          if(snapshot.hasData){
                            return  Padding(
                              padding: EdgeInsets.all(10),
                              child: Column(
                                children: [
                                  GridView.builder(
                                    scrollDirection: Axis.vertical,
                                    shrinkWrap: true,
                                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                                      crossAxisCount: 2,
                                      crossAxisSpacing: 16,
                                      mainAxisSpacing: 16,
                                      mainAxisExtent: 60,
                                    ),
                                    itemCount: snapshot.data!.length,
                                    itemBuilder: (context,index){
                                      return  RowAlbumCard(
                                        label: snapshot.data![index].title!,
                                        artist: snapshot.data![index].artist_name!,
                                        image: snapshot.data![index].album_photo,
                                        url: snapshot.data![index].url,
                                        id: index,);
                                    },
                                  )
                                ],
                              ),
                            );
                          }
                          else{
                            return CircularProgressIndicator();
                          }
                        }),
                    SizedBox(height:20 ,),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Singer',
                            style: Theme.of(context).textTheme.headlineMedium,
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height:20 ,),
                    FutureBuilder(
                        future: artists,
                        builder: (context, AsyncSnapshot<List<Artist>> snapshot){
                          if(snapshot.hasData){
                            return  Container(
                              padding: EdgeInsets.only(right: 20,left: 20),
                              height: 200,
                              child: ListView.builder(
                                  scrollDirection: Axis.horizontal,
                                  itemCount: snapshot.data!.length,
                                  itemBuilder: (context,index){
                                    return ArtistCard(label: snapshot.data![index].name! , image: snapshot.data![index].photo,id: snapshot.data![index].id.toString(),name: snapshot.data![index].name!,);
                                  }),
                            );
                          }
                          else{
                            return CircularProgressIndicator();
                          }
                        }),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}


