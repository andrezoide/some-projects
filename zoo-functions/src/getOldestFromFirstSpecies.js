const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  // seu código aqui

  const idFirstAnimal = data.employees.find((func) => func.id === id)
    .responsibleFor[0];
  const animal = data.species.find((spc) => spc.id === idFirstAnimal);
  let old = animal.residents[0];
  const oldestAnimal = () => {
    animal.residents.forEach((res) => {
      if (res.age > old.age) old = res;
    });
    old = [old.name, old.sex, old.age];
    return old;
  };
  return oldestAnimal();
}

module.exports = getOldestFromFirstSpecies;
