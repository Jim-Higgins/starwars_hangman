import React from "react";

import getFilms from "./Api";

import "./css/App.css";
import Header from "./Components/Header";
import LetterButton from "./Components/LetterButton";

class App extends React.Component {
	state = {
		availableLetters: [
			"A",
			"B",
			"C",
			"D",
			"E",
			"F",
			"G",
			"H",
			"I",
			"J",
			"K",
			"L",
			"M",
			"N",
			"O",
			"P",
			"Q",
			"R",
			"S",
			"T",
			"U",
			"V",
			"W",
			"X",
			"Y",
			"Z"
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
				{this.state.availableLetters.map((letter, index) => {
					return (
						<LetterButton
							key={index}
							letter={letter}
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
		e.target.disabled = true;

		if (!this.state.generatedWord.includes(value)) {
			this.setState(prevState => ({
				badLetters: prevState.badLetters + value,
				numOfLives: prevState.numOfLives - 1
			}));
		} else {
			this.setState(prevState => ({
				usedLetters: prevState.usedLetters + value
			}));
		}
	};

	chooseRandomFilm = () => {
		const allFilms = this.state.data.map(obj => obj.title.toUpperCase());
		const randomFilm = allFilms[Math.floor(Math.random() * allFilms.length)];
		this.setState(() => ({
			generatedWord: randomFilm,
			usedLetters: "",
			badLetters: ""
		}));
	};
}

export default App;
