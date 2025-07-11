import React from 'react';

const SongList = ({ songs, onSelectSong }) => {
  return (
    <>
      <h2>Results:</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {songs.map((song, index) => (
          <li key={index} onClick={() => onSelectSong(song)}>
            {song}
          </li>
        ))}
        {songs.length === 0 && <p>No matching songs found.</p>}
      </ul>
    </>
  );
};

export default SongList;