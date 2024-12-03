<template>
  <!--  <q-dialog v-model="create_article" style="min-width: 80vw" :maximized="true">-->
  <q-card :class="$q.platform.is.mobile ? 'kmp-article-card-mobile' : 'kmp-article-card'" class="bg-white">
    <q-card-section class="q-pa-none">
      <Media v-model="mediaVisible" default-tab="media" useTab="media" @select="onMediaSelect" />
      <Media v-model="attachmentMediaVisible" default-tab="media" @select="onAttachmentMediaSelect" />
      <div class="q-pa-none q-ma-none">
        <div>
          <q-bar class="kmp-bg-color-5 desktop-only" style="padding: 36px 20px; border-bottom: 1px solid #CBCBCB">
            <span class="cursor-pointer text-h6 kmp-text-grey-2 desktop-only" v-close-popup> &lt;&nbsp;&nbsp;Back</span>
            <div v-if="is_save_timeout">
              <span class="q-mx-md text-grey">|</span>
              <q-icon name="check_circle_outline" class="check-icon" color="green" size="16px" style=""/>
              <span class="q-ml-sm text-grey" style="font-size: 12px">Saved on your draft</span>
            </div>
            <q-space/>
            <q-bar class="kmp-bg-color-5">
              <div class="q-mr-md text-grey hidden">
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
              <div class="q-mr-md text-grey hidden">
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
                :label="(publish_at === 'schedule' && scheduled_div >= 30)?'Scheduled':'Publish'"
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
          <div class="row">
            <div class="col-12 q-pa-sm mobile-only">
              <div class="row">
                <div class="col-1 q-mt-xs">
                  <q-icon name="arrow_back" class="" :size="$q.platform.is.mobile ? '20px' : '30px'"
                          style="" v-close-popup/>
                </div>
                <div class="col-11">
                  <q-item-section class="q-ml-sm">
                    <q-item-label class="kmp-text-nama">Create an Article</q-item-label>
                    <q-item-label class="kmp-font-small">#{{channelName}}</q-item-label>
                  </q-item-section>
                </div>
              </div>
              <q-separator class="mobile-only q-mt-sm"/>
            </div>
<!--            <div v-if="$q.platform.is.desktop" class="col-12" style="max-width: 200px">&nbsp;</div>-->
            <!-- border-top: 1px solid #cccccc; -->
            <div :class="$q.platform.is.mobile ? 'col-12 q-pa-md': 'col q-pa-lg'" :style="$q.platform.is.mobile ? '':''">
              <div class="q-mb-md" v-show="article_id">
                <div v-if="article.data.status.toLowerCase() === 'knowledge'" class="kmp-post-status-kmap">
                  <q-icon name="class" class="check-icon" size="16px" style="" />
                  <span class="q-ml-xs q-mt-xs">Knowledge Post</span>
                </div>
                <div v-else-if="article.data.status.toLowerCase() === 'kmap'" class="kmp-post-status-kmap">
                  <q-icon name="class" class="check-icon" size="16px" style="" />
                  <span class="q-ml-xs q-mt-xs">KMAP Post</span>
                </div>
              </div>
              <div class="q-mb-md">
                <span class="kmp-font-sm-2">Title Article</span>
                <q-input dense outlined autogrow
                         placeholder="title of article"
                         v-model="article.data.title"
                />
              </div>
              <div class="q-mb-md">
                <span class="kmp-font-sm-2">Description</span>
                <q-input v-if="$q.platform.is.desktop"
                         dense outlined
                         autogrow
                         placeholder="description of article.."
                         maxlength="4000"
                         v-model="article.data.description"
                />
                <q-input v-if="$q.platform.is.mobile"
                         dense outlined
                         type="textarea"
                         rows="3"
                         label="Description"
                         class="q-mx-xs"
                         placeholder="description of article.."
                         maxlength="4000"
                         v-model="article.data.description"
                />
              </div>
              <div class="q-mb-md">
                <span class="kmp-font-sm-2">Write your article</span>
                <div :style="editorToolbarStyle">
                  <ckeditor v-if="!article.loading" :editor="editor" @ready="onCkeditorReady" v-model="article.data.content"
                            :config="editorConfig"></ckeditor>
                </div>
              </div>
            </div>
            <div class="col q-pa-lg" :style="$q.platform.is.mobile ? 'border-top: 1px solid #cccccc;' : 'max-width: 400px; border-left: 1px solid #cccccc; min-height: 90vh'">
              <div class="kmp-font-lg kmp-font-bold">Summary</div>
              <div class="q-mt-md">
                <div class="kmp-font-sm q-mb-sm">Publish to</div>
