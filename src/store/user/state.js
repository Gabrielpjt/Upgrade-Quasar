import { getCredential } from '../../lib/storage';

const savedData = getCredential();

// Return initial state taken from LocalStorage/previous session
export default {
  accessToken: savedData.accessToken,
  refreshToken: savedData.refreshToken,
  rawProfile: savedData.rawProfile,
  lastApiActivity: savedData.lastApiActivity,
  tokenTimestamp: savedData.tokenTimestamp,
  session: {
    start: new Date()
  }
};
