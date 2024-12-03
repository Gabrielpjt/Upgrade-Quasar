import { userSubmitDevice, userSubmitDuration } from 'src/lib/api';

export function login(state, { accessToken, refreshToken }) {
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
}

export function updateRawProfile(state, data) {
  state.rawProfile = data;
}

export function logout(state, payload) {
  state.accessToken = null;
  state.refreshToken = null;
  state.rawProfile = null;
  state.lastApiActivity = null;
  state.tokenTimestamp = null;
}

export function updateLastApiActivity(state, data) {
  state.lastApiActivity = data;
}

export function updateTokenTimestamp(state, data) {
  state.tokenTimestamp = data;
}

export function updateHighlight(state) {
  state.highlight = true;
}

export function updateMobileInfo(state) {
  state.mobileInfo = true;
}

export function resetDuration(state) {
  state.session = {
    ...state.session,
    start: new Date()
  };
}

export function submitDuration(state, data) {
  if (Object.keys(JSON.parse(state.rawProfile)).length > 0) {
    const dataPost = {
      ...data,
      user_id: JSON.parse(state.rawProfile).id,
      duration_s: (new Date() - state.session.start) / 1000,
      token: state.accessToken
    };
    userSubmitDuration(dataPost).then();
  }
}

export function submitDevice(state, data) {
  const dataPost = {
    ...data,
    user_id: JSON.parse(state.rawProfile).id
  };
  userSubmitDevice(dataPost).then();
}
