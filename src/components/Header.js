import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from '../service/auth/AuthService';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    //  AuthService 에서 getCurrentUser 를 호출하여, localstorage 에 저장하였던 'user' 키 값을 불러온다.
    const auth = AuthService.getCurrentUser();

    if (auth) {
      setCurrentUser(auth);
      // console.log('currentUser : ' + currentUser);
    }

    return () => {
      clearInterval(auth);
      console.log('header - return : ', auth);
    };
    //  localstorage 에 저장되어 있는 'user' 키 값을 삭제 한다.
  }, []);

  const logout = () => {
    AuthService.logout();
    setCurrentUser('');
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Link to="/" className="navbar-brand">
            홈페이지
          </Link>
          <Nav className="me-auto">
            <Link to="/login" className="nav-link">
              로그인
            </Link>
            <Link to="admin" className="nav-link">
              admin
            </Link>
            <Link to="profile" className="nav-link">
              3번메뉴
            </Link>
          </Nav>
          {/* currentUser 값이 존재 여부에 따라 로그인/로그아웃 설정 */}
          {currentUser ? (
            <Nav>
              <Link to="profile" className="nav-link">
                {/* {currentUser?.username} 님 */}
                아무개
              </Link>
              <Link to="/login" className="nav-link" onClick={logout}>
                로그아웃
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Link to="/login" className="nav-link">
                로그인
              </Link>
              <Link to="/join" className="nav-link">
                회원가입
              </Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
