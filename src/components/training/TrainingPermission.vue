<template>
  <q-page class="page" window-height window-width row justify-center items-center>
    <div
      class="row items-center full-width"
      style="height: 100vh"
    >
      <div class="col-12 column items-center q-px-lg">
        <div class="q-pa-md row q-gutter-md">
          <q-card>
            <q-card-section  class="bg-primary" v-if="isLoadingDetail">
              <div class="text-center q-pt-md q-pb-md">
                <q-skeleton height="50px" square />
              </div>
            </q-card-section>
            <q-card-section  class="bg-primary" v-else>
              <div class="text-center q-pt-md q-pb-md">
                <div class="header">Form Pengajuan Izin</div>
                <div class="header">{{ dataTraining.training_type }} {{ dataTraining.name }}</div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-lg q-pb-lg" v-if="isLoadingDetail">
              <q-skeleton height="85px" square />
            </q-card-section>
            <q-card-section class="q-pt-lg q-pb-lg" v-else>
              <div v-if="check_participant == 0 && dataTraining.status == 'open_registration' && !isQuota  && this.limit_date == false">
                <div class="text-neutral">Nama Atasan Langsung</div>
                <q-select
                  v-model="atasan_id"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  @filter="filterAtasan"
                  :options="atasan_option"
                  :option-value="'id'"
                  :option-label="'name'"
                  name="atasan_option"
                  dense
                  outlined
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <div class="row">
                  <q-checkbox
                    v-model="agree"
                    color="blue"
                    label="Bersedia mengikuti seluruh rangkaian proses belajar mengajar dan tata tertib dalam pelatihan ini."
                    true-value="yes"
                    false-value="no"
                    right-label
                  />
                </div>
                <div class="row" style="padding-left: 6%">
                  <div v-if="agree == 'yes'">
                    <span>Setelah pelatihan saya akan :</span>
                    <li>Membuat laporan peserta diklat</li>
                    <li>Sharing pengetahuan hasil diklat</li>
                    <li>Mempraktikkan hasil diklat</li>
                  </div>
                </div>
              </div>
              <div class="alert q-pt-lg q-pb-lg" style="text-align:center" v-if="check_participant == 0 && dataTraining.status == 'open_registration' && isQuota">Maaf, anda tidak bisa melakukan permohonan izin karena kuota telah habis</div>
              <div class="alert q-pt-lg q-pb-lg" style="text-align:center" v-if="check_participant == 0 && dataTraining.status == 'close_registration'">Maaf, anda tidak bisa melakukan permohonan izin karena training telah ditutup</div>
              <div class="alert q-pt-lg q-pb-lg" style="text-align:center" v-if="check_participant == 0 && dataTraining.status == 'draft'">Maaf, anda belum bisa melakukan permohonan izin</div>
              <div class="alert q-pt-lg q-pb-lg" style="text-align:center" v-if="check_participant == 0 && dataTraining.status == 'closed'">'Maaf, anda tidak bisa melakukan permohonan izin karena training telah berakhir</div>
              <div class="alert q-pt-lg q-pb-lg" style="text-align:center" v-if="check_participant == 0 && dataTraining.status == 'open_registration' && this.limit_date == true">Maaf, anda tidak bisa melakukan permohonan izin karena telah melewati batas tanggal permohonan izin</div>
              <div class="alert q-pt-lg q-pb-lg" style="text-align:center" v-if="check_participant == 1">Anda sudah melakukan permohonan izin</div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right" class="text-primary q-pt-sm" v-if="isLoadingDetail">
              <q-skeleton height="30px" width="90px" square />
            </q-card-actions>
            <q-card-actions align="right" class="text-primary q-pt-sm" v-else>
              <q-btn
                class="btn-primary-color"
                label="Kirim"
                v-if="check_participant == 0 && dataTraining.status == 'open_registration' && !isQuota  && this.limit_date == false"
                unelevated
                @click="registerTraining()"
                :disable="agree == 'no'"
              />
              <q-btn
                class="q-ml-sm q-mr-sm btn-primary-color"
                :label="check_participant == 0 && dataTraining.status == 'open_registration' && !isQuota  && this.limit_date == false !== 0 ? 'Batal' : 'Kembali ke dashboard'"
                text-color="white"
                @click="onAddAnotherResponse"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
