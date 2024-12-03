<template>
    <q-item v-ripple
            class="q-list--bordered kmp-file-item kmp-file-text kmp-file"
            style="max-width: 400px"
    >
      <div class="col q-mt-xs" style="max-width: 30px">
        <q-icon name="file_copy" size="20px" class="q-mr-sm"/>
      </div>
      <div class="col">
        <q-item-section class="q-ml-sm">
          <q-item-label class="kmp-font-medium">{{file.filename}}</q-item-label>
          <q-item-label class="kmp-font-small">{{this.formatQuasar.humanStorageSize(file.filesize)}}</q-item-label>
        </q-item-section>
      </div>
      <div class="col q-mt-xs text-right kmp-file-download" style="max-width: 18px">
        <q-icon name="download" size="20px" class="cursor-pointer"
                @click="downloadFile(file)" />
      </div>
    </q-item>
</template>

<script>
import { format } from 'quasar';
import Axios from 'axios';

export default {
  props: ['file', 'manage'],
  data() {
    return {
      formatQuasar: format,
      is_manage: false
    };
  },
  methods: {
    // handleDelete(id) {
    //   this.$emit('delete_knowledge', id, id);
    // },
    // openfile(url) {
    //   window.open(process.env.QUASAR_API_URL + url, '_blank');
    // },
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
  }
};
</script>
