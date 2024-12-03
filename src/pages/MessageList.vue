<template>
  <q-page>
    <LeftBar/>
    <div class="row items-center kmp-header">
      <q-icon name="message" class="q-mr-sm" size="20px" />
      <span>Private Message</span>
    </div>
    <div class="row q-pa-lg">
      <div class="col-12">

        <div class="items-start">
          <q-card class="">
            <q-card-section class="row items-center justify-between">
              <div class="kmp-smart-report-title" style="margin-bottom: unset;">
                <q-icon name="3p" class="q-mr-sm" size="1.4em"/>
                You & {{memberOnline}} User{{memberOnline>1?'s':''}} Online
                <q-space/>
              </div>
              <q-icon name="search" size="1.4em" class="kmp-smart-report-title" style="margin-bottom: unset;" @click="search_user_model = true;"/>
            </q-card-section>

            <q-card-section class="row items-center q-pt-none q-mb-md">
              <div class="bg-grey-2" style="max-height: 200px; max-width: 100%; width: 100%" v-show="memberOnline>0">
                <div style="max-height: 200px;" class="scroll q-px-sm q-py-sm">
                  <q-item
                    v-for="(item, index) in memberOnlineList"
                    :key="index"
                    dense
                    v-bind:clickable="item.id !== getLoginId()"
                    v-bind:class="item.id !== getLoginId()?'cursor-pointer':''"
                    class="kmp-private-message-member kmp-menu-left q-py-sm q-my-xs q-pl-sm q-pr-sm"
                  >
                    <q-item-section avatar @click="goToProfile(item.id)">
                      <Avatar size="md" :online="true"
                              :picture="item.profile_picture ? `./api${item.profile_picture}` : ''" :name="item.name"/>
                    </q-item-section>
                    <q-item-section class="list list-channel text-capitalize q-pl-xs" @click="goToProfile(item.id)">
                      <q-item-label>{{ item.name.toLowerCase() }}</q-item-label>
                    </q-item-section>
                    <q-item-section side v-if="item.id !== getLoginId()" @click="doOpenPM(item)">
                      <div class="fit row">
                        <div>
                          <q-icon class="q-ml-xs" name="chat_bubble" size="20px"/>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="">
            <q-card-section class="row items-center justify-between">
              <div class="kmp-smart-report-title" style="margin-bottom: unset;">
                <q-icon name="3p" class="q-mr-sm" size="1.4em"/>
                  Message
                <q-space/>
              </div>
            </q-card-section>

            <q-card-section class="row items-center q-pt-none q-mb-md">
              <div class="bg-grey-2" style="max-height: 300px; max-width: 100%; width: 100%">
                <div style="height: 300px" class="scroll q-px-sm q-py-sm">
                  <q-item
                    class="kmp-menu-left q-py-xs q-my-xs q-px-sm q-pr-sm"
                    dense
                    clickable
                    v-ripple
                    active-class="kmp-menu-left-active"
                    @click="search_user_model = true;"
                    v-show="messageSearch.member_list.length === 0"
                  >
                    <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                      <q-icon name="add_reaction" class="" size="1.5em"/>
                    </q-item-section>
                    <q-item-section class="">
                      Start a chat
                    </q-item-section>
                  </q-item>
                  <q-item
                    v-for="(item, index) in messageSearch.member_list"
                    :key="index"
                    dense
                    clickable
                    class="kmp-private-message-member-mobile kmp-menu-left q-py-xs q-my-sm q-pl-sm cursor-pointer q-pr-sm"
                  >
                    <q-item-section @click="handleOpenMessage(item.message_id)" avatar>
                      <Avatar size="md" :online="item.is_online"
                              :picture="item.profile_picture ? `./api${item.profile_picture}` : ''" :name="item.name"/>
                    </q-item-section>
                    <q-item-section @click="handleOpenMessage(item.message_id)" class="list list-channel text-capitalize q-pl-xs">
                      {{ item.name.toLowerCase() }}
                    </q-item-section>
                    <q-item-section side>
                      <div class="fit row">
                        <div v-if="item.message_count >0">
                          <q-badge color="primary" rounded :label="(item.message_count > 99?'99+': item.message_count)"/>
                        </div>
                        <div>
                          <q-icon class="kmp-private-message-member-more q-ml-xs" name="more_vert" size="20px"/>
                          <q-menu anchor="top right" max-height="400px">
                            <q-list style="min-width: 100px">
                              <q-item clickable v-close-popup dense
                                      @click="$router.push({ name: 'profile-detail', params: { id: item.id } })">
                                <q-item-section avatar class="q-pa-none" style="min-width: 30px">
                                  <q-icon name="account_circle" size="20px"/>
                                </q-item-section>
                                <q-item-section>Go to Profile</q-item-section>
                              </q-item>
                              <q-item clickable v-close-popup dense @click="messageMenu('clear',item)">
                                <q-item-section avatar class="q-pa-none" style="min-width: 30px">
                                  <q-icon name="clear" size="20px"/>
                                </q-item-section>
                                <q-item-section>Clear</q-item-section>
                              </q-item>
                              <q-item clickable v-close-popup dense @click="messageMenu('delete',item)">
                                <q-item-section avatar class="q-pa-none" style="min-width: 30px">
                                  <q-icon name="delete" size="20px"/>
                                </q-item-section>
                                <q-item-section>Delete</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="search_user_model" :maximized="true">
      <q-card class="">
        <q-bar class="bg-primary" style="height: 40px !important;" v-close-popup>
          <q-space />

          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div class="row no-wrap q-pa-none q-px-md">
          <q-input borderless dense ref="search_input" @input="messageMemberSearch" debounce="1000"
                   clear-icon="close"
                   class="q-pa-none q-ma-none" style="width: 100%" v-model="messageSearch.member_search_input"
                   label="Search User">
            <template v-slot:append>
              <q-icon v-if="messageSearch.member_search_input === ''" name="search"/>
              <q-icon v-else name="clear" class="cursor-pointer" @click="messageMemberSearchClear"/>
            </template>
          </q-input>
        </div>

        <q-separator/>

        <div class="row no-wrap q-pa-none q-mx-xs">
          <q-scroll-area style="height: 300px;width: 100vw; max-width: 100vw;">
            <q-item
              v-bind:class="!messageSearch.is_loading && messageSearch.member_search_list.length === 0?'':'hidden'"
              :key="`notif`" style="max-width: 100vw">
              <q-item-section>
                <div class="text-center">
                  <q-img class="q-mt-xl q-px-xl" src="../assets/images/search-not-found.png"
                         style="max-width: 100vw"/>
                  <div v-if="messageSearch.member_search_input === ''" class="kmp-font-md text-center q-mt-lg">
                    Search user
                  </div>
                  <div v-if="messageSearch.member_search_input === ''" class="kmp-font-sm text-center q-mb-lg">
                    Select a user to start private message
                  </div>
                  <div v-if="messageSearch.member_search_input.length >=1 && messageSearch.member_search_input !== ''" class="kmp-font-md text-center q-mt-lg">
                    Search user not found!
                  </div>
                  <div v-if="messageSearch.member_search_input.length <1 && messageSearch.member_search_input !== ''" class="kmp-font-md text-center q-mt-lg">
                    Search keyword
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <q-item v-bind:class="messageSearch.is_loading?'':'hidden'" v-for="index in 5"
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
              v-for="(item, index) in messageSearch.member_search_list"
              :key="`item_${index}`"
              dense
              clickable
              class="kmp-menu-left q-py-xs q-my-xs q-pl-sm cursor-pointer q-mr-md"
              v-close-popup
              @click="messageMenu('create',item)">
              <q-item-section avatar>
                <!--                            :online="item.is_online"-->
                <Avatar size="md" class="q-mr-sm"
                        :picture="item.profile_picture ? `./api${item.profile_picture}` : ''"
                        :name="item.name"/>
              </q-item-section>
              <q-item-section class="list list-channel text-capitalize">
                {{ item.name.toLowerCase() }}
              </q-item-section>
              <!--                          <q-item-section side>-->
              <!--                            <q-badge color="primary" rounded :label="item.message_count"/>-->
              <!--                          </q-item-section>-->
            </q-item>
          </q-scroll-area>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { format } from 'quasar';
