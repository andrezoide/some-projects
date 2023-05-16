const password = document.querySelector('#password');
const login = document.querySelector('#email');
const button = document.querySelector('#button');

const emailTrybe = 'tryber@teste.com';
const passwordTrybe = '123456';

function avisoErroSenha() {
  if (password.value === passwordTrybe && login.value === emailTrybe) {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
button.addEventListener('click', avisoErroSenha);

const rateForm = document.querySelector('.rate-form');

for (let index = 1; index <= 10; index += 1) {
  const labelRadio = document.createElement('label');
  const radioRate = document.createElement('input');

  radioRate.type = 'radio';
  radioRate.value = index;
  radioRate.name = 'rate';
  labelRadio.innerText = index;

  rateForm.appendChild(labelRadio);
  labelRadio.appendChild(radioRate);
}

const agreement = document.querySelector('#agreement');
agreement.addEventListener('click', () => {
  const submitBtn = document.querySelector('#submit-btn');
  if (agreement.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

console.log(agreement);


function hideContent() {
  window.onload = () => 
  
}