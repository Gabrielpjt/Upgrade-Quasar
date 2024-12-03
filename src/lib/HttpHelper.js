import axios from 'axios';
import { Notify } from 'quasar';
import { forEach } from 'lodash';
import { getCredential } from './storage';
import { handleTokenError } from './helper';
import store from '../store';

// ***********************************************
// * PLEASE CHANGE FOLLOWING CONFIG in .env file *
// ***********************************************
export const baseApiUrl = process.env.QUASAR_API_URL;
export const baseEleaningApiUrl = process.env.ELEARNING_API_URL;
export const baseEleaningApiToken = process.env.ELEARNING_API_TOKEN;
export const baseWebUrl = process.env.QUASAR_API_URL;
const GET_TIMEOUT = 200000; // <-- todo : set default 20000
const POST_TIMEOUT = 120000;
const DOWNLOAD_TIMEOUT = 120000;

function isRedirectLogin(errorCode) {
  if (
    errorCode === 469 ||
    errorCode === 467 ||
    errorCode === 471 ||
    errorCode === 472
  ) {
    return true;
  }
  return false;
}

function UnexpectedError(message, details) {
  this.message = message;
  this.details = details;
}

export function commonHttpErrorHandler(error, showErrorNotification) {
  let errorTitle = `Error: ${error.name} - ${error.message}`;
  let errorMessage = '';
  if (error.response) {
    // The request was made and the server responded with a status code that falls
    // out of the range of 2xx
    errorTitle = `Error ${error.response.status}`;

    if (isRedirectLogin(error.response.status)) {
      return handleTokenError();
    }
    if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    if (error.response.data && error.response.data.errors) {
      const errorData = error.response.data.errors;
      const errorKeys = Object.keys(errorData);
      for (let i = 0; i < errorKeys.length; i++) {
        let temp = '';
        const details = errorData[errorKeys[i]];

        for (let j = 0; j < details.length; j++) {
          temp += `${details[j]}. `;
        }
        errorMessage += `${errorKeys[i]}: ${temp}`;
      }
    }

    if (!errorMessage) {
      errorMessage = JSON.stringify(error.response.data);
      errorMessage = errorMessage.substring(
        0,
        Math.min(errorMessage.length, 100)
      );
    }
  } else if (/^timeout of .*ms exceeded$/.test(error.message)) {
    errorTitle = 'Error: Timeout';
    errorMessage = `Gagal memperoleh response setelah ${GET_TIMEOUT} ms`;
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = JSON.stringify(error);
    errorMessage = errorMessage.substring(
      0,
      Math.min(errorMessage.length, 100)
    );
  }

  if (showErrorNotification) {
    Notify.create({
      message: errorMessage,
      type: 'negative',
      color: 'negative',
      icon: 'warning',
      detail: errorTitle,
      position: 'center',
      actions: [
        { icon: 'close', color: 'white', handler: () => { /* ... */ } }
      ],
      timeout: 60000
    });
  }
  throw error;
}

export function commonHttpSuccessHandler(start, { data }) {
  if (data && !data.errors) {
    return data;
  }
  throw new UnexpectedError('Server Error', data);
}

export function getHeader({
  isMultipartForm = false,
  useAuthHeader = true,
  bearerTokenOverride = null,
  accept = 'application/json'
}) {
  let obj;
  if (isMultipartForm) {
    obj = {
      'Content-Type': 'multipart/form-data'
    };
  } else {
    obj = {
      'Content-Type': 'application/json',
      Accept: accept
    };
  }

  if (bearerTokenOverride) {
    obj.Authorization = `Bearer ${bearerTokenOverride}`;
  } else if (useAuthHeader && getCredential().accessToken != null) {
    obj.Authorization = `Bearer ${getCredential().accessToken}`;
    obj['x-access-id'] = getCredential().currentAccessId;
  }

  return obj;
}

export function get({
  path,
  params = {},
  cacheConfig = null,
  useAuthHeader = true,
  acceptHeader = 'application/json',
  bearerTokenOverride = null,
  showErrorNotification = true,
  markAsActivity = true
}) {
  if (markAsActivity) {
    store({}).dispatch('user/updateLastApiActivity');
  }

  return axios({
    baseURL: baseApiUrl,
    url: path,
    method: 'GET',
    params,
    headers: {
      ...getHeader({
        isMultipartForm: false,
        useAuthHeader,
        bearerTokenOverride
      }),
      Accept: acceptHeader
    },
    timeout: GET_TIMEOUT
  })
    .then(({ data }) => {
      console.log('HTTP Helper', data);
      if (data.data && !data.errors) {
        return data;
      }

      throw new UnexpectedError('Server Error', data);
    })
    .catch(error => {
      console.log('error', error);
      // return commonHttpErrorHandler(error, showErrorNotification);
    })
    .finally(() => {

    });
}

