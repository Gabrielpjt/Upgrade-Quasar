<template>
  <div>
    <div class="q-pb-md q-pr-md ">
      <q-card class="kmp-card-rounded q-px-md q-py-sm">
        <q-card-section>
          <div class="row items-center cursor-pointer">
            <q-icon name="business_center" class="q-mr-sm text-blue" size="24px"/>
            <div>
              <span class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md cursor-pointer">
                {{ position_title }}
                <span>
                  <q-icon name="chevron_right" size="20px"/>
                </span>
              </span>
              <q-popup-proxy v-model="position_show" transition-show="flip-up" transition-hide="flip-down">
                <q-banner style="max-width: 500px; min-height: 0 !important; padding: 0 !important">
                  <treeselect
                    v-model="position_value"
                    :options="position_options"
                    append-to-body
                    close-on-select
                    :clearable="false"
                    :normalizer="normalizer"
                    class="vue-treeselect"
                    @select="positionSelect"
                  />
                </q-banner>
              </q-popup-proxy>
            </div>
          </div>
        </q-card-section>
        <div class="row q-mb-sm">
          <div class="col-4 q-pa-sm">
            <q-card
              class="kmp-card-rounded q-pa-md kmp-color-2"
              style="background-color:#EBFFE8"
            >
              <span class="">Total Training</span>
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
                    {{ summary.total_training.total }}
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
              <span class="kmp-color-3 text-bold">Target Direktorat</span>
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
              <span class="kmp-color-4 text-bold">Total Participant</span>
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
                    of {{ summary.total_participant.of }}
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
        <q-separator class="q-mx-sm" />
        <div class="row q-mx-sm q-mb-md q-mt-md">
          <span class="kmp-font-md kmp-font-bold" style="font-size:16px"
            >Training List</span
          >
        </div>
        <div class="row q-mx-sm q-mb-md q-mt-md">
          <div class="col-8">
            <div class="row q-gutter-md">
              <div class="col-4">
                <q-input
                  ref="filter"
                  outlined
                  dense
                  v-model="filter"
                  placeholder="Nama training"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="col-6">
                <div class="row items-center">
                  <div class="col-5">
                    <q-input outlined dense v-model="start_date_filter">
                      <template v-slot:prepend>
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
                  <div class="col-2">
                    <div class="text-center">To</div>
                  </div>
                  <div class="col-5">
                    <q-input outlined dense v-model="end_date_filter">
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="end_date_filter" mask="YYYY-MM-DD">
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
                <q-btn color="primary" label="Search" @click="handleFilter(false)" />
              </div>
            </div>
          </div>
          <div class="col row justify-end q-gutter-sm" v-if="is_km_manager==true">
            <q-btn outline color="primary" no-caps label="Add New Training" @click="openModalTraining('add');"/>
            <q-btn outline color="primary" no-caps label="Export Training" @click="handleDownloadTraining();"/>
          </div>
        </div>
        <div class="row q-mx-sm q-mb-md q-mt-md">
          <div class="col-12">
            <q-table
              flat
              bordered
              class="kmp-table-header-1 kmp-border-color-1 kmp-rounded-2"
              :columns="columns_table"
              :data="data_table"
              v-model:pagination="pagination"
              row-key="name"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="no" :props="props"> {{ props.row.no }}. </q-td>
                  <q-td key="name" class="text-left" :props="props">
                    <a
                      href="training/#"
                      @click="openModalTraining('detail', props.row)"
                      class="text-blue"
                      style="text-decoration:none"
                      >{{ props.row.name }}</a
                    >
                  </q-td>
                  <q-td key="training_type" :props="props">
                    <div v-if="props.row.training_type">
                      <span
                        v-if="
                          props.row.training_type.toLowerCase() == 'training'
                        "
                      >
                        <q-badge color="blue" roundedclass="q-ma-sm">{{
                          props.row.training_type
                        }}</q-badge>
                      </span>
                      <span
                        v-else-if="
                          props.row.training_type.toLowerCase() == 'webinar'
                        "
                      >
                        <q-badge color="red" class="q-ma-sm">{{
                          props.row.training_type
                        }}</q-badge>
                      </span>
                      <span
                        v-else-if="
                          props.row.training_type.toLowerCase() ==
                            'certification'
                        "
                      >
                        <q-badge color="green" class="q-ma-sm">{{
                          props.row.training_type
                        }}</q-badge>
                      </span>
                      <span v-else>
                        <q-badge color="yellow" class="q-ma-sm">{{
                          props.row.training_type
                        }}</q-badge>
                      </span>
                    </div>
                    <span v-else>-</span>
                  </q-td>
                  <q-td key="status" :props="props">
                    <div v-if="props.row.status">
                      <span v-if="props.row.status.toLowerCase() == 'draft'">
                        <q-badge color="#bcc213" roundedclass="q-ma-sm"
                          >Draft</q-badge
                        >
                      </span>
                      <span
                        v-else-if="
                          props.row.status.toLowerCase() == 'open_registration'
                        "
                      >
                        <q-badge color="green" class="q-ma-sm"
                          >Open Registration</q-badge
                        >
                      </span>
                      <span
                        v-else-if="
                          props.row.status.toLowerCase() == 'close_registration'
                        "
                      >
                        <q-badge color="blue" class="q-ma-sm"
                          >Close Registration</q-badge
                        >
                      </span>
                      <span v-else>
                        <q-badge color="red" class="q-ma-sm">End</q-badge>
                      </span>
                    </div>
                    <span v-else>-</span>
                  </q-td>
                  <q-td key="date" :props="props">
                    <div
                      class="cursor-pointer"
                      v-if="props.row.schedule.length > 1"
                      @click="handleGetOtherSchedule(props.row.id)"
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
                      }},
                      <span
                        v-if="
                          props.row.schedule[0].time_start &&
                            props.row.schedule[0].time_end
                        "
                        >{{
                          `${parseTime(
                            props.row.schedule[0].time_start
                          )} - ${parseTime(props.row.schedule[0].time_end)}`
                        }}</span
                      >
                    </div>
                  </q-td>
                  <!-- <q-td key="status" :props="props">
                    {{ handleStatusSchedule(props.row) }}
                  </q-td> -->
                  <q-td key="provider" :props="props">
                    {{ props.row.provider }}
                  </q-td>
                  <q-td key="action" :props="props">
                    <div>
                      <!-- <q-spinner
                          v-if="isLoadingButtonAction==true"
                        color="primary"
                        size="3em"
                      /> -->
                      <q-btn-dropdown color="primary" icon="settings" size="sm" v-if="is_km_manager==true">
                        <q-list>
                          <q-item
                            clickable
                            v-close-popup
                            @click="openModalTraining('edit', props.row)"
                          >
                            <q-item-section>
                              <q-item-label>Edit Training</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-close-popup
                            @click="handleDownloadParticipant(props.row)"
                          >
                            <q-item-section>
                              <q-item-label>Download Participant</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-close-popup
                            @click="
                              openModalTraining('update_score', props.row)
                            "
                          >
                            <q-item-section>
                              <q-item-label>Update Score</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-close-popup
                            @click="openModalTraining('edit_open', props.row)"
                          >
                            <q-item-section>
                              <q-item-label>Open for Registration</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-close-popup
                            @click="openModalTraining('edit_close', props.row)"
                          >
                            <q-item-section>
                              <q-item-label
                                >Close for Registration</q-item-label
                              >
                            </q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-close-popup
                            @click="openModalTraining('delete', props.row)"
                          >
                            <q-item-section>
                              <q-item-label>End Training</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-btn-dropdown>
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
    </div>
    <fixed-modal
      :show="modal_add_training"
      :title="`${training_modal_title} Training`"
      width="560"
      @on-close="modal_add_training = false"
    >
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Training Name</div>
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
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-6 q-pr-sm">
            <div class="text-neutral">Training Type</div>
            <q-select
              v-model="training_type"
              :options="[
                'Webinar',
                'Certification',
                'Induksi',
                'IHT',
                'Publik DN',
                'Pendidikan',
                'Orientasi'
              ]"
              outlined
              dense
            >
            </q-select>
          </div>
          <div class="col-6 q-pl-sm">
            <div class="text-neutral">Training Method</div>
            <q-select
              v-model="training_method"
              :options="['Online', 'Offline', 'Blended Learning']"
              outlined
              dense
            >
            </q-select>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Location</div>
        <q-input dense v-model="locations" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Provider</div>
        <q-input dense v-model="provider" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
      <div class="text-neutral">Jam Pelatihan</div>
        <q-input dense v-model="jam_pelatihan" type="number" min="1" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Keterangan Jam Pelatihan</div>
        <q-input
          dense
          v-model="ket_jam_pelatihan"
          type="textarea"
          rows="4"
          outlined
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Topik Pelatihan</div>
        <q-input dense v-model="topik_pelatihan" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
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
      </q-card-section>
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
            <div :class="!all_day ? 'col-6 q-pr-md' : 'col'">
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
            <div class="col-6" v-if="!all_day">
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
            <div :class="!all_day ? 'col-6 q-pr-md' : 'col'">
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
            <div class="col-6" v-if="!all_day">
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
              <div :class="!all_day ? 'col-6 q-pr-md' : 'col'">
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
              <div class="col-6" v-if="!all_day">
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
          + Add Narasumber
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-6 q-pr-md">
            <div class="text-neutral">Roles</div>
            <q-select
              v-model="narasumber_roles"
              :options="['Internal', 'External']"
              outlined
              dense
            >
            </q-select>
          </div>
          <div class="col-5 q-pr-md text-neutral">
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
          <div class="col-1 q-pt-lg">
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
          class="row q-mb-xs"
          :key="index"
        >
          <div class="col-8">
          <q-btn flat :shadow="false" size="xs" @click="narasumberTopicOnClick(narasumber.users_id, narasumber.roles, narasumber.name)">
              <div class="text-neutral">
                <span
                  ><q-badge color="blue" rounded class="q-pa-xd"
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
                    {{ narasumber.name }}</q-badge
                  ></span>
              </div>
            </q-btn>
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
        <div class="row"><span class="text-neutral"><sup class="text-red">*</sup>Click expertise name to add topic</span></div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-md">
        <div class="text-title">PIC</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col q-pr-md text-neutral">
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
          <div class="col-1 q-pt-lg">
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
                ><q-badge color="blue" rounded class="q-pa-xd"
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
                  {{ narasumber.name }}</q-badge
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
      <q-card-section class="q-pt-md">
        <div class="text-title">Invitation</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Direktorat/Biro/Bagian</div>
        <q-select
            v-model="direktorat_id"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @filter="filterDirektorat"
            @input="id => addOrganizationIds('direktorat', id)"
            :options="direktorat_options_filter"
            :option-value="'id'"
            :option-label="'name'"
            name="direktorat_id"
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
        <div class="text-neutral">Jabatan</div>
        <q-select
            :disable="(direktorat_id === '' || direktorat_id === null)"
            v-model="jabatan_id"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @filter="filterJabatan"
            @input="id => addOrganizationIds('jabatan', id)"
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
        <div class="text-neutral">Pangkat Golongan</div>
        <q-select
            :disable="(jabatan_id === '' || jabatan_id === null)"
            v-model="pangkat_id"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @filter="filterPangkatGolongan"
            @input="id => addOrganizationIds('pangkat', id)"
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
        <div class="row">
          <div class="col q-pr-md text-neutral">
            <div class="text-neutral">Search Person</div>
            <q-select
              :disable="direktorat_id === null"
              v-model="invitation_person_id"
              use-input
              fill-input
              input-debounce="0"
              @filter="filterPersonsDirektorat"
              :options="persons_direktorat_option_filter"
              :option-value="'id'"
              :option-label="'name'"
              name="invitation_person_id"
              autocomplete="off"
              dense
              outlined
              multiple
            >
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
          <div class="col-1 q-pt-lg">
            <q-btn outline color="primary" no-caps label="Add" @click="addInvitation()"/>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div
          v-for="(row, index) in this.invitation_list"
          class="row q-mb-xs"
          :key="index"
        >
          <div class="col-8">
            <div class="text-neutral">
              <span
                ><q-badge color="blue" rounded class="q-pa-xd"
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
                  {{ row.name }}</q-badge
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
              @click="deleteInvitation(index)"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-md">
        <div class="text-title">Attachments</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-uploader
          :url="handleUpload"
          ref="uploader"
          label="Individual upload"
          multiple
          batch
          auto-upload
          style="width: 100%"
          class="shadow-0 q-uploader--bordered kmp-rounded"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div
          class="font-weight-bold q-mb-sm q-mt-md"
          v-if="finish_files.length > 0"
        >
          {{ finish_files.length }} Files Uploaded
        </div>
        <q-linear-progress
          v-if="uploaded_files"
          indeterminate
          rounded
          color="negative"
          class="q-my-sm"
        />
        <q-list>
          <div v-for="(item, index) in finish_files" :key="index">
            <ListFile
              v-if="item.file !== null"
              :file="item.file"
              :item="item"
              manage="true"
              @delete_knowledge="handleDelete(item.file.id, 'file', index)"
            />
          </div>
        </q-list>
      </q-card-section>

      <div v-for="(item, index) in list_attachments" :key="index">
        <div v-if="item.name !== null">
          <q-card-section class="q-pt-xs">
            <div class="text-title">{{ item.name }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="col q-pr-sm">
                <q-uploader
                  :url="(files, content_type) => eachHandleUpload(item, index, files, content_type)"
                  ref="each-uploader"
                  label="Individual upload"
                  multiple
                  batch
                  auto-upload
                  style="width: 100%"
                  class="shadow-0 q-uploader--bordered kmp-rounded"
                />
              </div>
              <div class="col-1">
                <q-btn outline color="red" no-caps label="-" @click="eachHandleDelete(item, null, index, 'delete_all')"/>
              </div>
            </div>
            <div class="font-weight-bold q-mb-sm q-mt-md" v-if="item.finish_files.length > 0">{{ item.finish_files.length }} Files
            Uploaded
            </div>
            <q-linear-progress v-if="item.uploaded_files" indeterminate rounded color="negative" class="q-my-sm"/>
            <q-list>
              <div
                v-for="(subItem, subIndex) in item.finish_files"
                :key="subIndex"
              >
                <ListFile v-if="subItem.file !== null" :file="subItem.file" :item="subItem" manage="true"
                                    @delete_knowledge="eachHandleDelete(item, subItem, subIndex)"/>
              </div>
            </q-list>
          </q-card-section>
        </div>
      </div>

      <q-card-section class="q-pt-xs">
        <q-btn outline color="primary" no-caps label="+" @click="modal_add_attachment = true"/>
      </q-card-section>

      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn
            size="sm"
            class="q-mr-sm"
            outline
            unelevated
            @click="modal_add_training = false"
            >Cancel</q-btn
          >
          <div class="q-mr-sm">|</div>
          <div v-if="save_add">
            <q-btn
              size="sm"
              class="btn-primary-color q-mr-sm publish-button"
              label="Save Draft"
              unelevated
              @click="saveTraining('draft')"
            />
            <q-btn
              size="sm"
              class="q-mr-sm publish-button"
              label="Open Registration"
              color="green"
              unelevated
              @click="saveTraining('open_reg')"
            />
          </div>
          <div v-if="save_edit">
            <q-btn
              size="sm"
              class="btn-primary-color q-mr-sm publish-button"
              label="Save"
              unelevated
              @click="saveTraining('save_update')"
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
              label="End Training"
              unelevated
              color="red"
              @click="saveTraining('end')"
            />
          </div>
        </q-card-actions>
      </template>
    </fixed-modal>
    <q-dialog v-model="modal_delete_training" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">End Training</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-neutral">
            Update participant’s scores to end this training
          </div>
        </q-card-section>
        <q-card-section>
          <q-table
            class="my-sticky-header-table"
            :columns="columns_table_training_score"
            :data="data_table_training_score"
            row-key="no"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="no" :props="props"> {{ props.row.no }}. </q-td>
                <q-td key="participant_name" :props="props">
                  <div class="text-blue" style="text-decoration:none">
                    {{ props.row.participant_name }}
                  </div>
                </q-td>
                <q-td key="pretest_score" class="text-blue" :props="props">
                  {{ props.row.pretest_score || 'Click here to edit' }}
                  <q-popup-edit v-model="props.row.pretest_score">
                    <q-input
                      type="number"
                      v-model="props.row.pretest_score"
                      dense
                      autofocus
                      counter
                    />
                  </q-popup-edit>
                </q-td>
                <q-td key="posttest_score" class="text-blue" :props="props">
                  {{ props.row.posttest_score || 'Click here to edit' }}
                  <q-popup-edit v-model="props.row.posttest_score">
                    <q-input
                      type="number"
                      v-model="props.row.posttest_score"
                      dense
                      autofocus
                      counter
                    />
                  </q-popup-edit>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>
          <q-btn
            class="btn-primary-color float-right q-mr-sm publish-button"
            label="End Training"
            unelevated
            v-close-popup
            @click="handleUpdateScore('end_training')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_update_score_training" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Update Score</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-neutral">
            {{ total_participant }} Participant in
            <b>{{ this.training_name }}</b>
          </div>
        </q-card-section>
        <q-card-section>
          <q-table
            class="my-sticky-header-table"
            :columns="columns_table_training_score"
            :data="data_table_training_score"
            row-key="no"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="no" :props="props"> {{ props.row.no }}. </q-td>
                <q-td key="participant_name" :props="props">
                  <div class="text-blue" style="text-decoration:none">
                    {{ props.row.participant_name }}
                  </div>
                </q-td>
                <q-td key="pretest_score" class="text-blue" :props="props">
                  {{ props.row.pretest_score || 'Click here to edit' }}
                  <q-popup-edit v-model="props.row.pretest_score">
                    <q-input
                      type="number"
                      v-model="props.row.pretest_score"
                      dense
                      autofocus
                      counter
                    />
                  </q-popup-edit>
                </q-td>
                <q-td key="posttest_score" class="text-blue" :props="props">
                  {{ props.row.posttest_score || 'Click here to edit' }}
                  <q-popup-edit v-model="props.row.posttest_score">
                    <q-input
                      type="number"
                      v-model="props.row.posttest_score"
                      dense
                      autofocus
                      counter
                    />
                  </q-popup-edit>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>
          <q-btn
            class="btn-primary-color float-right q-mr-sm publish-button"
            label="Save"
            unelevated
            v-close-popup
            @click="handleUpdateScore('update_score')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_detail_training" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Training Detail</div>
        </q-card-section>
        <div>
          <q-card-section class="q-pt-none" v-if="isLoadingDetail">
            <q-skeleton width="150px" height="25px" />
          </q-card-section>
          <q-card-section class="q-pt-none" v-else>
            <div class="text-neutral">
              <b>{{ this.training_name }}</b>
            </div>
          </q-card-section>
        </div>
        <div>
          <q-card-section class="q-pt-none" v-if="isLoadingDetail">
            <q-skeleton height="100px" />
          </q-card-section>
          <q-card-section class="q-pt-none" v-else>
            <div class="text-neutral">{{ this.training_description }}</div>
          </q-card-section>
        </div>
        <q-card-section class="q-pt-none">
          <table class="text-neutral">
            <tr>
              <td width="160px">
                <q-icon name="face" size="18px" />
                Provider
              </td>
              <td>
                <div v-if="isLoadingDetail">
                  <div class="row">
                    : &nbsp; <q-skeleton width="150px" height="25px" />
                  </div>
                </div>
                <div v-else>
                  <div class="text-neutral">: {{ this.provider }}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <q-icon name="event" size="18px" />
                Date
              </td>
              <td>
                <div v-if="isLoadingDetail">
                  <div class="row">
                    : &nbsp; <q-skeleton width="150px" height="25px" />
                  </div>
                </div>
                <div v-else>
                  <div class="text-neutral">: {{ this.training_date }}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <q-icon name="event" size="18px" />
                Metode Pelatihan
              </td>
              <td>
                <div v-if="isLoadingDetail">
                  <div class="row">
                    : &nbsp; <q-skeleton width="150px" height="25px" />
                  </div>
                </div>
                <div v-else>
                  <div class="text-neutral">: {{ this.training_method }}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <q-icon name="location_on" size="18px" />
                Location
              </td>
              <td>
                <div v-if="isLoadingDetail">
                  <div class="row">
                    : &nbsp; <q-skeleton width="150px" height="25px" />
                  </div>
                </div>
                <div v-else>
                  <div class="text-neutral">: {{ this.locations }}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <q-icon name="groups" size="18px" />
                Quota
              </td>
              <td>
                <div v-if="isLoadingDetail">
                  <div class="row">
                    : &nbsp; <q-skeleton width="150px" height="25px" />
                  </div>
                </div>
                <div v-else>
                  <div v-if="this.total_participant != 0">
                    <div class="text-neutral">
                      : {{ this.maximun_capacity }} ( Remaining Quota
                      {{ this.maximun_capacity - this.total_participant }} )
                    </div>
                  </div>
                  <div v-else>
                    <div class="text-neutral">
                      : {{ this.maximun_capacity }} ( Remaining Quota
                      {{ this.maximun_capacity }} )
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </q-card-section>
        <q-separator />
        <!-- <q-card-section class="q-pt-md">
          <div class="text-title">Narasumber</div>
        </q-card-section> -->
        <q-card-section class="q-pt-md">
          <div
            v-for="(narasumber, index) in this.narasumber_list_detail"
            class="row q-mb-xs"
            :key="index"
          >
            <div class="col-8">
              <div class="text-neutral">
                <span
                  ><q-badge color="blue" rounded class="q-pa-xd"
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
                    {{ narasumber.name }}</q-badge
                  ></span
                >
              </div>
            </div>
            <div class="col-4 text-right text-neutral">
              {{ narasumber.roles }}
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-md">
          <div class="text-title">Related documents</div>
        </q-card-section>
        <q-list class="q-pl-md q-pr-md">
          <div v-for="(item, index) in finish_files_detail" :key="index">
            <ListFile
              v-if="item.file !== null"
              :file="item.file"
              :item="item"
            />
          </div>
        </q-list>
        <q-separator />
        <div class="q-pa-md" v-if="this.total_participant != 0">
          <div class="row">
            <div v-for="(item, index) in avatar_participant" :key="index">
              <q-avatar
                size="25px"
                style="margin-left:-5px"
                color="primary"
                text-color="white"
              >
                <span v-if="item.img != null"><img :src="item.img"/></span>
                <span v-else>{{
                  item.inisial
                    .match(/\b(\w)/g)
                    .join('')
                    .toUpperCase()
                }}</span>
              </q-avatar>
            </div>
            <div
              class="cursor-pointer"
              @click="handleGetOtherParticipantRegistered"
            >
              <!-- <div class="text-weight-bold">participants</div> -->
              <span class="text-grey-7 q-mr-xs text-weight-bold q-ml-xs">{{
                this.total_participant
              }}</span>
              <span class="text-grey-7 q-mr-sm text-weight">{{
                this.information_participant
              }}</span>
            </div>
          </div>
        </div>
        <q-separator v-if="this.total_participant != 0" />
        <div
          class="q-pa-md"
          v-if="is_km_manager==true && this.list_participant_pending.length != 0"
        >
          <div class="row q-mb-md">Waiting for approval</div>
          <div class="row q-mb-md text-red-4" v-if="this.total_participant == this.maximun_capacity">(run out of quota, can't approve anymore)</div>
          <div class="row">
            <div class="table">
              <tr
                v-for="(item, index) in list_participant_pending"
                :key="index"
                :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"
                style="height:30px"
              >
                <td style="width:500px">
                  <q-avatar color="primary" text-color="white" size="25px" style="margin-left:-5px">{{
                    item.user.name
                      .match(/\b(\w)/g)
                      .join('')
                      .toUpperCase()
                  }}</q-avatar>
                  <span class="text-grey-7 q-ml-xs text-weight">{{
                    item.user.name
                  }}</span>
                </td>
                <td style="padding-right:10px">
                  <q-btn
                    push
                    color="green"
                    @click="approvalTraining('approve', item.id, index)"
                    round
                    icon="done"
                    size="xs"
                    :disabled="isQuota"
                  />
                </td>
                <td style="padding-right:10px">
                  <q-btn
                    push
                    color="red"
                    @click="approvalTraining('decline', item.id, index)"
                    round
                    icon="close"
                    size="xs"
                    :disabled="isQuota"
                  />
                </td>
              </tr>
            </div>
          </div>
        </div>
        <q-separator
          v-if="is_km_manager==true && this.list_participant_pending.length != 0"
        />
        <div class="q-mt-md q-mb-md" v-if="is_rsvp">
          <!-- <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> -->
          <div class="row">
            <div class="col-2">
              <span class="text-grey-7 q-mr-sm text-weight-bold q-ml-xs"
                >RSVP</span
              >
            </div>
            <div class="col-10" align="right">
              <a
                href="training/#"
                class="text-blue q-pr-md text-weight-bold"
                style="text-decoration:none"
                >Yes</a
              >
              <a
                href="training/#"
                class="text-blue q-pr-md text-weight-bold"
                style="text-decoration:none"
                >No</a
              >
              <a
                href="training/#"
                class="text-blue q-pr-md text-weight-bold"
                style="text-decoration:none"
                >Maybe</a
              >
            </div>
          </div>
        </div>
<q-separator v-if="is_rsvp" />
        <div class="q-mt-md">
          <div v-if="is_km_manager==false && this.status == 'open_registration'">
            <div class="row">
              <div class="col-6"></div>
              <div class="col-6" align="right">
                <q-btn
                  v-if="check_participant != 1 && !isQuota"
                  class="btn-primary-color publish-button"
                  label="Register"
                  unelevated
                  v-close-popup
                  @click="openModalTraining('register_training')"
                />
                <q-btn
                  v-if="pending == 1"
                  disabled
                  class="btn-primary-color publish-button"
                  label="Waiting For Approval"
                  unelevated
                  v-close-popup
                />
                <q-btn
                  v-if="declined == 1"
                  disabled
                  class="btn-primary-color publish-button"
                  label="Request Declined"
                  unelevated
                  v-close-popup
                />
                <q-btn
                  v-if="registered == 1"
                  disabled
                  class="btn-primary-color publish-button"
                  label="Request Approved"
                  unelevated
                  v-close-popup
                />
              </div>
            </div>
            <div class="row q-mt-xs text-red-4" align="right" v-if="isQuota">
              <div class="col-6"></div>
              <div class="col-6" align="right" v-if="pending == 1 || check_participant != 1 ">run out of quota</div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_register_training" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Register Training</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-md">
          <div class="text-title">Attachments</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-uploader
            :factory="handleUploadRegister"
            ref="uploader"
            label="Individual upload"
            multiple
            batch
            auto-upload
            style="width: 100%"
            class="shadow-0 q-uploader--bordered kmp-rounded"
          />
        </q-card-section>

        <q-separator spaced />

        <q-card-section class="q-pt-none">
          <div
            class="font-weight-bold q-mb-sm q-mt-md"
            v-if="finish_files_register.length > 0"
          >
            {{ finish_files_register.length }} Files Uploaded
          </div>
          <q-linear-progress
            v-if="uploaded_files"
            indeterminate
            rounded
            color="negative"
            class="q-my-sm"
          />
          <q-list>
            <div v-for="(item, index) in finish_files_register" :key="index">
              <ListFile
                v-if="item.file !== null"
                :file="item.file"
                :item="item"
                manage="true"
                @delete_knowledge="handleDeleteReg(item.file.id, 'file', index)"
              />
            </div>
          </q-list>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <!-- <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> -->
          <q-btn
            class="btn-primary-color float-right q-mr-sm publish-button"
            label="Register"
            unelevated
            v-close-popup
            @click="registerTraining()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog ov-model="modal_decline" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Reason For Decline</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-none">
          <q-input
            outlined
            dense
            v-model="alasan_ditolak"
            class=""
            required
          ></q-input>
        </q-card-section>

        <q-separator spaced />

        <q-card-actions align="right" class="text-primary">
          <!-- <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn> -->
          <q-btn
            class="btn-primary-color float-right q-mr-sm publish-button"
            label="Send"
            unelevated
            v-close-popup
            @click="declinedTraining()"
            :disabled="!alasan_ditolak"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_topic" @hide="narasumber_person_id = null;narasumber_roles = null; narasumber_name=null" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Add Topic</div>
        </q-card-section>
        <q-separator />
      <q-card-section>
      <div class="row q-mb-xs"><span class="text-neutral">Topic</span></div>
        <div class="row">
          <div class="col-10 q-pr-xs">
          <q-input
            outlined
            dense
            v-model="topic_narasumber"
            class=""
            required
          ></q-input>
          </div>
          <div class="col-1 q-pl-md">
            <q-btn
              outline
              color="primary"
              no-caps
              label="Add"
              @click="addTopic()"
            />
          </div>
        </div>
      </q-card-section>
            <q-card-section class="q-pt-none">
        <div
          v-for="(topic, index) in this.topic_list_narasumber"
          class="row q-mb-xs"
          :key="index"
        >
          <div class="col-8">
            <div class="text-neutral">
              <q-badge color="blue" rounded class="q-pa-xd">
                <span>
                    {{ topic.topic_narasumber }}
                </span>
              </q-badge>
            </div>
          </div>
          <div class="col-4 text-right text-neutral">
            <q-btn
              flat
              round
              icon="close"
              size="sm"
              @click="deleteTopic(index, topic.topic_narasumber)"
            />
          </div>
        </div>
      </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modal_change_position">
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Change Position</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-select
            dense
            outlined
            class="q-mb-sm"
            use-input
            v-model="select_direktorat"
            :options="option_direktorat"
            label="Direktorat"
            @filter="filterFnDirektorat"
            @input="changeDirektorat"
          >
          </q-select>
          <q-select
            dense
            outlined
            class="q-mb-sm"
            :disable="select_direktorat === '' || select_direktorat === null"
            v-model="select_jabatan"
            :options="option_jabatan"
            label="Jabatan / Fungsional"
            @filter="filterFnJabatan"
            @input="changeJabatan"
          ></q-select>
          <q-select
            dense
            outlined
            :disable="select_jabatan === '' || select_jabatan === null"
            v-model="select_golongan"
            :options="option_golongan"
            label="Pangkat / Golongan"
            @filter="filterFnGolongan"
          ></q-select>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>
          <q-btn
            class="btn-primary-color float-right q-mr-sm publish-button"
            label="Save"
            unelevated
            @click="savePosition"
          />
        </q-card-actions>
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
        class="row q-gutter-sm items-center"
        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"
      >
        <q-avatar color="primary" text-color="white" size="30px">{{
          item.user.name
            .match(/\b(\w)/g)
            .join('')
            .toUpperCase()
        }}</q-avatar>
        <div class="kmp-font-md kmp-font-bold">{{ item.user.name }}</div>
      </div>
    </fixed-modal>
    <fixed-modal
      :show="modal_list_schedule"
      :title="`Schedule list - ${list_schedule.length}`"
      @on-close="modal_list_schedule = false"
    >
      <div
        v-for="(item, index) in list_schedule"
        :key="index"
        class="row q-gutter-sm items-center"
        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"
      >
        <q-icon name="event" class="cursor-pointer" size="sm" />
        <div class="kmp-font-md kmp-font-bold">
          {{ parseDate(item.date_start) }}
          <div class="kmp-font-normal" v-if="item.time_start && item.time_end">
            {{ `${parseTime(item.time_start)} - ${parseTime(item.time_end)}` }}
          </div>
        </div>
      </div>
    </fixed-modal>
    <fixed-modal
      :show="modal_list_person"
      :title="`Person list - ${list_person.length}`"
      @on-close="modal_list_person = false"
    >
      <div
        v-for="(item, index) in list_person"
        :key="index"
        class="row q-gutter-sm items-center"
        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"
      >
        <q-checkbox size="sm" v-model="selected_person" :val="item" />
        <q-avatar color="primary" text-color="white" size="30px">{{
          item.name
            .match(/\b(\w)/g)
            .join('')
            .toUpperCase()
        }}</q-avatar>
        <div class="kmp-font-md kmp-font-bold">{{ item.name }}</div>
      </div>

      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated @click="modal_list_person = false"
            >Cancel</q-btn
          >
          <q-btn
            class="btn-primary-color float-right q-mr-sm publish-button"
            label="Save"
            unelevated
            @click="addInvitationFromCheckbox()"
          />
        </q-card-actions>
      </template>
    </fixed-modal>
    <fixed-modal
      :show="modal_add_narasumber"
      title="Add Narasumber"
      @on-close="modal_add_narasumber = false"
    >
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Nama</div>
        <q-input dense v-model="narasumber_create.name" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Nomor HP</div>
        <q-input dense v-model="narasumber_create.phone" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">NIP</div>
        <q-input dense v-model="narasumber_create.nip" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Jabatan</div>
        <q-input dense v-model="narasumber_create.jabatan" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Pangkat / Golongan</div>
        <q-input dense v-model="narasumber_create.pangkat" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Nomor Telepon Kantor</div>
        <q-input dense v-model="narasumber_create.telpon_kantor" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Nomor NPWP</div>
        <q-input dense v-model="narasumber_create.no_npwp" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">No. Rekening / Bank</div>
        <q-input dense v-model="narasumber_create.rek_bank" outlined />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Email</div>
        <q-input dense v-model="narasumber_create.email" outlined />
      </q-card-section>
              <q-card-section class="q-pt-md">
          <div class="text-title">Riwayat Hidup</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
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

        <q-separator spaced />

        <q-card-section class="q-pt-none">
          <div
            class="font-weight-bold q-mb-sm q-mt-md"
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
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Name</div>
        <q-input dense v-model="attachment_name" outlined/>
      </q-card-section>

      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated @click="modal_add_attachment = false">Cancel</q-btn>
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated
                  @click="addNewAttachment();"/>
        </q-card-actions>
      </template>
    </fixed-modal>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

import { mapGetters, mapActions } from 'vuex';
import { axios } from 'boot/axios';
import { getCredential } from 'src/lib/storage';
import { Notify } from 'quasar';
import moment from 'moment';
import ListFile from 'components/common/ListFile';
import FixedModal from 'components/common/FixedModal';
import {
  trainingCreate,
  trainingDelete,
  trainingList,
  trainingUpdate,
  trainingSummary,
  trainingParticipantDetail,
  trainingParticipantUpdate,
  trainingParticipantGetOtherByType,
  organizationList,
  organizationListDeputi,
  SearchDataAutocomplete,
  fileDelete,
  trainingDetail,
  trainingRegister,
  trainingApproval,
  channelMemberPerson,
  organizationUsers,
  expertiseCreate
} from '../../lib/api';

const YEAR = moment().format('YYYY');

export default {
  components: { ListFile, FixedModal, Treeselect },
  data() {
    return {
      position_options: [],
      position_value: 0,
      position_title: 'ALL KPK',
      position_show: false,
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        };
      },
      methodPost: 'create',
      is_km_manager: false,
      modal_list_participant: false,
      modal_list_schedule: false,
      modal_list_person: false,
      modal_add_narasumber: false,
      modal_add_attachment: false,
      modal_decline: false,
      modal_topic: false,
      list_participant: [],
      list_participant_pending: [],
      list_schedule: [],
      list_person: [],
      list_attachments: [],
      selected_person: [],
      isLoadingDetail: 1,
      training_modal_title: null,
      attachment_name: '',
      training_id: null,
      training_name: '',
      training_description: '',
      training_type: '',
      training_method: '',
      training_date: '',
      locations: '',
      status: '',
      provider: '',
      jam_pelatihan: '',
      ket_jam_pelatihan: '',
      topik_pelatihan: '',
      organization_id: null,
      direktorat_id: null,
      jabatan_id: null,
      pangkat_id: null,
      all_day: false,
      uploaded_files: false,
      is_private: false,
      narasumber_person_id: null,
      narsum_person_id: null,
      narasumber_person_pic_id: null,
      narasumber_roles: null,
      narasumber_name: null,
      ends_after_how_many_occurence: null,
      start_date: null,
      start_time: null,
      end_date: null,
      end_time: null,
      start_date_filter: moment().format('YYYY-MM-DD'),
      end_date_filter: moment()
        .add('1', 'months')
        .format('YYYY-MM-DD'),
      start_date_custom: [],
      start_time_custom: [],
      end_time_custom: [],
      maximun_capacity: '1',
      recuring: 'Does not repeat',
      filter: '',
      schedule_custom_array: [],
      schedule_custom_repeat: 1,
      modal_add_training: false,
      modal_delete_training: false,
      modal_update_score_training: false,
      modal_detail_training: false,
      modal_register_training: false,
      invitation_person_id: null,
      organization_options: [],
      direktorat_options: [],
      jabatan_options: [],
      pangkat_options: [],
      organization_options_filter: [],
      direktorat_options_filter: [],
      jabatan_options_filter: [],
      pangkat_options_filter: [],
      finish_files: [],
      finish_files_register: [],
      finish_files_narasumber: [],
      finish_files_detail: [],
      modal_change_position: false,
      tree_level: 1,
      seq: 1,
      parent: 1,
      channel_id: 1,
      created_by: 1,
      subtitle: '',
      business: '',
      target: '',
      type: '',
      strategic_model: '',
      address_model: '',
      business_model: '',
      knowledge_type_model: 'Basic Knowledge',
      level4: false,
      knowledge: 0,
      dknowledge: 0,
      abort: false,
      level: 0,
      state: '',
      save_add: false,
      save_edit: false,
      id_pending: '',
      alasan_ditolak: '',
      topic_narasumber: '',
      narasumber_create: {
        name: '',
        email: '',
        phone: '',
        nip: '',
        jabatan: '',
        pangkat: '',
        telpon_kantor: '',
        no_npwp: '',
        rek_bank: ''
      },
      channel_model:
        '<span class="kmp-text-blue text-weight-bold">direktorat_aclc</span>',
      channel_options: [
        {
          label:
            '<q-icon name="domain" size="16px" /><span class="kmp-text-blue text-weight-bold">direktorat_aclc</span>',
          value: 'direktorat_aclc',
          icon: 'domain'
        },
        {
          label:
            '<span class="kmp-text-blue text-weight-bold">direktorat_gratifikasi</span>',
          value: 'direktorat_gratifikasi',
          icon: 'domain'
        }
      ],
      selected: null,
      simple: [],
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
          style: 'width: 5%'
        },
        {
          name: 'name',
          field: 'name',
          align: 'center',
          label: 'Training Name'
        },
        {
          name: 'training_type',
          field: 'training_type',
          align: 'center',
          label: 'Type'
        },
        { name: 'status', field: 'status', align: 'center', label: 'Status' },
        { name: 'date', field: 'date', align: 'center', label: 'Date' },
        {
          name: 'provider',
          field: 'provider',
          align: 'center',
          label: 'Provider'
        },
        {
          name: 'action',
          field: 'action',
          align: 'center',
          label: '',
          style: 'width: 5%'
        }
      ],
      data_table: [],
      columns_table_training_score: [
        {
          name: 'no',
          field: 'no',
          label: 'No.',
          align: 'center',
          style: 'width: 5%'
        },
        {
          name: 'participant_name',
          field: 'participant_name',
          align: 'center',
          label: 'Participant Name'
        },
        {
          name: 'pretest_score',
          field: 'pretest_score',
          align: 'center',
          label: 'Pre-test Score'
        },
        {
          name: 'posttest_score',
          field: 'posttest_score',
          align: 'center',
          label: 'Post-test Score'
        }
      ],
      data_table_training_score: [],
      narasumber_list: [],
      narasumber_list_pic: [],
      narasumber_list_detail: [],
      topic_list: [],
      topic_list_narasumber: [],
      option_direktorat_0: [],
      option_direktorat: [],
      option_jabatan_0: [],
      option_jabatan: [],
      option_golongan_0: [],
      option_golongan: [],
      select_direktorat: '',
      select_jabatan: '',
      select_golongan: '',
      participant_type: '',
      training_position: 'Data Training',
      sub_training_position:
        'Penata Muda I (III B) • Direktorat Pendidikan & Pelatihan Antikoprupsi',
      total_participant: '',
      information_participant: '',
      avatar_participant: [],
      registered: 0,
      pending: 0,
      declined: 0,
      check_participant: 0,
      is_rsvp: 0,
      isLoadingButtonAction: false,
      summary: {
        total_training: {
          total: 0,
          year: YEAR
        },
        target_direktorat: {
          total: 0,
          year: YEAR
        },
        total_participant: {
          total: 0,
          of: 0
        }
      },
      invitation_list: [],
      persons_option_filter: [],
      persons_option: [],
      persons_pic_option: [],
      persons_direktorat_option_filter: [],
      persons_direktorat_option: []
    };
  },
  computed: {
    ...mapGetters('notification', ['trainingId']),
    isQuota() {
      return this.total_participant === this.maximun_capacity;
    }
  },
  watch: {
    trainingId(newId, oldId) {
      if (newId != null) {
        this.detailNotificationClick(newId);
      }
    }
  },
  methods: {
    ...mapActions('notification', ['updateTrainingId']),

    positionSelect(node) {
      this.position_value = node.id;
      this.position_title = node.name;
      this.handleFilter(true);
    },
    openModalTraining(selected, training = null) {
      this.resetTrainingFields();
      if (selected === 'add') {
        this.methodPost = 'create';
        this.schedule_custom_array = Array.from(
          Array(this.schedule_custom_repeat).keys()
        );
        this.training_modal_title = 'Add New';
        this.training_name = '';
        this.training_description = '';
        this.training_type = '';
        this.training_method = '';
        this.locations = '';
        this.provider = '';
        this.all_day = false;
        this.is_private = false;
        this.maximun_capacity = null;
        this.recuring = 'Does not repeat';
        this.modal_add_training = true;
        this.save_add = true;
        this.save_edit = false;
      } else if (selected === 'delete') {
        this.training_id = training.id;
        this.training_name = training.name;
        this.getTrainingParticipantById('delete');
      } else if (selected === 'update_score') {
        this.training_id = training.id;
        this.training_name = training.name;
        this.getTrainingParticipantById('update_score');
      } else if (selected === 'edit') {
        this.methodPost = 'update';
        this.training_modal_title = 'Edit';
        this.isLoadingButtonAction = true;
        this.save_add = false;
        this.save_edit = true;
        trainingDetail(training.id).then(response => {
          this.status = training.status;
          this.isLoadingButtonAction = false;
          this.training_id = training.id;
          this.organization_id = training.organization_id;
          this.direktorat_id = training.direktorat_id;
          this.jabatan_id = training.jabatan_id;
          this.pangkat_id = training.pangkat_id;
          this.training_name = training.name;
          this.training_description = training.description;
          this.training_type = training.training_type;
          this.training_method = training.training_method;
          this.locations = training.locations;
          this.provider = training.provider;
          this.ket_jam_pelatihan = training.ket_jam_pelatihan;
          this.jam_pelatihan = training.jam_pelatihan;
          this.topik_pelatihan = training.topik_pelatihan;
          this.all_day = training.all_day;
          this.is_private = training.is_private;
          this.maximun_capacity = training.maximun_capacity;
          this.recuring = training.recuring;
          this.training_date = training.date;
          response.data.expertise.forEach((v, i) => {
            if (v.expert_type !== 'PIC') {
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
              organization_id: null,
              name: v.user.name,
              roles: v.type
            });
          });
          response.data.expertise_topic.forEach((v, i) => {
            this.topic_list.push({
              users_id: v.users_id,
              topic_narasumber: v.topic,
              roles: v.expert_type,
              name: v.expert_name
            });
          });
          if (training.recuring === 'Does not repeat') {
            this.start_date = `${response.data.schedule[0].date_start} ${response.data.schedule[0].time_start}`;
            this.end_date = `${response.data.schedule[0].date_end} ${response.data.schedule[0].time_end}`;
            this.start_time = response.data.schedule[0].time_start;
            this.end_time = response.data.schedule[0].time_end;
          } else if (training.recuring === 'Daily') {
            this.start_date = response.data.schedule[0].date_start;
            this.end_date = `${response.data.schedule[0].date_end}`;
            this.start_time = response.data.schedule[0].time_start;
            this.end_time = response.data.schedule[0].time_end;
            this.ends_after_how_many_occurence = response.data.repeated;
          } else if (training.recuring === 'Custom') {
            this.schedule_custom_array = Array.from(
              Array(training.schedule.length).keys()
            );
            training.schedule.forEach(item => {
              this.start_date_custom.push(item.date_start);
              this.start_time_custom.push(item.time_start);
              this.end_time_custom.push(item.time_end);
            });
          }
          this.avatar_participant = [];
          this.total_participant = response.data.total_participant;
          this.information_participant = response.data.information_participant;
          this.avatar_participant = response.data.avatar_participant;
          this.registered = response.data.registered;
          this.pending = response.data.pending;
          this.declined = response.data.declined;
          this.check_participant = response.data.check_participant;
          this.is_rsvp = response.data.is_rsvp;
          this.modal_add_training = true;

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
                finish_files: groupByName[item.filename_type]
              };
            }
            return undefined;
          }).filter(item => item !== undefined);

          if (training.direktorat_id) {
            organizationList({ parent: training.direktorat_id, limit: 1000 })
              .then(res => {
                const hasil = res.data;
                if (hasil.length > 0) {
                  this.jabatan_options = hasil.map(v => (
                    { id: v.id, name: v.name }
                  ));
                  this.jabatan_id = { id: training.jabatan_id, name: response.data.jabatan.name };
                }
              });
          }
          if (training.jabatan_id) {
            organizationList({ parent: training.jabatan_id, limit: 1000 })
              .then(res => {
                const hasil = res.data;
                if (hasil.length > 0) {
                  this.pangkat_options = hasil.map(v => (
                    { id: v.id, name: v.name }
                  ));
                  this.pangkat_id = { id: training.pangkat_id, name: response.data.pangkat.name };
                }
              });
          }
          if (training.direktorat_id || training.jabatan_id || training.pangkat_id) {
            organizationUsers({
              direktorat_id: training.direktorat_id,
              ...(training.jabatan_id !== null && { jabatan_id: training.jabatan_id }),
              ...(training.pangkat_id !== null && { pangkat_id: training.pangkat_id })
            })
              .then(res => {
                const data = res.data.items;
                this.persons_direktorat_option = data.map(item => ({
                  id: item.id,
                  name: item.name,
                  roles: 'Person'
                }));
              });
          }
        });
        this.isLoadingButtonAction = false;
      } else if (selected === 'detail') {
        this.isLoadingDetail = true;
        trainingDetail(training.id).then(response => {
          this.training_id = training.id;
          this.isLoadingDetail = false;
          this.training_name = training.name;
          this.training_description = training.description;
          this.training_type = training.training_type;
          this.training_method = training.training_method;
          this.locations = training.locations;
          this.status = training.status;
          this.provider = training.provider;
          this.all_day = training.all_day;
          this.is_private = training.is_private;
          this.maximun_capacity = training.maximun_capacity;
          this.recuring = training.recuring;
          this.narasumber_list_detail = [];
          response.data.expertise.forEach((v, i) => {
            this.narasumber_list_detail.push({
              users_id: v.users_id,
              name: v.user.name,
              roles: v.expert_type
            });
          });
          this.finish_files_detail = [];
          response.data.files.forEach((v, i) => {
            this.finish_files_detail.push({
              file: {
                filemime: v.filemime,
                filename: v.filename,
                filesize: v.filesize,
                path: v.path
              }
            });
          });
          this.avatar_participant = [];
          this.total_participant = response.data.total_participant;
          this.information_participant = response.data.information_participant;
          this.avatar_participant = response.data.avatar_participant;
          this.registered = response.data.registered;
          this.pending = response.data.pending;
          this.declined = response.data.declined;
          this.check_participant = response.data.check_participant;
          this.is_rsvp = response.data.is_rsvp;

          const dateStart = training.schedule[0].date_start;
          if (training.schedule.length > 1) {
            const dateEnd =
              training.schedule[training.schedule.length - 1].date_start;
            this.training_date = `${dateStart} - ${dateEnd}`;
          } else {
            this.training_date = dateStart;
          }
        });
        this.training_id = training.id;
        this.list_participant_pending = [];
        trainingParticipantGetOtherByType(this.training_id, {
          participant_type: 'pending'
        }).then(response => {
          const { data } = response;

          this.list_participant_pending = data;
        });
        this.modal_detail_training = true;
      } else if (selected === 'position') {
        organizationList({ groups: 'Unit Kerja', limit: 100 }).then(res => {
          const response = res.data;
          this.option_direktorat_0 = response.map(v => ({
            value: v.id,
            label: v.name
          }));
        });
        this.modal_change_position = true;
      } else if (selected === 'register_training') {
        this.modal_register_training = true;
      } else if (selected === 'edit_open') {
        const data = {
          status: 'open_registration'
        };
        trainingUpdate(training.id, data).then(response => {
          this.$q.notify({
            message: 'Training has been Open Registration.',
            color: 'blue'
          });
          this.getTraining();
        });
      } else if (selected === 'edit_close') {
        const data = {
          status: 'close_registration'
        };
        trainingUpdate(training.id, data).then(response => {
          this.$q.notify({
            message: 'Training has been Close Registration.',
            color: 'blue'
          });
          this.getTraining();
        });
      }
    },
    resetTrainingFields() {
      this.organization_id = null;
      this.direktorat_id = null;
      this.jabatan_id = null;
      this.pangkat_id = null;
      this.provider = '';
      this.jam_pelatihan = '';
      this.ket_jam_pelatihan = '';
      this.topik_jam_pelatihan = '';
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
      this.finish_files = [];
      this.topic_list = [];
      this.topic_list_narasumber = [];
    },
    getTrainingParticipantById(type) {
      trainingParticipantDetail(this.training_id).then(response => {
        const { data } = response;

        this.total_participant = data.participant.length;
        this.data_table_training_score = data.participant.map(
          (item, index) => ({
            no: index + 1,
            id: item.id,
            user_id: item.user.id,
            participant_name: item.user.name,
            pretest_score: item.pre_test_score,
            posttest_score: item.post_test_score
          })
        );

        if (type === 'update_score') {
          this.modal_update_score_training = true;
        } else if (type === 'delete') {
          this.modal_delete_training = true;
        }
      });
    },
    getTraining() {
      trainingList().then(response => {
        const hasil = response.data;
        this.data_table = hasil.map((item, index) => ({
          ...item,
          no: index + 1
        }));
      });
    },
    getTrainingSummary() {
      trainingSummary().then(response => {
        const hasil = response.data;
        this.summary = hasil;
      });
    },
    getOrganization() {
      organizationListDeputi({ limit: 1000 }).then(response => {
        const hasil = response.data;

        this.position_options = [{ id: 0, name: 'ALL KPK' }, ...hasil];
      });
    },
    getDirektorat() {
      organizationList({ groups: 'Unit Kerja', limit: 1000 }).then(response => {
        const hasil = response.data;
        this.direktorat_options = hasil;
        this.direktorat_options_filter = hasil;
      });
    },
    getJabatan() {
      organizationList({ groups: 'Jabatan', limit: 1000 }).then(response => {
        const hasil = response.data;
        this.jabatan_options = hasil;
        this.jabatan_options_filter = hasil;
      });
    },
    getPangkatGolongan() {
      organizationList({ groups: 'Pangkat Golongan', limit: 1000 }).then(
        response => {
          const hasil = response.data;
          this.pangkat_options = hasil;
          this.pangkat_options_filter = hasil;
        }
      );
    },
    saveTraining(selected, training = null) {
      this.modal_add_training = false;
      const mapFile = this.list_attachments.map(item => item.finish_files).concat(this.finish_files);
      const concatFile = [].concat(...mapFile);
      const groupFile = concatFile.map(item => ({ file_id: item.file.id }));

      let jabatanId = null;
      let pangkatId = null;
      if (this.jabatan_id !== null) {
        if (Object.keys(this.jabatan_id).length > 0) jabatanId = this.jabatan_id.id;
        else jabatanId = this.jabatan_id;
      }
      if (this.pangkat_id !== null) {
        if (Object.keys(this.pangkat_id).length > 0) pangkatId = this.pangkat_id.id;
        else pangkatId = this.pangkat_id;
      }
      let status = '';
      if (selected === 'open_reg') {
        status = 'open_registration';
      } else if (selected === 'close_reg') {
        status = 'close_registration';
      } else if (selected === 'end') {
        this.getTrainingParticipantById('delete');
        status = this.status;
      } else if (selected === 'draft') {
        status = 'draft';
      } else if (selected === 'save_update') {
        status = this.status;
      }
      const data = {
        enabled: true,
        status,
        name: this.training_name,
        description: this.training_description,
        training_type: this.training_type,
        training_method: this.training_method,
        locations: this.locations,
        direktorat_id: this.direktorat_id,
        jabatan_id: jabatanId,
        pangkat_id: pangkatId,
        provider: this.provider,
        jam_pelatihan: this.jam_pelatihan,
        ket_jam_pelatihan: this.ket_jam_pelatihan,
        topik_pelatihan: this.topik_pelatihan,
        all_day: this.all_day,
        is_private: this.is_private,
        maximun_capacity: this.maximun_capacity,
        recuring: this.recuring,
        repeated: null,
        expertise: [...this.narasumber_list, ...this.narasumber_list_pic],
        expertise_topic: [...this.topic_list],
        invitation: this.invitation_list,
        file: groupFile,
        start_date: this.start_date,
        start_time: this.start_time,
        end_date: this.end_date,
        end_time: this.end_time,
        ends_after_how_many_occurence:
          new Date(this.end_date).getDate() -
          new Date(this.start_date).getDate(),
        start_date_custom: this.start_date_custom,
        start_time_custom: this.start_time_custom,
        end_time_custom: this.end_time_custom
      };
      if (this.methodPost === 'create') {
        trainingCreate(data).then(response => {
          this.$q.notify({
            message: 'Training has been added',
            color: 'blue'
          });
          this.summary.total_training = {
            total: this.summary.total_training.total + 1,
            year: YEAR
          };
          this.getTraining();
        });
      } else if (this.methodPost === 'update') {
        trainingUpdate(this.training_id, data).then(response => {
          this.$q.notify({
            message: 'Training has been Updated.',
            color: 'blue'
          });
          this.getTraining();
        });
      }
    },
    registerTraining() {
      const group_file = this.finish_files_register.map(item => {
        return {
          file_id: item.file.id
        };
      });
      if (group_file.length === 0) {
        Notify.create({
          message: 'Upload file terlebih dahulu sebelum register!',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      const data = {
        enabled: true,
        file: group_file
      };
      trainingRegister(this.training_id, data).then(response => {
        this.finish_files_register = [];
        this.$q.notify({
          message: 'Successfull register training',
          color: 'blue'
        });
      });
    },
    declinedTraining() {
      const data = {
        participant_type: 'declined',
        alasan_ditolak: this.alasan_ditolak
      };
      trainingApproval(this.id_pending, data).then(result => {
        const data_approval = result.data;
        if (data_approval) {
          this.$q.notify({
            message: 'Success Declined',
            color: 'blue'
          });
          trainingDetail(this.training_id).then(response => {
            const data_participant = response.data;

            this.total_participant = data_participant.total_participant;
            this.information_participant =
              response.data.information_participant;
            this.avatar_participant = response.data.avatar_participant;
          });
          this.list_participant_pending.splice(this.index, 1);
        }
      });
      this.alasan_ditolak = null;
    },
    approvalTraining(selected, id, index) {
      let participant_type = '';
      if (selected === 'approve') {
        participant_type = 'registered';
      } else {
        this.modal_decline = true;
        this.id_pending = id;
        this.index = index;
        return;
      }
      const data = {
        participant_type
      };
      trainingApproval(id, data).then(result => {
        const data_approval = result.data;
        if (data_approval) {
          this.$q.notify({
            message: 'Success Approved',
            color: 'blue'
          });
          trainingDetail(this.training_id).then(response => {
            const data_participant = response.data;

            this.total_participant = data_participant.total_participant;
            this.information_participant =
              response.data.information_participant;
            this.avatar_participant = response.data.avatar_participant;
          });
          this.list_participant_pending.splice(index, 1);
        }
      });
    },

    SaveUpdateTree() {
      const data = {
        title: this.title,
        subtitle: this.knowledge_type_model
      };
      trainingUpdate(this.id, data).then(response => {
        this.$q.notify({
          message: 'Knowledge Map Updated.',
          color: 'blue'
        });
        this.getTree();
      });
    },
    DeleteTraining() {
      trainingDelete(this.training_id).then(response => {
        this.$q.notify({
          message: 'Trainings has been ended.',
          color: 'blue'
        });
        this.getTraining();
      });
    },
    handleUpload(files, content_type) {
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
                this.finish_files = [...this.finish_files, ...detail_files];
              }
            }
          })
          .catch(error => {

          });
      });
    },
    eachHandleUpload(item, index, files, content_type) {
      this.$set(item, 'uploaded_files', true);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      files.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', files[i]);
        formData.append('filename_type', item.name);
        axios.post('./api/api/file', formData, config).then(res => {
          const response = res.data.data[0];

          if (res.data.message === 'OK') {
            this.$set(item, 'uploaded_files', false);
            this.list_attachments[index].finish_files.push({ file: response });
            this.$refs['each-uploader'][index].reset();
          }
        });
      });
    },
    handleUploadRegister(files, content_type) {
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
                this.finish_files_register = detail_files;
              }
            }
          })
          .catch(error => {

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
    handleDelete(id, type, index) {
      let msg = '';
      switch (type) {
        case 'file':
          msg = 'Are you sure want to delete this File?';
          break;
        default:
          msg = 'Are you sure want to delete this Document?';
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
                this.finish_files.splice(index, 1);
              }
            });
          }
        })
        .onCancel(() => {

        })
        .onDismiss(() => {

        });
    },
    handleDeleteReg(id, type, index) {
      let msg = '';
      switch (type) {
        case 'file':
          msg = 'Are you sure want to delete this File?';
          break;
        default:
          msg = 'Are you sure want to delete this Document?';
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
                this.finish_files_reg.splice(index, 1);
              }
            });
          }
        })
        .onCancel(() => {
        })
        .onDismiss(() => {

        });
    },
    handleDeleteNarsumCv(id, type, index) {
      let msg = '';
      switch (type) {
        case 'file':
          msg = 'Are you sure want to delete this File?';
          break;
        default:
          msg = 'Are you sure want to delete this Document?';
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
    eachHandleDelete(item, subItem, index, type) {
      let msg = 'Are you sure want to delete this File?';
      if (type === 'delete_all') msg = 'Are you sure want to delete all File?';

      this.$q.dialog({
        title: 'Confirm',
        message: msg,
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (type === 'delete_all') {
          this.list_attachments.splice(index, 1);
          this.$set(item, 'finish_files', []);
        } else {
          fileDelete(subItem.file.id).then(response => {
            if (response.message === 'OK') {
              Notify.create({
                message: 'Delete file berhasil.',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
              item.finish_files.splice(index, 1);
            }
          });
        }
      });
    },
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      // todo: disini juga
      // console.log();
      profile.roles.forEach((v, i) => {
        if (v.name === 'km_manager') {
          this.is_km_manager = true;
        }
      });
      // this.position_value = profile.organization_id;
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
    },
    addNewAttachment() {
      const isExists = this.list_attachments.filter(item => item.name === this.attachment_name).length > 0;
      if (isExists) {
        this.$q.notify({
          message: 'Attachment name already exists',
          color: 'red',
          position: 'center',
          actions: [
            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 60000
        });
      } else {
        this.list_attachments.push({ name: this.attachment_name, finish_files: [] });
        this.attachment_name = null;
        this.modal_add_attachment = false;
      }
    },
    addNewNarasumber() {
      const { name, email, phone, nip, jabatan, pangkat, telepon_kantor, no_npwp, rek_bank } = this.narasumber_create;
      const group_file = this.finish_files_narasumber.map(item => {
        return {
          file_id: item.file.id
        };
      });
      if (name.length === 0) {
        Notify.create({
          message: 'Nama harus diisi',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      if (phone.length === 0) {
        Notify.create({
          message: 'Nomer HP harus diisi',
          timeout: 3000,
          type: 'positive',
          color: 'warning',
          icon: 'check'
        });
        return;
      }
      expertiseCreate({
        name,
        email,
        phone,
        nip,
        jabatan,
        pangkat,
        telepon_kantor,
        no_npwp,
        rek_bank,
        file: group_file,
        enabled: true
      }).then(response => {
        this.modal_add_narasumber = false;
        this.finish_files_narasumber = [];
        this.narasumber_create = {
          name: '',
          email: '',
          phone: '',
          nip: '',
          jabatan: '',
          pangkat: '',
          telpon_kantor: '',
          no_npwp: '',
          rek_bank: '',
          enabled: 'active'
        };
        this.$q.notify({
          message: 'Narasumber has been added',
          color: 'blue'
        });
      });
    },
    narasumberTopicOnClick(users_id, roles, name) {
      this.modal_topic = true;
      this.topic_list_narasumber = this.topic_list.filter(el => el.users_id === users_id && el.roles === roles);
      this.narsum_person_id = { id: users_id };
      this.narasumber_roles = roles;
      this.narasumber_name = name;
    },
    addNarasumber() {
      this.narasumber_list.push({
        users_id: this.narasumber_person_id.id,
        name: this.narasumber_person_id.name,
        roles: this.narasumber_roles
      });
      this.narasumber_person_id = null;
      this.narasumber_roles = null;
      this.persons_option = [];
      this.topic_list_narasumber = [];
    },
    addTopic() {
      this.topic_list_narasumber.push({
        users_id: this.narsum_person_id.id,
        roles: this.narasumber_roles,
        topic_narasumber: this.topic_narasumber,
        name: this.narasumber_name
      });
      this.topic_list.push({
        users_id: this.narsum_person_id.id,
        roles: this.narasumber_roles,
        topic_narasumber: this.topic_narasumber,
        name: this.narasumber_name
      });
      this.topic_narasumber = null;
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
    deleteNarasumber(index, users_id) {
      this.topic_list = this.topic_list.filter(el => el.users_id !== users_id);
      this.narasumber_list.splice(index, 1);
    },
    deleteTopic(index_narasumber, topic) {
      const index = this.topic_list.findIndex(t => t.users_id === this.narsum_person_id.id && t.topic_narasumber === topic);
      this.topic_list.splice(index, 1);
      this.topic_list_narasumber.splice(index_narasumber, 1);
    },
    deletePIC(index) {
      this.narasumber_list_pic.splice(index, 1);
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
      this.invitation_person_id.map(item => {
        if (item.roles === 'Direktorat') {
          this.list_person = [];
          this.modal_list_person = true;
          this.getChannelMemberPerson();
        } else {
          this.invitation_list.push({ users_id: item.id, organization_id: null, name: item.name, roles: item.roles });
          this.addInvitationFromCheckbox();
        }
        return true;
      });
      this.invitation_person_id = null;
    },
    addInvitationFromCheckbox() {
      const newArr = [...this.invitation_list, ...this.selected_person];
      this.invitation_list = [...new Map(newArr.map(v => [v.users_id, v])).values()];
      this.selected_person = [];
      this.modal_list_person = false;
    },
    getChannelMemberPerson() {
      channelMemberPerson(this.invitation_person_id.channel_id).then(
        response => {
          const hasil = response.data;
          this.list_person = hasil.map(item => {
            return {
              users_id: item.user.id,
              organization_id: null,
              name: item.user.name,
              roles: 'person'
            };
          });
        }
      );
    },
    deleteInvitation(index) {
      this.invitation_list.splice(index, 1);
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
              return {
                id: item.user.id,
                name: item.user.name
              };
            }
            if (this.narasumber_roles === 'External') {
              return {
                id: item.expertise.id,
                name: item.expertise.name
              };
            }
            return {};
          });
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
                name: item.user.name
              };
            }
            if (item.expertise) {
              return {
                id: item.expertise.id,
                name: item.expertise.name
              };
            }
            return {};
          });
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
    addOrganizationIds(type, id) {
      this.persons_direktorat_option = [];
      this.invitation_person_id = null;

      if (type === 'direktorat') {
        this.jabatan_id = null;
        this.pangkat_id = null;
        this.jabatan_options = [];
        this.pangkat_options = [];
      } else if (type === 'jabatan') {
        this.pangkat_id = null;
        this.pangkat_options = [];
      }

      organizationUsers({
        direktorat_id: this.direktorat_id,
        ...(this.jabatan_id !== null && { jabatan_id: Object.keys(this.jabatan_id).length > 0 ? this.jabatan_id.id : this.jabatan_id }),
        ...(this.pangkat_id !== null && { pangkat_id: Object.keys(this.pangkat_id).length > 0 ? this.pangkat_id.id : this.pangkat_id })
      })
        .then(response => {
          const hasil = response.data;
          this.persons_direktorat_option = hasil.map(item => ({
            id: item.id,
            name: item.name,
            roles: 'Person'
          }));
          this.getOrganizationList(type, id);
        });
    },
    getOrganizationList(type, id) {
      organizationList({ parent: id, limit: 1000 })
        .then(res => {
          const response = res.data;
          if (type === 'direktorat') {
            this.jabatan_options = response.map(v => (
              { id: v.id, name: v.name }
            ));
          }
          if (type === 'jabatan') {
            this.pangkat_options = response.map(v => (
              { id: v.id, name: v.name }
            ));
          }
        });
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
    filterOrganizer(val, update, abort) {
      if (val === '') {
        update(() => {
          this.organization_options_filter = this.organization_options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        const hasil = this.organization_options.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
        this.organization_options_filter = hasil;
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
    filterPangkatGolongan(val, update) {
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
    filterFnDirektorat(val, update, abort) {
      setTimeout(() => {
        update(() => {
          this.option_direktorat = [{ value: 'ALL KPK', label: 'ALL KPK' }];
          if (val === '') {
            this.option_direktorat = [
              ...this.option_direktorat,
              ...this.option_direktorat_0
            ];
          } else {
            const needle = val.toLowerCase();
            const filter = this.option_direktorat_0.filter(
              v => v.label.toLowerCase().indexOf(needle) > -1
            );
            this.option_direktorat = [...this.option_direktorat, ...filter];
          }
        });
      }, 1000);
    },
    filterFnJabatan(val, update, abort) {
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.option_jabatan = this.option_jabatan_0;
          } else {
            const needle = val.toLowerCase();
            this.option_jabatan = this.option_jabatan_0.filter(
              v => v.label.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      }, 1000);
    },
    filterFnGolongan(val, update, abort) {
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.option_golongan = this.option_golongan_0;
          } else {
            const needle = val.toLowerCase();
            this.option_golongan = this.option_golongan_0.filter(
              v => v.label.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      }, 1000);
    },
    changeDirektorat() {
      this.option_jabatan = [];
      this.option_golongan = [];
      this.select_jabatan = '';
      this.select_golongan = '';
      if (this.select_direktorat) {
        organizationList({
          parent: this.select_direktorat.value,
          limit: 100
        }).then(res => {
          const response = res.data;
          this.option_jabatan_0 = response.map(v => ({
            value: v.id,
            label: v.name
          }));
        });
      }
    },
    changeJabatan() {
      this.option_golongan = [];
      this.select_golongan = '';
      if (this.select_jabatan) {
        organizationList({
          parent: this.select_jabatan.value,
          limit: 100
        }).then(res => {
          const response = res.data;
          this.option_golongan_0 = response.map(v => ({
            value: v.id,
            label: v.name
          }));
        });
      }
    },
    savePosition() {
      this.modal_change_position = false;
      if (
        (this.select_direktorat !== '' || this.select_direktorat !== null) &&
        (this.select_jabatan === '' || this.select_jabatan === null) &&
        (this.select_golongan === '' || this.select_golongan === null)
      ) {
        this.training_position = this.select_direktorat.label;
        this.sub_training_position = '';
      } else if (
        (this.select_direktorat !== '' || this.select_direktorat !== null) &&
        (this.select_jabatan !== '' || this.select_jabatan !== null) &&
        (this.select_golongan === '' || this.select_golongan === null)
      ) {
        this.training_position = this.select_jabatan.label;
        this.sub_training_position = this.select_direktorat.label;
      } else if (
        (this.select_direktorat !== '' || this.select_direktorat !== null) &&
        (this.select_jabatan !== '' || this.select_jabatan !== null) &&
        (this.select_golongan !== '' || this.select_golongan !== null)
      ) {
        this.training_position = this.select_jabatan.label;
        this.sub_training_position = `${this.select_golongan.label} • ${this.select_direktorat.label}`;
      }

      this.handleFilter(true);
    },
    parseDate(date, format = 'DD MMMM YYYY') {
      return moment(new Date(date)).format(format);
    },
    parseTime(time) {
      const sTime = time.split(':');
      return `${sTime[0]}:${sTime[1]}`;
    },
    handleUpdateScore(type) {
      trainingParticipantUpdate(this.training_id, {
        type,
        data: this.data_table_training_score
      }).then(({ message }) => {
        if (message === 'OK') {
          this.$q.notify({
            message: 'Successfull update training',
            color: 'blue'
          });
          this.getTraining();
        } else {
          this.$q.notify({
            message: 'Failed update training',
            color: 'red',
            position: 'center',
            actions: [
              { icon: 'close', color: 'white', handler: () => { /* ... */ } }
            ],
            timeout: 60000
          });
        }
      });
    },
    handleFilter(fromPosition = false) {
      let isStartDate = true;
      let isEndDate = true;
      if (this.start_date_filter === '' || !this.isValidDate(this.start_date_filter) || fromPosition) isStartDate = false;
      if (this.end_date_filter === '' || !this.isValidDate(this.end_date_filter) || fromPosition) isEndDate = false;

      const raw_start_date_filter = new Date(this.start_date_filter);
      const year_start_filter = raw_start_date_filter.getFullYear();
      const raw_end_date_filter = new Date(this.end_date_filter);
      const year_end_filter = raw_end_date_filter.getFullYear();
      if (year_start_filter !== year_end_filter) {
        this.$q.notify({
          message: 'Gagal melakukan filter, tahun tidak sama',
          color: 'red',
          position: 'center',
          actions: [
            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
          ],
          timeout: 60000
        });
        return;
      }

      this.data_table = [];

      trainingList({
        ...(isStartDate && { date_start: this.start_date_filter }),
        ...(isEndDate && { date_end: this.end_date_filter }),
        ...(!fromPosition && { search_term: this.filter }),
        ...(fromPosition && { organization_id: this.position_value })
      }).then(response => {
        const hasil = response.data;
        this.data_table = hasil.map((item, index) => ({ ...item, no: index + 1 }));
      });

      trainingSummary({
        ...(isStartDate && { year: year_start_filter }),
        ...(fromPosition && { organization_id: this.position_value })
      }).then(response => {
        const hasil = response.data;
        this.summary = hasil;
      });
    },
    handleGetOtherParticipantRegistered() {
      this.list_participant = [];
      this.modal_list_participant = true;
      trainingParticipantGetOtherByType(this.training_id, {
        participant_type: 'registered'
      }).then(response => {
        const { data } = response;

        this.list_participant = data;
      });
    },
    handleGetOtherSchedule(id) {
      this.list_schedule = [];
      this.modal_list_schedule = true;
      trainingDetail(id).then(response => {
        const {
          data: { schedule }
        } = response;

        this.list_schedule = schedule;
      });
    },
    handleStatusSchedule(row) {
      const { schedule, recuring } = row;

      if (recuring === 'Does not repeat') {
        const dateStart = schedule[0].date_start;
        const dateEnd = schedule[0].date_end;
        return this.handleBetweenDate(dateStart, dateEnd);
      }
      if (recuring === 'Daily') {
        const dateStart = schedule[0].date_start;
        const dateEnd = schedule[schedule.length - 1].date_start;
        return this.handleBetweenDate(dateStart, dateEnd);
      }
      if (recuring === 'Custom') {
        const dateStart = schedule[0].date_start;
        const dateEnd = schedule[schedule.length - 1].date_start;
        return this.handleBetweenDate(dateStart, dateEnd);
      }
      return { text: '', color: '' };
    },
    handleDownloadTraining() {
      const { rowsPerPage, page } = this.pagination;
      window.open(
        `./api/api/export-training?limit=${rowsPerPage}&offset=${page - 1}`
      );
    },
    handleDownloadParticipant(row) {
      window.open(`./api/api/export-participant/${row.id}`);
    },
    handleBetweenDate(date1, date2) {
      const d1 = new Date(date1).getTime();
      const d2 = new Date(date2).getTime();
      const cd = new Date().getTime();

      let text = '';
      let color = '';

      if (cd <= d1 && cd <= d2) {
        text = 'Schedule';
        color = 'red';
      } else if (cd >= d1 && cd <= d2) {
        text = 'OnGoing';
        color = 'primary';
      } else if (cd >= d1 && cd >= d2) {
        text = 'Finished';
        color = 'green';
      }

      return { text, color };
    },
    detailNotificationClick(trainingId) {
      this.isLoadingDetail = true;
      trainingDetail(trainingId).then(response => {
        this.training_id = response.data.id;
        this.isLoadingDetail = false;
        this.training_name = response.data.name;
        this.training_description = response.data.description;
        this.training_type = response.data.training_type;
        this.training_method = response.data.training_method;
        this.locations = response.data.locations;
        this.status = response.data.status;
        this.provider = response.data.provider;
        this.all_day = response.data.all_day;
        this.is_private = response.data.is_private;
        this.maximun_capacity = response.data.maximun_capacity;
        this.recuring = response.data.recuring;
        this.narasumber_list_detail = [];
        response.data.expertise.forEach((v, i) => {
          this.narasumber_list_detail.push({
            users_id: v.users_id,
            name: v.user.name,
            roles: v.expert_type
          });
        });
        this.finish_files_detail = [];
        response.data.files.forEach((v, i) => {
          this.finish_files_detail.push({
            file: {
              filemime: v.filemime,
              filename: v.filename,
              filesize: v.filesize,
              path: v.path
            }
          });
        });
        this.avatar_participant = [];
        this.total_participant = response.data.total_participant;
        this.information_participant = response.data.information_participant;
        this.avatar_participant = response.data.avatar_participant;
        this.registered = response.data.registered;
        this.pending = response.data.pending;
        this.declined = response.data.declined;
        this.check_participant = response.data.check_participant;
        this.is_rsvp = response.data.is_rsvp;

        const dateStart = response.data.schedule[0].date_start;
        if (response.data.schedule.length > 1) {
          const dateEnd =
            response.data.schedule[response.data.schedule.length - 1]
              .date_start;
          this.training_date = `${dateStart} - ${dateEnd}`;
        } else {
          this.training_date = dateStart;
        }
      });
      this.list_participant_pending = [];
      trainingParticipantGetOtherByType(trainingId, {
        participant_type: 'pending'
      }).then(response => {
        const { data } = response;

        this.list_participant_pending = data;
      });
      this.modal_detail_training = true;

      this.updateTrainingId(null);
    },
    isValidDate(date) {
      if (date !== null) {
        const sDate = date.split('-');
        return !Number.isNaN(Number(sDate[0])) && !Number.isNaN(Number(sDate[1])) && !Number.isNaN(Number(sDate[2]));
      }
      return null;
    }
  },
  mounted() {
    this.getTraining();
    // this.getTree(true);
    this.getUser();
    this.getOrganization();
    this.getDirektorat();
    this.getJabatan();
    this.getPangkatGolongan();
    this.getTrainingSummary();

    if (this.trainingId != null) {
      this.detailNotificationClick(this.trainingId);
    }
  }
};
</script>

<style>
.q-tree__node-header-content .row {
  flex-wrap: inherit;
}
</style>

<!--<template>-->
<!--  <div>-->
<!--    <div class="q-pb-md q-pr-md ">-->
<!--      <q-card class="kmp-card-rounded q-px-md q-py-sm">-->
<!--        <q-card-section>-->
<!--          <div class="row items-center cursor-pointer">-->
<!--            <q-icon name="business_center" class="q-mr-sm text-blue" size="24px"/>-->
<!--            <div>-->
<!--              <span class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md cursor-pointer">-->
<!--                {{ position_title }}-->
<!--                <span>-->
<!--                  <q-icon name="chevron_right" size="20px"/>-->
<!--                </span>-->
<!--              </span>-->
<!--              <q-popup-proxy v-model="position_show" transition-show="flip-up" transition-hide="flip-down">-->
<!--                <q-banner style="max-width: 500px; min-height: 0 !important; padding: 0 !important">-->
<!--                  <treeselect-->
<!--                    v-model="position_value"-->
<!--                    :options="position_options"-->
<!--                    append-to-body-->
<!--                    close-on-select-->
<!--                    :clearable="false"-->
<!--                    :normalizer="normalizer"-->
<!--                    class="vue-treeselect"-->
<!--                    @select="positionSelect"-->
<!--                  />-->
<!--                </q-banner>-->
<!--              </q-popup-proxy>-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <div class="row q-mb-sm">-->
<!--          <div class="col-4 q-pa-sm">-->
<!--            <q-card-->
<!--              class="kmp-card-rounded q-pa-md kmp-color-2"-->
<!--              style="background-color:#EBFFE8"-->
<!--            >-->
<!--              <span class="">Total Training</span>-->
<!--              <div class="row">-->
<!--                <div class="col-2 text-center">-->
<!--                  <q-icon-->
<!--                    name="card_membership"-->
<!--                    class="q-mr-sm q-mt-md"-->
<!--                    color="#0083C9"-->
<!--                    size="30px"-->
<!--                  />-->
<!--                </div>-->
<!--                <div class="col-10">-->
<!--                  <div class="kmp-color-2 kmp-font-hg-2">-->
<!--                    {{ summary.total_training.total }}-->
<!--                  </div>-->
<!--                  <div class="kmp-color-2 kmp-font-sm">-->
<!--                    in Year of {{ summary.total_training.year }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </q-card>-->
<!--          </div>-->
<!--          <div class="col-4 q-pa-sm">-->
<!--            <q-card-->
<!--              class="kmp-card-rounded q-pa-md kmp-color-3"-->
<!--              style="background-color:#FFF6EA"-->
<!--            >-->
<!--              <span class="kmp-color-3 text-bold">Target Direktorat</span>-->
<!--              <div class="row">-->
<!--                <div class="col-2 text-center">-->
<!--                  <q-icon-->
<!--                    name="track_changes"-->
<!--                    class="q-mr-sm q-mt-md"-->
<!--                    color="#0083C9"-->
<!--                    size="30px"-->
<!--                  />-->
<!--                </div>-->
<!--                <div class="col-10">-->
<!--                  <div class="kmp-color-3 kmp-font-hg-2">-->
<!--                    {{ summary.target_direktorat.total }}%-->
<!--                  </div>-->
<!--                  <div class="kmp-color-3 kmp-font-sm">-->
<!--                    in Year of {{ summary.target_direktorat.year }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </q-card>-->
<!--          </div>-->
<!--          <div class="col-4 q-pa-sm">-->
<!--            <q-card-->
<!--              class="kmp-card-rounded q-pa-md kmp-color-4"-->
<!--              style="background-color:#F9EFFE"-->
<!--            >-->
<!--              <span class="kmp-color-4 text-bold">Total Participant</span>-->
<!--              <div class="row">-->
<!--                <div class="col-2 text-center">-->
<!--                  <q-icon-->
<!--                    name="supervisor_account"-->
<!--                    class="q-mr-sm q-mt-md"-->
<!--                    color="#0083C9"-->
<!--                    size="30px"-->
<!--                  />-->
<!--                </div>-->
<!--                <div class="col-10">-->
<!--                  <div class="kmp-color-4 kmp-font-hg-2">-->
<!--                    {{ summary.total_participant.total }}-->
<!--                  </div>-->
<!--                  <div class="kmp-color-4 kmp-font-sm">-->
<!--                    of {{ summary.total_participant.of }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </q-card>-->
<!--          </div>-->
<!--        </div>-->
<!--        <q-separator class="q-mx-sm" />-->
<!--        <div class="row q-mx-sm q-mb-md q-mt-md">-->
<!--          <span class="kmp-font-md kmp-font-bold" style="font-size:16px"-->
<!--            >Training List</span-->
<!--          >-->
<!--        </div>-->
<!--        <div class="row q-mx-sm q-mb-md q-mt-md">-->
<!--          <div class="col-8">-->
<!--            <div class="row q-gutter-md">-->
<!--              <div class="col-4">-->
<!--                <q-input-->
<!--                  ref="filter"-->
<!--                  outlined-->
<!--                  dense-->
<!--                  v-model="filter"-->
<!--                  placeholder="Nama training"-->
<!--                >-->
<!--                  <template v-slot:append>-->
<!--                    <q-icon name="search" />-->
<!--                  </template>-->
<!--                </q-input>-->
<!--              </div>-->
<!--              <div class="col-6">-->
<!--                <div class="row items-center">-->
<!--                  <div class="col-5">-->
<!--                    <q-input outlined dense v-model="start_date_filter">-->
<!--                      <template v-slot:prepend>-->
<!--                        <q-icon name="event" class="cursor-pointer">-->
<!--                          <q-popup-proxy-->
<!--                            cover-->
<!--                            transition-show="scale"-->
<!--                            transition-hide="scale"-->
<!--                          >-->
<!--                            <q-date-->
<!--                              v-model="start_date_filter"-->
<!--                              mask="YYYY-MM-DD"-->
<!--                            >-->
<!--                              <div class="row items-center justify-end">-->
<!--                                <q-btn-->
<!--                                  v-close-popup-->
<!--                                  label="Close"-->
<!--                                  color="primary"-->
<!--                                  flat-->
<!--                                />-->
<!--                              </div>-->
<!--                            </q-date>-->
<!--                          </q-popup-proxy>-->
<!--                        </q-icon>-->
<!--                      </template>-->
<!--                    </q-input>-->
<!--                  </div>-->
<!--                  <div class="col-2">-->
<!--                    <div class="text-center">To</div>-->
<!--                  </div>-->
<!--                  <div class="col-5">-->
<!--                    <q-input outlined dense v-model="end_date_filter">-->
<!--                      <template v-slot:prepend>-->
<!--                        <q-icon name="event" class="cursor-pointer">-->
<!--                          <q-popup-proxy-->
<!--                            cover-->
<!--                            transition-show="scale"-->
<!--                            transition-hide="scale"-->
<!--                          >-->
<!--                            <q-date v-model="end_date_filter" mask="YYYY-MM-DD">-->
<!--                              <div class="row items-center justify-end">-->
<!--                                <q-btn-->
<!--                                  v-close-popup-->
<!--                                  label="Close"-->
<!--                                  color="primary"-->
<!--                                  flat-->
<!--                                />-->
<!--                              </div>-->
<!--                            </q-date>-->
<!--                          </q-popup-proxy>-->
<!--                        </q-icon>-->
<!--                      </template>-->
<!--                    </q-input>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col">-->
<!--                <q-btn color="primary" label="Search" @click="handleFilter(false)" />-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col row justify-end q-gutter-sm" v-if="is_km_manager==true">-->
<!--            <q-btn outline color="primary" no-caps label="Add New Training" @click="openModalTraining('add');"/>-->
<!--            <q-btn outline color="primary" no-caps label="Export Training" @click="handleDownloadTraining();"/>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="row q-mx-sm q-mb-md q-mt-md">-->
<!--          <div class="col-12">-->
<!--            <q-table-->
<!--              flat-->
<!--              bordered-->
<!--              class="kmp-table-header-1 kmp-border-color-1 kmp-rounded-2"-->
<!--              :columns="columns_table"-->
<!--              :data="data_table"-->
<!--              :pagination.sync="pagination"-->
<!--              row-key="name"-->
<!--            >-->
<!--              <template v-slot:body="props">-->
<!--                <q-tr :props="props">-->
<!--                  <q-td key="no" :props="props"> {{ props.row.no }}. </q-td>-->
<!--                  <q-td key="name" class="text-left" :props="props">-->
<!--                    <a-->
<!--                      href="training/#"-->
<!--                      @click="openModalTraining('detail', props.row)"-->
<!--                      class="text-blue"-->
<!--                      style="text-decoration:none"-->
<!--                      >{{ props.row.name }}</a-->
<!--                    >-->
<!--                  </q-td>-->
<!--                  <q-td key="training_type" :props="props">-->
<!--                    <div v-if="props.row.training_type">-->
<!--                      <span-->
<!--                        v-if="-->
<!--                          props.row.training_type.toLowerCase() == 'training'-->
<!--                        "-->
<!--                      >-->
<!--                        <q-badge color="blue" roundedclass="q-ma-sm">{{-->
<!--                          props.row.training_type-->
<!--                        }}</q-badge>-->
<!--                      </span>-->
<!--                      <span-->
<!--                        v-else-if="-->
<!--                          props.row.training_type.toLowerCase() == 'webinar'-->
<!--                        "-->
<!--                      >-->
<!--                        <q-badge color="red" class="q-ma-sm">{{-->
<!--                          props.row.training_type-->
<!--                        }}</q-badge>-->
<!--                      </span>-->
<!--                      <span-->
<!--                        v-else-if="-->
<!--                          props.row.training_type.toLowerCase() ==-->
<!--                            'certification'-->
<!--                        "-->
<!--                      >-->
<!--                        <q-badge color="green" class="q-ma-sm">{{-->
<!--                          props.row.training_type-->
<!--                        }}</q-badge>-->
<!--                      </span>-->
<!--                      <span v-else>-->
<!--                        <q-badge color="yellow" class="q-ma-sm">{{-->
<!--                          props.row.training_type-->
<!--                        }}</q-badge>-->
<!--                      </span>-->
<!--                    </div>-->
<!--                    <span v-else>-</span>-->
<!--                  </q-td>-->
<!--                  <q-td key="status" :props="props">-->
<!--                    <div v-if="props.row.status">-->
<!--                      <span v-if="props.row.status.toLowerCase() == 'draft'">-->
<!--                        <q-badge color="#bcc213" roundedclass="q-ma-sm"-->
<!--                          >Draft</q-badge-->
<!--                        >-->
<!--                      </span>-->
<!--                      <span-->
<!--                        v-else-if="-->
<!--                          props.row.status.toLowerCase() == 'open_registration'-->
<!--                        "-->
<!--                      >-->
<!--                        <q-badge color="green" class="q-ma-sm"-->
<!--                          >Open Registration</q-badge-->
<!--                        >-->
<!--                      </span>-->
<!--                      <span-->
<!--                        v-else-if="-->
<!--                          props.row.status.toLowerCase() == 'close_registration'-->
<!--                        "-->
<!--                      >-->
<!--                        <q-badge color="blue" class="q-ma-sm"-->
<!--                          >Close Registration</q-badge-->
<!--                        >-->
<!--                      </span>-->
<!--                      <span v-else>-->
<!--                        <q-badge color="red" class="q-ma-sm">End</q-badge>-->
<!--                      </span>-->
<!--                    </div>-->
<!--                    <span v-else>-</span>-->
<!--                  </q-td>-->
<!--                  <q-td key="date" :props="props">-->
<!--                    <div-->
<!--                      class="cursor-pointer"-->
<!--                      v-if="props.row.schedule.length > 1"-->
<!--                      @click="handleGetOtherSchedule(props.row.id)"-->
<!--                    >-->
<!--                      {{-->
<!--                        parseDate(-->
<!--                          props.row.schedule[0].date_start,-->
<!--                          'DD MMM YYYY'-->
<!--                        )-->
<!--                      }},-->
<!--                      {{-->
<!--                        parseDate(-->
<!--                          props.row.schedule[1].date_start,-->
<!--                          'DD MMM YYYY'-->
<!--                        )-->
<!--                      }}...-->
<!--                    </div>-->
<!--                    <div v-else>-->
<!--                      {{-->
<!--                        parseDate(-->
<!--                          props.row.schedule[0].date_start,-->
<!--                          'DD MMM YYYY'-->
<!--                        )-->
<!--                      }},-->
<!--                      <span-->
<!--                        v-if="-->
<!--                          props.row.schedule[0].time_start &&-->
<!--                            props.row.schedule[0].time_end-->
<!--                        "-->
<!--                        >{{-->
<!--                          `${parseTime(-->
<!--                            props.row.schedule[0].time_start-->
<!--                          )} - ${parseTime(props.row.schedule[0].time_end)}`-->
<!--                        }}</span-->
<!--                      >-->
<!--                    </div>-->
<!--                  </q-td>-->
<!--                  &lt;!&ndash; <q-td key="status" :props="props">-->
<!--                    {{ handleStatusSchedule(props.row) }}-->
<!--                  </q-td> &ndash;&gt;-->
<!--                  <q-td key="provider" :props="props">-->
<!--                    {{ props.row.provider }}-->
<!--                  </q-td>-->
<!--                  <q-td key="action" :props="props">-->
<!--                    <div>-->
<!--                      &lt;!&ndash; <q-spinner-->
<!--                          v-if="isLoadingButtonAction==true"-->
<!--                        color="primary"-->
<!--                        size="3em"-->
<!--                      /> &ndash;&gt;-->
<!--                      <q-btn-dropdown color="primary" icon="settings" size="sm" v-if="is_km_manager==true">-->
<!--                        <q-list>-->
<!--                          <q-item-->
<!--                            clickable-->
<!--                            v-close-popup-->
<!--                            @click="openModalTraining('edit', props.row)"-->
<!--                          >-->
<!--                            <q-item-section>-->
<!--                              <q-item-label>Edit Training</q-item-label>-->
<!--                            </q-item-section>-->
<!--                          </q-item>-->
<!--                          <q-item-->
<!--                            clickable-->
<!--                            v-close-popup-->
<!--                            @click="handleDownloadParticipant(props.row)"-->
<!--                          >-->
<!--                            <q-item-section>-->
<!--                              <q-item-label>Download Participant</q-item-label>-->
<!--                            </q-item-section>-->
<!--                          </q-item>-->
<!--                          <q-item-->
<!--                            clickable-->
<!--                            v-close-popup-->
<!--                            @click="-->
<!--                              openModalTraining('update_score', props.row)-->
<!--                            "-->
<!--                          >-->
<!--                            <q-item-section>-->
<!--                              <q-item-label>Update Score</q-item-label>-->
<!--                            </q-item-section>-->
<!--                          </q-item>-->
<!--                          <q-item-->
<!--                            clickable-->
<!--                            v-close-popup-->
<!--                            @click="openModalTraining('edit_open', props.row)"-->
<!--                          >-->
<!--                            <q-item-section>-->
<!--                              <q-item-label>Open for Registration</q-item-label>-->
<!--                            </q-item-section>-->
<!--                          </q-item>-->
<!--                          <q-item-->
<!--                            clickable-->
<!--                            v-close-popup-->
<!--                            @click="openModalTraining('edit_close', props.row)"-->
<!--                          >-->
<!--                            <q-item-section>-->
<!--                              <q-item-label-->
<!--                                >Close for Registration</q-item-label-->
<!--                              >-->
<!--                            </q-item-section>-->
<!--                          </q-item>-->
<!--                          <q-item-->
<!--                            clickable-->
<!--                            v-close-popup-->
<!--                            @click="openModalTraining('delete', props.row)"-->
<!--                          >-->
<!--                            <q-item-section>-->
<!--                              <q-item-label>End Training</q-item-label>-->
<!--                            </q-item-section>-->
<!--                          </q-item>-->
<!--                        </q-list>-->
<!--                      </q-btn-dropdown>-->
<!--                    </div>-->
<!--                  </q-td>-->
<!--                </q-tr>-->
<!--              </template>-->
<!--            </q-table>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card>-->
<!--    </div>-->
<!--    <fixed-modal-->
<!--      :show="modal_add_training"-->
<!--      :title="`${training_modal_title} Training`"-->
<!--      width="560"-->
<!--      @on-close="modal_add_training = false"-->
<!--    >-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Training Name</div>-->
<!--        <q-input dense v-model="training_name" outlined autofocus />-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Description</div>-->
<!--        <q-input-->
<!--          outlined-->
<!--          dense-->
<!--          v-model="training_description"-->
<!--          type="textarea"-->
<!--          class=""-->
<!--        ></q-input>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="row">-->
<!--          <div class="col-6 q-pr-sm">-->
<!--            <div class="text-neutral">Training Type</div>-->
<!--            <q-select-->
<!--              v-model="training_type"-->
<!--              :options="[-->
<!--                'Webinar',-->
<!--                'Certification',-->
<!--                'Induksi',-->
<!--                'IHT',-->
<!--                'Publik DN',-->
<!--                'Pendidikan',-->
<!--                'Orientasi'-->
<!--              ]"-->
<!--              outlined-->
<!--              dense-->
<!--            >-->
<!--            </q-select>-->
<!--          </div>-->
<!--          <div class="col-6 q-pl-sm">-->
<!--            <div class="text-neutral">Training Method</div>-->
<!--            <q-select-->
<!--              v-model="training_method"-->
<!--              :options="['Online', 'Offline', 'Blended Learning']"-->
<!--              outlined-->
<!--              dense-->
<!--            >-->
<!--            </q-select>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Location</div>-->
<!--        <q-input dense v-model="locations" outlined />-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Provider</div>-->
<!--        <q-input dense v-model="provider" outlined />-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Keterangan Jam Pelatihan</div>-->
<!--        <q-input-->
<!--          dense-->
<!--          v-model="ket_jam_pelatihan"-->
<!--          type="textarea"-->
<!--          rows="4"-->
<!--          outlined-->
<!--        />-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Topik Pelatihan</div>-->
<!--        <q-input dense v-model="topik_pelatihan" outlined />-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="row">-->
<!--          <div class="col-5 q-pr-sm q-pt-md text-neutral">-->
<!--            <q-toggle v-model="is_private" />-->
<!--            RSVP for event-->
<!--          </div>-->
<!--          <div class="col-7 q-pl-sm">-->
<!--            <div class="text-neutral">Maximum Capacity</div>-->
<!--            <q-input-->
<!--              dense-->
<!--              v-model="maximun_capacity"-->
<!--              type="number"-->
<!--              min="1"-->
<!--              outlined-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <q-separator />-->
<!--      <q-card-section class="q-pt-md">-->
<!--        <div class="text-title">Training Time</div>-->
<!--      </q-card-section>-->

<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Recurring</div>-->
<!--        <q-select-->
<!--          v-model="recuring"-->
<!--          :options="['Does not repeat', 'Daily', 'Custom']"-->
<!--          outlined-->
<!--          dense-->
<!--        >-->
<!--        </q-select>-->
<!--      </q-card-section>-->

<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="row">-->
<!--          <div class="col-5 text-neutral">-->
<!--            <q-toggle v-model="all_day" />-->
<!--            All Day Event-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <div>-->
<!--        <q-card-section-->
<!--          class="q-pt-none"-->
<!--          v-if="this.recuring === 'Does not repeat'"-->
<!--        >-->
<!--          <div class="row q-mb-xs">-->
<!--            <div :class="!all_day ? 'col-6 q-pr-md' : 'col'">-->
<!--              <div class="text-neutral">Start Date</div>-->
<!--              <q-input-->
<!--                outlined-->
<!--                dense-->
<!--                v-model="start_date"-->
<!--                mask="date"-->
<!--                :rules="['date']"-->
<!--              >-->
<!--                <template v-slot:append>-->
<!--                  <q-icon name="event" class="cursor-pointer">-->
<!--                    <q-popup-proxy-->
<!--                      ref="qDateProxy"-->
<!--                      cover-->
<!--                      transition-show="scale"-->
<!--                      transition-hide="scale"-->
<!--                    >-->
<!--                      <q-date v-model="start_date">-->
<!--                        <div class="row items-center justify-end">-->
<!--                          <q-btn-->
<!--                            v-close-popup-->
<!--                            label="Close"-->
<!--                            color="primary"-->
<!--                            flat-->
<!--                          />-->
<!--                        </div>-->
<!--                      </q-date>-->
<!--                    </q-popup-proxy>-->
<!--                  </q-icon>-->
<!--                </template>-->
<!--              </q-input>-->
<!--            </div>-->
<!--            <div class="col-6" v-if="!all_day">-->
<!--              <div class="row">-->
<!--                <div class="col-5 q-pr-xs">-->
<!--                  <div class="text-neutral">Start Time</div>-->
<!--                  <q-input-->
<!--                    outlined-->
<!--                    dense-->
<!--                    v-model="start_time"-->
<!--                    mask="time"-->
<!--                    :rules="['time']"-->
<!--                  >-->
<!--                    <template v-slot:append>-->
<!--                      <q-icon name="access_time" class="cursor-pointer">-->
<!--                        <q-popup-proxy-->
<!--                          cover-->
<!--                          transition-show="scale"-->
<!--                          transition-hide="scale"-->
<!--                        >-->
<!--                          <q-time v-model="start_time" format24h>-->
<!--                            <div class="row items-center justify-end">-->
<!--                              <q-btn-->
<!--                                v-close-popup-->
<!--                                label="Close"-->
<!--                                color="primary"-->
<!--                                flat-->
<!--                              />-->
<!--                            </div>-->
<!--                          </q-time>-->
<!--                        </q-popup-proxy>-->
<!--                      </q-icon>-->
<!--                    </template>-->
<!--                  </q-input>-->
<!--                </div>-->
<!--                <div class="col-2 text-center text-neutral q-pt-lg">To</div>-->
<!--                <div class="col-5 q-pl-xs">-->
<!--                  <div class="text-neutral">End Time</div>-->
<!--                  <q-input-->
<!--                    outlined-->
<!--                    dense-->
<!--                    v-model="end_time"-->
<!--                    mask="time"-->
<!--                    :rules="['time']"-->
<!--                  >-->
<!--                    <template v-slot:append>-->
<!--                      <q-icon name="access_time" class="cursor-pointer">-->
<!--                        <q-popup-proxy-->
<!--                          cover-->
<!--                          transition-show="scale"-->
<!--                          transition-hide="scale"-->
<!--                        >-->
<!--                          <q-time v-model="end_time" format24h>-->
<!--                            <div class="row items-center justify-end">-->
<!--                              <q-btn-->
<!--                                v-close-popup-->
<!--                                label="Close"-->
<!--                                color="primary"-->
<!--                                flat-->
<!--                              />-->
<!--                            </div>-->
<!--                          </q-time>-->
<!--                        </q-popup-proxy>-->
<!--                      </q-icon>-->
<!--                    </template>-->
<!--                  </q-input>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-pt-none" v-else-if="this.recuring === 'Daily'">-->
<!--          <div class="row q-mb-xs">-->
<!--            <div :class="!all_day ? 'col-6 q-pr-md' : 'col'">-->
<!--              <div class="text-neutral">Start Date</div>-->
<!--              <q-input-->
<!--                outlined-->
<!--                dense-->
<!--                v-model="start_date"-->
<!--                mask="date"-->
<!--                :rules="['date']"-->
<!--              >-->
<!--                <template v-slot:append>-->
<!--                  <q-icon name="event" class="cursor-pointer">-->
<!--                    <q-popup-proxy-->
<!--                      ref="qDateProxy"-->
<!--                      cover-->
<!--                      transition-show="scale"-->
<!--                      transition-hide="scale"-->
<!--                    >-->
<!--                      <q-date v-model="start_date">-->
<!--                        <div class="row items-center justify-end">-->
<!--                          <q-btn-->
<!--                            v-close-popup-->
<!--                            label="Close"-->
<!--                            color="primary"-->
<!--                            flat-->
<!--                          />-->
<!--                        </div>-->
<!--                      </q-date>-->
<!--                    </q-popup-proxy>-->
<!--                  </q-icon>-->
<!--                </template>-->
<!--              </q-input>-->
<!--            </div>-->
<!--            <div class="col-6" v-if="!all_day">-->
<!--              <div class="row">-->
<!--                <div class="col-5 q-pr-xs">-->
<!--                  <div class="text-neutral">Start Time</div>-->
<!--                  <q-input-->
<!--                    outlined-->
<!--                    dense-->
<!--                    v-model="start_time"-->
<!--                    mask="time"-->
<!--                    :rules="['time']"-->
<!--                  >-->
<!--                    <template v-slot:append>-->
<!--                      <q-icon name="access_time" class="cursor-pointer">-->
<!--                        <q-popup-proxy-->
<!--                          cover-->
<!--                          transition-show="scale"-->
<!--                          transition-hide="scale"-->
<!--                        >-->
<!--                          <q-time v-model="start_time" format24h>-->
<!--                            <div class="row items-center justify-end">-->
<!--                              <q-btn-->
<!--                                v-close-popup-->
<!--                                label="Close"-->
<!--                                color="primary"-->
<!--                                flat-->
<!--                              />-->
<!--                            </div>-->
<!--                          </q-time>-->
<!--                        </q-popup-proxy>-->
<!--                      </q-icon>-->
<!--                    </template>-->
<!--                  </q-input>-->
<!--                </div>-->
<!--                <div class="col-2 text-center text-neutral q-pt-lg">To</div>-->
<!--                <div class="col-5 q-pl-xs">-->
<!--                  <div class="text-neutral">End Time</div>-->
<!--                  <q-input-->
<!--                    outlined-->
<!--                    dense-->
<!--                    v-model="end_time"-->
<!--                    mask="time"-->
<!--                    :rules="['time']"-->
<!--                  >-->
<!--                    <template v-slot:append>-->
<!--                      <q-icon name="access_time" class="cursor-pointer">-->
<!--                        <q-popup-proxy-->
<!--                          cover-->
<!--                          transition-show="scale"-->
<!--                          transition-hide="scale"-->
<!--                        >-->
<!--                          <q-time v-model="end_time" format24h>-->
<!--                            <div class="row items-center justify-end">-->
<!--                              <q-btn-->
<!--                                v-close-popup-->
<!--                                label="Close"-->
<!--                                color="primary"-->
<!--                                flat-->
<!--                              />-->
<!--                            </div>-->
<!--                          </q-time>-->
<!--                        </q-popup-proxy>-->
<!--                      </q-icon>-->
<!--                    </template>-->
<!--                  </q-input>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col">-->
<!--            <div class="text-neutral">End Date</div>-->
<!--            <q-input-->
<!--              outlined-->
<!--              dense-->
<!--              v-model="end_date"-->
<!--              mask="date"-->
<!--              :rules="['date']"-->
<!--            >-->
<!--              <template v-slot:append>-->
<!--                <q-icon name="event" class="cursor-pointer">-->
<!--                  <q-popup-proxy-->
<!--                    ref="qDateProxy"-->
<!--                    cover-->
<!--                    transition-show="scale"-->
<!--                    transition-hide="scale"-->
<!--                  >-->
<!--                    <q-date v-model="end_date">-->
<!--                      <div class="row items-center justify-end">-->
<!--                        <q-btn-->
<!--                          v-close-popup-->
<!--                          label="Close"-->
<!--                          color="primary"-->
<!--                          flat-->
<!--                        />-->
<!--                      </div>-->
<!--                    </q-date>-->
<!--                  </q-popup-proxy>-->
<!--                </q-icon>-->
<!--              </template>-->
<!--            </q-input>-->
<!--          </div>-->
<!--          &lt;!&ndash; <div class="text-neutral">Ends after how many occurence</div>-->
<!--          <q-input dense v-model="ends_after_how_many_occurence" type="number" outlined/> &ndash;&gt;-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-pt-none" v-else>-->
<!--          <div-->
<!--            v-for="(field, index) in this.schedule_custom_array"-->
<!--            :key="index"-->
<!--          >-->
<!--            <div class="row q-mb-md">-->
<!--              <div :class="!all_day ? 'col-6 q-pr-md' : 'col'">-->
<!--                <div class="text-neutral">Date</div>-->
<!--                <q-input-->
<!--                  outlined-->
<!--                  dense-->
<!--                  v-model="start_date_custom[index]"-->
<!--                  mask="date"-->
<!--                  :rules="['date']"-->
<!--                >-->
<!--                  <template v-slot:append>-->
<!--                    <q-icon name="event" class="cursor-pointer">-->
<!--                      <q-popup-proxy-->
<!--                        ref="qDateProxy"-->
<!--                        cover-->
<!--                        transition-show="scale"-->
<!--                        transition-hide="scale"-->
<!--                      >-->
<!--                        <q-date v-model="start_date_custom[index]">-->
<!--                          <div class="row items-center justify-end">-->
<!--                            <q-btn-->
<!--                              v-close-popup-->
<!--                              label="Close"-->
<!--                              color="primary"-->
<!--                              flat-->
<!--                            />-->
<!--                          </div>-->
<!--                        </q-date>-->
<!--                      </q-popup-proxy>-->
<!--                    </q-icon>-->
<!--                  </template>-->
<!--                </q-input>-->
<!--              </div>-->
<!--              <div class="col-6" v-if="!all_day">-->
<!--                <div class="row">-->
<!--                  <div class="col-5 q-pr-xs">-->
<!--                    <div class="text-neutral">Start Time</div>-->
<!--                    <q-input-->
<!--                      outlined-->
<!--                      dense-->
<!--                      v-model="start_time_custom[index]"-->
<!--                      mask="time"-->
<!--                      :rules="['time']"-->
<!--                    >-->
<!--                      <template v-slot:append>-->
<!--                        <q-icon name="access_time" class="cursor-pointer">-->
<!--                          <q-popup-proxy-->
<!--                            cover-->
<!--                            transition-show="scale"-->
<!--                            transition-hide="scale"-->
<!--                          >-->
<!--                            <q-time-->
<!--                              v-model="start_time_custom[index]"-->
<!--                              format24h-->
<!--                            >-->
<!--                              <div class="row items-center justify-end">-->
<!--                                <q-btn-->
<!--                                  v-close-popup-->
<!--                                  label="Close"-->
<!--                                  color="primary"-->
<!--                                  flat-->
<!--                                />-->
<!--                              </div>-->
<!--                            </q-time>-->
<!--                          </q-popup-proxy>-->
<!--                        </q-icon>-->
<!--                      </template>-->
<!--                    </q-input>-->
<!--                  </div>-->
<!--                  <div class="col-1 text-center text-neutral q-pt-lg">To</div>-->
<!--                  <div class="col-5 q-pl-xs">-->
<!--                    <div class="text-neutral">End Time</div>-->
<!--                    <q-input-->
<!--                      outlined-->
<!--                      dense-->
<!--                      v-model="end_time_custom[index]"-->
<!--                      mask="time"-->
<!--                      :rules="['time']"-->
<!--                    >-->
<!--                      <template v-slot:append>-->
<!--                        <q-icon name="access_time" class="cursor-pointer">-->
<!--                          <q-popup-proxy-->
<!--                            cover-->
<!--                            transition-show="scale"-->
<!--                            transition-hide="scale"-->
<!--                          >-->
<!--                            <q-time v-model="end_time_custom[index]" format24h>-->
<!--                              <div class="row items-center justify-end">-->
<!--                                <q-btn-->
<!--                                  v-close-popup-->
<!--                                  label="Close"-->
<!--                                  color="primary"-->
<!--                                  flat-->
<!--                                />-->
<!--                              </div>-->
<!--                            </q-time>-->
<!--                          </q-popup-proxy>-->
<!--                        </q-icon>-->
<!--                      </template>-->
<!--                    </q-input>-->
<!--                  </div>-->
<!--                  <div class="col-1 text-center text-neutral q-pt-lg">-->
<!--                    <q-btn-->
<!--                      flat-->
<!--                      round-->
<!--                      icon="close"-->
<!--                      size="sm"-->
<!--                      @click="DeleteCustomDate(index)"-->
<!--                    />-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-1 q-pt-xs">-->
<!--            <q-btn-->
<!--              outline-->
<!--              color="primary"-->
<!--              no-caps-->
<!--              label="Add Date"-->
<!--              @click="AddCustomDate()"-->
<!--            />-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </div>-->
<!--      <q-separator />-->
<!--      <q-card-section class="q-pt-md row d-flex justify-between">-->
<!--        <div class="text-title">Narasumber</div>-->
<!--        <div-->
<!--          class="text-title kmp-text-blue-2 cursor-pointer"-->
<!--          v-if="narasumber_roles === 'External'"-->
<!--          @click="modal_add_narasumber = true"-->
<!--        >-->
<!--          + Add Narasumber-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="row">-->
<!--          <div class="col-6 q-pr-md">-->
<!--            <div class="text-neutral">Roles</div>-->
<!--            <q-select-->
<!--              v-model="narasumber_roles"-->
<!--              :options="['Internal', 'External']"-->
<!--              outlined-->
<!--              dense-->
<!--            >-->
<!--            </q-select>-->
<!--          </div>-->
<!--          <div class="col-5 q-pr-md text-neutral">-->
<!--            <div class="text-neutral">Add Person</div>-->
<!--            <q-select-->
<!--              v-model="narasumber_person_id"-->
<!--              use-input-->
<!--              hide-selected-->
<!--              fill-input-->
<!--              input-debounce="0"-->
<!--              @filter="filterPersons"-->
<!--              :options="persons_option"-->
<!--              :option-value="'id'"-->
<!--              :option-label="'name'"-->
<!--              :disable="narasumber_roles === null"-->
<!--              name="persons_option"-->
<!--              dense-->
<!--              outlined-->
<!--            >-->
<!--              <template v-slot:no-option>-->
<!--                <q-item>-->
<!--                  <q-item-section class="text-grey">-->
<!--                    No results-->
<!--                  </q-item-section>-->
<!--                </q-item>-->
<!--              </template>-->
<!--            </q-select>-->
<!--          </div>-->
<!--          <div class="col-1 q-pt-lg">-->
<!--            <q-btn-->
<!--              outline-->
<!--              color="primary"-->
<!--              no-caps-->
<!--              label="Add"-->
<!--              @click="addNarasumber()"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div-->
<!--          v-for="(narasumber, index) in this.narasumber_list"-->
<!--          class="row q-mb-xs"-->
<!--          :key="index"-->
<!--        >-->
<!--          <div class="col-8">-->
<!--            <div class="text-neutral">-->
<!--              <span-->
<!--                ><q-badge color="blue" rounded class="q-pa-xd"-->
<!--                  ><q-avatar-->
<!--                    size="sm"-->
<!--                    class="q-mr-xs"-->
<!--                    color="primary"-->
<!--                    text-color="white"-->
<!--                    >{{-->
<!--                      narasumber.name-->
<!--                        .match(/\b(\w)/g)-->
<!--                        .join('')-->
<!--                        .toUpperCase()-->
<!--                    }}</q-avatar-->
<!--                  >-->
<!--                  {{ narasumber.name }}</q-badge-->
<!--                ></span-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-4 text-right text-neutral">-->
<!--            {{ narasumber.roles }}-->
<!--            <q-btn-->
<!--              flat-->
<!--              round-->
<!--              icon="close"-->
<!--              size="sm"-->
<!--              @click="deleteNarasumber(index)"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <q-separator />-->
<!--      <q-card-section class="q-pt-md">-->
<!--        <div class="text-title">PIC</div>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="row">-->
<!--          <div class="col q-pr-md text-neutral">-->
<!--            <div class="text-neutral">Add Person</div>-->
<!--            <q-select-->
<!--              v-model="narasumber_person_pic_id"-->
<!--              use-input-->
<!--              hide-selected-->
<!--              fill-input-->
<!--              input-debounce="0"-->
<!--              @filter="filterPersonsPic"-->
<!--              :options="persons_pic_option"-->
<!--              :option-value="'id'"-->
<!--              :option-label="'name'"-->
<!--              name="persons_pic_option"-->
<!--              dense-->
<!--              outlined-->
<!--            >-->
<!--              <template v-slot:no-option>-->
<!--                <q-item>-->
<!--                  <q-item-section class="text-grey">-->
<!--                    No results-->
<!--                  </q-item-section>-->
<!--                </q-item>-->
<!--              </template>-->
<!--            </q-select>-->
<!--          </div>-->
<!--          <div class="col-1 q-pt-lg">-->
<!--            <q-btn-->
<!--              outline-->
<!--              color="primary"-->
<!--              no-caps-->
<!--              label="Add"-->
<!--              @click="addPIC()"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div-->
<!--          v-for="(narasumber, index) in this.narasumber_list_pic"-->
<!--          class="row q-mb-xs"-->
<!--          :key="index"-->
<!--        >-->
<!--          <div class="col-8">-->
<!--            <div class="text-neutral">-->
<!--              <span-->
<!--                ><q-badge color="blue" rounded class="q-pa-xd"-->
<!--                  ><q-avatar-->
<!--                    size="sm"-->
<!--                    class="q-mr-xs"-->
<!--                    color="primary"-->
<!--                    text-color="white"-->
<!--                    >{{-->
<!--                      narasumber.name-->
<!--                        .match(/\b(\w)/g)-->
<!--                        .join('')-->
<!--                        .toUpperCase()-->
<!--                    }}</q-avatar-->
<!--                  >-->
<!--                  {{ narasumber.name }}</q-badge-->
<!--                ></span-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-4 text-right text-neutral">-->
<!--            PIC-->
<!--            <q-btn-->
<!--              flat-->
<!--              round-->
<!--              icon="close"-->
<!--              size="sm"-->
<!--              @click="deletePIC(index)"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <q-separator />-->
<!--      <q-card-section class="q-pt-md">-->
<!--        <div class="text-title">Invitation</div>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Direktorat/Biro/Bagian</div>-->
<!--        <q-select-->
<!--            v-model="direktorat_id"-->
<!--            use-input-->
<!--            hide-selected-->
<!--            fill-input-->
<!--            input-debounce="0"-->
<!--            @filter="filterDirektorat"-->
<!--            @input="id => addOrganizationIds('direktorat', id)"-->
<!--            :options="direktorat_options_filter"-->
<!--            :option-value="'id'"-->
<!--            :option-label="'name'"-->
<!--            name="direktorat_id"-->
<!--            autocomplete="off"-->
<!--            emit-value-->
<!--            map-options-->
<!--            dense-->
<!--            outlined-->
<!--          >-->
<!--            <template v-slot:no-option>-->
<!--              <q-item>-->
<!--                <q-item-section class="text-grey">-->
<!--                  No results-->
<!--                </q-item-section>-->
<!--              </q-item>-->
<!--            </template>-->
<!--          </q-select>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Jabatan</div>-->
<!--        <q-select-->
<!--            :disable="(direktorat_id === '' || direktorat_id === null)"-->
<!--            v-model="jabatan_id"-->
<!--            use-input-->
<!--            hide-selected-->
<!--            fill-input-->
<!--            input-debounce="0"-->
<!--            @filter="filterJabatan"-->
<!--            @input="id => addOrganizationIds('jabatan', id)"-->
<!--            :options="jabatan_options_filter"-->
<!--            :option-value="'id'"-->
<!--            :option-label="'name'"-->
<!--            name="jabatan_id"-->
<!--            autocomplete="off"-->
<!--            emit-value-->
<!--            map-options-->
<!--            dense-->
<!--            outlined-->
<!--          >-->
<!--            <template v-slot:no-option>-->
<!--              <q-item>-->
<!--                <q-item-section class="text-grey">-->
<!--                  No results-->
<!--                </q-item-section>-->
<!--              </q-item>-->
<!--            </template>-->
<!--          </q-select>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Pangkat Golongan</div>-->
<!--        <q-select-->
<!--            :disable="(jabatan_id === '' || jabatan_id === null)"-->
<!--            v-model="pangkat_id"-->
<!--            use-input-->
<!--            hide-selected-->
<!--            fill-input-->
<!--            input-debounce="0"-->
<!--            @filter="filterPangkatGolongan"-->
<!--            @input="id => addOrganizationIds('pangkat', id)"-->
<!--            :options="pangkat_options_filter"-->
<!--            :option-value="'id'"-->
<!--            :option-label="'name'"-->
<!--            name="pangkat_id"-->
<!--            autocomplete="off"-->
<!--            emit-value-->
<!--            map-options-->
<!--            dense-->
<!--            outlined-->
<!--          >-->
<!--            <template v-slot:no-option>-->
<!--              <q-item>-->
<!--                <q-item-section class="text-grey">-->
<!--                  No results-->
<!--                </q-item-section>-->
<!--              </q-item>-->
<!--            </template>-->
<!--          </q-select>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="row">-->
<!--          <div class="col q-pr-md text-neutral">-->
<!--            <div class="text-neutral">Search Person</div>-->
<!--            <q-select-->
<!--              :disable="direktorat_id === null"-->
<!--              v-model="invitation_person_id"-->
<!--              use-input-->
<!--              fill-input-->
<!--              input-debounce="0"-->
<!--              @filter="filterPersonsDirektorat"-->
<!--              :options="persons_direktorat_option_filter"-->
<!--              :option-value="'id'"-->
<!--              :option-label="'name'"-->
<!--              name="invitation_person_id"-->
<!--              autocomplete="off"-->
<!--              dense-->
<!--              outlined-->
<!--              multiple-->
<!--            >-->
<!--              <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">-->
<!--                <q-item-->
<!--                  v-bind="itemProps"-->
<!--                  v-on="itemEvents"-->
<!--                >-->
<!--                  <q-item-section>-->
<!--                    <q-item-label v-html="opt.name"></q-item-label>-->
<!--                  </q-item-section>-->
<!--                  <q-item-section side>-->
<!--                    <q-checkbox :value="selected" @input="toggleOption(opt)" />-->
<!--                  </q-item-section>-->
<!--                </q-item>-->
<!--              </template>-->
<!--              <template v-slot:no-option>-->
<!--                <q-item>-->
<!--                  <q-item-section class="text-grey">-->
<!--                    No results-->
<!--                  </q-item-section>-->
<!--                </q-item>-->
<!--              </template>-->
<!--            </q-select>-->
<!--          </div>-->
<!--          <div class="col-1 q-pt-lg">-->
<!--            <q-btn outline color="primary" no-caps label="Add" @click="addInvitation()"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <q-card-section>-->
<!--        <div-->
<!--          v-for="(row, index) in this.invitation_list"-->
<!--          class="row q-mb-xs"-->
<!--          :key="index"-->
<!--        >-->
<!--          <div class="col-8">-->
<!--            <div class="text-neutral">-->
<!--              <span-->
<!--                ><q-badge color="blue" rounded class="q-pa-xd"-->
<!--                  ><q-avatar-->
<!--                    size="sm"-->
<!--                    class="q-mr-xs"-->
<!--                    color="primary"-->
<!--                    text-color="white"-->
<!--                    >{{-->
<!--                      row.name-->
<!--                        .match(/\b(\w)/g)-->
<!--                        .join('')-->
<!--                        .toUpperCase()-->
<!--                    }}</q-avatar-->
<!--                  >-->
<!--                  {{ row.name }}</q-badge-->
<!--                ></span-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-4 text-right text-neutral">-->
<!--            {{ row.roles }}-->
<!--            <q-btn-->
<!--              flat-->
<!--              round-->
<!--              icon="close"-->
<!--              size="sm"-->
<!--              @click="deleteInvitation(index)"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--      <q-separator />-->
<!--      <q-card-section class="q-pt-md">-->
<!--        <div class="text-title">Attachments</div>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <q-uploader-->
<!--          :url="handleUpload"-->
<!--          ref="uploader"-->
<!--          label="Individual upload"-->
<!--          multiple-->
<!--          batch-->
<!--          auto-upload-->
<!--          style="width: 100%"-->
<!--          class="shadow-0 q-uploader&#45;&#45;bordered kmp-rounded"-->
<!--        />-->
<!--      </q-card-section>-->

<!--      <q-card-section class="q-pt-none">-->
<!--        <div-->
<!--          class="font-weight-bold q-mb-sm q-mt-md"-->
<!--          v-if="finish_files.length > 0"-->
<!--        >-->
<!--          {{ finish_files.length }} Files Uploaded-->
<!--        </div>-->
<!--        <q-linear-progress-->
<!--          v-if="uploaded_files"-->
<!--          indeterminate-->
<!--          rounded-->
<!--          color="negative"-->
<!--          class="q-my-sm"-->
<!--        />-->
<!--        <q-list>-->
<!--          <div v-for="(item, index) in finish_files" :key="index">-->
<!--            <ListFile-->
<!--              v-if="item.file !== null"-->
<!--              :file="item.file"-->
<!--              :item="item"-->
<!--              manage="true"-->
<!--              @delete_knowledge="handleDelete(item.file.id, 'file', index)"-->
<!--            />-->
<!--          </div>-->
<!--        </q-list>-->
<!--      </q-card-section>-->

<!--      <div v-for="(item, index) in list_attachments" :key="index">-->
<!--        <div v-if="item.name !== null">-->
<!--          <q-card-section class="q-pt-xs">-->
<!--            <div class="text-title">{{ item.name }}</div>-->
<!--          </q-card-section>-->
<!--          <q-card-section class="q-pt-none">-->
<!--            <div class="row">-->
<!--              <div class="col q-pr-sm">-->
<!--                <q-uploader-->
<!--                  :url="(files, content_type) => eachHandleUpload(item, index, files, content_type)"-->
<!--                  ref="each-uploader"-->
<!--                  label="Individual upload"-->
<!--                  multiple-->
<!--                  batch-->
<!--                  auto-upload-->
<!--                  style="width: 100%"-->
<!--                  class="shadow-0 q-uploader&#45;&#45;bordered kmp-rounded"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="col-1">-->
<!--                <q-btn outline color="red" no-caps label="-" @click="eachHandleDelete(item, null, index, 'delete_all')"/>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="font-weight-bold q-mb-sm q-mt-md" v-if="item.finish_files.length > 0">{{ item.finish_files.length }} Files-->
<!--            Uploaded-->
<!--            </div>-->
<!--            <q-linear-progress v-if="item.uploaded_files" indeterminate rounded color="negative" class="q-my-sm"/>-->
<!--            <q-list>-->
<!--              <div-->
<!--                v-for="(subItem, subIndex) in item.finish_files"-->
<!--                :key="subIndex"-->
<!--              >-->
<!--                <ListFile v-if="subItem.file !== null" :file="subItem.file" :item="subItem" manage="true"-->
<!--                                    @delete_knowledge="eachHandleDelete(item, subItem, subIndex)"/>-->
<!--              </div>-->
<!--            </q-list>-->
<!--          </q-card-section>-->
<!--        </div>-->
<!--      </div>-->

<!--      <q-card-section class="q-pt-xs">-->
<!--        <q-btn outline color="primary" no-caps label="+" @click="modal_add_attachment = true"/>-->
<!--      </q-card-section>-->

<!--      <template #footer>-->
<!--        <q-separator />-->
<!--        <q-card-actions align="right" class="text-primary">-->
<!--          <q-btn-->
<!--            size="sm"-->
<!--            class="q-mr-sm"-->
<!--            outline-->
<!--            unelevated-->
<!--            @click="modal_add_training = false"-->
<!--            >Cancel</q-btn-->
<!--          >-->
<!--          <div class="q-mr-sm">|</div>-->
<!--          <div v-if="save_add">-->
<!--            <q-btn-->
<!--              size="sm"-->
<!--              class="btn-primary-color q-mr-sm publish-button"-->
<!--              label="Save Draft"-->
<!--              unelevated-->
<!--              @click="saveTraining('draft')"-->
<!--            />-->
<!--            <q-btn-->
<!--              size="sm"-->
<!--              class="q-mr-sm publish-button"-->
<!--              label="Open Registration"-->
<!--              color="green"-->
<!--              unelevated-->
<!--              @click="saveTraining('open_reg')"-->
<!--            />-->
<!--          </div>-->
<!--          <div v-if="save_edit">-->
<!--            <q-btn-->
<!--              size="sm"-->
<!--              class="btn-primary-color q-mr-sm publish-button"-->
<!--              label="Save"-->
<!--              unelevated-->
<!--              @click="saveTraining('save_update')"-->
<!--            />-->
<!--            <q-btn-->
<!--              size="sm"-->
<!--              class="q-mr-sm publish-button"-->
<!--              label="Close Registration"-->
<!--              unelevated-->
<!--              color="blue"-->
<!--              @click="saveTraining('close_reg')"-->
<!--            />-->
<!--            <q-btn-->
<!--              size="sm"-->
<!--              class="q-mr-sm publish-button"-->
<!--              label="End Training"-->
<!--              unelevated-->
<!--              color="red"-->
<!--              @click="saveTraining('end')"-->
<!--            />-->
<!--          </div>-->
<!--        </q-card-actions>-->
<!--      </template>-->
<!--    </fixed-modal>-->
<!--    <q-dialog v-model="modal_delete_training" persistent>-->
<!--      <q-card style="min-width: 500px" class="q-py-md q-px-sm">-->
<!--        <q-card-section>-->
<!--          <q-icon-->
<!--            name="close"-->
<!--            size="24px"-->
<!--            class="text-neutral float-right"-->
<!--            v-close-popup-->
<!--          />-->
<!--          <div class="text-h6">End Training</div>-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <div class="text-neutral">-->
<!--            Update participant’s scores to end this training-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-card-section>-->
<!--          <q-table-->
<!--            class="my-sticky-header-table"-->
<!--            :columns="columns_table_training_score"-->
<!--            :data="data_table_training_score"-->
<!--            row-key="no"-->
<!--          >-->
<!--            <template v-slot:body="props">-->
<!--              <q-tr :props="props">-->
<!--                <q-td key="no" :props="props"> {{ props.row.no }}. </q-td>-->
<!--                <q-td key="participant_name" :props="props">-->
<!--                  <div class="text-blue" style="text-decoration:none">-->
<!--                    {{ props.row.participant_name }}-->
<!--                  </div>-->
<!--                </q-td>-->
<!--                <q-td key="pretest_score" class="text-blue" :props="props">-->
<!--                  {{ props.row.pretest_score || 'Click here to edit' }}-->
<!--                  <q-popup-edit v-model="props.row.pretest_score">-->
<!--                    <q-input-->
<!--                      type="number"-->
<!--                      v-model="props.row.pretest_score"-->
<!--                      dense-->
<!--                      autofocus-->
<!--                      counter-->
<!--                    />-->
<!--                  </q-popup-edit>-->
<!--                </q-td>-->
<!--                <q-td key="posttest_score" class="text-blue" :props="props">-->
<!--                  {{ props.row.posttest_score || 'Click here to edit' }}-->
<!--                  <q-popup-edit v-model="props.row.posttest_score">-->
<!--                    <q-input-->
<!--                      type="number"-->
<!--                      v-model="props.row.posttest_score"-->
<!--                      dense-->
<!--                      autofocus-->
<!--                      counter-->
<!--                    />-->
<!--                  </q-popup-edit>-->
<!--                </q-td>-->
<!--              </q-tr>-->
<!--            </template>-->
<!--          </q-table>-->
<!--        </q-card-section>-->
<!--        <q-card-actions align="right" class="text-primary">-->
<!--          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>-->
<!--          <q-btn-->
<!--            class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--            label="End Training"-->
<!--            unelevated-->
<!--            v-close-popup-->
<!--            @click="handleUpdateScore('end_training')"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
<!--    <q-dialog v-model="modal_update_score_training" persistent>-->
<!--      <q-card style="min-width: 500px" class="q-py-md q-px-sm">-->
<!--        <q-card-section>-->
<!--          <q-icon-->
<!--            name="close"-->
<!--            size="24px"-->
<!--            class="text-neutral float-right"-->
<!--            v-close-popup-->
<!--          />-->
<!--          <div class="text-h6">Update Score</div>-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <div class="text-neutral">-->
<!--            {{ total_participant }} Participant in-->
<!--            <b>{{ this.training_name }}</b>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-card-section>-->
<!--          <q-table-->
<!--            class="my-sticky-header-table"-->
<!--            :columns="columns_table_training_score"-->
<!--            :data="data_table_training_score"-->
<!--            row-key="no"-->
<!--          >-->
<!--            <template v-slot:body="props">-->
<!--              <q-tr :props="props">-->
<!--                <q-td key="no" :props="props"> {{ props.row.no }}. </q-td>-->
<!--                <q-td key="participant_name" :props="props">-->
<!--                  <div class="text-blue" style="text-decoration:none">-->
<!--                    {{ props.row.participant_name }}-->
<!--                  </div>-->
<!--                </q-td>-->
<!--                <q-td key="pretest_score" class="text-blue" :props="props">-->
<!--                  {{ props.row.pretest_score || 'Click here to edit' }}-->
<!--                  <q-popup-edit v-model="props.row.pretest_score">-->
<!--                    <q-input-->
<!--                      type="number"-->
<!--                      v-model="props.row.pretest_score"-->
<!--                      dense-->
<!--                      autofocus-->
<!--                      counter-->
<!--                    />-->
<!--                  </q-popup-edit>-->
<!--                </q-td>-->
<!--                <q-td key="posttest_score" class="text-blue" :props="props">-->
<!--                  {{ props.row.posttest_score || 'Click here to edit' }}-->
<!--                  <q-popup-edit v-model="props.row.posttest_score">-->
<!--                    <q-input-->
<!--                      type="number"-->
<!--                      v-model="props.row.posttest_score"-->
<!--                      dense-->
<!--                      autofocus-->
<!--                      counter-->
<!--                    />-->
<!--                  </q-popup-edit>-->
<!--                </q-td>-->
<!--              </q-tr>-->
<!--            </template>-->
<!--          </q-table>-->
<!--        </q-card-section>-->
<!--        <q-card-actions align="right" class="text-primary">-->
<!--          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>-->
<!--          <q-btn-->
<!--            class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--            label="Save"-->
<!--            unelevated-->
<!--            v-close-popup-->
<!--            @click="handleUpdateScore('update_score')"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
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
<!--                    @click="openModalTraining('register_training')"-->
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
<!--    <q-dialog v-model="modal_register_training" persistent>-->
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
<!--            required-->
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

<!--    <q-dialog v-model="modal_change_position">-->
<!--      <q-card style="min-width: 500px" class="q-py-md q-px-sm">-->
<!--        <q-card-section>-->
<!--          <q-icon-->
<!--            name="close"-->
<!--            size="24px"-->
<!--            class="text-neutral float-right"-->
<!--            v-close-popup-->
<!--          />-->
<!--          <div class="text-h6">Change Position</div>-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-pt-none">-->
<!--          <q-select-->
<!--            dense-->
<!--            outlined-->
<!--            class="q-mb-sm"-->
<!--            use-input-->
<!--            v-model="select_direktorat"-->
<!--            :options="option_direktorat"-->
<!--            label="Direktorat"-->
<!--            @filter="filterFnDirektorat"-->
<!--            @input="changeDirektorat"-->
<!--          >-->
<!--          </q-select>-->
<!--          <q-select-->
<!--            dense-->
<!--            outlined-->
<!--            class="q-mb-sm"-->
<!--            :disable="select_direktorat === '' || select_direktorat === null"-->
<!--            v-model="select_jabatan"-->
<!--            :options="option_jabatan"-->
<!--            label="Jabatan / Fungsional"-->
<!--            @filter="filterFnJabatan"-->
<!--            @input="changeJabatan"-->
<!--          ></q-select>-->
<!--          <q-select-->
<!--            dense-->
<!--            outlined-->
<!--            :disable="select_jabatan === '' || select_jabatan === null"-->
<!--            v-model="select_golongan"-->
<!--            :options="option_golongan"-->
<!--            label="Pangkat / Golongan"-->
<!--            @filter="filterFnGolongan"-->
<!--          ></q-select>-->
<!--        </q-card-section>-->

<!--        <q-card-actions align="right" class="text-primary">-->
<!--          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>-->
<!--          <q-btn-->
<!--            class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--            label="Save"-->
<!--            unelevated-->
<!--            @click="savePosition"-->
<!--          />-->
<!--        </q-card-actions>-->
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
<!--    <fixed-modal-->
<!--      :show="modal_list_schedule"-->
<!--      :title="`Schedule list - ${list_schedule.length}`"-->
<!--      @on-close="modal_list_schedule = false"-->
<!--    >-->
<!--      <div-->
<!--        v-for="(item, index) in list_schedule"-->
<!--        :key="index"-->
<!--        class="row q-gutter-sm items-center"-->
<!--        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"-->
<!--      >-->
<!--        <q-icon name="event" class="cursor-pointer" size="sm" />-->
<!--        <div class="kmp-font-md kmp-font-bold">-->
<!--          {{ parseDate(item.date_start) }}-->
<!--          <div class="kmp-font-normal" v-if="item.time_start && item.time_end">-->
<!--            {{ `${parseTime(item.time_start)} - ${parseTime(item.time_end)}` }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </fixed-modal>-->
<!--    <fixed-modal-->
<!--      :show="modal_list_person"-->
<!--      :title="`Person list - ${list_person.length}`"-->
<!--      @on-close="modal_list_person = false"-->
<!--    >-->
<!--      <div-->
<!--        v-for="(item, index) in list_person"-->
<!--        :key="index"-->
<!--        class="row q-gutter-sm items-center"-->
<!--        :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'"-->
<!--      >-->
<!--        <q-checkbox size="sm" v-model="selected_person" :val="item" />-->
<!--        <q-avatar color="primary" text-color="white" size="30px">{{-->
<!--          item.name-->
<!--            .match(/\b(\w)/g)-->
<!--            .join('')-->
<!--            .toUpperCase()-->
<!--        }}</q-avatar>-->
<!--        <div class="kmp-font-md kmp-font-bold">{{ item.name }}</div>-->
<!--      </div>-->

<!--      <template #footer>-->
<!--        <q-separator />-->
<!--        <q-card-actions align="right" class="text-primary">-->
<!--          <q-btn class="" outline unelevated @click="modal_list_person = false"-->
<!--            >Cancel</q-btn-->
<!--          >-->
<!--          <q-btn-->
<!--            class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--            label="Save"-->
<!--            unelevated-->
<!--            @click="addInvitationFromCheckbox()"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </template>-->
<!--    </fixed-modal>-->
<!--    <fixed-modal-->
<!--      :show="modal_add_narasumber"-->
<!--      title="Add Narasumber"-->
<!--      @on-close="modal_add_narasumber = false"-->
<!--    >-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Name</div>-->
<!--        <q-input dense v-model="narasumber_create.name" outlined />-->
<!--      </q-card-section>-->

<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Email</div>-->
<!--        <q-input dense v-model="narasumber_create.email" outlined />-->
<!--      </q-card-section>-->

<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Phone</div>-->
<!--        <q-input dense v-model="narasumber_create.phone" outlined />-->
<!--      </q-card-section>-->

<!--      <template #footer>-->
<!--        <q-separator />-->
<!--        <q-card-actions align="right" class="text-primary">-->
<!--          <q-btn-->
<!--            class=""-->
<!--            outline-->
<!--            unelevated-->
<!--            @click="modal_add_narasumber = false"-->
<!--            >Cancel</q-btn-->
<!--          >-->
<!--          <q-btn-->
<!--            class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--            label="Save"-->
<!--            unelevated-->
<!--            @click="addNewNarasumber()"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </template>-->
<!--    </fixed-modal>-->
<!--    <fixed-modal-->
<!--      :show="modal_add_attachment"-->
<!--      title="Add Attachment"-->
<!--      @on-close="modal_add_attachment = false"-->
<!--    >-->
<!--      <q-card-section class="q-pt-none">-->
<!--        <div class="text-neutral">Name</div>-->
<!--        <q-input dense v-model="attachment_name" outlined/>-->
<!--      </q-card-section>-->

<!--      <template #footer>-->
<!--        <q-separator />-->
<!--        <q-card-actions align="right" class="text-primary">-->
<!--          <q-btn class="" outline unelevated @click="modal_add_attachment = false">Cancel</q-btn>-->
<!--          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated-->
<!--                  @click="addNewAttachment();"/>-->
<!--        </q-card-actions>-->
<!--      </template>-->
<!--    </fixed-modal>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Treeselect from '@riophae/vue-treeselect';-->
<!--import '@riophae/vue-treeselect/dist/vue-treeselect.css';-->

<!--import { mapGetters, mapActions } from 'vuex';-->
<!--import { axios } from 'boot/axios';-->
<!--import { getCredential } from 'src/lib/storage';-->
<!--import { Notify } from 'quasar';-->
<!--import moment from 'moment';-->
<!--import ListFile from 'components/common/ListFile';-->
<!--import FixedModal from 'components/common/FixedModal';-->
<!--import {-->
<!--  trainingCreate,-->
<!--  trainingDelete,-->
<!--  trainingList,-->
<!--  trainingUpdate,-->
<!--  trainingSummary,-->
<!--  trainingParticipantDetail,-->
<!--  trainingParticipantUpdate,-->
<!--  trainingParticipantGetOtherByType,-->
<!--  organizationList,-->
<!--  SearchDataAutocomplete,-->
<!--  fileDelete,-->
<!--  trainingDetail,-->
<!--  trainingRegister,-->
<!--  trainingApproval,-->
<!--  channelMemberPerson,-->
<!--  organizationUsers,-->
<!--  expertiseCreate-->
<!--} from '../../lib/api';-->

<!--const YEAR = moment().format('YYYY');-->

<!--export default {-->
<!--  components: { ListFile, FixedModal, Treeselect },-->
<!--  data() {-->
<!--    return {-->
<!--      position_options: [],-->
<!--      position_value: 0,-->
<!--      position_title: 'ALL KPK',-->
<!--      position_show: false,-->
<!--      normalizer(node) {-->
<!--        return {-->
<!--          id: node.id,-->
<!--          label: node.name,-->
<!--          children: node.children-->
<!--        };-->
<!--      },-->
<!--      methodPost: 'create',-->
<!--      is_km_manager: false,-->
<!--      modal_list_participant: false,-->
<!--      modal_list_schedule: false,-->
<!--      modal_list_person: false,-->
<!--      modal_add_narasumber: false,-->
<!--      modal_add_attachment: false,-->
<!--      modal_decline: false,-->
<!--      list_participant: [],-->
<!--      list_participant_pending: [],-->
<!--      list_schedule: [],-->
<!--      list_person: [],-->
<!--      list_attachments: [],-->
<!--      selected_person: [],-->
<!--      isLoadingDetail: 1,-->
<!--      training_modal_title: null,-->
<!--      attachment_name: '',-->
<!--      training_id: null,-->
<!--      training_name: '',-->
<!--      training_description: '',-->
<!--      training_type: '',-->
<!--      training_method: '',-->
<!--      training_date: '',-->
<!--      locations: '',-->
<!--      status: '',-->
<!--      provider: '',-->
<!--      ket_jam_pelatihan: '',-->
<!--      topik_pelatihan: '',-->
<!--      organization_id: null,-->
<!--      direktorat_id: null,-->
<!--      jabatan_id: null,-->
<!--      pangkat_id: null,-->
<!--      all_day: false,-->
<!--      uploaded_files: false,-->
<!--      is_private: false,-->
<!--      narasumber_person_id: null,-->
<!--      narasumber_person_pic_id: null,-->
<!--      narasumber_roles: null,-->
<!--      ends_after_how_many_occurence: null,-->
<!--      start_date: null,-->
<!--      start_time: null,-->
<!--      end_date: null,-->
<!--      end_time: null,-->
<!--      start_date_filter: moment().format('YYYY-MM-DD'),-->
<!--      end_date_filter: moment()-->
<!--        .add('1', 'months')-->
<!--        .format('YYYY-MM-DD'),-->
<!--      start_date_custom: [],-->
<!--      start_time_custom: [],-->
<!--      end_time_custom: [],-->
<!--      maximun_capacity: '1',-->
<!--      recuring: 'Does not repeat',-->
<!--      filter: '',-->
<!--      schedule_custom_array: [],-->
<!--      schedule_custom_repeat: 1,-->
<!--      modal_add_training: false,-->
<!--      modal_delete_training: false,-->
<!--      modal_update_score_training: false,-->
<!--      modal_detail_training: false,-->
<!--      modal_register_training: false,-->
<!--      invitation_person_id: null,-->
<!--      organization_options: [],-->
<!--      direktorat_options: [],-->
<!--      jabatan_options: [],-->
<!--      pangkat_options: [],-->
<!--      organization_options_filter: [],-->
<!--      direktorat_options_filter: [],-->
<!--      jabatan_options_filter: [],-->
<!--      pangkat_options_filter: [],-->
<!--      finish_files: [],-->
<!--      finish_files_register: [],-->
<!--      finish_files_detail: [],-->
<!--      modal_change_position: false,-->
<!--      tree_level: 1,-->
<!--      seq: 1,-->
<!--      parent: 1,-->
<!--      channel_id: 1,-->
<!--      created_by: 1,-->
<!--      subtitle: '',-->
<!--      business: '',-->
<!--      target: '',-->
<!--      type: '',-->
<!--      strategic_model: '',-->
<!--      address_model: '',-->
<!--      business_model: '',-->
<!--      knowledge_type_model: 'Basic Knowledge',-->
<!--      level4: false,-->
<!--      knowledge: 0,-->
<!--      dknowledge: 0,-->
<!--      abort: false,-->
<!--      level: 0,-->
<!--      state: '',-->
<!--      save_add: false,-->
<!--      save_edit: false,-->
<!--      id_pending: '',-->
<!--      alasan_ditolak: '',-->
<!--      narasumber_create: {-->
<!--        name: '',-->
<!--        email: '',-->
<!--        phone: ''-->
<!--      },-->
<!--      channel_model:-->
<!--        '<span class="kmp-text-blue text-weight-bold">direktorat_aclc</span>',-->
<!--      channel_options: [-->
<!--        {-->
<!--          label:-->
<!--            '<q-icon name="domain" size="16px" /><span class="kmp-text-blue text-weight-bold">direktorat_aclc</span>',-->
<!--          value: 'direktorat_aclc',-->
<!--          icon: 'domain'-->
<!--        },-->
<!--        {-->
<!--          label:-->
<!--            '<span class="kmp-text-blue text-weight-bold">direktorat_gratifikasi</span>',-->
<!--          value: 'direktorat_gratifikasi',-->
<!--          icon: 'domain'-->
<!--        }-->
<!--      ],-->
<!--      selected: null,-->
<!--      simple: [],-->
<!--      user: {-->
<!--        id: '',-->
<!--        name: '',-->
<!--        initial: ''-->
<!--      },-->
<!--      pagination: {-->
<!--        rowsPerPage: 10,-->
<!--        page: 1-->
<!--      },-->
<!--      columns_table: [-->
<!--        {-->
<!--          name: 'no',-->
<!--          field: 'no',-->
<!--          label: 'No.',-->
<!--          align: 'center',-->
<!--          style: 'width: 5%'-->
<!--        },-->
<!--        {-->
<!--          name: 'name',-->
<!--          field: 'name',-->
<!--          align: 'center',-->
<!--          label: 'Training Name'-->
<!--        },-->
<!--        {-->
<!--          name: 'training_type',-->
<!--          field: 'training_type',-->
<!--          align: 'center',-->
<!--          label: 'Type'-->
<!--        },-->
<!--        { name: 'status', field: 'status', align: 'center', label: 'Status' },-->
<!--        { name: 'date', field: 'date', align: 'center', label: 'Date' },-->
<!--        {-->
<!--          name: 'provider',-->
<!--          field: 'provider',-->
<!--          align: 'center',-->
<!--          label: 'Provider'-->
<!--        },-->
<!--        {-->
<!--          name: 'action',-->
<!--          field: 'action',-->
<!--          align: 'center',-->
<!--          label: '',-->
<!--          style: 'width: 5%'-->
<!--        }-->
<!--      ],-->
<!--      data_table: [],-->
<!--      columns_table_training_score: [-->
<!--        {-->
<!--          name: 'no',-->
<!--          field: 'no',-->
<!--          label: 'No.',-->
<!--          align: 'center',-->
<!--          style: 'width: 5%'-->
<!--        },-->
<!--        {-->
<!--          name: 'participant_name',-->
<!--          field: 'participant_name',-->
<!--          align: 'center',-->
<!--          label: 'Participant Name'-->
<!--        },-->
<!--        {-->
<!--          name: 'pretest_score',-->
<!--          field: 'pretest_score',-->
<!--          align: 'center',-->
<!--          label: 'Pre-test Score'-->
<!--        },-->
<!--        {-->
<!--          name: 'posttest_score',-->
<!--          field: 'posttest_score',-->
<!--          align: 'center',-->
<!--          label: 'Post-test Score'-->
<!--        }-->
<!--      ],-->
<!--      data_table_training_score: [],-->
<!--      narasumber_list: [],-->
<!--      narasumber_list_pic: [],-->
<!--      narasumber_list_detail: [],-->
<!--      option_direktorat_0: [],-->
<!--      option_direktorat: [],-->
<!--      option_jabatan_0: [],-->
<!--      option_jabatan: [],-->
<!--      option_golongan_0: [],-->
<!--      option_golongan: [],-->
<!--      select_direktorat: '',-->
<!--      select_jabatan: '',-->
<!--      select_golongan: '',-->
<!--      participant_type: '',-->
<!--      training_position: 'Data Training',-->
<!--      sub_training_position:-->
<!--        'Penata Muda I (III B) • Direktorat Pendidikan & Pelatihan Antikoprupsi',-->
<!--      total_participant: '',-->
<!--      information_participant: '',-->
<!--      avatar_participant: [],-->
<!--      registered: 0,-->
<!--      pending: 0,-->
<!--      declined: 0,-->
<!--      check_participant: 0,-->
<!--      is_rsvp: 0,-->
<!--      isLoadingButtonAction: false,-->
<!--      summary: {-->
<!--        total_training: {-->
<!--          total: 0,-->
<!--          year: YEAR-->
<!--        },-->
<!--        target_direktorat: {-->
<!--          total: 0,-->
<!--          year: YEAR-->
<!--        },-->
<!--        total_participant: {-->
<!--          total: 0,-->
<!--          of: 0-->
<!--        }-->
<!--      },-->
<!--      invitation_list: [],-->
<!--      persons_option_filter: [],-->
<!--      persons_option: [],-->
<!--      persons_pic_option: [],-->
<!--      persons_direktorat_option_filter: [],-->
<!--      persons_direktorat_option: []-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapGetters('notification', ['trainingId'])-->
<!--  },-->
<!--  watch: {-->
<!--    trainingId(newId, oldId) {-->
<!--      if (newId != null) {-->
<!--        this.detailNotificationClick(newId);-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    ...mapActions('notification', ['updateTrainingId']),-->

<!--    positionSelect(node) {-->
<!--      this.position_value = node.id;-->
<!--      this.position_title = node.name;-->
<!--      this.handleFilter(true);-->
<!--    },-->
<!--    openModalTraining(selected, training = null) {-->
<!--      this.resetTrainingFields();-->
<!--      if (selected === 'add') {-->
<!--        this.methodPost = 'create';-->
<!--        this.schedule_custom_array = Array.from(-->
<!--          Array(this.schedule_custom_repeat).keys()-->
<!--        );-->
<!--        this.training_modal_title = 'Add New';-->
<!--        this.training_name = '';-->
<!--        this.training_description = '';-->
<!--        this.training_type = '';-->
<!--        this.training_method = '';-->
<!--        this.locations = '';-->
<!--        this.provider = '';-->
<!--        this.all_day = false;-->
<!--        this.is_private = false;-->
<!--        this.maximun_capacity = null;-->
<!--        this.recuring = 'Does not repeat';-->
<!--        this.modal_add_training = true;-->
<!--        this.save_add = true;-->
<!--        this.save_edit = false;-->
<!--      } else if (selected === 'delete') {-->
<!--        this.training_id = training.id;-->
<!--        this.training_name = training.name;-->
<!--        this.getTrainingParticipantById('delete');-->
<!--      } else if (selected === 'update_score') {-->
<!--        this.training_id = training.id;-->
<!--        this.training_name = training.name;-->
<!--        this.getTrainingParticipantById('update_score');-->
<!--      } else if (selected === 'edit') {-->
<!--        this.methodPost = 'update';-->
<!--        this.training_modal_title = 'Edit';-->
<!--        this.isLoadingButtonAction = true;-->
<!--        this.save_add = false;-->
<!--        this.save_edit = true;-->
<!--        trainingDetail(training.id).then(response => {-->
<!--          this.status = training.status;-->
<!--          this.isLoadingButtonAction = false;-->
<!--          this.training_id = training.id;-->
<!--          this.organization_id = training.organization_id;-->
<!--          this.direktorat_id = training.direktorat_id;-->
<!--          this.jabatan_id = training.jabatan_id;-->
<!--          this.pangkat_id = training.pangkat_id;-->
<!--          this.training_name = training.name;-->
<!--          this.training_description = training.description;-->
<!--          this.training_type = training.training_type;-->
<!--          this.training_method = training.training_method;-->
<!--          this.locations = training.locations;-->
<!--          this.provider = training.provider;-->
<!--          this.ket_jam_pelatihan = training.ket_jam_pelatihan;-->
<!--          this.topik_pelatihan = training.topik_pelatihan;-->
<!--          this.all_day = training.all_day;-->
<!--          this.is_private = training.is_private;-->
<!--          this.maximun_capacity = training.maximun_capacity;-->
<!--          this.recuring = training.recuring;-->
<!--          this.training_date = training.date;-->
<!--          response.data.expertise.forEach((v, i) => {-->
<!--            if (v.expert_type !== 'PIC') {-->
<!--              this.narasumber_list.push({-->
<!--                users_id: v.users_id,-->
<!--                name: v.user.name,-->
<!--                roles: v.expert_type-->
<!--              });-->
<!--            } else {-->
<!--              this.narasumber_list_pic.push({-->
<!--                users_id: v.users_id,-->
<!--                name: v.user.name,-->
<!--                roles: v.expert_type-->
<!--              });-->
<!--            }-->
<!--          });-->
<!--          this.finish_files = [];-->
<!--          response.data.files.forEach((v, i) => {-->
<!--            if (v.filename_type === null) {-->
<!--              this.finish_files.push({-->
<!--                file: {-->
<!--                  filemime: v.filemime,-->
<!--                  filename: v.filename,-->
<!--                  filesize: v.filesize,-->
<!--                  path: v.path,-->
<!--                  id: v.id-->
<!--                }-->
<!--              });-->
<!--            }-->
<!--          });-->
<!--          this.invitation_list = [];-->
<!--          response.data.invitation.forEach((v, i) => {-->
<!--            this.invitation_list.push({-->
<!--              users_id: v.users_id,-->
<!--              organization_id: null,-->
<!--              name: v.user.name,-->
<!--              roles: v.type-->
<!--            });-->
<!--          });-->
<!--          if (training.recuring === 'Does not repeat') {-->
<!--            this.start_date = `${response.data.schedule[0].date_start} ${response.data.schedule[0].time_start}`;-->
<!--            this.end_date = `${response.data.schedule[0].date_end} ${response.data.schedule[0].time_end}`;-->
<!--            this.start_time = response.data.schedule[0].time_start;-->
<!--            this.end_time = response.data.schedule[0].time_end;-->
<!--          } else if (training.recuring === 'Daily') {-->
<!--            this.start_date = response.data.schedule[0].date_start;-->
<!--            this.end_date = `${response.data.schedule[0].date_end}`;-->
<!--            this.start_time = response.data.schedule[0].time_start;-->
<!--            this.end_time = response.data.schedule[0].time_end;-->
<!--            this.ends_after_how_many_occurence = response.data.repeated;-->
<!--          } else if (training.recuring === 'Custom') {-->
<!--            this.schedule_custom_array = Array.from(-->
<!--              Array(training.schedule.length).keys()-->
<!--            );-->
<!--            training.schedule.forEach(item => {-->
<!--              this.start_date_custom.push(item.date_start);-->
<!--              this.start_time_custom.push(item.time_start);-->
<!--              this.end_time_custom.push(item.time_end);-->
<!--            });-->
<!--          }-->
<!--          this.avatar_participant = [];-->
<!--          this.total_participant = response.data.total_participant;-->
<!--          this.information_participant = response.data.information_participant;-->
<!--          this.avatar_participant = response.data.avatar_participant;-->
<!--          this.registered = response.data.registered;-->
<!--          this.pending = response.data.pending;-->
<!--          this.declined = response.data.declined;-->
<!--          this.check_participant = response.data.check_participant;-->
<!--          this.is_rsvp = response.data.is_rsvp;-->
<!--          this.modal_add_training = true;-->

<!--          const removeDuplicateName = response.data.files.reduce((arr, item) => {-->
<!--            if (!arr.some(obj => obj.filename_type === item.filename_type)) arr.push(item);-->
<!--            return arr;-->
<!--          }, []);-->
<!--          const groupByName = response.data.files.reduce((arr, item) => {-->
<!--            if (item.filename_type !== null) arr[item.filename_type] = [...arr[item.filename_type] || [], { file: item }];-->
<!--            return arr;-->
<!--          }, []);-->

<!--          this.list_attachments = removeDuplicateName.map(item => {-->
<!--            if (item.filename_type !== null) {-->
<!--              return {-->
<!--                name: item.filename_type,-->
<!--                finish_files: groupByName[item.filename_type]-->
<!--              };-->
<!--            }-->
<!--            return undefined;-->
<!--          }).filter(item => item !== undefined);-->

<!--          if (training.direktorat_id) {-->
<!--            organizationList({ parent: training.direktorat_id, limit: 1000 })-->
<!--              .then(res => {-->
<!--                const hasil = res.data;-->
<!--                this.jabatan_options = hasil.map(v => (-->
<!--                  { id: v.id, name: v.name }-->
<!--                ));-->
<!--                this.jabatan_id = { id: training.jabatan_id, name: response.data.jabatan.name };-->
<!--              });-->
<!--          }-->
<!--          if (training.jabatan_id) {-->
<!--            organizationList({ parent: training.jabatan_id, limit: 1000 })-->
<!--              .then(res => {-->
<!--                const hasil = res.data;-->
<!--                this.pangkat_options = hasil.map(v => (-->
<!--                  { id: v.id, name: v.name }-->
<!--                ));-->
<!--                this.pangkat_id = { id: training.pangkat_id, name: response.data.pangkat.name };-->
<!--              });-->
<!--          }-->
<!--          if (training.direktorat_id || training.jabatan_id || training.pangkat_id) {-->
<!--            organizationUsers({-->
<!--              direktorat_id: training.direktorat_id,-->
<!--              ...(training.jabatan_id !== null && { jabatan_id: training.jabatan_id }),-->
<!--              ...(training.pangkat_id !== null && { pangkat_id: training.pangkat_id })-->
<!--            })-->
<!--              .then(res => {-->
<!--                const data = res.data.items;-->
<!--                this.persons_direktorat_option = data.map(item => ({-->
<!--                  id: item.id,-->
<!--                  name: item.name,-->
<!--                  roles: 'Person'-->
<!--                }));-->
<!--              });-->
<!--          }-->
<!--        });-->
<!--        this.isLoadingButtonAction = false;-->
<!--      } else if (selected === 'detail') {-->
<!--        this.isLoadingDetail = true;-->
<!--        trainingDetail(training.id).then(response => {-->
<!--          this.training_id = training.id;-->
<!--          this.isLoadingDetail = false;-->
<!--          this.training_name = training.name;-->
<!--          this.training_description = training.description;-->
<!--          this.training_type = training.training_type;-->
<!--          this.training_method = training.training_method;-->
<!--          this.locations = training.locations;-->
<!--          this.status = training.status;-->
<!--          this.provider = training.provider;-->
<!--          this.all_day = training.all_day;-->
<!--          this.is_private = training.is_private;-->
<!--          this.maximun_capacity = training.maximun_capacity;-->
<!--          this.recuring = training.recuring;-->
<!--          this.narasumber_list_detail = [];-->
<!--          response.data.expertise.forEach((v, i) => {-->
<!--            this.narasumber_list_detail.push({-->
<!--              users_id: v.users_id,-->
<!--              name: v.user.name,-->
<!--              roles: v.expert_type-->
<!--            });-->
<!--          });-->
<!--          this.finish_files_detail = [];-->
<!--          response.data.files.forEach((v, i) => {-->
<!--            this.finish_files_detail.push({-->
<!--              file: {-->
<!--                filemime: v.filemime,-->
<!--                filename: v.filename,-->
<!--                filesize: v.filesize,-->
<!--                path: v.path-->
<!--              }-->
<!--            });-->
<!--          });-->
<!--          this.avatar_participant = [];-->
<!--          this.total_participant = response.data.total_participant;-->
<!--          this.information_participant = response.data.information_participant;-->
<!--          this.avatar_participant = response.data.avatar_participant;-->
<!--          this.registered = response.data.registered;-->
<!--          this.pending = response.data.pending;-->
<!--          this.declined = response.data.declined;-->
<!--          this.check_participant = response.data.check_participant;-->
<!--          this.is_rsvp = response.data.is_rsvp;-->

<!--          const dateStart = training.schedule[0].date_start;-->
<!--          if (training.schedule.length > 1) {-->
<!--            const dateEnd =-->
<!--              training.schedule[training.schedule.length - 1].date_start;-->
<!--            this.training_date = `${dateStart} - ${dateEnd}`;-->
<!--          } else {-->
<!--            this.training_date = dateStart;-->
<!--          }-->
<!--        });-->
<!--        this.training_id = training.id;-->
<!--        this.list_participant_pending = [];-->
<!--        trainingParticipantGetOtherByType(this.training_id, {-->
<!--          participant_type: 'pending'-->
<!--        }).then(response => {-->
<!--          const { data } = response;-->

<!--          this.list_participant_pending = data;-->
<!--        });-->
<!--        this.modal_detail_training = true;-->
<!--      } else if (selected === 'position') {-->
<!--        organizationList({ groups: 'Unit Kerja', limit: 100 }).then(res => {-->
<!--          const response = res.data;-->
<!--          this.option_direktorat_0 = response.map(v => ({-->
<!--            value: v.id,-->
<!--            label: v.name-->
<!--          }));-->
<!--        });-->
<!--        this.modal_change_position = true;-->
<!--      } else if (selected === 'register_training') {-->
<!--        this.modal_register_training = true;-->
<!--      } else if (selected === 'edit_open') {-->
<!--        const data = {-->
<!--          status: 'open_registration'-->
<!--        };-->
<!--        trainingUpdate(training.id, data).then(response => {-->
<!--          this.$q.notify({-->
<!--            message: 'Training has been Open Registration.',-->
<!--            color: 'blue'-->
<!--          });-->
<!--          this.getTraining();-->
<!--        });-->
<!--      } else if (selected === 'edit_close') {-->
<!--        const data = {-->
<!--          status: 'close_registration'-->
<!--        };-->
<!--        trainingUpdate(training.id, data).then(response => {-->
<!--          this.$q.notify({-->
<!--            message: 'Training has been Close Registration.',-->
<!--            color: 'blue'-->
<!--          });-->
<!--          this.getTraining();-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    resetTrainingFields() {-->
<!--      this.organization_id = null;-->
<!--      this.direktorat_id = null;-->
<!--      this.jabatan_id = null;-->
<!--      this.pangkat_id = null;-->
<!--      this.provider = '';-->
<!--      this.ket_jam_pelatihan = '';-->
<!--      this.topik_jam_pelatihan = '';-->
<!--      this.organization_options_filter = this.organization_options;-->
<!--      this.direktorat_options_filter = this.direktorat_options;-->
<!--      this.jabatan_options_filter = this.jabatan_options;-->
<!--      this.pangkat_options_filter = this.pangkat_options;-->
<!--      this.schedule_custom_array = [];-->
<!--      this.start_date = null;-->
<!--      this.end_date = null;-->
<!--      this.start_time = null;-->
<!--      this.end_time = null;-->
<!--      this.start_date_custom = [];-->
<!--      this.start_time_custom = [];-->
<!--      this.end_time_custom = [];-->
<!--      this.narasumber_list = [];-->
<!--      this.narasumber_list_pic = [];-->
<!--      this.invitation_list = [];-->
<!--      this.finish_files = [];-->
<!--    },-->
<!--    getTrainingParticipantById(type) {-->
<!--      trainingParticipantDetail(this.training_id).then(response => {-->
<!--        const { data } = response;-->

<!--        this.total_participant = data.participant.length;-->
<!--        this.data_table_training_score = data.participant.map(-->
<!--          (item, index) => ({-->
<!--            no: index + 1,-->
<!--            id: item.id,-->
<!--            user_id: item.user.id,-->
<!--            participant_name: item.user.name,-->
<!--            pretest_score: item.pre_test_score,-->
<!--            posttest_score: item.post_test_score-->
<!--          })-->
<!--        );-->

<!--        if (type === 'update_score') {-->
<!--          this.modal_update_score_training = true;-->
<!--        } else if (type === 'delete') {-->
<!--          this.modal_delete_training = true;-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    getTraining() {-->
<!--      trainingList().then(response => {-->
<!--        const hasil = response.data;-->
<!--        this.data_table = hasil.map((item, index) => ({-->
<!--          ...item,-->
<!--          no: index + 1-->
<!--        }));-->
<!--      });-->
<!--    },-->
<!--    getTrainingSummary() {-->
<!--      trainingSummary().then(response => {-->
<!--        const hasil = response.data;-->
<!--        this.summary = hasil;-->
<!--      });-->
<!--    },-->
<!--    getOrganization() {-->
<!--      organizationList({ limit: 10000, no_parent: true }).then(response => {-->
<!--        const hasil = response.data;-->
<!--        const makeTree = (data, pid = 0) => {-->
<!--          return data.reduce((arr, item) => {-->
<!--            if (item.parent === pid) {-->
<!--              const children = makeTree(data, item.id);-->
<!--              if (children.length) item.children = children;-->
<!--              arr.push(item);-->
<!--            }-->
<!--            return arr;-->
<!--          }, []);-->
<!--        };-->

<!--        this.position_options = [{ id: 0, name: 'ALL KPK' }, ...makeTree(hasil)];-->
<!--      });-->
<!--    },-->
<!--    getDirektorat() {-->
<!--      organizationList({ groups: 'Unit Kerja', limit: 1000 }).then(response => {-->
<!--        const hasil = response.data;-->
<!--        this.direktorat_options = hasil;-->
<!--        this.direktorat_options_filter = hasil;-->
<!--      });-->
<!--    },-->
<!--    getJabatan() {-->
<!--      organizationList({ groups: 'Jabatan', limit: 1000 }).then(response => {-->
<!--        const hasil = response.data;-->
<!--        this.jabatan_options = hasil;-->
<!--        this.jabatan_options_filter = hasil;-->
<!--      });-->
<!--    },-->
<!--    getPangkatGolongan() {-->
<!--      organizationList({ groups: 'Pangkat Golongan', limit: 1000 }).then(-->
<!--        response => {-->
<!--          const hasil = response.data;-->
<!--          this.pangkat_options = hasil;-->
<!--          this.pangkat_options_filter = hasil;-->
<!--        }-->
<!--      );-->
<!--    },-->
<!--    saveTraining(selected, training = null) {-->
<!--      this.modal_add_training = false;-->
<!--      const mapFile = this.list_attachments.map(item => item.finish_files).concat(this.finish_files);-->
<!--      const concatFile = [].concat(...mapFile);-->
<!--      const groupFile = concatFile.map(item => ({ file_id: item.file.id }));-->

<!--      let jabatanId = null;-->
<!--      let pangkatId = null;-->
<!--      if (this.jabatan_id !== null) {-->
<!--        if (Object.keys(this.jabatan_id).length > 0) jabatanId = this.jabatan_id.id;-->
<!--        else jabatanId = this.jabatan_id;-->
<!--      }-->
<!--      if (this.pangkat_id !== null) {-->
<!--        if (Object.keys(this.pangkat_id).length > 0) pangkatId = this.pangkat_id.id;-->
<!--        else pangkatId = this.pangkat_id;-->
<!--      }-->
<!--      let status = '';-->
<!--      if (selected === 'open_reg') {-->
<!--        status = 'open_registration';-->
<!--      } else if (selected === 'close_reg') {-->
<!--        status = 'close_registration';-->
<!--      } else if (selected === 'end') {-->
<!--        this.getTrainingParticipantById('delete');-->
<!--        status = this.status;-->
<!--      } else if (selected === 'draft') {-->
<!--        status = 'draft';-->
<!--      } else if (selected === 'save_update') {-->
<!--        status = this.status;-->
<!--      }-->
<!--      const data = {-->
<!--        enabled: true,-->
<!--        status,-->
<!--        name: this.training_name,-->
<!--        description: this.training_description,-->
<!--        training_type: this.training_type,-->
<!--        training_method: this.training_method,-->
<!--        locations: this.locations,-->
<!--        direktorat_id: this.direktorat_id,-->
<!--        jabatan_id: jabatanId,-->
<!--        pangkat_id: pangkatId,-->
<!--        provider: this.provider,-->
<!--        ket_jam_pelatihan: this.ket_jam_pelatihan,-->
<!--        topik_pelatihan: this.topik_pelatihan,-->
<!--        all_day: this.all_day,-->
<!--        is_private: this.is_private,-->
<!--        maximun_capacity: this.maximun_capacity,-->
<!--        recuring: this.recuring,-->
<!--        repeated: null,-->
<!--        expertise: [...this.narasumber_list, ...this.narasumber_list_pic],-->
<!--        invitation: this.invitation_list,-->
<!--        file: groupFile,-->
<!--        start_date: this.start_date,-->
<!--        start_time: this.start_time,-->
<!--        end_date: this.end_date,-->
<!--        end_time: this.end_time,-->
<!--        ends_after_how_many_occurence:-->
<!--          new Date(this.end_date).getDate() - -->
<!--          new Date(this.start_date).getDate(),-->
<!--        start_date_custom: this.start_date_custom,-->
<!--        start_time_custom: this.start_time_custom,-->
<!--        end_time_custom: this.end_time_custom-->
<!--      };-->
<!--      if (this.methodPost === 'create') {-->
<!--        trainingCreate(data).then(response => {-->
<!--          this.$q.notify({-->
<!--            message: 'Training has been added',-->
<!--            color: 'blue'-->
<!--          });-->
<!--          this.summary.total_training = {-->
<!--            total: this.summary.total_training.total + 1,-->
<!--            year: YEAR-->
<!--          };-->
<!--          this.getTraining();-->
<!--        });-->
<!--      } else if (this.methodPost === 'update') {-->
<!--        trainingUpdate(this.training_id, data).then(response => {-->
<!--          this.$q.notify({-->
<!--            message: 'Training has been Updated.',-->
<!--            color: 'blue'-->
<!--          });-->
<!--          this.getTraining();-->
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

<!--    SaveUpdateTree() {-->
<!--      const data = {-->
<!--        title: this.title,-->
<!--        subtitle: this.knowledge_type_model-->
<!--      };-->
<!--      trainingUpdate(this.id, data).then(response => {-->
<!--        this.$q.notify({-->
<!--          message: 'Knowledge Map Updated.',-->
<!--          color: 'blue'-->
<!--        });-->
<!--        this.getTree();-->
<!--      });-->
<!--    },-->
<!--    DeleteTraining() {-->
<!--      trainingDelete(this.training_id).then(response => {-->
<!--        this.$q.notify({-->
<!--          message: 'Trainings has been ended.',-->
<!--          color: 'blue'-->
<!--        });-->
<!--        this.getTraining();-->
<!--      });-->
<!--    },-->
<!--    handleUpload(files, content_type) {-->
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
<!--              detail_files.push({ file: response });-->
<!--              if (files.length === i + 1) {-->
<!--                this.uploaded_files = false;-->
<!--                this.$refs.uploader.reset();-->
<!--                this.finish_files = [...this.finish_files, ...detail_files];-->
<!--              }-->
<!--            }-->
<!--          })-->
<!--          .catch(error => {-->
<!--            console.log(error.response);-->
<!--          });-->
<!--      });-->
<!--    },-->
<!--    eachHandleUpload(item, index, files, content_type) {-->
<!--      this.$set(item, 'uploaded_files', true);-->
<!--      const config = {-->
<!--        headers: {-->
<!--          'content-type': 'multipart/form-data'-->
<!--        }-->
<!--      };-->
<!--      files.forEach((v, i, a) => {-->
<!--        const formData = new FormData();-->
<!--        formData.append('file[]', files[i]);-->
<!--        formData.append('filename_type', item.name);-->
<!--        axios.post('./api/api/file', formData, config).then(res => {-->
<!--          const response = res.data.data[0];-->

<!--          if (res.data.message === 'OK') {-->
<!--            this.$set(item, 'uploaded_files', false);-->
<!--            this.list_attachments[index].finish_files.push({ file: response });-->
<!--            this.$refs['each-uploader'][index].reset();-->
<!--          }-->
<!--        });-->
<!--      });-->
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
<!--              detail_files.push({ file: response });-->
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
<!--    },-->
<!--    handleDelete(id, type, index) {-->
<!--      let msg = '';-->
<!--      switch (type) {-->
<!--        case 'file':-->
<!--          msg = 'Are you sure want to delete this File?';-->
<!--          break;-->
<!--        default:-->
<!--          msg = 'Are you sure want to delete this Document?';-->
<!--      }-->
<!--      this.$q-->
<!--        .dialog({-->
<!--          title: 'Confirm',-->
<!--          message: msg,-->
<!--          cancel: true,-->
<!--          persistent: true-->
<!--        })-->
<!--        .onOk(() => {-->
<!--          if (type === 'file') {-->
<!--            fileDelete(id).then(response => {-->
<!--              if (response.message === 'OK') {-->
<!--                Notify.create({-->
<!--                  message: 'Delete file berhasil.',-->
<!--                  timeout: 1000,-->
<!--                  type: 'positive',-->
<!--                  color: 'positive',-->
<!--                  icon: 'check'-->
<!--                });-->
<!--                this.finish_files.splice(index, 1);-->
<!--              }-->
<!--            });-->
<!--          }-->
<!--        })-->
<!--        .onCancel(() => {-->
<!--          console.log('>>>> Cancel');-->
<!--        })-->
<!--        .onDismiss(() => {-->
<!--          console.log('I am triggered on both OK and Cancel');-->
<!--        });-->
<!--    },-->
<!--    eachHandleDelete(item, subItem, index, type) {-->
<!--      let msg = 'Are you sure want to delete this File?';-->
<!--      if (type === 'delete_all') msg = 'Are you sure want to delete all File?';-->

<!--      this.$q.dialog({-->
<!--        title: 'Confirm',-->
<!--        message: msg,-->
<!--        cancel: true,-->
<!--        persistent: true-->
<!--      }).onOk(() => {-->
<!--        if (type === 'delete_all') {-->
<!--          this.list_attachments.splice(index, 1);-->
<!--          this.$set(item, 'finish_files', []);-->
<!--        } else {-->
<!--          fileDelete(subItem.file.id).then(response => {-->
<!--            if (response.message === 'OK') {-->
<!--              Notify.create({-->
<!--                message: 'Delete file berhasil.',-->
<!--                timeout: 1000,-->
<!--                type: 'positive',-->
<!--                color: 'positive',-->
<!--                icon: 'check'-->
<!--              });-->
<!--              item.finish_files.splice(index, 1);-->
<!--            }-->
<!--          });-->
<!--        }-->
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
<!--        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()-->
<!--      };-->
<!--    },-->
<!--    addNewAttachment() {-->
<!--      const isExists = this.list_attachments.filter(item => item.name === this.attachment_name).length > 0;-->
<!--      if (isExists) {-->
<!--        this.$q.notify({-->
<!--          message: 'Attachment name already exists',-->
<!--          color: 'red'-->
<!--        });-->
<!--      } else {-->
<!--        this.list_attachments.push({ name: this.attachment_name, finish_files: [] });-->
<!--        this.attachment_name = null;-->
<!--        this.modal_add_attachment = false;-->
<!--      }-->
<!--    },-->
<!--    addNewNarasumber() {-->
<!--      const { name, email, phone } = this.narasumber_create;-->

<!--      expertiseCreate({-->
<!--        name,-->
<!--        email,-->
<!--        phone,-->
<!--        enabled: true-->
<!--      }).then(response => {-->
<!--        this.modal_add_narasumber = false;-->
<!--        this.narasumber_create = {-->
<!--          name: '',-->
<!--          email: '',-->
<!--          phone: '',-->
<!--          enabled: 'active'-->
<!--        };-->
<!--        this.$q.notify({-->
<!--          message: 'Narasumber has been added',-->
<!--          color: 'blue'-->
<!--        });-->
<!--      });-->
<!--    },-->
<!--    addNarasumber() {-->
<!--      this.narasumber_list.push({-->
<!--        users_id: this.narasumber_person_id.id,-->
<!--        name: this.narasumber_person_id.name,-->
<!--        roles: this.narasumber_roles-->
<!--      });-->
<!--      this.narasumber_person_id = null;-->
<!--      this.narasumber_roles = null;-->
<!--      this.persons_option = [];-->
<!--    },-->
<!--    addPIC() {-->
<!--      this.narasumber_list_pic.push({-->
<!--        users_id: this.narasumber_person_pic_id.id,-->
<!--        name: this.narasumber_person_pic_id.name,-->
<!--        roles: 'PIC'-->
<!--      });-->
<!--      this.narasumber_person_pic_id = null;-->
<!--      this.persons_pic_option = [];-->
<!--    },-->
<!--    deleteNarasumber(index) {-->
<!--      this.narasumber_list.splice(index, 1);-->
<!--    },-->
<!--    deletePIC(index) {-->
<!--      this.narasumber_list_pic.splice(index, 1);-->
<!--    },-->
<!--    addInvitation() {-->
<!--      if (this.invitation_person_id === null) {-->
<!--        Notify.create({-->
<!--          message: 'Klik menggunakan cursor terlebih dahulu, baru enter!',-->
<!--          timeout: 3000,-->
<!--          type: 'positive',-->
<!--          color: 'warning',-->
<!--          icon: 'check'-->
<!--        });-->
<!--        return;-->
<!--      }-->
<!--      this.invitation_person_id.map(item => {-->
<!--        if (item.roles === 'Direktorat') {-->
<!--          this.list_person = [];-->
<!--          this.modal_list_person = true;-->
<!--          this.getChannelMemberPerson();-->
<!--        } else {-->
<!--          this.invitation_list.push({ users_id: item.id, organization_id: null, name: item.name, roles: item.roles });-->
<!--          this.addInvitationFromCheckbox();-->
<!--        }-->
<!--        return true;-->
<!--      });-->
<!--      this.invitation_person_id = null;-->
<!--    },-->
<!--    addInvitationFromCheckbox() {-->
<!--      const newArr = [...this.invitation_list, ...this.selected_person];-->
<!--      this.invitation_list = [...new Map(newArr.map(v => [v.users_id, v])).values()];-->
<!--      this.selected_person = [];-->
<!--      this.modal_list_person = false;-->
<!--    },-->
<!--    getChannelMemberPerson() {-->
<!--      channelMemberPerson(this.invitation_person_id.channel_id).then(-->
<!--        response => {-->
<!--          const hasil = response.data;-->
<!--          this.list_person = hasil.map(item => {-->
<!--            return {-->
<!--              users_id: item.user.id,-->
<!--              organization_id: null,-->
<!--              name: item.user.name,-->
<!--              roles: 'person'-->
<!--            };-->
<!--          });-->
<!--        }-->
<!--      );-->
<!--    },-->

<!--    deleteInvitation(index) {-->
<!--      this.invitation_list.splice(index, 1);-->
<!--    },-->
<!--    filterPersons(val, update, abort) {-->
<!--      if (val.length < 2) {-->
<!--        abort();-->
<!--        return;-->
<!--      }-->
<!--      update(() => {-->
<!--        SearchDataAutocomplete({-->
<!--          includes: this.narasumber_roles === 'Internal' ? 'user' : 'expertise',-->
<!--          keyword: val.toLowerCase()-->
<!--        }).then(response => {-->
<!--          const hasil = response.data;-->
<!--          this.persons_option = hasil.map(item => {-->
<!--            if (this.narasumber_roles === 'Internal') {-->
<!--              return {-->
<!--                id: item.user.id,-->
<!--                name: item.user.name-->
<!--              };-->
<!--            }-->
<!--            if (this.narasumber_roles === 'External') {-->
<!--              return {-->
<!--                id: item.expertise.id,-->
<!--                name: item.expertise.name-->
<!--              };-->
<!--            }-->
<!--            return {};-->
<!--          });-->
<!--        });-->
<!--      });-->
<!--    },-->
<!--    filterPersonsPic(val, update, abort) {-->
<!--      if (val.length < 2) {-->
<!--        abort();-->
<!--        return;-->
<!--      }-->
<!--      update(() => {-->
<!--        SearchDataAutocomplete({-->
<!--          includes: 'user,expertise',-->
<!--          keyword: val.toLowerCase()-->
<!--        }).then(response => {-->
<!--          const hasil = response.data;-->
<!--          this.persons_pic_option = hasil.map(item => {-->
<!--            if (item.user) {-->
<!--              return {-->
<!--                id: item.user.id,-->
<!--                name: item.user.name-->
<!--              };-->
<!--            }-->
<!--            if (item.expertise) {-->
<!--              return {-->
<!--                id: item.expertise.id,-->
<!--                name: item.expertise.name-->
<!--              };-->
<!--            }-->
<!--            return {};-->
<!--          });-->
<!--        });-->
<!--      });-->
<!--    },-->
<!--    filterPersonsDirektorat (val, update) {-->
<!--      if (val === '') {-->
<!--        update(() => {-->
<!--          this.persons_direktorat_option_filter = this.persons_direktorat_option;-->
<!--        });-->
<!--        return;-->
<!--      }-->
<!--      update(() => {-->
<!--        const needle = val.toLowerCase();-->
<!--        const hasil = this.persons_direktorat_option.filter(v => v.name.toLowerCase().indexOf(needle) > -1);-->
<!--        this.persons_direktorat_option_filter = hasil;-->
<!--      });-->
<!--    },-->
<!--    addOrganizationIds(type, id) {-->
<!--      this.persons_direktorat_option = [];-->
<!--      this.invitation_person_id = null;-->

<!--      if (type === 'direktorat') {-->
<!--        this.jabatan_id = null;-->
<!--        this.pangkat_id = null;-->
<!--        this.jabatan_options = [];-->
<!--        this.pangkat_options = [];-->
<!--      } else if (type === 'jabatan') {-->
<!--        this.pangkat_id = null;-->
<!--        this.pangkat_options = [];-->
<!--      }-->

<!--      organizationUsers({-->
<!--        direktorat_id: this.direktorat_id,-->
<!--        ...(this.jabatan_id !== null && { jabatan_id: Object.keys(this.jabatan_id).length > 0 ? this.jabatan_id.id : this.jabatan_id }),-->
<!--        ...(this.pangkat_id !== null && { pangkat_id: Object.keys(this.pangkat_id).length > 0 ? this.pangkat_id.id : this.pangkat_id })-->
<!--      })-->
<!--        .then(response => {-->
<!--          const hasil = response.data.items;-->
<!--          this.persons_direktorat_option = hasil.map(item => ({-->
<!--            id: item.id,-->
<!--            name: item.name,-->
<!--            roles: 'Person'-->
<!--          }));-->
<!--          this.getOrganizationList(type, id);-->
<!--        });-->
<!--    },-->
<!--    getOrganizationList(type, id) {-->
<!--      organizationList({ parent: id, limit: 1000 })-->
<!--        .then(res => {-->
<!--          const response = res.data;-->
<!--          if (type === 'direktorat') {-->
<!--            this.jabatan_options = response.map(v => (-->
<!--              { id: v.id, name: v.name }-->
<!--            ));-->
<!--          }-->
<!--          if (type === 'jabatan') {-->
<!--            this.pangkat_options = response.map(v => (-->
<!--              { id: v.id, name: v.name }-->
<!--            ));-->
<!--          }-->
<!--        });-->
<!--    },-->
<!--    AddCustomDate() {-->
<!--      this.schedule_custom_repeat++;-->
<!--      this.schedule_custom_array = Array.from(-->
<!--        Array(this.schedule_custom_repeat).keys()-->
<!--      );-->
<!--    },-->
<!--    DeleteCustomDate(index) {-->
<!--      this.schedule_custom_repeat&#45;&#45;;-->
<!--      this.schedule_custom_array.splice(index, 1);-->
<!--      this.start_date_custom.splice(index, 1);-->
<!--      this.start_time_custom.splice(index, 1);-->
<!--      this.end_time_custom.splice(index, 1);-->
<!--    },-->
<!--    filterOrganizer(val, update, abort) {-->
<!--      if (val === '') {-->
<!--        update(() => {-->
<!--          this.organization_options_filter = this.organization_options;-->
<!--        });-->
<!--        return;-->
<!--      }-->
<!--      update(() => {-->
<!--        const needle = val.toLowerCase();-->
<!--        const hasil = this.organization_options.filter(-->
<!--          v => v.name.toLowerCase().indexOf(needle) > -1-->
<!--        );-->
<!--        this.organization_options_filter = hasil;-->
<!--      });-->
<!--    },-->
<!--    filterDirektorat(val, update) {-->
<!--      if (val === '') {-->
<!--        update(() => {-->
<!--          this.direktorat_options_filter = this.direktorat_options;-->
<!--        });-->
<!--        return;-->
<!--      }-->
<!--      update(() => {-->
<!--        const needle = val.toLowerCase();-->
<!--        const hasil = this.direktorat_options.filter(-->
<!--          v => v.name.toLowerCase().indexOf(needle) > -1-->
<!--        );-->
<!--        this.direktorat_options_filter = hasil;-->
<!--      });-->
<!--    },-->
<!--    filterJabatan(val, update) {-->
<!--      if (val === '') {-->
<!--        update(() => {-->
<!--          this.jabatan_options_filter = this.jabatan_options;-->
<!--        });-->
<!--        return;-->
<!--      }-->
<!--      update(() => {-->
<!--        const needle = val.toLowerCase();-->
<!--        const hasil = this.jabatan_options.filter(-->
<!--          v => v.name.toLowerCase().indexOf(needle) > -1-->
<!--        );-->
<!--        this.jabatan_options_filter = hasil;-->
<!--      });-->
<!--    },-->
<!--    filterPangkatGolongan(val, update) {-->
<!--      if (val === '') {-->
<!--        update(() => {-->
<!--          this.pangkat_options_filter = this.pangkat_options;-->
<!--        });-->
<!--        return;-->
<!--      }-->
<!--      update(() => {-->
<!--        const needle = val.toLowerCase();-->
<!--        const hasil = this.pangkat_options.filter(-->
<!--          v => v.name.toLowerCase().indexOf(needle) > -1-->
<!--        );-->
<!--        this.pangkat_options_filter = hasil;-->
<!--      });-->
<!--    },-->
<!--    filterFnDirektorat(val, update, abort) {-->
<!--      setTimeout(() => {-->
<!--        update(() => {-->
<!--          this.option_direktorat = [{ value: 'ALL KPK', label: 'ALL KPK' }];-->
<!--          if (val === '') {-->
<!--            this.option_direktorat = [-->
<!--              ...this.option_direktorat,-->
<!--              ...this.option_direktorat_0-->
<!--            ];-->
<!--          } else {-->
<!--            const needle = val.toLowerCase();-->
<!--            const filter = this.option_direktorat_0.filter(-->
<!--              v => v.label.toLowerCase().indexOf(needle) > -1-->
<!--            );-->
<!--            this.option_direktorat = [...this.option_direktorat, ...filter];-->
<!--          }-->
<!--        });-->
<!--      }, 1000);-->
<!--    },-->
<!--    filterFnJabatan(val, update, abort) {-->
<!--      setTimeout(() => {-->
<!--        update(() => {-->
<!--          if (val === '') {-->
<!--            this.option_jabatan = this.option_jabatan_0;-->
<!--          } else {-->
<!--            const needle = val.toLowerCase();-->
<!--            this.option_jabatan = this.option_jabatan_0.filter(-->
<!--              v => v.label.toLowerCase().indexOf(needle) > -1-->
<!--            );-->
<!--          }-->
<!--        });-->
<!--      }, 1000);-->
<!--    },-->
<!--    filterFnGolongan(val, update, abort) {-->
<!--      setTimeout(() => {-->
<!--        update(() => {-->
<!--          if (val === '') {-->
<!--            this.option_golongan = this.option_golongan_0;-->
<!--          } else {-->
<!--            const needle = val.toLowerCase();-->
<!--            this.option_golongan = this.option_golongan_0.filter(-->
<!--              v => v.label.toLowerCase().indexOf(needle) > -1-->
<!--            );-->
<!--          }-->
<!--        });-->
<!--      }, 1000);-->
<!--    },-->
<!--    changeDirektorat() {-->
<!--      this.option_jabatan = [];-->
<!--      this.option_golongan = [];-->
<!--      this.select_jabatan = '';-->
<!--      this.select_golongan = '';-->
<!--      if (this.select_direktorat) {-->
<!--        organizationList({-->
<!--          parent: this.select_direktorat.value,-->
<!--          limit: 100-->
<!--        }).then(res => {-->
<!--          const response = res.data;-->
<!--          this.option_jabatan_0 = response.map(v => ({-->
<!--            value: v.id,-->
<!--            label: v.name-->
<!--          }));-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    changeJabatan() {-->
<!--      this.option_golongan = [];-->
<!--      this.select_golongan = '';-->
<!--      if (this.select_jabatan) {-->
<!--        organizationList({-->
<!--          parent: this.select_jabatan.value,-->
<!--          limit: 100-->
<!--        }).then(res => {-->
<!--          const response = res.data;-->
<!--          this.option_golongan_0 = response.map(v => ({-->
<!--            value: v.id,-->
<!--            label: v.name-->
<!--          }));-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--    savePosition() {-->
<!--      this.modal_change_position = false;-->
<!--      if (-->
<!--        (this.select_direktorat !== '' || this.select_direktorat !== null) &&-->
<!--        (this.select_jabatan === '' || this.select_jabatan === null) &&-->
<!--        (this.select_golongan === '' || this.select_golongan === null)-->
<!--      ) {-->
<!--        this.training_position = this.select_direktorat.label;-->
<!--        this.sub_training_position = '';-->
<!--      } else if (-->
<!--        (this.select_direktorat !== '' || this.select_direktorat !== null) &&-->
<!--        (this.select_jabatan !== '' || this.select_jabatan !== null) &&-->
<!--        (this.select_golongan === '' || this.select_golongan === null)-->
<!--      ) {-->
<!--        this.training_position = this.select_jabatan.label;-->
<!--        this.sub_training_position = this.select_direktorat.label;-->
<!--      } else if (-->
<!--        (this.select_direktorat !== '' || this.select_direktorat !== null) &&-->
<!--        (this.select_jabatan !== '' || this.select_jabatan !== null) &&-->
<!--        (this.select_golongan !== '' || this.select_golongan !== null)-->
<!--      ) {-->
<!--        this.training_position = this.select_jabatan.label;-->
<!--        this.sub_training_position = `${this.select_golongan.label} • ${this.select_direktorat.label}`;-->
<!--      }-->

<!--      this.handleFilter(true);-->
<!--    },-->
<!--    parseDate(date, format = 'DD MMMM YYYY') {-->
<!--      return moment(new Date(date)).format(format);-->
<!--    },-->
<!--    parseTime(time) {-->
<!--      const sTime = time.split(':');-->
<!--      return `${sTime[0]}:${sTime[1]}`;-->
<!--    },-->
<!--    handleUpdateScore(type) {-->
<!--      trainingParticipantUpdate(this.training_id, {-->
<!--        type,-->
<!--        data: this.data_table_training_score-->
<!--      }).then(({ message }) => {-->
<!--        if (message === 'OK') {-->
<!--          this.$q.notify({-->
<!--            message: 'Successfull update training',-->
<!--            color: 'blue'-->
<!--          });-->
<!--          this.getTraining();-->
<!--        } else {-->
<!--          this.$q.notify({-->
<!--            message: 'Failed update training',-->
<!--            color: 'red'-->
<!--          });-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    handleFilter(fromPosition = false) {-->
<!--      let isStartDate = true;-->
<!--      let isEndDate = true;-->
<!--      if (this.start_date_filter === '' || !this.isValidDate(this.start_date_filter) || fromPosition) isStartDate = false;-->
<!--      if (this.end_date_filter === '' || !this.isValidDate(this.end_date_filter) || fromPosition) isEndDate = false;-->

<!--      this.data_table = [];-->

<!--      trainingList({-->
<!--        ...(isStartDate && { date_start: this.start_date_filter }),-->
<!--        ...(isEndDate && { date_end: this.end_date_filter }),-->
<!--        ...(!fromPosition && { search_term: this.filter }),-->
<!--        ...(fromPosition && { organization_id: this.position_value })-->
<!--      }).then(response => {-->
<!--        const hasil = response.data;-->
<!--        this.data_table = hasil.map((item, index) => ({ ...item, no: index + 1 }));-->
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
<!--    handleGetOtherSchedule(id) {-->
<!--      this.list_schedule = [];-->
<!--      this.modal_list_schedule = true;-->
<!--      trainingDetail(id).then(response => {-->
<!--        const {-->
<!--          data: { schedule }-->
<!--        } = response;-->

<!--        this.list_schedule = schedule;-->
<!--      });-->
<!--    },-->
<!--    handleStatusSchedule(row) {-->
<!--      const { schedule, recuring } = row;-->

<!--      if (recuring === 'Does not repeat') {-->
<!--        const dateStart = schedule[0].date_start;-->
<!--        const dateEnd = schedule[0].date_end;-->
<!--        return this.handleBetweenDate(dateStart, dateEnd);-->
<!--      }-->
<!--      if (recuring === 'Daily') {-->
<!--        const dateStart = schedule[0].date_start;-->
<!--        const dateEnd = schedule[schedule.length - 1].date_start;-->
<!--        return this.handleBetweenDate(dateStart, dateEnd);-->
<!--      }-->
<!--      if (recuring === 'Custom') {-->
<!--        const dateStart = schedule[0].date_start;-->
<!--        const dateEnd = schedule[schedule.length - 1].date_start;-->
<!--        return this.handleBetweenDate(dateStart, dateEnd);-->
<!--      }-->
<!--      return { text: '', color: '' };-->
<!--    },-->
<!--    handleDownloadTraining() {-->
<!--      const { rowsPerPage, page } = this.pagination;-->
<!--      window.open(-->
<!--        `./api/api/export-training?limit=${rowsPerPage}&offset=${page - 1}`-->
<!--      );-->
<!--    },-->
<!--    handleDownloadParticipant(row) {-->
<!--      window.open(`./api/api/export-participant/${row.id}`);-->
<!--    },-->
<!--    handleBetweenDate(date1, date2) {-->
<!--      const d1 = new Date(date1).getTime();-->
<!--      const d2 = new Date(date2).getTime();-->
<!--      const cd = new Date().getTime();-->

<!--      let text = '';-->
<!--      let color = '';-->

<!--      if (cd <= d1 && cd <= d2) {-->
<!--        text = 'Schedule';-->
<!--        color = 'red';-->
<!--      } else if (cd >= d1 && cd <= d2) {-->
<!--        text = 'OnGoing';-->
<!--        color = 'primary';-->
<!--      } else if (cd >= d1 && cd >= d2) {-->
<!--        text = 'Finished';-->
<!--        color = 'green';-->
<!--      }-->

<!--      return { text, color };-->
<!--    },-->
<!--    detailNotificationClick(trainingId) {-->
<!--      this.isLoadingDetail = true;-->
<!--      trainingDetail(trainingId).then(response => {-->
<!--        this.training_id = response.data.id;-->
<!--        this.isLoadingDetail = false;-->
<!--        this.training_name = response.data.name;-->
<!--        this.training_description = response.data.description;-->
<!--        this.training_type = response.data.training_type;-->
<!--        this.training_method = response.data.training_method;-->
<!--        this.locations = response.data.locations;-->
<!--        this.status = response.data.status;-->
<!--        this.provider = response.data.provider;-->
<!--        this.all_day = response.data.all_day;-->
<!--        this.is_private = response.data.is_private;-->
<!--        this.maximun_capacity = response.data.maximun_capacity;-->
<!--        this.recuring = response.data.recuring;-->
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

<!--        const dateStart = response.data.schedule[0].date_start;-->
<!--        if (response.data.schedule.length > 1) {-->
<!--          const dateEnd =-->
<!--            response.data.schedule[response.data.schedule.length - 1]-->
<!--              .date_start;-->
<!--          this.training_date = `${dateStart} - ${dateEnd}`;-->
<!--        } else {-->
<!--          this.training_date = dateStart;-->
<!--        }-->
<!--      });-->
<!--      this.list_participant_pending = [];-->
<!--      trainingParticipantGetOtherByType(trainingId, {-->
<!--        participant_type: 'pending'-->
<!--      }).then(response => {-->
<!--        const { data } = response;-->

<!--        this.list_participant_pending = data;-->
<!--      });-->
<!--      this.modal_detail_training = true;-->

<!--      this.updateTrainingId(null);-->
<!--    },-->
<!--    isValidDate(date) {-->
<!--      if (date !== null) {-->
<!--        const sDate = date.split('-');-->
<!--        return !Number.isNaN(Number(sDate[0])) && !Number.isNaN(Number(sDate[1])) && !Number.isNaN(Number(sDate[2]));-->
<!--      }-->
<!--      return null;-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getTraining();-->
<!--    // this.getTree(true);-->
<!--    this.getUser();-->
<!--    this.getOrganization();-->
<!--    this.getDirektorat();-->
<!--    this.getJabatan();-->
<!--    this.getPangkatGolongan();-->
<!--    this.getTrainingSummary();-->

<!--    if (this.trainingId != null) {-->
<!--      this.detailNotificationClick(this.trainingId);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--.q-tree__node-header-content .row {-->
<!--  flex-wrap: inherit;-->
<!--}-->
<!--</style>-->
