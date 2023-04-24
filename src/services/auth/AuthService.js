import axios from 'axios';
import http from 'services/interceptors';

const API_URL = 'http://localhost:8080/api/auth';

const join = (username, password) => {
  return http
    .post('/auth/join', {
      username,
      password,
    })
    .then((res) => {
      console.log('http join : ', res);
      //  회원가입 성공시 (backend) 에서 넘어오는 성공 메시지 가져오기
      alert(res.data);
      return res;
    })
    .catch((err) => {
      console.log('http join err : ', err);
      //  회원가입 실패시 alert 팝업 생성
      alert('회원가입에 실패하였습니다.');
      return err;
    });
};

// const join = (username, password) => {
//   return axios
//     .post(API_URL + '/join', {
//       username,
//       password,
//     })
//     .then((res) => {
//       console.log('AuthService join : ', res);
//       //  회원가입 성공시 (backend) 에서 넘어오는 성공 메시지 가져오기
//       alert(res.data);
//       return res;
//     })
//     .catch((err) => {
//       console.log('AuthService join err : ', err);
//       //  회원가입 실패시 alert 팝업 생성
//       alert('회원가입에 실패하였습니다.');
//       return err;
//     });
// };

const login = async (username, password) => {
  return http
    .post('/auth/login', {
      username,
      password,
    })
    .then((res) => {
      //  accessToken 저장
      // let jwtToken = res.headers.get('authorization');
      // localStorage.setItem('Authorization', jwtToken);
      // console.log('AuthService Header 값 (Authorization) : ', jwtToken);

      //  userInfo 저장
      let userInfo = JSON.stringify(res.data);
      // let userInfo = res.data.data.username;
      localStorage.setItem('user', userInfo);
      console.log('AuthService Body 값 (user) : ', res.data);
      return res;
    });
};

// const logout = () => {
//   console.log('AuthService logout : ');
//   // localStorage.removeItem('user');
//   return axios.post(
//     API_URL + '/logout',
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         ['Authorization']: 'aaaaaaa',
//       },
//     },
//     // { withCredentials: true },
//   );
// };
const logout = () => {
  console.log('AuthService logout : ');
  // localStorage.removeItem('user');
  return http
    .post('/auth/logout')
    .then((res) => {
      console.log('http logout : ', res);
      //  회원가입 성공시 (backend) 에서 넘어오는 성공 메시지 가져오기
      // alert(res.data);
      return res;
    })
    .catch((err) => {
      console.log('http logout err : ', err);
      return err;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const getAuthHeader = () => {
  return localStorage.getItem('Authorization');
};

const getUserPage = () => {
  return http.post('/auth/user', {
    headers: { Authorization: getAuthHeader() },
  });
};
const getAdminPage = () => {
  return axios.get(API_URL + '/admin', {
    headers: { Authorization: getAuthHeader() },
  });
};

const AuthService = {
  join,
  login,
  logout,
  getCurrentUser,
  getUserPage,
  getAdminPage,
};

export default AuthService;
