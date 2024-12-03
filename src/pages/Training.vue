<template>
  <q-page>
    <LeftBar/>
    <TrainingBar/>
    <div class="row q-pa-lg kmp-content">
      <div class="col-12">
        <TrainingContent @update_selected="updateTreeSelected" />
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import TrainingBar from 'components/training/TrainingBar';
import TrainingContent from 'components/training/TrainingContent';


export default {
  components: { TrainingBar, TrainingContent, LeftBar },
  data() {
    return {
      selected: null,
      tree_selected: {
        value: {
          label: '',
          level: 0
        }
      }
    };
  },
  setup () {
  },
  methods: {
    updateTreeSelected (key, selected) {
      this.$set(this.tree_selected, 'value', selected);
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
