<template>
  <div style="margin-top: 50px">
    <div :class="$q.platform.is.mobile ? 'q-pb-sm' : 'q-pb-md q-pr-lg'">
      <q-card class="kmp-card-rounded q-pa-md">
        <div class="row q-mb-md">
          <div class="col-12 col-lg-8">
            <div class="row items-center cursor-pointer" style="margin-top: 10px"
              @click="opendialogs('select_directorat')">
              <q-icon name="domain" class="q-mr-sm kmp-text-blue-2" size="20px"/>
              <div>
                <span class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md cursor-pointer">
                  {{ channel_model.label }}
                  <span>
                    <q-icon name="chevron_right" size="20px"/>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="desktop-only col-12 col-lg-4 text-right q-mt-sm kmp-text-blue cursor-pointer" @click="handleDownload(1)">
            <span class="text-weight-bold">Download K-Map</span>
            <q-icon name="download" class="q-ml-sm" size="20px"/>
          </div>
        </div>
        <div class="row q-mb-md">
          <div class="col">
            <q-input ref="filter" outlined dense v-model="filter" placeholder="Search knowledge">
              <!--              <template v-slot:append>-->
              <!--                <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter"/>-->
              <!--              </template>-->
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
        </div>
        <q-separator class="mobile-only"></q-separator>
        <div class="mobile-only col-12 col-lg-4 text-left q-mt-sm q-mb-md kmp-text-blue cursor-pointer" @click="handleDownload(1)">
          <span class="text-weight-bold">Download K-Map</span>
          <q-icon name="download" class="q-ml-sm" size="20px"/>
        </div>

        <!-- <div class="row q-mb-md"> -->
          <!-- <div class="col-12"> -->
        <!-- <div class="row q-mb-none q-mt-lg"> -->
          <!-- <div class="col"> -->
            <!-- <div class="q-ml-sm kmp-channel-select q-mr-md"> -->
              <!--              <q-select borderless v-model="channel_model" :options="channel_options" dense color="#0083C9" fill-input>-->
              <!--                <template v-slot:option="scope">-->
              <!--                  <q-item-->
              <!--                    v-bind="scope.itemProps"-->
              <!--                    v-on="scope.itemEvents"-->
              <!--                  >-->
              <!--                    <q-item-section avatar class="kmp-channel-select-avatar">-->
              <!--                      <q-icon :name="scope.opt.icon" size="16px"/>-->
              <!--                    </q-item-section>-->
              <!--                    <q-item-section>-->
              <!--                      <q-item-label v-html="scope.opt.label"/>-->
              <!--                    </q-item-section>-->
              <!--                  </q-item>-->
              <!--                </template>-->
              <!--              </q-select>-->


                  <!--                  <q-popup-proxy v-model="position_show" transition-show="flip-up" transition-hide="flip-down">-->
                  <!--                    <q-banner style="max-width: 500px; min-height: 0 !important; padding: 0 !important">-->
                  <!--                      <treeselect-->
                  <!--                        v-model="position_value"-->
                  <!--                        :options="position_options"-->
                  <!--                        append-to-body-->
                  <!--                        close-on-select-->
                  <!--                        :clearable="false"-->
                  <!--                        :normalizer="normalizer"-->
                  <!--                        class="vue-treeselect"-->
                  <!--                        @select="positionSelect"-->
                  <!--                      />-->
                  <!--                    </q-banner>-->
                  <!--                  </q-popup-proxy>-->
                <!-- </div> -->
              <!-- </div> -->

            <!-- </div> -->
          <!-- </div> -->
        <!-- </div> -->
        <!--        <div class="row">-->
        <!--          <div class="col">-->
        <!--            <div class="float-right">-->
        <!--              <div class="tabs-tool q-pa-xs" v-bind:class="{ hidden: level4 }" align="justify">-->
        <!--                <q-btn v-if="selected" flat color="primary" icon="mode" class="tools-icon q-mx-sm action-select"-->
        <!--                       @click="opendialogs('edit');"></q-btn>-->
        <!--                <q-btn v-if="selected" flat color="primary" icon="delete" class="tools-icon q-mx-sm action-select"-->
        <!--                       @click="opendialogs('delete');"></q-btn>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <q-tree
          ref="knowledgeTree"
          :nodes="simple"
          node-key="key"
          :filter="filter"
          :selected.sync="selected"
          accordion
          class=""
        >
          <template v-slot:default-header="prop">
            <div class="row items-center kmp-post full-width">
              <div v-if="prop.node.label">
                <div v-if="prop.node.story === 'Unit Kerja'">
                  <q-icon :name="prop.node.icon || 'domain'" size="17px" class="q-mr-sm uk-ico"/>
                </div>
                <div v-else-if="prop.node.story === 'Business Process'">
                  <q-icon :name="prop.node.icon || 'article'" size="17px" class="q-mr-sm bp-ico"/>
                </div>
                <div v-else-if="prop.node.story === 'Strategic Activity'">
                  <q-icon :name="prop.node.icon || 'lightbulb'" size="17px" class="q-mr-sm sa-ico"/>
                </div>
                <div v-else-if="['Core Knowledge','Basic Knowledge'].includes(prop.node.story)">
                  <q-icon :name="prop.node.icon || 'content_paste'" size="17px" class="q-mr-sm ck-ico"/>
                </div>
                <div v-else-if="['Advance Knowledge'].includes(prop.node.story)">
                  <q-icon :name="prop.node.icon || 'receipt_long'" size="17px" class="q-mr-sm ck-ico"/>
                </div>
                <div v-else-if="['Innovative Knowledge'].includes(prop.node.story)">
                  <q-icon :name="prop.node.icon || 'document_scanner'" size="17px" class="q-mr-sm ck-ico"/>
                </div>
                <div v-else>
                  <div v-if="prop.node.label === 'Subject Matter Expert'">
                    <q-icon :name="prop.node.icon || 'group'" size="17px" class="q-mr-sm child-ico"/>
                  </div>
                  <div v-else-if="prop.node.label === 'Explicit Knowledge'">
                    <q-icon :name="prop.node.icon || 'attach_file'" size="17px" class="q-mr-sm child-ico"/>
                  </div>
                  <div v-else-if="prop.node.label === 'Best Practice'">
                    <q-icon :name="prop.node.icon || 'format_list_bulleted'" size="17px" class="q-mr-sm child-ico"/>
                  </div>
                  <div v-else-if="prop.node.label === 'Development Needed'">
                    <q-icon :name="prop.node.icon || 'insert_chart'" size="17px" class="q-mr-sm child-ico"/>
                  </div>
                  <div v-else-if="prop.node.level === 93">
                    <q-icon :name="prop.node.icon || 'add'" size="17px" class="q-mr-sm child-ico ck-add"/>
                  </div>
                  <div v-else-if="prop.node.level === 92">
                    <q-icon :name="prop.node.icon || 'add'" size="17px" class="q-mr-sm child-ico sa-add"/>
                  </div>
                  <div v-else-if="prop.node.level === 91">
                    <q-icon :name="prop.node.icon || 'add'" size="17px" class="q-mr-sm child-ico bp-add"/>
                  </div>
                </div>
              </div>
              <div v-if="prop.node.add_label">
                <div class="text-weight-bold title-tree text-capitalize">{{ prop.node.add_label }}</div>
              </div>
              <div v-if="prop.node.label">
                <div class="title-tree text-capitalize" v-if="$q.platform.is.mobile && prop.node.level !== 3">
                  {{ prop.node.label }}
                  <q-btn-group class="q-ml-sm"
                               v-if="isAuthorized() && selected === prop.node.key && prop.node.level !== 0 && prop.node.level !== 4 && prop.node.level < 90"
                               push flat>
                    <q-btn flat dense color="primary" icon="mode"
                           class="tools-icon q-ma-none action-select"
                           @click="opendialogs('add');"></q-btn>
                    <q-btn flat dense color="primary" icon="delete"
                           class="tools-icon q-ma-none action-select"
                           @click="opendialogs('delete');"></q-btn>
                  </q-btn-group>
                  <br>
                  <span class="subtitle-tree text-capitalize">{{ prop.node.story }}</span>
                </div>
                <div class="title-tree text-capitalize" v-if="$q.platform.is.mobile && prop.node.level === 3" @click="opendialogsKnowledge(prop.node.parent_id);">
                  {{ prop.node.label }}
                  <br>
                  <span class="subtitle-tree text-capitalize">{{ prop.node.story }}</span>
                </div>
                <div class="title-tree text-capitalize" v-if="$q.platform.is.desktop">
                  <div class="row justify-between full-width">
                    <div>
                      {{ prop.node.label }}
                      <span v-if="prop.node.level === 3 && prop.node.count_knowledge > 0" class="q-mr-xs">
                        <q-tooltip>Document</q-tooltip>
                        <q-icon
                        class="q-mb-xs text-grey-7"
                        name="assignment_turned_in" size="14px" /> {{prop.node.count_knowledge}}</span>
                      <span v-if="prop.node.level === 3 && prop.node.count_sme > 0" class="q-mr-xs">
                        <q-tooltip>SME</q-tooltip>
                        <q-icon
                        class="q-mb-xs text-grey-7"
                        name="assignment_ind" size="14px" /> {{prop.node.count_sme}}</span>
                    </div>
                    <q-space />
                    <div>
                      <q-icon
                        class="q-mb-xs text-grey-7 q-ml-xs"
                        v-if="!prop.node.knowledge_audience && prop.node.story === 'Business Process'"
                        name="o_lock" size="14px" />
