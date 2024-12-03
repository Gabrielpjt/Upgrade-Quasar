<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col text-h6">User</div>
      <div class="col-auto q-ml-md q-pa-sm">
        <q-breadcrumbs separator="---" active-color="secondary">
          <q-breadcrumbs-el icon="home" :to="{ name: 'admin-home' }" />
          <q-breadcrumbs-el label="User" icon="person" />
        </q-breadcrumbs>
      </div>
    </div>

    <!-- content -->
    <filter-retry-table class="q-mt-md" ref="table" :fetch="fetch" :columns="columns">
      <template v-slot:body-cell-action="props">
        <div class="col-auto">
          <template v-if="props.row.deleted_at">
            <q-btn
              class="q-mr-sm"
              flat
              color="positive"
              size="sm"
              icon="restore"
              @click.prevent.stop="restoreItMe(props.row)"
              testcafe-tag="restore-user"
            ></q-btn>
          </template>
          <template v-else>
            <q-btn
              class="q-mr-sm"
              flat
              color="primary"
              size="sm"
              icon="remove_red_eye"
              @click="toDetail(props.row)"
              testcafe-tag="detail-user"
            ></q-btn>
            <q-btn
              class="q-mr-sm"
              flat
              color="warning"
              size="sm"
              icon="create"
              @click.prevent.stop="showEditForm(props.row)"
              testcafe-tag="edit-user"
            ></q-btn>
            <q-btn
              class="q-mr-sm"
              flat
              color="negative"
              size="sm"
              icon="delete"
              @click="deleteItMe(props.row)"
              testcafe-tag="delete-user"
            ></q-btn>
          </template>
        </div>
      </template>
    </filter-retry-table>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" @click="showCreateForm()" />
    </q-page-sticky>

    <User-Form
      ref="userForm"
      :initialData="currentData"
      :mode="currentMode"
      @registerSuccess="handleSuccess"
      @updateSuccess="handleSuccess"
    />
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>


<script>
import FilterRetryTable from 'components/FilterRetryTable';
import UserForm from 'components/UserForm';
import { Notify } from 'quasar';
import { userAll, userDelete, userRestore } from '../lib/api';

export default {
  components: {
    FilterRetryTable,
    UserForm
  },
  data() {
    return {
      loading: false,
      currentData: {},
      currentMode: 'create',
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left'
        },
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left'
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
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
      return userAll(params);
    },
    showCreateForm() {
      this.currentData = {};
      this.currentMode = 'create';
      this.$refs.userForm.start();
    },
    showEditForm(data) {
      this.currentData = data;
      this.currentMode = 'update';
      this.$refs.userForm.start();
    },
    deleteIt(data) {
      this.currentData = data;
      this.currentMode = 'deletesure';
      this.$refs.userForm.start();
    },
    deleteItMe(data) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Anda yakin untuk menonaktifkan User ini ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log(data.id);
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
                  message: 'User berhasil di non-aktifkan'
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
    restoreIt(data) {
      this.currentData = data;
      this.currentMode = 'restoresure';
      this.$refs.userForm.start();
    },
    restoreItMe(data) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Anda yakin untuk mengaktifkan kembali User ini ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.loading = true;
          userRestore(data.id)
            .then(payload => {
              this.loading = false;
              if (!payload.errors) {
                Notify.create({
                  timeout: 1000,
                  type: 'positive',
                  color: 'positive',
                  icon: 'done',
                  message: 'User berhasil diaktifkan kembali'
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
    toDetail(data) {
      this.$router.push({
        name: 'admin-user-detail',
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