<!--                style="color: #0e84b5;max-width: 400px;border-radius: 8px"-->
                <q-select dense outlined options-dense
                          v-model="channelValue"
                          :options="optChannel"
                          behavior="menu"
                          :disable="this.article_id !== null && !this.is_km_manager"
                />
              </div>
              <div class="q-mt-md">
                <div class="kmp-font-sm q-mb-sm">Publish at</div>
                <!--                <div v-if="this.publish_date !== ''" class="kmp-text-blue-2 text-bold cursor-pointer">-->
                <!--                  {{this.publish_date}}  <q-icon name="edit_calendar" class="q-mb-xs hidden" size="20px" />-->
                <!--                </div>-->
                <div>
                  <div class="q-mb-sm"><q-radio dense v-model="publish_at" val="now" label="Now" @input="onSchedule" /></div>
                  <div class="q-mb-sm"><q-radio dense v-model="publish_at" val="schedule" label="Specific Date and Time" @input="onSchedule" /></div>
                  <div class="q-mb-sm" v-if="article.is_scheduled">
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
              </div>

              <q-separator class="q-mt-md" />
              <div class="row items-center q-mt-md justify-between">
                <div class="kmp-font-lg kmp-font-bold">Featured Image</div>
                <div v-if="featured_image_preview !== null" class="kmp-text-blue-2 kmp-font-bold cursor-pointer kmp-font-sm-2" @click="featured_image_preview = null">
                  Clear <q-icon name="cancel" />
                </div>
              </div>
<!--              @click="$refs.ref_featured_image.pickFiles"-->
              <q-banner
                v-if="$refs.ref_featured_image"
                @click="mediaVisible = true"
                class="bg-grey-2 kmp-rounded-2 q-mt-sm justify-center q-pa-none items-center text-center cursor-pointer"
                style="height: 120px; border: 2px dotted #cccccc; overflow: hidden">
                <q-img v-if="featured_image_preview !== null" :src="featured_image_preview" />
                <q-icon v-else name="add_photo_alternate" size="48px" class="text-grey-5" />
              </q-banner>
              <div hidden>
                <q-file ref="ref_featured_image" v-model="featured_image" @input="onFeaturedImage" label="Standard" />
              </div>

              <q-separator class="q-mt-md" />
              <div class="row items-center q-mt-md justify-between">
                <div class="kmp-font-lg kmp-font-bold">Collaboration</div>
                <div v-if="!collab_add" class="kmp-text-blue-2 kmp-font-bold cursor-pointer kmp-font-sm-2" @click="collab_add = true">
                  Add Collabolator <q-icon name="add_circle_outline" />
                </div>
              </div>


              <div v-if="collab_add" class="q-mt-md">
                <div class="row justify-between q-mb-sm">
                  <div class="kmp-font-sm">Search Member</div>
                  <q-badge label="Close" class="cursor-pointer" rounded @click="collab_add = false"></q-badge>
                </div>
                <q-select
                  class="q-mb-sm"
                  v-model="post_collaboration"
                  use-input
                  hide-selected
                  fill-input
                  options-dense
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
                  behavior="menu"
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
              <div class="row q-mt-md">
                <div class="q-pr-sm q-mb-sm" v-for="(item, index) in collab_list" :key="index">
                  <q-card bordered class="q-py-xs q-px-sm kmp-font-sm">
                    <q-tooltip>
                      {{ item.name }}
                    </q-tooltip>
<!--                    <q-icon name="fas fa-file-image" class="" size="12px"/>-->
                    {{ item.name }}
                    <q-btn flat round dense icon="close" size="xs" @click="deletePerson(index, 'collab')"/>
                  </q-card>
                </div>

