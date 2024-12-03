<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col text-h6">Detail Role #{{ currentData.id }}</div>
      <div class="col-auto q-ml-md q-pa-sm">
        <q-breadcrumbs separator="---" active-color="secondary">
          <q-breadcrumbs-el icon="home" :to="{ name: 'admin-home'}" />
          <q-breadcrumbs-el label="Role" icon="card_membership" :to="{ name: 'admin-role' }" />
          <q-breadcrumbs-el label="Detail" icon="card_membership" />
        </q-breadcrumbs>
      </div>
    </div>
    <q-card class="q-mt-md">
      <q-card-section>
        <table width="100%">
          <tr>
            <td width="20%">Name</td>
            <td width="10px">:</td>
            <td>{{ currentData.name }}</td>
            <td>
              <span class="float-right">
                <q-btn
                  outline
                  color="amber-10"
                  size="sm"
                  icon="create"
                  @click.prevent.stop="showEditForm(currentData)"
                  testcafe-tag="edit-role"
                ></q-btn>
              </span>
            </td>
          </tr>
          <tr>
            <td width="20%">Display Name</td>
            <td width="10px">:</td>
            <td>{{ currentData.display_name }}</td>
          </tr>
          <tr>
            <td width="20%">description</td>
            <td width="10px">:</td>
            <td>{{ currentData.description }}</td>
          </tr>
        </table>
      </q-card-section>
    </q-card>

    <div class="q-mt-md">
      <div class="row">
        <span class="col text-h6">Daftar Permission</span>
        <q-btn
          class="col-auto"
          outline
          size="sm"
          icon="stars"
          label="Ubah Daftar Permission"
          @click="startSelector(currentData)"
          testcafe-tag="role-permission"
        />
      </div>
      <q-table
        ref="tablePermission"
        class="q-mt-md"
        :grid="$q.screen.xs"
        :data="currentData.permission"
        :columns="permissionColumn"
        row-key="id"
        :filter="permissionFilter"
      >
        <template v-slot:body-cell-action="props">
          <div class="col-auto">
            <q-btn
              flat
              color="primary"
              size="sm"
              icon="remove_red_eye"
              @click="toDetailPermission(props.row)"
              testcafe-tag="detail-role"
            ></q-btn>
          </div>
        </template>
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            clearable
            debounce="300"
            v-model="permissionFilter"
            placeholder="Pencarian"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <div class="q-mt-md">
      <div class="row">
        <span class="col text-h6">Daftar User</span>
      </div>
      <q-table
        ref="userTable"
        class="q-mt-md"
        :grid="$q.screen.xs"
        :data="currentData.user"
        :columns="userColumns"
        row-key="id"
        :filter="userFilter"
      >
        <template v-slot:body-cell-action="props">
          <div class="col-auto">
            <q-btn
              flat
              color="primary"
              size="sm"
              icon="remove_red_eye"
              @click="$router.push({name: 'admin-user-detail', params: { id: props.row.id} })"
            ></q-btn>
          </div>
        </template>
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            clearable
            debounce="300"
            v-model="userFilter"
            placeholder="Pencarian"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <role-form
      ref="form"
      :initialData="currentData"
      :mode="currentMode"
      @registerSuccess="handleSuccess"
      @updateSuccess="handleSuccess"
      @deleteSuccess="$router.push({ name: 'admin-role' })"
    />

    <multiple-selector-modal
      ref="selector"
      :fetch="fetchPermissionList"
      title="Daftar Permission"
      hasSearch
      :columns="permissionModalColumns"
      :initialSelectedItems="initialSelectedItems"
      @confirm="handlePermissionListConfirmed"
    />

    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import RoleForm from 'components/RoleForm';
import MultipleSelectorModal from 'components/MultipleSelectorModal';

import { roleDetail, permissionList, roleSyncPermission } from '../lib/api';

export default {
  components: {
    RoleForm,
    MultipleSelectorModal
  },
  data() {
    return {
      loading: false,
      currentMode: 'update',
      currentData: {},
      permissionFilter: '',
      userFilter: '',
      permissionColumn: [
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
      ],
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left',
          sortable: true
        },
        {
          name: 'name',
          label: 'Nama User',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'unit_kerja',
          label: 'Unit Kerja',
          field: 'unit_kerja',
          align: 'left',
          sortable: true
        },
        {
          name: 'group_jabatan',
          label: 'Group Jabatan',
          field: 'group_jabatan',
          align: 'left',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          field: 'id',
          align: 'center'
        }
      ],
      permissionModalColumns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left'
        },
        {
          name: 'name',
          label: 'Nama',
          field: 'name',
          align: 'left'
        },
        {
          name: 'description',
          label: 'Deskripsi',
          field: 'description',
          align: 'left'
        }
      ],
      userColumns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left'
        },
        {
          name: 'name',
          label: 'Nama',
          field: 'name',
          align: 'left'
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          align: 'left'
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
  methods: {
    fetchPermissionList(params) {
      return permissionList(params);
    },
    handlePermissionListConfirmed(selectedItems) {
      this.loading = true;
      roleSyncPermission({
        role: this.currentData.id,
        permission: selectedItems.map(i => i.id)
      }).then(response => {
        this.loading = false;
        this.init();
      });
    },
    startSelector(data) {
      this.$refs.selector.start();
    },
    init() {
      this.loading = true;
      roleDetail(this.$route.params.id)
        .then(response => {
          this.currentData = response.data;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    showEditForm(data) {
      this.$refs.form.start();
    },
    handleSuccess() {
      this.init();
    },
    showDetailUser(data) {
      this.$router.push({
        name: 'admin-accounts-detail',
        params: {
          id: data.id
        }
      });
    },
    toDetailPermission(data) {
      this.$router.push({
        name: 'admin-permission-detail',
        params: {
          id: data.id
        }
      });
    }
  },
  computed: {
    initialSelectedItems() {
      return this.currentData ? this.currentData.permission : [];
    }
  }
};
</script>

<style>
</style>
