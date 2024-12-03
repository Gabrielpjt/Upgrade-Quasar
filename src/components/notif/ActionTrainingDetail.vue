<template>
  <div>

    <div class="kmp-font-lg text-weight-bold q-mb-sm">User</div>
    <div class="row items-center">
      <Avatar size="xl" :picture="`./api${data.extra.profile_picture}`" :name="data.title" @click="onClickProfile"/>
      <div class="q-ml-md cursor-pointer" @click="onClickProfile">{{ data.title }}</div>
    </div>
    <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.name">Name</div>
    <div class="kmp-font-md" v-if="data.name">{{ data.name }}</div>
    <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.extra.description">Description</div>
    <div class="kmp-font-md" v-if="data.extra.description">{{ data.extra.description }}</div>
    <div v-if="data.extra.banner !== null" class="q-mt-md">
      <q-img :src="url + data.extra.banner" eight="" style="border: 1px solid #bdbdbd; border-radius: 5px;"/>
    </div>
    <div v-else>
      <q-img src="../../assets/images/picture-default-training.png" style="background-color: white;border: 1px solid #bdbdbd; border-radius: 5px;"/>
    </div>
  </div>
</template>

<script>
import Avatar from 'components/common/Avatar.vue';

export default {
  name: 'ActionTrainingDetail',
  components: { Avatar },
  props: ['data'],
  data() {
    return {
      url: process.env.QUASAR_API_URL
    };
  },
  methods: {
    onClickProfile() {
      this.$router.push(
        {
          name: 'profile-detail',
          params: {
            id: this.data.extra.users_id
          }
        });
    }
  }
};
</script>

<style scoped>

</style>
