import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@material-ui/lab';
import { DateTime } from 'luxon';
import _ from 'lodash';

const CalendarTimeline = (props) => {
  const allMonths = props.dates.map((date) => DateTime.fromISO(date).toFormat('LLL'));
  const uniqueMonths: string[] = _.uniq(allMonths);
  const lastMonth = uniqueMonths[uniqueMonths.length - 1];

  return (
    <Timeline align="right">
      {uniqueMonths.slice(0, uniqueMonths.length - 1).map((month) => (
        <TimelineItem key={month}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <span style={{ color: 'white' }}>{month}</span>
          </TimelineContent>
        </TimelineItem>
      ))}
      <TimelineItem key={lastMonth}>
        <TimelineDot color="primary" />
        <TimelineContent>
          <span style={{ color: 'white' }}>{lastMonth}</span>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

CalendarTimeline.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string),
};

export default CalendarTimeline;
