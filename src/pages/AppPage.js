import React, { useState } from 'react';
import Authentication from '../components/Authentication';
import Search from '../components/Search';
import SongList from '../components/SongList';
import SelectedSongs from '../components/SelectedSongs';

const AppPage = () => {
  const [query, setQuery] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  const songs = [
    "Bohemian Rhapsody",
    "Stairway to Heaven",
    "Hotel California",
    "Imagine",
    "Smells Like Teen Spirit",
    "Sweet Child O' Mine",
    "Hey Jude",
    "Billie Jean",
    "Wonderwall",
    "Shake It Off"
  ];

  const filteredSongs = songs.filter(song =>
    song.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectSong = (song) => {
    if (!selectedSongs.includes(song)) {
      setSelectedSongs([...selectedSongs, song]);

      fetch('http://127.0.0.1:8000/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song }),
      }).catch(err => console.error('Error adding song:', err));
    }
  };

  const handleClearSelection = () => {
    setSelectedSongs([]);
  };

  return (
    <Authentication>
      <Search
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={handleSearch}
      />

      <SongList
        songs={filteredSongs}
        onSelectSong={handleSelectSong}
      />

      <SelectedSongs
        selectedSongs={selectedSongs}
        onClearSelection={handleClearSelection}
      />
    </Authentication>
  );
};

export default AppPage;
