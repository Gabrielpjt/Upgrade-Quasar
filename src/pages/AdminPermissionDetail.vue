<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col text-h6">Detail Permission #{{ this.currentData.id }}</div>
      <div class="col-auto q-ml-md q-pa-sm">
        <q-breadcrumbs separator="---" active-color="secondary">
          <q-breadcrumbs-el icon="home" :to="{ name: 'admin-home'}" />
          <q-breadcrumbs-el
            class="cursor-pointer"
            label="Permission"
            icon="verified_user"
            :to="{ name: 'admin-permission' }"
          />
          <q-breadcrumbs-el label="Detail Permission" icon="verified_user" />
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
            <td>{{ this.currentData.name }}</td>
            <td>
              <div class="float-right">
                <template v-if="this.currentData.deleted_at">
                  <q-btn
                    outline
                    color="primary"
                    size="sm"
                    icon="restore"
                    @click.prevent.stop="showEditForm()"
                    testcafe-tag="restore-permission"
                  ></q-btn>
                </template>
                <template v-else>
                  <q-btn
                    outline
                    color="amber-10"
                    size="sm"
                    icon="create"
                    @click.prevent.stop="showEditForm()"
                    testcafe-tag="edit-permission"
                  ></q-btn>
                </template>
              </div>
            </td>
          </tr>
          <tr>
            <td width="20%">Display Name</td>
            <td width="10px">:</td>
            <td>{{ this.currentData.display_name }}</td>
          </tr>
          <tr>
            <td width="20%">description</td>
            <td width="10px">:</td>
            <td>{{ this.currentData.description }}</td>
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
          @click="startSelector()"
          testcafe-tag="role-permission"
        />
      </div>
      <q-table
        class="q-mt-md"
        :grid="$q.screen.xs"
        :data="currentData.role"
        :columns="roleColumns"
        row-key="id"
        :filter="roleFilter"
      >
        <!-- Gantikan penggunaan slot dan slot-scope dengan v-slot -->
        <template v-slot:body-cell-action="props">
          <div class="col-auto">
            <q-btn
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

    <permission-form
      ref="form"
      :initialData="currentData"
      :mode="currentMode"
      @registerSuccess="init"
      @updateSuccess="init"
      @deleteSuccess="$router.push({ name: 'admin-permission' })"
    />
    <multiple-selector-modal
      ref="selector"
      :fetch="fetchRoleList"
      title="Daftar Role"
      hasSearch
      :columns="roleColumns"
      :initialSelectedItems="initialSelectedItems"
      @confirm="handleRoleListConfirmed"
    />
    <q-inner-loading :showing="loading">
      <q-spinner-bars size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>


<script>
import PermissionForm from 'components/PermissionForm';
import MultipleSelectorModal from 'components/MultipleSelectorModal';

import { permissionDetail, roleList, permissionSyncRole } from '../lib/api';

export default {
  components: {
    PermissionForm,
    MultipleSelectorModal
  },
  data() {
    return {
      loading: false,
      currentData: {},
      currentMode: 'update',
      roleFilter: '',
      roleColumns: [
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
    fetchRoleList(params) {
      return roleList(params);
    },
    handleRoleListConfirmed(selectedItems) {
      this.loading = true;
      permissionSyncRole({
        permission: this.currentData.id,
        role: selectedItems.map(i => i.id)
      }).then(response => {
        this.init();
        this.loading = false;
      });
    },
    startSelector() {
      this.$refs.selector.start();
    },
    init() {
      this.loading = true;
      permissionDetail(this.$route.params.id)
        .then(response => {
          this.currentData = response.data;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    showEditForm() {
      this.$refs.form.start();
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
