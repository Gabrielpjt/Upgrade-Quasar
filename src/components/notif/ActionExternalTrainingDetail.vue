<template>
  <div>

    <div class="kmp-font-lg text-weight-bold q-mb-sm">User</div>
    <div class="row items-center">
      <Avatar size="xl" :picture="`./api${data.extra.user.profile_picture}`" :name="data.title" @click="onClickProfile"/>
      <div class="q-ml-md cursor-pointer" @click="onClickProfile">{{ data.title }}</div>
    </div>
    <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.name">Name</div>
    <div class="kmp-font-md" v-if="data.name">{{ data.name }}</div>
    <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.extra.issuing_organization">Issuing Organization</div>
    <div class="kmp-font-md" v-if="data.extra.issuing_organization">{{ data.extra.issuing_organization }}</div>
    <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.extra.issuing_date">Issuing Date</div>
    <div class="kmp-font-md" v-if="data.extra.issuing_date">{{ parseDate(data.extra.issuing_date) }}</div>
    <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.extra.duration">Duration</div>
    <div class="kmp-font-md" v-if="data.extra.duration">{{ data.extra.duration }} JP</div>
  </div>
</template>

<script>
import moment from 'moment';
import Avatar from 'components/common/Avatar.vue';

export default {
  name: 'ActionTrainingDetail',
  components: { Avatar },
  props: ['data'],
  data() {
    return {
      url: process.env.QUASAR_API_URL,
      date: null
    };
  },
  methods: {
    parseDate(date, formate = 'MMMM YYYY') {
      return moment(new Date(date)).format(formate);
    },
    onClickProfile() {
      this.$router.push(
        {
          name: 'profile-detail',
          params: {
            id: this.data.user_id
          }
        });
    }
  }
};
</script>

<style scoped>

</style>
