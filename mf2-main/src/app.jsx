import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('app-stats');
      const parsedStats = saved ? JSON.parse(saved) : { total: 0, completed: 0 };
      console.log('Initial stats loaded:', parsedStats);
      return parsedStats;
    } catch (error) {
      console.error('Error loading stats:', error);
      return { total: 0, completed: 0 };
    }
  });

  useEffect(() => {
    const handleStatsUpdate = (event) => {
      console.log('Stats update received:', event.detail);
      setStats(event.detail);
    };

    console.log('MF2: Adding event listener');
    window.addEventListener('STATS_UPDATED', handleStatsUpdate);

    
    try {
      const currentStats = localStorage.getItem('app-stats');
      if (currentStats) {
        const parsedStats = JSON.parse(currentStats);
        console.log('Current stats loaded:', parsedStats);
        setStats(parsedStats);
      }
    } catch (error) {
      console.error('Error loading current stats:', error);
    }

    return () => {
      console.log('MF2: Removing event listener');
      window.removeEventListener('STATS_UPDATED', handleStatsUpdate);
    };
  }, []);

  return (
    <div className="mf2">
      <h1>Task Status Dashboard</h1>
      <div className="status-container">
        <div className="status-card total">
          <h2>Total Tasks</h2>
          <span className="count">{stats.total}</span>
        </div>
        <div className="status-card completed">
          <h2>Completed</h2>
          <span className="count">{stats.completed}</span>
        </div>
        <div className="status-card pending">
          <h2>Pending</h2>
          <span className="count">{stats.total - stats.completed}</span>
        </div>
      </div>
      <button 
        className="back-button" 
        onClick={() => window.dispatchEvent(new CustomEvent('switchToMF1'))}
      >
        Back to Todos
      </button>
    </div>
  );
};

export default App;
