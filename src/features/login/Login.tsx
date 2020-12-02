import React, { Fragment } from 'react';
import GoogleLogin from 'react-google-login';
import { clearAccessToken, setAccessToken } from '../user/userSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const StyledLogout = styled(Button)`
  font-weight: bold;
`;

const Login = (props) => {
  const dispatch = useDispatch();
  const clientId = process.env.REACT_APP_YT_CLIENT_ID || '';

  const successfulLogin = (res: any) => {
    dispatch(setAccessToken(res.accessToken));
  };

  const clearToken = () => {
    console.log('clearing token');
    dispatch(clearAccessToken());
  };

  const onFailedLogin = (res: any) => {
    console.log('Error logging in', res);
  };

  return (
    <Fragment>
      <StyledSection>
        <GoogleLogin
          theme="dark"
          clientId={clientId}
          buttonText="Login"
          onSuccess={successfulLogin}
          onFailure={onFailedLogin}
          scope="https://www.googleapis.com/auth/youtube.readonly"
        />
        <StyledLogout variant="contained" color="primary" onClick={clearToken}>
          Logout
        </StyledLogout>
      </StyledSection>
    </Fragment>
  );
};

export default Login;
