import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/header/header.component';
import Users from '../../components/users/users.component';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import PersonalChart from '../../components/personal-chart/personal-char.component';
import {checkUserSession} from '../../redux/user/user.actions';
import {TextContainer, ProfileContainer, ProfileMainContainer } from './profile.styles';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);

	useEffect(() => {
		dispatch(checkUserSession());
	}, [dispatch]);
	return currentUser ? (
		<ProfileMainContainer>
			<Header />
			<Users />
			<PersonalChart />
		</ProfileMainContainer>
	) : (
		<ProfileContainer>
			<Header />
			<TextContainer>Please Sign In</TextContainer>
		</ProfileContainer>
	);
};

export default ProfilePage;
