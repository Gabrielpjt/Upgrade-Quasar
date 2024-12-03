<template>
  <div>
    <div v-if="$q.platform.is.desktop" class="text-weight-bold" style="font-size: 24px">{{title}}</div>
  </div>
</template>

<script>

export default {
  name: 'AnalyticsTitle',
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
