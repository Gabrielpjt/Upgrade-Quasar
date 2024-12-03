<template>
  <div class="q-pa-none items-start">
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
          <q-card-section class="q-pa-none">

              <q-card class="my-card-profile-post" style="color: #2C8ED3">
                 <!-- style="color: #2C8ED3" -->
                  <q-list bordered separator>
                      <!-- class="text-weight-bold kmp-bg-color-2" -->
                      <q-item style="padding: 0px 10px;" :class="item.status === 'Unread' ? 'bg-light-blue-1 text-weight-bold notif cursor-pointer' : 'bg-white cursor-pointer'" v-for="(item, index) in dataNotif" :key="index">
                          <!-- {{toDate(item.created_at)}} -->
                          <!-- -- {{item.id}} -->
                          <q-item-section class="q-pa-sm" @click="clickNotif(item)">
                          <q-item-label class="km-list-more-notif-unread" style="margin: 5px 0px;">{{item.type}} <span class="kmp-time-notif q-ml-xs">{{ item.time }}</span></q-item-label>
                          <q-item-label caption lines="2" :class="item.status === 'Unread' ? 'km-list-more-notif-unread q-mr-md' : 'km-list-more-normal-grey q-mr-md'" style="margin: 5px 0px;">{{ item.message }}</q-item-label>
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
// import { getCredential } from 'src/lib/storage';
import { datePost, aesEncrypt, notifMessage } from 'src/lib/helper';
import {
  notifRead
} from 'src/lib/api';
import bus from 'components/common/EventBus';

export default {
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
    getNotif() {
      get({
        path: 'api/notification/all?limit=5&offset=0'
      }).then(res => {
        const response = res.data;
        if (response) {
          response.forEach(item => {
            let is_feedback = false;
            if (item.type === 'Training' && item.detail === 'Close') {
              is_feedback = true;
            }
            item.message = notifMessage(item);
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
          this.$root.$emit('updateNotif');
        }
        if (item.type === 'Channel' || item.type === 'Profile') {
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
        } else if (item.type === 'Badge') {
          this.$router.push({
            name: 'profile'
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
        setTimeout(() => {
          bus.$emit('update_nav');
        }, 500);
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
                let is_feedback = false;
                if (item.type === 'Training' && item.detail === 'Close') {
                  is_feedback = true;
                }
                item.message = notifMessage(item);
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
    },
    label2(status, type) {
      if (type === 'Badge') {
        if (status === 'Unread') {
          return 'km-list-more-notif-unread-badge q-mr-md';
        }
        return 'km-list-more-normal-badge q-mr-md';
      }
      if (type === 'Training' || type === 'Certificate') {
        if (status === 'Unread') {
          return 'km-list-more-notif-unread-training q-mr-md';
        }
        return 'km-list-more-normal-training q-mr-md';
      }
      if (type === 'Event' || type === 'Speaker') {
        if (status === 'Unread') {
          return 'km-list-more-notif-unread-event q-mr-md';
        }
        return 'km-list-more-normal-event q-mr-md';
      }
      if (status === 'Unread') {
        return 'km-list-more-notif-unread q-mr-md';
      }
      return 'km-list-more-normal-grey q-mr-md';
    }
  },
  mounted() {
    this.getNotif();
  }
};
</script>

<style>

</style>
