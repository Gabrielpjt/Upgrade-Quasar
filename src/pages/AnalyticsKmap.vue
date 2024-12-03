<template>
  <q-page>
    <div class="row q-py-lg q-px-lg">
<!--      <div class="col q-pt-lg q-mr-md" style="max-width: 170px">-->
<!--        <AnalyticsMenu/>-->
<!--      </div>-->
      <div class="col">
        <div class="row q-mb-sm items-center">
          <AnalyticsTitle title=""/>
          <q-space/>
          <AnalyticsFilterPeriode :filter="filter"/>
        </div>
        <div class="row q-gutter-md">
          <div class="col">
            <q-card class="q-pa-lg q-mb-md">
              <div class="text-weight-bold q-mb-md" style="font-size: 16px">
                Summary
              </div>
              <q-list>
                <q-item class="q-px-none cursor-pointer q-mb-xs" v-ripple
                v-for="(item,index) in list.summary" :key="index">
                  <q-item-section top avatar style="min-width: 48px" class="q-pa-none">
<!--                    <q-avatar style="background-color: #FFBB56" text-color="white" icon="domain"></q-avatar>-->
                    <div v-if="item.summary === 'Business Process'">
                      <q-icon :name="'article'" size="17px" class="q-mr-sm bp-ico"/>
                    </div>
                    <div v-else-if="item.summary === 'Strategic Activity'">
                      <q-icon :name="'lightbulb'" size="17px" class="q-mr-sm sa-ico"/>
                    </div>
                    <div v-else>
                      <q-icon :name="'content_paste'" size="17px" class="q-mr-sm ck-ico"/>
                    </div>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="kmp-font-md-2 text-grey-7">{{item.summary}}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label class="text-weight-bold">{{item.total_item}} item(s)</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-card>
            <q-card>
              <div class="row q-pa-lg">
                <div class="desktop-only col q-mr-sm q-pa-md cursor-pointer"
                     @click="menu.onClick('explicit')"
                     v-bind:class="menu.selected.value === 'explicit'? 'kmp-chart-on': 'kmp-chart-off'">
                  <div class="kmp-font-sm-2">Total Explicit Knowledge</div>
                  <div class="kmp-font-hg-2 text-weight-bolder">{{ list.explicit.length }}</div>
                </div>
                <div class="desktop-only col q-mx-sm q-pa-md cursor-pointer"
                     @click="menu.onClick('sme')"
                     v-bind:class="menu.selected.value === 'sme'? 'kmp-chart-on': 'kmp-chart-off'">
                  <div class="kmp-font-sm-2">Total Subject Matter Expert</div>
                  <div class="kmp-font-hg-2 text-weight-bolder">{{ list.sme.length }}</div>
                </div>
                <div class="desktop-only col q-mx-sm q-pa-md cursor-pointer"
                     @click="menu.onClick('best-practice')"
                     v-bind:class="menu.selected.value === 'best-practice'? 'kmp-chart-on': 'kmp-chart-off'">
                  <div class="kmp-font-sm-2">The Best Practice</div>
                  <div class="kmp-font-hg-2 text-weight-bolder">{{ list.best_practice.length }}</div>
                </div>
                <div class="desktop-only col q-ml-sm q-pa-md cursor-pointer"
                     @click="menu.onClick('development')"
                     v-bind:class="menu.selected.value === 'development'? 'kmp-chart-on': 'kmp-chart-off'">
                  <div class="kmp-font-sm-2">Total Development Needed</div>
                  <div class="kmp-font-hg-2 text-weight-bolder">{{ list.development.length }}</div>
                </div>
                <div class="mobile-only col-12 q-mr-sm q-pa-md cursor-pointer"
                     @click="menu.onClick('explicit')"
                     v-bind:class="menu.selected.value === 'explicit'? 'kmp-chart-on': 'kmp-chart-off'">
                  <div class="kmp-font-sm-2">Total Explicit Knowledge</div>
                  <div class="kmp-font-hg-2 text-weight-bolder">{{ list.explicit.length }}</div>
                </div>
                <div class="mobile-only col-12 q-mr-sm q-my-sm q-pa-md cursor-pointer"
                     @click="menu.onClick('sme')"
                     v-bind:class="menu.selected.value === 'sme'? 'kmp-chart-on': 'kmp-chart-off'">
                  <div class="kmp-font-sm-2">Total Subject Matter Expert</div>
                  <div class="kmp-font-hg-2 text-weight-bolder">{{ list.sme.length }}</div>
                </div>
                <div class="mobile-only col-12 q-mr-sm q-mb-sm q-pa-md cursor-pointer"
                     @click="menu.onClick('best-practice')"
                     v-bind:class="menu.selected.value === 'best-practice'? 'kmp-chart-on': 'kmp-chart-off'">
                  <div class="kmp-font-sm-2">The Best Practice</div>
                  <div class="kmp-font-hg-2 text-weight-bolder">{{ list.best_practice.length }}</div>
                </div>
                <div class="mobile-only col-12 q-mr-sm q-pa-md cursor-pointer"
                     @click="menu.onClick('development')"
                     v-bind:class="menu.selected.value === 'development'? 'kmp-chart-on': 'kmp-chart-off'">
                  <div class="kmp-font-sm-2">Total Development Needed</div>
                  <div class="kmp-font-hg-2 text-weight-bolder">{{ list.development.length }}</div>
                </div>
              </div>
              <q-separator inset class="q-mx-lg"/>
              <div class="row q-px-lg q-my-md items-center">
                <div class="kmp-font-lg text-weight-medium">
                  List {{menu.selected.label}}
                </div>
                <q-space/>
                <q-input value="" :label="`Search ${menu.selected.label}`" outlined dense style="width: 300px">
                  <template v-slot:append>
