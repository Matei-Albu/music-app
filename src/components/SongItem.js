import React, { useState } from 'react';

const SongItem = ({ song, onSelectSong }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onClick={() => onSelectSong(song)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        margin: '5px 0',
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
        boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.2s ease-in-out'
      }}
    >
      {song.image && (
        <img
          src={song.image}
          alt="Album art"
          style={{
            width: '50px',
            height: '50px',
            marginRight: '10px',
            borderRadius: '5px'
          }}
        />
      )}
      <div>
        <div style={{ fontWeight: 'bold' }}>{song.name}</div>
        {song.listeners && (
          <div style={{ fontSize: '12px', color: '#666' }}>
            {parseInt(song.listeners).toLocaleString()} listeners
          </div>
        )}
      </div>
    </li>
  );
};

export default SongItem;
