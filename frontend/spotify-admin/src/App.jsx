/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Nopage from './pages/Nopage';
import Song from './pages/Song';
// import User from './pages/User';
import CreateSong from './pages/CreateSong';
import EditSong from './pages/EditSong';
import Login from './pages/Login';
import Artist from './pages/Artist';
import CreateArtist from './pages/CreateArtist';
import EditArtist from './pages/EditArtist';
import Genre from './pages/Genre';
import CreateGenre from './pages/CreateGenre';
import EditGenre from './pages/EditGenre';
import Album from './pages/Album';
import CreateAlbum from './pages/CreateAlbum';
import EditAlbum from './pages/EditAlbum';
import Pack from './pages/Pack';
import User from './pages/User';
import Invoice from './pages/Invoice';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/album" element={<Album />} />
        <Route path="/album/create" element={<CreateAlbum />} />
        <Route path="/album/edit/:id" element={<EditAlbum />} />
        <Route path="/song" element={<Song />} />
        <Route path="/song/create" element={<CreateSong />} />
        <Route path="/song/edit/:id" element={<EditSong />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/genre/create" element={<CreateGenre />} />
        <Route path="/genre/edit/:id" element={<EditGenre />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/artist/create" element={<CreateArtist />} />
        <Route path="/artist/edit/:id" element={<EditArtist />} />
        <Route path="/pack" element={<Pack />} />
        <Route path="/user" element={<User />} />
        <Route path="/invoice" element={<Invoice />} />

        <Route path="*" element={<Nopage />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
