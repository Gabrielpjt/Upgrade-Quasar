<template>
  <div>
    <div class="text-weight-bold" style="font-size: 14px">{{title}}</div>
  </div>
</template>

<script>

export default {
  name: 'AnalyticsCardTitle',
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
