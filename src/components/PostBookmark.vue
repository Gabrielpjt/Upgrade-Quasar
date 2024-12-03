<template>
  <div class="q-py-md q-pa-none items-start q-mt-md">
    <!-- <div class="row q-pb-md">
      <div class="col kmp-font-lg kmp-font-bold">Bookmark Posts</div>
    </div> -->
    <div>
      <div v-if="is_loading && dataPost.length > 0">
        <q-item class="kmp-profile-item-list">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section class="q-py-md">
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="kmp-profile-item-list">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section class="q-py-md">
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="90%" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="kmp-profile-item-list">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section class="q-py-md">
            <q-item-label>
              <q-skeleton type="text" width="35%" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div v-else>
        <!-- {{dataPost[0].post}} -->
        <q-infinite-scroll @load="onLoad" :offset="250">
          <q-card class="q-mt-md my-card-profile-post" v-for="(item, index) in dataPost" :key="index">
            <div>
              <q-card-section>
                <div class="row q-mb-md">
                  <q-item-section avatar style="min-width: 10px" class="">
                    <Avatar size="xl" :picture="item.post.created_by_user.profile_picture ?  `./api${item.post.created_by_user.profile_picture}` : ''"
                            :name="item.post.created_by_user.name"
                    />
                  </q-item-section>
                  <q-item-section>
                    <div class="kmp-text-nama">
                      {{ item.post.created_by_user.profile_name }} <span class="kmp-time q-ml-xs">{{getTime(item.post.created_at)}}</span>
                    </div>
                    <PostStatus :post_status="item.post.status" :channel="item.post.post_channel ? item.post.post_channel.channel.short_name : null" />
                  </q-item-section>
                  <q-item-section side>
                    <div class="col-3 text-right kmp-post-button">
                      <q-btn-group outline class="kmp-color-8 kmp-bg-color-1 kmp-rounded-2">
                        <q-btn size="11px" icon="bookmark_remove" class="kmp-post-button-group" @click="handleDeleteBookmark(item)"/>
                      </q-btn-group>
                    </div>
                  </q-item-section>
                </div>

                <div class="kmp-post-text-title cursor-pointer" @click="openUrl(item.post.id,item.post.post_channel.channel_id)">
                  {{ item.post.title }}
                </div>
              </q-card-section>
            </div>
          </q-card>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px"/>
            </div>
          </template>
        </q-infinite-scroll>
      </div>

    </div>
  </div>
</template>

<script>
import Avatar from 'components/common/Avatar';
import { Notify, format } from 'quasar';
import { required } from 'vuelidate/lib/validators';
import { get } from 'src/lib/HttpHelper';
import { getLoginId, datePost } from 'src/lib/helper';
import { postBookmarkDelete } from 'src/lib/api';
import PostStatus from 'components/PostStatus';
// import _ from 'lodash';

const data_dummy = [
  {
    title: '',
    subtitle: '',
    icon: '',
    avatar: '',
    level_icon: '',
    level_title: '',
    level_point: ''
  }
];

