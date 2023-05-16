import { ATT_RANKING, DATA_USER } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  nome: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DATA_USER:
    return {
      ...state,
      nome: action.nome,
      gravatarEmail: action.gravatarEmail,
    };

  case ATT_RANKING:
    return {
      ...state,
      assertions: action.assertions,
      score: action.score,
    };

  default:
    return state;
  }
};

export default player;
