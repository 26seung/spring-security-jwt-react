const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
  let userInfo = JSON.stringify(token);
  localStorage.setItem('user', userInfo);
};

const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const setUser = (user) => {
  console.log(JSON.stringify(user));
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('user');
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
