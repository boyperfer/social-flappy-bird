import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./logo.svg";
import { fetchUsers } from "./firebase/firebase.utils";

import Header from "./components/header/header.component";
import LeaderBoard from "./components/leaderboard/leaderboard.component";
import MyGift from "./assets/flappy-birds-gif.gif";
import {AppContainer} from "./App.styles"

import "./App.css";
import { fetchUsersStart } from "./redux/user/user.actions";
import { selectUsers } from "./redux/user/user.selectors";

function App() {
    return (
        <div className="App">
            <Header />
            <LeaderBoard />
            <AppContainer>
                <h2>Are you ready for the Game Challenge? Let's begin!</h2>
                <img src={MyGift} />
            </AppContainer>
        </div>
    );
}

export default App;
