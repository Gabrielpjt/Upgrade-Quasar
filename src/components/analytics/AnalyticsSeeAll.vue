<template>
  <div>
    <div class="text-weight-bold kmp-text-blue" style="font-size: 14px">See All <q-icon name="chevron_right" size="16px"/></div>
  </div>
</template>

<script>

export default {
  name: 'AnalyticsSeeAll',
  props: ['modelValue', 'title'],
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
    return {

    };
  }
};
</script>
