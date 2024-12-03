<template>
  <div class="q-mt-sm q-gutter-sm text-center q-mb-lg">
    <div class="row ">
      <div class="col-3 q-px-xs" v-if="['COP','Project', 'Hobby'].includes(data.channel_type) && state === 'guest'">
        <q-btn :disable="disable_btn_request" unelevated stack class="btn-tools2 kmp-channel-button" @click="handleJoinMember();">
          <div class="items-center">
            <q-icon left name="login" class="btn-tools2-icon" />
            <div class="text-center btn-tools2-text" v-if="data.is_private == true">
              Request Join
            </div>
            <div class="text-center btn-tools2-text" v-else>
              Join
            </div>
          </div>
        </q-btn>
      </div>
      <div class="col-3 q-px-xs" v-show="role_add">
        <q-btn unelevated stack class="btn-tools2 kmp-channel-button" @click="handleAddMember();">
          <div class="items-center">
            <q-icon left name="person_add" class="btn-tools2-icon" />
            <div class="text-center btn-tools2-text">
              Add Member
            </div>
          </div>
        </q-btn>
      </div>
      <!-- <div class="col-3 q-px-xs">
        <q-btn unelevated stack class="btn-tools2 kmp-channel-button">
          <div class="items-center">
            <q-icon left name="search" class="btn-tools2-icon" />
            <div class="text-center btn-tools2-text">
              Search
            </div>
          </div>
        </q-btn>
      </div> -->
      <div class="col-3 q-px-xs" v-if="data.channel_type === 'Direktorat'">
        <q-btn unelevated stack class="btn-tools2 kmp-channel-button" @click="$router.push({ name: 'knowledge' })">
          <div class="items-center">
            <q-icon left name="book" class="btn-tools2-icon" />
            <div class="text-center btn-tools2-text">
              KMAP
            </div>
          </div>
        </q-btn>
      </div>
      <div class="col-3 q-px-xs" v-if="(data.channel_type !== 'General' && data.channel_type !== 'Direktorat' && ['Member','Admin'].includes(state))">
        <q-btn unelevated stack class="btn-tools2 kmp-channel-button" @click="handleDeleteMember();">
          <div class="items-center">
            <q-icon left name="logout" class="btn-tools2-icon" />
            <div class="text-center btn-tools2-text">
              Leave
            </div>
          </div>
        </q-btn>
      </div>
      <div class="col-3 q-px-xs" v-if="(data.channel_type === 'General' && is_km_manager) || (['Admin','Channel Manager'].includes(state) && data.channel_type !== 'General') || (data.channel_type === 'Direktorat' && (is_channel_manager || is_content_manager))">
        <q-btn unelevated stack class="btn-tools2 kmp-channel-button">
          <div class="items-center">
            <q-icon left name="more_horiz" class="btn-tools2-icon" />
            <div class="text-center btn-tools2-text">
              More
            </div>
          </div>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section v-if="(data.channel_type === 'General' && is_km_manager) || (data.channel_type !== 'Direktorat' && state === 'Admin') || (data.channel_type === 'Direktorat' && (is_channel_manager || is_content_manager))" @click="handleEdit(data);" class="km-list-more">Edit Channel</q-item-section>
              </q-item>
              <q-item clickable v-close-popup v-if="data.channel_type !== 'Direktorat' && state === 'Admin'">
                <q-item-section color="km-blue" @click="handleDelete();" class="km-list-more">Delete Channel
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

      </div>
    </div>
    <q-dialog v-model="edit_channel" :maximized="$q.platform.is.mobile ? true : false">
      <q-card style="min-width: 300px" class="q-py-md q-px-sm">
        <q-card-section class="q-py-none mobile-only row">
          <div class="col-1 q-mt-xs">
            <q-icon name="arrow_back" class="" :size="$q.platform.is.mobile ? '20px' : '30px'"
                    style="" v-close-popup/>
          </div>
          <div class="col-10 q-mt-sm">
            <q-item-section class="q-ml-sm">
              <q-item-label class="kmp-text-nama">Edit Channel</q-item-label>
            </q-item-section>
          </div>
        </q-card-section>
        <q-separator class="mobile-only q-mt-sm"/>
        <q-card-section>
          <q-icon name="close" size="24px" class="text-neutral float-right desktop-only" v-close-popup/>
          <div class="text-title-form q-mb-md text-capitalize desktop-only">Edit channel</div>
          <div class="text-desc-form">Channels are where your team communicates. It could change the type like
            Department, Community of Practice, and General.
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel type</div>
          <q-select
            outlined
            dense
            autofocus
            v-model="type"
            :options="options_type_admin"
            :disable="isDirektorat || isGeneral"
            behavior="menu"
            v-if="is_channel_manager==true"/>
          <q-select
            outlined
            dense
            autofocus
            v-model="type"
            :options="options_type_member"
            :disable="isDirektorat || isGeneral"
            behavior="menu"
            v-else/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel Name</div>
          <q-input dense v-model="name" outlined/>
        </q-card-section>
        <!--  :disable="isDirektorat" -->

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel Short Name</div>
          <q-input dense v-model="short_name" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Descriptions</div>
          <q-input dense v-model="desc" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Manfaat bagi Organisasi</div>
          <q-input dense v-model="cop_organisasi" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Manfaat bagi Anggota Komunitas</div>
          <q-input dense v-model="cop_komunitas" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Minat Komunitas</div>
          <q-input dense v-model="cop_minat" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Fokus Pengetahuan</div>
          <q-input dense v-model="cop_fokus" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="type==='CoP'">
          <div class="text-form"> Aturan Dasar</div>
          <q-input dense v-model="cop_aturan" autogrow type="textarea" outlined/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel Avatar</div>
          <div class="row q-gutter-md">
            <q-avatar rounded size="56px" font-size="56px" color="blue-3" text-color="white">
              <img v-if="avatar_channel" :src="avatar_channel">
              <q-icon v-else name="account_circle"/>
            </q-avatar>
            <!-- <div hidden>
              <q-file ref="file" dense clearable filled @input="filePicked"></q-file>
            </div> -->
            <q-btn no-caps class="self-end" @click="handleUpload" color="primary" outline size="md"
                   type="file">
                   <input
                    hidden
                    type="file"
                    ref="file"
                    @change="uploadImage($event)"
                    accept="image/*"
                  />
                  Edit
            </q-btn>
            <q-btn no-caps class="self-end text-weight-bolder" @click="handleDel('avatar')" color="negative" flat>
              Delete
            </q-btn>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-form"> Channel Banner</div>
          <q-img v-show="banner_channel" :src="banner_channel" height="" style="border: 1px solid #bdbdbd; border-radius: 5px;">
            <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
                   style="top: 8px; right: 8px" @click="handleDel('banner')"
            />
          </q-img>
          <q-img v-show="!banner_channel" src="../assets/images/upload.png" class="cursor-pointer" @click="handleUploadBanner"/>
          <input
            hidden
            type="file"
            ref="fileBanner"
            @change="uploadImageBanner($event)"
            accept="image/*"
          />
          <!-- <q-uploader
            :url="handleUploadBanner"
            ref="uploader_banner"
            :label="`Banner Channel - Maks file size 1Mb (400 x 150 px)`"
            max-files="1"
            accept="image/*"
            batch
            auto-upload
            style="width: 100%"
            class="shadow-0 q-uploader--bordered kmp-rounded"
          /> -->
        </q-card-section>

        <q-card-section v-if="!isDirektorat || !isGeneral" class="q-py-none">
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-toggle
                  v-model="private_channel"
                  checked-icon="check"
                  color="blue"
                  size="lg"
                  :disable="isDirektorat || isGeneral"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Private Channel</q-item-label>
                <q-item-label caption>Once you make private, only member you invite can view & joined the
                  channel</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <!-- <q-card-section class="q-py-none">
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-toggle
                  v-model="enabled"
                  checked-icon="check"
                  color="blue"
                  size="lg"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Enable Channel</q-item-label>
                <q-item-label caption>Disable channel will not show on member pages</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section> -->

        <q-card-actions align="right" class="text-primary">
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button full-width" label="Save Changes" unelevated
                 v-close-popup @click="updateChannel();"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="leave_channel" persistent>
      <q-card style="min-width: 300px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon name="close" size="24px" class="text-neutral float-right" v-close-popup/>
          <div class="text-title-form q-mb-md">Are you sure want to leave channel?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn color="km-red" outline class="full-width text-weight-bold q-ma-sm" label="Leave Channel" v-close-popup
                 @click="handleDeleteMember();"/>
          <q-btn color="km-blue" outline class="full-width text-weight-bold q-ma-sm" label="Cancel" v-close-popup/>
        </q-card-section>

      </q-card>
    </q-dialog>
    <q-dialog v-model="delete_channel" persistent>
      <q-card style="min-width: 300px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon name="close" size="24px" class="text-neutral float-right" v-close-popup/>
          <div class="text-title-form q-mb-md">Are you sure want to delete channel?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn color="km-red" outline class="full-width text-weight-bold q-ma-sm" label="Delete Channel" v-close-popup
                 @click="deleteChannel();"/>
          <q-btn color="km-blue" outline class="full-width text-weight-bold q-ma-sm" label="Cancel" v-close-popup/>
        </q-card-section>

      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_upload_avatar">
      <q-card class="card-quiz-create">
        <q-card-section class="q-pt-none text-right">
          <cropper ref="cropper"
            class="cropper"
            :src="image.src"
            stencil-component="circle-stencil"
            :stencil-props="{
              aspectRatio: 1/1,
            }"/>
          <Preview
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
    <q-dialog v-model="modal_upload_banner">
      <q-card class="card-quiz-create">
        <q-card-section class="q-pt-none text-right">
          <cropper ref="cropperBanner"
            class="cropper"
            :src="imageBanner.src"
            :stencil-props="{
              aspectRatio: 16/4,
            }"/>
          <Preview
            :width="120"
            :height="120"
            :image="resultBanner.image"
            :coordinates="resultBanner.coordinates"
          />
          <q-btn @click="cropImageBanner" dense no-caps class="q-mt-lg" color="primary" outline>Crop image</q-btn>
          <!-- <button class="button" @click="cropImage">Crop image</button> -->
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import { checkRole } from 'src/lib/helper';
import { Notify } from 'quasar';
import { Cropper, Preview } from 'vue-advanced-cropper';
import bus from 'components/common/EventBus';
import {
  channelUpdate,
  channelDelete, fileUpload
} from '../lib/api';
import { point } from '../lib/point';
import 'vue-advanced-cropper/dist/style.css';

