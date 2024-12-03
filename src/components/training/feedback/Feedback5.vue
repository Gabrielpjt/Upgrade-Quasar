<template>
  <div>
    <!-- <div v-for="(row, index) in form.rating_star" :key="index" :class="this.$q.platform.is.mobile ? 'width-margin-mobile' : 'width-margin-dekstop'"> -->
    <div v-for="(row, index) in form.rating_star" :key="index">
      <label class="text-subtitle1">{{ index + 1 }}. {{ row.text }} <u><b>{{ row.time }}</b></u> {{ row.next_text }}<label style="color: red">*</label></label>
      <div class="row items-center q-pl-sm">
        <div class="q-pr-md instruction" style="font-size: 14px !important">1</div>
        <div style="width: 80%">
          <q-slider
            v-model="row.value"
            color="blue"
            label
          />
        </div>
        <div class="q-pl-md instruction" style="font-size: 14px !important">100</div>
      </div>
    </div>

    <div class="q-pt-md">
      <label class="text-subtitle1">Saran atau Masukan</label>
    </div>
    <q-input v-model="form.suggestions" type="textarea" outlined dense square rows="5"/>
    <!-- <q-input v-model="form.suggestions" type="textarea" outlined dense square rows="5" :class="this.$q.platform.is.mobile ? 'saran-width-margin-mobile' : 'saran-width-margin-dekstop'"  /> -->
  </div>
</template>

<style>
.width-margin-dekstop {
  width:50%;
}
.width-margin-mobile {
  width:100%;
}
.saran-width-margin-dekstop {
  width:70%;
}
.saran-width-margin-mobile {
  width:100%;
}
</style>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      form: {
        rating_star: [
          { id: 1, text: 'Saya mengetahui tujuan pelatihan ini', value: 0 },
          { id: 2, text: 'Pelatihan ini penting untuk menunjang pekerjaan saya', value: 0 },
          { id: 3, text: 'Saya merasa membutuhkan pelatihan ini', value: 0 },
          { id: 4, text: 'Pengetahuan dan pemahaman', time: 'sebelum', next_text: 'mengikuti pelatihan', value: 0 },
          { id: 5, text: 'Pengetahuan dan pemahaman', time: 'sesudah', next_text: 'mengikuti pelatihan', value: 0 }
        ],
        suggestions: ''
      }
    };
  },
  watch: {
    data() {
      if (this.data && this.data.status === true) {
        this.form = {
          rating_star: this.data.rating_star,
          suggestions: this.data.suggestions
        };
      }
    }
  }
};
</script>
