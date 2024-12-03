<template>
  <div>
      <div class="bg-white text-black" style="height: 86vh; overflow-y: scroll; margin-top: 60px;">
          <VuePdfEmbed :source="`${host}${item.src.replace('./api','/api').replace('/800-','/')}`"/>
      </div>
  </div>
</template>

<script>

import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';

export default {
  name: 'ViewerPDF',
  props: ['item'],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VuePdfEmbed
  },
  data() {
    return {
      // eslint-disable-next-line no-restricted-globals
      currentUrl: location.toString(),
      // eslint-disable-next-line no-restricted-globals
      host: `${location.protocol}//${location.host}`
    };
  }
};
</script>

<style scoped>

</style>
