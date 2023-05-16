import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  state = {
    nome: '',
    // gravatarEmail: '',
    // score: 0,
    url: '',
    // assertions: 0,
    // score: 0,
  };

  async componentDidMount() {
    const { player } = this.props;
    const { nome, gravatarEmail } = player;
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;

    this.setState({ nome, url });
  }

  render() {
    const { nome, url } = this.state;
    const { player } = this.props;
    const { score } = player;

    return (
      <header>
        <img src={ url } alt="Usuario" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{ nome }</h3>
        <h4 data-testid="header-score">
          {score}
        </h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const { player } = state;
  return { player };
};

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  player: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.object,
  ]).isRequired,
};
