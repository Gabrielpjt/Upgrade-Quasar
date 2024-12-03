<template>
  <div>
    <q-dialog ref="refDialog" v-model="modelValue" @hide="closeDialog" @show="onShow">
      <q-card :style="{width: modalWidth, maxWidth: modalWidth, height: '700px', overflow: 'hidden'}">
        <q-toolbar>
          <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            inline-label
            no-caps
            shrink stretch
            @input="onInputTabs">
            <q-tab v-if="showTab.includes('media')" name="media" icon="image" label="Media"/>
            <q-tab v-if="showTab.includes('document')" name="document" icon="text_snippet" label="Document"/>
          </q-tabs>

          <q-space/>
          <div class="row items-center justify-between">
            <div v-if="filelist.length >0" style="width: 200px" class="q-mr-md">
              <div class="kmp-italic text-grey-6 kmp-font-sm q-mr-lg blink_me">
                Uploading {{ filelist.length }} files..
              </div>
              <q-linear-progress :value="progress" :buffer="buffer" stripe size="10px"/>
            </div>
            <div v-if="filelist.length === 0 && uploadFinish === true" style="width: 200px" class="q-mr-md">
              <div class="kmp-italic text-grey-6 kmp-font-sm q-mr-lg blink_me">
                Upload success.
              </div>
              <q-linear-progress :value="100" :buffer="buffer" stripe size="10px"/>
            </div>
            <q-btn flat dense icon="close" @click="closeDialog"/>
          </div>
        </q-toolbar>

        <q-separator/>

        <q-tab-panels v-model="tab" animated class="no-border-radius bg-grey-1">
          <q-tab-panel name="media" class="q-pa-none">

            <div style="height: 160px" class="bg-grey-2 q-pa-none q-pt-md">
              <q-banner
                v-if="$refs.file"
                @dragover="dragover" @dragleave="dragleave" @drop="drop" @click="$refs.file.pickFiles"
                class="kmp-rounded-2 q-mx-md justify-center q-pa-none items-center text-center cursor-pointer"
                style="height: 130px; border: 1px dashed #cccccc; overflow: hidden">
                <q-icon name="cloud_upload" size="36px" class="text-grey-5"/>
                <div v-if="this.$q.platform.is.mobile">Select files here..</div>
                <div v-else>Select or Drop files here..</div>
                <div class="q-mt-sm kmp-font-sm text-grey-7">Only jpg, png and mp4 files are allowed to be uploaded.
                </div>
                <div class="kmp-font-sm text-grey-7">Maximum file size is upto 100MB.</div>
              </q-banner>
              <div hidden>
                <q-file ref="file" multiple v-model="fileModel" @input="onSelectFile"
                        accept=".jpg, .jpeg, .png, .mp4"
                        label="Standard" name="fields[assetsFieldHandle][]" id="assetsFieldHandle"/>
              </div>

            </div>

            <q-separator/>

            <div class="row" style="margin: 10px 18px;">
              <div class="col-12 col-md-9">
                <q-input outlined dense label="Search Media" debounce="500" @input="onSearch" v-model="searchKeyword">
                  <template v-slot:append>
                    <q-icon v-if="searchKeyword !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
                    <q-icon v-if="searchKeyword === ''" name="search"/>
                  </template>
                </q-input>
              </div>
              <div :class="$q.platform.is.mobile ? 'col-12 q-mt-sm row text-right' : 'col-3 q-pl-sm row justify-between'">
                <q-space v-if="$q.platform.is.mobile"/>
                <q-btn unelevated :disable="!selectButtonVisible" no-caps label="Select" color="primary"
                      :style="$q.platform.is.mobile ? 'height: 40px; width: 70px' : 'height: 40px; width: 150px'" :class="$q.platform.is.mobile ? 'q-mr-sm' : ''" @click="onSelectMedia"/>
                <q-btn unelevated :disable="!selectButtonVisible" dense icon="delete_forever" color="red"
                       style="height: 40px" @click="onDeleteSelectedMedia"/>
              </div>
            </div>

            <q-separator/>

            <q-scroll-area :style="{height: '486px', maxWidth: modalWidth}" class="bg-grey-2" :visible="true">
              <div class="q-mr-sm q-py-md q-mb-xl">
                <div class="row justify-start q-pa-md scroll relative-position q-mb-md"
                     :style="{maxWidth: modalWidth, maxHeight: '100%'}">
                  <div v-for="(item, index) in images" :key="index" :class="$q.platform.is.mobile ? 'col-6 q-pa-xs' : 'col-3 q-pa-xs'">
                    <q-img
                      ref="refThumb"
                      class="image-gallery__image kmp-media-icon-search"
                      style="height: 100px; border: 1px solid #d5d5d5"
                      :style="index === indexZoomed ? 'opacity: 0.3' : undefined" :src="item.thumb">

                      <div @click="onSelect(item)" class="absolute-full cursor-pointer"
                          style="background: rgba(0, 0, 0, 0)"></div>

                      <q-icon v-if="item.item.filemime === 'mp4'" @click="previewMedia(item)"
                              class="absolute-center cursor-pointer"
                              size="32px" name="smart_display" style="color: rgba(0, 0, 0, 0.4)">
                      </q-icon>

                      <q-icon v-if="item.item.filemime !== 'mp4'" @click="previewMedia(item)"
                              class="absolute-center cursor-pointer kmp-media-icon-search-item"
                              size="32px" name="pageview" style="color: rgba(0, 0, 0, 0.4)">
                      </q-icon>

                      <q-tooltip :offset="[32, 32]" anchor="top middle">
                        {{ item.title }}
                      </q-tooltip>

                      <q-icon
                        v-if="item.selected"
                        class=" absolute all-pointer-events kmp-media-icon-search-uncheck" size="20px"
                        name="check_circle"
                        color="green-5" style="top: 8px; right: 8px">
                      </q-icon>
                    </q-img>
                  </div>
                </div>
              </div>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="document" class="q-pa-none">

            <div style="height: 160px" class="bg-grey-2 q-pa-none q-pt-md">
              <q-banner
                v-if="$refs.file"
                @dragover="dragover" @dragleave="dragleave" @drop="drop" @click="$refs.file.pickFiles"
                class="kmp-rounded-2 q-mx-md justify-center q-pa-none items-center text-center cursor-pointer"
                style="height: 130px; border: 1px dashed #cccccc; overflow: hidden">
                <q-icon name="cloud_upload" size="36px" class="text-grey-5"/>
                <div v-if="this.$q.platform.is.mobile">Select files here..</div>
                <div v-else>Select or Drop files here..</div>
                <div class="q-mt-sm kmp-font-sm text-grey-7">Only office file, pdf and zip files are allowed to be
                  uploaded.
                </div>
                <div class="kmp-font-sm text-grey-7">Maximum file size is upto 100MB.</div>
              </q-banner>
              <div hidden>
                <q-file ref="file" multiple v-model="fileModel" @input="onSelectFile"
                        accept=".docx, .doc, xls, .xlsx, .ppt, .pptx, .pdf, .zip"
                        label="Standard" name="fields[assetsFieldHandle][]" id="assetsFieldHandle"/>
              </div>

            </div>

            <q-separator/>

            <div class="row" style="margin: 10px 18px;">
              <div class="col-12 col-md-9">
                <q-input outlined dense label="Search Document" debounce="500" @input="onSearchDoc"
                         v-model="searchKeyword">
                  <template v-slot:append>
                    <q-icon v-if="searchKeyword !== ''" name="close" @click="text = ''" class="cursor-pointer"/>
                    <q-icon v-if="searchKeyword === ''" name="search"/>
                  </template>
                </q-input>
              </div>
              <div :class="$q.platform.is.mobile ? 'col-12 q-mt-sm row text-right' : 'col-3 q-pl-sm row justify-between'">
                <q-space v-if="$q.platform.is.mobile"/>
                <q-btn unelevated :disable="!selectButtonDocsVisible" no-caps label="Select" color="primary"
                      :style="$q.platform.is.mobile ? 'height: 40px; width: 70px' : 'height: 40px; width: 150px'" :class="$q.platform.is.mobile ? 'q-mr-sm' : ''" @click="onSelectDocs"/>
                <q-btn unelevated :disable="!selectButtonDocsVisible" dense icon="delete_forever" color="red"
                       style="height: 40px" @click="onDeleteSelectedMediaDocs"/>
              </div>
            </div>

            <q-separator/>

            <q-scroll-area :style="{height: '486px', maxWidth: modalWidth}" class="bg-grey-2" :visible="true">
              <div class="q-mr-sm q-py-md q-mb-xl">
                <div class="row justify-start q-pa-md scroll relative-position q-mb-md"
                     :style="{maxWidth: modalWidth, maxHeight: '100%'}">
                  <div v-for="(item, index) in doc" :key="index" :class="$q.platform.is.mobile ? 'col-6 q-pa-xs' : 'col-3 q-pa-xs'">
                    <q-img
                      ref="refThumb"
                      class="image-gallery__image bg-grey-1 "
                      style="max-height: 100px;height: 100px; border: 1px solid #d5d5d5"
                      :style="index === indexZoomed ? 'opacity: 0.3' : undefined" src="">

                      <div class="absolute-center cursor-pointer text-center" style="background: unset !important;" @click="onSelectDoc(item)">
                        <q-icon :name="`fa fa-md ${getIcon(item.item.filemime).icon}`"
                                :color="getIcon(item.item.filemime).color" size="28px"
                                @click="(item.item.filemime === 'pdf')?previewDocument(item):downloadDocument(item)"/>
                        <div class="text-grey-8 kmp-font-xs q-mt-xs" style="width: 130px;">
                          <span>{{item.item.filemime.toUpperCase()}}</span>
                          <span>&nbsp;-&nbsp;</span>
                          <span>{{format.humanStorageSize(item.item.filesize)}}</span>
                        </div>
                        <div class="text-grey-8 kmp-font-xs" style="width: 130px;" >
                          <span class="kmp-font-sm">{{ item.title.substring(0, 25) }}</span>
                          <span class="kmp-font-sm" v-if="item.title.length >= 25">..</span>
                        </div>
                      </div>

                      <q-tooltip :offset="[32, 32]" anchor="top middle">
                        {{ item.title }}
                      </q-tooltip>

                      <q-icon
                        v-if="item.selected"
                        class=" absolute all-pointer-events kmp-media-icon-search-uncheck" size="20px"
                        name="check_circle"
                        color="green-5" style="top: 8px; right: 8px">
                      </q-icon>
                    </q-img>
                  </div>
                </div>
              </div>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="uploads" class="q-pa-none">

            <div class="row items-center bg-grey-1" style="margin: 10px 18px;">
              <div class="col-9 text-weight-bold">
                {{filelist.length}} files selected to upload.
              </div>
              <div class="col-3 q-pl-sm">
                <q-btn unelevated :disable="filelist.length === 0" no-caps class="full-width" label="Upload"
                       color="primary" :loading="uploading"
                       style="height: 40px" @click="onUpload"/>
              </div>
            </div>

            <q-separator/>

            <div v-if="filelist.length >0">
              <q-list separator dense>
                <q-item clickable v-ripple v-for="(item, index) in filelist" :key="index">
                  <q-item-section class="col-11">{{item.name}} ({{format.humanStorageSize(item.size)}})</q-item-section>
                  <q-space/>
                  <!--                  <q-item-section><q-input value="" dense outlined size="sm" /></q-item-section>-->
                  <q-item-section class="text-right" side>
                    <q-btn @click="remove(index)" icon="o_delete_forever" unelevated
                           style="width: 35px"/>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-separator/>
            </div>

            <div style="height: 480px" class="bg-grey-2 q-pa-none q-pt-md">
              <q-banner
                v-if="$refs.file"
                @dragover="dragover" @dragleave="dragleave" @drop="drop" @click="$refs.file.pickFiles"
                class="kmp-rounded-2 q-mx-md justify-center q-pa-none items-center text-center cursor-pointer"
                style="height: 150px; border: 1px dashed #cccccc; overflow: hidden">
                <q-img v-if="featured_image_preview !== null" :src="featured_image_preview"/>
                <q-icon v-else name="cloud_upload" size="48px" class="text-grey-5"/>
                <div v-if="this.$q.platform.is.mobile">Select files here..</div>
                <div v-else>Select or Drop files here..</div>
                <div class="q-mt-sm kmp-font-sm text-grey-7">Only images, documents and zip files are allowed to be
                  uploaded.
                </div>
                <div class="kmp-font-sm text-grey-7">Maximum file size is upto 100MB.</div>
              </q-banner>
              <div hidden>
                <q-file ref="file" multiple v-model="featured_image" @input="onSelectFile"
                        accept=".jpg, .png, .docx, .xlsx, .pdf, .zip"
                        label="Standard" name="fields[assetsFieldHandle][]" id="assetsFieldHandle"/>
              </div>

            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteModalVisible">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section class="row q-py-none">
          <div class="col justify-between">
            <div class="text-h6 text-weight-bold">Delete Media File</div>
            <div class="text-weight-bold">{{deleteListMedia.length}} File(s) selected</div>
          </div>
          <div class="col-auto">
            <q-btn icon="close" size="md" dense v-close-popup flat round/>
          </div>
        </q-card-section>
        <q-card-section class="">
          <q-scroll-area style="height: 250px; border: 1px solid #e0e0e0;" :visible="true" class="q-px-sm">
            <q-list padding>
            <q-item v-for="(item, index) in deleteListMedia" :key="index" style="border-bottom: 1px solid #efefef">

              <q-item-section v-if="['mp4','jpg','jpeg','gif','png'].includes(item.filemime.toLowerCase())" top thumbnail class="q-ml-none">
                <img :src="item.thumb_path">
              </q-item-section>

              <q-item-section>
                <q-item-label>{{item.filename}}</q-item-label>
                <q-item-label caption v-if="item.related.filter(x => x.post_id !== null).length >0">
                  <q-list separator dense class="q-my-sm">
                    <q-item class="bg-grey-2" style="padding: 2px 4px">
                      <q-item-section class="q-mt-xs text-weight-bold">Media terhubung dengan Post</q-item-section>
                    </q-item>
                    <q-item class="cursor-pointer" style="padding: 2px 4px"
                            v-ripple clickable @click="openRelated(item2)"
                            v-for="(item2, index2) in item.related.filter(x => x.post_id !== null)" :key="index2">
                      <q-item-section>{{item2.post_title}}</q-item-section>
                      <q-item-section side>
                        <q-icon name="open_in_new" size="18px" >
                          <q-tooltip>
                            Open Post
                          </q-tooltip>
                        </q-icon>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-item-label>
                <q-item-label caption v-else>File mungkin tidak mempunyai relasi dengan konten</q-item-label>
              </q-item-section>

            </q-item>
          </q-list>
          </q-scroll-area>
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-banner inline-actions class="text-black bg-red-2">
            <div class="text-weight-bold kmp-font-sm-2">Delete Media File</div>
            <div class="kmp-font-sm-2">File media yang mempunyai relasi dengan konten apabila dihapus maka tidak akan tampil
              pada konten tersebut.</div>
          </q-banner>

        </q-card-section>
        <q-card-section class="text-right">
          <q-btn unelevated color="negative" @click="onMediaDelete">Delete</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { fileDelete, getListDelete, getListDocs, getListMedia } from 'src/lib/api';
