import React from 'react';
import AppFromMf1 from 'mf1/App';
import AppFromMf2 from 'mf2/App';
import './style.css';


function App() {
  return (
    <div className="app">
      
      <header className="header">
        <h1>TODO APP</h1>
      </header>
      
      <div className="main-container">
     
        
        <nav className="sidebar">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>

        <AppFromMf1 />
        <AppFromMf2 />


        
        <main className="content">
         
        </main>
      </div>
    </div>
  );
}

export default App;