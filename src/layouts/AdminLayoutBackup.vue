<template>
  <q-layout view="hHh Lpr fFf" style="background:#EEF1F5;">
    <q-header
      bordered
      class="bg-white"
      style="padding: 5px; height:42px; border-bottom: 1px solid #B8C0CC !important"
    >
      <q-toolbar :class="$q.platform.is.mobile ? 'channel-toolbar q-mr-xs  items-center' : 'channel-toolbar'">
        <q-toolbar-title class="items-center vertical-middle full-width text-center">
          <div>
            <img
              src="../assets/images/iconKM.png"
              class="kmp-logo-mobile mobile-only text-center"
              max-width="50px"
              alt=""
              @click="clickDashboard()"
            />
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-primary" v-model="tab">
        <q-tab color="primary" name="list" icon="list" @click="changeLeftDrawer()"/>
        <q-tab color="primary" name="search" icon="search" />
        <q-tab color="primary" name="notifications" icon="notifications" />
        <q-tab color="primary" name="mail" icon="mail" />
        <q-tab color="primary" name="profile" icon="account_circle" @click="clickMyProfile"/>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Notify, QSpinnerGears, date, colors } from 'quasar';
import { mapActions } from 'vuex';
import { getCredential } from 'src/lib/storage';
import { get } from 'src/lib/HttpHelper';
import { capitalize, getUserLogin, datePost, notifMessage } from 'src/lib/helper';
import { leaderboardMemberByMemberIdPointHistory } from 'src/lib/api';
import bus from 'components/common/EventBus';
// import SearchTopBar from 'components/search/SearchTopBar.vue';
import { logout } from '../lib/SessionHelper';
// import Avatar from '../components/common/Avatar';
import {
  // channelPostList
  channelList,
  notifList,
  notifRead,
  profile,
  switchRole
} from '../lib/api';
import { aesEncrypt } from '../lib/helper';

const { getPaletteColor } = colors;

export default {
  components: {
    // SearchTopBar,
    // Avatar
  },
  setup() {
    const leftDrawerOpen = true;

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  },
  data() {
    return {
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
      point_user: {}
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
    clickDashboard() {
      this.$router.push({
        name: 'admin-home'
      });
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
  }
};
</script>

<style scoped>
body {
  font-family: Inter;
}
</style>
