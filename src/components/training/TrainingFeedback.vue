<template>
  <q-page class="page" window-height window-width row justify-center items-center>
    <div class="row full-height justify-center" :class="this.$q.platform.is.mobile ? 'q-pa-none' : 'q-pa-xl'" v-if="!isLoad">
      <q-card class="card-shadow" style="max-width: 750px">
        <q-card-section style="color: white; background: #7145bc">
          <div class="text-center q-pt-lg q-pb-lg">
            <div class="text-h4">Form Evaluasi Penyelenggara Pelatihan {{ dataTraining.name || '' }}</div>
            <div class="text-subtitle1 q-mt-sm" style="line-height: 1.2 !important">Berikut formulir evaluasi penyelenggara pelatihan yang diberikan untuk internal KPK guna mengetahui dan menilai penyelenggara pelatihan selama kegiatan berlangsung.</div>
          </div>
        </q-card-section>

        <q-card-section>
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            alternative-labels
            animated
            keep-alive
          >
            <!-- <q-step
              :name="1"
              title=""
              caption="Page 1 - Biodata"
              prefix="1"
              :done="step > 1"
            >
              <Feedback1 ref="page1" :data="dataPage1" />
            </q-step> -->

            <q-step
              :name="1"
              title=""
              caption="Page 1 - Materi"
              prefix="1"
              :done="step > 1"
            >
              <Feedback2 ref="page1" :data="dataPage1" />
            </q-step>

            <q-step
              :name="2"
              title=""
              caption="Page 2 - Pengajar atau Narasumber"
              prefix="2"
              :done="step > 2"
            >
              <Feedback3 ref="page2" :trainingId="trainingId" :data="dataPage2" />
            </q-step>

            <q-step
              :name="3"
              title=""
              caption="Page 3 - Penyelenggara"
              prefix="3"
              :done="step > 3"
            >
              <Feedback4 ref="page3" :data="dataPage3" />
            </q-step>

            <q-step
              :name="4"
              title=""
              caption="Page 4 - Self Assessment"
              prefix="4"
              :done="step > 4"
            >
              <Feedback5 ref="page4" :data="dataPage4" />
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation class="row" :class="step === 1 ? 'justify-end' : 'justify-between'" style="margin-top: 24px">
                <q-btn v-if="step > 1" @click="$refs.stepper.previous()" color="dark" label="Back" />
                <q-spinner color="primary" size="2em" v-if="isLoading" />
                <q-btn @click="onNext" color="dark" :label="step === 4 ? 'Finish' : 'Next'" v-else />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
// import { trainingDetail, trainingFeedbackLoad, trainingFeedbackCreate, trainingFeedbackCheckPage, trainingFeedbackCheckPoin } from '../../lib/api';
import { trainingDetail, trainingFeedbackLoad, trainingFeedbackCreate, trainingFeedbackCheckPage } from '../../lib/api';
import { point } from '../../lib/point';
import { getLoginId, aesDecrypt } from '../../lib/helper';

// import Feedback1 from './feedback/Feedback1.vue';
import Feedback2 from './feedback/Feedback2.vue';
import Feedback3 from './feedback/Feedback3.vue';
import Feedback4 from './feedback/Feedback4.vue';
import Feedback5 from './feedback/Feedback5.vue';

