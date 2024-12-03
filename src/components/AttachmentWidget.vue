<template>
  <div class="relative-position">
    <q-list bordered dense separator v-if="attachments && attachments.length > 0">
      <q-item v-for="attachment in attachments" :key="attachment.uuid">
        <q-item-section avatar>
          <div class="row">
            <q-btn
              v-if="isPdf(attachment)"
              class="q-mr-xs"
              icon="remove_red_eye"
              flat
              :color="isDeleted(attachment.uuid) ? 'negative' : 'primary' "
              size="sm"
              round
              dense
              @click="showPdf(attachment)"
            />
            <q-btn
              icon="cloud_download"
              flat
              :color="isDeleted(attachment.uuid) ? 'negative' : 'primary' "
              size="sm"
              round
              dense
              @click="downloadFile(attachment)"
            />
          </div>
        </q-item-section>
        <q-item-section>
          <div :class="isDeleted(attachment.uuid) ? 'text-strike' : ''">{{attachment.baseName}}</div>
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div v-if="isDeleted(attachment.uuid)" class="text-grey">file akan dihapus</div>
          </transition>
        </q-item-section>
        <q-item-section avatar v-if="deletable">
          <q-btn
            v-if="isDeleted(attachment.uuid)"
            flat
            color="positive"
            icon="restore"
            size="sm"
            @click="cancelRemove(attachment.uuid)"
          ></q-btn>
          <q-btn
            v-else
            flat
            color="negative"
            icon="delete"
            size="sm"
            @click="remove(attachment.uuid)"
          ></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
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
import { Notify } from 'quasar';

export default {
  components: {},
  props: {
    attachments: { type: Array },
    deletable: {
      type: Boolean,
      default: true
    },
    getPdfApi: Function,
    downloadApi: Function,
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pdfFile: null,
      pdfFilename: null,
      loading: false
    };
  },
  computed: {
    activeAttachments() {
      return this.attachments.filter(a => this.value.indexOf(a.uuid) < 0);
    },
    removedAttachments() {
      return this.attachments.filter(a => this.value.indexOf(a.uuid) > -1);
    }
  },
  methods: {
    remove(uuid) {
      this.$emit('input', [...this.value, uuid]);
    },
    cancelRemove(uuid) {
      this.$emit(
        'input',
        this.value.filter(r => r !== uuid)
      );
    },
    getRemovedList() {
      return this.value;
    },
    isDeleted(uuid) {
      return this.value.indexOf(uuid) > -1;
    },
    showPdf(attachment) {
      this.loading = true;
      this.getPdfApi(attachment)
        .then(data => {
          const temporaryBlob = new Blob([data], { type: 'application/pdf' });
          this.pdfFile = window.URL.createObjectURL(temporaryBlob);
          this.pdfFilename = attachment.baseName;
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
    downloadFile(attachment) {
      this.loading = true;
      this.downloadApi(attachment)
        .then(response => {
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    isPdf(attachment) {
      const filename = attachment.baseName;

      if (!filename) {
        return false;
      }

      return filename.toLowerCase().endsWith('.pdf');
    }
  }
};
</script>

<style>
</style>
