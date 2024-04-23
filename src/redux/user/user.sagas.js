import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
    signInSuccess,
    signUpSuccess,
    signOutSuccess,
    signInFailure,
    signUpFailure,
    signOutFailure,
    fetchUsersSuccess,
    fetchUsersFailure,
} from "./user.actions";

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    fetchUsers,
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* fetchUsersAsync() {
    try {
        const userList = yield call(fetchUsers);
        yield put(fetchUsersSuccess(userList));
    } catch (error) {
        yield put(fetchUsersFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );

        yield call(createUserDocumentFromAuth, user, { displayName });
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onFetchUsersStart() {
    yield takeLatest(UserActionTypes.FETCH_USERS_START, fetchUsersAsync);
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
        call(onFetchUsersStart),
    ]);
}
