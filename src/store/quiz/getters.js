export function getQuizStatus(state) {
  return state.quizStart;
}
export function getQuizTime(state) {
  return state.quizTime;
}
export function getQuizStep(state) {
  return state.quizStep;
}
export function getQuizQuestion(state) {
  return state.quizQuestion;
}
export function getQuizAnswer(state) {
  return state.quizAnswer;
}
export function getQuizEnd(state) {
  return state.quizEnd;
}
export function getUserQuiz(state) {
  return JSON.parse(state.userQuiz);
}
