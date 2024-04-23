import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./logo.svg";
import { fetchUsers } from "./firebase/firebase.utils";

import Header from "./components/header/header.component";
import LeaderBoard from "./components/leaderboard/leaderboard.component";

import "./App.css";
import { fetchUsersStart } from "./redux/user/user.actions";
import { selectUsers } from "./redux/user/user.selectors";

function App() {
    return (
        <div className="App">
            <Header />
            <LeaderBoard />
        </div>
    );
}

export default App;
