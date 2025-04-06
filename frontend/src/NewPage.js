import React from 'react';
import './App.css'; // Reuse the same styling

function NewPage() {
  return (
    <div className="App">
      <div className="card-container">
        <div className="card">
          <h2>Card 1</h2>
          <p>This is the first card with some placeholder content.</p>
        </div>
        <div className="card">
          <h2>Card 2</h2>
          <p>This is the second card with some placeholder content.</p>
        </div>
        <div className="card">
          <h2>Card 3</h2>
          <p>This is the third card with some placeholder content.</p>
        </div>
      </div>
    </div>
  );
}

export default NewPage;