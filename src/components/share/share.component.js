import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../header/header.component";
import { selectUsersHash } from "../../redux/user/user.selectors";

import {
    TextContainer,
    ShareContainer,
    ChallengeContainer,
} from "./share.styles";
import MyGift from "../../assets/flappy-birds-gif.gif";

const ShareScore = ({ keyId }) => {
    const usersHash = useSelector(selectUsersHash);

    const { displayName, score } = usersHash[keyId];

    console.log(displayName, score);
    return (
        <ShareContainer>
            <Header />
            <TextContainer>
                {displayName} has scored {score}
            </TextContainer>
            <ChallengeContainer>
                <h2>Are you ready for the Game Challenge? Let's begin!</h2>
                <img src={MyGift} />
            </ChallengeContainer>
        </ShareContainer>
    );
};

export default ShareScore;
