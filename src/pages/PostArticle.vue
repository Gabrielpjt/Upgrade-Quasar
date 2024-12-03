<template>
  <q-page>
    <div class="row q-pa-none">
      <div class="col">
        <PostArticleCreate />
      </div>
    </div>
  </q-page>
</template>

<script>
import PostArticleCreate from 'components/PostArticleCreate';

export default {
  components: { PostArticleCreate },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>

</style>
