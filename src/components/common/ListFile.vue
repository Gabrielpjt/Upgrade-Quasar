<template>
  <div>
    <div
      class="q-mt-sm q-pt-sm q-pb-sm q-pl-md q-pr-md rounded-borders row justify-between items-center"
      :style="
        fileMime === 'pdf'
          ? 'background-color: rgb(252, 56, 97, .2); color: rgb(252, 56, 97)'
          : 'background-color: #e0f2fe; color: #0083c9'
      "
    >
      <div class="row items-center">
        <q-icon
          :name="fileMime === 'pdf' ? 'picture_as_pdf' : 'link'"
          size="20px"
          class="cursor-pointer q-pr-md"/>
        <div class="column">
          <span class="text-bold">
            {{ stringSlice(file.filename) }}
          </span>
          <span>{{ niceBytes(file.filesize) }}</span>
        </div>
      </div>
      <div class="row items-center">
        <div>
          <q-icon
            v-if="fileMime === 'pdf'"
            name="visibility"
            size="20px"
            class="cursor-pointer q-pr-sm"
            @click="showPdf(file)"
          />
          <q-icon
            v-if="fileMime === 'xlsx' ||
            fileMime === 'xls' || fileMime === 'docx' ||
            fileMime === 'doc' || fileMime === 'ppt' ||
            fileMime === 'pptx' || fileMime === 'txt'||
            fileMime === 'csv'"
            name="visibility"
            size="20px"
            class="cursor-pointer q-pr-sm"
            @click="openfile(file)"
          />
          <q-icon
            v-if="fileMime === 'png' || fileMime === 'jpeg' ||
            fileMime === 'jpg' || fileMime === 'gif'"
            name="visibility"
            size="20px"
            class="cursor-pointer q-pr-sm"
            @click="preview = true"
          />
          <q-tooltip>Preview file</q-tooltip>
        </div>
        <div>
          <q-icon
            v-if="is_manage"
            name="download"
            size="20px"
            class="cursor-pointer q-pr-sm"
            @click="openfile(file)"
          />
          <q-tooltip>Download file</q-tooltip>
        </div>
        <div>
          <q-icon
            v-if="is_manage"
            name="delete"
            size="20px"
            class="cursor-pointer"
            @click="handleDelete(item.id)"
          />
          <q-tooltip>Delete file</q-tooltip>
        </div>
      </div>
    </div>
    <vue-easy-lightbox
      escDisabled
      moveDisabled
      :visible="preview"
      :imgs="[{title: file.filename, src: url + file.path}]"
      @hide="preview = !preview"
    ></vue-easy-lightbox>
    <q-dialog ref="pdfDialog">
      <q-card style="width: 75vw; max-width: 75vw">
        <q-card-section class="row">
          <div class="col justify-between">
            <span class="text-h6 text-weight-bold">Pratinjau File</span>
            <span class="q-ml-md">{{pdfFilename}}</span>
          </div>
          <div class="col-auto">
            <q-btn icon="close" v-close-popup flat round />
          </div>
        </q-card-section>
        <q-card-section style="height: 75vh; max-height: 75vh">
          <iframe
            :src="pdfFile"
            type="application/pdf"
            width="100%"
            height="100%"
            style="overflow: auto"
          ></iframe>
        </q-card-section>
        <q-card-section></q-card-section>
      </q-card>
    </q-dialog>
    <q-inner-loading :showing="loading">
      <q-spinner-cube size="24px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import Axios from 'axios';
import VueEasyLightbox from 'vue-easy-lightbox';
import { Notify } from 'quasar';
// import { fileOriName } from 'src/lib/api';

export default {
  props: ['item', 'file', 'manage'],
  components: { VueEasyLightbox },
  data() {
    return {
      url: process.env.QUASAR_API_URL,
      is_manage: false,
      preview: false,
      type: 'office',
      emptyValue: '',
      pdfFile: null,
      pdfFilename: null,
      loading: false
    };
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
  computed: {
    fileMime() {
      return this.file.filemime.toLowerCase();
    }
  },
  methods: {
    handleDelete(id) {
      this.$emit('delete_knowledge', id, id);
    },
    openfile(file) {
      Axios.get(`${this.url}${file.path}`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: response.data.type });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = file.filename;
          link.click();
          URL.revokeObjectURL(link.href);
        }).catch(console.error);
    },
    stringSlice(fileName) {
      const sliceLength = 30;
      return fileName.length > sliceLength
        ? `${fileName.slice(0, sliceLength)}...`
        : fileName;
    },
    niceBytes(x) {
      const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      let l = 0;
      let n = parseInt(x, 10) || 0;
      while (n >= 1024 && ++l) {
        const c = n / 1024;
        n = c;
      }
      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + units[l];
    },
    showPdf(file) {
      Axios.get(`${this.url}${file.path}`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: response.data.type });
          this.pdfFile = URL.createObjectURL(blob);
          this.pdfFilename = file.filename;
          this.loading = false;
          this.$refs.pdfDialog.show();
        })
        .catch(error => {
          Notify.create({
            message: `Error: ${error.message}`,
            timeout: 1000,
            type: 'negative',
            color: 'negative',
            icon: 'warning'
          });
          this.loading = false;
        });
    }
  }
};
</script>
