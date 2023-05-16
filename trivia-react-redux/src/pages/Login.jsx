import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import '../CssGeral.css';
import { getToken } from '../API';
import { dataUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    inputName: '',
    inputEmail: '',
    isBtnDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.handleValidationButton());
  };

  handleValidationButton = () => {
    const { inputName, inputEmail } = this.state;
    const minLength = 1;
    const validateLogin = inputName.length && inputEmail.length > minLength;
    this.setState({ isBtnDisabled: !validateLogin });
  };

  sendToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handlePlay = async () => {
    const { dispatch, history } = this.props;
    const token = await getToken();
    localStorage.setItem('token', token);
    // console.log(this.props);
    dispatch(dataUser(this.state));
    history.push('/game');
  };

  render() {
    const { inputName, inputEmail, isBtnDisabled } = this.state;
    // console.log(this.props);

    return (
      <div className="container-login">
        <input
          type="text"
          name="inputName"
          value={ inputName }
          data-testid="input-player-name"
          onChange={ this.handleChange }
          className="input-login"
          placeholder="Digite seu nome"
        />
        <input
          type="email"
          name="inputEmail"
          value={ inputEmail }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          className="input-login"
          placeholder="Digite seu e-mail"
        />
        <div className="btns-login">
          <button
            type="button"
            name="isBtnDisabled"
            disabled={ isBtnDisabled }
            onClick={ this.handlePlay }
            data-testid="btn-play"
            className="btn-login btn-play"
          >
            Play
          </button>
          <button
            type="button"
            name="btnSettings"
            data-testid="btn-settings"
            onClick={ this.sendToSettings }
            className="btn-login"
          >
            Configurações
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
