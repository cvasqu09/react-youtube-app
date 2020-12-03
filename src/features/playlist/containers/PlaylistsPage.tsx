import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import YearSelector from '../../../common/components/YearSelector';
import Playlist from '../components/Playlist';
import { DateTime } from 'luxon';
import _ from 'lodash';
import * as PlaylistInterfaces from '../playlist.interfaces';
import { useQuery } from '@apollo/client';
import { GET_PLAYLISTS } from '../queries/playlist.queries';
import { List, ListItem, ListSubheader } from '@material-ui/core';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 2rem;
`;

const PlaylistsPage = (props) => {
  const [uniqueYears, setUniqueYears] = useState([]);
  const setPlaylists = (data) => {
    const playlistYears = data.playlists.map((item) => DateTime.fromISO(item.publishedAt).year.toString());
    setUniqueYears(_.sortedUniq(playlistYears));
  };

  const [playlistsToDisplay, setPlaylistsToDisplay] = useState([] as PlaylistInterfaces.Playlist[]);
  const { data: playlistData } = useQuery(GET_PLAYLISTS, { onCompleted: setPlaylists });

  const getPlaylistsToDisplayByYear = (year) => {
    return playlistData.playlists
      .filter((playlist) => DateTime.fromISO(playlist.publishedAt).year.toString() === year)
      .filter((playlist) => playlist.numberOfVideos !== 0);
  };

  return (
    <Fragment>
      <main>
        {uniqueYears.map((year) => (
          <List key={year} subheader={<ListSubheader>{year}</ListSubheader>}>
            <ListItem>
              <StyledDiv>
                {getPlaylistsToDisplayByYear(year).map((playlist) => {
                  return <Playlist playlist={playlist} key={playlist.id} />;
                })}
              </StyledDiv>
            </ListItem>
          </List>
        ))}
      </main>
    </Fragment>
  );
};

export default PlaylistsPage;
