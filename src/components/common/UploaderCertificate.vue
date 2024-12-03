<template>
  <div>
    <div
      class="upload-container"
      style="border-radius: 4px; background-color: #0083c9"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <div
        class="q-pt-sm q-pb-sm q-pl-md q-pr-md text-white row justify-between items-center dragable"
      >
        <div class="column">
          <span class="text-bold">{{ title }}</span>
          <span>
            <span class="text-bold">{{ niceBytes(allFileSize) }}</span> success
            - <span class="text-bold">{{ totalFiles }}</span> files
            <span v-if="isLoading">
              - uploading
              <span class="text-bold">{{
                progressInfos.filter(progressInfo => !progressInfo.error).length
              }}</span>
              files
              <q-spinner-oval v-if="isLoading" size="1.4em" class="q-pl-xs" />
            </span>
          </span>
          <span v-if="showExtensions" class="text-caption">
            {{ allowedExtensions.join(', ') }}
          </span>
        </div>
        <div class="row">
          <div>
            <q-icon
              name="upload_file"
              size="24px"
              class="cursor-pointer q-pr-sm"
              :class="canUpload ? '' : 'disabled'"
              @click="canUpload && $refs.fileUpload.click()"
            />
            <q-tooltip>File upload</q-tooltip>
          </div>
        </div>
      </div>

      <div
        v-for="(progressInfo, index) in progressInfos"
        :key="index"
        class="bg-white q-pl-sm q-pr-sm file-container"
        :class="
          progressInfos.length - 1 === index && 'q-pb-sm file-container--last'
        "
      >
        <div v-if="!progressInfo.error" class="bg-white q-pt-sm">
          <div
            class="rounded-borders q-pt-sm q-pb-sm q-pl-md q-pr-md row justify-between items-center files"
          >
            <div class="column" style="width: 90%">
              <span class="text-bold">{{ progressInfo.fileName }}</span>
              <span>
                {{ niceBytes(progressInfo.fileSize) }} /
                {{ progressInfo.percentage }}%
              </span>
            </div>
            <q-icon
              v-if="progressInfo.percentage < 100"
              name="close"
              size="24px"
              class="cursor-pointer"
              @click="handleCancelUpload(index)"
            />
            <q-linear-progress
              :value="5"
              :indeterminate="progressInfo.percentage < 100"
              style="width: 100%"
            />
          </div>
        </div>
      </div>

      <input
        ref="fileUpload"
        type="file"
        style="display: none"
        :multiple="multiple"
        @change="handleSelectFile"
      />
      <input
        ref="folderUpload"
        type="file"
        style="display: none"
        webkitdirectory
        mozdirectory
        msdirectory
        odirectory
        directory
        multiple
        @change="handleSelectFile"
      />
    </div>

    <div v-if="!isLoading" class="q-pt-xs upload-container" :style="fileInfos.length > 4 && 'height: 300px; max-height: 300px; overflow-y: scroll'">
      <div v-for="(fileInfo, index) in fileInfos" :key="index">
        <div
          class="q-mt-sm q-pt-sm q-pb-sm q-pl-md q-pr-md rounded-borders row justify-between items-center"
          :style="'background-color: #eb1d36; color: white'"
        >
          <div class="row items-center" style="width: 80%">
            <q-icon
              name="warning"
              size="20px"
              class="cursor-pointer q-pr-md"
            />
            <div class="column">
              <span class="text-bold">
                {{ stringSlice(fileInfo.fileName) }}
              </span>
              <span>{{ niceBytes(fileInfo.fileSize) }}</span>
              <span>
                Upload failed - User tidak ditemukan
              </span>
            </div>
          </div>
        </div>
      </div>
    <q-inner-loading :showing="loading">
      <q-spinner-cube size="24px" color="primary" />
    </q-inner-loading>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { fileOriName } from 'src/lib/api';

