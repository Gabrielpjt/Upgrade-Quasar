<template>
  <div>
    <!--    <PostLoading v-if="is_loading"/>-->
    <div class="q-py-md">
      <!--      <q-infinite-scroll @load="onLoad" :offset="250">-->
      <!--        <PostModel v-if="!is_loading" :data_post="dataPost" @update_conversation="updateConversation" @update_channel="updateChannel($route.params.id)"/>-->
      <!--        <template v-slot:loading>-->
      <!--          <div class="row justify-center q-my-md">-->
      <!--            <q-spinner-dots color="primary" size="40px"/>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </q-infinite-scroll>-->


      <q-card class="q-mb-lg kmp-post">
        <div class="q-pa-lg">
          <div>Search Result</div>
          <div class="kmp-font-xl">"{{ keyword }}"</div>
        </div>
        <q-tabs
          v-model="tab"
          dense
          align="left"
          class="kmp-text-blue-2 q-px-lg"
          :breakpoint="0"
        >
          <q-tab name="post" class="text-capitalize">
            <div>Post
              <q-icon size="6px" name="brightness_1"/>
              {{ search_post_result.length }}
            </div>
          </q-tab>
          <q-tab name="channel" class="text-capitalize">
            <div>Channel
              <q-icon size="6px" name="brightness_1"/>
              {{ search_channel_result.length }}
            </div>
          </q-tab>
          <q-tab name="member" class="text-capitalize">
            <div>Member
              <q-icon size="6px" name="brightness_1"/>
              {{ search_member_result.length }}
            </div>
          </q-tab>
          <q-tab name="kmap">
            <div>KMAP
              <q-icon size="6px" name="brightness_1"/>
              {{ search_kmap_result.length }}
            </div>
          </q-tab>
          <q-tab name="training" class="text-capitalize">
            <div>Training
              <q-icon size="6px" name="brightness_1"/>
              {{ search_training_result.length }}
            </div>
          </q-tab>
        </q-tabs>


        <q-tab-panels v-model="tab" animated style="background-color: #F7F8F9">
          <q-tab-panel name="post" class="q-px-lg">
            <!--            <Post :key="reload" :state="state" @update_post="updatePost"-->
            <!--                  @update_loading="updateLoading" @update_channel="getChannel($route.params.id)"-->
            <!--                  @open_article="openArticle"/>-->

<!--            <PostModel v-if="!is_loading"-->
<!--                       :data_post="dataPost" :state="state"-->
<!--                       @update_conversation="updateConversation" @update_channel="updateChannel($route.params.id)" @update_post="updatePost" @open_article="openArticle"-->
<!--            />-->

            <q-card class="q-mb-lg kmp-post" v-for="(item, index) in search_post_result" :key="index">
              <q-card-section>
                <PostHeader :data="item.post" state="" :show_menu="false" />
                <div class="kmp-post-text-title q-mt-md q-mb-sm cursor-pointer" @click="handlePostLink(item);">
                  {{ item.search_title }}
                </div>
                <div class="text-content">
                  {{ item.search_subtitle }}
                </div>
                <div class="text-more kmp-font-small cursor-pointer" @click="handlePostLink(item);">
                 See More
                </div>
              </q-card-section>
            </q-card>

<!--            <div v-for="(item, index) in search_post_result" :key="index">-->
<!--              <div class="kmp-post-text-title q-mt-md q-mb-sm">-->
<!--                {{ item.search_title }}-->
<!--              </div>-->
<!--              <div class="text-content">-->
<!--                {{ item.search_subtitle }}-->
<!--              </div>-->
<!--            </div>-->
            <SearchEmpty v-if="search_post_result.length === 0" :keyword="keyword"/>
          </q-tab-panel>

          <q-tab-panel name="channel" class="q-px-lg">
            <div v-for="(item, index) in search_channel_result" :key="index">
              <q-item
                class="kmp-menu-left q-py-xs q-my-xs q-px-sm q-pr-none"
                dense
                clickable
                v-ripple
                @click="handleChannelLink(item)"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                  <q-icon v-if="item.channel.channel_type === 'General'" name="public" class="" size="1.5em"/>
                  <q-icon v-if="item.channel.channel_type === 'Direktorat'" name="domain" class="" size="1.5em"/>
                  <q-icon v-if="item.channel.channel_type === 'COP'" name="group_add" class="" size="1.5em"/>
                  <q-icon v-if="item.channel.channel_type === 'Project'" name="chat_bubble" class="" size="1.5em"/>
                  <q-icon v-if="item.channel.channel_type === 'Hobby'" name="sports_esports" class="" size="1.5em"/>
                </q-item-section>
                <q-item-section class="text-capitalize">
                  {{ item.channel.name }}
                </q-item-section>
                <div class="kmp-color-5">
                  {{ item.channel.channel_member_count }} members joined
                </div>
              </q-item>
            </div>

            <!--            <div v-for="(item, index) in search_channel_result" :key="index" class="" style="border-bottom: 1px solid #E1E5EA">-->
            <!--              <div class="kmp-post-text-title q-mt-md q-mb-sm">-->
            <!--                {{ item.search_title }}-->
            <!--              </div>-->
            <!--              <div class="text-content">-->
            <!--                {{ item.search_subtitle }}-->
            <!--              </div>-->
            <!--            </div>-->

            <SearchEmpty v-if="search_channel_result.length === 0" :keyword="keyword"/>

          </q-tab-panel>

          <q-tab-panel name="member" class="q-px-lg">
            <div v-for="(item, index) in search_member_result" :key="index">
              <q-item
                class="kmp-menu-left q-py-sm q-my-sm q-px-sm q-pr-none"
                dense
                clickable
                v-ripple
                @click="handleUserLink(item)"
                active-class="kmp-menu-left-active"
              >
                <q-item-section avatar style="min-width: 40px!important;">
                  <Avatar size="xl" :picture="item.user.profile_picture ? `./api${item.user.profile_picture}` : ''" :name="item.user.name"/>
