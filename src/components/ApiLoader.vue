<template>
  <div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="isLoading" key="item1">
        <slot name="loading">
          <q-spinner-bars />
        </slot>
      </div>
      <div v-else key="item2">
        <slot v-if="isError" name="error">
          <div>{{ currentErrorMessage }}</div>
          <q-btn label="Coba Lagi" @click="doFetch" />
        </slot>
        <slot v-else :response="response"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    fetch: Function,
    initialData: Object,
    customErrorMessage: String,
    loadingMessage: {
      type: String,
      default: 'Memuat Data...'
    },
    showDefaultErrorMessage: {
      type: Boolean,
      default: true
    },
    autoload: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentErrorMessage() {
      if (this.showDefaultErrorMessage) {
        return this.errorMessage;
      }
      if (this.customErrorMessage) {
        return this.customErrorMessage;
      }
      return null;
    }
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      response: null,
      errorMessage: ''
    };
  },
  created() {
    if (this.autoload) {
      this.doFetch();
    }
  },
  methods: {
    reload() {
      this.doFetch();
    },
    doFetch() {
      const instance = this;
      if (instance.initialData) {
        instance.$emit('loadingStarted');

        instance.isLoading = false;
        instance.isError = false;

        instance.$emit('loadingEnded', {
          success: true,
          data: instance.initialData,
          message: 'Data Found. Prevent unnecessary API call'
        });
      } else {
        instance.isLoading = true;
        instance.$emit('loadingStarted');

        instance
          .fetch()
          .then(response => {
            instance.isLoading = false;
            instance.isError = false;
            let errorMessage = '';

            if (!response.errors) {
              this.response = response;
              instance.$emit('loadingEnded', {
                success: true,
                data: response,
                message: 'API success'
              });
            } else {
              instance.isError = true;
              errorMessage = 'Error Fetching via API: status not success';

              instance.$emit('loadingEnded', {
                success: false,
                message: errorMessage,
                error: response
              });
            }
            instance.errorMessage = errorMessage;
          })
          .catch(error => {
            instance.isLoading = false;
            instance.isError = true;
            instance.errorMessage = 'Error API response';

            instance.$emit('loadingEnded', {
              success: false,
              message: instance.errorMessage,
              error
            });
          });
      }
    }
  }
};
</script>

<style>
</style>
