<template>
  <!--  <q-dialog v-model="create_article" style="min-width: 80vw" :maximized="true">-->
  <q-card :class="$q.platform.is.mobile ? 'kmp-article-card-mobile' : 'kmp-article-card'">
    <q-card-section class="q-pa-none">
      <div class="q-pa-none q-ma-none">
        <div>
          <q-bar class="kmp-bg-color-5 desktop-only" style="padding: 36px 20px; border-bottom: 1px solid #CBCBCB">
            <span class="cursor-pointer text-h6 kmp-text-grey-2 desktop-only" v-close-popup> &lt;&nbsp;&nbsp;Post an article</span>
            <div v-if="is_save_timeout">
              <span class="q-mx-md text-grey">|</span>
              <q-icon name="check_circle_outline" class="check-icon" color="green" size="16px" style=""/>
              <span class="q-ml-sm text-grey" style="font-size: 12px">Saved on your draft</span>
            </div>
            <q-space/>
            <q-bar class="kmp-bg-color-5">
              <div class="q-mr-md text-grey">
                <div class="row" style="font-size: 12px">Published Date</div>
                <div class="row">
                  <q-input dense borderless v-model="post_date">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-date v-model="post_date" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="post_date" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="q-mr-md text-grey">
                <div class="row" style="font-size: 12px">Publish to</div>
                <div class="row">
                  <q-select dense borderless color="primary" class="q-pa-0 kmp-publish-to"
                            v-model="channelValue"
                            :options="optChannel"
                            style="color: #0e84b5;max-width: 400px;border-radius: 8px"
                            :disable="this.article_id !== null && !this.is_km_manager"
                  />
                </div>
              </div>
<!--              <div class="q-mr-lg">-->
<!--                <div class="row" style="font-size: 12px">-->
<!--                  <q-checkbox v-model="is_draft" label="Draft" size="sm" />-->
<!--                </div>-->
<!--&lt;!&ndash;                v-if="article_id === null"&ndash;&gt;-->
<!--                <div class="row">-->
<!--                  <q-btn-->
<!--                    unelevated-->
<!--                    color="primary"-->
<!--                    label="Publish"-->
<!--                    class="q-mr-md"-->
<!--                    @click="handleConfirmPost"-->
<!--                    size="sm"-->
<!--                  />-->
<!--                </div>-->
<!--              </div>-->

<!--              <q-checkbox v-model="is_draft" dense size="sm" class="q-mr-md" :disable="!['Draft','Unverified'].includes(article_status)" >-->
<!--                <span class="kmp-font-sm">Draft</span>-->
<!--              </q-checkbox>-->
              <q-btn
                unelevated
                color="primary"
                label="Publish"
                class="q-mr-md"
                @click="handleConfirmPost"
                size="md"
              />
