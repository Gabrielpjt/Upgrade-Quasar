<template>
    <q-item clickable v-ripple
            :class="$q.platform.is.mobile ? 'q-list--bordered q-pa-sm q-my-sm text-12 kmp-file-item kmp-file-text' : 'q-list--bordered q-mb-sm kmp-file-item kmp-file-text'"
    >
<!--      @click="is_manage || is_download ? openfile(file.path, file.filename) : false"-->
      <!-- <div class="col-1 q-mt-xs">
        <q-icon name="picture_as_pdf" size="20px" class="q-mr-sm"/>
      </div> -->
      <div class="col-1 q-mt-xs">
        <q-icon v-if="file.filemime === 'pdf'" name="fas fa-file-pdf" class=""  :size="$q.platform.is.mobile ? '20px' : '30px'" style=""/>
        <q-icon v-else-if="file.filemime === 'docx'" name="fas fa-file-word" class=""  :size="$q.platform.is.mobile ? '20px' : '30px'"
                style=""/>
        <q-icon v-else-if="file.filemime === 'pptx'" name="fas fa-file-powerpoint" class=""  :size="$q.platform.is.mobile ? '20px' : '30px'"
                style=""/>
        <q-icon v-else name="fas fa-file" class="" :size="$q.platform.is.mobile ? '20px' : '30px'"
                style=""/>
      </div>
      <div class="col-10">
        <q-item-section class="q-ml-sm">
          <q-item-label class="kmp-font-medium text-limit">{{file.filename}}</q-item-label>
          <q-item-label class="kmp-font-small">{{this.formatQuasar.humanStorageSize(file.filesize)}}</q-item-label>
        </q-item-section>
      </div>
      <div class="col-1 q-mt-xs text-right">
<!--        <q-icon v-if="!is_manage" name="download" size="20px" class="" @click="openfile(file.path)"/>-->
<!--        <q-icon v-if="is_manage " name="download" size="20px" class="" @click="openfile(file.path)"/>-->
        <q-icon v-if="is_manage || is_download" name="download" size="20px" class="" @click="openfile(file.path, file.filename)"/>
        <q-icon v-if="is_manage_post" name="close" size="20px" class="" @click="handleDelete(item.id)"/>
        <q-icon v-if="is_manage" name="delete" size="20px" class="" @click="handleDelete(item.id)" />
      </div>
    </q-item>
</template>

<script>
import { format } from 'quasar';
import { fileOriName } from 'src/lib/api';

export default {
  props: ['item', 'file', 'manage', 'download', 'manage_post'],
  data() {
    return {
      formatQuasar: format,
      is_manage: false,
      is_manage_post: false,
      is_download: false
    };
  },
  methods: {
    handleDelete(id) {
      this.$emit('delete_knowledge', id, id);
    },
    openfile(url, name) {
      const params = { url, name };
      fileOriName(params).then(res => {});
      // window.open(`${process.env.QUASAR_API_URL}api/file/original?url=${url}&name=${name}`, '_blank');
      // window.open(process.env.QUASAR_API_URL + url, '_blank');
    }
  },
  watch: {
    manage: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.is_manage = value;
      }
    },
    download: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.is_download = value;
      }
    },
    manage_post: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) this.is_manage_post = value;
      }
    }
  },
  mounted() {
  }
};
</script>
