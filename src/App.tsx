import React from 'react';
import './App.css';
import Header from './components/Header';
import SetCurrency from './components/SetCurrency';

function App() {
  return (
    <div className="App">
      <Header />
      
      <SetCurrency />

      <hr />

      <h2>Shopping List</h2>

    </div>
  );
}

export default App;