<!--                <div class="q-pr-sm" v-for="(person, index) in collab_list" :key="`C${index}`">-->
<!--                  <span><q-badge color="blue" rounded class="q-pa-xd"><q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">{{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>-->
<!--                  <q-btn flat round icon="close" size="sm" @click="deletePerson(index, 'collab')"/>-->
<!--                </div>-->
              </div>

              <q-separator class="q-mt-md" />

              <div class="row items-center q-mt-md justify-between">
                <div class="kmp-font-lg kmp-font-bold">Attachment</div>
                <div v-if="!reference_add" class="kmp-text-blue-2 kmp-font-bold kmp-font-sm-2 cursor-pointer" @click="reference_add = true">
                  Add File <q-icon name="add_circle_outline" />
                </div>
              </div>

              <div v-if="reference_add">
                <div class="q-mt-sm row justify-between items-center q-mb-sm">
                  <div class="q-gutter-sm">
                    <q-radio v-model="reference_selected" size="28px" class="kmp-font-sm-2" val="link" label="Link"/>
                    <q-radio v-model="reference_selected" size="28px" class="kmp-font-sm-2" val="files" label="Files"/>
                  </div>
                  <div>
                    <q-badge label="Close" size="10px" class="cursor-pointer" rounded @click="reference_add = false"></q-badge>
                  </div>
                </div>
                <div class="q-pt-none" v-if="reference_selected === 'link'">
                  <q-input dense
                           outlined
                           type="textarea"
                           v-model="reference_links_input"
                           placeholder="seperate with new line.."
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
                </div>
                <div class="q-pt-none" v-if="reference_selected === 'files'">
                  <q-btn unelevated no-caps color="primary" class="full-width" @click="attachmentMediaVisible = true">Select Files</q-btn>
<!--                  <q-uploader-->
<!--                    @added="handleUploadFile"-->
<!--                    ref="uploader"-->
<!--                    label="Max file size 100MB"-->
<!--                    multiple-->
<!--                    batch-->
<!--                    style="width: 100%"-->
<!--                    class="shadow-0 q-uploader&#45;&#45;bordered kmp-rounded-2"-->
<!--                  />-->
                </div>
              </div>

              <div class="row q-mt-md">
                <div class="q-pr-sm q-mb-sm full-width" v-for="(item, index) in finish_files" :key="index">
                  <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" >
                    <q-tooltip>
                      {{ item.file.filename }}
                    </q-tooltip>
                    <div class="row justify-between">
                      <div>
                        <q-icon name="fas fa-file-image" class="" size="12px"/>
                        <!--                      <q-icon name="fas fa-link" class="" size="12px"/>-->
                        {{ item.file.filename.replace(`.${item.file.filemime}`, '').substr(0, 35) }}
                        {{ (item.file.filename.replace(`.${item.file.filemime}`, '').length > 35)?'...':''}}
                        {{ item.file.filemime }}
                      </div>
                      <q-btn flat round dense icon="close" size="xs" @click="handleDeleteFile(item, index)"/>
                    </div>
                  </q-card>
                </div>
                <div class="q-pr-sm q-mb-sm full-width" v-for="(item, index) in reference_links" :key="`L${index}`">
                  <q-card bordered class="q-py-xs q-px-sm kmp-font-sm">
                    <q-tooltip>
                      {{ item }}
                    </q-tooltip>
                    <div class="row justify-between">
                      <div>
                        <q-icon name="fas fa-link" class="" size="12px"/>
                        {{ item.substr(0, 35) }}
                        {{ (item.length > 35)?'...':''}}
                      </div>
                      <q-btn flat round dense icon="close" size="xs" @click="handleDeleteLinks(item, index)"/>
                    </div>
                  </q-card>
                </div>
              </div>
              <q-separator class="q-mt-md" />

              <q-btn
                unelevated
                color="primary"
                label="Publish"
                class="q-mr-md mobile-only float-right q-mt-lg"
                @click="handleConfirmPost"
                size="md"
              />

            </div>
          </div>

          <q-bar class="hidden kmp-bg-color-5 mobile-only q-py-lg"  style="min-height:60px">
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
          <div class="hidden q-py-md q-px-md kmp-bg-color-8">
            <div class="row">
              <div :class="$q.platform.is.mobile ? 'col-12 col-md-4 q-mb-md' : 'col-12 col-md-4'">
                <q-input dense outlined autogrow
                         label="Title"
                         class="q-mx-xs"
                         placeholder="title of article"
                         v-model="article.data.title"
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
                         v-model="article.data.description"
                />
                <q-input v-if="$q.platform.is.mobile"
                         dense outlined
                         type="textarea"
                         rows="3"
                         label="Description"
                         class="q-mx-xs"
                         placeholder="description of article.."
                         maxlength="4000"
                         v-model="article.data.description"
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
          <div class="hidden row">
            <!--          <div class="col-2">-->
            <!--            &nbsp;-->
            <!--          </div>-->
            <div class="col-12" style="background-color: #EBEBEB;">
              <div style="background-color: #EBEBEB; line-height: 32px; border-bottom: solid 1px #CBCBCB">&nbsp;</div>
              <div style="border-bottom: solid 1px #CBCBCB">
