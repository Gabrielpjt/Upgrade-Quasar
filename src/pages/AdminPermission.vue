<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col text-h6">Permission</div>
      <div class="col-auto q-ml-md q-pa-sm">
        <q-breadcrumbs separator="---" active-color="secondary">
          <q-breadcrumbs-el icon="home" :to="{ name: 'admin-home' }" />
          <q-breadcrumbs-el label="Permission" icon="verified_user" />
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
      <!-- Menggantikan slot dan slot-scope dengan v-slot -->
      <template v-slot:body-cell-action="props">
        <div class="row justify-end">
          <div class="col-auto">
            <template v-if="props.row.deleted_at">
              <q-btn
                flat
                color="positive"
                size="sm"
                icon="restore"
                @click.prevent.stop="showEditForm(props.row)"
                testcafe-tag="restore-permission"
              ></q-btn>
            </template>
            <template v-else>
              <q-btn
                class="q-ml-sm"
                flat
                color="primary"
                size="sm"
                icon="remove_red_eye"
                @click="showDetailPermission(props.row)"
                testcafe-tag="detail-permission"
              ></q-btn>
              <q-btn
                flat
                color="warning"
                size="sm"
                icon="create"
                @click.prevent.stop="showEditForm(props.row)"
              ></q-btn>
            </template>
          </div>
        </div>
      </template>
    </filter-retry-table>

    <permission-form
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
import PermissionForm from 'components/PermissionForm';

import { permissionAll } from '../lib/api';

export default {
  components: {
    FilterRetryTable,
    PermissionForm
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
      return permissionAll(params);
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
    showDetailPermission(data) {
      this.$router.push({
        name: 'admin-permission-detail',
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
