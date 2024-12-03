<template>
    <div v-if="img_header !== null" class="text-center">
      <q-img :src="img_header" contain height="50vh" :class="checkEvent(start_time, end_time, end_date, 'image') === 'past' ? 'img-gray' : ''"  @click="handleClick()"/>
    </div>
</template>

<script>

export default {
  props: ['picture', 'start_time', 'end_date', 'end_time'],
  data() {
    return {
      img_header: this.picture ? process.env.QUASAR_API_URL + this.picture : null,
      d: '',
      today: ''
    };
  },
  methods: {
    getToday() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const seconds = String(today.getSeconds()).padStart(2, '0');
      today = `${yyyy}-${mm}-${dd}`;
      this.today = today;
      this.hours = `${hours}:${minutes}:${seconds}`;
    },
    checkEvent(stime, etime, date, type) {
      let hasil = '';
      if (type === 'image') {
        if (date >= this.today) {
          if (date === this.today && etime !== null && etime <= this.hours) {
            hasil = 'past';
          } else if (date === this.today && etime === null) {
            hasil = 'past';
          } else {
            hasil = 'soon';
          }
        } else {
          hasil = 'past';
        }
      }
      this.d = hasil;
      return hasil;
    },
    handleClick() {
      this.$emit('click_banner');
    }
  },
  watch: {
  },
  mounted() {
    this.getToday();
  }
};
</script>

