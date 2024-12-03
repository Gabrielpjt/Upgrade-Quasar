<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col text-h6">Detail User #{{ currentData.id }}</div>
      <div class="col-auto q-ml-md q-pa-sm">
        <q-breadcrumbs separator="---" active-color="secondary">
          <q-breadcrumbs-el icon="home" />
          <q-breadcrumbs-el
            label="User"
            :to="{ name: 'admin-user' }"
            icon="person"
            class="cursor-pointer"
          />
          <q-breadcrumbs-el label="Detail User" icon="person" />
        </q-breadcrumbs>
      </div>
    </div>

    <!-- content -->
    <q-card class="q-mt-md">
      <q-card-section>
        <table width="100%">
          <tr>
            <td width="20%">Name</td>
            <td width="10px">:</td>
            <td>{{ currentData.name }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{{ currentData.email }}</td>
          </tr>
          <tr>
            <td>Province</td>
            <td>:</td>
            <td>{{ currentData.province ? currentData.province.province_name : '-' }}</td>
          </tr>
        </table>
      </q-card-section>
    </q-card>

    <div class="q-mt-md">
      <div class="row">
        <span class="col text-h6">Daftar Role</span>
        <q-btn
          class="col-auto"
          outline
          size="sm"
          icon="stars"
          label="Ubah Daftar Roles"
          @click="$refs.selector.start();"
          testcafe-tag="role-permission"
        />
      </div>
      <q-table
        class="q-mt-md"
        :grid="$q.screen.xs"
        :data="currentData.roles"
        :columns="columnRole"
        row-key="id"
        :filter="roleFilter"
      >
        <!-- Mengganti slot dan slot-scope dengan v-slot -->
        <template v-slot:body-cell-action="props">
          <div class="col-auto">
            <q-btn
              class="q-ml-md"
              flat
              color="primary"
              size="sm"
              icon="remove_red_eye"
              @click="toDetailRole(props.row)"
            ></q-btn>
          </div>
        </template>
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            clearable
            debounce="300"
            v-model="roleFilter"
            placeholder="Pencarian"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <User-Form
      ref="userForm"
      :initialData="currentData"
      :mode="currentMode"
      @registerSuccess="handleSuccess"
      @updateSuccess="handleSuccess"
    />
    <multiple-selector-modal
      ref="selector"
      :fetch="fetchRoleList"
      title="Daftar Role"
      hasSearch
      :columns="columnRole"
      :initialSelectedItems="initialSelectedItems"
      @confirm="handleRoleListConfirmed"
    />
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>


<script>
import UserForm from 'components/UserForm';
import { Notify } from 'quasar';
import MultipleSelectorModal from 'components/MultipleSelectorModal';
import {
  userDelete,
  userRestore,
  userDetail,
  userSyncRole,
  roleList
} from '../lib/api';

export default {
  components: {
    UserForm,
    MultipleSelectorModal
  },
  data() {
    return {
      loading: false,
      currentData: {},
      currentMode: 'create',
      roleFilter: '',
      columnRole: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left',
          sortable: true
        },
        {
          name: 'name',
          label: 'Nama',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'display_name',
          label: 'Label',
          field: 'display_name',
          align: 'left',
          sortable: true
        },
        {
          name: 'description',
          label: 'Deskripsi',
          field: 'description',
          align: 'left',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          field: 'id',
          align: 'left'
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    initialSelectedItems() {
      return this.currentData ? this.currentData.role : [];
    }
  },
  methods: {
    handleRoleListConfirmed(selectedItems) {
      this.loading = true;
      userSyncRole({
        user: this.currentData.id,
        roles: selectedItems.map(i => i.id)
      }).then(response => {
        this.init();
        this.loading = false;
      });
    },
    fetchRoleList(params) {
      return roleList(params);
    },
    showEditForm(data) {
      this.currentData = data;
      this.currentMode = 'update';
      this.$refs.userForm.start();
    },
    deleteItMe(data) {
      this.$q
        .dialog({
          title: 'Konfirmasi',
          message: 'Anda yakin untuk meng nonaktifkan Data User ini ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.loading = true;
          userDelete(data.id)
            .then(payload => {
              this.loading = false;
              if (!payload.errors) {
                Notify.create({
                  timeout: 1000,
                  type: 'positive',
                  color: 'positive',
                  icon: 'done',
                  message: 'Data user berhasil dinon-aktifkan'
                });

                this.$router.push({ name: 'admin-user' });
              }
            })
            .catch(error => {
              this.loading = false;
            });
        })
        .onCancel(() => {});
    },
    restoreItMe(data) {
      this.$q
        .dialog({
          title: 'Konfirmasi',
          message: 'Anda yakin untuk mengaktifkan kembali Data User ini ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.loading = false;
          userRestore(data.id)
            .then(payload => {
              this.loading = true;
              if (!payload.errors) {
                console.log(payload);
                Notify.create({
                  timeout: 1000,
                  type: 'positive',
                  color: 'positive',
                  icon: 'done',
                  message: 'Data user berhasil diaktifkan kembali'
                });

                this.handleSuccess();
              }
            })
            .catch(error => {
              this.loading = false;
            });
        })
        .onCancel(() => {});
    },
    handleSuccess() {
      this.$refs.table.reset();
    },
    init() {
      this.loading = true;
      userDetail(this.$route.params.id)
        .then(response => {
          this.currentData = response.data;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    toDetailRole(data) {
      this.$router.push({
        name: 'admin-role-detail',
        params: {
          id: data.id
        }
      });
    }
  }
};
</script>

<style>
</style>
