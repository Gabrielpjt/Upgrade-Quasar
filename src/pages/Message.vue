<template>
  <q-page>
    <LeftBar :is_loading="refresh" @onResize="onResize"/>
    <MessageBar :participant="message.message_list_unique"/>
    <div class="row q-pa-lg">
      <div class="col-12">

        <div class="items-start">
          <q-card class="">
            <q-card-section>
<!--              <div class="fixed"-->
<!--                   style="z-index: 999999999999!important;"-->
<!--                   v-bind:class="on_drop_style?'kmp-file-drop':''"-->
<!--                   @dragenter.prevent="onDragEnter"-->
<!--                   @dragleave.prevent="onDragLeave"-->
<!--                   @dragover.prevent="onDragOver"-->
<!--                   @drop.prevent="onDrop"-->
<!--                   :style="chat_window_style">-->
<!--                      <span class="text-h5 text-weight-light text-grey-6 float-right q-mt-sm q-mr-md"-->
<!--                            v-bind:class="on_drop_style?'':'hidden'">-->
<!--                        Drop file here-->
<!--                      </span>-->
<!--              </div>-->

              <div v-if="preview.is_show" :style="card_preview_style">
                <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<!--                  @click="clearPreview"-->
                  <div class="column justify-center items-center">
                    <div class="q-mt-xl kmp-picture"
                         style="min-width: 600px; max-width: 600px; max-height: 450px; overflow: hidden">
                      <div class="full-width row justify-center items-end"
                           :style="{height: `${parseInt(card_preview_style.height.replace('px',''))-180}px`, maxHeight: '450px'}">

<!--                        style="width: 100vw; height: 100vh; max-width: 600px; max-height: 450px; z-index: 99999999!important;"-->
                        <UserPicture
                          @click="noAction"
                          class="q-mt-xs q-mx-xs"
                          :style="{width: '100%', maxWidth: '600px', height: `${parseInt(card_preview_style.height.replace('px',''))-180}px`, maxHeight: '450px'}"
                          v-if="['png','jpg','jpeg','gif'].includes(preview.file.filemime.toLowerCase())"
                          :file="{
                            filename: preview.file.filename,
                            filemime: preview.file.filemime,
                            filesize: preview.file.filesize,
                            path: url + preview.file.path,
                            }"
                        />
                        <q-media-player
                          v-if="preview.file.filemime === 'mp4'"
                          type="video" dense
                          :autoplay="true"
                          :sources="[{
                            src: url + preview.file.path,
                            type: 'video/mp4'
                          }]"
                        />
                      </div>
                    </div>
                    <div class="q-mt-lg">{{preview.text}}</div>

                    <q-icon class="absolute all-pointer-events kmp-picture-download cursor-pointer"
                            @click="downloadFile(preview.file)"
                            size="24px" name="download" color="grey-9"
                            style="top: 28px; right: 62px"/>

                    <q-icon class="absolute all-pointer-events kmp-picture-download cursor-pointer"
                            @click="clearPreview"
                            size="24px" name="clear" color="grey-9"
                            style="top: 28px; right: 28px"/>
                  </div>
                </transition>
              </div>

              <div v-else-if="file_model !== null" :style="card_preview_style">
                <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                  <div class="column justify-center items-center">
                    <div class="kmp-border kmp-picture q-mt-xl"
                         style="min-width: 600px; max-width: 600px; max-height: 450px; overflow: hidden">
                      <div v-if="preview_url !== ''" class="full-width row justify-center items-end"
                           :style="{height: `${parseInt(card_preview_style.height.replace('px',''))-180}px`, maxHeight: '450px'}">
                        <q-img v-if="file_model.type.includes('image')" :src="preview_url" :ratio="4/3"></q-img>

                        <iframe
                          v-if="file_model.type.includes('video')"
                          :src="`./player?id=${preview.user_id}&src=${preview_url}&type=blob`"
                          style="border: none; width: 100vw; height: 100vh; max-width: 600px; max-height: 450px; overflow: hidden" allowfullscreen />

                        <div v-if="file_model.type.includes('audio')"
                             class="fit column justify-center items-center" style="height: 10% !important;">
                          <q-icon size="150px" name="music_note" style="color: #dedede"/>
                        </div>
                        <iframe
                          v-if="file_model.type.includes('audio')"
                          :src="`./player?id=${preview.user_id}&src=${preview_url}&type=audioblob`"
                          style="border: none; width: 100%; overflow: auto; min-height: 40px; max-height: 40px;" />
                      </div>
                      <div v-else class="fit column justify-center items-center">
                        <q-icon size="150px" name="receipt_long" style="color: #dedede"/>
                      </div>
                    </div>
                    <div class="q-mt-md">Size {{ helper.humanStorageSize(file_model.size) }}</div>
                    <div class="q-mt-xs" v-if="file_model.type.includes('application')"><strong>{{ file_model.name }}</strong></div>
                    <div class="q-mt-md">
                      <q-input
                        ref="messageInput"
                        v-model="message.input"
                        @click="onClick"
                        @keyup.enter="messageSend"
                        dense
                        outlined
                        placeholder="Write something..."
                        class="q-ma-sm"
                        style="width: 400px"
                      >
                        <template v-slot:after>
                          <q-btn @click="messageSend" size="20px" round dense flat icon="send" color="primary" />
                        </template>
                      </q-input>
                    </div>

                    <q-icon class="absolute all-pointer-events kmp-picture-download cursor-pointer"
                            @click="clearFileModel"
                            size="20px" name="clear" color="grey-9"
                            style="top: 28px; right: 28px"/>
                  </div>
                </transition>
              </div>

              <!--                <q-item class="q-ma-none q-px-sm" style="min-height: 10px!important;">-->
              <!--                  <q-item-section>-->
              <!--                    <div class="text-center">-->
              <!--                      <q-separator class="q-my-md q-mr-sm"/>-->
              <!--                      <div-->
              <!--                        class="kmp-font-sm kmp-text-grey-1 text-center"-->
              <!--                        style="max-width: 70px; background-color: #ffffff; margin: auto; margin-top: -25px; ">-->
              <!--                        Today-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                  </q-item-section>-->
              <!--                </q-item>-->

              <!--              v-bind:class="on_drop_style?'kmp-file-drop':'kmp-file-drop'"-->

              <q-scroll-area
                v-else
                ref="scrollArea"
                style="position: relative"
                :style="card_message_style">
                <q-resize-observer @resize="onResizeMessage"/>

                <q-infinite-scroll
                  ref="infinite_message_list"
                  @load="onLoadMessageList"
                  :offset="250"
                  reverse>
                  <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                      <q-spinner color="primary" name="dots" size="40px" />
                    </div>
                  </template>

                  <q-item class="q-ma-none q-pa-sm" v-for="n in 15" :key="n"/>

                  <q-item
                    v-if="message.message_list.length === 0"
                    class="q-ma-none q-pa-sm q-mr-sm">
                    <q-item-section>
                      <div class="text-center">
                        <div class="kmp-font-lg kmp-font-bold text-center q-mb-lg kmp-text-grey-1">Say something to start
                          discussion
                        </div>
                        <q-img class="" src="../assets/images/kmp-private-message.png" style="max-width: 300px"/>
                        <br v-for="m in 6" :key="m" class="desktop-only"/>
                        <br v-for="m in 2" :key="m" class="mobile-only"/>
                      </div>
                    </q-item-section>
                  </q-item>


                  <MessageList :message_list="message.message_list" :message="message" @onPreview="onPreview" />
                </q-infinite-scroll>

