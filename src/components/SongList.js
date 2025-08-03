import React from 'react';
import SongItem from '../components/SongItem'; 

const SongList = ({ songs, onSelectSong }) => {
  return (
    <>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {songs.map((song, index) => (
          <SongItem key={index} song={song} onSelectSong={onSelectSong} />
        ))}
      </ul>
    </>
  );
};

export default SongList;
