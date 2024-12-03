<template>
  <q-page>
    <div class="row justify-center" v-if="!showArticle" style="padding-left: 80px;padding-right: 80px;padding-top: 24px;padding-bottom: 24px;">
      <div class="col-12 col-md-2" :style="this.$q.screen.gt.lg ? 'max-width: 280px !important' : ''">
      <SearchResultFilter :today="today"
          />
      </div>
      <div class="col-12 col-md-10" :style="this.$q.screen.gt.lg ? 'max-width: 648px !important' : ''">
        <div class="row">

          <!-- <q-item clickable dense style="border-radius: 4px;" v-ripple active-class="text-primary" class="q-mb-sm">
            <q-item-section class="kmp-line-130 kmp-md-text kmp-bold-text active">search result for</q-item-section>
          </q-item> -->

          <div class="q-mb-md q-ml-md">
            <span class="kmp-line-130 kmp-md-text kmp-bold-text q-mr-md">5 search result for</span>
            <q-badge class="kmp-line-125 kmp-md-text kmp-normal-text q-mr-sm" style="background-color:white;color:black;padding:5px 15px" rounded> Knowledges&nbsp;  <i class="fa fa-minus-square"></i></q-badge>
            <q-badge class="kmp-line-125 kmp-md-text kmp-normal-text q-mr-sm" style="background-color:white;color:black;padding:5px 15px" rounded> 15 October 2023 - 21 November 2023&nbsp;  <i class="fa fa-minus-square"></i></q-badge>
          </div>
          <div :class="$q.platform.is.mobile ? 'col-12' : 'col-12 q-px-md'">
            <SearchResult :today="today"/>
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
  </q-page>
</template>

<script>
import SearchResultFilter from 'components/v2/SearchResultFilter';
import SearchResult from 'components/v2/SearchResult';
import { getLoginId } from 'src/lib/helper';
import { leaderboardDirektoratPointHistory, leaderboardMemberPointHistory } from 'src/lib/api';
import bus from 'components/common/EventBus';
import { get } from 'src/lib/HttpHelper';

export default {
  components: { SearchResultFilter, SearchResult },
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
      },
      post_latest: {
        data: []
      },
      post_popular: {
        data: []
      },
      suggest_channel: {
        data: []
      }
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
    }
  },
  mounted() {
    this.user.id = getLoginId();
    this.getToday();
    this.getLeaderboard();
    this.getPostLatest();
    this.getPostPopular();
    this.getSuggestChannel();
  },
  created() {
    bus.$on('article_selected', data => {
      setTimeout(() => {
        this.openArticle(data);
      }, Math.floor((Math.random() * 150) + 50));
    });
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
