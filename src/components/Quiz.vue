<template>
  <div class="q-py-md items-start">
    <div class="row q-pb-md">
      <div class="col-8 kmp-font-lg kmp-font-bold">SMART Quiz</div>
      <div class="col-4 text-right kmp-text-grey-1 kmp-font-md q-pt-xs">Question {{ step }} of {{ size }}</div>
    </div>
<!--    {{ source }} | {{ data.map(m => { return m.trueAnswer; }).join(',') }} | {{ checkTrue }}-->
<!--    <br />-->
<!--    {{ question }} | {{ data.map(m => { return m.id; }).join(',') }}-->
<!--    <br />-->
<!--    {{ stat }} {{ number }} {{ choice }} {{ counter }} | {{ startQuiz }} {{ step }} {{ quizTime }}-->
<!--    <br />-->
<!--    {{ userQuiz }}-->
    <q-card hidden class="my-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="row full-width q-px-none">
          <div class="col-1 q-pl-sm">1.</div>
          <div class="col-9 kmp-font-bold" style="font-size: 15px">
            Manakah dibawah ini yang bukan merupakn bahasa pemrograman?
          </div>
          <div class="col-2 text-right">
            <div class="row">
              <q-space/>
              <div class="point-info">+50 pts</div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-px-xs">
        <div class="row full-width q-px-none">
          <div class="col-1 q-pl-sm"></div>
          <div class="col-11" style="font-size: 15px">
            <q-list v-for="(item, index) in options" :key="index">
              <q-item
                dense
                class="q-pl-none q-py-none"
                :class="(item.selected && answerBool) ? 'list-true': ((item.selected && !answerBool) ? 'list-false' : '')"
                tag="label"
                v-ripple>
                <q-radio v-model="group" dense class="q-mx-sm" :val="item.value" color="primary"/>
                <q-item-section>
                  <q-item-label>{{ item.label }}</q-item-label>
                </q-item-section>
                <q-item-section side v-if="item.selected && answerBool">
                  <q-icon name="check" style="color: #56B635"></q-icon>
                </q-item-section>
                <q-item-section side v-else-if="item.selected && !answerBool">
                  <q-icon name="close" style="color: #EA2D5A"></q-icon>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-px-xs">
        <div class="row full-width q-px-none">
          <div class="col-1 q-pl-sm"></div>
          <div class="col-11 text-right" style="font-size: 15px">
            <q-btn class="q-mx-sm" color="primary" label="Submit" @click="handleSave"/>
            <!--        <q-btn color="primary" outline label="Next Question" @click="handleNext" />-->
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card">
      <div v-if="loading">
        <q-item class="kmp-profile-item-list">
          <q-item-section class="q-py-md">
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label>
              <q-skeleton type="text"/>
            </q-item-label>
            <q-item-label>
              <q-skeleton type="text" width="50%" />
            </q-item-label>
            <q-item-label>
              <q-skeleton type="text" width="50%" />
            </q-item-label>
            <q-item-label>
              <q-skeleton type="text" width="50%" />
            </q-item-label>
            <q-item-label>
              <q-skeleton type="text" width="50%" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div v-if="!loading && !startQuiz">
        <q-card-section v-show="data.length" class="q-pa-none cursor-pointer" v-on:click="handleStart">
          <q-img style="border-radius: 8px;"
                 :src="require(`../assets/images/quiz-start.png`)"
          />
