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
      playlistItems {
        title
        description
        videoId
        imageUrl
        publishedAt
      }
    }
  }
`;

export const GET_VIDEO_INFO = gql`
  query getVideoInfo($videoIds: [String!]!) {
    videos(videoIds: $videoIds) {
      id
      title
      channelId
      tags
    }
  }
`;
