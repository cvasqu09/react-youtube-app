import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    accessToken: null,
    error: null,
  },
  reducers: {
    accessTokenSetSuccess: (state, action) => {
      state.accessToken = action.payload;
    },
    accessTokenSetFailed: (state, action) => {
      state.error = action.payload;
    },
    usernameSet: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export const { accessTokenSetSuccess, accessTokenSetFailed, usernameSet } = userSlice.actions;

export function setAccessToken(token: string) {
  return async (dispatch) => {
    try {
      await localStorage.setItem('access-token', token);
      dispatch(accessTokenSetSuccess(token));
    } catch (e) {
      dispatch(accessTokenSetFailed(e.toString()));
    }
  };
}