<!--              <q-btn unelevated color="primary" label="Update" v-if="article_id !== null" class="q-mr-md"-->
<!--                     @click="handleConfirmPost"-->
<!--              />-->
              <q-icon name="more_vert" class="q-mr-md kmp-text-grey-2 desktop-only" size="25px"/>
              <q-avatar v-if="profile_picture !== null" size="36px" class="desktop-only">
                <img :src="profile_picture">
                <!--                <div class='status-circle-white'></div>-->
              </q-avatar>
              <q-avatar v-if="profile_picture === null" size="36px" color="primary" text-color="white" class="desktop-only">
                {{ profile_name.match(/\b(\w)/g).join('').toUpperCase() }}
                <!--                <div class='status-circle-white'></div>-->
              </q-avatar>
            </q-bar>
          </q-bar>
          <q-bar class="kmp-bg-color-5 mobile-only q-py-lg"  style="min-height:60px">
             <div class="row">
              <div class="col-12">
                <span class="cursor-pointer text-h6 kmp-text-grey-2" v-close-popup> &lt;&nbsp;&nbsp;Post an article</span>
                <span v-if="is_save_timeout" class="text-grey q-mx-sm">|</span>
                <q-icon v-if="is_save_timeout" name="check_circle_outline" class="check-icon" color="green" size="16px" style=""/>
                <span v-if="is_save_timeout" class="q-ml-sm text-grey" style="font-size: 12px">Saved on your draft</span>
              </div>
            </div>
            <q-space/>
            <q-btn
              unelevated
              color="primary"
              label="Publish"
              class="q-mr-sm"
              @click="handleConfirmPost"
              size="md"
            />
          </q-bar>
          <div class="q-py-md q-px-md kmp-bg-color-8">
            <div class="row">
              <div :class="$q.platform.is.mobile ? 'col-12 col-md-4 q-mb-md' : 'col-12 col-md-4'">
                <q-input dense outlined autogrow
                         label="Title"
                         class="q-mx-xs"
                         placeholder="title of article"
                         v-model="article.title"
                />
              </div>
              <div class="col-12 col-md-8">
                <q-input v-if="$q.platform.is.desktop"
                         dense outlined
                         autogrow
                         label="Description"
                         class="q-mx-xs"
                         placeholder="description of article.."
                         maxlength="4000"
                         v-model="article.description"
                />
                <q-input v-if="$q.platform.is.mobile"
                         dense outlined
                         type="textarea"
                         rows="3"
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
                      <q-btn flat round dense icon="close" size="xs" @click="handleDeleteFile(item, index)"/>
                    </q-card>
                    <!--                      <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="true"-->
                    <!--                                         @delete_knowledge="handleDeleteFile(item, 'file')"/>-->
                  </div>
                  <div class="q-pr-sm" v-for="(item, index) in reference_links" :key="`L${index}`">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm">
                      <q-tooltip>
                        {{ item }}
                      </q-tooltip>
                      <q-icon name="fas fa-link" class="" size="12px"/>
                      {{ item.substr(0, 20) }}
                      <q-btn flat round dense icon="close" size="xs" @click="handleDeleteLinks(item, index)"/>
                    </q-card>
                    <!--                      <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="true"-->
                    <!--                                         @delete_knowledge="handleDeleteFile(item, 'file')"/>-->
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col q-mt-md q-px-xs" v-show="collab_list.length > 0">
                <div class="kmp-font-bold q-mb-sm">Collaboration With</div>
                <div class="row">
                  <div class="q-pr-sm" v-for="(person, index) in collab_list" :key="`C${index}`">
                    <span><q-badge color="blue" rounded class="q-pa-xd"><q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">{{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>
                    <q-btn flat round icon="close" size="sm" @click="deletePerson(index, 'collab')"/>
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
              <div style="border-bottom: solid 1px #CBCBCB">
                <q-editor
                  style="background-color: #ffffff;border: 0px; margin-top: -32px;"
                  ref="editor_ref"
                  :dense="$q.screen.lt.md"
                  v-model="editor"
                  @paste="evt => pasteCapture(evt)"
                  @drop="evt => dropCapture(evt)"
                  :height="editor_height"
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
              collaboration: {
                tip: 'Collaboration',
                icon: 'group',
                label: 'Collaboration',
                handler: () => {add_collab = true}
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
                        ['textColor'],
                        ['bold', 'italic', 'underline'],
                        ['left', 'center', 'right', 'justify'],
                        ['ordered', 'unordered'],
                        ['outdent', 'indent'],
                        ['quote', 'link'],
                        ['upload','upload_file'],
                        ['collaboration']
                      ]"
                >
                  <template v-slot:textColor>
                    <q-btn-dropdown dense no-caps ref="textColor" no-wrap unelevated color="grey-3" text-color="primary" label="Text Color" size="sm">
                      <q-list dense>
                        <q-item tag="label" clickable @click="color('foreColor', foreColor)">
                          <q-item-section>
                            <q-color hidden v-model="foreColor" no-header no-footer default-view="palette" class="my-picker"
                                     :palette="[
                                      '#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff',
                                      '#ffffff', '#cdcdcd', '#b2b2b2', '#999999', '#7f7f7f', '#666666', '#4c4c4c', '#333333', '#191919', '#000000'
                                     ]"
                            />
                            <q-color v-model="foreColor" no-header no-footer default-view="palette" class="my-picker" />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </template>
                </q-editor>
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
                <span class="text-h6">Insert Media</span>
                <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="q-gutter-sm">
                <q-checkbox v-model="embed_youtube" label="Embed Youtube"/>
              </div>
            </q-card-section>

            <q-card-section v-if="embed_youtube" class="q-pt-none">
              <q-input dense
                       outlined
                       v-model="link_youtube"
                       placeholder="copy youtube link here"
                       class="kmp-unwrap"
              />
              <q-btn color="primary"
                     label="Submit"
                     class="float-right q-my-md"
                     unelevated
                     no-caps size="md"
                     @click="handleYoutubeLink"
              />
            </q-card-section>

            <q-card-section v-if="!embed_youtube" class="q-pt-none">
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
          <q-card :class="$q.platform.is.mobile ? 'kmp-modal-article-mobile' : 'kmp-modal-article'">
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
                style="width: 100%"
                class="shadow-0 q-uploader--bordered kmp-rounded-2"
              />
            </q-card-section>
            <!--
            <q-card-section class="q-pt-none">
              <q-linear-progress v-if="loading_upload" indeterminate rounded color="negative" class="q-my-sm"/>

              <q-list :hidden="finish_files.length === 0" class="q-mt-sm">
                <div v-for="(item, index) in finish_files" :key="index">
                  <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="true"
                                     @delete_knowledge="handleDeleteFile(item, 'file')"/>
                </div>
              </q-list>
            </q-card-section>
            -->
          </q-card>
        </q-dialog>

        <q-dialog v-model="add_collab" persistent>
          <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
            <q-card-section>
              <div class="q-mt-xs">
                <span class="text-h6">Collaboration With</span>
                <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="q-gutter-sm">
                <q-select
                  class="q-mb-sm"
                  v-model="post_collaboration"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  @filter="filterCollab"
                  @input="addCollab()"
                  :options="collab_option"
                  :option-value="'id'"
                  :option-label="'name'"
                  dense
                  outlined
                  hide-dropdown-icon
                  ref="collab"
                  placeholder="Search member"
                >
                  <template v-slot:option="scope">
                    <q-item
                      v-bind="scope.itemProps"
                      v-on="scope.itemEvents"
                    >
                      <q-item-section class="">{{ scope.opt.name }}</q-item-section>
                      <q-item-section side v-show="scope.opt.tag !== undefined">{{ scope.opt.tag }}</q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>

      </div>
    </q-card-section>
    <q-dialog v-model="editor_confirm" persistent>
      <q-card style="width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <span class="text-h6 q-px-sm">Confirm</span>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="">
          <span class="q-ml-sm">Are you sure to save this article?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Save as Draft" color="primary" @click="handleSavePost(true)" v-close-popup />
          <q-btn flat label="Publish" color="primary" @click="handleSavePost(false)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky class="mobile-only q-ma-none" position="bottom-right" :offset="fabPos">
      <q-fab
        v-model="fab"
        :disable="draggingFab"
        label-position="top"
        color="blue"
        icon="keyboard_arrow_left"
        direction="left"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <div class="text-grey bg-white q-pa-sm">
          <div class="row" style="min-width:320px">
            <div class="col-6 q-mr-lg">
              <div class="row" style="font-size: 12px">Published Date</div>
              <div class="row">
                <q-input dense borderless v-model="post_date" style="min-width: 180px">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="post_date" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="post_date" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="col-4 q-ml-lg">
              <div class="row" style="font-size: 12px">Publish to</div>
              <div class="row">
                <q-select dense borderless color="primary" class="q-pa-0 kmp-publish-to"
                          v-model="channelValue"
                          :options="optChannel"
                          style="color: #0e84b5;max-width: 400px;border-radius: 8px"
                          :disable="this.article_id !== null && !this.is_km_manager"
                />
              </div>
            </div>
          </div>
        </div>
      </q-fab>
    </q-page-sticky>
  </q-card>
  <!--  </q-dialog>-->

