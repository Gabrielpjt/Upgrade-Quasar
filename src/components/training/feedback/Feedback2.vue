<template>
  <div>
    <div class="text-h6">A. Materi Pelatihan</div>
    <hr/>
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
    <!-- <q-input v-model="form.suggestions" type="textarea" outlined dense square rows="5" :class="this.$q.platform.is.mobile ? 'saran-width-margin-mobile' : 'saran-width-margin-dekstop'" /> -->
    <q-input v-model="form.suggestions" type="textarea" outlined dense square rows="5"/>
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
          { id: 1, text: 'Kesesuaian Materi Pembelajaran dengan topik pelatihan', value: 0 },
          { id: 2, text: 'Materi yang diberikan mudah dipahami', value: 0 },
          { id: 3, text: 'Materi pelatihan sesuai kebutuhan pekerjaan saya', value: 0 },
          { id: 4, text: 'Metode Pembelajaran menarik', value: 0 },
          { id: 5, text: 'Kesesuaian metode Pembelajaran dengan materi Pembelajaran', value: 0 }
        ],
        suggestions: ''
      }
    };
  },
  watch: {
    data() {
      this.form = {
        rating_star: this.data.rating_star,
        suggestions: this.data.suggestions
      };
    }
  }
};
</script>
