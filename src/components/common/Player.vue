<template>
  <div>
    <q-media-player
      v-if="['audio','audioblob'].includes(this.$route.query.type)"
      type="audio"
      :sources="media_sources"
      dense
      preload="none"
    />
    <q-media-player
      v-if="['video','blob'].includes(this.$route.query.type)"
      type="video"
      :sources="media_sources"
      dense
      preload="none"
    />
  </div>
</template>

<script>

export default {
  props: [],
  data() {
    return {
      media_sources: [
        {
          src: this.$route.query.type.includes('blob') ? this.$route.query.src : `./api/uploads/files/${this.$route.query.id}/${this.$route.query.src}`,
          type: this.$route.query.type === 'audio' ? 'audio/mp3' : 'video/mp4'
        }
      ]
    };
  },
  methods: {
    init() {
      // setTimeout(() => {
      //
      // }, 1000);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
body {
  overflow: hidden;
}
</style>
