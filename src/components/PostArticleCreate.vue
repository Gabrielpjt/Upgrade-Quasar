<template>
<!--  <q-dialog v-model="create_article" style="min-width: 80vw" :maximized="true">-->
    <q-card style="min-width: 900px" class="q-pa-none">
      <q-card-section class="q-pa-none">
        <div class="q-pa-none q-ma-none">
          <div>
            <q-bar class="kmp-bg-color-5" style="padding: 36px 20px; border-bottom: 1px solid #CBCBCB">
              <span class="cursor-pointer text-h6 kmp-text-grey-2" v-close-popup> &lt;&nbsp;&nbsp;Post an article</span>
              <span class="q-mx-md text-grey">|</span>
              <q-icon name="check_circle_outline" class="check-icon" color="green" size="16px" style=""/>
              <span class="q-ml-sm text-grey" style="font-size: 12px">Saved on your draft</span>
              <q-space/>
              <q-bar class="kmp-bg-color-5">
                <div class="q-mr-lg text-grey">
                  <div class="row" style="font-size: 12px">Publish to</div>
                  <div class="row">
                    <q-select dense borderless color="primary" class="q-pa-0 kmp-publish-to"
                              v-model="channelValue"
                              :options="optChannel"
                              style="color: #0e84b5;width: 230px;border-radius: 8px"
                              :disable="this.article_id !== null"
                    />
                  </div>
                </div>
                <q-btn unelevated no-caps color="primary" label="Publish" v-if="article_id === null" class="q-mr-md"
                       @click="handlePost" size="md"
                />
                <q-btn unelevated no-caps color="primary" label="Update" v-if="article_id !== null" class="q-mr-md"
                       @click="handlePost"
                />
                <q-icon name="more_vert" class="q-mr-md kmp-text-grey-2" size="25px"/>
                <q-avatar v-if="profile_picture !== null" size="36px">
                  <img :src="profile_picture">
                  <!--                <div class='status-circle-white'></div>-->
                </q-avatar>
                <q-avatar v-if="profile_picture === null" size="36px" color="primary" text-color="white">
                  {{ profile_name.match(/\b(\w)/g).join('').toUpperCase() }}
                  <!--                <div class='status-circle-white'></div>-->
                </q-avatar>
              </q-bar>
            </q-bar>
            <div class="q-py-md q-px-md">
              <div class="row">
                <div class="col-4">
                  <q-input dense outlined autogrow
                           label="Title"
                           class="q-mx-xs"
                           placeholder="title of article"
                           v-model="article.title"
                  />
                </div>
                <div class="col-8">
                  <q-input dense outlined
                           autogrow
                           label="Description"
                           class="q-mx-xs"
                           placeholder="description of article.."
                           maxlength="4000"
                           v-model="article.description"
                  />
                  <!--                counter-->
                </div>
              </div>
              <div class="row">
                <div class="col q-mt-md q-px-xs" :hidden="finish_files.length === 0 && reference_links.length === 0">
                  <div class="kmp-font-bold q-mb-sm">References</div>
                  <div class="row">
                    <div class="q-pr-sm" v-for="(item, index) in finish_files" :key="index">
                      <q-card bordered class="q-py-xs q-px-sm kmp-font-sm">
                        <q-tooltip>
                          {{ item.file.filename }}
                        </q-tooltip>
                        <q-icon name="fas fa-file-image" class="" size="12px"/>
                        <!--                      <q-icon name="fas fa-link" class="" size="12px"/>-->
                        {{ item.file.filename.replace(`.${item.file.filemime}`, '').substr(0, 20) }}
                        ...
                        {{ item.file.filemime }}
                        <q-btn flat round dense icon="close" size="xs"/>
                      </q-card>
                      <!--                      <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="true"-->
                      <!--                                         @delete_knowledge="handleDeleteFile(item, 'file')"/>-->
                    </div>
                    <div class="q-pr-sm" v-for="(item, index) in reference_links" :key="index">
                      <q-card bordered class="q-py-xs q-px-sm kmp-font-sm">
                        <q-tooltip>
                          {{ item }}
                        </q-tooltip>
                        <q-icon name="fas fa-link" class="" size="12px"/>
                        {{ item.substr(0, 20) }}
                        <q-btn flat round dense icon="close" size="xs"/>
                      </q-card>
                      <!--                      <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="true"-->
                      <!--                                         @delete_knowledge="handleDeleteFile(item, 'file')"/>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <!--          <div class="col-2">-->
              <!--            &nbsp;-->
              <!--          </div>-->
              <div class="col-12" style="background-color: #EBEBEB;">
                <div style="background-color: #EBEBEB; line-height: 32px; border-bottom: solid 1px #CBCBCB">&nbsp;</div>
                <div>
                  <q-editor
                    style="background-color: #ffffff;border: 0px; margin-top: -32px;"
                    ref="editor_ref"
                    v-model="editor"
                    @paste.native="evt => pasteCapture(evt)"
                    @drop.native="evt => dropCapture(evt)"
                    height="65vh"
                    toolbar-bg="grey-3"
                    placeholder="start texting here.."
                    :definitions="{
              upload: {
                tip: 'Upload Audio, Image or Video',
                icon: 'image',
                label: 'Insert Media',
                handler: uploadMedia
              },
              upload_file: {
                tip: 'References',
                icon: 'description',
                label: 'References',
                handler: uploadFile
              },
            }"
                    :toolbar="[
                        [
                          {
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: [
                              'p',
                              'h1',
                              'h2',
                              'h3',
                              'h4',
                              'h5',
                              'h6',
                              'code'
                            ]
                          },
                        ],
                        ['bold', 'italic', 'underline'],
                        ['left', 'center', 'right', 'justify'],
                        ['ordered', 'unordered'],
                        ['outdent', 'indent'],
                        ['quote', 'link'],
                        ['upload','upload_file']
                      ]"
                  />
                </div>
              </div>
              <!--          <div class="col-2">-->
              <!--            &nbsp;-->
              <!--          </div>-->
            </div>
          </div>

          <q-dialog v-model="add_media" persistent>
            <q-card style="min-width: 400px">
              <q-card-section>
                <div class="q-mt-xs">
                  <span class="text-h6">Attach Media</span>
                  <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-uploader
                  @added="handleUploadMedia"
                  ref="uploader"
                  label="Max file size 100MB"
                  max-file-size="100000000"
                  auto-upload
                  style="width: 100%"
                  class="shadow-0 q-uploader--bordered kmp-rounded"
                />
              </q-card-section>

              <!--        <q-card-section class="q-pt-none">-->
              <!--          <q-linear-progress v-if="loading_upload" indeterminate rounded color="negative" class="q-my-sm"/>-->

              <!--          <q-list :hidden="finish_files.length === 0" class="q-mt-sm">-->
              <!--            <div v-for="(item, index) in finish_files" :key="index">-->
              <!--              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="true" @delete_knowledge="handleDeleteFile(item, 'file')"/>-->
              <!--            </div>-->
              <!--          </q-list>-->
              <!--        </q-card-section>-->

            </q-card>
          </q-dialog>

          <q-dialog v-model="add_files" persistent>
            <q-card style="min-width: 600px">
              <q-card-section>
                <div class="q-mt-xs">
                  <span class="text-h6">References</span>
                  <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="q-gutter-sm">
                  <q-radio v-model="reference_selected" val="link" label="Link"/>
                  <q-radio v-model="reference_selected" val="files" label="Files"/>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none" v-if="reference_selected === 'link'">
                <q-input dense
                         outlined
                         type="textarea"
                         v-model="reference_links_input"
                         placeholder="List of links here, seperate with new line.."
                         class="kmp-unwrap"
                         @input="handleChangeLink"
                />
                <!--              <q-btn color="primary"-->
                <!--                     label="Submit Links"-->
                <!--                     class="float-right q-my-md"-->
                <!--                     unelevated-->
                <!--                     no-caps size="md"-->
                <!--                     @click="handleUpdateLink"-->
                <!--              />-->
                <span class="kmp-font-sm kmp-text-grey-1">{{ reference_links.length }} Valid Links</span>
              </q-card-section>
              <q-card-section class="q-pt-none" v-if="reference_selected === 'files'">
                <q-uploader
                  @added="handleUploadFile"
                  ref="uploader"
                  label="Max file size 100MB"
                  multiple
                  batch
                  auto-upload
                  style="width: 100%"
                  class="shadow-0 q-uploader--bordered kmp-rounded-2"
                />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-linear-progress v-if="loading_upload" indeterminate rounded color="negative" class="q-my-sm"/>

                <q-list :hidden="finish_files.length === 0" class="q-mt-sm">
                  <div v-for="(item, index) in finish_files" :key="index">
                    <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="true"
                                       @delete_knowledge="handleDeleteFile(item, 'file')"/>
                  </div>
                </q-list>
              </q-card-section>

            </q-card>
          </q-dialog>

        </div>
      </q-card-section>
    </q-card>
