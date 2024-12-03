<template>
  <div>
    <apexchart
      v-if="!loading"
      class="q-mx-sm"
      type="donut"
      :width="width"
      :options="data.options"
      :series="data.series"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'AnalyticsChartDonut',
  props: ['modelValue', 'data', 'loading', 'width'],
  emits: ['update:modelValue'],
  computed: {
    dialog_model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  data() {
    return {};
  }
};
</script>
