<template>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    :width="$q.platform.is.mobile ? 250 : 350"
  >
    <q-resize-observer @resize="onResize"/>
    <q-scroll-area class="fit kmp-left-bar">
      <q-list padding testcafe-tag="user-list" class="q-py-md q-pl-md q-pr-none">
        <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="$router.push({ name: 'admin-home' })"
          :active="$route.name === 'admin-home'"
          active-class="kmp-menu-left-active"
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="home" class="" size="1.5em"/>
          </q-item-section>
          <q-item-section class="">Dashboard</q-item-section>
        </q-item>
        <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="$router.push({ name: 'bookmark' })"
          :active="$route.name === 'bookmark'"
          active-class="kmp-menu-left-active"
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="bookmarks" class="" size="1.5em"/>
          </q-item-section>
          <q-item-section class="">My Bookmark</q-item-section>
        </q-item>
        <!-- <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="$router.push({ name: 'admin-home' })"
          :active="$route.name === 'calendar'"
          active-class="kmp-menu-left-active"
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="calendar_today" class="icon-menu" size="1.5em"/>
          </q-item-section>
          <q-item-section class="">Calendar</q-item-section>
        </q-item> -->
        <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="$router.push({ name: 'knowledge' })"
          :active="$route.name === 'knowledge'"
          active-class="kmp-menu-left-active"
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="book" class="" size="1.5em"/>
          </q-item-section>
          <q-item-section class="">Knowledge Map</q-item-section>
        </q-item>

        <!--        <q-item -->

        <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="$router.push({ name: 'training' }).catch(() => {});"
          :active="$route.name === 'training'"
          active-class="kmp-menu-left-active"
          v-if="is_km_manager==false"
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="school" class="" size="1.5em"/>
          </q-item-section>
          <q-item-section class="">Training</q-item-section>
        </q-item>

<!--        <q-item-->
<!--          v-show="is_km_manager"-->
<!--          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"-->
<!--          dense-->
<!--          clickable-->
<!--          v-ripple-->
<!--          @click="$router.push({ name: 'statistik' })"-->
<!--          :active="$route.name === 'statistik'"-->
<!--          active-class="kmp-menu-left-active"-->
<!--        >-->
<!--          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">-->
<!--            <q-icon name="query_stats" class="" size="1.5em"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section class="">Statistik</q-item-section>-->
<!--        </q-item>-->


<!--        <q-item-->
<!--          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md desktop-only"-->
<!--          dense-->
<!--          clickable-->
<!--          v-ripple-->
<!--          @click="$router.push({ name: 'analytics-audience' })"-->
<!--          :active="['analytics-audience','analytics-kmap','analytics-channel','analytics-content',].includes($route.name)"-->
<!--          active-class="kmp-menu-left-active"-->
<!--        >-->
<!--          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">-->
<!--            <q-icon name="insert_chart" class="" size="1.5em"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section class="">Analytics</q-item-section>-->
<!--        </q-item>-->

        <q-expansion-item
          ref="refMenuChannel"
          expand-icon-toggle
          switch-toggle-side
          v-model="menuOpenChannel"
          group="leftbar"
          header-class="kmp-left-bar-menu"
        >
          <template v-slot:header>
            <q-item-section class="list list-menu q-mr-sm">
              <div>
                <span class="kmp-font-bold kmp-text-grey-2 q-ml-xs cursor-pointer" @click="$refs.refMenuChannel.toggle()">CHANNEL</span>
                <q-icon name="more_horiz" class="icon-menu float-right cursor-pointer" size="20px">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section class="km-list-more" @click="handleCreate();">Create Channel</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section color="km-blue" @click="handleBrowse();" class="km-list-more">Browse Channel
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-icon>
              </div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="kmp-bg-color-1 q-py-none">
<!--              <div v-if="listChannel.length === 0 && newMember === false">-->
<!--                <q-skeleton type="rect" height="26px" class="kmp-loading-bar q-my-sm"/>-->
<!--                <q-skeleton type="rect" height="26px" class="kmp-loading-bar q-my-sm"/>-->
<!--                <q-skeleton type="rect" height="26px" class="kmp-loading-bar q-my-sm"/>-->
<!--              </div>-->
              <div v-for="(item, index) in listChannel" :key="index">
                <!--                  :to="{ name: 'channel-detail', params: { id: item.id } }"-->
                <q-item
                  class="kmp-menu-left q-py-xs q-my-xs q-px-sm q-pr-none"
                  dense
                  clickable
                  v-ripple
                  @click="handleClick(item, index)"
                  :active="$route.params.id === item.id"
                  active-class="kmp-menu-left-active"
                >
                  <q-avatar v-if="item.avatar" class="q-mr-sm" size="1.5em" style="margin-top: 1px;">
                    <img :src="item.avatar">
                  </q-avatar>
                  <q-item-section v-else="" avatar style="min-width: 10px" class="q-pr-sm">
                    <q-icon v-if="item.channel_type === 'General'" name="public" class="" size="1.5em"/>
                    <q-icon v-if="item.channel_type === 'Direktorat'" name="domain" class="" size="1.5em"/>
                    <q-icon v-if="item.channel_type === 'COP'" name="group_add" class="" size="1.5em"/>
                    <q-icon v-if="item.channel_type === 'Project'" name="chat_bubble" class="" size="1.5em"/>
                    <q-icon v-if="item.channel_type === 'Hobby'" name="sports_esports" class="" size="1.5em"/>
                  </q-item-section>
                  <!-- --{{item.channel_type === 'General' ? item.channel_member : 'lain'}} -->
                  <q-item-section class="text-capitalize">{{ item.short_name }}</q-item-section>
                  <q-item-section class="" side>
                    <q-badge rounded color="primary" v-if="item.channel_type !== 'General' && item.channel_member && item.channel_member[0].latest.post_count > 0" :label="item.channel_member[0].latest.post_count"/>
                    <q-badge rounded color="primary" v-if="item.channel_type === 'General' && item.channel_member && item.channel_member.toString() !== '0'" :label="item.channel_member.toString()"/>
