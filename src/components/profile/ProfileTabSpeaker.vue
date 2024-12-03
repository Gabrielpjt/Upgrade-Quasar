<template>
    <div class="justify-between">
      <q-item clickable v-ripple class="kmp-profile-item-list q-px-none"
              v-for="(item, index) in list_filter" :key="index"
              @click="handleDetail(item)"
      >
        <div class="q-py-sm row items-center">
          <q-avatar bordered size="36px" style="border-color: #FFFFFF;background-color: #FFF7EC;color: #FFD400FF" icon="volume_down" />
          <q-item-section class="q-ml-md">
            <q-item-label class="kmp-font-bold kmp-text-grey-2">{{ item.event.name }}</q-item-label>
            <q-item-label class="kmp-font-small text-grey-7">
              {{ parseDate(item.event.start_date, 'dddd, DD MMM YYYY') }} <br/> {{ item.event.locations }}
            </q-item-label>
          </q-item-section>
        </div>
        <q-space/>
        <div v-show="item.event.post_id == null" class="self-center">
          <q-badge v-if="(item.event.enabled || item.event.status === 'Approved') && ((is_member === true && data_own) || is_member === false)" rounded color="green-7" label="Approved" />
          <q-badge v-if="(!item.event.enabled && item.event.status === 'Pending') || (!item.event.enabled && item.event.status === null)" rounded color="orange-7" label="Waiting for Approval" />
          <q-badge v-if="!item.event.enabled && item.event.status === 'Declined'" rounded color="red-10" label="Declined" />
        </div>
      </q-item>
      <div v-show="paginate.page_count > 1" class="">
        <div class="flex flex-center">
          <div style="position: absolute; bottom: 3px;">
            <q-pagination
              ref="list_channel"
              :unelevated=true
              :outline=true
              v-model="paginate.current"
              :max="paginate.page_count"
              direction-links
              boundary-links
              boundary-numbers
              :max-pages="3"
              icon-first="skip_previous"
              icon-last="skip_next"
              icon-prev="fast_rewind"
              icon-next="fast_forward"
            />
          </div>
        </div>
      </div>

      <q-dialog v-model="modal_detail">
        <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'card-quiz-create'">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Detail Event</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
              <div class="q-gutter-y-md column">
                <div class="column text-grey-7">
                  <div class="col q-mb-md">
                    <label class="label-form">Event Name</label>
                    <q-input dense outlined readonly v-model="event_selected.name"/>
                  </div>
                  <div class="col q-mb-md">
                    <label class="label-form">Event Location</label>
                    <q-input dense outlined readonly v-model="event_selected.locations"/>
                  </div>
                  <div class="col q-mb-md">
                    <div class="row">
                      <div class="col">
                        <label class="label-form">Start Event</label>
                        <q-input dense outlined readonly v-model="event_selected.start_datetime">
                          <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer hidden">
                              <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="event_selected.start_datetime" mask="YYYY-MM-DD HH:mm">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>

                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer hidden">
                              <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-time v-model="event_selected.start_datetime" mask="YYYY-MM-DD HH:mm" format24h />
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
                        <label class="label-form">End Event</label>
                        <q-input dense outlined readonly v-model="event_selected.end_datetime">
                          <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer hidden">
                              <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="event_selected.end_datetime" mask="YYYY-MM-DD HH:mm">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>

                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer hidden">
                              <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-time v-model="event_selected.end_datetime" mask="YYYY-MM-DD HH:mm" format24h />
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
            <!-- <q-card-section>
              <div class="text-center" v-if="event_selected.post_id">
                <q-img v-if="event_selected.picture !== null" :src="getPic(event_selected.picture)" style="max-width: 50%" />
              </div>
              <div v-else>
                <div v-show="event_selected.picture !== null" class="q-mb-md">
                  <div v-if="event_selected.picture_multiple" class="q-col-gutter-md row justify-center">
                    <div class="col-6" v-for="(item, index) in event_selected.picture.split(',')" :key="index">
                      <q-img v-if="event_selected.picture !== null" :src="getPic(item)" style="height: 140px; max-width: 150px"/>
                    </div>
                  </div>
                  <div v-else class="q-col-gutter-md row justify-center">
                    <q-img v-if="event_selected.picture !== null" :src="getPic(event_selected.picture)" style="max-width: 50%" />
                  </div>
                </div>
              </div>
            </q-card-section> -->
            <q-card-section>
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
            <q-card-section v-if="event_selected.status == 'Declined' && event_selected.reason !== null && data_own">
              <div class="label-form column text-grey-7 q-mt-sm">
                Alasan penolakan : {{ event_selected.reason }}
              </div>
            </q-card-section>
            <q-card-actions align="right" style="padding: 16px" v-show="data_own || !is_member">
              <q-btn no-caps v-show="((!event_selected.enabled && event_selected.status === 'Pending') || (!event_selected.enabled && event_selected.status === 'Declined') || (!event_selected.enabled && event_selected.status === null)) && is_member === false" class="full-width q-mt-sm" color="green" label="Approve Speaker" @click="handleVerify(event_selected.id, 'Approved')" />
              <q-btn no-caps v-show="((!event_selected.enabled && event_selected.status === 'Pending') || (!event_selected.enabled && event_selected.status === 'Declined') || (!event_selected.enabled && event_selected.status === null)) && is_member === false" class="full-width q-mt-sm" color="red" label="Decline Speaker" @click="modal_decline = true" />
              <q-btn no-caps v-show="is_member === true &&  event_selected.post_id == null && data_own && event_selected.status === 'Declined'" class="full-width q-mt-sm" color="orange" label="Edit Speaker" @click="handleEdit(event_selected.id)" />
              <q-btn no-caps v-show="is_member === true &&  event_selected.post_id == null && data_own" class="full-width q-mt-sm" color="red" label="Delete Speaker" @click="handleDelete(event_selected.id)" />
            </q-card-actions>
          </q-card>
      </q-dialog>
      <q-dialog v-model="modal_edit" persistent>
        <ProfileSpeaker :user="data_user" :data="event_selected" @evtClose="handleSaveSpeaker"/>
      </q-dialog>
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
            v-model="reason"
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
            @click="handleVerify(event_selected.id, 'Declined')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import _ from 'lodash';
