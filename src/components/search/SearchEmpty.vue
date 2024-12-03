<template>
  <div>
    <div class="text-center">
      <q-img class="q-mt-xl q-px-xl" src="../../assets/images/search-not-found.png" style="max-width: 600px" />
      <div class="kmp-font-lg kmp-font-bold text-center q-mt-lg">Search Not Found</div>
      <div class="kmp-font-md text-center q-mb-lg">We couldn't find "{{keyword}}", please try another keyword</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: ['keyword'],
  methods: {
    resetFilter () {
      this.filter = '';
      this.$refs.filter.focus();
    }
  }
};
</script>

