<template>
  <div>
    <!-- {{forward_count}} -->
    <div v-if="forward_count > 0 && channel_id !== $route.params.id" class="kmp-post-status-verify">
      <q-icon name="reply" class="check-icon" size="16px" style=""/>
      <span class="q-ml-xs q-mt-xs">Forwarded from {{channel}}</span>
    </div>
    <div v-if="status.toLowerCase() === 'verified'" class="kmp-post-status-verify">
      <q-icon name="check_circle" class="check-icon" size="16px" style=""/>
      <span class="q-ml-xs q-mt-xs">Verified Post</span>
    </div>
    <div v-if="limit_status === true" class="kmp-post-status-verify">
      <q-icon name="lock" class="check-icon" size="16px" style=""/>
      <span class="q-ml-xs q-mt-xs">Limited Post</span>
    </div>
    <div v-else-if="status.toLowerCase() === 'unverified'" class="kmp-post-status-channel">
      <q-icon v-show="type === 'General'" name="public" class="check-icon" size="16px" style="" />
      <q-icon v-show="type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />
      <q-icon v-show="type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />
      <q-icon v-show="type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />
      <q-icon v-show="type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />
      <span class="q-ml-xs q-mt-xs">{{ channel }}</span>
    </div>
    <div v-else-if="status.toLowerCase() === 'kmap' && knowledge !== null" :class="knowledge.approved === true ? 'kmp-post-status-kmap' : 'kmp-post-status-kmap-pending'">
      <q-icon name="class" class="check-icon" size="16px" style="" />
      <span class="q-ml-xs q-mt-xs">KMAP Post {{knowledge.approved === true ? '' : '(Pending)'}} </span>
    </div>
    <div v-else-if="status.toLowerCase() === 'knowledge'" class="kmp-post-status-kmap">
      <q-icon name="class" class="check-icon" size="16px" style="" />
      <span class="q-ml-xs q-mt-xs">{{ channel }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['channel', 'post_status', 'type', 'limit_status', 'forward_count', 'channel_id', 'knowledge'],
  data() {
    return {
      status: ''
    };
  },
  methods: {
  },
  watch: {
    post_status: {
      immediate: true,
      handler(value) {
        this.status = value;
      }
    }
  },
  mounted() {
  }
};
</script>

<style>

</style>
