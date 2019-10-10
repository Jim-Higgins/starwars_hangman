import React from 'react';

import './css/App.css';
import Header from "./Components/Header"
import LetterButton from './Components/LetterButton';

class App extends React.Component {

  state = {
    availableLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    pickedChosenLetters: '',
    generatedWord: 'WARS',
    usedLetters: ''
  }

  render(){
    const linestuff = /[A-Z]/g
    return (
      <div className="App">
        <Header/>
      <div>
        <p>{this.state.generatedWord.split('').map(letter => {
          return letter.replace(linestuff,' _ ')
        })  }</p>
      </div>

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