<!--                    <q-badge rounded color="primary" v-if="item.channel_type !== 'General' && item.channel_member[0].latest && item.channel_member[0].latest.post_count > 0" :label="item.channel_member[0].latest ? item.channel_member[0].latest.post_count : 0"/>-->
<!--                    <q-badge rounded color="primary" v-if="item.channel_type === 'General' && item.channel_member.toString() !== '0'" :label="item.channel_member.toString()"/>-->
                  </q-item-section>
                </q-item>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          ref="refMenuTraining"
          expand-icon-toggle
          switch-toggle-side
          v-model="menuOpenTraining"
          group="leftbar"
          header-class="kmp-left-bar-menu"
          v-if="is_km_manager || is_training_manager"
        >
          <template v-slot:header>
            <q-item-section class="list list-menu q-mr-sm">
              <div>
                <span class="kmp-font-bold kmp-text-grey-2 q-ml-xs cursor-pointer" @click="$refs.refMenuTraining.toggle()">TRAINING</span>
              </div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="kmp-bg-color-1 q-py-none">
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
                dense
                clickable
                v-ripple
                @click="$router.push({ name: 'training' }).catch(() => {});"
                :active="$route.name === 'training'"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon name="school" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="">Training</q-item-section>
              </q-item>
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
                dense
                clickable
                v-ripple
                @click="$router.push({ name: 'training-report' }).catch(() => {});"
                :active="$route.name === 'training-report'"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon name="menu_book" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="">Training Report</q-item-section>
              </q-item>
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
                dense
                clickable
                v-ripple
                @click="$router.push({ name: 'narasumber' }).catch(() => {});"
                :active="$route.name === 'narasumber'"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon name="people" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="">Database Narasumber Eksternal</q-item-section>
              </q-item>
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
                dense
                clickable
                v-ripple
                @click="$router.push({ name: 'training-master' }).catch(() => {});"
                :active="$route.name === 'traning-master'"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon name="book" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="">Master Training</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          ref="refMenuMessage"
          expand-icon-toggle
          switch-toggle-side
          v-model="menuOpenMessage"
          group="leftbar"
          class="desktop-only"
          header-class="kmp-left-bar-menu">
          <template v-slot:header>
            <q-item-section class="list list-menu q-mr-sm">
              <div>
                <span class="kmp-font-bold kmp-text-grey-2 q-ml-xs cursor-pointer" @click="$refs.refMenuMessage.toggle()">PRIVATE MESSAGE</span>
                <q-icon @click="messageMemberSearchClear" name="add" class="icon-menu float-right cursor-pointer"
                        size="20px">
                  <q-menu anchor="top right" :offset="[30, 0]" max-height="400px" v-model="search_user_model">
                    <div class="row no-wrap q-pa-none q-px-md">
                      <q-input borderless dense ref="search_input" @input="messageMemberSearch" debounce="1000"
                               clear-icon="close"
                               class="q-pa-none q-ma-none" style="width: 100%" v-model="message.member_search_input"
                               label="Search User">
                        <template v-slot:append>
                          <q-icon v-if="message.member_search_input === ''" name="search"/>
                          <q-icon v-else name="clear" class="cursor-pointer" @click="messageMemberSearchClear"/>
                        </template>
                      </q-input>
                    </div>

                    <q-separator/>

                    <div class="row no-wrap q-pa-none q-mx-xs">
                      <q-scroll-area style="height: 300px;width: 300px; max-width: 300px;">
                        <q-item
                          v-bind:class="!message.is_loading && message.member_search_list.length === 0?'':'hidden'"
                          :key="`notif`" style="max-width: 300px">
                          <q-item-section>
                            <div class="text-center">
                              <q-img class="q-mt-xl q-px-xl" src="../assets/images/search-not-found.png"
                                     style="max-width: 600px"/>
                              <div v-if="message.member_search_input === ''" class="kmp-font-md text-center q-mt-lg">
                                Search user
                              </div>
                              <div v-if="message.member_search_input === ''" class="kmp-font-sm text-center q-mb-lg">
                                Select a user to start private message
                              </div>
                              <div v-if="message.member_search_input.length >=1 && message.member_search_input !== ''" class="kmp-font-md text-center q-mt-lg">
                                Search user not found!
                              </div>
                              <div v-if="message.member_search_input.length <1 && message.member_search_input !== ''" class="kmp-font-md text-center q-mt-lg">
                                Search keyword
                              </div>
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item v-bind:class="message.is_loading?'':'hidden'" v-for="index in 5"
                                :key="`skeleton_${index}`" style="max-width: 300px; min-height: 40px"
                                class="q-py-none q-px-sm">
                          <!--                        <q-item v-for="index in 5" :key="index" style="max-width: 300px; min-height: 40px" class="q-py-none q-px-sm">-->
                          <q-item-section avatar class="q-pa-none" style="min-width: 36px">
                            <q-skeleton size="25px" type="QAvatar"/>
                          </q-item-section>

                          <q-item-section>
                            <q-item-label>
                              <q-skeleton type="text" height="40px" width="80%"/>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item
                          v-for="(item, index) in message.member_search_list"
                          :key="`item_${index}`"
                          dense
                          clickable
                          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm cursor-pointer q-mr-md"
                          v-close-popup
                          @click="messageMenu('create',item)">
                          <q-item-section avatar>
                            <!--                            :online="item.is_online"-->
                            <Avatar size="md" class="q-mr-sm"
                                    :picture="item.profile_picture ? `./api${item.profile_picture}` : ''"
                                    :name="item.name"/>
                          </q-item-section>
                          <q-item-section class="list list-channel text-capitalize">
                            {{ item.name.toLowerCase() }}
                          </q-item-section>
                          <!--                          <q-item-section side>-->
                          <!--                            <q-badge color="primary" rounded :label="item.message_count"/>-->
                          <!--                          </q-item-section>-->
                        </q-item>
                      </q-scroll-area>
                    </div>
                  </q-menu>
                </q-icon>
              </div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="kmp-bg-color-1 q-py-none q-mb-md">
              <!--              <div class="text-weight-light kmp-font-sm kmp-text-grey-2" style="margin-top: -10px; margin-left: 25px; margin-bottom: 8px">{{ message.member_list.filter(x=>x.is_online).length }} Online</div>-->
              <q-scroll-area
                class=""
                :style="{
                  height: `${pmHeight}px`,
                  maxWidth: '300px'
                  }"
                :thumb-style="thumbStyle">
                <q-item
                  class="kmp-menu-left q-py-xs q-my-xs q-px-sm q-pr-sm"
                  dense
                  clickable
                  v-ripple
                  active-class="kmp-menu-left-active"
                  @click="openSearchUser"
                  v-show="message.member_list.length === 0"
                >
                  <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                    <q-icon name="add_reaction" class="" size="1.5em"/>
                  </q-item-section>
                  <q-item-section class="">
                    Start a chat
                  </q-item-section>
                </q-item>

                <q-item
                  v-for="(item, index) in message.member_list"
                  :key="index"
                  dense
                  clickable
                  class="kmp-private-message-member kmp-menu-left q-py-xs q-my-xs q-pl-sm cursor-pointer q-pr-sm"
                >
                  <q-item-section @click="handleOpenMessage(item.message_id)" avatar>
                    <Avatar size="md" :online="item.is_online"
                            :picture="item.profile_picture ? `./api${item.profile_picture}` : ''" :name="item.name"/>
                  </q-item-section>
                  <q-item-section @click="handleOpenMessage(item.message_id)" class="list list-channel text-capitalize q-pl-xs">
                    {{ item.name.toLowerCase() }}
                  </q-item-section>
                  <q-item-section side>
                    <div class="fit row">
                      <div>
                        <q-icon class="kmp-private-message-member-more q-mr-xs" name="more_vert" size="20px"/>
                        <q-menu anchor="top right" max-height="400px">
                          <q-list style="min-width: 100px">
                            <q-item clickable v-close-popup dense
                                    @click="$router.push({ name: 'profile-detail', params: { id: item.id } })">
                              <q-item-section avatar class="q-pa-none" style="min-width: 30px">
                                <q-icon name="account_circle" size="20px"/>
                              </q-item-section>
                              <q-item-section>Go To Profile</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup dense @click="messageMenu('clear',item)">
                              <q-item-section avatar class="q-pa-none" style="min-width: 30px">
                                <q-icon name="clear" size="20px"/>
                              </q-item-section>
                              <q-item-section>Clear Conversation</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup dense @click="messageMenu('delete',item)">
                              <q-item-section avatar class="q-pa-none" style="min-width: 30px">
                                <q-icon name="delete" size="20px"/>
                              </q-item-section>
                              <q-item-section>Delete Conversation</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </div>
                      <div v-if="item.message_count >0">
                        <q-badge color="primary" rounded :label="(item.message_count > 99?'99+': item.message_count)"/>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-scroll-area>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          ref="refMenuLeaderboard"
          expand-icon-toggle
          switch-toggle-side
          v-model="menuOpenLeaderboard"
          group="leftbar"
          header-class="kmp-left-bar-menu"
          class=""
          v-if="is_km_manager || is_admin"
        >
          <template v-slot:header>
            <q-item-section class="list list-menu q-mr-sm">
              <div>
                <span class="kmp-font-bold kmp-text-grey-2 q-ml-xs cursor-pointer" @click="$refs.refMenuLeaderboard.toggle()">LEADERBOARD</span>
              </div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="kmp-bg-color-1 q-py-none">
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
                dense
                clickable
                v-ripple
                @click="$router.push({ name: 'leaderboard-direktorat' }).catch(() => {});"
                :active="$route.name === 'leaderboard-direktorat'"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon name="domain" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="">By Direktorat</q-item-section>
              </q-item>
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
                dense
                clickable
                v-ripple
                @click="$router.push({ name: 'leaderboard-member' }).catch(() => {});"
                :active="$route.name === 'leaderboard-member'"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon name="groups" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="">By Member</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          ref="refMenuAnalytics"
          expand-icon-toggle
          switch-toggle-side
          v-model="menuOpenAnalytics"
          group="leftbar"
          header-class="kmp-left-bar-menu"
          v-if="is_km_manager"
        >
          <template v-slot:header>
            <q-item-section class="list list-menu q-mr-sm">
              <div>
                <span class="kmp-font-bold kmp-text-grey-2 q-ml-xs cursor-pointer" @click="$refs.refMenuAnalytics.toggle()">ANALYTICS</span>
              </div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="kmp-bg-color-1 q-py-none">
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
                dense
                clickable
                v-ripple
                @click="$router.push({ name: 'analytics-audience' }).catch(() => {});"
                :active="$route.name === 'analytics-audience'"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon name="groups" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="">Audience</q-item-section>
              </q-item>
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
                dense
                clickable
                v-ripple
                @click="$router.push({ name: 'analytics-kmap' }).catch(() => {});"
                :active="$route.name === 'analytics-kmap'"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon name="book" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="">Knowledge Map</q-item-section>
              </q-item>
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
                dense
                clickable
                v-ripple
                @click="$router.push({ name: 'analytics-content' }).catch(() => {});"
                :active="$route.name === 'analytics-content'"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon name="content_paste_go" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="">Content Platform</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="online_users.list_dialog = true"
          active-class="kmp-menu-left-active"
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="3p" class="" size="1.5em"/>
          </q-item-section>
          <!--          <q-item-section class="">{{ message.member_list.filter(x=>x.is_online).length }} User{{message.member_list.filter(x=>x.is_online).length >1?'s':''}} Online</q-item-section>-->
          <q-item-section class="">{{ memberOnline }} User{{memberOnline >1?'s':''}} Online</q-item-section>
        </q-item>

        <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="$router.replace({ name: 'guidelines-list' }).catch(() => {});"
          :active="$route.name === 'guidelines'"
          active-class="kmp-menu-left-active" >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="o_fact_check" class="" size="1.5em"/>
          </q-item-section>
          <q-item-section class="">User Guideline</q-item-section>
        </q-item>

        <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="$router.push({ name: 'ratingapp' })"
          :active="$route.name === 'ratingapp'"
          active-class="kmp-menu-left-active"
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="star" class="" size="1.5em"/>
          </q-item-section>
          <q-item-section class="">Ratings & Reviews</q-item-section>
        </q-item>
        <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="$router.push({ name: 'smart-report' })"
          :active="$route.name === 'smart-report'"
          active-class="kmp-menu-left-active"
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="support_agent" class="" size="1.5em"/>
          </q-item-section>
          <q-item-section class="">Help Desk</q-item-section>
        </q-item>
        <!-- <q-item
          class="kmp-menu-left q-py-xs q-my-xs q-pl-sm q-mr-md"
          dense
          clickable
          v-ripple
          @click="$router.push({ name: 'tutorial' })"
          :active="$route.name === 'tutorial'"
          active-class="kmp-menu-left-active"
        >
          <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
            <q-icon name="system_update" class="" size="1.5em"/>
          </q-item-section>
          <q-item-section class="">Tutorial</q-item-section>
        </q-item> -->
      </q-list>

      <!--      <q-btn label="add poin" @click="addPoint"></q-btn>-->
      <!--      <q-btn label="rollback poin" @click="rollbackPoint"></q-btn>-->
    </q-scroll-area>

    <q-dialog v-model="add_channel" :maximized="$q.platform.is.mobile ? true : false">
      <q-card style="min-width: 300px" class="q-py-md q-px-sm">
        <q-card-section class="q-py-none mobile-only row">
          <div class="col-1 q-mt-xs">
            <q-icon name="arrow_back" class="" :size="$q.platform.is.mobile ? '20px' : '30px'"
                    style="" v-close-popup/>
          </div>
          <div class="col-10 q-mt-sm">
            <!-- <q-item-label class="kmp-text-nama">Create a Channel</q-item-label> -->
            <q-item-section class="q-ml-sm">
              <q-item-label class="kmp-text-nama">Create a Channel</q-item-label>
            </q-item-section>
          </div>
        </q-card-section>
        <q-separator class="mobile-only q-mt-sm"/>
        <q-card-section>
          <q-icon name="close" size="24px" class="text-neutral float-right desktop-only" v-close-popup/>
          <div class="text-title-form q-mb-md text-capitalize desktop-only">Create a channel</div>
          <div class="text-desc-form">Channels are where your team communicates. It could change the type like
            Department, Community of Practice, and General.
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel types</div>
          <q-select outlined
                    dense
                    autofocus
                    v-model="type"
                    :options="options_type_admin"
                    behavior="menu"
                    v-if="is_channel_manager==true"/>
          <q-select outlined dense autofocus v-model="type" :options="options_type_member" behavior="menu" v-else/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel Name</div>
          <q-input dense v-model="name" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel Short Name</div>
          <q-input dense v-model="short_name" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Descriptions</div>
          <q-input dense v-model="desc" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Manfaat bagi Organisasi</div>
          <q-input dense v-model="cop_organisasi" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Manfaat bagi Anggota Komunitas</div>
          <q-input dense v-model="cop_komunitas" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Minat Komunitas</div>
          <q-input dense v-model="cop_minat" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Fokus Pengetahuan</div>
          <q-input dense v-model="cop_fokus" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Aturan Dasar</div>
          <q-input dense v-model="cop_aturan" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel Avatar</div>
          <div class="row q-gutter-md">
            <q-avatar rounded size="56px" font-size="56px" color="blue-3" text-color="white">
              <img v-if="avatar_channel" :src="avatar_channel">
              <q-icon v-else name="account_circle"/>
            </q-avatar>
            <!-- <div hidden>
              <q-file ref="file" dense clearable filled @input="filePickedChannel"></q-file>
            </div> -->
            <q-btn no-caps class="self-end" @click="handleUploadAvatarChannel" color="primary" outline size="md"
                   type="file">
                   <input
                    hidden
                    type="file"
                    ref="file"
                    @change="uploadImage($event)"
                    accept="image/*"
                  />Edit
            </q-btn>
            <q-btn no-caps class="self-end text-weight-bolder" @click="handleDelImgChannel('avatar')" color="negative" flat>
              Delete
            </q-btn>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel Banner</div>
          <q-img v-show="banner_channel" :src="banner_channel">
            <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
                   style="top: 8px; right: 8px" @click="handleDelImgChannel('banner')"
            />
          </q-img>
          <q-img v-show="!banner_channel" src="../assets/images/upload.png" class="cursor-pointer" @click="handleUploadBannerChannel"/>
          <input
            hidden
            type="file"
            ref="fileBanner"
            @change="uploadImageBanner($event)"
            accept="image/*"
          />
          <!-- <q-uploader
            :url="handleUploadBannerChannel"
            ref="uploader_banner"
            :label="`Banner Channel - Maks file size 1Mb (400 x 150 px)`"
            max-files="1"
            accept="image/*"
            batch
            auto-upload
            style="width: 100%"
            class="shadow-0 q-uploader--bordered kmp-rounded"
          /> -->
        </q-card-section>

        <q-card-section class="q-py-none">
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-toggle
                  v-model="private_channel"
                  checked-icon="check"
                  color="blue"
                  size="lg"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Private Channel</q-item-label>
                <q-item-label caption>Once you make private, only member you invite can view & joined the
                  channel
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <!-- <q-card-section class="q-py-none" v-if="type !== 'COP'">
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-toggle
                  v-model="enabled"
                  checked-icon="check"
                  color="blue"
                  size="lg"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Enable Channel</q-item-label>
                <q-item-label caption>Disable channel will not show on member pages</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section> -->

        <q-card-actions align="right" class="text-primary">
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button full-width" label="Create Channel"
                 unelevated v-close-popup @click="saveChannel();"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="browse_channel">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section>
          <q-icon name="close" size="24px" class="text-neutral float-right" v-close-popup/>
          <div class="text-title-form q-mb-md">Channel Browser</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
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
            class="kmp-rounded"
            hide-dropdown-icon
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
                @click="handleClick(scope.opt)"
                v-close-popup
              >
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
      </q-card>
    </q-dialog>
    <q-dialog v-model="online_users.dialog" seamless position="right" content-class="kmp-online-dialog">
      <q-card
        style="background-color: rgba(47, 132, 195, 1);"
        class="text-grey-2"
        flat square>
        <!--          <q-linear-progress :value="0.6" color="pink" />-->

        <q-card-section class="row items-center no-wrap q-py-xs q-px-sm cursor-pointer" @click="openOnlineUser">
          <div>
            <q-icon name="sentiment_very_satisfied" size="18px" />
          </div>
          <div class="q-ml-sm q-mr-lg kmp-font-sm-2">
            <div><span class="text-weight-bold text-capitalize">{{(online_users.user.name + '').toLowerCase()}}</span> is online now.</div>
            <!--              <div class="text-grey">Fitz & The Tantrums</div>-->
          </div>

          <!--            <q-space />-->

          <!--            <q-btn flat round icon="play_arrow" />-->
          <!--            <q-btn flat round icon="pause" />-->
          <!--            <q-btn flat round icon="close" v-close-popup />-->
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog persistent v-model="online_users.list_dialog" >
      <!-- style="height: 500px;width: 500px; max-width: 40vw;" -->
      <q-card class="q-pa-none" :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-left q-pl-xs q-mb-md" :style=" $q.platform.is.desktop ? 'width: 400px;' : 'width: 200px;'">
            <q-icon name="3p" class="q-mr-sm" size="1.4em"/>
            You & {{ memberOnline }} User{{memberOnline >1?'s':''}} Online
          </div>
          <q-space/>
          <q-btn icon="close" class="q-mb-md" flat round dense @click="online_users.list_dialog = false" />
        </q-card-section>

        <q-card-section class="row items-center q-pb-none">
          <div class="bg-grey-2" style="max-width: 100%; width: 100%">
            <q-scroll-area style="height: 400px" class="q-px-sm q-py-sm">
              <q-item
                v-for="(item, index) in memberOnlineList"
                :key="index"
                dense
                v-bind:clickable="item.id !== getLoginId()"
                v-bind:class="item.id !== getLoginId()?'cursor-pointer':''"
                class="kmp-private-message-member kmp-menu-left q-py-xs q-my-sm q-pl-sm q-pr-sm"
              >
