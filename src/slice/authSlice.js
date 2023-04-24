import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from 'services/auth/AuthService';

const user = JSON.parse(localStorage.getItem('user'));

export const join = createAsyncThunk(
  'auth/join',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await AuthService.join(username, password);
      console.log('createAsyncThunk join :', response);
      // thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      console.log('createAsyncThunk login : ', data);
      // return { user: data };
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  console.log('logout');
  await AuthService.logout();
});

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };
const initialState = { user: null, loading: false };
//  (reducers: 동기 , extraReducers: 비동기) 에 따라 구분 사용
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [join.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [join.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log('authSlice : ', action.payload.data);
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
