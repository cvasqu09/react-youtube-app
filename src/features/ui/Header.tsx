import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.h2`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.palette.primary.light};
  color: white;
  padding: 1rem;
  margin: 0;
`;

const StyledNav = styled.nav`
  > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const StyledNavLink = styled.a`
  :hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const history = useHistory();

  const routeHome = () => {
    history.push('/home');
  };

  const routeToPlaylists = () => {
    history.push('/playlists');
  };

  const routeToLogin = () => {
    history.push('/login');
  };

  return (
    <StyledHeader>
      <StyledNavLink onClick={routeHome}>YouTube Year in Review</StyledNavLink>
      <StyledNav>
        <StyledNavLink onClick={routeHome}>Home</StyledNavLink>
        <StyledNavLink onClick={routeToPlaylists}>Playlists</StyledNavLink>
        <StyledNavLink onClick={routeToLogin}>Login</StyledNavLink>
      </StyledNav>
    </StyledHeader>
  );
};

Header.propTypes = {};

export default withRouter(Header);
