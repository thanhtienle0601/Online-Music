import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:spotify/views/home.dart';
import 'package:spotify/views/library.dart';
import 'package:spotify/views/profile.dart';
import 'package:spotify/views/search.dart';

class TabbarPage extends StatefulWidget {
  final int? index;
  const TabbarPage({super.key,this.index});

  @override
  State<TabbarPage> createState() => TabbarPageState();
}

class TabbarPageState extends State<TabbarPage> {

  int selectedTab = 0;
  @override
  void initState() {

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: selectedTab,
        onTap: (index) {
          setState(() {
            selectedTab = index;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search_outlined),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.library_music),
            label: 'Your Library',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
      body: Stack(
        children: [
          renderView(
            0,
            HomeView(),
          ),
          renderView(
            1,
            Search(),
          ),
          renderView(
            2,
            Library(),
          ),
          renderView(
            3,
            Profile(),
          ),
        ],
      ),
    );
  }

  Widget renderView(int tabIndex, Widget view) {
    return IgnorePointer(
      ignoring: selectedTab != tabIndex,
      child: Opacity(
        opacity: selectedTab == tabIndex ? 1 : 0,
        child: view,
      ),
    );
  }
}
