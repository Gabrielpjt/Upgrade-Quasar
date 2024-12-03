<template>
  <div>
    <q-card-section class="q-pa-none" v-if="data !== undefined">
      <div class="row items-center">
        <q-item-section side class="q-pr-sm cursor-pointer" @click="$router.push({ name: 'profile-detail', params: { id: user_data.id } })">
          <Avatar size="xl" :picture="profile_picture ? profile_picture : ''" :name="user_data.name"/>
        </q-item-section>
        <q-item-section class="q-pa-none">
          <div class="kmp-text-nama text-capitalize">
            <span class="cursor-pointer" @click="$router.push({ name: 'profile-detail', params: { id: user_data.id } })">{{ user_data.name }}</span>
            <span class="kmp-time q-ml-xs">{{ data.time }}</span>
            <q-icon v-if="data.status_pin" name="push_pin" class="check-icon q-ml-sm" color="blue" size="20px" style="" />
          </div>
          <div class="cursor-pointer kmp-post-status-channel desktop-only"
               v-show="data.post_collaboration.length > 0"
               @click="collab_dialog = true">
            <q-icon class="" name="group" size="16px" style=""/>
            <span v-if="data.post_collaboration.length > 1" class="q-ml-xs q-mt-xs">{{ data.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }}, +{{ data.post_collaboration.length - 1 }}</span>
            <span v-else="" class="q-ml-xs q-mt-xs">{{ data.post_collaboration.map(m => m.user.name).join(', ') }}</span>
          </div>
          <PostStatus :knowledge="data.knowledge" :channel_id="data.post_channel.channel_id" :post_status="data.status" :forward_count="data.post_channel.forward.length" :limit_status="data.limited" :channel="data.post_channel.channel.name" :type="data.post_channel.channel.channel_type"/>
          <div class="cursor-pointer kmp-post-status-channel mobile-only"
               v-show="data.post_collaboration.length > 0"
               @click="collab_dialog = true">
            <q-icon class="" name="group" size="16px" style=""/>
            <span v-if="data.post_collaboration.length > 1" class="q-ml-xs q-mt-xs">{{ data.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }}, +{{ data.post_collaboration.length - 1 }}</span>
            <span v-else="" class="q-ml-xs q-mt-xs">{{ data.post_collaboration.map(m => m.user.name).join(', ') }}</span>
          </div>
        </q-item-section>
        <q-space/>
        <q-item-section side v-if="is_show_edit">
          <q-btn class="" color="primary" outline size="sm" label="Edit" @click="handleEditPost(data)" />
        </q-item-section>
        <q-item-section side v-if="is_show_close">
          <q-btn class="col-auto" flat dense round icon="close" @click="handleClose" />
        </q-item-section>
        <q-item-section side v-if="is_show_menu">
          <div class="col-3 text-right kmp-post-button">
            <q-btn-group outline class="kmp-color-1 kmp-bg-color-4 kmp-rounded-2">
              <q-btn size="11px" icon="forward" class="kmp-post-button-group desktop-only" @click="handleForward()"/>
              <q-btn v-if="data.bookmark.length > 0" size="11px" icon="bookmark" class="kmp-post-button-group desktop-only" @click="handleBookmark()"/>
              <q-btn v-else size="11px" icon="bookmark_border" class="kmp-post-button-group desktop-only" @click="handleBookmark()"/>
              <q-btn size="11px" icon="more_horiz" class="kmp-post-button-group">
                <q-menu auto-close content-class="kmp-rounded kmp-unelevated" >
                  <q-list style="min-width: 100px" dense class="kmp-rounded-2">
                    <q-item clickable v-show="data.post_type !== 'Poll' && role_edit">
                      <q-item-section class="" @click="handleEditPost(data);">Edit Post</q-item-section>
                    </q-item>
                    <q-item clickable v-show="role_delete">
                      <q-item-section class="" @click="handleDeletePost(data);">Delete Post</q-item-section>
                    </q-item>
                    <q-item clickable v-show="role_verify && (data.status === 'Unverified')">
                      <q-item-section class="" @click="openDialog('modal_verify')">Verify Post</q-item-section>
                    </q-item>
                    <!-- <q-item clickable v-show="role_verify && data.status === 'Kmap'">
                      <q-item-section class="" @click="handleUnverify(data.id)">Unverify Post</q-item-section>
                    </q-item> -->
                    <q-item clickable v-show="role_pin">
                      <q-item-section v-if="data.pin || data.status_pin" class="" @click="openDialog('modal_pin')">Edit Pinned Post</q-item-section>
                      <q-item-section v-else class="" @click="openDialog('modal_pin')">Pinned Post</q-item-section>
                    </q-item>
                    <q-item  clickable v-show="role_unpin && (data.pin || data.status_pin)">
                      <q-item-section class="" @click="handleDeletePin(data)">Remove Pinned Post</q-item-section>
                    </q-item>
                    <q-item clickable v-show="role_archive && channel.id === data.post_channel.channel_id">
                      <q-item-section v-if="!data.pinned_by" class="" @click="handleArchive()">Archive</q-item-section>
                      <q-item-section v-if="data.pinned_by" class="" @click="handleArchive()">Remove Archive</q-item-section>
                    </q-item>
                    <q-item v-if="data.bookmark.length > 0" clickable>
                      <q-item-section class="" @click="handleBookmark()">Unbookmark</q-item-section>
                    </q-item>
                    <q-item v-else clickable>
                      <q-item-section class="" @click="handleBookmark()">My Bookmark</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-btn-group>
          </div>
        </q-item-section>
      </div>
    </q-card-section>

    <q-dialog v-model="modal_verify">
      <q-card class="" style="min-width: 350px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Verify Post</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-y-md column">
              <div class="column text-grey-9">
                <q-list v-for="(item, index) in options" :key="index">
                  <q-item
                    dense
                    class="q-pl-none q-py-sm"
                    tag="label"
                    v-ripple>
                    <q-radio v-model="status" dense class="q-mx-sm" :val="item.value" color="primary" @input="changeStatus"/>
                    <q-item-section>
                      <q-item-label>{{ item.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-card-section>
          <q-card-section v-show="status === 'Kmap'">
            <div>
              <div class="text-subtitle">Select Direktorat</div>
              <treeselect
                placeholder="Change Direktorat"
                v-model="kmap.direktorat"
                :options="kmap.direktorat_options"
                :normalizer="normalizer"
                @select="direktoratSelect"
                value-format="object"
                class="vue-treeselect"
                style="padding-top: 2.5px; border: 1.8px solid #d8d8d8; border-radius: 10px;"
              />
              <div class="text-subtitle">Select Business Process</div>
              <q-select
                outlined
                dense
                v-model="kmap.business"
                :options="kmap.business_options"
                @input="businessSelect"
              ></q-select>
              <div class="text-subtitle">Select Strategic Activity</div>
              <q-select
                outlined
                dense
                v-model="kmap.strategic"
                :options="kmap.strategic_options"
                @input="strategicSelect"
              ></q-select>
              <div class="text-subtitle">Select Knowledge</div>
              <q-select
                outlined
                dense
                v-model="kmap.knowledge"
                :options="kmap.knowledge_options"
              ></q-select>
              <div class="text-subtitle">Set Knowledge as :</div>
              <q-list v-for="(item, index) in kmap.type_options" :key="`L${index}`">
                <q-item
                  dense
                  class="q-pl-none q-py-sm"
                  tag="label"
                  v-ripple>
                  <q-radio v-model="kmap.type" dense class="q-mx-sm" :val="item.label" color="primary"/>
                  <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

            </div>
          </q-card-section>
          <q-card-section v-show="status === 'Limit'">
            <div class="q-px-sm">
              <div class="text-subtitle q-mb-sm">Limit access to</div>
              <div v-for="(person,index) in limit_list" class="row q-mb-sm q-mt-sm justify-between" :key="index">
                <span><q-badge color="white" rounded class="q-pa-xd" text-color="black">
                  <q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">
                  {{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>
                <q-btn flat round icon="close" size="sm" @click="deletePerson(index, 'limit')"/>
              </div>
              <q-select
                class="q-mb-sm"
                v-model="post_limit"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                @filter="filterLimit"
                @input="addLimit()"
                :options="limit_option"
                :option-value="'id'"
                :option-label="'name'"
                dense
                outlined
                hide-dropdown-icon
                ref="limit"
                placeholder="Search user"
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
          </q-card-section>

          <q-card-actions align="right" style="padding: 16px">
            <q-btn no-caps v-close-popup outline color="primary" label="Cancel" />
            <q-btn no-caps color="primary" label="Submit" @click="handleSubmit" />
          </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="modal_pin" persistent>
      <q-card class="" style="min-width: 350px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Pin Post</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-6">
                <div class="q-mt-md q-mb-sm">
                  <label>Start date</label>
                </div>
                <q-input dense outlined v-model="startdate"
                        class="q-mr-xs"
                        placeholder="Start date"
                        mask="date"
                        ref="startdate"
                        :rules="[val => !!val || 'Field is required', 'date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale">
                        <q-date v-model="startdate" :options="optionsFn" @input="setStartDate()">
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-6">
                <div class="q-mt-md q-mb-sm">
                  <label>Start time</label>
                </div>
                <q-input dense outlined v-model="starttime"
                        class="q-ml-xs"
                        placeholder="Start time"
                        mask="time"
                        ref="starttime"
                        :rules="[val => !!val || 'Field is required', 'time']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy ref="qTimeProxyStart" transition-show="scale" transition-hide="scale">
                        <q-time v-model="starttime" mask="HH:mm" format24h @input="setStartTime()">
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-6">
                <div class="q-mt-md q-mb-sm">
                  <label>End date</label>
                </div>
                <q-input dense outlined v-model="enddate"
                        class="q-mr-xs"
                        placeholder="End date"
                        mask="date"
                        ref="enddate"
                        :rules="[val => !!val || 'Field is required', 'date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qEndDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="enddate" :options="optionsFn" @input="$refs.qEndDateProxy.hide()">
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-6">
                <div class="q-mt-md q-mb-sm">
                  <label>End time</label>
                </div>
                <q-input dense outlined v-model="endtime"
                        class="q-ml-xs"
                        placeholder="End time"
                        mask="time"
                        ref="endtime"
                        :rules="[val => !!val || 'Field is required', 'time']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy ref="qEndTimeProxy" transition-show="scale" transition-hide="scale">
                        <q-time v-model="endtime" mask="HH:mm" format24h @input="$refs.qEndTimeProxy.hide()">
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" style="padding: 16px">
            <q-btn no-caps v-close-popup outline color="primary" label="Cancel" />
            <q-btn no-caps color="primary" label="Submit" @click="handleSubmitPin" />
          </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="collab_dialog">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-collaboration-mobile' : 'kmp-modal-collaboration'">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Posting Collaboration</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section style="max-height: 550px">
          <q-scroll-area style="height: 450px" class="q-pr-md">
            <q-list>
              <q-item clickable v-ripple class="q-px-none" v-for="(item, index) in data.post_collaboration" :key="index">
                <q-item-section top avatar class="kmp-leaderboard-avatar-1" style="min-width: 35px !important">
                  <Avatar size="md" :picture="item.user.profile_picture ? `./api${item.user.profile_picture}` : ''" :name="item.user.name"/>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="kmp-font-sm-2 kmp-font-bold text-capitalize">{{ item.user.name }}</q-item-label>
                  <q-item-label class="kmp-font-xs" caption lines="2">
                    {{ (item.user.organization && item.user.organization.organization.organization) ?
                    item.user.organization.organization.organization.name : (item.user.organization ?
                      item.user.organization.organization.name : 'Unknown') }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_forward" persistent>
      <q-card class="" style="min-width: 350px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6 text-weight-bolder">Forward Post</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="q-py-none">
          <div class="q-mt-md q-mb-sm">
          </div>{{search_channel_model.name}}
          <q-select
            ref="search_channel"
            v-model="search_channel_model"
            outlined
            use-input
            dense
            input-debounce="0"
            placeholder="Search channel"
            :options="data_channel"
            @filter="filterFnChannel"
            style="width: 100%"
            class="kmp-rounded q-mb-lg"
            hide-dropdown-icon
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps"
                v-on="scope.itemEvents"
                @click="submitForward(scope.opt.id)"
                v-close-popup>
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-avatar v-if="scope.opt.avatar" class="q-mr-sm" size="20px">
                    <img :src="scope.opt.avatar">
                  </q-avatar>
                  <span v-else="">
                      <q-icon v-if="scope.opt.channel_type === 'Direktorat'" name="domain" class="icon-menu" size="20px"/>
                      <q-icon v-if="scope.opt.channel_type === 'COP'" name="group_add" class="icon-menu" size="20px"/>
                      <q-icon v-if="scope.opt.channel_type === 'General'" name="public" class="icon-menu" size="20px"/>
                      <q-icon v-if="scope.opt.channel_type === 'Hobby'" name="sports_esports" class="icon-menu" size="20px"/>
                      <q-icon v-if="scope.opt.channel_type === 'Project'" name="chat_bubble" class="icon-menu" size="20px"/>
                    </span>
                </q-item-section>

                <q-item-section class="list">
                  <q-item-label v-html="scope.opt.name"/>
                </q-item-section>

              </q-item>
            </template>
            <template v-slot:append>
              <q-icon name="search"/>
            </template>

          </q-select>
        </q-card-section>

          <!-- <q-card-actions align="right" style="padding: 16px">
            <q-btn no-caps class="full-width" color="primary" label="Forward" @click="submitForward()" />
          </q-card-actions> -->
        </q-card>
    </q-dialog>

    <!-- <q-dialog v-model="modal_report" persistent>
      <q-card class="" style="min-width: 350px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Report Post</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-y-md column">
              <div class="column text-grey-9">
                <q-input dense outlined v-model="reason"
                  type="textarea"
                  placeholder="Write something"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" style="padding: 16px">
            <q-btn no-caps v-close-popup outline color="primary" label="Cancel" />
            <q-btn no-caps color="primary" label="Submit" @click="handleSubmitReport" />
          </q-card-actions>
        </q-card>
    </q-dialog> -->

    <!-- <q-dialog v-model="modal_share" persistent>
      <q-card class="" style="min-width: 350px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6 text-weight-bolder">Share Post</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <q-card class="my-card neutral-card q-pa-sm q-mt-none">
              <q-card-section class="q-pa-sm" v-if="data !== undefined">
                <div class="row items-center">
                  <q-item-section side class="q-pr-sm">
                    <Avatar size="xl" :picture="profile_picture ? profile_picture : ''" :name="user_data.name"/>
                  </q-item-section>
                  <q-item-section class="q-pa-none">
                    <div class="kmp-text-nama text-capitalize">
                      {{ user_data.name }} <span class="kmp-time q-ml-xs">{{ data.time }}</span>
                    </div>
                    <PostStatus :post_status="data.status" :channel="data.post_channel.channel.name"/>
                  </q-item-section>
                  <q-space/>
                </div>
                <div class="kmp-post-text-title q-mt-md">
                  {{ data.title }}
                </div>
                <div class="kmp-post-description">
                  <p style="white-space: pre-line;" class="text-limit">{{data.description}}</p>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <q-card-section class="q-py-none">
          <div class="q-mt-md q-mb-sm">
            <label>Share to</label>
          </div>
          <q-input dense outlined autogrow v-model="share_to"
                  class="q-mb-sm"
                  placeholder=""
          />
          <div class="q-mt-md q-mb-sm">
            <label>Message</label>
          </div>
          <q-input dense outlined v-model="message"
                  placeholder=""
                  type="textarea"
          />
        </q-card-section>

          <q-card-actions align="right" style="padding: 16px">
            <q-btn no-caps class="full-width" color="primary" label="Share" @click="handleShare" />
          </q-card-actions>
        </q-card>
    </q-dialog> -->
  </div>
</template>

<script>

import Avatar from 'components/common/Avatar';
import PostStatus from 'components/PostStatus';
import Treeselect from '@riophae/vue-treeselect';
import '../css/vue-treeselect.css';
import { Notify } from 'quasar';
import bus from 'components/common/EventBus';
import {
  postUpdate,
  postReport,
  organizationList,
  knowledgeTreeList,
  knowledgeTreeDirektorat,
  knowledgeTreeById,
  knowledgeCreate,
  postPinCreate,
  postBookmarkCreate,
  postBookmarkDelete,
  postPinDelete,
  SearchDataAutocomplete,
  postForward,
  postCreateNewMessage,
  postPrivateMessage,
  checkMessage
  // knowledgeTreeDetail
} from 'src/lib/api';
import { getCredential } from 'src/lib/storage';
import { capitalize, getLoginId, checkRole } from 'src/lib/helper';
import { point } from 'src/lib/point';
import { get } from '../lib/HttpHelper';

export default {
  components: { Avatar, PostStatus, Treeselect },
  props: ['data', 'state', 'show_menu', 'show_close', 'show_edit', 'channel', 'user_uk'],
  // props: {
  //   data: {}
  // },
  data() {
    return {
      is_show_menu: true,
      is_show_close: false,
      is_show_edit: false,
      channel_id: null,
      channel_role: null,
      profile_picture: null,
      modal_verify: false,
      status: null,
      options: this.channel.channel_type === 'General' ? [
        { label: 'Approve as Knowledge', value: 'Knowledge', selected: false }
      ] : [
        { label: 'Approve as Knowledge', value: 'Knowledge', selected: false },
        { label: 'Approve and assign to KMAP', value: 'Kmap', selected: false }
      ],
      user: {
        id: getLoginId()
      },
      user_data: null,
      reason: '',
      modal_report: false,
      is_km_manager: false,
      is_content_manager: false,
      is_channel_manager: false,
      kmap: {
        channel_id: null,
        direktorat_options: [],
        direktorat: null,
        business_options: [],
        business: null,
        strategic_options: [],
        strategic: null,
        knowledge_options: [],
        knowledge: null,
        type_options: [
          { label: 'Explicit Knowledge', value: 1, selected: false },
          { label: 'Best Practice', value: 2, selected: false },
          { label: 'Development Needed', value: 3, selected: false }
        ],
        type: null
      },
      default_direktorat: [],
      default_direktorat_all: [],
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        };
      },
      modal_share: false,
      share_to: '',
      message: '',
      collab_dialog: false,
      modal_pin: false,
      startdate: '',
      starttime: '',
      enddate: '',
      endtime: '',
      role_channel: '',
      role_edit: false,
      role_delete: false,
      role_verify: false,
      role_pin: false,
      role_unpin: false,
      role_archive: false,
      option_post: false,
      limit_list: [],
      post_limit: [],
      limit_option: [],
      modal_forward: false,
      search_channel_model: [],
      url: process.env.QUASAR_API_URL,
      data_channel: [],
      msg_id: null,
      postCreateNewMessage,
      limit_url: null,
      defaultBlogs: null,
      idSelect: null
    };
  },
  methods: {
    filterLimit (val, update, abort) {
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.limit_option = [];
          } else {
            this.limit_option = [];
            const loginId = getLoginId();
            const limitId = this.limit_list.map(m => m.users_id);
            SearchDataAutocomplete({ includes: 'user', keyword: val.toLowerCase() }).then(response => {
              const hasil = response.data.filter(f => {
                return f.users_id !== loginId;
              });
              if (hasil.length < 1) {
                const datanotfound = [{
                  name: 'Data not found',
                  disable: true
                }];
                this.limit_option = datanotfound;
              } else {
                this.limit_option = hasil.map(item => {
                  if (item.user) {
                    if (limitId.includes(item.user.id)) {
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
              this.$refs.limit.refresh();
            });
          }
        });
      }, 500);
    },
    addLimit() {
      this.limit_list.push({ users_id: this.post_limit.id, name: this.post_limit.name });
      setTimeout(() => {
        this.post_limit = [];
      }, 500);
    },
    getChannelAccess() {
      const id = getLoginId();
      this.user.id = id;
      // channelAccess(this.channel_id, id).then(res => {
      //   if (res.data.length > 0) {
      //     this.channel_role = res.data[0].member_role.toLowerCase();
      //   }
      // });
    },
    openDialog(dialogName) {
      if (dialogName === 'modal_verify') {
        this.modal_verify = true;
        setTimeout(() => {
          this.getDirektorat();
        }, 0);
        setTimeout(() => {
          this.getKMap();
        }, 500);
      }
      if (dialogName === 'modal_forward') {
        this.search_channel_model = [];
        this.data_channel = [];
        this.modal_forward = true;
      }
      if (dialogName === 'modal_pin') {
        // post yang punya inactive pin
        if (this.data.pin) {
          this.startdate = this.data.pin.start_date;
          this.enddate = this.data.pin.end_date;
          this.starttime = this.data.pin.start_time;
          this.endtime = this.data.pin.end_time;
        } else if (this.data.data_pin) {
          // post yang punya ctive pin
          this.startdate = this.data.data_pin.start_date;
          this.enddate = this.data.data_pin.end_date;
          this.starttime = this.data.data_pin.start_time;
          this.endtime = this.data.data_pin.end_time;
        }
        this.modal_pin = true;
      }
    },
    handleSubmit() {
      if (this.status === 'Knowledge') {
        if (this.data.post_channel.channel.channel_type === 'Project') {
          point('add', { tag: 'post_project_verified', post_id: this.data.id });
        } else {
          point('add', { tag: 'post_general_verified', post_id: this.data.id });
        }
      }
      const { id } = this.data;
      if (!this.status) {
        Notify.create({
          message: 'Pilih salah satu!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else if (this.status === 'Kmap') {
        if (this.kmap.knowledge !== null && this.kmap.type !== null) {
          const params = {
            content_type: this.kmap.type,
            knowledge_tree_id: this.kmap.knowledge.value,
            post_id: id
          };
          knowledgeCreate(params).then(res => {
            if (res.message === 'OK') {
              postUpdate(id, { status: this.status }).then(res1 => {
                if (res1.message === 'OK') {
                  this.modal_verify = false;
                  this.$emit('reload');
                }
              });
            }
          });
        } else {
          this.$q.notify({
            message: 'Knowledge Map Post not Saved!',
            color: 'red',
            icon: 'warning'
          });
        }
      } else if (this.status === 'Limit') {
        this.limit_url = `${window.location.origin}/channel/${this.data.post_channel.channel_id}/${this.data.id}`;
        postUpdate(id, { limited: true, post_limit: this.limit_list, created_by: getLoginId() }).then(res => {
          if (res.message === 'OK') {
            this.modal_verify = false;
            this.$emit('reload');
          }
        });
        this.limit_list.forEach(v => {
          this.sendMessage(v.users_id);
        });
      } else {
        postUpdate(id, { status: this.status }).then(res => {
          if (res.message === 'OK') {
            this.modal_verify = false;
            this.$emit('reload');
          }
        });
      }
      bus.$emit('update_point');
    },
    handleArchive() {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure want to Archive this Post from ${this.data.post_channel.channel.name} channel?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        let state = null;
        if (this.data.pinned_by === null) {
          state = getLoginId();
        }
        postUpdate(this.data.id, { pinned_by: state }).then(res => {
          if (res.message === 'OK') {
            this.$emit('update_channel', this.$route.params.id);
            Notify.create({
              message: 'Success',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'done',
              detail: 'Post Archived successfully'
            });
          }
        });
      });
    },
    handleBookmark() {
      // console.log('Bookmark');
      if (this.data.bookmark.length) {
        postBookmarkDelete(this.data.bookmark[0].id).then(res => {
          Notify.create({
            message: 'Post Unbookmarked successfully',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'done'
          });
          this.data.bookmark.shift();
        });
      } else {
        postBookmarkCreate({ post_id: this.data.id }).then(res => {
          this.data.bookmark.push(res.data);
          Notify.create({
            message: 'Post bookmarked successfully',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'done'
          });
        });
      }
    },
    handleEditPost(item) {
      // console.log('edit');
      this.$emit('handle_edit', item);
    },
    handleForward() {
      this.search_channel_model = [];
      this.data_channel = [];
      this.modal_forward = true;
    },
    handleDeletePost(item) {
      // console.log('delete');
      // console.log(item);
      this.$emit('handle_delete', item);
    },
    handleDeletePin(item) {
      // console.log(item.data_pin);
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to unpin this Post?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        postPinDelete(item.data_pin.id).then(res => {
          this.$emit('update_post');
          Notify.create({
            message: 'Post unpinned.',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
        });
      });
    },
    handleClose() {
      this.$emit('onClose');
    },
    handleSubmitReport() {
      postReport({
        post_id: this.data.id,
        reason: this.reason,
        users_id: this.loginId
      }).then(res => {
        if (res.message === 'OK') {
          Notify.create({
            message: 'Thank you for your report.',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          this.$emit('update_post');
          this.modal_report = false;
        }
      });
    },
    handleSubmitPin() {
      // if (!this.data.pin || !this.data.data_pin) {
      //   this.$refs.startdate.validate();
      //   this.$refs.enddate.validate();
      //   this.$refs.starttime.validate();
      //   this.$refs.endtime.validate();
      //   if (this.$refs.startdate.hasError || this.$refs.enddate.hasError || this.$refs.starttime.hasError || this.$refs.endtime.hasError) {
      //     this.formHasError = true;
      //   }
      // }
      console.log('post pinned!');
      if (this.startdate === '' || this.enddate === '' || this.starttime === '' || this.endtime === '') {
        Notify.create({
          message: 'Please fill all!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'check'
        });
      } else {
        const dataPost = {
          post_id: this.data.id,
          start_date: this.startdate,
          end_date: this.enddate,
          start_time: this.starttime,
          end_time: this.endtime
        };
        postPinCreate(dataPost).then(response => {
          Notify.create({
            message: 'Post pinned successfully.',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          setTimeout(() => {
            this.$emit('update_post');
            this.modal_pin = false;
          }, 500);
        });
      }
    },
    changeStatus() {
      if (this.status !== 'Kmap') {
        this.kmap.direktorat = null;
        this.kmapSelectDefault();
      }
    },
    getUserRole() {
      const Role = checkRole().name;
      if (Role === 'km_manager') {
        this.is_km_manager = true;
      }
      if (Role === 'channel_manager') {
        this.is_channel_manager = true;
      }
      if (Role === 'content_manager') {
        this.is_content_manager = true;
      }
      const data = this.state;
      if (data === 'Admin' || data === 'Channel Manager') {
        this.role_channel = 'Admin';
      } else {
        this.role_channel = 'Member';
      }
      if (this.user.id === this.user_data.id || this.is_km_manager === true || this.is_content_manager === true) {
        this.role_edit = true;
      }
      if (this.user.id === this.user_data.id || this.is_km_manager === true) {
        this.role_delete = true;
      }
      if (this.is_km_manager === true || this.is_content_manager === true) {
        this.role_verify = true;
      }
      if (((this.is_km_manager === true || this.is_content_manager === true) && ['General', 'Direktorat'].includes(this.channel.channel_type)) || (this.role_channel === 'Admin' && ['Project', 'Hobby', 'COP'].includes(this.channel.channel_type) && this.channel.id === this.data.post_channel.channel.id)) {
        this.role_pin = true;
      }
      if (((this.is_km_manager === true || this.is_content_manager === true) && ['General', 'Direktorat'].includes(this.channel.channel_type)) || (this.role_channel === 'Admin' && ['Project', 'Hobby', 'COP'].includes(this.channel.channel_type) && this.channel.id === this.data.post_channel.channel.id)) {
        this.role_unpin = true;
      }
      if (this.role_channel === 'Admin') {
        this.role_archive = true;
      } else {
        this.role_archive = false;
      }
      if (this.is_km_manager === true && this.data.post_channel.channel.channel_type === 'General') {
        this.role_archive = true;
      }
      if (this.data.post_channel.channel.channel_type === 'Direktorat' && (this.is_content_manager === true || this.is_channel_manager === true)) {
        this.role_archive = true;
      }
      if (this.user.id === this.user_data.id || this.is_km_manager === true || this.is_content_manager === true || this.role_channel === 'Admin') {
        this.option_post = true;
      }
    },
    getDirektorat() {
      knowledgeTreeDirektorat().then(res => {
        const root = res.data;
        this.default_direktorat_all = root
          .filter(item => item.channel !== null);
        // this.default_direktorat = root
        //   .filter(item => item.channel !== null)
        //   .filter(item => item.channel.enabled === true)
        //   .filter(item => item.channel.channel_member.length > 0);
      });
    },
    getKMap() {
      this.kmapSelectDefault();
      setTimeout(() => {
        knowledgeTreeById({ id: this.user_data.id }).then(res => {
          this.idSelect = res.data[0].id;
          organizationList({ groups: 'Unit Kerja', limit: 1000 }).then(response => {
            const hasil = response.data.map((v0, k0) => {
              const tree_level_1 = v0.children.map((v1, k1) => {
                let sort_1 = 9;
                if (v1.name.toLowerCase().includes('inspektorat')) sort_1 = 0;
                if (v1.name.toLowerCase().includes('sekretariat')) sort_1 = 1;
                const tree_level_2 = v1.children.map((v2, k2) => {
                  let sort_2 = 9;
                  if (v2.name.toLowerCase().includes('sekretariat')) sort_2 = 0;
                  const channel_direktorat = this.default_direktorat_all.find(x => x.channel.organization_id === v2.id);
                  const cek1 = (channel_direktorat !== undefined) ? channel_direktorat.channel_id : 0;
                  if (cek1 === this.idSelect) {
                    this.kmap.direktorat = {
                      id: v2.id
                    };
                    const node2 = { value: (channel_direktorat !== undefined) ? channel_direktorat.channel_id : 0 };
                    this.direktoratSelect(node2);
                  }
                  return {
                    id: v2.id,
                    value: (channel_direktorat !== undefined) ? channel_direktorat.channel_id : 0,
                    name: v2.name,
                    level: 2,
                    sort: sort_2
                  };
                });

                const channel_direktorat = this.default_direktorat_all.find(x => x.channel.organization_id === v1.id);
                const cek2 = (channel_direktorat !== undefined) ? channel_direktorat.channel_id : 0;
                if (cek2 === this.idSelect) {
                  this.kmap.direktorat = {
                    id: v1.id
                  };
                  const node = [{ value: (channel_direktorat !== undefined) ? channel_direktorat.channel_id : 0 }];
                  this.direktoratSelect(node);
                }
                return {
                  id: v1.id,
                  value: (channel_direktorat !== undefined) ? channel_direktorat.channel_id : 0,
                  name: v1.name,
                  level: 1,
                  sort: sort_1,
                  children: tree_level_2
                    .sort((a, b) => (a.sort > b.sort ? 1 : -1))
                };
              });
              return {
                id: v0.id,
                name: v0.name,
                level: 0,
                children: tree_level_1
                  .sort((a, b) => (a.sort > b.sort ? 1 : -1))
              };
            });

            this.kmap.direktorat_options = [{
              id: 0,
              name: 'Komisi Pemberantasan Korupsi',
              selected: true,
              children: hasil
            }];
          });
        });
      }, 500);
    },
    kmapSelectDefault() {
      this.kmap.business = null;
      this.kmap.strategic = null;
      this.kmap.knowledge = null;
      this.kmap.type = null;
    },
    direktoratSelect(node) {
      this.kmapSelectDefault();
      setTimeout(() => {
        this.kmap.channel_id = node.value;
        if (node.value) {
          knowledgeTreeList({ id: node.value }).then(res => {
            const business = res.data[0].children.map(b => {
              return {
                value: b.id,
                label: b.title,
                subLabel: b.subtitle,
                children: b.children
              };
            });
            this.kmap.business_options = business;
          });
        } else {
          this.kmap.business = null;
          this.kmap.business_options = [];
          this.kmap.strategic = null;
          this.kmap.strategic_options = [];
          this.kmap.knowledge = null;
          this.kmap.knowledge_options = [];
        }
      }, 0);
    },
    businessSelect(node) {
      setTimeout(() => {
        const strategic = this.kmap.business_options.find(f => { return f.value === node.value; }).children.map(b => {
          return {
            value: b.id,
            label: b.title,
            subLabel: b.subtitle,
            children: b.children
          };
        });
        this.kmap.strategic_options = strategic || [];
      }, 0);
    },
    strategicSelect(node) {
      setTimeout(() => {
        const knowledge = this.kmap.strategic_options.find(f => { return f.value === node.value; }).children.map(b => {
          return {
            value: b.id,
            label: b.title,
            subLabel: b.subtitle
          };
        });
        this.kmap.knowledge_options = knowledge || [];
      }, 0);
    },
    handleShare() {
      console.log('share!');
    },
    setStartDate() {
      this.$refs.qDateProxyStart.hide();
      this.enddate = this.startdate;
    },
    setStartTime() {
      this.$refs.qTimeProxyStart.hide();
      this.endtime = this.starttime;
    },
    optionsFn(date) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();

      today = `${yyyy}/${mm}/${dd}`;
      return date >= today;
    },
    submitForward(id) {
      console.log(id);
      postForward({ channel_id: id, post_id: this.data.id }).then(res => {
        console.log(res);
        if (res.message === 'OK') {
          Notify.create({
            message: 'Post forwarded',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
        } else {
          Notify.create({
            message: res.message,
            timeout: 1000,
            type: 'negative',
            color: 'negative',
            icon: 'check'
          });
        }
      });
      this.data_channel = '';
      this.modal_forward = false;
    },
    filterFnChannel(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.data_channel = [];
          } else {
            this.data_channel = [];
            const needle = val.toLowerCase();
            get({
              path: `api/search?keyword=${needle}&includes=channel`
            }).then(res => {
              const response = res.data;
              if (response.length < 1) {
                const datanotfound = [{
                  name: 'Data not found',
                  disable: true
                }];
                this.data_channel = datanotfound;
              } else {
                const searchFormated = response.map((v, i) => {
                  return {
                    avatar: v.channel.avatar ? this.url + v.channel.avatar : false,
                    value: v.channel.id,
                    id: v.channel.id,
                    is_private: v.channel.is_private,
                    name: v.channel.name,
                    description: '',
                    channel_type: v.channel.channel_type
                  };
                });
                this.data_channel = searchFormated;
              }
              this.$refs.search_channel.refresh();
            });
          }
        });
      }, 500);
    },
    sendMessage(id) {
      checkMessage({ created_by: this.user.id, users_id: id }).then(response => {
        if (response.data === 'not found') {
          const a_new_message = {
            enabled: true,
            message_participant: [
              {
                created_by: this.user.id,
                users_id: id
              },
              {
                created_by: id,
                users_id: this.user.id
              }
            ]
          };
          this.postCreateNewMessage(a_new_message).then(res => {
            this.msg_id = res.message.id;
            this.saveMsg();
            this.$root.$emit('updateMessage', ('create', this.msg_id));
          });
        } else {
          this.msg_id = response.data.message_id;
          this.saveMsg();
        }
      });
    },
    saveMsg() {
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
        message_id: this.msg_id,
        prev_user_id: 0,
        text: this.limit_url,
        read_users: `{${getLoginId()}}`,
        file_id: null
      };

      const new_data = {
        message: {
          message_id: this.msg_id,
          chat: new_message
        }
      };

      postPrivateMessage({ ...new_data })
        .then(resp => {
          new_message.id = this.msg_id;

          this.$store.dispatch('privateMessage/updateMessageListByMessageId', {
            message_id: this.msg_id,
            chat: [{ ...new_message }]
          });
          console.log('berhasil');
        });
      this.$store.dispatch('privateMessage/updateOfflineAllMemberList', new_message.created_by.id);
    }
  },
  mounted() {
    this.getUserRole();
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.channel_id = value;
        }
      }
    },
    data: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.profile_picture = value.created_by_user.profile_picture ? process.env.QUASAR_API_URL + value.created_by_user.profile_picture : null;
          this.status = value.status.toLowerCase() === 'unverified' ? null : capitalize(value.status);
          this.user_data = value.created_by_user;
          this.getChannelAccess();
        }
      }
    },
    show_menu: {
      immediate: true,
      handler(value) {
        if (value !== undefined) {
          this.is_show_menu = value;
        }
      }
    },
    show_close: {
      immediate: true,
      handler(value) {
        if (value !== undefined) {
          this.is_show_close = value;
        }
      }
    },
    show_edit: {
      immediate: true,
      handler(value) {
        if (value !== undefined) {
          this.is_show_edit = value;
        }
      }
    }
  }
};
</script>

<style>
  .text-limit {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
