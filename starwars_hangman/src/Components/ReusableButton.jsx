import React from "react";

const ReusableButton = ({ text, onClick, disabled, className }) => {
	return (
		<button
			onClick={onClick}
			value={text}
			disabled={disabled}
			className={className}
		>
			{text}
		</button>
	);
};

export default ReusableButton;
