"use client"

const Nav = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "app", label: "Search", icon: "🔍" },
    { id: "mylist", label: "My List", icon: "🎵" },
    { id: "reviews", label: "Reviews", icon: "💬" },
  ]

  const navStyle = {
    background: 'linear-gradient(90deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    margin: 0,  // Remove any margin
    padding: 0, // Remove default padding
    width: '100vw', // Full viewport width
    boxSizing: 'border-box', // Include border in width calculation
  }

  const containerStyle = {
    maxWidth: '1152px',
    margin: '0 auto',
    padding: '0 24px',
    width: '100%',
  }

  const headerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  }
  
  const centerNavStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }
  

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const logoStyle = {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const brandTextStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  const navItemsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  const getButtonStyle = (isActive) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(1)',
    background: isActive 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'transparent',
    color: isActive ? 'white' : '#d1d5db',
    backdropFilter: isActive ? 'blur(8px)' : 'none',
    border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
    boxShadow: isActive ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
  })

  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const avatarStyle = {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #ec4899, #a855f7)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  }

  const bottomLineStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent)',
  }

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          {/* Logo/Brand */}
          <div style={brandStyle}>
            <div style={logoStyle}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>SF</span>
            </div>
            <span style={brandTextStyle}>SongFinder</span>
          </div>

            {/* Centered Navigation Items */}
            <div style={centerNavStyle}>
            {navItems.map((item) => (
                <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                style={getButtonStyle(currentPage === item.id)}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    if (currentPage !== item.id) {
                    e.target.style.color = 'white';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    if (currentPage !== item.id) {
                    e.target.style.color = '#d1d5db';
                    e.target.style.background = 'transparent';
                    }
                }}
                >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span>{item.label}</span>
                </button>
            ))}
            </div>


          {/* Profile/User section */}
          <div style={profileStyle}>
            <div 
              style={avatarStyle}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <span style={{ color: 'white', fontSize: '14px' }}>👤</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle bottom glow */}
      <div style={bottomLineStyle}></div>
    </nav>
  )
}

export default Nav