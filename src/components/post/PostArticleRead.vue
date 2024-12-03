<template>
  <div class="col-12" v-if="article.data === null">
    <PostLoading :count="1" :isDashboard="true"/>
  </div>
  <div class="col-12" v-else="">
    <div class="items-start">
      <q-card class="">
        <q-card-section class="q-py-sm">
          <q-icon name="close" :size="$q.platform.is.mobile ? '20px' : '30px'"
            class="cursor-pointer float-right q-mt-sm q-mr-sm" style="" @click="closeArticle"/>&nbsp;
          <!-- <q-icon name="edit" :size="$q.platform.is.mobile ? '20px' : '30px'" v-if="user"
            class="cursor-pointer float-right q-mt-sm q-mr-sm" style="" @click="closeArticle"/>&nbsp; -->
          <PostHeader
            :show_edit="false"
            :show_close="true"
            :show_menu="false"
            :data="article.data"
            :state="state"
            @onClose="closeArticle"
            :channel="article.data.post_channel.channel"/>
        </q-card-section>

        <q-separator class="q-mt-lg"/>

        <div class="kmp-post-text-title q-mt-md q-mb-md q-ml-md kmp-font-xl text-center">
          {{ article.data.title }}
        </div>

        <q-separator v-if="article.data.featured_image_file !== null"/>
        <div v-if="article.data.featured_image_file !== null" class="q-my-md text-center">
          <img :src="`./api/${article.data.featured_image_file.path}`" alt="cover" />
        </div>

        <q-separator/>

        <q-card-section>
          <div>
              <div v-html="article.data.article.replace(/oembed url/g,'iframe style=\'width: 100%; height: 300px;\' src').replace(/oembed>/g,'iframe>').replace(/watch\?v=/, 'embed/')" class="text-justify"/>
              </div>
        </q-card-section>

        <q-card-section v-if="article.data.post_links.length >0 || article.data.post_file.length >0">
          <h6 class="q-my-lg">Attachment</h6>
          <q-list>
            <q-item class="q-px-none q-py-xs" style="min-height: unset" v-for="(item, index) in article.data.post_links"
                    :key="index">
              <q-item-section>
                <q-item-label>{{ index + 1 }}.&nbsp;&nbsp;<a :href="item.url" target="_blank">{{ item.url }}</a>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-px-none q-py-xs" style="min-height: unset" v-for="(item, index) in article.data.post_file"
                    :key="`L${index}`">
              <q-item-section class="cursor-pointer" @click="clickFile(item.file.path, item.file.filename)">
                <q-card bordered class="q-py-xs q-px-sm kmp-font-md kmp-bg-color-1" style="max-width: 30vw">
                  <q-icon name="fas fa-file" class="q-mr-sm" size="14px"/>
                  <span class="kmp-font-md">{{ item.file.filename }}</span>
                  <span class="q-ml-sm kmp-font-sm kmp-color-5">{{
                      formatQuasar.humanStorageSize(item.file.filesize)
                    }}</span>
                </q-card>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator/>

        <q-card-section class="row">
          <div class="col-6">
            <PostConversation class="q-pt-none" :post_id="article.data.id"
                              :data_conversation="article.data.post_conversation"/>
          </div>
        </q-card-section>

      </q-card>
    </div>
  </div>

</template>

<script>
import { postDetail } from 'src/lib/api';
import { format } from 'quasar';
import PostConversation from 'components/PostConversation';
import PostLoading from '../../components/PostLoading';
import PostHeader from '../../components/PostHeader';

export default {
  props: ['post_id', 'user'],
  components: { PostLoading, PostHeader, PostConversation },
  data() {
    return {
      formatQuasar: format,
      avatar_uniq: [],
      count: 0,
      link: false,
      is_loading: false,
      state: null,
      article: {
        data: null
      }
    };
  },
  methods: {
    getArticle(id) {
      postDetail(id).then(res => {
        this.article.data = res.data;
      });
    },
    clickFile(url, name) {
      window.open(`${process.env.QUASAR_API_URL}api/file/original?url=${url}&name=${name}`, '_blank');
    },
    closeArticle() {
      this.$emit('close_article');
    }
  },
  watch: {
    post_id: {
      immediate: true,
      deep: true,
      handler(value) {
        this.getArticle(value);
      }
    }
  }
};
</script>

