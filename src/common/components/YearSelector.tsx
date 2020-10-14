import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

const StyledSelect = styled(Select)`
  color: ${(props) => props.theme.palette.primary.color};
`;

const StyledDiv = styled.div`
  margin-left: 1rem;
  width: 100%;
`;

const StyledFormControl = styled(FormControl)`
  width: 50%;
`;

const inputLabelStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

const YearSelector = (props) => {
  const [selectedYear, setSelectedYear] = useState('');

  const setYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const yearMenuItems = props.years.map((year) => (
    <MenuItem key={year} value={year}>
      {year}
    </MenuItem>
  ));

  const classes = inputLabelStyles();

  return (
    <StyledDiv>
      <StyledFormControl color="secondary">
        <InputLabel id="year-label" classes={{ root: classes.root }}>
          Select Year
        </InputLabel>
        <StyledSelect labelId="year-label" value={selectedYear} onChange={setYear} displayEmpty>
          {yearMenuItems}
        </StyledSelect>
      </StyledFormControl>
    </StyledDiv>
  );
};

YearSelector.propTypes = {
  years: PropTypes.arrayOf(PropTypes.string),
};
export default YearSelector;
