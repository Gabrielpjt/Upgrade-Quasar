<template>
  <div class="kmp-header">
    <div v-if="$route.name === 'training-detail'">
      <q-icon name="school" @click="$router.push({ name: 'training' })" class="q-mr-sm cursor-pointer" size="20px" />
      <span class="cursor-pointer" @click="$router.push({ name: 'training' })">Training</span>
    </div>
    <div v-if="$route.name === 'training'">
      <q-icon name="school" class="q-mr-sm" size="20px" />
      <span>Training</span>
    </div>
    <div v-if="$route.name === 'training-report'">
      <q-icon name="menu_book" class="q-mr-sm" size="20px" />
      <span>Training Report</span>
    </div>
    <div v-if="$route.name === 'narasumber'">
      <q-icon name="people" class="q-mr-sm" size="20px" />
      <span>Database Narasumber Eksternal</span>
    </div>
    <div v-if="$route.name === 'training-master'">
      <q-icon name="book" class="q-mr-sm" size="20px" />
      <span>Master Training</span>
    </div>

    <q-space />
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
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