<!--                <q-editor-->
<!--                  style="background-color: #ffffff;border: 0px; margin-top: -32px;"-->
<!--                  ref="editor_ref"-->
<!--                  :dense="$q.screen.lt.md"-->
<!--                  v-model="editor"-->
<!--                  @paste.native="evt => pasteCapture(evt)"-->
<!--                  @drop.native="evt => dropCapture(evt)"-->
<!--                  :height="editor_height"-->
<!--                  toolbar-bg="grey-3"-->
<!--                  placeholder="start texting here.."-->
<!--                  :definitions="{-->
<!--              upload: {-->
<!--                tip: 'Upload Audio, Image or Video',-->
<!--                icon: 'image',-->
<!--                label: 'Insert Media',-->
<!--                handler: uploadMedia-->
<!--              },-->
<!--              upload_file: {-->
<!--                tip: 'References',-->
<!--                icon: 'description',-->
<!--                label: 'References',-->
<!--                handler: uploadFile-->
<!--              },-->
<!--              collaboration: {-->
<!--                tip: 'Collaboration',-->
<!--                icon: 'group',-->
<!--                label: 'Collaboration',-->
<!--                handler: () => {add_collab = true}-->
<!--              },-->
<!--            }"-->
<!--                  :toolbar="[-->
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
<!--                        ['upload','upload_file'],-->
<!--                        ['collaboration']-->
<!--                      ]"-->
<!--                >-->
<!--                  <template v-slot:textColor>-->
<!--                    <q-btn-dropdown dense no-caps ref="textColor" no-wrap unelevated color="grey-3" text-color="primary" label="Text Color" size="sm">-->
<!--                      <q-list dense>-->
<!--                        <q-item tag="label" clickable @click="color('foreColor', foreColor)">-->
<!--                          <q-item-section>-->
<!--                            <q-color hidden v-model="foreColor" no-header no-footer default-view="palette" class="my-picker"-->
<!--                                     :palette="[-->
<!--                                      '#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff',-->
<!--                                      '#ffffff', '#cdcdcd', '#b2b2b2', '#999999', '#7f7f7f', '#666666', '#4c4c4c', '#333333', '#191919', '#000000'-->
<!--                                     ]"-->
<!--                            />-->
<!--                            <q-color v-model="foreColor" no-header no-footer default-view="palette" class="my-picker" />-->
<!--                          </q-item-section>-->
<!--                        </q-item>-->
<!--                      </q-list>-->
<!--                    </q-btn-dropdown>-->
<!--                  </template>-->
<!--                </q-editor>-->
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
      <q-card style="width: 500px">
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
          <q-btn unelevated :label="(publish_at === 'schedule' && scheduled_div >= 30)?'Scheduled':'Publish'" color="primary" @click="handleSavePost(false)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- <q-page-sticky class="mobile-only q-ma-none" position="bottom-right" :offset="fabPos">
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
    </q-page-sticky> -->
  </q-card>
  <!--  </q-dialog>-->

</template>

<script>
import { Notify, date } from 'quasar';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { checkRole, deleteList, getLoginId, getUserLogin } from 'src/lib/helper';
import {
  channelList,
  fileUpload,
  postCreate,
  postFileCreate,
  postUpdate,
  postDetail,
  postLinksCreate,
  postLinksDelete,
  SearchDataAutocomplete,
  channelMemberLatest, postFileDelete
} from 'src/lib/api';
import moment from 'moment';
import _ from 'lodash';
import { getCredential } from 'src/lib/storage';
import { point } from 'src/lib/point';
import Media from 'components/media/Media.vue';
// import Editor from "ckeditor5-custom-build";
// import KnowledgeListFile from 'components/KnowledgeListFile';
// import Player from 'components/common/Player';

const timeStamp = Date.now();

