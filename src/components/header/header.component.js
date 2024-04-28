import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signOutStart } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { HeaderContainer, OptionLink, OptionsContainer } from "./header.styles";

const Header = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const signIn = "SIGN IN";
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <OptionsContainer>
                <OptionLink to="/">HOME</OptionLink>
                <OptionLink to="/profile">PROFILE</OptionLink>
                {/* Update the link to "/leaderboard" */}
                <OptionLink to="/leaderboard">SCOREBOARD</OptionLink>
                {currentUser ? (
                    <OptionLink onClick={() => dispatch(signOutStart())}>
                        SIGN OUT
                    </OptionLink>
                ) : (
                    <OptionLink to="/login">{signIn}</OptionLink>
                )}
            </OptionsContainer>
        </HeaderContainer>
    );
};

export default Header;
