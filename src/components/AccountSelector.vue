<template>
  <q-btn-dropdown outline color="primary" no-caps dense class="full-width">
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <div>{{currentAccessName}}</div>
      </div>
    </template>
    <q-item
      clickable
      v-ripple
      v-close-popup
      v-for="access in accesses"
      :key="access.id"
      @click="changeAccess(access)"
    >
      <q-item-section>
        <q-item-label lines="2">{{access.mailbox.user.name}}</q-item-label>
        <q-item-label
          lines="2"
          caption
        >{{access.mailbox.gjab.nama_group}} - {{access.mailbox.unit.nama_unit}}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-badge color="orange" text-color="white" label="10"/>
      </q-item-section>
    </q-item>
  </q-btn-dropdown>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    accesses() {
      return this.$store.getters['user/accesses'] || [];
    },
    currentAccessName() {
      const access = this.$store.getters['user/currentAccess'];

      return access ? access.mailbox.user.name : '-';
    }
  },
  methods: {
    changeAccess(access) {
      this.$store.dispatch('user/updateAccessId', access.id);
    }
  }
};
</script>
