<template>
  <q-uploader
    ref="uploader"
    :label="label"
    :factory="uploadFactory"
    @removed="removeAttachment"
    @uploaded="handleUploaded"
    @failed="handleUploadFailed"
    @factory-failed="handleUploadFailed"
    :accept="allowedExtensions"
    auto-upload
    hide-upload-btn
    :multiple="multiple"
    style="width: 100%"
  />
</template>

<script>
import { Notify } from 'quasar';

export default {
  props: {
    uploadApi: {
      type: Function
    },
    removeApi: {
      type: Function
    },
    maxFileSize: {
      type: Number,
      default: 200 * 1024 * 1024 // 200 MB
    },
    maxFileUpload: {
      type: Number,
      default: 5
    },
    label: {
      type: String,
      default: 'Unggah Dokumen'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    allowedExtensions: {
      type: String,
      default:
        '.jpg, .jpeg, .png, .gif, .doc, .docx, .txt, .xlsx, .xls, .ppt, .pptx, .pdf, .zip'
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      uploaded_files: []
    };
  },
  computed: {
    hideUploadButton() {
      return !this.multiple && this.uploaded_files.length > 0;
    }
  },
  methods: {
    handleUploaded(info) {
      const res = JSON.parse(info.xhr.response);

      if (!res.data || res.error) {
        return;
      }

      this.uploaded_files.push(res.data);

      this.$emit('input', this.uploaded_files);
    },
    handleUploadFailed(err, files) {
      let errorMessage = 'Gagal upload file, coba beberapa saat lagi';

      if (err && err.xhr.response) {
        try {
          const response = JSON.parse(err.xhr.response);
          if (response.message) {
            errorMessage = response.message;
          }
        } catch (error) {
          console.err(error);
        }
      }
      Notify.create({
        message: errorMessage,
        color: 'negative',
        icon: 'error'
      });
    },
    uploadFactory(files) {
      if (files.length > this.maxFileUpload) {
        Notify.create({
          message: `Maksimum dokumen yang dapat disimpan adalah ${this.maxFileUpload}`,
          color: 'negative',
          icon: 'error'
        });
        return new Promise((resolve, reject) =>
          reject('Ukuran dokumen melebihi batas yang telah ditetapkan')
        );
      }

      for (let i = 0; i < files.length; i++) {
        if (files[i].size >= this.maxFileSize) {
          Notify.create({
            message: `[ ${files[i].name} ] melebihi batas ${this.maxFileSize /
              1024 /
              1024} MB`,
            color: 'negative',
            icon: 'error'
          });
          throw new Error('Melebihi batas');
        }
      }

      return this.uploadApi(files);
    },
    removeAttachment(files) {
      let qquuid = '';
      files.forEach(c => {
        qquuid = this.uploaded_files.filter(a => {
          return a.originalName === c.name;
        });
        if (qquuid.length > 0) {
          this.removeApi({ qquuid: qquuid[0].uuid })
            .then(res => {
              this.uploaded_files = this.uploaded_files.filter(a => {
                return a.originalName !== c.name;
              });
              Notify.create({
                message: 'File berhasil di hapus',
                type: 'positive',
                color: 'positive',
                icon: 'done'
              });
            })
            .catch(err => {
              Notify.create({
                message: 'Gagal hapus file, coba beberapa saat',
                color: 'negative',
                icon: 'error'
              });
            });
        }
      });
    },
    getUploadedFiles() {
      return this.uploaded_files;
    },
    isUploading() {
      return this.$refs.uploader.isUploading;
    },
    reset() {
      this.uploaded_files = [];
      this.$refs.uploader.reset();
    }
  }
};
</script>

<style>
</style>
