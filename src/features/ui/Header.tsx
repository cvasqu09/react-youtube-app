import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.h2`
  width: 100%;
  background-color: ${(props) => props.theme.palette.primary.light};
  color: white;
  padding: 1rem;
  margin: 0;
`;

const StyledSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const history = useHistory();

  const routeHome = () => {
    history.push('/home');
  };

  return (
    <StyledHeader>
      <StyledSpan onClick={routeHome}>YouTube Year in Review</StyledSpan>
    </StyledHeader>
  );
};

Header.propTypes = {};

export default withRouter(Header);
