import React from 'react';
import '../Table.css';

function Table() {
  return (
    <div className="header-container">
      <header>
        <div className="header-elements">
          <p>Name <br/>{ value.name }</p>
          <p>Rotation Period <br/>{ value.rotation_period }</p>
          <p>Orbital Period <br/>{ value.orbital_period }</p>
          <p>Diameter <br/>{ value.diameter }</p>
          <p>Climate <br/>{ value.climate }</p>
          <p>Gravity <br/>{ value.gravity }</p>
          <p>Terrain <br/>{ value.terrain }</p>
          <p>Surface Water <br/>{ value.surface_water }</p>
          <p>Population <br/>{ value.population }</p>
          <p>Films <br/>{ value.films }</p>
          <p>Created <br/>{ value.created }</p>
          <p>Edited <br/>{ value.edited }</p>
          <p>URL <br/>{ value.url }</p>
        </div>
      </header>
    </div>
  );
}

export default Table;
