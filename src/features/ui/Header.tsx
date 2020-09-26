import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const H1 = styled.h2`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  padding: 1rem;
`;

const Header = () => {
  return <H1>Youtube Year in Review</H1>;
};

Header.propTypes = {};

export default Header;
