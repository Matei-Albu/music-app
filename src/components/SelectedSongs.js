import React, { useState } from 'react';
import ReviewModel from './ReviewModel';

const SelectedSongs = ({ selectedSongs, onClearSelection, onDeleteSong, onReviewUpdate, username }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [reviewModelOpen, setReviewModelOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const handleReviewClick = (song) => {
    setCurrentSong(song);
    setReviewModelOpen(true);
  };

  const handleReviewSubmit = async (song, score, reviewText) => {
    try {
      const reviewData = {
        song_name: song.song || song.name || song,
        artist: song.artist || 'Unknown Artist',
        title: song.title || song.name || song.song || song,
        username: username,
        score: score,
        review_text: reviewText,
        image: song.image
      };

      const response = await fetch('http://127.0.0.1:8000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Call parent component to refresh the song list
      if (onReviewUpdate) {
        onReviewUpdate();
      }

      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 7) return '#4CAF50'; // Green
    if (score >= 4) return '#FFA726'; // Orange
    return '#F44336'; // Red
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {selectedSongs.length === 0 ? (
        <p style={{ color: 'white' }}>No songs selected</p>
      ) : (
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {selectedSongs.map((song, index) => {
            const isHovered = index === hoveredIndex;
            const isClicked = index === clickedIndex;

            const handleClick = () => {
              setClickedIndex(index);
              setTimeout(() => setClickedIndex(null), 400);
            };

            return (
              <li
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseDown={handleClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  padding: '15px',
                  border: '1px solid rgba(118, 75, 162, 0.6)',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(76, 45, 109, 0.3)',
                  backdropFilter: 'blur(5px)',
                  position: 'relative',
                  transition: 'all 0.15s ease-in-out',
                  transform: isClicked
                    ? 'scale(0.97)'
                    : isHovered
                    ? 'scale(1.01)'
                    : 'scale(1)',
                  boxShadow: isHovered
                    ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                    : '0 2px 6px rgba(0,0,0,0.05)',
                  cursor: 'default',
                }}
              >
                {/* Song Image */}
                {song.image ? (
                  <img
                    src={song.image}
                    alt={song.title || song.name || song.song}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '10px',
                      marginRight: '15px',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '10px',
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

                {/* Song Info */}
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px', color: 'white' }}>
                    {song.title || song.name || song.song || song}
                  </div>
                  {song.artist && (
                    <div style={{ color: 'white', fontSize: '14px', marginBottom: '4px' }}>
                      by {song.artist}
                    </div>
                  )}
                  {song.listeners && (
                    <div style={{ fontSize: '12px', color: 'white', marginBottom: '8px' }}>
                      {song.listeners} listeners
                    </div>
                  )}
                  
                  {/* Review Display */}
                  {song.has_review && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      marginTop: '8px'
                    }}>
                      <span style={{
                        backgroundColor: getScoreColor(song.user_score),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {song.user_score}/10
                      </span>
                      <span style={{ 
                        color: '#ccc', 
                        fontSize: '12px',
                        fontStyle: 'italic',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '200px'
                      }}>
                        "{song.user_review}"
                      </span>
                    </div>
                  )}
                </div>

                {/* Review Button */}
                <button
                  onClick={() => handleReviewClick(song)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '50px',
                    padding: '4px 8px',
                    backgroundColor: song.has_review ? '#4CAF50' : '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {song.has_review ? '✏️ Edit' : '⭐ Review'}
                </button>

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
                    transition: 'all 0.2s ease-in-out',
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
            );
          })}
        </ul>
      )}

      {/* Clear All Button */}
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
            transition: 'background-color 0.2s ease-in-out',
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

      <ReviewModel
        song={currentSong}
        isOpen={reviewModelOpen}
        onClose={() => {
          setReviewModelOpen(false);
          setCurrentSong(null);
        }}
        onReviewSubmit={handleReviewSubmit}
        existingReview={currentSong}
      />
    </div>
  );
};

export default SelectedSongs;