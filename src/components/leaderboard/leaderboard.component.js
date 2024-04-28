import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersStart } from "../../redux/user/user.actions";
import {
    LeaderBoardContainer,
	DisplayNameContainer,
	ScoreContainer,
	RankContainer,
    NumberContainer,
    UsersContainer,
	TierContainer,
	NameContainer,
	TitleContainer,
	ScoreNumberContainer,
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
                <RankContainer> # </RankContainer>
                <DisplayNameContainer> User Name </DisplayNameContainer>
				<TierContainer>Tier </TierContainer>
                <ScoreContainer> Score </ScoreContainer>
            </UsersContainer>
            {users ? (
                users.map(({ displayName, score }, i) => (
                    <UsersContainer num={i}>
                        <NumberContainer>{i + 1}</NumberContainer>
                        <NameContainer>{displayName}</NameContainer>
						<TitleContainer>Challenger</TitleContainer>
                        <ScoreNumberContainer>{Math.max(...score)}</ScoreNumberContainer>
                    </UsersContainer>
                ))
            ) : (
                <div />
            )}
        </LeaderBoardContainer>
    );
};

export default LeaderBoard;
