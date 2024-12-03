<template>
  <q-page>
    <LeftBar/>
    <KnowledgeBar/>
    <div class="row q-pa-lg kmp-content">
      <div class="col-12 col-md-7">
        <Tree @update_selected="updateTreeSelected" @default_direktorat="updateDefaultDirektorat" :default-tree-open="defaultTreeOpen" />
      </div>
      <div class="desktop-only col-12 col-md-5">
        <DetailKnowledge :data_parent="parent" :selected_knowledge="tree_selected.value" :default_direktorat="default_direktorat.value" />
      </div>
      <q-dialog v-if="$q.platform.is.mobile" v-model="detail">
            <DetailKnowledge :data_parent="parent" :selected_knowledge="tree_selected.value" :default_direktorat="default_direktorat.value" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import KnowledgeBar from 'components/KnowledgeBar';
import DetailKnowledge from 'components/DetailKnowledge';
import Tree from 'components/Tree';


export default {
  components: { KnowledgeBar, Tree, DetailKnowledge, LeftBar },
  data() {
    return {
      selected: null,
      default_direktorat: [],
      tree_selected: {
        value: {
          label: '',
          level: 0
        }
      },
      defaultTreeOpen: {
        default_tree_id: 0,
        default_tree_parent_id: 0
      },
      detail: false,
      parent: ''
    };
  },
  setup () {
  },
  methods: {
    updateTreeSelected (key, selected) {
      this.$set(this.tree_selected, 'value', selected);
    },
    updateDefaultDirektorat (key, selected) {
      this.$set(this.default_direktorat, 'value', selected);
    },
    toggleInfo() {
      this.detail = !this.detail;
    }
  },
  mounted() {
    this.$root.$on('changeInfoKmap', () => {
      this.toggleInfo();
    });
    this.$root.$on('getDataParent', data => {
      this.parent = data;
    });
  },
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler(value) {
        if (typeof value.knowledge_tree_id !== 'undefined') {
          this.defaultTreeOpen = {
            default_tree_id: value.knowledge_tree_id,
            default_tree_parent_id: value.knowledge_tree_parent_id,
            default_tree_parent_parent_id: value.knowledge_tree_parent_parent_id
          };
        }
      }
    }
  }
};
</script>

<style>
.my-card{
  width: 100%;
  height: 100%;
  left: unset;
  top: unset;
  border-radius: 8px;
}
.text-neutral{
  color: #65738F;
}
</style>
