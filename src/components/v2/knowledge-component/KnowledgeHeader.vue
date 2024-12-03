<template>
  <div class="kmp-new-font">
    <div>
      <div class="row">
        <q-item-section side class="q-pr-sm">
          <Avatar class="cursor-pointer" size="xxl" :picture="'https://cdn.quasar.dev/img/boy-avatar.png'" name="Rahmad Reza"/>
        </q-item-section>
        <q-item-section class="q-pa-none">
          <div class="kmp-sm-text kmp-bold-text kmp-black-text">
            <span class="kmp-line-130 cursor-pointer link-underscore">{{ user.name }}</span>
          </div>
          <div class="kmp-xs-text kmp-normal-text kmp-gray-text">
            <span class="kmp-line-125">Smart Worker IV</span>
          </div>
        </q-item-section>
    </div>
    <div class="row q-mt-sm">
      <q-item-section side >
          <q-avatar class="post-avatar post-avatar1" size="20px">
          <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'" alt="Avatar 1">
        </q-avatar>
        <q-avatar class="post-avatar post-avatar2" size="20px">
          <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'" alt="Avatar 2">
        </q-avatar>
      </q-item-section>
      <q-item-section class="q-pl-md">
        <div class="kmp-sm-text kmp-normal-text kmp-line-130 kmp-black-text q-ml-xs q-mt-xs">+2 Collaborator
        </div>
      </q-item-section>
    </div>
  </div>
  <!-- <div class="row items-center" v-else>
      <q-item-section side class="q-pr-md">
        <Avatar class="cursor-pointer" size="xxxl" :picture="'https://cdn.quasar.dev/img/boy-avatar.png'" name="Rahmad Reza"/>
      </q-item-section>
      <q-item-section class="q-pa-none">
        <div class="">
          <span class="kmp-md-text kmp-bold-text kmp-line-125 kmp-black-text cursor-pointer link-underscore q-mr-sm">Rahmad Reza</span>
          <span class="kmp-sm-text kmp-normal-text kmp-line-130 kmp-gray-text">10 November 2023</span>
        </div>
        <div class="kmp-xs-text kmp-normal-text kmp-gray-text">
          <span class="kmp-line-125">Smart Worker IV</span>
        </div>
      </q-item-section>
      <q-item-section side>
      <div class="col-3 text-right">
        <q-btn-group outline>
          <q-btn size="11px" flat round class="knowledge-detail-sm-button-group desktop-only"><Icon icon="lucide:thumbs-up"  width="24" height="24"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" /></q-btn>
          <q-btn size="11px" flat round class="knowledge-detail-sm-button-group desktop-only q-mx-md"><q-icon size="24px" name="bookmark_border"/></q-btn>
          <q-btn size="11px" flat round class="knowledge-detail-sm-button-group desktop-only"><q-icon size="24px" name="o_share"/></q-btn>
        </q-btn-group>
      </div>
    </q-item-section>
    </div>-->
  </div>
</template>
<script>
import Avatar from 'components/common/Avatar';

export default {
  components: { Avatar },
  props: ['user']
};
</script>

