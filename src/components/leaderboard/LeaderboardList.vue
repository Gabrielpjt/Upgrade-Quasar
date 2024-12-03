<template>
<span>
  <q-list>
    <span v-for="(item, index) in data.data" :key="index">

      <q-separator spaced v-if="index>0 & separator"/>
      <q-item class="q-px-none"
              :clickable="show_detail"
              @click="detailToggle(item)"
      >
        <q-item-section v-if="show_rating" top class="kmp-leaderboard-avatar-1" style="max-width: 24px">
          <q-img v-if="item.sort <=3" class="" :src="require(`../../assets/images/champion-${item.sort}.png`)"
                 style="max-width: 24px"/>
          <q-avatar v-if="item.sort >3" rounded size="24px"
                    class="kmp-bg-color-9 text-white kmp-font-bold">{{ item.sort }}</q-avatar>
        </q-item-section>

        <q-item-section v-if="item.level_icon !== 'trophy'" @click="goToProfile(item)" top avatar
                        class="kmp-leaderboard-avatar-2">
          <Avatar size="md" :picture="item.avatar ? `./api${item.avatar}` : ''" :name="item.title"/>
        </q-item-section>

        <q-item-section>
          <q-item-label v-if="item.level_icon !== 'trophy'" @click="goToProfile(item)"
                        class="kmp-font-sm-2 kmp-font-bold cursor-pointer text-capitalize">{{ item.title }}</q-item-label>
          <q-item-label v-else class="kmp-font-sm-2 kmp-font-bold text-capitalize">{{ item.title }}</q-item-label>
          <q-item-label class="kmp-font-xs text-capitalize" caption lines="2">{{ item.subtitle }}</q-item-label>
        </q-item-section>

        <q-item-section side top @click="popupDetail(item)" v-bind:class="(history_link)?'cursor-pointer':''">
          <q-tooltip v-if="history_link">Show Point History</q-tooltip>
          <q-item-label>
            <div class="row">
              <div class="col-2">
                <q-img class="" :src="require(`../../assets/images/${item.level_icon}.png`)"
                       style="min-width: 16px; max-width: 16px"/>
              </div>
              <div class="col text-right" style="margin-top: 2px"><div
                class="q-ml-xs kmp-font-sm kmp-font-bold">{{ item.level_title }}</div></div>
            </div>
          </q-item-label>
          <q-item-label class="kmp-font-xs" caption>{{ item.level_point }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-slide-transition>
        <q-item v-if="detail.visible && detail.id === item.id && item.level_icon === 'trophy'" class="q-ml-md">
          <div class="q-px-md bg-grey-2" style="max-width: 70%; width: 70%">
            <q-scroll-area style="height: 300px" class="q-pr-md">
              <LeaderboardList v-if="detail.data.length >0" :data="detail" :show_rating="false" :history_link="true"/>
            </q-scroll-area>
          </div>
        </q-item>
        <q-item v-if="detail.visible && detail.id === item.id && item.level_icon !== 'trophy'" class="q-ml-md">
          <div class=" bg-grey-2" style="max-width: 70%; width: 70%">
            <q-scroll-area style="height: 300px" class="q-pr-md">
              <LeaderboardHistories v-if="detail.data.length >0" :data="detail"/>
            </q-scroll-area>
          </div>
        </q-item>
      </q-slide-transition>
   </span>
  </q-list>
  <q-dialog persistent v-model="point_history.dialog">
        <q-card :class="$q.platform.is.mobile ? 'kmp-modal-leaderboard-mobile' : 'kmp-modal-point-history'">
          <q-card-section class="row items-center q-pb-none">
            <div :class="$q.platform.is.mobile ? 'kmp-title-leaderboard-mobile' : 'kmp-title-leaderboard'">Point History</div>
            <q-space/>
            <q-btn icon="close" class="q-mb-md" flat round dense @click="popupDetailClose" />
          </q-card-section>
          <q-card-section class="row items-center q-py-none">
            <div class="full-width">
            <LeaderboardList
              :data="this.point_history_selected"
              :show_rating="false"
              :history_link="false"/>
              </div>
          </q-card-section>
          <q-card-section class="row items-center q-pb-none">
            <div class="bg-grey-2" style="max-width: 100%; width: 100%"
                 v-if="point_history.visible && point_history.icon === 'trophy' && point_history.data.length >0">
              <q-scroll-area :class="$q.platform.is.mobile ? 'kmp-list-leaderboard-mobile' : 'kmp-list-leaderboard'">
              <LeaderboardList
                :data="point_history"
                :show_rating="false" :history_link="false"/>
              </q-scroll-area>
            </div>
            <div class="bg-grey-2" style="max-width: 100%; width: 100%"
                 v-if="point_history.visible && point_history.icon !== 'trophy' && point_history.data.length >0">
              <q-scroll-area :class="$q.platform.is.mobile ? 'kmp-list-leaderboard-mobile' : 'kmp-list-leaderboard'">
                <LeaderboardHistories
                  :data="point_history"/>
              </q-scroll-area>
            </div>
          </q-card-section>

        </q-card>
      </q-dialog>
  </span>
</template>

<script>
import Avatar from 'components/common/Avatar';
import LeaderboardList from 'components/leaderboard/LeaderboardList';
import { leaderboardHistoriesByMemberIdPointHistory, leaderboardMemberByOrgIdPointHistory } from 'src/lib/api';
import LeaderboardHistories from 'components/leaderboard/LeaderboardHistories';

export default {
  name: 'LeaderboardList',
  props: ['data', 'separator', 'show_detail', 'show_rating', 'history_link'],
  components: { Avatar, LeaderboardList, LeaderboardHistories },
  data() {
    return {
      visible: false,
      detail: {
        visible: false,
        id: 0,
        title: '',
        data: []
      },
      point_history: {
        dialog: false,
        visible: false,
        id: 0,
        title: '',
        data: []
      },
      point_history_selected: null
    };
  },
  methods: {
    goToProfile(data) {
      this.$router
        .push({
          name: 'profile-detail',
          params: {
            id: data.id
          }
        })
        .catch(err => {
        });
    },
    getSingleData(data) {
      const raw = (this.data.data_overall) ? this.data.data_overall : this.data.data;
      const filtered = raw.filter(x => x.id === data.id);

      this.point_history_selected = {
        ...this.data,
        data: filtered,
        data_overall: filtered
      };
    },
    popupDetailClose() {
      this.point_history.dialog = false;
    },
    popupDetail(data) {
      if (!this.history_link) return;
      this.getSingleData(data);
      this.point_history.id = data.id;
      this.point_history.title = data.title;
      this.point_history.icon = data.level_icon;
      this.point_history.visible = true;
      this.point_history.dialog = true;
      if (data.level_icon !== 'trophy') {
        leaderboardHistoriesByMemberIdPointHistory(data.id)
          .then(res => {
            this.point_history.data = res.data;
          });
      } else {
        leaderboardMemberByOrgIdPointHistory(data.id)
          .then(res => {
            this.point_history.data = res.data;
          });
      }
    },
    detailToggle(data) {
      if (this.show_detail && this.detail.id !== data.id) {
        this.detail.visible = false;
        this.detail.id = data.id;
        if (!this.detail.visible) {
          if (data.level_icon !== 'trophy') {
            this.getLeaderboardHistoriesByMemberId(data.id, !this.detail.visible);
          } else {
            this.getLeaderboardByOrgId(data.id, !this.detail.visible);
          }
        } else {
          this.detail.visible = !this.detail.visible;
        }
      } else {
        this.detail.visible = false;
        this.detail.id = 0;
      }
    },
    getLeaderboardByOrgId($id, visible) {
      leaderboardMemberByOrgIdPointHistory($id)
        .then(res => {
          this.detail.data = res.data;
          setTimeout(() => {
            this.detail.visible = visible;
          }, 100);
        });
    },
    getLeaderboardHistoriesByMemberId($id, visible) {
      leaderboardHistoriesByMemberIdPointHistory($id)
        .then(res => {
          this.detail.data = res.data;
          setTimeout(() => {
            this.detail.visible = visible;
          }, 100);
        });
    }
  }
};
</script>

