import { Dialog, Notify } from 'quasar';
import moment from 'moment';
import { uniqBy } from 'lodash';
import CryptoJS from 'crypto-js';
import { removeLocalStorage, getCredential } from './storage';

moment.locale('id');

export function base64ToFile(data, filename) {
  const BASE64_MARKER = ';base64,';
  let blob = null;

  if (data.indexOf(BASE64_MARKER) === -1) {
    const parts = data.split(',');
    const contentType = parts[0].split(':')[1];
    const raw = decodeURIComponent(parts[1]);
    blob = new Blob([raw], { type: contentType });
  } else {
    const parts = data.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; i++) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    blob = new Blob([uInt8Array], { type: contentType });
  }

  blob.name = filename;

  return blob;
}

function clearLocalStorageAndRedirectLogin(context, onEnd) {
  if (onEnd) {
    onEnd();
  }
  removeLocalStorage();
  context.$store.dispatch('user/logout');

  context.$router.push('/');

  context.$router.push('/login', () => {
    window.location.reload();
  });
}

function logout(context, onStart, onEnd) {
  if (onStart) {
    onStart();
  }

  clearLocalStorageAndRedirectLogin(context, onEnd);
}

export function executeLogout(context, onStart, onEnd) {
  logout(context, onStart, onEnd);
}

let privateContext;

export function setContext(newContext) {
  privateContext = newContext;
}

export function handleTokenError() {
  Notify.create({
    message: 'Token Expired',
    timeout: 500,
    type: 'warning',
    color: 'warning',
    icon: 'warning',
    detail: 'Please login'
  });

  executeLogout(privateContext);
}

function getChildren(list, parent) {
  if (!parent || !list || list.length < 1) {
    return null;
  }

  const children = list.filter(el => el.parent_id === parent.id);
  const others = list.filter(el => el.parent_id !== parent.id);

  if (children.length < 1) {
    return null;
  }

  for (let i = 0; i < children.length; i++) {
    const grandChildren = getChildren(others, children[i]);

    if (grandChildren && grandChildren.length > 0) {
      children[i].children = grandChildren;
    }
  }

  return children;
}

export function transformToTree(list) {
  if (!list || list.length < 1) {
    return null;
  }

  list = uniqBy(list, 'id');

  const roots = list.filter(el => !el.parent_id);
  const others = list.filter(el => !!el.parent_id);

  if (roots.length < 1) {
    return null;
  }

  const result = roots.map(r => {
    const children = getChildren(others, r);
    if (children && children.length > 0) {
      r.children = children;
    }

    return r;
  });

  return result;
}

export function timeCustom1(value) {
  return moment(value).format('HH:mm');
}

export function dateCustom1(value) {
  return moment(value).format('D MMMM YYYY');
}

export function dateFormat(value) {
  return moment(value).format('DD MMM YYYY');
}

export function dateFormatInsert(value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
}

export function timestampFormat(value) {
  return moment(value).format('LLLL');
}

export function getUserLogin() {
  return JSON.parse(localStorage.getItem('s_raw_profile').split('|').pop());
}
export function getLoginId() {
  return JSON.parse(localStorage.getItem('s_raw_profile').split('|').pop()).id;
}

export function getInitials(name) {
  const initial = toString(name).replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g);
  return initial;
}

export function capitalize(name) {
  const str = name;
  const arr = str.split(' ');
  arr.forEach((v, i) => {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  });
  const str2 = arr.join(' ');
  return str2;
}

export function getFormattedDate(date, prefomattedDate = false, hideYear = false, showHours = false) {
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    if (prefomattedDate === 'Today') {
      // Today at 10:20
      return `Today at ${hours}:${minutes}`;
    }
    // Yesterday at 10:20
    return `${prefomattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear && showHours) {
    // return 'a';
    return `${day} ${month} at ${hours}:${minutes}`;
  }

  if (hideYear && !showHours) {
    // return showHours;
    // 10. January at 10:20
    // return `${day}. ${month} at ${hours}:${minutes}`;
    return `${day} ${month}`;
  }

  // 10. January 2017. at 10:20
  // return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
  return `${day} ${month} ${year}`;
}

export function getFormattedTime(date, prefomattedDate = false, hideYear = false) {
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  // const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    if (prefomattedDate === 'Today') {
      // Today at 10:20
      return `${hours}:${minutes}`;
    }
    // Yesterday at 10:20
    return `${prefomattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    // 10. January at 10:20
    // return `${day}. ${month} at ${hours}:${minutes}`;
    return `${day} ${month}`;
  }

  // 10. January 2017. at 10:20
  // return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
  return `${hours}:${minutes}`;
}

