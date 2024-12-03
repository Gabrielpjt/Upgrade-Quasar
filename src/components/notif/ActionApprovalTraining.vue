<template>
  <div>
    <q-dialog ref="modal_approve" minimized>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
          <q-card-section>
            <q-icon
              name="close"
              size="24px"
              class="text-neutral float-right"
              v-close-popup
            />
            <div class="text-h6">Approve Request</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="">
            <q-checkbox v-model="keterangan_atasan" val="a" right-label label="Selama yang bersangkutan mengikuti diklat dibebaskan dari pekerjaan rutin" color="Blue" />
            <q-checkbox v-model="keterangan_atasan" val="b" right-label label="Memberikan kesempatan kepada yang bersangkutan untuk mempraktekkan hasil diklat" color="Blue" />
            <q-checkbox v-model="keterangan_atasan" val="c" right-label label="Memonitoring dan memberikan review terhadap implementasi hasil diklat ditempat kerja" color="Blue" />
          </q-card-section>

          <q-separator spaced />

          <q-card-actions align="right" class="text-primary">
            <!-- <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> -->
            <q-btn
              class="float-right q-mr-sm publish-button"
              color="km-blue"
              label="Send"
              unelevated
              @click="approveTraining()"
            />
          </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog ref="modal_declined" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Reject Request</div>
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
            @click="declinedTraining()"
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
import { trainingOnApproveAll } from 'components/notif/ActionTraining';
import { notifyOk, notifyOkRed } from 'src/lib/helper';
import {
  trainingApproval
} from '../../lib/api';

export default {
  props: {
  },
  data() {
    return {
      keterangan_atasan: [],
      name: '',
      alasan_ditolak: '',
      user_id: '',
      training_id: '',
      loading: false
    };
  },
  methods: {
    async start(data, type) {
      this.user_id = data.id;
      this.training_id = data.training_id;
      if (type === 'approve') {
        this.$refs.modal_approve.show();
      } else if (type === 'approve_all') {
        this.loading = true;
        await trainingOnApproveAll(data.list).then(result => {
          console.log(result);
          const data_approval = result;
          if (data_approval.length > 0) {
            this.loading = false;
            notifyOk('Request is approved successfully');
          }
        });
        this.refresh();
      } else {
        this.$refs.modal_declined.show();
      }
    },
    approveTraining() {
      this.loading = true;
      const data = {
        participant_type: 'registered',
        link_detail: `${window.location.origin}/training/detail/${this.training_id}`,
        keterangan_atasan: this.keterangan_atasan,
        alasan_ditolak: null
      };
      trainingApproval(this.user_id, data).then(result => {
        const data_approval = result.data;
        if (data_approval) {
          this.loading = false;
          notifyOk('Request is approved successfully');
          this.refresh();
        }
      });
      this.$refs.modal_approve.hide();
    },
    declinedTraining() {
      this.loading = true;
      const data = {
        participant_type: 'declined',
        alasan_ditolak: this.alasan_ditolak,
        keterangan_atasan: null
      };
      trainingApproval(this.user_id, data).then(result => {
        const data_approval = result.data;
        if (data_approval) {
          this.loading = false;
          notifyOkRed('Request is rejected successfully');
          this.refresh();
        }
      });
      this.$refs.modal_declined.hide();
      this.reset();
    },
    reset() {
      this.alasan_ditolak = null;
      this.training_id = null;
      this.user_id = null;
      this.keterangan_atasan = [];
    },
    refresh() {
      this.$emit('close', new Date());
    }
  }
};
</script>

<style>
</style>
