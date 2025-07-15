import React, { useState, useEffect } from 'react';
import Authentication from '../components/Authentication';
import Search from '../components/Search';
import SongList from '../components/SongList';
import SelectedSongs from '../components/SelectedSongs';

// Create a separate component to handle the authenticated content
const AuthenticatedContent = ({ user }) => {
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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectSong = async (song) => {
    if (!selectedSongs.includes(song)) {
      setSelectedSongs([...selectedSongs, song]);
      try {
        await fetch('http://127.0.0.1:8000/api/songs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            song,
            username: user.username
          }),
        });
      } catch (err) {
        console.error('Error adding song:', err);
        // If there's an error (like duplicate), reload the songs to sync with backend
        if (err.response?.status === 400) {
          loadUserSongs(user.username);
        }
      }
    }
  };

  const handleClearSelection = async () => {
    try {
      // Clear all songs from backend for this user
      await fetch(`http://127.0.0.1:8000/api/songs/${user.username}`, {
        method: 'DELETE',
      });
      // Clear local state
      setSelectedSongs([]);
    } catch (err) {
      console.error('Error clearing songs:', err);
    }
  };

  const handleDeleteSong = async (songToDelete) => {
    try {
      // Delete specific song from backend
      await fetch(`http://127.0.0.1:8000/api/songs/${user.username}/${encodeURIComponent(songToDelete)}`, {
        method: 'DELETE',
      });
      // Remove from local state
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
        songs={filteredSongs}
        onSelectSong={handleSelectSong}
      />
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