<!--                v-bind:clickable="item.id !== getLoginId()"-->
<!--                v-bind:class="item.id !== getLoginId()?'cursor-pointer':''"-->
<!--                @click="handleOpenMessage(item.message_id)"-->
<!--                @click="handleOpenMessage(item.message_id)"-->
                <q-item-section avatar @click="goToProfile(item.id)">
                  <Avatar size="md" :online="true"
                          :picture="item.profile_picture ? `./api${item.profile_picture}` : ''" :name="item.name"/>
                </q-item-section>
                <q-item-section class="list list-channel text-capitalize q-pl-xs" @click="goToProfile(item.id)">
                  {{ item.name.toLowerCase() }}
                </q-item-section>
                <q-item-section side v-if="item.id !== getLoginId()" @click="doOpenPM(item)">
                  <div class="fit row">
                    <div>
                      <q-icon class="q-ml-xs" name="chat_bubble" size="20px"/>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-scroll-area>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="hidden">
      <q-media-player
        ref="audioBeepRef"
        type="audio"
        :sources="[{src: 'default_beep.wav', type: 'audio/wav'}]"
        dense
        preload="auto"
      />
      <q-media-player
        ref="audioOnlineRef"
        type="audio"
        :sources="[{src: 'contact_online.wav', type: 'audio/wav'}]"
        dense
        preload="auto"
      />
    </div>
    <q-dialog v-model="modal_upload">
      <q-card class="card-quiz-create">
        <q-card-section class="q-pt-none text-right">
          <cropper ref="cropper"
            class="cropper"
            :src="image.src"
            stencil-component="circle-stencil"
            :stencil-props="{
              aspectRatio: 1/1,
            }"/>
          <Preview
            :width="120"
            :height="120"
            :image="result.image"
            :coordinates="result.coordinates"
          />
          <q-btn @click="cropImage" dense no-caps class="q-mt-lg" color="primary" outline>Crop image</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_upload_banner">
      <q-card class="card-quiz-create">
        <q-card-section class="q-pt-none text-right">
          <cropper ref="cropperBanner"
            class="cropper"
            :src="imageBanner.src"
            :stencil-props="{
              aspectRatio: 16/4,
            }"/>
          <Preview
            :width="120"
            :height="120"
            :image="resultBanner.image"
            :coordinates="resultBanner.coordinates"
          />
          <q-btn @click="cropImageBanner" dense no-caps class="q-mt-lg" color="primary" outline>Crop image</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-drawer>