<!--          <q-btn push color="negative" size="35px" label="START" @click="handleStart"></q-btn>-->
        </q-card-section>
        <q-card-section v-show="!data.length" class="q-py-xl row justify-center">
          <q-btn push color="negative" size="35px" label="NO QUESTION"></q-btn>
        </q-card-section>
      </div>
      <div v-if="!loading && startQuiz">
        <q-card-section v-if="quizSubmit && quizTime < 1" class="q-pa-none">
          <q-img style="border-radius: 8px;"
                 :src="require(`../assets/images/quiz-finish.png`)"
          />
        </q-card-section>
        <q-card-section v-else-if="quizSubmit && quizTime > 0" class="q-py-xl">
          <div class="row justify-center">You've answered all questions in {{ quizTime }} seconds</div>
          <div class="row justify-center text-h6">You're score {{ score }}</div>
          <div class="row justify-center">( Finish Quiz : {{ scoreQuiz }} + True Choice : {{ quizTrue * 2 }} {{ quizTime > threshold_time ? '' : '+ Bonus Time : 2' }} )</div>

          <q-list v-for="(item, index) in data" :key="index" class="q-pa-sm">
              <div class="row items-center q-pb-none">
                <div class="row full-width q-px-none">
                  <div class="col kmp-font-bold" style="font-size: 15px">
                    {{ `${index + 1}. ` }}{{ item.question }}
                  </div>
                </div>
              </div>
              <div class="row full-width q-px-none">
                <div class="col q-pl-sm" style="font-size: 15px">
                  <q-list v-for="(choice, index) in item.options" :key="index" class="q-mb-sm">
                    <q-item
                      dense
                      class="q-pl-none q-py-none"
                      :class="(choice.id === item.answer) ?  'list-choice': ((choice.id === item.trueAnswer) ? 'list-true' : '')"
                      tag="label"
                      v-ripple>
                      <q-radio v-model="item.answer" dense class="q-mx-sm" :val="choice.value" color="primary"/>
                      <q-item-section>
                        <q-item-label>{{ choice.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side v-if="choice.id === item.trueAnswer">
                        <q-icon name="check" style="color: #56B635"></q-icon>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </q-list>
        </q-card-section>
        <q-card-section v-else class="q-pa-none">
          <q-stepper v-model="step"
                     ref="stepper"
                     alternative-labels
                     color="primary"
                     animated
          >
            <q-step v-for="(item, index) in data" :key="index"
                    :name="index + 1"
                    :title="`Question ${index + 1}`"
                    icon="settings"
                    :done="step > (index + 1)"
                    class="q-pa-xs-none"
            >
              <q-card-section class="row items-center q-pb-none">
                <div class="row full-width q-px-none">
                  <div class="col-1 q-pl-sm">{{ `${index + 1}.` }}</div>
                  <div class="col-9 kmp-font-bold" style="font-size: 15px">
                    {{ item.question }}
                  </div>
                  <div class="col-2 text-right">
                    <div class="row">
                      <q-space/>
                      <div class="point-info">+2 pts</div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-px-xs">
                <div class="row full-width q-px-none">
                  <div class="col-1 q-pl-sm"></div>
                  <div class="col-11" style="font-size: 15px">
                    <q-list v-for="(choice, index) in item.options" :key="index">
                      <q-item
                        dense
                        class="q-pl-none q-py-none"
                        :class="(choice.selected && answerBool) ? 'list-true': ((choice.selected && !answerBool) ? 'list-false' : '')"
                        tag="label"
                        v-ripple>
                        <q-radio v-model="item.answer" dense class="q-mx-sm" :val="choice.value" color="primary"/>
                        <q-item-section>
                          <q-item-label>{{ choice.label }}</q-item-label>
                        </q-item-section>
                        <q-item-section side v-if="item.selected && answerBool">
                          <q-icon name="check" style="color: #56B635"></q-icon>
                        </q-item-section>
                        <q-item-section side v-else-if="item.selected && !answerBool">
                          <q-icon name="close" style="color: #EA2D5A"></q-icon>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
              </q-card-section>
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation class="row justify-center">
                <q-btn outline v-if="step > 1" color="primary" @click="$refs.stepper.previous()" label="Back" class="q-mr-sm" />
                <q-btn @click="handleContinue" :disabled="disableButton(step)" color="primary" :label="step === 3 ? 'Submit' : 'Next'" />
              </q-stepper-navigation>
            </template>
          </q-stepper>
          <div class="absolute-bottom-right" style="padding: 0px 16px 24px 0px;">
            <div :class="quizTime > 45 ? 'timer-bonus' : 'timer-info'">{{ minutes }} : {{ seconds }}</div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
import { Notify } from 'quasar';
import { required } from 'vuelidate/lib/validators';
import { popQuizList, popQuizParticipantCreate, popQuizParticipantList, profileUpdate } from 'src/lib/api';
import { getLoginId } from 'src/lib/helper';
import { point } from 'src/lib/point';
import { existingStore as store } from 'src/store';
import bus from 'components/common/EventBus';

export default {
  data() {
    return {
      user: {
        id: getLoginId()
      },
      startQuiz: false,
      answer: 'Jawa',
      answerBool: '',
      group: '',
      options: [
        { label: 'Java', value: 'Java', selected: false },
        { label: 'Jawa', value: 'Jawa', selected: false },
        { label: 'Delphi', value: 'Delphi', selected: false },
        { label: 'Cobol', value: 'Cobol', selected: false }
      ],
      loading: true,
      step: 1,
      size: 3,
      data: [],
      source: null,
      quizSubmit: false,
      quizTime: 0,
      quizTrue: 0,
      intervalId: 0,
      minutes: '00',
      seconds: '00',
      score: 0,
      threshold_time: 45
    };
  },
  validations: {
    group: {
      required
    }
  },
  methods: {
    handleSave() {
      if (this.$v.$invalid) {
        Notify.create({
          message: 'Please choice one!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        this.options.forEach(f => {
          if (f.value === this.group) {
            f.selected = true;
          } else {
            f.selected = false;
          }
        });
        const choice = this.options.filter(f => {
          return f.selected === true;
        });
        if (choice[0].value === this.answer) {
          this.answerBool = true;
        } else {
          this.answerBool = false;
        }
        Notify.create({
          message: 'Thank to join this Quiz!',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
      }
    },
    handleNext() {
      if (this.$v.$invalid) {
        Notify.create({
          message: 'Please choice one!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        Notify.create({
          message: 'Let\'s get into the next question',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
      }
    },
    handleStart() {
      this.startQuiz = true;
      this.startTimer();
      this.$store.dispatch('quiz/startQuiz');
      const questionId = this.data.map(m => {
        return m.id;
      }).join(',');
      this.$store.dispatch('quiz/updateQuizQuestion', questionId);
    },
    disableButton(idx) {
      const index = idx - 1;
      const cek = this.data.length ? this.data[index].answer : false;
      return !cek;
    },
    handleContinue() {
      if (this.step === this.size) {
        this.quizSubmit = true;
        this.handleSubmit();
      } else {
        this.$refs.stepper.next();
        const answer = this.data.filter(f => { return f.answer !== null; }).map(m => {
          return m.answer;
        }).join(',');
        this.$store.dispatch('quiz/updateQuizAll', { step: this.step, time: this.counter, answer, question: this.question });
      }
    },
    async handleSubmit() {
      await clearInterval(this.intervalId);
      const { data } = this;
      const dataParam = data.map(m => {
        return { value: m.answer, login_id: this.user.id, loop: m.loop };
      });
      await profileUpdate(this.user.id, { quiz_status: false, quiz_duration: null, quiz_step: null, quiz_answer: null, quiz_question: null }).then();
      await popQuizParticipantCreate({
        multiple_quiz_participant: dataParam,
        quiz_duration: this.quizTime,
        quiz_true: this.checkTrue
      }).then(res => {
        // console.log(res);
      });
      this.quizTrue = this.checkTrue;
      const score = (this.scoreQuiz) + (this.checkTrue * 2) + (this.quizTime <= this.threshold_time ? 2 : 0);
      this.score = score;

      // add point quiz finish
      await point('add', { tag: 'quiz_finished', pop_quiz_id: null })
        .then(() => {
          // add point quiz score
          this.data.forEach(async f => {
            if (f.trueAnswer === f.answer) {
              await point('add', { tag: 'quiz_answer', pop_quiz_id: f.id });
            }
          });
        })
        .then(() => {
          // add point quiz bonus time
          if (this.quizTime <= this.threshold_time) point('add', { tag: 'quiz_bonus_time', pop_quiz_id: null });
        });

      await this.$store.dispatch('quiz/clearQuiz');
      setTimeout(() => {
        bus.$emit('update_nav');
      }, 1000);
    },
    cekParticipant() {
      const param = { users_id: getLoginId() };
      popQuizParticipantList(param).then(res => {
        if (res.message === 'OK') {
          this.loading = false;
          this.startQuiz = true;
          this.quizSubmit = true;
          this.step = this.size;
        } else {
          this.getQuestion();
        }
      }).catch(err => {
        this.getQuestion();
      });
    },
    getQuestion() {
      if (this.question) {
        const param = { quiz_id: this.question };
        popQuizList(param).then(res => {
          if (res.message === 'OK' && res.data.length > 0) {
            this.loading = false;
            const quiz = res.data.map(m => {
              m.options = m.quiz_choice.map(m1 => {
                return { id: m1.id, label: m1.text, value: m1.id };
              });
              m.trueAnswer = m.quiz_choice.filter(f1 => {
                return f1.correct === true;
              })[0].id;
              return { id: m.id, question: m.question, options: m.options, answer: null, btnContinue: false, loop: m.loop, trueAnswer: m.trueAnswer };
            });
            this.data = quiz;

            this.getQuizStatus();
          } else {
            this.loading = false;
            this.startQuiz = false;
            this.quizSubmit = false;
            this.step = 1;
            this.data = [];
          }
        });
      } else {
        popQuizList().then(res => {
          if (res.message === 'OK' && res.data.length > 0) {
            this.loading = false;
            const quiz = res.data.map(m => {
              m.options = m.quiz_choice.map(m1 => {
                return { id: m1.id, label: m1.text, value: m1.id };
              });
              m.trueAnswer = m.quiz_choice.filter(f1 => {
                return f1.correct === true;
              })[0].id;
              return { id: m.id, question: m.question, options: m.options, answer: null, btnContinue: false, loop: m.loop, trueAnswer: m.trueAnswer };
            });
            const items = quiz.slice(0, this.size);
            this.data = items;

            this.getQuizStatus();
          } else {
            this.loading = false;
            this.startQuiz = false;
            this.quizSubmit = false;
            this.step = 1;
            this.data = [];
          }
        });
      }
    },
    getQuizStatus() {
      if (this.userQuiz.quiz_status && !this.stat) {
        this.source = 'database';
        this.startQuiz = this.userQuiz.quiz_status;
        this.step = this.userQuiz.quiz_step;
        this.quizTime = this.userQuiz.quiz_duration;
        setTimeout(() => {
          if (this.startQuiz && this.quizTime > 0) this.startTimer(this.quizTime);
        }, 500);
      } else {
        this.source = 'localsto';
        this.startQuiz = this.stat;
        this.step = this.number;
        if (this.data.length && this.choice) {
          const data_answer = this.choice.split(',');
          data_answer.forEach((x, i) => {
            this.data[i].answer = parseFloat(x);
          });
        }
        setTimeout(() => {
          if (this.startQuiz && this.counter > 0) this.startTimer(this.counter);
        }, 500);
      }
    },
    startTimer(duration) {
      let timer = duration > 0 ? duration : 0;
      this.intervalId = setInterval(() => {
        timer += 1;
        this.minutes = parseInt(timer / 60, 10);
        this.seconds = parseInt(timer % 60, 10);

        this.minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        this.seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;

        this.quizTime = timer;
        this.$store.dispatch('quiz/updateQuizAll', { time: timer, step: this.number, answer: this.choice, question: this.question });
      }, 1000);
    }
  },
  computed: {
    counter() {
      return this.$store.getters['quiz/getQuizTime'];
    },
    stat() {
      return this.$store.getters['quiz/getQuizStatus'];
    },
    number() {
      return this.$store.getters['quiz/getQuizStep'];
    },
    choice() {
      return this.$store.getters['quiz/getQuizAnswer'];
    },
    question() {
      return this.$store.getters['quiz/getQuizQuestion'];
    },
    checkTrue() {
      if (this.choice) {
        let cek = 0;
        const trueAnswer = this.data.map(m => { return m.trueAnswer; });
        // const answer = this.choice.split(',');
        const answer = this.data.filter(f => { return f.answer !== null; }).map(m => {
          return m.answer;
        });
        answer.forEach(f => {
          if (trueAnswer.includes(parseFloat(f))) {
            cek += 1;
          }
        });
        return cek;
      }
      return null;
    },
    userQuiz() {
      const user = this.$store.getters['user/profile'];
      let data_answer = null;
      if (user && user.quiz_status) {
        if (!this.stat) {
          this.$store.dispatch('quiz/updateQuizStep', user.quiz_step);
          this.$store.dispatch('quiz/updateQuizAnswer', user.quiz_answer);
          this.$store.dispatch('quiz/updateQuizQuestion', user.quiz_question);
          if (this.data.length && user.quiz_answer) {
            data_answer = user.quiz_answer.split(',');
            data_answer.forEach((x, i) => {
              this.data[i].answer = parseFloat(x);
            });
          }
        }
      }
      return {
        quiz_status: user ? user.quiz_status : false,
        quiz_duration: user ? user.quiz_duration : null,
        quiz_step: user ? user.quiz_step : null
      };
    },
    scoreQuiz() {
      const cek = store.getters['gamification/activityByTag']('quiz_finished');
      return cek.point;
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalId);
  },
  mounted() {
    this.cekParticipant();
  }
};
</script>

<style lang="sass" scoped>
.title-outer-card-left
  font-size: 20px
  font-weight: bold

.title-outer-card-right
  font-size: 20px

.point-info
  padding: 4px 8px 4px 9px
  text-align: center
  background: #EFFFEA
  border-radius: 4px
  color: #56B635
  width: auto !important

.timer-info
  font-size: 18px
  padding: 4px 8px 4px 9px
  text-align: center
  background: #ffb4ca
  border-radius: 4px
  color: #B63535FF
  width: auto !important

.timer-bonus
  font-size: 18px
  padding: 4px 8px 4px 9px
  text-align: center
  background: #cdffb4
  border-radius: 4px
  color: #4db635
  width: auto !important

.list-true
  background-color: #EFFFEA
  border-radius: 4px

.list-false
  background-color: #FFF1F4
  border-radius: 4px

.list-choice
  background-color: #ccd2ff
  border-radius: 4px

</style>
<style>
.q-stepper {
  box-shadow: none;
}
.q-stepper__header {
  display: none !important;
}
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 0px !important;
}
</style>
