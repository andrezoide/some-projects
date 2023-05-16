// Desafio 11
function generatePhoneNumber(numbers) {
  // seu código aqui
  let mensagem = "não é possível gerar um número de telefone com esses valores";
  let contato = `(${numbers.slice(0,2).join('')}) ${numbers.slice(2,7).join('')}-${numbers.slice(7,11).join('')}`;
  if(numbers.length != 11) {
    return "Array com tamanho incorreto.";
  } else {
    for(let index = 0; index < numbers.length; index += 1) {
      let count = 0;
      if(numbers[index] < 0) {
        return mensagem;
      } else if(numbers[index] > 9) {
        return mensagem;
      } else if(numbers[index] != index)  {
        count += 1;
      } else  if(count >= 3) {
        return mensagem;
      }
    }
  }
  return contato;
}
console.log(generatePhoneNumber([5, 2, 8, 1, 5, 3, 7, 2, 8, 9, 0]));



// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  // seu código aqui
  return lineA < lineB + lineC && lineA > Math.abs(lineB - lineC);
  }


// Desafio 13
function hydrate(string) {
  // seu código aqui
  return string.split(' ').map(Number).filter(Number).reduce((acc, curr) => acc + curr , 0) === 1 ? `1 copo de água` : `${string.split(' ').map(Number).filter(Number).reduce((acc, curr) =>  acc + curr, 0)} copos de água`;
  }


module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};