import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import YouTubeAPI from '../../../services/YoutubeAPI';
import * as PlaylistInterfaces from '../../playlist/playlist.interfaces';
import Playlist from '../../playlist/components/Playlist';
import CalendarTimeline from '../../../common/components/CalendarTimeline';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 2rem;
`;

const Home = (props) => {
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
      <CalendarTimeline dates={['2017-06-12T02:59:59Z']} />
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
