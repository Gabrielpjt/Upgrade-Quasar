<template>
  <div class="row" :class="this.$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-lg'">
    <q-card class="my-card kmp-training-detail desktop-only">
      <q-card-section class="kmp-training-detail-header">
      <div class="row" :class="this.$q.platform.is.mobile ? '' : 'q-pa-md'">
        <div class="col-12 col-md-4">
          <div v-if="isLoadingDetail">
            <q-skeleton class="kmp-training-detail-banner" />
          </div>
          <div v-else>
            <div v-if="banner_detail !== null">
              <q-img :src="banner_detail" class="cursor-pointer kmp-training-detail-banner"  @click="preview = true" />
            </div>
            <div v-else>
              <q-img src="../../assets/images/picture-default-training.png" style="background-color: white" class="kmp-training-detail-banner"/>
            </div>
            <vue-easy-lightbox
              escDisabled
              moveDisabled
              :visible="preview"
              :imgs="banner_detail"
              @hide="preview = !preview"
            ></vue-easy-lightbox>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div :class="on_going == true || status_detail.toLowerCase() == 'closed' || status_detail.toLowerCase() == 'draft' ? 'row q-mx-md q-my-none' : 'row q-mx-md q-mb-none'">
            <div v-if="isLoadingDetail">
              <q-skeleton width="30vw" height="30px" class="q-mx-none q-my-sm"/>
            </div>
            <div v-else>
              <div :style="this.$q.platform.is.mobile ? 'font-size: 16px;margin-top:1em' : ''" :class="training_name_detail.length > 75 ? 'kmp-training-detail-name-long' : 'kmp-training-detail-name'">{{ this.training_name_detail.toUpperCase() }}</div>
            </div>
          </div>
          <div class="row">
            <div v-if="isLoadingDetail">
              <q-skeleton width="300px" height="80px" class="q-mx-md q-my-sm"/>
            </div>
            <div v-else>
              <div v-if="is_km_manager == false">
                <div v-if="status_detail.toLowerCase() == 'closed'">
                  <div class="kmp-cot-training-time q-mx-md q-my-sm">
                    Training is over
                  </div>
                  <q-btn v-if="registered == 1"
                    :disable="is_done == true"
                    class="publish-button q-ml-md desktop-only"
                    :color="is_done == true ? 'grey' : 'red'"
                    unelevated
                    v-close-popup
                    size="lg"
                    no-caps
                    label="FEEDBACK" @click="handleFeedback()"
                  />
                  <q-btn v-if="registered == 1"
                    :disable="is_done == true"
                    class="publish-button q-ml-md mobile-only q-mb-sm"
                    :color="is_done == true ? 'grey' : 'red'"
                    unelevated
                    v-close-popup
                    size="md"
                    no-caps
                    label="FEEDBACK" @click="handleFeedback()"
                  />
                </div>
                <div v-else>
                  <div class="q-mx-md q-mt-sm q-mb-none">
                    <div v-if="check_participant == 0 && !QuotaTerpenuhi && this.status_detail == 'open_registration' && check_invitation == 0" class="kmp-training-detail-specific-dir q-my-sm">
                      This training is for specific division
                    </div>
                    <div v-if="on_going == true" class="kmp-cot-training-time q-my-sm">
                      Training is on going <q-icon name="schedule" color="km-blue" class="q-mr-xs" size="14px"/>
                    </div>
                    <div v-else>
                      <q-btn
                        v-if="check_participant == 0 && !QuotaTerpenuhi && this.status_detail == 'open_registration'"
                        class="publish-button" :class="$q.platform.is.mobile ? 'q-mb-sm' : ''"
                        color="km-blue"
                        label="Register"
                        unelevated
                        v-close-popup
                        size="lg"
                        no-caps
                        :disabled="check_invitation == 0"
                        @click="modal_permission_training = true"
                      />
                      <q-btn
                        v-if="pending == 1 && !QuotaTerpenuhi"
                        class="publish-button" :class="$q.platform.is.mobile && pending_admin == 1? 'row kmp-cot-training-badge-primary q-mb-sm' : $q.platform.is.mobile && pending_admin != 1? 'row kmp-cot-training-badge-orange q-mb-sm' : pending_admin == 1 ? 'row kmp-cot-training-badge-primary' : 'row kmp-cot-training-badge-orange'"
                        :label="pending_admin == 1 && participants.filter(el => el.users_id === id_user)[0].atasan_id == null ? 'Register' : 'Waiting for Approval'"
                        unelevated
                        no-caps
                        v-close-popup
                        size="lg"
                        disable
                      />
                      <span class="row q-mt-xs kmp-training-detail-subtitle" style="font-size:12px !important;" :class="$q.platform.is.mobile ? 'q-mb-sm' : ''" v-if="pending_admin == 1 && !QuotaTerpenuhi">Anda telah didaftarkan oleh admin untuk mengikuti training ini</span>
                      <q-btn
                        v-if="pending_admin == 1 && !QuotaTerpenuhi"
                        class="col publish-button btn-primary-color q-mr-xs q-mt-xs q-mb-sm" :class="$q.platform.is.mobile ? 'q-mb-sm' : ''"
                        label="Bersedia"
                        unelevated
                        no-caps
                        v-close-popup
                        size="sm"
                        @click="modal_permission_training = true"
                      />
                      <q-btn
                        v-if="pending_admin == 1 && !QuotaTerpenuhi"
                        class="col publish-button q-mt-xs q-mb-sm" :class="$q.platform.is.mobile ? 'q-mb-sm' : ''"
                        label="Tidak"
                        color="red"
                        unelevated
                        no-caps
                        v-close-popup
                        size="sm"
                        @click="modal_decline_participant = true"
                      />
                      <q-btn
                        v-if="declined == 1 || cancel == 1 || registered == 1"
                        :class="registered == 1 ? 'btn-primary-color publish-button q-my-xs q-mr-sm' : cancel  == 1 ? 'kmp-cot-training-badge-gray publish-button q-my-xs' : 'kmp-cot-training-badge-red publish-button q-sm-xs q-my-xs'"
                        :label="registered == 1 ? 'Already Registered' : cancel  == 1 ? 'Cancelled' : 'Declined'"
                        unelevated
                        no-caps
                        v-close-popup
                        size="lg"
                        disable
                      />
                      <q-btn
                        v-if="is_participant_btn_cancel && (this.status_detail == 'open_registration' || this.status_detail == 'close_registration') && registered == 1"
                        class="publish-button" :class="$q.platform.is.mobile ? ' q-my-xs q-mb-sm' : ' q-my-xs'"
                        label="Cancel"
                        color="white"
                        text-color="km-blue"
                        size="lg"
                        unelevated
                        no-caps
                        v-close-popup
                        @click="openModalTrainingCancel(true)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-if="status_detail.toLowerCase() == 'draft'" class="kmp-cot-training-provider-draft q-mx-md q-my-sm"><q-icon name="remove_red_eye" class="q-mr-xs" size="14px"/>
                  Only you can see this post
                </div>
              </div>
              <div class="kmp-cot-training-time q-mx-md q-my-sm">
                <div v-if="see_information === true && elearning_id !== null">
                  <q-btn :href="this.elearningUrlTo" target="_blank" label="go to LMS" icon-right="forward" push color="blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-2">
          <q-card class="my-card kmp-training-detail-status">
            <div class="q-pa-sm">
              <div class="row justify-end q-mb-xs">
                <div v-if="isLoadingDetail">
                  <q-skeleton width="150px" height="30px" />
                </div>
                <div v-else>
                  <q-badge transparent align="middle" v-if="training_type_detail" outline class="kmp-training-detail-badge kmp-cot-training-badge-green">
                    {{ this.training_type_detail }}
                  </q-badge>
                </div>
              </div>
              <div class="row justify-end q-mb-xs">
                <div v-if="isLoadingDetail">
                  <q-skeleton width="150px" height="30px" />
                </div>
                <div v-else>
                  <q-badge align="middle" v-if="training_method_detail" class="kmp-training-detail-badge kmp-cot-training-badge-yellow">
                    {{ this.training_method_detail }}
                  </q-badge>
                </div>
              </div>
              <div class="row justify-end q-mb-xs">
                <div v-if="isLoadingDetail">
                  <q-skeleton width="150px" height="30px" />
                </div>
                <div v-else>
                  <div class="row justify-end kmp-training-detail-gray-text">
                    Status:
                    <q-badge v-if="status_detail.toLowerCase() == 'open_registration'" label="OPEN REGISTRATION" align="middle" class="q-ml-xs kmp-training-detail-badge kmp-cot-training-badge-green"/>
                    <q-badge label="CLOSE REGISTRATION" v-else-if="status_detail.toLowerCase() == 'close_registration'" align="middle" class="q-ml-xs  kmp-training-detail-badge kmp-cot-training-badge-blue"/>
                    <q-badge v-else-if="status_detail.toLowerCase() == 'closed'" label="CLOSED" align="middle" class="q-ml-xs kmp-training-detail-badge kmp-cot-training-badge-red"/>
                    <q-badge v-else-if="status_detail.toLowerCase() == 'draft'" label="DRAFT" align="middle" class="q-ml-xs kmp-training-detail-badge kmp-cot-training-badge-primary"/>
                  </div>
                </div>
              </div>
              <div :class="is_km_manager==true ? 'row justify-end q-mb-xs' : 'row justify-end q-mb-xs'">
                <div v-if="isLoadingDetail">
                  <q-skeleton width="150px" height="30px" />
                </div>
                <div v-else>
                  <div v-if="!this.maximun_capacity_detail" class="kmp-training-detail-no-data">Belum ada data</div>
                  <div class="kmp-training-detail-gray-text" v-else>
                    Kuota: {{ remaining_quota }}/{{ maximun_capacity_detail }}
                  </div>
                </div>
              </div>
              <div class="row justify-end" v-if="is_km_manager==true">
                <div v-if="isLoadingDetail">
                  <q-skeleton width="150px" height="30px" />
                </div>
                <div v-else>
                  <q-btn
                    class="publish-button q-ml-sm"
                    label="Edit"
                    color="km-blue"
                    size="xs"
                    unelevated
                    no-caps
                    v-close-popup
                    @click="onGetFirstData('edit')"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="row justify-end q-pa-xs" v-if="is_km_manager==true">
              <div v-if="isLoadingDetail">
                <q-skeleton width="150px" height="30px" />
              </div>
              <div v-else>
                <q-btn
                  class="publish-button q-ml-sm"
                  label="Edit"
                  color="km-blue"
                  size="xs"
                  unelevated
                  no-caps
                  v-close-popup
                  @click="onGetFirstData('edit')"
                />
              </div>
            </div> -->
          </q-card>
        </div>
      </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-pt-none" :class="this.$q.platform.is.mobile ? '' : 'q-px-lg'" >
          <q-tabs
            v-model="tab_detail"
            dense
            active-color="km-blue"
            align="left"
            class="kmp-cot-training kmp-training-tab"
            no-caps
            narrow-indicator
            outside-arrows
            mobile-arrows
            :style="this.$q.platform.is.mobile ? 'width: 88vw' : ''"
          >
            <q-tab name="about" no-caps label="About" @click="scroll(1)"/>
            <q-tab v-if="see_information === true" name="speaker" no-caps label="Speaker & Moderator" @click="scroll(2)"/>
            <q-tab v-if="see_information === true" name="event" no-caps label="Event" @click="scroll(3)" />
            <q-tab v-if="see_information === true" name="Schedule" no-caps label="Schedule" @click="scroll(4)" />
            <q-tab v-if="see_information === true" name="Learning Journey" no-caps label="Learning Journey" @click="scroll(5)" />
            <q-tab v-if="see_information === true" name="List Participant" no-caps label="List Participant" @click="scroll(6)" />
          </q-tabs>
        </div>
        <q-separator class="q-mx-sm" />
      </q-card-section>
      <q-card-section>
        <div class="row q-px-lg justify-between">
          <div class="col-md-8 col-xs-12">
            <div class="kmp-training-detail-title q-mb-md" ref="scroll1">Description</div>
            <div v-if="isLoadingDetail">
                <q-skeleton :style="this.$q.platform.is.mobile ? 'width:50vw' : 'width:500px'" height="100px" />
            </div>
            <div class="kmp-training-detail-subtitle" v-else>
              <div v-if="this.training_description_detail">{{ this.training_description_detail }}</div>
              <div v-if="!this.training_description_detail" class="kmp-training-detail-no-data">Belum ada data</div>
            </div>
          </div>
          <div class="col-md-3 col-xs-12" v-if="see_information === true" :class="this.$q.platform.is.mobile ? 'q-pt-md' : ''">
            <div class="kmp-training-detail-title q-mb-md">Info</div>
            <div class="row kmp-training-detail-jp">
              <div class="col-10">Jam Pelatihan</div>
              <div class="col-2">
                <div v-if="isLoadingDetail">
                  <q-skeleton width="50px" height="30px" />
                </div>
                <div v-else>
                  <div v-if="this.jam_pelatihan_detail"> {{ this.jam_pelatihan_detail }}JP</div>
                  <div v-if="!this.jam_pelatihan_detail" class="kmp-training-detail-no-data">0JP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="see_information === true">
        <div class="row q-px-lg">
          <div class="col-6">
            <div class="kmp-training-detail-title q-mb-md" ref="scroll1" >Topic</div>
            <div class="row">
              <div v-if="isLoadingDetail">
                <q-skeleton width="300px" height="30px" />
              </div>
              <div v-else class="row">
                <div v-if="training_topic_detail.length == 0" class="col kmp-training-detail-no-data">Belum ada data</div>
                <div
                  v-else
                  v-for="(item, index) in training_topic_detail"
                  :key="index"
                  class="kmp-training-detail-subtitle q-mt-sm q-mb-xs"
                >
                  <q-badge align="middle" v-if="training_topic_detail.length != 0 && item != 'null'" class="kmp-training-detail-badge kmp-cot-training-badge-gray q-mr-xs">
                    {{ item }}
                  </q-badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="see_information === true">
        <div class="row q-px-lg">
          <div class="col-md-6 col-xs-12">
            <div class="kmp-training-detail-title q-mb-md" ref="scroll2" >Speaker and Moderator</div>
            <div v-if="isLoadingDetail">
                <q-skeleton :style="this.$q.platform.is.mobile ? 'width:80vw' : 'width:300px'" height="100px" />
            </div>
            <div v-else>
              <div v-if="narasumber_list_detail_for_detail.length != 0">
                <div
                  v-for="(narasumber, index) in this.narasumber_list_detail_for_detail"
                  class="row q-mb-md"
                  :key="index"
                >
                  <div class="col-2 kmp-training-detail-avatar-pic">
                    <q-avatar size="72px" v-if="narasumber.picture != null" class="kmp-training-detail-avatar q-mr-md">
                      <img :src="`./api${narasumber.picture}`"/>
                    </q-avatar>
                    <q-avatar size="72px" class="kmp-training-detail-avatar q-mr-md" text-color="white" v-else>
                      <span style="font-size:24px">
                        {{
                          narasumber.name
                          .match(/\b(\w)/g)
                          .join('')
                          .toUpperCase()
                        }}
                      </span>
                    </q-avatar>
                  </div>
                  <div class="col-6">
                    <div class="q-mt-xs kmp-training-detail-exp-name q-mb-xs">{{ narasumber.name.toUpperCase() }}</div>
                    <div class="kmp-training-detail-exp-roles" v-if="narasumber.roles != null">{{ narasumber.roles }}</div>
                    <div class="kmp-training-detail-exp-roles" v-else>Belum ada data</div>
                  </div>
                </div>
              </div>
              <div class="kmp-training-detail-no-data" v-else>Belum ada data</div>
            </div>
          </div>
          <div class="col-md-6 col-xs-12" :class="this.$q.platform.is.mobile ? 'q-pt-md' : ''">
            <div class="kmp-training-detail-title q-mb-md">Penyelenggara</div>
            <div v-if="isLoadingDetail">
              <q-skeleton width="200px" height="30px"/>
            </div>
            <div v-else>
              <div v-if="this.provider_detail" class=" kmp-training-detail-provider"> {{ this.provider_detail }}</div>
              <div v-if="!this.provider_detail" class="kmp-training-detail-no-data">Belum ada data</div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="see_information === true">
        <div class="row q-px-lg justify-between">
          <div class="col-md-4 col-xs-12">
            <div class="kmp-training-detail-title q-mb-md" ref="scroll3">Event</div>
            <q-card
              class="kmp-training-detail-date kmp-training-detail-event"
            >
              <q-card-section>
                <div class="q-mb-sm">
                    <div v-if="isLoadingDetail">
                        <q-skeleton width="200px" height="30px"/>
                    </div>
                    <div v-else>
                      <div style="display: flex;word-break: break-all;" v-if="this.training_date_detail"><q-icon name="event" class="q-mr-sm" size="sm" />{{ this.training_date_detail }}</div>
                      <div v-if="!this.training_date_detail" class="kmp-training-detail-no-data"><q-icon name="event" class="q-mr-sm" size="sm" />Belum ada data</div>
                    </div>
                  </div>
                <!-- <div class="q-mb-sm"><q-icon name="event" class="q-mr-sm" size="sm" />{{ this.training_date }} &bull;</div> -->
                <div class="q-mb-sm" v-if="(this.training_method_detail === 'Offline' || this.training_method_detail === 'Blended Learning')">
                    <div v-if="isLoadingDetail">
                        <q-skeleton width="200px" height="30px"/>
                    </div>
                    <div v-else>
                      <div style="display: flex;word-break: break-all;" v-if="this.locations_detail"><q-icon name="location_on" class="q-mr-sm" size="sm" />{{ this.locations_detail }}</div>
                      <div v-if="!this.locations_detail" class="kmp-training-detail-no-data"><q-icon name="location_on" class="q-mr-sm" size="sm" />Belum ada data</div>
                    </div>
                </div>
                <div class="q-mb-sm" v-if="(this.training_method_detail === 'Online' || this.training_method_detail === 'Blended Learning') && (registered == 1 || is_km_manager==true)">
                    <div v-if="isLoadingDetail">
                        <q-skeleton width="200px" height="30px"/>
                    </div>
                    <div v-else>
                      <div style="display: flex;word-break: break-all;" v-if="this.link_online_detail"><q-icon name="link" class="q-mr-sm" size="sm" /><a :href="this.link_online_detail">{{ this.link_online_detail }}</a></div>
                      <div v-if="!this.link_online_detail" class="kmp-training-detail-no-data"><q-icon name="link" class="q-mr-sm" size="sm" />Belum ada data</div>
                    </div>
                </div>
                <div class="" v-if="(this.training_method_detail === 'Online' || this.training_method_detail === 'Blended Learning') && (registered == 1 || is_km_manager==true)">
                  <div v-if="isLoadingDetail">
                      <q-skeleton width="200px" height="30px"/>
                  </div>
                  <div v-else>
                    <div style="display: flex;word-break: break-all;" v-if="this.password_detail"><q-icon name="password" class="q-mr-sm" size="sm" />{{ this.password_detail }}</div>
                    <div v-if="!this.password_detail" class="kmp-training-detail-no-data"><q-icon name="password" class="q-mr-sm" size="sm" />Belum ada data</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6 col-xs-12" :class="this.$q.platform.is.mobile ? 'q-pt-md' : ''">
            <div class="kmp-training-detail-title q-mb-md">Direktorat</div>
            <div class="row">
            <div v-if="isLoadingDetail">
              <q-skeleton width="200px" height="30px" />
            </div>
            <div v-else>
              <div v-if="participant_direktorat.length == 0" class="kmp-training-detail-no-data">
                <q-badge align="middle" class="kmp-cot-training-badge kmp-cot-training-badge-blue q-mr-xs q-mb-xs">
                  Lintas Unit
                </q-badge>
              </div>
              <div
              v-else
                v-for="(item, index) in participant_direktorat"
                :key="index"
                class="kmp-training-detail-subtitle"
              >
                <q-badge align="middle" v-if="(item.id != null) && (participant_direktorat.length != 0)"  class="kmp-cot-training-badge kmp-cot-training-badge-blue q-mr-xs q-mb-xs">
                  {{ item.name }}
                </q-badge>
              </div>
            </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="see_information === true">
        <div class="row q-px-lg">
          <div class="col">
            <div class="kmp-training-detail-title q-mb-md" ref="scroll4" >Schedule</div>
              <div class="q-pt-none" v-if="isLoadingDetail">
                  <q-skeleton :style="this.$q.platform.is.mobile ? 'width:80vw' : ''" height="100px" />
              </div>
              <div class="q-pt-none" v-else>
                <!-- <div class="kmp-training-detail-no-data">Belum ada data</div> -->
                <div v-if="list_schedule.length != 0">
                  <div
                    v-for="(item, index) in list_schedule"
                    :key="index"
                    :class="index !== 0 ? 'q-mt-lg' : 'q-mt-none'"
                  >
                    <div class="row">
                      <div class="col-2">
                        <div class="kmp-training-detail-day text-center">Day</div>
                      </div>
                      <div class="col kmp-training-detail-date" >
                        <span class="text-bold" v-if="item.date_start !== null">{{ parseDate(item.date_start) }}</span>
                        <!-- <span v-if="item.time_start !== null && all_day_detail === false"> • {{ parseTime(item.time_start) }}</span>
                        <span v-if="item.time_end !== null  && all_day_detail === false"> - {{ parseTime(item.time_end) }}</span> -->
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-2">
                        <div class="kmp-training-detail-day-count text-center">{{ index + 1 }}</div>
                        <!-- <div class="kmp-training-detail-day-count text-center" v-if="recuring_detail == 'Custom'">{{ item.day }}</div>
                        <div class="kmp-training-detail-day-count text-center" v-else>{{ index + 1 }}</div> -->
                      </div>
                      <div class="col">
                        <div v-for="(item, i) in list_expertise_topic.filter(el => el.date_start === item.date_start)"
                        :key="i">
                          <div class="kmp-training-detail-date" >
                            <span class="text-bold" v-if="item.time_start !== null && item.time_start !== '00:00:00'"> {{ parseTime(item.time_start) }}</span>
                            <span class="text-bold" v-if="(item.time_end === null || item.time_end === '00:00:00') && (item.time_start !== null && item.time_start !== '00:00:00')"> • </span>
                            <span class="text-bold" v-if="(item.time_end !== null && item.time_end !== '00:00:00') && (item.time_start !== null && item.time_start !== '00:00:00')"> - {{ parseTime(item.time_end) }} • </span>
                            <span class="text-bold">{{ item.name }}</span>
                          </div>
                          <div class="kmp-training-detail-date" >
                            {{ item.topic_narasumber }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="kmp-training-detail-no-data" v-else>Belum ada data</div>
              </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" id="5" v-if="see_information === true">
        <div class="row  q-px-lg">
          <div class="col-md-4 col-xs-12">
            <div class="kmp-training-detail-title q-mb-md" ref="scroll5">Learning journey</div>
              <div class="q-pt-none" v-if="isLoadingDetail">
                  <q-skeleton :style="this.$q.platform.is.mobile ? 'width:80vw' : ''" height="100px" />
              </div>
              <div class="q-pt-none" v-else>
                <!-- <div class="kmp-training-detail-no-data">Belum ada data</div> -->
                <div v-if="elearning_journey_list.length != 0">
                  <div class="">
                    <q-list bordered class="rounded-borders">
                      <div
                        v-for="(rowjourney, index) in elearning_journey_list"
                        :key="index"
                      >
                        <q-expansion-item
                          expand-separator
                          icon="check_circle"
                          :label=rowjourney.name
                          header-class="text-blue bg-light-blue-1"
                          default-opened
                        >
                          <q-card>


                            <q-card-actions vertical>
                              <q-btn
                                v-for="(rowjourneycontent, index) in rowjourney.modules" :key="index"
                                flat
                                align="left"
                                :href=rowjourneycontent.url target="_blank"
                              >
                                <q-img
                                  :src=rowjourneycontent.modicon
                                  style="width: 15px"
                                  class="q-mr-xs"
                                /> {{ rowjourneycontent.name }}
                              </q-btn>
                            </q-card-actions>

                          </q-card>
                        </q-expansion-item>
                        <q-separator />
                      </div>
                    </q-list>
                  </div>
                </div>
                <div class="kmp-training-detail-no-data" v-else>Belum ada data</div>
              </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="see_information === true">
        <div class="row q-px-lg">
          <div class="col">
            <div class="row">
              <div class="col kmp-training-detail-title q-mb-md" style="max-width:125px">Attachments</div>
              <div @click="openfile()" v-if="this.finish_files_detail_for_training_detail.length != 0" class="col cursor-pointer kmp-training-detail-link-download q-mb-md"
              >Download All <q-icon name="download"/>
              </div>
            </div>
              <!-- <div q-list class="q-pl-md q-pr-md q-pb-sm" v-if="isLoadingDetail">
                  <q-skeleton width="150px" height="25px" />
              </div>
              <q-list class="q-pl-md q-pr-md">
                <div v-for="(item, index) in finish_files" :key="index">
                  <ListFile
                    v-if="item.file !== null"
                    :file="item.file"
                    :item="item"
                  />
                </div>
              </q-list> -->
              <q-list v-if="isLoadingDetail">
                <q-skeleton class="full-width" height="100px" />
              </q-list>
              <q-list v-else>
                <div v-if="this.finish_files_detail_for_training_detail.length != 0">
                  <div v-for="(item, index) in attachmentList" :key="index">
                    <q-card bordered class="q-mb-md">
                      <q-expansion-item
                        expand-separator
                        :label="item.name"
                        class="kmp-training-detail-no-data"
                      >
                          <q-card-section style="padding: 0px 16px 6px 16px">
                            <div class="row">
                              <div class="col-2 q-pa-xs kmp-training-detail-attachment " v-for="(item_finish, index_finish) in item.finish_files" :key="index_finish">
                                <ListFileTrainingDetail
                                  v-if="item_finish !== null"
                                  :file="item_finish.file"
                                  :item="item_finish"
                                  :registered="registered"
                                  :km_manager="is_km_manager"
                                  @input="handlePreview(index, index_finish)"
                                />
                              </div>
                                <LightBox
                                ref="lightbox"
                                :show-caption="true"
                                :show-light-box="false"
                                :media="item.finish_files.map(val => {
                                  return {
                                    thumb: val.file.filemime === 'jpg' || val.file.filemime.toLowerCase() === 'png' || val.file.filemime.toLowerCase() === 'jpeg' || val.file.filemime.toLowerCase() === 'gif' ? url + val.file.path
                                    : val.file.filemime.toLowerCase() === 'pdf' ? require('../../assets/images/pdf.png')
                                    : val.file.filemime.toLowerCase() === 'xls' || val.file.filemime.toLowerCase() === 'xlsx' ? require('../../assets/images/xls.png')
                                    : val.file.filemime.toLowerCase() === 'doc' || val.file.filemime.toLowerCase() === 'docx' ? require('../../assets/images/doc.png')
                                    : val.file.filemime.toLowerCase() === 'ppt' || val.file.filemime.toLowerCase() === 'pptx' ? require('../../assets/images/ppt.png')
                                    : val.file.filemime.toLowerCase() === 'txt' ? require('../../assets/images/txt.png')
                                    : val.file.filemime.toLowerCase() === 'zip' || val.file.filemime.toLowerCase() === 'rar' ? require('../../assets/images/zip.png')
                                    : val.file.filemime.toLowerCase() === 'csv' ? require('../../assets/images/csv.png') : require('../../assets/images/documents.png'),
                                    src: val.file.filemime === 'jpg' || val.file.filemime.toLowerCase() === 'png' || val.file.filemime.toLowerCase() === 'jpeg' ? url + val.file.path
                                    : val.file.filemime.toLowerCase() === 'pdf' ? require('../../assets/images/pdf.png')
                                    : val.file.filemime.toLowerCase() === 'xls' || val.file.filemime.toLowerCase() === 'xlsx' ? require('../../assets/images/xls.png')
                                    : val.file.filemime.toLowerCase() === 'doc' || val.file.filemime.toLowerCase() === 'docx' ? require('../../assets/images/doc.png')
                                    : val.file.filemime.toLowerCase() === 'ppt' || val.file.filemime.toLowerCase() === 'pptx' ? require('../../assets/images/ppt.png')
                                    : val.file.filemime.toLowerCase() === 'txt' ? require('../../assets/images/txt.png')
                                    : val.file.filemime.toLowerCase() === 'zip' || val.file.filemime.toLowerCase() === 'rar' ? require('../../assets/images/zip.png')
                                    : val.file.filemime.toLowerCase() === 'csv' ? require('../../assets/images/csv.png') : require('../../assets/images/documents.png'),
                                    caption: val.file.filename
                                  }
                                })"
                              >
                              <template v-slot:footer="props">
                                <q-btn  flat dense color="white" text-color="white" icon="file_download" @click="downloadFile(item.finish_files[props.current-1].file)"></q-btn>
                              </template>
                            </LightBox>
                            </div>
                          </q-card-section>
                      </q-expansion-item>
                    </q-card>
                  </div>
                </div>
                <div class="kmp-training-detail-no-data" v-else>Belum ada data</div>
              </q-list>
              <div class="cursor-pointer text-center kmp-training-detail-see-attachment" v-if="see_all === false && this.finish_files_detail_for_training_detail.length != 0 && this.finish_files_detail_for_training_detail.length > 3" @click="seeFiles" style="max-width: 50px"
              >See All Attachments <q-icon name="expand_more"/>
              </div>
              <div class="cursor-pointer text-center kmp-training-detail-see-attachment" v-if="see_all === true && this.finish_files_detail_for_training_detail.length != 0 && this.finish_files_detail_for_training_detail.length > 3" @click="seeLessFiles" style="max-width: 50px"
              >See Less Attachments <q-icon name="expand_less"/>
              </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="see_information === true && status_detail.toLowerCase() == 'closed'">
        <div class="row q-px-lg">
          <div class="col-6">
            <div class="kmp-training-detail-title q-mb-md">Certificate Link</div>
            <div class="row">
              <div v-if="isLoadingDetail">
                <q-skeleton width="300px" height="30px" />
              </div>
              <div v-else class="row">
                <div v-if="certificate_link_detail === '' || certificate_link_detail === null" class="col kmp-training-detail-no-data">Belum ada data</div>
                <div v-else class="kmp-training-detail-subtitle q-mt-sm q-mb-xs">
                  <a :href="this.certificate_link_detail">{{ this.certificate_link_detail }}</a>
                  <br>
                  <q-btn :href="this.certificateElearningUrlTo" target="_blank" label="get Certificate eLearning" icon="article" push color="blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="see_information === true">
        <div class="row q-px-lg">
          <div class="col">
            <div class="kmp-training-detail-title q-mb-md">For More Info</div>
            <div v-if="isLoadingDetail">
                <q-skeleton :style="this.$q.platform.is.mobile ? 'width:80vw' : 'width:500px'" height="100px" />
            </div>
            <div class="" v-else>
              <div v-if="pic_list_detail_for_training_detail.length != 0">
                <div
                  v-for="(pic, index) in this.pic_list_detail_for_training_detail"
                  class="row q-mb-md desktop-only"
                  :key="index"
                >
                  <div class="col-2 kmp-training-detail-avatar-pic">
                    <q-avatar size="72px" v-if="pic.picture != null" class="kmp-training-detail-avatar-blue q-mr-md">
                      <img :src="`./api${pic.picture}`"/>
                    </q-avatar>
                    <q-avatar size="72px" class="kmp-training-detail-avatar-blue q-mr-md" text-color="white" v-else>
                      <span style="font-size:24px">
                        {{
                          pic.name
                          .match(/\b(\w)/g)
                          .join('')
                          .toUpperCase()
                        }}
                      </span>
                    </q-avatar>
                  </div>
                  <div class="col-3">
                    <div class="q-mt-md kmp-training-detail-exp-name q-mb-xs">{{ pic.name.toUpperCase() }}</div>
                    <div class="kmp-training-detail-exp-roles">{{ pic.roles }}</div>
                  </div>
                  <div class="col-2 text-center">
                    <div class="q-mb-sm kmp-training-detail-subtitle">Contact Me</div>
                      <q-btn size="md" class="q-mr-sm" flat round color="primary" icon="chat" @click="doOpenPM(pic.users_id, pic.name)" />
                      <q-btn size="md" flat round color="primary" icon="email" :disabled="pic.email == null" @click="doOpenEmail(pic.email)" />
                  </div>
                </div>
                <div
                  v-for="(pic, index) in this.pic_list_detail_for_training_detail"
                  class="row q-mb-md mobile-only"
                  :key="index"
                >
                  <div class="col-12">
                    <div class="row q-mb-sm">
                      <div class="kmp-training-detail-avatar-pic">
                        <q-avatar size="72px" v-if="pic.picture != null" class="kmp-training-detail-avatar-blue q-mr-md">
                          <img :src="`./api${pic.picture}`"/>
                        </q-avatar>
                        <q-avatar size="72px" class="kmp-training-detail-avatar-blue q-mr-md" text-color="white" v-else>
                      <span style="font-size:24px">
                        {{
                          pic.name
                            .match(/\b(\w)/g)
                            .join('')
                            .toUpperCase()
                        }}
                      </span>
                        </q-avatar>
                      </div>
                      <div class="">
                        <div class="q-mt-md kmp-training-detail-exp-name q-mb-xs">{{ pic.name.toUpperCase() }}</div>
                        <div class="kmp-training-detail-exp-roles">{{ pic.roles }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 text-right">
                    <div class="q-pr-sm kmp-training-detail-subtitle">Contact Me</div>
                      <q-btn size="md" class="q-mr-sm" flat round color="primary" icon="chat" @click="doOpenPM(pic.users_id, pic.name)" />
                      <q-btn size="md" flat round color="primary" icon="email" :disabled="pic.email == null" @click="doOpenEmail(pic.email)" />
                  </div>
                </div>
              </div>
              <div class="kmp-training-detail-no-data" v-else>Belum ada data</div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="see_participant == true " id="6"  :class="$q.platform.is.mobile ? 'q-px-none' : ''">
        <div class="row q-px-lg">
          <div class="col">
            <div class="kmp-training-detail-title q-mb-md" ref="scroll6">List Participant</div>
            <div class="kmp-training-detail-subtitle q-mb-md" v-if="isLoadingDetail"><q-skeleton width="200px" height="30px" /></div>
            <div class="kmp-training-detail-subtitle q-mb-md" v-else>
              <div v-if="participant_data.total_data != 0">
                <div v-if="participant_data.page !== Math.ceil(participant_data.total_data/participant_data.rowsPerPage)">Showing {{participant_data.rowsPerPage*participant_data.page-participant_data.rowsPerPage+1}} to {{participant_data.rowsPerPage*participant_data.page}} of {{participant_data.total_data}} Person</div>
                <div v-if="participant_data.page === Math.ceil(participant_data.total_data/participant_data.rowsPerPage)">Showing {{participant_data.rowsPerPage*participant_data.page-participant_data.rowsPerPage+1}} to {{participant_data.total_data}} of {{participant_data.total_data}} Person</div>
              </div>
              <div class="kmp-training-detail-subtitle q-mb-md" v-else >Belum ada data</div>
              <div class="row justify-between q-my-md" >
                <div class="col-3 column items-start" style="display:flex;justify-content:center">
                  <div class="kmp-training-detail-gray-text" v-if="this.maximun_capacity_detail && list_participant_all.length > 0">
                    Kuota: {{ remaining_quota }}/{{ maximun_capacity_detail }}
                  </div>
                </div>
                <div class="col-3 column items-end" >
                  <q-btn label="Approve All" no-caps dense unelevated size="12px" :class="((account_approval == false && atasan == false) || (total_participant_pending > 0 && QuotaTerpenuhi) || (total_participant_pending === 0 && is_km_manager == false) || (is_km_manager == false && date_start_training < -1)) ? 'hidden' : 'q-mr-sm'" color="primary" @click="approveAll()" style="width: 100px" class="q-mt-sm"/>
                </div>
              </div>
              <div class="text-red-4" v-if="QuotaTerpenuhi && !isLoadingDetail && this.maximun_capacity_detail != 0">(Kuota telah terpenuhi)</div>
            </div>
            <div v-if="isLoadingDetail">
                <q-skeleton class="full-width" height="100px" />
            </div>
            <div class="row q-my-md" v-else>
              <div
                v-for="(item, index) in list_participant_all"
                :key="index"
                class="col-6 col-md-6 col-xs-12 q-pa-sm"
              >
                <div class="row items-center">
                  <div class="col-1">
                    <div v-if="item.employee_type == 'employee'">
                      <q-avatar size="36px" v-if="item.user.profile_picture != null">
                        <img :src="`./api${item.user.profile_picture}`"/>
                      </q-avatar>
                      <q-avatar color="km-blue" text-color="white" size="36px" v-else>
                        <span style="font-size:12px;">
                          {{
                            item.user.name
                            .match(/\b(\w)/g)
                            .join('')
                            .toUpperCase()
                          }}
                          </span>
                      </q-avatar>
                    </div>
                    <div v-else>
                    <q-avatar color="km-blue" text-color="white" size="36px">
                      <span style="font-size:12px;">
                        {{
                          item.non_employee.name
                          .match(/\b(\w)/g)
                          .join('')
                          .toUpperCase()
                        }}
                        </span>
                    </q-avatar>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="kmp-font-sm kmp-font-bold q-ml-md" style="white-space: pre-line;" v-if="item.employee_type == 'employee'">{{ item.user.name.toUpperCase() }}</div>
                    <div class="kmp-font-sm kmp-font-bold q-ml-md" style="white-space: pre-line;" v-else>{{ item.non_employee.name.toUpperCase() }}</div>
                  </div>
                  <div class="col-5">
                    <div class="row">
                      <div class="col">
                        <div class="row justify-end q-mr-sm">
                        <q-badge  align="middle" style="font-size:8px" :class="item.participant_type == 'registered' ? 'kmp-cot-training-badge-green' : item.participant_type == 'pending' ? item.registration_type == 'admin' && item.atasan_id == NULL ? 'kmp-cot-training-badge-primary ' : 'kmp-cot-training-badge-orange ' : item.participant_type == 'cancel' ? 'kmp-cot-training-badge-red' : 'kmp-cot-training-badge-red'">
                          {{ item.participant_type == 'registered' && item.registration_type == 'personal' ? 'APPROVED' : item.participant_type == 'registered' && item.registration_type == 'admin' ? 'REGISTERED BY ADMIN' : item.participant_type == 'pending' ? item.registration_type == 'admin' && item.atasan_id == NULL ? 'REGISTER' : 'WAITING FOR APPROVAL' : item.participant_type == 'cancel' ? 'CANCELLED' : item.participant_type == 'registered' && !item.registration_type ? 'APPROVED' : 'DECLINED'}}
                        </q-badge>
                        </div>
                        <div class="row justify-end q-mr-sm kmp-cot-last-update ">
                          Last Update on {{ parseDateTime(item.updated_at) }}
                        </div>
                        <div class="row justify-end q-mr-sm" v-if="item.employee_type == 'employee' && item.participant_type == 'registered' && status_detail.toLowerCase() == 'closed'">
                          <q-badge align="middle" style="font-size:8px" :class="item.is_done == true ? 'kmp-cot-training-badge-gray' : 'kmp-cot-training-badge-red'">
                          Feedback
                          </q-badge>
                        </div>
                      </div>
                      <div class="col-1">
                        <q-btn-dropdown size="xs" dense :class="((item.participant_type === 'cancel' && QuotaTerpenuhi) || item.participant_type == 'declined' || (item.registration_type === 'admin' && is_km_manager == false && date_start_training < -1) || (account_approval == false && item.atasan_id != user.id) || (item.participant_type == 'pending' && QuotaTerpenuhi)) ? 'hidden' : 'q-mr-sm'">
                          <q-list>
                            <q-item v-if="item.participant_type == 'registered'" clickable v-close-popup @click="openModalTrainingCancel(false, item.users_id !== null ? item.user.id : null, item.employee_type, item.employee_id !== null ? item.non_employee.id : null)">
                              <q-item-section>
                                <q-item-label style="font-size:10px">Cancel</q-item-label>
                              </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup v-if="item.participant_type == 'cancel'" @click="openModalTrainingReinvite(item.users_id !== null ? item.user.id : null, item.employee_type, item.employee_id !== null ? item.non_employee.id : null, item.alasan_ditolak)">
                              <q-item-section>
                                <q-item-label style="font-size:10px">Reinvite</q-item-label>
                              </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup  @click="approvalTraining('approve', item.id, index, item.users_id)" v-if="item.participant_type == 'pending' && !QuotaTerpenuhi">
                              <q-item-section>
                                <q-item-label style="font-size:10px">Approve</q-item-label>
                              </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup  @click="approvalTraining('decline', item.id, index, item.users_id)" v-if="item.participant_type == 'pending' && !QuotaTerpenuhi">
                              <q-item-section>
                                <q-item-label style="font-size:10px">Decline</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-btn-dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-end row q-my-md">
              <div v-show="participant_data.total_page > 1">
                <q-pagination
                  v-model="participant_data.page"
                  :max="participant_data.total_page"
                  :max-pages="0"
                  direction-links
                  boundary-links
                  text-color="grey-6"
                  color="grey-6"
                  active-text-color="purple-6"
                  size="12px"
                  padding="6px 12px 6px 12px"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section  v-if="see_participant_member == true" :class="$q.platform.is.mobile ? 'q-px-none' : ''">
        <div class="row q-px-lg">
          <div class="col">
            <div class="kmp-training-detail-title q-mb-md">List Participant</div>
            <div class="kmp-training-detail-subtitle q-mb-md" v-if="isLoadingDetail"><q-skeleton width="200px" height="30px" /></div>
            <div class="kmp-training-detail-subtitle q-mb-md" v-else>
              <div v-if="participant_data.total_data != 0">
                <div v-if="participant_data.page !== Math.ceil(participant_data.total_data/participant_data.rowsPerPage)">Showing {{participant_data.rowsPerPage*participant_data.page-participant_data.rowsPerPage+1}} to {{participant_data.rowsPerPage*participant_data.page}} of {{participant_data.total_data}} Person</div>
                <div v-if="participant_data.page === Math.ceil(participant_data.total_data/participant_data.rowsPerPage)">Showing {{participant_data.rowsPerPage*participant_data.page-participant_data.rowsPerPage+1}} to {{participant_data.total_data}} of {{participant_data.total_data}} Person</div>
              </div>
              <div class="kmp-training-detail-subtitle q-mb-md" v-else >Belum ada data</div>
            </div>
            <div v-if="isLoadingDetail">
                <q-skeleton class="full-width" height="100px" />
            </div>
            <div class="row q-my-md" v-else>
              <div
                v-for="(item, index) in list_participant_reg"
                :key="index"
                class="col-6 col-md-6 col-xs-12 q-pa-sm"
              >
                <div class="row items-center">
                  <div class="col-1">
                    <div v-if="item.employee_type == 'employee'">
                      <q-avatar size="36px" v-if="item.user.profile_picture != null">
                        <img :src="`./api${item.user.profile_picture}`"/>
                      </q-avatar>
                      <q-avatar color="km-blue" text-color="white" size="36px" v-else>
                        <span style="font-size:12px">
                          {{
                            item.user.name
                            .match(/\b(\w)/g)
                            .join('')
                            .toUpperCase()
                          }}
                          </span>
                      </q-avatar>
                    </div>
                    <div v-else>
                    <q-avatar color="km-blue" text-color="white" size="36px">
                      <span style="font-size:12px">
                        {{
                          item.non_employee.name
                          .match(/\b(\w)/g)
                          .join('')
                          .toUpperCase()
                        }}
                        </span>
                    </q-avatar>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="kmp-font-sm kmp-font-bold q-ml-md"  style="white-space: pre-line;" v-if="item.employee_type == 'employee'">{{ item.user.name.toUpperCase() }}</div>
                    <div class="kmp-font-sm kmp-font-bold q-ml-md"  style="white-space: pre-line;" v-else>{{ item.non_employee.name.toUpperCase() }}</div>
                  </div>
                  <div class="col-5"></div>
                </div>
              </div>
            </div>
            <div class="row justify-end row q-my-md">
              <div v-show="participant_data.total_page > 1">
                <q-pagination
                  v-model="participant_data.page"
                  :max="participant_data.total_page"
                  :max-pages="0"
                  direction-links
                  boundary-links
                  text-color="grey-6"
                  color="grey-6"
                  active-text-color="purple-6"
                  size="12px"
                  padding="6px 12px 6px 12px"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card kmp-training-detail mobile-only">
      <q-card-section class="q-pa-none">
        <div class="">
          <div v-if="isLoadingDetail">
            <q-skeleton class="kmp-training-detail-banner" />
          </div>
          <div v-else>
            <div v-if="banner_detail !== null">
              <q-img :src="banner_detail" class="cursor-pointer kmp-training-detail-banner-mobile"  @click="preview = true" />
            </div>
            <div v-else>
              <q-img src="../../assets/images/picture-default-training.png" style="background-color: white" class="kmp-training-detail-banner-mobile"/>
            </div>
            <vue-easy-lightbox
              escDisabled
              moveDisabled
              :visible="preview"
              :imgs="banner_detail"
              @hide="preview = !preview"
            ></vue-easy-lightbox>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="kmp-training-detail-header">
        <div class="q-mb-sm">
          <div v-if="isLoadingDetail">
            <q-skeleton width="30vw" height="30px" class="q-mx-none q-my-sm"/>
          </div>
          <div v-else>
            <div class="kmp-training-detail-name-mobile">{{ this.training_name_detail.toUpperCase() }}</div>
          </div>
        </div>
        <div class="">
          <div v-if="isLoadingDetail">
            <q-skeleton width="300px" height="80px" class="q-mx-none q-my-sm"/>
          </div>
          <div class="row" v-else>
            <div class="col-6">
              <div v-if="is_km_manager == false">
                <div v-if="status_detail.toLowerCase() == 'closed'">
                  <div class="kmp-cot-training-time q-mb-sm">
                    Training is over
                  </div>
                  <q-btn v-if="registered == 1"
                    :disable="is_done == true"
                    class="publish-button q-mb-sm"
                    :color="is_done == true ? 'grey' : 'red'"
                    unelevated
                    v-close-popup
                    size="sm"
                    no-caps
                    label="FEEDBACK" @click="handleFeedback()"
                  />
                </div>
                <div v-else>
                  <div class="">
                    <div v-if="check_participant == 0 && !QuotaTerpenuhi && this.status_detail == 'open_registration' && check_invitation == 0" class="kmp-training-detail-specific-dir q-my-sm">
                      This training is for specific division
                    </div>
                    <div v-if="on_going == true" class="kmp-cot-training-time q-my-sm">
                      Training is on going <q-icon name="schedule" color="km-blue" class="q-mr-xs" size="14px"/>
                    </div>
                    <div v-else>
                      <q-btn
                        v-if="check_participant == 0 && !QuotaTerpenuhi && this.status_detail == 'open_registration'"
                        class="publish-button" :class="$q.platform.is.mobile ? 'q-mb-sm' : ''"
                        color="km-blue"
                        label="Register"
                        unelevated
                        v-close-popup
                        size="sm"
                        no-caps
                        :disabled="check_invitation == 0"
                        @click="modal_permission_training = true"
                      />
                      <q-btn
                        v-if="pending == 1 && !QuotaTerpenuhi"
                        class="publish-button" :class="$q.platform.is.mobile && pending_admin == 1? 'row kmp-cot-training-badge-primary q-mb-sm' : $q.platform.is.mobile && pending_admin != 1? 'row kmp-cot-training-badge-orange q-mb-sm' : pending_admin == 1 ? 'row kmp-cot-training-badge-primary' : 'row kmp-cot-training-badge-orange'"
                        :label="pending_admin == 1 && participants.filter(el => el.users_id === id_user)[0].atasan_id == null ? 'Register' : 'Waiting for Approval'"
                        unelevated
                        no-caps
                        v-close-popup
                        size="sm"
                        disable
                      />
                      <span class="row q-mt-xs kmp-training-detail-subtitle" style="font-size:12px !important;" :class="$q.platform.is.mobile ? 'q-mb-sm' : ''" v-if="pending_admin == 1 && !QuotaTerpenuhi">Anda telah didaftarkan oleh admin untuk mengikuti training ini</span>
                      <q-btn
                        v-if="pending_admin == 1 && !QuotaTerpenuhi"
                        class="col publish-button btn-primary-color q-mr-xs q-my-xs" :class="$q.platform.is.mobile ? 'q-mb-sm' : ''"
                        label="Bersedia"
                        unelevated
                        no-caps
                        v-close-popup
                        size="xs"
                        @click="modal_permission_training = true"
                      />
                      <q-btn
                        v-if="pending_admin == 1 && !QuotaTerpenuhi"
                        class="col publish-button q-my-xs" :class="$q.platform.is.mobile ? 'q-mb-sm' : ''"
                        label="Tidak"
                        color="red"
                        unelevated
                        no-caps
                        v-close-popup
                        size="xs"
                        @click="modal_decline_participant = true"
                      />
                      <q-btn
                        v-if="declined == 1 || cancel == 1 || registered == 1"
                        :class="registered == 1 ? 'btn-primary-color publish-button q-mb-sm' : cancel  == 1 ? 'kmp-cot-training-badge-gray publish-button q-mb-sm' : 'kmp-cot-training-badge-red publish-button q-mb-sm'"
                        :label="registered == 1 ? 'Already Registered' : cancel  == 1 ? 'Cancelled' : 'Declined'"
                        unelevated
                        no-caps
                        v-close-popup
                        size="sm"
                        disable
                      />
                      <q-btn
                        v-if="is_participant_btn_cancel && (this.status_detail == 'open_registration' || this.status_detail == 'close_registration') && registered == 1"
                        class="publish-button"
                        label="Cancel"
                        color="white"
                        text-color="km-blue"
                        size="sm"
                        unelevated
                        no-caps
                        v-close-popup
                        @click="openModalTrainingCancel(true)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-if="status_detail.toLowerCase() == 'draft'" class="kmp-cot-training-provider-draft q-mx-md q-my-sm"><q-icon name="remove_red_eye" class="q-mr-xs" size="14px"/>
                  Only you can see this post
                </div>
              </div>
            </div>
            <div class="col-6">
              <q-card class="my-card kmp-training-detail-status">
                <div class="q-pa-sm">
                  <div class="row justify-end q-mb-xs">
                    <div v-if="isLoadingDetail">
                      <q-skeleton width="150px" height="30px" />
                    </div>
                    <div v-else>
                      <q-badge transparent align="middle" v-if="training_type_detail" outline class="kmp-training-detail-badge kmp-cot-training-badge-green">
                        {{ this.training_type_detail }}
                      </q-badge>
                    </div>
                  </div>
                  <div class="row justify-end q-mb-xs">
                    <div v-if="isLoadingDetail">
                      <q-skeleton width="150px" height="30px" />
                    </div>
                    <div v-else>
                      <q-badge align="middle" v-if="training_method_detail" class="kmp-training-detail-badge kmp-cot-training-badge-yellow">
                        {{ this.training_method_detail }}
                      </q-badge>
                    </div>
                  </div>
                  <div class="row justify-end q-mb-xs">
                    <div v-if="isLoadingDetail">
                      <q-skeleton width="150px" height="30px" />
                    </div>
                    <div v-else>
                      <div class="row justify-end kmp-training-detail-gray-text">
                        Status:
                        <q-badge v-if="status_detail.toLowerCase() == 'open_registration'" label="OPEN REGISTRATION" align="middle" class="q-ml-xs kmp-training-detail-badge kmp-cot-training-badge-green"/>
                        <q-badge label="CLOSE REGISTRATION" v-else-if="status_detail.toLowerCase() == 'close_registration'" align="middle" class="q-ml-xs  kmp-training-detail-badge kmp-cot-training-badge-blue"/>
                        <q-badge v-else-if="status_detail.toLowerCase() == 'closed'" label="CLOSED" align="middle" class="q-ml-xs kmp-training-detail-badge kmp-cot-training-badge-red"/>
                        <q-badge v-else-if="status_detail.toLowerCase() == 'draft'" label="DRAFT" align="middle" class="q-ml-xs kmp-training-detail-badge kmp-cot-training-badge-primary"/>
                      </div>
                    </div>
                  </div>
                  <div :class="is_km_manager==true ? 'row justify-end q-mb-xs' : 'row justify-end'">
                    <div v-if="isLoadingDetail">
                      <q-skeleton width="150px" height="30px" />
                    </div>
                    <div v-else>
                      <div v-if="!this.maximun_capacity_detail" class="kmp-training-detail-no-data">Belum ada data</div>
                      <div class="kmp-training-detail-gray-text" v-else>
                        Kuota: {{ remaining_quota }}/{{ maximun_capacity_detail }}
                      </div>
                    </div>
                  </div>
                  <div class="row justify-end" v-if="is_km_manager==true">
                    <div v-if="isLoadingDetail">
                      <q-skeleton width="150px" height="30px" />
                    </div>
                    <div v-else>
                      <q-btn
                        class="publish-button q-ml-sm"
                        label="Edit"
                        color="km-blue"
                        size="sm"
                        unelevated
                        no-caps
                        v-close-popup
                        @click="onGetFirstData('edit')"
                      />
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-px-none">
        <div class="row q-pt-none">
          <q-tabs
            v-model="tab_detail"
            dense
            active-color="km-blue"
            align="left"
            class="kmp-cot-training kmp-training-tab"
            no-caps
            narrow-indicator
            outside-arrows
            mobile-arrows
            :style="this.$q.platform.is.mobile ? 'width: 100%' : ''"
          >
            <q-tab name="about" no-caps label="About" @click="scroll(1)"/>
            <q-tab v-if="see_information === true" name="speaker" no-caps label="Speaker & Moderator" @click="scroll(2)"/>
            <q-tab v-if="see_information === true" name="event" no-caps label="Event" @click="scroll(3)" />
            <q-tab v-if="see_information === true" name="Schedule" no-caps label="Schedule" @click="scroll(4)" />
          </q-tabs>
        </div>
        <q-separator class="q-mx-sm" />
      </q-card-section>
      <q-card-section class="" id="1">
        <div class="row justify-between">
          <div class="col-md-8 col-xs-12">
            <div class="kmp-training-detail-title q-mb-md">Description</div>
            <div v-if="isLoadingDetail">
              <q-skeleton :style="'width:100%'" height="100px" />
            </div>
            <div class="kmp-training-detail-subtitle" v-else>
              <div v-if="this.training_description_detail">{{ this.training_description_detail }}</div>
              <div v-if="!this.training_description_detail" class="kmp-training-detail-no-data">Belum ada data</div>
            </div>
          </div>
          <div class="col-md-3 col-xs-12" v-if="see_information === true" :class="'q-pt-md'">
            <div class="kmp-training-detail-title q-mb-md">Info</div>
            <div class="row kmp-training-detail-jp">
              <div class="col-10">Jam Pelatihan</div>
              <div class="col-2">
                <div v-if="isLoadingDetail">
                  <q-skeleton width="50px" height="30px" />
                </div>
                <div v-else>
                  <div v-if="this.jam_pelatihan_detail"> {{ this.jam_pelatihan_detail }}JP</div>
                  <div v-if="!this.jam_pelatihan_detail" class="kmp-training-detail-no-data">0JP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" id="1" v-if="see_information === true">
        <div class="row">
          <div class="col-12">
            <div class="kmp-training-detail-title q-mb-md">Topic</div>
            <div class="row">
              <div v-if="isLoadingDetail">
                <q-skeleton width="300px" height="30px" />
              </div>
              <div v-else class="row">
                <div v-if="training_topic_detail.length == 0" class="col kmp-training-detail-no-data">Belum ada data</div>
                <div
                  v-else
                  v-for="(item, index) in training_topic_detail"
                  :key="index"
                  class="kmp-training-detail-subtitle q-mt-sm q-mb-xs"
                >
                  <q-badge align="middle" v-if="training_topic_detail.length != 0 && item != 'null'" class="kmp-training-detail-badge kmp-cot-training-badge-gray q-mr-xs">
                    {{ item }}
                  </q-badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" id="2" v-if="see_information === true">
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <div class="kmp-training-detail-title q-mb-md">Speaker and Moderator</div>
            <div v-if="isLoadingDetail">
              <q-skeleton :style="this.$q.platform.is.mobile ? 'width:80vw' : 'width:300px'" height="100px" />
            </div>
            <div v-else>
              <div v-if="narasumber_list_detail_for_detail.length != 0">
                <q-item v-for="(narasumber, index) in this.narasumber_list_detail_for_detail"
                        class="row q-mb-sm q-px-none q-mr-xs"
                        :key="index"
                >
                  <q-item-section avatar>
                    <q-avatar v-if="narasumber.picture != null" class="kmp-training-detail-avatar-mobile">
                      <img :src="`./api${narasumber.picture}`"/>
                    </q-avatar>
                    <q-avatar class="kmp-training-detail-avatar-mobile" text-color="white" v-else>
                      <span style="font-size:20px">
                        {{
                          narasumber.name
                            .match(/\b(\w)/g)
                            .join('')
                            .toUpperCase()
                        }}
                      </span>
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <div class="q-mt-xs kmp-training-detail-exp-name q-mb-xs">{{ narasumber.name.toUpperCase() }}</div>
                    <div class="kmp-training-detail-exp-roles" v-if="narasumber.roles != null">{{ narasumber.roles }}</div>
                    <div class="kmp-training-detail-exp-roles" v-else>Belum ada data</div>
                  </q-item-section>
                </q-item>
              </div>
              <div class="kmp-training-detail-no-data" v-else>Belum ada data</div>
            </div>
          </div>
          <div class="col-md-6 col-xs-12" :class="'q-pt-md'">
            <div class="kmp-training-detail-title q-mb-md">Penyelenggara</div>
            <div v-if="isLoadingDetail">
              <q-skeleton width="200px" height="30px"/>
            </div>
            <div v-else>
              <div v-if="this.provider_detail" class=" kmp-training-detail-provider"> {{ this.provider_detail }}</div>
              <div v-if="!this.provider_detail" class="kmp-training-detail-no-data">Belum ada data</div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" id="3" v-if="see_information === true">
        <div class="row justify-between">
          <div class="col-md-4 col-xs-12">
            <div class="kmp-training-detail-title q-mb-md">Event</div>
            <q-card
              class="kmp-training-detail-date kmp-training-detail-event"
            >
              <q-card-section>
                <div class="q-mb-sm">
                  <div v-if="isLoadingDetail">
                    <q-skeleton width="200px" height="30px"/>
                  </div>
                  <div v-else>
                    <div style="display: flex;word-break: break-all;" v-if="this.training_date_detail"><q-icon name="event" class="q-mr-sm" size="sm" />{{ this.training_date_detail }}</div>
                    <div v-if="!this.training_date_detail" class="kmp-training-detail-no-data"><q-icon name="event" class="q-mr-sm" size="sm" />Belum ada data</div>
                  </div>
                </div>
                <!-- <div class="q-mb-sm"><q-icon name="event" class="q-mr-sm" size="sm" />{{ this.training_date }} &bull;</div> -->
                <div class="q-mb-sm" v-if="(this.training_method_detail === 'Offline' || this.training_method_detail === 'Blended Learning')">
                  <div v-if="isLoadingDetail">
                    <q-skeleton width="200px" height="30px"/>
                  </div>
                  <div v-else>
                    <div style="display: flex;word-break: break-all;" v-if="this.locations_detail"><q-icon name="location_on" class="q-mr-sm" size="sm" />{{ this.locations_detail }}</div>
                    <div v-if="!this.locations_detail" class="kmp-training-detail-no-data"><q-icon name="location_on" class="q-mr-sm" size="sm" />Belum ada data</div>
                  </div>
                </div>
                <div class="q-mb-sm" v-if="(this.training_method_detail === 'Online' || this.training_method_detail === 'Blended Learning') && (registered == 1 || is_km_manager==true)">
                  <div v-if="isLoadingDetail">
                    <q-skeleton width="200px" height="30px"/>
                  </div>
                  <div v-else>
                    <div style="display: flex;word-break: break-all;" v-if="this.link_online_detail"><q-icon name="link" class="q-mr-sm" size="sm" /><a :href="this.link_online_detail">{{ this.link_online_detail }}</a></div>
                    <div v-if="!this.link_online_detail" class="kmp-training-detail-no-data"><q-icon name="link" class="q-mr-sm" size="sm" />Belum ada data</div>
                  </div>
                </div>
                <div class="" v-if="(this.training_method_detail === 'Online' || this.training_method_detail === 'Blended Learning') && (registered == 1 || is_km_manager==true)">
                  <div v-if="isLoadingDetail">
                    <q-skeleton width="200px" height="30px"/>
                  </div>
                  <div v-else>
                    <div style="display: flex;word-break: break-all;" v-if="this.password_detail"><q-icon name="password" class="q-mr-sm" size="sm" />{{ this.password_detail }}</div>
                    <div v-if="!this.password_detail" class="kmp-training-detail-no-data"><q-icon name="password" class="q-mr-sm" size="sm" />Belum ada data</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6 col-xs-12" :class="this.$q.platform.is.mobile ? 'q-pt-md' : ''">
            <div class="kmp-training-detail-title q-mb-md">Direktorat</div>
            <div class="row">
              <div v-if="isLoadingDetail">
                <q-skeleton width="200px" height="30px" />
              </div>
              <div v-else>
                <div v-if="participant_direktorat.length == 0" class="kmp-training-detail-no-data">
                  <q-badge align="middle" class="kmp-cot-training-badge kmp-cot-training-badge-blue q-mr-xs q-mb-xs">
                    Lintas Unit
                  </q-badge>
                </div>
                <div
                  v-else
                  v-for="(item, index) in participant_direktorat"
                  :key="index"
                  class="kmp-training-detail-subtitle"
                >
                  <q-badge align="middle" v-if="(item.id != null) && (participant_direktorat.length != 0)"  class="kmp-cot-training-badge kmp-cot-training-badge-blue q-mr-xs q-mb-xs">
                    {{ item.name }}
                  </q-badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" id="4" v-if="see_information === true">
        <div class="row">
          <div class="col">
            <div class="kmp-training-detail-title q-mb-md">Schedule</div>
            <div class="q-pt-none" v-if="isLoadingDetail">
              <q-skeleton :style="this.$q.platform.is.mobile ? 'width:80vw' : ''" height="100px" />
            </div>
            <div class="q-pt-none" v-else>
              <div v-if="list_schedule.length != 0">
                <div
                  v-for="(item, index) in list_schedule"
                  :key="index"
                  :class="index !== 0 ? 'q-mt-lg' : 'q-mt-none'"
                >
                  <div class="row">
                    <div class="col-2">
                      <div class="kmp-training-detail-day text-center">Day</div>
                    </div>
                    <div class="col kmp-training-detail-date" >
                      <span class="text-bold" v-if="item.date_start !== null">{{ parseDate(item.date_start) }}</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-2">
                      <div class="kmp-training-detail-day-count text-center">{{ index + 1 }}</div>
                    </div>
                    <div class="col">
                      <div v-for="(item, i) in list_expertise_topic.filter(el => el.date_start === item.date_start)"
                           :key="i">
                        <div class="kmp-training-detail-date" >
                          <span class="text-bold" v-if="item.time_start !== null && item.time_start !== '00:00:00'"> {{ parseTime(item.time_start) }}</span>
                          <span class="text-bold" v-if="(item.time_end === null || item.time_end === '00:00:00') && (item.time_start !== null && item.time_start !== '00:00:00')"> • </span>
                          <span class="text-bold" v-if="(item.time_end !== null && item.time_end !== '00:00:00') && (item.time_start !== null && item.time_start !== '00:00:00')"> - {{ parseTime(item.time_end) }} • </span>
                          <span class="text-bold">{{ item.name }}</span>
                        </div>
                        <div class="kmp-training-detail-date" >
                          {{ item.topic_narasumber }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="kmp-training-detail-no-data" v-else>Belum ada data</div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none" v-if="see_information === true">
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="col kmp-training-detail-title q-mb-md" style="max-width:125px">Attachments</div>
              <div @click="openfile()" v-if="this.finish_files_detail_for_training_detail.length != 0" class="col cursor-pointer kmp-training-detail-link-download q-mb-md"
              >Download All <q-icon name="download"/>
              </div>
            </div>
            <!-- <div q-list class="q-pl-md q-pr-md q-pb-sm" v-if="isLoadingDetail">
                <q-skeleton width="150px" height="25px" />
            </div>
            <q-list class="q-pl-md q-pr-md">
              <div v-for="(item, index) in finish_files" :key="index">
                <ListFile
                  v-if="item.file !== null"
                  :file="item.file"
                  :item="item"
                />
              </div>
            </q-list> -->
            <q-list v-if="isLoadingDetail">
              <q-skeleton class="full-width" height="100px" />
            </q-list>
            <q-list v-else>
              <div v-if="this.finish_files_detail_for_training_detail.length != 0">
                <div v-for="(item, index) in attachmentList" :key="index">
                  <q-card bordered class="q-mb-md">
                    <q-expansion-item
                      expand-separator
                      :label="item.name"
                      class="kmp-training-detail-no-data"
                    >
                      <q-card-section style="padding: 0px 16px 6px 16px">
                        <div class="row">
                          <div class="col-2 q-pa-xs kmp-training-detail-attachment " v-for="(item_finish, index_finish) in item.finish_files" :key="index_finish">
                            <ListFileTrainingDetail
                              v-if="item_finish !== null"
                              :file="item_finish.file"
                              :item="item_finish"
                              :registered="registered"
                              :km_manager="is_km_manager"
                              @input="handlePreview(index, index_finish)"
                            />
                          </div>
                          <LightBox
                            ref="lightbox"
                            :show-caption="true"
                            :show-light-box="false"
                            :media="item.finish_files.map(val => {
                                  return {
                                    thumb: val.file.filemime === 'jpg' || val.file.filemime.toLowerCase() === 'png' || val.file.filemime.toLowerCase() === 'jpeg' || val.file.filemime.toLowerCase() === 'gif' ? url + val.file.path
                                    : val.file.filemime.toLowerCase() === 'pdf' ? require('../../assets/images/pdf.png')
                                    : val.file.filemime.toLowerCase() === 'xls' || val.file.filemime.toLowerCase() === 'xlsx' ? require('../../assets/images/xls.png')
                                    : val.file.filemime.toLowerCase() === 'doc' || val.file.filemime.toLowerCase() === 'docx' ? require('../../assets/images/doc.png')
                                    : val.file.filemime.toLowerCase() === 'ppt' || val.file.filemime.toLowerCase() === 'pptx' ? require('../../assets/images/ppt.png')
                                    : val.file.filemime.toLowerCase() === 'txt' ? require('../../assets/images/txt.png')
                                    : val.file.filemime.toLowerCase() === 'zip' || val.file.filemime.toLowerCase() === 'rar' ? require('../../assets/images/zip.png')
                                    : val.file.filemime.toLowerCase() === 'csv' ? require('../../assets/images/csv.png') : require('../../assets/images/documents.png'),
                                    src: val.file.filemime === 'jpg' || val.file.filemime.toLowerCase() === 'png' || val.file.filemime.toLowerCase() === 'jpeg' ? url + val.file.path
                                    : val.file.filemime.toLowerCase() === 'pdf' ? require('../../assets/images/pdf.png')
                                    : val.file.filemime.toLowerCase() === 'xls' || val.file.filemime.toLowerCase() === 'xlsx' ? require('../../assets/images/xls.png')
                                    : val.file.filemime.toLowerCase() === 'doc' || val.file.filemime.toLowerCase() === 'docx' ? require('../../assets/images/doc.png')
                                    : val.file.filemime.toLowerCase() === 'ppt' || val.file.filemime.toLowerCase() === 'pptx' ? require('../../assets/images/ppt.png')
                                    : val.file.filemime.toLowerCase() === 'txt' ? require('../../assets/images/txt.png')
                                    : val.file.filemime.toLowerCase() === 'zip' || val.file.filemime.toLowerCase() === 'rar' ? require('../../assets/images/zip.png')
                                    : val.file.filemime.toLowerCase() === 'csv' ? require('../../assets/images/csv.png') : require('../../assets/images/documents.png'),
                                    caption: val.file.filename
                                  }
                                })"
                          >
                            <template v-slot:footer="props">
                              <q-btn  flat dense color="white" text-color="white" icon="file_download" @click="downloadFile(item.finish_files[props.current-1].file)"></q-btn>
                            </template>
                          </LightBox>
                        </div>
                      </q-card-section>
                    </q-expansion-item>
                  </q-card>
                </div>
              </div>
              <div class="kmp-training-detail-no-data" v-else>Belum ada data</div>
            </q-list>
            <div class="cursor-pointer text-center kmp-training-detail-see-attachment" v-if="see_all === false && this.finish_files_detail_for_training_detail.length != 0 && this.finish_files_detail_for_training_detail.length > 3" @click="seeFiles" style="max-width: 50px"
            >See All Attachments <q-icon name="expand_more"/>
            </div>
            <div class="cursor-pointer text-center kmp-training-detail-see-attachment" v-if="see_all === true && this.finish_files_detail_for_training_detail.length != 0 && this.finish_files_detail_for_training_detail.length > 3" @click="seeLessFiles" style="max-width: 50px"
            >See Less Attachments <q-icon name="expand_less"/>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="see_information === true && status_detail.toLowerCase() == 'closed'">
        <div class="row">
          <div class="col-6">
            <div class="kmp-training-detail-title q-mb-md">Certificate Link</div>
            <div class="row">
              <div v-if="isLoadingDetail">
                <q-skeleton width="300px" height="30px" />
              </div>
              <div v-else class="row">
                <div v-if="certificate_link_detail === '' || certificate_link_detail === null" class="col kmp-training-detail-no-data">Belum ada data</div>
                <div v-else class="kmp-training-detail-subtitle q-mt-sm q-mb-xs"> <a :href="this.certificate_link_detail">{{ this.certificate_link_detail }}</a></div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="see_information === true">
        <div class="row">
          <div class="col">
            <div class="kmp-training-detail-title q-mb-md">For More Info</div>
            <div v-if="isLoadingDetail">
              <q-skeleton :style="this.$q.platform.is.mobile ? 'width:80vw' : 'width:500px'" height="100px" />
            </div>
            <div class="" v-else>
              <div v-if="pic_list_detail_for_training_detail.length != 0">
                <q-item v-for="(pic, index) in this.pic_list_detail_for_training_detail"
                        class="row q-mb-sm q-px-none q-mr-xs"
                        :key="index"
                >
                  <q-item-section avatar class="self-start">
                    <q-avatar v-if="pic.picture != null" class="kmp-training-detail-avatar-mobile">
                      <img :src="`./api${pic.picture}`"/>
                    </q-avatar>
                    <q-avatar class="kmp-training-detail-avatar-mobile" text-color="white" v-else>
                      <span style="font-size:24px">
                        {{
                          pic.name
                            .match(/\b(\w)/g)
                            .join('')
                            .toUpperCase()
                        }}
                      </span>
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <div class="kmp-training-detail-exp-name q-mb-xs">{{ pic.name.toUpperCase() }}</div>
                    <div class="kmp-training-detail-exp-roles">{{ pic.roles }}</div>
                    <div class="row justify-between">
                      <div class="q-pr-sm kmp-training-detail-subtitle">Contact Me</div>
                      <div style="margin-top: -25px;">
                        <q-btn size="md" class="q-mr-sm" flat round color="primary" icon="chat" @click="doOpenPM(pic.users_id, pic.name)" />
                        <q-btn size="md" flat round color="primary" icon="email" :disabled="pic.email == null" @click="doOpenEmail(pic.email)" />
                      </div>
                    </div>
                  </q-item-section>

                </q-item>
              </div>
              <div class="kmp-training-detail-no-data" v-else>Belum ada data</div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="see_participant == true ">
        <div class="row">
          <div class="col">
            <div class="kmp-training-detail-title q-mb-md">List Participant</div>
            <div class="kmp-training-detail-subtitle q-mb-md" v-if="isLoadingDetail"><q-skeleton width="200px" height="30px" /></div>
            <div class="kmp-training-detail-subtitle q-mb-md text-red-4" v-else-if="QuotaTerpenuhi && !isLoadingDetail && this.maximun_capacity_detail != 0">(Kuota telah terpenuhi)</div>
            <div class="kmp-training-detail-subtitle q-mb-md" v-if="isLoadingDetail"><q-skeleton width="200px" height="30px" /></div>
            <div class="kmp-training-detail-subtitle q-mb-md" v-else>
              <div v-if="participant_data.total_data != 0">
                <div v-if="participant_data.page !== Math.ceil(participant_data.total_data/participant_data.rowsPerPage)">Showing {{participant_data.rowsPerPage*participant_data.page-participant_data.rowsPerPage+1}} to {{participant_data.rowsPerPage*participant_data.page}} of {{participant_data.total_data}} Person</div>
                <div v-if="participant_data.page === Math.ceil(participant_data.total_data/participant_data.rowsPerPage)">Showing {{participant_data.rowsPerPage*participant_data.page-participant_data.rowsPerPage+1}} to {{participant_data.total_data}} of {{participant_data.total_data}} Person</div>
              </div>
              <div class="kmp-training-detail-subtitle q-mb-md" v-else >Belum ada data</div>
              <div class="row justify-between q-mt-md" >
                <div class="col-3 column items-start" style="display:flex;justify-content:center">
                  <div class="kmp-training-detail-gray-text" v-if="this.maximun_capacity_detail">
                    Kuota: {{ remaining_quota }}/{{ maximun_capacity_detail }}
                  </div>
                </div>
                <div class="col-3 column items-end" >
                  <q-btn label="Approve All" no-caps dense unelevated size="12px" :class="((account_approval == false && atasan == false) || (total_participant_pending > 0 && QuotaTerpenuhi) || (total_participant_pending === 0 && is_km_manager == false) || (is_km_manager == false && date_start_training < -1)) ? 'hidden' : 'q-mr-sm'" color="primary" @click="approveAll()" style="width: 100px" class="q-mt-sm"/>
                </div>
              </div>
            </div>
            <div v-if="isLoadingDetail">
              <q-skeleton class="full-width" height="100px" />
            </div>
            <div class="row q-my-md" v-else>
              <div
                v-for="(item, index) in list_participant_all"
                :key="index"
                class="col-6 col-md-6 col-xs-12 q-pa-sm"
              >
                <div class="row items-center">
                  <div class="col-1">
                    <div v-if="item.employee_type == 'employee'">
                      <q-avatar size="36px" v-if="item.user.profile_picture != null">
                        <img :src="`./api${item.user.profile_picture}`"/>
                      </q-avatar>
                      <q-avatar color="km-blue" text-color="white" size="36px" v-else>
                        <span style="font-size:12px;">
                          {{
                            item.user.name
                              .match(/\b(\w)/g)
                              .join('')
                              .toUpperCase()
                          }}
                          </span>
                      </q-avatar>
                    </div>
                    <div v-else>
                      <q-avatar color="km-blue" text-color="white" size="36px">
                      <span style="font-size:12px;">
                        {{
                          item.non_employee.name
                            .match(/\b(\w)/g)
                            .join('')
                            .toUpperCase()
                        }}
                        </span>
                      </q-avatar>
                    </div>
                  </div>
                  <div class="col-10">
                    <div class="kmp-font-sm kmp-font-bold q-ml-md" style="white-space: pre-line;" v-if="item.employee_type == 'employee'">{{ item.user.name.toUpperCase() }}</div>
                    <div class="kmp-font-sm kmp-font-bold q-ml-md" style="white-space: pre-line;" v-else>{{ item.non_employee.name.toUpperCase() }}</div>
                    <div hidden class="col">
                      <div class="row justify-end q-mr-sm">
                        <q-badge  align="middle" style="font-size:8px" :class="item.participant_type == 'registered' ? 'kmp-cot-training-badge-green' : item.participant_type == 'pending' ? item.registration_type == 'admin' && item.atasan_id == NULL ? 'kmp-cot-training-badge-primary ' : 'kmp-cot-training-badge-orange ' : item.participant_type == 'cancel' ? 'kmp-cot-training-badge-red' : 'kmp-cot-training-badge-red'">
                          {{ item.participant_type == 'registered' && item.registration_type == 'personal' ? 'APPROVED' : item.participant_type == 'registered' && item.registration_type == 'admin' ? 'REGISTERED BY ADMIN' : item.participant_type == 'pending' && item.registration_type == 'personal' ? 'WAITING FOR APPROVAL' : item.participant_type == 'pending' ? item.registration_type == 'admin' && item.atasan_id == NULL ? 'REGISTER' : 'WAITING FOR APPROVAL' : item.participant_type == 'cancel' ? 'CANCELLED' : item.participant_type == 'registered' && !item.registration_type ? 'APPROVED' : 'DECLINED'}}
                        </q-badge>
                      </div>
                      <div class="row justify-end q-mr-sm kmp-cot-last-update ">
                        Last Update on {{ parseDateTime(item.updated_at) }}
                      </div>
                      <div class="row justify-end q-mr-sm" v-if="item.employee_type == 'employee' && item.participant_type == 'registered' && status_detail.toLowerCase() == 'closed'">
                        <q-badge align="middle" style="font-size:8px" :class="item.is_done == true ? 'kmp-cot-training-badge-gray' : 'kmp-cot-training-badge-red'">
                          Feedback
                        </q-badge>
                      </div>
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="row">
<!--                      <div class="hidden col">-->
<!--                        <div class="row justify-end q-mr-sm">-->
<!--                          <q-badge  align="middle" style="font-size:8px" :class="item.participant_type == 'registered' ? 'kmp-cot-training-badge-green' : item.participant_type == 'pending' ? 'kmp-cot-training-badge-orange ' : item.participant_type == 'cancel' ? 'kmp-cot-training-badge-red' : 'kmp-cot-training-badge-red'">-->
<!--                            {{ item.participant_type == 'registered' && item.registration_type == 'personal' ? 'APPROVED' : item.participant_type == 'registered' && item.registration_type == 'admin' ? 'REGISTERED BY ADMIN' : item.participant_type == 'pending' ? 'WAITING FOR APPROVAL' : item.participant_type == 'cancel' ? 'CANCELLED' : item.participant_type == 'registered' && !item.registration_type ? 'APPROVED' : 'DECLINED'}}-->
<!--                          </q-badge>-->
<!--                        </div>-->
<!--                        <div class="row justify-end q-mr-sm kmp-cot-last-update ">-->
<!--                          Last Update on {{ parseDateTime(item.updated_at) }}-->
<!--                        </div>-->
<!--                        <div class="row justify-end q-mr-sm" v-if="item.employee_type == 'employee' && item.participant_type == 'registered' && status_detail.toLowerCase() == 'closed'">-->
<!--                          <q-badge align="middle" style="font-size:8px" :class="item.is_done == true ? 'kmp-cot-training-badge-gray' : 'kmp-cot-training-badge-red'">-->
<!--                            Feedback-->
<!--                          </q-badge>-->
<!--                        </div>-->
<!--                      </div>-->
                      <div class="col-1">
                        <q-btn-dropdown size="xs" dense :class="((item.participant_type === 'cancel' && QuotaTerpenuhi) || item.participant_type == 'declined' || (account_approval == false && item.atasan_id != user.id) || (item.participant_type == 'pending' && QuotaTerpenuhi) || (is_km_manager == false && date_start_training < -1)) ? 'hidden' : 'q-mr-sm'">
                          <q-list>
                            <q-item v-if="item.participant_type == 'registered'" clickable v-close-popup @click="openModalTrainingCancel(false, item.users_id !== null ? item.user.id : null, item.employee_type, item.employee_id !== null ? item.non_employee.id : null)">
                              <q-item-section>
                                <q-item-label style="font-size:8px">Cancel</q-item-label>
                              </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup v-if="item.participant_type == 'cancel'" @click="openModalTrainingReinvite(item.users_id !== null ? item.user.id : null, item.employee_type, item.employee_id !== null ? item.non_employee.id : null, item.alasan_ditolak)">
                              <q-item-section>
                                <q-item-label style="font-size:8px">Reinvite</q-item-label>
                              </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup  @click="approvalTraining('approve', item.id, index, item.users_id)" v-if="item.participant_type == 'pending' && !QuotaTerpenuhi">
                              <q-item-section>
                                <q-item-label style="font-size:8px">Approve</q-item-label>
                              </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup  @click="approvalTraining('decline', item.id, index, item.users_id)" v-if="item.participant_type == 'pending' && !QuotaTerpenuhi">
                              <q-item-section>
                                <q-item-label style="font-size:8px">Decline</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-btn-dropdown>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-11 offset-1">
                    <div class="row q-ml-md">
                      <div class="q-mr-sm">
                        <q-badge  align="middle" style="font-size:8px" :class="item.participant_type == 'registered' ? 'kmp-cot-training-badge-green' : item.participant_type == 'pending' ? item.registration_type == 'admin' && item.atasan_id == NULL ? 'kmp-cot-training-badge-primary ' : 'kmp-cot-training-badge-orange ' : item.participant_type == 'cancel' ? 'kmp-cot-training-badge-red' : 'kmp-cot-training-badge-red'">
                          {{ item.participant_type == 'registered' && item.registration_type == 'personal' ? 'APPROVED' : item.participant_type == 'registered' && item.registration_type == 'admin' ? 'REGISTERED BY ADMIN' : item.participant_type == 'pending' ? item.registration_type == 'admin' && item.atasan_id == NULL ? 'REGISTER' : 'WAITING FOR APPROVAL' : item.participant_type == 'cancel' ? 'CANCELLED' : item.participant_type == 'registered' && !item.registration_type ? 'APPROVED' : 'DECLINED'}}
                        </q-badge>
                      </div>
                      <div class="q-mr-sm" v-if="item.employee_type == 'employee' && item.participant_type == 'registered' && status_detail.toLowerCase() == 'closed'">
                        <q-badge align="middle" style="font-size:8px" :class="item.is_done == true ? 'kmp-cot-training-badge-gray' : 'kmp-cot-training-badge-red'">
                          Feedback
                        </q-badge>
                      </div>
                    </div>
                    <div class="row q-ml-md q-mr-sm kmp-cot-last-update ">
                      Last Update on {{ parseDateTime(item.updated_at) }}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="row justify-end row q-my-md">
              <div v-show="participant_data.total_page > 1">
                <q-pagination
                  v-model="participant_data.page"
                  :max="participant_data.total_page"
                  :max-pages="0"
                  direction-links
                  boundary-links
                  text-color="grey-6"
                  color="grey-6"
                  active-text-color="purple-6"
                  size="12px"
                  padding="6px 12px 6px 12px"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="see_participant_member == true">
        <div class="row">
          <div class="col">
            <div class="kmp-training-detail-title q-mb-md">List Participant</div>
            <div class="kmp-training-detail-subtitle q-mb-md" v-if="isLoadingDetail"><q-skeleton width="200px" height="30px" /></div>
            <div class="kmp-training-detail-subtitle q-mb-md" v-else>
              <div v-if="participant_data.total_data != 0">
                <div v-if="participant_data.page !== Math.ceil(participant_data.total_data/participant_data.rowsPerPage)">Showing {{participant_data.rowsPerPage*participant_data.page-participant_data.rowsPerPage+1}} to {{participant_data.rowsPerPage*participant_data.page}} of {{participant_data.total_data}} Person</div>
                <div v-if="participant_data.page === Math.ceil(participant_data.total_data/participant_data.rowsPerPage)">Showing {{participant_data.rowsPerPage*participant_data.page-participant_data.rowsPerPage+1}} to {{participant_data.total_data}} of {{participant_data.total_data}} Person</div>
              </div>
              <div class="kmp-training-detail-subtitle q-mb-md" v-else >Belum ada data</div>
            </div>
            <div v-if="isLoadingDetail">
              <q-skeleton class="full-width" height="100px" />
            </div>
            <div class="row q-my-md" v-else>
              <div
                v-for="(item, index) in list_participant_reg"
                :key="index"
                class="col-6 col-md-6 col-xs-12 q-pa-sm"
              >
                <div class="row items-center">
                  <div class="col-1">
                    <div v-if="item.employee_type == 'employee'">
                      <q-avatar size="36px" v-if="item.user.profile_picture != null">
                        <img :src="`./api${item.user.profile_picture}`"/>
                      </q-avatar>
                      <q-avatar color="km-blue" text-color="white" size="36px" v-else>
                        <span style="font-size:12px">
                          {{
                            item.user.name
                              .match(/\b(\w)/g)
                              .join('')
                              .toUpperCase()
                          }}
                          </span>
                      </q-avatar>
                    </div>
                    <div v-else>
                      <q-avatar color="km-blue" text-color="white" size="36px">
                      <span style="font-size:12px">
                        {{
                          item.non_employee.name
                            .match(/\b(\w)/g)
                            .join('')
                            .toUpperCase()
                        }}
                        </span>
                      </q-avatar>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="kmp-font-sm kmp-font-bold q-ml-md"  style="white-space: pre-line;" v-if="item.employee_type == 'employee'">{{ item.user.name.toUpperCase() }}</div>
                    <div class="kmp-font-sm kmp-font-bold q-ml-md"  style="white-space: pre-line;" v-else>{{ item.non_employee.name.toUpperCase() }}</div>
                  </div>
                  <div class="col-5"></div>
                </div>
              </div>
            </div>
            <div class="row justify-end row q-my-md">
              <div v-show="participant_data.total_page > 1">
                <q-pagination
                  v-model="participant_data.page"
                  :max="participant_data.total_page"
                  :max-pages="0"
                  direction-links
                  boundary-links
                  text-color="grey-6"
                  color="grey-6"
                  active-text-color="purple-6"
                  size="12px"
                  padding="6px 12px 6px 12px"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>



    </q-card>
    <q-dialog v-model="modal_permission_training" persistent>
      <q-card :style="this.$q.platform.is.mobile ? 'max-width:400px' : 'min-width: 500px'" class="q-pb-md">
        <q-card-section class="text-white bg-km-blue" >
          <div class="row justify-end">
          <q-icon
            name="close"
            size="24px"
            class="float-right"
            v-close-popup
          />
          </div>
          <div class="row text-h6 justify-center text-center">FORM PERMOHONAN IZIN</div>
          <div class="row text-h6 justify-center text-center">{{ this.training_type_detail.toUpperCase() }} {{ this.training_name_detail.toUpperCase() }}</div>
        </q-card-section>
        <q-separator />
      <q-card-section class="q-pt-md">
        <div class="text-neutral">Nama Atasan Langsung</div>
        <q-select
          v-model="atasan_id"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          @filter="filterAtasan"
          :options="atasan_option"
          :option-value="'id'"
          :option-label="'name'"
          name="atasan_option"
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
      </q-card-section>
      <q-card-section class="q-pt-none">
        <!-- <q-checkbox v-model="agree" true-value="yes" false-value="no" right-label label="Bersedia mengikuti seluruh rangkaian proses belajar mengajar dan atat tertib dalam pelatihan ini" color="Blue" /> -->
        <div class="row">
          <q-checkbox
            v-model="agree"
            color="blue"
            label="Bersedia mengikuti seluruh rangkaian proses belajar mengajar dan tata tertib dalam pelatihan ini."
            true-value="yes"
            false-value="no"
            right-label
          />
        </div>
        <div class="row" style="padding-left: 7.5%">
        <div v-if="agree == 'yes'">
          <span>Setelah pelatihan saya akan :</span>
          <li>Membuat laporan peserta diklat</li>
          <li>Sharing pengetahuan hasil diklat</li>
          <li>Mempraktikkan hasil diklat</li>
        </div>
        </div>
      </q-card-section>
      <q-separator spaced />
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>
          <q-btn
            class="float-right q-mr-sm publish-button"
            label="Kirim"
            unelevated
            @click="registerTraining()"
            :disable="agree == 'no'"
            color="km-blue"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_approve" persistent>
      <q-card :style="this.$q.platform.is.mobile ? 'max-width:400px' : 'min-width: 500px'" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">TERIMA PERMOHONAN IZIN PESERTA</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div v-if="participant_training_history.length != 0">
            <p>Berikut daftar diklat yang pernah diikuti oleh peserta:</p>
              <div
                v-for="(training, index) in this.participant_training_history"
                class="row q-mb-md"
                :key="index"
              >
              <li style="font-size:12px">{{training.training_name}}</li>
              </div>
          </div>
          <div v-else>
            <p>Peserta belum pernah mengikuti diklat</p>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <q-checkbox v-model="keterangan_atasan" val="a" right-label label="Selama yang bersangkutan mengikuti diklat dibebaskan dari pekerjaan rutin" color="Blue" />
          <q-checkbox v-model="keterangan_atasan" val="b" right-label label="Memberikan kesempatan kepada yang bersangkutan untuk mempraktekkan hasil diklat" color="Blue" />
          <q-checkbox v-model="keterangan_atasan" val="c" right-label label="Memonitoring dan memberikan review terhadap implementasi hasil diklat ditempat kerja" color="Blue" />
        </q-card-section>

        <q-separator spaced />

        <q-card-actions align="right" class="text-primary">
          <!-- <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> -->
          <q-btn
            class="float-right q-mr-sm publish-button"
            color="km-blue"
            label="Kirim"
            unelevated
            @click="approveTraining()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_decline" persistent>
      <q-card :style="this.$q.platform.is.mobile ? 'max-width:400px' : 'min-width: 500px'" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Tolak permohonan izin peserta</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <q-input
            outlined
            dense
            v-model="alasan_ditolak"
            class=""
            required
            placeholder="Alasan"
          ></q-input>
        </q-card-section>

        <q-separator spaced />

        <q-card-actions align="right" class="text-primary">
          <!-- <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> -->
          <q-btn
            class="float-right q-mr-sm publish-button"
            color="km-blue"
            label="Kirim"
            unelevated
            @click="declinedTraining()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_decline_participant" persistent>
      <q-card :style="this.$q.platform.is.mobile ? 'max-width:400px' : 'min-width: 500px'" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Alasan</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="">
          <q-input
            outlined
            dense
            v-model="alasan_ditolak"
            class=""
            required
            placeholder="Alasan"
          ></q-input>
        </q-card-section>

        <q-separator spaced />

        <q-card-actions align="right" class="text-primary">
          <!-- <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> -->
          <q-btn
            class="float-right q-mr-sm publish-button"
            color="km-blue"
            label="Kirim"
            unelevated
            @click="participantDecline()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm_dialog_reinvite" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="message" color="grey" text-color="white"></q-avatar>
          <span class="q-ml-sm">{{ this.participant_cancel_reason }}</span>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Put in Training?" color="km-blue" @click="handleConfirmCancelTraining('reinvite')" v-close-popup></q-btn>
          <q-btn flat label="No" color="km-blue" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm_dialog_cancel" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="cancel" color="red" text-color="white"></q-avatar>
          <span class="q-ml-sm">Are you sure want to cancel this training?</span>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-none q-pb-none q-mt-sm">
          <div class="text-neutral">Alasan</div>
          <q-input v-model="training_cancel_reason"  class="q-pb-sm" dense outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Yes" color="km-blue" @click="handleConfirmCancelTraining()" v-close-popup></q-btn>
          <q-btn flat label="No" color="km-blue" @click="this.confirm_dialog_cancel=false" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <fixed-modal
      :show="modal_edit_training"
      title="Edit Training"
      width="560vw"
      @on-close="modal_edit_training = false"
    >
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Training Name <sup class="text-red">*</sup></div>
        <q-input dense v-model="training_name" outlined autofocus />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Description</div>
        <q-input
          outlined
          dense
          v-model="training_description"
          type="textarea"
          class=""
        ></q-input>
      </q-card-section>
      <q-card-section class="q-pt-md">
        <div class="text-title q-pb-sm">Banner Training</div>
        <q-img v-show="banner_training" :src="banner_training" height="" style="border: 1px solid #bdbdbd; border-radius: 5px;">
            <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
              style="top: 8px; right: 8px" @click="handleDelBanner()"
            />
          </q-img>
          <q-img v-show="!banner_training" src="../../assets/images/upload.png" class="cursor-pointer"  @click="mediaVisible = true"/>
          <Media v-model="mediaVisible" use-tab="media" @select="onMediaSelect" />
          <div class="q-mt-sm">
            Maks file size 1Mb
          </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-6 q-pr-sm">
            <div class="text-neutral">Training Type <sup class="text-red">*</sup></div>
            <q-select
              v-model="training_type"
              :options="type_option"
              name="type_option"
              outlined
              dense
            >
            </q-select>
          </div>
          <div class="col-6 q-pl-sm">
            <div class="text-neutral">Training Category</div>
            <q-select
              v-model="training_category"
              :options="category_option"
              name="category_option"
              outlined
              dense
            >
            </q-select>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Training Method</div>
        <q-select
          v-model="training_method"
          :options="method_option"
          name="method_option"
          outlined
          dense
        >
        </q-select>
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="this.training_method === 'Online' || this.training_method === 'Blended Learning'">
        <div class="text-neutral">Link</div>
        <q-input dense v-model="link_online" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="this.training_method === 'Online' || this.training_method === 'Blended Learning'">
        <div class="text-neutral">Password</div>
        <q-input dense v-model="password" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="this.training_method === 'Offline' || this.training_method === 'Blended Learning'">
        <div class="text-neutral">Location</div>
        <q-input dense v-model="locations" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Penyelenggara</div>
        <q-input dense v-model="provider" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
      <div class="text-neutral">Jumlah JP</div>
        <q-input dense v-model="jam_pelatihan" type="number" min="1" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Topik Pelatihan</div>
        <!-- <q-input dense v-model="topik_pelatihan" outlined /> -->
        <q-select
          v-model="topik_pelatihan"
          use-input
          use-chips
          multiple
          stack-label
          @new-value="createValueTopikPelatihan"
          :options="filter_options_topik_pelatihan"
          @filter="filterFnTopikPelatihan"
          hide-dropdown-icon
          color="black"
          outlined
          dense>
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
              color="#E6F4FF"
              text-color="primary"
              class=""
            >
              {{ scope.opt }}
            </q-chip>
          </template>
        </q-select>
        <div class="row"><span class="text-grey" style="font-size:12px;">Click key enter to add new topic or select on the options menu<sup class="text-grey">*</sup></span></div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Maximum Capacity<sup class="text-red">*</sup></div>
          <q-input
            dense
            v-model="maximun_capacity"
            type="number"
            min="1"
            outlined
          />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Certificate Link</div>
        <q-input dense v-model="certificate_link" outlined />
      </q-card-section>
      <!-- <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-5 q-pr-sm q-pt-md text-neutral">
            <q-toggle v-model="is_private" />
            RSVP for event
          </div>
          <div class="col-7 q-pl-sm">
            <div class="text-neutral">Maximum Capacity</div>
            <q-input
              dense
              v-model="maximun_capacity"
              type="number"
              min="1"
              outlined
            />
          </div>
        </div>
      </q-card-section> -->
      <q-separator />
      <q-card-section class="q-pt-md">
        <div class="text-title">Training Time</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-neutral">Recurring</div>
        <q-select
          v-model="recuring"
          :options="['Does not repeat', 'Daily', 'Custom']"
          outlined
          dense
        >
        </q-select>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-5 text-neutral">
            <q-toggle v-model="all_day" />
            All Day Event
          </div>
        </div>
      </q-card-section>
      <div>
        <q-card-section
          class="q-pt-none"
          v-if="this.recuring === 'Does not repeat'"
        >
          <div class="row q-mb-xs">
            <div :class="!all_day ? 'col-12 col-sm-6 q-pr-md' : 'col-12'">
              <div class="text-neutral">Start Date</div>
              <q-input
                outlined
                dense
                v-model="start_date"
                mask="date"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="start_date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-sm-6" v-if="!all_day">
              <div class="row">
                <div class="col-5 q-pr-xs">
                  <div class="text-neutral">Start Time</div>
                  <q-input
                    outlined
                    dense
                    v-model="start_time"
                    mask="time"
                    :rules="['time']"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="start_time" format24h>
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-2 text-center text-neutral q-pt-lg">To</div>
                <div class="col-5 q-pl-xs">
                  <div class="text-neutral">End Time</div>
                  <q-input
                    outlined
                    dense
                    v-model="end_time"
                    mask="time"
                    :rules="['time']"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="end_time" format24h>
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none" v-else-if="this.recuring === 'Daily'">
          <div class="row q-mb-xs">
            <div :class="!all_day ? 'col-12 col-sm-6 q-pr-md' : 'col-12'">
              <div class="text-neutral">Start Date</div>
              <q-input
                outlined
                dense
                v-model="start_date"
                mask="date"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="start_date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-sm-6" v-if="!all_day">
              <div class="row">
                <div class="col-5 q-pr-xs">
                  <div class="text-neutral">Start Time</div>
                  <q-input
                    outlined
                    dense
                    v-model="start_time"
                    mask="time"
                    :rules="['time']"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="start_time" format24h>
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-2 text-center text-neutral q-pt-lg">To</div>
                <div class="col-5 q-pl-xs">
                  <div class="text-neutral">End Time</div>
                  <q-input
                    outlined
                    dense
                    v-model="end_time"
                    mask="time"
                    :rules="['time']"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="end_time" format24h>
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="text-neutral">End Date</div>
            <q-input
              outlined
              dense
              v-model="end_date"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="end_date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <!-- <div class="text-neutral">Ends after how many occurence</div>
          <q-input dense v-model="ends_after_how_many_occurence" type="number" outlined/> -->
        </q-card-section>
        <q-card-section class="q-pt-none" v-else>
          <div
            v-for="(field, index) in this.schedule_custom_array"
            :key="index"
          >
            <div class="row q-mb-md">
              <div :class="!all_day ? 'col-12 col-sm-6 q-pr-md' : 'col-12'">
                <div class="text-neutral">Date</div>
                <q-input
                  outlined
                  dense
                  v-model="start_date_custom[index]"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="start_date_custom[index]">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-sm-6" v-if="!all_day">
                <div class="row">
                  <div class="col-5 q-pr-xs">
                    <div class="text-neutral">Start Time</div>
                    <q-input
                      outlined
                      dense
                      v-model="start_time_custom[index]"
                      mask="time"
                      :rules="['time']"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              v-model="start_time_custom[index]"
                              format24h
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-1 text-center text-neutral q-pt-lg">To</div>
                  <div class="col-5 q-pl-xs">
                    <div class="text-neutral">End Time</div>
                    <q-input
                      outlined
                      dense
                      v-model="end_time_custom[index]"
                      mask="time"
                      :rules="['time']"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="end_time_custom[index]" format24h>
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-1 text-center text-neutral q-pt-lg">
                    <q-btn
                      flat
                      round
                      icon="close"
                      size="sm"
                      @click="DeleteCustomDate(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-1 q-pt-xs">
            <q-btn
              outline
              color="primary"
              no-caps
              label="Add Date"
              @click="AddCustomDate()"
            />
          </div>
        </q-card-section>
      </div>
      <q-separator />
      <q-card-section class="q-pt-md row d-flex justify-between">
        <div class="text-title">Narasumber</div>
        <div
          class="text-title kmp-text-blue-2 cursor-pointer"
          v-if="narasumber_roles === 'External'"
          @click="modal_add_narasumber = true"
        >
          + Add New Narasumber
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-12 col-sm-6 q-pr-md">
            <div class="text-neutral">Roles</div>
            <q-select
              v-model="narasumber_roles"
              :options="['Internal', 'External']"
              outlined
              dense
            >
            </q-select>
          </div>
          <div class="col-10 col-sm-5 q-pr-md text-neutral">
            <div class="text-neutral">Add Person</div>
            <q-select
              v-model="narasumber_person_id"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              @filter="filterPersons"
              :options="persons_option"
              :option-value="'id'"
              :option-label="'name'"
              :disable="narasumber_roles === null"
              name="persons_option"
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
          <div class="col-2 col-sm-1 q-pt-lg">
            <q-btn
              outline
              color="primary"
              no-caps
              label="Add"
              @click="addNarasumber"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div
          v-for="(narasumber, index) in this.narasumber_list"
          :key="index"
          class="q-mb-sm"
        >
          <div class="row q-mb-xs">
            <div class="col-8">
              <div class="text-neutral">
                <span
                  ><q-badge color="blue" rounded class="q-pa-xd" multi-line
                    ><q-avatar
                      size="sm"
                      class="q-mr-xs"
                      color="primary"
                      text-color="white"
                      >{{
                        narasumber.name
                          .match(/\b(\w)/g)
                          .join('')
                          .toUpperCase()
                      }}</q-avatar
                    >
                    {{ narasumber.name.toUpperCase() }}</q-badge
                  ></span>
              </div>
            </div>
            <div class="col-4 text-right text-neutral">
              {{ narasumber.roles }}
              <q-btn
                flat
                round
                icon="close"
                size="sm"
                @click="deleteNarasumber(index, narasumber.users_id)"
              />
            </div>
          </div>
          <div
          v-for="(topic, i) in topic_list.filter(el => el.users_id === narasumber.users_id && el.roles === narasumber.roles)"
          class="q-mb-xs"
          :key="i"
          >
            <div class="row q-mb-xs">
              <div class="col-11 q-pr-xs">
                <q-input
                  outlined
                  dense
                  v-model="topic.topic_narasumber"
                  class=""
                  required
                  placeholder="Tuliskan materi"
                ></q-input>
              </div>
              <div class="col-1 text-right text-neutral">
                <q-btn
                  flat
                  round
                  icon="close"
                  size="sm"
                  @click="deleteTopic(topic.topic_narasumber, narasumber.users_id)"
                />
              </div>
            </div>
            <div class="row q-mb-xs">
              <div class="col-12 col-sm-6 q-py-xs q-pr-xs">
                <q-select
                  label="Jadwal"
                  v-model="topic.date_start"
                  :options="schedule_option"
                  option-label="label"
                  option-value="value"
                  name="schedule_option"
                  outlined
                  dense
                  map-options
                  emit-value
                >
                </q-select>
              </div>
              <div class="col-6 col-sm-3 q-py-xs q-pr-xs">
                <q-input
                  outlined
                  dense
                  v-model="topic.time_start"
                  mask="time"
                  :rules="['time']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="topic.time_start" format24h>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-sm-3 q-py-xs q-pr-xs">
                <q-input
                  outlined
                  dense
                  v-model="topic.time_end"
                  mask="time"
                  :rules="['time']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="topic.time_end" format24h>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <div class="row">
            <q-btn
              outline
              color="primary"
              no-caps
              label="Add Materi"
              @click="addTopic(narasumber.users_id, narasumber.roles, narasumber.name)"
            />
          </div>
          <q-separator class="q-my-sm"/>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-md">
        <div class="text-title">PIC <sup class="text-red">*</sup></div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-10 col-sm-10 q-pr-md text-neutral">
            <div class="text-neutral">Add Person</div>
            <q-select
              v-model="narasumber_person_pic_id"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              @filter="filterPersonsPic"
              :options="persons_pic_option"
              :option-value="'id'"
              :option-label="'name'"
              name="persons_pic_option"
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
          <div class="col-2 col-sm-2 q-pt-lg">
            <q-btn
              outline
              color="primary"
              no-caps
              label="Add"
              @click="addPIC()"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div
          v-for="(narasumber, index) in this.narasumber_list_pic"
          class="row q-mb-xs"
          :key="index"
        >
          <div class="col-8">
            <div class="text-neutral">
              <span
                ><q-badge color="blue" rounded class="q-pa-xd" multi-line
                  ><q-avatar
                    size="sm"
                    class="q-mr-xs"
                    color="primary"
                    text-color="white"
                    >{{
                      narasumber.name
                        .match(/\b(\w)/g)
                        .join('')
                        .toUpperCase()
                    }}</q-avatar
                  >
                  {{ narasumber.name.toUpperCase() }}</q-badge
                ></span
              >
            </div>
          </div>
          <div class="col-4 text-right text-neutral">
            PIC
            <q-btn
              flat
              round
              icon="close"
              size="sm"
              @click="deletePIC(index)"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-md q-pb-md" :class="$q.platform.is.mobile ? 'q-px-sm' : ''">
        <q-card bordered>
          <q-tabs
        v-model="tab"
        dense
        align="left"
        class="text-white bg-km-blue shadow-2"
        :breakpoint="0"
            narrow-indicator
          >
            <q-tab name="invitation" label="Invitation" @click="resetFilter()" />
            <q-tab name="reg_admin" label="Register by Admin" @click="resetFilter()"/>
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="invitation" :class="$q.platform.is.mobile ? 'q-px-none' : ''">
              <div class="text-h6 q-mb-xs q-pl-md">Invitation</div>
              <q-card-section class="q-pt-none">
                <div class="text-neutral">Unit Kerja</div>
                  <div style="border: 1.4px solid #d8d8d8; border-radius: 10px;">
                    <treeselect
                      :load-options="loadOptions"
                      v-model="direktorat_id"
                      :options="direktorat_options_filter"
                      close-on-select
                      :clearable="false"
                      :normalizer="normalizer"
                      placeholder=""
                      class="vue-treeselect"
                      @select="direktoratTreeSelect"
                    />
                  </div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="text-neutral">Jabatan</div>
                <q-select
                    :disable="(direktorat_id === '' || direktorat_id === null)"
                    v-model="jabatan_id"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    @filter="filterJabatan"
                    @input="id => addOrganizationIds('pangkat', id)"
                    :options="jabatan_options_filter"
                    :option-value="'id'"
                    :option-label="'name'"
                    name="jabatan_id"
                    autocomplete="off"
                    emit-value
                    map-options
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
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="text-neutral">Pangkat</div>
                <q-select
                    :disable="(direktorat_id === '' || direktorat_id === null)"
                    v-model="pangkat_id"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    @filter="filterPangkat"
                    @input="id => addOrganizationIds('golongan', id)"
                    :options="pangkat_options_filter"
                    :option-value="'id'"
                    :option-label="'name'"
                    name="pangkat_id"
                    autocomplete="off"
                    emit-value
                    map-options
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
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="text-neutral">Golongan</div>
                <q-select
                    :disable="(direktorat_id === '' || direktorat_id === null)"
                    v-model="golongan_id"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    @filter="filterPangkat"
                    @input="id => addOrganizationIds(id)"
                    :options="golongan_options_filter"
                    :option-value="'id'"
                    :option-label="'name'"
                    name="golongan_id"
                    autocomplete="off"
                    emit-value
                    map-options
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
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="row">
                  <div class="col-12 col-sm-10 q-pr-md text-neutral">
                    <div class="text-neutral">Search Person</div>
                    <q-select
                      :disable="direktorat_id === null"
                      v-model="invitation_person_id"
                      use-input
                      fill-input
                      input-debounce="0"
                      @filter="filterPersonsDirektorat"
                      @keydown.enter.prevent="addInvitation"
                      :options="persons_direktorat_option_filter"
                      :option-value="'id'"
                      :option-label="'name'"
                      name="invitation_person_id"
                      autocomplete="off"
                      dense
                      outlined
                      multiple
                    >
                      <template v-slot:append>
                        <q-icon
                          v-if="persons_direktorat_option.length > 0"
                          class="cursor-pointer"
                          color="primary"
                          :name="is_select_all_persons ? 'check_box' : 'check_box_outline_blank'"
                          @click="handleSelectAllPersons"
                        />
                      </template>
                      <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                        <q-item
                          v-bind="itemProps"
                          v-on="itemEvents"
                        >
                          <q-item-section>
                            <q-item-label></q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-checkbox :value="selected" @input="toggleOption(opt)" />
                          </q-item-section>
                        </q-item>
                      </template>
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="col-12 col-sm-2 q-pt-lg">
                    <q-btn outline color="primary" no-caps label="Add" @click="addInvitation" />
                  </div>
                </div>
                <div class="q-mt-md">
                  <q-badge
                    class="cursor-pointer q-pt-xs q-pb-xs"
                    style="border: 1px solid red; border-radius: 8px"
                    color="transparent"
                    @click="invitation_list = []"
                    v-if="invitation_list.length > 0"
                  >
                    <q-icon
                      name="delete"
                      color="red"
                      size="sm"
                    />
                    <div style="color: red">Remove All Invitation</div>
                  </q-badge>
                </div>
                <div :style="invitation_list.length > 5 ? 'max-height: 20vh' : ''" class="scroll q-mt-md">
                  <div
                    v-for="(row, index) in invitation_list"
                    class="row q-mb-xs"
                    :key="index"
                  >
                    <div class="col-8">
                      <div class="text-neutral">
                        <span
                          ><q-badge color="blue" rounded class="q-pa-xd" multi-line
                            ><q-avatar
                              size="sm"
                              class="q-mr-xs"
                              color="primary"
                              text-color="white"
                              >{{
                                row.name
                                  .match(/\b(\w)/g)
                                  .join('')
                                  .toUpperCase()
                              }}</q-avatar
                            >
                            {{ row.name.toUpperCase() }}</q-badge
                          ></span>
                      </div>
                    </div>
                    <div class="col-4 text-right text-neutral">
                      {{ row.roles }}
                      <q-btn
                        flat
                        round
                        icon="close"
                        size="sm"
                        @click="deleteInvitation(index)"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-tab-panel>
            <q-tab-panel name="reg_admin" :class="$q.platform.is.mobile ? 'q-px-none' : ''">
              <div class="text-h6 q-mb-xs q-pl-md">Register by Admin</div>
                <q-card-section class="q-pt-none row d-flex justify-between">
                  <q-toggle v-model="employee" label="Non Employee" @input="resetFilter" />
                  <div
                    class="text-title kmp-text-blue-2 cursor-pointer q-mt-sm"
                    v-if="employee === true"
                    @click="modal_add_employee = true"
                  >
                    + Add Employee
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-file color="grey-3" :disable="employee == true" outlined accept=".xls, .xlsx, excel/*" dense clearable label-color="primary" v-model="file_participant" @input="importParticipant" label="Import Participant">
                    <template v-slot:append>
                      <q-icon name="attach_file" color="primary" />
                    </template>
                  </q-file>
                  </q-card-section>
                <q-card-section class="q-pt-none">
                  <div class="text-neutral">Unit Kerja</div>
                    <div style="border: 1.4px solid #d8d8d8; border-radius: 10px;">
                      <treeselect
                        :load-options="loadOptions"
                        v-model="direktorat_id"
                        :options="direktorat_options_filter"
                        close-on-select
                        :clearable="false"
                        :normalizer="normalizer"
                        placeholder=""
                        class="vue-treeselect"
                        @select="direktoratTreeSelect"
                      />
                    </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <div class="text-neutral">Jabatan</div>
                  <q-select
                      :disable="(direktorat_id === '' || direktorat_id === null || employee == true)"
                      v-model="jabatan_id"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      @filter="filterJabatan"
                      @input="id => addOrganizationIds('pangkat', id)"
                      :options="jabatan_options_filter"
                      :option-value="'id'"
                      :option-label="'name'"
                      name="jabatan_id"
                      autocomplete="off"
                      emit-value
                      map-options
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
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <div class="text-neutral">Pangkat</div>
                  <q-select
                      :disable="(direktorat_id === '' || direktorat_id === null || employee == true)"
                      v-model="pangkat_id"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      @filter="filterPangkat"
                      @input="id => addOrganizationIds('golongan', id)"
                      :options="pangkat_options_filter"
                      :option-value="'id'"
                      :option-label="'name'"
                      name="pangkat_id"
                      autocomplete="off"
                      emit-value
                      map-options
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
                </q-card-section>
                <q-card-section class="q-pt-none">
                <div class="text-neutral">Golongan</div>
                <q-select
                    :disable="(direktorat_id === '' || direktorat_id === null || employee == true)"
                    v-model="golongan_id"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    @filter="filterPangkat"
                    @input="id => addOrganizationIds(id)"
                    :options="golongan_options_filter"
                    :option-value="'id'"
                    :option-label="'name'"
                    name="golongan_id"
                    autocomplete="off"
                    emit-value
                    map-options
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
              </q-card-section>
                <q-card-section class="q-pt-none">
                  <div class="row">
                    <div class="col-12 col-sm-10 q-pr-md text-neutral">
                      <div class="text-neutral">Search Person</div>
                      <q-select
                        :disable="direktorat_id === null"
                        v-model="invitation_person_id"
                        use-input
                        fill-input
                        input-debounce="0"
                        @filter="filterPersonsDirektorat"
                        @keydown.enter.prevent="addParticipant"
                        :options="persons_direktorat_option_filter"
                        :option-value="'id'"
                        :option-label="'name'"
                        name="invitation_person_id"
                        autocomplete="off"
                        dense
                        outlined
                        multiple
                      >
                        <template v-slot:append>
                          <q-icon
                            v-if="persons_direktorat_option.length > 0"
                            class="cursor-pointer"
                            color="primary"
                            :name="is_select_all_persons ? 'check_box' : 'check_box_outline_blank'"
                            @click="handleSelectAllPersons"
                          />
                        </template>
                        <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                          <q-item
                            v-bind="itemProps"
                            v-on="itemEvents"
                          >
                            <q-item-section>
                              <q-item-label></q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-checkbox :value="selected" @input="toggleOption(opt)" />
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                    <div class="col-12 col-sm-2 q-pt-lg">
                      <q-btn outline color="primary" no-caps label="Add" @click="addParticipant" />
                    </div>
                  </div>
                  <!-- batas -->
                  <div class="q-mt-md">
                    <q-badge
                      class="cursor-pointer q-pt-xs q-pb-xs"
                      style="border: 1px solid red; border-radius: 8px"
                      color="transparent"
                      @click="invitation_reg_list = []"
                      v-if="invitation_reg_list.length > 0"
                    >
                      <q-icon
                        name="delete"
                        color="red"
                        size="sm"
                      />
                      <div style="color: red">Remove All Participant</div>
                    </q-badge>
                  </div>
                  <div :style="invitation_reg_list.length > 5 ? 'max-height: 20vh' : ''" class="scroll q-mt-md">
                    <div
                      v-for="(row, index) in invitation_reg_list"
                      class="row q-mb-sm"
                      :key="index"
                    >
                      <div class="col-8">
                        <div class="text-neutral">
                          <span
                            ><q-badge color="blue" rounded class="q-pa-xd" multi-line
                              ><q-avatar
                                size="sm"
                                class="q-mr-xs"
                                color="primary"
                                text-color="white"
                                >{{
                                  row.name
                                    .match(/\b(\w)/g)
                                    .join('')
                                    .toUpperCase()
                                }}</q-avatar
                              >
                              {{ row.name.toUpperCase() }}</q-badge
                            ></span
                          >
                        </div>
                      </div>
                      <div class="col-4 text-right text-neutral">
                        {{ row.roles }}
                        <q-btn
                          flat
                          round
                          icon="close"
                          size="sm"
                          @click="deleteParticipant(index)"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- batas -->
                    <div class="q-mb-sm">
                      <q-separator v-if="list_participant.length != 0" />
                        <div class="row q-mb-none q-mt-sm text-neutral" v-if="list_participant.length != 0">List Participant - {{ list_participant.length }}</div>
                        <div
                          v-for="(item, index) in list_participant"
                          :key="index"
                          class="row q-gutter-sm items-center"
                          :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"
                        >
                          <div class="col-8">
                            <div class="text-neutral">
                              <span>
                              <q-badge color="green" rounded class="q-pa-xd" multi-line v-if="item.employee_type == 'employee'">
                                <q-avatar
                                  size="sm"
                                  class="q-mr-xs"
                                  color="positive"
                                  text-color="white"
                                  >{{
                                    item.user.name
                                      .match(/\b(\w)/g)
                                      .join('')
                                      .toUpperCase()}}
                                </q-avatar>
                                  {{ item.user.name.toUpperCase() }}
                              </q-badge>
                              <q-badge color="green" rounded class="q-pa-xd" multi-line v-else>
                                <q-avatar
                                  size="sm"
                                  class="q-mr-xs"
                                  color="positive"
                                  text-color="white"
                                  >{{
                                    item.non_employee.name
                                      .match(/\b(\w)/g)
                                      .join('')
                                      .toUpperCase()}}
                                </q-avatar>
                                  {{ item.non_employee.name.toUpperCase() }}
                              </q-badge>
                          </span>
                        </div>
                      </div>
                        </div>
                  </div>
                  <div>
                    <q-separator v-if="list_participant_pending.length != 0" />
                      <div class="row q-mb-none q-mt-sm text-neutral" v-if="list_participant_pending.length != 0">List Participant Pending - {{ list_participant_pending.length }}</div>
                      <div
                        v-for="(item, index) in list_participant_pending"
                        :key="index"
                        class="row q-gutter-sm items-center"
                        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"
                      >
                        <div class="col-8">
                          <div class="text-neutral">
                            <span>
                            <q-badge color="orange-4" rounded class="q-pa-xd" multi-line v-if="item.employee_type == 'employee'">
                              <q-avatar
                                size="sm"
                                class="q-mr-xs"
                                color="orange"
                                text-color="white"
                                >{{
                                  item.user.name
                                    .match(/\b(\w)/g)
                                    .join('')
                                    .toUpperCase()}}
                              </q-avatar>
                                {{ item.user.name.toUpperCase() }}
                            </q-badge>
                            <q-badge color="orange-4" rounded class="q-pa-xd" multi-line v-else>
                              <q-avatar
                                size="sm"
                                class="q-mr-xs"
                                color="orange"
                                text-color="white"
                                >{{
                                  item.non_employee.name
                                    .match(/\b(\w)/g)
                                    .join('')
                                    .toUpperCase()}}
                              </q-avatar>
                                {{ item.non_employee.name.toUpperCase() }}
                            </q-badge>
                        </span>
                      </div>
                    </div>
                    </div>
                    <q-separator v-if="list_participant_declined.length != 0" />
                      <div class="row q-mb-none q-mt-sm text-neutral" v-if="list_participant_declined.length != 0">List Participant Declined - {{ list_participant_declined.length }}</div>
                      <div
                        v-for="(item, index) in list_participant_declined"
                        :key="index"
                        class="row q-gutter-sm items-center"
                        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"
                      >
                        <div class="col-8">
                          <div class="text-neutral">
                            <span>
                            <q-badge color="red-4" rounded class="q-pa-xd" multi-line v-if="item.employee_type == 'employee'">
                              <q-avatar
                                size="sm"
                                class="q-mr-xs"
                                color="red"
                                text-color="white"
                                >{{
                                  item.user.name
                                    .match(/\b(\w)/g)
                                    .join('')
                                    .toUpperCase()}}
                              </q-avatar>
                                {{ item.user.name.toUpperCase() }}
                            </q-badge>
                            <q-badge color="red-4" rounded class="q-pa-xd" multi-line v-else>
                              <q-avatar
                                size="sm"
                                class="q-mr-xs"
                                color="red"
                                text-color="white"
                                >{{
                                  item.non_employee.name
                                    .match(/\b(\w)/g)
                                    .join('')
                                    .toUpperCase()}}
                              </q-avatar>
                                {{ item.non_employee.name.toUpperCase() }}
                            </q-badge>
                        </span>
                      </div>
                    </div>
                    </div>
                  </div>
                </q-card-section>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-md">
        <div class="text-title q-pb-sm">Attachments</div>
        <q-btn outline color="primary" icon="add" @click="openModalAttachment(null, 'add')"/>
      </q-card-section>
      <q-card-section v-for="(item, index) in list_attachments" :key="index">
        <div class="row">
          <div class="col q-pr-sm">
            <Uploader
              endpoint="./api/api/file"
              :title="`${item.name} (${item.status ? 'Public files' : 'Private files'})`"
              multiple
              folder-upload
              show-upload-failed
              show-extensions
              :allowed-extensions="['png', 'jpg', 'jpeg', 'zip', 'rar', 'txt', 'docx', 'xlsx', 'csv', 'pdf', 'ppt', 'pptx']"
              :files="filesBuilder(item.finish_files)"
              :extra-params="{ 'filename_type': item.name, 'is_public': item.status }"
              @remove-file="fileIndex => item.finish_files.splice(fileIndex, 1)"
              @upload-complete="fileInfos => handleUploadAttachmentComplete(fileInfos, index)"
            />
          </div>
          <div class="col-1">
            <div class="row">
              <q-btn outline color="primary" icon="edit" @click="openModalAttachment(index, 'edit')"/>
            </div>
            <div class="row q-mt-sm">
              <q-btn outline color="red" icon="remove" @click="eachHandleDelete(index)"/>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none">
        <q-checkbox v-model="ket_notif_email_all" :disable="ket_notif_email == true" right-label :label="label_notif_email" color="Blue" />
        <q-checkbox v-model="ket_notif_email" :disable="ket_notif_email_all == true" right-label label="Kirim notifikasi dan email kepada peserta yang baru ditambahkan" color="Blue" />
      </q-card-section>
      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn
            size="sm"
            class="q-mr-sm"
            outline
            unelevated
            @click="modal_edit_training = false"
            >Cancel</q-btn
          >
          <div class="q-mr-sm">|</div>
          <div class="mobile-only">
            <q-btn-dropdown size="sm" color="primary" label="SAVE AS" unelevated>
              <q-list>
                <q-item  clickable v-close-popup @click="saveTraining('open_reg')">
                  <q-item-section>
                    <q-item-label>OPEN REGISTRATION</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup  @click="saveTraining('close_reg')">
                  <q-item-section>
                    <q-item-label>CLOSE REGISTRATION</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="saveTraining('save')">
                  <q-item-section>
                    <q-item-label>SAVE UPDATE</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="saveTraining('end')">
                  <q-item-section>
                    <q-item-label>END TRAINING</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="desktop-only">
            <q-btn
              size="sm"
              class="q-mr-sm publish-button"
              label="Open Registration"
              color="green"
              unelevated
              @click="saveTraining('open_reg')"
            />
            <q-btn
              size="sm"
              class="q-mr-sm publish-button"
              label="Close Registration"
              unelevated
              color="blue"
              @click="saveTraining('close_reg')"
            />
            <q-btn
              size="sm"
              class="q-mr-sm publish-button"
              label="Save Update"
              color="primary"
              unelevated
              @click="saveTraining('save')"
            />
            <q-btn
              size="sm"
              class="q-mr-sm publish-button"
              label="End Training"
              unelevated
              color="red"
              @click="saveTraining('end')"
            />
          </div>
        </q-card-actions>
      </template>
    </fixed-modal>
    <fixed-modal
      :show="modal_add_narasumber"
      title="Add New Narasumber"
      @on-close="modal_add_narasumber = false"
    >
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Nama<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.name" outlined @blur="$v.narasumber_create.name.$touch" :error="$v.narasumber_create.name.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.name.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none" v-if="this.notif_name">
        <div class="text-grey-7 q-pb-sm">"{{ this.notif_name }}" sudah tersimpan</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Instansi / Penyedia Pelatihan<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.instansi" outlined @blur="$v.narasumber_create.instansi.$touch" :error="$v.narasumber_create.instansi.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.instansi.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Topik<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.topic" outlined @blur="$v.narasumber_create.topic.$touch" :error="$v.narasumber_create.topic.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.topic.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Nomor HP<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.phone" outlined @blur="$v.narasumber_create.phone.$touch" :error="$v.narasumber_create.phone.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.phone.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">NIP<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.nip" outlined @blur="$v.narasumber_create.nip.$touch" :error="$v.narasumber_create.nip.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.nip.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Jabatan<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.jabatan" outlined @blur="$v.narasumber_create.jabatan.$touch" :error="$v.narasumber_create.jabatan.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.jabatan.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Pangkat / Golongan<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.pangkat" outlined @blur="$v.narasumber_create.pangkat.$touch" :error="$v.narasumber_create.pangkat.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.pangkat.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Nomor Telepon Kantor<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.telepon_kantor" outlined @blur="$v.narasumber_create.telepon_kantor.$touch" :error="$v.narasumber_create.telepon_kantor.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.telepon_kantor.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Nomor NPWP<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.no_npwp" outlined @blur="$v.narasumber_create.no_npwp.$touch" :error="$v.narasumber_create.no_npwp.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.no_npwp.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">No. Rekening / Bank<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.rek_bank" outlined @blur="$v.narasumber_create.rek_bank.$touch" :error="$v.narasumber_create.rek_bank.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.rek_bank.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Email<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="narasumber_create.email" outlined @blur="$v.narasumber_create.email.$touch" :error="$v.narasumber_create.email.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.narasumber_create.email.$error">Wajib diisi atau kalau tidak ada silahkan isi dengan "<b>-</b>"</div>
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
            class="text-neutral font-weight-bold q-mb-sm q-mt-sm"
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

      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn
            class=""
            outline
            unelevated
            @click="modal_add_narasumber = false"
            >Cancel</q-btn
          >
          <q-btn
            class="btn-primary-color float-right q-mr-sm publish-button"
            label="Save"
            unelevated
            @click="addNewNarasumber()"
          />
        </q-card-actions>
      </template>
    </fixed-modal>
    <fixed-modal
      :show="modal_add_attachment"
      title="Add Attachment"
      @on-close="modal_add_attachment = false"
    >
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Name</div>
        <q-input dense v-model="attachment_name" outlined/>
      </q-card-section>
      <q-card-section class="q-pt-none q-pl-xs">
        <q-checkbox class="text-neutral" v-model="is_public" label="Public" color="primary" />
      </q-card-section>

      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated @click="modal_add_attachment = false">Cancel</q-btn>
          <q-btn  v-if="is_edit === true" class="btn-primary-color float-right q-mr-sm publish-button" label="Update" unelevated
          @click="updateFile(attachment_index);"/>
          <q-btn v-else class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated
          @click="addNewAttachment();"/>
        </q-card-actions>
      </template>
    </fixed-modal>
    <fixed-modal
      :show="modal_add_employee"
      title="Add New Employee"
      @on-close="modal_add_employee = false"
    >
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Nama<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="employee_create.e_name" outlined @blur="$v.employee_create.e_name.$touch" :error="$v.employee_create.e_name.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.employee_create.e_name.$error">Wajib diisi"<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-sm">
        <div class="text-neutral">Unit Kerja<sup class="text-red">*</sup></div>
        <div style="border: 1.4px solid #d8d8d8; border-radius: 10px;">
        <treeselect :load-options="loadOptions" :options="option_direktorat_employee" close-on-select :clearable="false" :normalizer="normalizer" placeholder="" v-model="employee_create.e_organization_id" @blur="$v.employee_create.e_organization_id.$touch" :error="$v.employee_create.e_organization_id.$error" />
        </div>
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.employee_create.e_organization_id.$error">Wajib diisi</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Nomor HP<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="employee_create.e_phone" outlined @blur="$v.employee_create.e_phone.$touch" :error="$v.employee_create.e_phone.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.employee_create.e_phone.$error">Wajib diisi"<b>-</b>"</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none">
        <div class="text-neutral">Email<sup class="text-red">*</sup></div>
        <q-input class="q-pb-sm" dense v-model="employee_create.e_email" outlined @blur="$v.employee_create.e_email.$touch" :error="$v.employee_create.e_email.$error" />
        <div class="q-pb-none q-pt-none text-red-7 text-sm" v-if="$v.employee_create.e_email.$error">Wajib diisi dengan format yang benar</div>
      </q-card-section>
      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn
            class=""
            outline
            unelevated
            @click="modal_add_employee = false"
            >Cancel</q-btn
          >
          <q-btn
            class="btn-primary-color float-right q-mr-sm publish-button"
            label="Save"
            unelevated
            @click="addNewEmployee()"
          />
        </q-card-actions>
      </template>
    </fixed-modal>
    <q-dialog v-model="modal_upload_banner">
      <q-card class="card-quiz-create">
        <q-card-section class="q-pt-sm text-right">
          <cropper ref="cropperBanner"
            class="cropper"
            :src="imageBanner.src"
            :stencil-props="{
              aspectRatio: 4/2,
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
    <q-inner-loading
      :showing="loading"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
