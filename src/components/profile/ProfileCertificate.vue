<template>
  <div class="card-quiz-create">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ this.profile_certificate.id ? 'Training & Certification' : 'Add New Training & Certification' }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-y-md column">
          <div class="column text-grey-7">
            <div class="col q-mb-md">
              <label class="label-form">Name of Training/Certification</label>
              <q-input v-if="input === true" dense outlined v-model="profile_certificate.name" placeholder="Ex: Google Analytics Certificate" />
              <q-input v-else dense outlined v-model="profile_certificate.name" readonly />
            </div>
            <div class="col q-mb-md">
              <label class="label-form">Issuing Organization</label>
              <q-input v-if="input === true" dense outlined v-model="profile_certificate.issuing_organization" placeholder="Ex: Komisi Pemberantasan Korupsi" />
              <q-input v-else dense outlined v-model="profile_certificate.issuing_organization" readonly />
            </div>
            <div class="row q-mb-md">
              <div class="col q-pr-sm">
                <label class="label-form">Issuing Date</label>
                <q-input v-if="input === true" dense outlined :value="monthPicked" @click="$refs.monthPicker.show()" placeholder="Month" >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="monthPicker" transition-show="scale" transition-hide="scale">
                        <q-date
                          minimal
                          emit-immediately
                          default-view="Months"
                          v-model="monthPicked"
                          mask="M"
                          @input="checkValue"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input v-else disable dense outlined :value="monthPicked" @click="$refs.monthPicker.show()" placeholder="Month" >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="monthPicker" transition-show="scale" transition-hide="scale">
                        <q-date
                          minimal
                          emit-immediately
                          default-view="Months"
                          v-model="monthPicked"
                          mask="M"
                          @input="checkValue"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col q-pl-sm">
                <label class="label-form">&nbsp;</label>
                <q-input v-if="input === true" dense outlined :value="yearPicked" @click="$refs.yearPicker.show()" placeholder="Year" >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="yearPicker" transition-show="scale" transition-hide="scale">
                        <q-date
                          minimal
                          emit-immediately
                          default-view="Years"
                          v-model="yearPicked"
                          mask="YYYY"
                          @input="checkValue"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input v-else disable dense outlined :value="yearPicked" @click="$refs.yearPicker.show()" placeholder="Year" >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="yearPicker" transition-show="scale" transition-hide="scale">
                        <q-date
                          minimal
                          emit-immediately
                          default-view="Years"
                          v-model="yearPicked"
                          mask="YYYY"
                          @input="checkValue"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row q-mb-md">
              <div class="col q-pr-sm">
                <label class="label-form">Jumlah JP</label>
                <q-input v-if="input === true" type="number" dense outlined v-model="profile_certificate.duration" placeholder="Ex: 1" />
                <q-input v-else readonly type="number" dense outlined v-model="profile_certificate.duration" placeholder="Ex: 1" />
              </div>
              <div class="col q-pl-sm">
              </div>
            </div>
            <div class="col q-mb-md" v-if="input === true">
              <label class="label-form">Admin Training</label>
                <q-select
                  v-model="profile_certificate.admin"
                  :options="admin_option"
                  :option-value="'id'"
                  :option-label="'name'"
                  name="admin_option"
                  dense
                  outlined
                >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col q-mb-md" v-if="input === false && admin_id">
              <label class="label-form">Admin Training</label>
              <q-select
                  v-model="profile_certificate.admin"
                  :options="admin_option"
                  :option-value="'id'"
                  :option-label="'name'"
                  name="admin_option"
                  dense
                  outlined
                  readonly
                >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col q-mb-md" v-if="input === true">
              <label class="label-form">Related to Business Proccess</label>
                <q-select
                  v-model="profile_certificate.business"
                  :options="business_option"
                  :option-value="'id'"
                  :option-label="'label'"
                  name="business_option"
                  @input="businessSelect"
                  dense
                  outlined
                >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col q-mb-md" v-if="input === false && business_id">
              <label class="label-form">Related to Business Process</label>
              <q-select
                  v-model="profile_certificate.business"
                  :options="business_option"
                  :option-value="'id'"
                  :option-label="'label'"
                  name="business_option"
                  dense
                  outlined
                  readonly
                >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col q-mb-md" v-if="input === true">
              <label class="label-form">Related to Knowledge</label>
                <q-select
                  v-model="profile_certificate.knowledge"
                  :options="knowledge_option"
                  :option-value="'id'"
                  :option-label="'label'"
                  name="knowledge_option"
                  dense
                  outlined
                >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col q-mb-md" v-if="input === false && knowledge_id">
              <label class="label-form">Related to Knowledge</label>
              <q-select
                  v-model="profile_certificate.knowledge"
                  :options="knowledge_option"
                  :option-value="'id'"
                  :option-label="'label'"
                  name="knowledge_option"
                  dense
                  outlined
                  readonly
                >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </div>
      </q-card-section>
      <!-- certificate -->
      <q-card-section class="q-pt-none">
        <div class="label-form column text-grey-7 q-pb-sm" :hidden="finish_files.length === 0">
            Certificate
        </div>
        <q-item clickable v-ripple v-if="profile_certificate.file != null"
                :class="$q.platform.is.mobile ? 'q-list--bordered q-pa-sm q-my-sm text-12 kmp-file-item kmp-file-text' : 'q-list--bordered q-mb-sm kmp-file-item kmp-file-text'"
                @click="handlePreviewFileCertificate(profile_certificate.file)"
        >
          <div class="col-1 q-mt-xs">
            <q-icon name="fas fa-file-pdf" class=""  :size="$q.platform.is.mobile ? '20px' : '30px'" style=""/>
          </div>
          <div class="col-10">
            <q-item-section class="q-ml-sm">
              <q-item-label class="kmp-font-medium">Certificate</q-item-label>
              <q-item-label class="kmp-font-small">issuing organization by {{profile_certificate.issuing_organization}}</q-item-label>
            </q-item-section>
          </div>
          <div class="col-1 q-mt-xs text-right">
            <q-icon name="visibility" size="20px" class=""/>
          </div>
        </q-item>
        <div v-if="profile_certificate.type != 'training'">
          <q-list v-if="input === true" :hidden="finish_files.length === 0" class="">
            <div v-for="(item, index) in finish_files" :key="index">
              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="true" @delete_knowledge="handleDeleteFile(item, 'file')"/>
            </div>
          </q-list>
          <q-list v-else :hidden="finish_files.length === 0" class="">
            <div v-for="(item, index) in finish_files" :key="index">
              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :download="true" :manage="false" @delete_knowledge="handleDeleteFile(item, 'file')"/>
            </div>
          </q-list>
        </div>
        <div :hidden="finish_files.length > 0" class="col q-mb-md" >
          <q-uploader
            v-if="input === true"
            :url="handleUpload"
            label="Certificate upload"
            multiple
            batch
            auto-upload
            style="width: 100%"
            class="shadow-0 q-uploader--bordered kmp-rounded q-mt-sm"
          />
        </div>
        <q-linear-progress v-if="loading_upload" indeterminate rounded color="negative" class="q-my-sm"/>
      </q-card-section>
      <!-- file pendukung -->
      <q-card-section class="q-pt-none" v-if="input === true">
        <div class="col q-mb-md">
          <q-uploader
            :url="handleUploadFileSupport"
            ref="uploader"
            label="File Pendukung (pdf, png, jpg, jpeg)"
            accept=".pdf, .jpg, image/*"
            multiple
            batch
            auto-upload
            style="width: 100%"
            class="shadow-0 q-uploader--bordered kmp-rounded"
          />
          <!-- <div class="label-form column text-grey-7 q-mt-sm">
            Maks file size 1Mb
          </div> -->
          <!-- <q-separator spaced v-if="finish_files_support.length > 0" /> -->
          <div
                class="label-form column text-grey-7 q-mb-sm q-mt-sm"
                v-if="finish_files_support.length > 0"
            >
                {{ finish_files_support.length }} Files Uploaded
            </div>
            <q-linear-progress
                v-if="uploaded_files"
                indeterminate
                rounded
                color="negative"
                class="q-my-sm"
            />
            <q-list>
              <div v-for="(item, index) in finish_files_support" :key="index">
              <ListFile
                  v-if="item.file !== null"
                  :file="item.file"
                  :item="item"
                  manage="true"
                  @delete_knowledge="handleDeleteFileSupport(item.file.id, 'file', index)"
              />
              </div>
            </q-list>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="input === false">
        <div class="label-form column text-grey-7" v-if="finish_files_support.length !== 0">
          File Pendukung
        </div>
        <q-list>
          <div v-for="(item, index) in finish_files_support" :key="index">
              <ListFile
              v-if="item.file !== null"
              :file="item.file"
              :item="item"
              />
          </div>
        </q-list>
      </q-card-section>
      <!-- alasan -->
      <q-card-section class="q-pt-none" v-if="input === true">
          <div class="label-form column text-grey-7 q-mt-sm" v-if="this.profile_certificate.reason !== null">
            Alasan penolakan : {{ this.profile_certificate.reason }}
          </div>
      </q-card-section>
      <!-- button -->
      <q-card-actions align="right" style="padding: 16px">
        <q-btn no-caps class="full-width" color="primary" v-if="input === true && !profile_certificate.id" label="Submit" @click="handleSave('add')" />
        <q-btn no-caps class="full-width" color="primary" v-if="is_member === true && input === true && profile_certificate.id" label="Update" @click="handleSave('edit')" />
        <q-btn v-if="is_member === false && admin_id == user.id && (profile_certificate.status == 'pending' || profile_certificate.status == 'declined')" no-caps class="full-width q-mt-sm" color="green" label="Approve" @click="handleApprove('approved')"/>
        <q-btn v-if="is_member === false && admin_id == user.id && (profile_certificate.status == 'pending' || profile_certificate.status == 'declined')" no-caps class="full-width q-mt-sm" color="red" label="Decline" @click="modal_decline = true"/>
        <q-btn v-if="is_member === true && profile_certificate.users_id == user.id && profile_certificate.id" no-caps class="full-width q-mt-sm" color="red" label="Delete certificate or training" @click="handleDeleteCertificate" />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="modal_decline" persistent>
      <q-card style="min-width: 300px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Decline Request</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <q-input
            outlined
            dense
            v-model="profile_certificate.reason"
            class=""
            required
            placeholder="Reason"
          ></q-input>
        </q-card-section>

        <q-separator spaced />

        <q-card-actions align="right" class="text-primary">
          <!-- <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> -->
          <q-btn
            class="float-right q-mr-sm publish-button"
            color="km-blue"
            label="Send"
            unelevated
            @click="handleApprove('declined')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog ref="pdfDialog">
      <q-card style="width: 75vw; max-width: 75vw">
        <q-card-section class="row">
          <div class="col justify-between">
            <span class="text-h6 text-weight-bold">Pratinjau File</span>
            <span class="q-ml-md">{{pdfFilename}}</span>
          </div>
          <div class="col-auto">
            <q-btn icon="close" v-close-popup flat round />
          </div>
        </q-card-section>
        <q-card-section style="height: 75vh; max-height: 75vh">
          <iframe
            :src="pdfFile"
            type="application/pdf"
            width="100%"
            height="100%"
            style="overflow: auto"
          ></iframe>
        </q-card-section>
        <q-card-section></q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Notify } from 'quasar';
