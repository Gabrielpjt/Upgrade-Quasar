<template>
  <div class="q-pt-md q-pa-none items-start">
    <div class="row q-pb-md">
      <div class="col kmp-font-lg kmp-font-bold"><q-skeleton type="text" width="50%" /></div>
      <div class="col text-right kmp-text-blue-2 kmp-font-md q-pt-xs kmp-font-bold cursor-pointer"
           style="max-width: 50px"><q-skeleton type="text" width="100%" /></div>
    </div>
    <q-card>
      <q-card-section class="q-pa-md">
        <q-skeleton type="text" width="65%" />
        <q-skeleton type="text" width="100%" />
        <q-skeleton type="text" width="35%" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  props: ['data'],
  data() {
    return {};
  },
  mounted() {
  },
  methods: {}
};
</script>

