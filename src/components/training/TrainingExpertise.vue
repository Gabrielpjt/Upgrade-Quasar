/* eslint-disable indent */
<template>
    <div>
        <div class="q-pb-md" :class="$q.platform.is.mobile ? '' : 'q-pr-md'">
            <q-card class="kmp-card-rounded q-px-md q-py-sm">
                <div class="row q-mx-sm q-mb-md q-mt-md hidden">
                    <span class="kmp-font-md kmp-font-bold" style="font-size:16px"
                        >Database Narasumber Eksternal</span
                    >
                </div>
                <div class="row q-mx-sm q-mb-md q-mt-md desktop-only">
                    <div class="col-6">
                        <div class="row q-gutter-md">
                        <div class="col-6">
                          <q-input
                            ref="filter"
                            outlined
                            dense
                            v-model="filter"
                            placeholder="Search"
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                        </div>
                        <div class="col">
                          <q-btn color="primary" label="Search" @click="handleFilter(false)" />
                        </div>
                        </div>
                    </div>
                    <div class="col row justify-end">
                      <q-btn outline color="primary" class="q-mr-sm" no-caps label="Tambah Narasumber" @click="openModalNarasumber('add')" />
                      <q-btn outline color="primary" no-caps label="Export Narasumber" :disabled="selected.length === 0" @click="handleDownloadExpertise()" v-if="!is_loading_export" />
                        <q-spinner color="primary" size="2em" style="margin-top: 13px" v-else />
                    </div>
                </div>
                <div class="row q-mx-sm q-mb-md q-mt-md mobile-only">
                    <div class="col-12 q-mb-md">
                        <div class="row">
                          <div class="col-8">
                            <q-input
                              ref="filter"
                              outlined
                              dense
                              v-model="filter"
                              placeholder="Search"
                            >
                              <template v-slot:append>
                                <q-icon name="search" />
                              </template>
                            </q-input>
                          </div>
                          <div class="col-4 text-right">
                            <q-btn color="primary" label="Search" @click="handleFilter(false)" />
                          </div>
                        </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <q-btn outline color="primary" class="q-mr-sm" no-caps label="Tambah" @click="openModalNarasumber('add')" />
                        <q-btn outline color="primary" no-caps label="Export" :disabled="selected.length === 0" @click="handleDownloadExpertise()" v-if="!is_loading_export" />
                        <q-spinner color="primary" size="2em" style="margin-top: 13px" v-else />
                      </div>
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
                        row-key="id"
                        selection="multiple"
                        v-model:selected="selected"
                        >
                            <template v-slot:loading>
                              <q-inner-loading showing color="primary" />
                            </template>
                            <template v-slot:body="props">
                                <q-tr :props="props">
                                    <q-td class="table-training">                                  <!-- add this line -->
                                      <q-checkbox v-model="props.selected" :props="props"/><!-- add this line -->
                                    </q-td>
                                    <q-td key="no" :props="props" class="table-training"> {{ props.row.no }}. </q-td>
                                    <q-td key="name" class="text-left table-training" :props="props">
                                        {{ props.row.name.toUpperCase() }}
                                    </q-td>
                                    <q-td key="instansi" class="text-left table-training" :props="props">
                                        {{ props.row.instansi }}
                                    </q-td>
                                    <q-td key="topic" class="table-training" :props="props">
                                        {{ props.row.topic }}
                                    </q-td>
                                    <q-td key="email" class="table-training" :props="props">
                                        {{ props.row.email }}
                                    </q-td>
                                    <q-td key="phone" class="table-training" :props="props">
                                        {{ props.row.phone }}
                                    </q-td>
                                    <q-td key="action" :props="props">
                                        <div>
                                            <q-btn
                                            label=""
                                            color="primary"
                                            flat
                                            icon="remove_red_eye"
                                            size="sm"
                                            @click="openModalNarasumber('detail', props.row)"
                                            v-if="!props.row.deleted_at"
                                            />
                                            <q-btn
                                            label=""
                                            color="warning"
                                            flat
                                            icon="edit"
                                            size="sm"
                                            @click="openModalNarasumber('edit', props.row)"
                                            v-if="!props.row.deleted_at"
                                            />
                                            <q-btn
                                            label=""
                                            color="negative"
                                            flat
                                            icon="delete"
                                            size="sm"
                                            @click="openModalNarasumber('delete', props.row)"
                                            v-if="!props.row.deleted_at"
                                            />
                                            <!-- <q-btn
                                            label=""
                                            color="positive"
                                            flat
                                            icon="restore"
                                            size="sm"
                                            @click="openModalNarasumber('restore', props.row)"
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
        :show="modal_add_narasumber"
        :title="`${expertise_modal_title} Narasumber`"
        @on-close="modal_add_narasumber = false"
        :width="$q.platform.is.mobile ? '' : '500'"
    >
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Nama<sup class="text-red">*</sup></div>
          <q-input class="q-pb-sm" dense v-model="name" debounce="300" outlined @blur="$v.name.$touch" :error="$v.name.$error"/>
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.name.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none" v-if="this.notif_name">
          <div class="text-grey-7 q-pb-sm">"{{ this.notif_name }}" sudah tersimpan</div>
      </q-card-section>
        <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Instansi / Penyedia Pelatihan<sup class="text-red">*</sup></div>
          <q-input dense class="q-pb-sm" v-model="instansi" outlined @blur="$v.instansi.$touch" :error="$v.instansi.$error" />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.instansi.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Topik<sup class="text-red">*</sup></div>
          <q-input dense class="q-pb-sm" v-model="topic" outlined @blur="$v.topic.$touch" :error="$v.topic.$error" />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.topic.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Nomor HP<sup class="text-red">*</sup></div>
          <q-input dense class="q-pb-sm" v-model="phone" outlined @blur="$v.phone.$touch" :error="$v.phone.$error"  />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.phone.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">NIP<sup class="text-red">*</sup></div>
          <q-input dense v-model="nip" class="q-pb-sm" outlined @blur="$v.nip.$touch" :error="$v.nip.$error" />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.nip.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Jabatan<sup class="text-red">*</sup></div>
          <q-input dense class="q-pb-sm" v-model="jabatan" outlined @blur="$v.jabatan.$touch" :error="$v.jabatan.$error" />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.jabatan.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Pangkat / Golongan<sup class="text-red">*</sup></div>
          <q-input dense class="q-pb-sm" v-model="pangkat" outlined @blur="$v.pangkat.$touch" :error="$v.pangkat.$error" />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.pangkat.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Nomor Telepon Kantor<sup class="text-red">*</sup></div>
          <q-input dense class="q-pb-sm" v-model="telepon_kantor" outlined @blur="$v.telepon_kantor.$touch" :error="$v.telepon_kantor.$error" />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.telepon_kantor.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Nomor NPWP<sup class="text-red">*</sup></div>
          <q-input dense class="q-pb-sm" v-model="no_npwp" outlined @blur="$v.no_npwp.$touch" :error="$v.no_npwp.$error" />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.no_npwp.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">No. Rekening / Bank<sup class="text-red">*</sup></div>
          <q-input dense class="q-pb-sm" v-model="rek_bank" outlined @blur="$v.rek_bank.$touch" :error="$v.rek_bank.$error" />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.rek_bank.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Email<sup class="text-red">*</sup></div>
          <q-input dense class="q-pb-sm" v-model="email" outlined @blur="$v.email.$touch" :error="$v.email.$error" />
          <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.email.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
          <div class="text-neutral">Riwayat Hidup<sup class="text-red">*</sup></div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-sm">
          <q-uploader
              :factory="handleUploadNarasumber"
              ref="uploader"
              label="Individual upload"
              multiple
              batch
              auto-upload
              style="width: 100%"
              class="shadow-0 q-uploader--bordered kmp-rounded"
          />
      </q-card-section>

      <q-separator spaced v-if="finish_files_narasumber.length > 0" />

      <q-card-section class="q-pt-none q-pb-none">
          <div
              class="text-neutral q-mb-sm q-mt-sm"
              v-if="finish_files_narasumber.length > 0"
          >
              {{ finish_files_narasumber.length }} Files Uploaded
          </div>
          <q-linear-progress
              v-if="uploaded_files"
              indeterminate
              rounded
              color="negative"
              class="q-my-sm"
          />
          <q-list>
              <div v-for="(item, index) in finish_files_narasumber" :key="index">
              <ListFile
                  v-if="item.file !== null"
                  :file="item.file"
                  :item="item"
                  manage="true"
                  @delete_knowledge="handleDeleteNarsumCv(item.file.id, 'file', index)"
              />
              </div>
          </q-list>
      </q-card-section>
      <!-- <q-card-section class="q-pt-none">
          <div class="text-neutral">Status</div>
      <q-radio v-model="enabled" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="aktif" label="Aktif"/>
      <q-radio v-model="enabled" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="tidak" label="Tidak Aktif" />
      </q-card-section> -->
      <template #footer>
      <q-separator />
      <q-card-actions align="right" class="text-primary">
          <q-btn
              class=""
              outline
              unelevated
              @click="modal_add_narasumber = false"
              >Batal</q-btn
          >
          <q-btn
              class="btn-primary-color float-right q-mr-sm publish-button"
              label="Simpan"
              unelevated
              @click="saveExpertise"
          />
      </q-card-actions>
      </template>
    </fixed-modal>
    <q-dialog v-model="modal_detail_narasumber" persistent>
        <q-card style="min-width: 500px" class="q-py-md q-px-sm">
            <q-card-section>
                <q-icon
                    name="close"
                    size="24px"
                    class="text-neutral float-right"
                    v-close-popup
                />
                <div class="text-h6">Detail Narasumber</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <table class="text-neutral">
                  <tbody>
                    <tr>
                    <td width="160px">
                        Nama
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.name.toUpperCase() }}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td width="160px">
                        Instansi / Penyedia Pelatihan
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.instansi }}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        Topik
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.topic }}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td width="160px">
                        Nomor HP
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
                    <td>
                        NIP
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.nip }}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        Jabatan
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.jabatan }}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        Pangkat
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.pangkat }}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                            Nomor Telepon Kantor
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.telepon_kantor }}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        Nomor NPWP
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.no_npwp }}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        Nomor Rekening / Bank
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div class="text-neutral">: {{ this.rek_bank }}</div>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
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
                    <tr>
                    <!-- <td>
                        Status
                    </td>
                    <td>
                        <div v-if="isLoadingDetail">
                        <div class="row">
                            : &nbsp; <q-skeleton width="150px" height="25px" />
                        </div>
                        </div>
                        <div v-else>
                        <div v-if="this.enabled === true">
                          <div class="text-neutral">: Aktif</div>
                        </div>
                        <div v-else>
                          <div class="text-neutral">: Tidak Aktif</div>
                        </div>
                        </div>
                    </td> -->
                    </tr>
                  </tbody>
                </table>
            </q-card-section>
            <q-card-section class="q-pt-md">
                <div class="text-title">Riwayat Hidup</div>
            </q-card-section>
            <q-list class="q-pl-md q-pr-md">
                <div v-for="(item, index) in finish_files_narasumber" :key="index">
                    <ListFile
                    v-if="item.file !== null"
                    :file="item.file"
                    :item="item"
                    />
                </div>
            </q-list>
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
          <div class="q-my-md">Apakah Anda yakin akan menghapus narasumber?</div>
          <div />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Batal" v-close-popup />
          <q-btn
            label="Hapus"
            color="negative"
            @click="handleDeleteExpertise()"
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
import { axios } from 'boot/axios';
import { Notify } from 'quasar';
import { required } from 'vuelidate/lib/validators';
import ListFile from 'components/common/ListFile';
import FixedModal from 'components/common/FixedModal';
import {
  expertiseList,
  expertiseCreate,
  expertiseUpdate,
  expertiseDetail,
  fileDelete,
  expertiseDelete,
  expertiseRestore,
  checkExpertise,
  exportExpertiseToken,
  exportExpertise

} from '../../lib/api';
import { checkRole } from '../../lib/helper';

