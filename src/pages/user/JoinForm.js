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
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../service/auth/AuthService';

const JoinForm = (props) => {
  const navigate = useNavigate();
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

  const handleJoin = (e) => {
    e.preventDefault();

    console.log(e);
    // setMessage('');
    // setSuccessful(false);
    // if (checkBtn.current.context._errors.length === 0) {
    AuthService.join(username, password).then(
      (res) => {
        //  `AuthService` 에서 로직을 처리하고 올바른 상태가 넘어오면 페이지 이동처리로 수정
        // alert('회원가입에 성공하였습니다.');
        console.log('JoinForm : ', res);
        if (res.status === 201) {
          navigate('/login');
        }
        // setMessage(res.data.message);
        // setSuccessful(true);
      },
      (error) => {
        // alert('회원가입에 실패하였습니다. \n\n' + error);
        // setMessage(resMessage);
        // setSuccessful(false);
      },
    );
    // }
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
          회원가입 페이지
        </Typography>
        <Box component="form" noValidate onSubmit={handleJoin} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="username"
                id="username"
                value={username}
                onChange={onChangeUsername}
                label="아이디를 입력하세요"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={onChangePassword}
                label="비밀번호를 입력하세요"
                // autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12} />
            <Grid item xs={12} />
            {/* 이메일은 추후 진행 */}
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="이메일을 입력하세요"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="이메일 수신에 동의합니다."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입 하기
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                이미 회원이시라면?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
};

export default JoinForm;