<!--  </q-responsive>-->
</template>

<style>
body{
  font-family: Inter;
}
/* .page {
  background: url('../../assets/images/back.png');
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: relative;
} */
.my-card {
  position: relative;
  /*width: 50vw;*/
  width: 475px;
  /* height: 300px; */
  min-height: 275px;
  /*left: calc(50% - 130vh/2);*/
  /*top: calc(50% - 90vh/2);*/
  border-radius: 8px;
}
.page {
  background: url('../../assets/images/back.png') center / cover
}
.header{
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  color: white;
}
.alert{
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  color: grey;
}
</style>

<script>
import { getCredential } from 'src/lib/storage';
import { checkRole } from 'src/lib/helper';
import { Notify } from 'quasar';
import moment from 'moment';
import { aesDecrypt } from '../../lib/helper';
import {
  trainingRegister,
  trainingRedirectLoad,
  trainingDetail,
  getAtasanUser
} from '../../lib/api';

export default {
  data() {
    return {
      dataTraining: {},
      maximun_capacity: '',
      total_participant: '',
      total_participant_personal: '',
      training_id: '',
      check_participant: 0,
      registered: 0,
      limit_date: '',
      atasan_id: '',
      atasan_option: [],
      isLoadingDetail: 1,
      agree: 'no'
    };
  },
  computed: {
    isQuota() {
      return this.total_participant_personal === this.maximun_capacity;
    }
  },

  methods: {
    onAddAnotherResponse() {
      this.$router.push('/training');
    },
    filterAtasan(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }
      update(() => {
        getAtasanUser({ keyword: val.toLowerCase() }).then(response => {
          const hasil = response.data;
          this.atasan_option = hasil.map(item => {
            return {
              id: item.id,
              name: item.name
            };
          });
        });
      });
    },
    registerTraining() {
      if (this.atasan_id.length === 0) {
        Notify.create({
          message: 'Mohon pilih atasan',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      if (this.atasan_id.id === this.user.id) {
        Notify.create({
          message: 'Maaf, anda tidak mengirim permintaan izin',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      const data = {
        atasan_id: this.atasan_id.id,
        enabled: true,
        url_detail: `${window.location.origin}/training/detail?token=`
      };
      // const { token } = this.$route.query;
      trainingRegister(this.training_id, data).then(response => {
        this.$q.notify({
          message: 'Sukses melakukan permohonan izin',
          color: 'blue'
        });
        this.$router.push('/');
        // this.onGetFirstData();
        // this.$router.push({
        //   name: 'training'
        // }).catch(() => {});
      });
    },
    onPageLoad() {
      const { token } = this.$route.query;
      if (!token) {
        this.$router.push('/');
      } else {
        const cipherDec = aesDecrypt(token);
        if (!cipherDec) {
          this.$router.push('/');
        } else {
          this.onGetFirstData();
        }
      }
    },
    onGetFirstData() {
      const { token } = this.$route.query;
      this.isLoadingDetail = true;
      trainingRedirectLoad(token)
        .then(response => {
          if (response && response.message === 'OK') {
            this.training_id = response.data.training_id;
            trainingDetail(this.training_id).then(res => {
              this.isLoadingDetail = false;
              this.dataTraining = res.data;
              this.maximun_capacity = res.data.maximun_capacity;
              this.total_participant = res.data.total_participant;
              this.total_participant_personal = res.data.total_participant_personal;
              this.check_participant = res.data.check_participant;
              this.registered = res.data.registered;
              const dateStart = res.data.schedule[0].date_start;
              const date = moment(dateStart);
              const now = moment();
              const check = moment(now).isSameOrAfter(date);
              if (!check) {
                this.limit_date = false;
              } else {
                this.limit_date = true;
              }
            });
            this.isLoad = false;
          } else {
            this.$router.push('/');
          }
        });
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      if (checkRole().name === 'km_manager') {
        this.is_km_manager = true;
      }
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
    }
  },
  mounted() {
    if (!this.$store.getters['user/isAuthenticated']) {
      this.$router.push({ name: 'login', query: { permission: this.$route.query.token } });
    } else {
      this.onPageLoad();
    }
    this.getUser();
  }
};
</script>
<style scoped>
.card-shadow {
  box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
  -webkit-box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
  -moz-box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
}
</style>
