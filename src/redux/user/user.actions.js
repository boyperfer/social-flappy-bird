import UserActionTypes from "./user.types";

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
});

export const emailSignInStart = (email, password) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: { email, password },
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error,
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error,
});

export const signUpStart = (email, password, displayName) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: { email, password, displayName },
});

export const signUpSuccess = (user, additionalData) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error,
});

export const fetchUsersStart = () => ({
    type: UserActionTypes.FETCH_USERS_START,
});

export const fetchUsersSuccess = (users) => ({
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload: users,
});

export const fetchUsersFailure = (errorMassage) => ({
    type: UserActionTypes.FETCH_USERS_FAIL,
    payload: errorMassage,
});
