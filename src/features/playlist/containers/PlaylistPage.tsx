import React, { Fragment, useEffect, useState } from 'react';
import YouTubeAPI from '../../../services/YoutubeAPI';
import * as PlaylistInterfaces from '../playlist.interfaces';
import _ from 'lodash';

import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import styled from 'styled-components';
import PlaylistItem from '../components/PlaylistItem';
import YearSelector from '../../../common/components/YearSelector';
import CalendarTimeline from '../../../common/components/CalendarTimeline';
import { Simulate } from 'react-dom/test-utils';

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
  const [playlistItems, setPlaylistItems] = useState<PlaylistInterfaces.PlaylistItem[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [videos, setVideos] = useState<PlaylistInterfaces.Video[]>([]);
  const [monthTags, setMonthTags] = useState<any>({});
  const id = useParams();

  const updateYear = (year) => {
    setSelectedYear(year);
  };

  const updateMonthTags = (videos: PlaylistInterfaces.Video[]) => {
    const updatedTags = {};
    videos.map((video) => {
      const videoMonth = DateTime.fromISO(video.addedAt).toFormat('LLL');
      const currentMonthTags = monthTags[videoMonth] || [];
      updatedTags[videoMonth] = [...currentMonthTags, video.tags];
    });
    setMonthTags(updatedTags);
  };

  const getVideoInfo = (playlistItems) => {
    const api = new YouTubeAPI();
    api
      .getVideoInfo(playlistItems)
      .then((apiVideos) => {
        console.log('api videos', apiVideos);
        setVideos(apiVideos);
        updateMonthTags(apiVideos);
        return playlistItems;
      })
      .catch((err) => {
        console.log('error retrieving videos', err);
      });
  };

  const setPlaylistYears = (playlistItems: PlaylistInterfaces.PlaylistItem[]) => {
    setPlaylistItems(playlistItems);

    const playlistYears = playlistItems.map((item) => DateTime.fromISO(item.publishedAt).year.toString());
    setYears(_.sortedUniq(playlistYears).reverse());
    return playlistItems;
  };

  useEffect(() => {
    const api = new YouTubeAPI();
    api
      .getPlaylistItems(id)
      .then((playlistItems) => setPlaylistYears(playlistItems))
      .then((playlistItems) => getVideoInfo(playlistItems))
      .catch((err) => {
        console.log('error retrieving items', err);
      });
  }, []);

  const selectedPlaylistItemDates = playlistItems
    .filter((item) => DateTime.fromISO(item.publishedAt).year.toString() === selectedYear)
    .map((item) => item.publishedAt);

  return (
    <Fragment>
      <main>
        <YearSelector years={years} onYearSelected={updateYear} />
        <StyledContainer>
          {playlistItems
            .filter((item) => DateTime.fromISO(item.publishedAt).year.toString() == selectedYear)
            .map((playlistItem) => {
              return <StyledPlaylistItem playlistItem={playlistItem} key={playlistItem.videoId} />;
            })}
        </StyledContainer>
        <section>
          {Object.keys(monthTags).map((k) => (
            <div key={k}>
              {k}: {monthTags[k]}
            </div>
          ))}
          {selectedPlaylistItemDates.length > 0 ? <CalendarTimeline dates={selectedPlaylistItemDates} /> : null}
        </section>
      </main>
    </Fragment>
  );
};

export default PlaylistPage;
