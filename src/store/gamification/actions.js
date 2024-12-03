/*
export function someAction (context) {
}
*/
export function updateActivity(context, payload) {
  context.commit('updateActivity', payload);
}
export function updateConfig(context, payload) {
  context.commit('updateConfig', payload);
}
