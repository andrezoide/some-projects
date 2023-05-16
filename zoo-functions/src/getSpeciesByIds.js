const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (ids <= 0) {
    const emptyArray = [];
    return emptyArray;
  }

  return data.species.filter((iid) => {
    if (ids.find((id) => id === iid.id)) return iid;
    return '';
  });
}

module.exports = getSpeciesByIds;