<!--  </q-dialog>-->
</template>

<script>
import { Notify } from 'quasar';
import { deleteList, getLoginId, getUserLogin } from 'src/lib/helper';
import { channelList, fileDelete, fileUpload, postCreate, postFileCreate, postUpdate, postDetail } from 'src/lib/api';
// import KnowledgeListFile from 'components/KnowledgeListFile';
// import Player from 'components/common/Player';

export default {
  data() {
    return {
      article_id: null,
      profile_picture: getUserLogin().profile_picture ? process.env.QUASAR_API_URL + getUserLogin().profile_picture : null,
      profile_name: getUserLogin().name,
      listChannel: [],
      optChannel: [],
      channelValue: '',
      // editor: '<h6 id="title" style="text-align: left;">Title article</h6><div><br></div>',
      editor: '',
      reference: '<div><br><h5>References</h5></div>',
      loading_upload: false,
      add_files: false,
      add_media: false,
      create_article: false,
      reference_selected: 'link',
      reference_links_input: '',
      article: {
        title: '',
        description: ''
      },
      finish_files: [],
      reference_files: [],
      reference_links: []

    };
  },
  // components: { Player },
  methods: {
    postDetail() {
      postDetail(this.$route.params.post).then(res => {
        const response = res.data;
        this.editor = response.article;
        this.article_id = this.$route.params.post;
      });
    },
    optionChannel() {
      channelList().then(res => {
        const arrayOption = [];
        const mapData = res.data;
        mapData.forEach(v => {
          arrayOption.push(`<span class="text-primary text-weight-bold">${v.name}</span>`);
        });
        const list = mapData.map(v => (
          {
            id: v.id,
            name: 'channel',
            label: v.name,
            labelHtml: `<span class="text-primary text-weight-bold">${v.name}</span>`
          }
        ));
        this.listChannel = list;
        this.optChannel = arrayOption;
        const idx = list.findIndex(v => v.id.toString() === this.$route.params.id.toString());
        this.channelValue = `<span class="text-primary text-weight-bold">${list[idx].label}</span>`;
      });
    },
    handleChangeLink() {
      let tmp = this.reference_links_input.split('\n');
      tmp = tmp.map(x => x.trim());
      tmp = tmp.filter(x => x !== '' && x.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+?([-.a-zA-Z0-9]+)\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i));
      this.reference_links = tmp;
    },
    handleUpdateLink() {
      // this.reference_links = tmp;
    },
    handlePost() {
      // console.log(this.article);
      // this.$q.dialog({
      //   title: 'Confirm',
      //   message: 'Are you sure to save?',
      //   cancel: true,
      //   persistent: true
      // }).onOk(() => {
      // const parser = new DOMParser();
      // const articleDoc = parser.parseFromString(this.editor, 'text/html');
      // const articleTitle = articleDoc.getElementById('title').innerHTML;
      if (!this.article_id) {
        const dataPost = {
          created_by: getLoginId(),
          enabled: true,
          status: 'Unverified',
          title: this.article.title,
          description: this.article.description,
          post_type: 'Article',
          article: this.editor,
          channel_id: this.listChannel.find(x => {
            return x.labelHtml === this.channelValue;
          }).id
        };
        postCreate(dataPost).then(res => {
          const response = res.data;
          if (res.message === 'OK') {
            this.article_id = response.id;
            Notify.create({
              message: 'Save Post!',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            this.finish_files.forEach(v => {
              postFileCreate({
                created_by: response.created_by,
                enabled: true,
                post_id: response.id,
                file_id: v.file.id
              }).then(res1 => {
                this.reference_files.push(
                  { file: res1.data[0] }
                );
              });
            });
          }
        });
      } else {
        const dataPost = {
          title: this.article.title,
          article: this.editor
        };
        postUpdate(this.article_id, dataPost).then(res => {
          const response = res.data;
          if (res.message === 'OK') {
            Notify.create({
              message: 'Update Post!',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            this.finish_files.forEach(v => {
              postFileCreate({
                created_by: response.created_by,
                enabled: true,
                post_id: response.id,
                file_id: v.file.id
              }).then(res1 => {
                this.reference_files.push(
                  { file: res1.data[0] }
                );
              });
            });
          }
        });
      }
      this.$emit('onClose');
      // this.$router.push({
      //   name: 'channel-detail',
      //   params: {
      //     id: this.$route.params.id,
      //     title: this.$route.params.title
      //   }
      // });
      // });
    },
    uploadMedia() {
      this.add_media = true;
    },
    uploadFile() {
      this.add_files = true;
    },
    handleUploadFile(files, content_type) {
      this.loading_upload = true;
      files.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', files[i]);
        fileUpload(formData).then(res => {
          const response = res.data[0];
          if (res.message === 'OK') {
            this.finish_files.push(
              { file: response }
            );
            if (files.length === i + 1) {
              this.loading_upload = false;
              this.$refs.uploader.reset();
            }
          }
        }).catch(err => {
          this.loading_upload = false;
        });
      });
    },
    handleUploadMedia(files, content_type) {
      this.loading_upload = true;
      files.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', files[i]);
        if (!['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'audio/mpeg', 'audio/mp3'].includes(v.type)) {
          this.$refs.uploader.reset();
          this.loading_upload = false;
          this.add_files = false;
          Notify.create({
            message: 'Attach Media only support image, audio mp3 and video mp4 file type.',
            timeout: 5000,
            type: 'negative',
            color: 'negative',
            icon: 'warning'
          });
          return;
        }
        fileUpload(formData).then(res => {
          console.log(res);
          const response = res.data[0];
          if (res.message === 'OK') {
            // this.finish_files.push(
            //   { file: response }
            // );
            if (files.length === i + 1) {
              const content_media = {
                // mp3: `[audio=${response.filename_unique}]`,
                // mp4: `[video=${response.filename_unique}]`,
                // mp4: '<iframe src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" frameborder="0" allowfullscreen />',
                // mp4: '<div><div style="position: absolute;width: 400px; max-width: 400px;overflow: hidden;"><div class="q-video q-video--responsive" style="padding-bottom: 75%"><iframe src="http://localhost:8090/player" style="border: none; overflow: hidden; " allowfullscreen /></div></div></div>',
                mp3: `<iframe src="./player?id=${response.created_by}&src=${response.filename_unique}&type=audio" style="border: none; overflow: hidden; width: 400px; max-width: 400px; height: 40px; max-height: 40px;" allowfullscreen />`,
                mp4: `<iframe src="./player?id=${response.created_by}&src=${response.filename_unique}&type=video" style="border: none; overflow: hidden; width: 400px; max-width: 400px; height: 300px; max-height: 300px;" allowfullscreen />`,
                jpg: `<img src="./api/uploads/files/${response.created_by}/${response.filename_unique}" />`,
                jpeg: `<img src="./api/uploads/files/${response.created_by}/${response.filename_unique}" />`,
                png: `<img src="./api/uploads/files/${response.created_by}/${response.filename_unique}" />`
              };
              this.loading_upload = false;
              this.$refs.editor_ref.runCmd('insertHTML', content_media[response.filemime.toLowerCase()]);
              this.$refs.uploader.reset();
              this.add_media = false;
            }
          }
        }).catch(err => {
          this.loading_upload = false;
        });
      });
    },
    dropCapture(evt) {
      console.log(evt);
    },
    pasteCapture(evt) {
      console.log(evt);
      // Let inputs do their thing, so we don't break pasting of links.
      if (evt.target.nodeName === 'INPUT') return;
      let text;
      let
        onPasteStripFormattingIEPaste;
      evt.preventDefault();
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain');
        this.$refs.editor_ref.runCmd('insertText', text);
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain');
        this.$refs.editor_ref.runCmd('insertText', text);
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true;
          this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text);
        }
        onPasteStripFormattingIEPaste = false;
      }
    },
    handleDeleteFile(data, type) {
      const file_id = data.file.id;
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this File?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        fileDelete(file_id).then(res => {
          if (res.message === 'OK') {
            Notify.create({
              message: 'Delete file berhasil.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          }
        });
        const removeIndex = this.finish_files.findIndex(v => v.file.id === data);
        this.finish_files = deleteList(this.finish_files, removeIndex);
      });
    }
  },
  mounted() {
    this.optionChannel();
    if (this.$route.name === 'edit-article') {
      this.postDetail();
    }
  },
  props: ['is_open'],
  watch: {
    is_open: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.create_article = value;
        }
      }
    }
  }
};
</script>

<style>
.km-article-head {
  background-color: #FAFBFC;
  padding: .5em;
}

.km-article-back {
  color: #4F5A70;
  font-size: .8em;
}

.status-circle-white {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid grey;
  bottom: 0;
  right: 5px;
  position: absolute;
}
</style>
