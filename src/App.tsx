import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import HomeContainer from './features/home/containers/Home';
import 'semantic-ui-css/semantic.min.css';
import YearSelector from './common/components/YearSelector';
import GoogleLogin from 'react-google-login';
import { setAccessToken } from './features/user/userSlice';

const theme = {
  mode: 'light',
  colors: {
    primary: '#FF0000',
    secondary: 'white',
    darkSecondary: '#272121',
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin:0; 
    padding:0;
    font-family: 'Roboto', sans-serif;
  }
  
  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
    font-family: 'Roboto', sans-serif;
  }
`;

function App(): React.ReactElement {
  const dispatch = useDispatch();
  const clientId = process.env.REACT_APP_YT_CLIENT_ID || '';
  console.log(process.env);

  const successfulLogin = (res: any) => {
    console.log(res);
    dispatch(setAccessToken(res.accessToken));
  };

  const onFailedLogin = (res: any) => {
    console.log('Error logging in', res);
  };

  return (
    <ThemeProvider theme={theme}>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={successfulLogin}
        onFailure={onFailedLogin}
        scope="https://www.googleapis.com/auth/youtube.readonly"
      />
      <HomeContainer />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