export default {
  components: { Feedback2, Feedback3, Feedback4, Feedback5 },
  data() {
    return {
      isLoading: false,
      isLoad: true,
      trainingId: null,
      step: 1,
      dataTraining: {},
      dataPage1: null,
      dataPage2: null,
      dataPage3: null,
      dataPage4: null,
      dataPage5: null
    };
  },
  mounted() {
    if (!this.$store.getters['user/isAuthenticated']) {
      this.$router.push({ name: 'login', query: { feedback: this.$route.query.token } });
    } else {
      this.onPageLoad();
      this.onGetFirstData();
    }
  },
  methods: {
    onPageLoad() {
      const { token } = this.$route.query;
      if (!token) {
        this.$router.push('/');
      } else {
        const cipherDec = aesDecrypt(token);
        if (!cipherDec) {
          this.$router.push('/');
        } else {
          const objParse = JSON.parse(cipherDec);
          this.trainingId = objParse.trainingId;

          // trainingFeedbackLoad(this.trainingId, 4)
          //   .then(response => {
          //     if (response && response.message === 'OK') {
          //       this.$router.push({ path: '/training/feedback/thankyou', query: { token } });
          //     } else {
          //       this.onGetFirstData();
          //     }
          //   });

          trainingFeedbackCheckPage(this.trainingId)
            .then(response => {
              if (response && response.message === 'OK') {
                this.$router.push({ path: '/training/feedback/thankyou', query: { token } });
              } else {
                this.onGetFirstData();
              }
            });
        }
      }
    },
    onGetFirstData() {
      trainingDetail(this.trainingId)
        .then(response => {
          if (response && response.message === 'OK' && response.data.status === 'closed' && response.data.registered === 1) {
            this.dataTraining = response.data;
            this.isLoad = false;
          } else {
            this.$router.push('/');
            if (response.data.registered === 0) {
              this.$q.notify({
                message: 'Maaf, anda tidak bisa mengisi feedback karena anda bukan peserta training',
                timeout: 1000,
                type: 'negative',
                color: 'negative',
                icon: 'warning'
              });
            }
          }
        });
      setTimeout(() => {
        trainingFeedbackLoad(this.trainingId, 1)
          .then(response => {
            if (response && response.message === 'OK') this.dataPage1 = response.data;
          });
      }, 200);
    },
    onNext() {
      const { form } = this.$refs[`page${this.step}`];
      if (this.step === 1 || this.step === 3 || this.step === 4) {
        const sumRatingValue = form.rating_star.filter(item => item.value !== 0).length;
        if (sumRatingValue !== form.rating_star.length || form.lembaga_penyelenggara === '') {
          this.invalidForm();
        } else {
          this.onSave();
        }
      } else if (this.step === 2) {
        const filterRating = form.rating_star.map(item => item.rating.length);
        const filterRatingValue = form.rating_star.map(item => item.rating.filter(subItem => subItem.value !== 0));
        const sumRating = filterRating.reduce((a, b) => a + b, 0);
        const sumRatingValue = Object.values(filterRatingValue).flat().length;
        if (sumRatingValue !== sumRating) {
          this.invalidForm();
        } else if (form.rating_star.length === 0) {
          this.$q.notify({
            message: 'Materi harus diisi',
            timeout: 1000,
            type: 'negative',
            color: 'negative',
            icon: 'warning'
          });
        } else {
          this.onSave();
        }
      }
    },
    onSave() {
      this.isLoading = true;
      const { form } = this.$refs[`page${this.step}`];
      const data = {
        ...form,
        training_id: this.trainingId,
        page: this.step
      };
      // let check_poin = false;
      // trainingFeedbackCheckPoin(this.trainingId)
      //   .then(res => {
      //     if (res && res.message === 'OK') {
      //       check_poin = false;
      //     } else {
      //       check_poin = true;
      //     }
      //   });
      trainingFeedbackCreate(data)
        .then(response => {
          if (response.message === 'OK') {
            this.onLoad();
            if (this.step !== 4) {
              this.$refs.stepper.next();
            } else {
              // if (check_poin === true) {
              point('add', { tag: 'training_participant', training_id: this.trainingId, account_id: getLoginId() });
              // }
              this.$router.push({ path: '/training/feedback/thankyou', query: { token: this.$route.query.token } });
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onLoad() {
      trainingFeedbackLoad(this.trainingId, this.step + 1)
        .then(response => {
          if (response && response.message === 'OK') {
            this[`dataPage${this.step}`] = { ...response.data, status: true };
          } else {
            this[`dataPage${this.step}`] = { status: false };
          }
        });
    },
    invalidForm() {
      this.$q.notify({
        message: 'Field berbintang wajib di isi',
        timeout: 1000,
        type: 'negative',
        color: 'negative',
        icon: 'warning'
      });
    }
  }
};
</script>

<style>
body {
  font-family: Inter;
}
.page {
  background: url('../../assets/images/back.png') center / cover
}
.q-stepper {
  background: unset;
  box-shadow: unset;
}
.q-stepper__header--border {
  border-bottom: unset
}
.q-stepper__header--alternative-labels .q-stepper__tab {
  padding: 24px 0px;
}
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 24px 24px 24px 24px;
}
.instruction {
  color: #939393;
  margin-top: 3px;
  font-size: 11px;
  overflow: visible !important;
  line-height: 1.5;
}
.instruction.italic {
  font-style: italic;
}
.card-shadow {
  box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
  -webkit-box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
  -moz-box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
}
</style>