import { format, Notify } from 'quasar';
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';
import Vue from 'vue';
import ViewerPDF from 'components/media/ViewerPDF.vue';
import ViewerVideo from 'components/media/ViewerVideo.vue';
import { axios } from 'boot/axios';

const ViewerPDFClass = Vue.extend(ViewerPDF);
const ViewerVideoClass = Vue.extend(ViewerVideo);

export default {
  name: 'MediaManager',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VuePdfEmbed,
    // eslint-disable-next-line vue/no-unused-components
    ViewerPDF,
    // eslint-disable-next-line vue/no-unused-components
    ViewerVideo
  },
  props: ['value', 'defaultTab', 'useTab'],
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  computed: {
    listLocal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('valuechange', value);
      }
    },

    selectButtonVisible() {
      return this.images.filter(x => x.selected === true).length > 0;
    },

    selectButtonDocsVisible() {
      return this.doc.filter(x => x.selected === true).length > 0;
    }
  },
  delimiters: ['${', '}'],
  data() {
    return {
      deleteModalVisible: false,
      deleteListMedia: [],

      format,
      progress: 0.01,
      buffer: 0.01,
      uploadFinish: false,
      uploading: false,
      fileModel: null,
      featured_image: null,
      featured_image_id: 0,
      featured_image_preview: null,
      tab: 'media',
      showTab: ['media', 'document'],
      modalWidth: '815px',
      searchKeyword: '',
      indexZoomed: undefined,
      imgLoaded: {
        promise: Promise.resolve(),
        resolve: () => {
        },
        reject: () => {
        }
      },
      docRaw: [],
      doc: [],
      imagesRaw: [],
      images: [],
      filelist: []
    };
  },
  watch: {
    defaultTab: {
      immediate: true,
      deep: true,
      async handler(value) {
        if (value !== undefined) {
          this.tab = value;
          await this.getList(value);
        }
      }
    },
    useTab: {
      immediate: true,
      deep: true,
      async handler(value) {
        if (value !== undefined) {
          this.showTab = [value];
          this.tab = value;
        } else {
          this.showTab = ['media', 'document'];
          this.tab = 'media';
        }
      }
    }
  },
  methods: {
    openRelated(data) {
      const routeData = this.$router.resolve({
        name: 'channel-detail-post-detail',
        params: { id: data.channel_id, post_id: data.post_id }
      });
      window.open(routeData.href, '_blank');
    },
    onMediaDelete() {
      this.$q
        .dialog({
          title: 'Konfirmasi',
          message: 'Anda yakin akan menghapus file media ini?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          fileDelete(this.deleteListMedia.map(x => x.id).join(','))
            .then(() => {
              setTimeout(async() => {
                await this.getList(this.tab);
                this.deleteModalVisible = false;
                Notify.create({
                  message: 'File berhasil dihapus.',
                  timeout: 1000,
                  type: 'positive',
                  color: 'positive',
                  icon: 'check'
                });
              }, 1000);
            });
        });
    },
    remove(i) {
      const newFiles = [];
      this.filelist
        .filter((x, index) => index !== i)
        .forEach(x => {
          newFiles.push(x);
        });
      this.$refs.file.files = newFiles;
      this.filelist = newFiles;
    },
    dragover(event) {
      event.preventDefault();
    },
    dragleave(event) {
    },
    drop(event) {
      event.preventDefault();
      const { files } = event.dataTransfer;
      const newFiles = this.onValidate(files);
      this.$refs.file.files = newFiles;
      this.filelist = newFiles;

      setTimeout(() => {
        this.onUpload();
      }, 500);
    },
    onSelectFile(value) {
      const newFiles = this.onValidate(value);
      this.$refs.file.files = newFiles;
      this.filelist = newFiles;

      setTimeout(() => {
        this.onUpload();
      }, 500);
    },
    onValidate(files) {
      const newFiles = [];
      const fileType = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document"',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/zip',
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'video/mp4'];

      files.forEach(x => {
        const maxSize = x.size / 1000 / 1000;
        if (maxSize > 100) {
          Notify.create({
            message: `${x.name} exceed the maximum 100MB file size limit.`,
            timeout: 2500,
            type: 'negative',
            color: 'negative',
            icon: 'close'
          });
        }
        if (!fileType.includes(x.type.toLowerCase())) {
          Notify.create({
            message: `${x.name}, this file type is not allowed to upload.`,
            timeout: 2500,
            type: 'negative',
            color: 'negative',
            icon: 'close'
          });
        }
        if (fileType.includes(x.type.toLowerCase()) && maxSize <= 100) newFiles.push(x);
      });
      return newFiles;
    },
    getIcon(filemime) {
      let mime = filemime.replace('docx', 'word');
      mime = mime.replace('xlsx', 'excel');
      mime = mime.replace('zip', 'archive');

      let color = 'grey-8';
      if (['pdf'].includes(filemime)) color = 'red';
      if (['docx', 'doc'].includes(filemime)) color = 'blue';
      if (['xlsx', 'xls'].includes(filemime)) color = 'green';
      if (['zip'].includes(filemime)) color = 'orange-7';
      if (['csv'].includes(filemime)) color = 'purple';

      const res = {
        icon: `fa-file-${mime}`,
        color
      };

      return res;
    },
    async onShow() {
      await this.listMedia();
    },
    onSelectMedia() {
      this.$emit('select', this.images.filter(x => x.selected));
      this.listLocal = false;
    },
    onDeleteSelectedMedia() {
      const idToDelete = this.images.filter(x => x.selected).map(x => x.id).join(',');
      if (idToDelete !== '') {
        this.deleteModalVisible = true;
        this.$emit('delete', this.images.filter(x => x.selected));

        getListDelete({ id: idToDelete }).then(res => {
          const listDelete = res.data.map(x => {
            return {
              ...x,
              related: JSON.parse(x.related)
            };
          });
          this.deleteListMedia = listDelete;
        });
      }
    },
    onSelectDocs() {
      this.$emit('select', this.doc.filter(x => x.selected));
      this.listLocal = false;
    },
    onDeleteSelectedMediaDocs() {
      // this.$emit('delete', this.doc.filter(x => x.selected));
      const idToDelete = this.doc.filter(x => x.selected).map(x => x.id).join(',');
      if (idToDelete !== '') {
        this.deleteModalVisible = true;
        this.$emit('delete', this.doc.filter(x => x.selected));

        getListDelete({ id: idToDelete }).then(res => {
          const listDelete = res.data.map(x => {
            return {
              ...x,
              related: JSON.parse(x.related)
            };
          });
          this.deleteListMedia = listDelete;
        });
      }
    },
    onSearch(data) {
      if (data.length === 0) {
        this.images = this.imagesRaw;
      } else {
        this.images = this.imagesRaw.filter(x => x.title.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1);
      }
    },
    onSearchDoc(data) {
      if (data.length === 0) {
        this.doc = this.docRaw;
      } else {
        this.doc = this.docRaw.filter(x => x.title.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1);
      }
    },
    onUpload() {
      this.interval = setInterval(() => {
        if (this.progress >= 1) {
          this.progress = 0.01;
          this.buffer = 0.01;
          return;
        }

        this.progress = Math.min(1, this.buffer, this.progress + 0.1);
      }, 700 + Math.random() * 1000);

      this.bufferInterval = setInterval(() => {
        if (this.buffer < 1) {
          this.buffer = Math.min(1, this.buffer + Math.random() * 0.2);
        }
      }, 700);

      this.uploading = true;
      const { files } = this.$refs.file;

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };

      const formData = new FormData();
      files.forEach((v, i, a) => {
        formData.append('file[]', files[i]);
      });
      axios.post('./api/api/file', formData, config).then(async res => {
        Notify.create({
          message: 'File is upload successfully.',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
        this.filelist = [];
        this.$refs.file.files = [];
        this.uploading = false;
        this.fileModel = null;

        await this.getList(this.tab);

        clearInterval(this.interval);
        clearInterval(this.bufferInterval);

        this.uploadFinish = true;

        setTimeout(() => {
          this.uploadFinish = false;
          this.progress = 0.01;
          this.buffer = 0.01;
        }, 3000);
      }).catch(error => {
      });
    },
    onSelect(data) {
      this.images = this.images.map(x => {
        if (data.id === x.id) {
          return {
            ...x,
            selected: !x.selected
          };
        }
        return x;
      });
    },
    onSelectDoc(data) {
      this.doc = this.doc.map(x => {
        if (data.id === x.id) {
          return {
            ...x,
            selected: !x.selected
          };
        }
        return x;
      });
    },
    onFeaturedImage(data) {
      // console.log(data);
      // this.featured_image_preview = URL.createObjectURL(data);
    },
    closeDialog() {
      this.tab = 'media';
      this.filelist = [];
      if (this.$refs.file) this.$refs.file.files = [];

      this.listLocal = false;
    },

    downloadDocument(item) {
      axios({
        url: item.src.replace('./api', '/api'),
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', item.item.filename);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    },

    previewDocument(item) {
      const pswp = this.$Pswp.open({
        items: [{
          html: (new ViewerPDFClass({ propsData: { item } })).$mount().$el,
          title: item.title
        }],
        options: {
          addCaptionHTMLFn: (items, captionEl, isFake) => {
            if (!items.title) {
              captionEl.children[0].innerHTML = '';
              return false;
            }
            captionEl.children[0].innerHTML = items.title;
            return true;
          },
          closeOnScroll: false,
          closeOnVerticalDrag: false,
          shareButtons: [
            { id: 'download', label: 'Download Document', url: item.src, download: true }
          ]
        }
      });

      pswp.listen('close', () => {
        // console.log('emitted close');
      });
    },

    previewMedia(item) {
      // const idx = this.images.findIndex(x => x.id === item.id);

      const pswp = this.$Pswp.open({
        items: [
          {
            html: (item.item.filemime === 'mp4') ? (new ViewerVideoClass({ propsData: { item } })).$mount().$el : undefined,
            src: (item.item.filemime !== 'mp4') ? item.src : undefined,
            title: item.title
          }
        ],
        options: {
          addCaptionHTMLFn: (items, captionEl, isFake) => {
            if (!items.title) {
              captionEl.children[0].innerHTML = '';
              return false;
            }
            captionEl.children[0].innerHTML = items.title;
            return true;
          },
          // index: idx,
          closeOnScroll: false,
          closeOnVerticalDrag: false,
          shareButtons: [
            { id: 'download', label: 'Download Media', url: '{{raw_image_url}}', download: true }
          ]
        }
      });

      pswp.listen('close', () => {
        const elements = document.getElementsByClassName('pswp__zoom-wrap');
        while (elements.length > 0) elements[0].remove();
      });
    },

    async listMedia() {
      const data = await getListMedia();

      this.images = data.data.map(x => {
        return {
          id: x.id,
          selected: false,
          src: x.file_path,
          thumb: x.thumb_path,
          title: x.filename,
          item: x
        };
      });

      this.imagesRaw = this.images;
    },

    async listDocs() {
      const data = await getListDocs();

      this.doc = data.data.map(x => {
        return {
          id: x.id,
          selected: false,
          src: x.thumb_path,
          title: x.filename,
          item: x
        };
      });

      this.docRaw = this.doc;
    },
    async onInputTabs(value) {
      this.searchKeyword = '';
      await this.getList(value);
    },
    async getList(value) {
      if (value === 'media') {
        await this.listMedia();
      } else {
        await this.listDocs();
      }
    }
  }
};
</script>

<style lang="sass">

.blink_me
  animation: blinker 1s linear infinite

@keyframes blinker
  50%
    opacity: 0

.hello-slide
  width: 100%
  max-width: 400px
  color: #FFF
  margin: 120px auto 0
  text-align: center
  font-family: "Helvetica Neue", Arial, sans-serif

.hello-slide a
  color: #B5AEF7 !important

.pswp
  z-index: 999999 !important

.pswp__bg
  background: #00000073 !important

.pswp__caption__center
  text-align: center !important

//.kmp-media-icon-search
//  cursor: unset
//.kmp-media-icon-search:hover
//  cursor: pointer
.kmp-media-icon-search .kmp-media-icon-search-item
  display: none

.kmp-media-icon-search:hover .kmp-media-icon-search-item
  display: block

.kmp-media-icon-search .kmp-media-icon-search-uncheck
  display: block

.kmp-media-icon-search .kmp-media-icon-search-check
  display: none

.image-gallery
  &__image
    //border-radius: 3%/5%
    border-radius: 8px
    // width: 150px
    // max-width: 20vw
    //cursor: pointer

    &-full
      width: 800px
      max-width: 70vw
      z-index: 2002
      pointer-events: none

      &--active
        pointer-events: all

  &__blinder
    opacity: 0
    z-index: 2000
    pointer-events: none
    transition: opacity 0.3s ease-in-out

    &--active
      opacity: 0.6
      pointer-events: all

      + div > .image-gallery__image
        z-index: 2001
</style>
