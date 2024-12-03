export function startQuiz(state) {
  state.quizStart = true;
  state.quizTime = 0;
  state.quizStep = 1;
}

export function endQuiz(state, data) {
  state.quizStart = false;
}
export function updateQuizStat(state, data) {
  state.quizStart = data;
}
export function updateQuizTime(state, data) {
  state.quizTime = data;
}
export function updateQuizStep(state, data) {
  state.quizStep = data;
}
export function updateQuizQuestion(state, data) {
  state.quizQuestion = data;
}
export function updateQuizAnswer(state, data) {
  state.quizAnswer = data;
}
export function clearQuiz(state) {
  state.quizStart = false;
  state.quizTime = 0;
  state.quizStep = 1;
  state.quizQuestion = null;
  state.quizAnswer = null;
  state.quizEnd = true;
}
