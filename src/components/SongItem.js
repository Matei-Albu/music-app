import React, { useState } from 'react';

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/2/21/Music-note.svg';

const SongItem = ({ song, onSelectSong }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const imageSrc = song.image ? song.image : DEFAULT_IMAGE;

  const handleClick = () => {
    setIsClicked(true);
    onSelectSong(song);
    setTimeout(() => setIsClicked(false), 500); 
  };

  return (
    <li
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        maxWidth: '1000px',
        margin: '10px auto',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #ddd',
        borderRadius: '12px',
        backgroundColor: '#fafafa',
        cursor: 'pointer',
        boxShadow: isHovered
          ? '0 4px 12px rgba(0, 0, 0, 0.1)'
          : '0 2px 6px rgba(0,0,0,0.05)',
        transform: isClicked
          ? 'scale(0.97)'
          : isHovered
          ? 'scale(1.01)'
          : 'scale(1)',
        transition: 'all 0.15s ease-in-out',
        listStyle: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={imageSrc}
          alt="Album art"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '10px',
            objectFit: 'cover',
            marginRight: '15px',
          }}
        />
        <div>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>{song.title || song.name}</div>
          <div style={{ color: '#555', marginTop: '3px' }}>by {song.artist || 'Unknown Artist'}</div>
          {song.listeners && (
            <div style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>
              {parseInt(song.listeners).toLocaleString()} listeners
            </div>
          )}
        </div>
      </div>

      {isClicked && (
        <span
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#2e7d32',
            marginLeft: '20px',
            opacity: isClicked ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          Added
        </span>
      )}
    </li>
  );
};

export default SongItem;
