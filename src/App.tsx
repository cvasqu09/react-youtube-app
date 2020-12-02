import React from 'react';
import './App.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Home from './features/home/containers/Home';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';

import Login from './features/login/Login';
import Header from './features/ui/Header';
import { createMuiTheme } from '@material-ui/core';
import PlaylistPage from './features/playlist/containers/PlaylistPage';
import { ApolloClient, ApolloProvider, concat, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#FF0000',
    },
    secondary: {
      main: '#272121',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const GlobalStyle = createGlobalStyle`
  * {
    margin:0; 
    padding:0;
    font-family: 'Roboto', sans-serif;
    color: white;
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
  
  body > #root {
    height: 100vh;
  }
`;

const httpLink = createHttpLink({
  uri: process.env['REACT_APP_GQL_SERVER_URI'] + '/graphql',
});

const authLink = setContext((request, previousContext) => ({
  headers: {
    ...previousContext.headers,
    authorization: 'Bearer ' + localStorage.getItem('access-token'),
  },
}));

const client = new ApolloClient({
  uri: process.env['REACT_APP_GQL_SERVER_URI'],
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App(): React.ReactElement {
  return (
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Router>
              <Header />
              <Switch>
                <Route exact path="/" redirect>
                  <Redirect to="/login" />
                </Route>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/playlist/:id" component={PlaylistPage} />
              </Switch>
            </Router>
            <GlobalStyle />
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
}

export default App;
