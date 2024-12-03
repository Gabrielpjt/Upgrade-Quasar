<template>
  <q-page>
    <LeftBar :is_loading="refresh" @onResize="onResize" />
    <ChannelBar :data="data_channel"/>
    <div v-show="is_show_post" class="row q-pa-lg kmp-content-channel">
      <div class="col-12 col-md-7">
        <Banner :state="state" :data_channel="data_channel"/>
        <RightBar v-if="mobile_info && $q.platform.is.mobile" :heightObserver="heightObserver" :data="data_channel" :state="state" :data_member="data_member"
                  :data_request="data_request" :user="user" :is_channel_manager="is_channel_manager"
                  :is_content_manager="is_content_manager" :is_km_manager="is_km_manager"
                  :role_archive="role_archive"
                  :channel_member_user="channel_member_user" :post_channel_verified="post_channel_verified"
                  :post_channel_pinned="post_channel_pinned"
                  :is_loading="is_loading" @loading="loading" :id_member="id_member" :id_request="id_request" @change_info="toggleInfo"
                  @update_member="getChannel($route.params.id)"
                  @get_notif="getBadgeNotif"/>
        <PostCreate :data_channel="data_channel"
          :heightObserver="heightObserver"
          :jumlah="data_channel.post_channel.length"
          @update_post="updatePost"
          @update_loading="updateLoading"
          @update_channel="getChannel($route.params.id)"
          :is_channel_manager="is_channel_manager"
          :is_content_manager="is_content_manager"
          :is_km_manager="is_km_manager"
          v-if="['Member', 'Channel Manager', 'Admin'].includes(state) || data_channel.channel_type === 'General'"/>
        <div class="row q-mt-md flex">
          <div class="col-1 kmp-font-bold">
            <span style="color: #C1C7D3;"> {{is_show_draft?'DRAFT':'TODAY'}} </span>
          </div>
          <div class="col-11">
            <q-separator :class="$q.platform.is.mobile ? 'separator-today-mobile' : 'separator-today'"/>
          </div>
        </div>

        <div :class="$q.platform.is.mobile ? 'q-pt-md q-mb-sm' : 'q-pr-lg q-pt-md'" v-if="this.article_draft_total > 0">
          <q-banner inline-actions rounded class="alert-yellow">
            <span class="kmp-color-6">You have {{this.article_draft_total}} draft of Posts. </span>
            <span class="text-alert cursor-pointer kmp-underline" @click="toggleDraft">{{is_show_draft?'Hide':'Show'}}</span>
          </q-banner>
        </div>
        <Post v-if="!is_loading"
              :key="reload"
              :state="state"
              :show_draft="is_show_draft"
              :heightObserver="heightObserver"
              :reaction_list="reaction_list"
              :jumlah="data_channel.post_channel.length"
              :data_pin="data_pin"
              :channel="data_channel"
              @update_post="updatePost"
              @update_loading="updateLoading"
              @update_channel="getChannel($route.params.id)"
              @select_post="handleSelectPost"
              @open_article="openArticle"
              :is_km_manager="is_km_manager"
              @get_notif="getBadgeNotif"/>
        <PostEmpty :key="reload" v-if="!is_loading && data_channel.post_channel && data_channel.post_channel.length === 0" :state="state"/>
        <PostLoading v-if="is_loading"/>
      </div>
      <div class="col-5">
        <!--        <DetailPost/>-->
        <RightBarPost v-if="selected_post && $q.platform.is.desktop"
                      :post_id="selected_post"
                      :heightObserver="heightObserver"
                      :reaction_list="reaction_list"
                      @remove_selected="handleRemoveSelectedPost"
                      @update_conversation="updatePost"
                      @show_detail_article="showDetailArticle"
        />
        <RightBar v-if="!selected_post && $q.platform.is.desktop" :heightObserver="heightObserver" :data="data_channel" :state="state" :data_member="data_member"
                  :data_request="data_request" :user="user"
                  :is_channel_manager="is_channel_manager"
                  :is_content_manager="is_content_manager"
                  :is_km_manager="is_km_manager"
                  :role_archive="role_archive"
                  :channel_member_user="channel_member_user" :post_channel_verified="post_channel_verified"
                  :post_channel_pinned="post_channel_pinned"
                  :is_loading="is_loading" @loading="loading" :id_member="id_member" :id_request="id_request"
                  @update_member="getChannel($route.params.id)" class="desktop-only"
                  @get_notif="getBadgeNotif"/>
      </div>
      <!--      <q-inner-loading :showing="is_loading">-->
      <!--        <q-spinner size="50px" color="primary"/>-->
      <!--      </q-inner-loading>-->
    </div>
    <div v-show="!is_show_post" class="row q-pa-lg kmp-content-channel">
      <div class="col-12">
        <PostLoading v-if="article === null" :count="1"/>
      </div>
      <div class="col-12" v-if="article !== null">
        <div class="items-start">
          <q-card class="">
          <q-icon name="close" :size="$q.platform.is.mobile ? '20px' : '30px'"
                    class="cursor-pointer float-right q-mt-sm q-mr-sm" style="" @click="closeDetailArticle()"/>&nbsp;
              <!--            <q-card-section class="q-py-sm q-pt-lg">-->
              <PostHeader
                :show_edit="false"
                :show_close="true"
                :show_menu="false"
                :data="article"
                :state="state"
                @onClose="closeArticle"
                :channel="data_channel"/>
              <!--            </q-card-section>-->

            <q-separator class="q-mt-lg"/>

            <div class="kmp-post-text-title q-mt-md q-mb-md q-ml-md kmp-font-xl text-center">
              {{ article.title }}
            </div>

            <q-separator v-if="article.featured_image_file !== null"/>
            <div v-if="article.featured_image_file !== null" class="q-my-md text-center">
              <img :src="`./api/${article.featured_image_file.path}`" alt="cover" />
            </div>

            <q-separator/>
            <q-card-section>
              <div>
              <div v-html="article.article.replace(/oembed url/g,'iframe style=\'width: 100%; height: 300px;\' src').replace(/oembed>/g,'iframe>').replace(/watch\?v=/, 'embed/')" class="text-justify"/>
              </div>
            </q-card-section>

            <q-card-section v-if="article.post_links.length >0 || article.post_file.length >0">
              <h6 class="q-my-lg">Attachment</h6>
              <q-list>
                <q-item class="q-px-none q-py-xs" style="min-height: unset" v-for="(item, index) in article.post_links" :key="index">
                  <q-item-section>
                    <q-item-label>{{index+1}}.&nbsp;&nbsp;<a :href="item.url" target="_blank">{{item.url}}</a></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-px-none q-py-xs" style="min-height: unset" v-for="(item, index) in article.post_file" :key="`L${index}`">
                  <q-item-section class="cursor-pointer" @click="clickFile(item.file.path, item.file.filename)">
                      <q-card bordered class="q-py-xs q-px-sm kmp-font-md kmp-bg-color-1" style="max-width: 30vw">
                        <q-icon name="fas fa-file" class="q-mr-sm" size="14px"/>
                        <span class="kmp-font-md">{{ item.file.filename }}</span>
                        <span class="q-ml-sm kmp-font-sm kmp-color-5">{{ formatQuasar.humanStorageSize(item.file.filesize) }}</span>
                      </q-card>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <postView class="q-mb-sm" :data="article"/>
            <q-separator/>

            <!--
            <q-card-section horizontal>
              <q-card-section>
                discussion here<br/>
              </q-card-section>
            </q-card-section>
            -->
            <q-card-section class="row">
              <div class="col-12 col-md-6">
                <PostConversation class="q-pt-none" :post_id="article.id" :data_conversation="article.post_conversation" />
              </div>
            </q-card-section>

          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { format, Notify } from 'quasar';
