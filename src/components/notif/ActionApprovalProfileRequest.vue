<template>
  <div>
    <q-dialog ref="modal_declined" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Decline Request</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <q-input
            outlined
            dense
            v-model="alasan_ditolak"
            class=""
            required
            placeholder="Alasan"
          ></q-input>
        </q-card-section>

        <q-separator spaced />

        <q-card-actions align="right" class="text-primary">
          <!-- <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> -->
          <q-btn
            class="float-right q-mr-sm publish-button"
            color="km-blue"
            label="Send"
            unelevated
            @click="doDeclined()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-inner-loading
      :showing="loading"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script>
// import { trainingOnApproveAll } from 'components/notif/ActionTraining';
import { notifyOkRed } from 'src/lib/helper';
import {
  CertificateApproval, eventVerify
} from '../../lib/api';

export default {
  props: {
  },
  data() {
    return {
      name: '',
      alasan_ditolak: '',
      certificate_id: '',
      event_id: '',
      loading: false,
      type: '',
      user_id: ''
    };
  },
  methods: {
    startExt(data, type) {
      if (type === 'training') {
        this.type = 'training';
        this.certificate_id = data.certificate_id;
      } else {
        this.type = 'speaker';
        this.event_id = data.event_id;
        this.user_id = data.user_id;
      }
      this.$refs.modal_declined.show();
    },
    doDeclined() {
      if (this.type === 'training') {
        this.declinedTraining();
      } else {
        this.declinedSpeaker();
      }
    },
    declinedTraining() {
      this.loading = true;
      const data = {
        status: 'declined',
        reason: this.alasan_ditolak
      };
      CertificateApproval(this.certificate_id, data).then(res => {
        if (res.message === 'OK') {
          this.loading = false;
          notifyOkRed('Request is rejected successfully');
          this.refresh();
        }
      });
      this.$refs.modal_declined.hide();
      this.alasan_ditolak = '';
      this.certificate_id = '';
    },
    declinedSpeaker() {
      this.loading = true;
      const data = {
        status: 'Declined',
        reason: this.alasan_ditolak,
        enabled: false,
        user_id: this.user_id,
        type: 'Speaker'
      };
      eventVerify(this.event_id, data).then(res => {
        if (res.message === 'OK') {
          this.loading = false;
          notifyOkRed('Request is rejected successfully');
          this.refresh();
        }
      });
      this.$refs.modal_declined.hide();
      this.alasan_ditolak = '';
      this.event_id = '';
    },
    refresh() {
      this.$emit('close', new Date());
    }
  }
};
</script>

<style>
</style>
