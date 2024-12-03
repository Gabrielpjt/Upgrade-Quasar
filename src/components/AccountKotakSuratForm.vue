<template>
  <q-dialog ref="modal" minimized>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{currentAction}} Akun Kotak Surat</div>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="tempData.id_user"
          :options="userOption"
          label="Username"
          :disable="isLoading || isLoadingUser || isDeleted"
          :loading="isLoading"
          error-label="Wajib diisi"
          clearable
          use-input
          @filter="filterUser"
          hint="Ketik min 3 karakter"
          @blur="$v.tempData.id_user.$touch"
          :error="$v.tempData.id_user.$error"
          testcafe-tag="username-select"
        >
          <template v-slot:append v-if="isLoadingUser">
            <q-spinner-bars></q-spinner-bars>
          </template>
        </q-select>
        <!-- <q-input
          outlined
          v-model="tempData.id_user"
          label="Nama Media"
          @blur="$v.tempData.id_user.$touch"
          :error="$v.tempData.id_user.$error"
          error-label="Wajib diisi"
          clearable
          :disable="isDeleted"
        />-->
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="tempData.id_group_jabatan"
          :options="jabatanOption"
          label="Jabatan"
          :disable="isLoading || isLoadingJabatan || isDeleted"
          :loading="isLoading"
          error-label="Wajib diisi"
          clearable
          use-input
          @filter="filterJabatan"
          hint="Ketik min 3 karakter"
          @blur="$v.tempData.id_group_jabatan.$touch"
          :error="$v.tempData.id_group_jabatan.$error"
          testcafe-tag="groupjabatan-select"
        >
          <template v-slot:append v-if="isLoadingJabatan">
            <q-spinner-bars></q-spinner-bars>
          </template>
        </q-select>
      </q-card-section>

      <q-card-section>
        Unit kerja >> {{ unitKerjaSelect }}
        <q-tree
          ref="tree"
          :nodes="unitKerja"
          default-expand-all
          node-key="label"
          @lazy-load="unitKerjaLoad"
          :error="$v.tempData.id_unit_kerja.$error"
          error-message="Wajib diisi"
          :disable="isDeleted"
          testcafe-tag="unitkerja-tree"
        >
          <div
            slot="default-header"
            slot-scope="prop"
            class="row items-center"
            testcafe-tag="unitkerja-tree-item"
          >
            <q-icon
              :name="prop.node.icon || 'folder'"
              color="orange"
              size="28px"
              class="q-mr-sm"
              testcafe-tag="unitkerja-expand"
            />
            <div
              class="text-weight-bold text-primary cursor-pointer"
              @click="selectUnit(prop.node)"
            >{{ prop.node.label }}</div>
          </div>
          <template v-slot:append v-if="isLoadingUnit">
            <q-spinner-bars></q-spinner-bars>
          </template>
        </q-tree>
        <q-input
          outlined
          v-model="tempData.id_unit_kerja"
          label="id_unit_kerja"
          @blur="$v.tempData.id_unit_kerja.$touch"
          :error="$v.tempData.id_unit_kerja.$error"
          error-label="Wajib diisi"
          clearable
          :disable="isDeleted"
          style="display:none;"
          testcafe-tag="unitkerja"
        />
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="tempData.role_id"
          multiple
          :options="roleOption"
          use-chips
          label="Role"
          :disable="isLoading || isLoadingRole || isDeleted"
          :loading="isLoading"
          error-label="Wajib diisi"
          @blur="$v.tempData.role_id.$touch"
          :error="$v.tempData.role_id.$error"
          testcafe-tag="role_id"
        >
          <template v-slot:append v-if="isLoadingRole">
            <q-spinner-bars></q-spinner-bars>
          </template>
        </q-select>
      </q-card-section>

      <q-card-section>
        <div class="row q-mt-md" v-if="mode === 'update'">
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
            <q-btn
              color="primary"
              label="Ubah"
              class="q-mr-md"
              @click="update"
              :loading="isLoading"
              :disable="isLoading"
            />
            <q-btn
              color="red"
              label="Non-Aktifkan"
              class="q-mr-md"
              @click="confirm"
              :loading="isLoading"
              :disable="isLoading"
            />
            <q-btn v-close-popup flat label="Batal" :loading="isLoading" :disable="isLoading" />
          </template>
        </div>
        <div class="row q-mt-md" v-else>
          <q-btn
            color="primary"
            label="Tambah"
            class="q-mr-md"
            @click="create"
            :loading="isLoading"
            :disable="isLoading"
          />
          <q-btn flat v-close-popup :loading="isLoading" :disable="isLoading" label="Batal" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { Notify } from 'quasar';
