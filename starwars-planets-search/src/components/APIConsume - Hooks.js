import React, { useState, useEffect } from 'react';

function APIConsume() {
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
    const responseFiltered = Object.keys(response).filter((key) => key !== 'residents');
    setValue(convert);
  }
};

export default APIConsume;