export default {
  components: { Media },
  data() {
    return {
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
          'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
          'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|', 'outdent', 'indent', '|', 'numberedList', 'bulletedList', '|',
          // {
          //   label: 'Font',
          //   icon: 'text',
          //   items: ['fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor']
          // },
          // {
          //   label: 'Align Text',
          //   icon: 'alignLeft',
          //   items: ['alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|', 'outdent', 'indent', '|', 'numberedList', 'bulletedList']
          // }, '|',
          'imageInsert', 'mediaEmbed', '|',
          'insertTable', 'blockQuote', 'link', 'specialCharacters', 'horizontalLine', '|',
          // {
          //   label: 'Insert',
          //   icon: 'plus',
          //   items: ['insertTable', 'blockQuote', 'link', 'specialCharacters', 'horizontalLine']
          // }, '|',
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

      mediaVisible: false,
      attachmentMediaVisible: false,

      article: {
        data: {
          title: '',
          description: '',
          status: '',
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
          { value: 6, label: 'Profile', icon: 'person' }
        ],
        guide_selected: { value: 1, label: 'Dashboard' },
        role_options: [
          { value: 1, label: 'Member' },
          { value: 3, label: 'KM Manager' },
          { value: 5, label: 'Content Manager' },
          { value: 4, label: 'Channel Manager' }
        ],
        role_selected: { value: 1, label: 'Member' },
        role_view_selected: { value: 1, label: 'Member' },
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
        roles: ['admin', 'content_manager', 'km_manager'],
        is_scheduled: false,
        scheduled_div: 0
      },

      featured_image: null,
      featured_image_id: 0,
      featured_image_preview: null,
      publish_at: 'now',
      publish_date: '',
      article_id: null,
      article_status: 'Draft',
      profile_picture: getUserLogin().profile_picture ? process.env.QUASAR_API_URL + getUserLogin().profile_picture : null,
      profile_name: getUserLogin().name,
      profile_id: getUserLogin().id,
      listChannel: [],
      optChannel: [],
      channelValue: '',
      // editor: '<h6 id="title" style="text-align: left;">Title article</h6><div><br></div>',
      // editor: '',
      reference: '<div><br><h5>References</h5></div>',
      loading_upload: false,
      add_files: false,
      add_media: false,
      add_collab: false,
      post_collaboration: [],
      collab_option: [],
      collab_list: [],
      collab_add: false,
      reference_add: false,
      create_article: false,
      embed_youtube: false,
      link_youtube: '',
      post_date: date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm'),
      save_timeout: undefined,
      is_save_timeout: false,
      reference_selected: 'files',
      reference_links_input: '',
      // article: {
      //   title: '',
      //   description: ''
      // },
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
      fab: true,
      channelName: ''
    };
  },
  // components: { Player },
  methods: {
    onAttachmentMediaSelect(data) {
      data.forEach(x => {
        this.finish_files.push(
          { file: x.item }
        );
      });
    },
    onMediaSelect(data) {
      const filterData = data.filter(x => ['png', 'jpg', 'jpeg'].includes(x.item.filemime.toLowerCase()));
      if (filterData.length > 0) {
        this.featured_image_preview = filterData[0].thumb;
        this.featured_image_id = filterData[0].id;
      } else {
        Notify.create({
          message: 'Please select image for featured image.',
          timeout: 2000,
          type: 'positive',
          color: 'negative',
          icon: 'check'
        });
      }
    },
    onFeaturedImage(data) {
      this.featured_image_preview = URL.createObjectURL(data);
    },
    onSchedule(data) {
      const currentdate = new Date();
      if (this.publish_at === 'now') {
        this.post_date = `${moment(new Date()).format('YYYY-MM-DD HH:mm')}:00`;
      }
      this.scheduled_div = Math.trunc((new Date(this.post_date) - currentdate) / 1000 / 60);
      this.article.is_scheduled = data === 'schedule';
    },
    onCkeditorReady() {
      setTimeout(() => {
        this.editorToolbarStyle = {
          // width: '720px'
          width: '600px'
        };
        setTimeout(() => {
        // this.article.loading = false;
          this.editorToolbarStyle = {
            width: '100%'
          };
        }, 500);
      }, 100);
    },
    onGuidelineDialogShow() {
      this.editorToolbarStyle = {
        width: '500px'
      };
      setTimeout(() => {
        // this.article.loading = false;
        this.editorToolbarStyle = {
          width: '100%'
        };
      }, 2000);
    },
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
          // arrayOption.push(`<span class="text-weight-bold">${v.name}</span>`);
          arrayOption.push(`<span class="">${v.name}</span>`);
        });
        const list = mapData.map(v => (
          {
            id: v.id,
            name: 'channel',
            label: v.name,
            type: v.channel_type,
            // labelHtml: `<span class="text-weight-bold">${v.name}</span>`
            labelHtml: `<span class="">${v.name}</span>`
          }
        ));
        this.listChannel = list;
        this.optChannel = arrayOption;
        const postChannel = !_.isEmpty(this.$route.params) ? this.$route.params.id.toString() : this.data_post.post_channel.channel_id.toString();
        const idx = list.findIndex(v => v.id.toString() === postChannel);
        // this.channelValue = `<span class="text-primary text-weight-bold">${list[idx].label}</span>`;
        this.channelName = list[idx].label;
        this.channelValue = `<span class="">${list[idx].label}</span>`;
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

      if (!this.is_draft) {
        if (this.article.data.title === '' || this.article.data.title === undefined) {
          Notify.create({
            message: 'Title of article is empty',
            timeout: 1000,
            type: 'negative'
          });
        } else if (this.article.data.description === '' || this.article.data.description === undefined) {
          Notify.create({
            message: 'Description of article is empty',
            timeout: 1000,
            type: 'negative'
          });
        } else if (this.article.data.content === '' || this.article.data.content === undefined) {
          Notify.create({
            message: 'Content of article is empty',
            timeout: 1000,
            type: 'negative'
          });
        } else {
          this.handlePost(this.is_draft ? 'Draft' : 'Unverified', '');

          this.featured_image = null;
          this.featured_image_preview = null;

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
        }
      }
    },
    handlePostTest(status, type) {
      // const dataPost = {
      //   created_by: getLoginId(),
      //   post_type: 'Article',
      //   created_at: this.article.is_scheduled ? `${this.post_date}:00` : `${moment(new Date()).format('YYYY-MM-DD HH:mm')}:00`,
      //   title: this.article.data.title,
      //   description: this.article.data.description,
      //   article: this.article.data.content,
      //   enabled: !this.is_draft,
      //   status: 'Unverified',
      //   channel_id: this.listChannel.find(x => {
      //     return x.labelHtml === this.channelValue;
      //   }).id,
      //   post_collaboration: this.collab_list,
      //   channel_type: this.listChannel.find(v => { return v.labelHtml === this.channelValue; }).type
      // };
    },
    async handlePost(status, type) {
      let featured_image_id = null;
      // if (this.featured_image !== null) {
      //   const formData = new FormData();
      //   formData.append('file[]', this.featured_image);
      //   await fileUpload(formData).then(res => {
      //     if (res.data.length > 0) featured_image_id = res.data[0].id;
      //   });
      // } else
      if (this.featured_image_id !== 0) {
        featured_image_id = this.featured_image_id;
      }

      if (!this.article_id) {
        const dataPost = {
          created_by: getLoginId(),
          post_type: 'Article',
          created_at: this.article.is_scheduled ? `${this.post_date}:00` : `${moment(new Date()).format('YYYY-MM-DD HH:mm')}:00`,
          title: this.article.data.title,
          description: this.article.data.description,
          article: this.article.data.content,
          enabled: !this.is_draft,
          status: 'Unverified',
          channel_id: this.listChannel.find(x => {
            return x.labelHtml === this.channelValue;
          }).id,
          post_collaboration: this.collab_list,
          channel_type: this.listChannel.find(v => {
            return v.labelHtml === this.channelValue;
          }).type,
          featured_image: featured_image_id
        };
        postCreate(dataPost).then(res => {
          const response = res.data;
          if (res.message === 'OK') {
            if (dataPost.enabled === true) {
              if (dataPost.channel_type === 'Project') {
                point('add', { tag: 'post_project', post_id: response.id });
              } else {
                point('add', { tag: 'post_general', post_id: response.id });
              }
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
          created_at: this.article.is_scheduled ? `${this.post_date}:00` : `${moment(new Date()).format('YYYY-MM-DD HH:mm')}:00`,
          title: this.article.data.title,
          description: this.article.data.description,
          article: this.article.data.content,
          enabled: !this.is_draft,
          status: this.article.data.status,
          channel_id: this.listChannel.find(x => {
            return x.labelHtml === this.channelValue;
          }).id,
          post_collaboration: this.collab_list,
          channel_type: this.listChannel.find(v => {
            return v.labelHtml === this.channelValue;
          }).type,
          featured_image: featured_image_id
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
            // const new_file = this.finish_files.filter(w => {
            //   return w.id === undefined;
            // });
            postFileDelete({ state: 'all' }, this.article_id).then();
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
            // new_file.forEach((v, i) => {
            //   const idx = this.finish_files.findIndex(x => x.file.id === v.file.id);
            //   postFileCreate({
            //     created_by: response.created_by,
            //     enabled: true,
            //     post_id: response.id,
            //     file_id: v.file.id
            //   }).then(res1 => {
            //     this.finish_files[idx].id = res1.data.id;
            //     this.reference_files.push(
            //       { file: res1.data[0] }
            //     );
            //   });
            // });
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
        if (dataPost.channel_type === 'General') {
          channelMemberLatest({ id: this.profile_id, type: 'General' });
        } else {
          channelMemberLatest({ id: dataPost.channel_id, type: 'Channel' });
        }
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
      // const file_id = data.file.id;
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this File?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // fileDelete(file_id).then(res => {
        //   if (res.message === 'OK') {
        //     Notify.create({
        //       message: 'Delete file berhasil.',
        //       timeout: 1000,
        //       type: 'positive',
        //       color: 'positive',
        //       icon: 'check'
        //     });
        //   }
        // });
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
      if (!(this.article.data.title === '' || this.article.data.title === undefined || this.article.data.content === '' || this.article.data.content === undefined)) {
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
      }
    },
    openDialogImage() {
      // console.log('open dialog image');
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
                        name: item.user.name.toUpperCase(),
                        disable: true,
                        tag: 'already added'
                      };
                    }
                    return {
                      id: item.user.id,
                      name: item.user.name.toUpperCase()
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
    // this.onGuidelineDialogShow();
    this.optionChannel();
    if (this.$route.name === 'edit-article') {
      this.postDetail();
    }
    this.getUser();
    // const editor = document.getElementsByClassName('q-editor__content')[0];
    // editor.addEventListener('click', this.doClick);
  },
  destroyed() {
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
    post_date: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          const currentdate = new Date();
          // if (this.publish_at === 'now') {
          //   this.post_date = `${moment(new Date()).format('YYYY-MM-DD HH:mm')}:00`;
          // }
          this.scheduled_div = Math.trunc((new Date(this.post_date) - currentdate) / 1000 / 60);
        }
      }
    },
    // editor: {
    //   immediate: true,
    //   // deep: true,
    //   handler(value) {
    //     // if (value !== undefined) {
    //     //   if (value !== '') {
    //     //     this.handleAutoSave();
    //     //   }
    //     // } else {
    //     //   this.editor = '';
    //     // }
    //   }
    // },
    article: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          if (value.data.title !== '' || value.data.description !== '') {
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
          this.collab_list = value.post_collaboration.map(x => {
            return { users_id: x.user.id, name: x.user.name };
          });
          this.featured_image_id = 0;
          this.featured_image_preview = null;
          if (value.featured_image_file !== null) {
            this.featured_image_id = value.featured_image;
            this.featured_image_preview = `./api/${value.featured_image_file.path}`;
          }
          const file = value.post_file.length > 0 ? value.post_file.map(v => {
            return v.file;
          }) : [];
          const links = value.post_links ? value.post_links.map(v => {
            return v.url;
          }) : [];
          this.article_id = value.id;
          this.article.data.title = value.title;
          this.article.data.description = value.description;
          this.article.data.status = value.status;
          this.article.data.content = value.article_isi;
          // this.editor = value.article;
          this.article_status = value.status;
          this.finish_files = value.post_file;
          this.finish_links = value.post_links;
          this.reference_files = file;
          this.reference_links_have_id = links;
          this.reference_links = links;
          this.reference_links_input = links.join('\n');
          this.post_date = moment(value.created_at).format('YYYY-MM-DD HH:mm');
          // this.publish_date = moment(value.created_at).format('D MMMM YYYY HH:mm');
          this.publish_at = 'schedule';
          this.article.is_scheduled = true;
          this.is_draft = !value.enabled;
        }
      }
    },
    data_post_init: {
      immediate: true,
      // deep: true,
      handler(value) {
        // if (value !== undefined) {
        //   this.editor = value.article;
        // }
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
.ck.ck-editor__editable {
  height: 400px;
}

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
