<template>
  <div>
    <slot v-if="loading" name="loading"></slot>
    <slot v-else></slot>
  </div>
</template>

<script>
import {
  // refreshTokenAndProfile,
  doRefreshToken,
  logout,
  isIdleToLong,
  needToRefreshToken,
  SESSION_CHECK_INTERVAL
} from '../lib/SessionHelper';

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      isRefreshing: false,
      timeoutId: null
    };
  },
  methods: {
    checkSession() {
      const vm = this;

      this.timeoutId = setTimeout(() => {
        if (!vm.isAuthenticated) {
          return;
        }

        const { lastApiActivity, tokenTimestamp } = this.$store.state.user;

        if (!isIdleToLong(lastApiActivity)) {
          if (needToRefreshToken(tokenTimestamp) && !this.isRefreshing) {
            this.isRefreshing = true;
            doRefreshToken(this)
              .then(() => {
                this.isRefreshing = false;
              })
              .catch(error => {
                this.isRefreshing = false;
                logout(this);
              });
          }
          this.checkSession();
        } else {
          logout(this);
        }
      }, SESSION_CHECK_INTERVAL * 1000);
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      const { lastApiActivity } = this.$store.state.user;
      if (!lastApiActivity || isIdleToLong(lastApiActivity)) {
        this.loading = false;

        logout(this);
      }

      // todo ade: aku matiin sementara, karena suka logout sendiri
      // refreshTokenAndProfile(this)
      //   .then(result => {
      //     this.loading = false;
      //   })
      //   .catch(e => {
      //     this.loading = false;
      //   });
      this.loading = false;
    } else {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['user/isAuthenticated'];
    }
  },
  watch: {
    isAuthenticated: {
      immediate: true,
      handler(value) {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        if (value) {
          this.checkSession();
        }
      }
    }
  }
};
</script>

<style></style>
