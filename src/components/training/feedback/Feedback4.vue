<template>
  <div>
    <div class="row">
      <div class="col-6 col-xs-12">
        <div class="q-gutter-xs">
          <label class="text-subtitle1">Nama atau Lembaga Penyelenggara <label style="color: red">*</label></label>
          <q-input v-model="form.lembaga_penyelenggara" outlined dense square />
          <div class="instruction italic">Contoh : ACLC atau Lembaga penyelenggara lainnya</div>
        </div>
      </div>
    </div>

    <div v-for="(row, index) in form.rating_star" :key="index">
      <div class="q-pt-md">
        <label class="text-subtitle1">{{ index + 1 }}. {{ row.text }} <label style="color: red">*</label></label>
      </div>
      <q-rating
        v-model="row.value"
        size="2.5em"
        color="#faea29"
        icon="star_border"
        icon-selected="star"
      />
    </div>

    <div class="q-pt-md">
      <label class="text-subtitle1">Saran atau Masukan</label>
    </div>
    <q-input v-model="form.suggestions" type="textarea" outlined dense square rows="5"/>
    <!-- <q-input v-model="form.suggestions" type="textarea" outlined dense square rows="5" :class="this.$q.platform.is.mobile ? 'saran-width-margin-mobile' : 'saran-width-margin-dekstop'"  /> -->
  </div>
</template>

<style>
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
          { id: 1, text: 'Fasilitas Pelatihan', value: 0 },
          { id: 2, text: 'Kebersihan Fasilitas', value: 0 },
          { id: 3, text: 'Konsumsi selama pelatihan', value: 0 },
          { id: 4, text: 'Kesigapan Panitia Pelatihan', value: 0 },
          { id: 5, text: 'Keramahan Panitia Pelatihan', value: 0 }
        ],
        lembaga_penyelenggara: '',
        suggestions: ''
      }
    };
  },
  watch: {
    data() {
      if (this.data && this.data.status === true) {
        this.form = {
          rating_star: this.data.rating_star,
          lembaga_penyelenggara: this.data.lembaga_penyelenggara,
          suggestions: this.data.suggestions
        };
      }
    }
  }
};
</script>
