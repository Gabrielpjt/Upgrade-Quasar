<template>
  <div v-show="dataPost.length > 0">
    <PostLoading v-if="is_loading"/>
    <div v-show="channel.id === 39 || is_km_manager || ['Member', 'Admin'].includes(state) || (state === 'guest' && !channel.is_private && channel.channel_type !== 'Direktorat')" :class="$q.platform.is.mobile ? 'q-py-sm items-start' : 'q-py-md q-pr-lg items-start'">
      <q-infinite-scroll @load="onLoad" :offset="250">
        <PostModel v-if="!is_loading"
                   :data_post="dataPost"
                   :data_pin="data_pin"
                   :state="state"
                   :show_draft="is_show_draft"
                   :heightObserver="heightObserver"
                   :reaction_list="reaction_list"
                   :jumlah="jumlah"
                   :data_channel="channel"
                   @update_conversation="updateConversation"
                   @update_channel="updateChannel($route.params.id)"
                   @update_post="updatePost"
                   @select_post="handleSelectPost"
                   @open_article="openArticle"
                   @get_notif="getBadgeNotif"
        />
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px"/>
          </div>
        </template>
      </q-infinite-scroll>
    </div>
    <div v-show="channel.id !== 39 && !is_km_manager && !['Member', 'Admin'].includes(state) && !(state === 'guest' && !channel.is_private && channel.channel_type !== 'Direktorat')">
      <PostEmpty :state="state"/>
    </div>
  </div>
</template>

<script>
import PostModel from 'components/PostModel';
import PostLoading from 'components/PostLoading';
import PostEmpty from 'components/PostEmpty';
import { dateFormat } from 'src/lib/helper';
import { get } from '../lib/HttpHelper';

export default {
  components: { PostModel, PostLoading, PostEmpty },
  props: ['state', 'show_draft', 'heightObserver', 'reaction_list', 'jumlah', 'data_pin', 'channel', 'is_km_manager'],
  data() {
    return {
      dataPost: [],
      totalDataPost: null,
      is_loading: true,
      channel_id: null,
      post_id: null,
      is_show_draft: false
    };
  },
  methods: {
    updateConversation() {
      this.getPost(this.is_show_draft);
    },
    updateChannel() {
      this.$emit('update_channel', this.$route.params.id);
    },
    openArticle(id, position) {
      this.$emit('open_article', id, position);
    },
    getBadgeNotif(modul) {
      this.$emit('get_notif', modul);
    },
    updatePost() {
      this.$emit('update_post');
    },
    getPost(is_draft) {
      this.is_loading = true;
      const pathURL = this.post_id === null
        ? `api/post?channel_id=${this.channel_id}&limit=5&offset=0&is_draft=${is_draft}`
        : `api/post?channel_id=${this.channel_id}&limit=5&offset=0&is_draft=${is_draft}&post_id=${this.post_id}`;
      get({
        path: pathURL
      }).then(res => {
        const response = res.data;
        response.forEach(v => {
          v.post_conversation = {
            post_conversation_id: v.id,
            post_conversation_uniq: [...new Map(v.post_conversation.map(item => [item.created_by, item])).values()],
            objConversation: v.post_conversation,
            count_replies: v.post_conversation.length,
            hidden_conversation: true
          };
          if (v.post_type === 'Poll') {
            v.poll_user_participant = [];
            v.poll_options = v.poll.poll_choice.map(m => (
              { value: m.id, label: m.text, picture: m.picture }
            ));
            v.poll_choice_id = '';
            v.poll.end_date_format = dateFormat(v.poll.end_date);
            v.poll_expired = new Date() > new Date(v.poll.end_date);
            v.poll.poll_choice.forEach(e => { e.poll_participant.forEach(m1 => v.poll_user_participant.push(m1.users_id)); });
          }
        });
        // this.$emit('update_loading', false);
        this.dataPost = response;
        this.totalDataPost = res.meta.total_result;
        this.is_loading = false;
      });
    },
    onLoad(index, done) {
      const url = this.post_id === null
        ? `api/post?channel_id=${this.channel_id}&limit=5&offset=${this.dataPost.length}&is_draft=${this.is_show_draft}`
        : `api/post?channel_id=${this.channel_id}&limit=5&offset=${this.dataPost.length}&is_draft=${this.is_show_draft}&post_id=${this.post_id}`;
      if (this.dataPost.length === 0) {
        done();
      } else if (this.dataPost.length === this.totalDataPost) {
        done();
      } else {
        setTimeout(() => {
          get({
            path: url
          }).then(res => {
            const response = res.data;
            if (response) {
              response.forEach(v => {
                v.post_conversation = {
                  post_conversation_id: v.id,
                  post_conversation_uniq: [...new Map(v.post_conversation.map(item => [item.created_by, item])).values()],
                  objConversation: v.post_conversation,
                  count_replies: v.post_conversation.length,
                  hidden_conversation: true
                };
                if (v.post_type === 'Poll') {
                  v.poll_user_participant = [];
                  v.poll_options = v.poll.poll_choice.map(m => (
                    { value: m.id, label: m.text, picture: m.picture }
                  ));
                  v.poll_choice_id = '';
                  v.poll.end_date_format = dateFormat(v.poll.end_date);
                  v.poll_expired = new Date() > new Date(v.poll.end_date);
                  v.poll.poll_choice.forEach(e => { e.poll_participant.forEach(m1 => v.poll_user_participant.push(m1.users_id)); });
                }
                this.dataPost.push(v);
                done();
              });
            } else {
              done();
            }
          });
        }, 2000);
      }
    },
    handleSelectPost(id) {
      this.$emit('select_post', id);
    }
  },
  watch: {
    '$route.params.post_id': {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.post_id = value;
        }
      }
    },
    '$route.params.id': {
      immediate: true,
      deep: true,
      handler(value) {
        this.channel_id = value;
        this.getPost(this.is_show_draft);
      }
    },
    show_draft: {
      immediate: true,
      deep: true,
      handler(value) {
        // if (value !== undefined) {
        this.is_show_draft = value;
        this.getPost(this.is_show_draft);
        // }
      }
    }
  }
};
</script>