<!--                      selected === prop.node.key &&-->
                      <span v-if="isAuthorized() && prop.node.level !== 0 && prop.node.level !== 4 && prop.node.level < 90"
                            class="font-weight-light">
                        <q-icon
                        class="q-mb-xs q-ml-xs kmp-post-button text-primary"
                        name="pending" size="16px" >
<!--                          <q-tooltip>Edit / Delete</q-tooltip>-->
                          <q-popup-proxy :offset="[-16, -16]">
                            <q-list dense bordered class="rounded-borders">
                              <q-item clickable v-ripple dense style="min-height: 24px; padding: 0px 12px;"
                                      @click="opendialogs('add');" v-close-popup>
                                <q-item-section>
                                  <span><q-icon name="edit" /> Edit</span>
                                </q-item-section>
                              </q-item>
                              <q-item clickable v-ripple dense style="min-height: 24px; padding: 0px 12px;"
                                      @click="opendialogs('delete');" v-close-popup>
                                <q-item-section>
                                  <span><q-icon name="delete" /> Delete</span>
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-popup-proxy>
                        </q-icon>
                      </span>
<!--                      <q-btn-group class="q-ml-sm"-->
<!--                                   v-if="isAuthorized() && selected === prop.node.key && prop.node.level !== 0 && prop.node.level !== 4 && prop.node.level < 90"-->
<!--                                   push flat>-->
<!--                        <q-btn flat dense color="primary" icon="mode"-->
<!--                               class="tools-icon q-ma-none action-select"-->
<!--                               @click="opendialogs('add');"></q-btn>-->
<!--                        <q-btn flat dense color="primary" icon="delete"-->
<!--                               class="tools-icon q-ma-none action-select"-->
<!--                               @click="opendialogs('delete');"></q-btn>-->
<!--                      </q-btn-group>-->
                    </div>
                  </div>
                  <span class="subtitle-tree text-capitalize">{{ prop.node.story }}</span>
                </div>
              </div>
            </div>
            <q-space></q-space>
            <div class="text-primary item-right mobile-only"><q-icon v-if="prop.node.story === 'Unit Kerja'" name="info_outline" class="text-right q-ml-sm" size="20px" @click="changeInfoKmap()"/></div>
          </template>
        </q-tree>
        <q-inner-loading :showing="card_visible">
          <q-spinner size="50px" color="primary"/>
        </q-inner-loading>
      </q-card>
    </div>
    <q-dialog v-model="select_directorat" persistent>
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-leaderboard-mobile' : 'kmp-modal-leaderboard'">
        <q-card-section class="row items-center q-pb-none">
          <div class="kmp-font-lg kmp-font-bold">Select Directorate</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup size="sm"/>
        </q-card-section>

        <q-card-section class="q-pb-none">
          <q-input ref="direktorat_filter" outlined dense v-model="direktorat_filter" debounce="500" placeholder="Search Unit Kerja">
            <template v-slot:append>
              <q-icon name="close" v-if="direktorat_filter !== ''" @click="direktorat_filter = ''"
                      class="cursor-pointer"/>
              <q-icon name="search" v-if="direktorat_filter === ''"/>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-scroll-area :class="$q.platform.is.mobile ? 'kmp-org-kmap-mobile' : 'kmp-org-kmap'">
            <q-tree
              ref="direktoratTree"
              :nodes="direktorat_tree"
              node-key="label"
              accordion
              :expanded.sync="direktorat_expanded"
              :selected.sync="direktorat_selected"
              :filter="direktorat_filter"
              :filter-method="onDirectorateFilter"
              @update:selected="onDirectorateSelected"
            >
              <template v-slot:default-header="prop">
                <div v-if="channel_model.label.toLowerCase() === prop.node.label.toLowerCase()"
                     class="row items-center cursor-pointer">
                  <div class="q-mr-sm">
                    <q-icon :name="prop.node.icon || 'domain'" size="17px" class="kmp-text-blue-2"/>
                  </div>
                  <div class="title-tree text-capitalize kmp-text-blue-2">
                    {{ prop.node.label }}
                  </div>
                </div>
                <div v-if="channel_model.label.toLowerCase() !== prop.node.label.toLowerCase()"
                     class="row items-center cursor-pointer">
                  <div class="q-mr-sm">
                    <q-icon :name="prop.node.icon || 'domain'" size="17px" class=""/>
                  </div>
                  <div class="title-tree text-capitalize">
                    {{ prop.node.label }}
                  </div>
                </div>
              </template>
            </q-tree>
          </q-scroll-area>
        </q-card-section>

        <!--        <q-card-actions align="right" class="text-primary">-->
        <!--          <q-btn class="btn-primary-color float-right q-mr-sm q-mb-sm" label="Select" unelevated v-close-popup />-->
        <!--        </q-card-actions>-->
      </q-card>
    </q-dialog>
    <q-dialog v-model="add_tree" persistent>
      <q-card :style="$q.platform.is.mobile ? 'min-width: 350px' : 'min-width: 500px'" class="q-py-md q-px-sm">
        <q-card-section>
          <div class="text-h6">Add {{ type }}</div>
          <div v-if="type === 'Business Process'">Diisi dengan proses bisnis yang harus dilakukan untuk mencapai tujuan / prioritas / target unit kerja.</div>
          <div v-if="type === 'Strategic Activity'">Diisi dengan aktivitas yang dilakukan dalam proses bisnis dan memiliki dampak terhadap pencapaian tujuan unit kerja.</div>
          <div v-if="type === 'Knowledge' && knowledge_type_model === 'Basic Knowledge'">Pengetahuan yang dibutuhkan pegawai untuk dapat bekerja dengan baik, namun tidak memiliki nilai tambah.</div>
          <div v-if="type === 'Knowledge' && knowledge_type_model === 'Advance Knowledge'">Pengetahuan ini didapat dari pengalaman kerja dan memiliki nilai tambah yang tinggi bagi organisasi.</div>
          <div v-if="type === 'Knowledge' && knowledge_type_model === 'Innovative Knowledge'">Pengetahuan yang didapatkan dari pengalaman kerja yang dikembangkan dan diberikan nilai tambah melalui proses belajar bersama.</div>
        </q-card-section>

        <q-card-section v-if="type === 'Knowledge'" class="q-pt-none">
          <div class="text-subtitle">Knowledge Type</div>
          <q-select
            v-model="knowledge_type_model"
            :options="['Basic Knowledge', 'Advance Knowledge', 'Innovative Knowledge']"
            outlined
            dense
          >
          </q-select>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle">{{ type }} Title</div>
          <q-input dense v-model="title" outlined autofocus @keyup.enter="add_tree = false"/>
        </q-card-section>

        <q-card-section v-if="type === 'Business Process'" class="q-pt-none">
          <div class="text-subtitle">KMAP Audience</div>
          <q-select
            v-model="knowledge_audience"
            :options="[
              { label: 'Private - Only your directorate can access', value: false},
              { label: 'Public - All directorate member can access', value: true},
              ]"
            outlined
            dense
          >
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <div>{{knowledge_audience.label}}</div>
              </div>
            </template>
          </q-select>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated v-close-popup
                 @click='saveTree();'/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="edit_tree">
      <q-card :style="$q.platform.is.mobile ? 'min-width: 400px' : 'min-width: 500px'" class="q-py-md q-px-sm">
        <q-card-section>
          <div class="text-h6">Edit {{ type }}</div>
          <div v-if="type === 'Business Process'">Diisi dengan proses bisnis yang harus dilakukan untuk mencapai tujuan / prioritas / target unit kerja.</div>
          <div v-if="type === 'Strategic Activity'">Diisi dengan aktivitas yang dilakukan dalam proses bisnis dan memiliki dampak terhadap pencapaian tujuan unit kerja.</div>
          <div v-if="type === 'Knowledge' && knowledge_type_model === 'Basic Knowledge'">Pengetahuan yang dibutuhkan pegawai untuk dapat bekerja dengan baik, namun tidak memiliki nilai tambah.</div>
          <div v-if="type === 'Knowledge' && knowledge_type_model === 'Advance Knowledge'">Pengetahuan ini didapat dari pengalaman kerja dan memiliki nilai tambah yang tinggi bagi organisasi.</div>
          <div v-if="type === 'Knowledge' && knowledge_type_model === 'Innovative Knowledge'">Pengetahuan yang didapatkan dari pengalaman kerja yang dikembangkan dan diberikan nilai tambah melalui proses belajar bersama.</div>
        </q-card-section>

        <q-card-section v-if="type === 'Knowledge'" class="q-pt-none">
          <div class="text-subtitle">Knowledge Type</div>
          <q-select
            v-model="knowledge_type_model"
            :options="['Basic Knowledge', 'Advance Knowledge', 'Innovative Knowledge']"
            outlined
            dense
          >
          </q-select>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle">{{ type }} Title</div>
          <q-input dense v-model="title" outlined autofocus @keyup.enter="edit_tree = false"/>
        </q-card-section>

        <q-card-section v-if="type === 'Business Process'" class="q-pt-none">
          <div class="text-subtitle">KMAP Audience</div>
          <q-select
            v-model="knowledge_audience"
            :options="[
              { label: 'Private - Only your directorate can access', value: false},
              { label: 'Public - All directorate member can access', value: true},
              ]"
            outlined
            dense
          >
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <div>{{knowledge_audience.label}}</div>
              </div>
            </template>
          </q-select>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated v-close-popup
                 @click='SaveUpdateTree();'/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="delete_tree" persistent>
      <q-card :style="$q.platform.is.mobile ? 'min-width: 400px' : 'min-width: 500px'" class="q-py-md q-px-sm">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Anda akan menghapus data {{ title }}, lanjutkan?</span>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Delete" unelevated v-close-popup
                 @click='DeleteTree();'/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="abort"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Gagal!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Terdapat data knowledge pada Core Knowledge ini. Mohon hapus data knowledge terlebih dahulu sebelum
          melanjutkan.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { axios } from 'boot/axios';
