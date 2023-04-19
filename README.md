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

#### import 절대경로를 alias 하기

다른 경로의 모듈을 `import` 로 가져올 때 `../../.....` 처럼 상대경로로 하게 되면 뎁스가 너무 길어진다.
이런 경우 절대경로로 바꿔서 `alias` 해서 경로르 가져올 수 있다.

다만 `CRA` 로 만든 앱은 `web pack` 설정이 숨겨져있다. 해당 설정을 꺼내기 위해서는 `Eject` 를 사용해서 따로 설정할 수 있지만, 사용시 다시 되돌릴 수 없다.

---

#### CORS 해결

cors 문제로 인하여 서버에서 쿠키나 값을 전달하여도 클라이언트에 받지를 못하는 문제가 생기곤 한다..
그런 문제가 발생하면, `{withCredentials: true}` 를 사용하여 CORS 문제를 해결해 줄 수 있다.

여기서는 `Axios Interceptor`를 사용하기 때문에 `Interceptor` 코드 안에 `{withCredentials: true}` 를 적용해주면
일일히 데이터를 주고받는 코드마다 적용하지 않고 일괄적으로 `CORS 문제`를 해결할 수 있다

인터셉터는 `http 요청 및 응답`이 전송, 수신되기 전에 필터의 역활을 해줍니다.
이를 통해 서버로 전송된 요청의 헤더, 본문, 매개 변수를 조작하고 서버에서 받은 응답이 가장 합리적인지 확인할 수 있습니다.
then 또는 catch에 의해 처리되기 전에 요청이나 응답을 가로챌 수 있습니다.

---

### 리덕스 (Redux) 사용

##### 라이브러리 설치

    npm install react-redux
    npm install @reduxjs/toolkit

##### Redux 툴킷 문서

https://redux-toolkit.js.org/introduction/getting-started

Redux를 사용하면 `상태관리` 측면에서 많은 도움을 받을 수 있다.
그 중 Redux Toolkit은 Redux 로직을 작성하기 위해 필요한 (저장소 준비, 리듀서 생산과 불변 수정 로직 작성, 상태 "조각" 전부를 한번에 작성) 등 일반적인 작업들을 단순화해주는 유틸리티를 포함하고 있다.

---

##### 툴킷 소스 예제

```js
import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import { up } from './counterSlice';

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => {
    return state.counter.value;
  });
  return (
    <div>
      <button
        onClick={() => {
          // 기존 리덕스 사용시 (action, paylod) 값을 지정해주어야 했음
          // dispath({type:'counterSlice/up', step:2})

          // 툴킷 사용시 간소화 사용가능 ,
          // dispath(counterSlice.action.up(2))
          dispatch(up(2));
        }}
      >
        +
      </button>{' '}
      {count}
    </div>
  );
}
export default function App() {
  return (
    // {configureStore} 로 담아준 store 를 전달하여 사용
    // 전달되어진 store 정보들을 사용하기 위해서는 useSelector 를 사용하면 된다.
    <Provider store={store}>
      <div>
        <Counter></Counter>
      </div>
    </Provider>
  );
}
```

작은 store 형태인 slice 로 구분되어 진다,

```js
import { createSlice } from '@reduxjs/toolkit';
const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: { value: 0 },
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
  },
});
export default counterSlice;
export const { up } = counterSlice.actions;
```

여러 `slice` 들을 모아서 `store` 로 만들때는 `{configureStore}` 를 사용한다.  
사용방법은 각각의 slice 들의 reducer 들이 들어가면 된다.

이전 작업한 `counterSlice` 함수 내에 있는 `reducers (ex : up, down, set...)` 들을 하나로 합쳐서 자동으로 만들어 준다.

```js
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
export default store;
```

---

담아준 `store` 는

비동기 작업
createAsyncThunk

function.pending - 비동기 작업을 시작했을 때
function.fulfilled - 비동기 작업을 끝냈을 때
function.rejected - 요류가 생겨 중단되었을 때
function.fulfilled -

---
