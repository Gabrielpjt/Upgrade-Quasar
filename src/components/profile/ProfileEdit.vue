<template>
  <div class="card-quiz-create">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Edit Profile</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-y-md column">
          <div class="column items-center">
            <div class="col q-pb-md">
              <q-avatar bordered size="120px" style="border-color: #FFFFFF">
                <img v-if="profilePath !== null" :src="profilePath">
                <img v-if="profile.profile_picture !== null" :src="profile.profile_picture">
                <q-avatar bordered size="120px" style="border-color: #FFFFFF" color="primary" text-color="white" v-else="">
                  {{ profile.profile_name.match(/\b(\w)/g).join('').toUpperCase() }}
                </q-avatar>
              </q-avatar>
            </div>
            <!-- <div hidden>
              <q-file ref="file" dense clearable filled @input="filePicked"></q-file>
            </div> -->
            <!-- <div class="col q-pb-md">
              <q-btn @click="handleUpload" dense no-caps color="primary" outline type="file">Change Profile Picture</q-btn>
            </div> -->
            <q-btn dense no-caps color="primary" outline type="file" @click="handleUpload()">
              <input
                hidden
                type="file"
                ref="file"
                @change="uploadImage($event)"
                accept="image/*"
              />
              Change Profile Picture
            </q-btn>
          </div>
          <div class="column text-grey-7">
            <div class="col q-mb-md">
              <label class="label-form">Displayed Name</label>
              <q-input disable dense outlined v-model="profile_edit.name" name="name" placeholder="Name" />
            </div>
            <div class="col q-mb-md">
              <label class="label-form">Phone</label>
              <q-input dense outlined v-model="profile_edit.phone" name="phone" placeholder="Phone" />
            </div>
            <div class="col q-mb-md">
              <label class="label-form">NIP</label>
              <q-input disable dense outlined v-model="profile_edit.nip" name="nip" placeholder="NIP" />
            </div>
            <div class="col q-mb-md" align="right">
              <q-btn color="primary" label="Save" @click="handleSave" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator inset style="height: 1.1px"/>
      <q-card-section>
        <div class="q-gutter-y-md column">
          <div class="column text-grey-7">
            <div class="col q-mb-md">
              <label class="label-form">Unit Kerja</label>
              <q-select
                v-model="unit_kerja_id"
                :options="options_unit_kerja"
                emit-value
                map-options />
            </div>
          </div>
          <div class="column text-grey-7">
            <div class="col q-mb-md">
              <label class="label-form">Jabatan</label>
              <q-select
                v-model="jabatan_id"
                :options="options_jabatan"
                emit-value
                map-options />
            </div>
          </div>
          <div class="column text-grey-7">
            <div class="col q-mb-md">
              <label class="label-form">Golongan</label>
              <q-select
                v-model="golongan_id"
                :options="options_golongan"
                emit-value
                map-options/>
            </div>
          </div>
          <div class="col q-mb-md" align="right">
            <q-linear-progress v-if="loading" indeterminate rounded color="negative" class="q-my-sm"/>
            <q-btn v-else color="primary" label="Request" @click="handleRequest" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="modal_upload">
      <q-card class="card-quiz-create">
        <q-card-section class="q-pt-none text-right">
          <cropper ref="cropper"
            class="cropper"
            :src="image.src"
            stencil-component="circle-stencil"
            :stencil-props="{
              aspectRatio: 1/1,
            }"/>
          <preview
            :width="120"
            :height="120"
            :image="result.image"
            :coordinates="result.coordinates"
          />
          <q-btn @click="cropImage" dense no-caps class="q-mt-lg" color="primary" outline>Crop image</q-btn>
          <!-- <button class="button" @click="cropImage">Crop image</button> -->
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import PreloadedSelect from 'components/PreloadedSelect';
import { Notify } from 'quasar';
import { fileUpload, profileUpdate, organizationListCustom, postProfileRequestJabatan } from 'src/lib/api';
import { Cropper, Preview } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
// fileUpload

