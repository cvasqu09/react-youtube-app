import { gql } from '@apollo/client';

export const GET_PLAYLISTS = gql`
  query getPlaylists {
    playlists {
      id
      publishedAt
      title
      description
      numberOfVideos
      imageUrl
    }
  }
`;
