import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import YearSelector from '../../../common/components/YearSelector';

import { DateTime } from 'luxon';
import YouTubeAPI from '../../../services/YoutubeAPI';
import PlaylistItem from '../../playlist/components/PlaylistItem';
import * as PlaylistInterfaces from '../../playlist/playlist.interfaces';
import Playlist from '../../playlist/components/Playlist';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 2rem;
`;

const Home = () => {
  const [playlists, setPlaylists] = useState([] as PlaylistInterfaces.Playlist[]);

  useEffect(() => {
    const api = new YouTubeAPI();
    api.getPlaylists().then((playlists: PlaylistInterfaces.Playlist[]) => {
      setPlaylists(playlists);
      const videoIds = playlists.map((playlist) => playlist.id);
    });
  }, []);

  return (
    <Fragment>
      <StyledDiv>
        {playlists.map((playlist) => {
          return <Playlist playlist={playlist} key={playlist.id} />;
        })}
      </StyledDiv>
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
