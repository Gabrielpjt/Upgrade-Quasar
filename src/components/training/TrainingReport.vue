<template>
  <div>
    <div class="q-pb-md" :class="$q.platform.is.mobile ? '' : 'q-pr-md'">
      <q-card class="kmp-card-rounded q-px-md q-py-sm">
        <q-card-section v-if="tab_filter != 'directorate'">
          <div class="row items-center desktop-only">
            <q-icon name="business_center" class="q-mr-sm text-blue" size="24px"/>
            <div>
              <span v-if="tab_filter == 'training'" class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md cursor-pointer">
                {{ position_title }}
                <span>
                  <q-icon name="chevron_right" size="20px"/>
                </span>
              </span>
              <span v-if="tab_filter == 'participant'" class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md cursor-pointer">
                {{ position_title_participant }}
                <span>
                  <q-icon name="chevron_right" size="20px"/>
                </span>
              </span>
              <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                <q-banner style="max-width: 500px; min-height: 0; padding: 0">
                  <treeselect
                    v-if="tab_filter == 'training'"
                    v-model="position_value"
                    :options="position_options"
                    append-to-body
                    close-on-select
                    :clearable="false"
                    :normalizer="normalizer"
                    class="vue-treeselect"
                    @select="positionSelect"
                  />
                  <treeselect
                    v-if="tab_filter == 'participant'"
                    v-model="position_value_participant"
                    :options="position_options"
                    append-to-body
                    close-on-select
                    :clearable="false"
                    :normalizer="normalizer"
                    class="vue-treeselect"
                    @select="positionSelectParticipant"
                  />
                </q-banner>
              </q-popup-proxy>
            </div>
          </div>
          <div class="row items-center mobile-only">
            <q-icon name="business_center" class="q-mr-sm text-blue" size="24px"/>
            <div @click="openDialog('select_direktorat')">
              <span v-if="tab_filter == 'training'" class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md cursor-pointer">
                {{ position_title }}
                <span>
                  <q-icon name="chevron_right" size="20px"/>
                </span>
              </span>
              <span v-if="tab_filter == 'participant'" class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md cursor-pointer">
                {{ position_title_participant }}
                <span>
                  <q-icon name="chevron_right" size="20px"/>
                </span>
              </span>
            </div>
          </div>
        </q-card-section>
        <div class="q-mb-sm" v-if="is_have_access===true">
          <div class="desktop-only row">

            <div class="col-4 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md kmp-color-2"
                style="background-color:#EBFFE8"
              >
                <div>
                  <span class="text-bold">Total Pegawai KPK</span>
                  <q-icon @click="summary.total_training.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle">
                    Jumlah Pegawai KPK
                  </q-tooltip>
                </div>
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="groups"
                      class="q-mr-sm q-mt-md"
                      color="#0083C9"
                      size="30px"
                    />
                  </div>
                    <div class="col-10">
                      <div class="kmp-color-2 kmp-font-hg-2">
                        <div v-if="statistik.pegawai.loading">
                          <q-spinner
                            color="default"
                            size="1em"
                          />
                        </div>
                        <div v-else>
                          {{ statistik.pegawai.total }}
                        </div>
                      </div>
                      <div class="kmp-color-2 kmp-font-sm">
                        in Year of {{ statistik.pegawai.year }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
            <div class="col-4 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md cursor-pointer"
                style="background-color:#FFF6EA"
                :class="filter_total_peserta === true ? 'kmp-training-summary-filter kmp-color-1' : 'kmp-color-2'"
                @click="filter_total_peserta = !filter_total_peserta"
              >
                <div>
                  <span class="text-bold">Total Peserta</span>
                  <q-icon @click="summary.total_training.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle">
                    Jumlah Peserta Pelatihan Internal
                  </q-tooltip>
                </div>
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="supervisor_account"
                      class="q-mr-sm q-mt-md"
                      color="#0083C9"
                      size="30px"
                    />
                  </div>
                    <div class="col-10">
                      <div class="kmp-font-hg-2" :class="filter_total_peserta === true ? 'kmp-color-1' : 'kmp-color-2'">
                        <div v-if="statistik.peserta_pelatihan.loading">
                          <q-spinner
                            color="default"
                            size="1em"
                          />
                        </div>
                        <div v-else class="filter_total_peserta === true ? 'kmp-color-1' : 'kmp-color-2'">
                          {{ statistik.peserta_pelatihan.total }}
                        </div>
                      </div>
                      <div class="kmp-font-sm" :class="filter_total_peserta === true ? 'kmp-color-1' : 'kmp-color-2'">
                        in Year of {{ statistik.peserta_pelatihan.year }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
            <div class="col-4 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md cursor-pointer"
                style="background-color:#F9EFFE"
                :class="filter_peningkatan_kompetensi === true ? 'kmp-training-summary-filter kmp-color-1' : 'kmp-color-2'"
                @click="filter_peningkatan_kompetensi = !filter_peningkatan_kompetensi"
              >
                <div>
                  <span class="text-bold">Peningkatan Kompetensi</span>
                  <q-icon @click="summary.total_training.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle">
                    Jumlah Peserta Pelatihan Internal yang Mengalami Peningkatan Kompetensi
                  </q-tooltip>
                </div>
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="settings_accessibility"
                      class="q-mr-sm q-mt-md"
                      color="#0083C9"
                      size="30px"
                    />
                  </div>
                    <div class="col-10">
                      <div class="kmp-font-hg-2" :class="filter_peningkatan_kompetensi === true ? 'kmp-color-1' : 'kmp-color-2'">
                        <div v-if="statistik.peningkatan_kompetensi.loading">
                          <q-spinner
                            color="default"
                            size="1em"
                          />
                        </div>
                        <div v-else :class="filter_peningkatan_kompetensi === true ? 'kmp-color-1' : 'kmp-color-2'">
                          {{ statistik.peningkatan_kompetensi.total }}
                        </div>
                      </div>
                      <div class="kmp-font-sm" :class="filter_peningkatan_kompetensi === true ? 'kmp-color-1' : 'kmp-color-2'">
                        in Year of {{ statistik.peningkatan_kompetensi.year }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
            <div class="col-4 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md cursor-pointer"
                style="background-color:#EBFFE8"
                :class="filter_jp_20 === true ? 'kmp-training-summary-filter kmp-color-1' : 'kmp-color-2'"
                @click="filter_jp_20 = !filter_jp_20"
              >
                <div>
                  <span class="text-bold">Pegawai KPK 20 JP</span>
                  <q-icon @click="summary.total_training.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle">
                    Pegawai KPK yang Memenuhi Diklat 20 JP Pertahun
                  </q-tooltip>
                </div>
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="track_changes"
                      class="q-mr-sm q-mt-md"
                      color="#0083C9"
                      size="30px"
                    />
                  </div>
                    <div class="col-10">
                      <div class="kmp-font-hg-2" :class="filter_jp_20 === true ? 'kmp-color-1' : 'kmp-color-2'">
                        <div v-if="statistik.memenuhi_diklat.loading">
                          <q-spinner
                            color="default"
                            size="1em"
                          />
                        </div>
                        <div v-else :class="filter_jp_20 === true ? 'kmp-color-1' : 'kmp-color-2'">
                          {{ statistik.memenuhi_diklat.total }}
                        </div>
                      </div>
                      <div class="kmp-font-sm" :class="filter_jp_20 === true ? 'kmp-color-1' : 'kmp-color-2'">
                        in Year of {{ statistik.memenuhi_diklat.year }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
            <div class="col-4 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md cursor-pointer"
                style="background-color:#FFF6EA"
                :class="filter_total_training === true ? 'kmp-training-summary-filter kmp-color-1' : 'kmp-color-2'"
                @click="filter_total_training = !filter_total_training"
              >
                <div>
                  <span class="text-bold">Total Pelatihan</span>
                  <q-icon @click="summary.total_training.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle">
                    Jumlah Pelatihan Internal KPK
                  </q-tooltip>
                </div>
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="event"
                      class="q-mr-sm q-mt-md"
                      color="#0083C9"
                      size="30px"
                    />
                  </div>
                    <div class="col-10">
                      <div class="kmp-font-hg-2" :class="filter_total_training === true ? 'kmp-color-1' : 'kmp-color-2'">
                        <div v-if="statistik.pelatihan_internal.loading">
                          <q-spinner
                            color="default"
                            size="1em"
                          />
                        </div>
                        <div v-else :class="filter_total_training === true ? 'kmp-color-1' : 'kmp-color-2'">
                          {{ statistik.pelatihan_internal.total }}
                        </div>
                      </div>
                      <div class="kmp-font-sm" :class="filter_total_training === true ? 'kmp-color-1' : 'kmp-color-2'">
                        in Year of {{ statistik.pelatihan_internal.year }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
            <div class="col-4 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md cursor-pointer"
                style="background-color:#F9EFFE"
                :class="filter_jam_pelatihan === true ? 'kmp-training-summary-filter kmp-color-1' : 'kmp-color-2'"
                @click="filter_jam_pelatihan = !filter_jam_pelatihan"
              >
                <div>
                  <span class="text-bold">Jam Pelatihan</span>
                  <q-icon @click="summary.total_training.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle">
                    Jumlah Jam Pelatihan Internal KPK
                  </q-tooltip>
                </div>
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="alarm_on"
                      class="q-mr-sm q-mt-md"
                      color="#0083C9"
                      size="30px"
                    />
                  </div>
                    <div class="col-10">
                      <div class="kmp-font-hg-2" :class="filter_jam_pelatihan === true ? 'kmp-color-1' : 'kmp-color-2'">
                        <div v-if="statistik.pelatihan_internal.loading">
                          <q-spinner
                            color="default"
                            size="1em"
                          />
                        </div>
                        <div v-else :class="filter_jam_pelatihan === true ? 'kmp-color-1' : 'kmp-color-2'">
                          {{ statistik.jam_pelatihan_internal.total }}
                        </div>
                      </div>
                      <div class="kmp-font-sm" :class="filter_jam_pelatihan === true ? 'kmp-color-1' : 'kmp-color-2'">
                        in Year of {{ statistik.jam_pelatihan_internal.year }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
              <!-- <div class="col-4 q-pa-sm">
                <q-card
                  class="kmp-card-rounded q-pa-md kmp-color-3"
                  style="background-color:#FFF6EA"
                >
                <div>
                  <span class="kmp-color-3 text-bold">Target Direktorat</span>
                  <q-icon  @click="summary.target_direktorat.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle" v-model="summary.target_direktorat.showing">
                    Persentase pemenuhan pegawai yang mencapai 20 JP {{ this.summary.target_direktorat.total }}%
                  </q-tooltip>
                </div>
                  <div class="row">
                    <div class="col-2 text-center">
                      <q-icon
                        name="track_changes"
                        class="q-mr-sm q-mt-md"
                        color="#0083C9"
                        size="30px"
                      />
                    </div>
                    <div class="col-10">
                      <div class="kmp-color-3 kmp-font-hg-2">
                        {{ summary.target_direktorat.total }}%
                      </div>
                      <div class="kmp-color-3 kmp-font-sm">
                        in Year of {{ summary.target_direktorat.year }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div> -->


            <!-- <div class="col-4 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md kmp-color-2"
                style="background-color:#EBFFE8"
              >
                <div>
                  <span class="text-bold">Total Training</span>
                  <q-icon @click="summary.total_training.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle" v-model="summary.total_training.showing">
                    Jumlah diklat yang terselenggara {{ this.summary.total_training.total }}
                  </q-tooltip>
                </div>
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="card_membership"
                      class="q-mr-sm q-mt-md"
                      color="#0083C9"
                      size="30px"
                    />
                  </div>
                    <div class="col-10">
                      <div class="kmp-color-2 kmp-font-hg-2">
                        {{ this.summary.total_training.total }}
                      </div>
                      <div class="kmp-color-2 kmp-font-sm">
                        in Year of {{ summary.total_training.year }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
              <div class="col-4 q-pa-sm">
                <q-card
                  class="kmp-card-rounded q-pa-md kmp-color-3"
                  style="background-color:#FFF6EA"
                >
                <div>
                  <span class="kmp-color-3 text-bold">Target Direktorat</span>
                  <q-icon  @click="summary.target_direktorat.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle" v-model="summary.target_direktorat.showing">
                    Persentase pemenuhan pegawai yang mencapai 20 JP {{ this.summary.target_direktorat.total }}%
                  </q-tooltip>
                </div>
                  <div class="row">
                    <div class="col-2 text-center">
                      <q-icon
                        name="track_changes"
                        class="q-mr-sm q-mt-md"
                        color="#0083C9"
                        size="30px"
                      />
                    </div>
                    <div class="col-10">
                      <div class="kmp-color-3 kmp-font-hg-2">
                        {{ summary.target_direktorat.total }}%
                      </div>
                      <div class="kmp-color-3 kmp-font-sm">
                        in Year of {{ summary.target_direktorat.year }}
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
              <div class="col-4 q-pa-sm">
                <q-card
                  class="kmp-card-rounded q-pa-md kmp-color-4"
                  style="background-color:#F9EFFE"
                >
                <div>
                  <span class="kmp-color-4 text-bold">Total Participant</span>
                  <q-icon  @click="summary.total_participant.showing = true" name="info_outline" style="padding-left: 3px; padding-bottom: 2px;" size="20px" />
                  <q-tooltip anchor="bottom middle" self="center middle" v-model="summary.total_participant.showing">
                    Jumlah pegawai yang yang telah mengikuti diklat {{ this.summary.total_participant.total }} (1 orang pegawai bisa mengikuti lebih dari 1 diklat)
                  </q-tooltip>
                </div>
                  <div class="row">
                    <div class="col-2 text-center">
                      <q-icon
                        name="supervisor_account"
                        class="q-mr-sm q-mt-md"
                        color="#0083C9"
                        size="30px"
                      />
                    </div>
                    <div class="col-10">
                      <div class="kmp-color-4 kmp-font-hg-2">
                        {{ summary.total_participant.total }}
                      </div>
                      <div class="kmp-color-4 kmp-font-sm">
                        from {{ summary.total_participant.of }} member
                      </div>
                    </div>
                  </div>
                </q-card>
              </div> -->

          </div>

          <div class="mobile-only row">
            <div class="col-xs-12 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md cursor-pointer"
                style="background-color:#EBFFE8"
                :class="filter_total_training === true ? 'kmp-training-summary-filter kmp-color-1' : 'kmp-color-2'"
                @click="filter_total_training = !filter_total_training"
              >
                <!-- <span class=""></span> -->
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="card_membership"
                      class="q-pt-sm q-pt-sm"
                      color="#0083C9"
                      size="40px"
                    />
                  </div>
                  <div class="col-4 text-left q-px-sm">
                      <div class="kmp-font-hg-2" :class="filter_total_training === true ? 'kmp-color-1' : 'kmp-color-2'">
                        {{ summary.total_training.total }}
                      </div>
                  </div>
                  <div class="col-6 q-pl-md q-pt-sm">
                      <div class="kmp-font-hg-4 text-bold" :class="filter_total_training === true ? 'kmp-color-1' : 'kmp-color-2'">
                        Total Training
                      </div>
                      <div class="kmp-font-sm" :class="filter_total_training === true ? 'kmp-color-1' : 'kmp-color-2'">
                        in Year of {{ summary.total_training.year }}
                      </div>
                  </div>
                </div>
              </q-card>
            </div>
            <div class="col-xs-12 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md kmp-color-2"
                style="background-color:#FFF6EA"
              >
                <!-- <span class=""></span> -->
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="track_changes"
                      class="q-pt-sm q-pt-sm"
                      color="#0083C9"
                      size="40px"
                    />
                  </div>
                  <div class="col-4 text-left q-px-sm">
                      <div class="kmp-color-2 kmp-font-hg-2">
                        {{ summary.target_direktorat.total }}
                      </div>
                  </div>
                  <div class="col-6 q-pl-md q-pt-sm">
                      <div class="kmp-color-2 kmp-font-hg-4 text-bold">
                        Target Direktorat
                      </div>
                      <div class="kmp-color-2 kmp-font-sm">
                        in Year of {{ summary.target_direktorat.year }}
                      </div>
                  </div>
                </div>
              </q-card>
            </div>
            <div class="col-xs-12 q-pa-sm">
              <q-card
                class="kmp-card-rounded q-pa-md cursor-pointer"
                style="background-color:#F9EFFE"
                :class="filter_total_peserta === true ? 'kmp-training-summary-filter kmp-color-1' : 'kmp-color-2'"
                @click="filter_total_peserta = !filter_total_peserta"
              >
                <!-- <span class=""></span> -->
                <div class="row">
                  <div class="col-2 text-center">
                    <q-icon
                      name="supervisor_account"
                      class="q-pt-sm q-pt-sm"
                      color="#0083C9"
                      size="40px"
                    />
                  </div>
                  <div class="col-4 text-left q-px-sm">
                      <div class="kmp-font-hg-2" :class="filter_total_peserta === true ? 'kmp-color-1' : 'kmp-color-2'">
                        {{ summary.total_participant.total }}
                      </div>
                  </div>
                  <div class="col-6 q-pl-md q-pt-sm">
                      <div class="kmp-font-hg-4 text-bold" :class="filter_total_peserta === true ? 'kmp-color-1' : 'kmp-color-2'">
                        Total Participant
                      </div>
                      <div class="kmp-font-sm" :class="filter_total_peserta === true ? 'kmp-color-1' : 'kmp-color-2'">
                        in Year of {{ summary.total_participant.year }}
                      </div>
                  </div>
                </div>
              </q-card>
            </div>

          </div>
        </div>
        <div class="q-mx-sm q-mb-md flex justify-start">
          <div class="col-12">
            <q-tabs
              v-model="tab_filter"
              dense
              class="bg-white text-black"
              active-color="primary"
              indicator-color="primary"
            >
              <q-tab name="training" label="Training" />
              <q-tab name="participant" label="Participant" />
              <q-tab name="directorate" label="Directorate" />
            </q-tabs>
          </div>
        </div>
        <q-tab-panels v-model="tab_filter" animated style="background-color: #fff">
          <q-tab-panel name="training" class="q-pa-none">
            <div class="row q-mx-sm q-mb-md q-mt-md">
              <div class="col-10 col-md-10 col-xs-11">
                <div class="row q-gutter-md">
                  <div class="col-3 col-md-3 col-xs-12">
                    <q-input
                      ref="filter"
                      outlined
                      dense
                      v-on:keyup.enter="handleFilter()"
                      v-model="filter"
                      placeholder="Training"
                    >
                      <template v-slot:append>
                        <q-icon name="search" @click="handleFilter()"/>
                      </template>
                    </q-input>
                  </div>
                  <div class="col" >
                    <div style="margin-right:16px; border-left: 2px solid gainsboro;  height: 40px;">
                      &nbsp;
                      <q-btn flat @click="modal_filter = true" style="margin-top:4px;" color="white" size="12px" text-color="blue" icon="filter_list" label="Filter" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mobile-only q-pt-md col-xs-12">
              </div>
              <div class="col col-md col-xs-12 row justify-end q-gutter-sm">
                <q-btn outline color="primary" no-caps label="Export Training" :disabled="selected.length === 0" @click="handleShowTrainingsReport()" v-if="!is_loading_export" />
                <q-spinner color="primary" size="2em" style="margin-top: 13px" v-else />
              </div>
            </div>
            <div class="row q-mx-sm q-mb-md q-mt-md" ref="focusTraining">
              <div class="col-12">
                <q-table
                  flat
                  bordered
                  class="kmp-table-report kmp-border-color-1 kmp-rounded-2"
                  v-model="data_table_pagination"
                  :columns="columns_table"
                  :data="data_table"
                  :separator="separator"
                  v-model:pagination="data_table_pagination"
                  :loading="data_table_loading"
                  :rows-per-page-options="[5, 10, 15, 20, 25, 50, 100]"
                  @request="onRequestGetTraining"
                  row-key="id"
                  selection="multiple"
                  v-model:selected="selected"
                >
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" />rows-per-page-options
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td class="table-training">
                        <q-checkbox v-model="props.selected" :props="props"/>
                      </q-td>
                      <q-td key="no" :props="props" class="table-training"> {{ props.row.no }}. </q-td>
                      <q-td key="name" class="text-left table-training" :props="props">
                        <a
                          @click="seeParticipant(props.row.id,null,null)"
                          class="text-blue cursor-pointer"
                          style="text-decoration:none"
                          >{{ props.row.name.toUpperCase() }}</a
                        >
                      </q-td>
                      <q-td key="training_type" :props="props" class="table-training">
                        <div v-if="props.row.training_type">
                          <span
                            v-if="
                              props.row.training_type.toLowerCase() == 'training'
                            "
                          >
                            <q-badge outline color="primary" style="padding:5px; border: 0.5px solid currentColor; background-color:#E6F4FF;" class="q-ma-sm text-bold">{{
                              props.row.training_type
                            }}</q-badge>
                          </span>
                          <span
                            v-else-if="
                              props.row.training_type.toLowerCase() == 'webinar'
                            "
                          >
                            <q-badge outline color="red" style="padding:5px; border: 0.5px solid currentColor; background-color:#FFECF0;" class="q-ma-sm text-bold">{{
                              props.row.training_type
                            }}</q-badge>
                          </span>
                          <span
                            v-else-if="
                              props.row.training_type.toLowerCase() ==
                                'certification'
                            "
                          >
                            <q-badge outline color="light-green-13" style="padding:5px; border: 0.5px solid currentColor; background-color:#EFFFEA;" class="q-ma-sm text-bold">{{
                              props.row.training_type
                            }}</q-badge>
                          </span>
                          <span v-else>
                            <q-badge outline color="yellow-12" style="padding:5px; border: 0.5px solid currentColor; background-color:#FFFCEE;" class="q-ma-sm text-bold">{{
                              props.row.training_type
                            }}</q-badge>
                          </span>
                        </div>
                        <span v-else>-</span>
                      </q-td>
                      <q-td key="status" :props="props" class="table-training">
                        <div>
                          <div v-if="props.row.status">
                            <span v-if="props.row.status.toLowerCase() == 'draft'">
                              <q-badge outline color="primary" style="padding:5px; border: 0.5px solid currentColor; background-color:#E6F4FF;" class="q-ma-sm text-bold"
                                >Draft</q-badge
                              >
                            </span>
                            <span
                              v-else-if="
                                props.row.status.toLowerCase() == 'open_registration'
                              "
                            >
                              <q-badge outline color="light-green-13" style="padding:5px; border: 0.5px solid currentColor; background-color:#EFFFEA;" class="q-ma-sm text-bold"
                                >Open Registration</q-badge
                              >
                            </span>
                            <span
                              v-else-if="
                                props.row.status.toLowerCase() == 'close_registration'
                              "
                            >
                              <q-badge outline color="primary" style="padding:5px; border: 0.5px solid currentColor; background-color:#E6F4FF;" class="q-ma-sm text-bold"
                                >Close Registration</q-badge
                              >
                            </span>
                            <span v-else>
                              <q-badge outline color="red" style="padding:5px; border: 0.5px solid currentColor; background-color:#FFECF0;" class="q-ma-sm text-bold">End</q-badge>
                            </span>
                          </div>
                          <span v-else>-</span>
                        </div>
                      </q-td>
                      <q-td key="date" :props="props" class="table-training">
                        <div
                          v-if="props.row.schedule.length > 1"
                        >
                          {{
                            parseDate(
                              props.row.schedule[0].date_start,
                              'DD MMM YYYY'
                            )
                          }},
                          {{
                            parseDate(
                              props.row.schedule[1].date_start,
                              'DD MMM YYYY'
                            )
                          }}...
                        </div>
                        <div v-else>
                          {{
                            parseDate(
                              props.row.schedule[0].date_start,
                              'DD MMM YYYY'
                            )
                          }}
                          <!-- <span
                            v-if="
                              props.row.schedule[0].time_start &&
                                props.row.schedule[0].time_end
                            "
                            >{{
                              `${parseTime(
                                props.row.schedule[0].time_start
                              )} - ${parseTime(props.row.schedule[0].time_end)}`
                            }}</span
                          > -->
                        </div>
                      </q-td>
                      <q-td key="expertise" :props="props" class="table-training">
                        <span
                          v-for="(item, index) in props.row.expertise"
                          :key="index"
                        >
                          <span v-if="item.expert_type == 'PIC'">
                            {{
                                item.expert_name
                            }}
                            <template v-if ="index !== props.row.expertise.length - 1">,</template>
                          </span>
                        </span>
                      </q-td>
                      <q-td key="jam_pelatihan" class="text-left table-training" :props="props">
                        {{ props.row.jam_pelatihan }}</q-td>
                      <q-td key="training_report" :props="props">
                        <q-btn flat round color="primary" icon="remove_red_eye" @click="handleShowTrainingReport(props.row)" />
                        <q-btn flat round color="primary" icon="download" @click="handleDownloadTrainingReport(props.row)" />
                      </q-td>
                      <q-td key="feedback" :props="props">
                        <q-btn flat round color="primary" icon="remove_red_eye" @click="handleShowFeedbackReport(props.row)" />
                        <q-btn flat round color="primary" icon="download" @click="handleDownloadFeedback(props.row)" />
                      </q-td>
                    </q-tr>
                  </template>
                  <template #bottom>
                    <div class="q-pa-lg flex flex-left">
                      <p style="color:grey; font-size:12px; margin: auto;">Per Page</p>
                      &nbsp; &nbsp; &nbsp;
                      <q-select
                        v-model="rowsPerPage"
                        :options="['3','5', '10', '15', '20','25','50','100']"
                        outlined
                        dense
                      >
                      </q-select>
                      &nbsp; &nbsp; &nbsp;
                      <p v-if="data_table_pagination.page !== Math.ceil(data_table_pagination.rowsNumber/data_table_pagination.rowsPerPage)" style="color:grey; font-size:12px; margin: auto;">Showing {{data_table_pagination.rowsPerPage*data_table_pagination.page-data_table_pagination.rowsPerPage+1}} to {{data_table_pagination.rowsPerPage*data_table_pagination.page}} of {{data_table_pagination.rowsNumber}} entries</p>
                      <p v-if="data_table_pagination.page === Math.ceil(data_table_pagination.rowsNumber/data_table_pagination.rowsPerPage)" style="color:grey; font-size:12px; margin: auto;">Showing {{data_table_pagination.rowsPerPage*data_table_pagination.page-data_table_pagination.rowsPerPage+1}} to {{data_table_pagination.rowsNumber}} of {{data_table_pagination.rowsNumber}} entries</p>
                      <!-- <strong v-if="this.data_table_pagination.page !== this.data_table_pagination.page.length - 1"> {{data_table_pagination.rowsPerPage*data_table_pagination.page}} </strong>
                      <strong v-if="this.data_table_pagination.page === this.data_table_pagination.page.length - 1"> {{data_table_pagination.rowsNumber}} </strong> of {{data_table_pagination.rowsNumber}} entries</p> -->
                    </div>
                    <q-space />

                    <div class="q-pa-lg flex flex-right">
                      <q-pagination
                        v-model="page"
                        direction-links
                        boundary-links
                        text-color="grey-6"
                        color="grey-6"
                        active-text-color="purple-6"
                        size="12px"
                        padding="6px 12px 6px 12px"
                        :max="Math.ceil(data_table_pagination.rowsNumber/data_table_pagination.rowsPerPage)"
                        :max-pages="4"
                      />
                    </div>
                  </template>
                </q-table>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="participant" class="q-pa-none">
            <div class="row q-mx-sm q-mb-md q-mt-md">
              <div class="col-11 col-md-11 col-xs-11">
                <div class="row q-gutter-md">
                  <div class="col-3 col-md-3 col-xs-12">
                    <q-input
                      ref="filter"
                      outlined
                      dense
                      v-on:keyup.enter="handleFilterParticipant(true)"
                      v-model="filter_participant"
                      placeholder="Participant Name"
                    >
                      <template v-slot:append>
                        <q-icon name="search" @click="handleFilterParticipant(true)"/>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-8 col-md-8 col-xs-12">
                    <div class="row items-center">
                      <div class="col-10 col-md-4 q-mb-md-none q-mb-xs-md">
                        <q-input outlined dense v-model="start_date_filter_participant">
                          <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="start_date_filter_participant"
                                  mask="YYYY-MM-DD"
                                >
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
                      <div class="col-2 col-md-1 q-mb-md-none q-mb-xs-md">
                        <div class="text-center">To</div>
                      </div>
                      <div class="col-10 col-md-4 q-mb-md-none q-mb-xs-md">
                        <q-input outlined dense v-model="end_date_filter_participant">
                          <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date v-model="end_date_filter_participant" mask="YYYY-MM-DD">
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
                      <div class="col-6 col-md-3">
                        <!-- <div style="border-left: 2px solid gainsboro;  height: 40px;"> -->
                          <q-select
                            v-model="sort"
                            :options="sort_option"
                            option-value="value"
                            option-label="label"
                            outlined
                            dense
                            class="q-ml-md-md q-ml-xs-none"
                            style=""
                          />
                        <!-- </div> -->
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <q-btn color="primary" label="Search" @click="handleFilterParticipant(true)" />
                  </div>
                </div>
              </div>
              <div class="mobile-only q-pt-md col-xs-12">

              </div>
            </div>
            <div class="row q-mx-sm q-mb-md q-mt-md" ref="focusParticipant">
              <div class="col-12">
                <q-table
                  flat
                  bordered
                  class="kmp-table-report kmp-border-color-1 kmp-rounded-2"
                  v-model="data_table_pagination_participant"
                  :columns="columns_table_participant"
                  :data="data_table_participant"
                  :separator="separator"
                  v-model:pagination="data_table_pagination_participant"
                  :loading="data_table_loading_participant"
                  :rows-per-page-options="[5, 10, 15, 20, 25, 50, 100]"
                  @request="onRequestGetParticipant"
                  row-key="id"
                >
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" />rows-per-page-options
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="no" :props="props" class="table-training"> {{ props.row.no }}. </q-td>
                      <q-td key="users_id" class="text-left table-training" :props="props">
                        <a
                          v-if="props.row.employee_type === 'employee'"
                          @click="seeParticipantTraining(props.row.user.id,null,null)"
                          class="text-blue cursor-pointer"
                          style="text-decoration:none"
                          >{{ props.row.user.name.toUpperCase() }}</a
                        >
                        <a
                          v-else
                          @click="seeParticipantTraining(null,props.row.employee_id,null)"
                          class="text-blue cursor-pointer"
                          style="text-decoration:none"
                          >{{ props.row.non_employee.name.toUpperCase() }}</a
                        >
                      </q-td>
                      <q-td key="direktorat_id" class="text-left table-training" :props="props">
                        <span v-if="props.row.direktorat_id && props.row.direktorat_id >= 32 && props.row.organization">
                          {{ props.row.organization.name }}
                        </span>
                      </q-td>
                      <q-td key="participant_report" :props="props">
                        <q-btn flat round color="primary" icon="remove_red_eye" @click="handleShowParticipantReport(props.row)" />
                        <q-btn flat round color="primary" icon="download" @click="handleDownloadParticipantReport(props.row)" />
                      </q-td>
                    </q-tr>
                  </template>
                  <template #bottom>
                    <div class="q-pa-lg flex flex-left">
                      <p style="color:grey; font-size:12px; margin: auto;">Per Page</p>
                      &nbsp; &nbsp; &nbsp;
                      <q-select
                        v-model="rowsPerPageParticipant"
                        :options="['3','5', '10', '15', '20','25','50','100']"
                        outlined
                        dense
                      >
                      </q-select>
                      &nbsp; &nbsp; &nbsp;
                      <p v-if="data_table_pagination_participant.page !== Math.ceil(data_table_pagination_participant.rowsNumber/data_table_pagination_participant.rowsPerPage)" style="color:grey; font-size:12px; margin: auto;">Showing {{data_table_pagination_participant.rowsPerPage*data_table_pagination_participant.page-data_table_pagination_participant.rowsPerPage+1}} to {{data_table_pagination_participant.rowsPerPage*data_table_pagination_participant.page}} of {{data_table_pagination_participant.rowsNumber}} entries</p>
                      <p v-if="data_table_pagination_participant.page === Math.ceil(data_table_pagination_participant.rowsNumber/data_table_pagination_participant.rowsPerPage)" style="color:grey; font-size:12px; margin: auto;">Showing {{data_table_pagination_participant.rowsPerPage*data_table_pagination_participant.page-data_table_pagination_participant.rowsPerPage+1}} to {{data_table_pagination_participant.rowsNumber}} of {{data_table_pagination_participant.rowsNumber}} entries</p>
                      <!-- <strong v-if="this.data_table_pagination.page !== this.data_table_pagination.page.length - 1"> {{data_table_pagination.rowsPerPage*data_table_pagination.page}} </strong>
                      <strong v-if="this.data_table_pagination.page === this.data_table_pagination.page.length - 1"> {{data_table_pagination.rowsNumber}} </strong> of {{data_table_pagination.rowsNumber}} entries</p> -->
                    </div>
                    <q-space />

                    <div class="q-pa-lg flex flex-right">
                      <q-pagination
                        v-model="pageParticipant"
                        direction-links
                        boundary-links
                        text-color="grey-6"
                        color="grey-6"
                        active-text-color="purple-6"
                        size="12px"
                        padding="6px 12px 6px 12px"
                        :max="Math.ceil(data_table_pagination_participant.rowsNumber/data_table_pagination_participant.rowsPerPage)"
                        :max-pages="4"
                      />
                    </div>
                  </template>
                </q-table>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="directorate" class="q-pa-none">
            <div class="row q-mx-sm q-mb-md q-mt-md">
              <div class="col-10 col-md-10 col-xs-11">
                <div class="row q-gutter-md">
                  <div class="col-3 col-md-3 col-xs-12">
                    <q-input
                      ref="filter"
                      outlined
                      dense
                      v-on:keyup.enter="handleFilterDirectorate(true)"
                      v-model="filter_directorate"
                      placeholder="Directorate Name"
                    >
                      <template v-slot:append>
                        <q-icon name="search" @click="handleFilterDirectorate(true)"/>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-6 col-md-6 col-xs-12">
                    <div class="row items-center">
                      <div class="col-10 col-md-5 q-mb-md-none q-mb-xs-md">
                        <q-input outlined dense v-model="start_date_filter_directorate">
                          <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="start_date_filter_directorate"
                                  mask="YYYY-MM-DD"
                                >
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
                      <div class="col-2 col-md-2 q-mb-md-none q-mb-xs-md">
                        <div class="text-center">To</div>
                      </div>
                      <div class="col-10 col-md-5">
                        <q-input outlined dense v-model="end_date_filter_directorate">
                          <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date v-model="end_date_filter_directorate" mask="YYYY-MM-DD">
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
                    </div>
                  </div>
                  <div class="col">
                    <q-btn color="primary" label="Search" @click="handleFilterDirectorate(true)" />
                  </div>
                </div>
              </div>
              <div class="mobile-only q-pt-md col-xs-12">

              </div>
            </div>
            <div class="row q-mx-sm q-mb-md q-mt-md">
              <div class="col-12">
                <q-table
                  flat
                  bordered
                  class="kmp-table-report kmp-border-color-1 kmp-rounded-2"
                  v-model="data_table_pagination_directorate"
                  :columns="columns_table_directorate"
                  :data="data_table_directorate"
                  :separator="separator"
                  v-model:pagination="data_table_pagination_directorate"
                  :loading="data_table_loading_directorate"
                  :rows-per-page-options="[5, 10, 15, 20, 25, 50, 100]"
                  @request="onRequestGetDirectorate"
                  row-key="id"
                >
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" />rows-per-page-options
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="no" :props="props" class="table-training"> {{ props.row.no }}. </q-td>
                      <q-td key="users_id" class="text-left table-training" :props="props">
                        <a
                          @click="seeParticipantTraining(null,null,props.row.id)"
                          class="text-blue cursor-pointer"
                          style="text-decoration:none"
                          >{{ props.row.name.toUpperCase() }}</a
                        >
                      </q-td>
                      <q-td key="participant" class="text-left table-training" :props="props">
                        <a
                          @click="seeParticipant(null,props.row.id,null)"
                          class="text-blue cursor-pointer"
                          style="text-decoration:none"
                          >{{ props.row.total_participant }}</a
                        >
                      </q-td>
                      <q-td key="participant_lulus_jp" class="text-left table-training" :props="props">
                        <a
                          @click="seeParticipant(null,props.row.id,true)"
                          class="text-blue cursor-pointer"
                          style="text-decoration:none"
                          >{{ props.row.total_participant_lulus_jp }}</a
                        >
                      </q-td>
                      <q-td key="directorate_report" :props="props">
                        <q-btn flat round color="primary" icon="remove_red_eye" @click="handleShowDirectorateReport(props.row)" />
                        <q-btn flat round color="primary" icon="download" @click="handleDownloadDirectorateReport(props.row)" />
                      </q-td>
                    </q-tr>
                  </template>
                  <template #bottom>
                    <div class="q-pa-lg flex flex-left">
                      <p style="color:grey; font-size:12px; margin: auto;">Per Page</p>
                      &nbsp; &nbsp; &nbsp;
                      <q-select
                        v-model="rowsPerPageDirectorate"
                        :options="['3','5', '10', '15', '20','25','50','100']"
                        outlined
                        dense
                      >
                      </q-select>
                      &nbsp; &nbsp; &nbsp;
                      <p v-if="data_table_pagination.page !== Math.ceil(data_table_pagination_directorate.rowsNumber/data_table_pagination_directorate.rowsPerPage)" style="color:grey; font-size:12px; margin: auto;">Showing {{data_table_pagination_directorate.rowsPerPage*data_table_pagination_directorate.page-data_table_pagination_directorate.rowsPerPage+1}} to {{data_table_pagination_directorate.rowsPerPage*data_table_pagination_directorate.page}} of {{data_table_pagination_directorate.rowsNumber}} entries</p>
                      <p v-if="data_table_pagination.page === Math.ceil(data_table_pagination_directorate.rowsNumber/data_table_pagination_directorate.rowsPerPage)" style="color:grey; font-size:12px; margin: auto;">Showing {{data_table_pagination_directorate.rowsPerPage*data_table_pagination_directorate.page-data_table_pagination_directorate.rowsPerPage+1}} to {{data_table_pagination_directorate.rowsNumber}} of {{data_table_pagination_directorate.rowsNumber}} entries</p>
                      <!-- <strong v-if="this.data_table_pagination.page !== this.data_table_pagination.page.length - 1"> {{data_table_pagination.rowsPerPage*data_table_pagination.page}} </strong>
                      <strong v-if="this.data_table_pagination.page === this.data_table_pagination.page.length - 1"> {{data_table_pagination.rowsNumber}} </strong> of {{data_table_pagination.rowsNumber}} entries</p> -->
                    </div>
                    <q-space />

                    <div class="q-pa-lg flex flex-right">
                      <q-pagination
                        v-model="pageDirectorate"
                        direction-links
                        boundary-links
                        text-color="grey-6"
                        color="grey-6"
                        active-text-color="purple-6"
                        size="12px"
                        padding="6px 12px 6px 12px"
                        :max="Math.ceil(data_table_pagination_directorate.rowsNumber/data_table_pagination_directorate.rowsPerPage)"
                        :max-pages="4"
                      />
                    </div>
                  </template>
                </q-table>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <q-dialog v-model="modal_filter">
      <q-card class="my-card" style="height: 550px;width: 700px; max-width: 80vw; padding:16px">
        <form>
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Filter
              </div>
              <div class="col-auto text-grey text-caption row no-wrap items-center">
                <q-btn v-close-popup flat round dense icon="close" />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="coltext-subtitle3">
                Date Range
              </div>
            </div>
            <div class="row">
              <div class="col">
                    <div class="row items-center">
                      <div class="col">
                        <q-input placeholder="Start Date" outlined dense v-model="start_date_filter">
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="start_date_filter"
                                  mask="YYYY-MM-DD"
                                >
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
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div class="col">
                        <q-input placeholder="End Date" outlined dense v-model="end_date_filter">
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="end_date_filter"
                                  mask="YYYY-MM-DD">
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
                    </div>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-6" style="width:300px;">
                <div class="text-subtitle3">
                  Training Type
                </div>
                <q-option-group
                  v-model="modal_training_type"
                  :options="modal_options_training_type"
                  color="primary"
                  type="checkbox"
                />
              </div>
              <div class="col-6" style="width:300px;">
                <div class="text-subtitle3">
                  Training Position
                </div>
                <q-option-group
                  v-model="modal_status_type_km_manager"
                  :options="modal_options_status_type_km_manager"
                  color="primary"
                  type="checkbox"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn outline @click="onResetFilter()" color="primary" label="Reset"  type="reset" />
            <q-btn v-close-popup color="primary" label="Save"/>
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
    <fixed-modal
      :show="modal_list_participant"
      :title="`Participant list - ${list_participant.length}`"
      @on-close="modal_list_participant = false"
    >
      <div
        v-for="(item, index) in list_participant"
        :key="index"
        class="row q-gutter-sm items-center justify-between"
        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"
      >
        <div class="col-1">
          <div v-if="item.employee_type == 'employee'">
            <q-avatar size="30px" v-if="item.user.profile_picture != null">
              <img :src="`./api${item.user.profile_picture}`"/>
            </q-avatar>
            <q-avatar v-else color="primary" text-color="white" size="30px">{{
            item.user.name
              .match(/\b(\w)/g)
              .join('')
              .toUpperCase()
          }}</q-avatar>
          </div>
          <div v-else>
            <q-avatar color="primary" text-color="white" size="30px">{{
              item.non_employee.name
                .match(/\b(\w)/g)
                .join('')
                .toUpperCase()
            }}</q-avatar>
          </div>
        </div>
        <div class="kmp-font-md kmp-font-bold col" v-if="item.employee_type == 'employee'">
          <a
            @click="seeProfile(item.user.id)"
            class="cursor-pointer"
            style="text-decoration:none"
            >{{ item.user.name.toUpperCase() }}
          </a>
        </div>
        <div class="kmp-font-md kmp-font-bold col" v-else>{{ item.non_employee.name.toUpperCase() }}</div>
      </div>
    </fixed-modal>
    <fixed-modal
      :show="modal_list_training"
      title="Training list"
      @on-close="modal_list_training = false"
    >
    <div v-if="tab_filter == 'participant'" class="kmp-text-nama text-capitalize">Training Internal - {{list_training.length}}</div>
    <div v-if="list_training.length > 0">
      <div
        v-for="(item, index) in list_training"
        :key="index"
        class="row q-gutter-sm items-center justify-between"
        :class="index !== 0 ? 'q-mt-xs' : 'q-mt-none'"
      >
        <div class="kmp-font-sm col">
          <a
            @click="seeTraining(item.training_id)"
            class="cursor-pointer"
            style="text-decoration:none"
            >{{ item.training.name.toUpperCase() }}
          </a>
        </div>
      </div>
    </div>
    <div class="kmp-text-nama text-capitalize q-mt-md" v-if="tab_filter == 'participant'">Training Mandiri - {{list_training_eksternal.length}}</div>
    <div v-if="list_training_eksternal.length > 0 && tab_filter == 'participant'">
      <div
        v-for="(item, i) in list_training_eksternal"
        :key="i"
        class="row q-gutter-sm items-center justify-between"
        :class="i !== 0 ? 'q-mt-xs' : 'q-mt-none'"
      >
        <div class="kmp-font-sm col">
          <a
            @click="seeProfile(item.users_id)"
            class="cursor-pointer"
            style="text-decoration:none"
            >{{ item.name.toUpperCase() }}
          </a>
        </div>
      </div>
    </div>
    </fixed-modal>
    <participant-report ref="previewParticipantReport"></participant-report>
    <directorate-report ref="previewDirectorateReport"></directorate-report>
    <training-report ref="previewTrainingReport"></training-report>
    <feedback-report ref="previewFeedbackReport"></feedback-report>
    <trainings-report ref="previewTrainingsReport"></trainings-report>
    <q-dialog v-model="select_directorat" position="top">
      <q-card style="min-width: 350px;height: 380px;" class="q-py-md q-px-sm">
        <div style="border: 1.4px solid #d8d8d8; border-radius: 10px;">
          <treeselect
            v-if="tab_filter == 'training'"
            v-model="position_value"
            :options="position_options"
            close-on-select
            always-open
            :clearable="false"
            :normalizer="normalizer"
            class="vue-treeselect"
            @select="positionSelect"
          />
          <treeselect
            v-if="tab_filter == 'participant'"
            v-model="position_value_participant"
            :options="position_options"
            close-on-select
            always-open
            :clearable="false"
            :normalizer="normalizer"
            class="vue-treeselect"
            @select="positionSelectParticipant"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { getCredential } from 'src/lib/storage';
import FixedModal from 'components/common/FixedModal';
import moment from 'moment';
// import Axios from 'axios';

import {
  trainingList,
  participantList,
  organizationListDeputi,
  exportTrainingToken,
  ExportFeedback,
  exportTraining,
  ExportTrainingReport,
  trainingReportParticipant,
  trainingDirectorateSummary,
  trainingReportTraining,
  ExportParticipantReport,
  ExportDirectorateReport,
  CertificateById,
  trainingSummary,
  trainingStatistikPegawai,
  trainingStatistikPesertaPelatihan,
  trainingStatistikPeningkatanKompetensi,
  trainingStatistikMemenuhiDiklat,
  trainingStatistikPelatihanInternal,
  trainingStatistikJamPelatihanInternal
} from '../../lib/api';
import { checkRole } from '../../lib/helper';
import TrainingReport from './PreviewReport/TrainingReport.vue';
import ParticipantReport from './PreviewReport/ParticipantReport.vue';
import DirectorateReport from './PreviewReport/DirectorateReport.vue';
import FeedbackReport from './PreviewReport/FeedbackReport.vue';
import TrainingsReport from './PreviewReport/TrainingsReport.vue';

const YEAR = moment().format('YYYY');

export default {
  components: { Treeselect, FixedModal, ParticipantReport, DirectorateReport, TrainingReport, FeedbackReport, TrainingsReport },
  data() {
    return {
      sort_option: [
        {
          label: 'A-Z',
          value: 0
        },
        {
          label: 'Z-A',
          value: 1
        }
      ],
      sort: {
        label: 'A-Z',
        value: 0
      },
      modal_filter: false,
      tab_filter: 'training',
      selected: [],
      position_options: [],
      position_value: 0,
      position_title: '',
      position_value_participant: 0,
      position_title_participant: '',
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children && node.children.length ? node.children : 0
        };
      },
      is_loading_export: false,
      is_have_access: false,
      training_type: '',
      status: '',
      provider: '',
      organization_id: null,
      // start_date_filter: '',
      // end_date_filter: '',
      start_date_filter: moment().startOf('year').format('YYYY-MM-DD'),
      end_date_filter: moment().endOf('year').format('YYYY-MM-DD'),
      start_date_filter_participant: moment().startOf('year').format('YYYY-MM-DD'),
      end_date_filter_participant: moment().endOf('year').format('YYYY-MM-DD'),
      start_date_filter_directorate: moment().startOf('year').format('YYYY-MM-DD'),
      end_date_filter_directorate: moment().endOf('year').format('YYYY-MM-DD'),
      filter: '',
      filter_participant: '',
      filter_directorate: '',
      user: {
        id: '',
        name: '',
        initial: ''
      },
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      columns_table: [
        {
          name: 'no',
          field: 'no',
          label: 'No.',
          align: 'center',
          style: 'max-width:3%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'name',
          field: 'name',
          align: 'center',
          label: 'Training Name',
          style: 'max-width:38%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'training_type',
          field: 'training_type',
          align: 'center',
          label: 'Type',
          style: 'max-width:10%; white-space: normal; text-overflow: ellipsis; padding: 7px 0;'
        },
        { name: 'status', style: 'max-width:10%; white-space: normal; text-overflow: ellipsis; padding: 7px 0;', field: 'status', align: 'center', label: 'Status' },
        { name: 'date', style: 'width:120px; max-width:15%; white-space: normal; text-overflow: ellipsis;', field: 'date', align: 'center', label: 'Date' },
        { name: 'expertise', style: 'max-width:17%; white-space: normal; text-overflow: ellipsis;', field: 'expertise', align: 'center', label: 'PIC' },
        {
          name: 'jam_pelatihan',
          field: 'jam_pelatihan',
          align: 'center',
          label: 'JP',
          style: 'max-width:3%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'training_report',
          field: 'training_report',
          align: 'center',
          label: 'Training Report'
        },
        {
          name: 'feedback',
          field: 'feedback',
          align: 'center',
          label: 'Feedback Report'
        }
      ],
      data_table: [],
      data_table_loading: true,
      data_table_from_search: false,
      rowsPerPage: 10,
      separator: 'cell',
      page: 1,
      data_table_pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      columns_table_participant: [
        {
          name: 'no',
          field: 'no',
          label: 'No.',
          align: 'center',
          style: 'max-width:3%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'users_id',
          field: 'users_id',
          align: 'center',
          label: 'Name',
          style: 'max-width:38%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'direktorat_id',
          field: 'direktorat_id',
          align: 'center',
          label: 'Directorate',
          style: 'max-width:38%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'participant_report',
          field: 'participant_report',
          align: 'center',
          label: 'Participant Report'
        }
      ],
      data_table_participant: [],
      data_table_loading_participant: true,
      data_table_from_search_participant: false,
      rowsPerPageParticipant: 10,
      pageParticipant: 1,
      data_table_pagination_participant: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      modal_training_type: [],
      modal_options_training_type: [
        {
          label: 'IHT',
          value: 'IHT'
        },
        {
          label: 'Webinar',
          value: 'Webinar'
        },
        {
          label: 'Pendidikan',
          value: 'Pendidikan'
        },
        {
          label: 'Orientasi',
          value: 'Orientasi'
        },
        {
          label: 'Publik DN',
          value: 'Publik DN'
        },
        {
          label: 'Induksi',
          value: 'Induksi'
        },
        {
          label: 'Sertifikasi',
          value: 'Certification'
        }
      ],
      modal_status_type_km_manager: [],
      modal_options_status_type_km_manager: [
        {
          label: 'Open Registration',
          value: 'open_registration'
        },
        {
          label: 'Close Registration',
          value: 'close_registration'
        },
        {
          label: 'End',
          value: 'end'
        },
        {
          label: 'On Going',
          value: 'on_going'
        }
      ],
      list_participant: [],
      modal_list_participant: false,
      list_training: [],
      list_training_eksternal: [],
      modal_list_training: false,
      data_table_directorate: [],
      data_table_loading_directorate: true,
      data_table_from_search_directorate: false,
      rowsPerPageDirectorate: 10,
      pageDirectorate: 1,
      data_table_pagination_directorate: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      columns_table_directorate: [
        {
          name: 'no',
          field: 'no',
          label: 'No.',
          align: 'center',
          style: 'max-width:3%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'users_id',
          field: 'users_id',
          align: 'center',
          label: 'Name',
          style: 'max-width:38%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'participant',
          field: 'participant',
          align: 'center',
          label: 'Participant',
          style: 'max-width:38%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'participant_lulus_jp',
          field: 'participant_lulus_jp',
          align: 'center',
          label: 'Capaian 20 JP',
          style: 'max-width:38%; white-space: normal; text-overflow: ellipsis;'
        },
        {
          name: 'directorate_report',
          field: 'directorate_report',
          align: 'center',
          label: 'Directorate Report'
        }
      ],
      filter_peningkatan_kompetensi: false,
      filter_jp_20: false,
      filter_total_peserta: false,
      filter_jam_pelatihan: false,
      filter_total_training: false,
      summary: {
        total_training: {
          total: 0,
          year: YEAR,
          showing: false
        },
        target_direktorat: {
          total: 0,
          year: YEAR,
          showing: false
        },
        total_participant: {
          total: 0,
          of: 0,
          showing: false
        }
      },
      statistik: {
        pegawai: {
          total: 0,
          year: YEAR,
          loading: true
        },
        peserta_pelatihan: {
          total: 0,
          year: YEAR,
          loading: true
        },
        peningkatan_kompetensi: {
          total: 0,
          year: YEAR,
          loading: true
        },
        memenuhi_diklat: {
          total: 0,
          year: YEAR,
          loading: true
        },
        pelatihan_internal: {
          total: 0,
          year: YEAR,
          loading: true
        },
        jam_pelatihan_internal: {
          total: 0,
          year: YEAR,
          loading: true
        }
      },
      select_directorat: false
    };
  },
  methods: {
    seeParticipant(training_id = null, unit_kerja_id = null, lulus_jp = null) {
      this.list_participant = [];
      this.modal_list_participant = true;
      trainingReportParticipant({
        training_id,
        unit_kerja_id,
        lulus_jp,
        ...({ date_start: this.start_date_filter_directorate }),
        ...({ date_end: this.end_date_filter_directorate })
      }).then(response => {
        const { data } = response.data;
        this.list_participant = data;
      });
    },
    seeProfile(id) {
      this.$router.push({
        name: 'profile-detail',
        params: {
          id
        }
      });
    },
    seeTraining(id) {
      this.$router.push({
        name: 'training-detail',
        params: {
          id
        }
      });
    },
    seeParticipantTraining(users_id, employee_id, unit_kerja_id) {
      this.list_training = [];
      this.modal_list_training = true;
      let dateStart = this.start_date_filter_participant;
      let dateEnd = this.end_date_filter_participant;
      if (unit_kerja_id) {
        dateStart = this.start_date_filter_directorate;
        dateEnd = this.end_date_filter_directorate;
      }
      trainingReportTraining({
        users_id,
        employee_id,
        unit_kerja_id,
        ...({ date_start: dateStart }),
        ...({ date_end: dateEnd }) }).then(response => {
        const { data } = response.data;
        this.list_training = data;
      });
      this.list_training_eksternal = [];
      CertificateById({
        users_id,
        ...({ date_start: dateStart }),
        ...({ date_end: dateEnd }) }).then(res => {
        res.data.forEach((v, i) => {
          this.list_training_eksternal.push({
            users_id: v.users_id,
            name: v.name
          });
        });
      });
    },
    positionSelectParticipant(node) {
      this.position_value_participant = node.id;
      this.position_title_participant = node.name;
      this.handleFilterParticipant(true);
      this.select_directorat = false;
    },
    positionSelect(node) {
      this.position_value = node.id;
      this.position_title = node.name;
      this.handleFilter(this.position_value);
      this.handleFilter();
      this.select_directorat = false;
    },
    getTraining(offset = 1, limit = 10) {
      this.data_table_loading = true;
      trainingList({
        offset,
        limit,
        ...(this.data_table_from_search && {
          tab_filter: this.tab_filter,
          date_start: this.start_date_filter,
          date_end: this.end_date_filter,
          search_term: this.filter,
          organization_id: this.position_value,
          status_filter: this.status_filter,
          training_type_filter: this.training_type_filter
        })
      })
        .then(response => {
          const hasil = response.data.data;
          if (hasil) {
            this.data_table = hasil.map((item, index) => ({
              ...item,
              no: index + limit * (offset - 1) + 1
            }));

            const { current_page, total } = response.data;
            this.data_table_pagination.page = current_page;
            this.data_table_pagination.rowsPerPage = limit;
            this.data_table_pagination.rowsNumber = total;
          }
        });
      this.data_table_loading = false;
    },
    getParticipant(offset = 1, limit = 10) {
      this.data_table_loading_participant = true;
      participantList({
        offset,
        limit,
        ...(this.data_table_from_search_participant && {
          organization_id: this.position_value_participant,
          search_term: this.filter_participant,
          date_start: this.start_date_filter_participant,
          date_end: this.end_date_filter_participant,
          sort: this.sort.value
        })
      })
        .then(response => {
          const hasil = response.data.data;
          if (hasil) {
            this.data_table_participant = hasil.map((item, index) => ({
              ...item,
              no: index + limit * (offset - 1) + 1
            }));

            const { current_page } = response.data;
            const { total_data } = response.meta;
            this.data_table_pagination_participant.page = current_page;
            this.data_table_pagination_participant.rowsPerPage = limit;
            this.data_table_pagination_participant.rowsNumber = total_data;
          }
        });
      this.data_table_loading_participant = false;
    },
    handleFilter(unit_kerja_id = 0) {
      this.data_table_loading = true;
      let isStartDate = true;
      let isEndDate = true;
      if (this.start_date_filter === '' || !this.isValidDate(this.start_date_filter)) isStartDate = false;
      if (this.end_date_filter === '' || !this.isValidDate(this.end_date_filter)) isEndDate = false;

      const raw_start_date_filter = new Date(this.start_date_filter);
      const year_start_filter = raw_start_date_filter.getFullYear();
      const raw_end_date_filter = new Date(this.end_date_filter);
      const year_end_filter = raw_end_date_filter.getFullYear();
      if (this.start_date_filter === '' && this.end_date_filter === '') {
        this.start_date_filter = '';
        this.end_date_filter = '';
      } else if (year_start_filter !== year_end_filter) {
        this.$q.notify({
          message: 'Gagal melakukan filter, tahun tidak sama!',
          color: 'red',
          position: 'center',
          actions: [
            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 60000
        });
        this.data_table_loading = false;
        return;
      }

      this.data_table = [];
      this.data_table_from_search = true;
      this.data_table_pagination.page = 1;
      this.page = 1;
      // this.status_filter = this.modal_status_type_km_manager[0] || 'Open Registration';

      const { page: offset, rowsPerPage: limit } = this.data_table_pagination;
      trainingList({
        offset,
        limit,
        tab_filter: this.tab_filter,
        ...(isStartDate && { date_start: this.start_date_filter }),
        ...(isEndDate && { date_end: this.end_date_filter }),
        ...(this.filter !== '' && { search_term: this.filter }),
        ...({ organization_id: this.position_value }),
        ...({ status_filter: this.status_filter }),
        ...({ training_type_filter: this.training_type_filter })
      }).then(response => {
        const hasil = response.data.data;
        if (hasil) {
          this.data_table = hasil.map((item, index) => ({ ...item, no: index + limit * (offset - 1) + 1 }));
          const { current_page, total } = response.data;
          this.data_table_pagination.page = current_page;
          this.data_table_pagination.rowsNumber = total;
        }
      });
      this.data_table_loading = false;

      this.getTrainingStatistikPegawai(year_start_filter, unit_kerja_id);
      this.getTrainingStatistikPesertaPelatihan(year_start_filter, unit_kerja_id);
      this.getTrainingStatistikPeningkatanKompetensi(year_start_filter, unit_kerja_id);
      this.getTrainingStatistikMemenuhiDiklat(year_start_filter, unit_kerja_id);
      this.getTrainingStatistikPelatihanInternal(year_start_filter, unit_kerja_id);
      this.getTrainingStatistikJamPelatihanInternal(year_start_filter, unit_kerja_id);
    },
    handleFilterNotSearch() {
      this.data_table_loading = true;
      let isStartDate = true;
      let isEndDate = true;
      if (this.start_date_filter === '' || !this.isValidDate(this.start_date_filter)) isStartDate = false;
      if (this.end_date_filter === '' || !this.isValidDate(this.end_date_filter)) isEndDate = false;

      const raw_start_date_filter = new Date(this.start_date_filter);
      const year_start_filter = raw_start_date_filter.getFullYear();
      const raw_end_date_filter = new Date(this.end_date_filter);
      const year_end_filter = raw_end_date_filter.getFullYear();
      if (this.start_date_filter === '' && this.end_date_filter === '') {
        this.start_date_filter = String(new Date().getFullYear()).concat('/01/01');
        this.end_date_filter = String(new Date().getFullYear()).concat('/12/31');
      } else if (year_start_filter !== year_end_filter) {
        this.$q.notify({
          message: 'Gagal melakukan filter, tahun tidak sama!',
          color: 'red',
          position: 'center',
          actions: [
            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 60000
        });
        this.data_table_loading = false;
        return;
      }
      this.data_table = [];
      this.data_table_from_search = true;
      this.data_table_pagination.page = this.page;
      this.data_table_pagination.rowsPerPage = this.rowsPerPage;

      const { page: offset, rowsPerPage: limit } = this.data_table_pagination;
      trainingList({
        offset,
        limit,
        tab_filter: this.tab_filter,
        ...(isStartDate && { date_start: this.start_date_filter }),
        ...(isEndDate && { date_end: this.end_date_filter }),
        ...(this.filter !== '' && { search_term: this.filter }),
        ...({ organization_id: this.position_value }),
        ...({ status_filter: this.status_filter }),
        ...({ training_type_filter: this.training_type_filter })
      }).then(response => {
        const hasil = response.data.data;
        if (hasil) {
          this.data_table = hasil.map((item, index) => ({ ...item, no: index + limit * (offset - 1) + 1 }));
          const { current_page, total } = response.data;
          this.data_table_pagination.page = current_page;
          this.data_table_pagination.rowsPerPage = limit;
          this.data_table_pagination.rowsNumber = total;
        }
      });
      this.data_table_loading = false;

      this.getTrainingStatistikPegawai(year_start_filter);
      this.getTrainingStatistikPesertaPelatihan(year_start_filter);
      this.getTrainingStatistikPeningkatanKompetensi(year_start_filter);
      this.getTrainingStatistikMemenuhiDiklat(year_start_filter);
      this.getTrainingStatistikPelatihanInternal(year_start_filter);
      this.getTrainingStatistikJamPelatihanInternal(year_start_filter);
    },
    handleFilterParticipant(ket) {
      let isStartDate = true;
      let isEndDate = true;
      if (this.start_date_filter_participant === '' || !this.isValidDate(this.start_date_filter_participant)) isStartDate = false;
      if (this.end_date_filter_participant === '' || !this.isValidDate(this.end_date_filter_participant)) isEndDate = false;

      const raw_start_date_filter = new Date(this.start_date_filter_participant);
      const year_start_filter = raw_start_date_filter.getFullYear();
      const raw_end_date_filter = new Date(this.end_date_filter_participant);
      const year_end_filter = raw_end_date_filter.getFullYear();
      if (this.start_date_filter_participant === '' && this.end_date_filter_participant === '') {
        if (ket === true) {
          this.start_date_filter_participant = '';
          this.end_date_filter_participant = '';
        } else {
          this.start_date_filter_participant = String(new Date().getFullYear()).concat('/01/01');
          this.end_date_filter_participant = String(new Date().getFullYear()).concat('/12/31');
        }
      } else if (year_start_filter !== year_end_filter) {
        this.$q.notify({
          message: 'Gagal melakukan filter, tahun tidak sama!',
          color: 'red',
          position: 'center',
          actions: [
            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 60000
        });
        this.data_table_loading_participant = false;
        return;
      }
      if (ket === true) {
        this.data_table_pagination_participant.page = 1;
        this.pageParticipant = 1;
      } else {
        this.data_table_pagination_participant.page = this.pageParticipant;
        this.data_table_pagination_participant.rowsPerPage = this.rowsPerPageParticipant;
      }
      this.data_table_loading_participant = true;
      this.data_table_participant = [];
      this.data_table_from_search_participant = true;
      const { page: offset, rowsPerPage: limit } = this.data_table_pagination_participant;
      participantList({
        offset,
        limit,
        ...(isStartDate && { date_start: this.start_date_filter_participant }),
        ...(isEndDate && { date_end: this.end_date_filter_participant }),
        ...(this.filter_participant !== '' && { search_term: this.filter_participant }),
        ...({ organization_id: this.position_value_participant }),
        ...({ sort: this.sort.value }),
        ...({ kompentensi: this.filter_peningkatan_kompetensi }),
        ...({ jp_20: this.filter_jp_20 })
      }).then(response => {
        const hasil = response.data.data;
        if (hasil) {
          this.data_table_participant = hasil.map((item, index) => ({ ...item, no: index + limit * (offset - 1) + 1 }));
          const { current_page } = response.data;
          const { total_data } = response.meta;
          this.data_table_pagination_participant.page = current_page;
          if (ket === false) {
            this.data_table_pagination_participant.rowsPerPage = limit;
          }
          this.data_table_pagination_participant.rowsNumber = total_data;
        }
      });
      this.data_table_loading_participant = false;

      this.getTrainingStatistikPegawai(year_start_filter);
      this.getTrainingStatistikPesertaPelatihan(year_start_filter);
      this.getTrainingStatistikPeningkatanKompetensi(year_start_filter);
      this.getTrainingStatistikMemenuhiDiklat(year_start_filter);
      this.getTrainingStatistikPelatihanInternal(year_start_filter);
      this.getTrainingStatistikJamPelatihanInternal(year_start_filter);
    },
    getOrganization() {
      organizationListDeputi({
        ...(this.is_have_access && { limit: 1000 })
      }).then(response => {
        const hasil = response.data;
        if (this.is_have_access) {
          this.position_title = 'ALL KPK';
          this.position_title_participant = 'ALL KPK';
          this.position_options = [{ id: 0, name: 'ALL KPK' }, ...hasil];
        }
        if (!this.is_have_access) this.position_title = hasil.name;
      });
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      if (checkRole().name === 'km_manager' || checkRole().name === 'training_manager') {
        this.is_have_access = true;
      } else {
        this.$router.push('/dashboard');
      }
      // profile.roles.forEach((v, i) => {
      //   if (v.name === 'km_manager') {
      //     this.is_have_access = true;
      //   }
      // });
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
    },
    parseDate(date, format = 'DD MMMM YYYY') {
      return moment(new Date(date)).format(format);
    },
    parseTime(time) {
      const sTime = time.split(':');
      return `${sTime[0]}:${sTime[1]}`;
    },
    handleShowTrainingsReport() {
      exportTrainingToken()
        .then(response => {
          const { rowsPerPage, page } = this.data_table_pagination;
          const rpp = rowsPerPage === 0 ? 10000 : rowsPerPage;
          const select = this.selected.map(item => item.id);
          const ids = select.toString();
          const data = {
            ids,
            limit: rpp,
            offset: page - 1,
            start_date: this.start_date_filter,
            end_date: this.end_date_filter,
            organization_id: this.position_value,
            token: response.data
          };
          this.$refs.previewTrainingsReport.open(data);
        });
    },
    handleDownloadTraining() {
      this.is_loading_export = true;
      exportTrainingToken()
        .then(response => {
          const { rowsPerPage, page } = this.data_table_pagination;
          const rpp = rowsPerPage === 0 ? 10000 : rowsPerPage;
          const select = this.selected.map(item => item.id);
          const ids = select.toString();
          const data = {
            ids,
            limit: rpp,
            offset: page - 1,
            start_date: this.start_date_filter,
            end_date: this.end_date_filter,
            organization_id: this.position_value,
            token: response.data
          };
          exportTraining(data).then(res => {});
          // window.open(`./api/api/export-training?ids=${ids}&limit=${rpp}&offset=${page - 1}&start_date=${this.start_date_filter}&end_date=${this.end_date_filter}&organization_id=${this.position_value}&token=${response.data}`);
        })
        .finally(() => {
          this.is_loading_export = false;
        });
    },
    onRequestGetTraining(props) {
      // const { page, rowsPerPage } = props.pagination;
      // this.getTraining(page, rowsPerPage);
      this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
    },
    onRequestGetParticipant(props) {
      this.getParticipant(this.data_table_pagination_participant.page, this.data_table_pagination_participant.rowsPerPage);
    },
    onRequestGetDirectorate(props) {
      this.getDirectorate(this.data_table_pagination_directorate.page, this.data_table_pagination_directorate.rowsPerPage);
    },
    handleDownloadFeedback(row) {
      ExportFeedback(row.id).then(res => {});
      // window.open(`./api/api/export-feedback/${row.id}`);
    },
    handleDownloadTrainingReport(row) {
      ExportTrainingReport(row.id).then(res => {});
      // window.open(`./api/api/export-training-report/${row.id}`);
    },
    handleShowTrainingReport(row) {
      this.$refs.previewTrainingReport.open(row.id);
    },
    handleShowFeedbackReport(row) {
      this.$refs.previewFeedbackReport.open(row.id);
    },
    handleDownloadParticipantReport(row) {
      const date_start = this.start_date_filter_participant;
      const date_end = this.end_date_filter_participant;
      const id_employee = row.users_id;
      const id_non_employee = row.employee_id;
      ExportParticipantReport(
        {
          id_employee,
          id_non_employee,
          date_start,
          date_end
        }
      ).then(res => {});
      // window.open(`./api/api/export-training-report/${row.users_id}`);
    },
    handleShowParticipantReport(row) {
      const date_start = this.start_date_filter_participant;
      const date_end = this.end_date_filter_participant;
      const id_employee = row.users_id;
      const id_non_employee = row.employee_id;
      const data = {
        id_employee,
        id_non_employee,
        date_start,
        date_end
      };
      this.$refs.previewParticipantReport.open(data);
    },
    handleDownloadDirectorateReport(row) {
      const date_start = this.start_date_filter_directorate;
      const date_end = this.end_date_filter_directorate;
      ExportDirectorateReport(
        row.id,
        {
          date_start,
          date_end
        }
      ).then(res => {});
      // window.open(`./api/api/export-training-reportama/${row.users_id}`);
    },
    handleShowDirectorateReport(row) {
      const date_start = this.start_date_filter_directorate;
      const date_end = this.end_date_filter_directorate;
      const row_id = row.id;
      const data = {
        row_id,
        date_start,
        date_end
      };
      this.$refs.previewDirectorateReport.open(data);
    },
    isValidDate(date) {
      if (date !== null) {
        const sDate = date.split('-');
        return !Number.isNaN(Number(sDate[0])) && !Number.isNaN(Number(sDate[1])) && !Number.isNaN(Number(sDate[2]));
      }
      return null;
    },
    onResetFilter() {
      this.status_filter = null;
      this.training_type_filter = null;
      // this.position_value = 0;
      this.start_date_filter = moment().startOf('year').format('YYYY-MM-DD');
      this.end_date_filter = moment().endOf('year').format('YYYY-MM-DD');
      this.modal_training_type = [];
      this.modal_status_type_km_manager = [];
      this.filter = '';
    },
    onResetFilterParticipant() {
      this.start_date_filter_participant = moment().startOf('year').format('YYYY-MM-DD');
      this.end_date_filter_participant = moment().endOf('year').format('YYYY-MM-DD');
      this.sort.value = 0;
      this.filter_participant = '';
    },
    getDirectorate(offset = 1, limit = 10) {
      this.data_table_loading_directorate = true;
      // const { page: offset, rowsPerPage: limit } = this.data_table_pagination_directorate;
      trainingDirectorateSummary({
        offset,
        limit,
        ...(this.data_table_from_search_directorate
        && {
          search_term: this.filter_directorate
        })
      })
        .then(response => {
          const hasil = response.data.data;
          if (hasil) {
            this.data_table_directorate = hasil.map((item, index) => ({
              ...item,
              no: index + limit * (offset - 1) + 1
            }));

            const { current_page, total } = response.data;
            this.data_table_pagination_directorate.page = current_page;
            this.data_table_pagination_directorate.rowsPerPage = limit;
            this.data_table_pagination_directorate.rowsNumber = total;
          }
        });
      this.data_table_loading_directorate = false;
    },
    handleFilterDirectorate(ket) {
      let isStartDate = true;
      let isEndDate = true;
      if (this.start_date_filter_directorate === '' || !this.isValidDate(this.start_date_filter_directorate)) isStartDate = false;
      if (this.end_date_filter_directorate === '' || !this.isValidDate(this.end_date_filter_directorate)) isEndDate = false;

      const raw_start_date_filter = new Date(this.start_date_filter_directorate);
      const year_start_filter = raw_start_date_filter.getFullYear();
      const raw_end_date_filter = new Date(this.end_date_filter_directorate);
      const year_end_filter = raw_end_date_filter.getFullYear();
      if (this.start_date_filter_directorate === '' && this.end_date_filter_directorate === '') {
        if (ket === true) {
          this.start_date_filter_directorate = '';
          this.end_date_filter_directorate = '';
        } else {
          this.start_date_filter_directorate = String(new Date().getFullYear()).concat('/01/01');
          this.end_date_filter_directorate = String(new Date().getFullYear()).concat('/12/31');
        }
      } else if (year_start_filter !== year_end_filter) {
        this.$q.notify({
          message: 'Gagal melakukan filter, tahun tidak sama!',
          color: 'red',
          position: 'center',
          actions: [
            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 60000
        });
        this.data_table_loading_directorate = false;
        return;
      }
      if (ket === true) {
        this.data_table_pagination_directorate.page = 1;
        this.pageDirectorate = 1;
      } else {
        this.data_table_pagination_directorate.page = this.pageDirectorate;
        this.data_table_pagination_directorate.rowsPerPage = this.rowsPerPageDirectorate;
      }
      this.data_table_loading_directorate = true;
      this.data_table_directorate = [];
      this.data_table_from_search_directorate = true;
      const { page: offset, rowsPerPage: limit } = this.data_table_pagination_directorate;
      trainingDirectorateSummary({
        offset,
        limit,
        ...(isStartDate && { date_start: this.start_date_filter_directorate }),
        ...(isEndDate && { date_end: this.end_date_filter_directorate }),
        ...(this.filter_directorate !== '' && { search_term: this.filter_directorate })
      }).then(response => {
        const hasil = response.data.data;
        if (hasil) {
          this.data_table_directorate = hasil.map((item, index) => ({ ...item, no: index + limit * (offset - 1) + 1 }));
          const { current_page, total } = response.data;
          this.data_table_pagination_directorate.page = current_page;
          if (ket === false) {
            this.data_table_pagination_directorate.rowsPerPage = limit;
          }
          this.data_table_pagination_directorate.rowsNumber = total;
        }
      });
      this.data_table_loading_directorate = false;

      this.getTrainingStatistikPegawai(year_start_filter);
      this.getTrainingStatistikPesertaPelatihan(year_start_filter);
      this.getTrainingStatistikPeningkatanKompetensi(year_start_filter);
      this.getTrainingStatistikMemenuhiDiklat(year_start_filter);
      this.getTrainingStatistikPelatihanInternal(year_start_filter);
      this.getTrainingStatistikJamPelatihanInternal(year_start_filter);
    },
    getTrainingSummary() {
      trainingSummary().then(response => {
        if (response && response.data) {
          const hasil = response.data;
          this.summary = hasil;
        }
      });
    },
    getTrainingStatistikPegawai(year, unit_kerja_id = 0) {
      this.statistik.pegawai.loading = true;
      trainingStatistikPegawai({
        year,
        unit_kerja_id
      }).then(response => {
        if (response && response.data) {
          const hasil = response.data;
          this.statistik.pegawai.loading = false;
          this.statistik.pegawai.year = year;
          this.statistik.pegawai.total = hasil.statistik;
        }
      });
    },
    getTrainingStatistikPesertaPelatihan(year, unit_kerja_id = 0) {
      this.statistik.peserta_pelatihan.loading = true;
      trainingStatistikPesertaPelatihan({
        year,
        unit_kerja_id
      }).then(response => {
        if (response && response.data) {
          const hasil = response.data;
          this.statistik.peserta_pelatihan.loading = false;
          this.statistik.peserta_pelatihan.year = year;
          this.statistik.peserta_pelatihan.total = hasil.statistik;
        }
      });
    },
    getTrainingStatistikPeningkatanKompetensi(year, unit_kerja_id = 0) {
      this.statistik.peningkatan_kompetensi.loading = true;
      trainingStatistikPeningkatanKompetensi({
        year,
        unit_kerja_id
      }).then(response => {
        if (response && response.data) {
          const hasil = response.data;
          this.statistik.peningkatan_kompetensi.loading = false;
          this.statistik.peningkatan_kompetensi.year = year;
          this.statistik.peningkatan_kompetensi.total = hasil.statistik;
        }
      });
    },
    getTrainingStatistikMemenuhiDiklat(year, unit_kerja_id = 0) {
      this.statistik.memenuhi_diklat.loading = true;
      trainingStatistikMemenuhiDiklat({
        year,
        unit_kerja_id
      }).then(response => {
        if (response && response.data) {
          const hasil = response.data;
          this.statistik.memenuhi_diklat.loading = false;
          this.statistik.memenuhi_diklat.year = year;
          this.statistik.memenuhi_diklat.total = hasil.statistik;
        }
      });
    },
    getTrainingStatistikPelatihanInternal(year, unit_kerja_id = 0) {
      this.statistik.pelatihan_internal.loading = true;
      trainingStatistikPelatihanInternal({
        year,
        unit_kerja_id
      }).then(response => {
        if (response && response.data) {
          const hasil = response.data;
          this.statistik.pelatihan_internal.loading = false;
          this.statistik.pelatihan_internal.year = year;
          this.statistik.pelatihan_internal.total = hasil.statistik;
        }
      });
    },
    getTrainingStatistikJamPelatihanInternal(year, unit_kerja_id = 0) {
      this.statistik.jam_pelatihan_internal.loading = true;
      trainingStatistikJamPelatihanInternal({
        year,
        unit_kerja_id
      }).then(response => {
        if (response && response.data) {
          const hasil = response.data;
          this.statistik.jam_pelatihan_internal.loading = false;
          this.statistik.jam_pelatihan_internal.year = year;
          this.statistik.jam_pelatihan_internal.total = hasil.statistik;
        }
      });
    },
    focusParticipant() {
      const targetElement = this.$refs.focusParticipant;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetElement.focus();
      }
    },
    focusTraining() {
      const targetElement = this.$refs.focusTraining;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.focus();
      }
    },
    openDialog(val) {
      this.select_directorat = true;
    }
  },
  mounted() {
    this.getTraining();
    this.getParticipant();
    this.getDirectorate();
    this.getOrganization();
    this.getUser();
    this.getTrainingSummary();
    this.getTrainingStatistikPegawai(YEAR);
    this.getTrainingStatistikPesertaPelatihan(YEAR);
    this.getTrainingStatistikPeningkatanKompetensi(YEAR);
    this.getTrainingStatistikMemenuhiDiklat(YEAR);
    this.getTrainingStatistikPelatihanInternal(YEAR);
    this.getTrainingStatistikJamPelatihanInternal(YEAR);
  },
  watch: {
    filter_jam_pelatihan(newId, oldId) {
      if (oldId === true) {
        // this.resetSummary();
        this.getTraining();
      } else {
        this.tab_filter = 'training';
        this.onResetFilter();
        this.filter_jp_20 = false;
        this.filter_peningkatan_kompetensi = false;
        this.filter_total_peserta = false;
        this.filter_total_training = false;
        this.getTraining();
        this.focusTraining();
      }
    },
    filter_total_training(newId, oldId) {
      if (oldId === true) {
        // this.resetSummary();
        this.getTraining();
      } else {
        this.tab_filter = 'training';
        this.onResetFilter();
        this.filter_jp_20 = false;
        this.filter_peningkatan_kompetensi = false;
        this.filter_total_peserta = false;
        this.filter_jam_pelatihan = false;
        this.getTraining();
        this.focusTraining();
      }
    },
    filter_jp_20(newId, oldId) {
      if (oldId === true) {
        // this.resetSummary();
        this.handleFilterParticipant(true);
      } else {
        this.tab_filter = 'participant';
        this.onResetFilterParticipant();
        this.filter_peningkatan_kompetensi = false;
        this.filter_total_peserta = false;
        this.filter_jam_pelatihan = false;
        this.filter_total_training = false;
        this.handleFilterParticipant(true);
        this.focusParticipant();
      }
    },
    filter_peningkatan_kompetensi(newId, oldId) {
      if (oldId === true) {
        // this.resetSummary();
        this.handleFilterParticipant(true);
      } else {
        this.tab_filter = 'participant';
        this.onResetFilterParticipant();
        this.filter_jp_20 = false;
        this.filter_total_peserta = false;
        this.filter_jam_pelatihan = false;
        this.filter_total_training = false;
        this.handleFilterParticipant(true);
        this.focusParticipant();
      }
    },
    filter_total_peserta(newId, oldId) {
      if (oldId === true) {
        // this.resetSummary();
        this.handleFilterParticipant(true);
      } else {
        this.tab_filter = 'participant';
        this.onResetFilterParticipant();
        this.filter_jp_20 = false;
        this.filter_peningkatan_kompetensi = false;
        this.filter_jam_pelatihan = false;
        this.filter_total_training = false;
        this.handleFilterParticipant(true);
        this.focusParticipant();
      }
    },
    modal_training_type(newId, oldId) {
      this.training_type_filter = this.modal_training_type;
    },
    modal_status_type_km_manager(newId, oldId) {
      this.status_filter = this.modal_status_type_km_manager;
    },
    data_table_pagination(newId, oldId) {
      this.columns_table[3].label = 'Training Position';
    },
    rowsPerPage(newId, oldId) {
      this.data_table_pagination.rowsPerPage = this.rowsPerPage;
      this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
      if (this.data_table_from_search === true) {
        this.handleFilterNotSearch();
      }
    },
    page(newId, oldId) {
      this.data_table_pagination.page = this.page;
      this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
      if (this.data_table_from_search === true) {
        this.handleFilterNotSearch();
      }
    },
    rowsPerPageParticipant(newId, oldId) {
      this.data_table_pagination_participant.rowsPerPage = this.rowsPerPageParticipant;
      this.getParticipant(this.data_table_pagination_participant.page, this.data_table_pagination_participant.rowsPerPage);
      if (this.data_table_from_search_participant === true) {
        this.handleFilterParticipant(false);
      }
    },
    pageParticipant(newId, oldId) {
      this.data_table_pagination_participant.page = this.pageParticipant;
      this.getParticipant(this.data_table_pagination_participant.page, this.data_table_pagination_participant.rowsPerPage);
      if (this.data_table_from_search_participant === true) {
        this.handleFilterParticipant(false);
      }
    },
    rowsPerPageDirectorate(newId, oldId) {
      this.data_table_pagination_directorate.rowsPerPage = this.rowsPerPageDirectorate;
      this.getDirectorate(this.data_table_pagination_directorate.page, this.data_table_pagination_directorate.rowsPerPage);
      if (this.data_table_from_search_directorate === true) {
        this.handleFilterDirectorate(false);
      }
    },
    pageDirectorate(newId, oldId) {
      this.data_table_pagination_directorate.page = this.pageDirectorate;
      this.getDirectorate(this.data_table_pagination_directorate.page, this.data_table_pagination_directorate.rowsPerPage);
      if (this.data_table_from_search_directorate === true) {
        this.handleFilterDirectorate(false);
      }
    }
  }
};
</script>

<style>
.q-tree__node-header-content .row {
flex-wrap: inherit;
}
.q-item__section--avatar {
min-width: 0px;
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
/* span.q-btn__wrapper {
  padding: 4px;
} */
.q-table td{
  border-color: #838FA7 !important;
}
.q-table th{
  border-color: #838FA7 !important;
}
.q-table__bottom{
  border-color: #838FA7 !important;
}
.kmp-border-color-1{
  border-color: #838FA7 !important;
}
.text-light-green-13 {
  color: #6BCC49 !important;
}
.text-light-green-1 {
  color: #EFFFEA !important;
}
.red {
  color: #F33F6A !important;
}
.red-1 {
  color: #FFECF0 !important;
}
.orange {
  color: #FFB038 !important;
}
.orange-1 {
  color: #FFF7EC !important;
}
.text-yellow-12{
  color: #E4C311 !important;
}
/* span.q-btn__wrapper:before {
content: none;
} */
.hot-display-license-info {
  display: none !important;
}

.ht_master .wtHolder {
    overflow: visible !important;
}
.wtHolder {
    overflow: visible !important;
}
.handsontable .ht_master thead, .handsontable .ht_master tr th, .handsontable .ht_clone_inline_start thead {
    visibility: initial !important;
}
</style>

