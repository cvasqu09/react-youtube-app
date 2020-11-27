import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import { DateTime } from 'luxon';
import _ from 'lodash';
import { Chip } from '@material-ui/core';
import { RandomColorGenerator } from '../../services/RandomColorGenerator';

const StyledChip = styled(Chip)`
  margin: 0 0.2rem;
  background-color: ${() => RandomColorGenerator.generate()};
`;

const CalendarTimeline = (props) => {
  const allMonths = props.dates.map((date) => DateTime.fromISO(date).toFormat('LLL'));
  const uniqueMonths: string[] = _.uniq(allMonths);
  const lastMonth = uniqueMonths[uniqueMonths.length - 1];

  return (
    <Timeline align="right">
      {uniqueMonths.slice(0, uniqueMonths.length - 1).map((month) => (
        <TimelineItem key={month}>
          <TimelineOppositeContent>
            <div>
              {props.content[month]?.map((item) => (
                <StyledChip key={item} label={item} />
              ))}
            </div>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <span>{month}</span>
          </TimelineContent>
        </TimelineItem>
      ))}
      <TimelineItem key={lastMonth}>
        <TimelineOppositeContent>
          <div>
            {props.content[lastMonth]?.map((item) => (
              <StyledChip key={item} label={item} />
            ))}
          </div>
        </TimelineOppositeContent>
        <TimelineDot color="primary" />
        <TimelineContent>
          <span>{lastMonth}</span>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

CalendarTimeline.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string),
  content: PropTypes.objectOf(PropTypes.array),
};

export default CalendarTimeline;
