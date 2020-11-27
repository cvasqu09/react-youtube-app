import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import YouTubeAPI from '../../../services/YoutubeAPI';
import * as PlaylistInterfaces from '../../playlist/playlist.interfaces';
import Playlist from '../../playlist/components/Playlist';
import CalendarTimeline from '../../../common/components/CalendarTimeline';
import YearSelector from '../../../common/components/YearSelector';
import { DateTime } from 'luxon';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_PLAYLISTS } from '../../playlist/queries/playlist.queries';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 2rem;
`;

const Home = (props) => {
  const [uniqueYears, setUniqueYears] = useState([]);
  const setPlaylists = (data) => {
    const playlistYears = data.playlists.map((item) => DateTime.fromISO(item.publishedAt).year.toString());
    setUniqueYears(_.sortedUniq(playlistYears));
  };

  const [playlistsToDisplay, setPlaylistsToDisplay] = useState([] as PlaylistInterfaces.Playlist[]);
  const { data: playlistData } = useQuery(GET_PLAYLISTS, { onCompleted: setPlaylists });

  const updatePlaylistsToDisplay = (year) => {
    setPlaylistsToDisplay(
      playlistData.playlists.filter((playlist) => DateTime.fromISO(playlist.publishedAt).year.toString() === year),
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
