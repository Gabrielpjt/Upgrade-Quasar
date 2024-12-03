<template>
  <q-page>
    <div class="row q-py-lg q-px-md">
<!--      <div class="col q-pt-lg q-mr-md" style="max-width: 170px">-->
<!--        <AnalyticsMenu />-->
<!--      </div>-->
      <div class="col">
        <div class="row q-mb-sm items-center">
          <div class="col text-h6 text-weight-bold">Channel</div>
          <q-space/>
          <div>
            <span class="kmp-font-sm-2 cursor-pointer kmp-text-blue-2 text-weight-bold">{{ filter.selected.label }} <q-icon
              name="expand_more" size="16px"/></span>
            <q-popup-proxy content-style="border-radius: 8px; width: 290px" max-height="600px">
              <div class="text-weight-bold q-mt-md q-mb-xs q-ml-md kmp-font-lg">Date Range</div>
              <q-list dense class="q-mb-sm">
                <q-item clickable v-ripple v-for="(item, index) in filter.options" :key="index"
                        @click="filter.onClick(item)">
                  <q-item-section>{{ item.label }}</q-item-section>
                  <q-item-section side v-if="item.value === filter.selected.value">
                    <q-icon color="primary" name="done" size="18px"/>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-separator inset v-if="filter.calendar.show"/>
              <q-date
                v-if="filter.calendar.show"
                v-model="filter.calendar.data"
                minimal flat range
              />
              <q-btn class="q-ml-md" label="Save" no-caps unelevated color="primary"/>
              <div class="q-mb-md"/>
            </q-popup-proxy>
          </div>
        </div>
        <div class="row q-gutter-md">
          <div class="col">
            <q-card class="row q-mb-md">
              <div class="col q-pa-lg">
                <div class="kmp-font-sm-2">Total User</div>
                <div class="kmp-font-hg-2 text-weight-bolder">1.000</div>
                <div class="kmp-font-sm q-mt-xs">in last 30 days</div>
              </div>
              <div class="col q-pa-lg">
                <div class="kmp-font-sm-2">Duration / Session</div>
                <div class="kmp-font-hg-2 text-weight-bolder">30.8</div>
                <div class="kmp-font-sm q-mt-xs">in minutes</div>
              </div>
            </q-card>
            <q-card class="q-mb-md">
              <div class="q-px-lg q-py-md text-weight-bold">Total User</div>
              <q-separator/>
              <div class="q-px-lg q-py-md kmp-text-blue-2 text-weight-bold">See All Users
                <q-icon name="chevron_right" size="16px"/>
              </div>

              <apexchart
                v-if="!this.chart.loading" class="q-mx-sm" type="line"
                :options="chart.user.data.options" :series="chart.user.data.series"></apexchart>
            </q-card>
            <div class="row q-gutter-md q-mb-md">
              <div class="col">
                <q-card>
                  <div class="q-px-lg q-pt-md q-pb-sm text-weight-bold">Device</div>
                  <div class="q-px-lg q-pb-md kmp-font-sm kmp-text-grey-1">Platform that user use for accessing SMART
                    KPK
                  </div>

                  <apexchart
                    v-if="!this.chart.loading" class="q-mx-sm" type="donut"
                    :options="chart.device.data.options" :series="chart.device.data.series"></apexchart>
                </q-card>
              </div>
              <div class="col">
                <q-card>
                  <div class="q-px-lg q-pt-md q-pb-sm text-weight-bold">Education Level</div>
                  <div class="q-px-lg q-pb-md kmp-font-sm kmp-text-grey-1">Data education level from all SMART KPK
                    user.
                  </div>

                  <apexchart
                    v-if="!this.chart.loading" class="q-mx-sm" type="donut"
                    :options="chart.education.data.options" :series="chart.education.data.series"></apexchart>
                </q-card>
              </div>
            </div>
          </div>
          <div class="col" style="max-width: 380px">
            <q-card class="q-pa-lg q-mb-md">
              <div class="q-mb-xs kmp-font-sm-2">
                <q-badge rounded label="" color="green-5"/>
                Online User
              </div>
              <div class="kmp-font-hg-2 text-weight-bold">14</div>
              <div class="kmp-font-sm-2 q-mb-md">Users</div>
              <q-separator class="q-mb-md"/>
              <div class="row q-mb-sm">
                <span class="kmp-font-sm-2 cursor-pointer kmp-text-blue-2 text-weight-bold">{{ filter.selected.label }} <q-icon
                  name="expand_more" size="16px"/></span>
                <q-popup-proxy content-style="border-radius: 8px; width: 290px" max-height="600px">
                  <div class="text-weight-bold q-mt-md q-mb-xs q-ml-md kmp-font-lg">Date Range</div>
                  <q-list dense class="q-mb-sm">
                    <q-item clickable v-ripple v-for="(item, index) in filter.options" :key="index"
                            @click="filter.onClick(item)">
                      <q-item-section>{{ item.label }}</q-item-section>
                      <q-item-section side v-if="item.value === filter.selected.value">
                        <q-icon color="primary" name="done" size="18px"/>
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-separator inset v-if="filter.calendar.show"/>
                  <q-date
                    v-if="filter.calendar.show"
                    v-model="filter.calendar.data"
                    minimal flat range
                  />
                  <q-btn class="q-ml-md" label="Save" no-caps unelevated color="primary"/>
                  <div class="q-mb-md"/>
                </q-popup-proxy>
                <q-space/>
                <q-icon color="primary" name="filter_list" size="18px"/>
              </div>
              <q-list class="q-mb-sm">
                <q-item class="q-px-none cursor-pointer q-mb-xs" v-ripple>
                  <q-item-section top avatar style="min-width: 48px" class="q-pa-none">
                    <q-avatar color="primary" text-color="white" style="">BN</q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="kmp-font-md-2">Bella Nadiem</q-item-label>
                    <q-item-label caption lines="2">Direktorat Penyidikan</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label caption>5 min(s) online</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="q-px-none cursor-pointer q-mb-xs" v-ripple>
                  <q-item-section top avatar style="min-width: 48px" class="q-pa-none">
                    <q-avatar color="primary" text-color="white" style="">BN</q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="kmp-font-md-2">Bella Nadiem</q-item-label>
                    <q-item-label caption lines="2">Direktorat Penyidikan</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label caption>5 min(s) online</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <div class="kmp-text-blue-2 text-weight-bold">See All
                <q-icon name="chevron_right" size="16px"/>
              </div>
            </q-card>
            <q-card class="q-mb-md">
              <div class="q-px-lg q-pt-md q-pb-sm text-weight-bold">Age</div>
              <div class="q-px-lg q-pb-md kmp-font-sm kmp-text-grey-1">Demographic user based on their page</div>

              <apexchart
                v-if="!this.chart.loading" class="q-mx-sm" type="bar"
                :options="chart.user.data.options" :series="chart.user.data.series"></apexchart>
            </q-card>
            <q-card class="q-mb-md">
              <div class="q-px-lg q-py-md text-weight-bold">Gender</div>

              <apexchart
                v-if="!this.chart.loading" class="q-mx-sm" type="donut"
                :options="chart.education.data.options" :series="chart.education.data.series"></apexchart>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style></style>

<script>

export default {
  name: 'AnalyticsAudience',
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
          data: { from: '2020/07/08', to: '2020/07/17' }
        },
        selected: { value: '7d', label: 'Last 7 days' },
        options: [
          { value: '7d', label: 'Last 7 days' },
          { value: '30d', label: 'Last 30 days' },
          { value: 'm', label: 'Last month' },
          { value: '3m', label: 'Last 3 months' },
          { value: 'y', label: 'Last year' },
          { value: 'c', label: 'Custom' }
        ],
        onClick: data => {
          this.filter.selected = data;
          this.filter.calendar.show = data.value === 'c';
        }
      },
      chart: {
        loading: true,
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
        },
        device: {
          data: {
            options: {},
            series: [44, 55, 41, 17, 15]
          }
        },
        education: {
          data: {
            options: {},
            series: [44, 55, 41, 17, 15]
          }
        }
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.chart.loading = false;
    }, 500);
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
