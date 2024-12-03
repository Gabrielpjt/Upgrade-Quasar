<template>

  <div>
    <div class="row q-mt-sm">
      <div class="col q-ml-xs">
          <span v-for="(item, index) in reaction_list_unique" :key="index">
          <span><q-img :src="require(`../../assets/images/${item.icon}.png`)" class="kmp-img-reaction "/></span>
          </span>
          <span v-if="reaction_list_unique.length >0" class="kmp-font-sm cursor-pointer q-ml-sm"
              @mouseover="onMouseOverABC" @mouseleave="onMouseLeaveABC">
            <span class="text-capitalize"
                  v-if="reaction_all_member.length === 1"
                  @click="reaction_detail_dialog = true"
            >{{ reaction_all_member[0].user.name.toLowerCase() }}</span>
            <span v-if="reaction_all_member.length > 1"
                  @click="reaction_detail_dialog = true">
              <span class="text-capitalize">{{
                  reaction_all_member[0].user.name.toLowerCase()
                }}</span> and {{ reaction_all_member.length - 1 }} others
            </span>
            <q-tooltip>
              <div class="text-capitalize" v-for="(item, index) in reaction_all_member.slice(0, 10)" :key="index">
                {{ item.user.name.toLowerCase() }}
              </div>
              <div v-if="reaction_all_member.length >10">and {{ reaction_all_member.length - 10 }} more</div>
            </q-tooltip>
          </span>
      </div>
      <div class="col text-right" v-if="replies_count >0">
        <span class="kmp-font-sm cursor-pointer" @click="onRepliesClick">{{replies_count}} Replies</span>
      </div>
    </div>
    <div class="row" @mouseleave="onMouseLeave2">
      <div class="col q-mt-sm">
        <q-separator></q-separator>
        <q-btn-group flat :spread="$q.platform.is.mobile ? false : true" class="q-my-xs">
          <q-btn
            size="sm"
            :label="reaction_current_member.length >0? `${reaction_current_member[0].reaction.icon.replace('fb-static-','')}`: 'Like'"
            :icon="reaction_current_member.length >0? `img:icons/${reaction_current_member[0].reaction.icon}.png`: 'thumb_up_off_alt'"
            @mouseleave.native="onMouseLeave"
            @mouseover.native="onMouseOver"
            @click="onClick"
          ></q-btn>
          <q-btn
            size="sm"
            label="Comment"
            icon="chat_bubble_outline"
            @click="onRepliesClick"
          />
          <q-btn
            size="sm"
            label="Share"
            icon="share"
            @click="handleShare"
          >
            <q-menu auto-close content-class="kmp-rounded kmp-unelevated" >
              <q-list style="min-width: 100px" dense class="kmp-rounded-2">
                <q-item clickable>
                  <i class="fa fa-md fa-link q-my-sm q-mr-sm" style="color:#6b7078"></i>
                  <q-item-section class="" @click="handleCopy" style="color:#6b7078">Copy URL</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-icon name="message" class="q-my-sm q-mr-sm" size="1em"/>
                  <q-item-section class="" @click="modal_pm = true" style="color:#6b7078">Send to Private Message</q-item-section>
                </q-item>
                <q-item clickable>
                  <ShareNetwork
                      network="whatsapp"
                      :url="data_route"
                      :title="'Check this post! '+post_title"
                      :description="post_desc"
                      style="text-decoration: none;"
                      :popup="{width: 1200, height: 1000}"
                    >
                    <i class="fab fah fa-md fa-whatsapp q-mr-sm" style="color: #25d366;"></i>
                    <span style="color: #6b7078; text-decoration: none;">Share on Whatsapp</span>
                  </ShareNetwork>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-btn-group>
        <q-separator></q-separator>
      </div>
      <q-menu
        v-model="is_open"
        transition-show="jump-up"
        transition-hide="jump-down"
        anchor="top start"
        self="bottom start"
        content-class="kmp-reaction-bg"
        :offset="[0, -12]"
      >
        <div class="kmp-reaction-bg-inner">
          <div class="kmp-reaction-bg-inner-nobg">
                <span v-for="(item, index) in reaction_list" :key="index">
                <q-img
                  :src="require(`../../assets/images/${item.icon.replace('-static','')}.gif`)"
                  class="kmp-img-zoom cursor-pointer"
                  @click="setReaction(item.id, reaction_data.post_id, !(reaction_current_member.findIndex(x => x.reaction_id === item.id) > -1))"
                  v-close-popup
                />
                </span>
          </div>
        </div>
      </q-menu>

      <!--    <q-btn push color="primary" label="Handles click">-->
      <!--      <q-popup-proxy>-->
      <!--        <q-banner style="border-radius: 100px">-->
      <!--&lt;!&ndash;          <template v-slot:avatar>&ndash;&gt;-->
      <!--&lt;!&ndash;            <q-icon name="signal_wifi_off" color="primary" />&ndash;&gt;-->
      <!--&lt;!&ndash;          </template>&ndash;&gt;-->
      <!--&lt;!&ndash;          You have lost connection to the internet. This app is offline.&ndash;&gt;-->
      <!--&lt;!&ndash;          <q-card class="q-pa-lg">&ndash;&gt;-->
      <!--&lt;!&ndash;            <q-card-section>&ndash;&gt;-->
      <!--              <q-img src="../../assets/images/fb-like.gif" class="kmp-img-zoom cursor-pointer"/>-->
      <!--              <q-img src="../../assets/images/fb-laugh.gif" class="kmp-img-zoom cursor-pointer"/>-->
      <!--              <q-img src="../../assets/images/fb-love.gif" class="kmp-img-zoom cursor-pointer"/>-->
      <!--              <q-img src="../../assets/images/fb-worried.gif" class="kmp-img-zoom cursor-pointer"/>-->
      <!--              <q-img src="../../assets/images/fb-sad.gif" class="kmp-img-zoom cursor-pointer"/>-->
      <!--              <q-img src="../../assets/images/fb-angry.gif" class="kmp-img-zoom cursor-pointer"/>-->
      <!--&lt;!&ndash;            </q-card-section>&ndash;&gt;-->
      <!--&lt;!&ndash;          </q-card>&ndash;&gt;-->
      <!--        </q-banner>-->
      <!--      </q-popup-proxy>-->
      <!--    </q-btn>-->
      <!--    <div class="col">-->
      <!--      -->
      <!--      &lt;!&ndash;            <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/thumbs_up.svg" label="10" size="sm" dense/>&ndash;&gt;-->
      <!--      &lt;!&ndash;      <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/ok_hand.svg" label="9" size="sm" dense/>&ndash;&gt;-->
      <!--      &lt;!&ndash;      <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/wink.svg" label="8" size="sm" dense/>&ndash;&gt;-->
      <!--      &lt;!&ndash;      <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/heart_suit.svg" label="7" size="sm" dense/>&ndash;&gt;-->
      <!--      &lt;!&ndash;      <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/medal.svg" label="7" size="sm" dense/>&ndash;&gt;-->
      <!--      &lt;!&ndash;      <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/gift.svg" label="5" size="sm" dense/>&ndash;&gt;-->
      <!--      &lt;!&ndash;      <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/yellow_heart.svg" label=4 size="sm" dense/>&ndash;&gt;-->
      <!--      &lt;!&ndash;      <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/zebra.svg" label="1" size="sm" dense/>&ndash;&gt;-->
      <!--      &lt;!&ndash;      <q-btn unelevated class="react-icon q-mr-sm" icon="img:icons/gun.svg" label="1" size="sm" dense/>&ndash;&gt;-->
      <!--      &lt;!&ndash;      v-bind:label="(reaction_counting[item.id] !== undefined)?reaction_counting[item.id]:0"&ndash;&gt;-->
      <!--          <span v-for="(item, index) in reaction_list" :key="index">-->
      <!--            <PostReactionLoading v-if="is_loading"/>-->
      <!--                    <q-btn-->
      <!--                      v-if="!is_loading"-->
      <!--                      unelevated-->
      <!--                      dense-->
      <!--                      class="q-mr-xs kmp-reaction"-->
      <!--                      :icon="`img:icons/${item.icon}.svg`"-->
      <!--                      v-bind:class="(reaction_current_member.findIndex(x => x.reaction_id === item.id) > -1)?'kmp-reaction-active':''"-->
      <!--                      @click="setReaction(item, reaction_data.post_id, !(reaction_current_member.findIndex(x => x.reaction_id === item.id) > -1))"-->
      <!--                    >-->
      <!--                      <q-tooltip>-->
      <!--                        <div class="text-capitalize">{{ item.icon.replace('_',' ') }}</div>-->
      <!--                      </q-tooltip>-->
      <!--                      <span class="q-ml-xs kmp-text-blue-2" style="font-size: 1.5em; margin-top: 2px">-->
      <!--                        {{(reaction_counting[item.id] !== undefined)?reaction_counting[item.id]:0}}-->
      <!--                      </span>-->
      <!--                    </q-btn>-->
      <!--          </span>-->
      <!--    </div>-->
    </div>


    <q-dialog v-model="reaction_detail_dialog" @before-show="onDialogShow">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-like-mobile' : 'kmp-modal-like'">
        <q-toolbar class="q-ma-none q-pa-none">
          <q-tabs
            v-model="reaction_tab.current_tab"
            align="left"
            class="kmp-text-blue-2"
            :breakpoint="0"
            flat
            dense
            inline-label
            @input="reactionTabInput"
          >
            <q-tab label="All" name="all"></q-tab>
            <span v-for="(item, index) in reaction_list_unique" :key="index">
              <q-tab :label="item.count" :name="item.icon.replace('fb-static-','')"
                     :icon="`img:icons/${item.icon}.png`"></q-tab>
            </span>
          </q-tabs>
          <q-space/>
          <q-btn flat round class="q-mb-sm q-mr-sm" color="primary" size="sm" icon="close" v-close-popup/>
        </q-toolbar>

        <q-separator style="margin-top: -7px"/>

        <q-tab-panels v-model="reaction_tab.current_tab" animated>
          <q-tab-panel name="all" class="q-pa-sm">
            <MemberList :member="reaction_tab.current_list"/>
          </q-tab-panel>
          <q-tab-panel name="like" class="q-pa-sm">
            <MemberList :member="reaction_tab.current_list"/>
          </q-tab-panel>
          <q-tab-panel name="love" class="q-pa-sm">
            <MemberList :member="reaction_tab.current_list"/>
          </q-tab-panel>
          <q-tab-panel name="laugh" class="q-pa-sm">
            <MemberList :member="reaction_tab.current_list"/>
          </q-tab-panel>
          <q-tab-panel name="worried" class="q-pa-sm">
            <MemberList :member="reaction_tab.current_list"/>
          </q-tab-panel>
          <q-tab-panel name="sad" class="q-pa-sm">
            <MemberList :member="reaction_tab.current_list"/>
          </q-tab-panel>
          <q-tab-panel name="angry" class="q-pa-sm">
            <MemberList :member="reaction_tab.current_list"/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_pm">
      <q-card class="" style="">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Send Post to</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="q-pa-md q-mb-md">
            <q-card class="my-card-notif">
              <q-item class="q-pa-md" >
                <div class="items-center">
                  <div class="text-h6 q-mt-none q-mb-xs">{{post_title}}</div>
                  <div class="text-caption text-grey">
                    {{post_desc}}
                  </div>
                </div>
              </q-item>
            </q-card>
          </q-card-section>
          <q-card-section>
            <div class="row no-wrap q-pa-none q-px-md">
              <q-input borderless dense ref="search_input" @input="messageMemberSearch" debounce="1000"
                        clear-icon="close"
                        class="q-pa-none q-ma-none" style="width: 100%" v-model="message.member_search_input"
                        label="Search User (min 3 characters)">
                <template v-slot:append>
                  <q-icon v-if="message.member_search_input === ''" name="search"/>
                  <q-icon v-else name="clear" class="cursor-pointer" @click="messageMemberSearchClear"/>
                </template>
              </q-input>
            </div>

            <q-separator/>

            <div class="row no-wrap q-pa-none q-mx-xs">
              <q-scroll-area style="height: 300px; width:500px">
                <!-- height: 300px;width: 300px; max-width: 300px; -->
                <q-item
                  v-bind:class="!message.is_loading && message.member_search_list.length === 0?'':'hidden'"
                  :key="`notif`" style="min-width: 300px">
                  <q-item-section>
                    <div class="text-center">
                      <!-- <q-img class="q-mt-xl q-px-xl" src="../../assets/images/search-not-found.png"
                              style="max-width: 600px"/> -->
                      <div v-if="message.member_search_input === ''" class="kmp-font-md text-center q-mt-lg">
                        Search user
                      </div>
                      <div v-if="message.member_search_input === ''" class="kmp-font-sm text-center q-mb-lg">
                        Select a user to send post
                      </div>
                      <div v-if="message.member_search_input.length >=3 && message.member_search_input !== ''" class="kmp-font-md text-center q-mt-lg">
                        Search user not found!
                      </div>
                      <div v-if="message.member_search_input.length <3 && message.member_search_input !== ''" class="kmp-font-md text-center q-mt-lg">
                        Search keyword minimum 3 characters
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
                <q-item v-bind:class="message.is_loading?'':'hidden'" v-for="index in 5"
                        :key="`skeleton_${index}`" style="max-width: 300px; min-height: 40px"
                        class="q-py-none q-px-sm">
                  <!--                        <q-item v-for="index in 5" :key="index" style="max-width: 300px; min-height: 40px" class="q-py-none q-px-sm">-->
                  <q-item-section avatar class="q-pa-none" style="min-width: 36px">
                    <q-skeleton size="25px" type="QAvatar"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <q-skeleton type="text" height="40px" width="80%"/>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-for="(item, index) in message.member_search_list"
                  :key="`item_${index}`"
                  dense
                  clickable
                  class="kmp-menu-left q-py-xs q-my-xs q-pl-sm cursor-pointer q-mr-md"
                  v-close-popup
                  @click="sendMessage(item)">
                  <q-item-section avatar>
                    <!--                            :online="item.is_online"-->
                    <Avatar size="md"
                            :picture="item.profile_picture ? `./api${item.profile_picture}` : ''"
                            :name="item.name"/>
                  </q-item-section>
                  <q-item-section class="list list-channel text-capitalize">
                    {{ item.name.toLowerCase() }}
                  </q-item-section>
                </q-item>
              </q-scroll-area>
            </div>
          </q-card-section>
        </q-card>
    </q-dialog>

  </div>
