<template>
  <q-page>
    <LeftBar/>
    <div class="row q-px-lg q-py-sm" v-if="!showArticle">
      <div class="col-12 col-sm-7">
        <div class="row">
          <div :class="$q.platform.is.mobile ? 'col-12 col-md-6' : 'col-12 col-md-6 q-pr-lg'">
            <Leaderboard v-if="leaderboard.member.data.length > 0 && leaderboard.member.data_overall.length > 0" :data="leaderboard.member" :key="'member-leaderboard'"/>
            <LeaderboardLoading v-else :key="'member-loading'" />
          </div>
          <div :class="$q.platform.is.mobile ? 'col-12 col-md-6' : 'col-12 col-md-6 q-pr-lg'">
            <Leaderboard v-if="leaderboard.direktorat.data.length > 0 && leaderboard.direktorat.data_overall.length > 0" :data="leaderboard.direktorat" :key="'direktorat-leaderboard'"/>
            <LeaderboardLoading v-else :key="'direktorat-loading'" />
          </div>
        </div>
        <div class="row">
          <div :class="$q.platform.is.mobile ? 'col-12' : 'col-12 q-pr-lg'">
            <Quiz :key="'quiz-component'"/>
          </div>
        </div>
        <div class="row">
          <div :class="$q.platform.is.mobile ? 'col-12' : 'col-12 q-pr-lg'">
            <EventGadget :today="today" :key="'event-gadget'"/>
          </div>
        </div>
        <div class="row">
          <QuizCreate v-if="1 === 2" :key="'quiz-create'"/>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <q-tabs
          v-model="tab.active"
          no-caps
          class="kmp-font-lg kmp-font-bold bg-white"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          style="border-radius: 8px;"
        >
          <q-tab name="Latest Posts" label="Latest Posts" class="q-px-sm" :key="'latest-posts-tab'"/>
          <q-tab name="Popular Posts" label="Popular Posts" class="q-px-sm" :key="'popular-posts-tab'"/>
          <q-tab name="Suggest Channel" label="Channel Suggestion" class="q-px-sm" :key="'suggest-channel-tab'"/>
        </q-tabs>

        <q-tab-panels class="q-pt-sm" v-model="tab.active" animated style="background:#EEF1F5;">
          <q-tab-panel name="Latest Posts" class="q-pa-none" :key="'latest-posts-panel'">
            <PostLatest :is_data="post_latest.data"
                        :key="reload"
                        @update_post="updatePost('post_latest')"
                        :today="today"
                        :hours="hours"
                        :user="user"
            />
          </q-tab-panel>
          <q-tab-panel name="Popular Posts" class="q-pa-none" :key="'popular-posts-panel'">
            <PostPopular :is_data="post_popular.data"
                         :key="reload"
                         @update_post="updatePost('post_popular')"
                         :today="today"
                         :hours="hours"
            />
          </q-tab-panel>
          <q-tab-panel name="Suggest Channel" class="q-pa-none" :key="'suggest-channel-panel'">
            <ChannelSuggest :is_data="suggest_channel.data"
                            @update_suggest="updatePost('channel_suggest')"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <div class="row q-px-lg q-py-lg" v-else :key="'post-article-read'">
      <PostArticleRead :user="user" :post_id="article_id" @close_article="closeArticle"/>
    </div>
  </q-page>
</template>



<script>
import LeftBar from 'components/LeftBar';
import Quiz from 'components/Quiz';
import QuizCreate from 'components/QuizCreate';
import Leaderboard from 'components/leaderboard/Leaderboard';
import PostLatest from 'components/PostLatest';
import EventGadget from 'components/EventGadget';
import PostArticleRead from 'components/post/PostArticleRead';
import PostPopular from 'components/post/PostPopular';
import { getLoginId } from 'src/lib/helper';
import { leaderboardDirektoratPointHistory, leaderboardMemberPointHistory } from 'src/lib/api';
import bus from 'components/common/EventBus';
import { get } from 'src/lib/HttpHelper';
import ChannelSuggest from 'components/chaannel/ChannelSuggest';
import LeaderboardLoading from 'components/leaderboard/LeaderboardLoading.vue';

export default {
  components: { LeaderboardLoading, ChannelSuggest, PostPopular, Leaderboard, LeftBar, PostLatest, EventGadget, QuizCreate, Quiz, PostArticleRead },
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
