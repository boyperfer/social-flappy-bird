import { useSelector } from "react-redux";
import { FacebookShareButton, FacebookIcon } from "react-share";
import Header from "../../components/header/header.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
    ProfileContainer,
    ProfileHeader,
    ProfileContent,
    UserDetail,
    TextContainer,
} from "./users.styles";

const Users = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { displayName, gender, age, height, weight, experience, id, score, email } = currentUser;
    const url = `https://gamedemo123.netlify.app/share/${id}`;
    console.log(url);
    return currentUser ? (
        <ProfileContainer>
            <Header />
            <ProfileContent>
                <UserDetail>
                    <TextContainer>
                        <strong>Name:</strong> {displayName}
                    </TextContainer>
                    <TextContainer>
                        <strong>Email:</strong> {email}
                    </TextContainer>
                    <TextContainer>
                        <strong>Gender:</strong> {gender}
                    </TextContainer>
                    <TextContainer>
                        <strong>Age:</strong> {age}
                    </TextContainer>
                    <TextContainer>
                        <strong>Height:</strong> {height}
                    </TextContainer>
                    <TextContainer>
                        <strong>Weight:</strong> {weight}
                    </TextContainer>
                    <TextContainer>
                        <strong>Experience:</strong> {experience}
                    </TextContainer>
                    <TextContainer>
                        <strong>Highest score:</strong> {Math.max(...score)}
                    </TextContainer>
                    <FacebookShareButton
                        url={url}
                        quote={`Check out my score: ${score}`}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </UserDetail>
            </ProfileContent>
        </ProfileContainer>
    ) : (
        <div />
    );
};

export default Users;
