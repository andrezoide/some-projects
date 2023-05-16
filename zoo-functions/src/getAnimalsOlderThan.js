const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const checkAnimal = data.species.find((el) => el.name === animal);
  const checkAge = checkAnimal.residents.map((el) => el.age);
  const result = checkAge.every((el) => el >= age);
  return result;
}

module.exports = getAnimalsOlderThan;
