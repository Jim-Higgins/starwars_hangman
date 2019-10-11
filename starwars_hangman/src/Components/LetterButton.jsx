import React from "react";

const LetterButton = ({ letter, onClick }) => {
	return (
		<button onClick={onClick} value={letter} disabled={false}>
			{letter}
		</button>
	);
};

export default LetterButton;
