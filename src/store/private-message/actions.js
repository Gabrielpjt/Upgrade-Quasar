/*
export function someAction (context) {
}
*/
export function updateAllMemberList(context, payload) {
  context.commit('updateAllMemberList', payload);
}
export function updateOfflineAllMemberList(context, payload) {
  context.commit('updateOfflineAllMemberList', payload);
}
export function updateMemberList(context, payload) {
  context.commit('updateMemberList', payload);
}
export function updateOnlineStatusMemberList(context, payload) {
  context.commit('updateOnlineStatusMemberList', payload);
}
export function resetMemberOnlineList(context, payload) {
  context.commit('resetMemberOnlineList', payload);
}
export function updateMemberOnlineList(context, payload) {
  context.commit('updateMemberOnlineList', payload);
}
export function updateMemberOfflineList(context, payload) {
  context.commit('updateMemberOfflineList', payload);
}
export function updateMessageListByMessageId(context, payload) {
  context.commit('updateMessageListByMessageId', payload);
}
export function updateMessageListClear(context, payload) {
  context.commit('updateMessageListClear', payload);
}
export function updateMessageList(context, payload) {
  context.commit('updateMessageList', payload);
}
export function deleteMessageById(context, payload) {
  context.commit('deleteMessageById', payload);
}
export function updateMessageListRead(context, payload) {
  context.commit('updateMessageListRead', payload);
}
export function updateListenStatus(context, payload) {
  context.commit('updateListenStatus', payload);
}
export function clearData(context) {
  context.commit('clearData');
}
