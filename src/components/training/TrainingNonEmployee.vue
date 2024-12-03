eslint-disable indent
<template>
    <div>
        <div class="q-pb-md q-pr-md ">
            <q-card class="kmp-card-rounded q-px-md q-py-sm">
                <div class="row q-mx-sm q-mb-md q-mt-md">
                    <span class="kmp-font-md kmp-font-bold" style="font-size:16px"
                        >Master Training Non Employee</span
                    >
                </div>
                <div class="row q-mx-sm q-mb-md q-mt-md">
                    <div class="col-12 col-md-8 q-mb-xs-md q-mb-md-none">
                        <div class="row q-gutter-md q-mr-md">
                        <div class="col-12 col-md-4">
                            <q-input
                            ref="filter"
                            outlined
                            dense
                            v-model="filter"
                            placeholder="Nama Pegawai"
                            >
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                            </q-input>
                        </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 row justify-end">
                        <q-btn outline color="primary" no-caps label="Tambah Pegawai" @click="openModal('add')" />
                    </div>
                </div>
                <div class="row q-mx-sm q-mb-md q-mt-md">
                    <div class="col-12">
                        <q-table
                        flat
                        bordered
                        class="kmp-table-report kmp-border-color-1 kmp-rounded-2"
                        :columns="columns_table"
                        :data="data_table"
                        v-model:pagination="pagination"
                        :loading="data_table_loading"
                        row-key="name"
                        :filter="filter"
                        >
                            <template v-slot:loading>
                              <q-inner-loading showing color="primary" />
                            </template>
                            <template v-slot:body="props">
                                <q-tr :props="props">
                                    <q-td key="no" :props="props" class="table-training"> {{ props.row.no }}. </q-td>
                                    <q-td key="name" class="text-left table-training" :props="props">
                                        {{ props.row.name }}
                                    </q-td>
                                    <q-td key="organization_id" class="table-training" :props="props">
                                      <span v-if="props.row.organization_id && props.row.organization_id >= 32 && props.row.organization">
                                        {{ props.row.organization.name }}
                                      </span>
                                        <!-- {{ props.row.organization.name }} -->
                                    </q-td>
                                    <q-td key="phone" class="table-training" :props="props">
                                      {{ props.row.phone }}
                                    </q-td>
                                    <q-td key="email" class="table-training" :props="props">
                                      {{ props.row.email }}
                                    </q-td>
                                    <q-td key="action" :props="props">
                                        <div>
                                            <q-btn
                                            label=""
                                            color="primary"
                                            flat
                                            icon="remove_red_eye"
                                            size="sm"
                                            @click="openModal('detail', props.row)"
                                            v-if="!props.row.deleted_at"
                                            />
                                            <q-btn
                                            label=""
                                            color="warning"
                                            flat
                                            icon="edit"
                                            size="sm"
                                            @click="openModal('edit', props.row)"
                                            v-if="!props.row.deleted_at"
                                            />
                                            <q-btn
                                            label=""
                                            color="negative"
                                            flat
                                            icon="delete"
                                            size="sm"
                                            @click="openModal('delete', props.row)"
                                            v-if="!props.row.deleted_at"
                                            />
                                            <!-- <q-btn
                                            label=""
                                            color="positive"
                                            flat
                                            icon="restore"
                                            size="sm"
                                            @click="openModal('restore', props.row)"
                                            v-if="props.row.deleted_at"
                                            /> -->
                                        </div>
                                    </q-td>
                                </q-tr>
                            </template>
                    </q-table>
                </div>
            </div>
        </q-card>
    </div>
    <fixed-modal
        :show="modal_add"
        :title="`${modal_title} Pegawai`"
        @on-close="modal_add = false"
        :width="$q.platform.is.mobile ? '350': '500'"
    >
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Nama Pegawai<sup class="text-red">*</sup></div>
          <q-input class="q-pb-sm" dense v-model="name" outlined @blur="$v.name.$touch" :error="$v.name.$error"/>
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.name.$error">Wajib diisi</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Unit Kerja<sup class="text-red">*</sup></div>
        <div style="border: 1.4px solid #d8d8d8; border-radius: 10px;">
        <treeselect :options="option_direktorat_employee" close-on-select :clearable="false" :normalizer="normalizer" placeholder="" v-model="organization_id" @blur="$v.organization_id.$touch" :error="$v.organization_id.$error" />
        </div>
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.organization_id.$error">Wajib diisi</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Phone<sup class="text-red">*</sup></div>
          <q-input class="q-pb-sm" dense v-model="phone" outlined @blur="$v.phone.$touch" :error="$v.phone.$error"/>
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.phone.$error">Wajib diisi</div>
      </q-card-section>
            <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Email<sup class="text-red">*</sup></div>
          <q-input class="q-pb-sm" dense v-model="email" outlined @blur="$v.email.$touch" :error="$v.email.$error"/>
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.email.$error">Wajib diisi dengan format yang benar</div>
      </q-card-section>
      <template #footer>
      <q-separator />
      <q-card-actions align="right" class="text-primary">
          <q-btn
              class=""
              outline
              unelevated
              @click="modal_add = false"
              >Batal</q-btn
          >
          <q-btn
              class="btn-primary-color float-right q-mr-sm publish-button"
              label="Simpan"
              unelevated
              @click="save"
          />
      </q-card-actions>
      </template>
    </fixed-modal>
    <q-dialog v-model="modal_detail" persistent>
        <q-card :style="$q.platform.is.mobile ? 'min-width: 350px' : 'min-width: 500px'" class="q-py-md q-px-sm">
            <q-card-section>
                <q-icon
                    name="close"
                    size="24px"
                    class="text-neutral float-right"
                    v-close-popup
                />
                <div class="text-h6">Detail Pegawai</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <table class="text-neutral">
                    <tr>
                    <td width="160px">
                        Nama Pegawai
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.name }}</div>
                        </div>
                    </td>
                    </tr>
                                        <tr>
                    <td width="160px">
                        Unit Kerja
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.organization_id }}</div>
                        </div>
                    </td>
                    </tr>
                                        <tr>
                    <td width="160px">
                        Phone
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.phone }}</div>
                        </div>
                    </td>
                    </tr>
                                        <tr>
                    <td width="160px">
                        Email
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.email }}</div>
                        </div>
                    </td>
                    </tr>
                </table>
            </q-card-section>
        </q-card>
    </q-dialog>
    <q-dialog ref="dialog"  v-model="modal_konfirmasi">
      <q-card>
        <q-card-section class="bg-negative text-white row">
          <div class="text-h6 col">Konfirmasi</div>
          <q-btn
            class="col-auto q-ml-lg"
            flat
            dense
            round
            icon="close"
            v-close-popup
          />
        </q-card-section>
        <q-card-section>
          <div class="q-my-md">Apakah Anda yakin akan menghapus pegawai?</div>
          <div />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Batal" v-close-popup />
          <q-btn
            label="Hapus"
            color="negative"
            @click="handleDelete()"
          />
        </q-card-actions>
        <!-- <q-inner-loading :showing="loading">
          <q-spinner-cube size="50px" color="primary" />
        </q-inner-loading> -->
      </q-card>
    </q-dialog>
    </div>
