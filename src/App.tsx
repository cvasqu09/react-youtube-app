import React from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Home from './features/home/containers/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import GoogleLogin from 'react-google-login';
import { setAccessToken } from './features/user/userSlice';
import { StylesProvider } from '@material-ui/core/styles';

import Login from './features/login/Login';
import Header from './features/ui/Header';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF0000',
    },
    secondary: {
      main: '#272121',
    },
    text: {
      primary: 'white',
    },
  },
});

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
    background-color: ${theme.palette.secondary.main};
  }
`;

function App(): React.ReactElement {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" redirect>
              <Redirect to="/login" />
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
