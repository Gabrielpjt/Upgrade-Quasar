<template>
  <q-dialog ref="modal" minimized>
    <q-card>
      <q-card-section class="bg-primary text-white row">
        <div class="text-h6 col">Form {{currentAction}} Permission</div>
        <q-btn class="col-auto q-ml-lg" flat dense round icon="close" v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-input
          class="q-mt-md"
          outlined
          v-model="tempData.name"
          label="Nama"
          @blur="$v.tempData.name.$touch"
          :error="$v.tempData.name.$error"
          error-label="Wajib diisi"
          clearable
          :disable="isDeleted"
          testcafe-tag="name"
        />
        <q-input
          outlined
          v-model="tempData.display_name"
          label="Label"
          @blur="$v.tempData.display_name.$touch"
          :error="$v.tempData.display_name.$error"
          error-label="Wajib diisi"
          clearable
          :disable="isDeleted"
          testcafe-tag="label"
        />
        <q-input
          outlined
          v-model="tempData.description"
          label="Deskripsi"
          @blur="$v.tempData.description.$touch"
          :error="$v.tempData.description.$error"
          error-label="Wajib diisi"
          clearable
          :disable="isDeleted"
          testcafe-tag="description"
        />
      </q-card-section>

      <q-card-section>
        <div class="row q-mt-md justify-end" v-if="mode === 'update'">
          <template v-if="isDeleted">
            <q-btn
              color="primary"
              label="Aktifkan"
              class="q-mr-md"
              @click="confirm"
              :loading="isLoading"
              :disable="isLoading"
            />
          </template>
          <template v-else>
            <q-btn v-close-popup flat label="Batal" :loading="isLoading" :disable="isLoading" />
            <q-btn
              color="negative"
              label="Non-Aktifkan"
              class="q-mr-md"
              @click="confirm"
              :loading="isLoading"
              :disable="isLoading"
            />
            <q-btn
              color="primary"
              label="Ubah"
              class="q-mr-md"
              @click="update"
              :loading="isLoading"
              :disable="isLoading"
            />
          </template>
        </div>
        <div class="row q-mt-md justify-end" v-else>
          <q-btn flat v-close-popup :loading="isLoading" :disable="isLoading" label="Batal" />

          <q-btn
            color="primary"
            label="Tambah"
            class="q-mr-md"
            @click="create"
            :loading="isLoading"
            :disable="isLoading"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { Notify } from 'quasar';
import { required } from 'vuelidate/lib/validators';
import {
  permissionCreate,
  permissionUpdate,
  permissionDelete,
  permissionRestore
} from '../lib/api';

export default {
  props: {
    mode: {
      type: String,
      required: true
    },
    initialData: {
      type: Object
    }
  },
  data() {
    return {
      options: [],
      tempFokus: null,
      tempData: {},
      isLoading: false
    };
  },
  validations: {
    tempData: {
      name: {
        required
      },
      display_name: {
        required
      },
      description: {
        required
      }
    }
  },
  methods: {
    create() {
      this.isLoading = true;
      this.$v.tempData.$touch();

      if (this.$v.tempData.$invalid) {
        Notify.create({
          message: 'Error',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning',
          detail: 'Form tidak valid'
        });
        this.isLoading = false;
      } else {
        const { name, display_name, description } = this.tempData;
        permissionCreate({ name, display_name, description })
          .then(payload => {
            if (!payload.errors) {
              const result = payload.data;

              Notify.create({
                message: 'Success',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'done',
                detail: `Aksi #${result.id} berhasil ditambahkan`
              });

              this.$emit('registerSuccess', result);
              this.$refs.modal.hide();
            }

            this.isLoading = false;
          })
          .catch(error => {
            this.isLoading = false;
          });
      }
    },
    update() {
      this.$v.tempData.$touch();
      this.isLoading = true;

      if (this.$v.tempData.$invalid) {
        Notify.create({
          message: 'Error',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning',
          detail: 'Form tidak valid'
        });
        this.isLoading = false;
      } else {
        const { name, display_name, description } = this.tempData;

        permissionUpdate(this.tempData.id, { name, display_name, description })
          .then(payload => {
            if (!payload.errors) {
              this.tempData = payload.data;

              Notify.create({
                message: 'Success',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'done',
                detail: `Aksi #${this.tempData.id} berhasil di-update`
              });
            }

            this.isLoading = false;
            this.$emit('updateSuccess', this.tempDat);

            this.$refs.modal.hide();
          })
          .catch(error => {
            this.isLoading = false;
          });
      }
    },
    deactivate() {
      this.isLoading = true;
      permissionDelete(this.tempData.id)
        .then(payload => {
          if (!payload.errors) {
            this.tempData = payload.data;

            Notify.create({
              message: 'Success',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'done',
              detail: `Aksi #${this.tempData.id} berhasil di-nonaktifkan`
            });
          }

          this.isLoading = false;
          this.$emit('deleteSuccess', this.tempData);
          this.$refs.modal.hide();
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    activate() {
      this.isLoading = true;

      permissionRestore(this.tempData.id)
        .then(payload => {
          if (!payload.errors) {
            this.tempData = payload.data;

            Notify.create({
              message: 'Success',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'done',
              detail: `Aksi #${this.tempData.id} berhasil di-aktifkan`
            });
          }
          this.isLoading = false;
          this.$emit('updateSuccess', this.tempData);
          this.$refs.modal.hide();
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    start() {
      this.$v.tempData.$reset();
      this.$refs.modal.show();
    },
    confirm() {
      this.$q
        .dialog({
          title: 'Konfirmasi',
          message: `Anda yakin ${
            this.mode === 'update' && this.tempData.deleted_at
              ? 'mengkatifkan'
              : 'menon-aktifkan'
          } #${this.tempData.name}?`,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          if (this.mode === 'update' && !!this.tempData.deleted_at) {
            this.activate();
          } else {
            this.deactivate();
          }
        })
        .onOk(() => {
          return true;
        })
        .onCancel(() => {
          return false;
        })
        .onDismiss(() => {
          return false;
        });
    }
  },
  computed: {
    currentAction() {
      return this.mode === 'create' ? 'Tambah' : 'Ubah';
    },
    isDeleted() {
      return this.mode === 'update' && !!this.tempData.deleted_at;
    }
  },
  watch: {
    tempFokus(value) {
      if (value) {
        this.tempData.id_fokus = value.id;
      }
    },
    initialData(value) {
      this.tempData = { ...value };
      this.tempFokus = value.fokus;
    }
  }
};
</script>

<style>
</style>
