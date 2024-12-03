<template>
  <q-tooltip v-if="remainingIdleTime">Otomatis logout dalam {{remainingIdleTime}} menit</q-tooltip>
</template>

<script>
import {
  getRemainingIdleTime,
  SESSION_CHECK_INTERVAL
} from '../lib/SessionHelper';

export default {
  data() {
    return {
      timeoutId: null,
      remainingIdleTime: null
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['user/isAuthenticated'];
    }
  },
  methods: {
    calculateRemainingIdleItem() {
      this.timeoutId = setTimeout(() => {
        if (this.$store.state.user.lastApiActivity) {
          this.remainingIdleTime = getRemainingIdleTime(
            this.$store.state.user.lastApiActivity
          );
          this.calculateRemainingIdleItem();
        } else if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
      }, SESSION_CHECK_INTERVAL * 1000);
    }
  },
  watch: {
    isAuthenticated: {
      immediate: true,
      handler(value) {
        if (!value) {
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
        } else {
          this.calculateRemainingIdleItem();
        }
      }
    }
  }
};
</script>

<style scoped></style>
