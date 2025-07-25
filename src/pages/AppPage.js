import React, { useState, useEffect } from 'react';
import Authentication from '../components/Authentication';
import Search from '../components/Search';
import SongList from '../components/SongList';

// Create a separate component to handle the authenticated content
const AuthenticatedContent = ({ user }) => {
  const [query, setQuery] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load user's songs initially to avoid adding duplicates
  useEffect(() => {
    if (user?.username) {
      fetchUserSongs(user.username);
    }
  }, [user?.username]);

  const fetchUserSongs = async (username) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/songs/${username}`);
      const data = await response.json();
      // Extract song names for duplicate checking
      const songNames = (data.songs || []).map(song => 
        typeof song === 'string' ? song : song.song
      );
      setSelectedSongs(songNames);
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
    const songName = song.name || song;
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
            artist: song.artist,
            title: song.title,
            image: song.image,
            listeners: song.listeners,
            url: song.url,
          }),
        });
      } catch (err) {
        console.error('Error adding song:', err);
        // Remove from local state if API call failed
        setSelectedSongs(selectedSongs.filter(s => s !== songName));
      }
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