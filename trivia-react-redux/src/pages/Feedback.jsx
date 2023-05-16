import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';

class Feedback extends React.Component {
  state = {
    message: '',
  };

  componentDidMount() {
    const { player } = this.props;
    const { assertions } = player;
    const minScore = 3;
    if (assertions < minScore) return this.setState({ message: 'Could be better...' });
    if (assertions >= minScore) return this.setState({ message: 'Well Done!' });
  }

  onClickLogin = () => {
    const { history } = this.props;
    history.push('./');
  };

  onClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { message } = this.state;
    const { player } = this.props;
    const { assertions, score } = player;
    return (
      <div>
        <header>
          <Header />
        </header>
        <h1>Página de feedback</h1>
        <p data-testid="feedback-total-score">{ score }</p>
        <h2 data-testid="feedback-total-question">{ assertions }</h2>
        <p data-testid="feedback-text">{ message }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.onClickLogin }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.onClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { player } = state;
  return { player };
};

Feedback.propTypes = {
  player: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.object,
  ]).isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
