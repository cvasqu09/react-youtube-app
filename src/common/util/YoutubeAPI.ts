import axios from 'axios';

export const YouTubeAPI = axios.create({
  baseURL: process.env['REACT_APP_YT_API_BASE_URL'],
  timeout: 1000,
});

export default YouTubeAPI;
