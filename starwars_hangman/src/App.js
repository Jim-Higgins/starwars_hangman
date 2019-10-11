import React from 'react';

import getFilms from './Api';

import './css/App.css';
import Darth from './images/darth.jpg'
import Header from './Components/Header';
import ReusableButton from './Components/ReusableButton';
import Text from './Components/Text';

class App extends React.Component {
  state = {
    availableLetters: [
      { letter: 'A', disabled: false },
      { letter: 'B', disabled: false },
      { letter: 'C', disabled: false },
      { letter: 'D', disabled: false },
      { letter: 'E', disabled: false },
      { letter: 'F', disabled: false },
      { letter: 'G', disabled: false },
      { letter: 'H', disabled: false },
      { letter: 'I', disabled: false },
      { letter: 'J', disabled: false },
      { letter: 'K', disabled: false },
      { letter: 'L', disabled: false },
      { letter: 'M', disabled: false },
      { letter: 'N', disabled: false },
      { letter: 'O', disabled: false },
      { letter: 'P', disabled: false },
      { letter: 'Q', disabled: false },
      { letter: 'R', disabled: false },
      { letter: 'S', disabled: false },
      { letter: 'T', disabled: false },
      { letter: 'U', disabled: false },
      { letter: 'V', disabled: false },
      { letter: 'W', disabled: false },
      { letter: 'X', disabled: false },
      { letter: 'Y', disabled: false },
      { letter: 'Z', disabled: false }
    ],
    generatedWord: 'STAR WARS',
    data: [],
    usedLetters: '',
    badLetters: '',
    numOfLives: 5,
    // imageClass: ['first', 'second', 'third', 'fourth', 'fifth'],
    currentImage: 'first'
  };

  componentDidMount() {
    getFilms().then(results => this.setState({ data: results }));
  }

  render() {
    const hiddenWord = this.state.generatedWord
      .split(' ')
      .map(word => {
        return word.replace(
          new RegExp('[^' + this.state.usedLetters + ']', 'g'),
          ' _ '
        );
      })
      .join(' ');

    return (
      <div className="App">
        <Header />
        {(this.state.numOfLives === 0 && <p>{this.state.generatedWord}</p>) || (
          <p>{hiddenWord}</p>
        )}
        {this.state.availableLetters.map((object, index) => {
          return (
            <ReusableButton
              key={index}
              text={object.letter}
              disabled={object.disabled}
              onClick={this.handleClick}
              className="letter-button"
            />
          );
        })}
        <br></br>
        <img className={this.state.currentImage} src={Darth} alt="Darthvader"></img>
        <p>Lives: {this.state.numOfLives}</p>
        {hiddenWord === this.state.generatedWord && (
          <Text text="The Force will be with you. Always." />
        )}
        {this.state.numOfLives === 0 && (
          <Text text="I find your lack of faith disturbing!" />
        )}
        <ReusableButton
          text={'May The Force Be With You'}
          onClick={() => this.chooseRandomFilm()}
        />
      </div>
    );
  }

  handleClick = e => {
    const value = e.target.value;
    const allLetters = [...this.state.availableLetters];
    const letter = allLetters.findIndex(obj => obj.letter === value);
    allLetters[letter].disabled = true;
    if (this.state.numOfLives === 0) {
      this.endGame();
    }
    if (!this.state.generatedWord.includes(value)) {
      this.setState(prevState => ({
        badLetters: prevState.badLetters + value,
        numOfLives: prevState.numOfLives - 1,
        availableLetters: allLetters,
      }));
    } else {
      this.setState(prevState => ({
        usedLetters: prevState.usedLetters + value,
        availableLetters: allLetters
      }));
    }
  };

  chooseRandomFilm = () => {
    const allFilms = this.state.data.map(obj => obj.title.toUpperCase());
    const randomFilm = allFilms[Math.floor(Math.random() * allFilms.length)];
    const setLetterToFalse = [...this.state.availableLetters];
    setLetterToFalse.forEach(obj => (obj.disabled = false));
    this.setState(() => ({
      generatedWord: randomFilm,
      usedLetters: '',
      badLetters: '',
      availableLetters: setLetterToFalse,
      numOfLives: 5
    }));
  };
  endGame = () => {
    const setLetterToTrue = [...this.state.availableLetters];
    setLetterToTrue.forEach(obj => (obj.disabled = true));
    if (this.state.numOfLives === 0) {
      this.setState({
        availableLetters: setLetterToTrue
      });
    }
  };

  // imageStuff = () => {
  //   const imageSize = this.state.imageClass
  // }
}

export default App;