<!--  </q-responsive>-->
</template>

<script>
import { getCredential } from 'src/lib/storage';
import { checkRole } from 'src/lib/helper';
import { Notify } from 'quasar';
import Treeselect from '@riophae/vue-treeselect';
// import _ from 'lodash';
import '../../css/vue-treeselect.css';
import 'vue-advanced-cropper/dist/style.css';
import Uploader from 'components/common/Uploader';
import { axios } from 'boot/axios';
import { required, email } from 'vuelidate/lib/validators';
import ListFile from 'components/common/ListFile';
import ListFileTrainingDetail from 'components/common/ListFileTrainingDetail';
import readXlsxFile from 'read-excel-file';
import moment from 'moment';
import Axios from 'axios';
import LightBox from 'vue-image-lightbox';
import FixedModal from 'components/common/FixedModal';
import VueEasyLightbox from 'vue-easy-lightbox';
import Media from 'components/media/Media';
import { Cropper, Preview } from 'vue-advanced-cropper';
import { trainingOnApproveAll } from 'components/notif/ActionTraining';
import { aesEncrypt } from '../../lib/helper';
import { point } from '../../lib/point';

require('vue-image-lightbox/dist/vue-image-lightbox.min.css');

import {
  trainingDetail,
  trainingParticipantGetOtherByType,
  trainingApproval,
  participantApproval,
  trainingRegister,
  trainingCancel,
  getAtasanUser,
  trainingParticipantGetAll,
  trainingParticipantGetHistoryTraining,
  messageConversationRead,
  updateUpdatedDate,
  postCreateNewMessage,
  messageMemberList,
  fileUpload,
  SearchDataAutocomplete,
  userGetByNIP,
  trainingMethodList,
  trainingTypeList,
  trainingCategoryList,
  fileDelete,
  fileUpdate,
  expertiseCreate,
  checkExpertise,
  trainingParticipantGetReg,
  trainingParticipantGetAllDetail,
  // organizationList,
  organizationUsers,
  nonEmployeeCreate,
  trainingUpdate,
  trainingList,
  expertiseTopicList,
  trainingExpertiseList,
  organizationListTraining,
  organizationListCustom,
  trainingElearningDetail
} from '../../lib/api';
// import TrainingDetailVue from 'src/pages/TrainingDetail.vue';

