import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const StyledMain = styled.main`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h3`
  font-weight: normal;
  margin-bottom: 1rem;
`;

const Home = (props) => {
  const history = useHistory();

  const navToPlaylists = () => {
    history.push('/playlists');
  };

  return (
    <Fragment>
      <StyledMain>
        <StyledHeader>Welcome to a look into the content you were looking at over the years!</StyledHeader>
        <Button variant="contained" color="primary" endIcon={<ArrowForward />} onClick={navToPlaylists}>
          Go
        </Button>
      </StyledMain>
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
