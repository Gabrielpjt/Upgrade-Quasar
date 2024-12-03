/*
export function someMutation (state) {
}
*/

import { date } from 'quasar';

export function updateAllMemberList(state, data) {
  data.forEach(x => {
    if (!state.all_member_list.includes(x)) {
      state.all_member_list.push(x);
    }
  });
}
export function updateOfflineAllMemberList(state, data) {
  state.all_member_list = state.all_member_list.filter(x => x !== data);
}
export function resetMemberOnlineList(state, data) {
  state.member_online_list = [];
}
export function updateMemberOfflineList(state, data) {
  state.member_online_list = state.member_online_list.filter(x => x !== data);
}
export function updateMemberOnlineList(state, data) {
  data.forEach(x => {
    if (state.member_online_list.find(y => y.id === x.id) === undefined) {
      state.member_online_list.push(x);
    }
  });
}
export function updateMemberList(state, data) {
  state.member_list = data;
}
export function updateOnlineStatusMemberList(state, data) {
  state.member_list = state.member_list.map((x, i) => {
    if (x.id === data.id) x.is_online = data.is_online;
    return x;
  });
}
export function updateMessageListByMessageId(state, data) {
  if (state.message_list.filter(x => x.message_id === data.message_id).length === 0) {
    const newChat = state.message_list;
    newChat.push({ ...data });
    state.message_list = newChat;
  } else {
    state.message_list = state.message_list.map((x, i) => {
      if (x.message_id === data.message_id) {
        const newChat = x.chat;
        newChat.push({ ...data.chat[0], prev_user_id: x.chat.slice(-1)[0].created_by.id });
        x.chat = newChat;
      }
      return x;
    });
  }
}
export function updateMessageListRead(state, data) {
  state.message_list = state.message_list.map(x => {
    if (x.message_id === parseInt(data.message_id, 10)) {
      x.chat = x.chat.map(y => {
        if (y.read_users
          .replace('{', '')
          .replace('}', '')
          .split(',')
          .length > 1) return y;
        const new_read_users = `${y.read_users
          .replace('{', '')
          .replace('}', '')},${data.user_id}`;
        return { ...y, read_users: `{${new_read_users}}` };
      });
    }
    return x;
  });
}
export function deleteMessageById(state, data) {
  state.message_list = state.message_list.map(x => {
    if (x.message_id === parseInt(data.message_id, 10)) {
      x.chat = x.chat.map(y => {
        if (y.id === data.id) {
          const deleted_date = new Date();
          return { ...y, deleted_at: date.formatDate(deleted_date, 'YYYY-MM-DDTHH:mm:ss.SSSZ') };
        }
        return y;
      });
    }
    return x;
  });
}
export function updateMessageListClear(state, data) {
  state.message_list = state.message_list.filter(x => x.message_id !== data.message_id);
}
export function updateMessageList(state, data) {
  state.message_list = data;
}
export function updateListenStatus(state, data) {
  state.is_listen = data;
}
export function clearData(state) {
  state.all_member_list = [];
  state.member_list = [];
  state.message_list = [];
  state.is_listen = false;
}
