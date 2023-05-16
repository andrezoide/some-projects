const data = require('../data/zoo_data');

function getEmployeeByName(obj) {
  return data.employees.find((func) => func.firstName === obj.name
  || func.lastName === obj.name);
}
function testId(obj) {
  return data.employees.some((func) => func.id === obj.id);
}

function getEmployeeById(obj) {
  if (testId(obj)) {
    return data.employees.find((func) => func.id === obj.id);
  }
  throw new Error('Informações inválidas');
}

function locationNameId(arrayIds) {
  const arraySpecies = [];
  const arrayNames = [];
  const arrayLocation = [];
  for (let index = 0; index < arrayIds.length; index += 1) {
    arraySpecies.push(data.species.filter((specie) => specie.id === arrayIds[index])[0]);
    arrayNames.push(arraySpecies[index].name);
    arrayLocation.push(arraySpecies[index].location);
  }
  const locationSpecies = {
    name: arrayNames,
    location: arrayLocation,
  };
  return locationSpecies;
}

function generateObjEmployee(obj) {
  const employee = {
    id: obj.id,
    fullName: `${obj.firstName} ${obj.lastName}`,
    species: locationNameId(obj.responsibleFor).name,
    locations: locationNameId(obj.responsibleFor).location,
  };
  return employee;
}

function allEmployees() {
  const arrayEmployees = [];
  const lengthh = data.employees.length;
  for (let index = 0; index < lengthh; index += 1) {
    arrayEmployees.push(generateObjEmployee(data.employees[index]));
  }
  return arrayEmployees;
}

function getEmployeesCoverage(obj) {
  if (typeof obj === 'undefined') {
    return allEmployees();
  }
  if (Object.keys(obj).includes('name')) {
    return generateObjEmployee(getEmployeeByName(obj));
  }
  if (Object.keys(obj).includes('id')) {
    return generateObjEmployee(getEmployeeById(obj));
  }
}
console.log(getEmployeesCoverage());

module.exports = getEmployeesCoverage;
