<template>
  <div class="q-pb-md items-start">
    <div class="row">
      <div class="col-md-4 mb-4" :class="this.$q.platform.is.mobile ? '' : 'q-pr-lg'">
        <div class="row" ref="cardInfo">
          <div class="col">
            <q-card class="my-card">
              <img src="../../assets/images/bg-profile.png" :class="this.$q.platform.is.mobile ? 'bg-profile-height-mobile' : 'bg-profile-height-desktop'" >
              <div v-if="loading" class="column items-center text-primary absolute" style="width: 100%;top: 10%">
                <div class="col q-pb-sm">
                  <q-skeleton type="QAvatar" size="120px"/>
                </div>
                <q-skeleton type="text" width="60%" />
                <q-skeleton type="text" width="60%" />
              </div>
              <div v-else class="column items-center text-primary absolute" :style="windowHeight > 700 ? 'width: 100%;top: 7%' : 'width: 100%;top: 4%'">
                <div class="col-auto q-pb-sm">
                  <q-avatar bordered :size="windowHeight > 700 ? '150px' : '100px'" style="border-color: #FFFFFF">
                    <img v-if="profile_picture !== null" :src="profile_picture">
                    <q-avatar bordered :size="windowHeight > 700 ? '150px' : '100px'" style="border-color: #FFFFFF" color="primary" text-color="white" v-else>
                      {{ profile_name.match(/\b(\w)/g).join('').toUpperCase() }}
                    </q-avatar>
                  </q-avatar>
                </div>
                <div class="col text-center text-bold text-capitalize">
                  {{profile_name}}
                </div>
                <div class="col text-center q-mt-sm hidden">
                  <Badge type="expert" level="silver"></Badge>
                  <Badge type="learner" level="gold"></Badge>
                  <Badge type="knowledge" level="bronze"></Badge>
                  <Badge type="speaker" level="bronze"></Badge>
                  <Badge type="post" level="bronze"></Badge>
                </div>
