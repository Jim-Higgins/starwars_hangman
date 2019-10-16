import React from "react";
import ReusableButton from "./ReusableButton";

const Letters = ({ availableLetters, handleClick }) => {
	return availableLetters.map((object, index) => {
		return (
			<ReusableButton
				key={index}
				text={object.letter}
				disabled={object.disabled}
				onClick={handleClick}
				className="letter-button"
			/>
		);
	});
};

export default Letters;