import Avatar from 'components/common/Avatar';
import LeftBar from 'components/LeftBar';
import { getCredential } from 'src/lib/storage';
import {
  deleteMessageParticipant, messageConversationRead,
  messageListById, messageMemberList, postCreateNewMessage, postMessageConversationClear, updateUpdatedDate
} from 'src/lib/api';
import { getLoginId, datePost, getFormattedTime } from 'src/lib/helper';
import { get } from 'src/lib/HttpHelper';

export default {
  components: {
    Avatar,
    LeftBar
  },
  data() {
    return {
      postCreateNewMessage,
      getLoginId,
      on_drop_style: false,
      messageInput: null,
      datePost,
      timePost: getFormattedTime,
      refresh: false,
      preview: {
        is_show: false,
        file: {},
        text: {}
      },
      preview_url: '',
      helper: format,
      url: process.env.QUASAR_API_URL,
      message: {
        input: '',
        member_list: [],
        message_list: [],
        message_list_conversation: [],
        message_list_unique: [],
        messageFetch: messageListById
      },
      messageSearch: {
        member_list: [],
        member_list_id: [],
        member_search_list: [],
        member_search_input: '',
        memberFetch: messageMemberList,
        deleteMessageParticipant,
        is_loading: false
      },
      all_member_list: [],
      online_users: {
        dialog: false,
        user: { id: 0, name: '' },
        list_dialog: false
      },
      search_user_model: false,
      user: {}
    };
  },
  computed: {
    memberOnline() {
      const member_online = this.$store.getters['privateMessage/memberOnlineList'].filter(x => x.id !== this.user.id);
      return member_online.length;
    },
    memberOnlineList() {
      const member_online = this.$store.getters['privateMessage/memberOnlineList'].filter(x => x.id !== this.user.id);
      return member_online;
    }
  },
  methods: {
    doOpenPM(data) {
      this.online_users.list_dialog = false;
      setTimeout(() => {
        const member = this.message.member_list.find(x => x.id === data.id);
        if (member) {
          this.handleOpenMessage(member.message_id);
        } else {
          this.messageMenu('create', data);
        }
      }, 500);
    },
    messageMenu(type, data) {
      if (type === 'create') {
        const new_message = {
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
        this.postCreateNewMessage(new_message)
          .then(res => {
            setTimeout(() => {
              this.handleOpenMessage(res.message.id);
            }, 500);
          });
      } else if (type === 'clear') {
        this.$q.dialog({
          title: 'Confirmation',
          message: 'Are you sure to clear this conversation?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          postMessageConversationClear({ message_id: data.message_id });
          this.$store.dispatch('privateMessage/updateMessageListClear', { message_id: data.message_id });
        }).onCancel(() => {
        }).onDismiss(() => {
        });
      } else if (type === 'delete') {
        this.$q.dialog({
          title: 'Confirmation',
          message: 'Are you sure to delete this conversation?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          deleteMessageParticipant(data.message_id)
            .then(res => {
              const allMemberList = this.$store.getters['privateMessage/allMemberList'];
              this.all_member_list = allMemberList;
              const idMemberList = allMemberList.map(x => {
                return { id: x };
              });
              this.messageMemberFetch(idMemberList);

              if (this.message.member_list.filter(x => x.message_id !== data.message_id).length > 0) {
                this.$router.push({
                  name: 'message',
                  params: {
                    id: this.message.member_list.filter(x => x.message_id !== data.message_id)[0].message_id
                  }
                });
              } else {
                this.$router.push({
                  name: 'admin-home'
                });
              }
            });
        }).onCancel(() => {
        }).onDismiss(() => {
        });
      }
    },
    updateMemberList(action, message_id) {
      const currentMemberList = this.$store.getters['privateMessage/memberList'];
      const allMemberList = this.$store.getters['privateMessage/allMemberList'];
      this.all_member_list = allMemberList;

      if (currentMemberList.find(x => x.message_id === message_id) === undefined) {
        this.messageMemberFetch(allMemberList.map(x => {
          return { id: x };
        }));
      } else {
        const memberList = currentMemberList.map(x => {
          if (action === 'clear' && x.message_id === parseInt(message_id, 10)) {
            return { ...x, message_count: 0 };
          }
          if (action === 'add' && x.message_id === parseInt(message_id, 10)) {
            return { ...x, message_count: x.message_count + 1 };
          }
          return { ...x };
        });
        let sortedMemberList = memberList;
        if (action === 'add') {
          sortedMemberList = memberList.filter(x => x.message_id !== message_id);
          sortedMemberList.unshift(memberList.find(x => x.message_id === message_id));
        }

        updateUpdatedDate(message_id);
        setTimeout(() => {
          this.$store.dispatch('privateMessage/updateMemberList', sortedMemberList);
        }, 2000);
      }

      if (action === 'clear') {
        messageConversationRead(message_id).then();
      }
    },
    handleOpenMessage(id) {
      if (this.$route.path !== `/message/${id}`) {
        this.$router.push({
          name: 'message',
          params: {
            id
          }
        });

        setTimeout(() => {
          this.updateMemberList('clear', id);
        }, 1000);
      }
    },
    goToProfile(id) {
      this.$router.push({
        name: 'profile-detail',
        params: {
          id
        }
      });
    },

    messageMemberSearchClear() {
      this.messageSearch.member_search_input = '';
      this.messageSearch.member_search_list = [];

      setTimeout(() => {
        this.$refs.search_input.focus();
      }, 100);
    },
    messageMemberSearch(value) {
      if (value.length >= 1) {
        this.messageSearch.is_loading = true;
        this.messageSearch.member_search_list = [];
        get({
          path: `api/search?keyword=${value.toLowerCase()}&includes=user&paging=50`
        }).then(res => {
          this.messageSearch.member_search_list = res.data
            .filter(x => x.user.id !== this.user.id)
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
          this.messageSearch.is_loading = false;
        });
      }
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      this.user = {
        id: profile.id,
        name: profile.name,
        profile_picture: profile.profile_picture ? `api/${profile.profile_picture}` : ''
      };
    }
  },
  watch: {
    '$store.state.privateMessage.member_list': {
      immediate: true,
      deep: true,
      handler(value) {
        setTimeout(() => {
          const arr = this.$store.getters['privateMessage/memberList'];
          this.messageSearch.member_list = arr.filter(
            (obj, index) =>
              arr.findIndex(item => item.id === obj.id) === index
          );
          this.messageSearch.member_list_id = this.messageSearch.member_list.map(x => {
            return x.id;
          });
        }, 500);
        // this.playSound('online');
      }
    }
  },
  mounted() {
    this.getUser();
    this.$root.$on('updateMessage', (action, message_id) => {
      this.updateMemberList(action, message_id);
    });
  }
};
</script>

<style>


</style>


