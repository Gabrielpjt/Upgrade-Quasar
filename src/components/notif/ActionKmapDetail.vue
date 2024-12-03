<template>
  <div>

    <div class="kmp-font-lg text-weight-bold q-mb-sm">Member</div>
    <div class="row items-center">
      <Avatar size="xl" :picture="`./api${data.extra.user_picture}`" :name="data.title" @click="onClickProfile"/>
      <div class="q-ml-md cursor-pointer" @click="onClickProfile">{{ data.title }}</div>
    </div>

    <div class="kmp-font-lg text-weight-bold q-mt-md">Knowledge Map</div>
    <q-tree
      v-if="knowledgeTree.length >0" default-expand-all
      :nodes="knowledgeTree" node-key="id">
      <template v-slot:default-header="prop">
        <div class="q-pl-sm">
          <div class="kmp-font-md">{{ prop.node.label }}</div>
          <div class="text-caption text-grey-6" style="line-height: .9rem">{{ prop.node.subtitle }}</div>
        </div>
      </template>
    </q-tree>

    <div v-if="knowledgeListFile.length + knowledgeListPost.length >0">
    <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-sm">Knowledge Document ({{knowledgeListFile.length + knowledgeListPost.length}})</div>
    <q-scroll-area style="height: 100px; padding-right: 12px">
      <q-list>
        <div v-for="(item, index) in knowledgeListFile" :key="index">
          <KnowledgeListFile :file="item" :item="item" :manage="false" :download="true"/>
        </div>
      </q-list>
      <q-list>
        <div v-for="(item, index) in knowledgeListPost" :key="index">
          <KnowledgeListPost :post="item" :item="item" :manage="false" :openlink="true"/>
        </div>
      </q-list>
    </q-scroll-area>
    </div>
  </div>
</template>

<script>
import Avatar from 'components/common/Avatar.vue';
import { getListFile, getListPost } from 'src/lib/api';
import KnowledgeListPost from 'components/KnowledgeListPost.vue';
import KnowledgeListFile from 'components/KnowledgeListFile.vue';

export default {
  name: 'ActionKmapDetail',
  components: { KnowledgeListFile, KnowledgeListPost, Avatar },
  props: ['data'],
  data() {
    return {
      knowledgeTree: [],
      knowledgeListFile: [],
      knowledgeListPost: []
    };
  },
  mounted() {
    const x = this.data;
    this.knowledgeTree = [{
      id: x.extra.unit_kerja_id,
      label: x.extra.unit_kerja,
      subtitle: 'Unit Kerja',
      children: [{
        id: x.extra.business_process_id,
        label: x.extra.business_process,
        subtitle: 'Business Process',
        children: [{
          id: x.extra.strategic_activity_id,
          label: x.extra.strategic_activity,
          subtitle: 'Strategic Activity',
          children: [{
            id: x.extra.knowledge_tree_id,
            label: x.extra.knowledge,
            subtitle: 'Knowledge'
          }]
        }]
      }]
    }];

    if (this.data.extra.file_id !== null) {
      getListFile({ id: this.data.extra.file_id })
        .then(res => {
          this.knowledgeListFile = res.data;
        });
    }

    if (this.data.extra.post_id !== null) {
      getListPost({ id: this.data.extra.post_id })
        .then(res => {
          this.knowledgeListPost = res.data;
        });
    }
  },
  methods: {
    onClickProfile() {
      this.$router.push(
        {
          name: 'profile-detail',
          params: {
            id: this.data.extra.user_id
          }
        });
    }
  }
};
</script>

<style scoped>

</style>