<!--                  <q-avatar size="36px">-->
<!--                    <img v-if="item.user.profile_picture !== null" :src="item.user.profile_picture">-->
<!--                    <q-avatar size="36px" color="primary" text-color="white">-->
<!--                      {{ item.user.name.match(/\b(\w)/g).join('').toUpperCase() }}-->
<!--                    </q-avatar>-->
<!--                  </q-avatar>-->
                </q-item-section>

                <q-item-section>
                  <q-item-label class="kmp-text-nama text-capitalize">{{ item.user.name }}</q-item-label>
                  <q-item-label caption style="margin-top: 0px !important;">
                    {{ item.user.email }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

<!--            <div v-for="(item, index) in search_member_result" :key="index">-->
<!--              <div class="kmp-post-text-title q-mt-md q-mb-sm">-->
<!--                {{ item.search_title }}-->
<!--              </div>-->
<!--              <div class="text-content">-->
<!--                {{ item.search_subtitle }}-->
<!--              </div>-->
<!--            </div>-->
            <SearchEmpty v-if="search_member_result.length === 0" :keyword="keyword"/>

          </q-tab-panel>

          <q-tab-panel name="kmap" class="q-px-lg">
            <div v-for="(item, index) in search_kmap_result" :key="index">

              <q-item
                class="kmp-menu-left q-py-sm q-my-sm q-px-sm q-pr-none"
                dense
                clickable
                v-ripple
                @click="handleKmapLink"
                active-class="kmp-menu-left-active"
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="domain" size="20px" />
                    <span class="q-ml-sm">
                      {{ checkObj( item.knowledge_tree, 'parent', 'parent', 'parent', 'title' ) ? item.knowledge_tree.parent.parent.parent.title : '' }}
                    </span>
                  </q-item-label>
                  <q-item-label style="margin-left: 32px" class="kmp-font-sm">
                    <span class="kmp-font-bold">{{ checkObj(item.knowledge_tree, 'parent', 'parent', 'title') ? item.knowledge_tree.parent.parent.subtitle : '' }}</span> :
                    {{ checkObj(item.knowledge_tree, 'parent', 'parent', 'title') ? item.knowledge_tree.parent.parent.title.substring(0, 100) + '..' : '' }}
                  </q-item-label>
                  <q-item-label style="margin-left: 32px" class="kmp-font-sm">
                    <span class="kmp-font-bold">{{ checkObj(item.knowledge_tree, 'parent', 'title') ? item.knowledge_tree.parent.subtitle : '' }}</span> :
                    {{ checkObj(item.knowledge_tree, 'parent', 'title') ? item.knowledge_tree.parent.title : '' }}
                  </q-item-label>
                  <q-item-label>
                    <div class="row q-mt-sm" style="margin-left: 34px">
                      <div class="col" style="max-width: 45px">
                        <q-icon v-if="item.knowledge_tree.subtitle === 'Basic Knowledge'" name="content_paste" size="15px" class="ck-ico" />
                        <q-icon v-if="item.knowledge_tree.subtitle === 'Advance Knowledge'" name="receipt_long" size="15px" class="ck-ico" />
                        <q-icon v-if="item.knowledge_tree.subtitle === 'Innovative Knowledge'" name="document_scanner" size="15px" class="ck-ico" />
                      </div>
                      <div class="col">
                        <q-item-label class="kmp-text-nama text-capitalize" style="max-width: 600px">{{ item.knowledge_tree.title }}</q-item-label>
                        <q-item-label caption style="margin-top: 0px !important; max-width: 200px; margin-bottom: -20px">
                          {{ item.knowledge_tree.subtitle }}
                        </q-item-label>
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <!--              <div class="kmp-post-text-title q-mt-md q-mb-sm">-->
              <!--                {{ item.search_title }}-->
              <!--              </div>-->
              <!--              <div class="text-content">-->
              <!--                {{ item.search_subtitle }}-->
              <!--              </div>-->
<!--              <KnowledgeTree/>-->
            </div>
            <SearchEmpty v-if="search_kmap_result.length === 0" :keyword="keyword"/>

          </q-tab-panel>

          <q-tab-panel name="training" class="q-px-lg">
            <div v-for="(item, index) in search_training_result" :key="index">
              <div class="kmp-post-text-title q-mt-md q-mb-sm">
                {{ item.search_title }}
              </div>
              <div class="text-content">
                {{ item.search_subtitle }}
              </div>
            </div>
            <SearchEmpty v-if="search_training_result.length === 0" :keyword="keyword"/>

          </q-tab-panel>
        </q-tab-panels>

      </q-card>
    </div>
  </div>
</template>

<script>
import Avatar from 'components/common/Avatar';
import SearchEmpty from 'components/search/SearchEmpty';
import PostHeader from 'components/PostHeader';
// import KnowledgeTree from 'components/kmap/KnowledgeTree';
// import PostLoading from 'components/PostLoading';
// import { dateFormat } from 'src/lib/helper';
import { get } from 'src/lib/HttpHelper';
import { datePost } from 'src/lib/helper';
// import Knowledge from 'pages/Knowledge';

export default {
  components: { SearchEmpty, Avatar, PostHeader },
  data() {
    return {
      search_result: [],
      search_post_result: [],
      search_channel_result: [],
      search_member_result: [],
      search_kmap_result: [],
      search_training_result: [],
      totalDataPost: null,
      showArticle: false,
      is_loading: true,
      dataArticle: {},
      channel_id: null,
      keyword: '',
      tab: 'post'
    };
  },
  methods: {
    checkObj(obj, ...args) {
      return args.reduce((objj, level) => objj && objj[level], obj);
    },
    handlePostLink(item) {
      // console.log(item);
      this.$router.push({
        name: 'channel-detail-post-detail',
        params: {
          id: item.post.post_channel.channel.id,
          post_id: item.post.id
        }
      });

      // this.$router.push({
      //   name: 'channel-detail',
      //   params: {
      //     id: item.post.post_channel.channel.id
      //     // title: item.post.post_channel.channel.name
      //     //   .toLowerCase()
      //     //   .replace(/ /g, '-')
      //     //   .replace(/\//g, '-')
      //   }
      // }).catch(() => {});
    },
    handleKmapLink(item) {
      this.$router.push({
        name: 'knowledge'
        // params: {
        //   id: item.channel.id,
        //   title: item.channel.name
        //     .toLowerCase()
        //     .replace(/ /g, '-')
        //     .replace(/\//g, '-')
        // }
      }).catch(() => {});
    },
    handleChannelLink(item) {
      this.$router.push({
        name: 'channel-detail',
        params: {
          id: item.channel.id
          // title: item.channel.name
          //   .toLowerCase()
          //   .replace(/ /g, '-')
          //   .replace(/\//g, '-')
        }
      }).catch(() => {});
    },
    handleUserLink(item) {
      this.$router.push({
        name: 'profile-detail',
        params: {
          id: item.user.id
        }
      }).catch(() => {});
    },
    // handleShow(id) {
    //   this.showArticle = true;
    //   const data = this.dataPost.find(x => {
    //     return x.id === id;
    //   });
    //   this.dataArticle = data;
    // },
    // updateConversation() {
    //   this.getPost();
    // },
    // updateChannel() {
    //   this.$emit('update_channel', this.$route.params.id);
    // },
    getPost(keyword) {
      this.is_loading = true;
      get({
        path: `api/searchtopn?keyword=${keyword}&includes=user,channel,post,knowledge_tree,training&paging=25`
      }).then(res => {
        if (res.data.length > 0) {
          const search_result = JSON.parse(JSON.stringify(res.data));

          this.search_channel_result = search_result.filter(x => x.search_type === 'channel');
          this.search_member_result = search_result.filter(x => x.search_type === 'user');
          this.search_kmap_result = search_result.filter(x => x.search_type === 'knowledge_tree');
          this.search_training_result = search_result.filter(x => x.search_type === 'training');

          this.search_post_result = search_result
            .filter(x => x.search_type === 'post')
            .map(x => {
              return {
                ...x,
                post: {
                  ...x.post,
                  time: datePost(x.post.created_at)
                }
              };
            });
        }

        this.is_loading = false;
      });
    }
  },
  watch: {
    '$route.params.keyword': {
      immediate: true,
      deep: true,
      handler(value) {
        setTimeout(() => {
          this.search_channel_result = [];
          this.search_member_result = [];
          this.search_kmap_result = [];
          this.search_training_result = [];
          this.search_post_result = [];
          this.getPost(this.$route.params.keyword);
          this.keyword = this.$route.params.keyword;
        }, 100);
      }
    }
  }
};
</script>