export default {
  props: [],
  components: { Avatar, PostStatus },
  data () {
    return {
      leaderboard: {
        title: 'Member',
        data: data_dummy
      },
      group: '',
      formatQuasar: format,
      is_loading: true,
      dataPost: [],
      loginId: getLoginId(),
      modal_rsvp: false,
      rsvp_answer: '',
      poll_choice_id: null,
      pathPollPicture: `${process.env.QUASAR_API_URL}uploads/files/pollChoice/`,
      loading: false,
      totalDataPost: null
      // loadingPost: false
    };
  },
  validations: {
    group: {
      required
    }
  },
  methods: {
    getPostBookmark() {
      get({
        path: 'api/bookmark?limit=5&offset=0'
      }).then(res => {
        const response = res.data;
        // console.log(response[0].post);
        if (response) {
          response.forEach(v => {
            // v.post.cover = '';
            // if (v.post.article !== '' && v.post.article !== null) {
            //   const idxStart = v.post.article.indexOf('<img');
            //   const idxEnd = v.post.article.indexOf('>', v.post.article.indexOf('<img'));
            //   if (idxStart > -1 && idxEnd > -1) {
            //     v.post.cover = v.post.article.substring(idxStart, idxEnd + 1);
            //   }
            // }
            // v.post.date = dateCustom1(v.created_at);
            // v.post.time = timeCustom1(v.created_at);
            // v.post.profile_picture_custom = v.post.created_by_user.profile_picture ? process.env.QUASAR_API_URL + v.post.created_by_user.profile_picture : null;
            // v.post.post_conversation = {
            //   post_conversation_id: v.post.id,
            //   objConversation: v.post.post_conversation,
            //   hidden_conversation: true
            // };
            // if (v.post.post_type === 'Poll') {
            //   v.post.poll_user_participant = [];
            //   v.post.poll_options = v.post.poll.poll_choice.map(m => (
            //     { value: m.id, label: m.text, picture: m.picture }
            //   ));
            //   v.post.poll_choice_id = null;
            //   v.post.poll.end_date_format = dateFormat(v.post.poll.end_date);
            //   v.post.poll_expired = new Date() > new Date(v.post.poll.end_date);
            //   v.post.poll.poll_choice.forEach(e => { e.poll_participant.forEach(m1 => v.post.poll_user_participant.push(m1.users_id)); });
            //   v.post.poll.poll_choice.forEach(f => {
            //     f.value = f.id;
            //     f.label = f.text;
            //     f.scan = urlify(f.label);
            //     f.persentase = v.post.poll_user_participant.length > 0
            //       ? ((f.poll_participant.length / v.poll_user_participant.length) * 100).toFixed() : 0;
            //     f.choice = _.find(f.poll_participant, f1 => f1.users_id === this.loginId) !== undefined;
            //   });
            // }
            // if (v.post.post_type === 'Post' || v.post.post_type === 'Post Document' || v.post.post_type === 'Post Image' || v.post.post_type === 'Post Video') {
            //   v.post.scan = urlify(v.post.description);
            // }
            this.dataPost.push(v);
            this.totalDataPost = res.meta.total_data;
            this.is_loading = false;
          });
          // console.log(this.dataPost);
        }
      });
    },
    openUrl(post, channel) {
      this.$router.push({
        name: 'channel-detail-post-detail',
        params: {
          id: channel,
          post_id: post
        }
      });
    },
    updatePost() {
      this.$emit('update_post');
    },
    getTime(date) {
      return datePost(date);
    },
    handleDeleteBookmark(item) {
      // console.log(item.data_pin);
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to unbookmark this Post?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        postBookmarkDelete(item.id).then(res => {
          this.$emit('update_post');
          Notify.create({
            message: 'Post unbookmark.',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
        });
      });
    },
    onLoad(index, done) {
      const url = `api/bookmark?limit=5&offset=${this.dataPost.length}`;
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
              response.forEach(item => {
                this.dataPost.push(item);
              });
              done();
            } else {
              done();
            }
          });
        }, 2000);
      }
    }
  },
  mounted() {
    this.getPostBookmark();
  }
};
</script>

<style>
.kmp-text-nama {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #4F5A70;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.kmp-time {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #838FA7;
  flex: none;
  order: 1;
  flex-grow: 0;
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

.text-vote-desc {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */
  /* Neutral/400 */
  color: #838FA7;
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

.poll-container {
  display: flex;
  /*border: 1px solid;*/
}
.poll-col-1 {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.poll-col {
  margin-right: 10px;
  /*border: 1px solid;*/
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 50%;
}
.poll_text_img {
  height: 100px;
  max-width: 180px;
}
.poll-choice {
  background-color: #94D5FD;
  border-radius: 8px;
}
</style>
