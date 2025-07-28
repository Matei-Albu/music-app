import React from 'react';

const Search = ({ query, onQueryChange, onSubmit }) => {
  const formStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(74, 74, 74, 0.2)',
    maxWidth: '600px',
    margin: '24px auto',
  };

  const inputStyle = {
    flex: 1,
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    color: 'black',
    border: 'none',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  };

  return (
    <form onSubmit={onSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Search for a song..."
        value={query}
        onChange={onQueryChange}
        style={inputStyle}
      />
      <button
        type="submit"
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