<!--                <MessageList :message_list="message.message_list" :message="message" @onPreview="onPreview" />-->
              </q-scroll-area>


            </q-card-section>

            <q-separator :inset="on_drop_style" v-if="file_model === null && !preview.is_show "/>

            <q-card-section v-if="file_model === null && !preview.is_show">
              <!--            <q-card-section>-->
              <div class="row">
                <div class="col q-mt-sm text-center" style="max-width: 50px!important;">
                  <Avatar size="xl" :picture="user.profile_picture" :name="user.name"/>
                </div>
                <div class="col">
                  <q-input
                    ref="messageInput"
                    v-model="message.input"
                    @click="onClick"
                    @keyup.enter="messageSend"
                    dense
                    outlined
                    placeholder="Write something..."
                    class="q-ma-sm"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col q-mt-sm text-center" style="max-width: 50px!important;"/>
                <div class="col">
                  <q-icon name="add_to_queue" class="q-ml-sm cursor-pointer" size="24px" style="color: #2C8ED3"
                          @click="onSelectFile('media')">
                    <q-tooltip>
                      Post with photo and video
                    </q-tooltip>
                  </q-icon>
                  <q-icon name="attach_file" class="q-ml-sm attach-icon cursor-pointer" size="24px"
                          @click="onSelectDocFile('document')">
                    <q-tooltip>
                      Post with document
                    </q-tooltip>
                  </q-icon>
                </div>
                <div class="col-4">
                  <q-btn no-caps unelevated :disable="message.input === ''"
                         :color="message.input === ''?'grey-5':'primary'" class="float-right q-mr-sm" label="Send"
                         @click="messageSend"/>
                </div>
              </div>
            </q-card-section>
            <q-file
              ref="file_ref"
              @input="onInputFile"
              @rejected="onRejected"
              accept=".png, .jpg, .jpeg, .gif, .mp4, .mp3"
              max-file-size="20480000"
              v-model="file_model"
              class="hidden"
              label="Standard"/>
            <q-file
              ref="file_doc_ref"
              @input="onInputFile"
              @rejected="onRejected"
              accept=".docx, .doc, .xlsx, .xls, .pptx, .ppt, .pdf, .zip"
              max-file-size="20480000"
              v-model="file_model"
              class="hidden"
              label="Standard"/>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { format } from 'quasar';
