<!-- eslint-disable prefer-template -->
<template>
  <div>
    <q-card class="q-mb-md kmp-new-font"
    >
    <q-card-section>
          <div class="row justify-between q-mb-md">
            <q-item-label class="kmp-line-125 text-left kmp-lg-text kmp-bold-text kmp-black-text">Event Hari Ini</q-item-label>
            <q-item-label class="kmp-line-125 text-right kmp-sm-text kmp-bold-text kmp-blue-text cursor-pointer link-underscore" @click="modal_event = true">See all</q-item-label>
          </div>
          <q-item class="q-pa-none">
            <q-item-section>
              <div class="row full-width q-px-none">
                <div class="col-3">
                  <div class="kmp-black-text">
                    <div class="col-3 text-center">
                      <div class="kmp-line-17 text-left kmp-md-text kmp-normal-text">
                        Nov 10
                      </div>
                      <div class="kmp-line-17 text-left kmp-sm-text kmp-bold-text">
                        Hari ini
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-9">
                  <div style="border-left: 3px solid var(--primary-500, #2C8ED3);background: var(--opacity-primary-10, rgba(44, 142, 211, 0.10));border-radius: var(--Spacing-4, 4px);" class="text-left q-pa-sm kmp-primary-text">
                      <div class="kmp-line-17 kmp-sm-text kmp-bold-text">
                        09.30 - 11.30
                      </div>
                      <div class="kmp-line-17 kmp-sm-text kmp-normal-text">
                        Jumat Berilmu bersama Dit. PLPM : Business Judgment Rule
                      </div>
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
          <!-- <q-item-label class="q-py-md kmp-line-125 kmp-md-text text-center kmp-normal-text kmp-gray-1-text">No data can be shown</q-item-label> -->
        </q-card-section>
    </q-card>
  <q-dialog v-model="modal_event" position="bottom">
    <q-card  class="kmp-new-font" style="max-width: 1200px !important; width: 100% !important;">
      <q-card-section class="row justify-between">
        <div></div>
        <div class="kmp-black-text kmp-line-120 kmp-xl-text kmp-bold-text items-center textcenter justify-center">Kalender Event</div>
        <div>
          <q-btn flat round color="#4F5A70" icon="fas fa-times" size="sm" class="" @click="modal_event = false" />
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section class="q-py-sm" style="padding-left: 40px;padding-right: 40px;">
        <div class="row justify-between">
          <div class="col" style="  display: flex;align-items: center;">
            <q-btn size="md" class="button-calendar   kmp-bold-text kmp-md-text kmp-line-125" flat label="Today" @click="todayView" no-caps />
            <q-btn size="md" class="button-calendar  kmp-bold-text kmp-md-text kmp-line-125 q-mx-sm" flat icon="chevron_left" @click="calendarPrev" />
            <q-btn size="md" class="button-calendar  kmp-bold-text kmp-md-text kmp-line-125" icon="chevron_right" flat @click="calendarNext"></q-btn>
            <div class="q-ml-lg kmp-line-120 text-left kmp-bold-text kmp-black-text" style="font-size: 18px;" v-if="status === false">{{ month }} {{ year }}</div>
            <div class="q-ml-lg kmp-line-120 text-left kmp-bold-text kmp-black-text" style="font-size: 18px;" v-else>{{ date }}</div>
          </div>
          <div class="col" style="max-width: 112px;">
            <q-select
            filled
            borderless
            v-model="model"
            :options="options"
            emit-value
            class="select-calendar"
            no-caps
            size="sm"
            dense
            >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
                class="select-knowledge-item"
                active-class="select-knowledge-item-active"
              >
                <q-item-section>
                  <q-item-label class="kmp-black-text kmp-line-125 kmp-md-text kmp-normal-text">{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            </q-select>
          </div>
        </div>
      </q-card-section>
      <q-card-section style="padding-left: 40px;padding-right: 40px;padding-bottom: 40px;padding-top: 0;" v-if="status === false">
          <q-calendar
            ref="calendar"
            :day-height="113"
            v-model="selectedDate"
            view="month"
            locale="en-us"
            animated
            short-weekday-label
            @change="onChange"
            class="calendar-month"
          >
          <template #day="{ timestamp }">
            <template v-for="(event, index) in getEvents(timestamp.date)" :key="index">
              <q-badge
                style="width: 100%; cursor: pointer; min-height: 24px; border-radius: 0; padding: 4px 12px; margin-bottom: 2px;"
                :style="badgeStyles(event, index)"
                :class="badgeClasses(event)"
                class="kmp-black-text kmp-sm-text"
                @click="modal_detail_event = true"
              >
                <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>
                <span style="font-weight: 600;">{{ event.times }}</span>&nbsp;
                <span>{{ event.details }}</span>
              </q-badge>
            </template>
            <q-badge
              v-if="events.filter(item => item.date === events.date).length > 2"
              style="background: blue; width: 100%; cursor: pointer; min-height: 24px; border-radius: 0; padding: 4px 12px; margin-bottom: 2px;"
              class="kmp-black-text kmp-sm-text"
              @click="modal_detail_event = true"
            >
              <span style="font-weight: 600;">+ 2</span>
            </q-badge>
          </template>

        </q-calendar>
      </q-card-section>
      <q-card-section style="padding-left: 40px;padding-right: 40px;padding-bottom: 40px;padding-top: 0;" v-else>
        <q-calendar
          v-model="selectedDate"
          view="day"
          locale="en-us"
          :interval-start="8"
          :interval-count="10"
          bordered
          :interval-height="50"
          :hide-header="true"
          ref="calendar"
          @change="onChange"
          class="kmp-gray-1 kmp-md-text kmp-normal-text kmp-line-125px"
        >
        <template #day-container="{ /* timestamp */ }">
        <div class="day-view-current-time-indicator" :style="style" />
        <div class="day-view-current-time-line" :style="style" />
      </template>
    </q-calendar>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="modal_detail_event" persistent>
    <q-card class="kmp-new-font">
      <q-card-section class="q-pa-md">
        <q-icon
          name="close"
          size="20px"
          class="text-neutral float-right"
          v-close-popup
        />
        <div class="kmp-lg-text kmp-bold-text kmp-line-125">Event Summary</div>
      </q-card-section>
      <q-separator />
      <div class="q-pa-lg">
        <q-card-section class="q-pa-none q-mb-md">
            <q-img src="../../assets/images/v2/event-example.png" style="max-width: 100%;"/>
        </q-card-section>
        <q-card-section class="q-pa-none q-mb-md">
          <div class="kmp-lg-text kmp-bold-text kmp-line-125 kmp-black-text q-mt-sm q-mb-xs">
            Morning Tea bersama DMI: Business Judgment Rule
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none q-mb-md">
          <div class="kmp-md-text kmp-normal-text kmp-line-125 kmp-gray-text">
            <q-icon name="event" class="check-icon q-mr-sm" size="16px" style=""/>
            13 Nov 2023
          </div>
        </q-card-section>
        <div>
          <q-card-section class="q-pa-none q-mb-md">
            <div class="kmp-md-text kmp-normal-text kmp-line-125 kmp-gray-text">
              <q-icon name="access_time" class="check-icon q-mr-sm" size="16px" style=""/>
              08:00 - 10:00 WIB
            </div>
          </q-card-section>
        </div>
        <div>
          <q-card-section class="q-pa-none q-mb-md">
            <div class="kmp-md-text kmp-normal-text kmp-line-125 kmp-gray-text">
              <q-icon name="pin_drop" class="check-icon q-mr-sm" size="16px" style=""/>
              Pos Bloc Jakarta, Gedung FIlateli
            </div>
          </q-card-section>
        </div>
        <q-card-section class="q-pa-none q-mb-md">
          <q-item  style="border-radius: 4px;" dense class="q-pa-none q-mb-sm">
            <q-item-section side class="q-pr-sm items-center">
              <q-avatar size="32px">
                <img :src="'https://cdn.quasar.dev/img/boy-avatar.png'">
              </q-avatar>
            </q-item-section>
            <q-item-section class="q-pa-none kmp-black-text">
              <q-item-label class="kmp-xs-text kmp-normal-text kmp-line-125 kmp-gray-text">Created by</q-item-label>
              <q-item-label class="kmp-md-text kmp-bold-text kmp-line-125 kmp-black-text">Rahmat Reza</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section class="q-pa-none">
            <q-btn flat style="border-radius: 6px;background: var(--Opacity-Primary-20, rgba(44, 142, 211, 0.20));width: 100%" no-caps>
              <span class="kmp-primary-text kmp-bold-text kmp-md-text">
                Follow this Question
              </span>
            </q-btn>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
  </div>
</template>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>

<script>
import { QCalendar, parseTimestamp, addToDate, parseDate, isBetweenDates } from '@quasar/quasar-ui-qcalendar';
import moment from 'moment';

const CURRENT_DAY = new Date();

function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY);
  newDay.setDate(day);
  const tm = parseDate(newDay);
  return tm.date;
}

