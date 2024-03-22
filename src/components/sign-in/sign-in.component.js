import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {
	emailSignInStart,
} from '../../redux/user/user.actions';
import {
	SignInContainer,
	TitleContainer,
	ButtonsContainer,
} from './sign-in.styles';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignIn = () => {
	const [userCredentials, setUserCredentials] = useState({
		email: '',
		password: '',
	});

	const dispatch = useDispatch();

	const {email, password} = userCredentials;

	const resetFormFields = () => {
		setUserCredentials(defaultFormFields);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
		  dispatch(emailSignInStart(email, password));
		  resetFormFields();
		} catch (error) {
		  console.log('user sign in failed', error);
		}
	};

	const handleChange = event => {
		const {name, value} = event.target;
		setUserCredentials({...userCredentials, [name]: value});
	};

	return (
		<SignInContainer>
			<TitleContainer>I already have an account</TitleContainer>
			<TitleContainer>
                Sign in with your email and password
			</TitleContainer>
			<form onSubmit={handleSubmit}>
				<FormInput
					handleChange={handleChange}
					label='email'
					name='email'
					type='email'
					value={email}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='password'
					name='password'
					type='password'
					value={password}
					required
				/>
				<ButtonsContainer>
					<CustomButton type='submit'>Sign IN</CustomButton>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignIn;
