<template>
  <div>
    <q-card class="q-mb-md kmp-new-font"
    >
    <q-card-section>
          <div class="row justify-between q-mb-md">
            <q-item-section class="kmp-line-125 text-left kmp-lg-text kmp-bold-text kmp-black-text">Training For Me</q-item-section>
            <q-item-label class="kmp-line-125 text-right kmp-sm-text kmp-bold-text cursor-pointer kmp-blue-text link-underscore">See all</q-item-label>
          </div>
          <div class="row justify-center" style="padding: 0 !important" v-if="events.length !== 0">
              <q-carousel
                v-model="slide"
                transition-prev="scale"
                transition-next="scale"
                swipeable
                navigation
                ref="carousel"
                class="no-shadow q-pa-none carousel-training-gadget"
              >
                <q-carousel-slide class="q-pa-none no-wrap"  v-for="(item, index) in events.slice(0, 3)" :key="index" :name="index">
                  <q-card
                  class="cursor-pointer training-gadget-card no-shadow" style="border: 1px #F5F5F5 solid;">
                    <div class="" style="">
                      <q-img
                        v-if="item.banner!=null && (Date.parse(item.schedule[item.schedule.length - 1].date_start) + 1) < (Date.now() - ( 3600 * 1000 * 24))"
                        :src="url+item.banner"
                        spinner-color="white"
                        style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important; filter: grayscale(100%);"
                      />
                      <q-img
                        v-else-if="item.banner!=null"
                        :src="url+item.banner"
                        spinner-color="white"
                        style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important;"
                      />
                      <q-img
                        v-else-if="(Date.parse(item.schedule[item.schedule.length - 1].date_start) + 1) < (Date.now() - ( 3600 * 1000 * 24))"
                        src="../../assets/images/picture-default-training.png"
                        spinner-color="white"
                        style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important; filter: grayscale(100%);"
                      />
                      <q-img
                        v-else
                        src="../../assets/images/picture-default-training.png"
                        spinner-color="white"
                        style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important;"
                      />
                    </div>
                    <q-card-section>
                      <div class="q-mb-sm kmp-line-125 kmp-md-text kmp-black-text kmp-bold-text">{{ item.name }}</div>
                      <q-badge v-if="item.direktorat_status_name!=null" class="training-gadget-badge-blue kmp-line-125 kmp-normal-text kmp-blue-text q-mb-md" outline :style="{ fontSize: '11px' }">{{ item.direktorat_status_name }}</q-badge>
                      <q-badge v-if="item.direktorat_status_name==null" class="training-gadget-badge-blue kmp-line-125 kmp-normal-text kmp-blue-text q-mb-md" outline :style="{ fontSize: '11px' }">Lintas Unit </q-badge>
                      <div class="q-mb-sm custom-container-training-gadget kmp-gray-text kmp-line-130 kmp-sm-text kmp-bold-text">
                        <div class="custom-icon-training-gadget">
                          <Icon icon="material-symbols:calendar-month" color="#666" width="16" height="16" />
                        </div>
                        <span v-if="parseDate(item.schedule[0].date_start,'MMM') == parseDate(item.schedule[item.schedule.length-1].date_start,'MMM')">
                          {{
                            parseDate(
                              item.schedule[0].date_start,
                              'DD '
                            )
                          }}-
                          {{
                            parseDate(
                              item.schedule[item.schedule.length-1].date_start,
                              ' DD MMM YYYY'
                            )
                          }}
                          </span>
                          <span v-else>
                          {{
                            parseDate(
                              item.schedule[0].date_start,
                              'DD MMM '
                            )
                          }}-
                          {{
                            parseDate(
                              item.schedule[item.schedule.length-1].date_start,
                              ' DD MMM YYYY'
                            )
                          }}
                        </span>
                      </div>
                      <div class="q-mb-md custom-container-training-gadget">
                        <div class="custom-icon-training-gadget">
                          <Icon icon="fluent:pin-12-regular" color="#666" width="16" height="16" />
                        </div>
                        <q-badge class="training-gadget-badge-green kmp-line-125 kmp-normal-text q-mr-sm" outline :style="{ fontSize: '11px' }">{{ item.training_type }}</q-badge>
                        <q-badge class="training-gadget-badge-red kmp-line-125 kmp-normal-text" outline :style="{ fontSize: '11px' }">{{ item.training_method }}</q-badge>
                      </div>
                      <div class="row justify-between">
                        <div class="kmp-xs-text text-left kmp-line-125 kmp-black-text kmp-bold-text q-mt-xs">Kuota Tersedia :</div>
                        <q-badge dense class="training-gadget-badge-grey kmp-line-125 kmp-black-text kmp-bold-text" outline :style="{ fontSize: '11px' }">{{ item.maximun_capacity - item.total_participant }}/{{ item.maximun_capacity }}</q-badge>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-carousel-slide>
                <!-- Arrow atau Panah -->
                <!-- <template v-slot:control>
                  <q-carousel-control
                  position="bottom-left"
                  :offset="[50, 0]"
                  >
                    <q-btn
                      flat dense class="btn-carousel-control-gadget"
                      @click="$refs.carousel.previous()"
                    >
                      <Icon icon="ep:arrow-left" :rotate="4" color="#2c8ed3" width="20" height="30" />
                    </q-btn>
                  </q-carousel-control>

                  <q-carousel-control
                  position="bottom-right"
                  :offset="[50, 0]"
                  >
                    <q-btn
                      flat dense class="btn-carousel-control-gadget"
                      @click="$refs.carousel.next()"
                    >
                      <Icon icon="ep:arrow-left" :rotate="2" color="#2c8ed3" width="20" height="30" />
                    </q-btn>
                  </q-carousel-control>
                </template> -->
                <template v-slot:navigation-icon="{  active, onClick }">
                  <q-btn class="btn-carousel-gadget" v-if="active" flat dense @click="onClick"><Icon icon="pepicons-pop:line-x" color="#2c8ed3" width="30" height="30" :horizontalFlip="true" /></q-btn>
                  <q-btn class="btn-carousel-gadget" v-else style="opacity: 0.2" flat dense @click="onClick"><Icon icon="pepicons-pop:line-x" color="#2c8ed3" width="30" height="30" :horizontalFlip="true" /></q-btn>
                </template>
              </q-carousel>
            <!-- </q-item-section> -->
          </div>
          <div v-else>
            <q-img
              src="../../assets/images/v2/no-training.png"
              spinner-color="white"
              style="border-radius: 8px 8px 0px 0px !important; filter: grayscale(100%);"
            />
          </div>
        </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import moment from 'moment';

import {
  trainingEvents
} from '../../lib/api';

export default {
  components: { Icon },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      events: [],
      slide: 0,
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  },
  methods: {
    getListEvents() {
      trainingEvents().then(response => {
        const hasil = response.data;
        this.events = hasil;
      });
    },
    parseDate(date, format = 'DD MMMM YYYY') {
      return moment(date).format(format);
    }
  },
  mounted() {
    this.getListEvents();
  }
};
</script>

