import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import YearSelector from '../../../common/components/YearSelector';
import PlaylistItem from '../../../common/components/PlaylistItem';
import YouTubeAPI from '../../../common/util/YoutubeAPI';
import { DateTime } from 'luxon';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin: 2rem;
`;

const Home = () => {
  const [playlistItems, setPlaylistItems] = useState<any[]>([]);

  useEffect(() => {
    YouTubeAPI.get('/playlistItems')
      .then((res) => {
        console.log('response is', res);
        const responseItems = res.data[0].items
          .filter((item) => item.snippet.description !== 'This video is private.')
          .map((item) => ({
            publishedAt: DateTime.fromISO(item.snippet?.publishedAt).toLocaleString(DateTime.DATETIME_MED),
            title: item.snippet?.title,
            description: item.snippet?.description,
            imageUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url,
            itemId: item.snippet?.resourceId?.videoId,
          }));
        console.log('response items are ', responseItems);
        setPlaylistItems(responseItems);
      })
      .catch((err) => {
        console.log('Error while retrieving playlist items', err.toString());
      });
  }, []);

  return (
    <Fragment>
      <YearSelector />
      <StyledDiv>
        {playlistItems.map((item) => (
          <PlaylistItem playlistItem={item} key={item.itemId} />
        ))}
      </StyledDiv>
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