// import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { getCredential } from 'src/lib/storage';
import { checkRole } from 'src/lib/helper';
import {
  knowledgeTreeCreate,
  knowledgeTreeUpdate,
  knowledgeTreeDelete, organizationListDeputi,
  knowledgeTreeParent, profileDetail
  // knowledgeTreeExportExcel
  // knowledgeDetail
} from '../lib/api';

import { get } from '../lib/HttpHelper';

export default {
  // components: { Treeselect },
  props: ['DefaultTreeOpen'],
  data() {
    return {
      checkRole,

      kmap_roles: ['km_manager', 'channel_manager'],
      card_visible: true,
      model: null,
      default_tree_open: {},
      default_key_tree_open: '',
      default_key_tree_open_2: '',
      default_direktorat: [],
      default_direktorat_all: [],
      filter: '',
      title: '',
      add_tree: false,
      edit_tree: false,
      delete_tree: false,
      add_knowledge: false,
      add_business: false,
      add_strategic: false,
      add_files: false,
      add_posts: false,
      add_target: false,
      tree_level: 1,
      seq: 1,
      parent: 1,
      channel_id: '',
      created_by: 1,
      subtitle: '',
      business: '',
      target: '',
      type: '',
      strategic_model: '',
      address_model: '',
      business_model: '',
      knowledge_type_model: 'Basic Knowledge',
      level4: false,
      knowledge: 0,
      dknowledge: 0,
      abort: false,
      level: 0,
      state: '',
      channel_options: [],
      channel_model: '',
      selected: null,
      simple: [],
      user: {
        id: '',
        name: '',
        initial: ''
      },
      current_user: {},

      position_options: [],
      position_value: 0,
      position_title: 'ALL KPK',
      position_show: false,

      select_directorat: false,
      direktorat_expanded: ['Komisi Pemberantasan Korupsi', 'Pimpinan'],
      direktorat_tree: [
        {
          label: 'Komisi Pemberantasan Korupsi',
          // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: []
        }
      ],
      direktorat_selected: null,
      direktorat_filter: '',
      parent_tree: '',

      directorate_search_nod: null,
      directorate_search_expand_to: undefined,
      directorate_search_keyword: '',
      directorate_search_keyword_count: 0,

      knowledge_audience: { label: 'Private - Only your directorate can access', value: false }
    };
  },

  computed: {
    // isAuthorized() {
    //   return this.kmap_roles.includes(checkRole().name);
    // }
  },

  methods: {
    isAuthorized() {
      if (this.kmap_roles.includes(checkRole().name) && checkRole().name === 'channel_manager' && this.current_user.organization) {
        if (this.current_user.organization === this.channel_model.label) return true;
        return false;
      }
      return this.kmap_roles.includes(checkRole().name);
    },
    onDirectorateFilter(node, filter) {
      const filt = filter.toLowerCase();
      if (node.label && node.label.toLowerCase().indexOf(filt) > -1) {
        // const { parent_label } = node;
        if (this.directorate_search_expand_to !== undefined) clearTimeout(this.directorate_search_expand_to);
        if (this.directorate_search_keyword_count === 1) {
          this.directorate_search_expand_to = setTimeout(() => {
            // this.$refs.direktoratTree.setExpanded(parent_label, true);
            this.$refs.direktoratTree.expandAll();
          }, 100);
        }

        if (this.directorate_search_keyword !== '' && this.directorate_search_keyword === filt) this.directorate_search_keyword_count += 1;
        else this.directorate_search_keyword_count = 0;
        this.directorate_search_keyword = filt;
      }
      return node.label && node.label.toLowerCase().indexOf(filt) > -1;
    },
    onDirectorateSelected(data) {
      this.$refs.direktoratTree.setExpanded(data, true);
    },
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    positionSelect(node) {
      this.position_value = node.id;
      this.position_title = node.name;
      // this.handleFilter(true);

      this.getTree(node.id, true);

      // if (this.channel_model.level === 0) {
      //   this.updateTreeSelected({
      //     key: this.channel_model.key,
      //     label: this.channel_model.label,
      //     story: this.channel_model.story,
      //     level: this.channel_model.level,
      //     id: this.channel_model.id
      //   });
      // }
    },
    getOrganization() {
      organizationListDeputi({ limit: 1000 }).then(response => {
        const hasil = response.data;

        this.position_options = [{ id: 0, name: 'ALL KPK' }, ...hasil];
      });
    },
    updateTreeSelected(selected) {
      if (![1, 2].includes(selected.level)) {
        this.$emit('update_selected', selected, selected);
      }
      // if (selected.level === 3) {
      //   this.$router.push({
      //     name: 'knowledge',
      //     query: {
      //       id: this.$route.query.id
      //     },
      //     hash: `#${selected.id}`
      //   });
      // }
      if (![0].includes(selected.level)) {
        this.$refs.knowledgeTree.setExpanded(selected.key, true);
      }


      this.title = selected.label;
      this.subtitle = selected.story;
      this.knowledge_type_model = selected.story;
      this.id = selected.id;
      this.level = selected.level;
      if (selected.level === 3) {
        this.state = selected.state;
      }

      const ka = [
        { label: 'Private - Only your directorate can access', value: false },
        { label: 'Public - All directorate member can access', value: true }
      ];
      this.knowledge_audience = (typeof selected.knowledge_audience !== 'undefined') ? ka.find(x => x.value === selected.knowledge_audience) : '';
      // if (selected.level === 4) {
      //   this.level4 = true;
      // } else {
      //   this.level4 = false;
      // }
    },
    openDialog(selected) {
      this.level4 = true;
      this.add_tree = true;
      if (selected.level === 91) {
        this.title = '';
        this.tree_level = 1;
        this.parent = selected.parent;
        this.type = 'Business Process';
        this.subtitle = 'Business Process';
      }
      if (selected.level === 92) {
        this.title = '';
        this.tree_level = 2;
        this.parent = selected.parent;
        this.type = 'Strategic Activity';
        this.subtitle = 'Strategic Activity';
      }
      if (selected.level === 93) {
        this.title = '';
        this.tree_level = 3;
        this.parent = selected.parent;
        this.type = 'Knowledge';
        this.subtitle = 'Core Knowledge';
        this.knowledge_type_model = 'Basic Knowledge';
      }
    },
    opendialogsKnowledge(id) {
      knowledgeTreeParent(id).then(response => {
        this.$root.$emit('getDataParent', response.data.knowledge_tree);
      });
      this.$root.$emit('changeInfoKmap');
    },
    opendialogs(tipe, id = false) {
      if (tipe === 'select_directorat') {
        this.select_directorat = true;
      } else if (tipe === 'delete') {
        // this.abort = true;
        if (this.level === 3 && this.state === 'yes') {
          this.abort = true;
        } else {
          this.delete_tree = true;
        }
      } else if (tipe === 'info') {
        this.$root.$emit('changeInfoKmap');
      } else {
        this.edit_tree = true;


        if (this.level === 1) {
          this.type = 'Business Process';
        } else if (this.level === 2) {
          this.type = 'Strategic Activity';
        } else if (this.level === 3) {
          this.type = 'Knowledge';
        }
      }
    },
    resetFilter() {
      this.filter = '';
      this.$refs.filter.focus();
    },
    saveTree() {
      const data = {
        enabled: this.type === 'Business Process' ? this.knowledge_audience.value : true,
        tree_level: this.tree_level,
        seq: this.seq,
        parent: this.parent,
        title: this.title,
        subtitle: this.subtitle,
        channel_id: this.channel_id,
        created_by: this.created_by,
        target: this.target
      };
      if (this.tree_level === 3) {
        data.subtitle = this.knowledge_type_model;
      }
      knowledgeTreeCreate(data).then(response => {
        this.$q.notify({
          message: 'Knowledge Map Saved.',
          color: 'blue'
        });
        this.getTree(this.channel_model.value);
      });
    },
    SaveUpdateTree() {
      const data = {
        enabled: this.type === 'Business Process' ? this.knowledge_audience.value : true,
        title: this.title,
        subtitle: this.knowledge_type_model
      };
      knowledgeTreeUpdate(this.id, data).then(response => {
        this.$q.notify({
          message: 'Knowledge Map Updated.',
          color: 'blue'
        });
        this.getTree(this.channel_model.value);
      });
    },
    DeleteTree() {
      knowledgeTreeDelete(this.id).then(response => {
        this.$q.notify({
          message: 'Knowledge Deleted sucessfully.',
          color: 'blue'
        });
        this.getTree(this.channel_model.value);
      });
    },
    getTree(id = 0, isInit = false) {
      if (id === 0) {
        this.simple = [];
        return;
      }
      this.card_visible = true;
      get({
        path: `api/knowledge-tree?id=${id}`
      }).then(res => {
        this.simple = res.data.map((v0, k0) => {
          const tree_level_1 = v0.children.map((v1, k1) => {
            const tree_level_2 = v1.children.map((v2, k2) => {
              const setTree = (v3, k3) => {
                let sort = '3';
                if (v3.subtitle === 'Basic Knowledge') {
                  sort = '1';
                } else if (v3.subtitle === 'Advance Knowledge') {
                  sort = '2';
                }

                if (this.DefaultTreeOpen.default_tree_id === v3.id) {
                  this.default_tree_open = {
                    key: `${k0}_${k1}_${k2}_${sort}_${k3}_${v3.id}`,
                    parent_id: v2.id,
                    parent_label: v2.title,
                    label: v3.title,
                    story: v3.subtitle,
                    count_knowledge: v3.knowledge.filter(v11 => v11.content_type !== 'SME Only').length,
                    count_sme: v3.knowledge.filter(v11 => v11.content_type === 'SME Only').length,
                    level: 3,
                    id: v3.id,
                    state: v3.children.length > 0 ? 'yes' : 'no',
                    parent_id_zero: v0.id,
                    parent_id_zero_name: v0.channel.organization.name
                  };
                }

                return {
                  key: `${k0}_${k1}_${k2}_${sort}_${k3}_${v3.id}`,
                  parent_id: v2.id,
                  parent_label: v2.title,
                  label: v3.title,
                  story: v3.subtitle,
                  count_knowledge: v3.knowledge.filter(v11 => v11.content_type !== 'SME Only').length,
                  count_sme: v3.knowledge.filter(v11 => v11.content_type === 'SME Only').length,
                  level: 3,
                  id: v3.id,
                  state: v3.children.length > 0 ? 'yes' : 'no',
                  handler: node => this.updateTreeSelected({
                    key: `${k0}_${k1}_${k2}_${sort}_${k3}_${v3.id}`,
                    parent_id: node.parent_id,
                    parent_label: node.parent_label,
                    label: node.label,
                    story: node.story,
                    level: node.level,
                    id: v3.id,
                    state: node.state,
                    parent_id_zero: v0.id,
                    parent_id_zero_name: v0.channel.organization.name
                  })
                };
              };

              const tree_level_3_1 = v2.children
                .filter(x => {
                  return x.subtitle === 'Basic Knowledge';
                })
                .map(setTree)
                .sort((a, b) => (a.label > b.label ? 1 : -1));
              const tree_level_3_2 = v2.children
                .filter(x => {
                  return x.subtitle === 'Advance Knowledge';
                })
                .map(setTree)
                .sort((a, b) => (a.label > b.label ? 1 : -1));
              const tree_level_3_3 = v2.children
                .filter(x => {
                  return x.subtitle === 'Innovative Knowledge';
                })
                .map(setTree)
                .sort((a, b) => (a.label > b.label ? 1 : -1));
              let tree_level_3 = [];
              // if (this.user.name === 'admin') {
              if (this.isAuthorized()) {
                tree_level_3.push({
                  key: `${k0}_${k1}_${k2}_93_${v2.id}`,
                  label: 'Add Important Knowledge',
                  level: 93,
                  parent: v2.id,
                  handler: node => this.openDialog({
                    label: node.label,
                    level: node.level,
                    parent: node.parent
                  })
                });
              }
              tree_level_3 = tree_level_3.concat(tree_level_3_1, tree_level_3_2, tree_level_3_3);


              if (this.DefaultTreeOpen.default_tree_parent_id === v2.id) {
                this.default_key_tree_open = `${k0}_${k1}_${k2}_${v2.id}`;
              }
              return {
                key: `${k0}_${k1}_${k2}_${v2.id}`,
                label: v2.title,
                story: v2.subtitle,
                level: 2,
                children: tree_level_3,
                handler: node => this.updateTreeSelected({
                  key: `${k0}_${k1}_${k2}_${v2.id}`,
                  label: node.label,
                  story: node.story,
                  level: node.level,
                  id: v2.id,
                  state: node.state,
                  children: tree_level_3
                    .filter(x => x.id !== undefined)
                    .map(x => ({ id: x.id, label: x.label, story: x.story })),
                  parent_id_zero: v0.id
                })
              };
            });
            // if (this.user.name === 'admin') {
            if (this.isAuthorized()) {
              tree_level_2.unshift({
                key: `${k0}_${k1}_92_${v1.id}`,
                label: 'Add Strategic Activity',
                level: 92,
                parent: v1.id,
                handler: node => this.openDialog({
                  label: node.label,
                  level: node.level,
                  parent: node.parent
                })
              });
            }
            if (!v1.enabled && !this.isAuthorized() && this.current_user.organization !== v0.title) tree_level_2.splice(0, tree_level_2.length);


            if (this.DefaultTreeOpen.default_tree_parent_parent_id === v1.id) {
              this.default_key_tree_open_2 = `${k0}_${k1}_${v1.id}`;
            }

            return {
              key: `${k0}_${k1}_${v1.id}`,
              label: v1.title,
              story: v1.subtitle,
              knowledge_audience: v1.enabled,
              level: 1,
              children: tree_level_2
                .sort((a, b) => (a.label > b.label ? 1 : -1)),
              handler: node => this.updateTreeSelected({
                key: `${k0}_${k1}_${v1.id}`,
                label: node.label,
                story: node.story,
                knowledge_audience: node.knowledge_audience,
                level: node.level,
                id: v1.id,
                parent_id_zero: v0.id
              })
            };
          });
          // if (this.user.name === 'admin') {
          if (this.isAuthorized()) {
            tree_level_1.unshift({
              key: `${k0}_91_${v0.id}`,
              label: 'Add Business Process',
              level: 91,
              parent: v0.id,
              handler: node => this.openDialog({
                label: node.label,
                level: node.level,
                parent: node.parent
              })
            });
          }
          return {
            key: `${k0}_${v0.id}`,
            // label: v0.title,
            label: v0.channel.organization.name,
            story: v0.subtitle,
            level: 0,
            children: tree_level_1
              .sort((a, b) => (a.label > b.label ? 1 : -1)),
            handler: node => this.updateTreeSelected({
              key: `${k0}_${v0.id}`,
              label: node.label,
              story: node.story,
              level: node.level,
              organization_id: v0.channel.organization.id,
              id: v0.id
            })
          };
        });
        setTimeout(() => {
          // this.$refs.knowledgeTree.expandAll();
          if (isInit) {
            // if (this.user.name === 'admin') {
            if (this.DefaultTreeOpen.default_tree_parent_id > 0) {
              if (this.simple.length > 0) this.$refs.knowledgeTree.setExpanded(this.simple[0].key, true);
              this.$refs.knowledgeTree.setExpanded(this.default_key_tree_open_2, true);
              this.$refs.knowledgeTree.setExpanded(this.default_key_tree_open, true);
              setTimeout(() => {
                this.updateTreeSelected(this.default_tree_open);
              }, 600);
            } else if (this.isAuthorized()) {
              if (this.simple.length > 0) this.$refs.knowledgeTree.setExpanded(this.simple[0].key, true);
              if (this.simple.length > 0 && this.simple[0].children.length > 1) this.$refs.knowledgeTree.setExpanded(this.simple[0].children[1].key, true);
              if (this.simple.length > 0 && this.simple[0].children.length > 1 && this.simple[0].children[1].children.length > 1) this.$refs.knowledgeTree.setExpanded(this.simple[0].children[1].children[1].key, true);
            } else {
              if (this.simple.length > 0) this.$refs.knowledgeTree.setExpanded(this.simple[0].key, true);
              if (this.simple.length > 0 && this.simple[0].children.length > 0) this.$refs.knowledgeTree.setExpanded(this.simple[0].children[0].key, true);
              if (this.simple.length > 0 && this.simple[0].children.length > 0 && this.simple[0].children[0].children.length > 1) this.$refs.knowledgeTree.setExpanded(this.simple[0].children[0].children[0].key, true);
            }

            this.$emit('update_selected', {
              ...this.simple[0],
              children: [],
              id: this.simple[0].key.split('_')[1]
            }, {
              ...this.simple[0],
              children: [],
              id: this.simple[0].key.split('_')[1]
            });
          }
          this.card_visible = false;
        }, 500);
      });
    },
    getDirektoratTree() {
      const goTo = direktorat_id => {
        if (this.$route.query.id !== direktorat_id) {
          this.$router.push({
            name: 'knowledge',
            query: {
              id: direktorat_id
            }
          });
        }
      };

      get({
        path: 'api/organization/hirarki'
      }).then(res => {
        const tree_kpk = res.data.map((v0, k0) => {
          const tree_level_1 = v0.children.map((v1, k1) => {
            let sort_1 = 9;
            if (v1.name.toLowerCase().includes('inspektorat')) sort_1 = 0;
            if (v1.name.toLowerCase().includes('sekretariat')) sort_1 = 1;
            const tree_level_2 = v1.children.map((v2, k2) => {
              let sort_2 = 9;
              if (v2.name.toLowerCase().includes('sekretariat')) sort_2 = 0;
              if (v2.name.toLowerCase() === this.channel_model.label.toLowerCase()) {
                this.direktorat_expanded = ['Komisi Pemberantasan Korupsi', v0.name, v1.name, v2.name];
              }
              const channel_direktorat = this.default_direktorat_all.find(x => x.channel.organization_id === v2.id);
              return {
                key: `${k0}_${k1}_${k2}_${v2.id}`,
                value: (channel_direktorat !== undefined) ? channel_direktorat.channel_id : 0,
                label: v2.name,
                parent_label: v1.name,
                story: v2.groups,
                level: 2,
                icon: 'domain',
                sort: sort_2,
                handler: node => {
                  this.channel_model = node;
                  this.direktorat_selected = node;
                  // this.getTree(node.value, true);
                  this.select_directorat = false;
                  // this.direktorat_expanded = ['Komisi Pemberantasan Korupsi', v0.name, v1.name, v2.name];
                  goTo(node.value);
                }
              };
            });

            if (v1.name.toLowerCase() === this.channel_model.label.toLowerCase()) {
              this.direktorat_expanded = ['Komisi Pemberantasan Korupsi', v0.name, v1.name];
            }
            const channel_direktorat = this.default_direktorat_all.find(x => x.channel.organization_id === v1.id);
            return {
              key: `${k0}_${k1}_${v1.id}`,
              value: (channel_direktorat !== undefined) ? channel_direktorat.channel_id : 0,
              label: v1.name,
              story: v1.groups,
              level: 1,
              sort: sort_1,
              parent_label: v0.name,
              children: tree_level_2
                .sort((a, b) => (a.sort > b.sort ? 1 : -1)),
              handler: node => {
                if (!node.label.toLowerCase().includes('deputi')) {
                  this.channel_model = node;
                  this.direktorat_selected = node;
                  // this.getTree(node.value, true);
                  this.select_directorat = false;
                  // this.direktorat_expanded = ['Komisi Pemberantasan Korupsi', v0.name, v1.name];
                  goTo(node.value);
                // } else {
                //   this.$refs.direktoratTree.setExpanded(node.key, true);
                }
              }
            };
          });
          return {
            key: `${k0}_${v0.id}`,
            label: v0.name,
            story: v0.groups,
            level: 0,
            icon: 'public',
            children: tree_level_1
              .sort((a, b) => (a.sort > b.sort ? 1 : -1))
          };
        });
        this.direktorat_tree = [{
          label: 'Komisi Pemberantasan Korupsi',
          children: tree_kpk
        }];
      });
    },
    getDirektorat() {
      get({
        path: 'api/knowledge-tree/direktorat/list'
      }).then(res => {
        const root = res.data;
        this.default_direktorat = root
          .filter(item => item.channel !== null)
          .filter(item => item.channel.enabled === true)
          .filter(item => item.channel.channel_member.length > 0);
        this.default_direktorat_all = root
          .filter(item => item.channel !== null);

        this.$emit('default_direktorat', this.default_direktorat, this.default_direktorat);

        this.channel_options = root
          .filter(item => item.channel !== null)
          .filter(item => item.channel.enabled === true)
          .map(item => {
            return {
              key: `0_${item.id}`,
              value: item.id,
              label: (item.channel.organization === null) ? item.title : item.channel.organization.name,
              organization_id: (item.channel.organization === null) ? 0 : item.channel.organization.id,
              // label: item.title,
              story: item.subtitle,
              icon: 'domain',
              level: 0,
              id: item.id
            };
          })
          .sort((a, b) => (a.label > b.label ? 1 : -1));

        let first = this.channel_options[0];

        let defaultDirectoratId = 0;
        if (this.$route.query.id !== undefined) {
          defaultDirectoratId = parseInt(this.$route.query.id, 10);
          first = this.channel_options.find(x => x.id === defaultDirectoratId);
        } else if (this.default_direktorat.length > 0) {
          defaultDirectoratId = parseInt(this.default_direktorat[0].id, 10);
          first = this.channel_options.find(x => x.id === defaultDirectoratId);
        }

        this.channel_model = first;
        this.channel_id = first.value;

        this.getDirektoratTree();
      });
    },
    async getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      this.current_user = profile;
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
      await profileDetail(profile.id).then(response => {
        let org = '';
        const tmp = response.data.organization;
        if (tmp !== null && tmp.groups === 'Unit Kerja') {
          if (org === '') org = tmp.name;
        }
        Object.keys(tmp).forEach(key => {
          if (key === 'organization') {
            const tmp2 = tmp[key];
            if (tmp2 !== null && tmp2.groups === 'Unit Kerja') {
              if (org === '') org = tmp2.name;
            }
            Object.keys(tmp2).forEach(key2 => {
              if (key2 === 'organization') {
                const tmp3 = tmp2[key2];
                if (key2 === 'organization') {
                  if (tmp3 !== null && tmp3.groups === 'Unit Kerja') {
                    if (org === '') org = tmp3.name;
                  }
                }
              }
            });
          }
        });
        this.current_user.organization = org;
      });
    },
    handleDownload(id) {
      const channel_id = this.channel_model.value;

      // window.open(`./api/api/knowledge-tree/export/excel/${channel_id}`);
      axios({
        url: `./api/api/knowledge-tree/export/excel/${channel_id}`,
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `KMAP - ${this.channel_model.label}.xlsx`);
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });

      // knowledgeTreeExportExcel(channel_id).then(res => {});
      // window.open(`./api/api/knowledge-tree/export/excel/${channel_id}`);
    },
    changeInfoKmap() {
      this.$root.$emit('changeInfoKmap');
    }
  },
  mounted() {
    // this.getOrganization();
    this.getDirektorat();
    this.$root.$on('openDialogsTree', tipe => {
      this.opendialogs(tipe);
    });
  },
  watch: {
    channel_model: {
      immediate: true,
      deep: true,
      async handler(value) {
        if (value !== null && value !== 0 && value !== '' && this.$route.query.id === undefined) {
          await this.getUser();
          this.getTree(this.channel_model.value, true);
          if (this.channel_model.level === 0) {
            this.updateTreeSelected({
              key: this.channel_model.key,
              label: this.channel_model.label,
              story: this.channel_model.story,
              level: this.channel_model.level,
              id: this.channel_model.id
            });
          }
        }
      }
    },
    // direktorat_selected: {
    //   immediate: true,
    //   deep: true,
    //   handler(value) {
    //     if (value) {
    //       if (value.label.toLowerCase().includes('deputi') || value.label.toLowerCase().includes('komisi')) {
    //         this.direktorat_selected = null;
    //       }
    //     }
    //   }
    // },
    '$route.query.id': {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) {
          this.getTree(value, true);
          this.getDirektorat();

          // this.getDirektoratTree();
          // this.channel_model.label = 'aw';

          // this.channel_model = node;
          // this.direktorat_selected = node;
          // this.direktorat_expanded = ['Komisi Pemberantasan Korupsi', v0.name, v1.name];
        }
      }
    }
  }
};


