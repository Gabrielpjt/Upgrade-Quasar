<template>
    <div class="justify-between">
      <q-item clickable v-ripple class="kmp-profile-item-list q-px-none"
              v-for="(item, index) in list_filter" :key="index"
              @click="clickExpertise(item)"
      >
        <div class="q-py-sm row items-center desktop-only">
          <q-avatar bordered size="36px" style="border-color: #FFFFFF;background-color: #C7E7FD;color: #3E99DE;" icon="content_paste" />
          <div class="q-ml-md">
            <q-item-label class="kmp-font-bold kmp-text-grey-2">{{item.knowledgeTree ? item.knowledgeTree.title : ''}}</q-item-label>
            <q-item-label class="kmp-font-small text-grey-7">{{item.knowledgeTree ? item.knowledgeTree.knowledgeTree.knowledgeTree.knowledgeTree.title : ''}}</q-item-label>
          </div>
        </div>
        <div class="q-py-sm row items-center mobile-only full-width">
          <div class="col-2">
            <q-avatar bordered size="36px" style="border-color: #FFFFFF;background-color: #C7E7FD;color: #3E99DE;" icon="content_paste" />
          </div>
          <div class="col-10">
            <q-item-label class="kmp-font-bold kmp-text-grey-2">{{item.knowledgeTree ? item.knowledgeTree.title : ''}}</q-item-label>
            <q-item-label class="kmp-font-small text-grey-7">{{item.knowledgeTree ? item.knowledgeTree.knowledgeTree.knowledgeTree.knowledgeTree.title : ''}}</q-item-label>
          </div>
        </div>
      </q-item>
      <div v-show="paginate.page_count > 1" class="">
        <div class="flex flex-center">
          <div style="position: absolute; bottom: 3px;">
            <q-pagination
              :unelevated=false
              :outline=false
              v-model="paginate.current"
              :max="paginate.page_count"
              direction-links
              boundary-links
              boundary-numbers
              :max-pages="3"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ProfileTabExpertise',
  props: ['list_data', 'badge_show', 'info_height'],

  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      paginate: {
        current: 1,
        page_limit: 9,
        page_count: 1
      }
    };
  },
  computed: {
    list_filter: {
      get() {
        const data0 = this.list_data.data;
        const pageLimit = this.paginate.page_limit;
        const data = _.filter(_.forEach(data0, (v, i) => {
          v.page = i < pageLimit ? 1 : 1 + Math.floor(i / pageLimit);
        }), v1 => v1.page === this.paginate.current);
        return data;
      }
    }
  },
  mounted() {
    this.getInitPage();
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.paginate.page_limit = window.innerWidth > 1300
        ? this.paginate.page_limit + 1
        : this.paginate.page_limit;
    },
    clickExpertise(item) {
      this.$emit('clickExpertise', item);
    },
    getInitPage() {
      const data0 = this.list_data.data;
      const pageLimit0 = (this.info_height > 720) ? this.paginate.page_limit + 1 : this.paginate.page_limit;
      const pageLimit = this.badge_show ? pageLimit0 + 1 : pageLimit0;
      const tambahan = data0.length % pageLimit > 0 ? 1 : 0;
      const count = data0.length > 0
        ? Math.floor(data0.length / pageLimit) + tambahan
        : 1;
      this.paginate.page_count = count < 1 ? 1 : count;
      this.paginate.page_limit = pageLimit;
    }

  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
};

</script>

<style lang="sass" scoped>
.kmp-profile-item-list
  padding: 1px
  border-bottom: 1px solid #E5E8ED

</style>
