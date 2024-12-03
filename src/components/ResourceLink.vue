<template>
  <div>
    <q-btn v-if="id" size="sm" color="primary" :label="label" :to="detailRoute">
      <q-tooltip>
        <div>To {{name}} detail</div>
        <div v-for="(value, key) in object" :key="key">{{key}}: {{value}}</div>
      </q-tooltip>
    </q-btn>
    <span v-else>-</span>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'object', 'pageName'],
  data() {
    return {};
  },
  computed: {
    label() {
      return `${this.name.charAt(0)} #${this.id}`;
    },
    detailRoute() {
      return {
        name: this.pageName,
        params: {
          id: this.id
        }
      };
    }
  }
};
</script>

<style scoped>
</style>
