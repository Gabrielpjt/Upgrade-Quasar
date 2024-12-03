<template>
  <q-page class="page" window-height window-width row justify-center items-center>
    <div class="q-pa-xl row full-height justify-center" v-if="!isLoad">
      <q-card class="card-shadow" style="min-width: 750px">
        <q-card-section style="background: #FFFFFF">
          <div class="text-center q-pt-lg q-pb-lg">
            <img src="~assets/images/feedback-success.png" width="70px" height="70px" />
            <div class="q-pt-sm text-h5">Thank you! Your response has been submitted.</div>
            <div class="text-subtitle1">
              You earn point from this training:
              <q-spinner-dots color="primary" size="1.5em" v-if="isPointLoading" />
              <span class="text-bold" v-else>{{ earnPoint }}</span>
            </div>
            <div class="q-pt-md">
              <q-btn
                outline
                rounded
                color="primary"
                label="Back to training dashboard"
                icon="chevron_left"
                @click="onAddAnotherResponse"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { trainingDetail, getPointActivityByTag } from '../lib/api';
import { aesDecrypt } from '../lib/helper';

export default {
  data() {
    return {
      isLoad: true,
      isPointLoading: true,
      trainingId: null,
      earnPoint: 0
    };
  },
  mounted() {
    const { token } = this.$route.query;
    if (!token) {
      this.$router.push('/');
    } else {
      const cipherDec = aesDecrypt(token);
      if (!cipherDec) {
        this.$router.push('/');
      } else {
        this.isLoad = false;
        const objParse = JSON.parse(cipherDec);
        this.trainingId = objParse.trainingId;
        this.getTraining();
      }
    }
  },
  methods: {
    onAddAnotherResponse() {
      this.$router.push('/training');
    },
    async getTraining() {
      const { data } = await trainingDetail(this.trainingId);
      const { data: { point } } = await getPointActivityByTag('training_participant');

      const sumPoint = (data.jam_pelatihan / 20) * point;
      this.earnPoint = sumPoint;

      if (!Number.isNaN(parseFloat(sumPoint))) {
        const [a, b] = sumPoint.toString().split('.');
        if (b <= 5) this.earnPoint = a;
        if (b > 5) this.earnPoint = parseInt(a, 10) + 1;
      }

      setTimeout(() => {
        this.isPointLoading = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
body {
  font-family: Inter;
}
.page {
  background: url('../assets/images/back.png') center / cover
}
.card-shadow {
  box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
  -webkit-box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
  -moz-box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
}
</style>
