import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Nav';
import Home from './pages/Home';
import AppPage from './pages/AppPage';
import MyList from './pages/MyList';
import Reviews from './pages/Reviews';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'app':
        return <AppPage />;
      case 'mylist':
        return <MyList />;
      case 'reviews':
        return <Reviews />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
      {renderPage()}
    </div>
  );
};

export default App;