export default {
  props: {
    endpoint: {
      type: String,
      default: '/upload'
    },
    method: {
      type: String,
      default: 'post'
    },
    title: {
      type: String,
      default: 'Upload files'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    folderUpload: {
      type: Boolean,
      default: false
    },
    dragDrop: {
      type: Boolean,
      default: true
    },
    showUploadFailed: {
      type: Boolean,
      default: false
    },
    showExtensions: {
      type: Boolean,
      default: false
    },
    allowedExtensions: {
      type: Array,
      default: () => [
        'png',
        'jpg',
        'jpeg',
        'docx',
        'xlxs',
        'csv',
        'pdf',
        'txt',
        'zip',
        'rar',
        '7z',
        'pptx',
        'ppt'
      ]
    },
    files: {
      type: Array,
      default: () => []
    },
    extraParams: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['remove-file', 'upload-progress', 'upload-complete'],
  data: () => ({
    url: process.env.QUASAR_API_URL,
    selectedFiles: [],
    progressInfos: [],
    fileInfos: [],
    totalFiles: 0,
    isLoading: false,
    previewIndex: 0,
    previewVisible: false,
    previewImages: [],
    pdfFile: null,
    pdfFilename: null,
    loading: false
  }),
  mounted() {
    this.fileInfos = this.files;
    this.totalFiles = this.files.length;
  },
  computed: {
    canUpload() {
      return this.progressInfos.length === 0;
    },
    allFileSize() {
      const sumFSize = this.fileInfos
        .filter(fileInfo => !fileInfo.error)
        .map(fileInfo => fileInfo.fileSize)
        .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
      return sumFSize;
    }
  },
  watch: {
    fileInfos: {
      handler() {
        this.previewImages = this.fileInfos.map(file => ({ title: file.fileName, src: this.url + file.path }));
      },
      deep: true
    },
    files: {
      handler() {
        this.fileInfos = this.files;
      },
      deep: true
    }
  },
  methods: {
    handleSelectFile(event) {
      this.selectedFiles = Array.from(event.target.files);
      this.handleFilterExtension();
    },
    handleFilterExtension() {
      this.selectedFiles = this.selectedFiles.filter(file =>
        this.allowedExtensions.includes(
          file.name
            .split('.')
            .pop()
            .toLowerCase()
        )
      );
      this.handleUploadFiles();
    },
    handleUploadFiles() {
      this.isLoading = true;
      this.fileInfos = [];
      this.$emit('upload-progress', true);

      const upload = this.selectedFiles.map((file, index) =>
        this.handleUploadToServer(file, index)
      );

      Promise.all(upload).then(response => {
        this.totalFiles += this.progressInfos.filter(progressInfo => !progressInfo.error).length;
        this.progressInfos = [];
        this.isLoading = false;
        this.$emit('upload-progress', false);

        this.$refs.fileUpload.value = '';
        this.$refs.folderUpload.value = '';
        this.$emit('upload-complete', response);
      });
    },
    handleUploadToServer(file, index) {
      this.progressInfos.push({
        percentage: 0,
        fileName: file.name,
        fileSize: file.size,
        preview: false,
        error: false,
        errorMessage: '',
        signalCancel: new AbortController()
      });

      const formData = new FormData();
      formData.append('file[]', file);

      const extraParams = Object.keys(this.extraParams);
      if (extraParams.length > 0) {
        extraParams.map(param => formData.append(param, this.extraParams[param]));
      }

      const _ = this;

      return new Promise(resolve => {
        Axios[this.method](this.endpoint, formData, {
          signal: this.progressInfos[index].signalCancel.signal,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress(event) {
            _.progressInfos[index].percentage = Math.round((100 * event.loaded) / event.total);
          }
        })
          .then(response => {
            // if (response.data.message === 'OK') {
            //   this.fileInfos.push(this.progressInfos[index]);
            //   resolve(response.data.data[0]);
            //
            this.isLoading = false;
            response.data.data.forEach(v => {
              if (v.status !== 'success') {
                this.fileInfos.push(this.progressInfos[index]);
              }
            });
            resolve(response.data.data[0]);
          })
          .catch(error => {
            if (this.progressInfos[index]) {
              this.progressInfos[index].error = true;
              this.progressInfos[index].errorMessage = error.message;
              this.fileInfos.push(this.progressInfos[index]);
              resolve(null);
            }
          });
      });
    },
    handleDragOver(event) {
      event.preventDefault();
      if (this.dragDrop && /dragable/g.test(event.target.className)) {
        event.target.style = 'border-radius: 4px; background-color: #0078aa';
      }
    },
    handleDragLeave(event) {
      event.preventDefault();
      if (this.dragDrop && /dragable/g.test(event.target.className)) {
        event.target.style = 'border-radius: 4px; background-color: #0083c9';
      }
    },
    handleDragEnd(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
      if (this.dragDrop && /dragable/g.test(event.target.className)) {
        event.target.style = 'border-radius: 4px; background-color: #0083c9';
      }

      if (this.dragDrop) {
        this.getAllEntries(event.dataTransfer.items);
        setTimeout(() => {
          this.handleFilterExtension();
        }, 10);
      }
    },
    getAllEntries(dataTransferItemList) {
      const traverseFileTree = (item, path) => {
        if (item.isFile) {
          item.file(file => this.selectedFiles.push(file));
        } else if (item.isDirectory) {
          item.createReader().readEntries(entries => {
            entries.map(entry => traverseFileTree(entry, path.concat(entry.name)));
          });
        }
      };

      const getFileEntries = items => {
        for (let i = 0; i < items.length; i++) {
          traverseFileTree(items[i].webkitGetAsEntry(), '');
        }
      };

      getFileEntries(dataTransferItemList);
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
    openFile(fileInfo) {
      const url = fileInfo.path;
      const name = fileInfo.fileName;
      const params = { url, name };
      fileOriName(params).then(res => {});
      // window.open(`${this.url}${fileInfo.path}`);
    },
    split(fileInfo) {
      return fileInfo.fileName.split('.')[1];
    }
  }
};
</script>

<style>
.upload-container {
  width: 100%;
}
.upload-container .file-container {
  width: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
.upload-container .file-container--last {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.upload-container .file-container .files {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
