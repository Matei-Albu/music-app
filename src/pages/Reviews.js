import React, { useState, useEffect } from 'react';
import Authentication from '../components/Authentication';
import Search from '../components/Search';

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allReviews, setAllReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    loadAllReviews();
  }, []);

  useEffect(() => {
    // Filter reviews based on search query
    if (searchQuery.trim() === '') {
      setFilteredReviews(allReviews);
    } else {
      const filtered = allReviews.filter(review =>
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.review_text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredReviews(filtered);
    }
  }, [searchQuery, allReviews]);

  const loadAllReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/reviews');
      const data = await response.json();
      setAllReviews(data.reviews || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setAllReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const getScoreColor = (score) => {
    if (score >= 7) return '#4CAF50'; // Green
    if (score >= 4) return '#FFA726'; // Orange
    return '#F44336'; // Red
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  };

  return (
    <Authentication>
      {({ user, signOut }) => (
        <div style={{ color: 'white', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          
          <Search
            query={searchQuery}
            onQueryChange={handleQueryChange}
            onSubmit={handleSearch}
            placeholder="Search reviews by song, artist, user, or content..."
          />

          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <p>Loading reviews...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '50px', color: '#777' }}>
              {searchQuery.trim() === '' ? (
                <>
                  <p>No reviews yet.</p>
                  <p>Be the first to review a song!</p>
                </>
              ) : (
                <p>No reviews found matching "{searchQuery}"</p>
              )}
            </div>
          ) : (
            <>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '20px', 
                color: '#ccc' 
              }}>
                {searchQuery.trim() ? (
                  <p>Found {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''} matching "{searchQuery}"</p>
                ) : (
                  <p>Showing {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}</p>
                )}
              </div>

              <div style={{
                display: 'grid',
                gap: '20px',
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                marginTop: '20px'
              }}>
                {filteredReviews.map((review, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      border: '1px solid rgba(118, 75, 162, 0.6)',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(76, 45, 109, 0.3)',
                      backdropFilter: 'blur(5px)',
                      padding: '20px',
                      transition: 'all 0.15s ease-in-out',
                      transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: hoveredIndex === index
                        ? '0 8px 25px rgba(0, 0, 0, 0.2)'
                        : '0 2px 10px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                      {review.image ? (
                        <img
                          src={review.image}
                          alt={review.title}
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            flexShrink: 0
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '8px',
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '32px',
                            color: '#999',
                            flexShrink: 0
                          }}
                        >
                          🎵
                        </div>
                      )}

                      <div style={{ flex: 1 }}>
                        {/* Song Info */}
                        <div style={{ marginBottom: '10px' }}>
                          <h3 style={{ 
                            margin: '0 0 5px 0', 
                            fontSize: '18px', 
                            color: 'white' 
                          }}>
                            {review.title}
                          </h3>
                          <p style={{ 
                            margin: '0 0 5px 0', 
                            color: '#ccc', 
                            fontSize: '14px' 
                          }}>
                            by {review.artist}
                          </p>
                        </div>

                        {/* Score and User */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          marginBottom: '15px'
                        }}>
                          <span style={{
                            backgroundColor: getScoreColor(review.score),
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}>
                            {review.score}/10
                          </span>
                          <span style={{ 
                            color: '#aaa', 
                            fontSize: '12px' 
                          }}>
                            by {review.username} • {formatDate(review.created_at)}
                          </span>
                        </div>

                        {/* Review Text */}
                        <div style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          padding: '15px',
                          borderRadius: '8px',
                          borderLeft: `4px solid ${getScoreColor(review.score)}`
                        }}>
                          <p style={{ 
                            margin: 0, 
                            fontSize: '14px', 
                            lineHeight: '1.5',
                            color: '#fff'
                          }}>
                            "{review.review_text}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Authentication>
  );
};

export default Reviews;