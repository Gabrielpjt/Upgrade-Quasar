<template>
  <q-page>
    <LeftBar/>
    <TrainingBar/>
      <div class="row q-pa-lg kmp-content">
      <div class="col-12">
              <q-tabs
        v-model="tab"
        dense
        align="left"
        class="text-white bg-km-blue shadow-2"
        :breakpoint="0"
        narrow-indicator
      >
          <q-tab name="method" label="Method"/>
          <q-tab name="type" label="Type"/>
          <q-tab name="category" label="Category"/>
          <q-tab name="non_employee" label="Non Employee"/>
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="method">
          <TrainingMethod @update_selected="updateTreeSelected" />
        </q-tab-panel>
        <q-tab-panel name="type">
          <TrainingType @update_selected="updateTreeSelected" />
        </q-tab-panel>
        <q-tab-panel name="category">
          <TrainingCategory @update_selected="updateTreeSelected" />
        </q-tab-panel>
        <q-tab-panel name="non_employee">
          <TrainingNonEmployee @update_selected="updateTreeSelected" />
        </q-tab-panel>
      </q-tab-panels>
      </div>
      </div>
  </q-page>
</template>

<script>
import LeftBar from 'components/LeftBar';
import TrainingBar from 'components/training/TrainingBar';
import TrainingMethod from 'components/training/TrainingMethod';
import TrainingType from 'components/training/TrainingType';
import TrainingCategory from 'components/training/TrainingCategory';
import TrainingNonEmployee from 'components/training/TrainingNonEmployee';

export default {
  components: { TrainingBar, TrainingMethod, LeftBar, TrainingType, TrainingCategory, TrainingNonEmployee },
  data() {
    return {
      selected: null,
      tree_selected: {
        value: {
          label: '',
          level: 0
        }
      },
      tab: 'method'
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
