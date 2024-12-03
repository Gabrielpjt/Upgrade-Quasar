<template>
  <div :class="$q.platform.is.mobile ? 'items-start q-mb-lg' : 'items-start kmp-sticky'">
    <q-card class="my-card">
      <!-- <q-btn flat round color="primary" class="text-neutral float-right mobile-only" icon="close" @click="closeInfo()"/>
      <q-icon name="close" size="24px" class="text-neutral float-right q-ma-md mobile-only" @click="closeInfo()"/> -->
      <q-card-section v-if="channel_banner" class="q-pa-none q-mb-sm">
        <q-img :src="channel_banner" fit="cover" style="max-width: 100vw; height: 150px; border-top-right-radius: 8px; border-top-left-radius: 8px">
          <div hidden class="absolute-bottom-left" style="padding: 5px 15px">
            <q-avatar v-if="channel_avatar" class="q-mr-sm" size="40px">
              <img :src="channel_avatar">
            </q-avatar>
            <span v-if="!channel_avatar">
              <q-icon v-if="data.channel_type === 'General'" name="public" class="text-neutral q-mr-sm" size="30px" />
              <q-icon v-if="data.channel_type === 'Direktorat'" name="domain" class="text-neutral q-mr-sm" size="30px" />
              <q-icon v-if="data.channel_type === 'COP'" name="group_add" class="text-neutral q-mr-sm" size="30px" />
              <q-icon v-if="data.channel_type === 'Project'" name="chat_bubble" class="text-neutral q-mr-sm" size="30px" />
              <q-icon v-if="data.channel_type === 'Hobby'" name="sports_esports" class="text-neutral q-mr-sm" size="30px" />
            </span>
            <span class="text-white kmp-font-bold kmp-font-lg">{{ data.short_name }}</span>
            <!--          <q-icon name="close" size="24px" class="text-neutral float-right"/>-->
            <!--
            <q-space />
            <div>
              <q-icon name="settings" size="sm" class="text-neutral cursor-pointer" @click="openDialog('setting_channel', data)">
                <q-tooltip>
                  Setting Channel
                </q-tooltip>
              </q-icon>
            </div>
            -->
          </div>
        </q-img>
      </q-card-section>
      <q-card-section :class="channel_banner ? 'q-py-xs' : ''">
        <q-btn flat round icon="close" @click="closeInfo()" class="float-right mobile-only"/>
        <div class="row items-center">
          <q-avatar v-if="channel_avatar" class="q-mr-sm" size="40px">
            <img :src="channel_avatar">
          </q-avatar>
          <span v-if="!channel_avatar">
          <q-icon v-if="data.channel_type === 'General'" name="public" class="text-neutral q-mr-sm" size="30px" />
          <q-icon v-if="data.channel_type === 'Direktorat'" name="domain" class="text-neutral q-mr-sm" size="30px" />
          <q-icon v-if="data.channel_type === 'COP'" name="group_add" class="text-neutral q-mr-sm" size="30px" />
          <q-icon v-if="data.channel_type === 'Project'" name="chat_bubble" class="text-neutral q-mr-sm" size="30px" />
          <q-icon v-if="data.channel_type === 'Hobby'" name="sports_esports" class="text-neutral q-mr-sm" size="30px" />
          </span>
          <span class="text-neutral kmp-font-bold kmp-font-lg">{{ data.short_name }}</span>
          <!--          <q-icon name="close" size="24px" class="text-neutral float-right"/>-->
        </div>
      </q-card-section>
      <q-scroll-area :style="scroll_style">
        <q-card-section class="request q-mt-md" v-if="state === 'Admin' && data_request.length > 0">
          <div class="q-pb-sm text-neutral text-normal">REQUEST</div>
          <!--
          <q-card-actions align="left" class="text-primary">
            <q-btn class="btn-primary-color publish-button q-mr-xs float-right" label="Select All" size="sm" @click="selectAll" v-if="request_selection.length < id_request.length"></q-btn>
            <q-btn class="bg-white text-primary publish-button q-mr-xs float-right" outline label="Unselect All" size="sm" @click="unselectAll" v-if="request_selection.length >= id_request.length"></q-btn>
          </q-card-actions>
          -->
          <q-card-section class="q-pa-none q-py-xs row">
            <q-checkbox size="xs" toggle-order="ft" color="primary" class="kmp-font-bold"
                        v-model="request_check_all"
                        @input="checkAll(request_check_all)"
                        label="Select All"/>
            <span style="display: none">{{ request_selection }} | {{ request_channel }}</span>
            <q-space/>
            <div v-show="request_check_all">
              <q-btn round color="positive" class="q-mr-sm" icon="check" style="border-radius: 20px;" size="sm"
                     @click="handleRequest(request_selection, 'Member');"/>
              <q-btn round color="negative" icon="clear" style="border-radius: 20px;" size="sm"
                     @click="handleRequest(request_selection, 'Decline');"/>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-none q-py-xs row" v-for="(item, index) in data_request" :key="index">
            <q-checkbox size="xs" v-model="request_selection" :val="item.id" color="primary"></q-checkbox>
            <q-item-section avatar class="q-py-none">
              <q-avatar size="24px" v-if="item.user.profile_picture !== null">
                <img :src="item.user.profile_picture_custom">
              </q-avatar>
              <q-avatar size="24px" v-if="item.user.profile_picture === null" color="primary" text-color="white">
                {{ item.user.name.match(/\b(\w)/g).join('').toUpperCase() }}
              </q-avatar>
            </q-item-section>
            <q-item-section class="list-member">{{ item.user.name }}</q-item-section>
            <q-space/>
            <div>
              <q-btn round color="positive" class="q-mr-sm" icon="check" style="border-radius: 20px;" size="sm"
                     @click="handleRequest(item.id, 'Member');"/>
              <q-btn round color="negative" icon="clear" style="border-radius: 20px;" size="sm"
                     @click="handleRequest(item.id, 'Decline');"/>
            </div>

          </q-card-section>
          <!--
          <div class="q-pa-md q-gutter-sm">
            <q-btn class="btn-primary-color publish-button q-mr-xs" unelevated size="xs"
                   @click="handleRequest(item.id, 'Member');">Confirm
            </q-btn>
            <q-btn class="bg-white text-primary float-right" outline label="Decline" unelevated size="xs"
                   @click="handleRequest(item.id, 'Decline');"/>
          </div>
          <q-card-actions align="right" class="text-primary q-px-none q-pb-none" v-show="request_check_all">
            <q-btn @click="handleRequest(request_selection, 'Member');" class="btn-primary-color float-right publish-button" label="Confirm Selection" size="sm" unelevated/>
            <q-btn @click="handleRequest(request_selection, 'Decline');" class="bg-white text-primary float-right publish-button" outline label="Decline Selection" size="sm" unelevated/>
          </q-card-actions>
          -->

        </q-card-section>
        <q-card-section>
          <div class="" v-if="data.channel_type !== 'General'">
            <span class="text-neutral kmp-font-md kmp-font-bold">TOOLS</span>
          </div>
          <ChannelTools :data="data" :state="state" :user="user" :is_content_manager="is_content_manager" :is_channel_manager="is_channel_manager" :is_km_manager="is_km_manager" @handleMember="handleMember()" @loading="loading" @handleJoin="saveMember('Join')" @handleDeleteMember="handleDeleteMember(channel_member_user.id, 'Member');"/>
          <div class="">
            <span class="text-neutral kmp-font-md kmp-font-bold">CHANNEL DESCRIPTIONS</span>
          </div>
          <q-card class="my-card neutral-card q-pa-none">
            <q-card-section class="q-pa-sm">
              <!-- <div class="" style="white-space: normal;">
                {{ data.description }}
              </div> -->
              <div class="q-mt-sm" style="white-space: pre-line;" v-if="data.scan.textLimit === null" v-html="data.scan.text"></div>
              <div v-else="">
                <div v-if="more_desc">
                  <div class="text-content q-mt-sm" style="white-space: pre-line;" v-html="data.scan.textLimit"></div>
                  <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3;" @click="handleDescription()">
                    Read more
                  </div>
                </div>
                <div v-if="!more_desc">
                  <div class="text-content q-mt-sm" style="white-space: pre-line;" v-html="data.scan.text"></div>
                  <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3" @click="handleDescription()">Read less</div>
                </div>
              </div>
              <!--            <div class="text-more">-->
              <!--              See More-->
              <!--            </div>-->
            </q-card-section>
          </q-card>
          <div class="q-py-md">
            <q-tabs
              v-model="tab"
              dense
              align="left"
              class="shadow-0"
              :breakpoint="0"
            >
              <q-tab name="identity" v-if="data.channel_type === 'COP'" style="font-size: 12px">Identitas CoP</q-tab>
              <q-tab name="member" v-if="data.channel_type !== 'General'" style="font-size: 12px">Member ({{data_member.length}})</q-tab>
              <q-tab name="pinned" style="font-size: 12px">Archive</q-tab>
              <q-tab name="knowledge" style="font-size: 12px">Knowledge</q-tab>
            </q-tabs>
            <q-separator/>
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="identity">
                <span class="text-neutral kmp-font-md kmp-font-bold" v-show="data.cop_organisasi !== null">Manfaat bagi Organisasi</span>
                <div class="q-mt-sm q-mb-lg" style="white-space: pre-line;" v-html="data.cop_organisasi" v-show="data.cop_organisasi !== null"></div>
                <span class="text-neutral kmp-font-md kmp-font-bold" v-show="data.cop_komunitas !== null">Manfaat bagi Anggota Komunitas</span>
                <div class="q-mt-sm q-mb-lg" style="white-space: pre-line;" v-html="data.cop_komunitas" v-show="data.cop_komunitas !== null"></div>
                <span class="text-neutral kmp-font-md kmp-font-bold" v-show="data.cop_minat !== null">Minat Komunitas</span>
                <div class="q-mt-sm q-mb-lg" style="white-space: pre-line;" v-html="data.cop_minat" v-show="data.cop_minat !== null"></div>
                <span class="text-neutral kmp-font-md kmp-font-bold" v-show="data.cop_fokus !== null">Fokus Pengetahuan</span>
                <div class="q-mt-sm q-mb-lg" style="white-space: pre-line;" v-html="data.cop_fokus" v-show="data.cop_fokus !== null" ></div>
                <span class="text-neutral kmp-font-md kmp-font-bold" v-show="data.cop_aturan !== null">Aturan Dasar</span>
                <div class="q-mt-sm" style="white-space: pre-line;" v-html="data.cop_aturan" v-show="data.cop_aturan !== null"></div>
              </q-tab-panel>
              <q-tab-panel v-if="data.channel_type !== 'General'" class="member" style="padding-left: 0px;padding-right: 0px;" name="member">
                <div v-for="(item, index) in data_member" :key="index">
                  <q-item
                    dense
                    clickable
                    v-ripple
                    class="kmp-menu-left q-py-xs q-my-xs q-px-sm q-pr-none"
                    @click="handleChangeMember(item);"
                  >
                    <q-item-section avatar style="">
                      <q-avatar size="24px" v-if="item.user.profile_picture !== null">
                        <img :src="item.user.profile_picture_custom">
                      </q-avatar>
                      <q-avatar size="24px" v-if="item.user.profile_picture === null" color="primary" text-color="white">
                        {{ item.user.name.match(/\b(\w)/g).join('').toUpperCase() }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section class="list-member text-capitalize">{{ item.user.name.toUpperCase() }}</q-item-section>
                    <q-item-section side v-if="item.member_role !== 'Member'">
                      <div class="row items-center">
                        <q-badge class="blue-badge" v-if="item.member_role === 'Admin'" label="Admin"/>
                        <q-badge class="blue-badge" v-if="item.member_role === 'Channel Manager'" label="Admin"/>
                        <q-badge class="green-badge" v-if="item.member_role === 'Expertise'" label="Expertise"/>
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
              </q-tab-panel>
              <q-tab-panel name="pinned">
                <q-item clickable v-ripple class=""
                        v-for="(item, index) in post_channel_pinned" :key="index"
                >
                  <div class="col-1 q-mt-xs">
                    <q-avatar bordered size="30px" style="border-color: #FFFFFF;background-color: #CDEAFF;color: #1976D2" icon="description" />
                  </div>
                  <div class="col-10">
                    <q-item-section class="q-ml-md" @click="openUrl(item.post[0].id,data.id)">
                      <q-item-label class="kmp-font-bold kmp-text-grey-2">{{item.post[0].title}}</q-item-label>
                      <q-item-label class="kmp-font-small text-grey-7">Created by {{item.post[0].created_by_user.name}}</q-item-label>
                    </q-item-section>
                  </div>
                  <div class="col-1 q-mt-xs text-right" v-if="role_archive === true">
                    <q-icon name="delete" size="20px" class="" @click="handleArchiveDel(item.post[0].id)"/>
                  </div>
                </q-item>
                <!-- <div class="kmp-font-md">No Pinned Post Available</div> -->
              </q-tab-panel>
              <q-tab-panel name="knowledge">

                <q-item clickable v-ripple class=""
                        v-for="(item, index) in post_channel_verified" :key="index"
                >
                  <div class="col-1 q-mt-xs">
                    <q-avatar bordered size="30px" style="border-color: #FFFFFF;background-color: #CDEAFF;color: #1976D2" icon="description" />
                  </div>
                  <div class="col-10">
                    <q-item-section class="q-ml-md" @click="openUrl(item.post[0].id,data.id)">
                      <q-item-label class="kmp-font-bold kmp-text-grey-2">{{item.post[0].title}}</q-item-label>
                      <q-item-label class="kmp-font-small text-grey-7">Created by {{item.post[0].created_by_user.name}}</q-item-label>
                    </q-item-section>
                  </div>
                  <div class="col-1 q-mt-xs text-right" v-if="is_km_manager === true || is_content_manager === true">
                    <q-icon name="delete" size="20px" class="" @click="handleKnowledgeDel(item.post[0].id, item.post[0].status)"/>
                  </div>
                </q-item>

                <!-- <div class="kmp-font-md">No Post as Knowledge Available</div> -->
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </q-card-section>
      </q-scroll-area>
      <q-inner-loading :showing="card_visible">
        <q-spinner size="50px" color="primary"/>
      </q-inner-loading>
    </q-card>
    <q-dialog v-model="add_member">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section class="q-px-lg">
          <q-icon name="close" size="24px" class="text-neutral float-right" v-close-popup/>
          <div class="text-title-form q-mb-md text-capitalize">Add Member to {{data.name}}</div>
        </q-card-section>
        <q-card-section class="q-px-lg">
          <q-select
            ref="search_user"
            v-model="search_user_model"
            outlined
            use-input
            dense
            input-debounce="0"
            label="Search user"
            :options="data_user"
            @filter="filterFnUser"
            @filter-abort="abortFilterFn"
            @input="saveMember('Create')"
            style="width: 100%"
            class="kmp-rounded"
            hide-dropdown-icon
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section avatar style="">
                  <q-avatar size="24px" v-if="scope.opt.description !== 'inisial'">
                    <img src="">
                  </q-avatar>
                  <q-avatar size="24px" v-if="scope.opt.description === 'inisial'" color="primary" text-color="white">
                    {{ scope.opt.label.match(/\b(\w)/g).join('').toUpperCase() }}
                  </q-avatar>
                </q-item-section>
                <q-item-section class="list-member">{{ scope.opt.label }}</q-item-section>
                <q-item-section side v-show="scope.opt.tag !== undefined">{{ scope.opt.tag }}</q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section class="q-px-lg">
          <q-list>
            <div
              v-for="(item, index) in finish_user"
              :key="index"
            >
              <ChannelListUser :user="item.user" :item="item" @delete_member="handleDeleteMember(item.id, 'Admin')"/>
            </div>
          </q-list>
        </q-card-section>

      </q-card>
    </q-dialog>
    <q-dialog v-model="member_modal">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section class="q-px-lg">
          <q-icon name="close" size="24px" class="text-neutral float-right" v-close-popup/>
          <div class="text-title-form q-md-sm text-capitalize">{{ selected_user.user.name }}</div>
          <div class="">Member of {{data.name}}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <q-item class="q-px-none">
                <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm q-mr-md">
                  <q-avatar size="36px">
                    <img v-if="selected_user.user.profile_picture !== null"
                         :src="selected_user.user.profile_picture_custom">
                    <q-avatar size="36px" color="primary" text-color="white" v-else>
                      {{ selected_user.user.name.match(/\b(\w)/g).join('').toUpperCase() }}
                    </q-avatar>
                  </q-avatar>
                </q-item-section>
                <q-item-section class="list-member text-capitalize">{{ selected_user.user.name }}</q-item-section>
                <q-item-section side>
                  <q-btn class="text-primary" outline unelevated no-caps @click="$router.push({ name: 'profile-detail', params: { id: selected_user.user.id } })">Show Profile
                  </q-btn>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>
        <div v-if="(['Admin','Channel Manager'].includes(state) && selected_user.user.id !== login_id) || ((is_channel_manager || is_content_manager) && state !== 'guest') || (is_km_manager  && data.channel_type === 'Direktorat')">
          <q-card-section class="q-py-none" v-if="(['Admin','Channel Manager'].includes(state) && selected_user.user.id !== login_id)">
          <q-list>
              <q-item tag="label" v-ripple>
              <q-item-section avatar>
                  <q-toggle
                  v-model="selected_user.manager"
                  checked-icon="check"
                  color="blue"
                  size="lg"
                  />
              </q-item-section>
              <q-item-section>
                  <q-item-label>Admin</q-item-label>
              </q-item-section>
              </q-item>
          </q-list>
          </q-card-section>
          <q-card-actions align="right" class="">
          <q-btn v-if="data.channel_type === 'Direktorat' && is_km_manager" color=""
                  class="text-primary float-right q-mr-sm" outline unelevated no-caps @click="transferClick()"
                  >Transfer Member
          </q-btn>
          <q-btn v-if="data.channel_type !== 'Direktorat'" color="km-red"
                  class="float-right q-mr-sm" outline unelevated v-close-popup no-caps
                  @click="handleDeleteMember(selected_user.id, 'Admin');">Remove Member
          </q-btn>
          <q-btn v-if="(['Admin','Channel Manager'].includes(state) && selected_user.user.id !== login_id)"
              class="btn-primary-color float-right q-mr-sm publish-button"
              label="Update" unelevated v-close-popup
              @click="saveRole(selected_user.id);"
          />
          </q-card-actions>
          <q-card-section v-if="transfer">
            <div class="q-gutter-y-md column">
              <div class="column text-grey-7">
                <div class="col q-mb-md">
                  <label class="label-form">Unit Kerja</label>
                  <q-select
                    v-model="unit_kerja_id"
                    :options="options_unit_kerja"
                    emit-value
                    map-options />
                </div>
              </div>
              <div class="col q-mb-md" align="right">
                <q-linear-progress v-if="loading_request" indeterminate rounded color="negative" class="q-my-sm"/>
                <q-btn v-else color="primary" label="Request" @click="handleRequestUK" />
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ChannelTools from 'components/ChannelTools';
import ChannelListUser from 'components/ChannelListUser';
import { getLoginId } from 'src/lib/helper';
import { Notify } from 'quasar';
import '../css/vue-treeselect.css';
import bus from 'components/common/EventBus';
import { get } from '../lib/HttpHelper';
import {
  channelMemberUpdate,
  channelMemberConfirm, channelMemberDelete, channelJoin, channelAccess, channelMemberCreate, fileUpload, postUpdate,
  organizationListCustom, postProfileRequestJabatan
} from '../lib/api';
import { point } from '../lib/point';

export default {
  props: ['data', 'state', 'data_member', 'data_request', 'is_loading', 'heightObserver', 'id_member', 'user', 'channel_member_user', 'id_request', 'post_channel_verified', 'post_channel_pinned', 'is_channel_manager', 'is_km_manager', 'is_content_manager', 'role_archive'],
  components: { ChannelTools, ChannelListUser },
  data() {
    return {
      tab: 'member',
      add_member: false,
      card_visible: true,
      search_user_model: '',
      data_user: [],
      finish_user: [],
      user_options: this.data_user,
      member_modal: false,
      scroll_style: {
        height: '645px',
        minHeight: '200px'
      },
      options_role: [
        'Channel Manager', 'Member'
      ],
      selected_user: {
        id: '',
        member_role: '',
        manager: '',
        user: ''
      },
      request_selection: [],
      request_check_all: false,
      login_id: getLoginId(),
      more_desc: true,
      unit_kerja_id: null,
      options_unit_kerja: [],
      transfer: false,
      loading_request: false
    };
  },
  methods: {
    filterFnUser(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.data_user = [];
          } else {
            this.data_user = [];
            const needle = val.toLowerCase();
            const member_id = this.data_member.map(m => m.users_id);
            get({
              path: `api/search?keyword=${needle}&includes=user`
            }).then(res => {
              // const response = res.data.filter(item => !this.id_member.includes(item.users_id)).filter(a => a.member_role !== 'Admin');
              const response = res.data;
              if (response.length < 1) {
                const datanotfound = [{
                  label: 'Data not found',
                  disable: true
                }];
                this.data_user = datanotfound;
              } else {
                const searchFormated = response.map((v, i) => {
                  let des1 = 'inisial';
                  if (v.user.profile_picture === '') {
                    des1 = v.user.profile_picture;
                  }
                  if (member_id.includes(v.user.id)) {
                    return {
                      label: v.user.name.toUpperCase(),
                      value: v.user.id,
                      description: des1,
                      disable: true,
                      tag: 'already added'
                    };
                  }
                  return {
                    label: v.user.name.toUpperCase(),
                    value: v.user.id,
                    description: des1
                  };
                });
                this.data_user = searchFormated;
              }
              this.$refs.search_user.refresh();
            });
          }
        });
      }, 500);
    },
    // getUser() {
    //   SearchData({ includes: 'user' }).then(response => {
    //     const hasil = response.data.filter(item => !this.id_member.includes(item.users_id));
    //     this.data_user = hasil.map(item => {
    //       let des = '';
    //       if (item.user[0].profile_picture !== '') {
    //         des = 'inisial';
    //       } else {
    //         des = item.user[0].profile_picture;
    //       }
    //       return {
    //         label: item.user[0].name,
    //         value: item.users_id,
    //         description: des
    //       };
    //     });
    //   });
    // },
    handleMember() {
      this.finish_user = [];
      this.add_member = true;
    },
    handleChangeMember(data_user) {
      let role = false;
      if (data_user.member_role !== 'Member') {
        role = true;
      }
      this.selected_user = {
        id: data_user.id,
        member_role: data_user.member_role,
        manager: role,
        user: data_user.user
      };
      this.member_modal = true;
    },
    saveRole(id) {
      this.loading('loading', 'is_loading', true);
      let role = '';
      if (this.selected_user.manager === true) {
        role = 'Admin';
      } else {
        role = 'Member';
      }
      // console.log(role);
      channelMemberUpdate(id, { member_role: role }).then(response => {
        this.$emit('update_member', this.data_id);
        this.$q.notify({
          message: 'Change Role Member Success.',
          color: 'blue'
        });
      });
    },
    checkAll(val) {
      if (val) {
        this.request_selection = this.id_request;
      } else {
        this.request_selection = [];
      }
    },
    selectAll() {
      this.request_selection = this.id_request;
    },
    unselectAll() {
      this.request_selection = [];
    },
    handleJoin() {
      const detail_user = [];
      channelJoin(this.data.id).then(response => {
        detail_user.push(
          { id: response.data.id,
            user: response.data.user,
            member_role: response.data.member_role }
        );
        this.data_member = this.data_member.concat(detail_user);
        // this.is_loading = false;
        // this.$emit('loading', 'is_loading', false);
        this.$q.notify({
          message: 'Success.',
          color: 'blue'
        });
      });
    },
    loading(key, selected) {
      this.$emit('loading', 'is_loading', selected);
    },
    saveMember(type) {
      // this.is_loading = true;
      this.$emit('loading', 'is_loading', true);
      const dataMember =
        {
          join_type: type,
          enabled: true,
          channel_id: this.data.id,
          users_id: this.search_user_model.value,
          member_role: 'Member'
        };
      let msg = '';
      if (type === 'Join') {
        msg = 'You are join this channel successfully';
        dataMember.users_id = this.user.id;
        if (this.data.is_private === true) {
          msg = 'Your request to join this channel has been sent';
          dataMember.member_role = 'Request';
          dataMember.enabled = false;
        }
      } else {
        msg = 'Member Added';
      }
      const detail_user = [];
      this.search_user_model = '';
      channelAccess(dataMember.channel_id, dataMember.users_id).then(res => {
        if (res.data.length === 0) {
          channelMemberCreate(dataMember).then(response => {
            if (type === 'Join') {
              if (this.data.channel_type === 'Project') {
                point('add', { tag: 'channel_follow_project', channel_id: this.data.id });
              } else if (this.data.channel_type === 'Hobby') {
                point('add', { tag: 'channel_follow_hobby', channel_id: this.data.id });
              } else {
                point('add', { tag: 'channel_follow_cop', channel_id: this.data.id });
              }
            }

            // setTimeout(() => { this.$root.$emit('update_point'); }, 1400);
            // this.is_loading = false;
            this.$emit('loading', 'is_loading', false);
            detail_user.push(
              { id: response.data.id,
                user: response.data.user,
                member_role: response.data.member_role }
            );
            this.$q.notify({
              message: msg,
              color: 'blue'
            });
            // this.getUser();
            this.finish_user = this.finish_user.concat(detail_user);
            this.data_member = this.data_member.concat(detail_user);
          });
        } else {
          this.is_loading = false;
          Notify.create({
            message: 'Member already added to the group.',
            timeout: 1000,
            type: 'negative',
            color: 'negative',
            icon: 'warning'
          });
        }
      });
    },
    handleDeleteMember(data, status) {
      this.loading('loading', 'is_loading', true);
      let msg = '';
      let msg2 = '';
      if (status === 'Member') {
        msg = 'Are you sure want to leave this channel?';
        msg2 = 'You are leaving this channel';
      } else if (status === 'Admin') {
        msg = 'Are you sure want to delete this member?';
        msg2 = 'This user was successfully deleted';
      }
      const current_user = this.data_member.find(f => { return f.id === data; });
      const count_admin = this.data_member.filter(f => { return f.member_role !== 'Member'; }).length;
      if (current_user && current_user.member_role !== 'Member' && count_admin <= 1) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'make 1 member as an admin!',
          cancel: true,
          persistent: true
        });
      } else {
        this.$q.dialog({
          title: 'Confirm',
          message: msg,
          cancel: true,
          persistent: true
        }).onOk(() => {
          channelMemberDelete(data).then(response => {
            this.loading('loading', 'is_loading', false);
            if (status === 'Member') {
              if (this.data.channel_type === 'Project') {
                point('rollback', { tag: 'channel_follow_project', channel_id: this.data.id });
              } else if (this.data.channel_type === 'Hobby') {
                point('rollback', { tag: 'channel_follow_hobby', channel_id: this.data.id });
              } else {
                point('rollback', { tag: 'channel_follow_cop', channel_id: this.data.id });
              }
            }

            this.$emit('update_member', this.data_id);
            // this.getUser();
            this.$q.notify({
              message: msg2,
              color: 'blue'
            });
            if (this.finish_user.length > 0) {
              const removeIndex = this.finish_user.findIndex(v => v.id === data);
              this.finish_user = this.deleteList(this.finish_user, removeIndex);
            }
            const removeIndex = this.data_member.findIndex(v => v.id === data);
            this.data_member = this.deleteList(this.data_member, removeIndex);
          });
        }).onCancel(() => {
          console.log('>>>> Cancel');
        }).onDismiss(() => {
          console.log('I am triggered on both OK and Cancel');
        });
      }
    },
    abortFilterFn() {
      // console.log('delayed filter aborted')
    },
    deleteList(object, index) {
      object.splice(index, 1);
      return object;
    },
    handleRequest(data, hasil) {
      let msg = '';
      let stts = '';
      if (hasil === 'Member') {
        msg = 'Member Saved! '; stts = true;
      } else {
        msg = 'Member Decline! '; stts = false;
      }
      let slctd = false;
      let arr_data = [];
      if (data.length > 1) {
        slctd = true;
        arr_data = data;
      } else {
        arr_data.push(data);
      }
      channelMemberConfirm({ id: arr_data, member_role: hasil, enabled: stts, selected: slctd }).then(response => {
        this.request_selection = [];
        this.$q.notify({
          message: msg,
          color: 'blue'
        });
        this.$emit('update_member', this.data_id);
      });
    },
    openUrl(post, channel) {
      this.$router.push({
        name: 'channel-detail-post-detail',
        params: {
          id: channel,
          post_id: post
        }
      });
    },
    handleUploadBanner(files, content_type) {
      files.forEach((v, i, a) => {
        if (files[i].size >= 1 * 1024 * 1024) {
          Notify.create({
            message: `[ ${files[i].name} ] melebihi batas 1MB`,
            color: 'negative',
            icon: 'error'
          });
        } else {
          const formData = new FormData();
          formData.append('file[]', files[i]);
          fileUpload(formData).then(res => {
            this.setting_channel.data.banner = res.data[0].path;
          }).catch(error => {
            // console.log(error.response);
          });
        }
      });
    },
    handleDescription() {
      if (this.more_desc) {
        this.more_desc = false;
      } else {
        this.more_desc = true;
      }
    },
    saveChannel() {

    },
    closeInfo() {
      this.$emit('change_info');
    },
    handleArchiveDel(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this Post from archive?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        postUpdate(id, { pinned_by: null }).then(res => {
          if (res.message === 'OK') {
            this.$emit('update_member', this.data_id);
            Notify.create({
              message: 'Success',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'done',
              detail: 'Deleted Post Archived successfully'
            });
          }
        });
      });
    },
    handleKnowledgeDel(id, status) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this Post from Knowledge?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        postUpdate(id, { status: 'Unverified' }).then(res => {
          if (res.message === 'OK') {
            this.$emit('update_member', this.data_id);
            if (this.data.channel_type === 'Project') {
              point('rollback', { tag: 'post_project_verified', post_id: id });
            } else {
              point('rollback', { tag: 'post_general_verified', post_id: id });
            }
            Notify.create({
              message: 'Success',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'done',
              detail: 'Deleted Post Knowledge successfully'
            });
          }
          bus.$emit('update_point');
        });
      });
    },
    transferClick() {
      this.transfer = !this.transfer;
      if (this.transfer === true) {
        this.loadUnitKerja();
      }
    },
    loadUnitKerja() {
      const params = {};
      params.group = 'unit-kerja';
      this.options_unit_kerja = [];
      this.unit_kerja_id = null;
      organizationListCustom(params)
        .then(response => {
          this.options_unit_kerja = response.data;
          this.unit_kerja_id = this.profile.profile_unit_kerja_id;
        })
        .catch(error => {
        });
    },
    handleRequestUK() {
      this.loading_request = true;
      const params = {};
      params.users_id = this.selected_user.user.id;
      params.unit_kerja_id = this.unit_kerja_id;
      params.recomendation_by = this.user.id;
      postProfileRequestJabatan(params).then(res => {
        this.loading_request = false;
        this.member_modal = false;
        if (res.message === 'OK') {
          Notify.create({
            message: 'Request profile berhasil dikirim, menunggu konfirmasi!',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          this.$emit('evtClose');
        }
      });
    }
  },
  watch: {
    is_loading: {
      immediate: true,
      deep: true,
      handler(value) {
        this.card_visible = value;
      }
    },
    heightObserver: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value > 0) {
          this.scroll_style = {
            ...this.scroll_style,
            height: `${value - 160}px`
          };
        }
      }
    },
    'data.channel_type': {
      immediate: true,
      deep: true,
      handler(value) {
        if (value === 'General') {
          this.tab = 'pinned';
        }
      }
    }
  },
  mounted() {
  },
  computed: {
    channel_avatar() {
      const cek = this.data.avatar;
      return cek ? `${process.env.QUASAR_API_URL}${cek}` : false;
    },
    channel_banner() {
      const cek = this.data.banner;
      return cek ? `${process.env.QUASAR_API_URL}${cek}` : false;
    },
    request_channel() {
      const data_count = this.data_request.length;
      const check_count = this.request_selection.length;
      const all = data_count === check_count;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (all) { this.request_check_all = true; } else { this.request_check_all = false; }
      return all;
    }
    // ,
    // transfer() {
    //   const state = this.
    //   if (member_modal === true) {
    //     return
    //   }
    // }
  }
};
</script>

<style>
</style>
