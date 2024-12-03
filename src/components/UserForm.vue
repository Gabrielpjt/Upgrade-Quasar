<template>
  <q-dialog ref="modal" minimized>
    <q-card>
      <q-card-section class="bg-primary text-white row">
        <div class="text-h6 col">Form {{currentAction}} User</div>
        <q-btn class="col-auto q-ml-lg" flat dense round icon="close" v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-input
          class="q-mt-md"
          outlined
          v-model="tempData.name"
          label="Name"
          @blur="$v.tempData.name.$touch"
          :error="$v.tempData.name.$error"
          error-label="Wajib diisi"
          clearable
          testcafe-tag="tambah-name"
        />
      </q-card-section>

      <q-card-section>
        <q-input
          outlined
          v-model="tempData.email"
          label="E-Mail"
          @blur="$v.tempData.email.$touch"
          :error="$v.tempData.email.$error"
          error-label="Wajib diisi"
          clearable
          testcafe-tag="tambah-email"
        />
      </q-card-section>

      <q-card-section>
        <q-input
          type="password"
          outlined
          v-model="tempData.password"
          label="Password"
          @blur="$v.tempData.password.$touch"
          :error="$v.tempData.password.$error"
          error-label="Wajib diisi"
          clearable
          testcafe-tag="tambah-password"
        />
      </q-card-section>

      <q-card-section>
        <div class="row q-mt-md justify-end" v-if="mode === 'update'">
          <template>
            <q-btn
              flat
              class="q-mr-md"
              v-close-popup
              label="Batal"
              :loading="isLoading"
              :disable="isLoading"
              testcafe-tag="batal"
            />
            <q-btn
              color="primary"
              label="Ubah"
              class="q-mr-md"
              @click="update"
              :loading="isLoading"
              :disable="isLoading"
              testcafe-tag="ubah"
            />
          </template>
        </div>
        <div class="row q-mt-md justify-end" v-else>
          <q-btn
            flat
            class="q-mr-md"
            v-close-popup
            label="Batal"
            :loading="isLoading"
            :disable="isLoading"
            testcafe-tag="batal"
          />
          <q-btn
            color="primary"
            label="Tambah"
            class="q-mr-md"
            @click="create"
            :loading="isLoading"
            :disable="isLoading"
            testcafe-tag="tambah"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { Notify } from 'quasar';
import { required } from 'vuelidate/lib/validators';
import { userCreate, userUpdate, userDelete, userRestore } from '../lib/api';

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
      tempData: {},
      isLoading: false
    };
  },
  validations: {
    tempData: {
      name: {
        required
      },
      email: {
        required
      },
      password: {
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
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning',
          message: 'Form tidak valid'
        });
        this.isLoading = false;
      } else {
        const user = this.tempData;

        userCreate(user)
          .then(payload => {
            if (!payload.errors) {
              const result = payload.data;
              Notify.create({
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'done',
                message: 'User berhasil ditambahkan'
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
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning',
          message: 'Form tidak valid'
        });
        this.isLoading = false;
      } else {
        const userData = {
          id: this.tempData.id,
          name: this.tempData.name,
          email: this.tempData.email,
          password: this.tempData.password
        };
        userUpdate(this.tempData.id, userData)
          .then(payload => {
            if (!payload.errors) {
              this.tempData = payload.data;

              Notify.create({
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'done',
                message: 'User berhasil diubah'
              });
            }

            this.isLoading = false;
            this.$emit('updateSuccess', this.tempData);

            this.$refs.modal.hide();
          })
          .catch(error => {
            this.isLoading = false;
          });
      }
    },
    deactivate() {
      this.isLoading = true;
      userDelete(this.tempData.id)
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
          this.$emit('updateSuccess', this.tempData);
          this.$refs.modal.hide();
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    activate() {
      this.isLoading = true;

      userRestore(this.tempData.id)
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
    }
  },
  computed: {
    currentAction() {
      return this.mode === 'create' ? 'Tambah' : 'Ubah';
    },
    isDeleted() {
      return this.mode === 'update' && this.tempData.deleted_at;
    }
  },
  watch: {
    initialData(value) {
      this.tempData = { ...value };
    }
  }
};
</script>

<style>
</style>
