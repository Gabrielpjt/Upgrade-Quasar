<template>
  <q-page>
    <LeftBar :is_loading="refresh" @onResize="onResize"/>
    <LeaderboardBar :data="{title: 'Leaderboard by Member', icon: 'groups'}"/>

    <div class="q-pa-md items-start">
      <q-card>
        <q-card-section class="q-pa-md">
          <div class="q-pa-none items-start">
            <div class="fit row justify-between">
              <div class="col-4">
                <q-input
                  ref="filter"
                  outlined dense clearable
                  class="q-pa-none"
                  v-model="filter.value"
                  label="Search Member"
                  @clear="resetData"
                  @input="filterData"
                  :hint="filter.result_info"
                >
                  <template v-slot:append>
                    <q-icon v-if="filter.value === ''" name="search"/>
                  </template>
                </q-input>
              </div>
              <q-space />
              <div class="">
                <!--                <q-pagination-->
                <!--                  v-model="current"-->
                <!--                  :max="10"-->
                <!--                  input-->
                <!--                  direction-links-->
                <!--                  boundary-links-->
                <!--                />-->
                <div class="q-mt-sm kmp-text-blue cursor-pointer">
                  <span class="text-weight-bold">Download</span>
                  <q-icon name="download" class="q-ml-sm" size="20px"/>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-md">
          <q-scroll-area :style="heightObserver" class="q-pr-md">
            <!--            <q-infinite-scroll @load="onLoad" :offset="250">-->
            <!--              <div v-for="(item, index) in items" :key="index" class="caption">-->
            <!--                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>-->
            <!--              </div>-->
            <LeaderboardList :data="leaderboard" :separator="true" :show_detail="true" :show_rating="true" :history_link="true" />
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
            <!--            </q-infinite-scroll>-->
          </q-scroll-area>

        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style></style>

<script>
import LeftBar from 'components/LeftBar';
import LeaderboardBar from 'components/leaderboard/LeaderboardBar';
import { leaderboardMemberPointHistory } from 'src/lib/api';
import LeaderboardList from 'components/leaderboard/LeaderboardList';

export default {
  components: {
    LeftBar, LeaderboardBar, LeaderboardList
  },
  data() {
    return {
      items: [{}, {}, {}, {}, {}, {}, {}],

      heightObserver: {
        height: '1px'
      },
      refresh: false,
      current: 3,
      filter: {
        value: '',
        result_info: ''
      },
      leaderboard: {
        title: '',
        data: [
          {
            id: 0,
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
      leaderboard_original: {}
    };
  },
  methods: {
    resetData() {
      this.filter.value = '';
      this.filter.result_info = '';
      this.leaderboard = this.leaderboard_original;
    },
    filterData() {
      if (this.filter.value !== '' && this.filter.value !== null) {
        this.leaderboard = { ...this.leaderboard,
          data: this.leaderboard_original.data.filter(x => {
            return x.title.toLowerCase().includes(this.filter.value.toLowerCase());
          }) };

        this.filter.result_info = `Search for '${this.filter.value.toLowerCase()}', ${this.leaderboard.data.length} member found in leaderboard`;
      } else {
        this.resetData();
      }
    },
    onLoad (index, done) {
      setTimeout(() => {
        if (this.items) {
          this.items.push({}, {}, {}, {}, {}, {}, {});
          done();
        }
      }, 2000);
    },
    getLeaderboard() {
      leaderboardMemberPointHistory()
        .then(res => {
          this.leaderboard = {
            title: 'Leaderboard Member',
            data: res.data
          };
          this.leaderboard_original = this.leaderboard;
        });
    },
    onResize(value) {
      this.heightObserver.height = `${value - 190}px`;
    }
  },
  mounted() {
    this.getLeaderboard();
  }
};
</script>
