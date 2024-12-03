<template>
  <div id="q-app">
    <session-manager>
      <template v-slot:loading>
        <q-layout view="lHh Lpr lFf">
          <q-page-container>
            <q-page class="flex flex-center">
              <q-spinner-dots size="3em" color="primary"></q-spinner-dots>
<!--              <div class="row kmp-font-sm kmp-text-grey-1">-->
<!--                Loading..-->
<!--              </div>-->
            </q-page>
          </q-page-container>
        </q-layout>
      </template>
      <template v-slot:default>
        <router-view />
      </template>
    </session-manager>
  </div>
</template>

<script>
import SessionManager from 'components/SessionManager';

export default {
  components: { SessionManager },
  name: 'App',
  data() {
    return {
      appName: 'KM Portal'
    };
  },
  computed: {
    currentAccessId() {
      const currentAccess = this.$store.getters['user/currentAccess'];

      return currentAccess ? currentAccess.id : -1;
    }
  }
};
</script>

<style></style>
