<template>
  <div>
    <q-item
      v-for="(item, index) in menu.options" :key="index"
      class="kmp-menu-left q-py-xs q-my-xs q-px-sm"
      @click="$router.push({ name: item.value })"
      dense clickable v-ripple>
      <q-item-section class="text-capitalize" v-bind:class="item.value === $route.name?'kmp-text-blue-2 text-weight-bold':''">
        <span style="font-size: 16px" class="text-weight-bold">{{item.label}} <q-icon name="chevron_right" size="16px"/></span>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>

export default {
  name: 'AnalyticsMenu',
  props: ['modelValue'],
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
      menu: {
        selected: { value: 'analytics-audience', label: 'Audience' },
        options: [
          { value: 'analytics-audience', label: 'Audience' },
          { value: 'analytics-kmap', label: 'Knowledge Map' },
          { value: 'analytics-content', label: 'Content Platform' },
          { value: 'analytics-channel', label: 'Channel' }
        ],
        onClick: data => {
          this.menu.selected = data;
        }
      }
    };
  }
};
</script>
