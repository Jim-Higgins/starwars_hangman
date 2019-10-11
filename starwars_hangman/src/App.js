import React from "react";

import getFilms from "./Api";

import "./css/App.css";
import Header from "./Components/Header";
import LetterButton from "./Components/LetterButton";

class App extends React.Component {
	state = {
		availableLetters: [
			{ letter: "A", disabled: false },
			{ letter: "B", disabled: false },
			{ letter: "C", disabled: false },
			{ letter: "D", disabled: false },
			{ letter: "E", disabled: false },
			{ letter: "F", disabled: false },
			{ letter: "G", disabled: false },
			{ letter: "H", disabled: false },
			{ letter: "I", disabled: false },
			{ letter: "J", disabled: false },
			{ letter: "K", disabled: false },
			{ letter: "L", disabled: false },
			{ letter: "M", disabled: false },
			{ letter: "N", disabled: false },
			{ letter: "O", disabled: false },
			{ letter: "P", disabled: false },
			{ letter: "Q", disabled: false },
			{ letter: "R", disabled: false },
			{ letter: "S", disabled: false },
			{ letter: "T", disabled: false },
			{ letter: "U", disabled: false },
			{ letter: "V", disabled: false },
			{ letter: "W", disabled: false },
			{ letter: "X", disabled: false },
			{ letter: "Y", disabled: false },
			{ letter: "Z", disabled: false }
		],
		generatedWord: "STAR WARS",
		data: [],
		usedLetters: "",
		badLetters: "",
		numOfLives: 4
	};

	componentDidMount() {
		getFilms().then(results => this.setState({ data: results }));
	}

	render() {
		const hiddenWord = this.state.generatedWord
			.split(" ")
			.map(word => {
				return word.replace(
					new RegExp("[^" + this.state.usedLetters + "]", "g"),
					" _ "
				);
			})
			.join(" ");

		return (
			<div className="App">
				<Header />
				<p>{hiddenWord}</p>
				{this.state.availableLetters.map((object, index) => {
					return (
						<LetterButton
							key={index}
							letter={object.letter}
							disabled={object.disabled}
							onClick={this.handleClick}
						/>
					);
				})}
				<p>Lives: {this.state.numOfLives}</p>
				{hiddenWord === this.state.generatedWord && <p>You Win</p>}
				{this.state.numOfLives === 0 && <p>Looossseerrr</p>}
				<button onClick={() => this.chooseRandomFilm()}>Start Game</button>
			</div>
		);
	}

	handleClick = e => {
		const value = e.target.value;
		const allLetters = [...this.state.availableLetters];
		const letter = allLetters.findIndex(obj => obj.letter === value);
		allLetters[letter].disabled = true;
		if (this.state.numOfLives === 1) {
			this.endGame();
		}
		if (!this.state.generatedWord.includes(value)) {
			this.setState(prevState => ({
				badLetters: prevState.badLetters + value,
				numOfLives: prevState.numOfLives - 1,
				availableLetters: allLetters
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
			usedLetters: "",
			badLetters: "",
			availableLetters: setLetterToFalse
		}));
	};
	endGame = () => {
		const setLetterToTrue = [...this.state.availableLetters];
		setLetterToTrue.forEach(obj => (obj.disabled = true));
		if (this.state.numOfLives === 0) {
			this.setState({ availableLetters: setLetterToTrue });
		}
	};
}

export default App;
