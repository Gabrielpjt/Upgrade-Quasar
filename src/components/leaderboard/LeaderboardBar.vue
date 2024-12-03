<template>
  <div class="kmp-header">
    <q-icon :name="data.icon" class="q-mr-sm" size="20px" />
    <span>{{data.title}}</span>
    <q-space />
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
.text-p-color{
  color: #2C8ED3;
}
</style>
