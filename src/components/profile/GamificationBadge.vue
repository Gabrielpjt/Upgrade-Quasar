<template>
  <div>
    <div class="absolute-full flex"
         :style="{...point_badge_position, left: `${badgePosition(progress_percent) + 25}px`}">
      <div class="bg-light-blue-9" style="transform: rotate(45deg)"><span v-for="n in 6" :key="n">&nbsp;</span></div>
    </div>
    <div class="absolute-full"
         :style="{...point_badge_position, left: `${badgePosition(progress_percent)}px`}">
<!--      <q-badge color="light-blue-9" text-color="white" class="text-center"-->
<!--               style="padding: 7px 10px 6px 10px; width:68px; font-size: 1em" :label="`${point_user.point} pts`"/>-->
      <q-btn unelevated no-caps dense
             color="primary" class="kmp-rounded"
             style="height: 24px; width: 68px; font-size: .96em; overflow: hidden; margin-top: 2px" >
        {{`${point_user.point} pts`}}
      </q-btn>
<!--      <div class="text-purple-4 q-mt-xs kmp-font-md text-center" style="width:68px;">{{point_user.point_to_next_level}} pts</div>-->
<!--      <div class="text-purple-4 kmp-font-sm text-center" style="width:68px;margin-top: -3px">to next level</div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: ['progress_percent', 'point_user', 'badge_position'],
  data() {
    return {
      point_badge_position: {
        top: this.$q.platform.is.mobile ? '42px' : '25px',
        left: '220px'
      }
    };
  },
  methods: {
    badgePosition(point) {
      // point * 200 - 40
      // min 10 max 140

      const minPos = this.badge_position.width * 0.07;
      const maxPos = this.badge_position.width * 0.62;
      const posCalc = point * this.badge_position.width - 34;

      let pos = minPos;

      if (posCalc > minPos) pos = posCalc;
      if (posCalc > maxPos) pos = maxPos;

      return pos;
    }
  },
  mounted() {
  }
};
</script>

<style>
</style>
