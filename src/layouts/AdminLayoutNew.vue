<template>
  <q-layout view="hHh Lpr fFf" style="background:#EEF1F5;">
    <q-header v-if="!$q.platform.is.mobile"
      bordered
      class="bg-white"
      style="padding: 0px 80px 0px 80px; height:66px;"
    >
      <q-toolbar :class="$q.platform.is.mobile ? 'channel-toolbar q-mr-xs' : 'channel-toolbar'">
        <q-toolbar-title class="row items-center vertical-middle full-width">
          <img
            src="../assets/images/smart-kpk-logo.png"
            class="kmp-logo desktop-only"
            alt=""
          />
          <img
            src="../assets/images/iconKM.png"
            class="kmp-logo-mobile mobile-only"
            max-width="50px"
            alt=""
            @click="changeLeftDrawer()"
          />
        </q-toolbar-title>
        <div style="display: none;" class="q-pa-md q-gutter-sm">
          <Avatar size="xl" :picture="user.picture ? `./api${user.picture}` : ''" :name="user.name"
                  @click="clickMyProfile"/>
          <q-btn class="gt-sm text-blue desktop-only" color="primary" round flat> {{ user.name }}
            <q-menu>
              <q-list style="min-width: 100px">
                <div>
                  <q-item v-for="(item, index) in profileRole.roles" :key="index" clickable v-close-popup
                          :class="item.is_active === true ? 'bg-blue-grey-7' : 'bg-white'"
                          @click="clickSwitchRole(item.id)">
                    <q-item-section :class="item.is_active === true ? 'km-list-more text-white' : 'km-list-more'">
                      {{ item.display_name }}
                    </q-item-section>
                    <q-separator></q-separator>
                  </q-item>
                  <q-separator/>
                  <q-item clickable v-close-popup class="bg-white" @click="clickMyProfile">
                    <q-item-section avatar style="min-width:0px" class="q-pa-none">
                      <q-icon color="primary" name="account_circle"/>
                    </q-item-section>
                    <q-item-section class="km-list-more">Profile</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup class="bg-white" @click="confirmLogout">
                    <q-item-section avatar style="min-width:0px" class="q-pa-none">
                      <q-icon color="primary" name="exit_to_app"/>
                    </q-item-section>
                    <q-item-section class="km-list-more">Logout</q-item-section>
                  </q-item>
                </div>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div :class="$q.platform.is.mobile ? 'q-gutter-sm' : 'toolbar-padding'" style="border-bottom: 2px solid var(--Primary-500, #2C8ED3);">
          <q-btn no-caps style="width:78px" round flat stack
            :class="$route.name === 'admin-home-new' ? 'toolbar-button-active' : 'toolbar-button'"
            class="kmp-normal-text kmp-black-text kmp-new-font"
            @click="$router.push({ name: 'admin-home-new' })"
          >
            <Icon icon="mingcute:home-5-line" width="24" height="24" />
              <div class="q-mt-xs" >Home Page</div>
          </q-btn>
        </div>
        <div :class="$q.platform.is.mobile ? 'q-gutter-sm' : 'toolbar-padding'">
          <q-btn no-caps style="width:78px" round flat stack class="toolbar-button kmp-normal-text kmp-black-text kmp-new-font">
            <Icon icon="ri:book-2-line" width="24" height="24" />
              <div class="q-mt-xs">Library</div>
          </q-btn>
        </div>
        <div :class="$q.platform.is.mobile ? 'q-gutter-sm' : 'toolbar-padding'">
          <q-btn no-caps style="width:78px" round flat stack class="toolbar-button kmp-normal-text kmp-black-text kmp-new-font">
            <q-icon center size="22px" name="o_local_library"  />
              <div class="q-mt-xs">Training</div>
          </q-btn>
        </div>
        <div :class="$q.platform.is.mobile ? 'q-gutter-sm' : 'toolbar-padding'">
          <q-btn no-caps style="width:78px" round flat stack class="toolbar-button kmp-normal-text kmp-black-text kmp-new-font">
            <Icon icon="ion:chatbubbles-outline" width="24" height="24" />
              <div class="q-mt-xs">Channel</div>
          </q-btn>
        </div>
        <div :class="$q.platform.is.mobile ? 'q-gutter-sm' : 'toolbar-padding'">
          <q-btn no-caps style="width:78px" round flat stack class="toolbar-button kmp-normal-text kmp-black-text kmp-new-font">
            <Icon icon="carbon:flow-data" width="24" height="24" />
              <div class="q-mt-xs">KMAP</div>
          </q-btn>
        </div>
        <div :class="$q.platform.is.mobile ? 'q-gutter-sm' : 'toolbar-padding'">
          <q-btn no-caps style="width:78px" round flat stack class="toolbar-button kmp-normal-text kmp-black-text kmp-new-font">
            <Icon icon="ep:chat-dot-round" width="24" height="24" />
            <q-badge color="red" rounded floating style="right: 16px !important" transparent v-if="notifCount !== 0">
              {{ notifCount }}
            </q-badge>
              <div class="q-mt-xs">Personal Chat</div>
          </q-btn>
        </div>
        <div :class="$q.platform.is.mobile ? 'q-gutter-sm' : 'toolbar-padding'">
          <q-btn no-caps style="width:78px" round flat stack class="toolbar-button kmp-normal-text kmp-black-text kmp-new-font">
            <Icon icon="clarity:notification-line" width="24" height="24" />
            <q-badge color="red" rounded floating style="right: 19px !important" transparent v-if="notifCount !== 0">
              {{ notifCount }}
            </q-badge>
            <div class="q-mt-xs">Notifikasi</div>
            <q-menu
              transition-show="scale"
              transition-hide="scale"
              max-width="500px">
              <q-list separator style="min-width: 100px" class="">
                  <q-item style="padding: 0px 10px;" v-for="(item, index) in dataNotif" :key="index" clickable v-close-popup
                          :class="item.status === 'Unread' ? 'bg-light-blue-1' : 'bg-white'" @click="clickNotif(item)">
                    <!-- <q-item-section :class="item.status === 'Unread' ? 'km-list-more-notif q-mr-md' : 'km-list-more-normal q-mr-md'">{{ item.message }}</q-item-section> -->
                    <q-item-section class="q-pa-sm">
                      <q-item-label class="km-list-more-notif-unread" style="margin: 0px 0px;"><span class="kmp-time-notif">{{ item.time }}</span></q-item-label>
                      <q-item-label caption lines="2" :class="item.status === 'Unread' ? 'km-list-more-notif-unread q-mr-md' : 'km-list-more-normal q-mr-md'" style="margin: 5px 0px;">{{ item.message }}</q-item-label>
                    </q-item-section>
                    <!-- <q-item-section side top>
                      <q-item-label caption>{{ item.time }}</q-item-label>
                    </q-item-section> -->
                  </q-item>
                  <q-item clickable class="kmp-text-primary text-weight-bold" @click="$router.push({ name: 'notification' })">
                    <q-item-section class="text-center">See all notifications</q-item-section>
                  </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div :class="$q.platform.is.mobile ? 'q-gutter-sm' : 'toolbar-padding'">
            <q-link no-caps style="width:78px"
             :class="$q.platform.is.mobile ? ' q-mr-none' : 'q-mr-none icon-button'">
            <Avatar :picture="user.picture ? `./api${user.picture}` : ''" :name="user.name"
              @click="clickMyProfile" class="icon-top user-picture"/>
              <div class="icon-text kmp-new-font kmp-normal-text kmp-black-text toolbar-button">
                <span>Me</span>
                <q-icon name="expand_more" size="xs"></q-icon>
              </div>
            <q-menu>
              <q-list class="text-primary q-pa-md">
                <!-- <div class="q-pa-md"> -->
                  <q-item  style="border-radius: 4px;" dense class="q-pa-none q-mb-sm">
                    <q-item-section side class="q-pr-sm items-center">
                      <q-avatar size="48px">
                        <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section class="q-pa-none kmp-black-text">
                      <q-item-label class="kmp-md-text kmp-bold-text kmp-line-125">{{ user.name }}</q-item-label>
                      <q-item-label class="kmp-xs-text kmp-normal-text kmp-line-125">Direktorat Gratifikasi dan Pelayanan Publik</q-item-label>
                      <q-item-label>
                        <q-img src="../assets/images/new-design/stars-sm.png" class="q-mr-xs" style="width: 16px;height: 16px;"/>
                        <span class=" kmp-black-text kmp-xs-text kmp-bold-text kmp-line-130">Hard Worker IV</span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item   style="border-radius: 4px;" dense class="q-px-none q-mb-sm">
                    <q-btn dense outline no-caps class="kmp-sm-text kmp-bold-text kmp-line-130" style="width: 100%;color: #2C8ED3" label="View Profile" @click="clickMyProfile" />
                  </q-item>
                  <q-item  style="border-radius: 4px;" dense v-for="(item, index) in profileRole.roles" :key="index" clickable v-close-popup
                          :class="item.is_active === true ? 'bg-blue-10 q-mb-sm' : 'bg-white q-mb-sm'"
                          @click="clickSwitchRole(item.id)">
                    <q-item-section :class="item.is_active === true ? 'kmp-white-text kmp-line-130 kmp-sm-text kmp-normal-text' : 'kmp-black-text kmp-line-130 kmp-sm-text kmp-normal-text'">
                      {{ item.display_name }}
                    </q-item-section>
                    <q-separator></q-separator>
                  </q-item>
                  <q-separator class="q-mb-sm"/>
                  <q-item dense clickable v-close-popup class="bg-white q-pa-none q-mb-sm" style="border-radius: 4px;" @click="$router.replace({ name: 'guidelines-list' }).catch(() => {});">
                    <q-item-section avatar style="min-width:0px" class="q-pa-none q-px-sm kmp-black-text">
                      <Icon width="16" height="16"  icon="material-symbols:article-outline" :verticalFlip="true" />
                    </q-item-section>
                    <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text  kmp-black-text">User Guideline</q-item-section>
                  </q-item>
                  <q-item dense clickable v-close-popup class="bg-white q-pa-none q-mb-sm" style="border-radius: 4px;" @click="$router.push({ name: 'smart-report' })">
                    <q-item-section avatar style="min-width:0px" class="q-pa-none q-px-sm kmp-black-text">
                      <Icon width="16" height="16" icon="streamline:customer-support-1" />
                    </q-item-section>
                    <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text  kmp-black-text">Helpdesk</q-item-section>
                  </q-item>
                  <q-item dense clickable v-close-popup class="bg-white q-pa-none q-mb-sm" @click="confirmLogout" style="border-radius: 4px;">
                    <q-item-section avatar style="min-width:0px" class="q-pa-none q-px-sm kmp-black-text">
                      <Icon width="16" height="16" icon="ic:sharp-logout" />
                    </q-item-section>
                    <q-item-section class="kmp-line-130 kmp-sm-text kmp-normal-text  kmp-black-text">Logout</q-item-section>
                  </q-item>
                <!-- </div> -->
              </q-list>
            </q-menu>
          </q-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-header v-else
              bordered
              class="bg-white"
              style="padding: 5px; height:60px; border-bottom: 1px solid #B8C0CC !important;white-space: pre-line;"
    >
      <q-toolbar class="channel-toolbar q-px-none">
        <q-btn flat round dense class="q-mx-md" >
          <img
            src="../assets/images/iconKM.png"
            class="kmp-logo-mobile"
            alt=""
            style="margin-top: unset !important;"
            @click="$router.push({ name: 'admin-home' })"
          />
        </q-btn>

        <q-space />

        <div class="row no-wrap q-pl-md items-center text-right" style="min-width: 10px;">
          <Avatar size="xl" :picture="user.picture ? `./api${user.picture}` : ''" :name="user.name"
                  @click="clickMyProfile">

          </Avatar>
          <div class="col q-ml-sm hidden" style="">
            <div class="text-black text-capitalize text-left">{{ user.name }}</div>
            <div class="row text-center text-orange-7" style="font-size: 11px;">
              <q-icon size="15px" class="q-mr-xs" :style="{color: getPaletteColor(point_user.icon_color+'-8')}" :name="point_user.icon_name"/>
              <span :style="{color: getPaletteColor(point_user.icon_color+'-8')}">{{ point_user.remark }} </span>
              <span style="color:black" class="q-mx-xs"> | </span>
              <span style="color:green"> {{point_user.point ? point_user.point.toLocaleString() : '0'}} pts</span>
            </div>
          </div>

        </div>
        <div class="row no-wrap items-center">
          <q-btn dense flat round
                 class="q-mr-none"
                 color="black" icon="expand_more">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-card>
                  <q-card-section class="q-pb-none flex flex-center">
                    <Avatar size="4em" :picture="user.picture ? `./api${user.picture}` : ''" :name="user.name"
                            @click="clickMyProfile"/>
                  </q-card-section>
                  <q-card-section class="q-pb-none q-pt-sm flex flex-center">
                    <div class="text-black text-capitalize text-left">{{ user.name }}</div>
                  </q-card-section>
                  <q-card-section class="q-pt-none flex flex-center" style="width: 230px;">
                    <div class="row text-center text-orange-7" style="font-size: 11px;">
                      <q-icon size="15px" class="q-mr-xs" :style="{color: getPaletteColor(point_user.icon_color+'-8')}" :name="point_user.icon_name"/>
                      <span :style="{color: getPaletteColor(point_user.icon_color+'-8')}">{{ point_user.remark }} </span>
                      <span style="color:black" class="q-mx-xs"> | </span>
                      <span style="color:green"> {{point_user.point ? point_user.point.toLocaleString() : '0'}} pts</span>
                    </div>
                  </q-card-section>
                </q-card>
                <q-separator/>
                <div>
                  <q-item v-for="(item, index) in profileRole.roles" :key="index" clickable v-close-popup
                          :class="item.is_active === true ? 'bg-blue-grey-7' : 'bg-white'"
                          @click="clickSwitchRole(item.id)">
                    <q-item-section :class="item.is_active === true ? 'km-list-more text-white' : 'km-list-more'">
                      {{ item.display_name }}
                    </q-item-section>
                    <q-separator></q-separator>
                  </q-item>
                  <q-separator/>
                  <q-item clickable v-close-popup class="bg-white" @click="clickMyProfile">
                    <q-item-section avatar style="min-width:0px" class="q-pa-none">
                      <q-icon color="primary" name="account_circle"/>
                    </q-item-section>
                    <q-item-section class="km-list-more">Profile</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup class="bg-white" @click="confirmLogout">
                    <q-item-section avatar style="min-width:0px" class="q-pa-none">
                      <q-icon color="primary" name="exit_to_app"/>
                    </q-item-section>
                    <q-item-section class="km-list-more">Logout</q-item-section>
                  </q-item>
                </div>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

      </q-toolbar>
    </q-header>
    <q-footer bordered
              class="bg-white mobile-only"
              style="height:60px; border-top: 1px solid #B8C0CC !important;">
      <q-tabs no-caps active-color="" indicator-color="transparent" class="text-primary full-height" v-model="tab_footer">
        <q-tab name="list" @click="changeLeftDrawer()"><q-icon name="menu" size="2em"/></q-tab>
        <q-tab name="search" @click="openDialogSearch">
          <q-icon name="search" size="2em"/>
        </q-tab>
        <q-tab name="notifications" @click="$router.push({ name: 'notification' })">
          <q-icon name="notifications" size="2em"/>
          <q-badge color="red" floating transparent v-if="notifCount !== 0">
            {{ notifCount }}
          </q-badge>
        </q-tab>
        <q-tab name="mail" @click="$router.push({ name: 'messageList' })">
          <q-icon name="mail" size="2em"/>
        </q-tab>
      </q-tabs>
    </q-footer>
    <q-page-container>

