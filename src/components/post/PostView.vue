<template>
  <div class="q-mt-md text-right q-mr-md">
    <q-icon v-if="data.view.post_access_count > 0" name="visibility" class="check-icon" size="14px" style=""/>
    <span @click="viewer_detail_dialog = true" class="kmp-font-sm cursor-pointer q-ml-sm">
      <span class="text-capitalize"
            v-if="data.access_data.all_member.length === 1"
      > {{ data.access_data.all_member[0].user.name.toLowerCase() }}</span>
      <span v-if="data.access_data.all_member.length > 1"
            @click="data.access_data.reaction_detail_dialog = true">
        <span class="text-capitalize"> {{ data.access_data.all_member[0].user.name.toLowerCase() }}</span> and {{ data.access_data.all_member.length - 1 }} others
      </span>
      <q-tooltip v-if="data.view.post_access_count > 0">
        <div class="text-capitalize" v-for="(item, index) in data.access_data.all_member.slice(0, 10)" :key="index">
          {{ item.user.name.toLowerCase() }}
        </div>
        <div v-if="data.access_data.all_member.length >10">and {{ data.access_data.all_member.length - 10 }} more</div>
      </q-tooltip>
    </span>

    <q-dialog v-model="viewer_detail_dialog">
      <q-card class="q-pa-lg" :style="$q.platform.is.mobile ? 'height: 50vh;width: 500px; max-width: 80vw;' :  'height: 50vh;width: 500px; max-width: 40vw;'">
        <MemberList :member="list_member"/>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>


import MemberList from 'components/common/MemberList';

export default {
  props: ['data'],
  components: { MemberList },
  data() {
    return {
      viewer_detail_dialog: false,
      list_member: []
    };
  },
  methods: {
  },
  watch: {
  },
  mounted() {
    this.list_member = this.data.access_data.all_member;
  }
};
</script>

<style>
</style>
