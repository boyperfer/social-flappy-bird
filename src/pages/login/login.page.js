import React from 'react';

import { SignUpAndSignInContainer } from './login.style'

import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'
import Header from '../../components/header/header.component';

const LoginPage = () => (
    <SignUpAndSignInContainer>
		<Header/>
		<SignIn />
		<SignUp />
    </SignUpAndSignInContainer>
)

export default LoginPage;

