<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col text-h6">Roles</div>
      <div class="col-auto q-ml-md q-pa-sm">
        <q-breadcrumbs separator="---" active-color="secondary">
          <q-breadcrumbs-el icon="home" :to="{ name: 'admin-home' }" />
          <q-breadcrumbs-el label="Role" icon="card_membership" />
        </q-breadcrumbs>
      </div>
    </div>

    <!-- content -->
    <filter-retry-table
      class="q-mt-md"
      ref="table"
      :fetch="fetch"
      :columns="columns"
      initialSortColumn="id"
    >
      <!-- Gunakan v-slot untuk menggantikan slot-scope -->
      <template v-slot:body-cell-action="props">
        <div class="col-auto">
          <template v-if="props.row.deleted_at">
            <q-btn
              flat
              color="positive"
              size="sm"
              icon="restore"
              @click.prevent.stop="showEditForm(props.row)"
              testcafe-tag="restore-role"
            ></q-btn>
          </template>
          <template v-else>
            <q-btn
              flat
              size="sm"
              icon="remove_red_eye"
              color="primary"
              @click="detailRole(props.row)"
              testcafe-tag="detail-role"
            />
            <q-btn
              flat
              color="warning"
              size="sm"
              icon="create"
              @click.prevent.stop="showEditForm(props.row)"
            ></q-btn>
          </template>
        </div>
      </template>
    </filter-retry-table>

    <role-form
      ref="form"
      :initialData="currentData"
      :mode="currentMode"
      @registerSuccess="handleSuccess"
      @updateSuccess="handleSuccess"
      @deleteSuccess="handleSuccess"
    />
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" @click="showCreateForm()" />
    </q-page-sticky>
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>


<script>
import FilterRetryTable from 'components/FilterRetryTable';
import RoleForm from 'components/RoleForm';

import { roleAll } from '../lib/api';

export default {
  components: {
    FilterRetryTable,
    RoleForm
  },
  data() {
    return {
      loading: false,
      currentData: {},
      initialSelectedItems: [],
      currentMode: 'create',
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
  methods: {
    fetch(params) {
      return roleAll(params);
    },
    showCreateForm() {
      this.currentData = {};
      this.currentMode = 'create';
      this.$refs.form.start();
    },
    showEditForm(data) {
      this.currentData = data;
      this.currentMode = 'update';
      this.$refs.form.start();
    },
    handleSuccess() {
      this.$refs.table.reset();
    },
    detailRole(data) {
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
