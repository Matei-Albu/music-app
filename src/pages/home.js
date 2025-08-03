const HomePage = ({ onPageChange }) => {
    const selectedSongs = [
      {
        id: 1,
        title: "High and Dry",
        artist: "Radiohead",
        listeners: "2138064 listeners",
        albumArt: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 2,
        title: "The Hills",
        artist: "The Weeknd",
        listeners: "1815361 listeners",
        albumArt: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 3,
        title: "Highest in the room",
        artist: "Travis Scott",
        listeners: "1119165 listeners",
        albumArt: "/placeholder.svg?height=60&width=60",
      },
    ]
  
    const reviews = [
      {
        id: 1,
        song: "High and Dry",
        artist: "Radiohead",
        review: "That guitar riff still hits hard. Such a timeless track.",
        rating: 5,
        user: "MusicLover92",
      },
      {
        id: 2,
        song: "The Hills",
        artist: "The Weeknd",
        review: "Dark, moody, and powerful. Weeknd at his best.",
        rating: 4,
        user: "VinylCollector",
      },
      {
        id: 3,
        song: "Highest in the Room",
        artist: "Travis Scott",
        review: "Vibey production and hypnotic flow—looping this all day.",
        rating: 4,
        user: "HipHopHead",
      },
    ]
  
    const styles = {
      container: {
        minHeight: "100vh",
        background: "linear-gradient(135deg,rgb(190, 91, 91) 0%, #764ba2 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      },
      backgroundOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)",
        zIndex: 1,
      },
      decorativeCircle1: {
        position: "absolute",
        top: "80px",
        left: "40px",
        width: "128px",
        height: "128px",
        background: "rgba(147, 51, 234, 0.2)",
        borderRadius: "50%",
        filter: "blur(40px)",
        animation: "pulse 3s infinite",
      },
      decorativeCircle2: {
        position: "absolute",
        top: "160px",
        right: "80px",
        width: "96px",
        height: "96px",
        background: "rgba(59, 130, 246, 0.2)",
        borderRadius: "50%",
        filter: "blur(30px)",
        animation: "pulse 3s infinite 1s",
      },
      decorativeCircle3: {
        position: "absolute",
        bottom: "128px",
        left: "25%",
        width: "160px",
        height: "160px",
        background: "rgba(236, 72, 153, 0.2)",
        borderRadius: "50%",
        filter: "blur(60px)",
        animation: "pulse 3s infinite 2s",
      },
      main: {
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
      },
      content: {
        maxWidth: "1400px",
        margin: "0 auto",
        textAlign: "center",
        width: "100%",
      },
      heroText: {
        marginBottom: "48px",
      },
      heroHeading: {
        fontSize: "clamp(2rem, 8vw, 4rem)",
        fontWeight: "bold",
        lineHeight: "1.1",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        marginBottom: "24px",
      },
      sectionsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "32px",
        width: "100%",
        marginBottom: "48px",
        flexWrap: "wrap",
      },
      selectedSongs: {
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(15px)",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        flex: "1",
        maxWidth: "600px",
        minWidth: "400px",
      },
      reviewsContainer: {
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(15px)",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        flex: "1",
        maxWidth: "500px",
        minWidth: "400px",
      },
      sectionTitle: {
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "24px",
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
      songItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(5px)",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.3s",
      },
      songContent: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
      },
      albumArt: {
        width: "64px",
        height: "64px",
        background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #ec4899)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
      },
      albumArtInner: {
        width: "48px",
        height: "48px",
        background: "rgba(31,41,55,0.8)",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
      },
      songInfo: {
        textAlign: "left",
      },
      songTitle: {
        fontWeight: "600",
        fontSize: "18px",
        color: "white",
        margin: "0 0 4px 0",
      },
      songArtist: {
        color: "#e5e7eb",
        margin: "0 0 4px 0",
      },
      songListeners: {
        color: "#d1d5db",
        fontSize: "14px",
        margin: 0,
      },
      removeButton: {
        color: "#d1d5db",
        background: "none",
        border: "none",
        padding: "8px",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "all 0.3s",
      },
      reviewItem: {
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(5px)",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.3s",
      },
      reviewHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "12px",
      },
      reviewSongInfo: {
        textAlign: "left",
      },
      reviewSongTitle: {
        fontWeight: "600",
        fontSize: "18px",
        color: "white",
        margin: "0 0 4px 0",
      },
      reviewSongArtist: {
        color: "#e5e7eb",
        fontSize: "14px",
        margin: 0,
      },
      starRating: {
        display: "flex",
        gap: "2px",
      },
      star: {
        width: "16px",
        height: "16px",
      },
      reviewText: {
        color: "#e5e7eb",
        marginBottom: "12px",
        lineHeight: "1.5",
        fontStyle: "italic",
      },
      reviewUser: {
        color: "#d1d5db",
        fontSize: "14px",
        textAlign: "right",
      },
      ctaButton: {
        background: "#10b981",
        color: "white",
        fontWeight: "600",
        padding: "16px 32px",
        borderRadius: "25px",
        fontSize: "18px",
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s",
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
        marginBottom: "16px",
      },
      subtitle: {
        color: "#d1d5db",
        fontSize: "18px",
      },
    }
  
    const StarIcon = ({ filled }) => (
      <svg
        style={styles.star}
        fill={filled ? "#fbbf24" : "none"}
        stroke={filled ? "#fbbf24" : "#6b7280"}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    )
  
    return (
      <div style={styles.container}>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          .song-item:hover {
            background: rgba(0,0,0,0.3) !important;
          }
          
          .review-item:hover {
            background: rgba(0,0,0,0.3) !important;
          }
          
          .remove-button:hover {
            color: white !important;
            background: rgba(255,255,255,0.1) !important;
          }
          
          .cta-button:hover {
            background: #059669 !important;
            transform: scale(1.05) !important;
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.25) !important;
          }
  
          @media (max-width: 1024px) {
            .sections-container {
              flex-direction: column !important;
              align-items: center !important;
            }
          }
        `}</style>
  
        {/* Background elements */}
        <div style={styles.backgroundOverlay}></div>
        <div style={styles.decorativeCircle1}></div>
        <div style={styles.decorativeCircle2}></div>
        <div style={styles.decorativeCircle3}></div>
  
        {/* Main Content */}
        <main style={styles.main}>
          <div style={styles.content}>
            {/* Hero Text */}
            <div style={styles.heroText}>
              <h1 style={styles.heroHeading}>Track songs you've heard.</h1>
              <h2 style={styles.heroHeading}>Save those you want to hear.</h2>
              <h3 style={styles.heroHeading}>Tell your friends what's good.</h3>
            </div>
  
            {/* Selected Songs + Reviews Section */}
            <div style={styles.sectionsContainer} className="sections-container">
              {/* Selected Songs */}
              <div style={styles.selectedSongs}>
                <h4 style={styles.sectionTitle}>Selected Songs</h4>
                <div>
                  {selectedSongs.map((song) => (
                    <div key={song.id} style={styles.songItem} className="song-item">
                      <div style={styles.songContent}>
                        <div style={styles.albumArt}>
                          <div style={styles.albumArtInner}>🎵</div>
                        </div>
                        <div style={styles.songInfo}>
                          <h5 style={styles.songTitle}>{song.title}</h5>
                          <p style={styles.songArtist}>by {song.artist}</p>
                          <p style={styles.songListeners}>{song.listeners}</p>
                        </div>
                      </div>
                      <button style={styles.removeButton} className="remove-button">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Song Reviews */}
              <div style={styles.reviewsContainer}>
                <h4 style={styles.sectionTitle}>
                  <svg width="24" height="24" fill="#fbbf24" stroke="#fbbf24" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  Recent Reviews
                </h4>
                <div>
                  {reviews.map((review) => (
                    <div key={review.id} style={styles.reviewItem} className="review-item">
                      <div style={styles.reviewHeader}>
                        <div style={styles.reviewSongInfo}>
                          <h6 style={styles.reviewSongTitle}>"{review.song}"</h6>
                          <p style={styles.reviewSongArtist}>by {review.artist}</p>
                        </div>
                        <div style={styles.starRating}>
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} filled={i < review.rating} />
                          ))}
                        </div>
                      </div>
                      <p style={styles.reviewText}>"{review.review}"</p>
                      <p style={styles.reviewUser}>— {review.user}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* CTA Button */}
            <button 
              style={styles.ctaButton} 
              className="cta-button" 
              onClick={() => onPageChange('app')}
            >
              Get started — it's free!
            </button>
  
            {/* Subtitle */}
            <p style={styles.subtitle}>The social network for music lovers.</p>
          </div>
        </main>
      </div>
    )
  }
  
  export default HomePage