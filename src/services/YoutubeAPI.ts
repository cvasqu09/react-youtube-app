import axios from 'axios';
import { Playlist, PlaylistItem, Video } from '../features/playlist/playlist.interfaces';

const YouTubeAPIInstance = axios.create({
  baseURL: process.env['REACT_APP_YT_API_BASE_URL'],
  timeout: 1000,
});

export class YouTubeAPI {
  private apiInstance = YouTubeAPIInstance;
  private MAX_RESULTS = 25;

  async getPlaylists(): Promise<Playlist[]> {
    const res = await this.apiInstance.get('/playlists', {
      params: {
        maxResults: this.MAX_RESULTS,
        mine: true,
        part: 'snippet,contentDetails',
      },
    });
    console.log('getPlaylists results', res);
    return res.data.items.map((item) => ({
      publishedAt: item.snippet.publishedAt,
      title: item.snippet.title,
      description: item.snippet.description,
      numberOfVideos: item.contentDetails.itemCount,
      imageUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      id: item.id,
    }));
  }

  async getPlaylistItems(playlistId: string): Promise<PlaylistItem[]> {
    const res = await this.apiInstance.get('/playlistItems', {
      params: {
        playlistId: playlistId,
        part: 'snippet',
        mine: true,
        maxResults: this.MAX_RESULTS,
      },
    });

    console.log('getPlaylistItems', res);
    return res.data[0].items
      .filter((item) => !item.snippet.title.includes('Private video'))
      .map((item) => ({
        publishedAt: item.snippet.publishedAt,
        title: item.snippet.title,
        description: item.snippet.description,
        videoId: item.snippet.resourceId.videoId,
        imageUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      }));
  }

  async getVideoInfo(playlistItems: PlaylistItem[]): Promise<Video[]> {
    const videoIds = playlistItems.map((item) => item.videoId);
    const res = await this.apiInstance.get('/videos', {
      params: {
        id: videoIds.join(','),
        part: 'snippet',
        maxResults: this.MAX_RESULTS,
      },
    });

    console.log('videos', res);

    return res.data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      channelId: item.snippet.channelId,
      tags: item.snippet.tags,
      addedAt: playlistItems.find((playlistItem) => playlistItem.videoId === item.id)?.publishedAt,
    }));
  }
}

export default YouTubeAPI;
