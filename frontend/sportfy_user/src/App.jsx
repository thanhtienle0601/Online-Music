import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SingUpPage from './components/signUp/SingUpPage';
import Layout from './layout/Layout';
import Premium from './components/premium/Premium';
import PremiumDetails from './components/premium/PremiunDetails';
import Album from './components/album/Album';
import AlbumDetails from './components/album/AlbumDetails';
import Search from './components/home/Search';
import Playlist from './components/playlist/Playlist';
import PlaylistDetails from './components/playlist/PlaylistDetails';
import Artist from './components/artist/Artist';
import ArtistDetails from './components/artist/ArtistDetails';
// import Profile from './components/profile/Profile';
// import Search from './components/home/Search';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/album" element={<Album />} />
        <Route path="/album_details/:id" element={<AlbumDetails />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/playlist_details/:id" element={<PlaylistDetails />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/artist_details/:id" element={<ArtistDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SingUpPage />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/premium_details" element={<PremiumDetails />} />
    </Routes>
  );
};

export default App;
