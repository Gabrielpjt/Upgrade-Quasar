<template>
  <div class="q-py-md q-pa-none items-start">
    <!-- <div class="row q-mb-md">
      <div class="col-8 kmp-font-lg kmp-font-bold">Training</div>
      <div class="col-4"></div>
    </div>
      <q-card class="my-card">
        <q-card-section class="row items-center">
          <div class="row full-width q-px-none">
            <div class="col-4 q-pl-sm">
              <div class="kmp-font-sm">Kamis</div>
              <div class="kmp-font-hg kmp-font-lh-1">30</div>
              <div class="kmp-font-sm">Desember 2021</div>
            </div>
            <div class="col-8">
              <div class="kmp-bg-color-1 q-pa-md kmp-rounded">
                <div class="kmp-font-sm kmp-text-grey-1">30 Desember 2021</div>
                <div
                  class="kmp-bg-color-3 q-py-xs q-px-sm kmp-rounded text-white"
                >
                  <div class="row">
                    <div class="col-2">10:00</div>
                    <div class="col-10">Launching Smart KPK</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    <q-card
      class="my-card q-mt-md q-mb-lg"
      v-for="(item, index) in events"
      :key="index"
    >
      <q-card-section class="row items-center">
        <div class="row full-width q-px-none">
          <div class="col-4">
            <div v-if="item.schedule.length > 1">
              <div class="row text-center justify-center q-col-gutter-sm">
                <div>
                  <div class="kmp-font-sm">
                    {{ parseDate(item.schedule[0].date_start, 'dddd') }}
                  </div>
                  <div class="kmp-font-hg kmp-font-lh-1">
                    {{ parseDate(item.schedule[0].date_start, 'DD') }}
                  </div>
                  <div class="kmp-font-sm">
                    {{ parseDate(item.schedule[0].date_start, 'MMMM YYYY') }}
                  </div>
                </div>
                <div>
                  <div class="kmp-font-hg kmp-font-lh-1 q-mt-md">
                    -
                  </div>
                </div>
                <div>
                  <div class="kmp-font-sm">
                    {{
                      parseDate(
                        item.schedule[item.schedule.length - 1].date_start,
                        'dddd'
                      )
                    }}
                  </div>
                  <div class="kmp-font-hg kmp-font-lh-1">
                    {{
                      parseDate(
                        item.schedule[item.schedule.length - 1].date_start,
                        'DD'
                      )
                    }}
                  </div>
                  <div class="kmp-font-sm">
                    {{
                      parseDate(
                        item.schedule[item.schedule.length - 1].date_start,
                        'MMMM YYYY'
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="col-3 text-center">
                <div class="kmp-font-sm">
                  {{ parseDate(item.schedule[0].date_start, 'dddd') }}
                </div>
                <div class="kmp-font-hg kmp-font-lh-1">
                  {{ parseDate(item.schedule[0].date_start, 'DD') }}
                </div>
                <div class="kmp-font-sm">
                  {{ parseDate(item.schedule[0].date_start, 'MMMM YYYY') }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div v-if="item.registration_type=='admin'">
              <q-badge color="blue">
                Registered by admin
              </q-badge>
            </div>
            <div v-else>
              <div v-if="is_km_manager!=true">
                <q-badge color="blue">
                  Invitation
                </q-badge>
                &nbsp;
                <q-badge color="orange" v-if="item.participant_type=='pending'">
                  Waiting for Approval
                </q-badge>
                <q-badge color="green" v-if="item.participant_type=='registered'">
                  Registered
                </q-badge>
                <q-badge color="red" v-if="item.participant_type=='declined'">
                  Declined
                </q-badge>
                <q-badge color="red" v-if="item.participant_type=='cancel'">
                  Cancel
                </q-badge>
                &nbsp;
                <q-badge color="pink" v-if="item.ongoing==true">
                  On Going
                </q-badge>
              </div>
              <div v-else>
                <q-badge color="blue" v-if="item.status=='open_registration'">
                  Open Registration
                </q-badge>
                <q-badge color="grey" v-if="item.status=='close_registration'">
                  Close Registration
                </q-badge>
                &nbsp;
                <q-badge color="green" v-if="item.ongoing==true">
                  On Going
                </q-badge>
              </div>
            </div>
            <a @click="openModalDetail(item)">
              <div class="kmp-bg-color-1 q-pa-md kmp-rounded cursor-pointer">
                <div
                  class="kmp-bg-color-3 q-py-xs q-px-sm kmp-rounded text-white"
                >
                  {{ item.name }}
                </div>
              </div>
            </a>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="my-card q-mt-md" v-if="events.length === 0"
      >
      <q-card-section class="row items-center">
        <div class="row full-width q-px-none">
          <div class="col-4">
            <div>
              <div class="col-3 text-center">
                <div class="kmp-font-sm">
                  {{ parseDate(today, 'dddd') }}
                </div>
                <div class="kmp-font-hg kmp-font-lh-1">
                  {{ parseDate(today, 'DD') }}
                </div>
                <div class="kmp-font-sm">
                  {{ parseDate(today, 'MMMM YYYY') }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="kmp-bg-color-1 q-pa-xl kmp-rounded cursor-pointer text-center text-grey-5">
              No Upcoming Training
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card> -->
    <div class="title_training_event row q-mb-md">
      <div class="kmp-font-lg kmp-font-bold">Training</div>
      <q-space />
      <q-btn @click="$router.push({ path: '/training?tab_training=cot' })" class="text-bold" icon-right="navigate_next" flat style="color: #2C8ED3;" :style="{ fontSize: '14px', margin: '0px'}" label="Lihat Semua" no-caps />
    </div>
    <!-- <div class="q-pa-md">
      <q-img
        :src="url_image_dummy+Math.random()"
        spinner-color="white"
        style="height: 170px; max-width: 300px"
        img-class="my-custom-image"
      >
        <div class="absolute-bottom text-subtitle1 text-center">
          Caption
        </div>
      </q-img>
    </div> -->
    <q-scroll-area v-if="events.length !== 0" class="" style="padding-top:24px; height: 385px; background-color:white;">
      <div class="row no-wrap details">
        <div v-for="(item, index) in events.slice(0, 3)" :key="index" style="width: 284px; height: 325px; margin-right:12.5px; padding-left:16px;" class="q-pa-sm col-1">
        <q-card style="
          box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
          border-radius: 4px;
          vertical-align: top;
          background: #fff;
          position: relative;
          width: 284px;
          height: 325px;"
          class="cursor-pointer"
          @click="handleDetail(item.id)">
          <div class="" style="">
            <q-img
              v-if="item.banner!=null && (Date.parse(item.schedule[item.schedule.length - 1].date_start) + 1) < (Date.now() - ( 3600 * 1000 * 24))"
              :src="url+item.banner"
              spinner-color="white"
              style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important; filter: grayscale(100%);"
            />
            <q-img
              v-else-if="item.banner!=null"
              :src="url+item.banner"
              spinner-color="white"
              style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important;"
            />
            <q-img
              v-else-if="(Date.parse(item.schedule[item.schedule.length - 1].date_start) + 1) < (Date.now() - ( 3600 * 1000 * 24))"
              src="../assets/images/picture-default-training.png"
              spinner-color="white"
              style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important; filter: grayscale(100%);"
            />
            <q-img
              v-else
              src="../assets/images/picture-default-training.png"
              spinner-color="white"
              style="height: 125px; max-width: 350px; border-radius: 8px 8px 0px 0px !important;"
            />
          </div>
          <q-badge v-if="item.direktorat_status_name!=null" color="primary" style="border: 0.5px solid currentColor; background-color:#E6F4FF;" outline class="q-ma-sm text-bold" :style="{ fontSize: '8px' }"
            >{{ item.direktorat_status_name }} </q-badge>
          <q-badge v-if="item.direktorat_status_name==null" color="primary" style="border: 0.5px solid currentColor; background-color:#E6F4FF;" outline class="q-ma-sm text-bold" :style="{ fontSize: '8px' }"
            >Lintas Unit</q-badge>
          <br />
          <q-card-section @click="handleDetail(item.id)" class="flex flex-left cursor-pointer" style="margin-left:8px; margin-right:8px; padding:0;" >
            <strong v-if="item.name.length<60">{{ item.name.toUpperCase() }}</strong>
            <strong v-else>{{ item.name.substring(0,59).toUpperCase()+"..."  }}</strong>
          </q-card-section>
          <!-- <q-card-section class="flex flex-left" style="margin-left:8px; margin-right:8px; padding:0;" :style="{ fontSize: '10px', color:'#838FA7' }">
            <div>{{ item.provider }}</div>
          </q-card-section> -->
          <q-card-section class="flex flex-left" style="margin-left:8px; margin-right:8px; padding:0;" :style="{ fontSize: '10px', color:'#7D35B6' }">
            <div style="font-color:#7D35B6 !important;">
            <div
              class="cursor-pointer"
              v-if="item.schedule.length > 1"
              @click="handleGetOtherSchedule(item.id)"
            >
              <div v-if="parseDate(item.schedule[0].date_start,'MMM') == parseDate(item.schedule[item.schedule.length-1].date_start,'MMM')">
              {{
                parseDate(
                  item.schedule[0].date_start,
                  'DD '
                )
              }}-
              {{
                parseDate(
                  item.schedule[item.schedule.length-1].date_start,
                  ' DD MMM YYYY'
                )
              }}
              </div>
              <div v-else>
              {{
                parseDate(
                  item.schedule[0].date_start,
                  'DD MMM '
                )
              }}-
              {{
                parseDate(
                  item.schedule[item.schedule.length-1].date_start,
                  ' DD MMM YYYY'
                )
              }}
              </div>
            </div>
            <div v-else>
            {{
            parseDate(
              item.schedule[0].date_start,
              'DD MMM YYYY'
              )
            }}
            </div>
            </div>
          </q-card-section>
          <div style="position:absolute; bottom:20px;">
            <div style="margin:8px;" v-if="item.registration_type=='admin' && item.participant_type =='registered'">
              <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="green-1" :style="{ fontSize: '8px', color:'#6BCC49' }">
                Registered by admin
              </q-badge>
              <!-- <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="pink-1" :style="{ fontSize: '8px', color:'#d81b60' }" v-if="item.ongoing==true">
                On Going
              </q-badge> -->
            </div>
            <div style="margin:8px;" v-else>
              <div v-if="is_km_manager!=true">
                <q-badge style="margin-right:8px;border: 0.5px solid currentColor;" color="blue-1" :style="{ fontSize: '8px', color:'#2C8ED3' }">
                  Invited
                </q-badge>
                <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="orange-1" :style="{ fontSize: '8px', color:'#F5D529' }" v-if="item.participant_type=='pending'">
                  Waiting for Approval
                </q-badge>
                <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="green-1" :style="{ fontSize: '8px', color:'#6BCC49' }" v-if="item.participant_type=='registered'">
                  Registered
                </q-badge>
                <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="red-1" :style="{ fontSize: '8px', color:'#F33F6A' }" v-if="item.participant_type=='declined'">
                  Declined
                </q-badge>
                <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="red-1" :style="{ fontSize: '8px', color:'#F33F6A' }" v-if="item.participant_type=='cancel'">
                  Cancel
                </q-badge>
                <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="pink-1" :style="{ fontSize: '8px', color:'#d81b60' }" v-if="item.ongoing==true && item.status!='closed'">
                  On Going
                </q-badge>
              </div>
              <div v-else>
                <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="green-1" :style="{ fontSize: '8px', color:'#6BCC49' }" v-if="item.status=='open_registration'">
                  Open Registration
                </q-badge>
                <q-badge style="margin-right:8px;border: 0.5px solid currentColor;" color="blue-1" :style="{ fontSize: '8px', color:'#2C8ED3' }" v-if="item.status=='close_registration'">
                  Close Registration
                </q-badge>
                <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="pink-1" :style="{ fontSize: '8px', color:'#d81b60' }" v-if="item.ongoing==true && item.status!='closed'">
                  On Going
                </q-badge>
                <q-badge style="margin-right:8px; border: 0.5px solid currentColor;" color="red-1" :style="{ fontSize: '8px', color:'#F33F6A' }" v-if="item.status=='closed'">
                  End
                </q-badge>
              </div>
            </div>
          </div>
          <div style="position:absolute; bottom:0px;">
            <q-badge style="margin-right:0; border: 0.5px solid currentColor;" color="green-1" class="q-ma-sm text-bold" :style="{ fontSize: '8px', color:'#6BCC49' }"
              >{{ item.training_type }}</q-badge
            >
            <q-badge style="margin-right:0; border: 0.5px solid currentColor;" color="orange-1" class="q-ma-sm text-bold" :style="{ fontSize: '8px', color:'#F5D529' }"
              >{{ item.training_method }}</q-badge
            >
          </div>
          <div style="position:absolute; bottom:0px; right:0px; margin-right:8px; margin-bottom:8px;">
              <div :style="{ fontSize: '10px', color:'#838FA7' }">Kuota {{ item.maximun_capacity - item.total_participant }}/{{ item.maximun_capacity }}</div>
          </div>
        </q-card>
        </div>
        <div style="margin-left:19.5px;">
        </div>
      </div>
    </q-scroll-area>
    <q-card
      class="my-card q-mt-md" v-if="events.length === 0"
      >
      <q-card-section class="row items-center">
        <div class="row full-width q-px-none">
          <!-- <div class="col-4">
            <div>
              <div class="col-3 text-center">
                <div class="kmp-font-sm">
                  {{ parseDate(today, 'dddd') }}
                </div>
                <div class="kmp-font-hg kmp-font-lh-1">
                  {{ parseDate(today, 'DD') }}
                </div>
                <div class="kmp-font-sm">
                  {{ parseDate(today, 'MMMM YYYY') }}
                </div>
              </div>
            </div>
          </div> -->
          <div class="col-12">
            <div class="kmp-bg-color-1 q-pa-xl kmp-rounded cursor-pointer text-center text-grey-5">
              No Upcoming Training
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="row q-py-md">
      <div class="col-8 kmp-font-lg kmp-font-bold">Event</div>
      <div class="col-4"></div>
    </div>
    <q-card
      class="my-card"
      v-for="(item, indexpost) in post_events"
      :key="indexpost"
      >
      <q-card-section class="row items-center">
        <div class="row full-width q-px-none">
          <div class="col-4">
            <div>
              <div class="col-3 text-center">
                <div class="kmp-font-sm">
                  {{ parseDate(indexpost, 'dddd') }}
                </div>
                <div class="kmp-font-hg kmp-font-lh-1">
                  {{ parseDate(indexpost, 'DD') }}
                </div>
                <div class="kmp-font-sm">
                  {{ parseDate(indexpost, 'MMMM YYYY') }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-8">
            <a v-for="(event, indexevent) in item" @click="openModalDetailEvent(event.post_id)"
              :key="indexevent">
              <div class="kmp-bg-color-1 q-pa-md kmp-rounded cursor-pointer">
                <div class="kmp-post-status-channel" v-if="event.end_date !== null">End Event : {{ parseDate(event.end_date) }}
                </div>
                <div
                  :class="indexevent % 2 === 0 ? 'kmp-bg-color-3 q-py-xs q-px-sm kmp-rounded text-white' : 'kmp-bg-color-6 q-py-xs q-px-sm kmp-rounded text-white'"
                >
                {{ event.name }}
                <q-toggle
                  v-if="is_km_manager===true"
                  v-model="event.is_highlight"
                  checked-icon="check"
                  color="green"
                  size="xs"
                  unchecked-icon="clear"
                  @input="handletoogle(event.id, event.is_highlight)" class="float-right" style="margin: -3px 0px;"
                />
                </div>
                <!-- <q-btn no-caps unelevated color="primary" class="float-right q-mr-sm" label="Publish"/> -->
                <div v-if="is_km_manager===true" class="float-right kmp-post-status-channel q-mt-xs"> Highlight Event</div>
              </div>
            </a>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="my-card q-mt-md" v-if="post_events.length === 0"
      >
      <q-card-section class="row items-center">
        <div class="row full-width q-px-none">
          <div class="col-4">
            <div>
              <div class="col-3 text-center">
                <div class="kmp-font-sm">
                  {{ parseDate(today, 'dddd') }}
                </div>
                <div class="kmp-font-hg kmp-font-lh-1">
                  {{ parseDate(today, 'DD') }}
                </div>
                <div class="kmp-font-sm">
                  {{ parseDate(today, 'MMMM YYYY') }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="kmp-bg-color-1 q-pa-xl kmp-rounded cursor-pointer text-center text-grey-5">
              No Upcoming Event
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="modal_detail_event">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Event Detail</div>
        </q-card-section>
        <div>
          <q-card-section class="q-pt-none" v-if="isLoadingDetail">
            <q-skeleton width="150px" height="25px" />
          </q-card-section>
          <q-card-section class="q-pt-none" v-else>
            <div v-if="detail_post_event.picture !== null">
              <q-img :src="detail_post_event.picture" style="max-width: 100%"/>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none" v-if="isLoadingDetail">
            <q-skeleton width="150px" height="25px" />
          </q-card-section>
          <q-card-section class="q-pt-none" v-else>
            <div class="kmp-post-text-event-title q-mt-sm q-mb-xs">
              {{detail_post_event.title}}
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none" v-if="isLoadingDetail">
            <q-skeleton width="150px" height="25px" />
          </q-card-section>
          <q-card-section class="q-pt-none" v-else>
            <div class="text-content">
              <q-icon name="event" class="check-icon q-mr-sm" size="14px" style=""/>
              <span v-if="detail_post_event.start_date === detail_post_event.end_date">{{ parseDate(detail_post_event.end_date, 'DD MMM YYYY') }}</span>
              <span v-if="detail_post_event.start_date !== detail_post_event.end_date">{{
                  parseDate(detail_post_event.start_date, 'DD MMM YYYY')
                }} - {{ parseDate(detail_post_event.end_date, 'DD MMM YYYY') }}</span>
            </div>
          </q-card-section>
          <div v-if="detail_post_event.start_time !== null && detail_post_event.end_time !== null">
            <q-card-section class="q-pt-none" v-if="isLoadingDetail">
              <q-skeleton width="150px" height="25px" />
            </q-card-section>
            <q-card-section class="q-pt-none" v-else>
              <div class="text-content">
                <q-icon name="access_time" class="check-icon q-mr-sm" size="14px" style=""/>
                {{ `${parseTime(detail_post_event.start_time)} - ${parseTime(detail_post_event.end_time)}` }} WIB
              </div>
            </q-card-section>
          </div>
          <div v-if="detail_post_event.locations !== null">
            <q-card-section class="q-pt-none" v-if="isLoadingDetail">
              <q-skeleton width="150px" height="25px" />
            </q-card-section>
            <q-card-section class="q-pt-none" v-else>
              <div class="text-content">
                <q-icon name="pin_drop" class="check-icon q-mr-sm" size="14px" style=""/>
                {{detail_post_event.locations}}
              </div>
            </q-card-section>
          </div>
          <div v-if="detail_post_event.link !== null">
            <q-card-section class="q-pt-none" v-if="isLoadingDetail">
              <q-skeleton width="150px" height="25px" />
            </q-card-section>
            <q-card-section class="q-pt-none" v-else>
              <div class="text-content">
                <q-icon name="link" class="check-icon q-mr-sm" size="14px" style=""/>
                <a :href="detail_post_event.link" target="_blank" style="word-wrap: break-word; white-space: normal;">{{ detail_post_event.link }}</a>
              </div>
            </q-card-section>
          </div>
          <q-card-section class="q-pt-none" v-if="isLoadingDetail">
            <q-skeleton width="350px" height="25px" />
          </q-card-section>
          <q-card-section class="q-pt-none" v-else>
            <div class="text-content q-mt-sm">
              Created by {{detail_post_event.created_by_user}}
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none" v-if="isLoadingDetail">
            <q-skeleton width="350px" height="25px" />
          </q-card-section>
          <q-card-section class="q-pt-none" v-else>
            <div class="text-content q-mt-sm q-mb-md float-right">
              <span @click="openUrl(detail_post_event.id,detail_post_event.post_channel.channel_id)" class="cursor-pointer kmp-text-blue-2">See Detail</span>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_highlight" v-if="post_events_highlight.length > 0 && state_highlight !== true">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Event Highlight</div>
        </q-card-section>
        <q-card-section>
          <!-- navigation -->
          <q-carousel
            arrows
            animated
            swipeable
            v-model="slide"
            navigation-icon="radio_button_unchecked"
            class="kmp-bg-color-1 text-white rounded-borders"
            control-type="regular"
            control-color="blue-4"
            control-text-color="white"
          >
            <q-carousel-slide v-for="slide in post_events_highlight" :key="slide.id" :name="slide.id" :img-src="url + slide.picture" class="uncropped-image cursor-pointer">
              <q-carousel-slide :name="slide.id" @click="openUrl(slide.post_id,slide.post.post_channel.channel_id)" />
            </q-carousel-slide>
          </q-carousel>
        </q-card-section>
        <div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getCredential } from 'src/lib/storage';
import { Notify } from 'quasar';
import { required } from 'vuelidate/lib/validators';
import moment from 'moment';
import { checkRole } from 'src/lib/helper';
import {
  trainingEvents,
  listEvents,
  postDetail,
  eventHighlight,
  highlightCreate,
  listEventHighlight,
  // highlightList,
  memberBadge
} from '../lib/api';

export default {
  props: ['today'],
  data() {
    return {
      url_image_dummy: 'https://placeimg.com/500/300/nature?t=',
      answer: 'Jawa',
      answerBool: '',
      group: '',
      options: [
        { label: 'Java', value: 'Java', selected: false },
        { label: 'Jawa', value: 'Jawa', selected: false },
        { label: 'Delphi', value: 'Delphi', selected: false },
        { label: 'Cobol', value: 'Cobol', selected: false }
      ],
      isLoadingDetail: 1,
      events: [],
      is_km_manager: false,
      user: {
        id: '',
        name: '',
        initial: ''
      },
      post_events: [],
      post_events_highlight: [],
      modal_detail_event: false,
      modal_highlight: false,
      detail_post_event: {
        id: '',
        title: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        locations: '',
        link: '',
        created_by_user: '',
        picture: '',
        post_channel: '',
        id_event: '',
        is_highlight: ''
      },
      slide: '',
      url: process.env.QUASAR_API_URL,
      state_highlight: '',
      togTrue: true,
      togFalse: false,
      role: ''
    };
  },
  validations: {
    group: {
      required
    }
  },
  mounted() {
    this.getListEvents();
    this.getUser();
    this.getListPostEventsHighlight();
    this.setHighlight();
    this.mobileNotif();
  },
  methods: {
    openModalDetailEvent(post_id = null) {
      this.isLoadingDetail = true;
      postDetail(post_id).then(response => {
        this.detail_post_event.title = response.data.title;
        this.detail_post_event.picture = response.data.event.picture ? process.env.QUASAR_API_URL + response.data.event.picture : null;
        this.detail_post_event.start_date = response.data.event.start_date;
        this.detail_post_event.end_date = response.data.event.end_date;
        this.detail_post_event.start_time = response.data.event.start_time;
        this.detail_post_event.end_time = response.data.event.end_time;
        this.detail_post_event.locations = response.data.event.locations;
        this.detail_post_event.link = response.data.event.link;
        this.detail_post_event.created_by_user = response.data.created_by_user.name;
        this.detail_post_event.id = post_id;
        this.detail_post_event.id_event = response.data.event.id;
        this.detail_post_event.is_highlight = response.data.event.is_highlight === null ? false : response.data.event.is_highlight;
        this.detail_post_event.post_channel = response.data.post_channel;
        this.isLoadingDetail = false;
      });
      this.modal_detail_event = true;
    },
    getListEvents() {
      trainingEvents().then(response => {
        const hasil = response.data;
        this.events = hasil;
      });
    },
    getListPostEvents() {
      listEvents({ role: this.role }).then(response => {
        const hasil = response.data;
        this.post_events = hasil;
      });
    },
    getListPostEventsHighlight() {
      listEventHighlight().then(response => {
        if (response.data.length > 0) {
          const hasil = response.data;
          const arr = [];
          hasil.forEach(a => {
            if (this.checkMember(a) === 'Tampil') {
              arr.push(a);
            }
          });
          this.post_events_highlight = arr;
          this.slide = hasil[0].id;
        }
      });
      this.modal_highlight = true;
    },
    setHighlight() {
      if (this.state_highlight !== true) {
        setTimeout(() => {
          this.$store.dispatch('user/updateHighlight');
          const user = getCredential();
          this.state_highlight = user.userHighlight;
        }, 5000);
        this.getBatch();
      }
    },
    checkMember(data) {
      let a = '';
      const arr = [];
      if (data.post.post_channel.channel.channel_type === 'General') {
        a = 'Tampil';
      } else {
        data.post.post_channel.channel.channel_member.forEach(c => {
          arr.push(c.users_id);
        });

        if (arr.includes(this.user.id)) {
          a = 'Tampil';
        } else {
          a = 'No';
        }
      }
      return a;
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
    hendleSave() {
      if (this.$v.$invalid) {
        Notify.create({
          message: 'Please choice one!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        this.options.forEach(f => {
          if (f.value === this.group) {
            f.selected = true;
          } else {
            f.selected = false;
          }
        });
        const choice = this.options.filter(f => {
          return f.selected === true;
        });
        if (choice[0].value === this.answer) {
          this.answerBool = true;
        } else {
          this.answerBool = false;
        }
        Notify.create({
          message: 'Thank to join this Quiz!',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
      }
    },
    hendleNext() {
      if (this.$v.$invalid) {
        Notify.create({
          message: 'Please choice one!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        Notify.create({
          message: "Let's get into the next question",
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
      }
    },
    handleDetail(id) {
      this.$router.push({
        name: 'training-detail',
        params: {
          id
        }
      });
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      this.role = checkRole().name;
      if (this.role === 'km_manager') {
        this.is_km_manager = true;
      }

      // profile.roles.forEach((v, i) => {
      //   if (v.name === 'km_manager') {
      //     this.is_km_manager = true;
      //   }
      // });
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
      this.state_highlight = user.userHighlight;
      this.getListPostEvents();
    },
    openUrl(post, channel) {
      if (this.$q.platform.is.mobile) {
        this.$router.push({
          name: 'channel-detail-post-detail',
          params: {
            id: channel,
            post_id: post
          }
        });
      } else {
        window.open(`/channel/${channel}/${post}`, '_blank');
      }
    },
    handletoogle(event_id, state) {
      // console.log(highlight);
      eventHighlight({ id: event_id, data_highlight: state });
      highlightCreate({ event_id, state }).then(response => {
        if (response.message === 'OK') {
          Notify.create({
            message: 'Highlight Updated.',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
        }
      });
    },
    getBatch() {
      memberBadge().then(res => {
        // console.log(res);
      });
      // Notify.create({
      //   message: 'Menghitung badge yang akan didapat',
      //   type: 'positive',
      //   color: 'positive',
      //   icon: 'done',
      //   detail: 'Badge Refresh',
      //   position: 'center',
      //   actions: [
      //     { icon: 'close', color: 'white', handler: () => { /* ... */ } }
      //   ],
      //   timeout: 5000
      // });
    },
    mobileNotif() {
      const user = getCredential();
      if (user.userMobileInfo === null && this.$q.platform.is.mobile) {
        Notify.create({
          message: 'Smart mobile masih tahap pembangunan. Fitur yang tersedia masih terbatas. Kami mohon maaf atas ketidaknyamanan ini.',
          timeout: 0,
          type: 'positive',
          color: 'blue-6',
          icon: 'info',
          classes: 'text-12',
          position: 'center',
          actions: [
            { icon: 'close', color: 'white', handler: () => { this.$store.dispatch('user/updateMobileInfo'); } }
          ]
        });
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.title-outer-card-left
  font-size: 20px
  font-weight: bold

.title-outer-card-right
  font-size: 20px

.point-info
  padding: 4px 8px 4px 9px
  text-align: center
  background: #EFFFEA
  border-radius: 4px
  color: #56B635
  width: auto !important

.list-true
  background-color: #EFFFEA
  border-radius: 4px

.list-false
  background-color: #FFF1F4
  border-radius: 4px

.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

.uncropped-image
  background-size: contain
  background-repeat: no-repeat
  background-color: #ffffff

</style>
<style>
.q-card > div:not(:last-child), .q-card > img:not(:last-child) {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.q-card > div:not(:first-child), .q-card > img:not(:first-child) {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.q-scrollarea__bar--h, .q-scrollarea__thumb--h {
  margin-bottom: 12px;
  height: 4px;
}
.q-scrollarea__content > .q-card {
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
  border-radius: 4px;
  vertical-align: top;
  background: #fff;
  position: relative;
}
.details {
  overflow: auto;
  background: white;
  padding-bottom: 1.5em;
}
.details::-webkit-scrollbar {
  height: 4px;
  border: 0px solid white;
}
.details::-webkit-scrollbar-track {
  border-radius: 0;
  margin-left:16px;
  margin-right:16px;
  background: white;
}
.details::-webkit-scrollbar-thumb {
  border-radius: 0;
  background: #E5E8ED;
}
.title_training_event .q-btn__wrapper {
  padding: 4px 2px 4px 6px;
  min-height: 2.572em;
  border-radius: inherit;
  width: 100%;
  height: 100%;
}
.title_training_event .material-icons {
  padding: 0px;
}
.title_training_event .on-right {
    margin-left: 0px;
}
</style>
<!--branch saughi post view-->
<!--<template>-->
<!--  <div class="q-py-md q-pa-none items-start">-->
<!--    <div class="row q-pb-md">-->
<!--      <div class="col-8 kmp-font-lg kmp-font-bold">Event</div>-->
<!--      <div class="col-4"></div>-->
<!--    </div>-->
<!--    &lt;!&ndash; <q-card class="my-card">-->
<!--      <q-card-section class="row items-center">-->
<!--        <div class="row full-width q-px-none">-->
<!--          <div class="col-4 q-pl-sm">-->
<!--            <div class="kmp-font-sm">Kamis</div>-->
<!--            <div class="kmp-font-hg kmp-font-lh-1">30</div>-->
<!--            <div class="kmp-font-sm">Desember 2021</div>-->
<!--          </div>-->
<!--          <div class="col-8">-->
<!--            <div class="kmp-bg-color-1 q-pa-md kmp-rounded">-->
<!--              <div class="kmp-font-sm kmp-text-grey-1">30 Desember 2021</div>-->
<!--              <div-->
<!--                class="kmp-bg-color-3 q-py-xs q-px-sm kmp-rounded text-white"-->
<!--              >-->
<!--                <div class="row">-->
<!--                  <div class="col-2">10:00</div>-->
<!--                  <div class="col-10">Launching Smart KPK</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--    </q-card> &ndash;&gt;-->
<!--    <q-card-->
<!--      class="my-card q-mt-md"-->
<!--      v-for="(item, index) in events"-->
<!--      :key="index"-->
<!--    >-->
<!--      <q-card-section class="row items-center">-->
<!--        <div class="row full-width q-px-none">-->
<!--          <div class="col-4">-->
<!--            <div v-if="item.schedule.length > 1">-->
<!--              <div class="row text-center">-->
<!--                <div class="col-4">-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{ parseDate(item.schedule[0].date_start, 'dddd') }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-hg kmp-font-lh-1">-->
<!--                    {{ parseDate(item.schedule[0].date_start, 'DD') }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{ parseDate(item.schedule[0].date_start, 'MMMM YYYY') }}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <div class="kmp-font-hg kmp-font-lh-1 q-mt-md">-->
<!--                    - -->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{-->
<!--                      parseDate(-->
<!--                        item.schedule[item.schedule.length - 1].date_start,-->
<!--                        'dddd'-->
<!--                      )-->
<!--                    }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-hg kmp-font-lh-1">-->
<!--                    {{-->
<!--                      parseDate(-->
<!--                        item.schedule[item.schedule.length - 1].date_start,-->
<!--                        'DD'-->
<!--                      )-->
<!--                    }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{-->
<!--                      parseDate(-->
<!--                        item.schedule[item.schedule.length - 1].date_start,-->
<!--                        'MMMM YYYY'-->
<!--                      )-->
<!--                    }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-else>-->
<!--              <div class="col-3 text-center">-->
<!--                <div class="kmp-font-sm">-->
<!--                  {{ parseDate(item.schedule[0].date_start, 'dddd') }}-->
<!--                </div>-->
<!--                <div class="kmp-font-hg kmp-font-lh-1">-->
<!--                  {{ parseDate(item.schedule[0].date_start, 'DD') }}-->
<!--                </div>-->
<!--                <div class="kmp-font-sm">-->
<!--                  {{ parseDate(item.schedule[0].date_start, 'MMMM YYYY') }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-8">-->
<!--            <a @click="openModalDetail(item)">-->
<!--              <div class="kmp-bg-color-1 q-pa-md kmp-rounded">-->
<!--                <div-->
<!--                  class="kmp-bg-color-3 q-py-xs q-px-sm kmp-rounded text-white"-->
<!--                >-->
<!--                  {{ item.name }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </a>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--    </q-card>-->
<!--    <q-dialog v-model="modal_detail_training" persistent>-->
<!--      <q-card style="min-width: 500px" class="q-py-md q-px-sm">-->
<!--        <q-card-section>-->
<!--          <q-icon-->
<!--            name="close"-->
<!--            size="24px"-->
<!--            class="text-neutral float-right"-->
<!--            v-close-popup-->
<!--          />-->
<!--          <div class="text-h6">Training Detail</div>-->
<!--        </q-card-section>-->
<!--        <div>-->
<!--          <q-card-section class="q-pt-none" v-if="isLoadingDetail">-->
<!--            <q-skeleton width="150px" height="25px" />-->
<!--          </q-card-section>-->
<!--          <q-card-section class="q-pt-none" v-else>-->
<!--            <div class="text-neutral">-->
<!--              <b>{{ this.training_name }}</b>-->
<!--            </div>-->
<!--          </q-card-section>-->
<!--        </div>-->
<!--        <div>-->
<!--          <q-card-section class="q-pt-none" v-if="isLoadingDetail">-->
<!--            <q-skeleton height="100px" />-->
<!--          </q-card-section>-->
<!--          <q-card-section class="q-pt-none" v-else>-->
<!--            <div class="text-neutral">{{ this.training_description }}</div>-->
<!--          </q-card-section>-->
<!--        </div>-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <table class="text-neutral">-->
<!--            <tr>-->
<!--              <td width="160px">-->
<!--                <q-icon name="face" size="18px" />-->
<!--                Provider-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div class="text-neutral">: {{ this.provider }}</div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>-->
<!--                <q-icon name="event" size="18px" />-->
<!--                Date-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div class="text-neutral">: {{ this.training_date }}</div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>-->
<!--                <q-icon name="event" size="18px" />-->
<!--                Metode Pelatihan-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div class="text-neutral">: {{ this.training_method }}</div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>-->
<!--                <q-icon name="approval_on" size="18px" />-->
<!--                Location-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div class="text-neutral">: {{ this.approvals }}</div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>-->
<!--                <q-icon name="groups" size="18px" />-->
<!--                Quota-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div v-if="this.total_participant != 0">-->
<!--                    <div class="text-neutral">-->
<!--                      : {{ this.maximun_capacity }} ( Remaining Quota-->
<!--                      {{ this.maximun_capacity - this.total_participant }} )-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div v-else>-->
<!--                    <div class="text-neutral">-->
<!--                      : {{ this.maximun_capacity }} ( Remaining Quota-->
<!--                      {{ this.maximun_capacity }} )-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--          </table>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        <div>-->
<!--          <q-card-section class="q-pt-none">-->
<!--            <div class="text-neutral q-mt-sm">-->
<!--              <b>Schedule list</b>-->
<!--            </div>-->
<!--          </q-card-section>-->
<!--        </div>-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <div-->
<!--            v-for="(item, index) in list_schedule"-->
<!--            :key="index"-->
<!--            class="row q-gutter-sm items-center"-->
<!--            :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"-->
<!--          >-->
<!--            <q-icon name="event" class="cursor-pointer" size="sm" />-->
<!--            <div class="kmp-font-md kmp-font-bold">-->
<!--              {{ parseDate(item.date_start) }}-->
<!--              <div-->
<!--                class="kmp-font-normal"-->
<!--                v-if="item.time_start && item.time_end"-->
<!--              >-->
<!--                {{-->
<!--                  `${parseTime(item.time_start)} - ${parseTime(item.time_end)}`-->
<!--                }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        &lt;!&ndash; <q-card-section class="q-pt-md">-->
<!--          <div class="text-title">Narasumber</div>-->
<!--        </q-card-section> &ndash;&gt;-->
<!--        <q-card-section class="q-pt-md">-->
<!--          <div-->
<!--            v-for="(narasumber, index) in this.narasumber_list_detail"-->
<!--            class="row q-mb-xs"-->
<!--            :key="index"-->
<!--          >-->
<!--            <div class="col-8">-->
<!--              <div class="text-neutral">-->
<!--                <span-->
<!--                  ><q-badge color="blue" rounded class="q-pa-xd"-->
<!--                    ><q-avatar-->
<!--                      size="sm"-->
<!--                      class="q-mr-xs"-->
<!--                      color="primary"-->
<!--                      text-color="white"-->
<!--                      >{{-->
<!--                        narasumber.name-->
<!--                          .match(/\b(\w)/g)-->
<!--                          .join('')-->
<!--                          .toUpperCase()-->
<!--                      }}</q-avatar-->
<!--                    >-->
<!--                    {{ narasumber.name }}</q-badge-->
<!--                  ></span-->
<!--                >-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="col-4 text-right text-neutral">-->
<!--              {{ narasumber.roles }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        <q-card-section class="q-pt-md">-->
<!--          <div class="text-title">Related documents</div>-->
<!--        </q-card-section>-->
<!--        <q-list class="q-pl-md q-pr-md">-->
<!--          <div v-for="(item, index) in finish_files_detail" :key="index">-->
<!--            <ListFile-->
<!--              v-if="item.file !== null"-->
<!--              :file="item.file"-->
<!--              :item="item"-->
<!--            />-->
<!--          </div>-->
<!--        </q-list>-->
<!--        <q-separator />-->
<!--        <div class="q-pa-md" v-if="this.total_participant != 0">-->
<!--          <div class="row">-->
<!--            <div v-for="(item, index) in avatar_participant" :key="index">-->
<!--              <q-avatar-->
<!--                size="24px"-->
<!--                style="margin-left:-5px"-->
<!--                color="primary"-->
<!--                text-color="white"-->
<!--              >-->
<!--                <span v-if="item.img != null"><img :src="item.img"/></span>-->
<!--                <span v-else>{{-->
<!--                  item.inisial-->
<!--                    .match(/\b(\w)/g)-->
<!--                    .join('')-->
<!--                    .toUpperCase()-->
<!--                }}</span>-->
<!--              </q-avatar>-->
<!--            </div>-->
<!--            <div-->
<!--              class="cursor-pointer"-->
<!--              @click="handleGetOtherParticipantRegistered"-->
<!--            >-->
<!--              &lt;!&ndash; <div class="text-weight-bold">participants</div> &ndash;&gt;-->
<!--              <span class="text-grey-7 q-mr-sm text-weight-bold q-ml-xs">{{-->
<!--                this.total_participant-->
<!--              }}</span>-->
<!--              <span class="text-grey-7 q-mr-sm text-weight">{{-->
<!--                this.information_participant-->
<!--              }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <q-separator />-->
<!--        <div-->
<!--          class="q-pa-md"-->
<!--          v-if="is_km_manager==true && this.list_participant_pending.length != 0"-->
<!--        >-->
<!--          <div class="row q-mb-md">waiting for approval</div>-->
<!--          <div class="row">-->
<!--            <div class="table">-->
<!--              <tr-->
<!--                v-for="(item, index) in list_participant_pending"-->
<!--                :key="index"-->
<!--                :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"-->
<!--                style="height:30px"-->
<!--              >-->
<!--                <td style="width:500px">-->
<!--                  <q-avatar color="primary" text-color="white" size="25px">{{-->
<!--                    item.user.name-->
<!--                      .match(/\b(\w)/g)-->
<!--                      .join('')-->
<!--                      .toUpperCase()-->
<!--                  }}</q-avatar>-->
<!--                  <span class="text-grey-7 q-ml-xs text-weight">{{-->
<!--                    item.user.name-->
<!--                  }}</span>-->
<!--                </td>-->
<!--                <td style="padding-right:10px">-->
<!--                  <q-btn-->
<!--                    push-->
<!--                    color="green"-->
<!--                    @click="approvalTraining('approve', item.id, index)"-->
<!--                    round-->
<!--                    icon="done"-->
<!--                    size="xs"-->
<!--                  />-->
<!--                </td>-->
<!--                <td style="padding-right:10px">-->
<!--                  <q-btn-->
<!--                    push-->
<!--                    color="red"-->
<!--                    @click="approvalTraining('decline', item.id, index)"-->
<!--                    round-->
<!--                    icon="close"-->
<!--                    size="xs"-->
<!--                  />-->
<!--                </td>-->
<!--              </tr>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <q-separator-->
<!--          v-if="is_km_manager==true && this.list_participant_pending.length != 0"-->
<!--        />-->
<!--        <div class="q-mt-md q-mb-md" v-if="is_rsvp">-->
<!--          &lt;!&ndash; <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> &ndash;&gt;-->
<!--          <div class="row">-->
<!--            <div class="col-2">-->
<!--              <span class="text-grey-7 q-mr-sm text-weight-bold q-ml-xs"-->
<!--                >RSVP</span-->
<!--              >-->
<!--            </div>-->
<!--            <div class="col-10" align="right">-->
<!--              <a-->
<!--                href="training/#"-->
<!--                class="text-blue q-pr-md text-weight-bold"-->
<!--                style="text-decoration:none"-->
<!--                >Yes</a-->
<!--              >-->
<!--              <a-->
<!--                href="training/#"-->
<!--                class="text-blue q-pr-md text-weight-bold"-->
<!--                style="text-decoration:none"-->
<!--                >No</a-->
<!--              >-->
<!--              <a-->
<!--                href="training/#"-->
<!--                class="text-blue q-pr-md text-weight-bold"-->
<!--                style="text-decoration:none"-->
<!--                >Maybe</a-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <q-separator v-if="is_rsvp" />-->
<!--        <div class="q-mt-md">-->
<!--          &lt;!&ndash; <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> &ndash;&gt;-->
<!--          <div class="row">-->
<!--            <div class="col-6"></div>-->
<!--            <div class="col-6" align="right">-->
<!--              <div v-if="is_km_manager==false && this.status == 'open_registration'">-->
<!--                <div v-if="this.total_participant == this.maximun_capacity">-->
<!--                  <q-btn-->
<!--                    disabled-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Run out of Quota"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                  />-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <q-btn-->
<!--                    v-if="check_participant != 1"-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Register"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                    @click="modal_permission_training = true"-->
<!--                  />-->
<!--                  <q-btn-->
<!--                    v-if="pending == 1"-->
<!--                    disabled-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Waiting For Approval"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                  />-->
<!--                  <q-btn-->
<!--                    v-if="declined == 1"-->
<!--                    disabled-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Request Declined"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                  />-->
<!--                  <q-btn-->
<!--                    v-if="registered == 1"-->
<!--                    disabled-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Request Approved"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                  />-->
<!--                </div>-->
<!--                &lt;!&ndash; </div> &ndash;&gt;-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
<!--    <fixed-modal-->
<!--      :show="modal_list_participant"-->
<!--      :title="`Participant list - ${list_participant.length}`"-->
<!--      @on-close="modal_list_participant = false"-->
<!--    >-->
<!--      <div-->
<!--        v-for="(item, index) in list_participant"-->
<!--        :key="index"-->
<!--        class="row q-gutter-sm items-center"-->
<!--        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"-->
<!--      >-->
<!--        <q-avatar color="primary" text-color="white" size="30px">{{-->
<!--          item.user.name-->
<!--            .match(/\b(\w)/g)-->
<!--            .join('')-->
<!--            .toUpperCase()-->
<!--        }}</q-avatar>-->
<!--        <div class="kmp-font-md kmp-font-bold">{{ item.user.name }}</div>-->
<!--      </div>-->
<!--    </fixed-modal>-->
<!--    <q-dialog v-model="modal_permission_training" persistent>-->
<!--      <q-card style="min-width: 500px" class="q-py-md q-px-sm">-->
<!--        <q-card-section>-->
<!--          <q-icon-->
<!--            name="close"-->
<!--            size="24px"-->
<!--            class="text-neutral float-right"-->
<!--            v-close-popup-->
<!--          />-->
<!--          <div class="text-h6">Register Training</div>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        <q-card-section class="q-pt-md">-->
<!--          <div class="text-title">Attachments</div>-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <q-uploader-->
<!--            :url="handleUploadRegister"-->
<!--            ref="uploader"-->
<!--            label="Individual upload"-->
<!--            multiple-->
<!--            batch-->
<!--            auto-upload-->
<!--            style="width: 100%"-->
<!--            class="shadow-0 q-uploader&#45;&#45;bordered kmp-rounded"-->
<!--          />-->
<!--        </q-card-section>-->

<!--        <q-separator spaced />-->

<!--        <q-card-section class="q-pt-none">-->
<!--          <div-->
<!--            class="font-weight-bold q-mb-sm q-mt-md"-->
<!--            v-if="finish_files_register.length > 0"-->
<!--          >-->
<!--            {{ finish_files_register.length }} Files Uploaded-->
<!--          </div>-->
<!--          <q-linear-progress-->
<!--            v-if="uploaded_files"-->
<!--            indeterminate-->
<!--            rounded-->
<!--            color="negative"-->
<!--            class="q-my-sm"-->
<!--          />-->
<!--          <q-list>-->
<!--            <div v-for="(item, index) in finish_files_register" :key="index">-->
<!--              <ListFile-->
<!--                v-if="item.file !== null"-->
<!--                :file="item.file"-->
<!--                :item="item"-->
<!--                manage="true"-->
<!--                @delete_knowledge="handleDelete(item.file.id, 'file', index)"-->
<!--              />-->
<!--            </div>-->
<!--          </q-list>-->
<!--        </q-card-section>-->

<!--        <q-card-actions align="right" class="text-primary">-->
<!--          &lt;!&ndash; <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> &ndash;&gt;-->
<!--          <q-btn-->
<!--            class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--            label="Register"-->
<!--            unelevated-->
<!--            v-close-popup-->
<!--            @click="registerTraining()"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--    </q-dialog>-->

<!--    <q-dialog v-model="modal_decline" persistent>-->
<!--      <q-card style="min-width: 500px" class="q-py-md q-px-sm">-->
<!--        <q-card-section>-->
<!--          <q-icon-->
<!--            name="close"-->
<!--            size="24px"-->
<!--            class="text-neutral float-right"-->
<!--            v-close-popup-->
<!--          />-->
<!--          <div class="text-h6">Reason For Decline</div>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <q-input-->
<!--            outlined-->
<!--            dense-->
<!--            v-model="alasan_ditolak"-->
<!--            type="textarea"-->
<!--            class=""-->
<!--          ></q-input>-->
<!--        </q-card-section>-->

<!--        <q-separator spaced />-->

<!--        <q-card-actions align="right" class="text-primary">-->
<!--          &lt;!&ndash; <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> &ndash;&gt;-->
<!--          <q-btn-->
<!--            class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--            label="Send"-->
<!--            unelevated-->
<!--            v-close-popup-->
<!--            @click="declinedTraining()"-->
<!--            :disabled="!alasan_ditolak"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { axios } from 'boot/axios';-->
<!--import { getCredential } from 'src/lib/storage';-->
<!--import { Notify } from 'quasar';-->
<!--import { required } from 'vuelidate/lib/validators';-->
<!--import moment from 'moment';-->
<!--import FixedModal from 'components/common/FixedModal';-->
<!--import ListFile from 'components/common/ListFile';-->
<!--import {-->
<!--  trainingEvents,-->
<!--  trainingDetail,-->
<!--  trainingParticipantGetOtherByType,-->
<!--  trainingRegister,-->
<!--  trainingApproval-->
<!--} from '../lib/api';-->

<!--export default {-->
<!--  components: { ListFile, FixedModal },-->
<!--  data() {-->
<!--    return {-->
<!--      modal_detail_training: false,-->
<!--      modal_list_participant: false,-->
<!--      modal_list_schedule: false,-->
<!--      answer: 'Jawa',-->
<!--      answerBool: '',-->
<!--      group: '',-->
<!--      options: [-->
<!--        { label: 'Java', value: 'Java', selected: false },-->
<!--        { label: 'Jawa', value: 'Jawa', selected: false },-->
<!--        { label: 'Delphi', value: 'Delphi', selected: false },-->
<!--        { label: 'Cobol', value: 'Cobol', selected: false }-->
<!--      ],-->
<!--      training_name: '',-->
<!--      isLoadingDetail: 1,-->
<!--      training_description: '',-->
<!--      provider: '',-->
<!--      locations: '',-->
<!--      training_method: '',-->

<!--      list_schedule: [],-->
<!--      list_participant: [],-->
<!--      finish_files_detail: [],-->
<!--      narasumber_list_detail: [],-->
<!--      total_participant: '',-->
<!--      information_participant: '',-->
<!--      avatar_participant: [],-->
<!--      is_rsvp: 0,-->
<!--      list_participant_pending: [],-->
<!--      id_pending: '',-->
<!--      alasan_ditolak: '',-->
<!--      status: '',-->
<!--      events: [],-->
<!--      registered: 0,-->
<!--      pending: 0,-->
<!--      declined: 0,-->
<!--      modal_permission_training: false,-->
<!--      modal_decline: false,-->
<!--      check_participant: 0,-->
<!--      finish_files_register: [],-->
<!--      uploaded_files: false,-->
<!--      is_km_manager: false,-->
<!--      user: {-->
<!--        id: '',-->
<!--        name: '',-->
<!--        initial: ''-->
<!--      }-->
<!--    };-->
<!--  },-->
<!--  validations: {-->
<!--    group: {-->
<!--      required-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getListEvents();-->
<!--    this.getUser();-->
<!--  },-->
<!--  methods: {-->
<!--    openModalDetail(training = null) {-->
<!--      this.isLoadingDetail = true;-->
<!--      trainingDetail(training.id).then(response => {-->
<!--        this.training_id = training.id;-->
<!--        this.isLoadingDetail = false;-->
<!--        this.training_name = training.name;-->
<!--        this.training_description = training.description;-->
<!--        this.training_type = training.training_type;-->
<!--        this.training_method = training.training_method;-->
<!--        this.locations = training.locations;-->
<!--        this.status = training.status;-->
<!--        this.provider = training.provider;-->
<!--        this.all_day = training.all_day;-->
<!--        this.is_private = training.is_private;-->
<!--        this.maximun_capacity = training.maximun_capacity;-->
<!--        this.recuring = training.recuring;-->
<!--        this.narasumber_list_detail = [];-->
<!--        response.data.expertise.forEach((v, i) => {-->
<!--          this.narasumber_list_detail.push({-->
<!--            users_id: v.users_id,-->
<!--            name: v.user.name,-->
<!--            roles: v.expert_type-->
<!--          });-->
<!--        });-->
<!--        this.finish_files_detail = [];-->
<!--        response.data.files.forEach((v, i) => {-->
<!--          this.finish_files_detail.push({-->
<!--            file: {-->
<!--              filemime: v.filemime,-->
<!--              filename: v.filename,-->
<!--              filesize: v.filesize,-->
<!--              path: v.path-->
<!--            }-->
<!--          });-->
<!--        });-->
<!--        this.avatar_participant = [];-->
<!--        this.total_participant = response.data.total_participant;-->
<!--        this.information_participant = response.data.information_participant;-->
<!--        this.avatar_participant = response.data.avatar_participant;-->
<!--        this.registered = response.data.registered;-->
<!--        this.pending = response.data.pending;-->
<!--        this.declined = response.data.declined;-->
<!--        this.check_participant = response.data.check_participant;-->
<!--        this.is_rsvp = response.data.is_rsvp;-->

<!--        const dateStart = training.schedule[0].date_start;-->
<!--        if (training.schedule.length > 1) {-->
<!--          const dateEnd =-->
<!--            training.schedule[training.schedule.length - 1].date_start;-->
<!--          this.training_date = `${dateStart} - ${dateEnd}`;-->
<!--        } else {-->
<!--          this.training_date = dateStart;-->
<!--        }-->
<!--        this.list_schedule = [];-->
<!--        const {-->
<!--          data: { schedule }-->
<!--        } = response;-->

<!--        this.list_schedule = schedule;-->
<!--      });-->
<!--      this.training_id = training.id;-->
<!--      this.list_participant_pending = [];-->
<!--      trainingParticipantGetOtherByType(this.training_id, {-->
<!--        participant_type: 'pending'-->
<!--      }).then(response => {-->
<!--        const { data } = response;-->

<!--        this.list_participant_pending = data;-->
<!--      });-->
<!--      this.modal_detail_training = true;-->
<!--    },-->
<!--    getListEvents() {-->
<!--      trainingEvents().then(response => {-->
<!--        const hasil = response.data;-->
<!--        this.events = hasil;-->
<!--        console.log(hasil);-->
<!--      });-->
<!--    },-->
<!--    parseDate(date, format = 'DD MMMM YYYY') {-->
<!--      return moment(date).format(format);-->
<!--    },-->
<!--    parseTime(time) {-->
<!--      const sTime = time.split(':');-->
<!--      return `${sTime[0]}:${sTime[1]}`;-->
<!--    },-->
<!--    hendleSave() {-->
<!--      if (this.$v.$invalid) {-->
<!--        Notify.create({-->
<!--          message: 'Please choice one!',-->
<!--          timeout: 1000,-->
<!--          type: 'negative',-->
<!--          color: 'negative',-->
<!--          icon: 'warning'-->
<!--        });-->
<!--      } else {-->
<!--        this.options.forEach(f => {-->
<!--          if (f.value === this.group) {-->
<!--            f.selected = true;-->
<!--          } else {-->
<!--            f.selected = false;-->
<!--          }-->
<!--        });-->
<!--        const choice = this.options.filter(f => {-->
<!--          return f.selected === true;-->
<!--        });-->
<!--        if (choice[0].value === this.answer) {-->
<!--          this.answerBool = true;-->
<!--        } else {-->
<!--          this.answerBool = false;-->
<!--        }-->
<!--        Notify.create({-->
<!--          message: 'Thank to join this Quiz!',-->
<!--          timeout: 1000,-->
<!--          type: 'positive',-->
<!--          color: 'positive',-->
<!--          icon: 'check'-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    hendleNext() {-->
<!--      if (this.$v.$invalid) {-->
<!--        Notify.create({-->
<!--          message: 'Please choice one!',-->
<!--          timeout: 1000,-->
<!--          type: 'negative',-->
<!--          color: 'negative',-->
<!--          icon: 'warning'-->
<!--        });-->
<!--      } else {-->
<!--        Notify.create({-->
<!--          message: "Let's get into the next question",-->
<!--          timeout: 1000,-->
<!--          type: 'positive',-->
<!--          color: 'positive',-->
<!--          icon: 'check'-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    registerTraining() {-->
<!--      const group_file = this.finish_files_register.map(item => {-->
<!--        return {-->
<!--          file_id: item.file.id-->
<!--        };-->
<!--      });-->
<!--      if (group_file.length === 0) {-->
<!--        Notify.create({-->
<!--          message: 'Upload file terlebih dahulu sebelum register!',-->
<!--          timeout: 3000,-->
<!--          type: 'positive',-->
<!--          color: 'warning',-->
<!--          icon: 'check'-->
<!--        });-->
<!--        return;-->
<!--      }-->
<!--      const data = {-->
<!--        enabled: true,-->
<!--        file: group_file-->
<!--      };-->
<!--      trainingRegister(this.training_id, data).then(response => {-->
<!--        this.$q.notify({-->
<!--          message: 'Successfull register training',-->
<!--          color: 'blue'-->
<!--        });-->
<!--      });-->
<!--    },-->
<!--    declinedTraining() {-->
<!--      console.log(this.alasan_ditolak);-->
<!--      const data = {-->
<!--        participant_type: 'declined',-->
<!--        alasan_ditolak: this.alasan_ditolak-->
<!--      };-->
<!--      trainingApproval(this.id_pending, data).then(result => {-->
<!--        const data_approval = result.data;-->
<!--        if (data_approval) {-->
<!--          this.$q.notify({-->
<!--            message: 'Success Declined',-->
<!--            color: 'blue'-->
<!--          });-->
<!--          trainingDetail(this.training_id).then(response => {-->
<!--            const data_participant = response.data;-->
<!--            console.log(data_participant.total_participant);-->
<!--            this.total_participant = data_participant.total_participant;-->
<!--            this.information_participant =-->
<!--              response.data.information_participant;-->
<!--            this.avatar_participant = response.data.avatar_participant;-->
<!--          });-->
<!--          this.list_participant_pending.splice(this.index, 1);-->
<!--        }-->
<!--      });-->
<!--      this.alasan_ditolak = null;-->
<!--    },-->
<!--    approvalTraining(selected, id, index) {-->
<!--      console.log(this.created_by);-->
<!--      let participant_type = '';-->
<!--      if (selected === 'approve') {-->
<!--        participant_type = 'registered';-->
<!--      } else {-->
<!--        this.modal_decline = true;-->
<!--        this.id_pending = id;-->
<!--        this.index = index;-->
<!--        return;-->
<!--      }-->
<!--      const data = {-->
<!--        participant_type-->
<!--      };-->
<!--      trainingApproval(id, data).then(result => {-->
<!--        const data_approval = result.data;-->
<!--        if (data_approval) {-->
<!--          this.$q.notify({-->
<!--            message: 'Success Approved',-->
<!--            color: 'blue'-->
<!--          });-->
<!--          trainingDetail(this.training_id).then(response => {-->
<!--            const data_participant = response.data;-->
<!--            console.log(data_participant.total_participant);-->
<!--            this.total_participant = data_participant.total_participant;-->
<!--            this.information_participant =-->
<!--              response.data.information_participant;-->
<!--            this.avatar_participant = response.data.avatar_participant;-->
<!--          });-->
<!--          this.list_participant_pending.splice(index, 1);-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    handleGetOtherParticipantRegistered() {-->
<!--      this.list_participant = [];-->
<!--      this.modal_list_participant = true;-->
<!--      trainingParticipantGetOtherByType(this.training_id, {-->
<!--        participant_type: 'registered'-->
<!--      }).then(response => {-->
<!--        const { data } = response;-->

<!--        this.list_participant = data;-->
<!--      });-->
<!--    },-->
<!--    getUser() {-->
<!--      const user = getCredential();-->
<!--      const profile = JSON.parse(user.rawProfile);-->
<!--      profile.roles.forEach((v, i) => {-->
<!--        if (v.name === 'km_manager') {-->
<!--          this.is_km_manager = true;-->
<!--        }-->
<!--      });-->
<!--      this.user = {-->
<!--        id: profile.id,-->
<!--        name: profile.name,-->
<!--        initial: profile.name-->
<!--          .match(/\b(\w)/g)-->
<!--          .join('')-->
<!--          .toUpperCase()-->
<!--      };-->
<!--    },-->
<!--    handleUploadRegister(files, content_type) {-->
<!--      this.uploaded_files = true;-->
<!--      const config = {-->
<!--        headers: {-->
<!--          'content-type': 'multipart/form-data'-->
<!--        }-->
<!--      };-->
<!--      const detail_files = [];-->
<!--      files.forEach((v, i, a) => {-->
<!--        const formData = new FormData();-->
<!--        formData.append('file[]', files[i]);-->
<!--        axios-->
<!--          .post('./api/api/file', formData, config)-->
<!--          .then(res => {-->
<!--            const response = res.data.data[0];-->
<!--            if (res.data.message === 'OK') {-->
<!--              detail_files.push(-->
<!--                { file: response }-->
<!--                // { id: response.id, filename: response.filename.split('/').pop(), filetype: response.filemime, filesize: humanStorageSize(response.filesize) }-->
<!--              );-->
<!--              if (files.length === i + 1) {-->
<!--                this.uploaded_files = false;-->
<!--                this.$refs.uploader.reset();-->
<!--                this.finish_files_register = detail_files;-->
<!--              }-->
<!--            }-->
<!--          })-->
<!--          .catch(error => {-->
<!--            console.log(error.response);-->
<!--          });-->
<!--      });-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style lang="sass" scoped>-->
<!--.title-outer-card-left-->
<!--  font-size: 20px-->
<!--  font-weight: bold-->

<!--.title-outer-card-right-->
<!--  font-size: 20px-->

<!--.point-info-->
<!--  padding: 4px 8px 4px 9px-->
<!--  text-align: center-->
<!--  background: #EFFFEA-->
<!--  border-radius: 4px-->
<!--  color: #56B635-->
<!--  width: auto !important-->

<!--.list-true-->
<!--  background-color: #EFFFEA-->
<!--  border-radius: 4px-->

<!--.list-false-->
<!--  background-color: #FFF1F4-->
<!--  border-radius: 4px-->
<!--</style>-->



<!--branch dewi-event-->
<!--<template>-->
<!--  <div class="q-py-md q-pa-none items-start">-->
<!--    <div class="row q-pb-md">-->
<!--      <div class="col-8 kmp-font-lg kmp-font-bold">Event</div>-->
<!--      <div class="col-4"></div>-->
<!--    </div>-->
<!--    &lt;!&ndash; <q-card class="my-card">-->
<!--      <q-card-section class="row items-center">-->
<!--        <div class="row full-width q-px-none">-->
<!--          <div class="col-4 q-pl-sm">-->
<!--            <div class="kmp-font-sm">Kamis</div>-->
<!--            <div class="kmp-font-hg kmp-font-lh-1">30</div>-->
<!--            <div class="kmp-font-sm">Desember 2021</div>-->
<!--          </div>-->
<!--          <div class="col-8">-->
<!--            <div class="kmp-bg-color-1 q-pa-md kmp-rounded">-->
<!--              <div class="kmp-font-sm kmp-text-grey-1">30 Desember 2021</div>-->
<!--              <div-->
<!--                class="kmp-bg-color-3 q-py-xs q-px-sm kmp-rounded text-white"-->
<!--              >-->
<!--                <div class="row">-->
<!--                  <div class="col-2">10:00</div>-->
<!--                  <div class="col-10">Launching Smart KPK</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--    </q-card> &ndash;&gt;-->
<!--    <q-card-->
<!--      class="my-card q-mt-md"-->
<!--      v-for="(item, index) in events"-->
<!--      :key="index"-->
<!--    >-->
<!--      <q-card-section class="row items-center">-->
<!--        <div class="row full-width q-px-none">-->
<!--          <div class="col-4">-->
<!--            <div v-if="item.schedule.length > 1">-->
<!--              <div class="row text-center">-->
<!--                <div class="col-4">-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{ parseDate(item.schedule[0].date_start, 'dddd') }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-hg kmp-font-lh-1">-->
<!--                    {{ parseDate(item.schedule[0].date_start, 'DD') }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{ parseDate(item.schedule[0].date_start, 'MMMM YYYY') }}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <div class="kmp-font-hg kmp-font-lh-1 q-mt-md">-->
<!--                    - -->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{-->
<!--                      parseDate(-->
<!--                        item.schedule[item.schedule.length - 1].date_start,-->
<!--                        'dddd'-->
<!--                      )-->
<!--                    }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-hg kmp-font-lh-1">-->
<!--                    {{-->
<!--                      parseDate(-->
<!--                        item.schedule[item.schedule.length - 1].date_start,-->
<!--                        'DD'-->
<!--                      )-->
<!--                    }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{-->
<!--                      parseDate(-->
<!--                        item.schedule[item.schedule.length - 1].date_start,-->
<!--                        'MMMM YYYY'-->
<!--                      )-->
<!--                    }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-else>-->
<!--              <div class="col-3 text-center">-->
<!--                <div class="kmp-font-sm">-->
<!--                  {{ parseDate(item.schedule[0].date_start, 'dddd') }}-->
<!--                </div>-->
<!--                <div class="kmp-font-hg kmp-font-lh-1">-->
<!--                  {{ parseDate(item.schedule[0].date_start, 'DD') }}-->
<!--                </div>-->
<!--                <div class="kmp-font-sm">-->
<!--                  {{ parseDate(item.schedule[0].date_start, 'MMMM YYYY') }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-8">-->
<!--            <a @click="openModalDetail(item)">-->
<!--              <div class="kmp-bg-color-1 q-pa-md kmp-rounded">-->
<!--                <div-->
<!--                  class="kmp-bg-color-3 q-py-xs q-px-sm kmp-rounded text-white"-->
<!--                >-->
<!--                  {{ item.name }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </a>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--    </q-card>-->
<!--    <q-card-->
<!--      class="my-card q-mt-md"-->
<!--      v-for="(item, index) in post_events"-->
<!--      :key="index"-->
<!--    >-->
<!--      <q-card-section class="row items-center">-->
<!--        <div class="row full-width q-px-none">-->
<!--          <div class="col-4">-->
<!--            &lt;!&ndash; <div v-if="item.schedule.length > 1">-->
<!--              <div class="row text-center">-->
<!--                <div class="col-4">-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{ parseDate(item.schedule[0].date_start, 'dddd') }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-hg kmp-font-lh-1">-->
<!--                    {{ parseDate(item.schedule[0].date_start, 'DD') }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{ parseDate(item.schedule[0].date_start, 'MMMM YYYY') }}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <div class="kmp-font-hg kmp-font-lh-1 q-mt-md">-->
<!--                    - -->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{-->
<!--                      parseDate(-->
<!--                        item.schedule[item.schedule.length - 1].date_start,-->
<!--                        'dddd'-->
<!--                      )-->
<!--                    }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-hg kmp-font-lh-1">-->
<!--                    {{-->
<!--                      parseDate(-->
<!--                        item.schedule[item.schedule.length - 1].date_start,-->
<!--                        'DD'-->
<!--                      )-->
<!--                    }}-->
<!--                  </div>-->
<!--                  <div class="kmp-font-sm">-->
<!--                    {{-->
<!--                      parseDate(-->
<!--                        item.schedule[item.schedule.length - 1].date_start,-->
<!--                        'MMMM YYYY'-->
<!--                      )-->
<!--                    }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div> &ndash;&gt;-->
<!--            <div>-->
<!--              <div class="col-3 text-center">-->
<!--                <div class="kmp-font-sm">-->
<!--                  {{ parseDate(item.start_date, 'dddd') }}-->
<!--                </div>-->
<!--                <div class="kmp-font-hg kmp-font-lh-1">-->
<!--                  {{ parseDate(item.start_date, 'DD') }}-->
<!--                </div>-->
<!--                <div class="kmp-font-sm">-->
<!--                  {{ parseDate(item.start_date, 'MMMM YYYY') }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-8">-->
<!--            <a>-->
<!--              <div class="kmp-bg-color-1 q-pa-md kmp-rounded">-->
<!--                <div-->
<!--                  class="kmp-bg-color-3 q-py-xs q-px-sm kmp-rounded text-white"-->
<!--                >-->
<!--                  {{ item.name }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </a>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--    </q-card>-->
<!--    <q-dialog v-model="modal_detail_training" persistent>-->
<!--      <q-card style="min-width: 500px" class="q-py-md q-px-sm">-->
<!--        <q-card-section>-->
<!--          <q-icon-->
<!--            name="close"-->
<!--            size="24px"-->
<!--            class="text-neutral float-right"-->
<!--            v-close-popup-->
<!--          />-->
<!--          <div class="text-h6">Training Detail</div>-->
<!--        </q-card-section>-->
<!--        <div>-->
<!--          <q-card-section class="q-pt-none" v-if="isLoadingDetail">-->
<!--            <q-skeleton width="150px" height="25px" />-->
<!--          </q-card-section>-->
<!--          <q-card-section class="q-pt-none" v-else>-->
<!--            <div class="text-neutral">-->
<!--              <b>{{ this.training_name }}</b>-->
<!--            </div>-->
<!--          </q-card-section>-->
<!--        </div>-->
<!--        <div>-->
<!--          <q-card-section class="q-pt-none" v-if="isLoadingDetail">-->
<!--            <q-skeleton height="100px" />-->
<!--          </q-card-section>-->
<!--          <q-card-section class="q-pt-none" v-else>-->
<!--            <div class="text-neutral">{{ this.training_description }}</div>-->
<!--          </q-card-section>-->
<!--        </div>-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <table class="text-neutral">-->
<!--            <tr>-->
<!--              <td width="160px">-->
<!--                <q-icon name="face" size="18px" />-->
<!--                Provider-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div class="text-neutral">: {{ this.provider }}</div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>-->
<!--                <q-icon name="event" size="18px" />-->
<!--                Date-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div class="text-neutral">: {{ this.training_date }}</div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>-->
<!--                <q-icon name="event" size="18px" />-->
<!--                Metode Pelatihan-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div class="text-neutral">: {{ this.training_method }}</div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>-->
<!--                <q-icon name="location_on" size="18px" />-->
<!--                Location-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div class="text-neutral">: {{ this.locations }}</div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td>-->
<!--                <q-icon name="groups" size="18px" />-->
<!--                Quota-->
<!--              </td>-->
<!--              <td>-->
<!--                <div v-if="isLoadingDetail">-->
<!--                  <div class="row">-->
<!--                    : &nbsp; <q-skeleton width="150px" height="25px" />-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <div v-if="this.total_participant != 0">-->
<!--                    <div class="text-neutral">-->
<!--                      : {{ this.maximun_capacity }} ( Remaining Quota-->
<!--                      {{ this.maximun_capacity - this.total_participant }} )-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div v-else>-->
<!--                    <div class="text-neutral">-->
<!--                      : {{ this.maximun_capacity }} ( Remaining Quota-->
<!--                      {{ this.maximun_capacity }} )-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </td>-->
<!--            </tr>-->
<!--          </table>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        <div>-->
<!--          <q-card-section class="q-pt-none">-->
<!--            <div class="text-neutral q-mt-sm">-->
<!--              <b>Schedule list</b>-->
<!--            </div>-->
<!--          </q-card-section>-->
<!--        </div>-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <div-->
<!--            v-for="(item, index) in list_schedule"-->
<!--            :key="index"-->
<!--            class="row q-gutter-sm items-center"-->
<!--            :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"-->
<!--          >-->
<!--            <q-icon name="event" class="cursor-pointer" size="sm" />-->
<!--            <div class="kmp-font-md kmp-font-bold">-->
<!--              {{ parseDate(item.date_start) }}-->
<!--              <div-->
<!--                class="kmp-font-normal"-->
<!--                v-if="item.time_start && item.time_end"-->
<!--              >-->
<!--                {{-->
<!--                  `${parseTime(item.time_start)} - ${parseTime(item.time_end)}`-->
<!--                }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        &lt;!&ndash; <q-card-section class="q-pt-md">-->
<!--          <div class="text-title">Narasumber</div>-->
<!--        </q-card-section> &ndash;&gt;-->
<!--        <q-card-section class="q-pt-md">-->
<!--          <div-->
<!--            v-for="(narasumber, index) in this.narasumber_list_detail"-->
<!--            class="row q-mb-xs"-->
<!--            :key="index"-->
<!--          >-->
<!--            <div class="col-8">-->
<!--              <div class="text-neutral">-->
<!--                <span-->
<!--                  ><q-badge color="blue" rounded class="q-pa-xd"-->
<!--                    ><q-avatar-->
<!--                      size="sm"-->
<!--                      class="q-mr-xs"-->
<!--                      color="primary"-->
<!--                      text-color="white"-->
<!--                      >{{-->
<!--                        narasumber.name-->
<!--                          .match(/\b(\w)/g)-->
<!--                          .join('')-->
<!--                          .toUpperCase()-->
<!--                      }}</q-avatar-->
<!--                    >-->
<!--                    {{ narasumber.name }}</q-badge-->
<!--                  ></span-->
<!--                >-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="col-4 text-right text-neutral">-->
<!--              {{ narasumber.roles }}-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        <q-card-section class="q-pt-md">-->
<!--          <div class="text-title">Related documents</div>-->
<!--        </q-card-section>-->
<!--        <q-list class="q-pl-md q-pr-md">-->
<!--          <div v-for="(item, index) in finish_files_detail" :key="index">-->
<!--            <ListFile-->
<!--              v-if="item.file !== null"-->
<!--              :file="item.file"-->
<!--              :item="item"-->
<!--            />-->
<!--          </div>-->
<!--        </q-list>-->
<!--        <q-separator />-->
<!--        <div class="q-pa-md" v-if="this.total_participant != 0">-->
<!--          <div class="row">-->
<!--            <div v-for="(item, index) in avatar_participant" :key="index">-->
<!--              <q-avatar-->
<!--                size="24px"-->
<!--                style="margin-left:-5px"-->
<!--                color="primary"-->
<!--                text-color="white"-->
<!--              >-->
<!--                <span v-if="item.img != null"><img :src="item.img"/></span>-->
<!--                <span v-else>{{-->
<!--                  item.inisial-->
<!--                    .match(/\b(\w)/g)-->
<!--                    .join('')-->
<!--                    .toUpperCase()-->
<!--                }}</span>-->
<!--              </q-avatar>-->
<!--            </div>-->
<!--            <div-->
<!--              class="cursor-pointer"-->
<!--              @click="handleGetOtherParticipantRegistered"-->
<!--            >-->
<!--              &lt;!&ndash; <div class="text-weight-bold">participants</div> &ndash;&gt;-->
<!--              <span class="text-grey-7 q-mr-sm text-weight-bold q-ml-xs">{{-->
<!--                this.total_participant-->
<!--              }}</span>-->
<!--              <span class="text-grey-7 q-mr-sm text-weight">{{-->
<!--                this.information_participant-->
<!--              }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <q-separator />-->
<!--        <div-->
<!--          class="q-pa-md"-->
<!--          v-if="user.id == 1 && this.list_participant_pending.length != 0"-->
<!--        >-->
<!--          <div class="row q-mb-md">waiting for approval</div>-->
<!--          <div class="row">-->
<!--            <div class="table">-->
<!--              <tr-->
<!--                v-for="(item, index) in list_participant_pending"-->
<!--                :key="index"-->
<!--                :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"-->
<!--                style="height:30px"-->
<!--              >-->
<!--                <td style="width:500px">-->
<!--                  <q-avatar color="primary" text-color="white" size="25px">{{-->
<!--                    item.user.name-->
<!--                      .match(/\b(\w)/g)-->
<!--                      .join('')-->
<!--                      .toUpperCase()-->
<!--                  }}</q-avatar>-->
<!--                  <span class="text-grey-7 q-ml-xs text-weight">{{-->
<!--                    item.user.name-->
<!--                  }}</span>-->
<!--                </td>-->
<!--                <td style="padding-right:10px">-->
<!--                  <q-btn-->
<!--                    push-->
<!--                    color="green"-->
<!--                    @click="approvalTraining('approve', item.id, index)"-->
<!--                    round-->
<!--                    icon="done"-->
<!--                    size="xs"-->
<!--                  />-->
<!--                </td>-->
<!--                <td style="padding-right:10px">-->
<!--                  <q-btn-->
<!--                    push-->
<!--                    color="red"-->
<!--                    @click="approvalTraining('decline', item.id, index)"-->
<!--                    round-->
<!--                    icon="close"-->
<!--                    size="xs"-->
<!--                  />-->
<!--                </td>-->
<!--              </tr>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <q-separator-->
<!--          v-if="user.id == 1 && this.list_participant_pending.length != 0"-->
<!--        />-->
<!--        <div class="q-mt-md q-mb-md" v-if="is_rsvp">-->
<!--          &lt;!&ndash; <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> &ndash;&gt;-->
<!--          <div class="row">-->
<!--            <div class="col-2">-->
<!--              <span class="text-grey-7 q-mr-sm text-weight-bold q-ml-xs"-->
<!--                >RSVP</span-->
<!--              >-->
<!--            </div>-->
<!--            <div class="col-10" align="right">-->
<!--              <a-->
<!--                href="training/#"-->
<!--                class="text-blue q-pr-md text-weight-bold"-->
<!--                style="text-decoration:none"-->
<!--                >Yes</a-->
<!--              >-->
<!--              <a-->
<!--                href="training/#"-->
<!--                class="text-blue q-pr-md text-weight-bold"-->
<!--                style="text-decoration:none"-->
<!--                >No</a-->
<!--              >-->
<!--              <a-->
<!--                href="training/#"-->
<!--                class="text-blue q-pr-md text-weight-bold"-->
<!--                style="text-decoration:none"-->
<!--                >Maybe</a-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <q-separator v-if="is_rsvp" />-->
<!--        <div class="q-mt-md">-->
<!--          &lt;!&ndash; <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> &ndash;&gt;-->
<!--          <div class="row">-->
<!--            <div class="col-6"></div>-->
<!--            <div class="col-6" align="right">-->
<!--              <div v-if="user.id != 1 && this.status == 'open_registration'">-->
<!--                <div v-if="this.total_participant == this.maximun_capacity">-->
<!--                  <q-btn-->
<!--                    disabled-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Run out of Quota"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                  />-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                  <q-btn-->
<!--                    v-if="check_participant != 1"-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Register"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                    @click="modal_permission_training = true"-->
<!--                  />-->
<!--                  <q-btn-->
<!--                    v-if="pending == 1"-->
<!--                    disabled-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Waiting For Approval"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                  />-->
<!--                  <q-btn-->
<!--                    v-if="declined == 1"-->
<!--                    disabled-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Request Declined"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                  />-->
<!--                  <q-btn-->
<!--                    v-if="registered == 1"-->
<!--                    disabled-->
<!--                    class="btn-primary-color publish-button"-->
<!--                    label="Request Approved"-->
<!--                    unelevated-->
<!--                    v-close-popup-->
<!--                  />-->
<!--                </div>-->
<!--                &lt;!&ndash; </div> &ndash;&gt;-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
<!--    <fixed-modal-->
<!--      :show="modal_list_participant"-->
<!--      :title="`Participant list - ${list_participant.length}`"-->
<!--      @on-close="modal_list_participant = false"-->
<!--    >-->
<!--      <div-->
<!--        v-for="(item, index) in list_participant"-->
<!--        :key="index"-->
<!--        class="row q-gutter-sm items-center"-->
<!--        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"-->
<!--      >-->
<!--        <q-avatar color="primary" text-color="white" size="30px">{{-->
<!--          item.user.name-->
<!--            .match(/\b(\w)/g)-->
<!--            .join('')-->
<!--            .toUpperCase()-->
<!--        }}</q-avatar>-->
<!--        <div class="kmp-font-md kmp-font-bold">{{ item.user.name }}</div>-->
<!--      </div>-->
<!--    </fixed-modal>-->
<!--    <q-dialog v-model="modal_permission_training" persistent>-->
<!--      <q-card style="min-width: 500px" class="q-py-md q-px-sm">-->
<!--        <q-card-section>-->
<!--          <q-icon-->
<!--            name="close"-->
<!--            size="24px"-->
<!--            class="text-neutral float-right"-->
<!--            v-close-popup-->
<!--          />-->
<!--          <div class="text-h6">Register Training</div>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        <q-card-section class="q-pt-md">-->
<!--          <div class="text-title">Attachments</div>-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <q-uploader-->
<!--            :url="handleUploadRegister"-->
<!--            ref="uploader"-->
<!--            label="Individual upload"-->
<!--            multiple-->
<!--            batch-->
<!--            auto-upload-->
<!--            style="width: 100%"-->
<!--            class="shadow-0 q-uploader&#45;&#45;bordered kmp-rounded"-->
<!--          />-->
<!--        </q-card-section>-->

<!--        <q-separator spaced />-->

<!--        <q-card-section class="q-pt-none">-->
<!--          <div-->
<!--            class="font-weight-bold q-mb-sm q-mt-md"-->
<!--            v-if="finish_files_register.length > 0"-->
<!--          >-->
<!--            {{ finish_files_register.length }} Files Uploaded-->
<!--          </div>-->
<!--          <q-linear-progress-->
<!--            v-if="uploaded_files"-->
<!--            indeterminate-->
<!--            rounded-->
<!--            color="negative"-->
<!--            class="q-my-sm"-->
<!--          />-->
<!--          <q-list>-->
<!--            <div v-for="(item, index) in finish_files_register" :key="index">-->
<!--              <ListFile-->
<!--                v-if="item.file !== null"-->
<!--                :file="item.file"-->
<!--                :item="item"-->
<!--                manage="true"-->
<!--                @delete_knowledge="handleDelete(item.file.id, 'file', index)"-->
<!--              />-->
<!--            </div>-->
<!--          </q-list>-->
<!--        </q-card-section>-->

<!--        <q-card-actions align="right" class="text-primary">-->
<!--          &lt;!&ndash; <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> &ndash;&gt;-->
<!--          <q-btn-->
<!--            class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--            label="Register"-->
<!--            unelevated-->
<!--            v-close-popup-->
<!--            @click="registerTraining()"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--    </q-dialog>-->

<!--    <q-dialog v-model="modal_decline" persistent>-->
<!--      <q-card style="min-width: 500px" class="q-py-md q-px-sm">-->
<!--        <q-card-section>-->
<!--          <q-icon-->
<!--            name="close"-->
<!--            size="24px"-->
<!--            class="text-neutral float-right"-->
<!--            v-close-popup-->
<!--          />-->
<!--          <div class="text-h6">Reason For Decline</div>-->
<!--        </q-card-section>-->
<!--        <q-separator />-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <q-input-->
<!--            outlined-->
<!--            dense-->
<!--            v-model="alasan_ditolak"-->
<!--            type="textarea"-->
<!--            class=""-->
<!--          ></q-input>-->
<!--        </q-card-section>-->

<!--        <q-separator spaced />-->

<!--        <q-card-actions align="right" class="text-primary">-->
<!--          &lt;!&ndash; <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> &ndash;&gt;-->
<!--          <q-btn-->
<!--            class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--            label="Send"-->
<!--            unelevated-->
<!--            v-close-popup-->
<!--            @click="declinedTraining()"-->
<!--            :disabled="!alasan_ditolak"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { axios } from 'boot/axios';-->
<!--import { getCredential } from 'src/lib/storage';-->
<!--import { Notify } from 'quasar';-->
<!--import { required } from 'vuelidate/lib/validators';-->
<!--import moment from 'moment';-->
<!--import FixedModal from 'components/common/FixedModal';-->
<!--import ListFile from 'components/common/ListFile';-->
<!--import {-->
<!--  trainingEvents,-->
<!--  trainingDetail,-->
<!--  trainingParticipantGetOtherByType,-->
<!--  trainingRegister,-->
<!--  trainingApproval,-->
<!--  listEvents-->
<!--} from '../lib/api';-->

<!--export default {-->
<!--  components: { ListFile, FixedModal },-->
<!--  data() {-->
<!--    return {-->
<!--      modal_detail_training: false,-->
<!--      modal_list_participant: false,-->
<!--      modal_list_schedule: false,-->
<!--      answer: 'Jawa',-->
<!--      answerBool: '',-->
<!--      group: '',-->
<!--      options: [-->
<!--        { label: 'Java', value: 'Java', selected: false },-->
<!--        { label: 'Jawa', value: 'Jawa', selected: false },-->
<!--        { label: 'Delphi', value: 'Delphi', selected: false },-->
<!--        { label: 'Cobol', value: 'Cobol', selected: false }-->
<!--      ],-->
<!--      training_name: '',-->
<!--      isLoadingDetail: 1,-->
<!--      training_description: '',-->
<!--      provider: '',-->
<!--      locations: '',-->
<!--      training_method: '',-->

<!--      list_schedule: [],-->
<!--      list_participant: [],-->
<!--      finish_files_detail: [],-->
<!--      narasumber_list_detail: [],-->
<!--      total_participant: '',-->
<!--      information_participant: '',-->
<!--      avatar_participant: [],-->
<!--      is_rsvp: 0,-->
<!--      list_participant_pending: [],-->
<!--      id_pending: '',-->
<!--      alasan_ditolak: '',-->
<!--      status: '',-->
<!--      events: [],-->
<!--      registered: 0,-->
<!--      pending: 0,-->
<!--      declined: 0,-->
<!--      modal_permission_training: false,-->
<!--      modal_decline: false,-->
<!--      check_participant: 0,-->
<!--      finish_files_register: [],-->
<!--      uploaded_files: false,-->
<!--      user: {-->
<!--        id: '',-->
<!--        name: '',-->
<!--        initial: ''-->
<!--      },-->
<!--      post_events: []-->
<!--    };-->
<!--  },-->
<!--  validations: {-->
<!--    group: {-->
<!--      required-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getListEvents();-->
<!--    this.getListPostEvents();-->
<!--    this.getUser();-->
<!--  },-->
<!--  methods: {-->
<!--    openModalDetail(training = null) {-->
<!--      this.isLoadingDetail = true;-->
<!--      trainingDetail(training.id).then(response => {-->
<!--        this.training_id = training.id;-->
<!--        this.isLoadingDetail = false;-->
<!--        this.training_name = training.name;-->
<!--        this.training_description = training.description;-->
<!--        this.training_type = training.training_type;-->
<!--        this.training_method = training.training_method;-->
<!--        this.locations = training.locations;-->
<!--        this.status = training.status;-->
<!--        this.provider = training.provider;-->
<!--        this.all_day = training.all_day;-->
<!--        this.is_private = training.is_private;-->
<!--        this.maximun_capacity = training.maximun_capacity;-->
<!--        this.recuring = training.recuring;-->
<!--        this.narasumber_list_detail = [];-->
<!--        response.data.expertise.forEach((v, i) => {-->
<!--          this.narasumber_list_detail.push({-->
<!--            users_id: v.users_id,-->
<!--            name: v.user.name,-->
<!--            roles: v.expert_type-->
<!--          });-->
<!--        });-->
<!--        this.finish_files_detail = [];-->
<!--        response.data.files.forEach((v, i) => {-->
<!--          this.finish_files_detail.push({-->
<!--            file: {-->
<!--              filemime: v.filemime,-->
<!--              filename: v.filename,-->
<!--              filesize: v.filesize,-->
<!--              path: v.path-->
<!--            }-->
<!--          });-->
<!--        });-->
<!--        this.avatar_participant = [];-->
<!--        this.total_participant = response.data.total_participant;-->
<!--        this.information_participant = response.data.information_participant;-->
<!--        this.avatar_participant = response.data.avatar_participant;-->
<!--        this.registered = response.data.registered;-->
<!--        this.pending = response.data.pending;-->
<!--        this.declined = response.data.declined;-->
<!--        this.check_participant = response.data.check_participant;-->
<!--        this.is_rsvp = response.data.is_rsvp;-->

<!--        const dateStart = training.schedule[0].date_start;-->
<!--        if (training.schedule.length > 1) {-->
<!--          const dateEnd =-->
<!--            training.schedule[training.schedule.length - 1].date_start;-->
<!--          this.training_date = `${dateStart} - ${dateEnd}`;-->
<!--        } else {-->
<!--          this.training_date = dateStart;-->
<!--        }-->
<!--        this.list_schedule = [];-->
<!--        const {-->
<!--          data: { schedule }-->
<!--        } = response;-->

<!--        this.list_schedule = schedule;-->
<!--      });-->
<!--      this.training_id = training.id;-->
<!--      this.list_participant_pending = [];-->
<!--      trainingParticipantGetOtherByType(this.training_id, {-->
<!--        participant_type: 'pending'-->
<!--      }).then(response => {-->
<!--        const { data } = response;-->

<!--        this.list_participant_pending = data;-->
<!--      });-->
<!--      this.modal_detail_training = true;-->
<!--    },-->
<!--    getListEvents() {-->
<!--      trainingEvents().then(response => {-->
<!--        const hasil = response.data;-->
<!--        this.events = hasil;-->
<!--        console.log(hasil);-->
<!--      });-->
<!--    },-->
<!--    getListPostEvents() {-->
<!--      listEvents().then(response => {-->
<!--        const hasil = response.data;-->
<!--        this.post_events = hasil;-->
<!--        console.log(hasil);-->
<!--      });-->
<!--    },-->
<!--    parseDate(date, format = 'DD MMMM YYYY') {-->
<!--      return moment(date).format(format);-->
<!--    },-->
<!--    parseTime(time) {-->
<!--      const sTime = time.split(':');-->
<!--      return `${sTime[0]}:${sTime[1]}`;-->
<!--    },-->
<!--    hendleSave() {-->
<!--      if (this.$v.$invalid) {-->
<!--        Notify.create({-->
<!--          message: 'Please choice one!',-->
<!--          timeout: 1000,-->
<!--          type: 'negative',-->
<!--          color: 'negative',-->
<!--          icon: 'warning'-->
<!--        });-->
<!--      } else {-->
<!--        this.options.forEach(f => {-->
<!--          if (f.value === this.group) {-->
<!--            f.selected = true;-->
<!--          } else {-->
<!--            f.selected = false;-->
<!--          }-->
<!--        });-->
<!--        const choice = this.options.filter(f => {-->
<!--          return f.selected === true;-->
<!--        });-->
<!--        if (choice[0].value === this.answer) {-->
<!--          this.answerBool = true;-->
<!--        } else {-->
<!--          this.answerBool = false;-->
<!--        }-->
<!--        Notify.create({-->
<!--          message: 'Thank to join this Quiz!',-->
<!--          timeout: 1000,-->
<!--          type: 'positive',-->
<!--          color: 'positive',-->
<!--          icon: 'check'-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    hendleNext() {-->
<!--      if (this.$v.$invalid) {-->
<!--        Notify.create({-->
<!--          message: 'Please choice one!',-->
<!--          timeout: 1000,-->
<!--          type: 'negative',-->
<!--          color: 'negative',-->
<!--          icon: 'warning'-->
<!--        });-->
<!--      } else {-->
<!--        Notify.create({-->
<!--          message: "Let's get into the next question",-->
<!--          timeout: 1000,-->
<!--          type: 'positive',-->
<!--          color: 'positive',-->
<!--          icon: 'check'-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    registerTraining() {-->
<!--      const group_file = this.finish_files_register.map(item => {-->
<!--        return {-->
<!--          file_id: item.file.id-->
<!--        };-->
<!--      });-->
<!--      if (group_file.length === 0) {-->
<!--        Notify.create({-->
<!--          message: 'Upload file terlebih dahulu sebelum register!',-->
<!--          timeout: 3000,-->
<!--          type: 'positive',-->
<!--          color: 'warning',-->
<!--          icon: 'check'-->
<!--        });-->
<!--        return;-->
<!--      }-->
<!--      const data = {-->
<!--        enabled: true,-->
<!--        file: group_file-->
<!--      };-->
<!--      trainingRegister(this.training_id, data).then(response => {-->
<!--        this.$q.notify({-->
<!--          message: 'Successfull register training',-->
<!--          color: 'blue'-->
<!--        });-->
<!--      });-->
<!--    },-->
<!--    declinedTraining() {-->
<!--      console.log(this.alasan_ditolak);-->
<!--      const data = {-->
<!--        participant_type: 'declined',-->
<!--        alasan_ditolak: this.alasan_ditolak-->
<!--      };-->
<!--      trainingApproval(this.id_pending, data).then(result => {-->
<!--        const data_approval = result.data;-->
<!--        if (data_approval) {-->
<!--          this.$q.notify({-->
<!--            message: 'Success Declined',-->
<!--            color: 'blue'-->
<!--          });-->
<!--          trainingDetail(this.training_id).then(response => {-->
<!--            const data_participant = response.data;-->
<!--            console.log(data_participant.total_participant);-->
<!--            this.total_participant = data_participant.total_participant;-->
<!--            this.information_participant =-->
<!--              response.data.information_participant;-->
<!--            this.avatar_participant = response.data.avatar_participant;-->
<!--          });-->
<!--          this.list_participant_pending.splice(this.index, 1);-->
<!--        }-->
<!--      });-->
<!--      this.alasan_ditolak = null;-->
<!--    },-->
<!--    approvalTraining(selected, id, index) {-->
<!--      console.log(this.created_by);-->
<!--      let participant_type = '';-->
<!--      if (selected === 'approve') {-->
<!--        participant_type = 'registered';-->
<!--      } else {-->
<!--        this.modal_decline = true;-->
<!--        this.id_pending = id;-->
<!--        this.index = index;-->
<!--        return;-->
<!--      }-->
<!--      const data = {-->
<!--        participant_type-->
<!--      };-->
<!--      trainingApproval(id, data).then(result => {-->
<!--        const data_approval = result.data;-->
<!--        if (data_approval) {-->
<!--          this.$q.notify({-->
<!--            message: 'Success Approved',-->
<!--            color: 'blue'-->
<!--          });-->
<!--          trainingDetail(this.training_id).then(response => {-->
<!--            const data_participant = response.data;-->
<!--            console.log(data_participant.total_participant);-->
<!--            this.total_participant = data_participant.total_participant;-->
<!--            this.information_participant =-->
<!--              response.data.information_participant;-->
<!--            this.avatar_participant = response.data.avatar_participant;-->
<!--          });-->
<!--          this.list_participant_pending.splice(index, 1);-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    handleGetOtherParticipantRegistered() {-->
<!--      this.list_participant = [];-->
<!--      this.modal_list_participant = true;-->
<!--      trainingParticipantGetOtherByType(this.training_id, {-->
<!--        participant_type: 'registered'-->
<!--      }).then(response => {-->
<!--        const { data } = response;-->

<!--        this.list_participant = data;-->
<!--      });-->
<!--    },-->
<!--    getUser() {-->
<!--      const user = getCredential();-->
<!--      const profile = JSON.parse(user.rawProfile);-->
<!--      this.user = {-->
<!--        id: profile.id,-->
<!--        name: profile.name,-->
<!--        initial: profile.name-->
<!--          .match(/\b(\w)/g)-->
<!--          .join('')-->
<!--          .toUpperCase()-->
<!--      };-->
<!--    },-->
<!--    handleUploadRegister(files, content_type) {-->
<!--      this.uploaded_files = true;-->
<!--      const config = {-->
<!--        headers: {-->
<!--          'content-type': 'multipart/form-data'-->
<!--        }-->
<!--      };-->
<!--      const detail_files = [];-->
<!--      files.forEach((v, i, a) => {-->
<!--        const formData = new FormData();-->
<!--        formData.append('file[]', files[i]);-->
<!--        axios-->
<!--          .post('./api/api/file', formData, config)-->
<!--          .then(res => {-->
<!--            const response = res.data.data[0];-->
<!--            if (res.data.message === 'OK') {-->
<!--              detail_files.push(-->
<!--                { file: response }-->
<!--                // { id: response.id, filename: response.filename.split('/').pop(), filetype: response.filemime, filesize: humanStorageSize(response.filesize) }-->
<!--              );-->
<!--              if (files.length === i + 1) {-->
<!--                this.uploaded_files = false;-->
<!--                this.$refs.uploader.reset();-->
<!--                this.finish_files_register = detail_files;-->
<!--              }-->
<!--            }-->
<!--          })-->
<!--          .catch(error => {-->
<!--            console.log(error.response);-->
<!--          });-->
<!--      });-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style lang="sass" scoped>-->
<!--.title-outer-card-left-->
<!--  font-size: 20px-->
<!--  font-weight: bold-->

<!--.title-outer-card-right-->
<!--  font-size: 20px-->

<!--.point-info-->
<!--  padding: 4px 8px 4px 9px-->
<!--  text-align: center-->
<!--  background: #EFFFEA-->
<!--  border-radius: 4px-->
<!--  color: #56B635-->
<!--  width: auto !important-->

<!--.list-true-->
<!--  background-color: #EFFFEA-->
<!--  border-radius: 4px-->

<!--.list-false-->
<!--  background-color: #FFF1F4-->
<!--  border-radius: 4px-->
<!--</style>-->
