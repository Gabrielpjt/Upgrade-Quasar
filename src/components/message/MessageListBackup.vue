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
        <q-item-section class="fit column content-start">
          <div v-if="!item.file"
               v-bind:class="item.created_by.id === userId()?'kmp-bg-color-9 kmp-color-7':'kmp-bg-color-10 kmp-color-7'"
               class="q-pa-sm kmp-rounded-2" style="max-width: 408px">
            <q-item-label class="kmp-font-sm-2">
              <span>{{ item.text }}</span>
              <span
                class="kmp-font-sm q-ml-md kmp-text-grey-3">{{ timePost(new Date(item.created_at)) }}</span>
            </q-item-label>
          </div>
          <!--                      <q-item-label v-if="item.file" caption>{{item.file.filename}}</q-item-label>-->
          <div v-if="item.file"
               v-bind:class="item.created_by.id === userId()?'kmp-bg-color-9 kmp-color-7':'kmp-bg-color-10 kmp-color-7'"
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
<!--            <Picture-->
<!--              class="q-mt-xs q-mx-xs"-->
<!--              style="min-width: 400px"-->
<!--              v-if="item.file && item.file.filemime && ['png','jpg','jpeg','gif'].includes(item.file.filemime.toLowerCase())"-->
<!--              :file="{-->
<!--                filename: item.file.filename,-->
<!--                filemime: item.file.filemime,-->
<!--                filesize: item.file.filesize,-->
<!--                path: url + item.file.path,-->
<!--                }"-->
<!--            />-->
            <div class="kmp-border kmp-picture"
                 v-if="item.file && item.file.filemime && ['png','jpg','jpeg','gif'].includes(item.file.filemime.toLowerCase())"
                 style="width: 400px ; max-width: 400px; height: 300px ; max-height: 300px; border-radius: 8px; overflow: hidden; margin: 4px">
              <div class="q-gutter-md row items-start">
                <q-img :src="url + item.file.path.replace('.mp4','.jpg')" :ratio="4/3" @click="openVideo(item)">
<!--                  <div class="fit row  justify-center items-center cursor-pointer" style="padding: 10px !important;">-->
<!--                    <q-icon-->
<!--                      size="60px"-->
<!--                      name="play_circle"-->
<!--                    />-->
<!--                  </div>-->
                </q-img>
              </div>
            </div>
            <div class="kmp-border kmp-picture"
                 v-if="item.file && item.file.filemime && ['mp4'].includes(item.file.filemime.toLowerCase())"
                 style="width: 400px ; max-width: 400px; height: 300px ; max-height: 300px; border-radius: 8px; overflow: hidden; margin: 4px">
              <div class="q-gutter-md row items-start">
                <q-img :src="url + item.file.path.replace('.mp4','.jpg')" :ratio="4/3" @click="openVideo(item)">
                  <!--      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" :ratio="4/3">-->

                  <div class="fit row  justify-center items-center cursor-pointer" style="padding: 10px !important;">
                    <q-icon
                      size="60px"
                      name="play_circle"
                    />
                  </div>
<!--                  <div class="absolute-bottom kmp-font-sm kmp-picture-download" style="padding: 10px !important;">-->
<!--                    {{ file.filename }}-->
<!--                  </div>-->
<!--                  <q-icon class="absolute all-pointer-events kmp-picture-download cursor-pointer"-->
<!--                          size="20px" name="download" color="white"-->
<!--                          @click="downloadFile(file)"-->
<!--                          style="bottom: 8px; right: 8px"/>-->
                </q-img>
<!--                <q-media-player-->
<!--                  ref="qmp"-->
<!--                  style="width: 100%"-->
<!--                  type="video" dense preload="none"-->
<!--                  poster="./picture-default.png"-->
<!--                  :bottom-controls="false"-->
<!--                  dark-->
<!--                  hide-settings-btn-->
<!--                  no-controls-->
<!--                  content-height="300"-->
<!--                  content-width="400"-->
<!--                  background-color="#0083C9"-->
<!--                  big-play-button-color="#0083C9"-->
<!--                  :sources="[{-->
<!--                                src: url + item.file.path,-->
<!--                                type: 'audio/mp4'-->
<!--                              }]"-->
<!--                >-->
<!--                  <template v-slot:overlay>-->
<!--                    <div class="kmp-bg-color-3" style="width: 400px; height: 300px">-->
<!--                      aw-->
<!--                    </div>-->
<!--                  </template>-->
<!--                  <template v-slot:play>-->
<!--                    <div class="hidden">-->
<!--                    </div>-->
<!--                  </template>-->
<!--&lt;!&ndash;                  <template v-slot:bigPlayButton>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="hidden">&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  </template>&ndash;&gt;-->
<!--&lt;!&ndash;                  <template v-slot:controls>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="float-right">&ndash;&gt;-->
<!--&lt;!&ndash;                      <q-btn @click="$refs.qmp.toggleFullscreen()" flat icon="fullscreen"></q-btn>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  </template>&ndash;&gt;-->
<!--                </q-media-player>-->
                <!--                            <iframe-->
                <!--                              :src="`./player?id=${item.created_by.id}&src=${item.file.filename_unique}#t=0.1&type=video`"-->
                <!--                              style="border: none; overflow: hidden; width: 400px; max-width: 400px; height: 300px; max-height: 300px;" allowfullscreen />-->
              </div>
            </div>
            <div class="kmp-border kmp-picture"
                 v-if="item.file && item.file.filemime && ['mp3'].includes(item.file.filemime.toLowerCase())"
                 style="width: 400px ; max-width: 400px; height: 40px ; max-height: 40px; border-radius: 8px; overflow: hidden; margin: 4px">
              <div class="q-gutter-md row items-start bg-black">
<!--                <div class="cursor-pointer" style="padding: 4px !important;">-->
<!--                  <q-icon-->
<!--                    size="30px"-->
<!--                    name="play_circle"-->
<!--                  />-->
<!--                </div>-->
<!--                <q-media-player-->
<!--                  style="width: 100%"-->
<!--                  type="audio" dense preload="none"-->
<!--                  :sources="[{-->
<!--                                src: url + item.file.path,-->
<!--                                type: 'audio/mp3'-->
<!--                              }]"-->
<!--                />-->
                <iframe
                  :src="`./player?id=${item.created_by.id}&src=${item.file.filename_unique}&type=audio`"
                  style="border: none; overflow: hidden; width: 400px; max-width: 400px; height: 40px; max-height: 40px;" allowfullscreen />
              </div>
            </div>
            <q-item-label class="q-my-sm q-mx-sm kmp-font-sm-2 flex justify-between">
              <span>{{ item.text }}</span>
              <span
                class="kmp-font-sm q-ml-md kmp-text-grey-3">{{ timePost(new Date(item.created_at)) }}</span>
            </q-item-label>
          </div>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>

import File from 'components/common/File';
// import Picture from 'components/common/Picture';
import Avatar from 'components/common/Avatar';
import { datePost, getFormattedTime, getLoginId } from 'src/lib/helper';

export default {
  props: ['message_list', 'message'],
  components: { File, Avatar },
  data() {
    return {
      url: process.env.QUASAR_API_URL,
      datePost,
      userId: getLoginId,
      timePost: getFormattedTime
    };
  },
  methods: {
    openVideo(data) {
      this.$emit('onPreview', data);
    }
  },
  mounted() {
    // console.log(this.message_list);
  }
};
</script>
