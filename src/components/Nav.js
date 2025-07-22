import React from 'react';

const Nav = ({ currentPage, onPageChange }) => {
  return (
    <div className="content">
      <button 
        className="content" 
        onClick={() => onPageChange('home')}
        style={{ fontWeight: currentPage === 'home' ? 'bold' : 'normal' }}
      >
        Home
      </button>
      <button 
        className="content" 
        onClick={() => onPageChange('app')}
        style={{ fontWeight: currentPage === 'app' ? 'bold' : 'normal' }}
      >
        App
      </button>
      <button
        className="content" 
        onClick={() => onPageChange('mylist')}
        style={{ fontWeight: currentPage === 'mylist' ? 'bold' : 'normal' }}
      >
        My List
      </button>
    </div>
  );
};

export default Nav;