export function datePost(dateParam, withHours = false) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ?
    dateParam :
    new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toLocaleString('en-US', { timeZone: 'Asia/Jakarta', dateStyle: 'short' }) === date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta', dateStyle: 'short' });
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 0) {
    return `soon at ${getFormattedDate(date)}`;
  } if (seconds < 60 && seconds > 0) {
    return 'now';
  } if (minutes < 60) {
    return `${minutes} minutes ago`;
  } if (isToday) {
    return getFormattedDate(date, 'Today'); // Today at 10:20
  } if (isYesterday) {
    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  } if (isThisYear && !withHours) {
    // return withHours;
    // return '2';
    return getFormattedDate(date, false, true); // 10. January at 10:20
  } if (isThisYear && withHours) {
    // return '1';
    return getFormattedDate(date, false, true, true);
  }
  return getFormattedDate(date); // 10. January 2017. at 10:20
}

export function validateDate(inputField) {
  const isValid = /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(inputField);
  return isValid;
}
export function validateTime(inputField) {
  const isValid = /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(inputField);
  return isValid;
}
export function deleteList(object, index) {
  object.splice(index, 1);
  return object;
}

export function extractHostname(url) {
  const url1 = url.toString();
  let hostname = null;
  // find & remove protocol (http, ftp, etc.) and get hostname
  if (url1.indexOf('//') > -1) {
    // eslint-disable-next-line prefer-destructuring
    hostname = url1.split('/')[2].split(':')[0].split('?')[0];
  } else {
    // eslint-disable-next-line prefer-destructuring
    hostname = url1.split('/')[0].split(':')[0].split('?')[0];
  }

  return hostname;
}
export function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const findUrl = text ? text.match(urlRegex) : false;
  const countWords = text ? text.split(' ').length : 0;
  const textLimit = countWords > 30 ? text.split(' ').slice(0, 30).join(' ').concat('....') : null;
  if (findUrl) {
    const link = findUrl[findUrl.length - 1];
    const textLink = text.replace(urlRegex, url => {
      return `<a href="${url}" target="_blank" style="color: #2C8ED3; line-break: anywhere">${url}</a>`;
    });
    const textLimitLink = countWords > 30 ? textLink.split(' ').slice(0, 30).join(' ').concat('....') : null;
    return {
      text: textLink,
      url: link,
      linkStatus: true,
      mainUrl: extractHostname(link),
      anyTextLimit: !!textLimit,
      textLimit: textLimitLink
    };
  }
  return {
    text,
    linkStatus: false,
    anyTextLimit: !!textLimit,
    textLimit
  };

  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

export function urlifyArticle(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const findUrl = text ? text.match(urlRegex) : false;
  const countWords = text ? text.split(' ').length : 0;
  const textLimit = countWords > 6 ? text.split(' ').slice(0, 6).join(' ').concat('....') : null;
  if (findUrl) {
    const link = findUrl[findUrl.length - 1];
    const textLink = text.replace(urlRegex, url => {
      return `<a href="${url}" target="_blank" style="color: #2C8ED3; line-break: anywhere">${url}</a>`;
    });
    const textLimitLink = countWords > 6 ? textLink.split(' ').slice(0, 6).join(' ').concat('....') : null;
    return {
      text: textLink,
      url: link,
      linkStatus: true,
      mainUrl: extractHostname(link),
      anyTextLimit: !!textLimit,
      textLimit: (textLimitLink !== null) ? textLimitLink.replace(/<img[^>]*>/g, '') : ''
    };
  }
  return {
    text,
    linkStatus: false,
    anyTextLimit: !!textLimit,
    textLimit: textLimit ? textLimit.replace(/<img[^>]*>/g, '') : null
  };
}

export function aesDecrypt(string) {
  const base64 = atob(string);
  return CryptoJS.AES.decrypt(base64, CryptoJS.enc.Utf8.parse('KMPortalWebsiteKPKinYear2022####'), {
    iv: CryptoJS.enc.Utf8.parse('KMPortalKMPortal'),
    mode: CryptoJS.mode.CBC
  }).toString(CryptoJS.enc.Utf8);
}

