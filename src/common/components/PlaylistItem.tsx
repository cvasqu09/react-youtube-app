import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Container, Image } from 'semantic-ui-react';

const PlaylistItem = (props) => {
  return (
    <Container>
      <Card>
        {/*<Image src={props.playlistItem.publishedAt} wrapped />*/}
        <Image src="https://i.ytimg.com/vi/uFP68oPdiVo/hqdefault.jpg" wrapped />
        <Card.Content>
          {/*<Card.Header>{props.playlistItem.title}</Card.Header>*/}
          {/*<Card.Meta>{props.playlistItem.publishedAt}</Card.Meta>*/}
          {/*<Card.Description>{props.playlistItem.description}</Card.Description>*/}
          <Card.Header>Ta-ku Ft. Alina Baraz - Down For You</Card.Header>
          <Card.Meta>2016-12-07T01:44:45Z</Card.Meta>
          <Card.Description>
            Ta-ku ft. Alina Baraz - Down For You\r\n\r\nSongs To Make Up To: itunes:
            http://futr.cl/SongsToMakeUpTo\r\nspotify: http://futr.cl/SongsToMakeUpToSpotify\r\nyoutube:
            http://futr.cl/Ta-kuYoutube\r\n\r\nI make music…: https://soundcloud.com/takugotbeats\r\n\r\nI take photos…:
            https://instagram.com/takubeats\r\n\r\nFounder of Team Cozy: https://instagram.com/team_cozy\r\n\r\nFounder
            of Create & Explore: http://www.c
          </Card.Description>
        </Card.Content>
      </Card>
    </Container>
  );
};

PlaylistItem.propTypes = {
  playlistItem: {
    publishedAt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    itemId: PropTypes.string,
  },
};

export default PlaylistItem;
