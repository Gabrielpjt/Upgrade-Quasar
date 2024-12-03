<template>
  <q-page>
    <div style="padding-left: 80px;padding-right: 80px;padding-top: 24px;padding-bottom: 24px;">
      <div class="row justify-center">
        <div class="col-12 col-md-3">
          <div style="font-size:23px;color:black;font-weight:700;" class="q-ml-sm"><q-icon class="text-right" name="book" size="20px"/> Library</div>
        </div>
        <div class="col-12 col-md-9" :style="this.$q.screen.gt.lg ? 'max-width: 648px !important' : ''">
          <div style="font-size:15px;color:black;font-weight:700;" class="q-ml-sm"><q-icon color="blue" name="home" size="20px"/> <q-icon name="chevron_right" size="20px"/> Library</div>
        </div>
      </div>


      <div class="row justify-center" v-if="!showArticle">
        <div class="col-12 col-md-3" :style="this.$q.screen.gt.lg ? 'max-width: 280px !important' : ''">
          <div>
            <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm">
              <q-item-section class="kmp-lg-text kmp-bold-text">Filter</q-item-section>
              <!-- <q-item-section avatar style="color:red" class="q-pr-sm">
                <div>
                  <q-icon name="delete" size="20px"/>Clear Filter
                </div>
              </q-item-section> -->
            </q-item>
            <q-card class="q-mb-xs kmp-new-font">
              <q-card-section>
                <q-item-label class="q-my-sm q-pl-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Format</q-item-label>
                <div><q-checkbox keep-color v-model="filter.format.article" label="Article" color="blue" /></div>
                <div><q-checkbox keep-color v-model="filter.format.audio" label="Audio" color="blue" /></div>
                <div><q-checkbox keep-color v-model="filter.format.video" label="Video" color="blue" /></div>
                <div><q-checkbox keep-color v-model="filter.format.visual" label="Visual" color="blue" /></div>
                <div><q-checkbox keep-color v-model="filter.format.game" label="Games" color="blue" /></div>
              </q-card-section>
            </q-card>
            <q-card class="q-mb-xs kmp-new-font">
              <q-card-section>
                <q-item-label class="q-my-sm q-pl-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Approved</q-item-label>
                <div><q-radio @input="changeFilterApproved" keep-color v-model="filter.approved" val="all" label="All" color="blue" /></div>
                <div><q-radio @input="changeFilterApproved" keep-color v-model="filter.approved" val="verified" label="Verified" color="blue" /></div>
                <div><q-radio @input="changeFilterApproved" keep-color v-model="filter.approved" val="not_verified" label="Not Verified" color="blue" /></div>
              </q-card-section>
            </q-card>
            <q-card class="q-mb-xs kmp-new-font">
              <q-card-section>
                <q-item-label class="q-my-sm q-pl-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Hak Akses</q-item-label>
                <div><q-radio keep-color v-model="filter.limited" val="all" label="All" color="blue" /></div>
                <div><q-radio keep-color v-model="filter.limited" val="public" label="Public" color="blue" /></div>
                <div><q-radio keep-color v-model="filter.limited" val="internal" label="Internal" color="blue" /></div>
                <div><q-radio keep-color v-model="filter.limited" val="limited" label="Limited" color="blue" /></div>
              </q-card-section>
            </q-card>
            <q-card class="q-mb-xs kmp-new-font">
              <q-card-section>
                <q-item-label class="q-my-sm q-pl-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Sumber Konten</q-item-label>
                <div><q-checkbox keep-color v-model="sumber_konten.all" label="All" color="blue" /></div>
                <div><q-checkbox keep-color v-model="sumber_konten.perpustakaan_kpk" label="Perpustakaan KPK" color="blue" /></div>
                <div><q-checkbox keep-color v-model="sumber_konten.hasil_pekerjaan" label="Hasil Pekerjaan" color="blue" /></div>
                <div><q-checkbox keep-color v-model="sumber_konten.hasil_proses_km" label="Hasil Proses KM" color="blue" /></div>
              </q-card-section>
            </q-card>
            <q-card class="q-mb-xs kmp-new-font">
              <q-card-section>
                <q-item-label class="q-my-sm q-pl-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Jenis Pengetahuan</q-item-label>
                <div><q-checkbox keep-color v-model="sumber_konten.all" label="All" color="blue" /></div>
                <div><q-checkbox keep-color v-model="sumber_konten.perpustakaan_kpk" label="Kebijakan Eksternal" color="blue" /></div>
                <div><q-checkbox keep-color v-model="sumber_konten.hasil_pekerjaan" label="Kebijakan Internal" color="blue" /></div>
                <div><q-checkbox keep-color v-model="sumber_konten.hasil_proses_km" label="Panduan Kerja" color="blue" /></div>
              </q-card-section>
            </q-card>
            <q-card class="q-mb-xs kmp-new-font">
              <q-card-section>
                <q-item-label class="q-my-sm q-pl-sm kmp-black-text kmp-sm-text kmp-bold-text kmp-line-15">Topik</q-item-label>
                <div><q-checkbox keep-color v-model="sumber_konten.all" label="All" color="blue" /></div>
                <div><q-checkbox keep-color v-model="sumber_konten.perpustakaan_kpk" label="Ekonomi Bisnis" color="blue" /></div>
                <div><q-checkbox keep-color v-model="sumber_konten.hasil_pekerjaan" label="Hukum" color="blue" /></div>
                <div><q-checkbox keep-color v-model="sumber_konten.hasil_proses_km" label="Kehutanan-Perkebunan" color="blue" /></div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col-12 col-md-9 q-pl-md" :style="this.$q.screen.gt.lg ? 'max-width: 648px !important' : ''">
          <div class="row">

            <!-- <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm">
              <q-item-section class="kmp-line-130 kmp-md-text kmp-bold-text active">search result for</q-item-section>
            </q-item> -->

            <div class="q-mb-md col-12">
              <div class="row">
                <div class="col">
                  <span class="kmp-line-130 kmp-md-text kmp-bold-text q-mr-md">{{ this.total_result }} result found</span>
                  <!-- <q-badge class="bg-blue-2 text-neutral q-pa-sm"> All&nbsp;  <q-icon name="close" class="text-neutral"/></q-badge> -->
                </div>
                <!-- <q-space/> -->
                <div class="col-1 text-right">
                  <q-badge class="bg-blue-2 q-pa-sm"><i style="color:blue" class="fa fa-list"/></q-badge>&nbsp;
                  <!-- <q-badge class="bg-blue-2 q-pa-sm"><i style="color:blue" class="fa fa-th-large"/></q-badge> -->
                </div>
              </div>
            </div>
            <div class="col-12">
              <q-input outlined v-model="filter.search" @keydown.enter.prevent="filterSubmit" :dense="dense" bg-color="white" placeholder="Search knowledge here">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-py-md">
                <div class="row">
                  <div class="col q-pt-sm">
                    <!-- <q-btn round class="q-px-md bg-white q-mr-sm" size="sm"><i class="fa fa-calendar q-pr-sm"></i>Date<i class="fa fa-angle-down q-pl-sm"></i></q-btn>
                    <q-btn round class="q-px-md bg-white q-mr-sm" size="sm"><i class="fa fa-user q-pr-sm"></i>From<i class="fa fa-angle-down q-pl-sm"></i></q-btn>
                    <q-btn round class="q-px-md bg-white q-mr-sm" size="sm"><i class="fa fa-comments q-pr-sm"></i>In Channel<i class="fa fa-angle-down q-pl-sm"></i></q-btn>
                    <q-btn round class="q-px-md bg-white q-mr-sm" size="sm">Perpustakaan KPK<i class="fa fa-share-square q-pl-sm"></i></q-btn>
                    <q-btn round class="q-px-md bg-white" size="sm">Buku Digital<i class="fa fa-share-square q-pl-sm"></i></q-btn> -->
                  </div>
                  <div class="col-2">
                    <q-space/>
                    <q-select
                        rounded outlined
                        v-model="filter_type"
                        :options="options_filter_type"
                        dense
                        emit-value
                        class="select-knowledge float-right"
                        style="width: 150px;"
                      >
                        <template v-slot:option="scope">
                          <q-item
                            v-bind="scope.itemProps"
                            v-on="scope.itemEvents"
                            class="select-knowledge-item"
                            active-class="select-knowledge-item-active"
                          >
                            <q-item-section>
                              <q-item-label class="kmp-black-text kmp-line-125 kmp-md-text kmp-normal-text">{{ scope.opt.label }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                  </div>
                </div>
            </div>
            <div class="col-12">
                <div v-if="this.library_list_loading">
                    <q-card class="knowledge-content q-mb-md" v-for="index in 3" :key="index">
                      <div class="row" style="border-radius: 25px;">
                        <div class="col-3">
                            <q-skeleton style="border-radius: 5px;" height="200px" square />
                            <!-- <div style="background: url(http://placehold.it/420x160);height:175px;width:270px;">
                              <img style="width:20px;position:relative;float:right;right:10px;top:10px"
                                src="../../assets/images/verified.png"
                              />
                              <img style="width:20px;position:relative;float:left;left:10px;top:10px"
                                src="../../assets/images/verified.png"
                              />
                            </div> -->
                        </div>
                        <div class="col q-px-md">
                          <div class="row q-pt-sm" style="height:40%">
                            <div class="col">
                              <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                                <q-skeleton  type="text" style="height:50px;width:500px" />
                              </div>
                            </div>
                            <div class="col-2 text-right">
                              <div class="row" style="float:right">
                                <q-skeleton size="30px" />&nbsp;
                                <q-skeleton size="30px" />
                              </div>
                            </div>
                          </div>
                          <div class="row" style="height:15%">
                            <div>
                              <q-skeleton  type="text" style="height:30px;width:200px" />
                            </div>
                          </div>
                          <div class="row" style="height:15%">
                            <div>
                              <q-skeleton  type="text" style="height:30px;width:150px" />
                            </div>
                          </div>
                          <div class="row q-pt-md" style="height:30%">
                            <div class="col-md-4">
                              <div class="row">
                                <q-skeleton type="circle" size="30px" class="q-mt-xs" />&nbsp;
                                <q-skeleton  type="text" style="height:40px;width:150px;" />
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="row">
                                <div class="">
                                  <q-skeleton  type="text" style="height:40px;width:100px;" />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-5 col-sm-12">
                              <q-btn-group outline>
                                <q-skeleton  type="text" style="height:40px;width:70px;" />
                                <span class="q-pt-xs q-px-sm">•</span>
                                <q-skeleton  type="text" style="height:40px;width:80px;" />
                                <span class="q-pt-xs q-px-sm">•</span>
                                <q-skeleton  type="text" style="height:40px;width:70px;" />
                              </q-btn-group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-card>
              </div>
              <div v-else>
                    <q-card @click="$router.push({ name: 'v2-library-detail', params: { id: value.id } })" class="knowledge-content cursor-pointer q-mb-md" v-for="(value, index) in this.library_list" :key="index">
                      <div class="row" style="border-radius: 25px;">
                        <div class="col-3">
                          <!-- <div>
                            <q-img style="border-radius: 5px;position: relative" v-if="value.image"
                              :src="`./api${value.image}`"
                              :ratio="4/3"
                            />
                            <q-img style="border-radius: 5px;position: relative" v-else
                              src="../../assets/images/no_image.png"
                              :ratio="4/3"
                            />
                            <img style="width:20px;position: relative;float:right;right:10px"
                              src="../../assets/images/verified.png"
                            />
                          </div> -->
                          <!-- <div style="background: url('{{ value.image }}');background-size: 280px 180px;background-repeat: no-repeat;height:175px;width:270px;position:relative"> -->
                            <!-- :style="{ backgroundImage: `url('${image}')` } -->
                          <div :style="{ 'backgroundImage': `url('${value.image}')` }" class="full-height" style="background-size: contain;">
                            <img style="width:20px;position:relative;float:right;right:10px;top:10px" v-if="value.approved==true"
                              src="../../assets/images/verified.png"
                            />
                            <img style="width:20px;position:relative;float:right;right:10px;top:10px" v-else
                              src="../../assets/images/not_verified.png"
                            />
                            <img style="width:20px;position:relative;float:left;left:10px;top:10px" v-if="value.format=='article'"
                              src="../../assets/images/artikel.png"
                            />
                            <img style="width:20px;position:relative;float:left;left:10px;top:10px" v-if="value.format=='audio'"
                              src="../../assets/images/audio.png"
                            />
                            <img style="width:20px;position:relative;float:left;left:10px;top:10px" v-if="value.format=='video'"
                              src="../../assets/images/video.png"
                            />
                            <img style="width:20px;position:relative;float:left;left:10px;top:10px" v-if="value.format=='visual'"
                              src="../../assets/images/visual.png"
                            />
                            <img style="width:20px;position:relative;float:left;left:10px;top:10px" v-if="value.format=='games'"
                              src="../../assets/images/game.png"
                            />
                          </div>
                        </div>
                        <div class="col q-px-md">
                          <div class="row q-pt-md" style="height:40%">
                            <div class="col">
                              <div class="kmp-line-125 kmp-lg-text kmp-bold-text ">
                                {{ value.knowledge_tree.title }}
                              </div>
                            </div>
                            <div class="col-2 text-right">
                              <q-btn dense size="sm" class="knowledge-button-group">
                                <q-icon name="bookmark_border" size="16px"/>
                              </q-btn>&nbsp;
                              <q-btn dense size="sm" class="knowledge-button-group">
                                <q-icon name="share" size="16px"/>
                              </q-btn>
                            </div>
                          </div>
                          <div class="row" style="height:15%">
                            <div>
                              <q-badge class="knowledge-gadget-badge-red kmp-line-130 kmp-sm-text kmp-normal-text q-mr-sm">{{ value.knowledge_tree.subtitle }}</q-badge>
                            </div>
                          </div>
                          <div class="row" style="height:15%">
                            <div>
                              <q-badge class="knowledge-gadget-badge-green kmp-line-30 kmp-sm-text kmp-normal-text ">{{ value.content_type }}</q-badge>
                            </div>
                          </div>
                          <div class="row q-pt-md q-pb-lg" style="height:30%">
                            <div class="col-md-4">
                              <div>
                                <Avatar class="cursor-pointer" size="md" :picture="value.created_by_user.profile_picture ? `./api${value.created_by_user.profile_picture}` : ''" :name="value.created_by_user.name"/>
                                <span class="kmp-line-130 cursor-pointer q-pl-sm">{{ value.created_by_user.name }}</span>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="row">
                                <div v-if="value.collaborator_total>0">
                                    <q-avatar class="post-avatar-collaborator post-avatar-collaborator-1" size="20px">
                                    <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'" alt="Avatar 1">
                                    </q-avatar>
                                    <q-avatar class="post-avatar-collaborator post-avatar-collaborator-2" size="20px">
                                      <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'" alt="Avatar 2">
                                    </q-avatar>
                                </div>
                                <div class="q-pl-md">
                                  <div class="kmp-sm-text kmp-normal-text kmp-line-130 kmp-black-text q-ml-xs q-mt-xs">{{ value.collaborator_total }} Collaborator
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-5 col-sm-12 text-right">
                              <q-btn-group outline>
                                <q-btn dense size="sm" class="knowledge-button-group" >
                                  <span class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">{{ value.like_total }} Likes</span>
                                </q-btn>
                                <span class="q-pt-sm">•</span>
                                <q-btn dense size="sm" class="knowledge-button-group">
                                  <span class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">{{ value.comment_total }} Comments</span>
                                </q-btn>
                                <span class="q-pt-sm">•</span>
                                <q-btn dense size="sm" class="knowledge-button-group">
                                  <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">{{ value.share_total }} Shares</span>
                                </q-btn>
                              </q-btn-group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-card>
                    <div>
                      <q-pagination
                        v-model="library_list_pagination"
                        :max="library_list_total_page"
                        :max-pages="5"
                        direction-links
                        gutter="sm"
                        class="justify-center"
                        @input="changePagination"
                      />
                  </div>
                </div>
              </div>
            </div>
          <!-- <div class="row">
            <div :class="$q.platform.is.mobile ? 'col-12' : 'col-12 q-px-lg'">
              <Quiz />
            </div>
          </div>
          <div class="row">
            <div :class="$q.platform.is.mobile ? 'col-12' : 'col-12 q-px-lg'">
              <EventGadget :today="today"/>
            </div>
          </div>
          <div class="row">
            <QuizCreate v-if="1===2"/>
          </div> -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getLoginId } from 'src/lib/helper';
