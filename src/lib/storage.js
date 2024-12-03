import { LocalStorage } from 'quasar';

const KEY_RAW_PROFILE = 's_raw_profile';
const KEY_ACCESS_TOKEN = 's_access_token';
const KEY_REFRESH_TOKEN = 's_refresh_token';
const KEY_LAST_API_ACITIVITY = 's_last_api_activity';
const KEY_TOKEN_TIMESTAMP = 's_token_timestamp';
const KEY_QUIZ = 's_user_quiz';
const KEY_HIGHLIGHT = 's_user_highlight';
const KEY_MOBILE_INFO = 's_user_mobile_info';
const KEY_PIC = 's_user_pic';

function setOrRemove(storageKey, value) {
  if (value === null) {
    LocalStorage.remove(storageKey);
  } else {
    LocalStorage.set(storageKey, value);
  }
}

export function removeLocalStorage(key = null) {
  if (!key) {
    const localStorage = LocalStorage.getAll();
    Object.keys(localStorage).forEach(k => {
      LocalStorage.remove(k);
    });
  }
}

export function setCredential(accessToken, refreshToken) {
  setOrRemove(KEY_ACCESS_TOKEN, accessToken);
  setOrRemove(KEY_REFRESH_TOKEN, refreshToken);
}

export function setRawProfile(data) {
  setOrRemove(KEY_RAW_PROFILE, data);
}

export function setLastApiActivity(lastApiActivity) {
  setOrRemove(KEY_LAST_API_ACITIVITY, lastApiActivity);
}

export function setTokenTimestamp(tokenTimestamp) {
  setOrRemove(KEY_TOKEN_TIMESTAMP, tokenTimestamp);
}

export function getCredential() {
  return {
    accessToken: LocalStorage.getItem(KEY_ACCESS_TOKEN),
    refreshToken: LocalStorage.getItem(KEY_REFRESH_TOKEN),
    rawProfile: LocalStorage.getItem(KEY_RAW_PROFILE),
    lastApiActivity: LocalStorage.getItem(KEY_LAST_API_ACITIVITY),
    tokenTimestamp: LocalStorage.getItem(KEY_TOKEN_TIMESTAMP),
    userQuiz: LocalStorage.getItem(KEY_QUIZ),
    userHighlight: LocalStorage.getItem(KEY_HIGHLIGHT),
    userMobileInfo: LocalStorage.getItem(KEY_MOBILE_INFO),
    userPic: LocalStorage.getItem(KEY_PIC)
  };
}

export function setUserQuiz(data) {
  setOrRemove(KEY_QUIZ, data);
}

export function setUserHighlight(data) {
  setOrRemove(KEY_HIGHLIGHT, data);
}

export function setUserMobileInfo(data) {
  setOrRemove(KEY_MOBILE_INFO, data);
}

export function setUserPic(data) {
  setOrRemove(KEY_PIC, data);
}
