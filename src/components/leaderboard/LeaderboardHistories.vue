<template>
<span>
  <q-list>
    <span v-for="(item, index) in data.data" :key="index">

      <q-separator spaced v-if="index>0 & separator"/>
      <q-item class="" clickable style="cursor: unset!important;">
<!--        <q-item-section v-if="show_rating" top class="kmp-leaderboard-avatar-1" style="max-width: 24px">-->
<!--          <q-img v-if="item.sort <=3" class="" :src="require(`../../assets/images/champion-${item.sort}.png`)"-->
<!--                 style="max-width: 24px"/>-->
<!--          <q-avatar v-if="item.sort >3" rounded size="24px"-->
<!--                    class="kmp-bg-color-8 text-white kmp-font-bold">{{ item.sort }}</q-avatar>-->
<!--        </q-item-section>-->

<!--        <q-item-section v-if="item.level_icon !== 'trophy'" top avatar class="kmp-leaderboard-avatar-2">-->
<!--          <Avatar size="md" :picture="item.avatar ? `./api${item.avatar}` : ''" :name="item.title"/>-->
<!--        </q-item-section>-->

        <q-item-section>
          <q-item-label class="kmp-font-sm-2 kmp-font-bold text-capitalize">{{getDesc(item)}}</q-item-label>
          <q-item-label class="kmp-font-xs" caption lines="2">{{ item.created_at }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <span v-bind:class="(item.point >0)? 'text-green':'text-red'">{{(item.point >0)? '+':''}}{{item.point}} pts</span>
<!--          <q-badge class="q-mt-sm" v-bind:class="(item.point >0)? 'bg-green':'bg-red'">{{item.point}}</q-badge>-->
        </q-item-section>
      </q-item>

   </span>

  </q-list>
  </span>
</template>

<script>


import { poinDesc } from 'src/lib/helper';

export default {
  name: 'LeaderboardHistories',
  props: ['data', 'separator'],
  data() {
    return {
    };
  },
  methods: {
    getDesc(data) {
      return poinDesc(data);
    }
  }
};
</script>

