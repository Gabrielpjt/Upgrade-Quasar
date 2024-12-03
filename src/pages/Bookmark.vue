<template>
  <q-page>
    <LeftBar/>
    <BookmarkBar/>
    <div class="row q-px-lg q-py-lg">
      <div class="col-12 col-md-7 q-pr-lg">
        <PostBookmark :key="reload" @update_post="updatePost"/>
      </div>
      <div v-if="this.$q.platform.is.desktop" class="col-12 col-md-5 q-mt-lg q-py-lg">
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
          <q-tab name="Latest Posts" label="Latest Posts" />
          <q-tab name="Popular Posts" label="Popular Posts" />
          <q-tab name="Suggest Channel" label="Channel Suggestion"/>
        </q-tabs>

        <q-tab-panels class="q-pt-sm" v-model="tab.active" animated style="background:#EEF1F5;">
          <q-tab-panel name="Latest Posts" class="q-pa-none">
            <PostLatest :is_data="post_latest.data"
                        :key="reload"
                        @update_post="updatePost('post_latest')"
                        :today="today"
                        :hours="hours"
            />
          </q-tab-panel>
          <q-tab-panel name="Popular Posts" class="q-pa-none">
            <PostPopular :is_data="post_popular.data"
                          :key="reload"
                          @update_post="updatePost('post_popular')"
                          :today="today"
                          :hours="hours"
            />
          </q-tab-panel>
          <q-tab-panel name="Suggest Channel" class="q-pa-none">
            <ChannelSuggest :is_data="suggest_channel.data"
                            @update_suggest="updatePost('channel_suggest')"
            />
          </q-tab-panel>
        </q-tab-panels>
        <div hidden class="q-py-md q-pa-none items-start">
          <div class="row q-pb-md items-center justify-between">
            <span class="kmp-font-lg kmp-font-bold" v-for="(item, index) in tab.data" :key="index"
                  :class="tab.active === item ? '' : 'cursor-pointer kmp-text-blue-2'"
                  @click="tab.active === item ? false : switchTab(item)"
            >{{ item }}</span>
          </div>
          <PostLatest v-if="tab.active === tab.data[0]"
                      :is_data="post_latest.data"
                      :key="reload"
                      @update_post="updatePost('post_latest')"
                      :today="today"
                      :hours="hours"
          />
          <PostPopular v-else-if="tab.active === tab.data[1]"
                        :is_data="post_popular.data"
                        :key="reload + '-popular'"
                        @update_post="updatePost('post_popular')"
                        :today="today"
                        :hours="hours"
          />
          <ChannelSuggest v-else
                :is_data="suggest_channel.data"
                @update_suggest="updatePost('channel_suggest')"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import BookmarkBar from 'components/BookmarkBar';
import PostBookmark from 'components/PostBookmark';
import PostLatest from 'components/PostLatest';
import PostPopular from 'components/post/PostPopular';
import ChannelSuggest from 'components/chaannel/ChannelSuggest';
import { get } from 'src/lib/HttpHelper';

export default {
  components: { ChannelSuggest, PostPopular, LeftBar, PostBookmark, BookmarkBar, PostLatest },
  data() {
    return {
      reload: 0,
      today: '',
      hours: '',
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
    updatePost() {
      this.reload += 1;
    },
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
    }
  },
  mounted() {
    this.getToday();
    this.getPostLatest();
    this.getPostPopular();
    this.getSuggestChannel();
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
