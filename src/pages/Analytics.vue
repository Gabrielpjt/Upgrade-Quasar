<template>
  <q-page>
    <LeftBar :is_loading="util.refresh" @onResize="onResize"/>
    <q-page-sticky expand position="top" class="kmp-bar">
      <q-toolbar class="kmp-header">
        <q-icon name="insert_chart" class="q-mr-sm" size="26px"/>
        <span class="text-capitalize">Analytics</span> <span class="text-capitalize">&nbsp;/ {{title}}</span>
        <q-space/>
        <!--        <q-icon v-if="this.$q.platform.is.mobile" name="info_outline" size="24px" class="q-ml-sm icon-menu text-p-color text-right" @click="changeInfo()"/>-->
      </q-toolbar>
    </q-page-sticky>
    <div style="margin-top: 20px">&nbsp;</div>
    <router-view />
  </q-page>
</template>

<style></style>

<script>
import LeftBar from 'components/LeftBar';

export default {
  name: 'Analytics',
  components: { LeftBar },
  data() {
    return {
      util: {
        refresh: false,
        heightObserver: 0
        // onResize(data) {
        //   this.util.heightObserver = data;
        // }
      }
    };
  },
  computed: {
    title: {
      get() {
        let name = '';
        switch (this.$route.name) {
          case 'analytics-audience':
            name = 'Audience';
            break;
          case 'analytics-content':
            name = 'Content Platform';
            break;
          case 'analytics-channel':
            name = 'Channel';
            break;
          default:
            name = 'Knowledge Map';
        }
        return name;
      }
    }
  },
  methods: {
    onResize(data) {
      this.util.heightObserver = data;
    }
  }
};
</script>
