import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';
import { getQuestion } from '../API';
import { attRanking } from '../redux/actions';
import '../App.css';
import Header from './Header';

const TIMEOUT = 1000;
class Game extends React.Component {
  state = {
    // nome: '',
    // gravatarEmail: '',
    score: 0,
    // url: '',
    results: [],
    questionIndex: 0,
    orderOfQuestions: 0,
    active: false,
    timer: 30,
    interval: '',
    assertions: 0,
    disableAllAnswers: false,
  };

  async componentDidMount() {
    const { history, player } = this.props;
    const { assertions } = player;
    const { score } = player;
    // const hash = md5(gravatarEmail).toString();
    // const url = `https://www.gravatar.com/avatar/${hash}`;
    const token = localStorage.getItem('token');
    const { response_code: response, results } = await getQuestion(token);
    if (response !== 0) history.push('/');

    const subQuestionsNumber = 0.5;
    const orderOfQuestions = Math.random() - subQuestionsNumber;

    const interval = setInterval(this.timer, TIMEOUT);
    this.setState({
      results,
      // nome,
      // url,
      orderOfQuestions,
      score,
      assertions,
      interval,
    });
  }

  timer = () => {
    let { timer } = this.state;
    if (timer > 0) {
      timer -= 1;
      this.setState({ timer });
      return timer;
    }
  };

  toggleClass = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  hendleQuestion = () => {
    const {
      results,
      questionIndex,
      orderOfQuestions,
      timer,
      active,
      disableAllAnswers,
    } = this.state;

    const {
      category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      question,
      difficulty,
    } = results[questionIndex];

    const answers = [...incorrectAnswers, correctAnswer];
    answers.sort(() => orderOfQuestions);

    const handleTimer = () => {
      if (timer === 0 || disableAllAnswers === true) return true;
    };

    // const handleTimer = () => timer === 0;

    const decodeChar = (inputStr) => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = inputStr;
      return textarea.value;
    };

    return (
      <main>

        <div>
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ decodeChar(question) }</p>
        </div>

        <div data-testid="answer-options">
          { answers.map((answer, index) => ((answer === correctAnswer) ? (
            <button
              className={ active ? 'correct-btn' : 'button' }
              type="button"
              key={ index }
              data-testid="correct-answer"
              disabled={ handleTimer() }
              onClick={ () => { this.toggleClass(); this.attScore(true, difficulty); } }
            >
              { answer }
            </button>
          ) : (
            <button
              className={ active ? 'wrong-btn' : 'button' }
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              disabled={ handleTimer() }
              onClick={ () => { this.toggleClass(); this.attScore(false, difficulty); } }
            >
              { answer }
            </button>
          )
          ))}
        </div>

      </main>
    );
  };

  attScore = (acertouOuErrou, difficulty) => {
    this.setState({ disableAllAnswers: true }, () => {
      const { player, dispatch } = this.props;
      const { timer, interval } = this.state;
      let { assertions } = this.state;
      let { score } = player;
      const hard = 3;
      const medium = 2;
      const easy = 1;
      const baseScore = 10;
      let scoreDif;

      switch (difficulty) {
      case 'hard':
        scoreDif = hard;
        break;
      case 'medium':
        scoreDif = medium;
        break;
      case 'easy':
        scoreDif = easy;
        break;
      default:
        scoreDif = undefined;
        break;
      }

      if (acertouOuErrou) {
        const scoreTemp = baseScore + (timer * scoreDif);
        score += scoreTemp;
        assertions += 1;
      }
      dispatch(attRanking({ score, assertions }));

      this.setState({
        score,
        assertions,
        interval: clearInterval(interval),
        disableAllAnswers: true,
      });
    });
  };

  handleNext = () => {
    const { questionIndex } = this.state;
    const aux = setInterval(this.timer, TIMEOUT);

    this.setState({
      questionIndex: questionIndex + 1,
      disableAllAnswers: false,
      timer: 30,
      interval: aux,
      active: false,
    });
    const finalQuestionIndex = 4;
    if (questionIndex === finalQuestionIndex) {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  render() {
    const { results, score, timer, disableAllAnswers } = this.state;

    return (
      <div>
        <header>
          <Header />
          <h4 data-testid="header-score">{ `Score: ${score}` }</h4>
        </header>
        <h4>{`Timer: ${timer}`}</h4>
        <div>
          {
            results.length > 0 ? (
              this.hendleQuestion()
            ) : <h1>Loading...</h1>
          }
          {
            disableAllAnswers === true && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ () => this.handleNext() }
              >
                Next
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { player } = state;
  return { player };
};

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  dispatch: propTypes.func.isRequired,
  player: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.object,
  ]).isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