<style>
.text-vote-desc {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */


  /* Neutral/400 */

  color: #838FA7;

}

.text-url {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */


  /* Primary/600 */

  color: #2C8ED3;
}

.title-nocolor {
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
}

.desc-nocolor {
  font-style: normal;
  font-weight: normal;
  font-size: 8px;
  line-height: 14px;
}

.tabs-tool {
  background: #E6F4FF;
  border-radius: 8px;
  color: #2C8ED3;
}

.text-pinned {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */


  /* Accent/Yellow/700 */

  color: #F5D529;
}

.text-doc {
  color: #3B68FF;
}

.text-kmap {
  color: #56B635;
}

.text-channel {
  color: #838FA7;
}

.orange-card {
  background: #FFF7EC;
}

.red-card {
  background: #FFECF0;
  border: 1px solid #FFB4C5;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: none;
  color: #F33F6A;
}

.yellow-card {
  background: #FFF7EC;
  /* Accent/Orange/300 */

  border: 1px solid #FFDEAC;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: none;
  color: #FFB038;
}

.grey-card {
  background: #EFF1F4;
  /* Neutral/500 */

  border: 1px solid #65738F;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: none;
  color: #65738F;
}

.text-nama {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Neutral/600 */

  color: #4F5A70;


  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 4px;
}

.time {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Neutral/400 */

  color: #838FA7;


  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 4px;
}

.text-verif {
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 160% */


  /* Primary/600 */

  color: #2C8ED3;


  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 4px;
}

.text-title {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Neutral/700 */

  color: #394151;


  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}

.text-event-title {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;

  color: #4F5A70;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 8px 0px;
}

.text-content {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */


  /* Neutral/600 */

  color: #4F5A70;
}

.text-more {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */


  /* Primary/600 */

  color: #2C8ED3;


  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 5px 0px;
}

.react-icon {
  background: #EFF1F4;
  border-radius: 2px;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  /* Primary/600 */

  color: #2C8ED3;

}

.react-icon-active {
  background: #E6F4FF;
  border-radius: 2px;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  /* Primary/600 */

  color: #2C8ED3;

}

.text-rep-count {
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 160% */

  text-align: center;

  /* Primary/600 */

  color: #2C8ED3;


  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 4px;
}

.text-desc {
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 160% */


  /* Neutral/300 */

  color: #A2ABBD;


  /* Inside Auto Layout */

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  margin: 4px 0px;
}

.vote-button {
  background: #6ABDF8;
  border-radius: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */


  /* Neutral/000 */

  color: #FFFFFF;

}
</style>
