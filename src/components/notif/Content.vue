<template>
  <div class="q-py-md q-pa-none items-start">
    <div>
      <div v-if="loading">
        <q-item class="kmp-profile-item-list">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section class="q-py-md">
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="kmp-profile-item-list">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section class="q-py-md">
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="90%" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="kmp-profile-item-list">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section class="q-py-md">
            <q-item-label>
              <q-skeleton type="text" width="35%" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div v-else>
        <q-infinite-scroll @load="onLoad" :offset="250">
          <q-card-section class="q-pa-none q-mt-lg">

              <q-card class="q-mt-md my-card-profile-post" style="color: #2C8ED3">
                 <!-- style="color: #2C8ED3" -->
                  <q-list bordered separator>
                      <!-- class="text-weight-bold kmp-bg-color-2" -->
                      <q-item style="padding: 0px 10px;" :class="item.status === 'Unread' ? 'bg-light-blue-1 text-weight-bold notif cursor-pointer' : 'bg-white cursor-pointer'" v-for="(item, index) in dataNotif" :key="index">
                          <!-- {{toDate(item.created_at)}} -->
                          <!-- -- {{item.id}} -->
                          <q-item-section class="q-pa-sm" @click="clickNotif(item)">
                          <q-item-label class="km-list-more-notif-unread" style="margin: 5px 0px;">{{item.type}} <span class="kmp-time-notif q-ml-xs">{{ item.time }}</span></q-item-label>
                          <q-item-label caption lines="2" :class="item.status === 'Unread' ? 'km-list-more-notif-unread q-mr-md' : 'km-list-more-normal q-mr-md'" style="margin: 5px 0px;">{{ item.message }}</q-item-label>
                          </q-item-section>

                          <!-- <q-item-section side top>
                          <q-item-label caption>5 min ago</q-item-label>
                          <q-icon name="star" color="yellow" />
                          </q-item-section> -->
                      </q-item>
                  </q-list>
              </q-card>
          </q-card-section>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px"/>
            </div>
          </template>
        </q-infinite-scroll>
      </div>

    </div>
  </div>
</template>

<script>

import { Notify } from 'quasar';
import { get } from 'src/lib/HttpHelper';
import { mapActions } from 'vuex';
import { capitalize, datePost, aesEncrypt } from 'src/lib/helper';
import {
  notifRead
} from 'src/lib/api';

