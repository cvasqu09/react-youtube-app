import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PieChart, Pie } from 'recharts';

const PieBreakdown = (props) => {
  const [tagInfo, setTagInfo]: [any[], any] = useState([]);

  useEffect(() => {
    if (props.tags) {
      console.log('tags are', props.tags);
      let uniqueTags = {};
      props.tags.forEach((tag) => {
        if (uniqueTags[tag]) {
          uniqueTags = { ...uniqueTags, [tag]: uniqueTags[tag] + 1 };
        } else {
          uniqueTags = { ...uniqueTags, [tag]: 1 };
        }
      });

      setTagInfo(
        Object.keys(uniqueTags).map((tag) => ({
          tag: tag,
          count: uniqueTags[tag],
        })),
      );
    }
  }, [props.tags]);

  return (
    <Fragment>
      {JSON.stringify(tagInfo)}
      <PieChart width={700} height={250}>
        <Pie data={tagInfo} nameKey="tag" dataKey="count" cx="50%" cy="50%" />
      </PieChart>
    </Fragment>
  );
};

PieBreakdown.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default PieBreakdown;
