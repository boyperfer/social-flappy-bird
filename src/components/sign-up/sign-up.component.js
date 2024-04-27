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
	gender: "",
	age: "", 
	height: "", 
	weight: "", 
	experience: "", 
};

const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
		gender: "",
		age: "",
		height: "", 
		weight:"", 
		experience: "", 
    });

    const resetFormFields = () => {
        setUserCredentials(defaultFormFields);
    };

    const {
        displayName,
        email,
        password,
        confirmPassword,
		gender,
		age,
		height,
		weight,
		experience,
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
		
		if (gender !== "M" && gender !== "F") {
            alert("Please enter a valid gender, M for male and F for female");
            return;
		}

		if (!(parseFloat(height) >  0)) {
            alert("Please enter a valid height in feet")
			return;
		}

        try {
            dispatch(
                signUpStart(email, password, displayName, gender, age, height, weight, experience)
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
                    label="Password"
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
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                    label="Gender"
                    required
                />
                <FormInput
                    type="number"
                    name="age"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                    required
                />
                <FormInput
                    type="number"
                    name="height"
                    value={height}
                    onChange={handleChange}
                    label="Height"
                    required
                />
                <FormInput
                    type="number"
                    name="weight"
                    value={weight}
                    onChange={handleChange}
                    label="Weight"
                    required
                />
                <FormInput
                    type="number"
                    name="experience"
                    value={experience}
                    onChange={handleChange}
                    label="Experience"
                    required
                />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </SignUpContainer>
    );
};

export default SignUp;
