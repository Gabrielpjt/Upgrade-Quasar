<template>
  <q-page :style-fn="pageAdjust">
    <LeftBar :is_loading="refresh" @onResize="onResize"/>
    <GuidelinesBar/>
<!--        <div class="q-px-lg" style="margin-top: 100px">-->
<!--          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>-->
<!--        </div>-->
    <div v-show="is_show_post" class="row q-pa-lg kmp-content-channel">
      <div class="col-md-7 col-xs-12">
        <div class="items-start q-pb-md" :class="$q.platform.is.mobile ? '' : 'q-pr-lg'">
          <q-card v-if="!guidelines.loading && guidelines.content !== null" class="q-pa-md q-mb-lg">
            <q-item class="q-pl-sm">
              <!--              <span><q-icon :name="guidelines.guide_options.find(x=>x.value === parseInt(guidelines.content.guide_type,10)).icon" class="text-neutral q-mr-sm" size="18px"/> </span>-->
              <span><q-icon name="o_fact_check" class="text-neutral q-mr-sm" size="24px"/> </span>
              <div>
                <span class="text-neutral kmp-font-bold kmp-font-md">User Guideline /&nbsp;</span>
                <span
                  class="text-neutral kmp-font-bold kmp-font-md">{{
                    guidelines.guide_options.find(x => x.value === parseInt(guidelines.content.guide_type, 10)).label
                  }}</span>
              </div>

              <q-space></q-space>
              <span><q-btn icon="edit" flat dense label="Edit" size="sm"
                           v-if="guidelines.roles.includes(checkRole().name)"
                           @click="doOpenGuidelinesDialog('edit')"></q-btn></span>
              <span><q-btn icon="delete" flat dense size="sm" label="Delete" color="red" class="q-ml-md"
                           v-if="guidelines.roles.includes(checkRole().name)"
                           @click="doDeleteGuidelines"></q-btn></span>
            </q-item>
            <q-item class="q-pl-sm">
              <div class="kmp-font-xl kmp-font-bold kmp-text-grey-1 q-mt-sm">
                {{ guidelines.content.title }} {{ ((guidelines.content.active) ? '' : ' (inactive)') }}
              </div>
              <q-space></q-space>
              <span><q-btn icon="play_circle" flat dense size="md" label="Video" class="q-ml-md"
                           :disable="cSrc === ''"
                           @click="guidelines.preview_video=true"></q-btn></span>
              <span><q-btn @click="doGetPdf" icon="picture_as_pdf" flat dense size="md" label="PDF"
                           class="q-ml-md"></q-btn></span>
            </q-item>
            <div class="q-px-sm q-pt-md kmp-text-grey-1" v-html="guidelines.content.content">

            </div>
          </q-card>
          <PostLoading v-if="guidelines.loading" :isDashboard="true" :count="1"/>
        </div>

        <div class="q-mt-lg q-pt-xl hidden">
          <q-btn label="Media" @click="mediaVisible=!mediaVisible"/>
          <Media v-model="mediaVisible" @select="onSelect" />
        </div>
      </div>
      <div class="col-md-5 col-xs-12">
        <div class="items-start kmp-sticky" style="position: -webkit-sticky;position: sticky;top: 146px">
          <q-card class="my-card q-py-md q-px-sm">
            <q-card-section class="q-py-xs">
              <div class="row items-center">
                <span><q-icon name="o_fact_check" class="text-neutral q-mr-sm" size="30px"/> </span>
                <span class="text-neutral kmp-font-bold kmp-font-lg">User Guideline</span>

                <!--                <span><q-btn icon="add" flat dense label="Add" size="sm"-->
                <!--                             v-if="guidelines.roles.includes(checkRole().name)"-->
                <!--                             @click="doOpenGuidelinesDialog"></q-btn></span>-->

                <!--                <span><q-btn icon="fact_check" flat dense label="Add Guidelines" size="md"-->
                <!--                             v-if="guidelines.roles.includes(checkRole().name)"-->
                <!--                             @click="doOpenGuidelinesDialog"></q-btn></span>-->
                <q-space></q-space>
                <q-select label="Role" borderless dense options-dense
                          popup-content-style="border-radius: 8px; "
                          style="width: 160px"
                          @input="changeRolesView"
                          v-model="guidelines.role_view_selected"
                          :options="guidelines.role_options">
                  <template v-slot:option="scope">
                    <q-item
                      v-bind="scope.itemProps"
                      v-on="scope.itemEvents"
                    >
                      <q-item-section>
                        <q-item-label >{{scope.opt.alias}} </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:selected-item="scope">
                    {{scope.opt.alias}}
                  </template>
                </q-select>
              </div>
            </q-card-section>
            <q-card-section class="q-py-xs q-pt-none">
                <span><q-btn icon="add" unelevated color="primary" dense label="Create New" size="sm"
                             v-if="guidelines.roles.includes(checkRole().name)"
                             @click="doOpenGuidelinesDialog"></q-btn></span>
            </q-card-section>
            <q-card-section class="q-py-xs q-pt-md">
              <div class="row items-center">
                <span class="text-neutral kmp-font-md">The page contains instructions for use of the KPK SmartApp</span>
              </div>
            </q-card-section>
            <q-card-section class="q-py-xs q-pt-none">
              <div class="row items-center full-width">
                <q-input v-model="guidelines.keyword" outlined label="Search guidelines" dense class="full-width"
                         clearable/>
              </div>
            </q-card-section>
            <q-scroll-area :style="{
              height: '595px',
              minHeight: '200px'
            }">
              <q-card-section class="q-py-xs">
                <q-tree
                  ref="guideline_tree"
                  :nodes="guidelines.tree"
                  accordion
                  node-key="key"
                  default-expand-all
                  :filter="guidelines.keyword"
                >
                  <template v-slot:default-header="prop">
                    <div class="row items-center cursor-pointer">
                      <div v-if="prop.node.icon !== '' && prop.node.icon !== undefined" class="q-mr-sm">
                        <q-icon :name="prop.node.icon" size="20px" class="kmp-text-grey-1"/>
                      </div>
                      <div class="text-capitalize kmp-text-grey-1 cursor-pointer">
                        {{ prop.node.label }}
                      </div>
                    </div>
                  </template>
                </q-tree>
              </q-card-section>
            </q-scroll-area>
          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="guidelines.dialog" persistent @show="onGuidelineDialogShow">
      <q-card class="q-py-sm q-px-xs" :class="$q.platform.is.mobile ? 'kmp-modal-mobile1' : 'modal-size'">
        <q-card-section>
          <q-btn icon="close" unelevated rounded dense v-close-popup class="float-right"></q-btn>
          <div class="text-title-form q-mb-md text-capitalize">Add / Edit User Guideline</div>
          <div class="text-desc-form">Guideline will be displayed based on the member role. Guideline types are
            modules in the Smart App that will be displayed on the left bar under Guideline menu.
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col q-mr-xs">
              <q-select label="Guideline Type" outlined dense autofocus options-dense
                        popup-content-style="border-radius: 8px; "
                        v-model="guidelines.guide_selected"
                        :options="guidelines.guide_options"/>
            </div>
            <div class="col q-ml-xs">
              <q-select label="Role" outlined dense autofocus options-dense
                        popup-content-style="border-radius: 8px; "
                        v-model="guidelines.role_selected"
                        :options="guidelines.role_options">

                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                  >
                    <q-item-section>
                      <q-item-label >{{scope.opt.alias}} </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="Title" dense v-model="guidelines.data.title" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="Video Guideline (Youtube Link Only)" dense v-model="guidelines.data.description" outlined/>
        </q-card-section>

        <!--        <q-card-section class="q-pt-none">-->
        <!--          <q-input dense label="Short Description" v-model="guidelines.data.description" autogrow type="textarea"-->
        <!--                   outlined/>-->
        <!--        </q-card-section>-->

        <q-card-section class="q-pt-none">
          <!--          <div class="text-form"> Short Descriptions</div>-->
          <div :style="editorToolbarStyle">
            <ckeditor v-if="!guidelines.loading" :editor="editor" v-model="guidelines.data.content"
                      :config="editorConfig"></ckeditor>
          </div>
          <!--          <br />-->
          <!--          <q-editor-->
          <!--            ref="form_guidelines_content"-->
          <!--            v-model="guidelines.data.content"-->
          <!--            @paste.native="evt => pasteCapture(evt)"-->
          <!--            @drop.native="evt => dropCapture(evt)"-->
          <!--            :definitions="{-->
          <!--              upload: {-->
          <!--                tip: 'Upload Image',-->
          <!--                icon: 'image',-->
          <!--                label: 'Insert Image',-->
          <!--                handler: uploadImage-->
          <!--              },-->
          <!--            }"-->
          <!--            :toolbar="[-->
          <!--                        [-->
          <!--                          {-->
          <!--                            label: $q.lang.editor.formatting,-->
          <!--                            icon: $q.iconSet.editor.formatting,-->
          <!--                            list: 'no-icons',-->
          <!--                            options: [-->
          <!--                              'p',-->
          <!--                              'h1',-->
          <!--                              'h2',-->
          <!--                              'h3',-->
          <!--                              'h4',-->
          <!--                              'h5',-->
          <!--                              'h6',-->
          <!--                              'code'-->
          <!--                            ]-->
          <!--                          },-->
          <!--                        ],-->
          <!--                        ['textColor'],-->
          <!--                        ['bold', 'italic', 'underline'],-->
          <!--                        ['left', 'center', 'right', 'justify'],-->
          <!--                        ['ordered', 'unordered'],-->
          <!--                        ['outdent', 'indent'],-->
          <!--                        ['quote', 'link'],-->
          <!--                        ['upload']-->
          <!--                      ]"-->
          <!--            max-height="300px"-->
          <!--            style="border: 1px solid rgba(0, 0, 0, 0.22); border-radius: 12px;"-->
          <!--          >-->
          <!--            <template v-slot:textColor>-->
          <!--              <q-btn-dropdown menu-self="top start" menu-anchor="bottom start" dense no-caps ref="textColor" no-wrap unelevated label="Text Color" size="sm" class="q-pa-none">-->
          <!--                <q-list dense>-->
          <!--                  <q-item tag="label" clickable @click="color('foreColor', foreColor)">-->
          <!--                    <q-item-section>-->
          <!--                      <q-color hidden v-model="foreColor" no-header no-footer default-view="palette" class="my-picker"-->
          <!--                               :palette="[-->
          <!--                                      '#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff',-->
          <!--                                      '#ffffff', '#cdcdcd', '#b2b2b2', '#999999', '#7f7f7f', '#666666', '#4c4c4c', '#333333', '#191919', '#000000'-->
          <!--                                     ]"-->
          <!--                      />-->
          <!--                      <q-color v-model="foreColor" no-header no-footer default-view="palette" class="my-picker" />-->
          <!--                    </q-item-section>-->
          <!--                  </q-item>-->
          <!--                </q-list>-->
          <!--              </q-btn-dropdown>-->
          <!--            </template>-->
          <!--          </q-editor>-->
        </q-card-section>

        <q-card-actions class="q-px-md fit row justify-between">
          <q-checkbox v-model="guidelines.data.active" label="Active"/>
          <q-btn class="btn-primary-color publish-button" label="Save"
                 icon="save" :loading="guidelines.loading"
                 unelevated @click="doPostGuidelines();">
            <template v-slot:loading>
              <q-spinner-dots/>
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="guidelines.preview_video" persistent>
      <q-card class="q-py-sm q-px-xs" :class="$q.platform.is.mobile ? 'kmp-modal-guide-mob' : 'modal-media-size'">
        <q-card-section>
          <q-btn icon="close" unelevated rounded dense v-close-popup class="float-right"></q-btn>
          <div class="text-title-form q-mb-md text-capitalize">{{ cTitle }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-video
            :ratio="16/9"
            :src="cSrc"
          />
        </q-card-section>

      </q-card>
    </q-dialog>

    <q-dialog v-model="guidelines.image.dialog" persistent>
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-guide-mob' : 'modal-media-size'">
        <q-card-section>
          <div class="q-mt-xs">
            <span class="text-h6">Insert Image</span>
            <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-uploader
            @added="handleUploadImage"
            ref="uploader"
            label="Max file size 100MB"
            :multiple="false"
            accept="image/jpeg, image/jpg, image/png"
            :max-file-size="104857600"
            :max-files="1"
            style="width: 100%"
            hide-upload-btn
            class="shadow-0 q-uploader--bordered kmp-rounded-2"
          />
        </q-card-section>

        <q-card-actions class="q-px-md fit row justify-end q-mb-md">
          <q-btn class="btn-primary-color publish-button" label="Insert"
                 icon="login" :loading="guidelines.image.loading"
                 unelevated @click="doInsertImage();">
            <template v-slot:loading>
              <q-spinner-dots/>
            </template>
          </q-btn>
        </q-card-actions>

      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { format } from 'quasar';

import Editor from 'ckeditor5-custom-build/build/ckeditor';

import LeftBar from 'components/LeftBar';
import GuidelinesBar from 'components/guidelines/GuidelinesBar';
import PostLoading from 'components/PostLoading';
import { getCredential } from 'src/lib/storage';
import {
  deleteGuidelines,
  fileUpload,
  getGuidelines,
  getPdf,
  getsGuidelines,
  postGuidelines,
  putGuidelines
} from 'src/lib/api';
import { checkRole } from 'src/lib/helper';
import Media from 'components/media/Media';

export default {
  components: {
    GuidelinesBar,
    LeftBar,
    PostLoading,
    Media
  },
  data() {
    return {
      getsGuidelines,
      postGuidelines,
      getGuidelines,
      deleteGuidelines,
      putGuidelines,
      getPdf,
      checkRole,

      mediaVisible: false,

      editor: Editor,
      editorData: '<p></p>',
      editorToolbarStyle: {},
      editorConfig: {
        simpleUpload: {
          uploadUrl: './api/api/file/ck-upload',
          withCredentials: false,
          headers: {
            Authorization: `Bearer ${getCredential().accessToken}`
          }
        },
        fontSize: {
          options: [
            {
              title: '8px',
              model: '8px'
            },
            {
              title: '12px',
              model: '12px'
            },
            // 'default',
            {
              title: '14px',
              model: '14px'
            }
          ]
        },
        image: {
          toolbar: [
            'imageStyle:alignLeft', 'imageStyle:alignRight', '|',
            'imageStyle:alignBlockLeft', 'imageStyle:alignCenter', 'imageStyle:alignBlockRight', '|',
            'toggleImageCaption', 'linkImage'
            // {
            //   name: 'imageStyle:pictures',
            //   items: ['imageStyle:alignBlockLeft', 'imageStyle:alignCenter', 'imageStyle:alignBlockRight'],
            //   defaultItem: 'imageStyle:alignBlockLeft'
            // },
          ]
        },
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'underline', '|',
          {
            label: 'Font',
            icon: 'text',
            items: ['fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor']
          },
          {
            label: 'Align Text',
            icon: 'alignLeft',
            items: ['alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|', 'outdent', 'indent', '|', 'numberedList', 'bulletedList']
          }, '|',
          'imageInsert', 'mediaEmbed',
          {
            label: 'Insert',
            icon: 'plus',
            items: ['insertTable', 'blockQuote', 'link', 'specialCharacters', 'horizontalLine']
          }, '|',
          'undo', 'redo'
        ],
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica, sans-serif',
            // 'Courier New, Courier, monospace',
            // 'Georgia, serif',
            // 'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif'
            // 'default',
            // 'Inter',
            // 'Ubuntu, Arial, sans-serif',
            // 'Ubuntu Mono, Courier New, Courier, monospace'
          ]
        },
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h3', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h4', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h5', title: 'Heading 3', class: 'ck-heading_heading3' }
          ]
        }
      },

      guidelines: {
        data: {
          title: '',
          description: '',
          content: '',
          guide_type: '',
          youtube: '',
          role_id: 0,
          active: true
        },
        guide_options: [
          { value: 1, label: 'Dashboard', icon: 'home' },
          { value: 2, label: 'Knowledge Map', icon: 'book' },
          { value: 3, label: 'Training', icon: 'school' },
          { value: 4, label: 'Channel', icon: 'domain' },
          { value: 5, label: 'Private Message', icon: 'message' },
          { value: 6, label: 'Profile', icon: 'person' },
          { value: 7, label: 'Smart Mobile', icon: 'phone_iphone' }
        ],
        guide_selected: { value: 1, label: 'Dashboard' },
        role_options: [
          { value: 1, label: 'Member', alias: 'Member' },
          { value: 3, label: 'KM Manager', alias: 'KM Manager' },
          { value: 4, label: 'Channel Manager', alias: 'Pengelola Pengetahuan' },
          { value: 5, label: 'Content Manager', alias: 'Penjamin Mutu' }
        ],
        role_selected: { value: 1, label: 'Member', alias: 'Member' },
        role_view_selected: { value: 1, label: 'Member', alias: 'Member' },
        dialog: false,
        loading: false,
        keyword: '',
        tree: [],
        data_raw: [],
        content: null,
        action: 'add',
        preview_video: false,
        image: {
          dialog: false,
          upload: null,
          loading: false
        },
        roles: ['admin', 'content_manager', 'km_manager']
      },

      foreColor: '#000000',

      is_channel_manager: false,
      is_km_manager: false,
      is_admin: false,

      formatQuasar: format,
      jumlah: 0,
      heightObserver: 0,
      data_channel: [],
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
        initial: '',
        accessToken: '',
        currentAccessId: ''
      },
      post_channel_verified: [],
      post_channel_pinned: [],
      article: null,
      is_show_post: true,
      is_show_draft: false,
      article_draft_total: 0,
      reaction_list: []
    };
  },
  methods: {
    onSelect(data) {
      console.log(data);
    },
    onGuidelineDialogShow() {
      this.editorToolbarStyle = {
        width: '844px'
      };
      setTimeout(() => {
        this.editorToolbarStyle = {
          width: '100%'
        };
      }, 100);
    },
    // onReady(editor) {
    //   // Insert the toolbar before the editable area.
    //   editor.ui.getEditableElement().parentElement.insertBefore(
    //     editor.ui.view.toolbar.element,
    //     editor.ui.getEditableElement()
    //   );
    // },

    changeRolesView(selected) {
      this.guidelines.role_view_selected = selected;
      this.setGuidelinesTree(this.guidelines.data_raw.filter(x => x.role_id === selected.value));
    },
    doGetPdf() {
      this.getPdf(this.guidelines.content.id)
        .then(res => {
        });
    },
    color(cmd, name) {
      this.$refs.textColor.hide();
      this.$refs.form_guidelines_content.caret.restore();
      this.$refs.form_guidelines_content.runCmd(cmd, name);
      this.$refs.form_guidelines_content.focus();
    },
    dropCapture(evt) {
    },
    pasteCapture(evt) {
      // Let inputs do their thing, so we don't break pasting of links.
      if (evt.target.nodeName === 'INPUT') return;
      let text;
      let
        onPasteStripFormattingIEPaste;
      evt.preventDefault();
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain');
        this.$refs.form_guidelines_content.runCmd('insertText', text);
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain');
        this.$refs.form_guidelines_content.runCmd('insertText', text);
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true;
          this.$refs.form_guidelines_content.runCmd('ms-pasteTextOnly', text);
        }
        onPasteStripFormattingIEPaste = false;
      }
    },
    doInsertImage() {
      this.guidelines.image.loading = true;
      this.guidelines.image.upload.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', this.guidelines.image.upload[i]);
        fileUpload(formData).then(res => {
          if (res.message === 'OK') {
            res.data.forEach(x => {
              const content_media = {
                jpg: `<img src="./api/uploads/files/${x.created_by}/700-${x.filename_unique}" />`,
                jpeg: `<img src="./api/uploads/files/${x.created_by}/700-${x.filename_unique}" />`,
                png: `<img src="./api/uploads/files/${x.created_by}/700-${x.filename_unique}" />`
              };
              this.loading_upload = false;
              this.$refs.form_guidelines_content.runCmd('insertHTML', content_media[x.filemime.toLowerCase()]);
            });

            this.guidelines.image.dialog = false;
            this.guidelines.image.loading = false;
          }
        }).catch(err => {
          this.guidelines.image.loading = false;
        });
      });
    },
    uploadImage() {
      this.guidelines.image.dialog = true;
    },
    handleUploadImage(files, content_type) {
      this.guidelines.image.upload = files;
    },
    doOpenGuidelinesDialog(action = 'add') {
      this.guidelines.dialog = true;
      this.guidelines.action = action;
      this.guidelines.data = {
        title: '',
        description: '',
        content: '',
        guide_type: '',
        role_id: 0,
        active: true
      };

      if (this.guidelines.content && this.guidelines.content.id && action === 'edit') {
        this.guidelines.data = {
          title: this.guidelines.content.title,
          description: this.guidelines.content.description,
          content: this.guidelines.content.content,
          guide_type: this.guidelines.guide_options.find(x => x.value === parseInt(this.guidelines.content.guide_type, 10)),
          role_id: this.guidelines.role_options.find(x => x.value === parseInt(this.guidelines.content.role_id, 10)),
          active: this.guidelines.content.active
        };
        this.guidelines.guide_selected = this.guidelines.guide_options.find(x => x.value === parseInt(this.guidelines.content.guide_type, 10));
        this.guidelines.role_selected = this.guidelines.role_options.find(x => x.value === parseInt(this.guidelines.content.role_id, 10));
      }
    },
    doGetsGuidelines() {
      this.getsGuidelines()
        .then(res => {
          this.guidelines.data_raw = res.data;
          this.setGuidelinesTree(this.guidelines.data_raw.filter(x => x.role_id === this.guidelines.role_view_selected.value));
        });
    },
    setGuidelinesTree(guidelines_data) {
      const goTo = id => {
        if (parseInt(this.$route.query.id, 10) !== id) {
          this.$router.push({ name: 'guidelines-list', query: { id } });
        }
      };

      let first_id = 0;
      const data = (this.guidelines.roles.includes(checkRole().name)) ? guidelines_data : guidelines_data.filter(x => x.role.name === checkRole().name);
      const guide_list = [...new Set(data.map(item => this.guidelines.guide_options.find(x => x.value === parseInt(item.guide_type, 10))))];
      this.guidelines.tree = guide_list.map((x, i) => {
        const children = data
          .filter(y => parseInt(y.guide_type, 10) === x.value)
          .filter(y => (!this.guidelines.roles.includes(checkRole().name) ? y.active === true : true))
          .map(y => {
            if (first_id === 0) first_id = y.id;
            return {
              label: y.title + ((y.active) ? '' : ' (inactive)'),
              key: y.id,
              // key: `${x.value}_${i}_${y.id}`,
              handler(value) {
                goTo(value.key);
              }
            };
          });
        return {
          label: x.label,
          key: `${x.value}_${i}`,
          icon: x.icon,
          children
        };
      });
      setTimeout(() => {
        this.$refs.guideline_tree.expandAll();
        if ((this.$route.query.id === undefined || data.find(x => x.id === this.$route.query.id) === undefined) && data.length > 0) goTo(first_id);
      }, 500);
    },
    doPostGuidelines() {
      this.guidelines.loading = true;
      const new_guidelines = {
        ...this.guidelines.data,
        guide_type: this.guidelines.guide_selected.value,
        role_id: this.guidelines.role_selected.value
      };
      if (this.guidelines.content && this.guidelines.content.id && this.guidelines.action === 'edit') {
        const patch_guidelines = {
          ...new_guidelines,
          id: this.guidelines.content.id
        };
        this.putGuidelines(patch_guidelines)
          .then(res => {
            this.guidelines.loading = false;
            this.guidelines.dialog = false;
            this.doGetsGuidelines();
            this.getGuidelines(this.guidelines.content.id)
              .then(res2 => {
                this.guidelines.content = res2.data;
              });
            this.$q.notify({
              message: 'Guidelines berhasil diupdate.',
              color: 'green'
            });
          });
      } else {
        this.postGuidelines(new_guidelines)
          .then(res => {
            this.guidelines.loading = false;
            this.guidelines.dialog = false;
            this.doGetsGuidelines();
            this.$router.push({ name: 'guidelines-list', query: { id: res.message.id } });
            this.$q.notify({
              message: 'Guideline berhasil disimpan.',
              color: 'green'
            });
          });
      }
    },
    doDeleteGuidelines() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Anda yakin untuk menghapus Guideline ini ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteGuidelines(this.guidelines.content)
            .then(res => {
              this.doGetsGuidelines();
              this.$q.notify({
                message: 'Guideline berhasil dihapus.',
                color: 'red'
              });
              setTimeout(() => {
                this.guidelines.content = null;
              }, 500);
            });
        });
    },
    pageAdjust(offset) {
      return { minHeight: offset ? `calc(100vh - ${offset + 50}px)` : '100vh' };
    },
    toggleDraft() {
      this.is_show_draft = !this.is_show_draft;
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      profile.roles.forEach((v, i) => {
        if (v.name === 'channel_manager') {
          this.is_channel_manager = true;
        }
      });

      const role_name = (checkRole() !== null) ? checkRole().name : '';
      if (role_name === 'km_manager') {
        this.is_km_manager = true;
      } else if (role_name === 'channel_manager') {
        this.is_channel_manager = true;
      } else if (role_name === 'admin' || profile.user_name === 'admin') {
        this.is_admin = true;
      }

      this.user = {
        id: profile.id,
        name: profile.name,
        accessToken: user.accessToken,
        currentAccessId: user.currentAccessId,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
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
    clickFile(url, name) {
      window.open(`${process.env.QUASAR_API_URL}api/file/original?url=${url}&name=${name}`, '_blank');
    },
    getWord(s, pos) {
      const n = s.substring(pos).match(/^[a-zA-Z0-9-_]+/);
      const p = s.substring(0, pos).match(/[a-zA-Z0-9-_]+$/);
      if (!p && !n) {
        return '';
      }
      return (p || '') + (n || '');
    },
    showWord(e) {
      // $show.innerText = getWord(e.target.value, e.target.selectionStart);
    }
  },
  computed: {
    cTitle() {
      if (this.guidelines.content === null) return '';
      return this.guidelines.content.title;
    },
    cSrc() {
      if (this.guidelines.content === null || this.guidelines.content.description === null) return '';
      return this.guidelines.content.description.replace('watch?v=', 'embed/');
    }
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.guidelines.loading = true;
          this.getGuidelines(parseInt(value, 10))
            .then(res => {
              setTimeout(() => {
                this.guidelines.content = res.data;
                this.guidelines.loading = false;
              }, 200);
            });
        }
      }
    }
  },
  mounted() {
    this.getUser();
    this.doGetsGuidelines();
  }
};
</script>

<style>
.ck.ck-editor__editable {
  height: 300px;
}

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

.modal-size {
  min-width: 900px;
}
.modal-media-size {
  min-width: 600px;
}
</style>