// const tree_level_4 = [
//   {
//     key: `${k0}_${k1}_${k2}_${k3}_1`,
//     parent_id: v3.id,
//     parent_label: v3.title,
//     label: 'Subject Matter Expert',
//     story: 'Expert',
//     level: 4,
//     handler: node => this.updateTreeSelected({
//       parent_id: node.parent_id,
//       parent_label: node.parent_label,
//       label: node.label,
//       level: node.level
//     })
//   },
//   {
//     key: `${k0}_${k1}_${k2}_${k3}_2`,
//     parent_id: v3.id,
//     parent_label: v3.title,
//     label: 'Explicit Knowledge',
//     story: 'Knowledges',
//     level: 4,
//     handler: node => this.updateTreeSelected({
//       parent_id: node.parent_id,
//       parent_label: node.parent_label,
//       label: node.label,
//       level: node.level
//     })
//   },
//   {
//     key: `${k0}_${k1}_${k2}_${k3}_3`,
//     parent_id: v3.id,
//     parent_label: v3.title,
//     label: 'Best Practice',
//     story: 'Knowledges',
//     level: 4,
//     handler: node => this.updateTreeSelected({
//       parent_id: node.parent_id,
//       parent_label: node.parent_label,
//       label: node.label,
//       level: node.level
//     })
//   },
//   {
//     key: `${k0}_${k1}_${k2}_${k3}_4`,
//     parent_id: v3.id,
//     parent_label: v3.title,
//     label: 'Development Needed',
//     story: 'Knowledges',
//     level: 4,
//     handler: node => this.updateTreeSelected({
//       parent_id: node.parent_id,
//       parent_label: node.parent_label,
//       label: node.label,
//       level: node.level
//     })
//   }
// ];

</script>

<style>
.q-tree__node-header-content .row {
  flex-wrap: inherit;
}
</style>


