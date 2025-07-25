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
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {selectedSongs.map((song, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                position: 'relative',
              }}
            >
              {/* Song Image */}
              {song.image && (
                <img
                  src={song.image}
                  alt={song.title || song.name || song.song}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    marginRight: '15px',
                    objectFit: 'cover',
                  }}
                />
              )}
              
              {/* Placeholder for songs without images */}
              {!song.image && (
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    marginRight: '15px',
                    backgroundColor: '#e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: '#999',
                  }}
                >
                  🎵
                </div>
              )}
              
              {/* Song Details */}
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                  {song.title || song.name || song.song || song}
                </div>
                {song.artist && (
                  <div style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>
                    by {song.artist}
                  </div>
                )}
                {song.listeners && (
                  <div style={{ color: '#888', fontSize: '12px' }}>
                    {song.listeners} listeners
                  </div>
                )}
              </div>
              
              {/* Delete Button */}
              <button
                onClick={() => onDeleteSong(song.song || song.name || song)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#999',
                  padding: '5px',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f0f0f0';
                  e.target.style.color = '#666';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#999';
                }}
                title="Remove song"
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
            marginTop: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '14px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#d32f2f';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f44336';
          }}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default SelectedSongs;