<template>
  <div>
    <q-card class="q-mb-md kmp-new-font kmp-background-quiz"
    >
    <q-card-section class="q-pa-none">
      <q-item class="q-px-md q-py-lg">
        <q-item-section>
          <q-item-label class="kmp-black-text kmp-xl-text kmp-very-bold-text kmp-line-120 text-center">
            Ayo Ikuti SMART Quiz!
          </q-item-label>
          <q-item-label class="q-pt-none text-center" style="margin-top: 16px !important;margin-bottom: 16px !important">
          <q-btn no-caps class="kmp-md-text kmp-bold-text kmp-line-125 text-white gadget-button-primary"><span class="q-mr-sm">Start Quiz!</span><Icon icon="mingcute:rocket-line" color="white" width="20" height="20" /></q-btn>
          </q-item-label>
          <q-item-label class="kmp-black-text q-pt-none kmp-sm-text kmp-normal-text kmp-line-130 text-center" style="margin-top: 0px !important">
            Perbarui pengetahuan Anda setiap hari dan dapatkan poinnya!
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  components: { Icon },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      slide: 'style',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  }
};
</script>

<style>
.kmp-background-quiz {
  background: url('../../assets/images/v2/smart-quiz.jpg');
  background-repeat: no-repeat;
  background-position: center left; /* Center the background image */
  background-size: 160%;
  border-radius: var(--Spacing-8, 8px);
  /* width: 280px; */
}
</style>
