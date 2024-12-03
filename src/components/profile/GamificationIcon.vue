<template>
  <div>
    <div
      v-if="isUseBg"
      :class="this.$q.platform.is.mobile ? 'badge-mobile' : 'badge-desktop'"
      :style="{
      backgroundColor: getPaletteColor(getPointConfig(level_name).icon_color+'-2'),
      borderRadius: '50px',
      width: `${size*1.89}px`,
      maxWidth: `${size*1.89}px`,
      height: `${size*1.89}px`,
      maxHeight: `${size*1.89}px`,
      padding: `${size*0.457}px`
    }">
      <q-icon :size="`${size}px`" :style="{color: getPaletteColor(getPointConfig(level_name).icon_color+'-8')}"
              :name="getPointConfig(level_name).icon_name"/>
    </div>
    <q-icon
      v-if="!isUseBg"
      :size="`${size}px`"
      :style="{color: getPaletteColor(getPointConfig(level_name).icon_color+'-8')}"
      :name="getPointConfig(level_name).icon_name"/>
  </div>
</template>

<script>
import { colors } from 'quasar';

const { getPaletteColor } = colors;
export default {
  props: {
    level_name: String,
    size: Number,
    noBg: Boolean
  },
  data() {
    return {
      getPaletteColor,
      isUseBg: false
    };
  },
  methods: {
    getPointConfig(level_name) {
      const config = this.$store.getters['gamification/configByName'](level_name);
      if (!config) return { remark: '', icon_color: '', icon_name: '' };
      return config;
    }
  },
  mounted() {
  },
  watch: {
    noBg: {
      immediate: true,
      deep: true,
      handler(value) {
        this.isUseBg = !value;
      }
    }
  }
};
</script>

