import React from 'react';
import './App.css';
import MyContext from './components/MyContext';
import Table from './components/Table';

function App() {
  return (
    <MyContext.Provider>
      <Table />
    </MyContext.Provider>
  );
}

export default App;
