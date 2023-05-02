import React, { useEffect } from 'react';
import AuthService from 'services/auth/AuthService';

const Admin = () => {
  useEffect(() => {
    console.log('useEffect 호출됨.');
    AuthService.getAdminPage().then((res) => {
      console.log('Admin : ', res);
    });
  }, []);
  return <div>어드민페이지</div>;
};

export default Admin;
