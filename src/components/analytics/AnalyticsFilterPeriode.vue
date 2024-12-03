<template>
  <div>
    <span class="cursor-pointer kmp-text-blue-2 text-weight-bold" style="font-size: 16px">
      {{ filter.selected.label }}
      <span style="font-weight: normal !important;font-size: .9em"
      >
<!--        v-if="filter.selected.value === 'c'"-->
        ({{date.formatDate(new Date(filter.calendar.data_sql.from), 'D MMM YYYY')}} - {{date.formatDate(new Date(filter.calendar.data_sql.to), 'D MMM YYYY')}})
      </span>
      <q-icon name="expand_more" size="16px"/>
    </span>
    <q-popup-proxy content-style="border-radius: 8px; width: 290px" max-height="600px" @hide="filter.onHide()">
      <div class="text-weight-bold q-mt-md q-mb-xs q-ml-md kmp-font-lg">Date Range</div>
      <q-list dense class="q-mb-sm">
        <q-item clickable v-ripple v-for="(item, index) in filter.options" :key="index"
                @click="filter.onClick(item)">
          <q-item-section>{{ item.label }}</q-item-section>
          <q-item-section side v-if="item.value === filter.selected_tmp.value">
            <q-icon color="primary" name="done" size="18px"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator inset v-if="filter.calendar.show"/>
      <q-date
        v-if="filter.calendar.show"
        v-model="filter.calendar.data"
        minimal flat range
      />
      <q-btn class="q-ml-md" label="Save" no-caps unelevated v-close-popup color="primary" @click="filter.onSubmit()"/>
      <div class="q-mb-md"/>
    </q-popup-proxy>
  </div>
</template>

<script>

import { date } from 'quasar';

export default {
  name: 'AnalyticsFilterPeriode',
  props: ['modelValue', 'filter'],
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
      date
    };
  }
};
</script>
