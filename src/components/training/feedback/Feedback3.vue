<template>
  <div>
    <div class="text-h6">B. Pengajar atau Narasumber</div>
    <hr/>
    <div class="row justify-center q-pt-sm" v-if="isLoading">
      <q-spinner-hourglass color="primary" size="3em" />
    </div>
    <q-list bordered v-else-if="form.rating_star.length > 0">
      <div
        v-for="(row, index) in form.rating_star"
        :key="index"
      >
        <q-expansion-item
          :label="`${row.expert_name} - ${row.topic}`"
          :default-opened="index === 0"
          group="materigroup"
          icon="perm_identity"
        >
          <q-card>
            <q-card-section>
              <div v-for="(subRow, subIndex) in row.rating" :key="subIndex">
                <div>
                  <label class="text-subtitle1">{{ subIndex + 1 }}. {{ subRow.text }} <label style="color: red">*</label></label>
                </div>
                <q-rating
                  v-model="subRow.value"
                  size="2.5em"
                  color="#faea29"
                  icon="star_border"
                  icon-selected="star"
                  class="q-pb-md"
                />
              </div>
              <div class="q-pt-md">
                <label class="text-subtitle1">Saran atau Masukan</label>
                <q-input v-model="row.suggestions" type="textarea" outlined dense square rows="5"/>
                <!-- <q-input v-model="row.suggestions" type="textarea" outlined dense square rows="5" :class="this.$q.platform.is.mobile ? 'saran-width-margin-mobile' : 'saran-width-margin-dekstop'" /> -->
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator v-if="index %2 === 0" />
      </div>
    </q-list>
    <div class="row justify-center q-pt-sm" v-else>
      <div class="text-subtitle1">Belum membuat materi</div>
    </div>
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
import { expertiseTopic } from '../../../lib/api';

const DEFAULT_RATING = [
  { text: 'Ketepatan waktu', value: 0 },
  { text: 'Sikap dan perilaku', value: 0 },
  { text: 'Penguasaan Materi', value: 0 },
  { text: 'Cara Penyampaian', value: 0 },
  { text: 'Metode Pembelajaran', value: 0 }
];

export default {
  props: {
    trainingId: Number,
    data: Object
  },
  data() {
    return {
      isLoading: true,
      form: {
        rating_star: [],
        suggestions: ''
      }
    };
  },
  watch: {
    data() {
      this.getExpertiseTopic();
    }
  },
  methods: {
    getExpertiseTopic() {
      expertiseTopic(this.trainingId)
        .then(response => {
          const { data, message } = response;
          if (message === 'OK') {
            const sortByName = data.sort((a, b) => a.expert_name.localeCompare(b.expert_name));
            this.form.rating_star = sortByName.map(item => ({
              expert_id: item.expert_id,
              expert_name: item.expert_name.toUpperCase(),
              topic: item.topic,
              rating: this.handleData(item).rating,
              suggestions: this.handleData(item).suggestions
            }));
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleData(data) {
      let rating = [
        { text: 'Ketepatan waktu', value: 0 },
        { text: 'Sikap dan perilaku', value: 0 },
        { text: 'Penguasaan Materi', value: 0 },
        { text: 'Cara Penyampaian', value: 0 },
        { text: 'Metode Pembelajaran', value: 0 }
      ];
      let suggestions = '';

      if (data && data.feedback !== null) {
        const filterRatingStar = data.feedback.rating_star.filter(item => data.topic === item.topic && data.expert_name === item.expert_name);
        if (filterRatingStar.length > 0) {
          const filterRating = filterRatingStar[0].rating.filter((item, index) => DEFAULT_RATING[index].text === item.text);
          rating = filterRating;
          suggestions = filterRatingStar[0].suggestions;
        }
      }

      return { rating, suggestions };
    }
  }
};
</script>
