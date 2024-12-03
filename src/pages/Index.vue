<template>
  <q-page>
    <div v-if="!$q.platform.is.mobile" class="q-pa-xl row items-center">
      <div class="col-7 q-mt-lg">
        <img src="/undraw_just_browsing_m0vg.svg" style="max-width: 25vw" />
      </div>
      <div class="col-5">
        <div class="text-h3">
          Culpa culpa voluptate aliquip elit deserunt dolore amet cillum.
        </div>
        <div class="text-subtitle1 q-mt-lg">
          Id nostrud quis nulla ullamco voluptate amet tempor qui tempor fugiat
          anim exercitation consectetur.Non labore tempor sint esse nostrud
          dolore cillum adipisicing.
        </div>
        <q-btn
          class="q-mt-lg"
          color="primary"
          :label="authenticated ? 'Admin Page' : 'Start Now'"
          size="lg"
          :to="{ name: 'welcome' }"
        />
      </div>
    </div>
    <div v-else class="q-pa-md column items-center">
      <img src="/undraw_just_browsing_m0vg.svg" style="max-width: 70vw" />
      <div class="text-h4 q-mt-md text-center">
        Culpa culpa voluptate aliquip elit deserunt dolore amet cillum.
      </div>
      <div class="text-subtitle1 q-mt-md text-center">
        Aute nostrud mollit cillum non consectetur consequat.Mollit sint cillum
        nulla deserunt laboris et laboris cupidatat adipisicing.
      </div>
      <q-btn
        class="q-mt-lg"
        color="primary"
        :label="authenticated ? 'Admin Page' : 'Start Now'"
        size="lg"
        :to="{ name: 'welcome' }"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  mounted() {},
  computed: {
    authenticated() {
      return this.$store.getters['user/isAuthenticated'];
    }
  }
};
</script>
