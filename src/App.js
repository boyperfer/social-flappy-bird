import { useState, useEffect } from "react";
import logo from "./logo.svg";
import Header from "./components/header/header.component";
import GameWindow from "./components/game-window/game-window.component";
import "./App.css";

function App() {
  const startGame = async () => {
    const response = await fetch("/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log("it worked");
    }
  };

  return (
    <div className="App">
      <Header />
      <GameWindow />
    </div>
  );
}

export default App;
