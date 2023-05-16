import React, { Component } from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissionCard from './MissionCard';

class Missions extends Component {
  render() {
    return (
      <div data-testid="missions">
        <Title headline="Missões" />
        <ul>
          {
            missions.map((mission, missao) => (
              <li key={ missao }>
                <MissionCard
                  name={ mission.name }
                  year={ mission.year }
                  countr={ mission.country }
                  destination={ mission.destination }
                />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Missions;
