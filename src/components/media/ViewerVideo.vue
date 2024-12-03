<template>
  <div class="wrap">
    <video
      ref="videoPlayer"
      class="video-js vjs-big-play-centered"
      playsInline
      webkit-playsinline="true"
    ></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  name: 'VideoPlayer',
  props: ['item'],
  // props: {
  //   options: {
  //     type: Object,
  //     default() {
  //       return {};
  //     }
  //   },
  //   item: {
  //     type: Object,
  //     default() {
  //       return {};
  //     }
  //   }
  // },
  data() {
    return {
      player: null
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      {
        muted: true,
        autoplay: true,
        fluid: true,
        controls: true,
        sources: [
          {
            src: this.item.src,
            type: 'video/mp4'
          }
        ]
      },
      () => {
        // prevent swipe conflict
        // eslint-disable-next-line no-underscore-dangle
        this.player
          .getChild('controlBar')
          .el_.addEventListener('pointerdown', e => e.stopPropagation());
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