import UserPicture from 'components/common/Picture';
import Avatar from 'components/common/Avatar';
import LeftBar from 'components/LeftBar';
import MessageBar from 'components/message/MessageBar';
import MessageList from 'components/message/MessageList';
import { getCredential } from 'src/lib/storage';
import {
  fileUpload, getMessageParticipantByMessageId, messageConversationRead, messageListById,
  postPrivateMessage
} from 'src/lib/api';
import { datePost, getLoginId, getFormattedTime } from 'src/lib/helper';
import Axios from 'axios';

export default {
  components: {
    MessageBar,
    LeftBar,
    Avatar,
    MessageList,
    UserPicture
  },
  data() {
    return {
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
      userId: getLoginId,
      file_model: null,
      file_ref: null,
      file_doc_ref: null,
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
      chat_window_style: {
        width: '1000px'
      },
      card_message_style: {
        height: '645px',
        minHeight: '200px'
      },
      card_preview_style: {
        height: '645px',
        minHeight: '200px'
      },
      user: {}
    };
  },
  methods: {
    noAction(event) {
      event.stopPropagation();
    },
    downloadFile(file) {
      Axios.get(this.url + file.path, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: response.data.type });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = file.filename;
          link.click();
          URL.revokeObjectURL(link.href);
        }).catch(console.error);
    },
    onPreview(data) {
      this.preview.is_show = true;
      this.preview.file = data.file;
      this.preview.text = data.text;
    },
    onDragEnter(e) {
      if (e.target.draggable !== true) {
        if (!this.on_drop_style) this.on_drop_style = true;
      }
    },
    onDragLeave(e) {
      if (this.on_drop_style) this.on_drop_style = false;
    },
    onDragOver(e) {
      e.preventDefault();
    },
    onDrop(e) {
      e.preventDefault();

      // eslint-disable-next-line prefer-destructuring
      this.file_model = e.dataTransfer.files[0];
      this.onInputFile(e.dataTransfer.files[0]);
      this.on_drop_style = false;
    },
    clearFileModel() {
      this.refreshList();
      this.file_model = null;
      setTimeout(() => {
        this.$refs.messageInput.focus();
      }, 500);
    },
    clearPreview(event) {
      event.stopPropagation();
      this.preview.is_show = false;
      setTimeout(() => {
        this.refreshList();

        this.preview.file = {};
        this.$refs.messageInput.focus();
      }, 100);
    },
    onRejected(rejectedEntries) {
      if (rejectedEntries[0].failedPropValidation === 'max-file-size') {
        this.$q.notify({
          type: 'negative',
          // message: 'You sent a file more than 2MB limit for media or 20MB limit for document'
          message: 'You sent a file more than 20MB limit'
        });
      }
    },
    onInputFile(data) {
      if (data.type.includes('image') || data.type.includes('video') || data.type.includes('audio')) this.preview_url = URL.createObjectURL(data);
      else this.preview_url = '';

      setTimeout(() => {
        this.$refs.messageInput.focus();
      }, 100);
    },
    onSelectFile() {
      this.$refs.file_ref.pickFiles();
    },
    onSelectDocFile() {
      this.$refs.file_doc_ref.pickFiles();
    },
    onResizeMessage(value) {
      this.chat_window_style = {
        ...this.chat_window_style,
        width: `${value.width - 1}px`,
        height: `${parseInt(this.card_preview_style.height.replace('px', ''), 10) - 5}px`
      };
    },
    onResize(value) {
      const pixelmin = this.$q.platform.is.mobile ? 360 : 260;
      this.card_message_style = { ...this.card_message_style, height: `${value - pixelmin}px` };
      this.card_preview_style = { ...this.card_preview_style, height: `${value - 130}px` };
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      this.user = {
        id: profile.id,
        name: profile.name,
        profile_picture: profile.profile_picture ? `api/${profile.profile_picture}` : ''
      };
    },
    sendMessage() {
      this.refreshList();
    },
    refreshList() {
      if (this.$refs.scrollArea !== undefined) {
        this.$refs.scrollArea.setScrollPercentage(1);
      }
      // if (this.$refs.infinite_message_list !== undefined) {
      //   setTimeout(() => {
      //     this.$refs.infinite_message_list.reset();
      //   }, 1000);
      // }
    },
    onLoadMessageList(index, done) {
      done();
    },
    messageFetch(message_id) {
      this.message.messageFetch(message_id)
        .then(res => {
          let prev_user_id = 0;
          const message = res.data
            .sort((a, b) => {
              return new Date(a.created_at) - new Date(b.created_at);
            })
            .map((x, i) => {
              const new_date = { ...x, prev_user_id };
              prev_user_id = x.created_by.id;
              return new_date;
            });
          const messageList = this.$store.getters['privateMessage/messageList'].find(x => x.message_id === parseInt(message_id, 10));
          if (messageList === undefined) {
            if (message.length === 0) {
              this.message.message_list = [];
              setTimeout(() => {
                this.refreshList();
              }, 800);
            } else {
              this.$store.dispatch('privateMessage/updateMessageListByMessageId', {
                message_id: parseInt(message_id, 10),
                chat: message
              });
            }
          } else {
            this.message.message_list = messageList.chat;
            setTimeout(() => {
              this.refreshList();
            }, 800);
          }
        });
    },
    updateMemberList(action, message_id) {
      const currentMemberList = this.$store.getters['privateMessage/memberList'];
      const memberList = currentMemberList.map(x => {
        if (action === 'clear' && x.message_id === parseInt(message_id, 10)) {
          return { ...x, message_count: 0 };
        }
        if (action === 'add' && x.message_id === parseInt(message_id, 10)) {
          return { ...x, message_count: x.message_count + 1 };
        }
        return { ...x };
      });
      if (action === 'clear') {
        messageConversationRead(message_id).then();
      }
      setTimeout(() => {
        this.$store.dispatch('privateMessage/updateMemberList', memberList);
      }, 2000);
    },
    onClick(data) {
      this.updateMemberList('clear', this.$route.params.id);
    },
    messageSend() {
      const message_input = this.message.input;
      this.message.input = '';
      const post_message = file_upload => {
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
          message_id: parseInt(this.$route.params.id, 10),
          prev_user_id: (this.message.message_list.length > 0) ? this.message.message_list.slice(-1)[0].created_by.id : 0,
          text: message_input,
          read_users: `{${getLoginId()}}`
        };

        if (file_upload !== null) {
          new_message.file = file_upload;
          new_message.file_id = file_upload.id;
        } else {
          new_message.file_id = null;
        }

        const new_data = {
          message: {
            message_id: parseInt(this.$route.params.id, 10),
            chat: new_message
          }
        };

        postPrivateMessage({ ...new_data })
          .then(res => {
            new_message.id = parseInt(res.data.id, 10);

            this.$store.dispatch('privateMessage/updateMessageListByMessageId', {
              message_id: parseInt(this.$route.params.id, 10),
              chat: [{ ...new_message }]
            });
          });
      };

      if (this.file_model !== null) {
        const formData = new FormData();
        formData.append('file[]', this.file_model);
        fileUpload(formData).then(res => {
          if (res.message === 'OK') {
            post_message(res.data[0]);
            this.file_model = null;

            setTimeout(() => {
              this.$refs.messageInput.focus();
              this.refreshList();
            }, 500);
          }
        }).catch(err => {
          // this.loading_upload = false;
        });
      } else if (message_input !== '') {
        post_message(null);

        setTimeout(() => {
          this.$refs.messageInput.focus();
          this.refreshList();
        }, 500);
      }
    },
    getParticipant(message_id) {
      getMessageParticipantByMessageId({ message_id })
        .then(res => {
          this.message.message_list_unique = res.data
            .filter(x => x.users_id !== this.user.id)
            .map(x => {
              return x.user.name;
            });
        });
    }
  },
  watch: {
    '$store.state.privateMessage.message_list':
      {
        immediate: true,
        deep:
          true,
        handler(value) {
          const messageList = this.$store.getters['privateMessage/messageList'].find(x => x.message_id === parseInt(this.$route.params.id, 10));
          if (messageList !== undefined) {
            this.message.message_list = messageList.chat;
          } else {
            this.message.message_list = [];
          }
          setTimeout(() => {
            this.refreshList();
          }, 500);
        }
      },
    '$store.state.privateMessage.member_list':
      {
        immediate: true,
        deep:
          true,
        handler(value) {
          this.message.member_list = this.$store.getters['privateMessage/memberList'];
        }
      },
    '$route.params.id':
      {
        immediate: true,
        deep:
          true,
        handler(value) {
          if (value !== undefined) {
            this.getParticipant(value);
            this.messageFetch(value);
            setTimeout(() => {
              this.$refs.messageInput.focus();
            }, 500);
          }
        }
      }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<!--<style>-->

<!--img {-->
<!--  max-width: 100%;-->
<!--  height: auto;-->
<!--}-->


<!--</style>-->


