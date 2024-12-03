<template>
  <div class="card-quiz-create">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ event.id ? 'Edit Event' : 'Add New Event' }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-y-md column">
          <div class="column text-grey-7">
            <div class="col q-mb-md">
              <label class="label-form">Event Name</label>
              <q-input dense outlined placeholder="Ex: Google Analytics Certificate" v-model="event.name"/>
            </div>
            <div class="col q-mb-md">
              <label class="label-form">Event Location</label>
              <q-input dense outlined placeholder="Add location of the event" v-model="event.locations"/>
            </div>
            <div class="col q-mb-md">
              <div class="row">
                <div class="col">
                  <label class="label-form">Start Date</label>
                  <q-input dense outlined v-model="event.start_date"
                           class="q-mr-xs"
                           placeholder="Start date"
                           mask="date"
                           :rules="['date']"
                           hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale">
                          <q-date v-model="event.start_date" @input="setStartDate()">
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col">
                  <label class="label-form">Start Time</label>
                  <q-input dense outlined v-model="event.start_time"
                           class="q-ml-xs"
                           placeholder="-- : --"
                           mask="time"
                           :rules="['time']"
                           hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy ref="qTimeProxyStart" transition-show="scale" transition-hide="scale">
                          <q-time v-model="event.start_time" mask="HH:mm" format24h @input="setStartTime()">
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
            <div class="col q-mb-md">
              <div class="row">
                <div class="col">
                  <label class="label-form">End Date</label>
                  <q-input dense outlined v-model="event.end_date"
                           class="q-mr-xs"
                           placeholder="End date"
                           mask="date"
                           :rules="['date']"
                           hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qEndDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="event.end_date" @input="$refs.qEndDateProxy.hide()">
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col">
                  <label class="label-form">End Time</label>
                  <q-input dense outlined v-model="event.end_time"
                           class="q-ml-xs"
                           placeholder="-- : --"
                           mask="time"
                           :rules="['time']"
                           hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy ref="qEndTimeProxy" transition-show="scale" transition-hide="scale">
                          <q-time v-model="event.end_time" mask="HH:mm" format24h @input="$refs.qEndTimeProxy.hide()">
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>

          </div>
        </div>
      </q-card-section>
      <!-- <q-card-section class="q-pt-none">
        <div v-show="finish_files.length > 0" class="q-mb-md">
          <div class="q-col-gutter-md row items-start">
            <div class="col-6" v-for="(item, index) in finish_files" :key="index">
              <q-img :src="getPic(item)" style="height: 140px; max-width: 150px"/>
              <q-btn
                round
                class="absolute"
                color="red"
                size="xs"
                icon="close"
                @click="removeFile(item)"
              />
            </div>
          </div>
        </div>
        <q-uploader
          :url="handleUploadEvent"
          ref="uploader"
          label="Photo Event"
          accept="image/*"
          multiple
          batch
          auto-upload
          style="width: 100%"
          class="shadow-0 q-uploader--bordered kmp-rounded"
        /> -->
        <!-- <div class="q-mt-sm">
          Maks file size 1Mb
        </div> -->
      <!-- </q-card-section> -->
      <q-card-section class="q-pt-none">
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
      <!-- alasan -->
      <q-card-section v-if="event.status == 'Declined' && event.reason !== null">
        <div class="label-form column text-grey-7 q-mt-sm">
          Alasan penolakan : {{ event.reason }}
        </div>
      </q-card-section>
      <q-card-actions align="right" style="padding: 16px">
        <q-btn no-caps class="full-width" color="primary" label="Save" @click="handleSave" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>

import { Notify } from 'quasar';
import { axios } from 'boot/axios';
import ListFile from 'components/common/ListFile';
import { eventCreate, eventUpdate, fileUpload, fileDelete, EventFileSupport } from 'src/lib/api';
import { deleteList } from 'src/lib/helper';

