import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
    selectCurrentUser,
    selectError,
} from "../../redux/user/user.selectors";
import { emailSignInStart } from "../../redux/user/user.actions";
import {
    SignInContainer,
    TitleContainer,
    ButtonsContainer,
} from "./sign-in.styles";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignIn = () => {
    const err = useSelector(selectError);
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (err) {
            alert("Login Failed");
        }

        if (currentUser) {
            navigate("/");
        }
    }, [err, currentUser]);
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { email, password } = userCredentials;

    const resetFormFields = () => {
        setUserCredentials(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            console.log("user sign in failed", error);
            alert("login failed");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
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
                    label="email"
                    name="email"
                    type="email"
                    value={email}
                    required
                />
                <FormInput
                    handleChange={handleChange}
                    label="password"
                    name="password"
                    type="password"
                    value={password}
                    required
                />
                <ButtonsContainer>
                    <CustomButton type="submit">Sign IN</CustomButton>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignIn;
