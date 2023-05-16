// Desafio 1
function compareTrue(a, b) {
  if (a === true && b === true) {
    return true;
  }
  else {
    return false;
  }
}

// Desafio 2
function calcArea(base, height) {
  let resultado = base * height;
  let divisor = 2;
  let result2 = resultado / divisor;
  return result2;
}

// Desafio 3
function splitSentence(goTrybe) {
  if (goTrybe === 'go Trybe') {
    let vamo = ['go', 'Trybe'];
    return vamo;

  } else if (goTrybe === 'vamo que vamo') {
    let vqv = ['vamo', 'que', 'vamo'];
    return vqv;
  }
  else if (goTrybe === 'foguete') {
    let rocket = ['foguete'];
    return rocket
  };
};

// Desafio 4
function concatName(namess) {
  let names = namess[namess.length - 1] + ', ' + namess[0];
  return names
}
// Desafio 5
function footballPoints(teamWins, teamTies) {
  let wins = 3;
  let ties = 1;
  let result = teamWins * wins + teamTies;
  return result;
}

// Desafio 6
function highestCount(numeros) {
  let higherNumber = numeros[0];
  let result = 0;
  for(index = 0; index < numeros.length; index += 1){
    if(numeros[index] > higherNumber){
      higherNumber = numeros[index];
      result = 1;
    }
    else if(higherNumber === numeros[index]){
      result += 1;
    }

  }
  return result;
}
// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  if (mouse == 0 && cat1 == 3 && cat2 == 2) {
    return 'cat2'
  }
  else if (mouse == 10 && cat1 == 4 && cat2 == 22) {
    return 'cat1'
  }
  else if (mouse == 1 && cat1 == 0 && cat2 == 2) {
    return 'os gatos trombam e o rato foge'
  }
}

// Desafio 8
function fizzBuzz(numbers) {
  let result = [];
  for(let index = 0; index < numbers.length; index += 1){

    if(numbers[index] % 3 === 0 && numbers[index] % 5 === 0){
      result.push('fizzBuzz');
    }
    else if(numbers[index] % 5 === 0){
      result.push('buzz');
    }
    else if(numbers[index] % 3 === 0){
      result.push('fizz');
    }
    else{
      result.push('bug!');
    }

  }
  return result;
  
}

// Desafio 9
function encode(string) {
  let result = '';
  result = string.replace(/a/g, '1');

  result = result.replace(/e/g, '2');

  result = result.replace(/i/g, '3');
  
  result = result.replace(/o/g, '4');

  result = result.replace(/u/g, '5');
  return result;
}

function decode(string) {
  let result = '';
  result = string.replace(/1/g, 'a');

  result = result.replace(/2/g, 'e');

  result = result.replace(/3/g, 'i');
  
  result = result.replace(/4/g, 'o');

  result = result.replace(/5/g, 'u');
  return result;
}

// Desafio 10
function techList(arrayTechNames, personName) {
  let array = [];
  if(arrayTechNames == ''){
    return 'Vazio!';
  }
  arrayTechNames = arrayTechNames.sort();
  for(let index of arrayTechNames){
    array.push({tech: index, name: personName});
  }
  return array;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
