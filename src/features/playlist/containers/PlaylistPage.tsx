import React, { Fragment, useEffect, useState } from 'react';
import YouTubeAPI from '../../../services/YoutubeAPI';
import * as PlaylistInterfaces from '../playlist.interfaces';
import Playlist from '../components/Playlist';

import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 5rem;
`;

const PlaylistPage = (props) => {
  const [playlists, setPlaylists] = useState([] as PlaylistInterfaces.Playlist[]);
  const [videos, setVideos] = useState([] as PlaylistInterfaces.Video[]);

  useEffect(() => {
    const api = new YouTubeAPI();
    api.getPlaylists().then((playlists: PlaylistInterfaces.Playlist[]) => {
      setPlaylists(playlists);
      const videoIds = playlists.map((playlist) => playlist.id);
      api.getVideoInfo(videoIds).then((vids) => {
        setVideos(vids);
      });
    });
  }, []);

  return (
    <Fragment>
      <StyledContainer>
        {playlists.map((playlist) => {
          return <Playlist playlist={playlist} key={playlist.id} />;
        })}

        {videos.map((vid) => {
          return <p key={vid.id}>{vid.title}</p>;
        })}
      </StyledContainer>
    </Fragment>
  );
};

export default PlaylistPage;
