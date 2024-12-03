import { getCredential } from '../../lib/storage';

const savedData = getCredential();

export default function() {
  const quizStat = savedData.userQuiz;
  const user = savedData.rawProfile;
  return {
    //
    quizStart: quizStat ? quizStat.quiz_status : false,
    quizTime: quizStat ? quizStat.quiz_time : 0,
    quizStep: quizStat ? quizStat.quiz_step : 1,
    quizEnd: quizStat ? quizStat.quiz_end : false,
    quizQuestion: quizStat ? quizStat.quiz_question : null,
    quizAnswer: quizStat ? quizStat.quiz_answer : null,
    userQuiz: user
  };
}
