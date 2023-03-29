import axios from 'axios';
import TokenService from '../service/auth/TokenService';

const instance = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청
instance.interceptors.request.use(
  (config) => {
    // 로컬스토리지에 acceseToken 을 저장해두었는지 확인
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = token; // for Spring Boot back-end
      // config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
    }
    console.log('interceptors.response.config : ', config);
    return config;
  },
  (error) => {
    console.log('interceptors.response.error : ');
    return Promise.reject(error);
  },
);

// 응답
instance.interceptors.response.use(
  (res) => {
    console.log('interceptors.response.use : ', res);
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    console.log('interceptors.response.err : ', err);

    if (originalConfig.url !== '/auth/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post('/auth/reissue', {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);

export default instance;
