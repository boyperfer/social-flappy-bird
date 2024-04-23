import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);

export const selectUsers = createSelector([selectUser], (user) => user.users);

export const selectUsersHash = createSelector(
    [selectUser],
    (user) => user.usersHash
);

export const selectIsFetching = createSelector(
    [selectUser],
    (user) => user.isFetching
);

export const selectError = createSelector([selectUser], (user) => user.error);
