const data = require('../data/zoo_data');

function countAnimals(animal) {
  // seu código aqui
  const { species } = data;
  if (animal === undefined) {
    const checkSpecies = species.reduce((res, specie) =>
      Object.assign(res, { [specie.name]: specie.residents.length }), {});
    return checkSpecies;
  }
  const checkSpecie = species.find((specie) => specie.name === animal.specie).residents;
  if (animal.sex === undefined) {
    return checkSpecie.length;
  }
  const checkGender = checkSpecie.filter((resident) => resident.sex === animal.sex);
  return checkGender.length;
}

module.exports = countAnimals;
