import React, { useState, useEffect } from 'react';
import Authentication from '../components/Authentication';
import Search from '../components/Search';
import SongList from '../components/SongList';
import SelectedSongs from '../components/SelectedSongs';

// Create a separate component to handle the authenticated content
const AuthenticatedContent = ({ user }) => {
  const [query, setQuery] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load user's songs when component mounts or user changes
  useEffect(() => {
    if (user?.username) {
      loadUserSongs(user.username);
    }
  }, [user?.username]);

  const loadUserSongs = async (username) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/songs/${username}`);
      const data = await response.json();
      setSelectedSongs(data.songs || []);
    } catch (err) {
      console.error('Error loading songs:', err);
      setSelectedSongs([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setSearchResults(data.songs || []);
    } catch (err) {
      console.error('Error searching songs:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setSearchResults([]);
    }
  };

  const handleSelectSong = async (song) => {
    // song is now an object with {name, artist, title, image, listeners, url}
    const songName = song.name || song; // Handle both object and string cases
    
    if (!selectedSongs.includes(songName)) {
      setSelectedSongs([...selectedSongs, songName]);
      try {
        await fetch('http://127.0.0.1:8000/api/songs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            song: songName,
            username: user.username,
            // You can also store additional data if you want:
            artist: song.artist,
            title: song.title,
            image: song.image
          }),
        });
      } catch (err) {
        console.error('Error adding song:', err);
        if (err.response?.status === 400) {
          loadUserSongs(user.username);
        }
      }
    }
  };

  const handleClearSelection = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/songs/${user.username}`, {
        method: 'DELETE',
      });
      setSelectedSongs([]);
    } catch (err) {
      console.error('Error clearing songs:', err);
    }
  };

  const handleDeleteSong = async (songToDelete) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/songs/${user.username}/${encodeURIComponent(songToDelete)}`, {
        method: 'DELETE',
      });
      setSelectedSongs(selectedSongs.filter(song => song !== songToDelete));
    } catch (err) {
      console.error('Error deleting song:', err);
    }
  };

  return (
    <>
      <Search
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={handleSearch}
      />
      <SongList
        songs={searchResults}
        onSelectSong={handleSelectSong}
      />
      {isSearching && <p>Searching songs...</p>}
      <SelectedSongs
        selectedSongs={selectedSongs}
        onClearSelection={handleClearSelection}
        onDeleteSong={handleDeleteSong}
      />
    </>
  );
};

const AppPage = () => {
  return (
    <Authentication>
      {({ user }) => <AuthenticatedContent user={user} />}
    </Authentication>
  );
};

export default AppPage;