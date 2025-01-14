import React, { useState, useEffect } from 'react';
import AppFromMf1 from 'mf1/App';
import AppFromMf2 from 'mf2/App';
import './style.css';

const App = () => {
  const [currentMF, setCurrentMF] = useState('mf1');

  useEffect(() => {
    const handleSwitchToMF1 = () => setCurrentMF('mf1');
    const handleSwitchToMF2 = () => setCurrentMF('mf2');

    window.addEventListener('switchToMF1', handleSwitchToMF1);
    window.addEventListener('switchToMF2', handleSwitchToMF2);

    return () => {
      window.removeEventListener('switchToMF1', handleSwitchToMF1);
      window.removeEventListener('switchToMF2', handleSwitchToMF2);
    };
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <h2>NAV BAR</h2>
        <nav>
          <button
            className={`nav-button ${currentMF === 'mf1' ? 'active' : ''}`}
            onClick={() => setCurrentMF('mf1')}
          >
            Todo List
          </button>
          <button
            className={`nav-button ${currentMF === 'mf2' ? 'active' : ''}`}
            onClick={() => setCurrentMF('mf2')}
          >
            Dashboard
          </button>
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>TODO LIST</h1>
        </div>

        <div className="content-wrapper">
          <div className="micro-frontends">
            {currentMF === 'mf1' ? <AppFromMf1 /> : <AppFromMf2 />}
          </div>
          <div className="welcome-message">
            <h2>Welcome user,</h2>
            <p>Happy to see you!!</p>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: deepak.verma@clear.in</p>
              <p>Phone: (945) 334-5610</p>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <a 
                // href="https://www.linkedin.com/in/deepak-k-verma-a7bb54234/"
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
              >
                LinkedIn
              </a>
              <a 
                // href="https://www.instagram.com/thedeepakvrma/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
              >
                Instagram
              </a>
            </div>
            <div className="footer-section">
              <p>About Us</p>
              <p>Terms of Service</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Clear. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;