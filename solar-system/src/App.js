import React, { Component } from 'react';
import Header from './components/Header';
import SolarSystem from './components/SolarSystem';
import Title from './components/Title';
import Missions from './components/Missions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SolarSystem />
        <Missions />
        <Title />
      </div>
    );
  }
}

export default App;
