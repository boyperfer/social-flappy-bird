import UserActionTypes from "./user.types";
import { createUsersHash } from "./users.utils";

const INITIAL_STATE = {
    users: null,
    usersHash: null,
    isFetching: true,
    currentUser: null,
    error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
            };
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case UserActionTypes.FETCH_USERS_START:
            return {
                ...state,
                isFetching: true,
            };
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.payload,
                usersHash: createUsersHash(action.payload),
            };
        case UserActionTypes.FETCH_USERS_FAIL:
            return {
                ...state,
                isFetching: false,
                errorMassage: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
