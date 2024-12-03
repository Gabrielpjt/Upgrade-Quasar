<template>
  <div>
    <q-expansion-item
      switch-toggle-side
      v-if="this.$q.platform.is.mobile"
      :label="data.actionTitle"
      class="exp-action"
    >
      <template v-slot:header>
        <q-item-section class="text-weight-bold kmp-font-lg">
           <div class="row text-center" style="">
             <span>{{data.actionTitle}}</span>

             <span v-if="data.list.length > 0" class="text-red q-ml-xs">*</span>
          </div>
        </q-item-section>
      </template>
      <div class="row q-mb-sm items-center">
        <q-space/>
        <q-btn label="Approve All" no-caps dense unelevated size="12px" color="primary" style="width: 100px"
              @click="onApproveAll(data)"/>
      </div>
      <div class="row q-gutter-md">
        <div :class="$q.platform.is.mobile ? 'col-12 q-pr-md' : 'col'">
          <q-card class="">
            <q-card-section class="q-px-none">
              <ActionList
                :data="data.list"
                @select="onSelect" @approve="onApprove" @goto="onGoToPage" @reject="onReject" @refresh="onClose"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-expansion-item>
    <div v-else>
      <div class="row q-mb-sm items-center">
        <div class="text-weight-bold kmp-font-lg">{{ data.actionTitle }}</div>
        <q-space/>
        <q-btn label="Approve All" no-caps dense unelevated size="12px" color="primary" style="width: 100px"
              @click="onApproveAll(data)"/>
      </div>
      <div class="row q-gutter-md">
        <div :class="$q.platform.is.mobile ? 'col-12 q-pr-md' : 'col'">
          <q-card class="">
            <q-card-section class="q-px-none">
              <ActionList
                :data="data.list"
                @select="onSelect" @approve="onApprove" @goto="onGoToPage" @reject="onReject" @refresh="onClose"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-dialog v-model="modalSelectVisible">
      <q-card style="width: 600px" class="q-px-sm q-py-sm">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ data.modalTitle }}</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <ActionKmapDetail :data="ActionDetailData" v-if="data.type === 'kmap'"/>
          <ActionTrainingDetail :data="ActionDetailData" v-if="data.type === 'training'"/>
          <ActionProfileDetail :data="ActionDetailData" v-if="data.type === 'profile'"/>

          <!--todo tambahkan action detail disini untuk membuat action baru -->

        </q-card-section>

        <q-card-actions align="right" class="text-primary q-mb-sm">
          <q-btn unelevated color="primary" dense no-caps label="Go To Page" v-close-popup
                 @click="onGoToPage(ActionDetailData)"/>
          <q-btn unelevated v-if="data.type !== 'training'" color="positive" dense no-caps label="Approve"
                 @click="onApprove(ActionDetailData)"/>
          <q-btn unelevated v-if="data.type !== 'training'" color="negative" dense no-caps label="Reject"
                 @click="onReject(ActionDetailData)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <action-approval-training ref="form" @close="onClose"></action-approval-training>
    <action-approval-profile-request ref="formProfileRequest" @close="onClose"></action-approval-profile-request>
  </div>
</template>

<script>
import ActionList from 'components/notif/ActionList.vue';
import ActionKmapDetail from 'components/notif/ActionKmapDetail.vue';
import ActionTrainingDetail from 'components/notif/ActionTrainingDetail.vue';
import ActionProfileDetail from 'components/notif/ActionProfileDetail.vue';
import ActionApprovalTraining from 'components/notif/ActionApprovalTraining';
import ActionApprovalProfileRequest from 'components/notif/ActionApprovalProfileRequest';
import { trainingOnGoTo } from 'components/notif/ActionTraining';
import { requestJabatanOnApprove, requestJabatanOnReject, requestJabatanOnGoTo, requestJabatanOnApproveAll, speakerOnApprove, speakerOnApproveAll, externalTrainingOnApprove, externalTrainingOnApproveAll } from 'components/notif/ActionProfile';
import { kmapOnApprove, kmapOnApproveAll, kmapOnGoTo, kmapOnReject } from 'components/notif/ActionKmap';
import { Confirm, notifyOk, notifyOkRed } from 'src/lib/helper';

export default {
  name: 'Action',
  components: { ActionKmapDetail, ActionList, ActionTrainingDetail, ActionProfileDetail, ActionApprovalTraining, ActionApprovalProfileRequest },
  props: ['data'],
  data() {
    return {
      modalSelectVisible: false,
      ActionDetailData: undefined
    };
  },
  methods: {
    onApproveAll(data) {
      Confirm('Are you sure to Approve All of the request?')
        .onOk(() => {
          if (this.data.type === 'training') {
            this.$refs.form.start(data, 'approve_all');
          } else {
            if (this.data.type === 'kmap') kmapOnApproveAll(data);
            if (this.data.type === 'profile') {
              const sort = data.list;
              const position = sort.filter(i => i.profile_type === 'position');
              const speaker = sort.filter(i => i.profile_type === 'speaker');
              const training_external = sort.filter(i => i.profile_type === 'training_external');
              if (speaker.length > 0) {
                speakerOnApproveAll(speaker);
              }
              if (position.length > 0) {
                requestJabatanOnApproveAll(position);
              }
              if (training_external.length > 0) {
                externalTrainingOnApproveAll(training_external);
              }
            }
            notifyOk('All Request are approved successfully');
            this.onClose();
          }
          // todo tambahkan fungsi aksi setelah approval all disini untuk action baru
        });
    },
    onApprove(data) {
      Confirm('Are you sure to Approve this request?')
        .onOk(() => {
          if (this.data.type === 'kmap') kmapOnApprove(data);
          if (this.data.type === 'profile') {
            if (data.profile_type === 'speaker') {
              speakerOnApprove(data);
            } else if (data.profile_type === 'position') {
              requestJabatanOnApprove(data);
            } else {
              externalTrainingOnApprove(data);
            }
          }
          // todo tambahkan fungsi aksi setelah approval disini untuk action baru

          notifyOk('Request is approved successfully');
          this.onClose();
        });
    },
    onReject(data) {
      Confirm('Are you sure to Reject this request?')
        .onOk(() => {
          if (this.data.type === 'profile') {
            if (data.profile_type === 'speaker') {
              this.$refs.formProfileRequest.startExt(data, 'speaker');
            } else if (data.profile_type === 'position') {
              requestJabatanOnReject(data);
              notifyOkRed('Request is rejected successfully');
              this.onClose();
            } else {
              this.$refs.formProfileRequest.startExt(data, 'training');
            }
          } else {
            if (this.data.type === 'kmap') kmapOnReject(data);
            notifyOkRed('Request is rejected successfully');
            this.onClose();
          }

          // todo tambahkan fungsi aksi setelah reject disini untuk action baru
        });
    },
    onGoToPage(data) {
      if (this.data.type === 'kmap') kmapOnGoTo(data);
      if (this.data.type === 'profile') requestJabatanOnGoTo(data);
      if (this.data.type === 'training') trainingOnGoTo(data);

      // todo tambahkan fungsi menuju page disini untuk action baru
    },
    onSelect(data) {
      this.ActionDetailData = data;
      this.modalSelectVisible = true;
    },
    onClose() {
      this.modalSelectVisible = false;
      this.$emit('refresh', new Date());
    }
  }
};
</script>

<style>
.exp-action .q-item {
    min-height: 10px;
    padding: 4px 16px;
}
</style>
