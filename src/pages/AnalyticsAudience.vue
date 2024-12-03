<template>
  <q-page>
    <div class="row q-py-lg q-px-lg">
      <!--      <div class="col q-pt-lg q-mr-md" style="max-width: 170px">-->
      <!--        <AnalyticsMenu />-->
      <!--      </div>-->
      <div class="col">
        <div class="row q-mb-sm items-center">
          <AnalyticsTitle title=""/>
          <q-space/>
          <AnalyticsFilterPeriode :filter="filter"/>
        </div>
        <div class="row q-gutter-md">
          <div :class="$q.platform.is.mobile ? 'col-12 q-pr-md' : 'col'">
            <q-card class="row q-mb-md">
              <div class="col q-pa-lg">
                <div class="kmp-font-sm-2">Duration / Session</div>
                <div class="kmp-font-hg-2 text-weight-bolder">{{fix.duration_per_session}}</div>
                <div class="kmp-font-sm q-mt-xs">in minutes</div>
              </div>
              <div class="col q-pa-lg">
                <div class="kmp-font-sm-2">Total User</div>
                <div class="kmp-font-hg-2 text-weight-bolder">{{fix.total_user}}</div>
                <div class="kmp-font-sm q-mt-xs">in {{filter.selected.label.toLowerCase()}}</div>
              </div>
            </q-card>
            <q-card class="q-mb-md">
              <AnalyticsCardTitle class="q-px-lg q-py-md" title="Total User"/>

              <apexchart
                v-if="!this.chart.loading" class="q-mx-sm" type="line" ref="chartTotalUser"
                :options="chart.user.data.options" :series="chart.user.data.series"></apexchart>

              <q-separator/>
              <div class="q-px-lg q-py-md kmp-text-blue-2 text-weight-bold">See All Users
                <q-icon name="chevron_right" size="16px"/>
              </div>

            </q-card>
            <div class="row q-gutter-md q-mb-md">
              <div :class="$q.platform.is.mobile ? 'col-12' : 'col'" :style="$q.platform.is.mobile ? 'width: 96%' : ''">
                <q-card style="min-height: 480px">
                  <AnalyticsCardTitle class="q-px-lg q-pt-md" title="Device"/>
                  <div class="q-px-lg q-pb-md kmp-font-sm kmp-text-grey-1">Platform that user use for accessing SMART
                    KPK
                  </div>

                  <div class="row">
                    <q-space/>
                    <AnalyticsChartDonut
                      width="55%"
                      :data="chart.device.data"
                      :loading="chart.loading"/>
                    <q-space/>
                  </div>

                  <div class="q-mx-lg q-px-sm q-py-xs kmp-rounded bg-grey-2 text-grey-7" style="font-size: 12px">Total:
                    {{chart.device.total}}
                  </div>
                  <q-list dense class="q-pb-lg q-py-sm q-mx-lg">
                    <q-item
                      v-for="(item, index) in chart.device.raw" :key="index"
                      v-ripple class="kmp-rounded cursor-pointer" style="padding: unset !important;">
                      <q-item-section class="q-px-none">
                        <div class="kmp-text-blue">
                          <q-avatar size="10px" :color="item.color"></q-avatar>
                          <span class="q-ml-sm" style="font-size: 10px">{{ item.title }}</span>
                          <q-icon name="chevron_right" size="16px"/>
                        </div>
                      </q-item-section>
                      <q-item-section class="q-px-none" side>
                        <div class="text-weight-bold" style="font-size: 11px">{{ item.percentage }}</div>
                        <div style="font-size: 10px">{{ item.user }} user(s)</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
              <div class="col">
                <q-card style="min-height: 480px">
                  <AnalyticsCardTitle class="q-px-lg q-pt-md" title="Education Level"/>
                  <div class="q-px-lg q-pb-md kmp-font-sm kmp-text-grey-1">Data education level from all SMART KPK
                    user.
                  </div>

                  <div class="row">
                    <q-space/>
                    <AnalyticsChartDonut
                      width="55%"
                      :data="chart.education.data"
                      :loading="chart.loading"/>
                    <q-space/>
                  </div>

                  <div class="q-mx-lg q-px-sm q-py-xs kmp-rounded bg-grey-2 text-grey-7" style="font-size: 12px">Total:
                    {{chart.education.total}}
                  </div>
                  <q-list dense class="q-pb-lg q-py-sm q-mx-lg">
                    <q-item
                      v-for="(item, index) in chart.education.raw" :key="index"
                      v-ripple class="kmp-rounded cursor-pointer" style="padding: unset !important;">
                      <q-item-section class="q-px-none">
                        <div class="kmp-text-blue">
                          <q-avatar size="10px" :color="item.color"></q-avatar>
                          <span class="q-ml-sm" style="font-size: 10px">{{ item.title }}</span>
                          <q-icon name="chevron_right" size="16px"/>
                        </div>
                      </q-item-section>
                      <q-item-section class="q-px-none" side>
                        <div class="text-weight-bold" style="font-size: 11px">{{ item.percentage }}</div>
                        <div style="font-size: 10px">{{ item.user }} user(s)</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </div>
          </div>
          <div class="col" style="max-width: 380px">
            <q-card class="q-pa-lg q-mb-md">
              <q-scroll-area style="height: 330px;min-height: 330px">
                <q-list class="q-mb-sm">
                  <q-item class="q-px-none cursor-pointer q-mb-xs" v-ripple
                  v-for="(item, index) in list.online_user" :key="index">
                    <q-item-section top avatar style="min-width: 48px" class="q-pa-none">
  <!--                    <q-avatar color="primary" text-color="white" style="">BN</q-avatar>-->
                      <Avatar size="xl"
                              :picture="item.profile_picture ? `./api${item.profile_picture}` : ''"
                              :name="item.name"/>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="kmp-font-md-2">{{item.name}}</q-item-label>
                      <q-item-label caption lines="2">{{item.unit_kerja_short}}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label caption>{{item.duration}} min(s) online</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>

