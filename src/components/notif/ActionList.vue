<template>
  <div>
    <q-scroll-area v-if="data.length > 5" style="height: 300px;margin-right: 4px">
      <q-list class="q-mx-md" dense separator>
        <q-item
          v-ripple clickable v-for="(item, index) in data" :key="index"
          class="kmp-action" style="padding-left: 8px;padding-right: 4px;">
          <q-item-section @click="onSelect(item)">
            <div class="text-capitalize">{{item.title.toLowerCase()}}</div>
            <div class="kmp-font-sm text-grey-7">{{item.subTitle}}</div>
          </q-item-section>
          <q-item-section side>
            <div class="row">
              <!--            <q-btn @click="onGoToPage(item)" round color="primary" class="q-ml-xs kmp-action-button" icon="attach_file" style="border-radius: 20px;" size="xs">-->
              <!--              <q-tooltip>Request with Document</q-tooltip>-->
              <!--            </q-btn>-->
              <q-btn @click="onGoToPage(item)" round color="primary" class="q-ml-xs kmp-action-button" icon="call_made" style="border-radius: 20px;" size="xs">
                <q-tooltip>Go To Page</q-tooltip>
              </q-btn>
              <q-btn @click="onApprove(item)" round color="positive" class="q-ml-xs kmp-action-button" icon="check" style="border-radius: 20px;" size="xs">
                <q-tooltip>Approve</q-tooltip>
              </q-btn>
            <q-btn @click="onReject(item)" round color="negative" class="q-ml-xs kmp-action-button" icon="clear" style="border-radius: 20px;" size="xs">
              <q-tooltip>Reject</q-tooltip>
            </q-btn>
            </div>
            <!--          <q-btn-group unelevated class="kmp-action-button">-->
            <!--            <q-btn icon="check" dense color="primary" size="sm" @click="onApprove(item)">-->
            <!--              <q-tooltip>Approve</q-tooltip>-->
            <!--            </q-btn>-->
            <!--            <q-btn icon="call_made" dense color="grey-9" size="sm" @click="onGoToPage(item)">-->
            <!--              <q-tooltip>Go To Page</q-tooltip>-->
            <!--            </q-btn>-->
            <!--            <q-btn icon="close" dense color="red-7" size="sm" @click="onReject(item)">-->
            <!--              <q-tooltip>Reject</q-tooltip>-->
            <!--            </q-btn>-->
            <!--          </q-btn-group>-->
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <div v-else class="q-pa-md" style="min-height: 10px">
      <q-list class="q-mx-md" dense separator>
        <q-item
          v-ripple clickable v-for="(item, index) in data" :key="index"
          class="kmp-action" style="padding-left: 8px;padding-right: 4px;">
          <q-item-section @click="onSelect(item)">
            <div class="text-capitalize">{{item.title.toLowerCase()}}</div>
            <div class="kmp-font-sm text-grey-7">{{item.subTitle}}</div>
          </q-item-section>
          <q-item-section side>
            <div class="row">
              <q-btn @click="onGoToPage(item)" round color="primary" class="q-ml-xs kmp-action-button" icon="call_made" style="border-radius: 20px;" size="xs">
                <q-tooltip>Go To Page</q-tooltip>
              </q-btn>
              <q-btn @click="onApprove(item)" round color="positive" class="q-ml-xs kmp-action-button" icon="check" style="border-radius: 20px;" size="xs">
                <q-tooltip>Approve</q-tooltip>
              </q-btn>
            <q-btn @click="onReject(item)" round color="negative" class="q-ml-xs kmp-action-button" icon="clear" style="border-radius: 20px;" size="xs">
              <q-tooltip>Reject</q-tooltip>
            </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <action-approval-training ref="form" @close="onClose"></action-approval-training>
    <action-approval-profile-request ref="formProfileRequest" @close="onClose"></action-approval-profile-request>
  </div>
</template>

<script>
import ActionApprovalTraining from 'components/notif/ActionApprovalTraining';
import ActionApprovalProfileRequest from 'components/notif/ActionApprovalProfileRequest';

export default {
  components: { ActionApprovalTraining, ActionApprovalProfileRequest },
  name: 'ActionList',
  props: ['data'],
  data() {
    return {
      dataModal: false
    };
  },
  methods: {
    onSelect(data) {
      this.$emit('select', data);
    },
    onApprove(data) {
      if (data.training_id) {
        this.$refs.form.start(data, 'approve');
      } else {
        this.$emit('approve', data);
      }
    },
    onGoToPage(data) {
      this.$emit('goto', data);
    },
    onReject(data) {
      if (data.training_id) {
        this.$refs.form.start(data, 'reject');
      } else if (data.certificate_id) {
        this.$refs.formProfileRequest.startExt(data, 'training');
      } else if (data.event_id) {
        this.$refs.formProfileRequest.startExt(data, 'speaker');
      } else {
        this.$emit('reject', data);
      }
    },
    onClose() {
      this.$emit('refresh', new Date());
    }
  }
};

</script>

<style scoped>

</style>
