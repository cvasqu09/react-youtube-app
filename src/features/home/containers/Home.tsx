import React, { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../../ui/Header';
import YearSelector from '../../../common/components/YearSelector';
import PlaylistItem from '../../../common/components/PlaylistItem';
import YouTubeAPI from '../../../common/util/YoutubeAPI';
import { Container } from 'semantic-ui-react';

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
        const responseItems = res.data[0].items.map((item) => ({
          publishedAt: item.snippet?.publishedAt,
          title: item.snippet?.title,
          description: item.snippet?.description,
          imageUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url,
          itemId: item.snippet?.resourceId?.videoId,
        }));
        console.log('repsonse items are ', responseItems);
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
