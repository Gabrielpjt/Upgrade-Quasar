<template>
  <q-page class="kmp-new-font">
    <div class="row justify-center" style="padding-left: 80px;padding-right: 80px;padding-top: 24px;padding-bottom: 24px;">
      <div class="col-12 col-md-3" :style="this.$q.screen.gt.lg ? 'max-width: 280px !important' : ''">
        <PersonalGadget :today="today"
          />
        <QuizGadget :today="today"
        />
        <ChannelGadget :today="today"
        />
      </div>
      <!-- <div class="col-12 col-md-9" :style="this.$q.screen.gt.lg ? 'max-width: 976px !important' : ''">
        <div :class="$q.platform.is.mobile ? 'col-12' : 'col-12 q-px-lg'">
            <Bar menu="Library" :title="data.title"/>
            <KnowledgeDetailContent :data="data"/>
          </div>
      </div> -->
      <div class="col-12 col-md-9">
        <div class="q-px-md">
            <Bar menu="Library" :title="data.title"/>
            <KnowledgeDetailContent :data="data"/>
          </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Bar from 'components/v2/Bar';
import KnowledgeDetailContent from 'components/v2/KnowledgeDetailContent';
import PersonalGadget from 'components/v2/PersonalGadget';
import QuizGadget from 'components/v2/QuizGadget';
import ChannelGadget from 'components/v2/ChannelGadget';
import { libraryDetail } from 'src/lib/api';

export default {
  components: { Bar, KnowledgeDetailContent, PersonalGadget, QuizGadget, ChannelGadget },
  data() {
    return {
      data: null
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      deep: true,
      handler(id) {
        console.log('masuk');
        console.log(id);
        this.getLibraryDetail(id);
      }
    }
  },
  methods: {
    getLibraryDetail(id) {
      const params = {};
      libraryDetail(id, params).then(response => {
        this.data = response.data;
        console.log(this.data);
        // this.library_list = hasil;
        // this.library_list_loading = false;
        // this.library_list_total_page = response.meta.total_page;
        // this.total_result = response.meta.total_result;
      });
    }
  }
};
</script>

<style>
</style>
