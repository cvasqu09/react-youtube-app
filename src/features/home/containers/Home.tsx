import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import YearSelector from '../../../common/components/YearSelector';

import { DateTime } from 'luxon';
import YouTubeAPI from '../../../services/YoutubeAPI';
import PlaylistItem from '../../playlist/components/PlaylistItem';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin: 2rem;
`;

const Home = () => {
  const [playlistItems, setPlaylistItems] = useState<any[]>([]);

  useEffect(() => {
    new YouTubeAPI()
      .getPlaylistItems('PLV2t3EHAClRy01TRIECee90-5LXvEzxFU')
      .then((playlistItems) => {
        console.log('playlist item', playlistItems);
        setPlaylistItems(playlistItems);
      })
      .catch((err) => {
        console.log('error retrieving items', err);
      });
  }, []);

  return (
    <Fragment>
      <YearSelector />
      <StyledDiv>
        {playlistItems.map((item) => {
          return <PlaylistItem playlistItem={item} key={item.videoId} />;
        })}
      </StyledDiv>
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