import { required } from 'vuelidate/lib/validators';
import {
  unitKerjaList,
  roleList,
  userList,
  GroupJabatanList,
  accountKotakSuratCreate,
  accountKotakSuratUpdate,
  accountKotakSuratDelete,
  accountKotakSuratRestore
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
  mounted() {
    this.init();
  },
  data() {
    return {
      options: [],
      tempFokus: null,
      tempData: {},
      isLoading: false,
      userOption: [],
      isLoadingUser: false,
      jabatanOption: [],
      isLoadingJabatan: false,
      roleOption: [],
      isLoadingRole: false,
      unitKerja: [],
      isLoadingUnit: false,
      unitKerjaSelect: null
    };
  },
  validations: {
    tempData: {
      id_user: {
        required
      },
      user_old: {},
      id_group_jabatan: {
        required
      },
      id_unit_kerja: {
        required
      },
      role_id: {
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
        accountKotakSuratCreate(this.fetchData())
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
            if (error.response.status === 422) {
              Notify.create({
                message: error.response.data.message,
                timeout: 1000,
                type: 'negative',
                color: 'negative',
                icon: 'error',
                detail: error.response.data
              });
            }
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
        accountKotakSuratUpdate(this.tempData.id, this.fetchData())
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
            this.$emit('updateSuccess', this.tempData);

            this.$refs.modal.hide();
          })
          .catch(error => {
            this.isLoading = false;
            if (error.response.status === 422) {
              Notify.create({
                message: error.response.data.message,
                timeout: 1000,
                type: 'negative',
                color: 'negative',
                icon: 'error',
                detail: error.response.data
              });
            }
          });
      }
    },
    deactivate() {
      this.isLoading = true;
      accountKotakSuratDelete(this.tempData.id)
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
      accountKotakSuratRestore(this.tempData.id)
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
          message: `Anda yakin akan ${
            this.mode === 'update' && !!this.tempData.deleted_at
              ? `mengaktifkan kotak surat #${this.tempData.id_user.label} - ${this.tempData.id_group_jabatan.label}`
              : `menon-aktifkan kotak surat #${this.tempData.id_user.label} - ${this.tempData.id_group_jabatan.label}`
          } ?`,
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
    },
    fetchData() {
      const parseData = {
        id_user: this.tempData.id_user.value,
        user_old: this.tempData.user_old ? this.tempData.user_old : null,
        id_group_jabatan: this.tempData.id_group_jabatan.value,
        id_unit_kerja: this.tempData.id_unit_kerja,
        role_id: this.tempData.role_id.map(c => {
          return c.value;
        })
      };
      return parseData;
    },
    // method form select
    filterUser(val, update, abort) {
      if (val.length < 3) {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.isLoadingUser = true;
        userList({ keyword: needle }).then(response => {
          this.userOption = response.data.map(c => {
            return { label: c.name, value: c.id };
          });
          this.isLoadingUser = false;
        });
      });
    },
    filterJabatan(val, update, abort) {
      if (val.length < 3) {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.isLoadingJabatan = true;
        GroupJabatanList({ keyword: needle }).then(response => {
          this.jabatanOption = response.data.map(c => {
            return { label: c.nama_group, value: c.id };
          });
          this.isLoadingJabatan = false;
        });
      });
    },
    filterRole() {
      this.isLoadingRole = true;
      roleList({ limit: 9999999 }).then(response => {
        this.roleOption = response.data.map(c => {
          return { label: c.display_name, value: c.id };
        });
        this.isLoadingRole = false;
      });
    },
    unitKerjaLoad({ node, key, done, fail }) {
      if (key.indexOf('Lazy load empty') > -1) {
        done([]);
        return;
      }

      unitKerjaList({
        limit: 9999999,
        parent: node.id
      }).then(response => {
        let child = [];
        child = response.data.map(c => {
          return {
            label: `[${c.kode_unit}] ${c.nama_unit}`,
            id: c.id,
            lazy: true,
            metaData: c
          };
        });
        done(child);
      });
    },
    selectUnit(data) {
      this.tempData.id_unit_kerja = data.id;
      this.unitKerjaSelect = data.label;
    },
    init() {
      this.filterRole();
      this.isLoadingUnit = true;
      unitKerjaList({
        limit: 9999999,
        parent: 0
      }).then(response => {
        this.unitKerja = response.data.map(c => {
          return {
            label: `[${c.kode_unit}] ${c.nama_unit}`,
            id: c.id,
            lazy: true,
            metaData: c
          };
        });
        this.isLoadingUnit = true;
      });
    },
    setSelectted() {
      this.tempData.id_user = {
        label: this.tempData.user.name,
        value: this.tempData.user.id
      };
      this.tempData.id_group_jabatan = {
        label: this.tempData.gjab.nama_group,
        value: this.tempData.gjab.id
      };
      this.unitKerjaSelect = this.tempData.unit_kerja.nama_unit;
      this.tempData.user_old = this.tempData.user.id;
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
      if (typeof this.tempData.id !== 'undefined') {
        this.setSelectted();
      }
    }
  }
};
</script>

<style>
</style>
