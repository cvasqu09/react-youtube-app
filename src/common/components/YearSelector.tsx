import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

const years = [
  { text: 2019, value: 2019 },
  { text: 2018, value: 2018 },
];

const YearSelector = () => {
  return <Dropdown fluid selection placeholder="year" options={years} />;
};

export default YearSelector;