<!--                <div class="col text-center">&nbsp;</div>-->
              </div>
              <q-card-section class="col text-center">
              <q-btn no-caps v-if="data_own || is_km_manager === true"
                     color="primary"
                     label="Edit Profile"
                     class="absolute"
                     style="top: 0; transform: translate(-50%,-50%); font-size: 16px"
                     @click="modal_profile = true"
              />
              <q-btn no-caps v-else
                     color="primary"
                     label="Send Message"
                     class="absolute"
                     style="top: 0; transform: translate(-50%,-50%); font-size: 16px; visibility: hidden"
              />
              </q-card-section>
              <q-card-section class="q-px-xs text-grey-7">
                <q-list v-if="loading" >
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="mail_outline" />
                    </q-item-section>

                    <q-item-section>
                      <q-skeleton type="text" width="60%" />
                      <q-skeleton type="text" width="60%" />
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-skeleton type="text" width="60%" />
                      <q-skeleton type="text" width="60%" />
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="credit_card" />
                    </q-item-section>

                    <q-item-section>
                      <q-skeleton type="text" width="60%" />
                      <q-skeleton type="text" width="60%" />
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list v-else>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="mail_outline" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-bold">Email</q-item-label>
                      <q-item-label>{{data_user.email}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator inset style="height: 1.1px"/>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-bold">Phone</q-item-label>
                      <q-item-label>{{data_user.phone ? data_user.phone : '-'}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator inset style="height: 1.1px"/>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="credit_card" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-bold">NIP</q-item-label>
                      <q-item-label>{{data_user.nip ? data_user.nip : '-'}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator inset style="height: 1.1px"/>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="account_balance" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-bold">Unit Kerja</q-item-label>
                      <q-item-label>{{profile_unit_kerja ? profile_unit_kerja : '-'}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator inset style="height: 1.1px"/>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="work_outline" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-bold">Jabatan</q-item-label>
                      <q-item-label>{{profile_jabatan ? profile_jabatan : '-'}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator inset style="height: 1.1px"/>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="bookmark_border" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-bold">Golongan</q-item-label>
                      <q-item-label>{{profile_pangkat ? profile_pangkat : '-'}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator inset style="height: 1.1px"/>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="school" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-bold">Pendidikan</q-item-label>
                      <q-item-label>{{data_user.jenjang_pendidikan}} {{data_user.jurusan ? '- ' + data_user.jurusan : ''}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator inset style="height: 1.1px"/>

                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="grey" name="manage_accounts" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-bold">Role</q-item-label>
                      <q-item-label v-for="(item, index) in data_user.role_user" :key="index">
                        {{item.role.display_name}}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row">
          <div class="col q-pt-md">
            <q-card class="my-card">
              <q-card-section class="">
                <q-item-section>
                  <q-item-label class="kmp-font-bold kmp-text-grey-2">Badge Anda</q-item-label>
                </q-item-section>
              </q-card-section>
              <q-card-section class="q-px-xs">
                <q-item-section v-show="!badge.show">
                  <div class="row q-ml-none q-gutter-md justify-center">
                    <div class="col q-ma-none text-center">
                      <q-item-label class="q-pt-sm"
                                    style="font-size: 12px;">Belum ada badge yang didapat
                      </q-item-label>
                    </div>
                  </div>
                  <div style="display: none;" class="row q-gutter-sm justify-center">
                    <div class="col q-ma-none text-center">
                      <q-icon size="90px" style="color: #FFE7D2" name="shield"></q-icon>
                      <q-item-label class="q-pt-md"
                                    style="font-size: 12px;">Speaker Bronze
                      </q-item-label>
                    </div>
                    <div class="col q-ma-none text-center">
                      <q-icon size="90px" style="color: #EFF1F4" name="shield"></q-icon>
                      <q-item-label class="q-pt-md"
                                    style="font-size: 12px;">Speaker Silver
                      </q-item-label>
                    </div>
                    <div class="col q-ma-none text-center">
                      <q-icon size="90px" style="color: #FFF3C8" name="shield"></q-icon>
                      <q-item-label class="q-pt-md"
                                    style="font-size: 12px;">Speaker Gold
                      </q-item-label>
                    </div>
                  </div>
                </q-item-section>
                <q-item-section v-show="badge.show" style="margin-left: unset;">
                  <div class="row q-ml-none q-gutter-md justify-center">
                    <div class="col q-ma-none text-center"
                         v-for="(item, index) in badge.top3"
                         :key="`${index}_t3`">
                      <q-img :src="require(`../../assets/images/badges/${item.tag}.png`)" style="height: 90px;width: 79px" />
                      <q-item-label v-if="item.title === 'asn smart'"
                                    class="q-pt-sm text-capitalize"
                                    style="font-size: 12px;">{{ 'Smart ASN' }}
                      </q-item-label>
                      <q-item-label v-else class="q-pt-sm text-capitalize"
                                    style="font-size: 12px;">{{ item.title }}
                      </q-item-label>
                    </div>
                  </div>
                </q-item-section>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <q-item-section>
                  <q-item-label class="row justify-center kmp-font-bold kmp-text-blue-2 cursor-pointer"
                                @click="modal_badge = true">Lihat Semua</q-item-label>
                </q-item-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row" style="display: none">
          <div class="col q-pb-md">
            <q-card class="my-card">
              <q-card-section class="q-pa-xs">
                <q-list>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon style="color: #F19B1A" name="stars" />
                    </q-item-section>
                    <q-item-section v-if="loading">
                      <q-skeleton type="rect" height="26px" class="kmp-loading-bar q-my-sm"/>
                    </q-item-section>
                    <q-item-section v-else>
                      <div class="row" style="height: auto">
                        <div class="col-6 justify-content-end text-weight-bold">
                          <q-item-label>{{ point.level_name }}</q-item-label>
                        </div>
                        <div class="col-6 text-right text-grey">
                          <q-item-label>{{ point.value + '/' + point.level_point_max }}</q-item-label>
                        </div>
                      </div>
                      <q-linear-progress rounded size="sm" :value="point.percent" class="q-my-sm" style="color: #F19B1A" />
                      <q-item-label class="text-grey" caption>{{ point.diff }} more point to reach level {{ point.level_next }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-md-8" :class="this.$q.platform.is.mobile ? 'space-margin-mobile' : 'space-margin-desktop'" >
        <q-card class="my-card q-pt-sm" style="max-width: 88vw" :style="tab == 'posts' ? 'padding-bottom: 40px' : ''" ref="trainingCol">
          <q-tabs
                v-model="tab"
                no-caps
                narrow-indicator
                dense
                outside-arrows
                mobile-arrows
                align="left"
                class="bg-white text-primary shadow-2"
              >
<!--                <q-tab name="article" label="Article" />-->
                <q-tab name="knowledge" label="Knowledge" />
                <q-tab name="channel" label="Channel" />
                <q-tab name="posts" label="Posts" />
                <q-tab name="expertise" label="Expertise" />
                <q-tab name="training" label="Training & Certification" />
                <q-tab name="speaker" label="Speaker" />
              </q-tabs>
          <q-separator  />

          <q-tab-panels class="flex flex-column q-px-md" v-model="tab" animated
                        :class="tab === 'posts' ? 'fit' : ''"
                        :style="tab !== 'posts' ? 'height: 94%' : ''">

            <q-tab-panel name="knowledge" class="q-pa-none q-pt-md">
              <div v-if="loading">
                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="65%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="90%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" width="35%" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div v-else class="q-pb-xl">
                <q-card-section class="q-pa-none q-mb-md">
                  <q-item class="q-pa-none" >
                    <q-item-section class="q-ml-md q-ml-none" style="margin-left: unset;">
                      <q-item-label class="kmp-font-bold kmp-text-grey-2 q-mb-sm">Knowledge</q-item-label>
                      <q-item-label class="kmp-font-medium text-grey-7">{{ tab_descript.knowledge }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
                <q-card-section class="q-pa-none q-mb-md">
                  <q-card class="my-card-notif">
                    <q-item class="q-pa-xs" >
                      <div class="row items-center">
                        <q-avatar color="info" text-color="primary" icon="info_outline" style="font-size: 2.7rem;"/>
                        <q-item-section class="text-bold">{{ tab_knowledge.data.length }} Verified Knowledge</q-item-section>
                        <q-space />
                      </div>
                    </q-item>
                  </q-card>
                </q-card-section>
                <ProfileTabKnowledge :info_height="profile_info1_height" :badge_show="badge.show" :list_data="tab_knowledge" @clickKnowledge="clickKnowledge"/>
              </div>
            </q-tab-panel>

            <q-tab-panel name="channel" class="q-pa-none q-pt-md">
              <div v-if="loading">
                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="65%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="90%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" width="35%" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div v-else class="q-pb-xl">
                <q-card-section class="q-pa-none q-mb-md">
                  <q-item class="q-pa-none" >
                    <q-item-section class="q-ml-md q-ml-none" style="margin-left: unset;">
                      <q-item-label class="kmp-font-bold kmp-text-grey-2 q-mb-sm">Channel</q-item-label>
                      <q-item-label class="kmp-font-medium text-grey-7">{{ tab_descript.channel }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
                <q-card-section class="q-pa-none q-mb-md">
                  <q-card class="my-card-notif">
                    <q-item class="q-pa-xs" >
                      <div class="row items-center">
                        <q-avatar color="info" text-color="primary" icon="info_outline" style="font-size: 2.7rem;"/>
                        <q-item-section class="text-bold">Joined in {{ tab_channel.data.length > 1 ? `${tab_channel.data.length} channels` : `${tab_channel.data.length} channel` }}</q-item-section>
                        <q-space />
                      </div>
                    </q-item>
                  </q-card>
                </q-card-section>
                <ProfileTabChannel :info_height="profile_info1_height" :badge_show="badge.show" :list_data="tab_channel" @clickChannel="clickChannel"/>
              </div>
            </q-tab-panel>

            <q-tab-panel name="posts" class="fit items-start no-scroll q-pa-none q-pt-md">
              <div v-if="loading">
                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="65%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="90%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" width="35%" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div v-else class="fit">
                <q-card-section class="q-pa-none q-mb-md">
                  <q-item class="q-pa-none" >
                    <q-item-section class="q-ml-md q-ml-none" style="margin-left: unset;">
                      <q-item-label class="kmp-font-bold kmp-text-grey-2 q-mb-sm">Post</q-item-label>
                      <q-item-label class="kmp-font-medium text-grey-7">{{ tab_descript.post }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
                <q-card-section class="q-pa-none q-mb-md">
                  <q-card class="my-card-notif">
                    <q-item class="q-pa-xs" >
                      <div class="row items-center">
                        <q-avatar color="info" text-color="primary" icon="info_outline" style="font-size: 2.7rem;"/>
                        <q-item-section class="text-bold">{{ tab_post.data !== undefined ? tab_post.data.length > 0 ? 'Latest posts' : 'No post' : 'No post'}}</q-item-section>
                        <q-space />
                      </div>
                    </q-item>
                  </q-card>
                </q-card-section>
                <q-card-section class="q-pa-none q-mb-md">
                  <div class="row q-gutter-sm items-center">
                    <q-btn :outline="!(tab_post_type === 'All')" unelevated no-caps
                           color="primary" size="md" style="border-radius: 20px;"
                           @click="tab_post_type = 'All'">All Post
                    </q-btn>
                    <q-btn :outline="!(tab_post_type === 'Article')" unelevated no-caps
                           color="primary" size="md" style="border-radius: 20px;"
                           @click="tab_post_type = 'Article'">Article
                    </q-btn>
                    <q-btn :outline="!(tab_post_type === 'Event')" unelevated no-caps
                           color="primary" size="md" style="border-radius: 20px;"
                           @click="tab_post_type = 'Event'">Event
                    </q-btn>
                    <q-btn :outline="!(tab_post_type === 'Poll')" unelevated no-caps
                           color="primary" size="md" style="border-radius: 20px;"
                           @click="tab_post_type = 'Poll'">Polling
                    </q-btn>
                    <q-btn :outline="!(tab_post_type === 'Post Document')" unelevated no-caps
                           color="primary" size="md" style="border-radius: 20px;"
                           @click="tab_post_type = 'Post Document'">Document
                    </q-btn>
                    <q-btn :outline="!(tab_post_type === 'Post Image')" unelevated no-caps
                           color="primary" size="md" style="border-radius: 20px;"
                           @click="tab_post_type = 'Post Image'">Photo/Video
                    </q-btn>
                  </div>
                </q-card-section>
                <ProfileTabPost :info_height="profile_info1_height" :badge_show="badge.show" :list_data="tab_post_category" :type="tab_post_type" :data_own="data_own" @clickKnowledge="clickKnowledge"/>
                <q-card-section style="display: none;" class="q-pa-none q-mb-md">
                  <q-card class="my-card-profile-post">
                    <q-card-section>
                      <div class="q-py-xs q-px-xl">
                        <q-card class="q-mb-lg my-card-profile-post-2" v-for="(item, index) in tab_post_category" :key="index">
                          <div v-if="item.post_type === 'Post'">
                            <q-card-section>
                              <div class="row q-mb-sm">
                                <q-item-section>
                                  <q-item-label class="q-pr-md kmp-time">
                                    {{ post_date(item.updated_at) }}
                                  </q-item-label>
                                </q-item-section>
                              </div>

                              <div class="kmp-post-text-title q-mb-sm">
                                {{ item.title }}
                              </div>

                              <div class="row q-mb-sm kmp-time">
                                <span class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />
                                </span>
                                <span class="">
                                  {{ item.post_channel.channel.short_name }}
                                </span>
                                <span v-show="item.post_collaboration.length">
                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                                </span>
                                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />
                                </span>
                                <span v-if="item.post_collaboration.length > 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                                </span>
                                  <span v-else-if="item.post_collaboration.length === 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                                </span>
                              </div>
                              <div hidden class="kmp-post-description" v-html="item.scan.text"></div>
                              <div hidden v-if="item.scan.linkStatus" class="q-py-sm cursor-pointer" @click="openLinkTumbnail(item.scan.url)">
                                <link-prevue apiUrl="./prevue/" :url="item.scan.url">
                                  <template slot="loading" style="width: 100%">
                                    <div class="row justify-center q-my-md">
                                      <q-spinner size="50px" color="primary"/>
                                    </div>
                                  </template>
                                  <template slot-scope="props">
                                    <q-card style="background-color: #EFF1F4">
                                      <q-card-section v-if="props.img.length >0">
                                        <q-card>
                                          <q-video v-if="['youtu.be','www.youtube.com','youtube.com'].includes(item.scan.mainUrl)"
                                                   :ratio="16/9"
                                                   :src="`https://www.youtube.com/embed/${(item.scan.url.split('/')[3]).split('&')[0].replace('watch?v=','')}?rel=0`"
                                          />
                                          <q-img v-else :src="props.img[0]" fit="fill"/>
                                        </q-card>
                                      </q-card-section>
                                      <q-card-section :class="props.img.length >0 ? 'q-pt-none' : ''">
                                        <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{props.title}}</div>
                                        <div class="text-subtitle2" v-else>{{item.scan.mainUrl}}</div>
                                        <div class="text-url text-grey-7">{{props.url}}</div>
                                      </q-card-section>
                                    </q-card>
                                  </template>
                                </link-prevue>
                              </div>
                            </q-card-section>
                          </div>
                          <div v-if="item.post_type === 'Poll'">
                            <q-card-section>
                              <div class="row q-mb-sm">
                                <q-item-section>
                                  <q-item-label class="q-pr-md kmp-time">
                                    {{ post_date(item.updated_at) }}
                                  </q-item-label>
                                </q-item-section>
                              </div>

                              <div class="kmp-post-text-title q-mb-sm">
                                {{ item.title }}
                              </div>

                              <div class="row kmp-post-text-title q-mb-sm">
                                <span class="cursor-pointer" @click="clickKnowledge(item.post_channel.channel, item.id)">
                                  <div class="row">
                                    <span class="q-pr-xs" style="margin-top: -2px">
                                      <q-icon name="poll" color="negative" class="check-icon" size="16px" style="" />
                                    </span>
                                    <span class="q-pr-xs text-primary">See Poling</span>
                                    <span class="text-primary"><q-icon name="open_in_new" color="primary" class="check-icon" size="16px" style="" /></span>
                                  </div>

                                </span>
                              </div>

                              <div class="row q-mb-sm kmp-time">
                                <span class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />
                                </span>
                                <span class="">
                                  {{ item.post_channel.channel.short_name }}
                                </span>
                                <span v-show="item.post_collaboration.length">
                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                                </span>
                                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />
                                </span>
                                <span v-if="item.post_collaboration.length > 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                                </span>
                                <span v-else-if="item.post_collaboration.length === 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                                </span>
                              </div>
                            </q-card-section>
                          </div>
                          <div v-if="item.post_type === 'Post Document'">
                            <q-card-section>
                              <div class="row q-mb-sm">
                                <q-item-section>
                                  <q-item-label class="q-pr-md kmp-time">
                                    {{ post_date(item.updated_at) }}
                                  </q-item-label>
                                </q-item-section>
                              </div>

                              <div class="kmp-post-text-title q-mb-sm">
                                {{ item.title }}
                              </div>

                              <div class="row q-gutter-md q-mb-sm">
                                <q-item v-for="(item2, index) in item.post_file.slice(0,3)" :key="index"
                                        class="q-list--bordered kmp-font-medium" style="width: 46%;"
                                        :class="item2.file.filemime === 'pdf' ? 'kmp-file-item kmp-file-text' : 'kmp-post-item kmp-post-text'">
                                  <span class="self-center q-pr-sm">
                                    <q-icon v-if="item2.file.filemime === 'pdf'" name="fas fa-file-pdf" class="" size="30px" style=""/>
                                    <q-icon v-else-if="item2.file.filemime === 'docx'" name="fas fa-file-word" class="" size="30px" style=""/>
                                    <q-icon v-else-if="item2.file.filemime === 'pptx'" name="fas fa-file-powerpoint" class="" size="30px" style=""/>
                                    <q-icon v-else name="fas fa-file" class="" size="30px" style=""/>
                                  </span>
                                  <span class="self-center">
                                    {{ item2.file.filename.split('.')[0] }}
                                  </span>
                                </q-item>
                                <q-item v-show="item.post_file.length > 3">
                                  <span class="self-center">
                                    {{ item.post_file.length }} dokumen lainnya
                                  </span>
                                </q-item>
                              </div>
                              <div hidden v-for="(item1, index) in item.post_file" :key="index">
                                <KnowledgeListFile v-if="item1.file !== null" :file="item1.file" :item="item1" :manage="false"/>
                              </div>

                              <div class="row q-mb-sm kmp-time">
                                <span class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />
                                </span>
                                <span class="">
                                  {{ item.post_channel.channel.short_name }}
                                </span>
                                <span v-show="item.post_collaboration.length">
                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                                </span>
                                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />
                                </span>
                                <span v-if="item.post_collaboration.length > 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                                </span>
                                <span v-else-if="item.post_collaboration.length === 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                                </span>
                              </div>
                            </q-card-section>
                          </div>
                          <div v-if="item.post_type === 'Article'">
                            <q-card-section>
                              <div class="row q-mb-sm">
                                <q-item-section>
                                  <q-item-label class="q-pr-md kmp-time">
                                    {{ post_date(item.updated_at) }}
                                  </q-item-label>
                                </q-item-section>
                              </div>

                              <div class="kmp-post-text-title q-mb-sm">
                                {{ item.title }}
                              </div>

                              <div class="row q-mb-sm kmp-time">
                                <span class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />
                                </span>
                                <span class="">
                                  {{ item.post_channel.channel.short_name }}
                                </span>
                                <span v-show="item.post_collaboration.length">
                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                                </span>
                                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />
                                </span>
                                <span v-if="item.post_collaboration.length > 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                                </span>
                                <span v-else-if="item.post_collaboration.length === 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                                </span>
                              </div>
                            </q-card-section>
                          </div>
                          <div v-if="item.post_type === 'Post Video'">
                            <q-card-section>
                              <div class="row q-mb-md">
                                <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                                  <Avatar size="xl" :picture="profile_picture ? profile_picture : ''"
                                    :name="profile_name"
                                  />
                                </q-item-section>
                                <q-item-section>
                                  <div class="kmp-text-nama">
                                    {{ profile_name }} <span class="kmp-time q-ml-xs">{{ getTime(item.updated_at) }}</span>
                                  </div>
                                  <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
                                </q-item-section>
                              </div>

                              <div class="kmp-post-text-title q-mt-lg q-mb-sm">
                                {{ item.title }}
                              </div>
                              <div class="kmp-post-description" v-html="item.scan.text"></div>
                              <div v-if="item.scan.linkStatus" class="q-py-sm cursor-pointer" @click="openLinkTumbnail(item.scan.url)">
                                <link-prevue apiUrl="./prevue/" :url="item.scan.url">
                                  <template slot="loading" style="width: 100%">
                                    <div class="row justify-center q-my-md">
                                      <q-spinner size="50px" color="primary"/>
                                    </div>
                                  </template>
                                  <template slot-scope="props">
                                    <q-card style="background-color: #EFF1F4">
                                      <q-card-section v-if="props.img.length >0">
                                        <q-card>
                                          <q-video v-if="['youtu.be','www.youtube.com','youtube.com'].includes(item.scan.mainUrl)"
                                                   :ratio="16/9"
                                                   :src="`https://www.youtube.com/embed/${(item.scan.url.split('/')[3]).split('&')[0].replace('watch?v=','')}?rel=0`"
                                          />
                                          <q-img v-else :src="props.img[0]" fit="fill"/>
                                        </q-card>
                                      </q-card-section>
                                      <q-card-section :class="props.img.length >0 ? 'q-pt-none' : ''">
                                        <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{props.title}}</div>
                                        <div class="text-subtitle2" v-else>{{item.scan.mainUrl}}</div>
                                        <div class="text-url text-grey-7">{{props.url}}</div>
                                      </q-card-section>
                                    </q-card>
                                  </template>
                                </link-prevue>
                              </div>
                            </q-card-section>
                          </div>
                          <div v-if="item.post_type === 'Post Image'">
                            <q-card-section>
                              <div class="row q-mb-sm">
                                <q-item-section>
                                  <q-item-label class="q-pr-md kmp-time">
                                    {{ post_date(item.updated_at) }}
                                  </q-item-label>
                                </q-item-section>
                              </div>

                              <div class="kmp-post-text-title q-mb-sm">
                                {{ item.title }}
                              </div>

                              <div class="row q-gutter-sm q-mb-sm">
                                <q-item v-for="(item3, index3) in item.post_file" :key="index3"
                                        class="q-pa-none kmp-file-item" style="width: 13%;background-color: #dedede;">
                                  <q-img v-if="['png','jpg','jpeg'].includes(item3.file.filemime)" style="border-radius: 6px;"
                                         :src="'./api' + item3.file.path"
                                         fit="fill"
                                  />
                                  <q-media-player v-else
                                    type="video"
                                    :sources="getSourceVideo(item3.file)"
                                    :bottom-controls="false"
                                    style="border-radius: 6px; min-width: unset !important; min-height: unset !important;
                                      width: 100%; height: 73px; text-align: center;"
                                    dense
                                  />
<!--                                  56-->
                                </q-item>
                              </div>

                              <div class="row q-mb-sm kmp-time">
                                <span class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />
                                </span>
                                <span class="">
                                  {{ item.post_channel.channel.short_name }}
                                </span>
                                <span v-show="item.post_collaboration.length">
                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                                </span>
                                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />
                                </span>
                                <span v-if="item.post_collaboration.length > 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                                </span>
                                <span v-else-if="item.post_collaboration.length === 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                                </span>
                              </div>
                            </q-card-section>
                            <q-card-section style="display: none;">
                              <div class="q-px-none q-pt-md">
                                <PostListMedia :list_data="item.post_file" :download="true"/>
                              </div>
                            </q-card-section>
                          </div>
                          <div v-if="item.post_type === 'sample'">
                            <q-card-section>
                              <div class="row q-mb-md">
                                <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                                  <Avatar size="xl" :picture="profile_picture ? profile_picture : ''"
                                    :name="profile_name"
                                  />
                                </q-item-section>
                                <q-item-section>
                                  <div class="kmp-text-nama">
                                    {{ profile_name }} <span class="kmp-time q-ml-xs">{{ getTime(item.updated_at) }}</span>
                                  </div>
                                  <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
                                </q-item-section>
                              </div>

                            </q-card-section>
                          </div>
                          <div v-if="item.post_type === 'Event'">
                            <q-card-section>
                              <div class="row q-mb-sm">
                                <q-item-section>
                                  <q-item-label class="q-pr-md kmp-time">
                                    {{ post_date(item.updated_at) }}
                                  </q-item-label>
                                </q-item-section>
                              </div>

                              <div class="kmp-post-text-title q-mb-sm">
                                {{ item.title }}
                              </div>

                              <div class="row q-gutter-sm q-mb-sm">
                                <q-item class="q-pa-none kmp-file-item" style="width: 13%;background-color: #dedede;">
                                  <q-img v-if="item.event.picture" style="border-radius: 6px;"
                                         :src="'./api' + item.event.picture"
                                         fit="fill"
                                  />
                                </q-item>
                                <div class="column justify-between q-ml-md">
                                  <div class="col">
                                    <div class="row">
                                      <span class="q-pr-xs" style="margin-top: -2px">
                                        <q-icon name="event" size="16px" style="" />
                                      </span>
                                      <span>
                                        {{ parseDate(item.event.start_date, 'dddd, DD MMM YYYY') }} - {{ parseDate(item.event.end_date, 'dddd, DD MMM YYYY') }}
                                      </span>
                                    </div>
                                  </div>
                                  <div class="col">
                                    <div class="row q-mt-xs">
                                      <span class="q-pr-xs" style="margin-top: -2px">
                                        <q-icon name="schedule" size="16px" style="" />
                                      </span>
                                      <span>
                                        {{ `${parseTime(item.event.start_time)} - ${parseTime(item.event.end_time)}` }} (GMT+7)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="row q-mb-sm kmp-time">
                                <span class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />
                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />
                                </span>
                                <span class="">
                                  {{ item.post_channel.channel.short_name }}
                                </span>
                                <span v-show="item.post_collaboration.length">
                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                                </span>
                                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />
                                </span>
                                <span v-if="item.post_collaboration.length > 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                                </span>
                                <span v-else-if="item.post_collaboration.length === 1" class="">
                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                                </span>
                              </div>
                            </q-card-section>
                          </div>
                        </q-card>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-card-section>
              </div>
            </q-tab-panel>

            <q-tab-panel name="expertise" class="q-pa-none q-pt-md">
              <div v-if="loading">
                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="65%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="90%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" width="35%" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div v-else>
                <q-card-section class="q-pa-none q-mb-md">
                  <q-item class="q-pa-none" >
                    <q-item-section class="q-ml-md q-ml-none" style="margin-left: unset;">
                      <q-item-label class="kmp-font-bold kmp-text-grey-2 q-mb-sm">Expertise</q-item-label>
                      <q-item-label class="kmp-font-medium text-grey-7">{{ tab_descript.expertise }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
                <ProfileTabExpertise :info_height="profile_info1_height" :badge_show="badge.show" :list_data="tab_expertise" @clickExpertise="clickExpertise"/>
              </div>
            </q-tab-panel>

            <q-tab-panel name="training" class="q-pa-none q-pt-md">
              <div v-if="loading">
                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="65%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="90%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" width="35%" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div v-else class="full-height">
                <q-card-section class="q-pa-none q-mb-md">
                  <q-item class="q-pa-none" >
                    <q-item-section class="q-ml-md q-ml-none" style="margin-left: unset;">
                      <div class="row q-gutter-sm items-center justify-between">
                        <q-item-label class="kmp-font-bold kmp-text-grey-2 q-mb-sm">Training & Certification</q-item-label>
                        <div class="row kmp-font-bold cursor-pointer q-mt-none" v-if="data_own && is_member === true" @click="openDialog('edit_profile')">
                          <label class="text-primary">Add New</label>
                          <q-icon name="add_circle_outline" color="primary" style="margin-top:0.2rem;margin-left:0.2rem"/>
                        </div>
                      </div>
                      <q-item-label class="kmp-font-medium text-grey-7">{{ tab_descript.training }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
                <ProfileTabTrainingCert :info_height="profile_info1_height" :badge_show="badge.show" :list_data="tab_training" @clickCertificate="clickCertificate"/>
              </div>
            </q-tab-panel>

            <q-tab-panel name="speaker" class="q-pa-none q-pt-md">
              <div v-if="loading">
                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="65%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="90%" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="kmp-profile-item-list">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section class="q-py-md">
                    <q-item-label>
                      <q-skeleton type="text" width="35%" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div v-else>
                <q-card-section class="q-pa-none q-mb-md">
                  <q-item class="q-pa-none" >
                    <q-item-section class="q-ml-md q-ml-none" style="margin-left: unset;">
                      <div class="row q-gutter-sm items-center justify-between">
                        <q-item-label class="kmp-font-bold kmp-text-grey-2 q-mb-sm">Speaker</q-item-label>
                        <div v-show="data_own" class="row kmp-font-bold cursor-pointer q-mt-none" @click="openDialog('add_speaker')">
                          <label class="text-primary cursor-pointer">Add New</label>
                          <q-icon name="add_circle_outline" color="primary" style="margin-top:0.2rem;margin-left:0.2rem"/>
                        </div>
                      </div>
                      <q-item-label class="kmp-font-medium text-grey-7">{{ tab_descript.speaker }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
                <ProfileTabSpeaker :info_height="profile_info1_height" :badge_show="badge.show" :list_data="tab_speaker" :data_own="data_own" :data_user="data_user" @evtClose="handleSaveSpeaker" @clickKnowledge="clickKnowledge"/>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="modal_profile" persistent>
      <ProfileEdit :profile="{profile_id: data_user.id, profile_picture, profile_name, profile_phone, profile_nip, profile_unit_kerja_id, profile_jabatan_id, profile_pangkat_id, profile_golongan_id }" @evtClose="handleSave"/>
    </q-dialog>
    <q-dialog v-model="modal_certificate" persistent>
      <ProfileCertificate :certificate="form_certificate" :profile="{profile_id: data_user.id}" @evtClose="handleSaveCertificate" />
    </q-dialog>
    <q-dialog v-model="modal_badge" persistent>
      <q-card style="" :class="$q.platform.is.mobile ? 'kmp-modal-mobile1' : 'modal-size'">
        <q-card-section class="row">
          <div class="text-h6">Badge Collection</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 600px" class="scroll">
          <div class="q-pa-none">
            <div class="column">
              <div v-for="(item, index) in badge.sort" :key="`badge-${index}`">
                <q-separator v-show="index > 0"/>
                <div class="col justify-center">
                  <div class="row q-py-sm desktop-only">
                    <span class="kmp-font-bold kmp-text-grey-5">{{ item.title }}</span>
                    <q-space/>
                    <div v-if="item.key === 'post'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/post_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'post_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Top Post Basic (30 point) <br/> membuat post 10
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/post_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'post_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Top Post Intermediate (60 point) <br/> membuat post 20
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/post_advance.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'post_advance') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Top Post Advance (90 point) <br/> membuat post 30
                        </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'expertise'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/expert_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'expert_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Expert Basic (50 point) <br/> menjadi SME pada 3 pengetahuan
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/expert_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'expert_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Expert Intermediate (150 point) <br/> menjadi SME pada 5 pengetahuan
                        </q-tooltip>
                      </span>
                      <span>
                      <img src="../../assets/images/badges/expert_advance.png" style="height: 90px;"
                           :class="item.value.find(f => f === 'expert_advance') ? '' : 'img-gray'"/>
                      <q-tooltip anchor="bottom middle" self="center middle">
                        Expert Advance (150 point) <br/> menjadi SME pada > 7 pengetahuan
                      </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'speaker'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/speaker_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'speaker_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Speaker Basic (40 point) <br/> menjadi Speaker pada 3 sharing session
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/speaker_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'speaker_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Speaker Intermediate (80 point) <br/> menjadi Speaker pada 5 sharing session
                        </q-tooltip>
                      </span>
                      <span>
                      <img src="../../assets/images/badges/speaker_advance.png" style="height: 90px;"
                           :class="item.value.find(f => f === 'speaker_advance') ? '' : 'img-gray'"/>
                      <q-tooltip anchor="bottom middle" self="center middle">
                        Speaker Advance (120 point) <br/> menjadi Speaker pada 7 sharing session
                      </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'learner'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/learner_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'learner_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Smart Learner Basic (30 point) <br/> mengikuti 5 kegiatan sharing session
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/learner_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'learner_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Smart Learner Intermediate (90 point) <br/> mengikuti 10 kegiatan sharing session
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/learner_advance.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'learner_advance') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Smart Learner Advance (120 point) <br/> mengikuti 15 kegiatan sharing session
                        </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'knowledge'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/knowledge_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'knowledge_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Knowledge Asset Basic (50 point) <br/> membuat 5 dokumen pengetahuan as knowledge
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/knowledge_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'knowledge_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Knowledge Asset Intermediate (100 point) <br/> membuat 10 dokumen pengetahuan as knowledge
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/knowledge_advance.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'knowledge_advance') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Knowledge Asset Advance (150 point) <br/> membuat 15 dokumen pengetahuan as knowledge
                        </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'training'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/asn_smart.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'asn_smart') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Smart ASN (50 point) <br/> jumlah JP mencapai 20
                        </q-tooltip>
                      </span>
                    </div>
                  </div>

                  <div class="col-12 q-py-sm mobile-only" style="">
                    <span class="kmp-font-bold kmp-text-grey-5">{{ item.title }}</span>
                    <q-space/>
                    <div v-if="item.key === 'post'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/post_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'post_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Top Post Basic (30 point) <br/> membuat post 10
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/post_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'post_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Top Post Intermediate (60 point) <br/> membuat post 20
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/post_advance.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'post_advance') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Top Post Advance (90 point) <br/> membuat post 30
                        </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'expertise'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/expert_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'expert_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Expert Basic (50 point) <br/> menjadi SME pada 3 pengetahuan
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/expert_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'expert_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Expert Intermediate (150 point) <br/> menjadi SME pada 5 pengetahuan
                        </q-tooltip>
                      </span>
                      <span>
                      <img src="../../assets/images/badges/expert_advance.png" style="height: 90px;"
                           :class="item.value.find(f => f === 'expert_advance') ? '' : 'img-gray'"/>
                      <q-tooltip anchor="bottom middle" self="center middle">
                        Expert Advance (150 point) <br/> menjadi SME pada > 7 pengetahuan
                      </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'speaker'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/speaker_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'speaker_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Speaker Basic (40 point) <br/> menjadi Speaker pada 3 sharing session
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/speaker_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'speaker_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Speaker Intermediate (80 point) <br/> menjadi Speaker pada 5 sharing session
                        </q-tooltip>
                      </span>
                      <span>
                      <img src="../../assets/images/badges/speaker_advance.png" style="height: 90px;"
                           :class="item.value.find(f => f === 'speaker_advance') ? '' : 'img-gray'"/>
                      <q-tooltip anchor="bottom middle" self="center middle">
                        Speaker Advance (120 point) <br/> menjadi Speaker pada 7 sharing session
                      </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'learner'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/learner_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'learner_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Smart Learner Basic (30 point) <br/> mengikuti 5 kegiatan sharing session
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/learner_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'learner_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Smart Learner Intermediate (90 point) <br/> mengikuti 10 kegiatan sharing session
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/learner_advance.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'learner_advance') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Smart Learner Advance (120 point) <br/> mengikuti 15 kegiatan sharing session
                        </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'knowledge'" class="row q-gutter-lg">
                      <span>
                        <img src="../../assets/images/badges/knowledge_basic.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'knowledge_basic') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Knowledge Asset Basic (50 point) <br/> membuat 5 dokumen pengetahuan as knowledge
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/knowledge_intermediate.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'knowledge_intermediate') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Knowledge Asset Intermediate (100 point) <br/> membuat 10 dokumen pengetahuan as knowledge
                        </q-tooltip>
                      </span>
                      <span>
                        <img src="../../assets/images/badges/knowledge_advance.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'knowledge_advance') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Knowledge Asset Advance (150 point) <br/> membuat 15 dokumen pengetahuan as knowledge
                        </q-tooltip>
                      </span>
                    </div>
                    <div v-if="item.key === 'training'" class="row q-gutter-lg flex flex-center">
                      <span>
                        <img src="../../assets/images/badges/asn_smart.png" style="height: 90px;"
                             :class="item.value.find(f => f === 'asn_smart') ? '' : 'img-gray'"/>
                        <q-tooltip anchor="bottom middle" self="center middle">
                          Smart ASN (50 point) <br/> jumlah JP mencapai 20
                        </q-tooltip>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_speaker" persistent>
      <ProfileSpeaker :user="data_user" @evtClose="handleSaveSpeaker"/>
    </q-dialog>
  </div>
</template>


<style>
.space-margin-desktop {
  /* margin-top:20px; */
}
.space-margin-mobile {
  margin-top:20px;
}
.bg-profile-height-desktop{
  min-height: 15vw;
}
.bg-profile-height-mobile{
  min-height: 85vw;
}
</style>
<script>
import moment from 'moment';
import Avatar from 'components/common/Avatar';
import ProfileEdit from 'components/profile/ProfileEdit';
import { datePost, checkRole } from 'src/lib/helper';
import PostStatus from 'components/PostStatus';
import KnowledgeListFile from 'components/KnowledgeListFile';
import { Notify } from 'quasar';
import ProfileCertificate from 'components/profile/ProfileCertificate';
import _ from 'lodash';
import LinkPrevue from 'link-prevue';
// import EventHeader from 'components/post/EventHeader';
import Badge from 'components/leaderboard/Badge';
import ProfileTabKnowledge from 'components/profile/ProfileTabKnowledge';
import ProfileTabChannel from 'components/profile/ProfileTabChannel';
import ProfileTabPost from 'components/profile/ProfileTabPost';
import ProfileTabExpertise from 'components/profile/ProfileTabExpertise';
import ProfileTabTrainingCert from 'components/profile/ProfileTabTrainingCert';
import ProfileTabSpeaker from 'components/profile/ProfileTabSpeaker';
import ProfileSpeaker from 'components/profile/ProfileSpeaker';
import PostListMedia from '../post/PostListMedia';

export default {
  props: ['loading', 'data_user', 'data_level', 'data_own', 'data_channel', 'loginId', 'data_badges'],
  data () {
    return {
      monthArray: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      tab: 'knowledge',
      tab_knowledge: {
        data: [],
        colHeight: 0
      },
      tab_channel: {
        data: [],
        colHeight: 0
      },
      tab_post: {
        data: [],
        colHeight: 0
      },
      tab_expertise: {
        data: [],
        colHeight: 0
      },
      tab_training: {
        data: [],
        colHeight: 0
      },
      tab_speaker: {
        data: [],
        colHeight: 0
      },
      tab_descript: {
        knowledge: 'Semua dokumentasi pengetahuan yang anda buat.',
        channel: 'Semua channel Smart KPK yang anda ikuti.',
        post: 'Semua post yang Anda publikasikan di seluruh channel.',
        expertise: 'Keahlian Anda yang diakui sebagai Subject Matter Expert (SME) di dalam Knowledge Map.',
        training: 'Semua training dan sertifikasi yang sudah Anda dapatkan. Ikuti terus training dan sertifikasi untuk meningkatkan kompetensi Anda.',
        speaker: 'Kegiatan yang Anda hadiri sebagai narasumber.'
      },
      tab_post_type: 'All',
      is_member: false,
      is_km_manager: false,
      my_channel: [],
      point: null,
      progress: 0.4,
      modal_profile: false,
      modal_message: false,
      modal_certificate: false,
      modal_badge: false,
      modal_speaker: false,
      profile_info1_height: 0,
      profile_picture: null,
      profile_name: null,
      profile_phone: null,
      profile_nip: null,
      profile_unit_kerja: null,
      profile_jabatan: null,
      profile_pangkat: null,
      profile_unit_kerja_id: null,
      profile_jabatan_id: null,
      profile_pangkat_id: null,
      profile_golongan_id: null,
      items: [
        { value: '', class: 'answer', name: 'answer1', placeholder: 'Question 1', correct: false },
        { value: '', class: 'answer', name: 'answer2', placeholder: 'Question 2', correct: false }
      ],
      colorArray: [
        'background-color: #FFFCEE;color: #F5D529;',
        'background-color: #E6F4FF;color: #0E6FB3;',
        'background-color: #EFFFEA;color: #56B635;',
        'background-color: #F9F1FF;color: #7D35B6;',
        'background-color: #FFF1F4;color: #FF1048;'
      ],
      colorArray1: [
        { background: '#FFFCEE', text: '#F5D529' },
        { background: '#E6F4FF', text: '#0E6FB3' },
        { background: '#EFFFEA', text: '#56B635' },
        { background: '#F9F1FF', text: '#7D35B6' },
        { background: '#FFF1F4', text: '#FF1048' }
      ],
      loading_upload: false,
      upload_done: false,
      finish_files: [],
      form_certificate: null,
      windowHeight: window.innerHeight,
      txt: '',
      pathPollPicture: `${process.env.QUASAR_API_URL}uploads/files/pollChoice/`,
      badge: {
        show: false,
        top3: [],
        data: [],
        raw: [],
        order: {
          post: [],
          learner: [],
          speaker: [],
          knowledge: [],
          expertise: [],
          training: []
        },
        sort: []
      }
    };
  },
  components: {
    ProfileSpeaker,
    ProfileTabKnowledge,
    ProfileTabChannel,
    ProfileTabPost,
    ProfileTabExpertise,
    ProfileTabTrainingCert,
    ProfileTabSpeaker,
    ProfileCertificate,
    ProfileEdit,
    PostStatus,
    KnowledgeListFile,
    PostListMedia,
    LinkPrevue,
    Avatar,
    Badge
  },
  methods: {
    addList() {
      // console.log('ADD');
    },
    openDialog(dialogName) {
      if (dialogName === 'edit_profile') {
        this.form_certificate = null;
        this.modal_certificate = true;
      }
      if (dialogName === 'add_speaker') {
        this.modal_speaker = true;
      }
    },
    handleChange(e, field) {
      if (field === 'question') {
        this.question = e.target.value;
      } else if (field === 'answer') {
        this.items.filter(f => {
          return f.name === e.target.name;
        }).value = e.target.value;
      } else {
        const name = field;
        this.items.forEach(f => {
          if (f.name !== name) {
            f.correct = false;
          }
        });
      }
    },
    handleSave() {
      this.modal_profile = false;
      this.$emit('evtSaveProfile');
    },
    handleSaveCertificate() {
      this.modal_certificate = false;
      this.$emit('evtSaveProfile');
    },
    handleSaveSpeaker() {
      this.modal_speaker = false;
      this.$emit('evtSaveProfile');
    },
    getTime(date) {
      return datePost(date);
    },
    getData(data) {
      this.profile_picture = data.profile_picture ? process.env.QUASAR_API_URL + data.profile_picture : null;
      this.profile_name = data.name;
      this.profile_phone = data.phone;
      this.profile_nip = data.nip;
      this.profile_unit_kerja = data.unit_kerja ? data.unit_kerja.name : '-';
      if (data.jabatan) {
        this.profile_jabatan = data.jabatan ? data.jabatan.name : '-';
        this.profile_pangkat = data.golongan ? `${data.golongan.name}` : '-';
      } else {
        this.profile_jabatan = data.organization && data.organization.organization ? data.organization.organization.name : '-';
        this.profile_pangkat = data.organization ? data.organization.name : '-';
      }
      this.profile_unit_kerja_id = data.unit_kerja_id;
      this.profile_jabatan_id = data.jabatan_id;
      this.profile_pangkat_id = data.pangkat_id;
      this.profile_golongan_id = data.golongan_id;

      this.tab_knowledge.data = data.post ? data.post.filter(v => {
        return v.status !== null && (v.status.toLowerCase() === 'knowledge' || v.status.toLowerCase() === 'kmap');
      }) : [];
      this.tab_channel.data = data.channel_member ? data.channel_member.filter(v => v.channel.channel_type.toLowerCase() !== 'general') : [];
      // const data_post_dummy = _.concat(data.post, _.clone(data.post), _.clone(data.post), _.clone(data.post));
      this.tab_post.data = data.post ? _.orderBy(data.post, 'created_at', 'desc').filter(v => v.post_channel !== null && (v.status !== 'Knowledge' || v.status !== 'Kmap')) : [];
      this.tab_expertise.data = data.knowledge ? data.knowledge : [];
      if ((this.is_member === true && this.data_own) || this.is_member === false) {
        this.tab_speaker.data = data.event_expertise ? data.event_expertise.filter(v => {
          if (v.event) {
            v.event_end = new Date(`${v.event.end_date.split(' ')[0]} ${v.event.end_time}`);
            const ms = moment(new Date(), 'DD/MM/YYYY HH:mm:ss').diff(moment(v.event_end, 'DD/MM/YYYY HH:mm:ss'));
            const d = moment.duration(ms).asSeconds();
            return v.type === 'Speaker' && d > 0;
          }
          return false;
        }) : [];
      } else if (this.is_member === true && !this.data_own) {
        this.tab_speaker.data = data.event_expertise ? data.event_expertise.filter(v => {
          if (v.event && v.event.status === 'Approved') {
            v.event_end = new Date(`${v.event.end_date.split(' ')[0]} ${v.event.end_time}`);
            const ms = moment(new Date(), 'DD/MM/YYYY HH:mm:ss').diff(moment(v.event_end, 'DD/MM/YYYY HH:mm:ss'));
            const d = moment.duration(ms).asSeconds();
            return v.type === 'Speaker' && d > 0;
          }
          return false;
        }) : [];
      }

      if (data.certificate) {
        data.certificate.forEach(v => {
          const date = new Date(v.issuing_date);
          v.date_custom = `${this.monthArray[date.getMonth()]} ${date.getFullYear()}`;
        });
      }
      if (data.certificate) {
        data.certificate.forEach(v => {
          const noname = 'No Name';
          const avatar = v.issuing_organization ?
            v.issuing_organization.match(/\b(\w)/g).join('').toUpperCase().substring(0, 2) :
            noname.match(/\b(\w)/g).join('').toUpperCase().substring(0, 2);
          v.avatar_certificate = avatar;
        });
      }
      if ((this.is_member === true && this.data_own) || this.is_member === false) {
        this.tab_training.data = data.certificate ? _.orderBy(data.certificate, 'issuing_date', 'desc') : [];
      } else if (this.is_member === true && !this.data_own) {
        const data_filter = data.certificate.filter(i => i.status === 'approved');
        this.tab_training.data = data_filter ? _.orderBy(data_filter, 'issuing_date', 'desc') : [];
      }

      if ((data.poin) && (this.data_level)) {
        this.point = {
          value: data.poin.poin,
          percent: (data.poin.poin - (this.data_level.point_min - 1)) / 100,
          diff: this.data_level.point_max - data.poin.poin,
          level_next: Number(this.data_level.name.substr(this.data_level.name.length - 1)) + 1,
          level_name: this.data_level.name,
          level_point_min: this.data_level.point_min,
          level_point_max: this.data_level.point_max
        };
      } else {
        this.point = {
          value: 0,
          percent: 0,
          diff: 100,
          level_next: 1,
          level_name: 'Level 1',
          level_point_min: 1,
          level_point_max: 100
        };
      }
    },
    getColor(i) {
      const index = i < 5 ? i : i % 5;
      return this.colorArray[index];
    },
    clickChannel(item) {
      const cek = this.data_channel.includes(item.id);
      if (cek) {
        this.$router.push({
          name: 'channel-detail',
          params: {
            id: item.id
            // title: item.name
            //   .toLowerCase()
            //   .replace(/ /g, '-')
            //   .replace(/\//g, '-')
          }
        });
      } else {
        Notify.create({
          message: 'Error, you not join this channel!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      }
    },
    clickKnowledge(item, post_id) {
      const cek = this.data_channel.includes(item.id);
      if (item.id === 39 || cek) {
        this.$router.push({
          name: 'channel-detail-post-detail',
          params: {
            id: item.id,
            post_id
            //   .toLowerCase()
            //   .replace(/ /g, '-')
            //   .replace(/\//g, '-')
          }
        });
      } else {
        Notify.create({
          message: 'Error, you not join this channel!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      }
    },
    clickExpertise(item) {
      this.$router.push({
        name: 'knowledge',
        params: {
          knowledge_tree_id: item.knowledge_tree_id,
          knowledge_tree_parent_id: item.knowledgeTree.knowledgeTree.id,
          knowledge_tree_parent_parent_id: item.knowledgeTree.knowledgeTree.knowledgeTree.id
        }
      });
    },
    clickCertificate(item) {
      this.form_certificate = item;
      this.modal_certificate = true;
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    openLinkTumbnail(url) {
      window.open(url, '_blank');
    },
    pollColumns (item) {
      const sortItem = _.orderBy(item, 'id', 'asc');
      const arrCek = item.map(v => {
        if (v.picture !== null) {
          return v.picture.split('.')[1] === 'mp4' ? 'Video' : 'Picture';
        }
        return 'Text';
      });
      const columns = [];
      const countCol = arrCek.includes('Picture') ? 2 : 1;
      const mid = Math.ceil(item.length / countCol);
      for (let col = 0; col < countCol; col++) {
        columns.push(sortItem.slice(col * mid, col * mid + mid));
      }
      return columns;
    },
    parseDate(date, formate = 'DD MMMM YYYY') {
      return moment(new Date(date)).format(formate);
    },
    parseTime(time) {
      return time;
      // if (time !== null) {
      //   const sTime = time.split(':');
      //   return `${sTime[0]}:${sTime[1]}`;
      // }
      // return '';
    },
    post_date(dateParam) {
      const date = typeof dateParam === 'object' ?
        dateParam :
        new Date(dateParam);
      const MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const day = date.getDate();
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const x = `${day} ${month} ${year} at ${hours}:${minutes}`;
      return x;
    },
    getSourceVideo(data) {
      return [{
        src: `./api/uploads/files/${data.created_by}/${data.filename_unique}`,
        type: 'video/mp4'
      }];
    },
    getBadges(data) {
      if (data.length > 0) {
        this.badge.show = true;
        this.badge.raw = data.forEach(f => {
          if (f.activity_id >= 40 && f.activity_id <= 42) {
            this.badge.order.post.push(f.activity.tag);
          }
          if (f.activity_id >= 37 && f.activity_id <= 39) {
            this.badge.order.knowledge.push(f.activity.tag);
          }
          if (f.activity_id >= 34 && f.activity_id <= 36) {
            this.badge.order.learner.push(f.activity.tag);
          }
          if (f.activity_id >= 31 && f.activity_id <= 33) {
            this.badge.order.speaker.push(f.activity.tag);
          }
          if (f.activity_id >= 28 && f.activity_id <= 30) {
            this.badge.order.expertise.push(f.activity.tag);
          }
          if (f.activity_id === 46) {
            this.badge.order.training.push(f.activity.tag);
          }
        });
        this.badge.data = data.map(x => x.activity.tag);
        const z = this.badge.data.map(k => {
          return {
            title: k,
            level: this.getValue(k)[1],
            parent: this.getValue(k)[0]
          };
        });
        const x = z.sort((a, b) => (b.level - a.level));
        this.badge.data = x.map(y => y.title);
        const arrHasil = [];
        const state = {
          post: 0,
          knowledge: 0,
          learner: 0,
          speaker: 0,
          expertise: 0,
          asn: 0
        };
        x.forEach((item, i) => {
          if ((item.parent === 'post' && state.post === 0)
            || (item.parent === 'knowledge' && state.knowledge === 0)
            || (item.parent === 'learner' && state.learner === 0)
            || (item.parent === 'speaker' && state.speaker === 0)
            || (item.parent === 'expertise' && state.expertise === 0)
            || (item.parent === 'asn' && state.asn === 0)) {
            arrHasil.push({
              title: item.title
            });
          }
          switch (item.parent) {
            case 'post': state.post = 1; break;
            case 'knowledge': state.knowledge = 1; break;
            case 'learner': state.learner = 1; break;
            case 'speaker': state.speaker = 1; break;
            case 'expertise': state.expertise = 1; break;
            // case 'asn': state.asn = 1; break;
            default: state.asn = 1;
          }
          // }
        });
        const hasilAkhir = arrHasil.map(y => y.title);
        // )
        // this.badge.top3 = data.slice(0, 3).map(x => {
        //   return {
        //     tag: x.activity.tag,
        //     title: x.activity.tag.replace('_', ' ')
        //   };
        // }).reverse();
        // this.badge.top3 = _.sortBy(
        //   data.map(x => {
        //     return {
        //       tag: x.activity.tag,
        //       title: x.activity.tag.replace('_', ' ')
        //     };
        //   }), s => {
        //     const rank = {
        //       post_advance: 1,
        //       speaker_advance: 2,
        //       learner_advance: 3,
        //       knowledge_advance: 4,
        //       expert_advance: 5,
        //       post_intermediate: 6,
        //       speaker_intermediate: 7,
        //       learner_intermediate: 8,
        //       knowledge_intermediate: 9,
        //       expert_intermediate: 10,
        //       post_basic: 11,
        //       speaker_basic: 12,
        //       learner_basic: 13,
        //       knowledge_basic: 14,
        //       expert_basic: 15
        //     };
        //     return rank[s.tag];
        //   }
        // ).slice(0, 3).reverse();

        this.badge.sort = [];
        this.badge.sort = Object.keys(this.badge.order)
          .map(k => {
            return {
              key: k,
              value: this.badge.order[k],
              count: this.badge.order[k].length,
              title: this.titleBadge(k),
              level: this.getValue(this.titleBadge(k))
            };
          })
          .sort((a, b) => { return b.count - a.count; });
        // const topThree = [];


        this.badge.top3 = [];
        hasilAkhir.forEach((v, i) => {
          if (i < 3) {
            this.badge.top3.push({
              title: v.replace('_', ' '),
              tag: v
            });
          }
        });
        // this.badge.sort.forEach((v, i) => {
        //   if (i < 3 && v.count > 0) {
        //     topThree.push(v.value[v.count - 1]);
        //     this.badge.top3.push({
        //       title: v.value[v.count - 1].replace('_', ' '),
        //       tag: v.value[v.count - 1]
        //     });
        //   }
        // });
      } else {
        this.badge.show = false;
      }
    },
    matchHeight () {
      setTimeout(() => {
        const height = this.$refs.cardInfo.clientHeight;
        this.profile_info1_height = height;
      }, 2000);
    },
    titleBadge(val) {
      let ret = null;
      switch (val) {
        case 'post': ret = 'Top Post'; break;
        case 'knowledge': ret = 'Knowledge Asset'; break;
        case 'learner': ret = 'Smart Learner'; break;
        case 'speaker': ret = 'Speaker'; break;
        case 'expertise': ret = 'Expert'; break;
        case 'training': ret = 'Smart ASN'; break;
        default: ret = null;
      }
      return ret;
    },
    getUser() {
      if (checkRole().name === 'member') {
        this.is_member = true;
      }
      if (checkRole().name === 'km_manager') {
        this.is_km_manager = true;
      }
    },
    getValue(data) {
      let val = 0;
      let parent = 'a';
      switch (data) {
        case 'asn_smart': val = 3; parent = 'asn'; break;
        case 'knowledge_advance': val = 3; parent = 'knowledge'; break;
        case 'learner_advance': val = 3; parent = 'learner'; break;
        case 'speaker_advance': val = 3; parent = 'speaker'; break;
        case 'expert_advance': val = 3; parent = 'expert'; break;
        case 'post_advance': val = 3; parent = 'post'; break;
        case 'knowledge_intermediate': val = 2; parent = 'knowledge'; break;
        case 'learner_intermediate': val = 2; parent = 'learner'; break;
        case 'speaker_intermediate': val = 2; parent = 'speaker'; break;
        case 'expert_intermediate': val = 2; parent = 'expert'; break;
        case 'post_intermediate': val = 2; parent = 'post'; break;
        case 'knowledge_basic': val = 1; parent = 'knowledge'; break;
        case 'learner_basic': val = 1; parent = 'learner'; break;
        case 'speaker_basic': val = 1; parent = 'speaker'; break;
        case 'expert_basic': val = 1; parent = 'expert'; break;
        case 'post_basic': val = 1; parent = 'post'; break;
        default: val = 0;
      }
      const hasil = [parent, val];
      return hasil;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.matchHeight();
    this.getUser();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  watch: {
    data_user: {
      immediate: true,
      deep: true,
      handler(value) {
        this.getData(value);
      }
    },
    data_badges: {
      immediate: true,
      deep: true,
      handler(value) {
        this.getBadges(value);
      }
    },
    windowHeight(newHeight, oldHeight) {
      this.txt = `it changed to ${newHeight} from ${oldHeight}`;
    }
  },
  computed: {
    tab_post_category() {
      const filter = this.tab_post_type === 'All'
        ? this.tab_post.data
        : this.tab_post.data.filter(f => {
          return f.post_type === this.tab_post_type;
        });
      return filter;
    }
  }
};
</script>

<style lang="sass" scoped>
.card-quiz-create
  width: 100%
  max-width: 400px
.my-card-notif
  width: 100%
  max-width: 100%
  height: auto
  border-radius: 8px
  background: $info
  border: 1px solid $primary
  box-sizing: border-box
  box-shadow: none
  color: $primary

.my-card-profile-post
  width: 100%
  max-width: 100%
  height: auto
  border-radius: 8px
  background: #EFF1F4
  box-sizing: border-box
  box-shadow: none

.my-card-profile-post-2
  width: 100%
  max-width: 100%
  height: auto
  border-radius: 8px
  background: #FFFFFF
  box-sizing: border-box
  box-shadow: none

.kmp-profile-item-list
  padding: 1px
  border-bottom: 1px solid #E5E8ED

.kmp-text-nama
  font-weight: 600
  font-size: 14px
  line-height: 20px
  color: #4F5A70
  flex: none
  order: 0
  flex-grow: 0

.kmp-time
  font-style: normal
  font-weight: normal
  font-size: 12px
  line-height: 20px
  color: #838FA7
  flex: none
  order: 1
  flex-grow: 0

.poll-container
  display: flex

.poll-col-1
  flex-grow: 1
  display: flex
  flex-direction: column

.poll-col
  margin-right: 10px
  flex-grow: 1
  display: flex
  flex-direction: column

.poll_text_img
  height: 168px
  max-width: 180px

.poll-choice
  background-color: #94D5FD
  border-radius: 8px

#bottomControls
  display: none !important

</style>
<style>
  .q-media__controls {
    display: none !important;
  }
  .q-media--big-button {
    display: none !important;
    background: unset;
    border-style: unset;
  }
  .q-btn__wrapper {
    padding: 4px 14px;
  }
  .modal-size {
    height: 660px;
    width: 550px;
    max-width: 40vw;
  }
</style>
