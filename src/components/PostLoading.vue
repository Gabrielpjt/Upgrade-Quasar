<template>
  <div class="items-start" :class="is_dashboard ? 'q-pb-md q-pr-none' : (is_detail ? '' : 'q-py-md q-pr-lg')">
    <q-card v-for="index in loading_count" :key="index" class="q-pa-sm q-mb-lg">
      <q-item class="">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" size="36px" animation="fade" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" animation="fade" style="max-width: 150px" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" animation="fade" style="max-width: 100px" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <div class="q-px-sm">
        <q-skeleton type="text" animation="fade" style="max-width: 150px" />
      </div>
      <div class="q-px-sm">
        <q-skeleton type="text" animation="fade" />
        <q-skeleton type="text" animation="fade" />
        <q-skeleton type="text" animation="fade" />
        <q-skeleton type="text" animation="fade" />
      </div>
      <div class="q-px-sm">
        <q-skeleton type="text" animation="fade" style="max-width: 80px" />
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ['isDashboard', 'isDetail', 'count'],
  data () {
    return {
      is_dashboard: false,
      is_detail: false,
      loading_count: 3
    };
  },

  methods: {
    resetFilter () {
      this.filter = '';
      this.$refs.filter.focus();
    }
  },
  watch: {
    isDashboard: {
      immediate: true,
      deep: true,
      handler(value) {
        this.is_dashboard = value;
      }
    },
    isDetail: {
      immediate: true,
      deep: true,
      handler(value) {
        this.is_detail = value;
        this.loading_count = value ? 1 : this.loading_count;
      }
    },
    count: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.loading_count = value;
        }
      }
    }
  }
};
</script>

<style>
.text-no-post{
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #838FA7;
}
</style>
