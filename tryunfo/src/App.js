import React from 'react';
import './components/App.css';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
state = {
  name: '',
  description: '',
  attr1: '0',
  attr2: '0',
  attr3: '0',
  image: '',
  rarity: '',
  hasTrunfo: false,
  trunfo: false,
  isSaveButtonDisabled: true,
  savedCards: [],
};

  onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [target.name]: value,
      },
      () => {
        this.validateForm();
      },
    );
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { name, description, attr1, attr2, attr3, image, rarity, trunfo } = this.state;
    const { savedCards } = this.state;

    const card = {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rarity,
      trunfo,
    };

    this.setState(
      {
        savedCards: [...savedCards, card],
      },
      () => {
        this.setState({
          name: '',
          description: '',
          attr1: '0',
          attr2: '0',
          attr3: '0',
          image: '',
          rarity: '',
          trunfo: false,
          isSaveButtonDisabled: true,
        });

        this.hasTrunfo();
      },
    );
  };

  hasTrunfo = () => {
    const { savedCards } = this.state;
    const hasTrunfo = savedCards.some((card) => card.trunfo);
    this.setState({ hasTrunfo });
  };

  validateForm = () => {
    const { name, description, attr1, attr2, attr3, image, rarity } = this.state;

    const maxAttrSumValue = 210;
    const maxAttrValue = 90;

    const isValid = [
      name.length > 0,
      description.length > 0,
      image.length > 0,
      rarity.length > 0,
      parseInt(attr1, 10) <= maxAttrValue,
      parseInt(attr2, 10) <= maxAttrValue,
      parseInt(attr3, 10) <= maxAttrValue,
      parseInt(attr1, 10) + parseInt(attr2, 10) + parseInt(attr3, 10)
        <= maxAttrSumValue,
      parseInt(attr1, 10) >= 0,
      parseInt(attr2, 10) >= 0,
      parseInt(attr3, 10) >= 0,
    ].every(Boolean);

    this.setState({
      isSaveButtonDisabled: !isValid,
    });
  };

  render() {
    const { name, description, attr1, attr2, attr3, image,
      rarity, trunfo, hasTrunfo, isSaveButtonDisabled, savedCards } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ image }
          cardRare={ rarity }
          cardTrunfo={ trunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />

        <Card
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ image }
          cardRare={ rarity }
          cardTrunfo={ trunfo }
        />

        <div className="saved-cards">
          <h2>Saved cards</h2>
          {savedCards.map((card, index) => (
            <Card
              key={ index }
              cardName={ card.name }
              cardDescription={ card.description }
              cardAttr1={ card.attr1 }
              cardAttr2={ card.attr2 }
              cardAttr3={ card.attr3 }
              cardImage={ card.image }
              cardRare={ card.rarity }
              cardTrunfo={ card.trunfo }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
