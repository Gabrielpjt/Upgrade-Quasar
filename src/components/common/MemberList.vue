<template>
  <div>
    <q-item
      v-for="(item, index) in member_property.list"
      :key="index"
      dense
      clickable
      class="kmp-menu-left q-py-xs q-my-xs q-pl-sm cursor-pointer"
      v-close-popup
      @click="$router.push({ name: 'profile-detail', params: { id: item.user.id } })"
    >
      <q-item-section avatar>
        <Avatar size="md" :picture="item.user.profile_picture ? `./api${item.user.profile_picture}` : ''"
                :name="item.user.name"/>
      </q-item-section>
      <q-item-section class="list list-channel text-capitalize">{{ item.user.name.toLowerCase() }}</q-item-section>
      <!--              <q-item-section side><q-badge color="primary" rounded label="2" /></q-item-section>-->
    </q-item>
  </div>
</template>

<script>

import Avatar from 'components/common/Avatar';

export default {
  props: ['member'],
  components: { Avatar },
  data() {
    return {
      member_property: {
        list: []
      }
    };
  },
  methods: {
    init() {
    }
  },
  watch: {
    member: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.member_property.list = value;
        }
      }
    }
  },
  mounted() {
    // this.init();
  }
};
</script>
