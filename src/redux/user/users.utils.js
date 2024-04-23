export const createUsersHash = (users) => {
    return users.reduce((hash, user) => {
        hash[user.id] = user;
        return hash;
    }, {});
};
