import React, { Fragment, useEffect, useState } from 'react';
import YouTubeAPI from '../../../services/YoutubeAPI';
import * as PlaylistInterfaces from '../playlist.interfaces';
import _ from 'lodash';

import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import styled from 'styled-components';
import PlaylistItem from '../components/PlaylistItem';
import YearSelector from '../../../common/components/YearSelector';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 5rem;
`;

const StyledPlaylistItem = styled(PlaylistItem)`
  margin: 1rem;
`;

const PlaylistPage = (props) => {
  const [videos, setVideos] = useState([] as PlaylistInterfaces.Video[]);
  const [playlistItems, setPlaylistItems] = useState<any[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const id = useParams();

  useEffect(() => {
    const api = new YouTubeAPI();
    api
      .getPlaylistItems(id)
      .then((playlistItems) => {
        setPlaylistItems(playlistItems);

        const playlistYears = playlistItems.map((item) => DateTime.fromISO(item.publishedAt).year.toString());
        setYears(_.sortedUniq(playlistYears).reverse());
      })
      .catch((err) => {
        console.log('error retrieving items', err);
      });
    // api.getVideoInfo(videoIds).then((vids) => {
    //   setVideos(vids);
    // });
  }, []);

  return (
    <Fragment>
      <YearSelector years={years} />
      <StyledContainer>
        {playlistItems.map((playlistItem) => {
          return <StyledPlaylistItem playlistItem={playlistItem} key={playlistItem.playlistId} />;
        })}
      </StyledContainer>
    </Fragment>
  );
};

export default PlaylistPage;
