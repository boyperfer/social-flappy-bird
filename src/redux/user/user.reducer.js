import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    users: null,
    isFetching: false,
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