export default {
  props: ['profile'],
  component: { Cropper, Preview, PreloadedSelect },
  data () {
    return {
      modal_upload: false,
      profile_edit: {
        name: null,
        phone: null,
        nip: null,
        profile_picture: null
      },
      selectedFile: null,
      profilePath: null,
      result: {
        coordinates: null,
        image: null
      },
      image: {
        src: null,
        type: 'image/jpg',
        lastModified: null,
        lastModifiedDate: null,
        size: null
      },
      unit_kerja_id: null,
      jabatan_id: null,
      golongan_id: null,
      options_unit_kerja: [],
      options_jabatan: [],
      options_golongan: [],
      loading: false
    };
  },
  methods: {
    filePicked(file) {
      // console.log(file);
      // const formData = new FormData();
      // formData.append('file[]', file);
      // fileUpload(formData).then(res => {
      //   const response = res.data[0];
      //   if (res.message === 'OK') {
      //     this.profilePath = process.env.QUASAR_API_URL + response.path;
      //     this.profile_edit.profile_picture = response.path;
      //   }
      // });

      // CROP
    },
    handleUpload() {
      // this.$refs.file.pickFiles();
      this.$refs.file.click();
    },
    handleSave() {
      profileUpdate(this.profile.profile_id, this.profile_edit).then(res => {
        if (res.message === 'OK') {
          Notify.create({
            message: 'Update profile berhasil!',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          this.$emit('evtClose');
          this.$store.dispatch('user/updatePic', this.profile_edit.profile_picture);
          this.$root.$emit('changeProfilePic', this.profile_edit.profile_picture);
          console.log('2');
        }
      });
    },
    cropImage() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        const formData = new FormData();
        canvas.toBlob(blob => {
          blob.lastModified = this.image.lastModified;
          blob.lastModifiedDate = this.image.lastModifiedDate;
          blob.name = this.image.name;
          blob.filename = this.image.name;
          formData.append('file[]', blob, blob.filename);
          console.log('[save bg img]');
          fileUpload(formData).then(res => {
            const response = res.data[0];
            if (res.message === 'OK') {
              this.profilePath = process.env.QUASAR_API_URL + response.path;
              this.profile_edit.profile_picture = response.path;
            }
          });
        }, 'image/png');
      }
      this.modal_upload = false;
    },
    uploadImage(event) {
      const { files } = event.target;
      if (files && files[0]) {
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        const blob = URL.createObjectURL(files[0]);
        this.image = {
          lastModified: files[0].lastModified,
          lastModifiedDate: files[0].lastModifiedDate,
          size: files[0].size,
          name: files[0].name,
          src: blob,
          type: files[0].type
        };
      }
      this.modal_upload = true;
    },
    fetchOrganiation(params) {
      return organizationListCustom(params);
    },
    loadUnitKerja() {
      const params = {};
      params.group = 'unit-kerja';
      params.public = true;
      this.options_unit_kerja = [];
      this.unit_kerja_id = null;
      organizationListCustom(params)
        .then(response => {
          this.options_unit_kerja = response.data;
          this.unit_kerja_id = this.profile.profile_unit_kerja_id;
        })
        .catch(error => {
        });
    },
    loadJabatan() {
      const params = {};
      params.group = 'jabatan';
      this.options_jabatan = [];
      this.jabatan_id = null;
      organizationListCustom(params)
        .then(response => {
          this.options_jabatan = response.data;
          this.jabatan_id = this.profile.profile_jabatan_id;
        })
        .catch(error => {
        });
    },
    loadGolongan() {
      const params = {};
      params.group = 'golongan';
      this.options_golongan = [];
      this.golongan_id = null;
      organizationListCustom(params)
        .then(response => {
          this.options_golongan = response.data;
          this.golongan_id = this.profile.profile_golongan_id;
        })
        .catch(error => {
        });
    },
    handleRequest() {
      this.loading = true;
      const params = {};
      params.users_id = this.profile.profile_id;
      params.unit_kerja_id = this.unit_kerja_id;
      params.jabatan_id = this.jabatan_id;
      params.golongan_id = this.golongan_id;
      postProfileRequestJabatan(params).then(res => {
        this.loading = false;
        if (res.message === 'OK') {
          Notify.create({
            message: 'Request profile berhasil dikirim, menunggu konfirmasi!',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          this.$emit('evtClose');
        }
      });
    }
  },
  mounted() {
    this.loadUnitKerja();
    this.loadJabatan();
    this.loadGolongan();
  },
  watch: {
    profile: {
      immediate: true,
      deep: true,
      handler(value) {
        const path = value.profile_picture ? value.profile_picture.split('//')[1] : null;
        this.profile_edit.profile_picture = path;
        this.profile_edit.name = value.profile_name;
        this.profile_edit.phone = value.profile_phone;
        this.profile_edit.nip = value.profile_nip;
      }
    }
  },
  destroyed() {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src);
    }
  }
};
</script>

<style lang="sass" scoped>
.card-quiz-create
  width: 100%
  max-width: 400px

.cropper
  min-height: 300px
  width: 100%
</style>
