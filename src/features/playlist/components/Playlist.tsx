import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const StyledDiv = styled.div`
  color: white;
`;

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 1rem;
`;

const Playlist = (props) => {
  const history = useHistory();

  const navigateToPlaylistPage = (id: string) => {
    history.push('/playlist');
  };

  return (
    <StyledCard onClick={() => navigateToPlaylistPage(props.playlist.id)}>
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