import { getCredential } from 'src/lib/storage';
import { knowledgeTreeList, certificateCreate, certificateDelete, certificateUpdate, fileDelete, fileUpload, urlCertificateTraining, UserAdmin, CertificateFileSupport, CertificateApproval } from 'src/lib/api';
import KnowledgeListFile from 'components/KnowledgeListFile';
import ListFile from 'components/common/ListFile';
import { axios } from 'boot/axios';
import { dateFormatInsert, deleteList, checkRole } from 'src/lib/helper';
import { point } from '../../lib/point';

import { get } from '../../lib/HttpHelper';

export default {
  props: ['profile', 'certificate'],
  data () {
    return {
      monthArray: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      profile_certificate: {
        enabled: true,
        users_id: null,
        name: null,
        issuing_organization: null,
        issuing_date: null,
        file_id: null,
        duration: null,
        type: null,
        admin: null,
        id: null,
        reason: null,
        file: null,
        business: null,
        knowledge: null
      },
      month_selected: null,
      year_selected: null,
      loading_upload: false,
      upload_done: false,
      finish_files: [],
      monthPicked: null,
      yearPicked: null,
      input: true,
      user: {
        id: '',
        name: '',
        initial: '',
        organization_id: ''
      },
      admin_option: [],
      admin_id: null,
      knowledge_id: null,
      business_id: null,
      modal_decline: false,
      finish_files_support: [],
      uploaded_files: false,
      pdfFile: null,
      pdfFilename: null,
      is_member: false,
      default_direktorat: [],
      default_direktorat_all: [],
      channel_options: [],
      channel_model: '',
      channel_id: '',
      business_option: [],
      knowledge_option: []
    };
  },
  components: { KnowledgeListFile, ListFile },
  methods: {
    checkValue (val, reason, details) {
      if (reason === 'month') {
        this.monthPicked = this.monthArray[val - 1];
        this.$refs.monthPicker.hide();
        this.month_selected = `${val}/1`;
      }
      if (reason === 'year') {
        this.$refs.yearPicker.hide();
        this.year_selected = val;
      }
      if (this.monthPicked && this.yearPicked) {
        const date = new Date(`${this.month_selected}/${this.year_selected}`);
        this.profile_certificate.issuing_date = dateFormatInsert(date);
      }
    },
    filePicked(file) {
      const formData = new FormData();
      formData.append('file[]', file);
      fileUpload(formData).then(res => {
        const response = res.data[0];
        if (res.message === 'OK') {
          this.profilePath = process.env.QUASAR_API_URL + response.path;
          this.profile_edit.profile_picture = response.path;
        }
      });
    },
    handleUpload(files, content_type) {
      this.loading_upload = true;
      files.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', files[i]);
        fileUpload(formData).then(res => {
          const response = res.data[0];
          if (res.message === 'OK') {
            this.finish_files.push(
              { file: response }
            );
            if (files.length === i + 1) {
              this.loading_upload = false;
              this.upload_done = true;
            }
          }
        });
      });
    },
    handleSave(mode) {
      const groupFile = this.finish_files_support.map(item => ({ file_id: item.file.id }));
      const validateForm = (this.finish_files.length > 0 && this.profile_certificate.name && this.profile_certificate.issuing_organization && this.profile_certificate.issuing_date && this.profile_certificate.duration && this.finish_files_support.length > 0 && (this.profile_certificate.admin || this.admin_id));
      if (!validateForm) {
        Notify.create({
          message: 'Form harus diisi dengan lengkap!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        let business = null;
        if (this.profile_certificate.business) {
          business = this.profile_certificate.business.value;
        }
        let knowledge = null;
        if (this.profile_certificate.knowledge) {
          knowledge = this.profile_certificate.knowledge.value;
        }
        if (mode === 'add') {
          this.finish_files.forEach(v => {
            const { id } = v.file;
            const data = {
              enabled: this.profile_certificate.enabled,
              users_id: this.profile_certificate.users_id,
              name: this.profile_certificate.name,
              issuing_organization: this.profile_certificate.issuing_organization,
              issuing_date: this.profile_certificate.issuing_date,
              duration: this.profile_certificate.duration,
              file_id: id,
              admin_id: this.profile_certificate.admin.id,
              business_id: business,
              knowledge_id: knowledge,
              status: 'pending',
              file: groupFile
            };
            certificateCreate(data).then(res => {
              if (res.message === 'OK') {
                Notify.create({
                  message: 'Certificate berhasil di kirim!',
                  timeout: 1000,
                  type: 'positive',
                  color: 'positive',
                  icon: 'check'
                });
                this.$emit('evtClose');
              }
            });
          });
        }
        if (mode === 'edit') {
          let status = '';
          if (this.profile_certificate.status === 'declined') {
            status = 'pending';
          } else {
            status = this.profile_certificate.status;
          }
          this.finish_files.forEach(v => {
            const { id } = v.file;
            const data = {
              name: this.profile_certificate.name,
              issuing_organization: this.profile_certificate.issuing_organization,
              issuing_date: this.profile_certificate.issuing_date,
              duration: this.profile_certificate.duration,
              file_id: id,
              admin_id: this.profile_certificate.admin.id,
              business_id: business,
              knowledge_id: knowledge,
              status,
              reason: this.profile_certificate.reason,
              file: groupFile
            };
            certificateUpdate(this.certificate.id, data).then(res => {
              if (res.message === 'OK') {
                Notify.create({
                  message: 'Certificate berhasil di perbarui!',
                  timeout: 1000,
                  type: 'positive',
                  color: 'positive',
                  icon: 'check'
                });
                this.$emit('evtClose');
              }
            });
          });
        }
      }
    },
    handleDeleteFile(data, type) {
      const file_id = data.file.id;
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this File?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        fileDelete(file_id).then(res => {
          if (res.message === 'OK') {
            Notify.create({
              message: 'Delete file berhasil.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          }
        });
        const removeIndex = this.finish_files.findIndex(v => v.file.id === data);
        this.finish_files = deleteList(this.finish_files, removeIndex);
      });
    },
    handleDeleteCertificate() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this Document?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        certificateDelete(this.certificate.id).then(res => {
          if (res.message === 'OK') {
            Notify.create({
              message: 'Certificate berhasil di hapus!',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            this.$emit('evtClose');
          }
        });
      });
    },
    handleApprove(status) {
      let reason = '';
      if (status === 'declined') {
        reason = this.profile_certificate.reason;
      }
      this.finish_files.forEach(v => {
        const data = {
          status,
          reason
        };
        CertificateApproval(this.certificate.id, data).then(res => {
          if (res.message === 'OK') {
            if (status === 'approved') {
              Notify.create({
                message: 'Approved!',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
              point('add', { tag: 'profile_certificate', certificate_id: this.certificate.id, account_id: this.profile_certificate.users_id });
            } else {
              Notify.create({
                message: 'Declined!',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
            }
            this.$emit('evtClose');
          }
        });
      });
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase(),
        organization_id: profile.unit_kerja_id
      };
      if (this.profile_certificate.status === 'declined' && (this.profile_certificate.users_id === this.user.id)) {
        this.input = true;
      }
    },
    openCertificateTraining(users_id) {
      this.loading_upload = true;
      urlCertificateTraining(users_id).then(res => {
        if (res.message === 'OK') {
          window.open(res.data, '_blank').focus();
          this.loading_upload = false;
        }
      });
    },
    getAdmin() {
      return UserAdmin().then(response => {
        const hasil = response.data;
        this.admin_option = hasil.map(item => {
          return {
            id: item.id,
            name: item.name.toUpperCase()
          };
        });
        if (this.input === true && this.admin_id === null) {
          this.profile_certificate.admin = {
            id: this.admin_option[0].id,
            name: this.admin_option[0].name
          };
        }
      });
    },
    handleUploadFileSupport(files, content_type) {
      this.uploaded_files = true;
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      files.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', files[i]);
        axios
          .post('./api/api/file', formData, config)
          .then(res => {
            const response = res.data.data[0];
            if (res.data.message === 'OK') {
              this.finish_files_support.push({ file: response });
              if (files.length === i + 1) {
                this.uploaded_files = false;
                this.$refs.uploader.reset();
              }
            }
          })
          .catch(error => {
          });
      });
    },
    handleDeleteFileSupport(id, type, index) {
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
                this.finish_files_support.splice(index, 1);
              }
            });
          }
        })
        .onCancel(() => {
        })
        .onDismiss(() => {
        });
    },
    handlePreviewFileCertificate(fileInfo) {
      console.log(fileInfo);
      axios.get(`api/${fileInfo.path}`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: response.data.type });
          this.pdfFile = URL.createObjectURL(blob);
          this.pdfFilename = fileInfo.name;
          this.loading = false;
          this.$refs.pdfDialog.show();
        })
        .catch(error => {
          Notify.create({
            message: `Error: ${error.message}`,
            timeout: 1000,
            type: 'negative',
            color: 'negative',
            icon: 'warning'
          });
          this.loading = false;
        });
    },
    getRole() {
      const role_name = (checkRole() !== null) ? checkRole().name : '';
      if (role_name === 'member') {
        this.is_member = true;
      }
    },
    getDirektorat() {
      get({
        path: 'api/knowledge-tree/direktorat/list'
      }).then(res => {
        const root = res.data;
        this.default_direktorat = root
          .filter(item => item.channel !== null)
          .filter(item => item.channel.enabled === true)
          .filter(item => item.channel.channel_member.length > 0);
        this.default_direktorat_all = root
          .filter(item => item.channel !== null);

        this.$emit('default_direktorat', this.default_direktorat, this.default_direktorat);

        this.channel_options = root
          .filter(item => item.channel !== null)
          .filter(item => item.channel.enabled === true)
          .map(item => {
            return {
              key: `0_${item.id}`,
              value: item.id,
              label: (item.channel.organization === null) ? item.title : item.channel.organization.name,
              organization_id: (item.channel.organization === null) ? 0 : item.channel.organization.id,
              // label: item.title,
              story: item.subtitle,
              icon: 'domain',
              level: 0,
              id: item.id
            };
          })
          .sort((a, b) => (a.label > b.label ? 1 : -1));

        let first = this.channel_options[0];

        let defaultDirectoratId = 0;
        if (this.$route.query.id !== undefined) {
          defaultDirectoratId = parseInt(this.$route.query.id, 10);
          first = this.channel_options.find(x => x.id === defaultDirectoratId);
        } else if (this.default_direktorat.length > 0) {
          defaultDirectoratId = parseInt(this.default_direktorat[0].id, 10);
          first = this.channel_options.find(x => x.id === defaultDirectoratId);
        }

        this.channel_model = first;
        this.channel_id = first.value;

        this.direktoratSelect(this.channel_id);
      });
    },
    direktoratSelect(id) {
      setTimeout(() => {
        if (id) {
          knowledgeTreeList({ id }).then(res => {
            const business = res.data[0].children.map(b => {
              return {
                value: b.id,
                label: b.title,
                subLabel: b.subtitle,
                children: b.children
              };
            });
            this.business_option = business;
          });
        } else {
          this.profile_certificate.business = null;
          this.business_option = [];
          this.profile_certificate.knowledge = null;
          this.knowledge_option = [];
        }
      }, 0);
    },
    businessSelect(node) {
      setTimeout(() => {
        const strategic = this.business_option.find(f => { return f.value === node.value; }).children.map(s => {
          return {
            value: s.id,
            label: s.title,
            subLabel: s.subtitle,
            children: s.children
          };
        });
        const basic = strategic.map(b => {
          return b.children;
        });
        const a = [];
        for (let i = 0; i < basic.length; i++) {
          for (let y = 0; y < basic[i].length; y++) {
            a.push(basic[i][y]);
          }
        }
        const knowledge = a.map(k => {
          return {
            value: k.id,
            label: k.title,
            subLabel: k.subtitle,
            children: k.children
          };
        });
        this.knowledge_option = knowledge || [];
        if (this.knowledge_option.length === 0) {
          this.knowledge_option.push({
            value: null,
            label: null,
            subLabel: null,
            children: null
          });
        }
      }, 0);
    }
  },
  mounted() {
    this.getUser();
    this.getAdmin();
    this.getRole();
    this.getDirektorat();
  },
  watch: {
    profile: {
      immediate: true,
      deep: true,
      handler(value) {
        this.profile_certificate.users_id = value.profile_id;
      }
    },
    certificate: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) {
          const date = new Date(value.issuing_date);
          this.input = false;
          this.profile_certificate.id = value.id;
          this.profile_certificate.name = value.name;
          this.profile_certificate.issuing_organization = value.issuing_organization;
          this.profile_certificate.issuing_date = dateFormatInsert(date);
          this.profile_certificate.duration = value.duration;
          this.monthPicked = this.monthArray[date.getMonth()];
          this.yearPicked = date.getFullYear();
          this.month_selected = `${date.getMonth() + 1}/1`;
          this.year_selected = this.yearPicked;
          this.finish_files = value.file ? [{ file: value.file }] : [];
          this.profile_certificate.type = value.type;
          this.profile_certificate.status = value.status;
          this.profile_certificate.reason = value.reason;
          this.admin_id = value.admin_id;
          this.knowledge_id = value.knowledge_id;
          this.business_id = value.business_id;
          this.finish_files_support = [];
          this.profile_certificate.file_id = value.file_id;
          this.profile_certificate.file = value.file;
          CertificateFileSupport(value.id)
            .then(response => {
              response.data.forEach((v, i) => {
                if (v.filename_type === null) {
                  this.finish_files_support.push({
                    file: {
                      filemime: v.filemime,
                      filename: v.filename,
                      filesize: v.filesize,
                      path: v.path,
                      id: v.id
                    }
                  });
                }
              });
            });
          if (this.admin_id) {
            this.profile_certificate.admin = value.user.name;
          } else {
            this.profile_certificate.admin = null;
          }
          if (this.knowledge_id) {
            this.profile_certificate.knowledge = value.knowledge.title;
          } else {
            this.profile_certificate.knowledge = null;
          }
          if (this.business_id) {
            this.profile_certificate.business = value.business.title;
          } else {
            this.profile_certificate.business = null;
          }
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.card-quiz-create
  width: 100%
  max-width: 400px
</style>
