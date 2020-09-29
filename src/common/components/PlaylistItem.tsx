import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Container, Image } from 'semantic-ui-react';
import { motion } from 'framer-motion';
import { Card as MatCard, CardHeader } from '@material-ui/core';

const StyledDiv = styled(motion.div)`
  margin-bottom: 1rem;
`;

const StyledCard = styled(Card)`
  background-color: ;
`;

const PlaylistItem = (props) => {
  return (
    <StyledDiv
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeIn', duration: 0.45 }}
    >
      <MatCard>
        <CardHeader title={props.playlistItem.title} />
      </MatCard>

      <Card>
        <Image src={props.playlistItem.imageUrl} wrapped />
        <Card.Content>
          <Card.Header>{props.playlistItem.title}</Card.Header>
          <Card.Meta>{props.playlistItem.publishedAt}</Card.Meta>
        </Card.Content>
      </Card>
    </StyledDiv>
  );
};

PlaylistItem.propTypes = {
  playlistItem: PropTypes.shape({
    publishedAt: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    itemId: PropTypes.string,
  }),
};

export default PlaylistItem;