export function aesEncrypt(string) {
  const crypto = CryptoJS.AES.encrypt(string, CryptoJS.enc.Utf8.parse('KMPortalWebsiteKPKinYear2022####'), {
    iv: CryptoJS.enc.Utf8.parse('KMPortalKMPortal'),
    mode: CryptoJS.mode.CBC
  }).toString();
  return btoa(crypto);
}

export function checkRole() {
  const user = getCredential();
  const profile_user = JSON.parse(user.rawProfile);
  let currentRole = null;
  profile_user.roles.forEach((v, i) => {
    if (v.is_active === true) {
      currentRole = v;
    }
  });
  return currentRole;
}

export function getActivity(item) {
  let msg = item.activity;
  if (item.point < 0) {
    switch (item.tag) {
      case 'post_basic': msg = 'Lost a Post Basic Badge'; break;
      case 'post_intermediate': msg = 'Lost a Post Intermediate Badge'; break;
      case 'post_advance': msg = 'Lost a Post Advance Badge'; break;
      default: msg = 'Lost a Point';
    }
  }
  return msg;
}
export function notifMessage(item) {
  let msg = '';
  let training_type = '';
  let training_name = '';
  let training_eksternal = '';
  let reason_certificate = '';
  let reason_training = '';
  let event_name = '';
  let reason_event = '';
  // const user = getCredential();
  // const profile_user = JSON.parse(user.rawProfile);
  // && item.receiver_id === profile_user.id
  if (item.training) {
    training_type = item.training.training_type != null ? item.training.training_type : '';
    training_name = item.training.name != null ? item.training.name : '';
    if (item.training.participant.length !== 0) {
      const alasan = item.training.participant.filter(el => el.users_id === item.sender_id);
      if (alasan.length !== 0) {
        reason_training = alasan[0].alasan_ditolak != null ? alasan[0].alasan_ditolak : '';
      } else {
        reason_training = '';
      }
    }
  }
  if (item.certificate) {
    training_eksternal = item.certificate.name != null ? item.certificate.name : '';
    reason_certificate = item.certificate.reason != null ? item.certificate.reason : '';
  }
  if (item.event) {
    event_name = item.event.name != null ? item.event.name : '';
    reason_event = item.event.reason != null ? item.event.reason : '';
  }
  const sender_name = item.sender ? capitalize(item.sender.name.toLowerCase()) : '';
  if (item.type === 'Channel' && item.detail === 'Add' && item.channel !== null) {
    msg = `${sender_name} telah menambahkan Anda pada Channel ${item.channel.name}`;
  } else if (item.type === 'Channel' && item.detail === 'Request Channel') {
    msg = `${sender_name} telah bergabung pada channel ${capitalize(item.channel.name)}`; // meminta untuk
  } else if (item.type === 'Channel' && item.detail === 'Decline Channel') {
    msg = `Permintaan anda telah ditolak oleh admin channel ${capitalize(item.channel.name)}`;
  } else if (item.type === 'Channel' && item.detail === 'Approve Channel' && item.channel !== null) {
    msg = `Permintaan anda telah diterima oleh admin channel ${capitalize(item.channel.name)}`;
  } else if (item.type === 'Profile' && item.detail === 'Request Unit Kerja' && item.channel !== null) {
    msg = `Status anda di ${capitalize(item.channel.name)} sedang menunggu persetujuan`;
  } else if (item.type === 'Profile' && item.detail === 'Confirm Unit Kerja' && item.channel !== null) {
    msg = `Status anda di ${capitalize(item.channel.name)} telah disetujui`;
  } else if (item.type === 'Training' && item.detail === 'Register' && item.training !== null) {
    msg = `Saudara telah didaftarkan pada ${training_type} ${training_name}, silahkan klik untuk melakukan persetujuan`;
  } else if (item.type === 'Training' && item.detail === 'Permission' && item.training !== null) {
    msg = `Anda mendapat permohonan persetujuan mengikuti ${training_type} ${training_name}, klik untuk melihat detail`;
  } else if (item.type === 'Training' && item.detail === 'Approve' && item.training !== null) {
    msg = `Permohonan anda mengikuti ${training_type} ${training_name} telah disetujui atasan, anda telah terdaftar sebagai peserta`;
  } else if (item.type === 'Training' && item.detail === 'Decline' && item.training !== null) {
    if (reason_training === '') {
      msg = `Permohonan anda mengikuti ${training_type} ${training_name} telah ditolak atasan`;
    } else {
      msg = `Permohonan anda mengikuti ${training_type} ${training_name} telah ditolak atasan karena ${reason_training}`;
    }
  } else if (item.type === 'Training' && item.detail === 'Close' && item.training !== null) {
    msg = `Terima kasih telah mengikuti ${training_type} ${training_name}, silahkan klik untuk mengisi feedback dan mendapatkan poin.`;
  } else if (item.type === 'Training' && item.detail === 'Invite' && item.training !== null) {
    msg = `Anda telah diundang untuk mengikuti ${training_type} ${training_name}, klik untuk melihat detail`;
  } else if (['Moderator', 'Instructor', 'Speaker'].includes(item.detail) && item.post !== null) {
    msg = `${sender_name} telah mendaftarkan anda pada Event ${item.post.title} sebagai ${item.detail}`;
  } else if (item.type === 'Training' && item.detail === 'Cancel' && item.training !== null) {
    if (reason_training === '') {
      msg = `Anda telah dibatalkan untuk mengikuti ${training_type} ${training_name}`;
    } else {
      msg = `Anda telah dibatalkan untuk mengikuti ${training_type} ${training_name} karena ${reason_training}`;
    }
  } else if (item.type === 'Training' && item.detail === 'Reinvite' && item.training !== null) {
    msg = `${sender_name} telah di invite kembali untuk mengikuti ${training_type} ${training_name}`;
  // } else if (item.type === 'Training' && item.detail === 'Participant Approve' && item.training !== null) {
  //   msg = `${sender_name} telah bersedia untuk mengikuti ${training_type} ${training_name}`;
  } else if (item.type === 'Training' && item.detail === 'Participant Decline' && item.training !== null) {
    if (reason_training === '') {
      msg = `${sender_name} tidak bersedia untuk mengikuti ${training_type} ${training_name}`;
    } else {
      msg = `${sender_name} tidak bersedia untuk mengikuti ${training_type} ${training_name} karena ${reason_training}`;
    }
  } else if (item.type === 'Training' && item.detail === 'Kuota' && item.training !== null) {
    msg = `Maaf, Kuota ${training_type} ${training_name} telah habis`;
  } else if (item.type === 'Certificate' && item.detail === 'Request' && item.certificate !== null) {
    msg = `${sender_name} telah mengajukan persetujuan untuk mencantumkan ${training_eksternal} pada profilnya`;
  } else if (item.type === 'Certificate' && item.detail === 'Approve' && item.certificate !== null) {
    msg = `${sender_name} telah menyetujui untuk mencantumkan ${training_eksternal} pada profil anda`;
  } else if (item.type === 'Certificate' && item.detail === 'Decline' && item.certificate !== null) {
    if (reason_certificate === '') {
      msg = `${sender_name} telah menolak untuk mencantumkan ${training_eksternal} pada profil anda `;
    } else {
      msg = `${sender_name} telah menolak untuk mencantumkan ${training_eksternal} pada profil anda karena ${reason_certificate}`;
    }
  } else if (item.type === 'Speaker' && item.detail === 'Request' && item.event !== null) {
    msg = `${sender_name} telah mengajukan persetujuan untuk mencantumkan ${event_name} pada profilnya`;
  } else if (item.type === 'Speaker' && item.detail === 'Approve' && item.event !== null) {
    msg = `${sender_name} telah menyetujui untuk mencantumkan ${event_name} pada profil anda`;
  } else if (item.type === 'Speaker' && item.detail === 'Decline' && item.event !== null) {
    if (reason_event === '') {
      msg = `${sender_name} telah menolak untuk mencantumkan ${event_name} pada profil anda`;
    } else {
      msg = `${sender_name} telah menolak untuk mencantumkan ${event_name} pada profil anda karena ${reason_event}`;
    }
  } else if (item.type === 'Event' && item.detail === 'Absensi') {
    msg = `Silahkan isi absensi pada Event '${item.event.name}'`;
  } else if (item.type === 'Badge') {
    switch (item.detail) {
      case 'Top Post Basic': msg = 'Selamat, Anda telah mendapatkan Badge \'Top Post Basic\''; break;
      case 'Lost Top Post Basic': msg = 'Maaf, Anda telah kehilangan Badge \'Top Post Basic\''; break;
      case 'Top Post Intermediate': msg = 'Selamat, Anda telah mendapatkan Badge \'Top Post Intermediate\''; break;
      case 'Lost Top Post Intermediate': msg = 'Maaf, Anda telah kehilangan Badge \'Top Post Intermediate\''; break;
      case 'Top Post Advance': msg = 'Selamat, Anda telah mendapatkan Badge \'Top Post Advance\''; break;
      case 'Lost Top Post Advance': msg = 'Maaf, Anda telah kehilangan Badge \'Top Post Advance\''; break;
      case 'Speaker Basic': msg = 'Selamat, Anda telah mendapatkan Badge \'Speaker Basic\''; break;
      case 'Lost Speaker Basic': msg = 'Maaf, Anda telah kehilangan Badge \'Speaker Basic\''; break;
      case 'Speaker Intermediate': msg = 'Selamat, Anda telah mendapatkan Badge \'Speaker Intermediate\''; break;
      case 'Lost Speaker Intermediate': msg = 'Maaf, Anda telah kehilangan Badge \'Speaker Intermediate\''; break;
      case 'Speaker Advance': msg = 'Selamat, Anda telah mendapatkan Badge \'Speaker Advance\''; break;
      case 'Lost Speaker Advance': msg = 'Maaf, Anda telah kehilangan Badge \'Speaker Advance\''; break;
      case 'Knowledge Asset Basic': msg = 'Selamat, Anda telah mendapatkan Badge \'Knowledge Asset Basic\''; break;
      case 'Lost Knowledge Asset Basic': msg = 'Maaf, Anda telah kehilangan Badge \'Knowledge Asset Basic\''; break;
      case 'Knowledge Asset Intermediate': msg = 'Selamat, Anda telah mendapatkan Badge \'Knowledge Asset Intermediate\''; break;
      case 'Lost Knowledge Asset Intermediate': msg = 'Maaf, Anda telah kehilangan Badge \'Knowledge Asset Intermediate\''; break;
      case 'Knowledge Asset Advance': msg = 'Selamat, Anda telah mendapatkan Badge \'Knowledge Asset Advance\''; break;
      case 'Lost Knowledge Asset Advance': msg = 'Maaf, Anda telah kehilangan Badge \'Knowledge Asset Advance\''; break;
      case 'Expert Basic': msg = 'Selamat, Anda telah mendapatkan Badge \'Expert Basic\''; break;
      case 'Lost Expert Basic': msg = 'Maaf, Anda telah kehilangan Badge \'Expert Basic\''; break;
      case 'Expert Intermediate': msg = 'Selamat, Anda telah mendapatkan Badge \'Expert Intermediate\''; break;
      case 'Lost Expert Intermediate': msg = 'Maaf, Anda telah kehilangan Badge \'Expert Intermediate\''; break;
      case 'Expert Advance': msg = 'Selamat, Anda telah mendapatkan Badge \'Expert Advance\''; break;
      case 'Lost Expert Advance': msg = 'Maaf, Anda telah kehilangan Badge \'Expert Advance\''; break;
      case 'Learner Basic': msg = 'Selamat, Anda telah mendapatkan Badge \'Learner Basic\''; break;
      case 'Lost Learner Basic': msg = 'Maaf, Anda telah kehilangan Badge \'Learner Basic\''; break;
      case 'Learner Intermediate': msg = 'Selamat, Anda telah mendapatkan Badge \'Learner Intermediate\''; break;
      case 'Lost Learner Intermediate': msg = 'Maaf, Anda telah kehilangan Badge \'Learner Intermediate\''; break;
      case 'Learner Advance': msg = 'Selamat, Anda telah mendapatkan Badge \'Learner Advance\''; break;
      case 'Lost Learner Advance': msg = 'Maaf, Anda telah kehilangan Badge \'Learner Advance\''; break;
      default: msg = 'Selamat, Anda telah mencapai target!';
    }
  }
  if ((item.channel === null && item.channel_id !== null) || (item.training === null && item.training_id !== null) || (item.certificate === null && item.certificate_id !== null) || (item.type === 'Event' && item.post === null && item.post_id !== null) || (item.type === 'Speaker' && item.event === null && item.event_id !== null)) {
    msg = `${item.type} data is not available`;
  }
  return msg;
}

