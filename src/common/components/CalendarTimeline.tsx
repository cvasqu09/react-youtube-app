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

const CalendarTimeline = (props) => {
  return (
    <Timeline align="right">
      {props.dates
        .map((date) => DateTime.fromISO(date).toFormat('LLL'))
        .map((month) => (
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
    </Timeline>
  );
};

CalendarTimeline.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string),
};

export default CalendarTimeline;
