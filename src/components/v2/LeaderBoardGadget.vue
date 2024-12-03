<template>
  <div>
    <q-card class="q-mb-md kmp-new-font"
    >
    <q-card-section>
      <div class="row justify-between q-mb-md">
      <q-item-label class="kmp-line-125 text-left kmp-lg-text kmp-bold-text kmp-black-text">Leaderboard</q-item-label>
      <q-item-label class="kmp-line-125 text-right kmp-sm-text kmp-bold-text kmp-blue-text cursor-pointer link-underscore">See all</q-item-label>
    </div>
    <q-tab-panels v-model="tab" animated>
    <q-tab-panel class="q-pa-none box-green-gadget" style="border-radius: 8px;" name="member">
      <q-item class="q-px-md q-pt-sm q-pb-none" >
        <!-- <q-item-section class="items-start q-pa-none">
          <q-badge size="30px" class="kmp-xs-text kmp-bold-text kmp-line-125 badge-dark-green">
            105th
          </q-badge>
        </q-item-section> -->
        <q-item-section class="items-end q-pa-none">
          <q-item-label>
            <q-img src="../../assets/images/v2/stars-sm.png" class="q-mr-xs" style="width: 16px;height: 16px;"/><span class=" kmp-black-text kmp-sm-text kmp-bold-text kmp-line-130">{{ point_user.remark }}</span>
              <!-- <q-icon style="color: #F19B1A" name="o_stars" size="16px" class="q-mr-xs"/><span class=" kmp-black-text kmp-sm-text kmp-bold-text kmp-line-130">Start IV</span> -->
          </q-item-label>
          <q-item-label class="kmp-black-text kmp-sm-text kmp-normal-text kmp-line-130" style="margin-top: 0px !important;">
            {{point_user.point ? point_user.point.toLocaleString() : '0'}} pts
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="q-pb-sm" style="padding-top: 0px !important">
        <q-item-section class="items-center kmp-black-text">
          <q-item-label>
            <!-- <q-avatar size="40px">
              <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'">
            </q-avatar> -->
            <Avatar size="xl" :picture="point_user_profile.profile_picture ? `./api${point_user_profile.profile_picture}` : ''" :name="point_user_profile.name"
                  @click="$router.push({ name: 'profile' })"/>
          </q-item-label>
          <q-item-label class="kmp-md-text kmp-bold-text kmp-line-125">
            {{ user_new.name }} (You)
          </q-item-label>
          <q-item-label class="kmp-xs-text kmp-normal-text kmp-line-125">
            {{ point_user_profile.unit_kerja.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-tab-panel>
    <q-tab-panel class="q-pa-none box-green-gadget" style="border-radius: 8px;" name="direktorat">
      <q-item class="q-px-md q-pt-sm q-pb-none" >
        <!-- <q-item-section class="items-start q-pa-none">
          <q-badge size="30px" class="kmp-xs-text kmp-bold-text kmp-line-125 badge-dark-green">
            105th
          </q-badge>
        </q-item-section> -->
        <q-item-section class="items-end q-pa-none">
          <q-item-label>
              <q-img :src="require(`../../assets/images/${direktorat_user.level_icon}.png`)" class="q-mr-xs" style="width: 16px;height: 16px;"/>
                    <span class=" kmp-black-text kmp-sm-text kmp-bold-text kmp-line-130">{{direktorat_user.level_title}}</span>
          </q-item-label>
          <q-item-label class="kmp-black-text kmp-sm-text kmp-normal-text kmp-line-130" style="margin-top: 0px !important;">
            Avg. Pts
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="q-py-sm">
          <q-item-section class="kmp-black-text">
            <q-item-label class="kmp-line-130 kmp-bold-text kmp-sm-text">
              {{ direktorat_user.title.toUpperCase() }}
            </q-item-label>
            <q-item-label class="kmp-line-125 kmp-xs-text kmp-normal-text">
              {{ direktorat_user.subtitle }} • {{ direktorat_user.level_point }}
            </q-item-label>
          </q-item-section>
        </q-item>
    </q-tab-panel>
    </q-tab-panels>
    <div class="row justify-center q-my-md">
      <q-tabs
      v-model="tab"
      no-caps
      class="tab-leaderboard-gadget"
      dense
      indicator-color="transparent"
    >
      <q-tab name="member" label="Member" />
      <q-tab name="direktorat" label="Direktorat" />
    </q-tabs>
    </div>
    <q-tab-panels v-model="tab" animated>
    <q-tab-panel class="q-pa-none" name="member">
      <q-carousel
        v-model="slide_member"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        navigation
        ref="carousel"
        class="no-shadow q-pa-none carousel-leaderboard-gadget"
      >
        <q-carousel-slide class="q-pa-none no-wrap"  :name="'c'+index" v-for="(value, index) in this.member_list" :key="index">
          <div class="box-yellow-gadget" style="border-radius: 8px;">
            <q-item class="q-px-md q-pt-sm q-pb-none q-mb-xs" >
              <q-item-section class="items-start q-pa-none">
                <div class="row">
                  <div class="col">
                    <Avatar size="xl" :picture="value.avatar ? `./api${value.avatar}` : ''" :name="value.avatar"
                            @click="$router.push({ name: 'profile-detail', params: { id: value.id } })"/>
                  </div>
                  <div class="col">
                    <q-badge size="30px" class="kmp-sm-text kmp-bold-text kmp-line-130 q-ml-sm q-mt-sm badge-dark-green">
                      {{value.sort}}{{value.sort==1?'st':value.sort==2?'nd':value.sort==3?'rd':'th'}}
                    </q-badge>
                  </div>
                </div>
              </q-item-section>
              <q-item-section class="items-end q-pa-none">
                <q-item-label>
                    <!-- <q-icon style="color: #F19B1A" name="o_stars" size="16px" class="q-mr-xs"/> -->
                    <q-img :src="require(`../../assets/images/${value.level_icon}.png`)" class="q-mr-xs" style="width: 16px;height: 16px;"/>
                    <span class=" kmp-black-text kmp-sm-text kmp-bold-text kmp-line-130">{{value.level_title}}</span>
                </q-item-label>
                <q-item-label class="kmp-black-text kmp-sm-text kmp-normal-text kmp-line-130" style="margin-top: 0px !important;">
                  {{value.level_point}}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-pb-sm" style="padding-top: 0px !important">
                <q-item-section class="kmp-black-text">
                  <q-item-label class="kmp-md-text kmp-bold-text kmp-line-125">
                    {{value.title.toUpperCase()}}
                  </q-item-label>
                  <q-item-label class="kmp-xs-text kmp-normal-text kmp-line-125">
                    {{value.subtitle.toUpperCase()}}
                  </q-item-label>
                </q-item-section>
          </q-item>
          </div>
        </q-carousel-slide>
        <!-- <template v-slot:control>
        <q-carousel-control
        position="bottom-left"
        :offset="[50, 0]"
        >
          <q-btn
            flat dense class="btn-carousel-control-gadget"
            @click="$refs.carousel.previous()"
          >
            <Icon icon="ep:arrow-left" :rotate="4" color="#2c8ed3" width="20" height="30" />
          </q-btn>
        </q-carousel-control>

        <q-carousel-control
        position="bottom-right"
        :offset="[50, 0]"
        >
          <q-btn
            flat dense class="btn-carousel-control-gadget"
            @click="$refs.carousel.next()"
          >
            <Icon icon="ep:arrow-left" :rotate="2" color="#2c8ed3" width="20" height="30" />
          </q-btn>
        </q-carousel-control>
        </template> -->
        <template v-slot:navigation-icon="{  active, onClick }">
          <q-btn class="btn-carousel-gadget" v-if="active" flat dense @click="onClick"><Icon icon="pepicons-pop:line-x" color="#2c8ed3" width="30" height="30" :horizontalFlip="true" /></q-btn>
          <q-btn class="btn-carousel-gadget" v-else style="opacity: 0.2" flat dense @click="onClick"><Icon icon="pepicons-pop:line-x" color="#2c8ed3" width="30" height="30" :horizontalFlip="true" /></q-btn>
        </template>
      </q-carousel>
    </q-tab-panel>
    <q-tab-panel class="q-pa-none" name="direktorat">
      <q-carousel
        v-model="slide_direktorat"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        navigation
        ref="carousel"
        class="no-shadow q-pa-none carousel-leaderboard-gadget"
      >
        <q-carousel-slide class="q-pa-none no-wrap" :name="'c'+index" v-for="(value, index) in this.direktorat_list" :key="index" >
          <div class="box-yellow-gadget" style="border-radius: 8px;">
            <q-item class="q-pt-sm q-px-md q-pb-xs" >
              <q-item-section class="items-start q-pa-none">
                <q-badge size="30px" class="kmp-xs-text kmp-bold-text kmp-line-125 badge-dark-green">
                  {{value.sort}}{{value.sort==1?'st':value.sort==2?'nd':value.sort==3?'rd':'th'}}
                </q-badge>
              </q-item-section>
              <q-item-section class="items-end q-pa-none">
                <q-item-label>
                    <!-- <q-icon style="color: #F19B1A" name="o_stars" size="16px" class="q-mr-xs"/> -->
                    <!-- <q-img src="../../assets/images/v2/stars-sm.png" class="q-mr-xs" style="width: 16px;height: 16px;"/> -->
                    <q-img :src="require(`../../assets/images/${value.level_icon}.png`)" class="q-mr-xs" style="width: 16px;height: 16px;"/>
                    <span class=" kmp-black-text kmp-sm-text kmp-bold-text kmp-line-130">{{value.level_title}}</span>
                </q-item-label>
                <!-- <q-item-label class="kmp-black-text kmp-sm-text kmp-normal-text kmp-line-130" style="margin-top: 0px !important;">
                  {{value.level_point}}
                </q-item-label> -->
              </q-item-section>
            </q-item>
            <q-item class="q-pb-sm q-px-md" style="padding-top: 0px !important">
              <q-item-section class="kmp-black-text">
                <q-item-label class="kmp-line-130 kmp-bold-text kmp-sm-text">
                  {{value.title}}
                </q-item-label>
                <q-item-label class="kmp-line-125 kmp-xs-text kmp-normal-text">
                  {{value.subtitle}} • {{value.level_point}}
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-carousel-slide>
        <!-- <template v-slot:control>
        <q-carousel-control
        position="bottom-left"
        :offset="[50, 0]"
        >
          <q-btn
            flat dense class="btn-carousel-control-gadget"
            @click="$refs.carousel.previous()"
          >
            <Icon icon="ep:arrow-left" :rotate="4" color="#2c8ed3" width="20" height="30" />
          </q-btn>
        </q-carousel-control>

        <q-carousel-control
        position="bottom-right"
        :offset="[50, 0]"
        >
          <q-btn
            flat dense class="btn-carousel-control-gadget"
            @click="$refs.carousel.next()"
          >
            <Icon icon="ep:arrow-left" :rotate="2" color="#2c8ed3" width="20" height="30" />
          </q-btn>
        </q-carousel-control>
        </template> -->
        <template v-slot:navigation-icon="{  active, onClick }">
          <q-btn class="btn-carousel-gadget" v-if="active" flat dense @click="onClick"><Icon icon="pepicons-pop:line-x" color="#2c8ed3" width="30" height="30" :horizontalFlip="true" /></q-btn>
          <q-btn class="btn-carousel-gadget" v-else style="opacity: 0.2" flat dense @click="onClick"><Icon icon="pepicons-pop:line-x" color="#2c8ed3" width="30" height="30" :horizontalFlip="true" /></q-btn>
        </template>
      </q-carousel>
    </q-tab-panel>
    </q-tab-panels>
    </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

import { getUserLogin } from 'src/lib/helper';
import { getCredential } from 'src/lib/storage';
import { leaderboardMemberByMemberIdPointHistory, leaderboardDirektoratPointHistoryById } from 'src/lib/api';
import {
  leaderboardMemberPointHistory,
  leaderboardDirektoratPointHistory
} from '../../lib/api';
import Avatar from '../../components/common/Avatar';

export default {
  components: { Icon, Avatar },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      user_new: {
        id: '',
        name: '',
        initial: ''
      },
      direktorat_user: {},
      profile_picture: getUserLogin().profile_picture
        ? process.env.QUASAR_API_URL + getUserLogin().profile_picture
        : null,
      profile_name: getUserLogin().name,
      point_user: {},
      point_user_profile: {},
      member_list: [],
      direktorat_list: [],
      tab: 'member',
      slide_member: 'c1',
      slide_direktorat: 'c1',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  },
  methods: {
    getListLeaderboardMemberPointHistory() {
      leaderboardMemberPointHistory(1, { limit: 5 }).then(response => {
        const hasil = response.data;
        this.member_list = hasil;
      });
    },
    getListLeaderboardDirektoratPointHistory() {
      leaderboardDirektoratPointHistory(1, { limit: 5 }).then(response => {
        const hasil = response.data;
        this.direktorat_list = hasil;
      });
    },
    getUser() {
      const user = getCredential();
      const profile_user = JSON.parse(user.rawProfile);
      this.profileRole = profile_user;
      this.user_new = {
        id: profile_user.id,
        name: profile_user.name,
        picture: user.userPic === null ? profile_user.profile_picture : user.userPic,
        initial: profile_user.name
          .match(/\b(\w)/g)
          .join('')
          .toUpperCase()
      };
      this.getPoint();
    },
    async getPoint() {
      const res = await leaderboardMemberByMemberIdPointHistory(this.user_new.id);
      this.point_user = (res.data.length === 0) ? {
        point: 0,
        level_name: 'Star 1',
        remark: 'Newbie',
        icon_name: 'stars',
        icon_color: '#FEB82D',
        final_point: 200,
        percent_point: 0
      } : res.data[0];
      this.point_user_profile = res.data.user;
    },
    getListLeaderboardDirektoratPointHistoryById() {
      leaderboardDirektoratPointHistoryById(54, 1, { limit: 5 }).then(response => {
        const hasil = response.data[0];
        this.direktorat_user = hasil;
      });
    }
  },
  mounted() {
    this.getListLeaderboardMemberPointHistory();
    this.getListLeaderboardDirektoratPointHistory();
    this.getListLeaderboardDirektoratPointHistoryById();
    this.getUser();
  }
};
</script>
