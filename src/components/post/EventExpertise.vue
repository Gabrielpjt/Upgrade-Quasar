<template>
  <div v-if="data.length > 5">
      <q-card-section style="padding:0px" :hidden="!hidden_exp" class="q-mb-sm">
        <span class="text-more cursor-pointer" @click="showExp">More</span>
          <q-item class="" style="min-height:10px;padding:3px 16p" v-for="(exp, ind) in data.slice(Math.max(data.length - 5, 1))" :key="ind">
            <q-item-section avatar style="">
              <!-- {{exp}} -->
              <div class="row items-center">
                <q-badge :class="{ 'blue-badge': exp.type === 'Moderator',
                  'yellow-badge': exp.type === 'Speaker',
                  'grey-badge': exp.type === 'Instructor'}">
                  <Avatar size="sm" v-if="exp.user_id !== null" :picture="exp.user.profile_picture ? api_url + exp.user.profile_picture : ''" :name="exp.user.name"/>
                  <span class="q-mx-sm cursor-pointer" v-if="exp.user_id !== null"
                        @click="$router.push({ name: 'profile-detail', params: { id: exp.user_id } })">{{
                      exp.name
                    }}</span>
                  <span class="q-mx-sm" v-else>{{ exp.name }}</span>
                </q-badge>
              </div>
            </q-item-section>
            <q-item-section></q-item-section>
            <q-item-section side>
              <span>{{ exp.type }}</span>
            </q-item-section>
          </q-item>
      </q-card-section>
      <q-card-section style="padding:0px" :hidden="hidden_exp">
        <span class="text-more cursor-pointer" @click="showExp">Less</span>
        <q-scroll-area style="height: 250px;">
          <q-item class="" style="min-height:10px;padding:3px 16p" v-for="(exp, ind) in data" :key="ind">
            <q-item-section avatar style="">
              <!-- {{exp}} -->
              <div class="row items-center">
                <q-badge :class="{ 'blue-badge': exp.type === 'Moderator',
                  'yellow-badge': exp.type === 'Speaker',
                  'grey-badge': exp.type === 'Instructor'}">
                  <Avatar size="sm" v-if="exp.user_id !== null" :picture="exp.user.profile_picture ? api_url + exp.user.profile_picture : ''" :name="exp.user.name"/>
                  <span class="q-mx-sm cursor-pointer" v-if="exp.user_id !== null"
                        @click="$router.push({ name: 'profile-detail', params: { id: exp.user_id } })">{{
                      exp.name
                    }}</span>
                  <span class="q-mx-sm" v-else>{{ exp.name }}</span>
                </q-badge>
              </div>
            </q-item-section>
            <q-item-section></q-item-section>
            <q-item-section side>
              <span>{{ exp.type }}</span>
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </q-card-section>
  </div>
  <div v-else>
    <q-card-section style="padding:0px">
      <q-item class="" style="min-height:10px;padding:3px 16px" v-for="(exp, ind) in data" :key="ind">
        <q-item-section avatar style="">
          <!-- {{exp}} -->
          <div class="items-center">
            <q-badge :class="{ 'blue-badge': exp.type === 'Moderator',
              'yellow-badge': exp.type === 'Speaker',
              'grey-badge': exp.type === 'Instructor'}">
              <Avatar size="sm" v-if="exp.user_id !== null" :picture="exp.user.profile_picture ? api_url + exp.user.profile_picture : ''" :name="exp.user.name"/>
              <span class="q-mx-sm cursor-pointer" v-if="exp.user_id !== null"
                    @click="$router.push({ name: 'profile-detail', params: { id: exp.user_id } })">{{
                  exp.name
                }}</span>
              <span class="q-mx-sm" v-else>{{ exp.name }}</span>
            </q-badge>
          </div>
        </q-item-section>
        <q-item-section></q-item-section>
        <q-item-section side>
          <span>{{ exp.type }}</span>
        </q-item-section>
      </q-item>
    </q-card-section>
  </div>

</template>

<script>
import Avatar from 'components/common/Avatar';

export default {
  props: ['data'],
  components: { Avatar },
  data() {
    return {
      hidden_exp: true,
      api_url: process.env.QUASAR_API_URL
    };
  },
  methods: {
    showExp() {
      if (this.hidden_exp) { this.hidden_exp = !this.hidden_exp; } else {
        this.hidden_exp = true;
      }
    }
  },
  watch: {
  },
  mounted() {
  }
};
</script>
