//adicionado titulo
let body = document.querySelector('body');
let secTitle = document.createElement('section');
secTitle.setAttribute('id', 'secTitle');
body.appendChild(secTitle);
let title = document.createElement('h1');
title.setAttribute('id', 'title')
title.innerText = 'Paleta de Cores';
secTitle.appendChild(title)



//div boxColors color-pallete
let boxColors = document.createElement('div');
boxColors.setAttribute('id', 'color-palette')
secTitle.appendChild(boxColors);


//cores
let color1 = document.createElement('li');
color1.setAttribute('class', 'color selected');
color1.style.backgroundColor = 'black';
color1.style.color = 'black'
boxColors.appendChild(color1);


let color2 = document.createElement('li');
color2.setAttribute('class', 'color');
color2.style.backgroundColor = 'rgb(142, 212, 188)';
color2.style.color = 'rgb(142, 212, 188)'
boxColors.appendChild(color2);


let color3 = document.createElement('li');
color3.setAttribute('class', 'color');
color3.style.backgroundColor = 'rgb(37, 121, 187)';
color3.style.color = 'rgb(37, 121, 187)'
boxColors.appendChild(color3);


let color4 = document.createElement('li');
color4.setAttribute('class', 'color');
color4.style.backgroundColor = 'rgb(77, 59, 140)';
color4.style.color = 'rgb(77, 59, 140)'
boxColors.appendChild(color4);



//faz borda para as cores
let fourColors = document.querySelectorAll('.color');
for(i = 0; i < fourColors.length; i += 1){
    let colors = fourColors[i];
    colors.style.border = '1px solid black';
}


//seção pixels board
const quadroPixels = document.createElement('div');
quadroPixels.setAttribute('id', 'pixel-board');
body.appendChild(quadroPixels);

for (let linha = 0; linha < 5; linha += 1) {
  const line = document.createElement('div');
  line.setAttribute('class', 'line')
  for (let col = 0; col < 5; col += 1) {
  const elementoDiv = document.createElement('div');
  elementoDiv.className = 'pixel';
  elementoDiv.style.width = '40px';
  elementoDiv.style.height = '40px';
  elementoDiv.style.border = '1px solid black';
  elementoDiv.style.backgroundColor = 'white';
  quadroPixels.appendChild(line);
  line.appendChild(elementoDiv);
  }

}



//seletor de cor
let paletteChild = document.getElementById('color-palette').children;

function recolocaClassSelected(event){
  let colorSelected = document.querySelector('.selected');
  colorSelected.classList.remove('selected');
  event.target.classList.add('selected');
  
}
for(let i = 0; i < paletteChild.length; i += 1){
  paletteChild[i].addEventListener('click', recolocaClassSelected);
}

//mudar cor dos pixels
const pixelBoard = document.querySelectorAll('.pixel');

function paintPixels(event){
for(let i = 0; i < pixelBoard.length; i += 1){
  let selectdd = document.querySelector('.selected');
  event.target.style.backgroundColor = selectdd.style.backgroundColor;
}
}

for(let i = 0; i < pixelBoard.length; i += 1){
  pixelBoard[i].addEventListener('click', paintPixels);
}


//criando botao para limpar tudo
let clearBotton = document.createElement('button');
clearBotton.setAttribute('id', 'clear-board');
clearBotton.innerText = 'Limpar'
secTitle.appendChild(clearBotton);

clearBotton.addEventListener('click', limpaTudo);
function limpaTudo(event){
  for(let i = 0; i < pixelBoard.length; i += 1){
    pixelBoard[i].style.backgroundColor = 'white';
  }
}

//criando input para aumentar quadrados

let divBoardSize = document.createElement('div');
divBoardSize.setAttribute('id', 'div-board-size')
secTitle.appendChild(divBoardSize);

let input = document.createElement('input');
input.setAttribute('id', 'board-size');
input.type = 'number';
input.style.maxHeight = 50;
input.value > 0;

divBoardSize.appendChild(input);

let buttonVqv = document.createElement('button');
buttonVqv.setAttribute('id', 'generate-board');
buttonVqv.innerText = 'VQV';
divBoardSize.appendChild(buttonVqv);

buttonVqv.addEventListener('click', error);
function error(){
  if(input.value === ''){
  window.alert('Board inválido!');
  }
}

buttonVqv.addEventListener('click', function(){
let number = parseInt(input.value);
if(parseInt(input.value) !== 0){
  quadroPixels.style.width = (number * 40) + (number * 2) + 'px';
  for(let i = 0; i < number; i += 1){
    for(let i2 = 0; i2 < number; i2 += 1){
      const elementoDiv = document.createElement('div');
      elementoDiv.className = 'pixel';
      elementoDiv.style.backgroundColor = 'white';
      elementoDiv.style.width = '40px';
      elementoDiv.style.height = '40px';
      elementoDiv.style.border = 'black solid 1px';
      quadroPixels.appendChild(elementoDiv);
    }
  }
}
})