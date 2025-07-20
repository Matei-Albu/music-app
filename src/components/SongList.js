import React from 'react';

const SongList = ({ songs, onSelectSong }) => {
  return (
    <>
      <h2>Results:</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {songs.map((song, index) => (
          <li 
            key={index} 
            onClick={() => onSelectSong(song)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              margin: '5px 0',
              border: '1px solid #ddd',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9'
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
        ))}
        {songs.length === 0 && <p>No matching songs found.</p>}
      </ul>
    </>
  );
};

export default SongList;