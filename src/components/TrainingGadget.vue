<template>
  <div>
    <q-card class="q-mb-lg kmp-new-font"
    >
    <q-card-section>
          <div class="row justify-between q-mb-md">
            <q-item-section class="gadget-title">Training For Me</q-item-section>
            <q-item-section class="see-all">See all</q-item-section>
          </div>
          <div class="row">
            <!-- <q-item-section>
              <q-card
                class="cursor-pointer training-gadget-card">
                <div class="" style="">
                  <q-img
                    src="../assets/images/quiz-start.png"
                    spinner-color="white"
                    style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important"
                  />
                </div>
                <q-card-section>
                  <div class="q-mb-sm training-gadget-name">Teknik Komunikasi dengan Metode NLP Dalam Interview dan Beracara di Pengadilan</div>
                  <q-badge class="training-gadget-badge-blue q-mb-md" outline :style="{ fontSize: '11px' }">Direktorat Management Informasi </q-badge>
                  <div class="q-mb-sm training-gadget-date"><q-icon name="event" size="16px" class="q-mr-sm"/> 28 Aug - 05 Sep 2023</div>
                  <div class="q-mb-md"><q-icon name="push_pin" size="16px" />
                    <q-badge class="training-gadget-badge-green q-mx-sm" outline :style="{ fontSize: '11px' }">Publik DN</q-badge>
                    <q-badge class="training-gadget-badge-red" outline :style="{ fontSize: '11px' }">Offline</q-badge>
                  </div>
                  <div class="row justify-between">
                    <div class="training-gadget-quota q-mt-xs">Kuota Tersedia :</div>
                    <q-badge dense class="training-gadget-badge-grey" outline :style="{ fontSize: '11px' }">15 / 30</q-badge>
                  </div>
                </q-card-section>
              </q-card>
            </q-item-section> -->
            <!-- <q-item-section> -->
              <q-carousel
                v-model="slide"
                transition-prev="scale"
                transition-next="scale"
                swipeable
                control-color="primary"
                navigation
                arrows
                class="no-shadow q-pa-none carousel-training-gadget"
              >
                <q-carousel-slide name="style" class="q-pa-none no-wrap">
                  <q-card
                  class="cursor-pointer training-gadget-card no-shadow" style="border: 1px #F5F5F5 solid;">
                  <div class="" style="">
                    <q-img
                      src="../assets/images/quiz-start.png"
                      spinner-color="white"
                      style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important"
                    />
                  </div>
                  <q-card-section>
                    <div class="q-mb-sm training-gadget-name">Teknik Komunikasi dengan Metode NLP Dalam Interview dan Beracara di Pengadilan</div>
                    <q-badge class="training-gadget-badge-blue q-mb-md" outline :style="{ fontSize: '11px' }">Direktorat Management Informasi </q-badge>
                    <div class="q-mb-sm training-gadget-date"><q-icon name="event" size="16px" class="q-mr-sm"/> 28 Aug - 05 Sep 2023</div>
                    <div class="q-mb-md"><q-icon name="push_pin" size="16px" />
                      <q-badge class="training-gadget-badge-green q-mx-sm" outline :style="{ fontSize: '11px' }">Publik DN</q-badge>
                      <q-badge class="training-gadget-badge-red" outline :style="{ fontSize: '11px' }">Offline</q-badge>
                    </div>
                    <div class="row justify-between">
                      <div class="training-gadget-quota q-mt-xs">Kuota Tersedia :</div>
                      <q-badge dense class="training-gadget-badge-grey" outline :style="{ fontSize: '11px' }">15 / 30</q-badge>
                    </div>
                  </q-card-section>
                  </q-card>
                </q-carousel-slide>
                <q-carousel-slide name="tv" class="column no-wrap flex-center">
                  <q-icon name="live_tv" size="56px" />
                  <div class="q-mt-md text-center">
                    {{ lorem }}
                  </div>
                </q-carousel-slide>
                <q-carousel-slide name="tv" class="column no-wrap flex-center">
                  <q-icon name="live_tv" size="56px" />
                  <div class="q-mt-md text-center">
                    {{ lorem }}
                  </div>
                </q-carousel-slide>
                <q-carousel-slide name="tv" class="column no-wrap flex-center">
                  <q-icon name="live_tv" size="56px" />
                  <div class="q-mt-md text-center">
                    {{ lorem }}
                  </div>
                </q-carousel-slide>
                <q-carousel-slide name="tv" class="column no-wrap flex-center">
                  <q-icon name="live_tv" size="56px" />
                  <div class="q-mt-md text-center">
                    {{ lorem }}
                  </div>
                </q-carousel-slide>
              </q-carousel>
            <!-- </q-item-section> -->
          </div>
        </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
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
.kmp-text-nama {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #4F5A70;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.kmp-time {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #838FA7;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.text-rep-count {
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 160% */
  text-align: center;
  /* Primary/600 */
  color: #2C8ED3;
  /* Inside Auto Layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 4px;
}

.text-vote-desc {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */
  /* Neutral/400 */
  color: #838FA7;
}

.text-more {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */


  /* Primary/600 */

  color: #2C8ED3;


  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 5px 0px;
}

.poll-container {
  display: flex;
  /*border: 1px solid;*/
}
.poll-col-1 {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.poll-col {
  margin-right: 10px;
  /*border: 1px solid;*/
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 50%;
}
.poll_text_img {
  height: 100px;
  max-width: 180px;
}
.poll-choice {
  background-color: #94D5FD;
  border-radius: 8px;
}
</style>
