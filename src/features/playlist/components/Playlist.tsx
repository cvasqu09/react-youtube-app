import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as PlaylistInterfaces from '../playlist.interfaces';
import PropTypes from 'prop-types';
import PlaylistItem from './PlaylistItem';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const StyledDiv = styled.div`
  color: white;
`;

const StyledCard = styled(Card)`
  max-width: fit-content;
`;

const Playlist = (props) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography>Playlist name: </Typography>
        <Typography color="textSecondary">{props.playlist.title}</Typography>
      </CardContent>
      <CardMedia height="260" src={props.playlist.imageUrl || ''} alt="playlist thumbnail" component="img" />
    </StyledCard>
  );
};

export default Playlist;

Playlist.propTypes = {
  playlist: PropTypes.shape({
    publishedAt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    numberOfVideos: PropTypes.number,
    imageUrl: PropTypes.string,
    id: PropTypes.string,
  }),
};
