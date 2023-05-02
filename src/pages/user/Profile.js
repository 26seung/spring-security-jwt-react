import React, { useEffect } from 'react';
import AuthService from 'services/auth/AuthService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    // console.log('Profile - useEffect 호출됨.', currentUser);
    AuthService.getUserPage().then(
      (res) => {
        console.log('Profile : ', res);
      },
      (err) => {
        // navigate('/');
      },
    );
  });
  return (
    <div>
      -- 개인정보페이지 --
      <div>
        accessToken : {currentUser?.accessToken}
        expiredTime : {currentUser?.expiredTime}
      </div>
    </div>
  );
};

export default Profile;
