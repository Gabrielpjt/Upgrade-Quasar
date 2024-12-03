import moment from 'moment';
import {
  setCredential,
  setRawProfile,
  setLastApiActivity,
  setTokenTimestamp,
  removeLocalStorage,
  setUserHighlight,
  setUserMobileInfo,
  setUserPic
} from '../../lib/storage';

export function login(context, payload) {
  setCredential(payload.accessToken, payload.refreshToken);
  context.commit('login', payload);
  context.dispatch('updateTokenTimestamp');
}

export function updateRawProfile(context, payload) {
  setRawProfile(payload);
  context.commit('updateRawProfile', payload);
}

export function logout(context) {
  removeLocalStorage();

  context.commit('logout');
}

export function updateLastApiActivity(context) {
  const now = moment().format();
  setLastApiActivity(now);
  context.commit('updateLastApiActivity', now);
}

export function updateTokenTimestamp(context) {
  const now = moment().format();
  setTokenTimestamp(now);
  context.commit('updateTokenTimestamp', now);
}

export function updateHighlight(context) {
  setUserHighlight(true);
  context.commit('updateHighlight');
}

export function updateMobileInfo(context) {
  setUserMobileInfo(true);
  context.commit('updateMobileInfo');
}

export function updatePic(context, data) {
  setUserPic(data);
  context.commit('updatePic', data);
}

export function resetDuration(context) {
  context.commit('resetDuration');
}

export function submitDuration(context, data) {
  context.commit('submitDuration', data);
}

export function submitDevice(context, data) {
  context.commit('submitDevice', data);
}
