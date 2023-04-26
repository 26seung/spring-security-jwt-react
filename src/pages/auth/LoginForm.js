import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from 'services/auth/AuthService';
import { login } from 'slice/authSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  //  id, pw 입력 state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  // 로그인버튼 이벤트
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log('loginForm e : ', e);

  //   AuthService.login(username, password).then(
  //     (res) => {
  //       console.log('loginForm console : ', res.status);
  //       //  넘어오는 status 가 200 인 경우에 성공처리
  //       if (res.status === 200) {
  //         alert('로그인에 성공하였습니다.');
  //         navigate('/');
  //         // window.location.reload();
  //       }
  //     },
  //     (error) => {
  //       console.log('LoginForm Error : ', error);
  //     },
  //   );
  // };

  //  redux exam
  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login({ username, password }))
      .unwrap()
      .then((res) => {
        console.log('lasdlasdlknasldkn : ', res);
        if (res.status === 200) {
          alert('로그인에 성공하였습니다.');
          navigate('/');
          // window.location.reload();
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인 화면
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            id="username"
            value={username}
            onChange={onChangeUsername}
            label="아이디"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            label="비밀번호"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="아이디 저장"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link to="/join" variant="body2">
                아직 회원이 아니세요?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  );
};

export default LoginForm;
