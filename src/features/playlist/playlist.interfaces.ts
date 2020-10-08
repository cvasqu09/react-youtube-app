export interface Playlist {
  publishedAt: string;
  title: string;
  numberOfVideos: number;
  description: string;
  imageUrl: string;
  id: string;
}

export interface PlaylistItem {
  publishedAt: string;
  title: string;
  description: string;
  videoId: string;
  imageUrl: string;
}
