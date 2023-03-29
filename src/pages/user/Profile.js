import React, { useEffect, useState } from 'react';
import AuthService from '../../service/auth/AuthService';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    console.log('Profile - useEffect 호출됨.');
    // AuthService.getUserPage().then((res) => {
    //   console.log('Profile : ', res);
    // });
  }, []);
  return <div>개인정보페이지 : {currentUser.username}</div>;
};

export default Profile;
