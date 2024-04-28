import { useSelector } from "react-redux";
import { FacebookIcon, FacebookShareButton } from "react-share";
import Header from "../../components/header/header.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
    ProfileContainer,
    ProfileContent,
    ProfileHeader,
    TextContainer,
    UserDetail,
} from "./users.styles";

const Users = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { displayName, score, email, id } = currentUser;
    const url = `https://gamedemo123.netlify.app/share/${id}`;
    console.log(url);
    return currentUser ? (
        <ProfileContainer>
            <Header />
            <ProfileHeader>
                <h1>User Profile</h1>
            </ProfileHeader>
            <ProfileContent>
                <UserDetail>
                    <TextContainer>
                        <strong>Name:</strong> {displayName}
                    </TextContainer>
                    <TextContainer>
                        <strong>Email:</strong> {email}
                    </TextContainer>
                    <TextContainer>
                        <strong>Score:</strong> {score}
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
