import { useState, useEffect } from "react";
import logo from "./logo.svg";
import Header from "./components/header/header.component";
import GameWindow from "./components/game-window/game-window.component";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <GameWindow />
    </div>
  );
}

export default App;