import LeftBar from 'components/LeftBar';
import ChannelBar from 'components/ChannelBar';
import PostCreate from 'components/PostCreate';
import Post from 'components/Post';
import RightBar from 'components/RightBar';
import RightBarPost from 'components/post/RightBarPost';
import Banner from 'components/Banner';
import PostEmpty from 'components/PostEmpty';
import PostLoading from 'components/PostLoading';
import PostHeader from 'components/PostHeader';
import PostConversation from 'components/PostConversation';
import PostView from 'components/post/PostView';
import bus from 'components/common/EventBus';
import { getCredential } from 'src/lib/storage';
import { get } from 'src/lib/HttpHelper';
import { urlify, datePost, checkRole } from 'src/lib/helper';
import {
  channelDetail, fileOriName, postDetail, postPinList,
  channelMemberLatest, getPointHistory
} from '../lib/api';
// import DetailPost from 'components/DetailPost';

export default {
  components: {
    ChannelBar,
    PostCreate,
    Post,
    RightBar,
    RightBarPost,
    Banner,
    LeftBar,
    PostEmpty,
    PostLoading,
    PostHeader,
    PostConversation,
    PostView
    // DetailPost
  },
  data() {
    return {
      formatQuasar: format,
      jumlah: 0,
      heightObserver: 0,
      data_channel: {
        scan: {
          textLimit: '',
          text: ''
        }
      },
      state: '',
      loading_channel: true,
      is_loading: true,
      refresh: false,
      data_member: '',
      data_request: '',
      selected_channel: 0,
      selected_post: null,
      reload: 0,
      id_member: [],
      id_request: [],
      channel_member_user: '',
      user: {
        id: '',
        name: '',
        initial: ''
      },
      post_channel_verified: [],
      post_channel_pinned: [],
      is_channel_manager: false,
      is_content_manager: false,
      is_km_manager: false,
      article: null,
      is_show_post: true,
      is_show_draft: false,
      article_draft_total: 0,
      reaction_list: [],
      data_pin: [],
      mobile_info: false,
      role_archive: false,
      currentPos: null
    };
  },
  methods: {
    toggleDraft() {
      this.is_show_draft = !this.is_show_draft;
    },
    closeArticle() {
      this.article = null;
      this.is_show_post = true;
    },
    openArticle(id, position) {
      this.currentPos = position;
      this.is_show_post = false;
      window.scrollTo(0, 0);
      postDetail(id).then(res => {
        this.article = res.data;
        console.log(this.article);
        this.article.time = datePost(this.article.created_at);
      });
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      const Role = checkRole().name;
      if (Role === 'channel_manager') {
        this.is_channel_manager = true;
      }
      if (Role === 'content_manager') {
        this.is_content_manager = true;
      }
      if (Role === 'km_manager') {
        this.is_km_manager = true;
      }

      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
    },
    getRoleChannel() {
      const data = this.state;
      if (data === 'Admin' || data === 'Channel Manager') {
        this.role_channel = 'Admin';
      } else {
        this.role_channel = 'Member';
      }
      if (this.role_channel === 'Admin') {
        this.role_archive = true;
      } else {
        this.role_archive = false;
      }
      if (this.is_km_manager === true && this.data_channel.channel_type === 'General') {
        this.role_archive = true;
      }
      if (this.data_channel.channel_type === 'Direktorat' && (this.is_content_manager === true || this.is_channel_manager === true)) {
        this.role_archive = true;
      }
    },
    getDraftPost(channel_id) {
      get({
        path: `api/post?channel_id=${channel_id}&limit=100&offset=0&is_draft=true`
      }).then(res => {
        this.article_draft_total = res.meta.total_result;
        if (res.meta.total_result === 0) this.is_show_draft = false;
      });
    },
    getReaction() {
      get({
        path: 'api/reaction'
      }).then(res => {
        this.reaction_list = res.data;
      });
    },
    getChannel(id) {
      this.is_loading = true;
      channelDetail(id).then(response => {
        this.data_channel = response.data;
        if (response.data.post_channel) {
          this.post_channel_verified = this.data_channel.channel_type === 'General' ? response.data.post_channel.filter(x => x.post[0].status === 'Knowledge') : response.data.post_channel.filter(x => x.post[0].status === 'Knowledge' || (x.post[0].status === 'Kmap' && x.post[0].unlist !== true));
          this.post_channel_pinned = response.data.post_channel.filter(x => x.post[0].pinned_by !== null);
        }
        if (response.data.channel_member) {
          const data_filter = response.data.channel_member.filter(x => x.user !== null);
          if (['General', 'Direktorat'].includes(response.data.channel_type)) {
            this.data_member = data_filter.sort((a, b) => (a.user.name > b.user.name ? 1 : -1)).filter(item => item.member_role !== 'Admin');
          } else {
            this.data_member = data_filter.sort((a, b) => (a.user.name > b.user.name ? 1 : -1)).filter(item => item.enabled === true);
          }
          this.data_request = data_filter.filter(x => x.member_role === 'Request').sort((a, b) => (a.user.name > b.user.name ? 1 : -1));
          this.data_member.forEach(f => {
            this.id_member.push(f.users_id);
            const profile_picture = f.user.profile_picture ? `${process.env.QUASAR_API_URL}${f.user.profile_picture}` : null;
            f.user.profile_picture_custom = profile_picture;
          });
          this.data_request.forEach(f => {
            this.id_request.push(f.id);
            const profile_picture = f.user.profile_picture ? `${process.env.QUASAR_API_URL}${f.user.profile_picture}` : null;
            f.user.profile_picture_custom = profile_picture;
          });
          const current_channel_member = response.data.channel_member.find(x => x.users_id === this.user.id);
          this.channel_member_user = current_channel_member;
          let type = '';
          if (response.data.channel_type === 'General') {
            type = 'General';
            channelMemberLatest({ id: this.user.id, type });
          } else {
            type = 'Channel';
          }
          if (current_channel_member) {
            this.state = current_channel_member.member_role;
            channelMemberLatest({ id, type: 'Channel' });
          } else {
            this.state = 'guest';
          }
        }
        this.data_channel.scan = urlify(this.data_channel.description);
        this.is_loading = false;
        this.getPin();
        this.getRoleChannel();
      });
    },
    updatePost() {
      const value = this.$route.params.id;
      this.reload += 1;
      this.getChannel(value);
      this.getDraftPost(value);
      this.is_show_draft = false;
      // this.getPin();
    },
    updateLoading(value) {
      this.loading_channel = value;
    },
    onResize(value) {
      this.heightObserver = value;
    },
    loading(key, selected) {
      this.refresh = selected;
      if (!selected) {
        this.getChannel(parseInt(this.$route.params.id, 10));
      }
    },
    handleSelectPost(id) {
      this.selected_post = id;
    },
    handleRemoveSelectedPost() {
      this.selected_post = null;
    },
    closeDetailArticle() {
      this.is_show_post = true;
      setTimeout(() => {
        window.scrollTo({
          top: this.currentPos
        });
      }, 100);
    },
    showDetailArticle() {
      this.hideDetailArticle = false;
    },
    clickFile(url, name) {
      const params = { url, name };
      fileOriName(params).then(res => {});
      // window.open(`${process.env.QUASAR_API_URL}api/file/original?url=${url}&name=${name}`, '_blank');
    },
    getWord(s, pos) {
      const n = s.substring(pos).match(/^[a-zA-Z0-9-_]+/);
      const p = s.substring(0, pos).match(/[a-zA-Z0-9-_]+$/);
      // if you really only want the word if you click at start or between
      // but not at end instead use if (!n) return
      if (!p && !n) {
        return '';
      }
      return (p || '') + (n || '');
    },
    showWord (e) {
      // $show.innerText = getWord(e.target.value, e.target.selectionStart);
    },
    getPin() {
      this.is_loading = true;
      postPinList().then(response => {
        this.data_pin = response.data;
        const data_akhir = this.data_pin.map(a => {
          if ((['General', 'Direktorat'].includes(this.data_channel.channel_type) && a.post.post_channel.channel.channel_type === 'General') || this.data_channel.id === a.post.post_channel.channel.id) {
            return {
              id: a.post.id,
              created_at: a.post.created_at,
              status: a.post.status,
              title: a.post.title,
              description: a.post.description,
              article: a.post.article,
              cover: a.post.cover,
              created_by_user: a.post.created_by_user,
              event: a.post.event,
              status_pin: true,
              data_pin: { id: a.id,
                start_date: a.start_date,
                end_date: a.end_date,
                start_time: a.start_time,
                end_time: a.end_time },
              post_type: a.post.post_type,
              post_file: a.post.post_file,
              post_links: a.post.post_links,
              post_reaction: a.post.post_reaction,
              post_channel: a.post.post_channel,
              post_conversation: {
                post_conversation_id: a.post.id,
                post_conversation_uniq: [...new Map(a.post.post_conversation.map(item => [item.created_by, item])).values()],
                objConversation: a.post.post_conversation,
                count_replies: a.post.post_conversation.length,
                hidden_conversation: true
              },
              post_collaboration: a.post.post_collaboration,
              view: a.post.view,
              post_access: a.post.post_access,
              knowledge: a.post.knowledge
            };
          }
          return undefined;
        }).filter(a => a !== undefined);
        this.data_pin = data_akhir;
      });
      this.is_loading = false;
    },
    toggleInfo() {
      this.mobile_info = !this.mobile_info;
    },
    async getBadgeNotif(module) {
      const data = {
        type: 'notif',
        module
      };
      const dataHistory = await getPointHistory(data);
      let badgeTitle = '';
      if (dataHistory.data.length > 0) {
        switch (dataHistory.data[0].activity_id) {
          case 37: badgeTitle = 'KNOWLEDGE ASSET BASIC'; break;
          case 38: badgeTitle = 'KNOWLEDGE ASSET INTERMEDIATE'; break;
          case 39: badgeTitle = 'KNOWLEDGE ASSET ADVANCE'; break;
          case 40: badgeTitle = 'TOP POST BASIC'; break;
          case 41: badgeTitle = 'TOP POST INTERMEDIATE'; break;
          case 42: badgeTitle = 'TOP POST ADVANCE'; break;
          default: badgeTitle = '';
        }
        let state = 'Congratulations';
        let state2 = 'Won';
        let color = 'green-6';
        if (dataHistory.data[0].point < 0) {
          state = 'Sorry';
          state2 = 'Lost';
          color = 'red-6';
        }

        setTimeout(() => {
          Notify.create({
            message: `"${state}!!<br>You've ${state2} a Badge "${badgeTitle}"`,
            timeout: 3500,
            type: 'positive',
            color: `${color}`,
            icon: 'check',
            html: true
          });
          bus.$emit('update_nav');
        }, 2000);
      }
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      deep: true,
      handler(value) {
        this.getChannel(value);
        this.getDraftPost(value);
        this.selected_channel = parseInt(value, 10);
        this.handleRemoveSelectedPost();
        this.getReaction();
        this.is_show_draft = false;
        this.getUser();
      }
    }
    // '$route.params.post_id': {
    //   immediate: true,
    //   deep: true,
    //   handler(value) {
    //     this.getChannel(value);
    //     this.getDraftPost(value);
    //     this.selected_channel = parseInt(value, 10);
    //     this.handleRemoveSelectedPost();
    //   }
    // }
  },
  mounted() {
    this.getUser();
    // this.getPin();
    this.$root.$on('changeChannelInfo', () => {
      this.toggleInfo();
    });
  }
};
</script>

<style>
.my-card {
  width: 100%;
  height: 100%;
  left: unset;
  top: unset;
  border-radius: 8px;
}

.text-neutral {
  color: #65738F;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