<!--              <div class="kmp-text-blue-2 text-weight-bold">See All-->
<!--                <q-icon name="chevron_right" size="16px"/>-->
<!--              </div>-->
            </q-card>
            <q-card class="q-mb-md">
              <AnalyticsCardTitle class="q-px-lg q-pt-md" title="Age"/>
              <div class="q-px-lg q-pb-md kmp-font-sm kmp-text-grey-1">Demographic user based on their age</div>

              <apexchart
                v-if="!this.chart.loading" class="q-mx-sm" type="bar"
                :options="chart.age.data.options" :series="chart.age.data.series"></apexchart>
            </q-card>
            <q-card class="q-mb-md q-pb-md" style="min-height: 480px">
              <AnalyticsCardTitle class="q-px-lg q-py-md" title="Gender"/>
              <div class="q-px-lg kmp-font-sm kmp-text-grey-1">&nbsp;</div>

              <div class="row">
                <q-space/>
                <AnalyticsChartDonut
                  color="blue"
                  width="55%"
                  :data="chart.gender.data"
                  :loading="chart.loading"/>
                <q-space/>
              </div>

              <div class="q-mx-lg q-px-sm q-py-xs kmp-rounded bg-grey-2 text-grey-7" style="font-size: 12px">Total:
                {{chart.gender.total}}
              </div>
              <q-list dense class="q-pb-lg q-py-sm q-mx-lg">
                <q-item
                  v-for="(item, index) in chart.gender.raw" :key="index"
                  v-ripple class="kmp-rounded cursor-pointer" style="padding: unset !important;">
                  <q-item-section class="q-px-none">
                    <div class="kmp-text-blue">
                      <q-avatar size="10px" :color="item.color"></q-avatar>
                      <span class="q-ml-sm" style="font-size: 10px">{{ item.title }}</span>
                      <q-icon name="chevron_right" size="16px"/>
                    </div>
                  </q-item-section>
                  <q-item-section class="q-px-none" side>
                    <div class="text-weight-bold" style="font-size: 11px">{{ item.percentage }}</div>
                    <div style="font-size: 10px">{{ item.user }} user(s)</div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style></style>