</template>

<script>
import { getLoginId, checkRole } from 'src/lib/helper';
import { getCredential } from 'src/lib/storage';
import Avatar from 'components/common/Avatar';
import { Notify } from 'quasar';
import { Cropper, Preview } from 'vue-advanced-cropper';
import bus from 'components/common/EventBus';
import {
  channelCreate,
  channelList, deleteMessageParticipant,
  fileUpload,
  messageConversationRead,
  messageMemberList,
  // postCreateMessage,
  // postCreateMessageParticipant,
  postCreateNewMessage,
  postMessageConversationClear, updateUpdatedDate
  // channelMemberLatest
  // SearchData
} from '../lib/api';
import { get } from '../lib/HttpHelper';
import { point } from '../lib/point';
import 'vue-advanced-cropper/dist/style.css';
// import 'src/lib/PrivateMessage';

export default {
  props: ['is_loading'],
  components: { Avatar, Cropper, Preview },
  data() {
    return {
      postCreateNewMessage,
      getLoginId,

      menuOpenChannel: false,
      menuOpenTraining: false,
      menuOpenMessage: false,
      menuOpenAnalytics: false,
      menuOpenLeaderboard: false,

      all_member_list: [],
      left_bar_size: {},
      thumbStyle: {
        right: '-6px',
        borderRadius: '5px',
        backgroundColor: '#D8DDE2',
        width: '5px',
        opacity: 1
      },
      message: {
        member_list: [],
        member_list_id: [],
        member_search_list: [],
        member_search_input: '',
        memberFetch: messageMemberList,
        deleteMessageParticipant,
        is_loading: false
      },
      leftDrawerOpen: false,
      drawer: true,
      miniState: false,
      search_user_model: false,
      type: null,
      active: true,
      enabled: false,
      name: null,
      short_name: null,
      desc: null,
      avatar: null,
      banner: null,
      avatar_channel: null,
      banner_channel: null,
      url: process.env.QUASAR_API_URL,
      add_channel: false,
      browse_channel: false,
      private_channel: false,
      listChannel: [],
      options_type_admin: [
        'CoP', 'Project', 'Hobby'
      ],
      cop_organisasi: null,
      cop_komunitas: null,
      cop_minat: null,
      cop_fokus: null,
      cop_aturan: null,
      options_type_member: [
        'Project', 'Hobby'
      ],
      search_channel_model: '',
      data_channel: [],
      channel_options: this.data_channel,
      newMember: false,
      is_training_manager: false,
      is_channel_manager: false,
      is_km_manager: false,
      is_admin: false,
      user: {
        id: '',
        name: '',
        initial: ''
      },
      audioBeepRef: null,
      audioOnlineRef: null,
      online_users: {
        dialog: false,
        user: { id: 0, name: '' },
        list_dialog: false
      },
      result: {
        coordinates: null,
        image: null
      },
      image: {
        src: null,
        type: 'image/jpg',
        lastModified: null,
        lastModifiedDate: null,
        size: null
      },
      modal_upload: false,
      resultBanner: {
        coordinates: null,
        image: null
      },
      imageBanner: {
        src: null,
        type: 'image/jpg',
        lastModified: null,
        lastModifiedDate: null,
        size: null
      },
      modal_upload_banner: false
    };
  },
  computed: {
    pmHeight() {
      const message_max = 5;
      const message_length = (this.message.member_list.length === 0) ? 1 : this.message.member_list.length;
      const sub = (message_length <= message_max) ? message_length * 36 : 180;
      const finalHeight = this.left_bar_size.height - 790 + sub;
      return (finalHeight > 300 || this.message.member_list.length >= 8) ? 300 : finalHeight;
    },
    memberOnline() {
      const member_online = this.$store.getters['privateMessage/memberOnlineList'].filter(x => x.id !== this.user.id);
      return member_online.length;
    },
    memberOnlineList() {
      const member_online = this.$store.getters['privateMessage/memberOnlineList'].filter(x => x.id !== this.user.id);
      return member_online;
    }
  },
  methods: {
    doOpenPM(data) {
      this.$q
        .dialog({
          title: 'Private Message',
          message: `Do you want to start conversation with ${data.name}?`,
          persistent: true,
          cancel: {
            label: 'Cancel',
            flat: true
          },
          ok: {
            label: 'Yes',
            flat: true
          }
        })
        .onOk(() => {
          this.online_users.list_dialog = false;
          setTimeout(() => {
            const member = this.message.member_list.find(x => x.id === data.id);
            if (member) {
              this.handleOpenMessage(member.message_id);
            } else {
              this.messageMenu('create', data);
            }
          }, 500);
        });
    },
    addPoint() {
      point('add', { tag: 'post_general', post_id: 1 });
    },
    rollbackPoint() {
      point('rollback', { tag: 'post_general', post_id: 1 });
    },
    messageMenu(type, data) {
      if (type === 'create') {
        const new_message = {
          enabled: true,
          message_participant: [
            {
              created_by: this.user.id,
              users_id: data.id
            },
            {
              created_by: data.id,
              users_id: this.user.id
            }
          ]
        };
        this.postCreateNewMessage(new_message)
          .then(res => {
            // const allMemberList = this.$store.getters['privateMessage/allMemberList'];
            // const member_online = allMemberList
            //   .map(x => {
            //     return { id: x };
            //   });
            // this.messageMemberFetch(member_online);
            setTimeout(() => {
              this.handleOpenMessage(res.message.id);
            }, 500);
          });
      } else if (type === 'clear') {
        this.$q.dialog({
          title: 'Confirmation',
          message: 'Are you sure to clear this conversation?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          postMessageConversationClear({ message_id: data.message_id });
          this.$store.dispatch('privateMessage/updateMessageListClear', { message_id: data.message_id });
        }).onCancel(() => {
        }).onDismiss(() => {
        });
      } else if (type === 'delete') {
        this.$q.dialog({
          title: 'Confirmation',
          message: 'Are you sure to delete this conversation?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          deleteMessageParticipant(data.message_id)
            .then(res => {
              const allMemberList = this.$store.getters['privateMessage/allMemberList'];
              this.all_member_list = allMemberList;
              const idMemberList = allMemberList.map(x => {
                return { id: x };
              });
              this.messageMemberFetch(idMemberList);

              if (this.message.member_list.filter(x => x.message_id !== data.message_id).length > 0) {
                this.$router.push({
                  name: 'message',
                  params: {
                    id: this.message.member_list.filter(x => x.message_id !== data.message_id)[0].message_id
                  }
                });
              } else {
                this.$router.push({
                  name: 'admin-home'
                });
              }
            });
        }).onCancel(() => {
        }).onDismiss(() => {
        });
      }
    },
    openSearchUser() {
      this.search_user_model = true;
      this.messageMemberSearchClear();
    },
    messageMemberSearchClear() {
      this.message.member_search_input = '';
      this.message.member_search_list = [];

      setTimeout(() => {
        this.$refs.search_input.focus();
      }, 100);
    },
    messageMemberSearch(value) {
      if (value.length >= 1) {
        this.message.is_loading = true;
        this.message.member_search_list = [];
        // get({
        //   path: `../v2/api/users-search?search=${value.toLowerCase()}`
        // }).then(res => {
        //   console.log(res.data);
        //   this.message.member_search_list = res.data
        //     .filter(x => !this.message.member_list_id.includes(x.id) && x.id !== this.user.id);
        //   // .map(x => {
        //   //   return {
        //   //     id: x.user.id,
        //   //     is_online: false,
        //   //     message_count: 0,
        //   //     message_id: 0,
        //   //     name: x.user.name,
        //   //     profile_picture: x.user.profile_picture
        //   //   };
        //   // });
        //   this.message.is_loading = false;
        // });
        get({
          path: `api/searchtopn?keyword=${value.toLowerCase()}&includes=user&paging=50`
        }).then(res => {
          console.log(res.data);
          this.message.member_search_list = res.data
            .filter(x => !this.message.member_list_id.includes(x.user.id) && x.user.id !== this.user.id)
            .map(x => {
              return {
                id: x.user.id,
                is_online: false,
                message_count: 0,
                message_id: 0,
                name: x.user.name,
                profile_picture: x.user.profile_picture
              };
            });
          this.message.is_loading = false;
        });
      }
    },
    messageMemberFetch(users) {
      this.message.memberFetch()
        .then(res => {
          const memberList = [];
          res.data.forEach((x, i) => {
            memberList.push({
              id: x.user.id,
              name: x.user.name,
              profile_picture: x.user.profile_picture,
              is_online: !(users.find(y => y.id === x.user.id) === undefined),
              message_id: x.message_id,
              message_count: x.messages_conversation_count
            });
          });
          this.$store.dispatch('privateMessage/updateMemberList', memberList);
        });
    },
    playSound(type) {
      if (type === 'online') {
        if (this.$refs.audioOnlineRef !== undefined) this.$refs.audioOnlineRef.$media.play();
      } else if (this.$refs.audioBeepRef !== undefined) this.$refs.audioBeepRef.$media.play();
    },
    updateMemberList(action, message_id) {
      const currentMemberList = this.$store.getters['privateMessage/memberList'];
      const allMemberList = this.$store.getters['privateMessage/allMemberList'];
      this.all_member_list = allMemberList;

      if (currentMemberList.find(x => x.message_id === message_id) === undefined) {
        this.messageMemberFetch(allMemberList.map(x => {
          return { id: x };
        }));
      } else {
        const memberList = currentMemberList.map(x => {
          if (action === 'clear' && x.message_id === parseInt(message_id, 10)) {
            return { ...x, message_count: 0 };
          }
          if (action === 'add' && x.message_id === parseInt(message_id, 10)) {
            return { ...x, message_count: x.message_count + 1 };
          }
          return { ...x };
        });
        let sortedMemberList = memberList;
        if (action === 'add') {
          sortedMemberList = memberList.filter(x => x.message_id !== message_id);
          sortedMemberList.unshift(memberList.find(x => x.message_id === message_id));
        }

        updateUpdatedDate(message_id);
        setTimeout(() => {
          this.$store.dispatch('privateMessage/updateMemberList', sortedMemberList);
        }, 2000);
      }

      if (action === 'clear') {
        messageConversationRead(message_id).then();
      }
    },
    handleOpenMessage(id) {
      if (this.$route.path !== `/message/${id}`) {
        this.$router.push({
          name: 'message',
          params: {
            id
          }
        });

        setTimeout(() => {
          this.updateMemberList('clear', id);
        }, 1000);
      }
    },
    goToProfile(id) {
      this.$router.push({
        name: 'profile-detail',
        params: {
          id
        }
      });
      this.online_users.list_dialog = false;
    },
    onResize(size) {
      this.$emit('onResize', size.height);
      this.left_bar_size = size;
      // this.heightObserver = size.height;
      // this.scroll_style = {
      //   ...this.scroll_style,
      //   height: `${size.height - 488}px`
      // };
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
    // getChannel() {
    //   SearchData({ includes: 'channel' }).then(response => {
    //     const hasil = response.data;
    //     this.data_channel = hasil
    //       .map(item => {
    //         return {
    //           label: item.search_title,
    //           value: item.channel_id,
    //           channel_type: item.channel[0].channel_type,
    //           description: '10 Members joined'
    //         };
    //       });
    //   });
    // },
    saveChannel() {
      // let en = true;
      // if (this.type !== 'COP') {
      //   en = this.enabled;
      // }
      let tipe = this.type;
      if (this.type === 'CoP') {
        tipe = 'COP';
      }
      const data = {
        enabled: true,
        created_by: getLoginId(),
        organization_id: null,
        channel_type: tipe,
        name: this.name,
        short_name: this.short_name,
        channel_locked: false,
        description: this.desc,
        is_private: this.private_channel,
        avatar: this.avatar,
        banner: this.banner,
        cop_organisasi: this.cop_organisasi,
        cop_komunitas: this.cop_komunitas,
        cop_minat: this.cop_minat,
        cop_fokus: this.cop_fokus,
        cop_aturan: this.cop_aturan
      };
      channelCreate(data).then(response => {
        const channel = response.data;
        point('add', { tag: 'channel_moderator', channel_id: channel.id });
        this.getListChannel();
        this.handleClick(response.data);
        this.$q.notify({
          message: 'Channel Added.',
          color: 'blue'
        });
        bus.$emit('update_point');
      });
    },
    handleCreate() {
      this.type = null;
      this.name = null;
      this.short_name = null;
      this.desc = null;
      this.private_channel = false;
      this.add_channel = true;
      this.avatar = null;
      this.banner = null;
      this.avatar_channel = null;
      this.banner_channel = null;
    },
    getListChannel() {
      this.listChannel = [];
      channelList().then(response => {
        if (response.data.length < 1) {
          this.newMember = true;
        }
        const hasil = response.data;
        // console.log(hasil);
        this.listChannel = hasil.map(item => {
          const sort_number = {
            General: 0,
            Direktorat: 1,
            COP: 2,
            Project: 3,
            Hobby: 4
          };
          return {
            avatar: item.avatar ? this.url + item.avatar : false,
            channel_type: item.channel_type,
            name: item.name,
            short_name: item.short_name,
            id: item.id,
            is_private: item.is_private,
            sort: sort_number[item.channel_type],
            channel_member: item.channel_member ? item.channel_member : 0
          };
        }).sort((a, b) => a.sort - b.sort);
      });
    },
    handleUploadAvatarChannel() {
      this.$refs.file.click();
    },
    handleDelImgChannel(type) {
      if (type === 'avatar') {
        this.avatar = null;
        this.avatar_channel = null;
      } else if (type === 'banner') {
        this.banner = null;
        this.banner_channel = null;
      }
    },
    filePickedChannel(file) {
      const formData = new FormData();
      formData.append('file[]', file);
      fileUpload(formData).then(res => {
        const response = res.data[0];
        if (res.message === 'OK') {
          this.avatar = response.path;
          this.avatar_channel = process.env.QUASAR_API_URL + response.path;
        }
      });
    },
    cropImage() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        const formData = new FormData();
        canvas.toBlob(blob => {
          blob.lastModified = this.image.lastModified;
          blob.lastModifiedDate = this.image.lastModifiedDate;
          blob.name = this.image.name;
          blob.filename = this.image.name;
          formData.append('file[]', blob, blob.filename);
          fileUpload(formData).then(res => {
            const response = res.data[0];
            if (res.message === 'OK') {
              this.avatar = response.path;
              this.avatar_channel = process.env.QUASAR_API_URL + response.path;
            }
          });
        }, 'image/png');
      }
      this.modal_upload = false;
    },
    uploadImage(event) {
      const { files } = event.target;
      if (files && files[0]) {
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        const blob = URL.createObjectURL(files[0]);
        this.image = {
          lastModified: files[0].lastModified,
          lastModifiedDate: files[0].lastModifiedDate,
          size: files[0].size,
          name: files[0].name,
          src: blob,
          type: files[0].type
        };
      }
      this.modal_upload = true;
    },
    handleUploadBannerChannel() {
      this.$refs.fileBanner.click();
    },
    uploadImageBanner(event) {
      const { files } = event.target;
      if (files && files[0]) {
        if (this.imageBanner.src) {
          URL.revokeObjectURL(this.imageBanner.src);
        }
        if (files[0].size >= 1 * 1024 * 1024) {
          Notify.create({
            message: `[ ${files[0].name} ] melebihi batas 1MB`,
            color: 'negative',
            icon: 'error'
          });
        } else {
          const blob = URL.createObjectURL(files[0]);
          this.imageBanner = {
            lastModified: files[0].lastModified,
            lastModifiedDate: files[0].lastModifiedDate,
            size: files[0].size,
            name: files[0].name,
            src: blob,
            type: files[0].type
          };
          this.modal_upload_banner = true;
        }
      }
    },
    cropImageBanner() {
      const { canvas } = this.$refs.cropperBanner.getResult();
      if (canvas) {
        const formData = new FormData();
        canvas.toBlob(blob => {
          blob.lastModified = this.imageBanner.lastModified;
          blob.lastModifiedDate = this.imageBanner.lastModifiedDate;
          blob.name = this.imageBanner.name;
          blob.filename = this.imageBanner.name;
          formData.append('file[]', blob, blob.filename);
          fileUpload(formData).then(res => {
            const response = res.data[0];
            if (res.message === 'OK') {
              this.banner = response.path;
              this.banner_channel = process.env.QUASAR_API_URL + response.path;
            }
          });
        }, 'image/png');
      }
      this.modal_upload_banner = false;
    },
    // handleUploadBannerChannel(files, content_type) {
    //   files.forEach((v, i, a) => {
    //     if (files[i].size >= 1 * 1024 * 1024) {
    //       Notify.create({
    //         message: `[ ${files[i].name} ] melebihi batas 1MB`,
    //         color: 'negative',
    //         icon: 'error'
    //       });
    //     } else {
    //       const formData = new FormData();
    //       formData.append('file[]', files[i]);
    //       fileUpload(formData).then(res => {
    //         const response = res.data[0];
    //         this.banner = response.path;
    //         // this.banner_channel = process.env.QUASAR_API_URL + response.path;
    //       }).catch(error => {
    //         // console.log(error.response);
    //       });
    //     }
    //   });
    // },
    handleBrowse() {
      this.search_channel_model = '';
      this.browse_channel = true;
    },
    handleClick(item, index = null) {
      // console.log(index);
      if (item.channel_type !== 'General' && index !== null) {
        this.listChannel[index].channel_member[0].latest.post_count = 0;
        // console.log(item.channel_member[0].id);
        // channelMemberLatest({ id: item.id, type: 'Channel' });
      }
      if (item.channel_type === 'General' && index !== null) {
        // this.listChannel[0].channel_member.post_count = 0;
        // channelMemberLatest({ id: this.user.id, type: 'General' });
      }
      this.browse_channel = false;
      // this.$router.push({ name: 'channel-detail', params: { id } });
      this.$router.push({
        name: 'channel-detail',
        params: {
          id: item.id
          // title: item.name
          //   .toLowerCase()
          //   .replace(/ /g, '-')
          //   .replace(/\//g, '-')
        }
      }).catch(() => {
      });
      // this.getListChannel();
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      // profile.roles.forEach((v, i) => {
      //   if (v.name === 'channel_manager') {
      //     this.is_channel_manager = true;
      //   } else if (v.name === 'km_manager') {
      //     this.is_km_manager = true;
      //   } else if (v.name === 'admin') {
      //     this.is_admin = true;
      //   }
      // });
      const role_name = (checkRole() !== null) ? checkRole().name : '';
      if (role_name === 'km_manager') {
        this.is_km_manager = true;
      } else if (role_name === 'channel_manager') {
        this.is_channel_manager = true;
      } else if (role_name === 'admin' || profile.user_name === 'admin') {
        this.is_admin = true;
      } else if (role_name === 'training_manager') {
        this.is_training_manager = true;
      }
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
    },
    openOnlineUser(data) {
      const current_user = this.message.member_list.find(x => x.id === this.online_users.user.id);
      if (current_user) {
        this.handleOpenMessage(current_user.message_id);
      } else {
        this.messageMenu('create', this.online_users.user);
      }
    },
    openOnlineUserInfo(data) {
      if (data.id === 1) return;
      this.online_users.dialog = false;
      this.online_users.user = data;
      setTimeout(() => {
        this.online_users.dialog = true;
        setTimeout(() => {
          this.online_users.dialog = false;
        }, 3000);
      }, 500);
    },
    echo_here(data) {
      this.$store.dispatch('privateMessage/resetMemberOnlineList');
      this.$store.dispatch('privateMessage/updateMemberOnlineList', data);
      this.$store.dispatch('privateMessage/updateAllMemberList', data.map(x => {
        return x.id;
      }));
      this.$store.dispatch('privateMessage/updateListenStatus', true);
      const currentMemberList = this.$store.getters['privateMessage/memberList'];
      if (currentMemberList.length === 0) {
        this.messageMemberFetch(data);
      }
    },
    echo_joining(data) {
      this.openOnlineUserInfo(data);
      this.$store.dispatch('privateMessage/updateMemberOnlineList', [data]);
      this.$store.dispatch('privateMessage/updateAllMemberList', [data.id]);
      this.$store.dispatch('privateMessage/updateOnlineStatusMemberList', {
        id: data.id,
        is_online: true
      });
      this.playSound('online');
    },
    echo_leaving(data) {
      this.$store.dispatch('privateMessage/updateMemberOfflineList', data);
      this.$store.dispatch('privateMessage/updateOfflineAllMemberList', data.id);
      this.$store.dispatch('privateMessage/updateOnlineStatusMemberList', {
        id: data.id,
        is_online: false
      });
    },
    echo_listen(data) {
      if (data.message) {
        if (data.message.chat.created_by.id !== getLoginId()) {
          this.$store.dispatch('privateMessage/updateAllMemberList', [data.message.chat.created_by.id]);

          this.$store.dispatch('privateMessage/updateMessageListByMessageId', {
            ...data.message,
            chat: [{ ...data.message.chat }]
          });

          this.updateMemberList('add', data.message.message_id);
          this.playSound();
        }
      }
    },
    echo_listen_event(data) {
      if (data.event) {
        if (data.event.type === 'message_read' && data.event.created_by !== getLoginId()) {
          this.$store.dispatch('privateMessage/updateMessageListRead', { ...data.event, user_id: getLoginId() });
        }
        if (data.event.type === 'message_delete' && data.event.created_by !== getLoginId()) {
          this.$store.dispatch('privateMessage/deleteMessageById', {
            id: parseInt(data.event.id, 10),
            message_id: parseInt(data.event.message_id, 10)
          });
        }
      }
    },
    onlineStatus() {
      let temp_id = '';
      const listenStatus = this.$store.getters['privateMessage/listenStatus'];
      if (!listenStatus) {
        window.Echo.connector.options.auth.headers.Authorization = `Bearer ${getCredential().accessToken}`;
        window.Echo.join('chat-room')
          .here(users => {
            this.echo_here(users);
          })
          .joining(user => {
            this.echo_joining(user);
          })
          .leaving(user => {
            this.echo_leaving(user);
          })
          .listen('NewMessage', data => {
            if (data.id !== temp_id) {
              this.echo_listen(data);
            }
            temp_id = data.id;
          })
          .listen('NewEvent', data => {
            if (data.id !== temp_id) {
              this.echo_listen_event(data);
            }
            temp_id = data.id;
          })
          .error(error => {
            // console.error(error);
          });
      }
    },
    changeLeftBarDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }

  },
  watch: {
    // '$q.appVisible': {
    //   immediate: true,
    //   deep: true,
    //   handler(value) {
    //     if (value !== undefined) {
    //       if (value) {
    //         // on screen view
    //         this.$store.dispatch('user/resetDuration');
    //       } else {
    //         // on screen leave
    //         this.$store.dispatch('user/submitDuration');
    //       }
    //     }
    //   }
    // },
    '$route.name': {
      immediate: true,
      deep: true,
      handler(value) {
        this.menuOpenChannel = value.indexOf('channel') > -1;
        this.menuOpenTraining = value.indexOf('training') > -1 || value.indexOf('narasumber') > -1;
        this.menuOpenMessage = value.indexOf('message') > -1;
        this.menuOpenAnalytics = value.indexOf('analytics') > -1;
        this.menuOpenLeaderboard = value.indexOf('leaderboard') > -1;

        if (!this.menuOpenChannel &&
          !this.menuOpenTraining &&
          !this.menuOpenMessage &&
          !this.menuOpenAnalytics &&
          !this.menuOpenLeaderboard
        ) {
          this.menuOpenChannel = true;
        }
      }
    },
    is_loading: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value === false) {
          this.getListChannel();
        }
      }
    },
    '$store.state.privateMessage.member_list': {
      immediate: true,
      deep: true,
      handler(value) {
        setTimeout(() => {
          this.message.member_list = this.$store.getters['privateMessage/memberList'];
          this.message.member_list_id = this.message.member_list.map(x => {
            return x.id;
          });
        }, 500);
        // this.playSound('online');
      }
    }
  },
  mounted() {
    this.onlineStatus();
    this.getListChannel();
    this.getUser();
    this.$root.$on('changeLeftBar', () => {
      this.changeLeftBarDrawer();
    });
    this.$root.$on('updateMessage', (action, message_id) => {
      this.updateMemberList(action, message_id);
    });
  }
};
</script>

<style>
.ava-img {
  margin-right: 10px;
}

.list {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}

.list-menu {
  color: #65738F;
  margin-left: -20px;
}

.list-channel {
  color: #65738F;
  margin-left: -20px;
}

.head-menu {
  padding-right: 50px;
}

.icon-menu {
  color: #586883;
}
</style>
