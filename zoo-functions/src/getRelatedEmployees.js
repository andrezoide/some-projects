const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function isManager(id) {
  // seu código aqui
  const checkManager = data.employees.some((el) => el.managers.includes(id));
  return checkManager;
}

function getRelatedEmployees(managerId) {
  // seu código aqui
  if (isManager(managerId) === true) {
    const result = [];
    const check = employees.filter((el) => el.managers.includes(managerId));
    check.forEach((el) => result.push(`${el.firstName} ${el.lastName}`));
    return result;
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };
