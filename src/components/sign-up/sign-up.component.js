import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { SignUpContainer, TitleContainer } from "./sign-up.styles";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
};

const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
    });

    const resetFormFields = () => {
        setUserCredentials(defaultFormFields);
    };

    const {
        displayName,
        email,
        password,
        confirmPassword,
        phoneNumber,
        address,
    } = userCredentials;
    const dispatch = useDispatch();

    // Function that handles the submission of the sign up form.
    //
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            dispatch(
                signUpStart(email, password, displayName, phoneNumber, address)
            );
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            } else {
                console.log("user creation encountered an error", error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <SignUpContainer className="sign-up">
            <TitleContainer className="title">
                I do not have an account
            </TitleContainer>
            <TitleContainer className="title">Sign up</TitleContainer>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label="Display name"
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm password"
                    required
                />
                <FormInput
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    label="Phone Number"
                    required
                />
                <FormInput
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    label="Address"
                    required
                />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </SignUpContainer>
    );
};

export default SignUp;
