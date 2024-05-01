import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import { signOutStart } from "../../redux/user/user.actions";

import { HeaderContainer, OptionsContainer, OptionLink } from "./header.styles";
import CustomButton from "../custom-button/custom-button.component";

const Header = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <OptionsContainer>
                <OptionLink to="/"><CustomButton>Home</CustomButton></OptionLink>
                <OptionLink to="/profile"><CustomButton>PROFILE</CustomButton></OptionLink>
                {currentUser ? (
                    /* if the user logged in, display "SIGN OUT", otherwise "SIGN IN" */
                    <OptionLink onClick={() => dispatch(signOutStart())}>
                        <CustomButton>SIGN OUT</CustomButton>
                    </OptionLink>
                ) : (
                    <div>
                        <OptionLink to="/login"><CustomButton>SIGN IN</CustomButton></OptionLink>
                    </div>
                )}
            </OptionsContainer>
        </HeaderContainer>
    );
};

export default Header;
