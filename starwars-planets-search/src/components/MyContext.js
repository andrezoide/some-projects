import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext(() => {
  // use state
  const [value, setValue] = useState([]);

  // use Effect
  useEffect(() => {
    getData();
  });

  // função para obter os dados da API
  const getData = async () => {
    const data = await fetch('https://swapi.dev/api/planets');
    const response = await data.json();
    const responseFiltered = Object.keys(response.results).filter((key) => key !== 'residents');
    setValue(responseFiltered);
  }
});

export default MyContext;