<script>
import { colors, date } from 'quasar';

const { getPaletteColor } = colors;
import AnalyticsTitle from 'components/analytics/AnalyticsTitle';
import AnalyticsFilterPeriode from 'components/analytics/AnalyticsFilterPeriode';
import AnalyticsCardTitle from 'components/analytics/AnalyticsCardTitle';
import AnalyticsChartDonut from 'components/analytics/AnalyticsChartDonut';
import {
  analyticsChartAge,
  analyticsChartDevice, analyticsChartEducation, analyticsChartGender,
  analyticsChartTotalUser,
  analyticsDurationPerSession,
  analyticsListOnlineUser,
  analyticsTotalUser
} from 'src/lib/api';
import Avatar from 'components/common/Avatar';

export default {
  name: 'AnalyticsAudience',
  components: { AnalyticsChartDonut, AnalyticsCardTitle, AnalyticsFilterPeriode, AnalyticsTitle, Avatar },
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
        loading: true,
        user: {
          data: {
            options: {
              chart: {
                toolbar: {
                  show: false
                }
              },
              xaxis: {
                // categories: []
                type: 'datetime'
              }
              // labels: []
              // dataLabels: {
              //   enabled: true,
              //   enabledOnSeries: [1]
              // }
            },
            series: [{
              name: 'Total User',
              data: []
            }]
          }
        },
        age: {
          data: {
            options: {
              chart: {
                toolbar: {
                  show: false
                }
              },
              xaxis: {
                categories: [],
                labels: {
                  // rotate: -45,
                  // rotateAlways: true,
                  style: {
                    fontSize: '9px'
                  }
                }
              }
            },
            series: [{
              name: 'Total User',
              data: []
            }]
          }
        },
        device: {
          raw: [
            { title: 'Desktop', color: 'purple-9', user: 600, percentage: '45%' },
            { title: 'Mobile', color: 'purple-8', user: 400, percentage: '20%' },
            { title: 'Table', color: 'purple-7', user: 100, percentage: '20%' }
          ],
          total: 0,
          data: {
            options: {
              stroke: {
                width: 1
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '40%'
                  }
                }
              },
              legend: {
                show: false
              },
              dataLabels: {
                enabled: false
              },
              colors: [
                getPaletteColor('purple-9'),
                getPaletteColor('purple-8'),
                getPaletteColor('purple-7')],
              labels: []
            },
            series: []
          }
        },
        education: {
          raw: [
            { title: 'SMA/SMK', color: 'light-green-9', user: 600, percentage: '45%' },
            { title: 'D1', color: 'light-green-8', user: 400, percentage: '20%' },
            { title: 'D2', color: 'light-green-7', user: 100, percentage: '20%' },
            { title: 'D3', color: 'light-green-6', user: 100, percentage: '15%' },
            { title: 'S1/D4', color: 'light-green-5', user: 100, percentage: '15%' },
            { title: 'S2', color: 'light-green-4', user: 100, percentage: '15%' },
            { title: 'S3', color: 'light-green-3', user: 100, percentage: '15%' }
          ],
          total: 0,
          data: {
            options: {
              stroke: {
                width: 1
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '40%'
                  }
                }
              },
              legend: {
                show: false
              },
              dataLabels: {
                enabled: false
              },
              colors: [
                getPaletteColor('light-green-9'),
                getPaletteColor('light-green-8'),
                getPaletteColor('light-green-7'),
                getPaletteColor('light-green-6'),
                getPaletteColor('light-green-5'),
                getPaletteColor('light-green-4'),
                getPaletteColor('light-green-3')]
            },
            series: [44, 55, 41, 17, 15, 55, 41]
          }
        },
        gender: {
          raw: [],
          data: {
            options: {
              stroke: {
                width: 1
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '40%'
                  }
                }
              },
              legend: {
                show: false
              },
              dataLabels: {
                enabled: false
                // offsetX: 100,
                // textAnchor: 'end',
                // formatter (val, opts) {
                //   console.log(opts);
                //   return `${opts.w.config.labels[opts.seriesIndex]} ${val.toFixed(2)}%`; // ${opts.w.config.series[opts.seriesIndex]} Member
                // }
              },
              colors: [
                getPaletteColor('purple-9'),
                getPaletteColor('purple-8'),
                getPaletteColor('purple-7'),
                getPaletteColor('purple-6'),
                getPaletteColor('purple-5')]
            },
            series: []
          }
        }
      },
      fix: {
        total_user: 0,
        duration_per_session: 0
      },
      list: {
        online_user: []
      }
    };
  },
  methods: {
    getData() {
      const getTotalUser = analyticsTotalUser({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.fix.total_user = res.data[0].total_user;
      });

      const getDurationPerSession = analyticsDurationPerSession({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.fix.duration_per_session = res.data[0].duration_minute;
      });

      const getListOnlineUser = analyticsListOnlineUser({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.list.online_user = res.data;
      });

      const getChartTotalUser = analyticsChartTotalUser({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.chart.user.data.series = [{
          name: 'Total User',
          data: res.data.map(x => {
            return [x.date, x.total_user];
          })
        }];
      });

      const getChartAge = analyticsChartAge({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.chart.age.data.options.xaxis.categories = res.data.map(x => {
          return x.range;
        });
        this.chart.age.data.series = [{
          name: 'Age',
          data: res.data.map(x => {
            return x.total_usia;
          })
        }];
      });

      const getChartGender = analyticsChartGender({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        let total_all_gender = 0;
        res.data.forEach(x => {
          total_all_gender += x.total_gender;
        });
        this.chart.gender.total = total_all_gender;
        this.chart.gender.raw = res.data.map((x, i) => {
          return { title: x.gender, color: `purple-${9 - i}`, user: x.total_gender, percentage: `${((x.total_gender / total_all_gender) * 100).toFixed(2)}%` };
        });
        this.chart.gender.data.options.labels = res.data.map(x => {
          return x.gender;
        });
        this.chart.gender.data.series = res.data.map(x => {
          return x.total_gender;
        });
      });

      const getChartDevice = analyticsChartDevice({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        let total_all_user = 0;
        res.data.forEach(x => {
          total_all_user += x.total_user;
        });
        this.chart.device.total = total_all_user;
        this.chart.device.raw = res.data.map((x, i) => {
          return { title: x.device, color: `purple-${9 - i}`, user: x.total_user, percentage: `${((x.total_user / total_all_user) * 100).toFixed(2)}%` };
        });
        this.chart.device.data.options.labels = res.data.map(x => {
          return x.device;
        });
        this.chart.device.data.series = res.data.map(x => {
          return x.total_user;
        });
      });

      const getChartEducation = analyticsChartEducation({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        let total_all_user = 0;
        res.data.forEach(x => {
          total_all_user += x.total_user;
        });
        this.chart.education.total = total_all_user;
        this.chart.education.raw = res.data.map((x, i) => {
          return { title: x.edu, color: `light-green-${9 - i}`, user: x.total_user, percentage: `${((x.total_user / total_all_user) * 100).toFixed(2)}%` };
        });
        this.chart.education.data.options.labels = res.data.map(x => {
          return x.edu;
        });
        this.chart.education.data.series = res.data.map(x => {
          return x.total_user;
        });
      });

      const promises = [getTotalUser, getDurationPerSession, getListOnlineUser, getChartTotalUser, getChartAge, getChartGender, getChartDevice, getChartEducation];
      Promise.all(promises)
        .then(data => {
          this.chart.loading = false;
        });
    }
  },
  mounted() {
    this.getData();

    // setTimeout(() => {
    //   this.chart.loading = false;
    // }, 500);
    // console.log(navigator.userAgent);
    // Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1
    // Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36
    // Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1
    // Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1 client?c342:48
    // Mozilla/5.0 (Linux; Android 11.0; Surface Duo) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36
    // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36

    // const checkDevice = function () {
    //   let check = false;
    //   (function (a) {
    //     if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    //   }(navigator.userAgent || navigator.vendor || window.opera));
    //   return check;
    // };
    // console.log(checkDevice());
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
