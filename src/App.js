import Header from "./components/header/header.component";
import { styled } from "styled-components";
import "./App.css"; // Import CSS file for styling

// Styled components with blinking animation
const GradientHeader = styled.h1`
  text-align: center;
  font-size: 2.5em;
  margin: 0;
  padding: 15px 0;
  background: linear-gradient(to right, #1e2c4d 0%, #0e1a2a 50%, #050c17 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Transparent text for gradient effect */
`;

const GradientSubheading = styled.h2`
  text-align: center;
  font-size: 2em;
  margin: 15px 0;
  background: linear-gradient(to right, #8b0000 0%, #5a0000 50%, #2e0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StartGameButton = styled.button`
  display: block;
  margin: 20px auto; /* Center the button horizontally */
  padding: 10px 20px;
  font-size: 1.5em;
  background-color: #008000; /* Green color for button */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: 500px;
  height: 500px;
  margin: auto; /* Center horizontally */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  box-shadow: 0 0 0 10px inset #ff0000, /* First gradient color for inner shadow */
              0 0 0 15px inset #00ff00; /* Second gradient color for outer shadow */
`;

function App() {
  return (
    <div className="App">
      {/* Gradient header component */}
      <GradientHeader>Social Play!: A Workout Challenge</GradientHeader>
      <Header /> {/* Existing Header component */}
      <ImageBox>
      {/* Image box */}
      <img src="https://engineering.utdallas.edu/files/2023/06/facilities-MaterialScienceandEngineering.jpg" alt="UTD ECS" />
      </ImageBox>
        <div>
          {/* Gradient subheading for h2 */}
          <GradientSubheading>Are you ready for the Game Challenge? Let's begin!</GradientSubheading>
          {/* Start Game button */}
          <StartGameButton>Start Game</StartGameButton>
        </div>
    </div>
  );
}

export default App;
