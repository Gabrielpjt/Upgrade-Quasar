<template>
  <q-page-sticky expand position="top" class="kmp-bar">
    <q-toolbar class="kmp-header" :style="this.$q.platform.is.mobile? 'line-height: 1.3em;' : ''">
      <q-avatar v-if="data.avatar" class="q-mr-sm" size="20px">
        <img :src="url + data.avatar">
      </q-avatar>
      <span v-else="">
        <q-icon v-if="data.channel_type === 'General'" name="public" class="q-mr-sm" size="20px" />
        <q-icon v-if="data.channel_type === 'Direktorat'" name="domain" class="q-mr-sm" size="20px" />
        <q-icon v-if="data.channel_type === 'COP'" name="group_add" class="q-mr-sm" size="20px" />
        <q-icon v-if="data.channel_type === 'Project'" name="chat_bubble" class="q-mr-sm" size="20px" />
        <q-icon v-if="data.channel_type === 'Hobby'" name="sports_esports" class="q-mr-sm" size="20px" />
      </span>
      <span class="" style="text-transform: none !important">{{data.name}}</span>
      <q-space />
      <q-icon v-if="this.$q.platform.is.mobile" name="info_outline" size="24px" class="q-ml-sm icon-menu text-p-color text-right" @click="changeInfo()"/>
    </q-toolbar>
  </q-page-sticky>
    <!-- <div class="col-4 text-right">
      <q-avatar size="24px" color="primary" text-color="white">AA</q-avatar>
      <q-avatar size="24px" style="margin-left:-5px">
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>
      <q-avatar size="24px" class="q-mr-sm" style="margin-left:-5px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      </q-avatar>
      <span class="text-grey-7 q-mr-sm text-weight-medium">+12</span>
      <q-icon name="person_add" size="24px" class="q-ml-sm q-mr-sm icon-menu text-p-color" />
      <q-icon name="info_outline" size="24px" class="q-ml-sm q-mr-lg icon-menu text-p-color" />
    </div> -->
<!--    <q-tabs-->
<!--        class="text-teal"-->
<!--        style="background: #E6F4FF;padding: 10px 0px"-->
<!--      >-->
<!--      &lt;!&ndash; <q-btn flat label="Homepage" /> &ndash;&gt;-->
<!--      <q-icon name="domain" class="q-ml-lg q-mr-sm icon-menu text-p-color" />-->
<!--      <span-->
<!--            class="text-p-color cursor-pointer header-text"-->
<!--          >{{data.name}}</span-->
<!--          >-->
<!--      <q-space />-->
<!--        <q-avatar size="24px" color="primary" text-color="white">AA</q-avatar>-->
<!--        <q-avatar size="24px" style="margin-left:-5px">-->
<!--            <img src="https://cdn.quasar.dev/img/avatar.png">-->
<!--        </q-avatar>-->
<!--        <q-avatar size="24px" class="q-mr-sm" style="margin-left:-5px">-->
<!--            <img src="https://cdn.quasar.dev/img/boy-avatar.png">-->
<!--        </q-avatar>-->
<!--        <span class="text-grey-7 q-mr-sm text-weight-medium">+12</span>-->
<!--        <q-icon name="person_add" size="24px" class="q-ml-sm q-mr-sm icon-menu text-p-color" />-->
<!--        <q-icon name="info_outline" size="24px" class="q-ml-sm q-mr-lg icon-menu text-p-color" />-->
<!--    </q-tabs>-->
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      url: process.env.QUASAR_API_URL
    };
  },
  methods: {
    changeInfo() {
      this.$root.$emit('changeChannelInfo');
    }
  },
  mounted() {}
};
</script>

<style>
.text-p-color{
  color: #2C8ED3;
}
</style>
