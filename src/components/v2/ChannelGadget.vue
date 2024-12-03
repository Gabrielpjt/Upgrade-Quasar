<template>
  <div>
    <q-card class="q-mb-md kmp-new-font"
    >
    <q-card-section>
          <div class="row q-mb-lg">
            <q-item-section class="kmp-line-125 kmp-lg-text text-left kmp-bold-text kmp-black-text">Channel Suggestion</q-item-section>
          </div>
            <q-item class="q-mb-lg q-pa-none" v-for="(value, index) in this.channel_suggest"
              :key="index">
              <q-item-section side class="q-pr-sm cursor-pointer">
                <!-- <q-avatar size="40px" style="border-radius: 4px">
                  <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'">
                </q-avatar> -->

                <Avatar size="xl" :picture="value.avatar ? `./api${value.avatar}` : ''" :name="value.name" class="q-pa-none" @click="$router.push({ name: 'channel-detail', params: { id: value.id } })"/>
              </q-item-section>

              <q-item-section clickable class="q-pa-none cursor-pointer " @click="$router.push({ name: 'channel-detail', params: { id: value.id } })">
                <q-item-label class="kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">{{ value.name.toUpperCase() }}</q-item-label>
                <q-item-label class="kmp-normal-text kmp-xs-text kmp-gray-text  kmp-line-13">{{ value.total_kontributor }} Kontributor • {{ value.total_member }} member</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div :id="value.id+'-join'" class="q-mb-sm kmp-blue-text kmp-bold-text kmp-sm-text cursor-pointer link-underscore text-right" @click="openModalJoinChannel(value.id)"><q-icon name="add_circle"  class="q-mr-xs" size="16px"/>Join</div>
                <div :id="value.id+'-joined'" class="q-mb-sm kmp-gray-1-text kmp-bold-text kmp-sm-text text-right hidden">Joined</div>
                <div :id="value.id+'-waiting'" class="q-mb-sm kmp-gray-1-text kmp-bold-text kmp-sm-text text-right hidden">Waiting</div>
                <div :id="value.id+'-loading'" class="hidden"><q-spinner
                  color="primary"
                  size="1em"
                /></div>
              </q-item-section>
            </q-item>
            <!-- ambil fungsi joinednya -->
            <!-- <q-item class="q-mb-lg q-pa-none">
              <q-item-section side class="q-pr-sm cursor-pointer">
                <q-avatar size="40px" style="border-radius: 4px">
                  <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'">
                </q-avatar>
              </q-item-section>

              <q-item-section class="q-pa-none">
                <q-item-label class="kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">uiux_kpk</q-item-label>
                <q-item-label class="kmp-normal-text kmp-xs-text kmp-gray-text kmp-line-13">4 Kontributor • 4 member</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="q-mb-sm kmp-gray-1-text kmp-bold-text kmp-sm-text text-right">Joined</div>
              </q-item-section>
            </q-item> -->
        </q-card-section>
    </q-card>
    <q-dialog v-model="modal_join_channel" persistent>
      <q-card style="min-width: 300px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon name="close" size="24px" class="text-neutral float-right" v-close-popup/>
          <div class="text-title-form q-mb-md">Are you sure want to join this channel?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn color="km-blue" outline class="full-width text-weight-bold q-ma-sm" label="Join Channel" v-close-popup
                 @click="joinChannel();"/>
          <q-btn color="km-red" outline class="full-width text-weight-bold q-ma-sm" label="Cancel" v-close-popup/>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import {
  channelJoinSuggest,
  channelSuggestDashboardList
} from '../../lib/api';
import Avatar from '../../components/common/Avatar';

export default {
  components: { Avatar },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      channel_suggest: [],
      slide: 'style',
      modal_join_channel: false,
      channel_id: null
    };
  },
  methods: {
    getChannelSuggestDashboardList() {
      channelSuggestDashboardList().then(response => {
        const hasil = response.data;
        this.channel_suggest = hasil;
      });
    },
    openModalJoinChannel(id = null) {
      this.channel_id = id;
      this.modal_join_channel = true;
    },
    joinChannel() {
      const id = this.channel_id;
      const btn_join = document.getElementById(`${id}-join`);
      btn_join.classList.add('hidden');
      const loading = document.getElementById(`${id}-loading`);
      loading.classList.remove('hidden');
      channelJoinSuggest(id).then(response => {
        let msg = '';
        if (response.data.status_join === 'joined') {
          const btn_joined = document.getElementById(`${id}-joined`);
          btn_joined.classList.remove('hidden');
          msg = 'You are success to join this channel';
        } else if (response.data.status_join === 'request') {
          const btn_request = document.getElementById(`${id}-request`);
          btn_request.classList.remove('hidden');
          msg = 'Your request to join this channel has been sent';
        } else {
          msg = 'Something wrong';
          btn_join.classList.remove('hidden');
        }
        loading.classList.add('hidden');
        this.$q.notify({
          message: msg,
          color: 'blue'
        });
      });
    }
  },
  mounted() {
    this.getChannelSuggestDashboardList();
  }
};
</script>
