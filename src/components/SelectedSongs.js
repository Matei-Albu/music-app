import React from 'react';

const SelectedSongs = ({ selectedSongs, onClearSelection }) => {
  return (
    <>
      <h3>Selected Songs:</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {selectedSongs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
      <button onClick={onClearSelection}>Clear</button>
    </>
  );
};

export default SelectedSongs;