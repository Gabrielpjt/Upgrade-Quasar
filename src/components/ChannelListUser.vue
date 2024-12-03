<template>
  <q-item class="">
      <q-item-section avatar style="">
        <q-avatar size="24px" v-if="user.profile_picture !== null">
          <img  :src="url+user.profile_picture">
        </q-avatar>
        <q-avatar size="24px" v-if="user.profile_picture === null" color="primary" text-color="white">{{ item.user.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar>
      </q-item-section>
      <q-item-section class="list-member">{{user.name.toUpperCase()}}</q-item-section>
      <q-item-section side>
          <q-icon name="delete" size="20px" class="" @click="handleDelete(item.id)" />
      </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['item', 'user'],
  data() {
    return {
      url: process.env.QUASAR_API_URL
    };
  },
  methods: {
    handleDelete(id) {
      this.$emit('delete_member', id);
    }
    // openfile(url) {
    //   window.open(`/post/detail/${url}`, '_blank');
    // }
  },
  mounted() {}
};
</script>
