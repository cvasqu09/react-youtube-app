import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core';

const StyledDiv = styled(motion.div)`
  max-width: 31rem;
`;

const StyledHeader = styled(CardHeader)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;

const StyledCard = styled(Card)`
  background-color: ${(props) => props.theme.palette.secondary.light};
  color: ${(props) => props.theme.palette.text.primary};
  margin: 0.5rem;
`;

const PlaylistItem = (props) => {
  console.log(props.playlistItem.imageUrl);
  return (
    <StyledDiv
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeIn', duration: 0.45 }}
    >
      <StyledCard>
        <StyledHeader title={props.playlistItem.title} titleTypographyProps={{ variant: 'h6' }} />
        <CardMedia height="260" src={props.playlistItem.imageUrl || ''} alt="playlist item image" component="img" />
        <CardContent>
          <Typography variant="body1">
            {DateTime.fromISO(props.playlistItem.publishedAt).toLocaleString(DateTime.DATETIME_MED)}
          </Typography>
        </CardContent>
      </StyledCard>
    </StyledDiv>
  );
};

PlaylistItem.propTypes = {
  playlistItem: PropTypes.shape({
    publishedAt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default PlaylistItem;