import { leaderboardDirektoratPointHistory, leaderboardMemberPointHistory, libraryList } from 'src/lib/api';
// import bus from 'components/common/EventBus';
import { get } from 'src/lib/HttpHelper';
import Avatar from 'components/common/Avatar';

export default {
  components: { Avatar },
  data() {
    return {
      user: {
        id: 0
      },
      reload: 0,
      today: '',
      hours: '',
      leaderboard: {
        direktorat:
          {
            title: 'Top Directorate',
            data: [],
            data_overall: []
          },
        member: {
          title: 'Top Member',
          data: [],
          data_overall: []
        }
      },
      showArticle: false,
      article_id: null,
      tab: {
        active: 'Latest Posts',
        data: ['Latest Posts', 'Popular Posts', 'Suggest Channel']
        // data: ['Latest Posts', 'Popular Posts', 'Suggest Channel']
      },
      post_latest: {
        data: []
      },
      post_popular: {
        data: []
      },
      suggest_channel: {
        data: []
      },
      filter_type: 'Latest',
      options_filter_type: [
        // {
        //   label: 'Most Recent',
        //   value: 'most_recent'
        // },
        // {
        //   label: 'Recommended',
        //   value: 'recommended'
        // },
        // {
        //   label: 'Populer',
        //   value: 'populer'
        // },
        {
          label: 'Latest',
          value: 'latest'
        }
      ],
      hak_akses: {
        all: false,
        public: false,
        internal: false,
        limited: false
      },
      sumber_konten: {
        all: false,
        perpustakaan_kpk: false,
        hasil_pekerjaan: false,
        hasil_proses_km: false
      },
      library_list: [],
      library_list_loading: false,
      library_list_pagination: 1,
      library_list_total_page: 0,
      filter: {
        approved: 'all',
        search: null,
        format: {
          article: true,
          game: true,
          audio: true,
          visual: true,
          video: true
        },
        limited: 'all',
        channel_id: null,
        title: ''
      },
      total_result: 0
    };
  },
  methods: {
    getPostLatest() {
      const channel_id = 39;
      get({
        path: `api/post?channel_id=${channel_id}&limit=5&offset=0`
      }).then(res => {
        const response = res.data;
        if (response) {
          this.post_latest.data = response;
        }
      });
    },
    getPostPopular() {
      const channel_id = 39;
      get({
        path: `api/post-popular?channel_id=${channel_id}&limit=5&offset=0`
      }).then(res => {
        const response = res.data;
        if (response) {
          this.post_popular.data = response;
        }
      });
    },
    getSuggestChannel() {
      get({
        path: 'api/channel-suggest'
      }).then(res => {
        const response = res.data;
        if (response) {
          this.suggest_channel.data = response;
        }
      });
    },
    getLeaderboard() {
      leaderboardMemberPointHistory(0)
        .then(res => {
          this.leaderboard.member = {
            ...this.leaderboard.member,
            data: res.data
          };
        });
      leaderboardMemberPointHistory(1)
        .then(res => {
          this.leaderboard.member = {
            ...this.leaderboard.member,
            data_overall: res.data
          };
        });
      leaderboardDirektoratPointHistory(0)
        .then(res => {
          this.leaderboard.direktorat = {
            ...this.leaderboard.direktorat,
            data: res.data
          };
        });
      leaderboardDirektoratPointHistory(1)
        .then(res => {
          this.leaderboard.direktorat = {
            ...this.leaderboard.direktorat,
            data_overall: res.data
          };
        });
    },
    updatePost(type) {
      if (type === 'channel_suggest') { this.getSuggestChannel(); } else if (type === 'post_latest') { this.getPostLatest(); } else { this.getPostPopular(); }
      this.reload += 1;
    },
    getToday() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const seconds = String(today.getSeconds()).padStart(2, '0');
      today = `${yyyy}-${mm}-${dd}`;
      this.today = today;
      this.hours = `${hours}:${minutes}:${seconds}`;
    },
    openArticle(id, position) {
      this.showArticle = true;
      this.article_id = id;
      window.scrollTo(0, 0);
    },
    closeArticle() {
      this.showArticle = false;
      this.article_id = null;
    },
    switchTab(val) {
      this.tab.active = val;
    },
    getLibraryList(offset) {
      this.library_list_loading = true;
      let post_type = '';
      if (this.filter.format.article === true) {
        post_type += 'article,';
      }
      if (this.filter.format.game === true) {
        post_type += 'game,';
      }
      if (this.filter.format.audio === true) {
        post_type += 'audio,';
      }
      if (this.filter.format.video === true) {
        post_type += 'video,';
      }
      if (this.filter.format.visual === true) {
        post_type += 'visual,';
      }
      const params = {
        limit: 10,
        offset,
        approved: this.filter.approved,
        search: this.filter.search,
        channel_id: this.filter.channel_id,
        limited: this.filter.limited,
        post_type
      };
      // ilter: {
      //   approved: 'all',
      //   search: null,
      //   format: {
      //     article: true,
      //     game: true,
      //     audio: true,
      //     visual: true,
      //     video: true
      //   },
      //   limited: 'all',
      //   channel_id: null,
      //   title: ''
      // }
      libraryList(params).then(response => {
        const hasil = response.data;
        this.library_list = hasil;
        this.library_list_loading = false;
        this.library_list_total_page = response.meta.total_page;
        this.total_result = response.meta.total_result;
      });
    },
    changePagination(library_list_pagination) {
      const offset = library_list_pagination * 10 - 10;
      this.getLibraryList(offset);
      window.scrollTo(0, 0);
    },
    changeFilterApproved(value) {
      console.log(value);
    },
    filterSubmit(value) {
      this.getLibraryList(0);
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    this.user.id = getLoginId();
    this.getToday();
    this.getLeaderboard();
    this.getPostLatest();
    this.getPostPopular();
    this.getSuggestChannel();
    this.getLibraryList(0);
  },
  created() {
    // bus.$on('article_selected', data => {
    //   setTimeout(() => {
    //     this.openArticle(data);
    //   }, Math.floor((Math.random() * 150) + 50));
    // });
  }
};
</script>


<style>
.my-card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.text-neutral {
  color: #65738F;
}
</style>