</template>

<script>
import { Notify, date } from 'quasar';
import { checkRole, deleteList, getLoginId, getUserLogin } from 'src/lib/helper';
import {
  channelList,
  fileDelete,
  fileUpload,
  postCreate,
  postFileCreate,
  postUpdate,
  postDetail,
  postLinksCreate,
  postLinksDelete,
  SearchDataAutocomplete,
  channelMemberLatest
} from 'src/lib/api';
import moment from 'moment';
import _ from 'lodash';
import { point } from '../../lib/point';
// import KnowledgeListFile from 'components/KnowledgeListFile';
// import Player from 'components/common/Player';

const timeStamp = Date.now();

export default {
  data() {
    return {
      article_id: null,
      article_status: 'Draft',
      profile_picture: getUserLogin().profile_picture ? process.env.QUASAR_API_URL + getUserLogin().profile_picture : null,
      profile_name: getUserLogin().name,
      profile_id: getUserLogin().id,
      listChannel: [],
      optChannel: [],
      channelValue: '',
      // editor: '<h6 id="title" style="text-align: left;">Title article</h6><div><br></div>',
      editor: '',
      reference: '<div><br><h5>References</h5></div>',
      loading_upload: false,
      add_files: false,
      add_media: false,
      add_collab: false,
      post_collaboration: [],
      collab_option: [],
      collab_list: [],
      create_article: false,
      embed_youtube: false,
      link_youtube: '',
      post_date: date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm'),
      save_timeout: undefined,
      is_save_timeout: false,
      reference_selected: 'files',
      reference_links_input: '',
      article: {
        title: '',
        description: ''
      },
      finish_files: [],
      finish_links: [],
      reference_files: [],
      reference_links_have_id: [],
      reference_links: [],

      is_draft: true,
      editor_confirm: false,

      editor_height: '68vh',
      is_km_manager: false,
      foreColor: '#000000',
      fabPos: [18, 18],
      draggingFab: false,
      fab: true
    };
  },
  // components: { Player },
  methods: {
    postDetail() {
      postDetail(this.$route.params.post).then(res => {
        const response = res.data;
        this.article_status = response.status;
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
            type: v.channel_type,
            labelHtml: `<span class="text-primary text-weight-bold">${v.name}</span>`
          }
        ));
        this.listChannel = list;
        this.optChannel = arrayOption;
        const postChannel = !_.isEmpty(this.$route.params) ? this.$route.params.id.toString() : this.data_post.post_channel.channel_id.toString();
        const idx = list.findIndex(v => v.id.toString() === postChannel);
        this.channelValue = `<span class="text-primary text-weight-bold">${list[idx].label}</span>`;
      });
    },
    handleYoutubeLink() {
      if (this.link_youtube !== '') {
        const content_media = `<iframe src="${this.link_youtube.replace('watch?v=', 'embed/')}" style="border: none; overflow: hidden; width: 400px; max-width: 400px; height: 300px; max-height: 300px;" allowfullscreen />`;
        this.loading_upload = false;
        this.$refs.editor_ref.runCmd('insertHTML', content_media);
        this.add_media = false;
        this.link_youtube = '';
        this.embed_youtube = false;
      } else {
        Notify.create({
          message: 'Youtube Embed Link is empty',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'check'
        });
      }

      // let tmp = this.reference_links_input.split('\n');
      // tmp = tmp.map(x => x.trim());
      // tmp = tmp.filter(x => x !== '' && x.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+?([-.a-zA-Z0-9]+)\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i));
      // this.reference_links = tmp;
    },
    handleChangeLink() {
      let tmp = this.reference_links_input.split('\n');
      tmp = tmp.map(x => x.trim());
      tmp = tmp.filter(x => x !== '' && x.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+?([-.a-zA-Z0-9]+)\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i));
      tmp = tmp.filter((v, i, s) => {
        return s.indexOf(v) === i;
      });
      this.reference_links = tmp;
    },
    handleConfirmPost() {
      this.editor_confirm = true;
    },
    handleSavePost(draft) {
      this.is_draft = draft;
      clearTimeout(this.save_timeout);
      this.save_timeout = undefined;
      this.handlePost(this.is_draft ? 'Draft' : 'Unverified', '');

      setTimeout(() => {
        this.$emit('onClose');
        this.$router.push({
          name: 'channel-detail-edit-artikel',
          params: {
            id: this.changeChannel.channel_id,
            post_id: this.article_id
          }
        }).catch(() => {});
      }, 2000);
    },
    handlePost(status, type) {
      // console.log({
      //   created_by: getLoginId(),
      //   created_at: `${this.post_date}:00`,
      //   enabled: !this.is_draft,
      //   status: 'Unverified',
      //   // status,
      //   title: this.article.title,
      //   description: this.article.description,
      //   post_type: 'Article',
      //   article: this.editor,
      //   channel_id: this.listChannel.find(x => {
      //     return x.labelHtml === this.channelValue;
      //   }).id,
      //   channel_type: this.listChannel.find(v => { return v.labelHtml === this.channelValue; }).type,
      //   post_collaboration: this.collab_list
      // });
      if (!this.article_id) {
        const dataPost = {
          created_by: getLoginId(),
          created_at: `${this.post_date}:00`,
          enabled: !this.is_draft,
          status: 'Unverified',
          // status,
          title: this.article.title,
          description: this.article.description,
          post_type: 'Article',
          article: this.editor,
          channel_id: this.listChannel.find(x => {
            return x.labelHtml === this.channelValue;
          }).id,
          channel_type: this.listChannel.find(v => { return v.labelHtml === this.channelValue; }).type,
          post_collaboration: this.collab_list
        };
        postCreate(dataPost).then(res => {
          const response = res.data;
          if (res.message === 'OK') {
            if (dataPost.enabled === true) {
              this.addPoint('add', dataPost.channel_type, response.id);
            }
            this.article_id = response.id;
            this.article_status = response.status;
            if (type !== 'autosave') {
              Notify.create({
                message: 'Article is saved successfully',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
            }
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
            this.reference_links.forEach(v => {
              postLinksCreate({
                created_by: response.created_by,
                post_id: response.id,
                title: v,
                url: v
              }).then(res1 => {

              });
            });
          }
        });
        if (dataPost.channel_type === 'General') {
          channelMemberLatest({ id: this.profile_id, type: 'General' });
        } else {
          channelMemberLatest({ id: dataPost.channel_id, type: 'Channel' });
        }
      } else {
        const dataPost = {
          created_at: `${this.post_date}:00`,
          title: this.article.title,
          description: this.article.description,
          article: this.editor,
          enabled: !this.is_draft,
          status: this.article_status,
          channel_id: this.listChannel.find(x => {
            return x.labelHtml === this.channelValue;
          }).id,
          post_collaboration: this.collab_list,
          channel_type: this.listChannel.find(v => { return v.labelHtml === this.channelValue; }).type
        };
        postUpdate(this.article_id, dataPost).then(res => {
          const response = res.data;
          if (res.message === 'OK') {
            if (type !== 'autosave') {
              Notify.create({
                message: 'Article is saved successfully',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
            }
            const new_file = this.finish_files.filter(w => { return w.id === undefined; });
            new_file.forEach((v, i) => {
              const idx = this.finish_files.findIndex(x => x.file.id === v.file.id);
              postFileCreate({
                created_by: response.created_by,
                enabled: true,
                post_id: response.id,
                file_id: v.file.id
              }).then(res1 => {
                this.finish_files[idx].id = res1.data.id;
                this.reference_files.push(
                  { file: res1.data[0] }
                );
              });
            });
            const new_links = this.reference_links.filter(w => {
              return !this.reference_links_have_id.includes(w);
            });
            const remove_links = this.finish_links.filter(w => {
              return !this.reference_links.includes(w.url);
            });
            new_links.forEach(v => {
              postLinksCreate({
                created_by: response.created_by,
                post_id: response.id,
                title: v,
                url: v
              }).then(res1 => {
                this.finish_links.push(res1.data);
                this.reference_links_have_id.push(res1.data.url);
              });
            });
            remove_links.forEach(v => {
              postLinksDelete(v.id).then();
              const removeIndex = this.finish_links.findIndex(w => w.id === v.id);
              this.finish_links = deleteList(this.finish_links, removeIndex);
            });
          }
        });
        if (dataPost.enabled === true) {
          this.addPoint('add', dataPost.channel_type, this.article_id);
        }
        if (dataPost.enabled === false) {
          this.addPoint('rollback', dataPost.channel_type, this.article_id);
        }
        if (dataPost.channel_type === 'General') {
          channelMemberLatest({ id: this.profile_id, type: 'General' });
        } else {
          channelMemberLatest({ id: dataPost.channel_id, type: 'Channel' });
        }
      }
    },
    addPoint(tipe_point, type_channel, id) {
      if (type_channel === 'Project') {
        point(tipe_point, { tag: 'post_project', post_id: id });
      } else {
        point(tipe_point, { tag: 'post_general', post_id: id });
      }
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
    handleDeleteFile(data, index) {
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
        this.finish_files = deleteList(this.finish_files, index);
      });
    },
    handleDeleteLinks(data, index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this Link?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.reference_links = deleteList(this.reference_links, index);
      });
    },
    handleAutoSave() {
      if (this.save_timeout !== undefined) {
        clearTimeout(this.save_timeout);
      }

      this.save_timeout = setTimeout(() => {
        this.is_save_timeout = true;
        this.handlePost(this.is_draft ? 'Draft' : 'Unverified', 'autosave');
        setTimeout(() => {
          this.is_save_timeout = false;
        }, 5000);
      }, 5000);
    },
    openDialogImage() {
      console.log('open dialog image');
    },
    getUser() {
      if (checkRole().name === 'km_manager') {
        this.is_km_manager = true;
      } else {
        this.is_km_manager = false;
      }
    },
    color (cmd, name) {
      const edit = this.$refs.editor_ref;
      this.$refs.textColor.hide();
      edit.caret.restore();
      edit.runCmd(cmd, name);
      edit.focus();
    },
    getWord(s, pos) {
      const n = s.substring(pos).match(/^[a-zA-Z0-9-_]+/);
      const p = s.substring(0, pos).match(/[a-zA-Z0-9-_]+$/);
      // if you really only want the word if you click at start or between
      // but not at end instead use if (!n) return
      if (!p && !n) {
        return '';
      }
      return (p || '') + (n || '');
    },
    getCaretPosition() {
      let caretPos = 0;
      if (window.getSelection) { // ie11 10 9 ff safari
        const range = window.getSelection();
        caretPos = range.focusOffset;
        return caretPos;
      }
      return caretPos;
    },
    doClick(evt) {
      const position = this.getCaretPosition();
      const word = this.getWord(evt.target.textContent, position);
      console.log(word);
      // console.log(this.editor);
    },
    filterCollab (val, update, abort) {
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.collab_option = [];
          } else {
            this.collab_option = [];
            const loginId = getLoginId();
            const collabId = this.collab_list.map(m => m.users_id);
            SearchDataAutocomplete({ includes: 'user', keyword: val.toLowerCase() }).then(response => {
              const hasil = response.data.filter(f => {
                return f.users_id !== loginId;
              });
              if (hasil.length < 1) {
                const datanotfound = [{
                  name: 'Data not found',
                  disable: true
                }];
                this.collab_option = datanotfound;
              } else {
                this.collab_option = hasil.map(item => {
                  if (item.user) {
                    if (collabId.includes(item.user.id)) {
                      return {
                        id: item.user.id,
                        name: item.user.name,
                        disable: true,
                        tag: 'already added'
                      };
                    }
                    return {
                      id: item.user.id,
                      name: item.user.name
                    };
                  }
                  return undefined;
                }).filter(item => item !== undefined);
              }
              this.$refs.collab.refresh();
            });
          }
        });
      }, 500);
    },
    addCollab() {
      if (this.collab_list.length < 5) {
        this.collab_list.push({ users_id: this.post_collaboration.id, name: this.post_collaboration.name });
      } else {
        this.$q.notify({
          message: 'Maksimum collab 5 member',
          timeout: 2000,
          color: 'warning',
          icon: 'info',
          caption: 'Error',
          position: 'bottom'
        });
      }
      setTimeout(() => {
        this.post_collaboration = [];
      }, 500);
    },
    deletePerson(index, type) {
      if (type === 'collab') {
        this.collab_list.splice(index, 1);
      }
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true;

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ];
    }
  },
  mounted() {
    this.optionChannel();
    if (this.$route.name === 'edit-article') {
      this.postDetail();
    }
    this.getUser();
    // const editor = document.getElementsByClassName('q-editor__content')[0];
    // editor.addEventListener('click', this.doClick);
  },
  unmounted() {
    if (this.save_timeout !== undefined) {
      clearTimeout(this.save_timeout);
      this.save_timeout = undefined;
    }
  },
  props: ['is_open', 'data_post', 'heightObserver', 'data_post_init'],
  watch: {
    is_open: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.create_article = value;
        }
      }
    },
    editor: {
      immediate: true,
      // deep: true,
      handler(value) {
        if (value !== undefined) {
          if (value !== '') {
            this.handleAutoSave();
          }
        } else {
          this.editor = '';
        }
      }
    },
    article: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          if (value.title !== '' || value.description !== '') {
            this.handleAutoSave();
          }
        }
      }
    },
    data_post: {
      immediate: true,
      // deep: true,
      handler(value) {
        if (value !== undefined) {
          const file = value.post_file.length > 0 ? value.post_file.map(v => {
            return v.file;
          }) : [];
          const links = value.post_links ? value.post_links.map(v => {
            return v.url;
          }) : [];
          this.article_id = value.id;
          this.article.title = value.title;
          this.article.description = value.description;
          this.editor = value.article;
          this.article_status = value.status;
          this.finish_files = value.post_file;
          this.finish_links = value.post_links;
          this.reference_files = file;
          this.reference_links_have_id = links;
          this.reference_links = links;
          this.reference_links_input = links.join('\n');
          this.post_date = moment(value.created_at).format('YYYY-MM-DD HH:mm');
          this.is_draft = !value.enabled;
        }
      }
    },
    data_post_init: {
      immediate: true,
      // deep: true,
      handler(value) {
        if (value !== undefined) {
          this.editor = value.article;
        }
      }
    },
    heightObserver: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value > 0) {
          let pengurang = 110;
          if (this.finish_files.length > 0 || this.reference_links.length > 0) {
            pengurang = 200;
          }
          this.editor_height = `${value - pengurang}px`;
        }
      }
    }
  },
  computed: {
    changeChannel() {
      const artikelId = this.article_id ? this.article_id : 0;
      const oldChannel = this.data_post ? this.data_post.post_channel.channel_id : 0;
      const newChannel = this.channelValue ? this.listChannel.find(x => {
        return x.labelHtml === this.channelValue;
      }).id : 0;
      const cek = artikelId > 0 && oldChannel > 0 && oldChannel !== newChannel && this.channelValue !== '';
      if (cek) {
        return { value: cek, channel_id: newChannel };
      }
      return { value: cek, channel_id: newChannel };
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

.my-picker {
  width: 200px;
}
</style>
