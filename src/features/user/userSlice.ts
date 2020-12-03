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
    logoutSuccess: (state) => {
      state.accessToken = null;
      state.username = null;
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  accessTokenSetSuccess,
  accessTokenSetFailed,
  usernameSet,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;

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

export function clearAccessToken() {
  return async (dispatch) => {
    try {
      await localStorage.setItem('access-token', '');
      dispatch(logoutSuccess());
    } catch (e) {
      dispatch(logoutFailure(e.message));
    }
  };
}
