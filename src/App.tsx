import React from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  mode: 'light',
  color: 'blue',
};

const A = styled.a`
  color: ${(props) => props.theme.color};
`;

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <header className="App-header">
          <A href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </A>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
