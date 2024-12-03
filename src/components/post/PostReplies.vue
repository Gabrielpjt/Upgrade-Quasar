<template>
  <div class="row">
    <div class="col" v-if="count > 0">
      <span
        class="q-mr-sm"
        v-for="(conversation, conversation_index) in avatar_uniq"
        :key="conversation_index">
          <Avatar
            size="md"
            :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"
            :name="conversation.user.name"
            @click="goToProfile(conversation.user.id)"
          />
        </span>
      <span class="kmp-font-sm"
            :class="link ? 'kmp-text-blue-2 cursor-pointer' : ''"
            @click="handleSelectPost(post_id);">{{ count }} Replies</span>
    </div>

  </div>
</template>

<script>

import { postConversationList } from 'src/lib/api';
import Avatar from '../common/Avatar';
import bus from '../common/EventBus';

export default {
  props: ['replies_data', 'replies_link'],
  components: { Avatar },
  data() {
    return {
      avatar_uniq: [],
      count: 0,
      link: false,
      post_id: null,
      is_loading: false
    };
  },
  mounted() {
    bus.$on('replies_refresh', data => {
      if (data === this.post_id) {
        setTimeout(() => {
          this.getRepliesByPost(data);
        }, Math.floor((Math.random() * 150) + 50));
      }
    });
  },
  methods: {
    getRepliesByPost(id) {
      postConversationList({ post_id: id }).then(res => {
        this.count = res.data.length;
        this.avatar_uniq = [...new Map(res.data.map(item => [item.created_by, item])).values()];
      });
    },
    handleSelectPost(id) {
      this.$emit('select_post', id);
    },
    goToProfile(id) {
      this.$router.push({
        name: 'profile-detail',
        params: {
          id
        }
      });
    },
    refreshCount(post_id) {
      bus.$emit('replies_refresh', post_id);
    }
  },
  watch: {
    replies_data: {
      immediate: true,
      deep: true,
      handler(value) {
        this.post_id = value.post_conversation_id;
        this.count = value.count_replies;
        this.avatar_uniq = value.post_conversation_uniq;
      }
    },
    replies_link: {
      immediate: true,
      handler(value) {
        if (value) {
          this.link = true;
        }
      }
    }
  }
};
</script>