</template>

<script>
import { getCredential } from 'src/lib/storage';
import { Notify } from 'quasar';
import { required, email } from 'vuelidate/lib/validators';
import FixedModal from 'components/common/FixedModal';
import Treeselect from '@riophae/vue-treeselect';
import '../../css/vue-treeselect.css';
import {
  nonEmployeeList,
  nonEmployeeCreate,
  nonEmployeeUpdate,
  nonEmployeeDetail,
  nonEmployeeDelete,
  nonEmployeeRestore,
  organizationListCustom
} from '../../lib/api';
import { checkRole } from '../../lib/helper';

export default {
  components: { FixedModal, Treeselect },
  data() {
    return {
      selected: [],
      is_have_access: false,
      filter: '',
      user: {
        id: '',
        name: '',
        initial: ''
      },
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      columns_table: [
        {
          name: 'no',
          field: 'no',
          label: 'No.',
          align: 'center',
          style: 'width: 5%'
        },
        {
          name: 'name',
          field: 'name',
          align: 'center',
          label: 'Nama Pegawai'
        },
        {
          name: 'organization_id',
          field: 'organization_id',
          align: 'center',
          label: 'Unit Kerja'
        },
        {
          name: 'phone',
          field: 'phone',
          align: 'center',
          label: 'Nomor HP'
        },
        {
          name: 'email',
          field: 'email',
          align: 'center',
          label: 'Email'
        },
        {
          name: 'action',
          field: 'action',
          align: 'center',
          label: '',
          style: 'width: 5%'
        }
      ],
      data_table: [],
      data_table_loading: true,
      modal_title: null,
      modal_add: false,
      modal_detail: false,
      modal_konfirmasi: false,
      name: '',
      phone: '',
      email: '',
      organization_id: null,
      employee_id: '',
      enabled: true,
      isLoadingDetail: 1,
      option_direktorat_employee: null,
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children && node.children.length ? node.children : 0
        };
      }
    };
  },
  validations: {
    name: { required }, phone: { required }, email: { required, email }, organization_id: { required }
  },
  methods: {
    getnonEmployee() {
      nonEmployeeList().then(response => {
        const hasil = response.data;
        this.data_table = hasil.map((item, index) => ({
          ...item,
          no: index + 1
        }));
        this.data_table_loading = false;
      });
    },
    async openModal(selected, employee = null) {
      this.$v.$reset();
      if (selected === 'add') {
        this.methodPost = 'create';
        this.modal_title = 'Tambah Baru';
        this.name = '';
        this.organization_id = null;
        this.phone = '';
        this.email = '';
        this.modal_add = true;
      } else if (selected === 'delete') {
        this.modal_konfirmasi = true;
        this.employee_id = employee.id;
      } else if (selected === 'restore') {
        this.employee_id = employee.id;
        this.name = employee.name;
        nonEmployeeRestore(employee.id).then(response => {
          this.$q.notify({
            message: 'Pegawai telah dipulihkan',
            color: 'blue'
          });
          this.getnonEmployee();
        });
      } else if (selected === 'edit') {
        this.methodPost = 'update';
        this.modal_title = 'Edit';
        this.modal_add = true;
        nonEmployeeDetail(employee.id).then(response => {
          this.employee_id = employee.id;
          this.name = employee.name;
          this.organization_id = employee.organization_id;
          this.phone = employee.phone;
          this.email = employee.email;
        });
      } else if (selected === 'detail') {
        this.modal_detail = true;
        this.isLoadingDetail = true;
        nonEmployeeDetail(employee.id).then(response => {
          console.log(employee);
          this.isLoadingDetail = false;
          this.employee_id = employee.id;
          this.name = employee.name;
          this.organization_id = response.data.organization_id >= 32 && response.data.organization ? response.data.organization.name : null;
          this.phone = employee.phone;
          this.email = employee.email;
        });
      }
    },
    handleDelete() {
      nonEmployeeDelete(this.employee_id).then(response => {
        this.$q.notify({
          message: 'Pegawai telah dihapus',
          color: 'blue'
        });
        this.getnonEmployee();
      });
      this.modal_konfirmasi = false;
      this.employee_id = '';
    },
    save(selected, employee = null) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.create({
          message: 'Form tidak valid',
          timeout: 1000,
          employee: 'negative',
          color: 'negative',
          icon: 'warning'
        });
        this.isLoading = false;
      } else {
        this.modal_add = false;
        const data = {
          name: this.name,
          organization_id: this.organization_id,
          phone: this.phone,
          email: this.email
        };
        if (this.methodPost === 'create') {
          nonEmployeeCreate(data).then(response => {
            this.$q.notify({
              message: 'Pegawai telah ditambahkan',
              color: 'blue'
            });
            this.getnonEmployee();
          });
        } else if (this.methodPost === 'update') {
          nonEmployeeUpdate(this.employee_id, data).then(response => {
            this.$q.notify({
              message: 'Pegawai telah diperbaharui',
              color: 'blue'
            });
            this.getnonEmployee();
          });
        }
      }
    },
    getDirektorat() {
      const params = {};
      params.group = 'unit-kerja';
      params.public = true;
      this.options_unit_kerja = [];
      this.unit_kerja_id = null;
      organizationListCustom(params)
        .then(response => {
          const hasil = response.data;
          this.option_direktorat_employee = hasil;
        });
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      if (checkRole().name === 'km_manager' || checkRole().name === 'training_manager') {
        this.is_have_access = true;
      } else {
        this.$router.push('/dashboard');
      }

      // profile.roles.forEach((v, i) => {
      //   if (v.name === 'km_manager') {
      //     this.is_have_access = true;
      //   }
      // });
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
    }
  },
  mounted() {
    this.getnonEmployee();
    this.getUser();
    this.getDirektorat();
  }
};
</script>

<style>
.q-tree__node-header-content .row {
  flex-wrap: inherit;
}
</style>
