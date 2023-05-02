import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
);

/* 
BrowserRouter 사용을 위하여 `npm i react-router-dom` 설치가 필요

부트스트랩 UI 디자인 사용을 위해서는 `npm i react-bootstrap bootstrap` 라이브러리 설치 외에도 
index.js 파일안에 `import 'bootstrap/dist/css/bootstrap.min.css';`  임포트가 필요하다.

<React.StrictMode> : index.js에서 strictMode가 존재하면 `useEffect` 가 두번 랜더링이 진행된다. strictMode는 검사 도구라고 생각하면되고 개발 모드에서 오류를 잘잡기위해 두번씩 렌더링을 한다고 한다.
*/