export default {
  components: { ListFile, FixedModal, Treeselect, Uploader, ListFileTrainingDetail, LightBox, VueEasyLightbox, Cropper, Preview, Media },
  data() {
    return {
      loading: false,
      mediaVisible: false,
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
      },
      string_options_topik_pelatihan: [],
      filter_options_topik_pelatihan: [],
      url: process.env.QUASAR_API_URL,
      elearningBaseUrl: process.env.ELEARNING_BASE_URL,
      elearningUrlTo: '',
      certificateElearningUrlTo: '',
      training_name_detail: '',
      training_created_by_detail: '',
      training_description_detail: '',
      status_detail: '',
      banner_detail: '',
      training_type_detail: '',
      training_method_detail: '',
      jam_pelatihan_detail: '',
      training_topic_detail: [],
      narasumber_list_detail_for_detail: [],
      pic_list_detail_for_training_detail: [],
      provider_detail: '',
      training_date_detail: '',
      time_start_detail: '',
      time_start_end: '',
      locations_detail: '',
      certificate_link_detail: '',
      link_online_detail: '',
      password_detail: '',
      finish_files_detail_for_training_detail: [],
      finish_files_for_training_detail: [],
      total_participant_detail: '',
      maximun_capacity_detail: '',
      list_participant_reg: [],
      list_participant_all: [],
      list_participant_pending: [],
      list_participant_declined: [],
      participants: [],
      all_day_detail: false,
      recuring_detail: 'Does not repeat',
      registered: 0,
      pending: 0,
      pending_admin: 0,
      pending_personal: 0,
      declined: 0,
      cancel: 0,
      week_before_training: false,
      remaining_quota: '',
      limit_reg: false,
      see_all: false,
      check_participant: 0,
      check_invitation: 0,
      tab_detail: 'about',
      participant_data: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 12,
        rowsNumber: 0,
        total_page: 0,
        total_data: 0
      },
      finish_files_register: [],
      uploaded_files: false,
      dataTraining: {},
      user: {
        id: '',
        name: '',
        initial: '',
        organization_id: ''
      },
      id_user: '',
      training_id: '',
      training_name: '',
      elearning_id: '',
      elearning_journey_list: [],
      training_created_by: '',
      training_description: '',
      training_type: '',
      training_method: '',
      training_date: '',
      time_start: '',
      locations: '',
      certificate_link: '',
      jam_pelatihan: '',
      provider: '',
      maximun_capacity: '',
      total_participant: '',
      list_schedule: [],
      list_expertise_topic: [],
      list_participant: [],
      all_participant: [],
      participant_pending: '',
      total_participant_pending: '',
      narasumber_list_detail: [],
      pic_list_detail: [],
      finish_files_detail: [],
      finish_files: [],
      isLoadingDetail: 1,
      is_km_manager: false,
      status: '',
      atasan_id: '',
      atasan_option: [],
      alasan_ditolak: '',
      id_pending: '',
      modal_permission_training: false,
      modal_decline: false,
      modal_decline_participant: false,
      modal_approve: false,
      registration_type: null,
      confirm_dialog_cancel: false,
      confirm_dialog_reinvite: false,
      participant_cancel_reason: null,
      training_cancel_reason: null,
      training_cancel_reason_txt: null,
      participant_type_status: null,
      banner: null,
      banner_training: null,
      agree: 'no',
      keterangan_atasan: [],
      link_online: '',
      password: '',
      participant_direktorat: [],
      training_topic: null,
      is_participant_btn_cancel: false,
      all_member_list: [],
      postCreateNewMessage,
      message: {
        member_list: [],
        member_list_id: [],
        memberFetch: messageMemberList
      },
      modal_edit_training: false,
      type_option: [],
      method_option: [],
      category_option: [],
      topik_pelatihan: [],
      recuring: 'Does not repeat',
      all_day: false,
      schedule_custom_array: [],
      narasumber_roles: null,
      narasumber_name: null,
      persons_option: [],
      narasumber_person_id: null,
      narasumber_list: [],
      persons_pic_option: [],
      narasumber_list_pic: [],
      narasumber_person_pic_id: null,
      tab: 'invitation',
      direktorat_id: null,
      jabatan_id: null,
      pangkat_id: null,
      golongan_id: null,
      direktorat_options_filter: [],
      jabatan_options_filter: [],
      pangkat_options_filter: [],
      golongan_options_filter: [],
      direktorat_options: [],
      jabatan_options: [],
      pangkat_options: [],
      golongan_options: [],
      persons_direktorat_option: [],
      persons_direktorat_option_filter: [],
      invitation_person_id: null,
      invitation_list: [],
      invitation_reg_list: [],
      training_category: '',
      start_date: null,
      start_time: null,
      end_date: null,
      end_time: null,
      employee: false,
      file_participant: null,
      label_notif_email: '',
      ket_notif_email_all: false,
      ket_notif_email: false,
      list_attachments: [],
      start_date_custom: [],
      start_time_custom: [],
      end_time_custom: [],
      modal_add_narasumber: false,
      narasumber_create: {
        name: '',
        email: '',
        phone: '',
        nip: '',
        jabatan: '',
        pangkat: '',
        telepon_kantor: '',
        no_npwp: '',
        rek_bank: '',
        topic: '',
        instansi: ''
      },
      finish_files_narasumber: [],
      name_on_db: '',
      notif_name: '',
      schedule_custom_repeat: 1,
      topic_list: [],
      employee_create: {
        e_name: '',
        e_phone: '',
        e_email: '',
        e_organization_id: null
      },
      modal_add_attachment: false,
      attachment_index: null,
      attachment_name: '',
      is_public: false,
      option_direktorat_employee: null,
      modal_add_employee: false,
      selected: null,
      isLoadingButtonAction: false,
      isLoading: false,
      on_going: false,
      is_done: false,
      preview: false,
      is_edit: false,
      see_participant: false,
      see_participant_member: false,
      account_approval: false,
      schedule_option: [],
      atasan: false,
      see_information: false,
      participant_training_history: [],
      date_start_training: null
    };
  },
  validations: {
    narasumber_create: {
      name: { required }, phone: { required }, nip: { required }, jabatan: { required }, pangkat: { required }, telepon_kantor: { required }, no_npwp: { required }, rek_bank: { required }, email: { required }, topic: { required }, instansi: { required }
    },
    employee_create: {
      e_name: { required }, e_phone: { required }, e_email: { required, email }, e_organization_id: { required }
    }
  },
  methods: {
    uniq(val, idx, arr) {
      for (let i = 0; i < idx; i++) {
        if (arr[i].name === val.name) {
          return false;
        }
      }
      return true;
    },
    downloadFile(file) {
      console.log(file);
      Axios.get(`${this.url}${file.path}`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: response.data.type });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = file.filename;
          link.click();
          URL.revokeObjectURL(link.href);
        }).catch(console.error);
    },
    handlePreview(index, index_finish) {
      this.$refs.lightbox[index].showImage(index_finish);
    },
    async loadOptions() {
      this.getDirektorat();
      this.getJabatan();
      this.getGolongan();
      this.getPangkat();
    },
    onAddAnotherResponse() {
      this.$router.push('/training');
    },
    onGetFirstData(selected) {
      this.resetTrainingFields();
      if (selected === 'load') {
        trainingDetail(this.$route.params.id).then(res => {
          if (res && res.message === 'OK') {
            this.training_id = res.data.id;
            this.isLoadingDetail = false;
            this.training_created_by_detail = res.data.created_by;
            this.training_name_detail = res.data.name;
            this.elearning_id = res.data.elearning_id;
            this.training_description_detail = res.data.description;
            this.status_detail = res.data.status;
            this.on_going = res.data.on_going;
            this.is_done = res.data.is_done;
            this.banner_detail = res.data.banner ? process.env.QUASAR_API_URL + res.data.banner : null;
            this.training_type_detail = res.data.training_type;
            this.training_method_detail = res.data.training_method;
            this.jam_pelatihan_detail = res.data.jam_pelatihan;
            if (res.data.topik_pelatihan) {
              if (res.data.topik_pelatihan[0] === '[') {
                this.training_topic_detail = JSON.parse(res.data.topik_pelatihan);
              } else if (res.data.topik_pelatihan === null) {
                this.training_topic_detail = [];
              } else {
                this.training_topic_detail = [res.data.topik_pelatihan];
              }
            }

            this.generateElearningUrl();
            // todo : cek kalau user mengikuti training
            this.generateCertificateElearningUrl();
            this.narasumber_list_detail_for_detail = [];
            this.pic_list_detail_for_training_detail = [];
            res.data.expertise_list.forEach((v, i) => {
              if (v.expert_type !== 'PIC') {
                if (v.expert_type === 'External') {
                  this.narasumber_list_detail_for_detail.push({
                    users_id: v.users_id,
                    name: v.expert_name,
                    roles: v.eksternal.instansi,
                    picture: null
                  });
                } else if (v.expert_type === 'Internal') {
                  this.narasumber_list_detail_for_detail.push({
                    users_id: v.users_id,
                    name: v.user.name,
                    picture: v.user.profile_picture,
                    roles: v.user.unit_kerja.name
                  });
                }
              } else {
                this.pic_list_detail_for_training_detail.push({
                  users_id: v.users_id,
                  name: v.user.name,
                  roles: v.expert_type,
                  email: v.user.email,
                  picture: v.user.profile_picture
                });
              }
            });
            this.provider_detail = res.data.provider;
            const dateStart1 = moment(res.data.schedule[0].date_start).format('D MMM YYYY');
            const dateStart2 = moment(res.data.schedule[0].date_start).format('D');
            const dateStart3 = moment(res.data.schedule[0].date_start).format('D MMM ');
            const dateEnd = moment(res.data.schedule[res.data.schedule.length - 1].date_start).format('D MMM YYYY');
            const monthStart = moment(res.data.schedule[0].date_start).format('MMM');
            const monthEnd = moment(res.data.schedule[res.data.schedule.length - 1].date_start).format('MMM');
            if (res.data.schedule.length > 1) {
              if (monthStart === monthEnd) {
                if (res.data.schedule[0].date_start === res.data.schedule[res.data.schedule.length - 1].date_start) {
                  this.training_date_detail = `${dateEnd}`;
                } else {
                  this.training_date_detail = `${dateStart2} - ${dateEnd}`;
                }
              } else {
                this.training_date_detail = `${dateStart3} - ${dateEnd}`;
              }
            } else {
              this.training_date_detail = dateStart1;
            }
            const date_start = moment(res.data.schedule[0].date_start);
            const now = moment().format('YYYY-MM-DD HH:mm:ss');
            const week = moment(date_start).subtract(7, 'd').startOf('d').format('YYYY-MM-DD HH:mm:ss');
            this.week_before_training = moment(now).isSameOrAfter(week);
            this.limit_reg = moment(now).isBefore(date_start);
            this.time_start_detail = res.data.schedule[0].time_start;
            this.time_end_detail = res.data.schedule[0].time_end;
            this.locations_detail = res.data.locations;
            this.certificate_link_detail = res.data.certificate_link;
            this.password_detail = res.data.password;
            this.link_online_detail = res.data.link;
            this.finish_files_for_training_detail = [];
            this.date_start_training = moment().diff(moment(date_start), 'day');
            res.data.files.forEach((v, i) => {
              if (v.filename_type === null) {
                this.finish_files.push({
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
            this.finish_files_detail_for_training_detail = [];
            const removeDuplicateName = res.data.files.reduce((arr, item) => {
              if (!arr.some(obj => obj.filename_type === item.filename_type)) arr.push(item);
              return arr;
            }, []);
            const groupByName = res.data.files.reduce((arr, item) => {
              if (item.filename_type !== null) arr[item.filename_type] = [...arr[item.filename_type] || [], { file: item }];
              return arr;
            }, []);
            this.finish_files_detail_for_training_detail = removeDuplicateName.map(item => {
              if (item.filename_type !== null) {
                return {
                  name: item.filename_type,
                  finish_files: groupByName[item.filename_type]
                };
              }
              return undefined;
            }).filter(item => item !== undefined);
            this.total_participant_detail = res.data.participant_list.length;
            this.maximun_capacity_detail = res.data.maximun_capacity;
            this.getAllParticipantDetail();
            if (this.is_km_manager === false) {
              if (this.atasan === false) {
                if (res.data.registered === 1) {
                  this.see_participant_member = true;
                }
              } else {
                this.see_participant = true;
              }
            } else {
              this.see_participant = true;
            }
            if (this.is_km_manager === true || (this.is_km_manager === false && res.data.registered === 1) || this.atasan === true) {
              this.see_information = true;
            }
            if (this.see_participant === true) {
              this.getAllParticipant();
            }
            if (this.see_participant_member === true) {
              this.getRegisteredParticipant();
            }
            this.remaining_quota = this.maximun_capacity_detail - this.total_participant_detail;
            const removeDuplicateDirektorat = res.data.participant_registered.reduce((arr, item) => {
              if (!arr.some(obj => obj.direktorat_id === item.direktorat_id)) arr.push(item);
              return arr;
            }, []);
            this.participant_direktorat = removeDuplicateDirektorat.map(item => {
              if (item.direktorat_id !== null && item.direktorat_id >= 32 && item.organization) {
                return {
                  name: item.organization.name,
                  id: item.direktorat_id
                };
              }
              return undefined;
            }).filter(item => item !== undefined);
            this.registered = res.data.registered;
            this.pending = res.data.pending;
            this.pending_admin = res.data.pending_admin;
            this.pending_personal = res.data.pending_personal;
            this.declined = res.data.declined;
            this.cancel = res.data.cancel;
            this.check_invitation = res.data.check_invitation;
            this.participant_pending = res.data.participant_pending;
            this.total_participant_pending = res.data.participant_pending ? res.data.participant_pending.length : 0;
            this.check_participant = res.data.check_participant;
            this.participants = res.data.participant;
            for (let index = 0; index < res.data.participant.length; index++) {
              const element = res.data.participant[index];
              if (this.user.id === element.users_id) {
                if (checkRole().name !== 'km_manager') {
                  this.registration_type = element.registration_type;
                  this.training_cancel_reason_txt = element.alasan_ditolak;
                  this.participant_type_status = element.participant_type;
                  this.is_participant_btn_cancel = true;
                  // jangan tampilkan button cancel apabila login member dan tidak terdaftar
                }
              }
            }
            this.is_participant_btn_cancel = res.data.btn_cancel;
            this.recuring_detail = res.data.recuring;
            this.list_schedule = [];
            this.all_day_detail = res.data.all_day;
            this.getExpertiseTopic();
            const removeDuplicateDate = res.data.schedule.reduce((arr, item) => {
              if (!arr.some(obj => obj.date_start === item.date_start)) arr.push(item);
              return arr;
            }, []);
            this.list_schedule = removeDuplicateDate.map(item => {
              if (item.date_start !== null) {
                return {
                  date_start: item.date_start,
                  time_start: item.time_start,
                  time_end: item.time_end
                };
              }
              return undefined;
            }).filter(item => item !== undefined);
            this.isLoad = false;
            this.account_approval = false;
            if (((this.user.id === this.training_created_by_detail) && this.is_km_manager === true) || (this.user.id === 2027 && this.is_km_manager === true)) {
              this.account_approval = true;
            }

            // get elearning journey
            trainingElearningDetail({ id: this.elearning_id }).then(resJourney => {
              if (resJourney && resJourney.message === 'OK') {
                console.log('JOURNEY', resJourney.data.courses[0].contents);
                this.elearning_journey_list = resJourney.data.courses[0].contents;
              } else {
                this.$router.push('/');
              }
            });
          } else {
            this.$router.push('/');
          }
        });
      } else {
        this.getTrainingMethod();
        this.getTrainingType();
        this.getTrainingCategory();
        this.getDirektoratEmployee();
        this.label_notif_email = 'Kirim notifikasi dan email ke semua peserta';
        this.isLoadingButtonAction = true;
        trainingParticipantGetOtherByType(this.training_id, {
          participant_type: 'registered'
        }).then(response => {
          const { data } = response;

          this.list_participant = data;
        });
        trainingParticipantGetOtherByType(this.training_id, {
          participant_type: 'pending',
          registration_type: ''
        }).then(response => {
          const { data } = response;

          this.list_participant_pending = data;
        });
        trainingParticipantGetOtherByType(this.training_id, {
          participant_type: 'declined',
          registration_type: ''
        }).then(response => {
          const { data } = response;

          this.list_participant_declined = data;
        });
        trainingDetail(this.training_id).then(response => {
          this.modal_edit_training = true;
          this.status = response.data.status;
          this.isLoadingButtonAction = false;
          this.training_id = response.data.id;
          this.training_name = response.data.name;
          this.elearning_id = response.data.elearning_id;
          this.organization_id = response.data.organization_id;
          this.training_description = response.data.description;
          this.training_type = response.data.training_type;
          this.training_method = response.data.training_method;
          this.training_category = response.data.training_category;
          this.locations = response.data.locations;
          this.certificate_link = response.data.certificate_link;
          this.provider = response.data.provider;
          this.jam_pelatihan = response.data.jam_pelatihan;
          if (response.data.topik_pelatihan[0] === '[') {
            this.topik_pelatihan = JSON.parse(response.data.topik_pelatihan);
          } else if (response.data.topik_pelatihan === null) {
            this.topik_pelatihan = [];
          } else {
            this.topik_pelatihan = [response.data.topik_pelatihan];
          }
          this.getTraining();
          this.generateElearningUrl();
          // todo : cek kalau user mengikuti training
          this.generateCertificateElearningUrl();
          this.all_day = response.data.all_day;
          this.is_private = response.data.is_private;
          this.maximun_capacity = response.data.maximun_capacity;
          this.recuring = response.data.recuring;
          this.training_date = response.data.date;
          this.id_registration = response.data.id_registration;
          if (response.data.banner) {
            this.banner_training = `${process.env.QUASAR_API_URL}${response.data.banner}`;
          }
          this.banner = response.data.banner;
          this.link_online = response.data.link;
          this.password = response.data.password;
          this.narasumber_list = [];
          this.narasumber_list_pic = [];
          response.data.expertise_list.forEach((v, i) => {
            if (v.expert_type === 'External') {
              this.narasumber_list.push({
                users_id: v.users_id,
                name: v.expert_name,
                roles: v.expert_type
              });
            } else if (v.expert_type === 'Internal') {
              this.narasumber_list.push({
                users_id: v.users_id,
                name: v.user.name,
                roles: v.expert_type
              });
            } else {
              this.narasumber_list_pic.push({
                users_id: v.users_id,
                name: v.user.name,
                roles: v.expert_type
              });
            }
          });
          this.finish_files = [];
          response.data.files.forEach((v, i) => {
            if (v.filename_type === null) {
              this.finish_files.push({
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
          this.invitation_list = [];
          response.data.invitation.forEach((v, i) => {
            this.invitation_list.push({
              users_id: v.users_id,
              organization_id: v.user.organization_id,
              unit_kerja_id: v.direktorat_id,
              pangkat_id: v.pangkat_id,
              jabatan_id: v.jabatan_id,
              golongan_id: v.golongan_id,
              name: v.employee_type === 'employee' ? v.user.name : v.non.employee.name,
              roles: 'Person',
              employee_type: v.employee_type
            });
          });
          this.invitation_reg_list = [];
          this.topic_list = [];
          response.data.expertise_topic.forEach((v, i) => {
            let date_start = null;
            let time_start = null;
            let time_end = null;
            if (v.date_start != null) {
              date_start = moment(v.date_start).format('YYYY/MM/DD');
              time_start = v.time_start != null ? this.parseTime(v.time_start) : '00:00';
              time_end = v.time_end != null ? this.parseTime(v.time_end) : '00:00';
            }
            this.topic_list.push({
              users_id: v.users_id,
              topic_narasumber: v.topic,
              roles: v.expert_type,
              name: v.expert_name,
              date_start,
              time_start,
              time_end
            });
          });
          if (response.data.recuring === 'Does not repeat') {
            this.start_date = `${new Date(response.data.schedule[0].date_start).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_start).getDate()).padStart(2, '0')}`;
            this.end_date = `${new Date(response.data.schedule[0].date_end).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_end).getDate()).padStart(2, '0')}`;
            this.start_time = response.data.schedule[0].time_start;
            this.end_time = response.data.schedule[0].time_end;
          } else if (response.data.recuring === 'Daily') {
            this.start_date = `${new Date(response.data.schedule[0].date_start).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_start).getDate()).padStart(2, '0')}`;
            this.end_date = `${new Date(response.data.schedule[0].date_end).getFullYear()}/${String(new Date(response.data.schedule[0].date_end).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_end).getDate()).padStart(2, '0')}`;
            this.start_time = response.data.schedule[0].time_start;
            this.end_time = response.data.schedule[0].time_end;
            this.ends_after_how_many_occurence = response.data.repeated;
          } else if (response.data.recuring === 'Custom') {
            this.schedule_custom_array = Array.from(
              Array(response.data.schedule.length).keys()
            );
            response.data.schedule.forEach((item, index) => {
              this.start_date_custom.push(item.date_start);
              this.start_time_custom.push(item.time_start);
              this.end_time_custom.push(item.time_end);
            });
          }
          this.total_participant = response.data.participant_list.length;
          this.registered = response.data.registered;
          this.pending = response.data.pending;
          this.pending_admin = response.data.pending_admin;
          this.pending_personal = response.data.pending_personal;
          this.declined = response.data.declined;
          this.check_participant = response.data.check_participant;

          const removeDuplicateName = response.data.files.reduce((arr, item) => {
            if (!arr.some(obj => obj.filename_type === item.filename_type)) arr.push(item);
            return arr;
          }, []);
          const groupByName = response.data.files.reduce((arr, item) => {
            if (item.filename_type !== null) arr[item.filename_type] = [...arr[item.filename_type] || [], { file: item }];
            return arr;
          }, []);

          this.list_attachments = removeDuplicateName.map(item => {
            if (item.filename_type !== null) {
              return {
                name: item.filename_type,
                finish_files: groupByName[item.filename_type],
                status: item.is_public
              };
            }
            return undefined;
          }).filter(item => item !== undefined);
        });
        this.isLoadingButtonAction = false;
      }
    },
    getExpertiseTopic() {
      this.list_expertise_topic = [];
      expertiseTopicList(this.training_id)
        .then(response => {
          response.data.forEach((v, i) => {
            this.list_expertise_topic.push({
              users_id: v.users_id,
              topic_narasumber: v.topic,
              roles: v.expert_type,
              name: v.expert_name,
              date_start: v.date_start,
              time_start: v.time_start,
              time_end: v.time_end
            });
          });
        });
    },
    getAllParticipant(page = 1, batas = 12) {
      this.list_participant_all = [];
      const offset = page;
      const limit = batas;
      trainingParticipantGetAll(this.training_id, {
        offset, limit
      }).then(response_all => {
        const { data } = response_all;
        this.list_participant_all = data.data;
        const { total_result } = response_all.meta;
        const { total_page } = response_all.meta;
        this.participant_data.total_data = total_result;
        this.participant_data.total_page = total_page;
      });
    },
    getRegisteredParticipant(off = 1, lim = 12) {
      this.list_participant_reg = [];
      const offset = off;
      const limit = lim;
      trainingParticipantGetReg(this.training_id, {
        offset, limit
      }).then(response_all => {
        const { data } = response_all;

        this.list_participant_reg = data.data;
        const { total_result } = response_all.meta;
        const { total_page } = response_all.meta;
        this.participant_data.total_data = total_result;
        this.participant_data.total_page = total_page;
      });
    },
    getAllParticipantDetail() {
      trainingParticipantGetAllDetail(this.$route.params.id, {
      }).then(response_all => {
        const { data } = response_all;
        const get_id_atasan = data.map(item => item.atasan_id);
        const id_atasan = get_id_atasan.map(Number);
        this.atasan = false;
        if (id_atasan.some(it => it === this.user.id) === true) {
          this.atasan = true;
        } else {
          this.atasan = false;
        }
      });
    },
    getTraining(offset = 1, limit = 10) {
      trainingList({
        offset,
        limit,
        ...({
          tab_filter: 'training',
          date_start: moment().startOf('year').format('YYYY-MM-DD'),
          date_end: moment().endOf('year').format('YYYY-MM-DD'),
          search_term: '',
          organization_id: 0,
          status_filter: ['All type'],
          training_type_filter: ['All type']
        })
      })
        .then(response => {
          const hasil = response.data.data;
          if (hasil) {
            if (Array.isArray(hasil[0].filter_options_topik_pelatihan) && hasil[0].filter_options_topik_pelatihan.length > 0) {
              this.filter_options_topik_pelatihan = hasil[0].filter_options_topik_pelatihan;
              this.string_options_topik_pelatihan = hasil[0].filter_options_topik_pelatihan;
            }
          }
        });
    },
    filterAtasan(val, update, abort) {
      // if (val.length < 2) {
      //   abort();
      //   return;
      // }
      update(() => {
        getAtasanUser({ keyword: val.toLowerCase() }).then(response => {
          const hasil = response.data;
          this.atasan_option = hasil.map(item => {
            return {
              id: item.id,
              name: item.name
            };
          });
        });
      });
    },
    registerTraining() {
      if (this.atasan_id.length === 0) {
        Notify.create({
          message: 'Mohon pilih atasan!',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      if (this.atasan_id.id === this.user.id) {
        Notify.create({
          message: 'Maaf, anda tidak bisa mengirim permintaan izin',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      this.loading = true;
      const data = {
        atasan_id: this.atasan_id.id,
        enabled: true,
        link_detail: `${window.location.origin}/training/detail/${this.training_id}`
      };
      trainingRegister(this.training_id, data).then(response => {
        this.loading = false;
        this.$q.notify({
          message: 'Successfull register training.',
          color: 'blue'
        });
        this.onGetFirstData('load');
      });
      this.modal_permission_training = false;
    },
    approvalTraining(selected, id, index, users_id) {
      this.id_pending = id;
      this.index = index;
      if (selected === 'approve') {
        this.modal_approve = true;
        this.participant_training_history = [];
        trainingParticipantGetHistoryTraining(users_id, {
          training_id: this.training_id
        }).then(res => {
          if (res && res.message === 'OK') {
            res.data.forEach((v, i) => {
              this.participant_training_history.push({
                training_name: v.training.name,
                training_description: v.training.description
              });
            });
          }
        });
      } else {
        this.modal_decline = true;
      }
    },
    declinedTraining() {
      const data = {
        participant_type: 'declined',
        alasan_ditolak: this.alasan_ditolak,
        keterangan_atasan: null
      };
      this.loading = true;
      trainingApproval(this.id_pending, data).then(result => {
        const data_approval = result.data;
        if (data_approval) {
          this.loading = false;
          this.$q.notify({
            message: 'Success Declined.',
            color: 'blue'
          });
          this.onGetFirstData('load');
        }
      });
      this.modal_decline = false;
      this.alasan_ditolak = null;
      this.id_pending = null;
      this.keterangan_atasan = [];
    },
    approveTraining() {
      const data = {
        participant_type: 'registered',
        link_detail: `${window.location.origin}/training/detail/${this.training_id}`,
        keterangan_atasan: this.keterangan_atasan,
        alasan_ditolak: null
      };
      this.loading = true;
      trainingApproval(this.id_pending, data).then(result => {
        const data_approval = result.data;
        if (data_approval) {
          this.loading = false;
          this.$q.notify({
            message: 'Success Approved.',
            color: 'blue'
          });
          this.onGetFirstData('load');
        }
      });
      this.modal_approve = false;
      this.alasan_ditolak = null;
      this.id_pending = null;
      this.keterangan_atasan = [];
    },
    parseDate(date, format = 'DD MMMM YYYY') {
      return moment(date).format(format);
    },
    parseDateTime(date, format = 'DD-MM-yyyy, HH:mm:ss') {
      return moment(new Date(date)).format(format);
    },
    parseTime(time) {
      const sTime = time.split(':');
      return `${sTime[0]}:${sTime[1]}`;
    },
    openModalTrainingCancel(type, id_user, employee_type, id_employee) {
      this.training_participant_id_cancel = null;
      if (type === true) {
        this.training_participant_id_cancel = this.user.id;
        this.employee_type = 'employee';
      } else {
        if (id_user) {
          this.training_participant_id_cancel = id_user;
        }
        if (id_employee) {
          this.training_participant_id_cancel = id_employee;
        }
        this.employee_type = employee_type;
      }
      this.confirm_dialog_cancel = true;
    },
    participantDecline() {
      const data = {
        participant_type: 'declined',
        alasan_ditolak: this.alasan_ditolak,
        training_id: this.training_id
      };
      this.loading = true;
      participantApproval(data).then(result => {
        const data_approval = result.data;
        if (data_approval) {
          this.loading = false;
          this.$q.notify({
            message: 'Success Declined.',
            color: 'blue'
          });
          this.onGetFirstData('load');
        }
      });
      this.modal_decline_participant = false;
      this.alasan_ditolak = null;
    },
    participantApprove() {
      const data = {
        training_id: this.training_id,
        participant_type: 'registered',
        alasan_ditolak: null
      };
      this.loading = true;
      participantApproval(data).then(result => {
        const data_approval = result.data;
        if (data_approval) {
          this.loading = false;
          this.$q.notify({
            message: 'Success Approved.',
            color: 'blue'
          });
          this.onGetFirstData('load');
        }
      });
      this.alasan_ditolak = null;
    },
    openModalTrainingReinvite(id_user, employee_type, id_employee, cancel_reason) {
      if (cancel_reason) {
        this.participant_cancel_reason = cancel_reason;
      } else {
        this.participant_cancel_reason = '-';
      }
      if (employee_type === 'employee') {
        this.training_participant_id_cancel = id_user;
      } else {
        this.training_participant_id_cancel = id_employee;
      }
      this.employee_type = employee_type;
      this.confirm_dialog_reinvite = true;
    },
    handleConfirmCancelTraining(reinvite) {
      const data = {
        users_id: this.training_participant_id_cancel,
        cancel_reason: this.training_cancel_reason,
        reinvite: reinvite ? 1 : 0,
        employee_type: this.employee_type
      };
      this.loading = true;
      trainingCancel(this.training_id, data).then(res => {
        if (reinvite) {
          this.loading = false;
          this.$q.notify({
            message: 'Participant has been reinvite to training.',
            color: 'blue'
          });
        } else {
          this.loading = false;
          this.$q.notify({
            message: 'Training has been Cancel.',
            color: 'blue'
          });
        }
        this.onGetFirstData('load');
      });
    },
    seeFiles() {
      this.see_all = true;
    },
    seeLessFiles() {
      this.see_all = false;
    },
    // seeParticipant() {
    //   this.see_all_participant = true;
    // },
    // seeLessParticipant() {
    //   this.see_all_participant = false;
    // },
    handleFeedback() {
      const token = aesEncrypt(JSON.stringify({ trainingId: this.training_id }));
      this.$router.push({ path: '/training/feedback', query: { token } });
    },
    doOpenPM(id, name) {
      this.$q
        .dialog({
          title: 'Private Message',
          message: `Do you want to start conversation with ${name}?`,
          persistent: true,
          cancel: {
            label: 'Cancel',
            flat: true
          },
          ok: {
            label: 'Yes',
            flat: true
          }
        })
        .onOk(() => {
          // this.online_users.list_dialog = false;
          setTimeout(() => {
            const member = this.message.member_list.find(x => x.id === id);
            if (member) {
              console.log('yes');
              this.handleOpenMessage(member.message_id);
            } else {
              this.messageMenu(id);
            }
          }, 500);
        });
    },
    doOpenEmail(pic_email) {
      window.open(`mailto:${pic_email}`);
    },
    messageMenu(id) {
      const new_message = {
        enabled: true,
        message_participant: [
          {
            created_by: this.user.id,
            users_id: id
          },
          {
            created_by: id,
            users_id: this.user.id
          }
        ]
      };
      this.postCreateNewMessage(new_message)
        .then(res => {
          this.handleOpenMessage(res.message.id);
        });
    },
    messageMemberFetch(users) {
      this.message.memberFetch()
        .then(res => {
          console.log(res.data);
          const memberList = [];
          res.data.forEach((x, i) => {
            memberList.push({
              id: x.user.id,
              name: x.user.name,
              profile_picture: x.user.profile_picture,
              is_online: !(users.find(y => y.id === x.user.id) === undefined),
              message_id: x.message_id,
              message_count: x.messages_conversation_count
            });
          });
          this.$store.dispatch('privateMessage/updateMemberList', memberList);
        });
    },
    updateMemberList(action, message_id) {
      const currentMemberList = this.$store.getters['privateMessage/memberList'];
      const allMemberList = this.$store.getters['privateMessage/allMemberList'];
      this.all_member_list = allMemberList;

      if (currentMemberList.find(x => x.message_id === message_id) === undefined) {
        this.messageMemberFetch(allMemberList.map(x => {
          return { id: x };
        }));
      } else {
        const memberList = currentMemberList.map(x => {
          if (action === 'clear' && x.message_id === parseInt(message_id, 10)) {
            return { ...x, message_count: 0 };
          }
          if (action === 'add' && x.message_id === parseInt(message_id, 10)) {
            return { ...x, message_count: x.message_count + 1 };
          }
          return { ...x };
        });
        let sortedMemberList = memberList;
        if (action === 'add') {
          sortedMemberList = memberList.filter(x => x.message_id !== message_id);
          sortedMemberList.unshift(memberList.find(x => x.message_id === message_id));
        }

        updateUpdatedDate(message_id);
        setTimeout(() => {
          this.$store.dispatch('privateMessage/updateMemberList', sortedMemberList);
        }, 2000);
      }

      if (action === 'clear') {
        messageConversationRead(message_id).then();
      }
    },
    handleOpenMessage(id) {
      if (this.$route.path !== `/message/${id}`) {
        this.$router.push({
          name: 'message',
          params: {
            id
          }
        });
        this.updateMemberList('clear', id);
      }
    },
    scroll(id) {
      // const element = document.getElementById(id); // Your target element
      // const headerOffset = 60;
      // const elementPosition = element.getBoundingClientRect().top;
      // const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // window.scrollTo({
      //   top: offsetPosition,
      //   behavior: 'smooth'
      // });
      let targetElement = this.$refs.scroll1;
      if (id === 1) {
        targetElement = this.$refs.scroll1;
      } else if (id === 2) {
        targetElement = this.$refs.scroll2;
      } else if (id === 3) {
        targetElement = this.$refs.scroll3;
      } else if (id === 4) {
        targetElement = this.$refs.scroll4;
      } else if (id === 5) {
        targetElement = this.$refs.scroll5;
      } else if (id === 6) {
        targetElement = this.$refs.scroll6;
      } else if (id === 7) {
        targetElement = this.$refs.scroll7;
      } else {
        targetElement = this.$refs.scroll8;
      }
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.focus();
      }
    },
    resetTrainingFields() {
      this.organization_id = null;
      this.direktorat_id = null;
      this.jabatan_id = null;
      this.pangkat_id = null;
      this.golongan_id = null;
      this.topik_pelatihan = [];
      this.invitation_person_id = null;
      this.provider = '';
      this.jam_pelatihan = '';
      this.topik_pelatihan = '';
      this.organization_options_filter = this.organization_options;
      this.direktorat_options_filter = this.direktorat_options;
      this.jabatan_options_filter = this.jabatan_options;
      this.pangkat_options_filter = this.pangkat_options;
      this.schedule_custom_array = [];
      this.start_date = null;
      this.end_date = null;
      this.start_time = null;
      this.end_time = null;
      this.start_date_custom = [];
      this.start_time_custom = [];
      this.end_time_custom = [];
      this.narasumber_list = [];
      this.narasumber_list_pic = [];
      this.invitation_list = [];
      this.invitation_reg_list = [];
      this.list_participant = [];
      this.finish_files = [];
      this.list_attachments = [];
      this.topic_list = [];
      this.persons_direktorat_option = [];
      this.file_participant = null;
      this.banner_training = null;
      this.banner = null;
      this.link_online = '';
      this.password = '';
      this.ket_notif_email = false;
      this.ket_notif_email_all = true;
      this.employee = false;
      this.employee_option = [];
      this.participant_data.page = 1;
    },
    handleUploadBanner() {
      this.$refs.fileBanner.click();
    },
    cropImageBanner() {
      const { canvas } = this.$refs.cropperBanner.getResult();
      if (canvas) {
        const formData = new FormData();
        canvas.toBlob(blob => {
          // blob.lastModified = this.imageBanner.lastModified;
          // blob.lastModifiedDate = this.imageBanner.lastModifiedDate;
          blob.name = this.imageBanner.name;
          blob.filename = this.imageBanner.name;
          formData.append('file[]', blob, blob.filename);
          fileUpload(formData).then(res => {
            const response = res.data[0];
            if (res.message === 'OK') {
              this.banner = response.path;
              this.banner_training = process.env.QUASAR_API_URL + response.path;
            }
          });
        }, 'image/png');
      }
      this.modal_upload_banner = false;
    },
    onMediaSelect(data) {
      if (data && data[0]) {
        if (data[0].item.filesize >= 1 * 1024 * 1024) {
          Notify.create({
            message: `[ ${data[0].item.filename} ] melebihi batas 1MB`,
            color: 'negative',
            icon: 'error'
          });
        } else {
          this.imageBanner = {
            name: data[0].item.filename,
            src: data[0].item.file_path
          };
          this.modal_upload_banner = true;
        }
      }
    },
    filterPersons(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }
      update(() => {
        SearchDataAutocomplete({
          includes: this.narasumber_roles === 'Internal' ? 'user' : 'expertise',
          keyword: val.toLowerCase()
        }).then(response => {
          const hasil = response.data;
          this.persons_option = hasil.map(item => {
            if (this.narasumber_roles === 'Internal') {
              if (item.user) {
                return {
                  id: item.user.id,
                  name: item.user.name.toUpperCase()
                };
              }
            }
            if (this.narasumber_roles === 'External') {
              if (item.expertise) {
                return {
                  id: item.expertise.id,
                  name: item.expertise.name.toUpperCase()
                };
              }
            }
            return undefined;
          }).filter(item => item !== undefined);
        });
      });
    },
    filterPersonsPic(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }
      update(() => {
        SearchDataAutocomplete({
          includes: 'user,expertise',
          keyword: val.toLowerCase()
        }).then(response => {
          const hasil = response.data;
          this.persons_pic_option = hasil.map(item => {
            if (item.user) {
              return {
                id: item.user.id,
                name: item.user.name.toUpperCase()
              };
            }
            if (item.expertise) {
              return {
                id: item.expertise.id,
                name: item.expertise.name.toUpperCase()
              };
            }
            return undefined;
          }).filter(item => item !== undefined);
        });
      });
    },
    filterPersonsDirektorat (val, update) {
      if (val === '') {
        update(() => {
          this.persons_direktorat_option_filter = this.persons_direktorat_option;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        const hasil = this.persons_direktorat_option.filter(v => v.name.toLowerCase().indexOf(needle) > -1);
        this.persons_direktorat_option_filter = hasil;
      });
    },
    filterDirektorat(val, update) {
      if (val === '') {
        update(() => {
          this.direktorat_options_filter = this.direktorat_options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        const hasil = this.direktorat_options.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
        this.direktorat_options_filter = hasil;
      });
    },
    filterJabatan(val, update) {
      if (val === '') {
        update(() => {
          this.jabatan_options_filter = this.jabatan_options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        const hasil = this.jabatan_options.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
        this.jabatan_options_filter = hasil;
      });
    },
    filterPangkat(val, update) {
      if (val === '') {
        update(() => {
          this.pangkat_options_filter = this.pangkat_options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        const hasil = this.pangkat_options.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
        this.pangkat_options_filter = hasil;
      });
    },
    resetFilter() {
      this.direktorat_id = null;
      this.jabatan_id = null;
      this.pangkat_id = null;
      this.golongan_id = null;
      this.invitation_person_id = null;
    },
    direktoratTreeSelect(node) {
      setTimeout(() => {
        this.addOrganizationIds('jabatan', node.id);
        this.addOrganizationIds('pangkat', node.id);
        this.addOrganizationIds('golongan', node.id);
      }, 0);
    },
    addInvitation() {
      if (this.invitation_person_id === null) {
        Notify.create({
          message: 'Klik menggunakan cursor terlebih dahulu, baru enter!',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      setTimeout(() => {
        this.invitation_person_id.map(item => {
          const isExistsParticipantPending = this.list_participant_pending.filter(i => (i.users_id === item.id)).length;
          const isExistsParticipantDeclined = this.list_participant_declined.filter(i => (i.users_id === item.id)).length;
          const isExists = this.invitation_list.filter(i => i.users_id === item.id).length;
          const isExistsParticipant = this.invitation_reg_list.filter(i => i.users_id === item.id).length;
          const isExistsParticipantCek = this.list_participant.filter(i => i.users_id === item.id).length;
          if (isExistsParticipantDeclined === 0 && isExistsParticipantPending === 0 && isExists === 0 && isExistsParticipant === 0 && isExistsParticipantCek === 0) this.invitation_list.push({ users_id: item.id, organization_id: item.organization_id, name: item.name, roles: 'Person', unit_kerja_id: item.unit_kerja_id, pangkat_id: item.pangkat_id, jabatan_id: item.jabatan_id, golongan_id: item.golongan_id, registration_type: 'personal', employee_type: 'employee', employee_id: null });
          return null;
        });
        this.invitation_person_id = null;
        this.direktorat_id = null;
        this.jabatan_id = null;
        this.pangkat_id = null;
        this.golongan_id = null;
        this.is_select_all_persons = false;
      },
      this.invitation_person_id.length);
    },
    addParticipant() {
      if (this.invitation_person_id === null) {
        Notify.create({
          message: 'Klik menggunakan cursor terlebih dahulu, baru enter!',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      setTimeout(() => {
        this.invitation_person_id.map(item => {
          let employee_id = '';
          let users_id = '';
          let employee_type = '';
          let unit_kerja_id = '';
          let pangkat_id = '';
          let jabatan_id = '';
          let golongan_id = '';
          if (this.employee === true) {
            employee_type = 'non_employee';
            employee_id = item.id;
            users_id = null;
            unit_kerja_id = item.organization_id;
            pangkat_id = null;
            jabatan_id = null;
            golongan_id = null;
          } else {
            employee_type = 'employee';
            employee_id = null;
            users_id = item.id;
            unit_kerja_id = item.unit_kerja_id;
            pangkat_id = item.pangkat_id;
            jabatan_id = item.jabatan_id;
            golongan_id = item.golongan_id;
          }
          // const isExists = this.invitation_list.filter(i => i.users_id === item.id).length;
          const isExistsParticipantPending = this.list_participant_pending.filter(i => (i.users_id === users_id && i.employee_type === 'employee')).length;
          const isExistsParticipantDeclined = this.list_participant_declined.filter(i => (i.users_id === users_id && i.employee_type === 'employee')).length;
          const isExistsParticipantEmployee = this.invitation_reg_list.filter(i => (i.users_id === users_id && i.employee_type === 'employee')).length;
          const isExistsParticipantNonEmployee = this.invitation_reg_list.filter(i => (i.employee_id === employee_id && i.employee_type === 'non_employee')).length;
          const isExistsParticipantRegEmployee = this.list_participant.filter(i => (i.users_id === users_id && i.employee_type === 'employee')).length;
          const isExistsParticipantRegNonEmployee = this.list_participant.filter(i => (i.employee_id === employee_id && i.employee_type === 'non_employee')).length;
          if (isExistsParticipantDeclined === 0 && isExistsParticipantPending === 0 && isExistsParticipantEmployee === 0 && isExistsParticipantNonEmployee === 0 && isExistsParticipantRegEmployee === 0 && isExistsParticipantRegNonEmployee === 0) this.invitation_reg_list.push({ users_id, employee_id, organization_id: item.organization_id, name: item.name, roles: 'Person', unit_kerja_id, pangkat_id, jabatan_id, golongan_id, registration_type: 'admin', employee_type });
          return null;
        });
        this.invitation_person_id = null;
        this.is_select_all_persons = false;
        this.direktorat_id = null;
        this.jabatan_id = null;
        this.pangkat_id = null;
        this.golongan_id = null;
      }, this.invitation_person_id.length);
    },
    deleteInvitation(index) {
      this.invitation_list.splice(index, 1);
    },
    deleteParticipant(index) {
      this.invitation_reg_list.splice(index, 1);
    },
    importParticipant(file_participant) {
      // eslint-disable-next-line
      const map = {
        NIP: 'nip',
        NAMA: 'nama'
      };
      if (file_participant !== null) {
        // eslint-disable-next-line
        readXlsxFile(file_participant, { map }).then(async ({ rows }) => {
          const nips = rows.map(val => {
            return val.nip;
          });
          const params = {
            nips
          };
          const userData = await this.getUserByNIP(params);
          userData.map(item => {
            const isExistsInvitation = this.invitation_reg_list.filter(i => i.users_id === item.id).length;
            const isExistsInvitationCek = this.list_participant.filter(i => i.users_id === item.id).length;
            if (isExistsInvitation === 0 && isExistsInvitationCek === 0) this.invitation_reg_list.push({ users_id: item.id, organization_id: item.organization_id, name: item.name, roles: 'Person', unit_kerja_id: item.unit_kerja_id, pangkat_id: item.pangkat_id, jabatan_id: item.jabatan_id, golongan_id: item.golongan_id, registration_type: 'admin', employee_type: 'employee', employee_id: null });
            return null;
          });
          this.file_participant = null;
        });
      }
    },
    async getUserByNIP(params) {
      return userGetByNIP(params).then(response => {
        const { data } = response;
        return data;
      });
    },
    addNarasumber() {
      const isExists = this.narasumber_list.filter(i => i.users_id === this.narasumber_person_id.id).length;
      if (isExists === 0) {
        this.narasumber_list.push({
          users_id: this.narasumber_person_id.id,
          name: this.narasumber_person_id.name,
          roles: this.narasumber_roles
        });
        this.topic_list.push({
          users_id: this.narasumber_person_id.id,
          topic_narasumber: '',
          name: this.narasumber_person_id.name,
          roles: this.narasumber_roles,
          date_start: null,
          time_start: '00:00:00',
          time_end: '00:00:00'
        });
      }
      this.narasumber_person_id = null;
      this.narasumber_roles = null;
      this.persons_option = [];
    },
    getPic(data) {
      const pic = process.env.QUASAR_API_URL + data;
      return pic;
    },
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children && node.children.length ? node.children : 0
      };
    },
    filesBuilder(files) {
      return files.map(({ file }) => ({
        id: file.id,
        fileName: file.filename,
        fileSize: file.filesize,
        path: file.path
      }));
    },
    getTrainingMethod() {
      return trainingMethodList().then(response => {
        const hasil = response.data;
        this.method_option = hasil.map(item => {
          return item.name;
        });
      });
    },
    getTrainingType() {
      return trainingTypeList().then(response => {
        const hasil = response.data;
        this.type_option = hasil.map(item => {
          return item.name;
        });
      });
    },
    getTrainingCategory() {
      return trainingCategoryList().then(response => {
        const hasil = response.data;
        this.category_option = hasil.map(item => {
          return item.name;
        });
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
                  message: 'Delete file berhasil.',
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
    addNewNarasumber() {
      this.$v.narasumber_create.name.$touch();
      this.$v.narasumber_create.instansi.$touch();
      this.$v.narasumber_create.email.$touch();
      this.$v.narasumber_create.phone.$touch();
      this.$v.narasumber_create.nip.$touch();
      this.$v.narasumber_create.jabatan.$touch();
      this.$v.narasumber_create.pangkat.$touch();
      this.$v.narasumber_create.telepon_kantor.$touch();
      this.$v.narasumber_create.no_npwp.$touch();
      this.$v.narasumber_create.rek_bank.$touch();
      this.$v.narasumber_create.topic.$touch();

      if (this.$v.narasumber_create.name.$invalid || this.$v.narasumber_create.instansi.$invalid || this.$v.narasumber_create.email.$invalid || this.$v.narasumber_create.phone.$invalid || this.$v.narasumber_create.nip.$invalid || this.$v.narasumber_create.jabatan.$invalid || this.$v.narasumber_create.pangkat.$invalid || this.$v.narasumber_create.telepon_kantor.$invalid || this.$v.narasumber_create.no_npwp.$invalid || this.$v.narasumber_create.rek_bank.$invalid || this.$v.narasumber_create.topic.$invalid) {
        Notify.create({
          message: 'Form unvalid!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
        this.isLoading = false;
      } else {
        if (this.finish_files_narasumber.length === 0) {
          Notify.create({
            message: 'Please upload riwayat hidup!',
            timeout: 3000,
            type: 'positive',
            color: 'warning',
            icon: 'check'
          });
          return;
        }
        const { name, instansi, n_email, phone, nip, jabatan, pangkat, telepon_kantor, no_npwp, rek_bank, topic } = this.narasumber_create;
        const group_file = this.finish_files_narasumber.map(item => {
          return {
            file_id: item.file.id
          };
        });
        expertiseCreate({
          name,
          instansi,
          n_email,
          phone,
          nip,
          jabatan,
          pangkat,
          telepon_kantor,
          no_npwp,
          rek_bank,
          file: group_file,
          enabled: true,
          topic
        }).then(response => {
          this.modal_add_narasumber = false;
          this.finish_files_narasumber = [];
          this.narasumber_create = {
            name: '',
            instansi: '',
            email: '',
            phone: '',
            nip: '',
            jabatan: '',
            pangkat: '',
            telepon_kantor: '',
            no_npwp: '',
            rek_bank: '',
            topic: '',
            enabled: 'active'
          };
          this.$v.$reset();
          this.$q.notify({
            message: 'Narasumber has been added.',
            color: 'blue'
          });
        });
      }
    },
    getExpertiseName(exp_name) {
      checkExpertise(exp_name).then(response => {
        if (response) {
          const { data } = response;
          this.name_on_db = data;
          if (this.name_on_db) {
            this.notif_name = data.name;
          }
        }
      });
    },
    addPIC() {
      this.narasumber_list_pic.push({
        users_id: this.narasumber_person_pic_id.id,
        name: this.narasumber_person_pic_id.name,
        roles: 'PIC'
      });
      this.narasumber_person_pic_id = null;
      this.persons_pic_option = [];
    },
    AddCustomDate() {
      this.schedule_custom_repeat++;
      this.schedule_custom_array = Array.from(
        Array(this.schedule_custom_repeat).keys()
      );
    },
    DeleteCustomDate(index) {
      this.schedule_custom_repeat--;
      this.schedule_custom_array.splice(index, 1);
      this.start_date_custom.splice(index, 1);
      this.start_time_custom.splice(index, 1);
      this.end_time_custom.splice(index, 1);
    },
    deleteNarasumber(index, users_id) {
      this.topic_list = this.topic_list.filter(el => el.users_id !== users_id);
      this.narasumber_list.splice(index, 1);
    },
    deletePIC(index) {
      this.narasumber_list_pic.splice(index, 1);
    },
    handleDelBanner() {
      this.banner = null;
      this.banner_training = null;
    },
    narasumberTopicOnClick(users_id, roles, name) {
      this.modal_topic = true;
      this.narsum_person_id = { id: users_id };
      this.narasumber_roles = roles;
      this.narasumber_name = name;
    },
    addTopic(users_id, roles, name) {
      this.topic_list.push({
        users_id,
        topic_narasumber: '',
        roles,
        name,
        date_start: null,
        time_start: '00:00:00',
        time_end: '00:00:00'
      });
    },
    deleteTopic(topic, narasumber) {
      const index = this.topic_list.findIndex(t => t.users_id === narasumber && t.topic_narasumber === topic);
      this.topic_list.splice(index, 1);
    },
    getDirektoratEmployee() {
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
    getDirektorat() {
      const params = {};
      params.group = 'unit-kerja';
      organizationListTraining(params)
        .then(response => {
          const hasil = response.data;
          this.direktorat_options = [{ id: 0, name: 'ALL KPK' }, ...hasil];
          this.direktorat_options_filter = [{ id: 0, name: 'ALL KPK' }, ...hasil];
          // this.option_direktorat_employee = hasil;
        });
    },
    getJabatan() {
      // organizationList({ groups: 'Jabatan', limit: 1000 }).then(response => {
      //   const hasil = response.data;
      //   this.jabatan_options = hasil;
      //   this.jabatan_options_filter = hasil;
      // });
      const params = {};
      params.group = 'jabatan';
      organizationListTraining(params)
        .then(response => {
          const hasil = response.data;
          this.jabatan_options = hasil;
          this.jabatan_options_filter = hasil;
        });
    },
    getPangkat() {
      const params = {};
      params.group = 'pangkat';
      organizationListTraining(params)
        .then(response => {
          const hasil = response.data;
          this.pangkat_options = hasil;
          this.pangkat_options_filter = hasil;
        });
    },
    getGolongan() {
      const params = {};
      params.group = 'golongan';
      organizationListTraining(params)
        .then(response => {
          const hasil = response.data;
          this.golongan_options = hasil;
          this.golongan_options_filter = hasil;
        });
    },
    addOrganizationIds(type, id) {
      this.persons_direktorat_option = [];
      this.is_select_all_persons = false;
      this.invitation_person_id = null;

      if (type === 'jabatan') {
        this.jabatan_id = null;
        this.pangkat_id = null;
        this.jabatan_options = [];
        this.pangkat_options = [];
      } else if (type === 'pangkat') {
        this.pangkat_id = null;
        this.pangkat_options = [];
        this.golongan_id = null;
        this.golongan_options = [];
      } else if (type === 'golongan') {
        this.golongan_id = null;
        this.golongan_options = [];
      }
      organizationUsers({
        direktorat_id: this.direktorat_id,
        employee: this.employee,
        tab: this.tab,
        ...(this.jabatan_id !== null && { jabatan_id: Object.keys(this.jabatan_id).length > 0 ? this.jabatan_id.id : this.jabatan_id }),
        ...(this.pangkat_id !== null && { pangkat_id: Object.keys(this.pangkat_id).length > 0 ? this.pangkat_id.id : this.pangkat_id }),
        ...(this.golongan_id !== null && { golongan_id: Object.keys(this.golongan_id).length > 0 ? this.golongan_id.id : this.golongan_id })
      })
        .then(response => {
          const hasil = response.data;
          this.persons_direktorat_option = hasil.map(item => ({
            id: item.id,
            name: item.name,
            roles: 'Person',
            organization_id: item.organization_id,
            unit_kerja_id: item.unit_kerja_id,
            jabatan_id: item.jabatan_id,
            pangkat_id: item.pangkat_id,
            golongan_id: item.golongan_id
          }));
          this.getOrganizationList(type, id);
        });
    },
    getOrganizationList(type, id) {
      const params = {};
      params.group = type;
      params.id = id;
      params.unit_kerja_id = this.direktorat_id;
      params.golongan_id = this.golongan_id;
      params.jabatan_id = this.jabatan_id;
      params.pangkat_id = this.pangkat_id;
      organizationListTraining(params)
        .then(res => {
          const response = res.data;
          if (type === 'jabatan') {
            this.jabatan_options = response.map(v => (
              { id: v.id, name: v.name }
            ));
          }
          if (type === 'pangkat') {
            this.pangkat_options = response.map(v => (
              { id: v.id, name: v.name }
            ));
          }
          if (type === 'golongan') {
            this.golongan_options = response.map(v => (
              { id: v.id, name: v.name }
            ));
          }
        });
    },
    handleSelectAllPersons() {
      if (this.is_select_all_persons) {
        this.invitation_person_id = null;
        this.is_select_all_persons = false;
      } else {
        this.invitation_person_id = this.persons_direktorat_option;
        this.is_select_all_persons = true;
      }
    },
    addNewAttachment() {
      const isExists = this.list_attachments.filter(item => item.name === this.attachment_name).length > 0;
      if (isExists) {
        this.$q.notify({
          message: 'Attachment name already exists!',
          color: 'red',
          position: 'center',
          actions: [
            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 60000
        });
      } else {
        this.list_attachments.push({ name: this.attachment_name, finish_files: [], status: this.is_public });
        this.attachment_name = null;
        this.is_public = false;
        this.modal_add_attachment = false;
      }
    },
    addNewEmployee() {
      this.$v.employee_create.e_name.$touch();
      this.$v.employee_create.e_phone.$touch();
      this.$v.employee_create.e_email.$touch();
      this.$v.employee_create.e_organization_id.$touch();

      if (this.$v.employee_create.e_name.$invalid || this.$v.employee_create.e_phone.$invalid || this.$v.employee_create.e_email.$invalid || this.$v.employee_create.e_organization_id.$invalid) {
        Notify.create({
          message: 'Form unvalid!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
        this.isLoading = false;
      } else {
        nonEmployeeCreate({
          name: this.employee_create.e_name,
          phone: this.employee_create.e_phone,
          email: this.employee_create.e_email,
          organization_id: this.employee_create.e_organization_id
        }).then(response => {
          this.modal_add_employee = false;
          this.employee_create = {
            e_name: '',
            e_phone: '',
            e_email: '',
            e_organization_id: null,
            enabled: true
          };
          this.$v.$reset();
          this.$q.notify({
            message: 'Employee has been added.',
            color: 'blue'
          });
        });
      }
    },
    handleUploadAttachmentComplete(fileInfos, index) {
      fileInfos.map(file => file !== null && this.list_attachments[index].finish_files.push({ file }));
    },
    openModalAttachment(index, status) {
      this.modal_add_attachment = true;
      if (status === 'edit') {
        this.is_edit = true;
        this.attachment_index = index;
        this.attachment_name = this.list_attachments[index].name;
        this.is_public = this.list_attachments[index].status;
      } else {
        this.is_edit = false;
        this.attachment_name = '';
        this.is_public = false;
      }
    },
    updateFile(index) {
      const size = this.list_attachments[index].finish_files.length;
      if (size !== 0) {
        const data = {
          name: this.attachment_name,
          status: this.is_public
        };
        const fileIds = this.list_attachments[index].finish_files.map(({ file }) => file.id);
        fileUpdate(fileIds.join(','), data).then(response => {
          if (response.message === 'OK') {
            this.list_attachments[index].name = this.attachment_name;
            this.list_attachments[index].status = this.is_public;
            Notify.create({
              message: 'Update file successfully.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          }
        });
      } else {
        this.list_attachments[index].name = this.attachment_name;
        this.list_attachments[index].status = this.is_public;
      }
      this.modal_add_attachment = false;
    },
    eachHandleDelete(index) {
      if (this.list_attachments[index].finish_files.length === 0) {
        this.list_attachments.splice(index, 1);
      } else {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure want to delete all file?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          const fileIds = this.list_attachments[index].finish_files.map(({ file }) => file.id);
          fileDelete(fileIds.join(',')).then(response => {
            if (response.message === 'OK') {
              this.list_attachments.splice(index, 1);

              Notify.create({
                message: 'Delete file successfully.',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
            }
          });
        });
      }
    },
    createValueTopikPelatihan (val, done) {
      if (val.length > 0) {
        const topik_pelatihan = (this.topik_pelatihan || []).slice();

        val
          .split(/[,;|]+/)
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .forEach(v => {
            if (this.string_options_topik_pelatihan.includes(v) === false) {
              this.string_options_topik_pelatihan.push(v);
            }
            if (topik_pelatihan.includes(v) === false) {
              topik_pelatihan.push(v);
            }
          });

        done(null);
        this.topik_pelatihan = topik_pelatihan;
      }
    },
    filterFnTopikPelatihan (val, update) {
      update(() => {
        if (val === '') {
          this.filter_options_topik_pelatihan = this.string_options_topik_pelatihan;
        } else {
          const needle = val.toLowerCase();
          this.filter_options_topik_pelatihan = this.string_options_topik_pelatihan.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    openfile() {
      trainingDetail(this.training_id).then(res => {
        res.data.files.forEach((v, i) => {
          Axios.get(`${this.url}${v.path}`, { responseType: 'blob' })
            .then(response => {
              const blob = new Blob([response.data], { type: response.data.type });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = v.filename;
              link.click();
              URL.revokeObjectURL(link.href);
            }).catch(console.error);
        });
      });
    },
    saveTraining(selected, training = null) {
      if (this.recuring === 'Daily') {
        if (this.start_date > this.end_date) {
          Notify.create({
            message: 'End Date is greater than Start Date!',
            timeout: 3000,
            type: 'positive',
            color: 'warning',
            icon: 'check'
          });
          return;
        }
      }
      let status = '';
      if (selected === 'open_reg') {
        status = 'open_registration';
      } else if (selected === 'close_reg') {
        status = 'close_registration';
      } else if (selected === 'draft') {
        status = 'draft';
      } else if (selected === 'end') {
        status = 'closed';
        if (this.topic_list.length === 0) {
          Notify.create({
            message: 'mohon isi materi narasumber sebelum end training!',
            timeout: 3000,
            type: 'positive',
            color: 'warning',
            icon: 'check'
          });
          return;
        }
        this.getPoinExpertise(this.training_id);
      } else if (selected === 'save') {
        status = this.status;
      }
      if (this.training_name === '' || this.training_name === null || this.training_name === 0) {
        Notify.create({
          message: 'Please add training name!',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      if (this.training_type === '' || this.training_type === null || this.training_type === 0) {
        Notify.create({
          message: 'Please add training type!',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      if (
        this.maximun_capacity === null ||
        this.maximun_capacity === 0 ||
        this.maximun_capacity < parseInt(this.total_participant, 10)
      ) {
        Notify.create({
          message: 'Please add maximum capacity!',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      if (this.narasumber_list_pic.length < 1) {
        Notify.create({
          message: 'Please add PIC!',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      this.modal_edit_training = false;
      this.loading = true;
      const token_fb = aesEncrypt(JSON.stringify({ trainingId: this.training_id }));
      const mapFile = this.list_attachments.map(item => item.finish_files).concat(this.finish_files);
      const concatFile = [].concat(...mapFile);
      const groupFile = concatFile.map(item => ({ file_id: item.file.id }));

      // let jabatanId = null;
      // let pangkatId = null;
      // if (this.jabatan_id !== null) {
      //   if (Object.keys(this.jabatan_id).length > 0) jabatanId = this.jabatan_id.id;
      //   else jabatanId = this.jabatan_id;
      // }
      // if (this.pangkat_id !== null) {
      //   if (Object.keys(this.pangkat_id).length > 0) pangkatId = this.pangkat_id.id;
      //   else pangkatId = this.pangkat_id;
      // }
      const data = {
        enabled: true,
        status,
        send: this.send,
        ket_notif_email_all: this.ket_notif_email_all,
        ket_notif_email: this.ket_notif_email,
        name: this.training_name,
        elearning_id: this.elearning_id,
        description: this.training_description,
        training_type: this.training_type,
        training_method: this.training_method,
        training_category: this.training_category,
        locations: this.locations,
        certificate_link: this.certificate_link,
        // direktorat_id: this.direktorat_id,
        // jabatan_id: jabatanId,
        // pangkat_id: pangkatId,
        provider: this.provider,
        jam_pelatihan: this.jam_pelatihan,
        topik_pelatihan: JSON.stringify(this.topik_pelatihan),
        all_day: this.all_day,
        is_private: this.is_private,
        maximun_capacity: this.maximun_capacity,
        recuring: this.recuring,
        repeated: null,
        expertise: [...this.narasumber_list, ...this.narasumber_list_pic],
        expertise_topic: [...this.topic_list],
        invitation: this.invitation_list,
        participant: this.invitation_reg_list,
        file: groupFile,
        trainingfile: this.list_attachments,
        start_date: this.start_date,
        start_time: this.start_time,
        end_date: this.end_date,
        end_time: this.end_time,
        ends_after_how_many_occurence:
        moment(this.end_date, 'YYYY.MM.DD HH:mm').diff(moment(this.start_date, 'YYYY.MM.DD HH:mm'), 'days'),
        start_date_custom: this.start_date_custom,
        start_time_custom: this.start_time_custom,
        end_time_custom: this.end_time_custom,
        link_fb: `${window.location.origin}/training/feedback?token=${token_fb}`,
        link_detail: `${window.location.origin}/training/detail/${this.training_id}`,
        banner: this.banner,
        link: this.link_online,
        password: this.password
      };
      trainingUpdate(this.training_id, data).then(response => {
        this.loading = false;
        this.$q.notify({
          message: 'Training has been Updated.',
          color: 'blue'
        });
        this.onGetFirstData('load');
      });
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      if (checkRole().name === 'km_manager') {
        this.is_km_manager = true;
      }
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
      this.id_user = this.user.id;
    },
    generateElearningUrl() {
      this.elearningUrlTo = `${this.elearningBaseUrl}/course/view.php?id=${this.elearning_id}`;
    },
    generateCertificateElearningUrl() {
      this.certificateElearningUrlTo = `${this.elearningBaseUrl}/mod/customcert/my_certificates.php`;
    },
    setRecurringCustom() {
      this.schedule_option = [];
      let label = null;
      if (this.start_date_custom && this.recuring === 'Custom') {
        this.start_date_custom.forEach((v, i) => {
          const date = moment(v).format('YYYY/MM/DD');
          label = date;
          const value = date;
          const isExists = this.schedule_option.filter(n => n.value === value).length;
          if (isExists === 0) {
            this.schedule_option.push({ value, label });
          }
        });
      }
    },
    setRecurring() {
      this.schedule_option = [];
      let label = null;
      if (this.start_date) {
        const date_start = moment(this.start_date).format('YYYY/MM/DD');
        label = date_start;
        const value = date_start;
        this.schedule_option.push({
          value,
          label
        });
      }

      if (this.end_date && this.start_date && this.recuring === 'Daily') {
        let label_daily = null;
        const ends_after_how_many_occurence = moment(this.end_date, 'YYYY.MM.DD HH:mm').diff(moment(this.start_date, 'YYYY.MM.DD HH:mm'), 'days');
        for (let i = 1; i <= ends_after_how_many_occurence; i++) {
          const date = moment(this.start_date).add(i, 'days');
          const date_daily = moment(date).format('YYYY/MM/DD');
          label_daily = date_daily;
          const value_daily = date_daily;
          this.schedule_option.push({
            value: value_daily,
            label: label_daily
          });
        }
      }
    },
    getPoinExpertise(training) {
      return trainingExpertiseList(training).then(response => {
        const hasil = response.data;
        if (hasil.length !== 0) {
          hasil.forEach((v, i) => {
            point('add', { tag: 'training_expertise', training_id: training, account_id: v.users_id });
          });
          // this.$q.notify({
          //   message: 'Poin training berhasil ditambahkan',
          //   color: 'blue'
          // });
        }
      });
    },
    async approveAll() {
      const data = this.participant_pending;
      this.loading = true;
      await trainingOnApproveAll(data).then(result => {
        const data_approval = result;
        if (data_approval.length > 0) {
          this.loading = false;
          this.$q.notify({
            message: 'Success Approved.',
            color: 'blue'
          });
        }
      });
      this.onGetFirstData('load');
    }
  },
  mounted() {
    this.loadOptions();
    this.getUser();
    this.getAllParticipantDetail();
    if (!this.$store.getters['user/isAuthenticated']) {
      this.$router.push({ name: 'login', query: { detail: this.$route.params.id } }).catch(() => {
      });
    } else {
      this.onGetFirstData('load');
    }
  },
  watch: {
    '$store.state.privateMessage.member_list': {
      immediate: true,
      deep: true,
      handler(value) {
        setTimeout(() => {
          this.message.member_list = this.$store.getters['privateMessage/memberList'];
          this.message.member_list_id = this.message.member_list.map(x => {
            return x.id;
          });
        }, 500);
        // this.playSound('online');
      }
    },
    'participant_data.page': {
      handler(page) {
        if (this.see_participant === true) {
          this.getAllParticipant(page, 12);
        }
        if (this.see_participant_member === true) {
          this.getRegisteredParticipant(page, 12);
        }
      },
      deep: true
    },
    start_date() {
      this.setRecurring();
    },
    end_date() {
      this.setRecurring();
    },
    start_time() {
      this.setRecurring();
    },
    end_time() {
      this.setRecurring();
    },
    start_date_custom() {
      this.setRecurringCustom();
    },
    start_time_custom() {
      this.setRecurringCustom();
    },
    end_time_custom() {
      this.setRecurringCustom();
    }
  },
  computed: {
    QuotaTerpenuhi() {
      return this.total_participant_detail === this.maximun_capacity_detail;
    },
    attachmentList() {
      return this.see_all === true ? this.finish_files_detail_for_training_detail : this.finish_files_detail_for_training_detail.slice(0, 3);
    }
  }
};
</script>
<style>
.card-shadow {
  box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
  -webkit-box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
  -moz-box-shadow: 0px 1px 10px -5px rgba(0,0,0,0.6);
}
button.text-grey-6{
border: 1px solid #C1C7D3 !important;
margin-left: 0px !important;
border-radius: unset !important;
}
button.text-purple-6{
border: 1px solid #C1C7D3 !important;
color: #5E2EBA;
margin-left: 0px !important;
background: #e3f2fd !important;
border-radius: unset !important;
}
</style>
