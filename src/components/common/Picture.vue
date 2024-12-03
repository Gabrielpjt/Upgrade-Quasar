<template>
  <div class="kmp-border kmp-picture"
       style="max-width: 400px; min-height: 300px; overflow: hidden">
    <div class="q-gutter-md row items-start">
      <q-img :src="file.path" :ratio="4/3">
        <div class="absolute-full cursor-pointer kmp-picture-preview" @click="openFile(file)" style="padding: 10px !important;">
        </div>
<!--        <div class="absolute-bottom kmp-font-sm kmp-picture-download" style="padding: 10px !important;">-->
<!--          {{ file.filename }}-->
<!--        </div>-->
<!--        <q-icon class="absolute all-pointer-events kmp-picture-download cursor-pointer"-->
<!--                size="20px" name="download" color="white"-->
<!--                @click="downloadFile(file)"-->
<!--                style="bottom: 8px; right: 8px"/>-->
<!--        <q-icon class="absolute all-pointer-events kmp-picture-download cursor-pointer"-->
<!--                size="20px" name="search" color="white"-->
<!--                @click="openFile(file)"-->
<!--                style="bottom: 8px; right: 32px"/>-->
        <!--          <q-tooltip>-->
        <!--            Download picture-->
        <!--          </q-tooltip>-->
        <!--        </q-icon>-->
      </q-img>
    </div>
<!--    <q-dialog v-model="preview">-->
<!--      <q-card class="" style="width: 80vw; max-width: 800px">-->
<!--        <q-card-section class="row items-center kmp-header" style="padding: 8px 16px !important; line-height: unset">-->
<!--&lt;!&ndash;          <div class="">{{file.filename}}</div>&ndash;&gt;-->
<!--          <div class="">-->
<!--            <q-icon size="20px" name="search" color="primary"/>-->
<!--          </div>-->
<!--          <div class="q-ml-sm">Preview</div>-->
<!--          <q-space/>-->
<!--          <q-btn icon="close" size="sm" flat round dense v-close-popup/>-->
<!--        </q-card-section>-->

<!--        <q-card-section class="q-pa-none">-->
<!--          <q-img :src="file.path" contain>-->
<!--          </q-img>-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
    <vue-easy-lightbox
      escDisabled
      moveDisabled
      :visible="preview"
      :imgs="[{title: file.filename, src: file.path}]"
      @hide="preview = !preview"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
import { format } from 'quasar';
import Axios from 'axios';
import VueEasyLightbox from 'vue-easy-lightbox';

export default {
  props: ['file', 'manage'],
  components: { VueEasyLightbox },
  data() {
    return {
      formatQuasar: format,
      is_manage: false,
      preview: false
    };
  },
  methods: {
    // handleDelete(id) {
    //   this.$emit('delete_knowledge', id, id);
    // },
    openFile(file) {
      this.preview = true;
    },
    downloadFile(file) {
      // window.open(url, '_blank');
      Axios.get(file.path, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: response.data.type });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = file.filename;
          link.click();
          URL.revokeObjectURL(link.href);
        }).catch(console.error);
    }
  },
  watch: {
    manage: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.is_manage = value;
      }
    }
  },
  mounted() {
    // console.log(this.file);
  }
};
</script>
