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
            <div class="row q-gutter-md q-mb-md">
              <div :class="$q.platform.is.mobile ? 'col-12 q-pr-md' : 'col'">
                <q-card style="min-height: 480px">
                  <div class="row q-px-lg q-py-md items-center">
                    <AnalyticsCardTitle title="Summary Channel"/>
                    <q-space/>
                    <AnalyticsSeeAll/>
                  </div>
                  <div class="row">
                    <q-space/>
                    <AnalyticsChartDonut
                      width="75%"
                      :data="chart.summaryChannel.data"
                      :loading="chart.loading"/>
                    <q-space/>
                  </div>
                  <div class="q-mx-lg q-px-sm q-py-xs kmp-rounded bg-grey-2 text-grey-7" style="font-size: 12px">Total:
                    {{chart.summaryChannel.total}}
                  </div>
                  <q-list dense class="q-pb-lg q-py-sm q-mx-lg">
                    <q-item
                      v-for="(item, index) in chart.summaryChannel.raw" :key="index"
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
              <div class="col" style="min-height: 400px">
                <q-card style="min-height: 480px">
                  <div class="row q-px-lg q-py-md items-center">
                    <AnalyticsCardTitle title="Summary Post"/>
                    <q-space/>
                    <AnalyticsSeeAll/>
                  </div>
                  <div class="row">
                    <q-space/>
                    <AnalyticsChartDonut
                      width="75%"
                      :data="chart.summaryPost.data"
                      :loading="chart.loading"/>
                    <q-space/>
                  </div>
                  <div class="q-mx-lg q-px-sm q-py-xs kmp-rounded bg-grey-2 text-grey-7" style="font-size: 12px">Total:
                    {{chart.summaryPost.total}}
                  </div>
                  <q-list dense class="q-pb-lg q-py-sm q-mx-lg">
                    <q-item
                      v-for="(item, index) in chart.summaryPost.raw" :key="index"
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
            <q-card class="q-mb-md">
              <div class="row q-px-lg q-py-md items-center">
                <AnalyticsCardTitle title="Popular Post"/>
                <q-icon class="q-ml-sm" name="info_outline" size="18px"/>
                <q-space/>
                <AnalyticsSeeAll/>
              </div>
              <div>
                <AnalyticsListPopularPost :data="list.popular_post" />
              </div>
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

import AnalyticsCardTitle from 'components/analytics/AnalyticsCardTitle';
import AnalyticsSeeAll from 'components/analytics/AnalyticsSeeAll';
import AnalyticsChartDonut from 'components/analytics/AnalyticsChartDonut';
import AnalyticsTitle from 'components/analytics/AnalyticsTitle';
import AnalyticsFilterPeriode from 'components/analytics/AnalyticsFilterPeriode';
import { analyticsListPopularPost, analyticsSummaryChannel, analyticsSummaryPost } from 'src/lib/api';
import AnalyticsListPopularPost from 'components/analytics/AnalyticsListPopularPost';
// import { get } from 'src/lib/HttpHelper';

export default {
  name: 'AnalyticsAudience',
  components: { AnalyticsFilterPeriode, AnalyticsTitle, AnalyticsChartDonut, AnalyticsSeeAll, AnalyticsCardTitle, AnalyticsListPopularPost },
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
        summaryChannel: {
          raw: [],
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
              colors: [],
              labels: []
            },
            series: []
          }
        },
        summaryPost: {
          raw: [],
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
              colors: [],
              labels: []
            },
            series: []
          }
        },
        user: {
          data: {
            options: {
              chart: {
                id: 'vuechart-example'
              },
              xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
              }
            },
            series: [{
              name: 'series-1',
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }]
          }
        }
      },
      list: {
        popular_post: []
      }
    };
  },
  methods: {
    getData() {
      this.chart.loading = true;
      const getChartSummaryChannel = analyticsSummaryChannel({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        let total_all_channel = 0;
        res.data.forEach(x => {
          total_all_channel += x.total_channel;
        });
        this.chart.summaryChannel.total = total_all_channel;
        this.chart.summaryChannel.raw = res.data.map((x, i) => {
          return { title: x.channel_type, color: `blue-${9 - i}`, user: x.total_channel, percentage: `${((x.total_channel / total_all_channel) * 100).toFixed(2)}%` };
        });
        this.chart.summaryChannel.data.options.labels = res.data.map(x => {
          return x.channel_type;
        });
        this.chart.summaryChannel.data.options.colors = res.data.map((x, i) => {
          return getPaletteColor(`blue-${9 - i}`);
        });
        this.chart.summaryChannel.data.series = res.data.map(x => {
          return x.total_channel;
        });
      });
      const getChartSummaryPost = analyticsSummaryPost({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        let total_all_post = 0;
        res.data.forEach(x => {
          total_all_post += x.total_post;
        });
        this.chart.summaryPost.total = total_all_post;
        this.chart.summaryPost.raw = res.data.map((x, i) => {
          return { title: x.post_type, color: `purple-${9 - i}`, user: x.total_post, percentage: `${((x.total_post / total_all_post) * 100).toFixed(2)}%` };
        });
        this.chart.summaryPost.data.options.colors = res.data.map((x, i) => {
          return getPaletteColor(`purple-${9 - i}`);
        });
        this.chart.summaryPost.data.options.labels = res.data.map(x => {
          return x.post_type;
        });
        this.chart.summaryPost.data.series = res.data.map(x => {
          return x.total_post;
        });
      });

      // const channel_id = 39;
      // const getListPopularPost = get({
      //   path: `api/post-popular?channel_id=${channel_id}&limit=5&offset=0`
      // }).then(res => {
      //   const response = res.data;
      //   if (response) {
      //     this.list.popular_post = response;
      //   }
      // });
      const getListPopularPost = analyticsListPopularPost({
        from: this.filter.calendar.data_sql.from,
        to: this.filter.calendar.data_sql.to
      }).then(res => {
        this.list.popular_post = res.data;
      });

      const promises = [getChartSummaryChannel, getChartSummaryPost, getListPopularPost];
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
