export const createUsersHash = (users) => {
    return users.reduce((hash, user) => {
        hash[user.id] = user;
        return hash;
    }, {});
};

export const padAndHash = async (inputString) => {
  const paddedString = inputString.padEnd(32, ' ');
  const encoder = new TextEncoder();
  const data = encoder.encode(paddedString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
