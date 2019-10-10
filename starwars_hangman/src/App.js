import React from 'react';

import './css/App.css';
import Header from "./Components/Header"
import LetterButton from './Components/LetterButton';

class App extends React.Component {

  state = {
    availableLetters: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    pickedChosenLetters: '',
    generatedWord: 'Wars',
    usedLetters: ''
  }

  render(){
    return (
      <div className="App">
        <Header/>


        {this.state.availableLetters.map((letter, index) =>{
         return <LetterButton key={index} letter={letter} onClick={this.handleClick}/>
        })}
      </div>
    );
  }

  handleClick = (e) =>{
    const value = e.target.value
    e.target.disabled = true
    console.log(e.target)
    this.setState(prevState => ( {
      usedLetters: prevState.usedLetters + value
    })
  )}
}

export default App;
