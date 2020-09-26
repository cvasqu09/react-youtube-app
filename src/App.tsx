import React from 'react';
import './App.css';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import HomeContainer from './features/home/containers/Home';

const theme = {
  mode: 'light',
  colors: {
    primary: '#FF0000',
    secondary: 'white',
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin:0; 
    padding:0;
    font-family: 'Roboto', sans-serif;
  }

  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const A = styled.a`
  color: ${(props) => props.theme.color};
`;

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <HomeContainer />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
