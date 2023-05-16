import React, { Component } from 'react';
import Title from './Title';
import Planets from '../data/planets';
import PlanetCard from './PlanetCard';

class SolarSystem extends Component {
  render() {
    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        <ul key="chave">
          {
            Planets.map((planet, key) => (
              <li key={ key }>
                <PlanetCard
                  planetName={ planet.name }
                  planetImage={ planet.image }
                />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default SolarSystem;
