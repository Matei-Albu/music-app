import React, { useState, useEffect } from 'react';
import Authentication from '../components/Authentication';
import SelectedSongs from '../components/SelectedSongs';
import Search from '../components/Search';

const AuthenticatedContent = ({ user }) => {
  const [query, setQuery] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

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

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const getFilteredSongs = () => {
    return selectedSongs.filter(song =>
      (song.song || song).toLowerCase().includes(query.toLowerCase()) ||
      (song.artist && song.artist.toLowerCase().includes(query.toLowerCase())) ||
      (song.title && song.title.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleClearSelection = async () => {
    if (!window.confirm('Are you sure you want to clear all songs? This will also delete all your reviews.')) {
      return;
    }
    
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
    const songName = typeof songToDelete === 'string' ? songToDelete : songToDelete.song;
    
    if (!window.confirm(`Are you sure you want to delete "${songName}"? This will also delete your review if you have one.`)) {
      return;
    }
    
    try {
      await fetch(`http://127.0.0.1:8000/api/songs/${user.username}/${encodeURIComponent(songName)}`, {
        method: 'DELETE',
      });
      setSelectedSongs(selectedSongs.filter(song => {
        const currentSongName = typeof song === 'string' ? song : song.song;
        return currentSongName !== songName;
      }));
    } catch (err) {
      console.error('Error deleting song:', err);
    }
  };

  const handleReviewUpdate = () => {
    // Reload songs to get updated review data
    if (user?.username) {
      loadUserSongs(user.username);
    }
  };

  return (
    <>
      <Search
        query={query}
        onQueryChange={handleQueryChange}
      />
      <SelectedSongs
        selectedSongs={getFilteredSongs()}
        onClearSelection={handleClearSelection}
        onDeleteSong={handleDeleteSong}
        onReviewUpdate={handleReviewUpdate}
        username={user.username}
      />
    </>
  );
};

const MyList = () => {
  return (
    <Authentication>
      {({ user }) => <AuthenticatedContent user={user} />}
    </Authentication>
  );
}

export default MyList;