<template>
  <div>

    <div class="kmp-font-lg text-weight-bold q-mb-sm">User</div>
    <div class="row items-center">
      <Avatar size="xl" :picture="`./api${data.profile_picture}`" :name="data.title" @click="onClickProfile"/>
      <div class="q-ml-md cursor-pointer" @click="onClickProfile">{{ data.title }}</div>
    </div>
    <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.name">Name</div>
    <div class="kmp-font-md" v-if="data.name">{{ data.name }}</div>
    <!-- speaker -->
    <div v-if="data.profile_type === 'speaker'">
      <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.profile_type === 'speaker' && data.extra.locations">Location</div>
      <div class="kmp-font-md" v-if="data.extra.locations">{{ data.extra.locations }}</div>
      <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.profile_type === 'speaker' && data.extra.start_date">Start</div>
      <div class="kmp-font-md" v-if="data.extra.start_date">{{ parseDate(data.extra.start_date) }} <span>{{ parseTime(data.extra.start_time) }}</span></div>
      <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.profile_type === 'speaker' && data.extra.end_date">End</div>
      <div class="kmp-font-md" v-if="data.extra.end_date">{{ parseDate(data.extra.end_date) }} <span>{{ parseTime(data.extra.end_time) }}</span></div>
    </div>
    <!-- training eksternal -->
    <div v-if="data.profile_type === 'training_external'">
      <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.extra.issuing_organization">Issuing Organization</div>
      <div class="kmp-font-md" v-if="data.extra.issuing_organization">{{ data.extra.issuing_organization }}</div>
      <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.extra.issuing_date">Issuing Date</div>
      <div class="kmp-font-md" v-if="data.extra.issuing_date">{{ parseDate(data.extra.issuing_date) }}</div>
      <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.extra.duration">Duration</div>
      <div class="kmp-font-md" v-if="data.extra.duration">{{ data.extra.duration }} JP</div>
      <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.extra.business">Related to Business Proccess</div>
      <div class="kmp-font-md" v-if="data.extra.business">{{ data.extra.business.title }}</div>
      <div class="kmp-font-lg text-weight-bold q-mt-md q-mb-xs" v-if="data.extra.knowledge">Related to Knowledge</div>
      <div class="kmp-font-md" v-if="data.extra.knowledge">{{ data.extra.knowledge.title }}</div>
    </div>
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
    parseDate(date, formate = 'DD MMMM YYYY') {
      return moment(new Date(date)).format(formate);
    },
    parseTime(time) {
      if (time !== null) {
        const sTime = time.split(':');
        return `${sTime[0]}:${sTime[1]}`;
      }
      return '';
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
