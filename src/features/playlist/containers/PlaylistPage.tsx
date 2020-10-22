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
  const [playlistItems, setPlaylistItems] = useState<PlaylistInterfaces.PlaylistItem[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const id = useParams();

  const updateYear = (year) => {
    setSelectedYear(year);
  };

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
      <YearSelector years={years} onYearSelected={updateYear} />
      <StyledContainer>
        {playlistItems
          .filter((item) => DateTime.fromISO(item.publishedAt).year.toString() == selectedYear)
          .map((playlistItem) => {
            return <StyledPlaylistItem playlistItem={playlistItem} key={playlistItem.videoId} />;
          })}
      </StyledContainer>
    </Fragment>
  );
};

export default PlaylistPage;
