import React, { useState, useEffect } from 'react';

const ReviewModel = ({ 
  song, 
  isOpen, 
  onClose, 
  onReviewSubmit, 
  existingReview = null 
}) => {
  const [score, setScore] = useState(existingReview?.user_score || 0);
  const [reviewText, setReviewText] = useState(existingReview?.user_review || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setScore(existingReview.user_score || 0);
      setReviewText(existingReview.user_review || '');
    } else {
      setScore(0);
      setReviewText('');
    }
  }, [existingReview, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (score === 0 || reviewText.trim() === '') {
      alert('Please provide both a score and a review');
      return;
    }

    setIsSubmitting(true);
    try {
      await onReviewSubmit(song, score, reviewText);
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '15px'
        }}>
          {song.image && (
            <img 
              src={song.image} 
              alt="Album art"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '5px',
                objectFit: 'cover'
              }}
            />
          )}
          <div>
            <h2 style={{ margin: 0, fontSize: '18px' }}>{song.title || song.song}</h2>
            <p style={{ margin: '5px 0 0 0', color: '#ccc' }}>{song.artist}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Score (0-10)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={score}
                onChange={(e) => setScore(parseFloat(e.target.value))}
                style={{
                  flex: 1,
                  height: '6px',
                  backgroundColor: '#333',
                  borderRadius: '3px',
                  outline: 'none'
                }}
              />
              <span style={{
                backgroundColor: '#333',
                padding: '5px 10px',
                borderRadius: '5px',
                minWidth: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                color: score >= 7 ? '#4CAF50' : score >= 4 ? '#FFA726' : '#F44336'
              }}>
                {score.toFixed(1)}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your thoughts about this song..."
              rows="6"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                resize: 'vertical',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'flex-end' 
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#555',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || score === 0 || reviewText.trim() === ''}
              style={{
                padding: '10px 20px',
                backgroundColor: isSubmitting || score === 0 || reviewText.trim() === '' 
                  ? '#555' 
                  : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: isSubmitting || score === 0 || reviewText.trim() === '' 
                  ? 'not-allowed' 
                  : 'pointer'
              }}
            >
              {isSubmitting ? 'Saving...' : existingReview ? 'Update Review' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModel;