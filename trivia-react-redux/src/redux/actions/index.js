// import md5 from 'crypto-js/md5';

export const DATA_USER = 'DATA_USER';
export const dataUser = (state) => ({
  type: DATA_USER,
  nome: state.inputName,
  gravatarEmail: state.inputEmail,
});

export const ATT_RANKING = 'ATT_RANKING';
export const attRanking = (state) => ({
  type: ATT_RANKING,
  assertions: state.assertions,
  score: state.score,
});
