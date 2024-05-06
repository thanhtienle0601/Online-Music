import 'package:flutter/material.dart';
import 'package:spotify/navigations/tabbar.dart';
import 'package:spotify/views/splash.dart';
import 'package:spotify/widgets/row_album_card.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<MyApp> createState() => MyAppPageState();
}

class MyAppPageState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      themeMode: ThemeMode.dark,
      darkTheme: ThemeData(
          scaffoldBackgroundColor: Colors.black,
          brightness: Brightness.dark,
          bottomNavigationBarTheme: BottomNavigationBarThemeData(
            backgroundColor: Colors.white10,
            type: BottomNavigationBarType.fixed,
            selectedLabelStyle: TextStyle(fontSize: 12),
            unselectedLabelStyle: TextStyle(fontSize: 12),
            selectedItemColor: Colors.white,
            unselectedItemColor: Colors.white38,
          )),
      home: SplashPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class GridviewPage extends StatelessWidget {
  const GridviewPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.all(10),
      children: [
        Card(
          child: Column(
            children: [
              ListTile(
                leading: Icon(Icons.ac_unit),
                title: Text('Product 1'),
                subtitle: Text('11.5'),
                onTap: (){
                },
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  IconButton(
                    onPressed: (){},
                    icon: Icon(Icons.arrow_downward),
                  ),
                  IconButton(
                    onPressed: (){},
                    icon: Icon(Icons.add_shopping_cart),
                  ),
                ],
              ),
            ],
          ),
        ),

      ],
    );
  }
}

