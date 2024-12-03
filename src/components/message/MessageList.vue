<template>
  <div>
    <div v-for="(item, index) in message_list" :key="'message_list_'+index">
      <q-item
        v-if="item.created_by.id !== item.prev_user_id"
        dense
        class="q-mt-md q-mb-none q-px-sm q-py-none q-mr-sm">
        <q-item-section class="q-ml-xs" avatar style="min-width: 40px!important;">
          <Avatar size="md"
                  :online="(item.created_by.id === userId())?true: !(message.member_list.find(x=>x.id === item.created_by.id && x.is_online) === undefined)"
                  :picture="item.created_by.profile_picture ? `./api${item.created_by.profile_picture}` : ''"
                  :name="item.created_by.name"/>
        </q-item-section>

        <q-item-section>
          <q-item-label class="kmp-font-bold">{{ item.created_by.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>{{ datePost(item.created_at) }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item dense class="q-ma-none q-pa-none q-mt-xs" style="margin-left: 54px; min-height: 10px">
        <q-item-section class="fit column content-start" v-if="item.deleted_at !== null">

          <div
            v-bind:class="item.created_by.id === userId()?'kmp-bg-color-9 kmp-color-7':'kmp-bg-color-10 kmp-color-7'"
            class="q-pa-sm kmp-rounded-2" style="max-width: 408px">
            <q-item-label class="kmp-font-sm-2">
              <span class="text-grey-5"><q-icon name="block" size="16px" /></span>
              <span class="kmp-italic text-grey-5 q-ml-sm">{{item.created_by.id === userId() ? 'You deleted this message': 'This message was deleted'}}</span>
              <span
                class="kmp-font-sm q-ml-md kmp-text-grey-3">{{ timePost(new Date(item.created_at)) }}</span>
            </q-item-label>
          </div>

        </q-item-section>

        <q-item-section class="fit column content-start" v-if="item.deleted_at === null">

          <div v-if="!item.file"
               v-bind:class="item.created_by.id === userId()? isDeleteMessage(item.created_at) ? 'kmp-bg-color-9 kmp-color-7 cursor-pointer':'kmp-bg-color-9 kmp-color-7':'kmp-bg-color-10 kmp-color-7'"
               class="q-pa-sm kmp-rounded-2" style="max-width: 408px;">
              <q-menu v-if="item.created_by.id === userId() && isDeleteMessage(item.created_at)" content-class="kmp-message-submenu"
                      anchor="top right"
                      self="top left"
                      transition-show="jump-right"
                      transition-hide="fade">
                <q-list style="min-width: 100px" dense>
                  <q-item clickable v-close-popup dense class="q-px-sm kmp-rounded-2 bg-red-2" @click="doDeleteMessage(item)">
                    <q-item-section class="kmp-font-sm">Delete message</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup dense class="q-px-sm q-mt-sm kmp-rounded-2 bg-green-2" @click="doCopyMessage(item)">
                    <q-item-section class="kmp-font-sm">Copy</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <q-menu v-if="item.created_by.id !== userId() && isDeleteMessage(item.created_at)" content-class="kmp-message-submenu"
                      anchor="top right"
                      self="top left"
                      transition-show="jump-right"
                      transition-hide="fade">
                <q-list style="min-width: 100px" dense>
                  <q-item clickable v-close-popup dense class="q-px-sm kmp-rounded-2 bg-green-2" @click="doCopyMessage(item)">
                    <q-item-section class="kmp-font-sm">Copy</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            <q-item-label class="kmp-font-sm-2">
              <span>{{ item.text }}</span>
              <span class="kmp-font-sm q-ml-md kmp-text-grey-3">{{ timePost(new Date(item.created_at)) }}</span>
              <span v-if="item.created_by.id === userId()">
                <q-icon class="q-ml-xs" v-bind:name="(item.read_users + '').replace('{','').replace('}','').split(',').length>1?'done_all':'done'" size="16px" />
              </span>
<!--              <q-icon class="kmp-message-list-delete q-ml-xs" name="delete" size="16px" />-->
            </q-item-label>
          </div>

          <div v-if="item.file"
               v-bind:class="item.created_by.id === userId()? isDeleteMessage(item.created_at) ? 'kmp-bg-color-9 kmp-color-7 cursor-pointer':'kmp-bg-color-9 kmp-color-7':'kmp-bg-color-10 kmp-color-7'"
               class="q-pa-none kmp-rounded-2" style="max-width: 408px">
            <File
              class="q-mt-xs q-mx-xs"
              style="min-width: 400px"
              v-if="item.file && item.file.filemime && !['png','jpg','jpeg','gif','mp4','mp3'].includes(item.file.filemime.toLowerCase())"
              :file="{
                filename: item.file.filename,
                filemime: item.file.filemime,
                filesize: item.file.filesize,
                path: url + item.file.path,
                }"
            />
            <div class="kmp-border kmp-picture"
                 v-if="item.file && item.file.filemime && ['png','jpg','jpeg','gif'].includes(item.file.filemime.toLowerCase())"
                 style="width: 400px ; max-width: 400px; height: 300px ; max-height: 300px; border-radius: 8px; overflow: hidden; margin: 4px">
              <div class="q-gutter-md row items-start">
                <q-img :src="url + item.file.path.replace('.mp4','.jpg')" :ratio="4/3" @click="openVideo(item)">
                </q-img>
              </div>
            </div>
            <div class="kmp-border kmp-picture"
                 v-if="item.file && item.file.filemime && ['mp4'].includes(item.file.filemime.toLowerCase())"
                 style="width: 400px ; max-width: 400px; height: 300px ; max-height: 300px; border-radius: 8px; overflow: hidden; margin: 4px">
              <div class="q-gutter-md row items-start">
                <q-img :src="url + item.file.path.replace('.mp4','.jpg')" :ratio="4/3" @click="openVideo(item)">
                  <div class="fit row  justify-center items-center cursor-pointer" style="padding: 10px !important;">
                    <q-icon
                      size="60px"
                      name="play_circle"
                    />
                  </div>
                </q-img>
              </div>
            </div>
            <div class="kmp-border kmp-picture"
                 v-if="item.file && item.file.filemime && ['mp3'].includes(item.file.filemime.toLowerCase())"
                 style="width: 400px ; max-width: 400px; height: 40px ; max-height: 40px; border-radius: 8px; overflow: hidden; margin: 4px">
              <div class="q-gutter-md row items-start bg-black">
                <iframe
                  :src="`./player?id=${item.created_by.id}&src=${item.file.filename_unique}&type=audio`"
                  style="border: none; overflow: hidden; width: 400px; max-width: 400px; height: 40px; max-height: 40px;"
                  allowfullscreen/>
              </div>
            </div>
            <q-item-label class="q-my-sm q-mx-sm kmp-font-sm-2 flex justify-between">
              <q-menu v-if="item.created_by.id === userId() && isDeleteMessage(item.created_at)" content-class="kmp-message-submenu"
                      anchor="top right"
                      self="top left"
                      :offset="[8,10]"
                      transition-show="jump-right"
                      transition-hide="fade">
                <q-list style="min-width: 100px" dense>
                  <q-item clickable v-close-popup dense class="q-px-sm kmp-rounded-2 bg-red-2" @click="doDeleteMessage(item)">
                    <q-item-section class="kmp-font-sm">Delete message</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>

              <span>{{ item.text }}</span>
              <q-space />
              <span
                class="kmp-font-sm q-ml-md kmp-text-grey-3">{{ timePost(new Date(item.created_at)) }}</span>
              <span v-if="item.created_by.id === userId()">
                <q-icon v-bind:name="(item.read_users + '').replace('{','').replace('}','').split(',').length>1?'done_all':'done'" size="16px" class="q-ml-xs" />
              </span>
            </q-item-label>
          </div>

        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>

import { copyToClipboard } from 'quasar';
import File from 'components/common/File';
import Avatar from 'components/common/Avatar';
import { datePost, getFormattedTime, getLoginId } from 'src/lib/helper';
import { deleteMessageById } from 'src/lib/api';

export default {
  props: ['message_list', 'message'],
  components: { File, Avatar },
  data() {
    return {
      deleteMessageById,

      url: process.env.QUASAR_API_URL,
      datePost,
      userId: getLoginId,
      timePost: getFormattedTime
    };
  },
  methods: {
    openVideo(data) {
      this.$emit('onPreview', data);
    },
    isDeleteMessage(created_at) {
      const msg_created = new Date(created_at);
      const current = new Date();
      return current - msg_created < 86400000;
    },
    doDeleteMessage(data) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Anda yakin akan menghapus pesan ini?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteMessageById(data).then();
          this.$store.dispatch('privateMessage/deleteMessageById', data);
        });
    },
    doCopyMessage(data) {
      copyToClipboard(data.text).then(() => {
        console.log(data.text);
        this.$q.notify({
          message: 'Copy Success',
          timeout: 3000,
          color: 'positive',
          icon: 'done',
          position: 'bottom'
        });
      }).catch(() => {
        this.$q.notify({
          message: 'Copy Fail',
          timeout: 3000,
          color: 'negative',
          icon: 'done',
          position: 'bottom'
        });
      });
    }
  },
  mounted() {
  }
};
</script>
