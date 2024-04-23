import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersStart } from "../../redux/user/user.actions";
import {
    LeaderBoardContainer,
    TextContainer,
    UsersContainer,
} from "./leaderboard.styles";
import { selectUsers } from "../../redux/user/user.selectors";

const LeaderBoard = () => {
    const users = useSelector(selectUsers);
    console.log(users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsersStart());
    }, [dispatch]);
    const num = 1;

    return (
        <LeaderBoardContainer>
            <UsersContainer num={num}>
                <TextContainer> Rank </TextContainer>
                <TextContainer> User Name </TextContainer>
                <TextContainer> Score </TextContainer>
            </UsersContainer>
            {users ? (
                users.map(({ displayName, score }, i) => (
                    <UsersContainer num={i}>
                        <TextContainer>{i + 1}</TextContainer>
                        <TextContainer>{displayName}</TextContainer>
                        <TextContainer>{score}</TextContainer>
                    </UsersContainer>
                ))
            ) : (
                <div />
            )}
        </LeaderBoardContainer>
    );
};

export default LeaderBoard;
