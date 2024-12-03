<template>
  <div>
    <div
      class="q-my-sm q-px-sm rounded-borders row justify-between items-center cursor-pointer"
      style="background-color: #EFF1F4; color: #65738F; height:50px;'"
      @click="open(file, registered)"
      >
      <div class="row items-center" style="width: 80%">
        <div class="col-2 q-mr-xs">
          <q-icon
            :name="fileMime === 'pdf' ? 'picture_as_pdf' : (fileMime === 'jpg' || fileMime === 'png' || fileMime === 'jpeg' || fileMime === 'gif') ? 'image' : 'description'"
            size="20px"
          />
        </div>
        <div class="col">
          <span class="text-bold" style="word-wrap: break-word">
            {{ stringSlice(file.filename) }}
          </span>
        </div>
      </div>
      <div class="row items-center">
        <!-- <div>
          <q-icon
            v-if="fileMime === 'pdf' || fileMime === 'xlsx' ||
            fileMime === 'xls' || fileMime === 'docx' ||
            fileMime === 'doc' || fileMime === 'ppt' ||
            fileMime === 'pptx' || fileMime === 'txt'||
            fileMime === 'csv'"
            name="visibility"
            size="20px"
            class="cursor-pointer q-pr-sm"
            @click="openOfficePdf(file)"
          />
          <q-icon
            v-else
            name="visibility"
            size="20px"
            class="cursor-pointer q-pr-sm"
            @click="onPreview()"
          />
          <q-tooltip>Preview file</q-tooltip>
        </div> -->
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
    <!-- <LightBox
      ref="lightbox"
      :media="[{caption: file.filename, src: url + file.path, thumb: url + file.path}]"
      @hide="preview = !preview"
    ></LightBox> -->
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
import { fileOriName } from 'src/lib/api';
import { Notify } from 'quasar';
// import LightBox from 'vue-image-lightbox';

export default {
  props: ['item', 'file', 'manage', 'registered', 'km_manager'],
  // components: { LightBox },
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
    open(file, registered, km_mananger) {
      if (this.km_manager === true || this.registered === 1) {
        if (this.file.filemime.toLowerCase() === 'xlsx' || this.file.filemime.toLowerCase() === 'xls' || this.file.filemime.toLowerCase() === 'docx' || this.file.filemime.toLowerCase() === 'doc' || this.file.filemime.toLowerCase() === 'ppt' || this.file.filemime.toLowerCase() === 'pptx' || this.file.filemime.toLowerCase() === 'txt' || this.file.filemime.toLowerCase() === 'csv') {
          this.openfile(file);
        } else if (this.file.filemime.toLowerCase() === 'pdf') {
          this.showPdf(file);
        } else {
          this.$emit('input');
        }
      } else {
        this.$q.notify({
          message: 'Maaf, hanya peserta terdaftar dan KM Manager yang bisa melihat file',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      }
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
    },
    onPreview() {
      this.$emit('input');
    },
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
      const sliceLength = 25;
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
    openOfficePdf(url, name) {
      const params = { url, name };
      fileOriName(params).then(res => {});
    }
  }
};
</script>