export default {
  props: ['user', 'data'],
  data () {
    return {
      event: {
        created_by: this.user.id,
        name: null,
        locations: null,
        start_date: null,
        start_time: null,
        end_date: null,
        end_time: null,
        file_id: null,
        expertise: [
          { users_id: this.user.id, name: this.user.name, roles: 'Speaker' }
        ],
        picture: null
      },
      finish_files: [],
      finish_files_support: [],
      uploaded_files: false,
      id_file: ''
    };
  },
  components: { ListFile },
  methods: {
    optionsFn(date) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();

      today = `${yyyy}/${mm}/${dd}`;
      return date >= today;
    },
    getToday() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();

      today = `${yyyy}/${mm}/${dd}`;
      return today;
    },
    setStartDate() {
      this.$refs.qDateProxyStart.hide();
      this.event.end_date = this.event.start_date;
    },
    setStartTime() {
      this.$refs.qTimeProxyStart.hide();
      this.event.end_time = this.event.start_time;
    },
    handleUploadEvent(files, content_type) {
      files.forEach((v, i, a) => {
        if (files[i].size >= 1 * 1024 * 1024) {
          Notify.create({
            message: `[ ${files[i].name} ] melebihi batas 1MB`,
            color: 'negative',
            icon: 'error'
          });
        } else {
          const formData = new FormData();
          formData.append('file[]', files[i]);
          fileUpload(formData).then(res => {
            const response = res.data[0];
            this.finish_files.push(response.path);
            if (files.length === i + 1) {
              this.$refs.uploader.reset();
            }
          }).catch(error => {
            // console.log(error.response);
          });
        }
      });
    },
    removeFile(file) {
      const idx = this.finish_files.findIndex(v => v === file);
      deleteList(this.finish_files, idx);
      // this.event.picture = this.finish_files.join(',');
    },
    validate() {
      let res = false;
      if (this.event.name !== null) {
        res = true;
      }
      return res;
    },
    createEvent() {
      const groupFile = this.finish_files_support.map(item => ({ file_id: item.file.id }));
      const pic = this.finish_files.length > 0
        ? this.finish_files.join(',') : null;
      const param = {
        created_by: this.event.created_by,
        enabled: false,
        status: 'Pending',
        start_date: this.event.start_date,
        end_date: this.event.end_date,
        start_time: this.event.start_time,
        end_time: this.event.end_time,
        locations: this.event.locations,
        name: this.event.name,
        picture: pic,
        expertise: this.event.expertise,
        file: groupFile
        // post_id: res.data.id,
        // all_day: this.all_day,
        // reminder_interval: this.reminder,
        // reminder_periode: this.reminder_type,
        // description: this.event.description,
        // link: this.event.link,
        // is_rsvp: this.is_rsvp,
      };
      eventCreate(param).then(res => {
        if (res.message === 'OK') {
          this.$emit('evtClose');
        }
      });
    },
    updateEvent() {
      const groupFile = this.finish_files_support.map(item => ({ file_id: item.file.id }));
      const pic = this.finish_files.length > 0
        ? this.finish_files.join(',') : null;
      const param = {
        start_date: this.event.start_date,
        end_date: this.event.end_date,
        start_time: this.event.start_time,
        end_time: this.event.end_time,
        locations: this.event.locations,
        name: this.event.name,
        // expertise: this.event.expertise,
        picture: pic,
        status: 'Pending',
        enabled: false,
        post_id: null,
        file: groupFile
      };
      eventUpdate(this.event.id, param).then(res => {
        if (res.message === 'OK') {
          this.$emit('evtClose');
        }
      });
    },
    getPic(data) {
      const pic = process.env.QUASAR_API_URL + data;
      return pic;
    },
    handleSave() {
      const validate = this.validate();
      if (validate) {
        if (this.event.id) {
          this.updateEvent();
        } else {
          this.createEvent();
        }
        this.$emit('evtClose');
      } else {
        Notify.create({
          message: 'Form belum lengkap!',
          color: 'negative',
          icon: 'error'
        });
      }
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
    getFileSupport(id) {
      this.finish_files_support = [];
      EventFileSupport(id)
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
    }
  },
  mounted() {
    this.getFileSupport(this.id_file);
    console.log(this.finish_files_support);
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value) {
          this.event = value;
          this.finish_files = (value.picture !== null) ? value.picture.split(',') : [];
          this.id_file = value.id;
        } else {
          this.event.start_date = this.getToday();
          this.event.end_date = this.getToday();
          this.event.start_time = '00:00:00';
          this.event.end_time = '00:00:00';
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
