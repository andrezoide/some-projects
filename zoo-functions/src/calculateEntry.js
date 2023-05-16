const data = require('../data/zoo_data');

const visitants = [
  { name: 'Lara Carvalho', age: 5 },
  { name: 'Frederico Moreira', age: 5 },
  { name: 'Pedro Henrique Carvalho', age: 5 },
  { name: 'Maria Costa', age: 18 },
  { name: 'Núbia Souza', age: 18 },
  { name: 'Carlos Nogueira', age: 50 },
];
function countEntrants(entrants = visitants) {
  const child = entrants.filter((entrant) => entrant.age < 18).length;
  const adult = entrants.filter((entrant) => entrant.age >= 18 && entrant.age < 50).length;
  const senior = entrants.filter((entrant) => entrant.age >= 50).length;
  return { child, adult, senior };
}

console.log(countEntrants());

function calculateEntry(entrants) {
  if (!Array.isArray(entrants)) return 0;
  const personTotal = countEntrants(entrants);
  const precoChild = data.prices.child;
  const precoAdult = data.prices.adult;
  const precoSenior = data.prices.senior;

  const total = (personTotal.child * precoChild)
  + (personTotal.adult * precoAdult) + (personTotal.senior * precoSenior);
  return total;
}
console.log(calculateEntry(visitants));

module.exports = { calculateEntry, countEntrants };