export function post({
  path,
  params = {},
  useAuthHeader = true,
  isMultipartForm = false,
  showErrorNotification = true,
  timeout = null,
  markAsActivity = true
}) {
  if (markAsActivity) {
    store({}).dispatch('user/updateLastApiActivity');
  }
  const start = Date.now();
  return axios
    .post(baseApiUrl + path, params, {
      headers: getHeader({ isMultipartForm, useAuthHeader }),
      timeout: timeout || POST_TIMEOUT
    })
    .then(response => commonHttpSuccessHandler(start, response))
    .catch(error => commonHttpErrorHandler(error, showErrorNotification));
}

export function put({
  path,
  params = {},
  useAuthHeader = true,
  isMultipartForm = false,
  showErrorNotification = true,
  markAsActivity = true
}) {
  if (markAsActivity) {
    store({}).dispatch('user/updateLastApiActivity');
  }
  const start = Date.now();
  return axios
    .put(baseApiUrl + path, params, {
      headers: getHeader({ isMultipartForm, useAuthHeader }),
      timeout: POST_TIMEOUT
    })
    .then(response => commonHttpSuccessHandler(start, response))
    .catch(error => commonHttpErrorHandler(error, showErrorNotification));
}

export function del({
  path,
  params = {},
  useAuthHeader = true,
  isMultipartForm = false,
  showErrorNotification = true,
  markAsActivity = true
}) {
  if (markAsActivity) {
    store({}).dispatch('user/updateLastApiActivity');
  }
  const start = Date.now();
  return axios({
    url: baseApiUrl + path,
    method: 'delete',
    params,
    headers: getHeader({ isMultipartForm, useAuthHeader }),
    timeout: POST_TIMEOUT
  })
    .then(response => commonHttpSuccessHandler(start, response))
    .catch(error => commonHttpErrorHandler(error, showErrorNotification));
}

export function upload(url, bodyFormData, useAuthHeader = true) {
  const start = Date.now();
  return axios
    .post(baseApiUrl + url, bodyFormData, {
      headers: getHeader({ isMultipartForm: true, useAuthHeader }),
      timeout: POST_TIMEOUT
    })
    .then(response => commonHttpSuccessHandler(start, response))
    .catch(commonHttpErrorHandler);
}

export function download({
  fullPath,
  method = 'GET',
  path,
  params = {},
  useAuthHeader = true,
  markAsActivity = true,
  showErrorNotification = true
}) {
  if (markAsActivity) {
    store({}).dispatch('user/updateLastApiActivity');
  }
  // const start = Date.now();
  return axios({
    baseURL: fullPath || baseApiUrl + path,
    path,
    method,
    params,
    headers: getHeader({ isMultipartForm: false, useAuthHeader }),
    timeout: DOWNLOAD_TIMEOUT,
    responseType: 'blob'
  })
    .then(response => {
      // reportTrackTiming(start, response);
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;

      const headerKey = Object.keys(response.headers).find(
        key => key.toLowerCase() === 'content-disposition'
      );
      const header = headerKey ? response.headers[headerKey] : null;
      let filename = 'file';

      if (header) {
        const startIndex = header.indexOf('filename=');
        const endIndex = header.length;
        if (startIndex > -1) {
          filename = header.substring(startIndex + 9, endIndex);
          console.log('>> filename', filename);
          if (filename[0] === '"') {
            filename = filename.substring(1);
          }
          if (filename[filename.length - 1] === '"') {
            filename = filename.substring(0, filename.length - 1);
          }
        }
      }

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      return response;
    })
    .catch(commonHttpErrorHandler);
}

export function downloadPdf({
  fullPath,
  method = 'GET',
  path,
  params = {},
  useAuthHeader = true,
  markAsActivity = true
}) {
  if (markAsActivity) {
    store({}).dispatch('user/updateLastApiActivity');
  }
  // const start = Date.now();
  return axios({
    baseURL: fullPath || baseApiUrl + path,
    path,
    method,
    params,
    headers: getHeader({ isMultipartForm: false, useAuthHeader }),
    timeout: DOWNLOAD_TIMEOUT,
    responseType: 'blob'
  })
    .then(response => {
      // reportTrackTiming(start, response);
      return response.data;
    })
    .catch(commonHttpErrorHandler);
}

export function getQUploaderParams({ path, fieldName, params }) {
  const formFields = [];
  let headers = [];

  if (params) {
    forEach(params, (value, key) => {
      formFields.push({
        name: key,
        value
      });
    });
  }

  const credential = getCredential();

  if (credential.accessToken != null) {
    headers = [
      {
        name: 'Authorization',
        value: `Bearer ${credential.accessToken}`
      },
      {
        name: ['x-access-id'],
        value: credential.currentAccessId
      }
    ];
  }

  return {
    url: baseApiUrl + path,
    method: 'POST',
    headers,
    fieldName,
    formFields
  };
}
