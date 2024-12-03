<template>
  <div>
    <div v-if="hasAccessLabel">
      <div class="text-center">
        <q-chip dense :label="currentAccess.status_label"/>
        {{currentAccess.mailbox.gjab.nama_group}}
      </div>
      <div class="text-center q-mt-sm">{{currentAccess.mailbox.unit.nama_unit}}</div>
    </div>
    <div v-else>
      <div class="text-center">{{currentAccess.mailbox.gjab.nama_group}}</div>
      <div class="text-center q-mt-sm">{{currentAccess.mailbox.unit.nama_unit}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentAccess() {
      const access = this.$store.getters['user/currentAccess'];

      if (access) {
        return access;
      }

      return {
        status_label: '',
        mailbox: {
          gjab: {
            nama_group: ''
          },
          unit: {
            nama_unit: ''
          }
        }
      };
    },
    hasAccessLabel() {
      return !!this.currentAccess.status_label;
    }
  }
};
</script>
