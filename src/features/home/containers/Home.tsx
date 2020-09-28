import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../../ui/Header';
import YearSelector from '../../../common/components/YearSelector';
import PlaylistItem from '../../../common/components/PlaylistItem';

const Home = () => {
  return (
    <Fragment>
      <YearSelector />
      <PlaylistItem />
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
