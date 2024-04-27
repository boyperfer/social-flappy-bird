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
	ExperienceContainer,
	ExperienceNumberContainer,
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
                <ScoreContainer> Score </ScoreContainer>
                <ScoreContainer> Gender </ScoreContainer>
                <ScoreContainer> Age </ScoreContainer>
                <ScoreContainer> Height </ScoreContainer>
                <ScoreContainer> Weight </ScoreContainer>
                <ExperienceContainer> Experience </ExperienceContainer>
            </UsersContainer>
            {users ? (
                users.map(({ displayName, score, age, gender, height, weight, experience }, i) => (
                    <UsersContainer num={i}>
                        <NumberContainer>{i + 1}</NumberContainer>
                        <NameContainer>{displayName}</NameContainer>
                        <ScoreNumberContainer>{Math.max(...score)}</ScoreNumberContainer>
						<TitleContainer>{gender}</TitleContainer>
						<TitleContainer>{age}</TitleContainer>
						<TitleContainer>{height}</TitleContainer>
						<TitleContainer>{weight}</TitleContainer>
						<ExperienceNumberContainer>{experience}</ExperienceNumberContainer>
                    </UsersContainer>
                ))
            ) : (
                <div />
            )}
        </LeaderBoardContainer>
    );
};

export default LeaderBoard;
