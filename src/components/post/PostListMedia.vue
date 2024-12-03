<template>
  <div class="items-start q-mt-sm">
    <div v-if="data.length === 1" class="q-col-gutter-sm row q-pt-sm q-pl-sm">
      <q-img
        :src="pathUrl + data[0].path"
        @click="is_download ? openDialog('slide_image', `${data[0].filename_unique}`) : null"
      >
        <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
               style="top: 8px; right: 8px" @click="removeFile(data[0])"
               v-show="is_delete"
        />
      </q-img>
    </div>
    <div v-if="data.length === 2" class="q-col-gutter-sm row">
      <div v-for="(item, index) in data" :key="index"  class="col-6">
        <q-img
          :src="pathUrl + item.path"
          :ratio="1"
          @click="is_download ? openDialog('slide_image', `${item.filename_unique}`) : null"
        >
          <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
                 style="top: 8px; right: 8px" @click="removeFile(item)"
                 v-show="is_delete"
          />
        </q-img>
      </div>
    </div>
    <div v-if="data.length === 3" class="q-col-gutter-sm row">
      <div v-for="(item, index) in data" :key="index"  class="col-4">
        <q-img
          :src="pathUrl + item.path"
          :ratio="1"
          @click="is_download ? openDialog('slide_image', `${item.filename_unique}`) : null"
        >
          <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
                 style="top: 8px; right: 8px" @click="removeFile(item)"
                 v-show="is_delete"
          />
        </q-img>
      </div>
    </div>
    <div v-if="data.length === 4" class="q-col-gutter-sm row">
      <div v-for="(item, index) in data" :key="index"  class="col-6">
        <q-img
          :src="pathUrl + item.path"
          :ratio="index > 1 ? 4/3 : 1"
          @click="is_download ? openDialog('slide_image', `${item.filename_unique}`) : null"
        >
          <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
                 style="top: 8px; right: 8px" @click="removeFile(item)"
                 v-show="is_delete"
          />
        </q-img>
      </div>
    </div>
    <div v-if="data.length === 5" class="q-col-gutter-sm row">
      <div v-for="(item, index) in data" :key="index" :class="index > 1 ? 'col-4' : 'col-6'">
        <q-img
          :src="pathUrl + item.path"
          :ratio="index > 1 ? 4/3 : 1"
          @click="is_download ? openDialog('slide_image', `${item.filename_unique}`) : null"
        >
          <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
                 style="top: 8px; right: 8px" @click="removeFile(item)"
                 v-show="is_delete"
          />
        </q-img>
      </div>
    </div>
    <div v-if="data.length > 5" class="q-col-gutter-sm row">
      <div v-for="(item, index) in data" :key="index" :class="index > 1 ? 'col-4' : 'col-6'" v-show="index < 5">
        <q-img
          :src="pathUrl + item.path"
          :ratio="index > 1 ? 4/3 : 1"
          @click="openDialog('slide_image', `${item.filename_unique}`)"
        >
          <div class="absolute-full text-h4 flex flex-center" v-show="index === 4">
            {{ `+${data.length - 4}` }}
          </div>
          <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
                 style="top: 8px; right: 8px" @click="removeFile(item)"
                 v-show="is_delete && index < 4"
          />
        </q-img>
      </div>
    </div>
    <div v-show="data_video.length > 0" class="q-pt-sm items-center">
      <div v-for="(item, index) in data_video" :key="`V${index}`">
        <div v-show="index === 0" class="q-mb-xs" style="max-width: 100%">
          <q-media-player
            type="video"
            :sources="item.sources"
            style="height: 300px; text-align: center;"
            dense
          >
            <template v-slot:overlay>
              <div class="text-right">
                <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class=""
                       style="top: 8px; right: 8px" @click="removeFile(item, 'video')"
                       v-show="is_delete"
                />
                <q-btn push round dense color="white" text-color="primary" icon="file_download"
                       style="top: 8px; right: 8px; opacity: 0.30;"
                       @click="openFile(item.path, item.filename)"
                       v-show="is_download && data_video.length === 1"
                />
              </div>
            </template>
          </q-media-player>
        </div>
        <div v-show="index === 1">
          <q-btn class="full-width"
                 label="More Video"
                 @click="openDialog('slide_video', `${item.filename_unique}`)"
          />
        </div>
      </div>
<!--      <q-parallax :height="150" v-for="(item, index) in data_video" :key="index">-->
<!--        <template v-slot:media>-->
<!--          <video width="100%" height="440" poster="https://cdn.quasar.dev/img/polina.jpg" autoplay loop muted>-->
<!--            <source type="video/mp4" src="https://cdn.quasar.dev/img/polina.mp4">-->
<!--          </video>-->
<!--        </template>-->