</template>

<script>

import { copyToClipboard } from 'quasar';
import { postReactionByPost,
  postReactionCreate,
  postReactionDelete,
  messageMemberList,
  postCreateNewMessage,
  postPrivateMessage,
  checkMessage } from 'src/lib/api';
// postCreateNewMessage
import { getLoginId } from 'src/lib/helper';
import MemberList from 'components/common/MemberList';
import { point } from 'src/lib/point';
import Avatar from 'components/common/Avatar';
import { getCredential } from 'src/lib/storage';
import bus from '../common/EventBus';
import { get } from '../../lib/HttpHelper';

export default {
  props: ['reaction_list', 'reaction_data', 'replies_count', 'post_id', 'channel_id', 'post_title', 'post_desc'],
  components: { MemberList, Avatar },
  data() {
    return {
      is_loading: false,
      is_open: false,
      is_lock: false,
      is_bus_refresh: false,
      reaction_detail_dialog: false,
      mouseover_timeout: undefined,
      reaction_counting: {},
      reaction_current_member: [],
      reaction_all_member: [],
      reaction_list_unique: [],
      reaction_tab: {
        current_tab: 'all',
        current_list: []
      },
      data_route: '',
      post_pm: [],
      pm_option: [],
      pm_list: [],
      modal_pm: false,
      message: {
        member_list: [],
        member_list_id: [],
        member_search_list: [],
        member_search_input: '',
        memberFetch: messageMemberList,
        is_loading: false
      },
      user: {
        id: getLoginId()
      },
      msg_id: null,
      postCreateNewMessage
    };
  },
  mounted() {
    this.reaction_counting = this.reaction_data.counting;
    this.reaction_current_member = this.reaction_data.current_member;
    this.reaction_all_member = this.reaction_data.all_member;
    this.reaction_tab.current_list = this.reaction_data.all_member;
    this.reaction_tab.current_tab = 'all';
    this.reaction_list_unique = this.reaction_list
      .filter(x => {
        return this.reaction_data.reaction_unique_id.includes(x.id);
      })
      .map(x => {
        return { ...x, count: this.reaction_all_member.filter(y => y.reaction.icon.includes(x.icon)).length };
      });
    bus.$on('reaction_refresh', data => {
      if (data === this.reaction_data.post_id) {
        setTimeout(() => {
          this.getReactionByPost(data);
        }, Math.floor((Math.random() * 150) + 150));
      }
    });
  },
  methods: {
    reactionTabInput(data) {
      if (data === 'all') {
        this.reaction_tab.current_list = this.reaction_all_member;
        return;
      }
      this.reaction_tab.current_list = this.reaction_all_member.filter(x => x.reaction.icon.includes(data));
    },
    onDialogShow() {
      this.reaction_tab.current_tab = 'all';
      this.reactionTabInput(this.reaction_tab.current_tab);
    },
    onRepliesClick() {
      this.is_open = true;
      if (this.reaction_data.post_type === 'Article') {
        this.$emit('onRepliesClick', this.reaction_data.post_id, 'post');
      } else {
        this.$emit('onRepliesClick', this.reaction_data.post_id, this.reaction_data.post_type);
      }
    },
    onClick() {
      if (this.reaction_current_member.length > 0) this.unsetReaction(this.reaction_current_member[0].reaction_id, this.reaction_data.post_id, true);
      else this.setReaction(this.reaction_list[0].id, this.reaction_data.post_id, true);
      this.is_open = true;
      this.is_lock = false;
    },
    onMouseLeave() {
      this.is_lock = false;
    },
    onMouseLeave2() {
      clearTimeout(this.mouseover_timeout);
      this.is_lock = true;
      setTimeout(() => {
        this.is_lock = false;
      }, 1200);
    },
    onMouseOver() {
      if (!this.is_open && !this.is_lock) {
        this.mouseover_timeout = setTimeout(() => {
          if (!this.is_lock) {
            this.is_open = true;
          }
          this.is_lock = true;
        }, 1000);
      }
    },
    onMouseLeaveABC() {
      this.is_lock = false;
    },
    onMouseOverABC() {
      this.is_lock = true;
      this.is_open = false;
      clearTimeout(this.mouseover_timeout);
      this.mouseover_timeout = undefined;
    },
    getReactionByPost(id) {
      this.is_loading = true;
      postReactionByPost(id).then(res => {
        this.reaction_counting = res.data.map(({ reaction_id }) => reaction_id)
          .reduce((names, name) => {
            const count = names[name] || 0;
            names[name] = count + 1;
            return names;
          }, {});
        this.reaction_current_member = res.data.filter(x => x.created_by === getLoginId());
        this.reaction_all_member = res.data;
        this.reaction_tab.current_list = res.data;

        const reaction_unique_id = [...new Set(res.data.map(item => item.reaction_id))];
        this.reaction_list_unique = this.reaction_list
          .filter(x => {
            return reaction_unique_id.includes(x.id);
          })
          .map(x => {
            return { ...x, count: this.reaction_all_member.filter(y => y.reaction.icon.includes(x.icon)).length };
          });
        this.is_loading = false;
      });
    },
    setReaction(reaction_id, post_id, is_add_reaction) {
      if (is_add_reaction) {
        this.is_loading = true;

        // delete all reaction
        this.reaction_current_member.forEach(x => {
          postReactionDelete(x.id).then(res => {
            // bus.$emit('reaction_refresh', post_id);
          });
        });

        // add point
        point('add', { tag: 'post_reaction', post_id });

        // add new reaction
        const data = {
          created_by: getLoginId(),
          post_id,
          reaction_id
        };
        postReactionCreate(data).then(res => {
          bus.$emit('reaction_refresh', post_id);
          bus.$emit('update_point');
        });
      }
    },
    unsetReaction(reaction_id, post_id, is_remove_reaction) {
      if (is_remove_reaction) {
        this.is_loading = true;
        const id_to_delete = this.reaction_current_member.filter(x => x.reaction_id === reaction_id)[0].id;
        postReactionDelete(id_to_delete).then(res => {
          point('rollback', { tag: 'post_reaction', post_id });
          if (res !== 'not found') {
            bus.$emit('reaction_refresh', post_id);
            bus.$emit('update_point');
          }
        });
      }
    },
    handleShare() {
      this.is_open = true;
      const route = this.getRoute();
      this.data_route = `${window.location.origin}${route.href}`;
    },
    getRoute() {
      const routeData = this.$router.resolve({
        name: 'channel-detail-post-detail',
        params: {
          id: this.channel_id,
          post_id: this.post_id
        }
      });
      return routeData;
    },
    handleCopy() {
      this.is_open = false;
      const routeData = this.getRoute();
      copyToClipboard(`${window.location.origin}${routeData.href}`).then(() => {
        this.$q.notify({
          message: 'Copy Success',
          timeout: 3000,
          color: 'positive',
          icon: 'done',
          position: 'bottom'
        });
      }).catch(() => {
        this.$q.notify({
          message: 'Copy Fail',
          timeout: 3000,
          color: 'negative',
          icon: 'done',
          position: 'bottom'
        });
      });
    },
    messageMemberSearchClear() {
      this.message.member_search_input = '';
      this.message.member_search_list = [];

      setTimeout(() => {
        this.$refs.search_input.focus();
      }, 100);
    },
    messageMemberSearch(value) {
      if (value.length >= 3) {
        this.message.is_loading = true;
        this.message.member_search_list = [];
        get({
          path: `api/searchtopn?keyword=${value.toLowerCase()}&includes=user&paging=50`
        }).then(res => {
          this.message.member_search_list = res.data
            .filter(x => !this.message.member_list_id.includes(x.user.id) && x.user.id !== this.user.id)
            .map(x => {
              return {
                id: x.user.id,
                is_online: false,
                message_count: 0,
                message_id: 0,
                name: x.user.name,
                profile_picture: x.user.profile_picture
              };
            });
          this.message.is_loading = false;
        });
      }
    },
    sendMessage(data) {
      checkMessage({ created_by: this.user.id, users_id: data.id }).then(response => {
        if (response.data === 'not found') {
          const a_new_message = {
            enabled: true,
            message_participant: [
              {
                created_by: this.user.id,
                users_id: data.id
              },
              {
                created_by: data.id,
                users_id: this.user.id
              }
            ]
          };
          this.postCreateNewMessage(a_new_message).then(res => {
            this.msg_id = res.message.id;
            this.saveMsg();
            this.$root.$emit('updateMessage', ('create', this.msg_id));
          });
        } else {
          this.msg_id = response.data.message_id;
          this.saveMsg();
        }
        this.$q.notify({
          message: 'Post url sent successfully',
          timeout: 3000,
          color: 'positive',
          icon: 'done',
          position: 'bottom'
        });
      });
    },
    saveMsg() {
      const dt = new Date();
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);

      const new_message = {
        created_at: dt.toISOString(),
        deleted_at: null,
        created_by: {
          id: profile.id,
          name: profile.name,
          profile_picture: profile.profile_picture
        },
        id: 0,
        message_id: this.msg_id,
        prev_user_id: 0,
        text: this.data_route,
        read_users: `{${getLoginId()}}`,
        file_id: null
      };

      const new_data = {
        message: {
          message_id: this.msg_id,
          chat: new_message
        }
      };

      postPrivateMessage({ ...new_data })
        .then(resp => {
          new_message.id = this.msg_id;

          this.$store.dispatch('privateMessage/updateMessageListByMessageId', {
            message_id: this.msg_id,
            chat: [{ ...new_message }]
          });
          console.log('berhasil');
        });
      this.$store.dispatch('privateMessage/updateOfflineAllMemberList', new_message.created_by.id);
    }
  }
};
</script>

