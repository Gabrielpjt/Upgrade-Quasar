<template>
  <div>
    <q-card class="q-mb-md kmp-new-font"
    >
    <q-card-section>
      <div class="row justify-between q-mb-md">
      <q-item-label class="kmp-line-125 text-left kmp-bold-text kmp-lg-text kmp-black-text">Get to Know Expert</q-item-label>
      <q-item-label class="kmp-line-125 text-right kmp-sm-text kmp-bold-text kmp-blue-text cursor-pointer link-underscore">See all</q-item-label>
    </div>
    <!-- <div class="row justify-center"> -->
    <!-- <div class="col" style="width: 288px !important;"> -->
    <q-carousel
      v-if="this.expert_list.length != 0"
      v-model="slide_direktorat"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      navigation
      ref="carousel"
      class="no-shadow q-pa-none carousel-expert-gadget"
    >
      <q-carousel-slide :name="'c'+index" class="q-pa-none no-wrap" v-for="(value, index) in this.expert_list"
              :key="index">
        <div class="box-blue-gadget" style="border-radius: 8px;">
          <q-item class="q-pa-sm" >
            <q-item-section side class="q-pr-sm cursor-pointer">
                <Avatar size="xl" :picture="value.user.profile_picture ? `./api${value.user.profile_picture}` : ''" :name="value.user.profile_picture"
                        @click="$router.push({ name: 'profile-detail', params: { id: value.user.id } })"/>
              </q-item-section>

              <q-item-section class="q-pa-none">
                <q-item-label class="kmp-black-text kmp-md-text kmp-bold-text kmp-line-125">{{value.user.name.toUpperCase()}}</q-item-label>
                <q-item-label class="kmp-normal-text kmp-sm-text kmp-black-text  kmp-line-130">{{value.user.unit_kerja.short_name.toUpperCase()}}</q-item-label>
              </q-item-section>

              <q-item-section side class="q-pa-none kmp-black-text text-right">
                <q-item-label class="kmp-xs-text kmp-bold-text kmp-line-125">
                <q-icon size="16px" class="q-mr-xs" :style="{color: getPaletteColor(value.point.icon_color+'-8')}" :name="value.point.icon_name"/> {{ value.point.remark }}
                </q-item-label>
                <q-item-label class="kmp-xs-text kmp-bold-text kmp-line-125" style="margin-top:  0px !important;">
                  {{value.point.point ? value.point.point.toLocaleString() : '0'}} pts
                </q-item-label>
              </q-item-section>
          </q-item>
        </div>
      </q-carousel-slide>
      <!-- <q-carousel-slide name="c2" class="q-pa-none no-wrap" >
        <div class="box-blue-gadget" style="border-radius: 8px;">
          <q-item class="q-pa-sm" >
            <q-item-section side class="q-pr-sm cursor-pointer">
                <q-avatar size="40px">
                  <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'">
                </q-avatar>
              </q-item-section>

                <q-item-section class="q-pa-none">
                  <q-item-label class="kmp-black-text kmp-md-text kmp-bold-text kmp-line-125">Reza Bukan</q-item-label>
                  <q-item-label class="kmp-normal-text kmp-sm-text kmp-black-text  kmp-line-130">Senior Product Manager</q-item-label>
                </q-item-section>
            </q-item>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="c3" class="q-pa-none no-wrap" >
          <div class="box-blue-gadget" style="border-radius: 8px;">
            <q-item class="q-pa-sm" >
              <q-item-section side class="q-pr-sm cursor-pointer">
                  <q-avatar size="40px">
                    <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'">
                  </q-avatar>
                </q-item-section>

              <q-item-section class="q-pa-none">
                <q-item-label class="kmp-black-text kmp-md-text kmp-bold-text kmp-line-125">Reza Bukan</q-item-label>
                <q-item-label class="kmp-normal-text kmp-sm-text kmp-black-text  kmp-line-130">Senior Product Manager</q-item-label>
              </q-item-section>
          </q-item>
        </div>
      </q-carousel-slide> -->
      <!-- Arrow / Panah pada corousel   -->
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
    <q-item-label v-else class="q-py-md kmp-line-125 kmp-md-text text-center kmp-normal-text kmp-gray-1-text">No data can be shown</q-item-label>
    </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { colors } from 'quasar';
import { Icon } from '@iconify/vue2';
import Avatar from '../../components/common/Avatar';

import {
  expertDashboardList
} from '../../lib/api';

const { getPaletteColor } = colors;

export default {
  components: { Icon, Avatar },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      getPaletteColor,
      expert_list: [],
      tab: 'member',
      slide_member: 'c0',
      slide_direktorat: 'c0',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  },
  methods: {
    getListExpertDashboard() {
      expertDashboardList().then(response => {
        const hasil = response.data;
        this.expert_list = hasil;
      });
    }
  },
  mounted() {
    this.getListExpertDashboard();
  }
};
</script>
