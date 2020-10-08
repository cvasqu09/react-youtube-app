import React, { useEffect, useState, Fragment } from 'react';
import YouTubeAPI from '../../../services/YoutubeAPI';
import * as PlaylistInterfaces from '../playlist.interfaces';
import Playlist from '../components/Playlist';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  grid-column-gap: 1rem;
`;

const PlaylistPage = (props) => {
  const [playlists, setPlaylists] = useState([] as PlaylistInterfaces.Playlist[]);

  useEffect(() => {
    new YouTubeAPI().getPlaylists().then((playlists: PlaylistInterfaces.Playlist[]) => {
      setPlaylists(playlists);
      console.log('playlist', playlists);
    });
  }, []);

  return (
    <Fragment>
      <StyledContainer>
        {playlists.map((playlist) => {
          return <Playlist playlist={playlist} key={playlist.id} />;
        })}
      </StyledContainer>
    </Fragment>
  );
};

export default PlaylistPage;
