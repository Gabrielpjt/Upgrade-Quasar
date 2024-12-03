<template>
  <q-page>
    <div class="flex flex-center column" v-if="!$q.platform.is.mobile">
      <img src="/icons/icon-256x256.png" style="width: 10vw" class="q-mb-xl" />
      <div class="text-h3 text-primary q-mb-lg">
        Selamat datang di
        <span class="text-weight-bolder">Quasar Frontend!</span>
      </div>
      <div class="text-h5 text-weight-thin">
        Veniam irure incididunt officia laboris adipisicing fugiat pariatur amet
        labore aute culpa cillum elit laboris.
      </div>
      <div class="text-h5 text-weight-thin">
        Lorem aute deserunt nostrud commodo tempor amet nostrud et excepteur
        cillum ut exercitation tempor.
      </div>
      <div class="text-h5 text-weight-thin">
        Nostrud ut consequat amet voluptate labore deserunt non labore aute
        tempor tempor fugiat est.
      </div>
      <div class="text-h5 text-weight-thin">
        Amet amet ad anim ut anim nostrud est nulla reprehenderit tempor duis
        sunt in.
      </div>
      <q-btn
        class="q-mt-lg"
        color="primary"
        label="Login"
        size="lg"
        :to="{ name: 'login' }"
      />
    </div>
    <div class="column items-center text-center" v-else>
      <div class="text-h4 text-primary q-my-xl">
        Selamat datang di
        <span class="text-weight-bolder">Quasar Frontend!</span>
      </div>
      <div class="text-h6 text-weight-thin q-mb-xl">
        Proident magna aliqua laboris commodo ex fugiat enim. Amet pariatur
        pariatur culpa anim irure cillum sit esse commodo culpa quis cillum
        voluptate nisi. Culpa aliquip commodo deserunt do cillum qui minim enim
        ut velit excepteur eiusmod tempor. Cillum est voluptate officia
        reprehenderit. Occaecat deserunt cupidatat fugiat culpa dolor ut ad non
        laborum in.
      </div>
      <q-btn
        class="q-mt-lg"
        color="primary"
        label="Login"
        size="lg"
        :to="{ name: 'login' }"
      />
    </div>

    <!-- content -->
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>
