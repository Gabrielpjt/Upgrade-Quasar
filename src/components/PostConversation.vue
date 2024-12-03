<template>
  <div class="q-pa-none items-start">
    <div hidden class="q-mb-md" v-if="conversation.length > 0">
      <div class="row q-mb-sm" >
        <span class="text-rep-count-here">{{ conversation.length }} replies</span>
      </div>
      <q-separator/>
    </div>
    <q-card-section class="q-pa-none">
      <div v-if="conversation.length > 3">
        <div :hidden="!hidden_conversation" class="q-mb-sm"><span class="text-primary cursor-pointer" @click="showConversation">More</span>
          <div class="q-pa-none q-mb-sm conv" v-for="(item, index) in conversation.slice(Math.max(conversation.length - 3, 1))" :key="index">
            <div class="row">
              <q-item-section avatar style="justify-content: unset;margin-top: 2px;">
                <Avatar size="xl" :picture="item.user.profile_picture ? `./api${item.user.profile_picture}` : ''" :name="item.user.name"/>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold">
                  {{ item.user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </q-item-label>
                <q-item-label>
                  <div class="text-content" v-html="item.scan.text"></div>
                </q-item-label>
                  <!--                <q-item-label>-->
                  <!--                  <div v-if="item.post_conversation_file">-->
                  <!--                    <q-card v-for="(item_file, index) in item.post_conversation_file" :key="index">-->
                  <!--                      <KnowledgeListFile v-if="item_file.file !== null && (item_file.file.filemime !== 'jpg' && item_file.file.filemime !== 'jpeg')" :file="item_file.file" :item="item_file" :download="true"/>-->
                  <!--                    </q-card>-->
                  <!--                  </div>-->
                  <!--                </q-item-label>-->
              </q-item-section>
              <q-space/>
              <q-btn-dropdown dense flat v-show="is_km || login_id === item.created_by" dropdown-icon="more_horiz" size="sm" class="self-start more_cnv">
                <q-item v-show="login_id === item.created_by" dense clickable style="width: 200px;" @click="conversationEdit(item.id)">
                  <q-item-section>
                    <q-item-label class="text-primary">Edit</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item dense clickable @click="conversationDelete(item.id)">
                  <q-item-section>
                    <q-item-label class="text-primary">Delete</q-item-label>
                  </q-item-section>
                </q-item>
              </q-btn-dropdown>
            </div>
            <div class="row" v-if="item.post_conversation_file.length > 0 && (item.post_conversation_file[0].file.filemime === 'jpg' || item.post_conversation_file[0].file.filemime === 'jpeg')">
              <q-item-section avatar></q-item-section>
              <q-item-section>
                <q-img class="rounded-borders"
                       :src="url + item.post_conversation_file[0].file.path"
                       :ratio="16/9"
                       @click="openFile(url + item.post_conversation_file[0].file.path)"
                />
              </q-item-section>
            </div>
            <div class="row" v-else="">
              <q-item-section avatar></q-item-section>
              <q-item-section>
                <q-card v-for="(item_file, index) in item.post_conversation_file" :key="index">
                  <KnowledgeListFile v-if="item_file.file !== null && (item_file.file.filemime !== 'jpg' && item_file.file.filemime !== 'jpeg')" :file="item_file.file" :item="item_file" :download="true"/>
                </q-card>
              </q-item-section>
            </div>
          </div>
        </div>

        <div :hidden="hidden_conversation">
          <span class="text-primary cursor-pointer" @click="showConversation">Less</span>
          <div class="q-pa-none q-mb-sm conv" v-for="(item, index) in conversation" :key="index">
            <div class="row">
              <q-item-section avatar style="justify-content: unset;margin-top: 2px;">
                <Avatar size="xl" :picture="item.user.profile_picture ? `./api${item.user.profile_picture}` : ''" :name="item.user.name"/>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold">
                  {{ item.user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </q-item-label>
                <q-item-label>
                  <div class="text-content" v-html="item.scan.text"></div>
                </q-item-label>
                  <!--                <q-item-label>-->
                  <!--                  <div v-if="item.post_conversation_file">-->
                  <!--                    <q-card v-for="(item_file, index) in item.post_conversation_file" :key="index">-->
                  <!--                      <KnowledgeListFile v-if="item_file.file !== null && (item_file.file.filemime !== 'jpg' && item_file.file.filemime !== 'jpeg')" :file="item_file.file" :item="item_file" :download="true"/>-->
                  <!--                    </q-card>-->
                  <!--                  </div>-->
                  <!--                </q-item-label>-->
              </q-item-section>
              <q-space/>
              <q-btn-dropdown dense flat v-show="is_km || login_id === item.created_by" dropdown-icon="more_horiz" size="sm" class="self-start more_cnv">
                <q-item v-show="login_id === item.created_by" dense clickable style="width: 200px;" @click="conversationEdit(item.id)">
                  <q-item-section>
                    <q-item-label class="text-primary">Edit</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item dense clickable @click="conversationDelete(item.id)">
                  <q-item-section>
                    <q-item-label class="text-primary">Delete</q-item-label>
                  </q-item-section>
                </q-item>
              </q-btn-dropdown>
            </div>
            <div class="row" v-if="item.post_conversation_file.length > 0 && (item.post_conversation_file[0].file.filemime === 'jpg' || item.post_conversation_file[0].file.filemime === 'jpeg')">
              <q-item-section avatar></q-item-section>
              <q-item-section>
                <q-img class="rounded-borders"
                       :src="url + item.post_conversation_file[0].file.path"
                       :ratio="16/9"
                       @click="openFile(url + item.post_conversation_file[0].file.path)"
                />
              </q-item-section>
            </div>
            <div class="row" v-else="">
              <q-item-section avatar></q-item-section>
              <q-item-section>
                <q-card v-for="(item_file, index) in item.post_conversation_file" :key="index">
                  <KnowledgeListFile v-if="item_file.file !== null && (item_file.file.filemime !== 'jpg' && item_file.file.filemime !== 'jpeg')" :file="item_file.file" :item="item_file" :download="true"/>
                </q-card>
              </q-item-section>
            </div>
          </div>
        </div>
      </div>
      <div v-else="">
        <div class="q-pa-none q-mb-sm conv" v-for="(item, index) in conversation" :key="index">
          <div class="row">
            <q-item-section avatar style="justify-content: unset;margin-top: 2px;">
              <Avatar size="xl" :picture="item.user.profile_picture ? `./api${item.user.profile_picture}` : ''" :name="item.user.name"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                {{ item.user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
              </q-item-label>
              <q-item-label>
                <div class="text-content" v-html="item.scan.text"></div>
              </q-item-label>
                <!--              <q-item-label>-->
                <!--                <div v-if="item.post_conversation_file">-->
                <!--                  <q-card v-for="(item_file, index) in item.post_conversation_file" :key="index">-->
                <!--                    <KnowledgeListFile v-if="item_file.file !== null && (item_file.file.filemime !== 'jpg' && item_file.file.filemime !== 'jpeg')" :file="item_file.file" :item="item_file" :download="true"/>-->
                <!--                  </q-card>-->
                <!--                </div>-->
                <!--              </q-item-label>-->
            </q-item-section>
            <q-space/>
            <q-btn-dropdown dense flat v-show="is_km || login_id === item.created_by" dropdown-icon="more_horiz" size="sm" class="self-start more_cnv">
              <q-item v-show="login_id === item.created_by" dense clickable style="width: 200px;" @click="conversationEdit(item.id)">
                <q-item-section>
                  <q-item-label class="text-primary">Edit</q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense clickable @click="conversationDelete(item.id)">
                <q-item-section>
                  <q-item-label class="text-primary">Delete</q-item-label>
                </q-item-section>
              </q-item>
            </q-btn-dropdown>
          </div>
          <div class="row" v-if="item.post_conversation_file.length > 0 && (item.post_conversation_file[0].file.filemime === 'jpg' || item.post_conversation_file[0].file.filemime === 'jpeg')">
            <q-item-section avatar></q-item-section>
            <q-item-section>
              <q-img class="rounded-borders"
                     :src="url + item.post_conversation_file[0].file.path"
                     :ratio="16/9"
                     @click="openFile(url + item.post_conversation_file[0].file.path)"
              />
            </q-item-section>
          </div>
          <div class="row" v-else="">
            <q-item-section avatar></q-item-section>
            <q-item-section>
              <q-card v-for="(item_file, index) in item.post_conversation_file" :key="index">
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
              <Avatar size="xl" :picture="profile_picture ? profile_picture : ''" :name="profile_name"/>
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
                 @click="openFile(url + conversationImage.path)"
          />
        </q-item-section>
      </div>
      <q-list :hidden="!show_conv_file" class="q-mt-sm">
        <div v-for="(item, index) in finish_files" :key="index">
          <KnowledgeListFile v-if="item.file !== null && (item.file.filemime !== 'jpg' && item.file.filemime !== 'jpeg')" :file="item.file" :item="item"/>
        </div>
      </q-list>
      <div :hidden="!show_conv_file">
        <q-uploader
          @added="handleUploads"
          ref="uploaderDoc"
          label="Document upload"
          max-file-size="100000000"
          multiple
          auto-upload
          style="width: 100%"
          class="shadow-0 q-uploader--bordered kmp-rounded q-my-sm"
        />
      </div>
      <div class="row items-center">
        <div class="" style="width: 49px"></div>
          <!--        <div class="col-1 q-mt-sm text-center">&nbsp;</div>-->
          <!--        <div class="col-7 q-mt-sm">-->
          <q-icon name="mms" :class="$q.platform.is.mobile ? 'q-mr-sm cursor-pointer': 'q-mr-lg cursor-pointer'" size="24px" style="color: #2C8ED3" @click="handleUpload">
            <q-tooltip>
              Comment with photo
            </q-tooltip>
          </q-icon>
          <q-icon name="attach_file" :class="$q.platform.is.mobile ? 'q-mx-sm cursor-pointer': 'q-ml-sm q-mr-lg cursor-pointer'" size="24px" style="color: #2C8ED3" @click="openDialog('conv_file')">
            <q-tooltip>
              Comment with document
            </q-tooltip>
          </q-icon>
          <q-icon name="insert_emoticon" :class="$q.platform.is.mobile ? 'q-mx-sm cursor-pointer': 'q-ml-sm q-mr-lg cursor-pointer'"
                  size ="24px" style="color: #2C8ED3">
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
          <!--        </div>-->
          <!--        <div class="col-4 q-mt-sm">-->
          <q-space />
          <q-btn no-caps :loading="btnLoading" color="primary" class="float-right" label="Comment" @click="PostConversation" :disable="conversation === ''"/>
<!--        </div>-->
      </div>
    </q-card-section>


  </div>
</template>

<script>
import Avatar from 'components/common/Avatar';
import KnowledgeListFile from 'components/KnowledgeListFile';
import bus from 'components/common/EventBus';
import { fileUpload, postConversationFile, postConversationCreate, postConversationDelete, postConversationFileCreate, postConversationList } from 'src/lib/api';
import { Notify } from 'quasar';
import { datePost, getUserLogin, getLoginId, urlify, checkRole } from 'src/lib/helper';
import { VEmojiPicker } from 'v-emoji-picker';
import { point } from '../lib/point';

export default {
  props: ['data_conversation', 'post_id'],
  components: { Avatar, KnowledgeListFile, VEmojiPicker },
  data() {
    return {
      text: '',
      id_user: 'a',
      data: [],
      profile_picture: getUserLogin().profile_picture ? process.env.QUASAR_API_URL + getUserLogin().profile_picture : null,
      profile_name: getUserLogin().name,
      show_conv_file: false,
      finish_files: [],
      conversationText: '',
      url: process.env.QUASAR_API_URL,
      conversation: [],
      conversationImage: null,
      btnLoading: false,
      hidden_conversation: false,
      login_id: getLoginId(),
      showEmoji: false,
      searchEmoji: '',
      categoriesEmoji: {
        search: 'search...'
        // categories: {
        //   Activity: 'Atividades',
        //   Flags: 'Bandeiras',
        //   Foods: 'Comida',
        //   Frequently: 'Frequentes',
        //   Objects: 'Objetos',
        //   Nature: 'Natureza',
        //   Peoples: 'Pessoas',
        //   Symbols: 'Símbolos',
        //   Places: 'Locais'
        // }
      }
    };
  },
  methods: {
    handleChange(e, field) {
      if (field === 'post') {
        this.text = e.target.value;
      }
    },
    PostConversation() {
      this.btnLoading = true;
      const paramPostConv = {
        post_id: this.post_id,
        created_by: getLoginId(),
        text: this.conversationText,
        enabled: true
      };
      postConversationCreate(paramPostConv).then(res => {
        point('add', { tag: 'post_comment', post_id: this.post_id });
        if (this.show_conv_file) {
          this.finish_files.forEach(v => {
            const params = {
              created_by: getLoginId(),
              enabled: true,
              post_conversation_id: res.data.id,
              file_id: v.file.id
            };
            postConversationFile(params).then(resPostFile => {
              setTimeout(() => {
                console.log('OK');
              }, 500);
            });
          });
          setTimeout(() => {
            this.getConversation(this.post_id);
          }, 500);
          this.finish_files = [];
          this.show_conv_file = false;
        }
        if (this.conversationImage !== null) {
          const paramPostConvFile = {
            post_conversation_id: res.data.id,
            file_id: this.conversationImage.id
          };
          postConversationFileCreate(paramPostConvFile).then(res2 => {
            this.conversationImage = null;
            this.getConversation(this.post_id);
            this.$emit('update_conversation');
          });
        } else {
          this.$emit('update_conversation');
          this.getConversation(this.post_id);
        }
        bus.$emit('update_point');
      });
    },
    showConversation() {
      if (this.hidden_conversation) { this.hidden_conversation = !this.hidden_conversation; } else {
        this.hidden_conversation = true;
      }
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
    handleUpload() {
      this.show_conv_file = false;
      this.$refs.conversationFile.pickFiles();
    },
    getConversation(id) {
      this.conversationText = '';
      this.finish_files = [];
      this.show_conv_file = false;
      postConversationList({ post_id: id }).then(res => {
        const response = res.data;
        if (response.length > 0) {
          response.forEach(v => {
            v.time = datePost(v.updated_at);
            const profile_picture = v.user.profile_picture ? `${process.env.QUASAR_API_URL}${v.user.profile_picture}` : null;
            v.user.profile_picture_custom = profile_picture;
            v.scan = urlify(v.text);
          });
          this.conversation = response;
          this.btnLoading = false;
          this.hidden_conversation = response.length > 3;
          this.showEmoji = false;
        }
      });
    },
    openFile(url) {
      window.open(url, '_blank');
    },
    conversationDelete(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this Comment?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        postConversationDelete(id).then(res => {
          if (res.message === 'OK') {
            this.$emit('update_conversation');
            Notify.create({
              message: 'Comment deleted.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            this.getConversation(this.post_id);
          }
        });
      });
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
          }
        });
      });
    },
    append(emoji) {
      this.emoji.input += emoji;
    },
    toogleDialogEmoji() {
      this.showEmoji = !this.showEmoji;
      if (!this.showEmoji) {
        this.searchEmoji = '';
      }
    },
    selectEmoji(emoji) {
      this.conversationText += emoji.data;
    },
    conversationEdit(id) {
      console.log(id);
    }
  },
  watch: {
    data_conversation: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value.objConversation && value.objConversation.length > 0) {
          value.objConversation.forEach(v => {
            v.time = datePost(v.updated_at);
            const profile_picture = v.user.profile_picture ? `${process.env.QUASAR_API_URL}${v.user.profile_picture}` : null;
            v.user.profile_picture_custom = profile_picture;
          });
        }
        // this.data = value;
      }
    },
    post_id: {
      immediate: true,
      handler(value) {
        this.getConversation(value);
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    },
    is_km() {
      return checkRole().name === 'km_manager';
    }
  },
  mounted() {
    // console.log(JSON.parse(JSON.stringify(this.data)));
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
.more_cnv {
  visibility: hidden;
  opacity: 0;
  transition: .3s;
}

.conv:hover .more_cnv {
  visibility: visible;
  opacity: 1;

  transition: .3s;
}
</style>