export default {
  props: ['data', 'state', 'user', 'is_channel_manager', 'is_km_manager', 'is_content_manager'],
  component: { Cropper, Preview },
  data() {
    return {
      is_loading: true,
      channel: false,
      edit_channel: false,
      organization_id: null,
      type: null,
      name: null,
      short_name: null,
      desc: null,
      avatar: null,
      banner: null,
      avatar_channel: null,
      banner_channel: null,
      add_channel: false,
      private_channel: false,
      enabled: false,
      delete_channel: false,
      leave_channel: false,
      options_type_admin: [
        'CoP', 'Project', 'Hobby'
      ],
      options_type_member: [
        'Project', 'Hobby'
      ],
      cop_organisasi: null,
      cop_komunitas: null,
      cop_minat: null,
      cop_fokus: null,
      cop_aturan: null,
      isDirektorat: false,
      isGeneral: false,
      more_role: false,
      disable_btn_request: false,
      modal_upload_avatar: false,
      modal_upload_banner: false,
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
      resultBanner: {
        coordinates: null,
        image: null
      },
      imageBanner: {
        src: null,
        type: 'image/jpg',
        lastModified: null,
        lastModifiedDate: null,
        size: null
      }
    };
  },
  methods: {
    handleAddMember() {
      this.$emit('handleMember', '', '');
    },
    handleEdit(data) {
      if (this.data.channel_type === 'Direktorat') {
        this.isDirektorat = true;
      }
      if (this.data.channel_type === 'General') {
        this.isGeneral = true;
      }
      if (data.avatar) {
        this.avatar_channel = `${process.env.QUASAR_API_URL}${data.avatar}`;
      }
      if (data.banner) {
        this.banner_channel = `${process.env.QUASAR_API_URL}${data.banner}`;
      }
      this.organization_id = data.organization_id;
      this.type = data.channel_type === 'COP' ? 'CoP' : data.channel_type;
      this.name = data.name;
      this.short_name = data.short_name;
      this.desc = data.description;
      this.cop_organisasi = data.cop_organisasi;
      this.cop_komunitas = data.cop_komunitas;
      this.cop_minat = data.cop_minat;
      this.cop_fokus = data.cop_fokus;
      this.cop_aturan = data.cop_aturan;
      this.avatar = data.avatar;
      this.banner = data.banner;
      this.private_channel = data.is_private;
      this.edit_channel = true;
    },
    handleLeave() {
      this.leave_channel = true;
    },
    handleDelete() {
      this.delete_channel = true;
    },
    handleDeleteMember() {
      this.$emit('handleDeleteMember', '', '');
    },
    updateChannel() {
      let tipe = this.type;
      if (this.type === 'CoP') {
        tipe = 'COP';
      }
      this.is_loading = true;
      this.$emit('loading', 'is_loading', true);
      const data_update = {
        organization_id: this.organization_id,
        channel_type: tipe,
        name: this.name,
        short_name: this.short_name,
        channel_locked: false,
        description: this.desc,
        is_private: this.private_channel,
        avatar: this.avatar,
        banner: this.banner,
        cop_organisasi: this.cop_organisasi,
        cop_komunitas: this.cop_komunitas,
        cop_minat: this.cop_minat,
        cop_fokus: this.cop_fokus,
        cop_aturan: this.cop_aturan
        // enabled: this.enabled
      };
      channelUpdate(this.data.id, data_update).then(response => {
        this.is_loading = false;
        this.$emit('loading', 'is_loading', false);
        this.$q.notify({
          message: 'Channel Updated.',
          color: 'blue'
        });
      });
    },
    handleJoinMember() {
      this.disable_btn_request = true;
      this.$emit('handleJoin', '', '');
    },
    deleteChannel() {
      this.is_loading = true;
      this.$emit('loading', 'is_loading', true);
      channelDelete(this.data.id).then(response => {
        point('rollback', { tag: 'channel_moderator', channel_id: this.data.id });
        this.is_loading = false;
        // this.$emit('loading', 'is_loading', false);
        this.$q.notify({
          message: 'Channel Deleted sucessfully.',
          color: 'blue'
        });
        this.$router.push({ name: 'admin-home' });
        bus.$emit('update_point');
      });
    },
    handleUpload() {
      this.$refs.file.click();
    },
    handleUploadBanner() {
      this.$refs.fileBanner.click();
    },
    handleDel(type) {
      console.log('oke');
      if (type === 'avatar') {
        this.avatar = null;
        this.avatar_channel = null;
      } else if (type === 'banner') {
        this.banner = null;
        this.banner_channel = null;
      }
    },
    filePicked(file) {
      const formData = new FormData();
      formData.append('file[]', file);
      fileUpload(formData).then(res => {
        const response = res.data[0];
        if (res.message === 'OK') {
          this.avatar = response.path;
          this.avatar_channel = process.env.QUASAR_API_URL + response.path;
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
          fileUpload(formData).then(res => {
            const response = res.data[0];
            if (res.message === 'OK') {
              this.avatar = response.path;
              this.avatar_channel = process.env.QUASAR_API_URL + response.path;
            }
          });
        }, 'image/png');
      }
      this.modal_upload_avatar = false;
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
      this.modal_upload_avatar = true;
    },
    cropImageBanner() {
      const { canvas } = this.$refs.cropperBanner.getResult();
      if (canvas) {
        const formData = new FormData();
        canvas.toBlob(blob => {
          blob.lastModified = this.imageBanner.lastModified;
          blob.lastModifiedDate = this.imageBanner.lastModifiedDate;
          blob.name = this.imageBanner.name;
          blob.filename = this.imageBanner.name;
          formData.append('file[]', blob, blob.filename);
          fileUpload(formData).then(res => {
            const response = res.data[0];
            if (res.message === 'OK') {
              this.banner = response.path;
              this.banner_channel = process.env.QUASAR_API_URL + response.path;
            }
          });
        }, 'image/png');
      }
      this.modal_upload_banner = false;
    },
    uploadImageBanner(event) {
      const { files } = event.target;
      if (files && files[0]) {
        if (this.imageBanner.src) {
          URL.revokeObjectURL(this.imageBanner.src);
        }
        if (files[0].size >= 1 * 1024 * 1024) {
          Notify.create({
            message: `[ ${files[0].name} ] melebihi batas 1MB`,
            color: 'negative',
            icon: 'error'
          });
        } else {
          const blob = URL.createObjectURL(files[0]);
          this.imageBanner = {
            lastModified: files[0].lastModified,
            lastModifiedDate: files[0].lastModifiedDate,
            size: files[0].size,
            name: files[0].name,
            src: blob,
            type: files[0].type
          };
          this.modal_upload_banner = true;
        }
      }
    }
    // handleUploadBanner(files, content_type) {
    //   files.forEach((v, i, a) => {
    //     if (files[i].size >= 1 * 1024 * 1024) {
    //       Notify.create({
    //         message: `[ ${files[i].name} ] melebihi batas 1MB`,
    //         color: 'negative',
    //         icon: 'error'
    //       });
    //     } else {
    //       const formData = new FormData();
    //       formData.append('file[]', files[i]);
    //       fileUpload(formData).then(res => {
    //         const response = res.data[0];
    //         this.banner = response.path;
    //         this.banner_channel = process.env.QUASAR_API_URL + response.path;
    //       }).catch(error => {
    //         // console.log(error.response);
    //       });
    //     }
    //   });
    // }
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.isDirektorat = value.channel_type ? value.channel_type.toLowerCase() === 'direktorat' : false;
        this.isGeneral = value.channel_type ? value.channel_type.toLowerCase() === 'general' : false;
      }
    }
  },
  computed: {
    // is_km_manager() {
    //   return checkRole().name === 'km_manager';
    // },
    // is_channel_manager() {
    //   return checkRole().name === 'channel_manager';
    // },
    // is_content_manager() {
    //   return checkRole().name === 'content_manager';
    // },
    role_add() {
      let role = false;
      if (this.data.channel_type === 'General' || this.data.channel_type === 'Direktorat') {
        role = false;
      } else if ((this.data.channel_type === 'Project' || this.data.channel_type === 'Hobby' || this.data.channel_type === 'COP') && ['Admin', 'Channel Manager'].includes(this.state)) {
        role = true;
      }
      return role;
    },
    is_this_channel_manager() {
      const cek = this.state === 'Channel Manager';
      return cek;
    }
  }
};
</script>

<style>
</style>
