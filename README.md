### 라이브러리 설치

    npm install react-router-dom
    npm install react-bootstrap bootstrap
    npm install @mui/material @emotion/react @emotion/styled
    npm i axios
    npm install react-validation

1. BrowserRouter 사용을 위하여 `npm i react-router-dom` 설치 필요

2. 부트스트랩 UI 디자인 사용을 위해서는 `npm i react-bootstrap bootstrap` 라이브러리 설치 외에도  
   최상단의 (index.js) 파일안에 `import 'bootstrap/dist/css/bootstrap.min.css';` 임포트가 필요하다.

3. 머티리얼 UI 디자인을 사용하기 위해서는 `npm install @mui/material @emotion/react @emotion/styled` 라이브러리 설치가 필요

4. Http 요청을 사용하기 위해서 `axios` 를 설치하여 진행한다.

5. 양식 유효성 검사를 진행하기 위하여 관련 `validation` 라이브러리를 설치한다.

---

#### CORS 해결

cors 문제로 인하여 서버에서 쿠키나 값을 전달하여도 클라이언트에 받지를 못하는 문제가 생기곤 한다..
그런 문제가 발생하면, `{withCredentials: true}` 를 사용하여 CORS 문제를 해결해 줄 수 있다.

여기서는 `Axios Interceptor`를 사용하기 때문에 `Interceptor` 코드 안에 `{withCredentials: true}` 를 적용해주면
일일히 데이터를 주고받는 코드마다 적용하지 않고 일괄적으로 `CORS 문제`를 해결할 수 있다

인터셉터는 `http 요청 및 응답`이 전송, 수신되기 전에 필터의 역활을 해줍니다.
이를 통해 서버로 전송된 요청의 헤더, 본문, 매개 변수를 조작하고 서버에서 받은 응답이 가장 합리적인지 확인할 수 있습니다.
then 또는 catch에 의해 처리되기 전에 요청이나 응답을 가로챌 수 있습니다.
