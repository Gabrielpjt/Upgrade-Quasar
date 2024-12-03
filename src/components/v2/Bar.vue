<template>
  <div>
    <q-breadcrumbs gutter="sm">
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          class="kmp-gray-text"
        />
      </template>
      <q-btn dense @click="$router.push({ name: 'v2-library' })" flat class="btn-back q-mr-xs kmp-md-text kmp-bold-text kmp-line-125 kmp-blue-text" icon="keyboard_backspace" label="Back" no-caps />
      <q-breadcrumbs-el @click="$router.push({ name: 'v2-dashboard' })"  class="cursor-pointer btn-home kmp-blue-text kmp-sm-text kmp-bold-text kmp-line-130" icon="home"/>
      <q-breadcrumbs-el class="cursor-pointer link-underscore kmp-gray-text kmp-sm-text kmp-bold-text kmp-line-130" no-caps :label="menu" />
      <q-breadcrumbs-el class="kmp-gray-text kmp-sm-text kmp-normal-text kmp-line-130" no-caps :label="title" />
    </q-breadcrumbs>
  </div>
</template>

<script>

export default {
  props: ['menu', 'title'],
  data () {
    return {
      tab: 'knowledge',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  }
};
</script>
