<template>
  <span>
    <div v-if="data !== undefined" class="q-pt-md q-pa-none items-start">
      <div class="row q-pb-md">
        <div class="col kmp-font-lg kmp-font-bold">{{ leaderboard_overall.title }}</div>
        <div class="col text-right kmp-text-blue-2 kmp-font-md q-pt-xs kmp-font-bold cursor-pointer"
             style="max-width: 50px"
             @click="leaderboardDetail">See All
        </div>
      </div>
      <q-card>
        <q-card-section class="q-pa-md">
          <LeaderboardList :data="leaderboard_header" :separator="true" :show_rating="true" :history_link="true"/>
        </q-card-section>
      </q-card>
      <q-dialog persistent v-model="leaderboard_dialog">
        <q-card :class="$q.platform.is.mobile ? 'kmp-modal-leaderboard-mobile' : 'kmp-modal-leaderboard'">
          <q-card-section class="row items-center q-pb-none">
            <div :class="$q.platform.is.mobile ? 'kmp-title-leaderboard-mobile' : 'kmp-title-leaderboard'">{{leaderboard_overall.title}}</div>
            <q-space/>
            <q-btn icon="close" class="q-mb-md" flat round dense @click="closeDialog" />
          </q-card-section>

          <q-tabs v-model="tab.selected" class="bg-grey-2" indicator-color="primary" active-bg-color="blue-1">
            <q-tab name="top_month" :label="`This Month`" no-caps/>
            <q-tab name="top_overall" :label="`Overall`" no-caps/>
<!--            <q-btn unelevated dense size="md" icon="close" class="q-ma-sm" @click="closeDialog"/>-->
          </q-tabs>

          <q-tab-panels v-model="tab.selected" animated>
            <q-tab-panel name="top_month" class="q-pa-none">
              <q-card-section style="max-height: 600px">
                <q-scroll-area style="height: 500px" class="q-pr-md q-pl-sm">
                  <LeaderboardList :data="leaderboard_month" :separator="false" :show_rating="true" :history_link="true"/>
                </q-scroll-area>
              </q-card-section>
            </q-tab-panel>

            <q-tab-panel name="top_overall" class="q-pa-none">
              <q-card-section style="max-height: 600px">
                <q-scroll-area style="height: 500px" class="q-pr-md q-pl-sm">
                  <LeaderboardList :data="leaderboard_overall" :separator="false" :show_rating="true" :history_link="true"/>
                </q-scroll-area>
              </q-card-section>
            </q-tab-panel>
          </q-tab-panels>

        </q-card>
      </q-dialog>
    </div>
  </span>
</template>

<script>
import LeaderboardList from 'components/leaderboard/LeaderboardList';

export default {
  props: ['data'],
  components: { LeaderboardList },
  data() {
    return {
      leaderboard_header: {
        title: '',
        data: [
          {
            title: '',
            subtitle: '',
            icon: '',
            avatar: '',
            level_icon: 'star',
            level_title: '',
            level_point: ''
          }
        ]
      },
      leaderboard_month: {
        title: '',
        data: [
          {
            title: '',
            subtitle: '',
            icon: '',
            avatar: '',
            level_icon: 'star',
            level_title: '',
            level_point: ''
          }
        ]
      },
      leaderboard_overall: {
        title: '',
        data: [
          {
            title: '',
            subtitle: '',
            icon: '',
            avatar: '',
            level_icon: 'star',
            level_title: '',
            level_point: ''
          }
        ]
      },
      tab: {
        selected: 'top_month'
      },
      leaderboard_dialog: false
    };
  },
  mounted() {
    if (this.data !== undefined) {
      this.leaderboard_month = {
        title: this.data.title,
        data: this.data.data
      };
      this.leaderboard_overall = {
        title: this.data.title,
        data: this.data.data_overall
      };

      const leaderboard_data = JSON.parse(JSON.stringify(this.data));
      this.leaderboard_header = { ...leaderboard_data, data: leaderboard_data.data.slice(0, 3) };
    }
  },
  methods: {
    closeDialog() {
      this.tab.selected = 'top_month';
      this.leaderboard_dialog = false;
    },
    leaderboardDetail() {
      this.leaderboard_dialog = true;
    }
  }
};
</script>

