import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import YouTubeAPI from '../../../services/YoutubeAPI';
import * as PlaylistInterfaces from '../../playlist/playlist.interfaces';
import Playlist from '../../playlist/components/Playlist';
import CalendarTimeline from '../../../common/components/CalendarTimeline';
import YearSelector from '../../../common/components/YearSelector';
import { DateTime } from 'luxon';
import _ from 'lodash';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 2rem;
`;

const Home = (props) => {
  const [playlists, setPlaylists] = useState([] as PlaylistInterfaces.Playlist[]);
  const [playlistsToDisplay, setPlaylistsToDisplay] = useState([] as PlaylistInterfaces.Playlist[]);

  useEffect(() => {
    const api = new YouTubeAPI();
    api.getPlaylists().then((playlists: PlaylistInterfaces.Playlist[]) => {
      setPlaylists(playlists);
      const videoIds = playlists.map((playlist) => playlist.id);
    });
  }, []);

  const playlistYears = playlists.map((item) => DateTime.fromISO(item.publishedAt).year.toString());
  const uniqueYears = _.sortedUniq(playlistYears);

  const updatePlaylistsToDisplay = (year) => {
    console.log('playlists: ', playlists);
    setPlaylistsToDisplay(
      playlists.filter((playlist) => DateTime.fromISO(playlist.publishedAt).year.toString() === year),
    );
  };

  return (
    <Fragment>
      <main>
        <section>
          <YearSelector years={uniqueYears} onYearSelected={updatePlaylistsToDisplay} />
        </section>
        <StyledDiv>
          {playlistsToDisplay.map((playlist) => {
            return <Playlist playlist={playlist} key={playlist.id} />;
          })}
        </StyledDiv>
      </main>
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
