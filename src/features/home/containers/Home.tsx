import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../../ui/Header';
import YearSelector from '../../../common/components/YearSelector';

const HomeContainer = () => {
  return (
    <Fragment>
      <Header />
      <YearSelector />
    </Fragment>
  );
};

HomeContainer.propTypes = {};

export default HomeContainer;
