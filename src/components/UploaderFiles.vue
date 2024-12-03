<template>
  <q-uploader
    multiple
    extensions=".jpg, .jpeg, .png, .gif, .doc, .docx, .txt, .xlsx, .xls, .ppt, .pptx, .pdf, .zip"
    :upload-factory="uploadDataDukung"
    ref="files"
    class="q-mb-sm"
    hide-upload-button
    hide-upload-progress
    @finish="submitAnswer"
    auto-expand
    @add="fileAdded"
  />
</template>

<script>
import { Notify } from 'quasar';
import { uploadAttachment } from '../lib/api';

export default {
  data() {
    return {
      data_dukung: [],
      deleted_attachments: [],
      maxFileSize: 10 * 1024 * 1024, // 10 MB
      maxFileUpload: 5
    };
  },
  computed: {
    isMaxDataDukung() {
      if (this.data_dukung && this.data_dukung.length >= this.maxFileUpload) {
        return true;
      }
      return false;
    }
  },
  methods: {
    fileAdded(files) {
      files.forEach(file => {
        // check filesize
        if (file.size >= this.maxFileSize) {
          Notify.create({
            message: `[ ${file.name} ] melebihi batas ${this.maxFileSize} MB`,
            color: 'negative',
            icon: 'error',
            position: 'bottom-right'
          });
        }
      });
    },
    uploadFiles() {
      this.isLoading = true;
      if (this.value.keterangan && this.value.keterangan.length > 10) {
        try {
          const fileQueue = this.$refs.files.data.queue;
          if (!fileQueue || fileQueue.length < 1) {
            this.submitAnswer();
          } else {
            this.$refs.files.upload();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.isLoading = false;
        Notify.create({
          message: 'Kolom keterangan wajib diisi minimal 10 karakter',
          color: 'warning',
          icon: 'warning',
          position: 'bottom-right'
        });
      }
    },
    submitAnswer() {
      const arr_uuid = [];

      if (this.data_dukung) {
        this.data_dukung.forEach(dd => {
          arr_uuid.push(dd.uuid);
        });
      }

      const params = {
        id_survey: this.idSurvey,
        id_target: this.idTarget,
        nilai: this.value.nilai,
        keterangan: this.value.keterangan,
        attachments: arr_uuid,
        deleted_attachments: this.deleted_attachments
      };

      const isUpdate = !!this.idAnswer;

      const submitPromise = isUpdate
        ? this.korsupgahSurveyUpdateAnswer(this.idAnswer, params)
        : this.korsupgahSurveyAnswer(params);

      submitPromise
        .then(res => {
          if (res.success) {
            Notify.create({
              message: `Progress berhasil ${isUpdate ? 'diubah' : 'disimpan'}`,
              color: 'positive',
              icon: 'done',
              position: 'bottom-right'
            });

            if (isUpdate) {
              this.$emit('answerUpdated', res.data.result[0]);
            } else {
              this.$emit('answerCreated', res.data.result[0]);
            }

            this.$refs.files.reset();
            this.isLoading = false;
          }
        })
        .catch(err => {
          this.isLoading = false;
          console.log('[x] Error input tt: ', err);
        });
    },
    uploadDataDukung(file, updateProgress) {
      if (file.size >= this.maxFileSize) {
        Notify.create({
          message: `[ ${file.name} ] melebihi batas ${this.maxFileSize /
            1024 /
            1024} MB`,
          color: 'negative',
          icon: 'error',
          position: 'bottom-right'
        });
        this.isLoading = false;
        return false;
      }

      if (this.isMaxDataDukung) {
        Notify.create({
          message: `Maksimum dokumen yang dapat disimpan adalah ${this.maxFileUpload}`,
          color: 'negative',
          icon: 'error',
          position: 'bottom-right'
        });
        this.isLoading = false;
        return false;
      }

      const bodyFormData = new FormData();
      bodyFormData.append('file', file);

      return uploadAttachment(bodyFormData)
        .then(res => {
          if (res.success) {
            this.data_dukung.push({
              uuid: res.data.result[0].uuid,
              filename: res.data.result[0].filename
            });
          }
          return res;
        })
        .catch(err => {
          console.log('[x] Upload data dukung error : ');
          console.log(err);

          Notify.create({
            message: 'Gagal upload data dukung, coba beberapa saat',
            color: 'negative',
            icon: 'error',
            position: 'bottom-right'
          });
          this.isLoading = false;
        });
    },
    deleteDataDukung(index) {
      const temp = this.data_dukung;
      const deleted = temp.splice(index, 1);

      deleted.forEach(data => {
        this.deleted_attachments.push(data.uuid);
      });
    },
    korsupgahSurveyUpdateAnswer(id, params) {
      console.log('korsupgahSurveyUpdateAnswer 1 >> ', id);
      console.log('korsupgahSurveyUpdateAnswer 2 >> ', params);
    },
    korsupgahSurveyAnswer(params) {
      console.log('korsupgahSurveyAnswer >> ', params);
    }
  }
};
</script>