<!--        <h3 class="text-white">Video</h3>-->
<!--      </q-parallax>-->
    </div>

    <q-dialog v-model="show_image" persistent>
      <q-card :class="$q.platform.is.mobile ? 'image-dialog-mobile' : 'image-dialog'">
        <q-card-section class="q-py-none">
          <div class="row items-center">
            <q-btn v-show="is_download"
              flat dense color="white" text-color="primary" icon="file_download"
              @click="openFile(selected.path, selected.filename)"
            />
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense v-close-popup/>
          </div>
        </q-card-section>
        <q-card-section>
          <q-carousel
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            swipeable
            @input="handleChange($event, 'slide')"
            ref="carousel"
            :class="$q.platform.is.mobile ? 'carousel-post-mobile' : 'carousel-post'"
          >
            <q-carousel-slide v-for="(item, index) in data" :key="index" :name="item.filename_unique" :img-src="pathUrl + item.path"/>

            <template v-slot:control>
              <q-carousel-control
                position="bottom-right"
                :offset="[18, 18]"
                v-show="is_download"
              >
              </q-carousel-control>
              <q-carousel-control
                position="bottom-right"
                :offset="[18, 18]"
                v-show="is_delete"
              >
                <q-btn
                  push round dense color="white" text-color="negative" icon="delete"
                  @click="removeFile(selected, 'slide')"
                />
              </q-carousel-control>
            </template>
          </q-carousel>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="show_video" persistent>
      <q-card style="min-width: 50em" class="q-py-md q-px-sm">
        <q-card-section class="q-py-none">
          <div class="row items-center">
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense v-close-popup/>
          </div>
        </q-card-section>
        <q-card-section>
          <q-carousel
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            @input="handleChange($event, 'slide_video')"
            ref="carousel_video"
          >
            <q-carousel-slide v-for="(item, index) in data_video" :key="index"
                              :name="item.filename_unique"
            >
              <q-media-player
                type="video"
                :sources="item.sources"
                :bottom-controls="true"
                style="width: 630px; height: 380px; text-align: center;"
                dense
              />
            </q-carousel-slide>

            <template v-slot:control>
              <q-carousel-control
                position="bottom-right"
                :offset="[18, 45]"
                v-show="is_download"
              >
                <q-btn
                  push round dense color="white" text-color="primary" icon="file_download"
                  @click="openFile(selected.path, selected.filename)"
                />
              </q-carousel-control>
              <q-carousel-control
                position="bottom-right"
                :offset="[18, 45]"
                v-show="is_delete"
              >
                <q-btn
                  push round dense color="white" text-color="negative" icon="delete"
                  @click="removeFile(selected, 'slide_video')"
                />
              </q-carousel-control>
            </template>
          </q-carousel>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import { deleteList } from 'src/lib/helper';
import { fileDelete, fileOriName } from 'src/lib/api';

export default {
  props: ['list_data', 'download', 'delete'],
  data() {
    return {
      data: [],
      data_video: [],
      pathUrl: process.env.QUASAR_API_URL,
      show_image: false,
      show_video: false,
      slide: null,
      fullscreen: false,
      selected: {},
      is_download: false,
      is_delete: false
    };
  },
  methods: {
    openDialog(dialogName, item) {
      if (dialogName === 'slide_image') {
        this.show_image = true;
        this.slide = item;
        this.handleChange(`${item}`, 'slide');
      } else if (dialogName === 'slide_video') {
        this.show_video = true;
        this.slide = item;
        this.handleChange(`${item}`, 'slide_video');
      }
    },
    handleChange(e, field) {
      if (field === 'slide') {
        this.selected = this.data.find(v => { return v.filename_unique === e; });
      } else if (field === 'slide_video') {
        this.selected = this.data_video.find(v => { return v.filename_unique === e; });
      }
      console.log(this.selected, this.pathUrl);
    },
    openFile(url, name) {
      // window.open(url, '_blank');
      const params = { url, name };
      fileOriName(params).then(res => {});
    },
    removeFile(item, type) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this Media?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (type === undefined) {
          const object = this.data;
          const idx = object.findIndex(v => v.filename_unique === item.filename_unique);
          deleteList(object, idx);
          fileDelete(item.id);
          const objectAll = [...new Set([...object, ...this.data_video])];
          this.$emit('update_list', objectAll);
          if (type === 'slide' && this.show_image) {
            if (object.length > 0) {
              this.$refs.carousel.next();
            } else {
              this.show_image = false;
            }
          }
        }
        if (type === 'video' || type === 'slide_video') {
          const object = this.data_video;
          const idx = object.findIndex(v => v.filename_unique === item.filename_unique);
          deleteList(object, idx);
          fileDelete(item.id);
          const objectAll = [...new Set([...this.data, ...object])];
          this.$emit('update_list', objectAll);
          if (type === 'slide_video' && this.show_video) {
            if (object.length > 0) {
              this.$refs.carousel_video.next();
            } else {
              this.show_video = false;
            }
          }
        }
      });
    }
  },
  watch: {
    list_data: {
      immediate: true,
      deep: true,
      handler(value) {
        this.data = value.filter(f => { return f.file.filemime !== 'mp4'; }).map(v => {
          return v.file;
        });
        this.data_video = value.filter(f => { return f.file.filemime === 'mp4'; }).map(v => {
          return v.file;
        });
        if (this.data_video.length > 0) {
          this.data_video.forEach(h => {
            h.sources = [
              {
                src: `./api/uploads/files/${h.created_by}/${h.filename_unique}`,
                type: 'video/mp4'
              }
            ];
          });
        }
      }
    },
    download: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.is_download = value;
      }
    },
    delete: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.is_delete = value;
      }
    }
  }
};
</script>

<style>
</style>