import moment from 'moment/moment';
import { eventDelete, eventVerify, EventFileSupport } from 'src/lib/api';
import ProfileSpeaker from 'components/profile/ProfileSpeaker';
import ListFile from 'components/common/ListFile';
import { checkRole } from 'src/lib/helper';
import { point } from 'src/lib/point';

export default {
  name: 'ProfileTabSpeaker',
  props: ['list_data', 'badge_show', 'info_height', 'data_own', 'data_user'],

  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      paginate: {
        current: 1,
        page_limit: 9,
        page_count: 1
      },
      modal_detail: false,
      modal_edit: false,
      event_selected: {
        name: 'EXERCISE',
        location: null,
        start_date: null,
        end_date: null,
        picture_multiple: false,
        start_datetime: null,
        end_datetime: null
      },
      is_member: false,
      reason: '',
      modal_decline: false,
      user_id: null,
      type: '',
      finish_files_support: []
    };
  },
  components: {
    ProfileSpeaker, ListFile
  },
  computed: {
    list_filter: {
      get() {
        const data0 = this.list_data.data;
        const pageLimit = this.paginate.page_limit;
        const data = _.filter(_.forEach(data0, (v, i) => {
          v.page = i < pageLimit ? 1 : 1 + Math.floor(i / pageLimit);
        }), v1 => v1.page === this.paginate.current);
        return data;
      }
    }
  },
  mounted() {
    this.getInitPage();
    this.getRole();
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.paginate.page_limit = window.innerWidth > 1300
        ? this.paginate.page_limit + 1
        : this.paginate.page_limit;
    },
    clickKnowledge(channel, post) {
      this.$emit('clickKnowledge', channel, post);
    },
    parseDate(date, formate = 'DD MMMM YYYY') {
      return moment(new Date(date)).format(formate);
    },
    getInitPage() {
      const data0 = this.list_data.data;
      const pageLimit0 = (this.info_height > 720) ? this.paginate.page_limit + 1 : this.paginate.page_limit;
      const pageLimit = this.badge_show ? pageLimit0 + 1 : pageLimit0;
      const tambahan = data0.length % pageLimit > 0 ? 1 : 0;
      const count = data0.length > 0
        ? Math.floor(data0.length / pageLimit) + tambahan
        : 1;
      this.paginate.page_count = count < 1 ? 1 : count;
      this.paginate.page_limit = pageLimit;
    },
    handleDetail(data) {
      this.event_selected = data.event;
      this.event_selected.picture_multiple = (data.event.picture !== null) ? data.event.picture.includes(',') : false;
      this.event_selected.start_datetime = `${data.event.start_date.split(' ')[0]} ${data.event.start_time.slice(0, -3)}`;
      this.event_selected.end_datetime = `${data.event.end_date.split(' ')[0]} ${data.event.end_time.slice(0, -3)}`;
      this.user_id = data.user_id;
      this.type = data.type;
      this.finish_files_support = [];
      EventFileSupport(data.event.id)
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
      // setTimeout(() => {
      this.modal_detail = true;
      // }, 500);
    },
    getPic(data) {
      const pic = process.env.QUASAR_API_URL + data;
      return pic;
    },
    handleVerify(id, status) {
      let reason = '';
      let enabled = false;
      if (status === 'Approved') {
        reason = '';
        enabled = true;
      } else {
        reason = this.reason;
        enabled = false;
      }
      const data = {
        status,
        reason,
        enabled,
        type: this.type,
        user_id: this.user_id
      };
      eventVerify(id, data).then(res => {
        if (res.message === 'OK') {
          this.modal_detail = false;

          if (status === 'Approved') {
            Notify.create({
              message: 'Approved!',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            point('add', { tag: 'profile_speaker', event_id: id, account_id: this.user_id });
          } else {
            this.modal_decline = false;
            Notify.create({
              message: 'Declined!',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          }
          this.$emit('evtClose');
          // window.location.reload();
        }
      });
    },
    handleDelete(id) {
      eventDelete(id).then(res => {
        if (res.message === 'OK') {
          this.modal_detail = false;
          this.$emit('evtClose');
        }
      });
    },
    handleEdit(id) {
      this.modal_detail = false;
      this.modal_edit = true;
    },
    handleSaveSpeaker() {
      this.modal_edit = false;
      this.$emit('evtClose');
      // window.location.reload();
    },
    getRole() {
      const role_name = (checkRole() !== null) ? checkRole().name : '';
      if (role_name === 'member') {
        this.is_member = true;
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
};

</script>

<style lang="sass" scoped>
  .kmp-profile-item-list
    padding: 1px
    border-bottom: 1px solid #E5E8ED

  .card-quiz-create
    width: 100%
    max-width: 400px
</style>
