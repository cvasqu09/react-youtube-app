import React, { Fragment, useEffect, useState } from 'react';
import * as PlaylistInterfaces from '../playlist.interfaces';
import _ from 'lodash';

import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';

import styled from 'styled-components';
import PlaylistItem from '../components/PlaylistItem';
import YearSelector from '../../../common/components/YearSelector';
import CalendarTimeline from '../../../common/components/CalendarTimeline';
import { useQuery } from '@apollo/client';
import { GET_VIDEO_INFO } from '../queries/playlist.queries';
import PieBreakdown from '../../../common/components/PieBreakdown';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
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
  const [monthTags, setMonthTags] = useState<any>({});

  const setVideos = () => {
    const { videos } = videoInfo;
    updateMonthTags(videos);
  };

  const { data: videoInfo } = useQuery(GET_VIDEO_INFO, {
    variables: {
      videoIds: props.location?.state?.playlistItems.map((item) => item.videoId) || [],
    },
    onCompleted: setVideos,
  });

  const updateYear = (year) => {
    setSelectedYear(year);
  };

  const updateMonthTags = (videos: PlaylistInterfaces.Video[]) => {
    const updatedTags = {};
    console.log(videos);
    videos.map((video, index) => {
      // Determine month based on when it was added to the playlist
      const videoMonth = DateTime.fromISO(playlistItems[index].publishedAt).toFormat('LLL');
      const currentMonthTags = monthTags[videoMonth] || [];
      const videoTags = video.tags || [];
      updatedTags[videoMonth] = [...currentMonthTags, ...videoTags];
    });
    setMonthTags(updatedTags);
  };

  const setPlaylistYears = (playlistItems: PlaylistInterfaces.PlaylistItem[]) => {
    setPlaylistItems(playlistItems);

    const playlistYears = playlistItems.map((item) => DateTime.fromISO(item.publishedAt).year.toString());
    const orderedYears = _.sortedUniq(playlistYears).reverse();
    setYears(orderedYears);
    setSelectedYear(orderedYears[0]);
    return playlistItems;
  };

  useEffect(() => {
    const playlistItems = props.location?.state?.playlistItems || [];
    setPlaylistYears(playlistItems);
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
          {selectedPlaylistItemDates.length > 0 ? (
            <CalendarTimeline dates={selectedPlaylistItemDates} content={monthTags} />
          ) : null}

          <PieBreakdown tags={monthTags['Nov']} />
        </section>
      </main>
    </Fragment>
  );
};

export default withRouter(PlaylistPage);
