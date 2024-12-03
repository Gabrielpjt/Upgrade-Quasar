<template>
  <div class="row desktop-only">
    <q-icon size="35px" :style="{color: point_user.icon_color}" :name="point_user.icon_name"/>
    <div class="q-mr-md" v-if="point_user.remark !== undefined">
      <div class="fit column" style="width: 300px">
        <div class="q-py-none q-pl-sm q-pr-lg text-weight-bold text-black">{{ point_user.remark }}</div>
        <div class="q-pt-none q-pb-xs q-pl-sm q-pr-lg text-weight-light text-black"
             style="line-height: .5em !important; font-size: 11px;">
          {{ point_user.point }} Points
        </div>
        <q-linear-progress
          class="q-mx-sm"
          size="10px"
          :value="parseFloat(point_user.percent_point)"
          :style="{color: point_user.icon_color}">
          <div class="absolute-full flex flex-center">
            <span style="font-size: 7.5px" class="text-grey-9">
              {{ (parseFloat(point_user.percent_point) * 100).toFixed(2) + '%' }}
            </span>
          </div>
        </q-linear-progress>
      </div>
    </div>
  </div>
</template>

<script>

import { leaderboardMemberByMemberIdPointHistory } from 'src/lib/api';
import { getLoginId } from 'src/lib/helper';
import bus from 'components/common/EventBus';

export default {
  // props: ['data'],
  data() {
    return {
      point_user: {}
    };
  },
  methods: {
    async getPoint() {
      const res = await leaderboardMemberByMemberIdPointHistory(getLoginId());
      this.point_user = (res.data.length === 0) ? {
        point: 0,
        level_name: 'Star 1',
        remark: 'Newbie',
        icon_name: 'stars',
        icon_color: '#FEB82D',
        final_point: 200,
        percent_point: 0
      } : res.data[0];
    }
  },
  watch: {
    // picture: {
    //   immediate: true,
    //   deep: true,
    //   handler(value) {
    //     if (value !== undefined) {
    //       this.avatar_property = {
    //         ...this.avatar_property,
    //         picture: value
    //       };
    //     }
    //   }
    // },
  },
  mounted() {
    this.getPoint();
  },
  created() {
    bus.$on('onRefreshPoint', data => {
      setTimeout(() => {
        this.getPoint();
      }, Math.floor((Math.random() * 150) + 50));
    });
  }
};
</script>