<!--                    <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer"/>-->
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </div>

              <AnalyticsListKnowledge v-if="menu.selected.value === 'explicit'" class="q-px-lg q-pb-lg" :data="list.explicit" />
              <AnalyticsListKnowledge v-if="menu.selected.value === 'best-practice'" class="q-px-lg q-pb-lg" :data="list.best_practice" />
              <AnalyticsListKnowledge v-if="menu.selected.value === 'development'" class="q-px-lg q-pb-lg" :data="list.development" />
              <AnalyticsListSme v-if="menu.selected.value === 'sme'" class="q-px-lg q-pb-lg" :data="list.sme" />
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style></style>

<script>
import AnalyticsListKnowledge from 'components/analytics/AnalyticsListKnowledge';
import AnalyticsListSme from 'components/analytics/AnalyticsListSme';
import { analyticsListByKnowledge, analyticsListBySme, analyticsListSummary } from 'src/lib/api';
import { date } from 'quasar';
import AnalyticsFilterPeriode from 'components/analytics/AnalyticsFilterPeriode';
import AnalyticsTitle from 'components/analytics/AnalyticsTitle';

export default {
  name: 'AnalyticsKmap',
  components: { AnalyticsListSme, AnalyticsListKnowledge, AnalyticsFilterPeriode, AnalyticsTitle },
  data() {
    return {
      util: {
        refresh: false,
        heightObserver: 0,
        onResize(data) {
          this.util.heightObserver = data;
        }
      },
      filter: {
        calendar: {
          show: false,
          data: {
            from: date.formatDate(date.subtractFromDate(new Date(), { days: 6 }), 'YYYY/MM/DD'),
            to: date.formatDate(new Date(), 'YYYY/MM/DD') },
          data_sql: {
            from: date.formatDate(date.subtractFromDate(new Date(), { days: 6 }), 'YYYY-MM-DD'),
            to: date.formatDate(new Date(), 'YYYY-MM-DD')
          }
        },
        selected: { value: '7d', label: 'Last 7 days', days: 6 },
        selected_tmp: { value: '7d', label: 'Last 7 days', days: 6 },
        options: [
          { value: '7d', label: 'Last 7 days', days: 6 },
          { value: '30d', label: 'Last 30 days', days: 29 },
          { value: 'm', label: 'Last month', months: 1 },
          { value: '3m', label: 'Last 3 months', months: 3 },
          { value: 'y', label: 'Last year', months: 12 },
          { value: 'c', label: 'Custom' }
        ],
        onHide: data => {
          this.filter.selected_tmp = this.filter.selected;
        },
        onSubmit: data => {
          this.filter.selected = this.filter.selected_tmp;

          const from_date = new Date();
          const to_date = new Date();
          if (['7d', '30d'].includes(this.filter.selected.value)) {
            this.filter.calendar.data_sql = {
              from: date.formatDate(date.subtractFromDate(from_date, { days: this.filter.selected.days }), 'YYYY-MM-DD'),
              to: date.formatDate(to_date, 'YYYY-MM-DD')
            };
          } else if (['m', '3m', 'y'].includes(this.filter.selected.value)) {
            this.filter.calendar.data_sql = {
              from: date.formatDate(date.subtractFromDate(from_date, { month: this.filter.selected.months }), 'YYYY-MM-DD'),
              to: date.formatDate(to_date, 'YYYY-MM-DD')
            };
          } else if (['c'].includes(this.filter.selected.value)) {
            this.filter.calendar.data_sql = {
              from: this.filter.calendar.data.from.replace(/\//g, '-'),
              to: this.filter.calendar.data.to.replace(/\//g, '-')
            };
          }

          this.getData();
        },
        onClick: data => {
          this.filter.selected_tmp = data;
          this.filter.calendar.show = data.value === 'c';
        }
      },
      chart: {
        loading: true
      },
      list: {
        summary: [],
        explicit: [],
        sme: [],
        best_practice: [],
        development: []
      },
      menu: {
        selected: { label: 'Explicit Knowledge', value: 'explicit' },
        options: [
          { label: 'Explicit Knowledge', value: 'explicit' },
          { label: 'Subject Matter Expert', value: 'sme' },
          { label: 'Best Practice', value: 'best-practice' },
          { label: 'Development Needed', value: 'development' }
        ],
        onClick: data => {
          this.menu.selected = this.menu.options.find(x => x.value === data);
        }
      }
    };
  },
  methods: {
    getData() {
      const setIcon = data => {
        let icon = {
          icon: 'fas fa-file',
          color: 'grey'
        };
        if (data.includes('pdf')) {
          icon = {
            icon: 'fas fa-file-pdf',
            color: 'red'
          };
        } else if (data.includes('doc')) {
          icon = {
            icon: 'fas fa-file-word',
            color: 'blue'
          };
        } else if (data.includes('xls')) {
          icon = {
            icon: 'fas fa-file-excel',
            color: 'green'
          };
        } else if (data.includes('ppt')) {
          icon = {
            icon: 'fas fa-file-powerpoint',
            color: 'orange'
          };
        }
        return icon;
      };

      analyticsListSummary({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.list.summary = res.data;
      });
      analyticsListByKnowledge({
        content_type: 'Explicit Knowledge',
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.list.explicit = res.data.map(x => {
          const icon = setIcon(x.filemime);
          return {
            ...x,
            ...icon
          };
        });
      });
      analyticsListByKnowledge({
        content_type: 'Best Practice',
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.list.best_practice = res.data.map(x => {
          const icon = setIcon(x.filemime);
          return {
            ...x,
            ...icon
          };
        });
      });
      analyticsListByKnowledge({
        content_type: 'Development Needed',
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.list.development = res.data.map(x => {
          const icon = setIcon(x.filemime);
          return {
            ...x,
            ...icon
          };
        });
      });
      analyticsListBySme({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.list.sme = res.data;
      });
    }
  },
  mounted() {
    this.getData();
    // setTimeout(() => {
    //   this.chart.loading = false;
    // }, 500);
  },
  unmounted() {
    this.chart.loading = true;
  }

  // methods: {
  //   onResize() {
  //
  //   }
  // }
};
</script>