export default {
  components: { FixedModal, ListFile },
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
          label: 'Nama'
        },
        {
          name: 'instansi',
          field: 'instansi',
          align: 'center',
          label: 'Instansi / Penyedia Pelatihan'
        },
        {
          name: 'topic',
          field: 'topic',
          align: 'center',
          label: 'Topik'
        },
        {
          name: 'email',
          field: 'email',
          align: 'center',
          label: 'Email'
        },
        {
          name: 'phone',
          field: 'phone',
          align: 'center',
          label: 'Nomor HP'
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
      expertise_modal_title: null,
      modal_add_narasumber: false,
      modal_detail_narasumber: false,
      modal_konfirmasi: false,
      expertise_id: null,
      name: '',
      name_on_db: '',
      notif_name: '',
      phone: '',
      nip: '',
      jabatan: '',
      pangkat: '',
      telepon_kantor: '',
      no_npwp: '',
      rek_bank: '',
      email: '',
      topic: '',
      instansi: '',
      is_loading_export: false,
      select: [],
      // enabled: 'aktif',
      enabled: true,
      finish_files_narasumber: [],
      uploaded_files: false,
      isLoadingDetail: 1
    };
  },
  validations: {
    name: { required }, phone: { required }, nip: { required }, jabatan: { required }, pangkat: { required }, telepon_kantor: { required }, no_npwp: { required }, rek_bank: { required }, email: { required }, topic: { required }, instansi: { required }
  },
  methods: {
    getExpertise() {
      expertiseList().then(response => {
        const hasil = response.data;
        this.data_table = hasil.map((item, index) => ({
          ...item,
          no: index + 1
        }));
        this.data_table_loading = false;
      });
    },
    Check() {
      checkExpertise(this.name).then(response => {
        if (response) {
          const { data } = response;
          this.name_on_db = data;
          if (this.name_on_db) {
            this.notif_name = data.name;
          }
        }
      });
    },
    async openModalNarasumber(select, expertise = null) {
      this.$v.$reset();
      if (select === 'add') {
        this.methodPost = 'create';
        this.expertise_modal_title = 'Tambah Baru';
        this.name = '';
        this.phone = '';
        this.nip = '';
        this.jabatan = '';
        this.pangkat = '';
        this.telepon_kantor = '';
        this.no_npwp = '';
        this.rek_bank = '';
        this.email = '';
        this.topic = '';
        this.instansi = '';
        this.finish_files_narasumber = [];
        this.modal_add_narasumber = true;
      } else if (select === 'delete') {
        this.modal_konfirmasi = true;
        this.expertise_id = expertise.id;
        // this.name = expertise.name;
        // expertiseDelete(expertise.id).then(response => {
        //   this.$q.notify({
        //     message: 'Narasumber telah dihapus',
        //     color: 'blue'
        //   });
        //   this.getExpertise();
        // });
      } else if (select === 'restore') {
        this.expertise_id = expertise.id;
        this.name = expertise.name;
        expertiseRestore(expertise.id).then(response => {
          this.$q.notify({
            message: 'Narasumber telah dipulihkan',
            color: 'blue'
          });
          this.getExpertise();
        });
      } else if (select === 'edit') {
        this.methodPost = 'update';
        this.expertise_modal_title = 'Edit';
        this.modal_add_narasumber = true;
        expertiseDetail(expertise.id).then(response => {
          this.expertise_id = expertise.id;
          this.name = expertise.name;
          // if (expertise.enabled === true) {
          //   this.enabled = 'aktif';
          // } else {
          //   this.enabled = 'tidak';
          // }
          this.phone = expertise.phone;
          this.nip = expertise.nip;
          this.jabatan = expertise.jabatan;
          this.pangkat = expertise.pangkat;
          this.telepon_kantor = expertise.telepon_kantor;
          this.no_npwp = expertise.no_npwp;
          this.rek_bank = expertise.rek_bank;
          this.email = expertise.email;
          this.topic = expertise.topic;
          this.instansi = expertise.instansi;
          this.finish_files_narasumber = [];
          response.data.files.forEach((v, i) => {
            if (v) {
              if (v.filename_type === null) {
                this.finish_files_narasumber.push({
                  file: {
                    filemime: v.filemime,
                    filename: v.filename,
                    filesize: v.filesize,
                    path: v.path,
                    id: v.id
                  }
                });
              }
            }
          });
        });
        this.notif_name = '';
        this.name.name_on_db = '';
      } else if (select === 'detail') {
        this.modal_detail_narasumber = true;
        this.isLoadingDetail = true;
        expertiseDetail(expertise.id).then(response => {
          this.isLoadingDetail = false;
          this.expertise_id = expertise.id;
          this.name = expertise.name;
          // this.enabled = expertise.enabled;
          this.phone = expertise.phone;
          this.nip = expertise.nip;
          this.jabatan = expertise.jabatan;
          this.pangkat = expertise.pangkat;
          this.telepon_kantor = expertise.telepon_kantor;
          this.no_npwp = expertise.no_npwp;
          this.rek_bank = expertise.rek_bank;
          this.email = expertise.email;
          this.topic = expertise.topic;
          this.instansi = expertise.instansi;
          this.finish_files_narasumber = [];
          response.data.files.forEach((v, i) => {
            if (v) {
              if (v.filename_type === null) {
                this.finish_files_narasumber.push({
                  file: {
                    filemime: v.filemime,
                    filename: v.filename,
                    filesize: v.filesize,
                    path: v.path,
                    id: v.id
                  }
                });
              }
            }
          });
        });
      }
    },
    handleDeleteExpertise() {
      expertiseDelete(this.expertise_id).then(response => {
        this.$q.notify({
          message: 'Narasumber telah dihapus',
          color: 'blue'
        });
        this.getExpertise();
      });
      this.modal_konfirmasi = false;
      this.expertise_id = '';
    },
    saveExpertise(select, expertise = null) {
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
        if (this.finish_files_narasumber.length === 0) {
          Notify.create({
            message: 'Silahkan upload riwayat hidup',
            timeout: 3000,
            type: 'positive',
            color: 'warning',
            icon: 'check'
          });
          return;
        }
        this.modal_add_narasumber = false;
        const group_file = this.finish_files_narasumber.map(item => {
          return {
            file_id: item.file.id
          };
        });
        // let status = '';
        // if (this.enabled === 'aktif') {
        //   status = true;
        // } else {
        //   status = false;
        // }
        const data = {
          name: this.name,
          phone: this.phone,
          enabled: true,
          nip: this.nip,
          jabatan: this.jabatan,
          pangkat: this.pangkat,
          telepon_kantor: this.telepon_kantor,
          no_npwp: this.no_npwp,
          rek_bank: this.rek_bank,
          email: this.email,
          topic: this.topic,
          instansi: this.instansi,
          file: group_file
        };

        if (this.methodPost === 'create') {
          expertiseCreate(data).then(response => {
            this.$q.notify({
              message: 'Narasumber telah ditambahkan',
              color: 'blue'
            });
            this.getExpertise();
          });
        } else if (this.methodPost === 'update') {
          expertiseUpdate(this.expertise_id, data).then(response => {
            this.$q.notify({
              message: 'Narasumber telah diperbaharui',
              color: 'blue'
            });
            this.getExpertise();
          });
        }
      }
    },
    handleDeleteNarsumCv(id, type, index) {
      let msg = '';
      switch (type) {
        case 'file':
          msg = 'Anda yakin ingin menghapus file ini?';
          break;
        default:
          msg = 'Anda yakin ingin menghapus dokumen ini?';
      }
      this.$q
        .dialog({
          title: 'Confirm',
          message: msg,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          if (type === 'file') {
            fileDelete(id).then(response => {
              if (response.message === 'OK') {
                Notify.create({
                  message: 'File berhasil dihapus',
                  timeout: 1000,
                  type: 'positive',
                  color: 'positive',
                  icon: 'check'
                });
                this.finish_files_narasumber.splice(index, 1);
              }
            });
          }
        })
        .onCancel(() => {
        })
        .onDismiss(() => {
        });
    },
    handleUploadNarasumber(files, content_type) {
      this.uploaded_files = true;
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      const detail_files = [];
      files.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', files[i]);
        axios
          .post('./api/api/file', formData, config)
          .then(res => {
            const response = res.data.data[0];
            if (res.data.message === 'OK') {
              detail_files.push({ file: response });
              if (files.length === i + 1) {
                this.uploaded_files = false;
                this.$refs.uploader.reset();
                this.finish_files_narasumber = detail_files;
              }
            }
          })
          .catch(error => {
          });
      });
    },
    handleFilter() {
      this.data_table = [];

      expertiseList({
        ...({ search_term: this.filter })
      }).then(response => {
        const hasil = response.data;
        this.data_table = hasil.map((item, index) => ({ ...item, no: index + 1 }));
      });
      this.selected = [];
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
    },
    handleDownloadExpertise() {
      this.is_loading_export = true;
      exportExpertiseToken()
        .then(response => {
          const { rowsPerPage, page } = this.pagination;
          const rpp = rowsPerPage === 0 ? 10000 : rowsPerPage;
          const select = this.selected.map(item => item.id);
          const ids = select.toString();
          // window.open(`./api/api/export-expertise?ids=${ids}&limit=${rpp}&offset=${page - 1}&token=${response.data}`);
          const data = {
            ids,
            limit: rpp,
            offset: page - 1,
            token: response.data
          };
          exportExpertise(data).then(res => {});
        })
        .finally(() => {
          this.is_loading_export = false;
        });
    }
  },
  mounted() {
    this.getExpertise();
    this.getUser();
  },
  watch: {
    name() {
      this.notif_name = '';
      if (this.name !== '') {
        this.Check(this.name);
      }
    }
  }
};
</script>

<style>
.q-tree__node-header-content .row {
  flex-wrap: inherit;
}
</style>
