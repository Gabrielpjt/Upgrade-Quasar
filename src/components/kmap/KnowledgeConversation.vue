<template>
  <div class="q-pa-none items-start">
    <q-separator inset />
    <q-card-section class="q-px-sm">
      <template v-if="replies.count > 0">
        <div class="row q-pb-lg">
          <div class="col">
            <span
              class="q-mr-sm"
              v-for="(conversation, conversation_index) in replies.avatar_uniq"
              :key="conversation_index">
                <Avatar
                  size="md"
                  :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"
                  :name="conversation.user.name"
                  @click="goToProfile(conversation.user.id)"
                />
            </span>
            <span class="kmp-font-sm kmp-text-blue-2">{{ replies.count }} Replies</span>
          </div>
        </div>
      </template>

      <div v-if="conversation">
        <div class="kmp-more q-pa-none q-mb-sm" v-for="(item, index) in conversation" :key="index">
          <div class="row">
            <q-item-section avatar style="justify-content: unset;margin-top: 2px;">
              <Avatar size="xl" :picture="item.user.profile_picture ? `./api${item.user.profile_picture}` : ''" :name="item.user.name"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                {{ item.user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
              </q-item-label>
              <q-item-label>
                <div :style="$q.platform.is.mobile ? 'font-size: 12px' : 'font-size: 14px'" class="text-content" v-html="item.scan.text"></div>
              </q-item-label>
            </q-item-section>
            <div>
              <q-btn dense icon="more_horiz" size="xs" class="kmp-more-btn absolute" style="right: 8px"
                     v-show="is_km_manager || user.id === item.created_by">
                <q-menu anchor="bottom right"
                        self="top right"
                >
                  <q-list dense style="min-width: 120px">
                    <q-item clickable v-close-popup @click="conversationEdit(item)" v-show="!is_km_manager">
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="conversationDelete(item.id)">
                      <q-item-section>Delete</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
          <div class="row" v-if="item.knowledge_conversation_file.length > 0 && (item.knowledge_conversation_file[0].file.filemime === 'jpg' || item.knowledge_conversation_file[0].file.filemime === 'jpeg')">
            <q-item-section avatar></q-item-section>
            <q-item-section>
              <q-img class="rounded-borders"
                     :src="url + item.knowledge_conversation_file[0].file.path"
                     :ratio="16/9"
                     @click="openFile(url + item.knowledge_conversation_file[0].file.path)"
              />
            </q-item-section>
          </div>
          <div class="row" v-else="">
            <q-item-section avatar></q-item-section>
            <q-item-section>
              <q-card v-for="(item_file, index) in item.knowledge_conversation_file" :key="index">
                <KnowledgeListFile v-if="item_file.file !== null && (item_file.file.filemime !== 'jpg' && item_file.file.filemime !== 'jpeg')" :file="item_file.file" :item="item_file" :download="true"/>
              </q-card>
            </q-item-section>
          </div>
        </div>
      </div>

      <div class="q-gutter-y-md column q-mb-md">
        <q-input outlined dense placeholder="Write something..." v-model="conversationText" type="textarea" rows="2">
          <template v-slot:before>
            <div class="q-mr-sm">
              <Avatar size="xl" :picture="profile_picture ? `./api${profile_picture}`:''" :name="profile_name"/>
            </div>
          </template>
        </q-input>
        <div hidden>
          <q-file ref="conversationFile" dense clearable filled @input="filePicked" accept=".jpg, image/*"/>
        </div>
      </div>
      <div class="row q-mb-sm" v-if="conversationImage !== null">
        <q-item-section avatar></q-item-section>
        <q-item-section>
          <q-img class="rounded-borders"
                 :src="url + conversationImage.path"
                 :ratio="16/9"
          >
            <q-btn push round dense icon="delete" color="white" text-color="negative" size="xs" class="absolute"
                   style="top: 8px; right: 8px" @click="removeFile(conversationImage)"
            />
          </q-img>
        </q-item-section>
      </div>
      <div class="q-mb-sm" v-show="show_conv_file">
        <q-list class="q-mt-sm" v-for="(item, index) in finish_files" :key="index">
          <KnowledgeListFile v-if="item.file !== null && (item.file.filemime !== 'jpg' && item.file.filemime !== 'jpeg')" :file="item.file"
                             :item="item"
                             :manage="true"
                             @delete_knowledge="removeFile(item, 'document')"
          />
        </q-list>
        <q-uploader
          @added="handleUploads"
          ref="uploaderDoc"
          label="Document upload"
          max-file-size="100000000"
          multiple
          auto-upload
          style="width: 100%"
          class="shadow-0 q-uploader--bordered kmp-rounded q-mt-sm"
        />
      </div>
      <div class="row items-center">
        <q-item-section avatar></q-item-section>
        <q-icon name="mms" :class="$q.platform.is.mobile ? 'q-mr-sm cursor-pointer': 'q-mr-lg cursor-pointer'" size="24px" style="color: #2C8ED3" @click="handlePickFile">
          <q-tooltip>
            Comment with photo
          </q-tooltip>
        </q-icon>
        <q-icon name="attach_file" :class="$q.platform.is.mobile ? 'q-mx-sm cursor-pointer': 'q-ml-sm q-mr-lg cursor-pointer'" size="24px" style="color: #2C8ED3" @click="toogleConvFile">
          <q-tooltip>
            Comment with document
          </q-tooltip>
        </q-icon>
        <q-icon name="insert_emoticon" :class="$q.platform.is.mobile ? 'q-mx-sm cursor-pointer': 'q-ml-sm q-mr-lg cursor-pointer'"
                size ="24px" style="color: #2C8ED3"
        >
          <q-tooltip>
            Comment with Emoticon
          </q-tooltip>
          <q-menu anchor="bottom right"
                  self="top right"
          >
            <div id="appEmoji">
              <VEmojiPicker :style="{ width: '15rem', height: '20rem', paddingBottom: '10px' }"
                            emojiSize="24"
                            @select="selectEmoji"
              />
            </div>
          </q-menu>
        </q-icon>
        <q-space />
        <q-btn no-caps :loading="btnLoading" color="primary" class="float-right" :label="editMode ? 'Update' : 'Comment'" @click="PostConversation" :disable="conversation === ''"/>
      </div>
      <div class="row items-center q-mt-sm" v-show="editMode">
        <q-space />
        <q-btn no-caps outline color="primary" class="float-right" label="Cancel" @click="startDefault"/>
      </div>

    </q-card-section>



  </div>
</template>

<script>

import Avatar from 'components/common/Avatar';
import KnowledgeListFile from 'components/KnowledgeListFile';
import { datePost, deleteList, getLoginId, getUserLogin, urlify } from 'src/lib/helper';
import {
  fileDelete,
  fileUpload,
  knowledgeConversationCreate,
  knowledgeConversationFileCreate,
  knowledgeConversationList,
  knowledgeConversationDelete,
  knowledgeConversationUpdate
} from 'src/lib/api';
import { VEmojiPicker } from 'v-emoji-picker';
import { Notify } from 'quasar';
import { getCredential } from 'src/lib/storage';

export default {
  props: ['knowledge_id'],
  components: { Avatar, KnowledgeListFile, VEmojiPicker },
  data() {
    return {
      user: {
        id: getLoginId(),
        name: getUserLogin().name,
        profile_picture: getUserLogin().profile_picture
      },
      url: process.env.QUASAR_API_URL,
      profile_picture: getUserLogin().profile_picture ? getUserLogin().profile_picture : null,
      profile_name: getUserLogin().name,
      conversationId: null,
      conversationText: '',
      conversation: [],
      conversationImage: null,
      show_conv_file: false,
      btnLoading: false,
      finish_files: [],
      new_finish_files: [],
      replies: {
        count: 0,
        avatar_uniq: []
      },
      editMode: false,
      is_km_manager: false
    };
  },
  methods: {
    getUserRole() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      this.is_km_manager = profile.roles.filter(f => f.name === 'km_manager').length === 1;
    },
    startDefault() {
      this.conversationText = '';
      this.conversationImage = null;
      this.show_conv_file = false;
      this.finish_files = [];
      this.new_finish_files = [];
      this.btnLoading = false;
      this.conversationId = null;
      this.editMode = false;
    },
    getConversation(id) {
      this.startDefault();
      knowledgeConversationList({ knowledge_id: id }).then(res => {
        const response = res.data;
        if (response.length > 0) {
          response.forEach(v => {
            v.time = datePost(v.updated_at);
            const profile_picture = v.user.profile_picture ? `${this.url}${v.user.profile_picture}` : null;
            v.user.profile_picture_custom = profile_picture;
            v.scan = urlify(v.text);
          });
          this.replies.count = response.length;
          this.replies.avatar_uniq = [...new Map(response.map(item => [item.created_by, item])).values()];
        }
        this.conversation = response;
      });
    },
    goToProfile(id) {
      this.$router.push({
        name: 'profile-detail',
        params: {
          id
        }
      });
    },
    handlePickFile() {
      this.show_conv_file = false;
      this.$refs.conversationFile.pickFiles();
    },
    filePicked(file) {
      const formData = new FormData();
      formData.append('file[]', file);
      fileUpload(formData).then(res => {
        const response = res.data[0];
        if (res.message === 'OK') {
          this.conversationImage = response;
        }
      });
    },
    openFile(url) {
      window.open(url, '_blank');
    },
    toogleConvFile() {
      this.show_conv_file = !this.show_conv_file;
    },
    openDialog(dialogName) {
      if (dialogName === 'conv_file') {
        if (this.show_conv_file === true) { this.show_conv_file = false; } else { this.show_conv_file = true; }
      }
    },
    handleUploads(files, content_type) {
      this.loading_upload = true;
      files.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', files[i]);
        fileUpload(formData).then(res => {
          const response = res.data[0];
          // this.addPostFiles(response);
          if (res.message === 'OK') {
            this.finish_files.push(
              { file: response }
            );
            if (files.length === i + 1) {
              this.loading_upload = false;
              this.$refs.uploaderDoc.reset();
            }
            if (this.editMode) {
              this.new_finish_files.push(
                { file: response }
              );
            }
          }
        });
      });
    },
    selectEmoji(emoji) {
      this.conversationText += emoji.data;
    },
    PostConversation() {
      this.btnLoading = true;
      const paramPostConv = {
        knowledge_id: this.knowledge_id,
        created_by: getLoginId(),
        text: this.conversationText,
        enabled: true
      };
      if (!this.editMode && this.conversationId === null) {
        knowledgeConversationCreate(paramPostConv).then(res => {
          if (this.show_conv_file) {
            this.finish_files.forEach(v => {
              const params = {
                knowledge_conversation_id: res.data.id,
                file_id: v.file.id
              };
              knowledgeConversationFileCreate(params).then(resPostFile => {
                setTimeout(() => {
                  console.log('OK');
                }, 500);
              });
            });
            this.getConversation(this.knowledge_id);
          } else if (this.conversationImage !== null) {
            const paramPostConvFile = {
              knowledge_conversation_id: res.data.id,
              file_id: this.conversationImage.id
            };
            knowledgeConversationFileCreate(paramPostConvFile).then(res2 => {
              this.conversationImage = null;
              this.$emit('update_conversation');
              this.getConversation(this.knowledge_id);
            });
          } else {
            this.$emit('update_conversation');
            this.getConversation(this.knowledge_id);
          }
        }).catch(err => {
          this.btnLoading = false;
        });
      } else {
        knowledgeConversationUpdate(this.conversationId, paramPostConv).then(res => {
          if (this.show_conv_file) {
            this.new_finish_files.forEach(v => {
              const params = {
                knowledge_conversation_id: res.data.id,
                file_id: v.file.id
              };
              knowledgeConversationFileCreate(params).then(resPostFile => {
                setTimeout(() => {
                  console.log('OK');
                }, 500);
              });
            });
            this.getConversation(this.knowledge_id);
          } else if (this.conversationImage !== null) {
            const paramPostConvFile = {
              knowledge_conversation_id: res.data.id,
              file_id: this.conversationImage.id
            };
            knowledgeConversationFileCreate(paramPostConvFile).then(res2 => {
              this.conversationImage = null;
              this.$emit('update_conversation');
              this.getConversation(this.knowledge_id);
            });
          } else {
            this.$emit('update_conversation');
            this.getConversation(this.knowledge_id);
          }
        }).catch(err => {
          this.btnLoading = false;
        });
      }
    },
    conversationDelete(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this Comment?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        knowledgeConversationDelete(id).then(res => {
          if (res.message === 'OK') {
            Notify.create({
              message: 'Comment deleted.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            this.getConversation(this.knowledge_id);
          }
        });
      });
    },
    conversationEdit(item) {
      this.conversationId = item.id;
      this.conversationText = item.text;
      this.editMode = true;
      if (item.knowledge_conversation_file.length === 1 &&
        (item.knowledge_conversation_file[0].file.filemime === 'jpg'
        || item.knowledge_conversation_file[0].file.filemime === 'jpeg')) {
        this.show_conv_file = false;
        this.conversationImage = item.knowledge_conversation_file[0].file;
      } else if (item.knowledge_conversation_file.length > 0) {
        this.conversationImage = null;
        this.show_conv_file = true;
        // const file = item.knowledge_conversation_file.map(v => { return v.file; });
        // console.log(`edit conversation document, file: ${file}`);
        this.finish_files = item.knowledge_conversation_file.map(v => ({ file: v.file }));
      }
    },
    removeFile(item, type) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this file?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        const file_id = type === 'document' ? item.file.id : item.id;
        fileDelete(file_id).then(res => {
          if (res.message === 'OK') {
            if (type === 'document') {
              const removeIndex = this.finish_files.findIndex(v => v.file.id === item);
              this.finish_files = deleteList(this.finish_files, removeIndex);
            } else {
              this.conversationImage = null;
            }
          }
        });
      });
    }
  },
  mounted() {
    this.getUserRole();
  },
  watch: {
    knowledge_id: {
      immediate: true,
      handler(value) {
        this.getConversation(value);
      }
    }
  }
};
</script>

<style>
#appEmoji {
  position: relative;
}
#Categories {
  overflow-x: unset !important;
}
.kmp-more:hover .kmp-more-btn{
  display: unset;
}
.kmp-more-btn {
  display: none;
}
</style>
