import TokenService from 'services/auth/TokenService';
import instance from 'services/api';
import { useNavigate } from 'react-router-dom';

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 요청이 전달되기 전에 작업 수행
    // 로컬스토리지에 acceseToken 을 저장해두었는지 확인
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // config.headers['Authorization'] = token; // for Spring Boot back-end
      config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
    }
    console.log('interceptors.request : ', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (res) => {
    console.log('interceptors.response : ', res);
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const config = originalConfig.headers.Authorization;
    console.log('interceptors.response.error : ', err);
    //  IF. URL 경로가 로그인 이 아닌 경우 && 오류 응답이 발생한 경우
    if (originalConfig.url !== '/auth/login' && err.response) {
      // IF. 401 인증 오류 발생 (엑세스토큰 만료여부 등) && 2번째 수행이 아닌 경우
      if (err.response.status === 401 && !originalConfig._retry) {
        //  중복수행 여부 확인용 변수설정,
        //  originalConfig 의 _retry 속성 값을 변경하여 중복수행여부 확인
        originalConfig._retry = true;

        try {
          const res = await instance.post('/auth/reissue', {
            config,
            // refreshToken: TokenService.getLocalRefreshToken(),
          });
          //  정상적인 토큰정보 응답이 넘어오면 accessToken 에 담아준다
          TokenService.updateLocalAccessToken(res.data);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      // const navigate = useNavigate();
      // navigate('/');
      // window.location.href = '/error';
    }
    return Promise.reject(err);
  },
);

export default instance;
