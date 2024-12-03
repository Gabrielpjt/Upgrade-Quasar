<template>
    <div class="column justify-between">
      <div class="">
        <q-item clickable v-ripple class="kmp-profile-item-list q-px-none"
                v-for="(item, index) in list_filter" :key="index"
                @click="openCertificate(item)"
        >
          <div class="q-py-sm row items-center">
<!--            <q-avatar bordered size="36px" :style="getColor(index)">{{ item.avatar_certificate }}</q-avatar>-->
            <q-avatar bordered size="36px" style="border-color: #FFFFFF;background-color: #F9F1FF;color: #964DD0" icon="school" />
            <q-item-section class="q-ml-md">
              <q-item-label class="kmp-font-bold kmp-text-grey-2">{{item.name}}</q-item-label>
              <!-- <q-item-label class="kmp-font-small text-grey-7" v-if="item.type === 'training'">Training</q-item-label> -->
              <q-item-label class="kmp-font-small text-grey-7">{{item.issuing_organization}}</q-item-label>
              <div>
                <q-item-label class="kmp-font-small text-grey-7">Issued {{item.date_custom}}</q-item-label>
                <q-item-label v-if="item.training_id !== null" class="kmp-font-small text-grey-7">Jumlah JP {{item.duration ? item.duration : item.training.jam_pelatihan }}</q-item-label>
                <q-item-label v-else class="kmp-font-small text-grey-7">Jumlah JP {{item.duration ? item.duration : '' }}</q-item-label>
              </div>
            </q-item-section>
          </div>
          <q-space/>
          <div class="self-center" v-show="item.admin_id">
            <q-badge v-if="item.status === 'approved' && ((is_member === true && data_own) || is_member === false)" rounded color="green-7" label="Approved" />
            <q-badge v-if="item.status === 'pending'" rounded color="orange-7" label="Waiting for Approval" />
            <q-badge v-if="item.status === 'declined'" rounded color="red-10" label="Declined" />
          </div>
        </q-item>
      </div>
      <div v-show="paginate.page_count > 1" class="">
        <div class="flex flex-center">
          <div style="position: absolute; bottom: 3px;">
            <q-pagination
              :unelevated=false
              :outline=false
              v-model="paginate.current"
              :max="paginate.page_count"
              direction-links
              boundary-links
              boundary-numbers
              :max-pages="3"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import _ from 'lodash';

import { checkRole } from 'src/lib/helper';

export default {
  name: 'ProfileTabTrainingCert',
  props: ['list_data', 'badge_show', 'info_height', 'data_own'],

  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      colorArray: [
        'background-color: #FFFCEE;color: #F5D529;',
        'background-color: #E6F4FF;color: #0E6FB3;',
        'background-color: #EFFFEA;color: #56B635;',
        'background-color: #F9F1FF;color: #7D35B6;',
        'background-color: #FFF1F4;color: #FF1048;'
      ],
      paginate: {
        current: 1,
        page_limit: 6,
        page_count: 1
      },
      is_member: false
    };
  },
  computed: {
    list_filter: {
      get() {
        const data0 = this.list_data.data;
        const pageLimit = this.paginate.page_limit;
        const data = _.filter(_.forEach(data0, (v, i) => {
          v.page = i < pageLimit ? 1 : 1 + Math.floor(i / pageLimit);
        }), v1 => v1.page === this.paginate.current);
        return data;
      }
    }
  },
  mounted() {
    this.getInitPage();
    this.getRole();
  },
  methods: {
    getRole() {
      const role_name = (checkRole() !== null) ? checkRole().name : '';
      if (role_name === 'member') {
        this.is_member = true;
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.paginate.page_limit = window.innerWidth > 1300
        ? this.paginate.page_limit + 1
        : this.paginate.page_limit;
    },
    getColor(i) {
      const index = i < 5 ? i : i % 5;
      return this.colorArray[index];
    },
    openCertificate(item) {
      this.$emit('clickCertificate', item);
    },
    getInitPage() {
      const data0 = this.list_data.data;
      const pageLimit0 = (this.info_height > 720) ? this.paginate.page_limit + 1 : this.paginate.page_limit;
      const pageLimit = this.badge_show ? pageLimit0 + 1 : pageLimit0;
      const tambahan = data0.length % pageLimit > 0 ? 1 : 0;
      const count = data0.length > 0
        ? Math.floor(data0.length / pageLimit) + tambahan
        : 1;
      this.paginate.page_count = count < 1 ? 1 : count;
      this.paginate.page_limit = pageLimit;
    }

  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
};

</script>

<style lang="sass" scoped>
.kmp-profile-item-list
  padding: 1px
  border-bottom: 1px solid #E5E8ED
</style>
