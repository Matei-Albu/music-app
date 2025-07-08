import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';

const AppPage = () => {
  const [query, setQuery] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  // Dummy song list
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

  // Filter songs based on search query (case-insensitive)
  const filteredSongs = songs.filter(song =>
    song.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSelectSong = (song) => {
    if (!selectedSongs.includes(song)) {
      setSelectedSongs([...selectedSongs, song]);
      
      // API POST call
      fetch('http://127.0.0.1:8000/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song: song }),
      })
      .catch(err => console.error('Error adding song:', err));
    }
  };

  const handleClearSelection = () => {
    setSelectedSongs([]);
  };

  return (
    <Authenticator>
      {({ signOut }) => (
        <div>
          <h1>Music app content</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for a song..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <h2>Results:</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filteredSongs.map((song, index) => (
              <li key={index} onClick={() => handleSelectSong(song)}>{song}</li>
            ))}
            {filteredSongs.length === 0 && <p>No matching songs found.</p>}
          </ul>

          <h3>Selected Songs:</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {selectedSongs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>

          <button onClick={handleClearSelection}>Clear</button>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </Authenticator>
  );
};

export default AppPage;