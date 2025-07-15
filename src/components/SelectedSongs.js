import React from 'react';

const SelectedSongs = ({ selectedSongs, onClearSelection, onDeleteSong }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3>Selected Songs</h3>

      {selectedSongs.length === 0 ? (
        <p>No songs selected</p>
      ) : (
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            maxWidth: '300px',
            margin: '0 auto',
          }}
        >
          {selectedSongs.map((song, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                marginBottom: '10px',
                padding: '8px 0',
              }}
            >
              <span style={{ textAlign: 'center', fontSize: '16px' }}>{song}</span>
              <button
                onClick={() => onDeleteSong(song)}
                style={{
                  position: 'absolute',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#999',
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedSongs.length > 0 && (
        <button
          onClick={onClearSelection}
          style={{
            marginTop: '10px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default SelectedSongs;
