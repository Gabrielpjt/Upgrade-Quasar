<template>
<div>
  <div class="q-pr-md" v-if="state == 'Decline' || state == 'Leave'">
    <q-banner inline-actions rounded class="kmp-alert alert-orange">
    <span class="text-alert">You’re left from the channel, please contact admin for further information.</span>
    </q-banner>
  </div>
  <div class="q-pr-md" v-if="state == 'guest' && data_channel.channel_type !== 'General' && !data_channel.is_private">
    <q-banner inline-actions rounded class="kmp-alert alert-blue">
    <span class="text-alert">You are viewing this channel as a guest.</span>
    </q-banner>
  </div>
  <div class="q-pr-md" v-if="state == 'guest' && data_channel.channel_type !== 'General' && data_channel.is_private">
    <q-banner inline-actions rounded class="kmp-alert alert-red">
    <span class="text-alert">You are not viewing this channel as a guest.</span>
    </q-banner>
  </div>
  <div class="q-pr-md" v-if="state == 'Request'">
    <q-banner inline-actions rounded class="kmp-alert alert-green">
    <span class="text-alert">Request to join has been send. Please wait for admin approval.</span>
    </q-banner>
  </div>
</div>
</template>

<script>
export default {
  props: ['state', 'data_channel'],
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>
