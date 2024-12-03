<template>
  <q-page>
    <div class="row items-center full-width" style="height: 100vh">
      <div class="col column items-center q-px-lg">
        <div
          class="text-h2 text-primary q-mb-lg cursor-pointer"
          @click="$router.push({ name: 'landing' })"
        >
          <!-- {{ appName }} -->
        </div>
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          autoplay
          infinite
          control-color="accent"
          navigation
          padding
          height="50%"
        >
          <q-carousel-slide name="slide1" class="column no-wrap flex-center">
            <div class="text-h5 q-mt-xl text-secondary">
              You are not allowed to access this page
            </div>
            <object
              class="q-mt-xl"
              data="/undraw_Lighthouse_frb8.svg"
              type="image/svg+xml"
              height="250px"
            />
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<style></style>

<script>
export default {
  data() {
    return {
      appName: 'KM Portal',
      slide: 'slide1'
    };
  },
  methods: {}
};
</script>
