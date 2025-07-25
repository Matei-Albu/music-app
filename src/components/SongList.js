import React from 'react';
import SongItem from '../components/SongItem'; 

const SongList = ({ songs, onSelectSong }) => {
  return (
    <>
      <h2>Results:</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {songs.map((song, index) => (
          <SongItem key={index} song={song} onSelectSong={onSelectSong} />
        ))}
      </ul>
    </>
  );
};

export default SongList;
