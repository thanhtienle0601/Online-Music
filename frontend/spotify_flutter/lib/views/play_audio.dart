import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:audio_video_progress_bar/audio_video_progress_bar.dart';
import 'package:just_audio/just_audio.dart';
import '../apis/album_api.dart';
import '../apis/song_api.dart';
import '../entities/album.dart';
import '../entities/song.dart';
import '../navigations/tabbar.dart';
import '../widgets/row_album_card.dart';

class PlayAudio extends StatefulWidget {
  final String? url;
  final String? title;
  final String? artist;
  final String? img;
  final int? index;
  const PlayAudio({super.key,this.url,this.title,this.artist,this.img,this.index});

  @override
  State<PlayAudio> createState() => PlayAudioState();
}

class PlayAudioState extends State<PlayAudio> {
  SongAPI? songAPI;
  Future<List<Song>>? songs;
  final player = AudioPlayer();
  String? nameSong ='';
  String? nameArtist ='';
  String? imgUrl = "";
  int? currentIndex;
  Duration maxDuration = Duration(seconds: 0);

  @override
  void initState() {
    songAPI = SongAPI();
    songs = songAPI!.findAll();
    nameSong = utf8.decode(widget.title!.codeUnits);
    nameArtist = utf8.decode(widget.artist!.codeUnits);
    imgUrl = widget.img!;
    currentIndex = widget.index!;
    // url = 'https://nhactiktokhay.com/nhac-chuong-ban-doi-karik.html?download=20919';
    setupSource(widget.url!);
  }



  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('Top Trending'.toUpperCase()),
        centerTitle: true,
        backgroundColor: Colors.black87,
        leading:  GestureDetector(
          onTap: (){
            player.stop();
            Navigator.push(context, MaterialPageRoute(
                builder: (context) => TabbarPage()));
          },
          child: Icon(Icons.arrow_back_ios,color: Colors.white,size: 30,),
        ),),
      body:
        SingleChildScrollView(
          physics: BouncingScrollPhysics(),
          child: SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              mainAxisSize: MainAxisSize.max,
              children: [
                Container(
                  // height: MediaQuery.of(context).size.height,
                  width: MediaQuery.of(context).size.width,
                  padding: EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(height: 50,),
                      Center(
                        child: Container(
                          width: MediaQuery.of(context).size.width * 0.7,
                          height: MediaQuery.of(context).size.width * 0.7,
                          decoration: BoxDecoration(
                            image: DecorationImage(
                                image: NetworkImage(imgUrl!),
                                fit: BoxFit.cover),
                          ),
                        ),
                      ),
                      SizedBox(height: 60,),
                      Text(nameSong!,
                          style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                              fontSize: 20)),
                      Text(nameArtist!,
                          style: TextStyle(
                              color: Colors.white.withOpacity(0.5),
                              fontWeight: FontWeight.w600,
                              fontSize: 16)),
                      SizedBox(height: 20,),
                      progressBar(),
                    ],
                  ),
                ),
                SingleChildScrollView(
                 child: Padding(
                   padding: EdgeInsets.all(10),
                   child: Column(
                     children: [
                       FutureBuilder(
                         future: songs,
                         builder: (context, AsyncSnapshot<List<Song>>snapshot){
                           if(snapshot.hasData){
                             return Column(
                               children: [
                                 Row(
                                   mainAxisAlignment: MainAxisAlignment.spaceAround,
                                   children: [
                                     IconButton(
                                         onPressed: (){
                                           setState(() {
                                             if(currentIndex == 0){
                                               currentIndex = (snapshot.data!.length -1);
                                               setupSource(snapshot.data![currentIndex!].url!);
                                               nameSong = utf8.decode(snapshot.data![currentIndex!].title!.codeUnits);
                                               nameArtist = utf8.decode(snapshot.data![currentIndex!].artist_name!.codeUnits);
                                               imgUrl = snapshot.data![currentIndex!].album_photo!;
                                             }else{
                                               currentIndex = currentIndex! - 1;
                                               setupSource(snapshot.data![currentIndex!].url!);
                                               nameSong = utf8.decode(snapshot.data![currentIndex!].title!.codeUnits);
                                               nameArtist = utf8.decode(snapshot.data![currentIndex!].artist_name!.codeUnits);
                                               imgUrl = snapshot.data![currentIndex!].album_photo!;
                                             }
                                           });
                                         },
                                         icon: Icon(
                                           Icons.skip_previous,
                                           size: 60,
                                           color: Colors.white,
                                         )
                                     ),
                                     PlayButton(),
                                     IconButton(
                                         onPressed: (){
                                           setState(() {
                                             if(currentIndex == snapshot.data!.length -1){
                                               currentIndex = 0;
                                               setupSource(snapshot.data![currentIndex!].url!);
                                               nameSong = utf8.decode(snapshot.data![currentIndex!].title!.codeUnits);
                                               nameArtist = utf8.decode(snapshot.data![currentIndex!].artist_name!.codeUnits);
                                               imgUrl = snapshot.data![currentIndex!].album_photo!;
                                             }else{
                                               currentIndex = currentIndex! + 1;
                                               setupSource(snapshot.data![currentIndex!].url!);
                                               nameSong = utf8.decode(snapshot.data![currentIndex!].title!.codeUnits);
                                               nameArtist = utf8.decode(snapshot.data![currentIndex!].artist_name!.codeUnits);
                                               imgUrl = snapshot.data![currentIndex!].album_photo!;
                                             }
                                           });
                                         },
                                         icon: Icon(
                                           Icons.skip_next,
                                           size: 60,
                                           color: Colors.white,
                                         )
                                     ),
                                   ],
                                 ),
                                 SizedBox(height: 30,),
                                 Padding(
                                   padding: EdgeInsets.all(10),
                                   child: ListView.builder(
                                     shrinkWrap: true,
                                     itemCount: snapshot.data!.length,
                                     itemBuilder: (context, index){
                                         return GestureDetector(
                                           onTap: (){
                                             setState(() {
                                               setupSource(snapshot.data![index].url!);
                                               nameSong = utf8.decode(snapshot.data![index].title!.codeUnits);
                                               nameArtist = utf8.decode(snapshot.data![index].artist_name!.codeUnits);
                                               imgUrl = snapshot.data![index].album_photo!;
                                             });
                                           },
                                           child: Card(
                                             color: Colors.white10,
                                             shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(15))),
                                             margin: EdgeInsets.only(top: 10,bottom: 10),
                                             child: ListTile(
                                               leading: Image.network(snapshot.data![index].album_photo!,fit: BoxFit.cover,width: 60,),
                                               title: Text(utf8.decode(snapshot.data![index].title!.codeUnits)),
                                               subtitle: Text(utf8.decode(snapshot.data![index].artist_name!.codeUnits)),
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
                 ),
                ),
              ],
            ),
          ),
        ),
    );
  }

  Future<void> setupSource(String url) async{
    player.playbackEventStream.listen((event) {},
    onError: (Object e, StackTrace stackTrace){
      print(e);
    });
    try{
      await player.setAudioSource(AudioSource.uri(Uri.parse(url)));
      await player.play();
    }
    catch (e){
      print('Error: $e');
    }
  }
  Widget PlayButton(){
    return StreamBuilder<PlayerState>(
        stream: player.playerStateStream,
        builder: (context,snapshot){
          final progressingState = snapshot.data?.processingState;
          final playing = snapshot.data?.playing;
          if(progressingState == ProcessingState.loading ||
              progressingState == ProcessingState.buffering){
            return Container(
              margin: EdgeInsets.all(8),
              width: 64,
              height: 64,
              child: CircularProgressIndicator(),
            );
          }
          else if(playing != true){
            return IconButton(
                onPressed: () {
                  player.play();
                },
                icon: const Icon(
                  Icons.play_arrow,
                  size: 60,
                  color: Colors.white,
                ));
          }
          else if(progressingState != ProcessingState.completed){
            return IconButton(
                onPressed: () {
                  player.pause();
                },
                icon: const Icon(
                  Icons.pause,
                  size: 60,
                  color: Colors.white,
                ));
          }
          else{
            return IconButton(
                onPressed: () => player.seek(Duration.zero),
                icon: const Icon(
                Icons.replay,
                size: 60,
                color: Colors.white,));
            }
        });
  }
  Widget progressBar(){
    return StreamBuilder<Duration?>(
        stream: player.positionStream,
        builder: (context,snapshot){
          print(player.duration);
          return ProgressBar(
            progressBarColor: CupertinoColors.systemGreen,
            baseBarColor: Colors.white.withOpacity(0.24),
            bufferedBarColor: Colors.white.withOpacity(0.24),
            thumbColor: Colors.white,
            barHeight: 3.0,
            thumbRadius: 5.0,
            progress: snapshot.data ?? Duration.zero,
            buffered: player.bufferedPosition,
            total: player.duration ?? Duration.zero,
            onSeek: (duration){
              player.seek(duration);
            },
          );
        });
  }

}
