import React, { useState, useEffect } from 'react';
import Authentication from '../components/Authentication';
import SelectedSongs from '../components/SelectedSongs';

const AuthenticatedContent = ({ user }) => {
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
      // Now we receive full song objects from the backend
      setSelectedSongs(data.songs || []);
    } catch (err) {
      console.error('Error loading songs:', err);
      setSelectedSongs([]);
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
      // Use song name for deletion
      const songName = typeof songToDelete === 'string' ? songToDelete : songToDelete.song;
      await fetch(`http://127.0.0.1:8000/api/songs/${user.username}/${encodeURIComponent(songName)}`, {
        method: 'DELETE',
      });
      // Filter out the deleted song
      setSelectedSongs(selectedSongs.filter(song => {
        const currentSongName = typeof song === 'string' ? song : song.song;
        return currentSongName !== songName;
      }));
    } catch (err) {
      console.error('Error deleting song:', err);
    }
  };

  return (
    <SelectedSongs
      selectedSongs={selectedSongs}
      onClearSelection={handleClearSelection}
      onDeleteSong={handleDeleteSong}
    />
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