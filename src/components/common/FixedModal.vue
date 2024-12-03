<template>
  <q-dialog persistent v-model="internalShow" :maximized="maximizedToggle">
    <q-card :style="maximizedToggle ? `min-width: ${width || '350'}px; height: auto;` : `min-width: ${width || '350'}px;`">
      <q-card-section class="row justify-between items-center">
        <div class="text-h6">{{ title }}</div>
        <div>
          <q-btn flat round color="#4F5A70" :icon="maximizedToggle ? 'close_fullscreen' : 'fullscreen'" size="sm" @click="maximizedToggle = !maximizedToggle" v-if="fullscreen" />
          <q-btn flat round color="#4F5A70" icon="fas fa-times" size="sm" @click="onClose" />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section :style="maximizedToggle ? 'max-height: 100%' : 'max-height: 70vh'" class="scroll">
        <slot />
      </q-card-section>

      <slot name="footer" />
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      maximizedToggle: false,
      internalShow: this.show // Create an internal data property for v-model
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: String,
    width: String,
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose() {
      this.$emit('update:show', false); // Emit update event on close
      this.internalShow = false; // Update internal state
    }
  },
  watch: {
    // Watch for changes in the prop and update the internal data property
    show(newValue) {
      this.internalShow = newValue;
    }
  }
};
</script>
