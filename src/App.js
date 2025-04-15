import './App.css';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import Home from './pages/home';
import AppPage from './pages/app-page'; 

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <NavLink className="content" exact="true" activeclassname="active" to="/">Home</NavLink>
          <NavLink className="content" activeclassname="active" to="/app">App</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<AppPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