export default {
  name: 'NotificationContent',
  props: [],
  components: { },
  data () {
    return {
      dataNotif: [],
      loading: false,
      post_id: null,
      totalDataNotif: null
    };
  },
  methods: {
    ...mapActions('notification', ['updateTrainingId']),
    getNotif() {
      get({
        path: 'api/notification/all?limit=5&offset=0'
      }).then(res => {
        const response = res.data;
        if (response) {
          response.forEach(item => {
            let msg = '';
            let is_feedback = false;

            let training_type = '';
            let training_name = '';
            let training_eksternal = '';
            let reason_certificate = '';
            let reason_training = '';
            let event_name = '';
            let reason_event = '';
            const sender_name = capitalize(item.sender.name.toLowerCase());
            if (item.training) {
              training_type = item.training.training_type != null ? item.training.training_type : '';
              training_name = item.training.name != null ? item.training.name : '';
              if (item.training.participant.length !== 0) {
                const alasan = item.training.participant.filter(el => el.users_id === item.sender_id);
                if (alasan) {
                  reason_training = alasan[0].alasan_ditolak != null ? alasan[0].alasan_ditolak : '';
                } else {
                  reason_training = '';
                }
              }
            }
            if (item.certificate) {
              training_eksternal = item.certificate.name != null ? item.certificate.name : '';
              reason_certificate = item.certificate.reason != null ? item.certificate.reason : '';
            }
            if (item.event) {
              event_name = item.event.name != null ? item.event.name : '';
              reason_event = item.event.reason != null ? item.event.reason : '';
            }
            if (item.type === 'Channel' && item.detail === 'Add' && item.channel !== null) {
              msg = `${sender_name} telah menambahkan Anda pada Channel ${item.channel.name}`;
            } else if (item.type === 'Training' && item.detail === 'Register' && item.training !== null) {
              msg = `Saudara telah didaftarkan pada ${training_type} ${training_name}, silahkan klik untuk melakukan persetujuan`;
            } else if (item.type === 'Training' && item.detail === 'Permission' && item.training !== null) {
              msg = `Anda mendapat permohonan persetujuan mengikuti ${training_type} ${training_name}, klik untuk melihat detail`;
            } else if (item.type === 'Training' && item.detail === 'Approve' && item.training !== null) {
              msg = `Permohonan anda mengikuti ${training_type} ${training_name} telah disetujui atasan, anda telah terdaftar sebagai peserta`;
            } else if (item.type === 'Training' && item.detail === 'Decline' && item.training !== null) {
              if (reason_training === '') {
                msg = `Permohonan anda mengikuti ${training_type} ${training_name} telah ditolak atasan`;
              } else {
                msg = `Permohonan anda mengikuti ${training_type} ${training_name} telah ditolak atasan karena ${reason_training}`;
              }
            } else if (item.type === 'Training' && item.detail === 'Close' && item.training !== null) {
              msg = `Terima kasih telah mengikuti ${training_type} ${training_name}, silahkan klik untuk mengisi feedback dan mendapatkan poin.`;
              is_feedback = true;
            } else if (item.type === 'Training' && item.detail === 'Invite' && item.training !== null) {
              msg = `Anda telah diundang untuk mengikuti ${training_type} ${training_name}, klik untuk melihat detail`;
            } else if (['Moderator', 'Instructor', 'Speaker'].includes(item.detail) && item.post !== null) {
              msg = `${sender_name} telah mendaftarkan anda pada Event ${item.post.title} sebagai ${item.detail}`;
            } else if (item.type === 'Training' && item.detail === 'Cancel' && item.training !== null) {
              if (reason_training === '') {
                msg = `Anda telah dibatalkan untuk mengikuti ${training_type} ${training_name}`;
              } else {
                msg = `Anda telah dibatalkan untuk mengikuti ${training_type} ${training_name} karena ${reason_training}`;
              }
            } else if (item.type === 'Training' && item.detail === 'Reinvite' && item.training !== null) {
              msg = `${sender_name} telah di invite kembali untuk mengikuti ${training_type} ${training_name}`;
            // } else if (item.type === 'Training' && item.detail === 'Participant Approve' && item.training !== null) {
            //   msg = `${sender_name} telah bersedia untuk mengikuti ${training_type} ${training_name}`;
            } else if (item.type === 'Training' && item.detail === 'Participant Decline' && item.training !== null) {
              if (reason_training === '') {
                msg = `${sender_name} tidak bersedia untuk mengikuti ${training_type} ${training_name}`;
              } else {
                msg = `${sender_name} tidak bersedia untuk mengikuti ${training_type} ${training_name} karena ${reason_training}`;
              }
            } else if (item.type === 'Training' && item.detail === 'Kuota' && item.training !== null) {
              msg = `Maaf, Kuota ${training_type} ${training_name} telah habis`;
            } else if (item.type === 'Certificate' && item.detail === 'Request' && item.certificate !== null) {
              msg = `${sender_name} telah mengajukan persetujuan untuk mencantumkan ${training_eksternal} pada profilnya`;
            } else if (item.type === 'Certificate' && item.detail === 'Approve' && item.certificate !== null) {
              msg = `${sender_name} telah menyetujui untuk mencantumkan ${training_eksternal} pada profil anda`;
            } else if (item.type === 'Certificate' && item.detail === 'Decline' && item.certificate !== null) {
              if (reason_certificate === '') {
                msg = `${sender_name} telah menolak untuk mencantumkan ${training_eksternal} pada profil anda `;
              } else {
                msg = `${sender_name} telah menolak untuk mencantumkan ${training_eksternal} pada profil anda karena ${reason_certificate}`;
              }
            } else if (item.type === 'Speaker' && item.detail === 'Request' && item.event !== null) {
              msg = `${sender_name} telah mengajukan persetujuan untuk mencantumkan ${event_name} pada profilnya`;
            } else if (item.type === 'Speaker' && item.detail === 'Approve' && item.event !== null) {
              msg = `${sender_name} telah menyetujui untuk mencantumkan ${event_name} pada profil anda`;
            } else if (item.type === 'Speaker' && item.detail === 'Decline' && item.event !== null) {
              if (reason_event === '') {
                msg = `${sender_name} telah menolak untuk mencantumkan ${event_name} pada profil anda`;
              } else {
                msg = `${sender_name} telah menolak untuk mencantumkan ${event_name} pada profil anda karena ${reason_event}`;
              }
            }
            if ((item.channel === null && item.channel_id !== null) || (item.training === null && item.training_id !== null) || (item.certificate === null && item.certificate_id !== null) || (item.type === 'Event' && item.post === null && item.post_id !== null) || (item.type === 'Speaker' && item.event === null && item.event_id !== null)) {
              msg = `${item.type} data is not available`;
            }
            item.message = msg;
            item.is_feedback = is_feedback;
            item.time = datePost(item.created_at, true);
          });
          this.dataNotif = response;
          this.totalDataNotif = res.meta.total_data;
          this.is_loading = false;
        }
      });
    },
    clickNotif(item) {
      if ((item.channel === null && item.channel_id !== null) || (item.training === null && item.training_id !== null) || (item.certificate === null && item.certificate_id !== null) || (item.type === 'Event' && item.post === null && item.post_id !== null) || (item.type === 'Speaker' && item.event === null && item.event_id !== null)) {
        Notify.create({
          message: 'Data is not available!',
          timeout: 5000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        if (item.status === 'Unread') {
          notifRead(item.id);
        }
        if (item.type === 'Channel') {
          this.$router.push({
            name: 'channel-detail',
            params: {
              id: item.channel_id
            }
          });
        } else if (item.type === 'Training') {
          if (item.detail === 'Close') {
            if (item.is_feedback) {
              const token = aesEncrypt(JSON.stringify({ trainingId: item.training.id }));
              this.$router.push({ path: '/training/feedback', query: { token } });
            }
          } else {
            this.$router.push({ name: 'training-detail', params: { id: item.training.id } }).catch(() => {
            });
            // this.updateTrainingId(item.training.id);
            // this.$router.push({
            //   name: 'training'
            // }).catch(() => {
            // });
          }
        } else if (item.type === 'Event') {
          this.$router.push({
            name: 'channel-detail-post-detail',
            params: {
              id: item.post.post_channel.channel_id,
              post_id: item.post.id
            }
          });
        } else if (item.type === 'Certificate' || item.type === 'Speaker') {
          if (item.detail === 'Request') {
            this.$router.push({
              name: 'profile-detail',
              params: { id: item.sender_id }
            });
          } else {
            this.$router.push({
              name: 'profile'
            });
          }
        }
        this.getNotif();
      }
    },
    onLoad(index, done) {
      const url = `api/notification/all?limit=5&offset=${this.dataNotif.length}`;
      if (this.dataNotif.length === 0) {
        done();
      } else if (this.dataNotif.length === this.totalDataNotif) {
        done();
      } else {
        setTimeout(() => {
          get({
            path: url
          }).then(res => {
            const response = res.data;
            if (response) {
              response.forEach(item => {
                let msg = '';
                let is_feedback = false;
                const sender_name = capitalize(item.sender.name.toLowerCase());
                let training_type = '';
                let training_name = '';
                let training_eksternal = '';
                let reason_certificate = '';
                let reason_training = '';
                let event_name = '';
                let reason_event = '';
                if (item.training) {
                  training_type = item.training.training_type != null ? item.training.training_type : '';
                  training_name = item.training.name != null ? item.training.name : '';
                  if (item.training.participant.length !== 0) {
                    const alasan = item.training.participant.filter(el => el.users_id === item.sender_id);
                    if (alasan) {
                      reason_training = alasan[0].alasan_ditolak != null ? alasan[0].alasan_ditolak : '';
                    } else {
                      reason_training = '';
                    }
                  }
                }
                if (item.certificate) {
                  training_eksternal = item.certificate.name != null ? item.certificate.name : '';
                  reason_certificate = item.certificate.reason != null ? item.certificate.reason : '';
                }
                if (item.event) {
                  event_name = item.event.name != null ? item.event.name : '';
                  reason_event = item.event.reason != null ? item.event.reason : '';
                }
                if (item.type === 'Channel' && item.detail === 'Add' && item.channel !== null) {
                  msg = `${sender_name} telah menambahkan Anda pada Channel ${item.channel.name}`;
                } else if (item.type === 'Training' && item.detail === 'Register' && item.training !== null) {
                  msg = `Saudara telah didaftarkan pada ${training_type} ${training_name}, silahkan klik untuk melakukan persetujuan`;
                } else if (item.type === 'Training' && item.detail === 'Permission' && item.training !== null) {
                  msg = `Anda mendapat permohonan persetujuan mengikuti ${training_type} ${training_name}, klik untuk melihat detail`;
                } else if (item.type === 'Training' && item.detail === 'Approve' && item.training !== null) {
                  msg = `Permohonan anda mengikuti ${training_type} ${training_name} telah disetujui atasan, anda telah terdaftar sebagai peserta`;
                } else if (item.type === 'Training' && item.detail === 'Decline' && item.training !== null) {
                  if (reason_training === '') {
                    msg = `Permohonan anda mengikuti ${training_type} ${training_name} telah ditolak atasan`;
                  } else {
                    msg = `Permohonan anda mengikuti ${training_type} ${training_name} telah ditolak atasan karena ${reason_training}`;
                  }
                } else if (item.type === 'Training' && item.detail === 'Close' && item.training !== null) {
                  msg = `Terima kasih telah mengikuti ${training_type} ${training_name}, silahkan klik untuk mengisi feedback dan mendapatkan poin.`;
                  is_feedback = true;
                } else if (item.type === 'Training' && item.detail === 'Invite' && item.training !== null) {
                  msg = `Anda telah diundang untuk mengikuti ${training_type} ${training_name}, klik untuk melihat detail`;
                } else if (['Moderator', 'Instructor', 'Speaker'].includes(item.detail) && item.post !== null) {
                  msg = `${sender_name} telah mendaftarkan anda pada Event ${item.post.title} sebagai ${item.detail}`;
                } else if (item.type === 'Training' && item.detail === 'Cancel' && item.training !== null) {
                  if (reason_training === '') {
                    msg = `Anda telah dibatalkan untuk mengikuti ${training_type} ${training_name}`;
                  } else {
                    msg = `Anda telah dibatalkan untuk mengikuti ${training_type} ${training_name} karena ${reason_training}`;
                  }
                } else if (item.type === 'Training' && item.detail === 'Reinvite' && item.training !== null) {
                  msg = `${sender_name} telah di invite kembali untuk mengikuti ${training_type} ${training_name}`;
                // } else if (item.type === 'Training' && item.detail === 'Participant Approve' && item.training !== null) {
                //   msg = `${sender_name} telah bersedia untuk mengikuti ${training_type} ${training_name}`;
                } else if (item.type === 'Training' && item.detail === 'Participant Decline' && item.training !== null) {
                  if (reason_training === '') {
                    msg = `${sender_name} tidak bersedia untuk mengikuti ${training_type} ${training_name}`;
                  } else {
                    msg = `${sender_name} tidak bersedia untuk mengikuti ${training_type} ${training_name} karena ${reason_training}`;
                  }
                } else if (item.type === 'Certificate' && item.detail === 'Request' && item.certificate !== null) {
                  msg = `${sender_name} telah mengajukan persetujuan untuk mencantumkan ${training_eksternal} pada profilnya`;
                } else if (item.type === 'Certificate' && item.detail === 'Approve' && item.certificate !== null) {
                  msg = `${sender_name} telah menyetujui untuk mencantumkan ${training_eksternal} pada profil anda`;
                } else if (item.type === 'Certificate' && item.detail === 'Decline' && item.certificate !== null) {
                  if (reason_certificate === '') {
                    msg = `${sender_name} telah menolak untuk mencantumkan ${training_eksternal} pada profil anda `;
                  } else {
                    msg = `${sender_name} telah menolak untuk mencantumkan ${training_eksternal} pada profil anda karena ${reason_certificate}`;
                  }
                } else if (item.type === 'Speaker' && item.detail === 'Request' && item.event !== null) {
                  msg = `${sender_name} telah mengajukan persetujuan untuk mencantumkan ${event_name} pada profilnya`;
                } else if (item.type === 'Speaker' && item.detail === 'Approve' && item.event !== null) {
                  msg = `${sender_name} telah menyetujui untuk mencantumkan ${event_name} pada profil anda`;
                } else if (item.type === 'Speaker' && item.detail === 'Decline' && item.event !== null) {
                  if (reason_event === '') {
                    msg = `${sender_name} telah menolak untuk mencantumkan ${event_name} pada profil anda`;
                  } else {
                    msg = `${sender_name} telah menolak untuk mencantumkan ${event_name} pada profil anda karena ${reason_event}`;
                  }
                }
                if ((item.channel === null && item.channel_id !== null) || (item.training === null && item.training_id !== null) || (item.certificate === null && item.certificate_id !== null) || (item.type === 'Event' && item.post === null && item.post_id !== null) || (item.type === 'Speaker' && item.event === null && item.event_id !== null)) {
                  msg = `${item.type} data is not available`;
                }
                item.message = msg;
                // item.created_at = date.formatDate(item.created_at, 'HH:mm (DD MMM YYYY)');
                item.is_feedback = is_feedback;
                item.time = datePost(item.created_at, true);
                this.dataNotif.push(item);
              });
              done();
            } else {
              done();
            }
          });
        }, 2000);
      }
    }
  },
  mounted() {
    this.getNotif();
  }
};
</script>

<style>

</style>