export function poinDesc(data) {
  let msg = '';
  if (data.ch_type !== null && data.module === 'Post') {
    if (data.activity === 'Post Content in General Channel' || data.activity === 'Post Content in Project Channel') {
      if (data.post_type === 'Post Document' || data.post_type === 'Post Image' || data.post_type === 'Post Video') {
        msg = `${data.post_type} in ${data.ch_type} Channel`;
      } else if (data.post_type === 'Post') {
        msg = `${data.post_type} Text in ${data.ch_type} Channel`;
      } else {
        msg = `Post ${data.post_type} in ${data.ch_type} Channel`;
      }
      if (data.point < 0) {
        switch (data.tag) {
          case 'post_project': msg = 'Deleted Post Content in Project Channel'; break;
          case 'post_general': msg = 'Deleted Post Content in General Channel'; break;
          default: msg = 'Lost a Point';
        }
      }
    } else {
      msg = data.activity;
      if (data.point < 0) {
        switch (data.tag) {
          case 'post_project_verified': msg = 'Post Content In Project Channel has been Unverified'; break;
          case 'post_general_verified': msg = 'Post Content In General Channel has been Unverified'; break;
          case 'post_reaction': msg = 'Unlike, Unlove Post'; break;
          case 'post_comment': msg = 'Deleted Comment Post'; break;
          default: msg = 'Lost a Point';
        }
      }
    }
  } else {
    msg = data.activity;
    if (data.point < 0) {
      switch (data.tag) {
        case 'post_basic': msg = 'Lost a Post Basic Badge'; break;
        case 'post_intermediate': msg = 'Lost a Post Intermediate Badge'; break;
        case 'post_advance': msg = 'Lost a Post Advance Badge'; break;
        case 'channel_follow_cop': msg = 'Unfollow Channel COP'; break;
        case 'channel_follow_project': msg = 'Unfollow Channel Project'; break;
        case 'channel_follow_hobby': msg = 'Unfollow Channel Hobby'; break;
        case 'channel_moderator': msg = 'Delete Channel or Not a Moderator Anymore'; break;
        case 'training_participant': msg = 'Not a Participant of Training Anymore'; break;
        case 'profile_certificate': msg = 'Delete Approved a Relevant Certificate'; break;
        case 'event_sme': msg = 'Not a SME Anymore'; break;
        case 'event_moderator': msg = 'Not an Event Moderator Anymore'; break;
        case 'event_participant': msg = 'Not an Event Participant Anymore'; break;
        case 'kmap_post_knowledge': msg = 'Delete Post From Knowledge'; break;
        case 'kmap_add_documentation': msg = 'Delete Dokumentasi Pengetahuan'; break;
        case 'kmap_add_best_practice': msg = 'Delete a Best Practice'; break;
        case 'kmap_add_development_needed': msg = 'Delete a Development Needed'; break;
        case 'kmap_add_article': msg = 'Delete KMap article'; break;
        case 'kmap_sme': msg = 'Not an Expert Anymore'; break;
        case 'expert_basic': msg = 'Lost an Expert Basic Badge'; break;
        case 'expert_intermediate': msg = 'Lost an Expert Intermediate Badge'; break;
        case 'expert_advance': msg = 'Lost an Expert Advance Badge'; break;
        case 'speaker_basic': msg = 'Lost a Speaker Basic Badge'; break;
        case 'speaker_intermediate': msg = 'Lost a Speaker Intermediate Badge'; break;
        case 'speaker_advance': msg = 'Lost a Speaker Advance Badge'; break;
        case 'learner_basic': msg = 'Lost a Learner Basic Badge'; break;
        case 'learner_intermediate': msg = 'Lost a Learner Intermediate Badge'; break;
        case 'learner_advance': msg = 'Lost a Learner Advance Badge'; break;
        case 'knowledge_basic': msg = 'Lost a Knowledge Asset Basic Badge'; break;
        case 'knowledge_intermediate': msg = 'Lost a Knowledge Asset  Intermediate Badge'; break;
        case 'knowledge_advance': msg = 'Lost a Knowledge Asset Advance Badge'; break;
        case 'training_expertise': msg = 'Not a Training Expertise Anymore'; break;
        case 'asn_smart': msg = 'Lost a Smart ASN Badge'; break;
        default: msg = 'Lost a Point';
      }
    }
  }
  return msg;
}

export function notifyOk(text) {
  Notify.create({
    message: text,
    timeout: 1000,
    type: 'positive',
    color: 'positive',
    icon: 'check'
  });
}
export function notifyOkRed(text) {
  Notify.create({
    message: text,
    timeout: 1000,
    type: 'positive',
    color: 'negative',
    icon: 'check'
  });
}
export function Confirm(text) {
  return Dialog.create({
    title: 'Confirm',
    message: text,
    cancel: true
  });
}
