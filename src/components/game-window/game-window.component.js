import CustomButton from "../custom-button/custom-button.component"
import { GameWindowContainer } from "./game-window.styles";

const GameWindow = () => {
	const startGame = async () => {
		const response = await fetch('/run', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log(data)
		if (response.ok){
			console.log("it worked")}
	};

	return (
		<GameWindowContainer>
			<CustomButton onClick={startGame}> Start game</CustomButton>
		</GameWindowContainer>
	)
}

export default GameWindow