export default {
  // eslint-disable-next-line vue/no-unused-components, no-undef
  components: { QCalendar },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      status: false,
      month: '',
      year: '',
      date: '',
      start: undefined,
      dateFormatter: undefined,
      selectedDate: '',
      modal_event: false,
      slide: 'style',
      model: 'Monthly',
      modal_detail_event: false,
      options: [
        {
          label: 'Monthly',
          value: 'Monthly'
        },
        {
          label: 'Daily',
          value: 'Daily'
        }
      ],
      events: [
        {
          times: '10:00',
          details: 'Morning Tea ',
          date: getCurrentDay(1),
          bgcolor: 'var(--Opacity-Accent-Yellow-30, rgba(255, 182, 0, 0.30))'
        },
        {
          times: '10:00',
          details: 'Buy a Cake',
          date: getCurrentDay(2),
          bgcolor: 'var(--Opacity-System-Green-30, rgba(38, 185, 114, 0.30))'
        },
        {
          times: '10:00',
          details: 'Morning Tea ',
          date: getCurrentDay(1),
          bgcolor: 'var(--Opacity-Accent-Yellow-30, rgba(255, 182, 0, 0.30))'
        }
      ],
      currentDate: undefined,
      currentTime: undefined,
      intervalId: null,
      timeStartPos: 0,
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    };
  },
  methods: {
    setCalendar() {
      if (this.model === 'Daily') {
        this.status = true;
      } else {
        this.status = false;
      }
    },
    calendarNext () {
      this.$refs.calendar.next();
    },
    calendarPrev () {
      this.$refs.calendar.prev();
    },
    todayView () {
      this.selectedDate = moment().format('YYYY-MM-DD');
    },
    onChange ({ start }) {
      this.start = start;
      moment.locale('en');
      const namaBulan = moment().month(this.start.month - 1).format('MMMM');
      this.month = namaBulan;
      this.year = this.start.year;
      this.date = moment(this.start.date).format('dddd, DD MMMM YYYY');
    },
    badgeClasses (event, type) {
      // const isHeader = type === 'header';
      return 'kmp-black-text';
      //   'full-width': !isHeader && (!event.side || event.side === 'full'),
      //   'left-side': !isHeader && event.side === 'left',
      //   'right-side': !isHeader && event.side === 'right'
    },
    badgeStyles (event, index) {
      const s = {};
      s['background-color'] = event.bgcolor;
      if (event.bgcolor === 'var(--Opacity-Accent-Yellow-30, rgba(255, 182, 0, 0.30))') {
        s['border-left'] = '5px solid var(--Accent-Yellow, #FFB600)';
      } else {
        s['border-left'] = '5px solid var(--System-Success-Hover, #119656)';
      }
      if (index === 0) {
        s['margin-top'] = '6px';
      }
      return s;
    },
    getEvents(dt) {
      const currentDate = parseTimestamp(dt);
      const events = [];
      for (let i = 0; i < this.events.length; ++i) {
        let added = false;
        if (this.events[i].date === dt) {
          if (this.events[i].time) {
            if (events.length > 0) {
              // check for overlapping times
              // eslint-disable-next-line prefer-template
              const startTime = parseTimestamp(this.events[i].date + ' ' + this.events[i].time);
              const endTime = addToDate(startTime, { minute: this.events[i].duration });
              for (let j = 0; j < events.length; ++j) {
                if (events[j].time) {
                  // eslint-disable-next-line prefer-template
                  const startTime2 = parseTimestamp(events[j].date + ' ' + events[j].time);
                  const endTime2 = addToDate(startTime2, { minute: events[j].duration });
                  if (isBetweenDates(startTime, startTime2, endTime2) || isBetweenDates(endTime, startTime2, endTime2)) {
                    events[j].side = 'left';
                    this.events[i].side = 'right';
                    events.push(this.events[i]);
                    added = true;
                    break;
                  }
                }
              }
            }
          }
          if (!added) {
            this.events[i].side = undefined;
            events.push(this.events[i]);
          }
        } else if (this.events[i].days) {
          // check for overlapping dates
          const startDate = parseTimestamp(this.events[i].date);
          const endDate = addToDate(startDate, { day: this.events[i].days });
          if (this.$refs.calendar.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(this.events[i]);
            added = true;
          }
        }
      }
      return events;
    },
    adjustCurrentTime () {
      const now = new Date();
      const p = parseDate(now);
      this.selectedDate = p.date;
      this.currentTime = p.time;
      this.timeStartPos = this.$refs.calendar.timeStartPos(this.currentTime);
    }
  },
  mounted () {
    this.adjustCurrentTime();
    // now, adjust the time every minute
    this.intervalId = setInterval(() => {
      this.adjustCurrentTime();
    }, 60000);
  },

  beforeUnmount () {
    clearInterval(this.intervalId);
  },
  watch: {
    model() {
      this.setCalendar();
    }
  },
  computed: {
    style () {
      const s = {};
      s.top = '50px';
      return s;
    }
  }
};

</script>
