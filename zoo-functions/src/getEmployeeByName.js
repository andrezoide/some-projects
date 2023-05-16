const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  // seu código aqui
  const namme = employeeName;
  if (namme === undefined) {
    return {};
  }
  return data.employees.find((person) => person.firstName === namme || person.lastName === namme);
}

module.exports = getEmployeeByName;
