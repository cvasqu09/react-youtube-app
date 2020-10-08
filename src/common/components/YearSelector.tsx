import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

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

  const yearMenuItems = years.map((year) => (
    <MenuItem key={year.value} value={year.value}>
      {year.text}
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

const years = [
  { text: 2019, value: 2019 },
  { text: 2018, value: 2018 },
];

export default YearSelector;