<!--      <q-btn label="anim" @click="onAnim" />-->
<!--      <LottieAnimation-->
<!--        :animation-data="Congrats"-->
<!--        :auto-play="true"-->
<!--        :loop="true"-->
<!--        :speed="1"-->
<!--        ref="anim" />-->

      <router-view />
    </q-page-container>
    <q-dialog v-model="search_all" :maximized="true">
      <q-card class="">
        <q-bar class="bg-primary" style="height: 40px !important;" v-close-popup>
          <q-space />

          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <SearchTopBar class="full-width" @dataSearch="getDataSearch" @closeDialogSearch="search_all = false;"/>

        <q-separator/>
        <div v-for="(opt, index) in data_options" :key="index">
          <q-item clickable v-if="['more'].includes(opt.type)" class="q-pb-none" style="min-height: 38px;" @click="goingTo(opt)">
            <q-item-section>
              <q-separator class="q-mb-md"/>
              <q-item-label caption class="kmp-text-blue text-weight-bold q-mb-md">{{ opt.title }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="['group'].includes(opt.type)" class="q-pb-none" style="min-height: 38px;">
            <q-item-section>
              <q-item-label caption>{{ opt.title }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-if="['post','channel','user','knowledge','training'].includes(opt.type)" class="q-py-none" style="min-height: 38px;" @click="goingTo(opt)">
            <q-item-section class="self-start q-mt-xs" avatar style="min-width: 28px!important; padding-right: 8px !important;">
              <Avatar picture="" name="Post" v-if="['post'].includes(opt.type)" size="md"/>

              <Avatar :picture="opt.extra.profile_picture" :name="opt.title" size="md" v-if="['user'].includes(opt.type)"/>

              <q-icon size="20px" :name="opt.extra.icon" class="q-mr-xs" v-if="opt.type === 'channel'"/>

              <q-icon size="12.5px" :name="opt.extra.icon" v-if="opt.type === 'knowledge'" style="color: #45A3E6;border-radius: 60px;background-color: #CDEAFF;box-shadow: 0 0 2px #CDEAFF;padding: 0.5em 0.5em;"/>

              <Avatar picture="" name="Training" v-if="['training'].includes(opt.type)" size="md"/>
            </q-item-section>

            <q-item-section class="self-start q-mt-xs">
              <div>
                <span>{{ capitalize(opt.title.toLowerCase()) }} </span>

                <span class="kmp-italic kmp-font-sm text-grey-6" v-if="['post'].includes(opt.type)">
                  oleh {{ capitalize(opt.extra.name.toLowerCase()) }}
                </span>

                <span class="kmp-italic kmp-font-sm text-grey-6" v-if="['channel'].includes(opt.type)">
                  <q-icon size="6px" name="brightness_1" class="q-mx-xs"/>
                  {{ opt.extra.member }} Member(s)
                </span>

                <span class="kmp-italic kmp-font-sm text-grey-6" v-if="['knowledge'].includes(opt.type)">
                  dari Unit Kerja {{ opt.extra.unit_kerja }}
                </span>

                <span class="kmp-italic kmp-font-sm text-grey-6" v-if="['training'].includes(opt.type)">
                  oleh {{ opt.extra.provider }}
                </span>

              </div>
            </q-item-section>
          </q-item>
        </div>

      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { Notify, QSpinnerGears, date, colors } from 'quasar';
import { mapActions } from 'vuex';
import { Icon } from '@iconify/vue2';
import { getCredential } from 'src/lib/storage';
import { get } from 'src/lib/HttpHelper';
import { capitalize, getUserLogin, datePost, notifMessage } from 'src/lib/helper';
import { leaderboardMemberByMemberIdPointHistory } from 'src/lib/api';
import bus from 'components/common/EventBus';
import SearchTopBar from 'components/search/SearchTopBar.vue';
import Congrats from 'src/assets/congrats.json';
import { logout } from '../lib/SessionHelper';
import Avatar from '../components/common/Avatar';
import {
  // channelPostList
  channelList,
  notifList,
  notifRead,
  profile,
  switchRole,
  poinTraining,
  registerParticipant
} from '../lib/api';
import { aesEncrypt } from '../lib/helper';
import { point } from '../lib/point';

const { getPaletteColor } = colors;

export default {
  components: { SearchTopBar, Avatar, Icon },
  setup() {
    const leftDrawerOpen = true;

    return {
      Congrats,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  },
  data() {
    return {
      capitalize,
      getPaletteColor,
      keyword: '',
      search: null,
      model: null,
      stringOptions: [],
      options: [],
      appName: 'KM Portal',
      drawer: true,
      miniState: false,
      search_found: {},
      profileRole: [],
      user: {
        id: '',
        name: '',
        initial: ''
      },
      profile_picture: getUserLogin().profile_picture
        ? process.env.QUASAR_API_URL + getUserLogin().profile_picture
        : null,
      profile_name: getUserLogin().name,
      notifCount: 0,
      dataNotif: [],
      point_user: {},
      search_all: false,
      data_options: [],
      tab_footer: ''
    };
  },
  computed: {
    // currentPermissions() {
    //   return this.$store.getters['user/currentPermissions'].map(p => p.name);
    // },
    // name() {
    //   const profile = this.$store.getters['user/profile'];
    //   return profile ? profile.name : null;
    // }
  },
  methods: {
    ...mapActions('notification', ['updateTrainingId', 'regTraining']),
    onAvatarClick(data) {
      console.log('===========onAvatarClick');
      console.log(data);
    },
    onAnim() {
      // this.$refs.anim;
      // console.log(this.$refs.anim.goToAndPlay(150, true));
    },
    checkObj(obj, ...args) {
      return args.reduce((objj, level) => objj && objj[level], obj);
    },
    onChange(v) {
      if (v !== null) {
        setTimeout(() => {
          this.model = null;
        }, 100);

        // langsung ke search result, dibawahnya diskip
        // this.$router
        //   .push({
        //     name: 'search-result',
        //     params: {
        //       keyword: this.keyword
        //     }
        //   })
        //   .catch(err => {
        //   });


        if (v.type === 'channel') {
          this.$router
            .push({
              name: 'channel-detail',
              params: {
                id: v.value
                // title: v.label
                //   .toLowerCase()
                //   .replace(/ /g, '-')
                //   .replace(/\//g, '-')
              }
            })
            .catch(err => {
            });
        } else if (v.type === 'post') {
          this.$router.push({
            name: 'channel-detail-post-detail',
            params: {
              id: v.extra.post_channel.channel_id,
              post_id: v.value
            }
          })
            .catch(err => {});
        } else if (v.type === 'user') {
          this.$router
            .push({
              name: 'profile-detail',
              params: {
                id: v.value
              }
            })
            .catch(err => {
            });
        } else if (v.type === 'search_all') {
          this.$router
            .push({
              name: 'search-result',
              params: {
                keyword: this.keyword
              }
            })
            .catch(err => {
            });
        }
      }
    },
    onClear() {
      this.options = [];
    },
    onFilter(val, update, abort) {
      if (val.length < 1) {
        abort();
        return;
      }

      setTimeout(() => {
        update(() => {
          const needle = val.toLowerCase();
          this.keyword = needle;
          this.options = [];
          get({
            path: `api/searchtopn?keyword=${needle}&includes=user,channel,post,knowledge_tree,training,file`
          })
            .then(res => {
              const result_obj = res.data;
              const result_arr = Object.keys(result_obj).map(
                k => result_obj[k]
              );
              const search_result = result_arr.map(x => {
                let search_obj = {};
                if (x.users_id !== undefined && x.users_id !== null) {
                  search_obj = {
                    label: capitalize(x.user.name),
                    value: x.users_id,
                    type: 'user',
                    group_name: 'USERS',
                    extra1: ''
                  };
                } else if (
                  x.channel_id !== undefined &&
                  x.channel_id !== null
                ) {
                  search_obj = {
                    label: capitalize(x.channel.name),
                    value: x.channel_id,
                    type: 'channel',
                    group_name: 'CHANNEL',
                    extra: x.channel
                  };
                } else if (x.post_id !== undefined && x.post_id !== null) {
                  search_obj = {
                    label: capitalize(x.post.title),
                    value: x.post_id,
                    type: 'post',
                    group_name: 'POSTS',
                    extra: x.post
                  };
                } else if (
                  x.knowledge_tree_id !== undefined &&
                  x.knowledge_tree_id !== null
                ) {
                  search_obj = {
                    label: capitalize(x.knowledge_tree.title),
                    value: x.knowledge_tree_id,
                    type: 'knowledge_tree',
                    group_name: 'KNOWLEDGE MAP',
                    extra: x.knowledge_tree
                  };
                } else if (
                  x.training_id !== undefined &&
                  x.training_id !== null
                ) {
                  search_obj = {
                    label: capitalize(x.training.title),
                    value: x.training_id,
                    type: 'training',
                    group_name: 'TRAINING',
                    extra: x.training
                  };
                } else if (x.file_id !== undefined && x.file_id !== null) {
                  search_obj = {
                    label: capitalize(x.file.title),
                    value: x.file_id,
                    type: 'file',
                    group_name: 'FILES',
                    extra: x.file
                  };
                }
                return search_obj;
              });

              // console.log(search_result);
              const search_options = [];

              if (search_result.length > 0) {
                let tmp = search_result[0].group_name.toUpperCase();
                search_result.forEach((x, i) => {
                  if (x.type !== tmp) {
                    search_options.push({
                      label: x.group_name.toUpperCase(),
                      value: 1,
                      type: 'group',
                      disable: true
                    });
                  }
                  search_options.push(x);
                  tmp = x.type;
                });
              }

              search_options.push({
                label: 'SEARCH MORE..',
                value: 1,
                type: 'search_all',
                disable: false
              });

              // console.log(JSON.parse(JSON.stringify(search_options)));

              this.options = search_options;
            })
            .finally(() => {
              setTimeout(() => {
                if (
                  val !== '' &&
                  this.$refs.search.options.length > 0 &&
                  this.$refs.search.optionIndex === -1
                ) {
                  // console.log(this.$refs.search.options);
                  this.$refs.search.moveOptionSelection(1, true);
                  // this.$refs.search.toggleOption(this.$refs.search.options[this.$refs.search.optionIndex], true);
                }
              }, 100);
            });
        });
      }, 1000);
    },

    onFilterAbort() {
      // console.log('delayed filter aborted')
    },
    // toggleDrawer() {
    //   if (this.$q.screen.gt.xs) {
    //     this.drawer = true;
    //     this.miniState = !this.miniState;
    //   } else {
    //     this.drawer = !this.drawer;
    //     this.miniState = false;
    //   }
    // },
    // can(permissionName) {
    //   return this.$store.getters['user/hasPermission'](permissionName);
    // },
    // hasRole(roleName) {
    //   return this.$store.getters['user/currentHasRole'](roleName);
    // },
    getListChannel() {
      channelList().then(response => {
        const hasil = response.data;
        this.listChannel = hasil.map(item => {
          return {
            channel_type: item.channel_type,
            name: item.name,
            id: item.id,
            is_private: item.is_private
          };
        });
      });
    },
    confirmLogout() {
      const vueContext = this;
      this.$q
        .dialog({
          title: 'Logout',
          message: 'Are you sure to logout application?',
          persistent: true,
          cancel: {
            label: 'Cancel',
            flat: true
          },
          ok: {
            label: 'Yes'
          }
        })
        .onOk(() => {
          this.$store.dispatch('privateMessage/updateListenStatus', false);
          this.$store.dispatch('privateMessage/clearData');
          window.Echo.leave('chat-room');
          logout(vueContext);
          this.saveUserQuiz();
        });
    },
    getUser() {
      const user = getCredential();
      const profile_user = JSON.parse(user.rawProfile);
      this.profileRole = profile_user;
      this.user = {
        id: profile_user.id,
        name: profile_user.name,
        picture: user.userPic === null ? profile_user.profile_picture : user.userPic,
        initial: profile_user.name
          .match(/\b(\w)/g)
          .join('')
          .toUpperCase()
      };
      this.getPoint();
    },
    async getPoint() {
      const res = await leaderboardMemberByMemberIdPointHistory(this.user.id);
      this.point_user = (res.data.length === 0) ? {
        point: 0,
        level_name: 'Star 1',
        remark: 'Newbie',
        icon_name: 'stars',
        icon_color: '#FEB82D',
        final_point: 200,
        percent_point: 0
      } : res.data[0];
    },
    getNotif() {
      notifList().then(response => {
        if (response !== undefined) {
          const hasil = response.data;
          this.dataNotif = hasil.map(item => {
            let is_feedback = false;
            if (item.type === 'Training' && item.detail === 'Close') {
              is_feedback = true;
            }
            return {
              id: item.id,
              message: notifMessage(item),
              status: item.status,
              channel_id: item.channel_id,
              channel: item.channel,
              training_id: item.training_id,
              certificate_id: item.certificate_id,
              event_id: item.event_id,
              training: item.training,
              certificate: item.certificate,
              event: item.event,
              post_id: item.post_id,
              post: item.post,
              type: item.type,
              detail: item.detail,
              created_at: date.formatDate(item.created_at, 'HH:mm (DD MMM YYYY)'),
              is_feedback,
              time: datePost(item.created_at, true),
              sender_id: item.sender_id
            };
          });
          this.notifCount = response.meta.total_data;
        }
      });
    },
    getPoinTrainingParticipant() {
      return poinTraining().then(response => {
        const hasil = response.data;
        if (hasil.length !== 0) {
          hasil.forEach((v, i) => {
            point('add', { tag: 'training_participant', training_id: v.training_id, account_id: this.user.id });
          });
          // this.$q.notify({
          //   message: 'Poin training berhasil ditambahkan',
          //   color: 'blue'
          // });
        }
      });
    },
    RegisterTrainingParticipant() {
      return registerParticipant().then(response => {
      });
    },
    clickNotif(item) {
      if ((item.channel === null && item.channel_id !== null) || (item.training === null && item.training_id !== null) || (item.certificate === null && item.certificate_id !== null) || (item.type === 'Event' && item.post === null && item.post_id !== null) || (item.type === 'Speaker' && item.event === null && item.event_id !== null)) {
        Notify.create({
          message: 'Data is not available!',
          timeout: 5000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        if (item.status === 'Unread') {
          notifRead(item.id);
        }
        if (item.type === 'Channel') {
          this.$router.push({
            name: 'channel-detail',
            params: {
              id: item.channel.id
              // title: item.channel.name
              //   .toLowerCase()
              //   .replace(/ /g, '-')
              //   .replace(/\//g, '-')
            }
          });
        } else if (item.type === 'Training') {
          if (item.detail === 'Close') {
            // bikin error saat perpindahan route jika sedang di training
            // this.$router.push({
            //   name: 'training'
            // });
            if (item.is_feedback) {
              const token = aesEncrypt(JSON.stringify({ trainingId: item.training.id }));
              this.$router.push({ path: '/training/feedback', query: { token } });
            }
          } else {
            // this.updateTrainingId(item.training.id);
            // this.$router.push({
            //   name: 'training'
            // }).catch(() => {
            // });
            this.$router.push({ name: 'training-detail', params: { id: item.training.id } }).catch(() => {
            });
          }
        } else if (item.type === 'Event') {
          console.log(item);
          this.$router.push({
            name: 'channel-detail-post-detail',
            params: {
              id: item.post.post_channel.channel_id,
              post_id: item.post.id
            }
          });
        } else if (item.type === 'Badge') {
          this.$router.push({
            name: 'profile'
          });
        } else if (item.type === 'Certificate' || item.type === 'Speaker') {
          if (item.detail === 'Request') {
            this.$router.push({
              name: 'profile-detail',
              params: { id: item.sender_id }
            });
          } else {
            this.$router.push({
              name: 'profile'
            });
          }
        }
        this.getNotif();
      }
    },
    clickMyProfile() {
      this.$router.push({
        name: 'profile'
      });
    },
    clickSwitchRole(role_id) {
      const user = getCredential();
      Notify.create({
        message: 'Proses mengubah role user',
        timeout: 15000,
        type: 'positive',
        color: 'warning',
        spinner: QSpinnerGears
      });
      switchRole(role_id)
        .then(response => {
          profile({ bearerTokenOverride: user.accessToken })
            .then(({ data, errors }) => {
              if (!errors && data) {
                this.$store.dispatch(
                  'user/updateRawProfile',
                  JSON.stringify(data)
                );
                window.location.reload();
              }
            });
        })
        .catch(e => {
          console.log(e.message);
          Notify.create({
            message: 'Gagal mengubah role user',
            timeout: 5000,
            type: 'negative',
            color: 'negative',
            icon: 'warning'
          });
          throw e;
        });

      // window.location.reload();
    },
    saveUserQuiz() {
      const quizStatus = this.$store.getters['quiz/getQuizStatus'];
      if (quizStatus) {
        // const paramQuiz = {
        //   quiz_status: quizStatus,
        //   quiz_duration: this.$store.getters['quiz/getQuizTime'],
        //   quiz_step: this.$store.getters['quiz/getQuizStep'],
        //   quiz_answer: this.$store.getters['quiz/getQuizAnswer'],
        //   quiz_question: this.$store.getters['quiz/getQuizQuestion']
        // };
        // profileUpdate(this.user.id, paramQuizFalse).then();
        this.$store.dispatch('quiz/clearQuiz');
      }
    },
    changeLeftDrawer() {
      this.$root.$emit('changeLeftBar');
    },
    openDialogSearch() {
      setTimeout(() => {
        this.options = [];
        get({
          path: 'api/searchtrend?includes=channel,post,knowledge_tree,training,file'
        })
          .then(res => {
            const searchOption = res.data.map(x => {
              return {
                ...x,
                extra: JSON.parse(x.extra)
              };
            });

            this.data_options = searchOption;
          });
      }, 500);
      this.search_all = true;
    },
    getDataSearch(val) {
      setTimeout(() => {
        this.data_options = val.data;
        this.keyword = val.keyword;
      }, 1000);
    },
    goingTo(data) {
      if (data !== null) {
        setTimeout(() => {
          this.selected = null;
        }, 1);

        if (data.type === 'post') {
          this.$router.push({
            name: 'channel-detail-post-detail',
            params: { id: data.extra.channel_id, post_id: data.id }
          }).catch(err => {
          });
        } else if (data.type === 'channel') {
          this.$router
            .push({
              name: 'channel-detail',
              params: { id: data.id }
            }).catch(err => {
            });
        } else if (data.type === 'user') {
          this.$router
            .push({
              name: 'profile-detail',
              params: { id: data.id }
            }).catch(err => {
            });
        } else if (data.type === 'knowledge') {
          this.$router
            .push({
              name: 'knowledge',
              query: {
                id: data.extra.organization_id
              },
              params: {
                knowledge_tree_id: data.id,
                knowledge_tree_parent_id: data.extra.parent_id,
                knowledge_tree_parent_parent_id: data.extra.parent_parent_id
              }
            }).catch(err => {
            });
        } else if (data.type === 'training') {
          this.$router
            .push({
              name: 'training-detail',
              params: { id: data.id }
            }).catch(err => {
            });
        } else if (data.type === 'more') {
          this.$router
            .push({
              name: 'search-result',
              params: { keyword: this.keyword }
            }).catch(err => {
            });
        }
        setTimeout(() => {
          this.search_all = false;
          this.data_options = [];
        }, 500);
        this.closeDialogSearchMobile();
      }
    },
    updatePic(pic) {
      this.user.picture = pic;
    }
    // async getPoint() {
    // }
  },
  mounted() {
    if (!this.$store.getters['user/isAuthenticated'] && this.$route.params.id) {
      const token = this.$route.params.id;
      if (token) {
        this.$router.push({ name: 'login', query: { detail: token } }).catch(() => {
        });
      } else {
        this.$router.push('/');
      }
    }
    this.getUser();
    this.getPoint();
    this.getNotif();
    this.getListChannel();
    this.getPoinTrainingParticipant();
    this.RegisterTrainingParticipant();
    this.$root.$on('updateNotif', () => {
      this.getNotif();
    });

    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'Tablet';
      }
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        return 'Mobile';
      }
      return 'Desktop';
    };
    this.$store.dispatch('user/submitDevice', {
      device: getDeviceType(),
      user_agent: navigator.userAgent
    });


    const resetDuration = () => {
      this.$store.dispatch('user/resetDuration');
    };
    const submitDuration = () => {
      this.$store.dispatch('user/submitDuration', {
        path: this.$route.fullPath
      });
      this.$store.dispatch('user/resetDuration');
    };
    const inactivityTime = () => {
      let time;
      let isCounting = true;
      function logoutSession() {
        isCounting = false;
        submitDuration();
      }
      function resetTimer() {
        if (!isCounting) {
          resetDuration();
          isCounting = true;
        }

        clearTimeout(time);
        time = setTimeout(logoutSession, 2000);
      }
      window.onload = resetTimer;
      document.onmousemove = resetTimer;
      document.onkeypress = resetTimer;
      document.onmousedown = resetTimer;
      document.ontouchstart = resetTimer;
      document.onclick = resetTimer; // touchpad clicks
      document.onkeydown = resetTimer; // onkeypress is deprectaed
      document.addEventListener('scroll', resetTimer, true);
    };
    inactivityTime();
    this.$root.$on('changeProfilePic', pic => {
      this.updatePic(pic);
    });
  },
  created() {
    bus.$on('update_nav', data => {
      setTimeout(() => {
        this.getUser();
        this.getNotif();
      }, 1000);
    });
    bus.$on('update_point', data => {
      setTimeout(() => {
        this.getPoint();
      }, 1000);
    });
  }
};
</script>

<style scoped>
.q-tab .q-badge {
  top: 5px;
  right: -2px;
}
body {
  font-family: Inter;
}
</style>
