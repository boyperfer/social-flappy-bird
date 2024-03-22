import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectCurrentUser } from '../../redux/user/user.selectors'

import { signOutStart } from '../../redux/user/user.actions'

import {
    HeaderContainer,
    OptionsContainer,
    OptionLink,
} from './header.styles'

const Header = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const signIn = "SIGN IN";
	const navigate = useNavigate();
    return (
        <HeaderContainer>
			<OptionsContainer>
                {currentUser ? (
                    /* if the user logged in, display "SIGN OUT", otherwise "SIGN IN" */
                    <OptionLink onClick={() => dispatch(signOutStart())}>
                        SIGN OUT
                    </OptionLink>
                ) : (
                    <OptionLink to='/login' >{signIn}</OptionLink>
                )}
            </OptionsContainer>
        </HeaderContainer>
    )
}


export default Header;
