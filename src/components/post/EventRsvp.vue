<template>
  <q-card-section style="padding:0px" v-if="is_rsvp === true && checkEvent(start_time, start_date, 'rsvp') !== 'past'">
    <q-separator/>
    <q-item class="" style="padding:10px">
        <q-item-section>
        <div class="text-right kmp-post-text-event-title">RSVP </div>
        </q-item-section>
        <q-item-section side>
        <div class="row" v-if="checkRsvp(participant, participant_no) === false">
            <div class="col"><span class="text-rsvp q-mr-sm cursor-pointer" @click="handleRsvp('Yes', id)">Yes</span></div>
            <div class="col"><span class="text-rsvp q-mr-xs cursor-pointer" @click="handleRsvp('No', id)">No</span></div>
            <div class="col"><span class="text-rsvp q-mr-sm cursor-pointer" @click="handleRsvp('Maybe', id)">Maybe</span></div>
        </div>
        <div class="row" v-if="checkRsvp(participant, participant_no) !== false">
            <div @click="changeRSVP(id, checkRsvp(participant, participant_no), start_time, start_date)"
            :class="{ 'text-rsvp cursor-pointer col text-green-5': checkRsvp(participant, participant_no) === 'Yes',
            'text-rsvp cursor-pointer col text-red-5': checkRsvp(participant, participant_no) === 'No',
            'text-rsvp cursor-pointer col text-blue-5': checkRsvp(participant, participant_no) === 'Maybe'}">
            {{checkRsvp(participant, participant_no)}}
            <span v-if="checkRsvp(participant, participant_no) === 'Yes'" class="material-icons">check_circle_outline</span>
            <span v-else-if="checkRsvp(participant, participant_no) === 'No'" class="material-icons">close</span>
            <span v-else class="material-icons">help_outline</span>
            </div>
        </div>
        </q-item-section>
    </q-item>
    <fixed-modal
      :show="modal_rsvp"
      title="Change RSVP"
      @on-close="modal_rsvp = false"
    >
      <q-card-section class="q-pt-none">
        <div class="text-neutral">RSVP</div>
        <q-select
          v-model="rsvp_answer"
          :options="['Yes','No', 'Maybe']"
          outlined
          dense
        >
        </q-select>
      </q-card-section>
      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated @click="modal_rsvp = false">Cancel</q-btn>
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated
                  @click='handleRsvp(rsvp_answer,event_id);' :disable="rsvp_answer ===  ''"/>
        </q-card-actions>
      </template>
    </fixed-modal>
  </q-card-section>
</template>

<script>

import { Notify } from 'quasar';
import { eventAttendees } from 'src/lib/api';
import FixedModal from 'components/common/FixedModal';
import bus from 'components/common/EventBus';
import { point } from '../../lib/point';

export default {
  props: ['is_rsvp', 'participant', 'participant_no', 'start_time', 'start_date', 'id', 'loginId'],
  components: { FixedModal },
  data() {
    return {
      today: '',
      d: '',
      modal_rsvp: false,
      rsvp_answer: ''
    };
  },
  methods: {
    getToday() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const seconds = String(today.getSeconds()).padStart(2, '0');
      today = `${yyyy}-${mm}-${dd}`;
      this.today = today;
      this.hours = `${hours}:${minutes}:${seconds}`;
    },
    checkEvent(time, date, type) {
      let hasil = '';
      if (type === 'rsvp') {
        if (date >= this.today) {
          if (date === this.today && time !== null) {
            const elem = time.split(/[/ :]/);
            const sekarang = this.hours.split(/[/ :]/);
            const hours = elem[0];
            const minutes = elem[1];
            const total = (hours * 60) + parseInt(minutes, 10);
            const totalNow = (sekarang[0] * 60) + parseInt(sekarang[1], 10);
            const dif = total - totalNow;
            if (dif > 120) {
              hasil = 'soon';
            } else {
              hasil = 'past';
            }
          } else if (date === this.today && time === null) {
            hasil = 'past';
          } else {
            hasil = 'soon';
          }
        } else {
          hasil = 'past';
        }
      }
      this.d = this.today;
      return hasil;
    },
    checkRsvp(value, no = null) {
      const list = [];
      const listno = [];
      let dataAnswer = '';
      value.forEach(f => {
        if (f.users_id === this.loginId) {
          dataAnswer = f.rsvp;
        }
        list.push(f.users_id);
      });
      if (list.includes(this.loginId)) {
        return dataAnswer;
      }
      if (no !== null) {
        no.forEach(f => {
          if (f.users_id === this.loginId) {
            dataAnswer = f.rsvp;
          }
          listno.push(f.users_id);
        });
        if (listno.includes(this.loginId)) {
          return dataAnswer;
        }
      }
      return false;
    },
    changeRSVP(id, rsvp, time, date) {
      const state = this.checkEvent(time, date, 'rsvp');
      if (state === 'soon') {
        this.rsvp_answer = rsvp;
        this.event_id = id;
        this.modal_rsvp = true;
      }
    },
    handleRsvp(dataRsvp, id) {
      eventAttendees({
        event_id: id,
        rsvp: dataRsvp,
        users_id: this.loginId
      }).then(res => {
        if (dataRsvp.toLowerCase() === 'yes') point('add', { tag: 'event_participant', channel_id: id, account_id: this.loginId });
        if (dataRsvp.toLowerCase() === 'no') point('rollback', { tag: 'event_participant', channel_id: id, account_id: this.loginId });
        if (res.message === 'OK') {
          Notify.create({
            message: 'Thank you for your response.',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          this.$emit('update_post');
          bus.$emit('update_nav');
        }
      });
    }
  },
  watch: {
  },
  mounted() {
    this.getToday();
  }
};
</script>
