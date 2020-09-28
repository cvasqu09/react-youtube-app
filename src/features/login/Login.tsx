import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GoogleLogin from 'react-google-login';
import { setAccessToken } from '../user/userSlice';
import { useDispatch } from 'react-redux';

const Login = (props) => {
  const dispatch = useDispatch();
  const clientId = process.env.REACT_APP_YT_CLIENT_ID || '';

  const successfulLogin = (res: any) => {
    console.log(res);
    dispatch(setAccessToken(res.accessToken));
  };

  const onFailedLogin = (res: any) => {
    console.log('Error logging in', res);
  };

  return (
    <GoogleLogin
      theme="dark"
      clientId={clientId}
      buttonText="Login"
      onSuccess={successfulLogin}
      onFailure={onFailedLogin}
      scope="https://www.googleapis.com/auth/youtube.readonly"
    />
  );
};

export default Login;
