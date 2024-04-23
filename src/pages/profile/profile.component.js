import { useSelector } from "react-redux";
import Header from "../../components/header/header.component";
import Users from "../../components/users/users.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { TextContainer, ProfileContainer } from "./profile.styles";

const ProfilePage = () => {
    const currentUser = useSelector(selectCurrentUser);
    return currentUser ? (
        <div>
            <Header />
            <Users />
        </div>
    ) : (
        <ProfileContainer>
            <Header />
            <TextContainer>Please Sign In</TextContainer>
        </ProfileContainer>
    );
};

export default ProfilePage;
