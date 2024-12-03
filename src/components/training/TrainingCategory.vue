/* eslint-disable indent */
<template>
    <div>
        <div class="q-pb-md q-pr-md ">
            <q-card class="kmp-card-rounded q-px-md q-py-sm">
                <div class="row q-mx-sm q-mb-md q-mt-md">
                    <span class="kmp-font-md kmp-font-bold" style="font-size:16px"
                        >Master Training Category</span
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
                            placeholder="Nama Kategori"
                            >
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                            </q-input>
                        </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 row justify-end">
                        <q-btn outline color="primary" no-caps label="Tambah Kategori" @click="openModal('add')" />
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
                                    <q-td key="no" :props="props"> {{ props.row.no }}. </q-td>
                                    <q-td key="name" class="text-left" :props="props">
                                        {{ props.row.name }}
                                    </q-td>
                                    <q-td key="description" :props="props">
                                        {{ props.row.description }}
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
        :title="`${modal_title} Kategori`"
        @on-close="modal_add = false"
        :width="$q.platform.is.mobile ? '350': '500'"
    >
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Nama Kategori<sup class="text-red">*</sup></div>
          <q-input class="q-pb-sm" dense v-model="name" outlined @blur="$v.name.$touch" :error="$v.name.$error"/>
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.name.$error">Wajib diisi</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Deskripsi</div>
        <q-input class="q-pb-sm" dense v-model="description" type="textarea" outlined/>
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
                <div class="text-h6">Detail Kategori</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <table class="text-neutral">
                  <tbody>
                    <tr>
                    <td width="160px">
                        Nama Kategori
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
                  </tbody>
                    <tbody>
                    <tr>
                    <td width="160px">
                        Deskripsi
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.description }}</div>
                        </div>
                    </td>
                    </tr>
                    </tbody>
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
          <div class="q-my-md">Apakah Anda yakin akan menghapus kategori?</div>
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
import { required } from 'vuelidate/lib/validators';
import FixedModal from 'components/common/FixedModal';
import {
  trainingCategoryList,
  trainingCategoryCreate,
  trainingCategoryUpdate,
  trainingCategoryDetail,
  trainingCategoryDelete,
  trainingCategoryRestore
} from '../../lib/api';
import { checkRole } from '../../lib/helper';

export default {
  components: { FixedModal },
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
          label: 'Nama Kategori'
        },
        {
          name: 'description',
          field: 'description',
          align: 'center',
          label: 'Deskripsi'
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
      description: '',
      category_id: '',
      enabled: true,
      isLoadingDetail: 1
    };
  },
  validations: {
    name: { required }
  },
  methods: {
    getTrainingCategory() {
      trainingCategoryList().then(response => {
        const hasil = response.data;
        this.data_table = hasil.map((item, index) => ({
          ...item,
          no: index + 1
        }));
        this.data_table_loading = false;
      });
    },
    async openModal(selected, category = null) {
      this.$v.$reset();
      if (selected === 'add') {
        this.methodPost = 'create';
        this.modal_title = 'Tambah Baru';
        this.name = '';
        this.description = '';
        this.modal_add = true;
      } else if (selected === 'delete') {
        this.modal_konfirmasi = true;
        this.category_id = category.id;
      } else if (selected === 'restore') {
        this.category_id = category.id;
        this.name = category.name;
        trainingCategoryRestore(category.id).then(response => {
          this.$q.notify({
            message: 'Kategori telah dipulihkan',
            color: 'blue'
          });
          this.getTrainingCategory();
        });
      } else if (selected === 'edit') {
        this.methodPost = 'update';
        this.modal_title = 'Edit';
        this.modal_add = true;
        trainingCategoryDetail(category.id).then(response => {
          this.category_id = category.id;
          this.name = category.name;
          this.description = category.description;
        });
      } else if (selected === 'detail') {
        this.modal_detail = true;
        this.isLoadingDetail = true;
        trainingCategoryDetail(category.id).then(response => {
          this.isLoadingDetail = false;
          this.category_id = category.id;
          this.name = category.name;
          this.description = category.description;
        });
      }
    },
    handleDelete() {
      trainingCategoryDelete(this.category_id).then(response => {
        this.$q.notify({
          message: 'Kategori telah dihapus',
          color: 'blue'
        });
        this.getTrainingCategory();
      });
      this.modal_konfirmasi = false;
      this.category_id = '';
    },
    save(selected, category = null) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.create({
          message: 'Form tidak valid',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
        this.isLoading = false;
      } else {
        this.modal_add = false;
        const data = {
          name: this.name,
          description: this.description
        };
        if (this.methodPost === 'create') {
          trainingCategoryCreate(data).then(response => {
            this.$q.notify({
              message: 'Kategori telah ditambahkan',
              color: 'blue'
            });
            this.getTrainingCategory();
          });
        } else if (this.methodPost === 'update') {
          trainingCategoryUpdate(this.category_id, data).then(response => {
            this.$q.notify({
              message: 'Kategori telah diperbaharui',
              color: 'blue'
            });
            this.getTrainingCategory();
          });
        }
      }
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
    this.getTrainingCategory();
    this.getUser();
  }
};
</script>

<style>
.q-tree__node-header-content .row {
  flex-wrap: inherit;
}
</style>
