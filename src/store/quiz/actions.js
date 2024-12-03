import { removeLocalStorage, setUserQuiz } from 'src/lib/storage';

export function startQuiz(context) {
  setUserQuiz({ quiz_status: true, quiz_time: 0, quiz_step: 1 });
  context.commit('startQuiz');
}
export function endQuiz(context) {
  context.commit('endQuiz');
}
export function updateQuizAll(context, payload) {
  setUserQuiz({ quiz_status: true, quiz_time: payload.time, quiz_step: payload.step, quiz_answer: payload.answer, quiz_question: payload.question });
  context.commit('updateQuizStat', true);
  context.commit('updateQuizTime', payload.time);
  context.commit('updateQuizStep', payload.step);
  context.commit('updateQuizAnswer', payload.answer);
  context.commit('updateQuizQuestion', payload.question);
}
export function updateQuizTime(context, payload) {
  setUserQuiz({ quiz_status: true, quiz_time: payload });
  context.commit('updateQuizTime', payload);
}
export function updateQuizStep(context, payload) {
  context.commit('updateQuizStep', payload);
}
export function updateQuizQuestion(context, payload) {
  context.commit('updateQuizQuestion', payload);
}
export function updateQuizAnswer(context, payload) {
  context.commit('updateQuizAnswer', payload);
}
export function clearQuiz(context) {
  removeLocalStorage('s_user_quiz');
  // setUserQuiz({ quiz_end: true });
  context.commit('clearQuiz');
}
