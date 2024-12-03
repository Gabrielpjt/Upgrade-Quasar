<template>
  <div>
    <div class="q-pb-md">
      <q-card class="kmp-card-rounded q-px-md q-py-sm">
        <!-- <q-card-section class="desktop-only" v-if="is_have_access && tab_training === 'training'">
          <div class="row items-center">
            <q-icon name="business_center" class="q-mr-sm text-blue" size="24px"/>
            <div>
              <span class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md" :class="is_have_access">
              <span class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md" :class="is_have_access && 'cursor-pointer'">
                {{ position_title }}
                {{ position_organization_user.position_sub_title_jabatan }}
                <span v-if="is_have_access">
                  <q-icon name="chevron_right" size="20px"/>
                </span>
              </span>
                <br />
              <span style="position: absolute; font-size:10px; line-height: 1; margin-top:2px;" v-if="is_have_access">
              {{ position_organization_user.position_sub_title_pangkat_golongan }} <q-icon name="circle" size="4px" style="padding-bottom: 2px;" /> {{ position_organization_user.position_sub_title_unit_kerja }}
              </span>
              <span class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md" :class="is_have_access && 'cursor-pointer'">
                {{ position_title }}
                <span v-if="is_have_access">
                  <q-icon name="chevron_right" size="20px"/>
                </span>
              </span>
              <q-popup-proxy transition-show="flip-up" transition-hide="flip-down" v-if="is_have_access">
                <q-banner style="max-width: 500px; min-height: 0; padding: 0">
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
        </q-card-section> -->
        <q-card-section v-if="is_have_access">
          <div class="row items-center desktop-only">
            <q-icon id="1" name="business_center" class="q-mr-sm text-blue" size="24px"/>
            <div>
              <span @click="scroll_direktorat_filter(1)" class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md" :class="is_have_access && 'cursor-pointer'">
                {{ position_title }}
                <span v-if="is_have_access">
                  <q-icon name="chevron_right" size="20px"/>
                </span>
              </span>
              <q-popup-proxy transition-show="flip-up" transition-hide="flip-down" v-if="is_have_access">
                <q-banner style="max-width: 500px; min-height: 0; padding: 0">
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
                  <!-- :always-open="always_open" -->
                  <!-- :disable-branch-nodes="true" -->
                </q-banner>
              </q-popup-proxy>
            </div>
          </div>
          <div class="row items-center mobile-only">
            <q-icon id="1" name="business_center" class="q-mr-sm text-blue" size="24px"/>
            <div>
              <span @click="scroll_direktorat_filter(1, 'mobile')" class="text-capitalize kmp-text-blue-2 kmp-font-bold kmp-font-md"
                    :class="is_have_access && 'cursor-pointer'"
              >
                {{ position_title }}
                <span v-if="is_have_access">
                  <q-icon name="chevron_right" size="20px"/>
                </span>
              </span>
              <!--              <q-popup-proxy transition-show="flip-up" transition-hide="flip-down" v-if="is_have_access">-->
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
              <!-- :always-open="always_open" -->
              <!-- :disable-branch-nodes="true" -->
              <!--              </q-popup-proxy>-->
            </div>
          </div>
        </q-card-section>
        <q-tabs
          v-model="tab_training"
          dense
          active-color="primary"
          align="left"
          class="kmp-cot-training kmp-training-tab"
        >
          <q-tab name="cot" no-caps label="Calendar of Training"/>
          <q-tab name="training" no-caps :label="is_have_access===true ? 'Training List' : 'My Training'"/>
        </q-tabs>
        <q-separator v-if="is_have_access" class="q-mx-sm desktop-only" />
        <q-tab-panels v-model="tab_training" animated style="background-color: #fff">
          <q-tab-panel name="cot" class="q-pa-none">
            <div class="row q-mx-sm q-mb-md q-mt-md">
              <div class="col-10 col-md-10 col-xs-11">
                <div class="row q-gutter-md">
                  <div class="col-3 col-md-3 col-xs-12">
                    <q-input
                      outlined
                      dense
                      v-model="filter_cot"
                      placeholder="Search"
                      v-on:keyup.enter="handleFilterCot(false)"
                    >
                      <template v-slot:append>
                        <q-icon name="search" class="cursor-pointer" @click="handleFilterCot(false)" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-3 col-md-3 col-xs-12">
                    <div style="border-left: 2px solid gainsboro;  height: 40px;">
                      <q-select
                        v-model="training_month_filter"
                        :options="training_month_options"
                        option-value="value"
                        option-label="label"
                        outlined
                        dense
                        style="margin-left:16px;"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div style="margin-right:16px; border-left: 2px solid gainsboro;  height: 40px;">
                      &nbsp;
                      <q-btn flat @click="modal_filter = true" style="margin-top:4px;" color="white" size="12px" text-color="blue" icon="filter_list" label="Filter" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mobile-only q-pt-md col-xs-12">

              </div>
              <div class="col col-md col-xs-12 row justify-end q-gutter-sm" v-if="is_have_access==true">
                <q-btn outline color="primary" no-caps label="Add New Training" @click="openModalTraining('add')" />
              </div>
            </div>
            <!-- search -->
            <q-inner-loading
              :showing="loading"
              label="Please wait..."
              label-class="text-teal"
              label-style="font-size: 1.1em"
            />
            <div class="row q-mx-sm q-mb-none q-mt-md kmp-cot-training-search" v-if="label_search == true">Hasil pencarian dari&nbsp;
              <span v-if="this.ket_search !== null">"{{ this.ket_search }}"&nbsp;</span>
              <span v-if="this.month_search !== ''">"{{ this.month_search }}"&nbsp;</span>
              <span v-if="this.date_search !== null">"{{ this.date_search }}"&nbsp;</span>
              <span v-if="this.training_type_search.length != 0">
                <span v-for="(element, index) in this.training_type_search" :key="index">
                  <span v-if="index != 0">&nbsp;</span>
                  <span>"{{ element }}"</span>
                </span>
              </span>
              &nbsp;
              <span v-if="this.status_search.length != 0">
                <span v-for="(element, index) in this.status_search" :key="index">
                  <span v-if="index != 0">&nbsp;</span>
                  <span v-if="element == 'open_registration'">"open registration"</span>
                  <span v-else-if="element == 'close_registration'">"close registration"</span>
                  <span v-else-if="element == 'on_going'">"on going"</span>
                  <span v-else>"{{ element }}"</span>
                </span>
              </span>
            </div>
            <div class="row q-mx-sm q-mb-md kmp-cot-training-search-sub" v-if="label_search == true">{{ this.data_cot_pagination.total_data }} data ditemukan</div>
            <q-separator class="q-mx-sm q-mb-lg"  v-if="label_search == true && this.ket_search !== null"/>
            <!-- data -->
            <div class="row q-mx-sm q-mb-md q-mt-none kmp-cot-training">
              <div
                v-for="(cot, index) in this.list_data_cot"
                :key="index"
                class="col-xs-12 col-sm-6 col-md-4 q-pa-sm"
              >
                <q-card bordered class="cursor-pointer kmp-cot-training-card" @click="handleDetail(cot.id)">
                  <div class="" style="">
                    <img v-if="cot.banner !== null" :src="cot.banner" :class="cot.gray == true ? 'kmp-cot-training-banner kmp-cot-training-banner-gray' : 'kmp-cot-training-banner'">
                    <img v-else src="../../assets/images/picture-default-training.png" :class="cot.gray == true ? 'kmp-cot-training-banner kmp-cot-training-banner-gray' : 'kmp-cot-training-banner'">
                  </div>
                  <q-card-section class="q-pt-none kmp-cot-training-card-body">
                    <div class="kmp-cot-training-provider-draft q-mt-none" v-if="cot.status.toLowerCase() == 'draft'"><q-icon name="remove_red_eye" class="q-mr-xs" size="14px"/>
                      Only you can see this post
                    </div>
                    <div class="q-mt-xs" v-if="cot.participant.length > 1 || cot.participant.length == 0">
                      <q-badge align="middle" class="kmp-cot-training-badge kmp-cot-training-badge-blue">
                        Lintas Unit
                      </q-badge>
                    </div>
                    <div v-else-if="cot.participant.length == 1 && cot.participant.length != 0" class="q-mt-xs">
                      <div
                        v-for="(item, index) in cot.participant"
                        :key="index"
                      >
                        <q-badge align="middle" class="kmp-cot-training-badge kmp-cot-training-badge-blue">
                          {{ item.name }}
                        </q-badge>
                      </div>
                    </div>
                    <div class="kmp-cot-training-name q-mt-xs">
                      {{ cot.full_name.length > 75 ? cot.name.toUpperCase() + '...' : cot.full_name.toUpperCase() }}
                    </div>
                    <!-- <div class="kmp-cot-training-provider-draft q-mt-xs" v-if="cot.provider && cot.status.toLowerCase() != 'draft'"> {{ cot.provider }}</div> -->
                    <div class="kmp-cot-training-date q-mt-xs" v-if="cot.date && cot.status.toLowerCase() != 'draft'"> {{ cot.date }}</div>
                    <!-- <div class="q-mt-xs" v-if="is_have_access == false">
                      <q-badge v-if="cot.is_invited == true || cot.is_participant == true" align="middle" class="kmp-cot-training-badge kmp-cot-training-badge-blue">
                        Invited
                      </q-badge>
                      <q-badge v-if="cot.is_invited == false && cot.is_participant == false" align="middle" class="kmp-cot-training-badge kmp-cot-training-badge-orange">
                        Need Invitation
                      </q-badge>
                    </div> -->
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <div class="row justify-between kmp-cot-training-card-footer" v-if="is_have_access == false">
                      <div class="col q-gutter-sm">
                        <q-badge v-if="cot.is_invited == true || cot.is_participant == true" align="middle" class="kmp-cot-training-badge kmp-cot-training-badge-blue">
                          Invited
                        </q-badge>
                        <q-badge v-if="cot.is_invited == false && cot.is_participant == false" align="middle" class="kmp-cot-training-badge kmp-cot-training-badge-orange">
                          Need Invitation
                        </q-badge>
                      </div>
                    </div>
                    <div class="row justify-between kmp-cot-training-card-footer">
                      <div class="col q-gutter-sm">
                        <q-badge  align="middle" v-if="cot.type" class="kmp-cot-training-badge kmp-cot-training-badge-green">
                          {{ cot.type }}
                        </q-badge>
                        <q-badge  align="middle" v-if="cot.method" class="kmp-cot-training-badge kmp-cot-training-badge-yellow">
                          {{ cot.method }}
                        </q-badge>
                      </div>
                      <div class="col-5 q-gutter-sm">
                        <div class="col row justify-end" v-if="cot.status.toLowerCase() == 'draft'">
                          <q-badge align="middle" class="kmp-cot-training-badge kmp-cot-training-badge-primary">
                            Draft
                          </q-badge>
                        </div>
                        <div class="kmp-cot-training-quota q-mt-sm" v-if="cot.status.toLowerCase() != 'draft'"> Sisa kuota {{ cot.remaining_quota }}/{{ cot.max }}</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div class="row q-mx-sm q-mb-sm q-mt-md" v-if="data_cot_pagination.total_data != 0">
              <div class="flex flex-left">
                <p style="color:grey; font-size:12px; margin: 10px 0px 10px 0px;">Per Page</p>
                &nbsp; &nbsp; &nbsp;
                <q-select
                  style="width: 70px;"
                  v-model="data_cot_pagination.rowsPerPage"
                  :options="['9', '18', '27', '36', '45', '100']"
                  outlined
                  dense
                >
                </q-select>
                &nbsp; &nbsp; &nbsp;
                <div v-if="data_cot_pagination.page !== Math.ceil(data_cot_pagination.total_data/data_cot_pagination.rowsPerPage)" style="color:grey; font-size:12px; margin: 10px;">Showing {{data_cot_pagination.rowsPerPage*data_cot_pagination.page-data_cot_pagination.rowsPerPage+1}} to {{data_cot_pagination.rowsPerPage*data_cot_pagination.page}} of {{data_cot_pagination.total_data}} entries</div>
                <div v-if="data_cot_pagination.page === Math.ceil(data_cot_pagination.total_data/data_cot_pagination.rowsPerPage)" style="color:grey; font-size:12px; margin: 10px;">Showing {{data_cot_pagination.rowsPerPage*data_cot_pagination.page-data_cot_pagination.rowsPerPage+1}} to {{data_cot_pagination.total_data}} of {{data_cot_pagination.total_data}} entries</div>
              </div>
              <q-space />
              <div class="flex flex-right pagination-training-list">
                <div v-show="data_cot_pagination.total_page > 1">
                  <q-pagination
                    v-model="data_cot_pagination.page"
                    :max="data_cot_pagination.total_page"
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
            <div class="row q-mx-sm q-mb-lg q-mt-md justify-center" style="color:grey; font-size:12px; margin: 10px;" v-if="label_search == false && data_cot_pagination.total_data == 0">Belum ada data</div>
          </q-tab-panel>
          <q-tab-panel name="training" class="q-pa-none">
            <!-- tab -->
            <div class="q-mx-sm q-mb-md q-mt-md flex justify-start" v-if="is_have_access">
              <div>
                <q-tabs
                  v-model="tab_filter"
                  dense
                  outside-arrows
                  mobile-arrows
                  class="bg-white text-black"
                >
                  <q-tab name="training" label="Training" />
                  <q-tab name="participant" label="Participant" />
                </q-tabs>
              </div>
            </div>
            <!-- filter -->
            <div class="row q-mx-sm q-mb-md q-mt-md">
              <div class="col-10 col-md-10 col-xs-11">
                <div class="row q-gutter-md">
                  <div class="col-3 col-md-3 col-xs-12">
                    <q-input
                      ref="filter"
                      outlined
                      dense
                      v-on:keyup.enter="handleFilter(false)"
                      v-model="filter"
                      :placeholder="tab_filter ===  'training' ? 'Search' : 'Nama peserta'"
                    >
                      <template v-slot:append>
                        <q-icon name="search" @click="handleFilter(false)" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col">
                    <div style="margin-right:16px; border-left: 2px solid gainsboro;  height: 40px;">
                      &nbsp;
                      <q-btn flat @click="modal_filter = true" style="margin-top:4px;" color="white" size="12px" text-color="blue" icon="filter_list" label="Filter" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mobile-only q-pt-md col-xs-12">

              </div>
              <div class="col col-md col-xs-12 row justify-end q-gutter-sm" v-if="is_have_access==true">
                <q-btn outline color="primary" no-caps label="Add New Training" @click="openModalTraining('add')" />
              </div>
            </div>
            <!-- search -->
            <div class="row q-mx-sm q-mb-none q-mt-md kmp-cot-training-search" v-if="label_search == true">Hasil pencarian dari&nbsp;
              <span v-if="this.ket_search !== null">"{{ this.ket_search }}"&nbsp;</span>
              <span v-if="this.date_search !== null">"{{ this.date_search }}"&nbsp;</span>
              <span v-if="this.training_type_search.length != 0">
              <span v-for="(element, index) in this.training_type_search" :key="index">
                <span v-if="index != 0">&nbsp;</span>
                <span>"{{ element }}"</span>
              </span>
            </span>
              &nbsp;
              <span v-if="this.status_search.length != 0">
              <span v-for="(element, index) in this.status_search" :key="index">
                <span v-if="index != 0">&nbsp;</span>
                <span v-if="element == 'open_registration'">"open registration"</span>
                <span v-else-if="element == 'close_registration'">"close registration"</span>
                <span v-else-if="element == 'on_going'">"on going"</span>
                <span v-else>"{{ element }}"</span>
              </span>
            </span>
            </div>
            <div class="row q-mx-sm q-mb-md kmp-cot-training-search-sub" v-if="label_search == true">{{ this.data_table_pagination.rowsNumber }} data ditemukan</div>
            <q-separator class="q-mx-sm q-mb-lg"  v-if="label_search == true && this.ket_search !== null"/>
            <!-- table -->
            <div class="row q-mx-sm q-mb-md q-mt-md">
              <div class="col-12">
                <q-table
                  flat
                  bordered
                  class="kmp-border-color-1 kmp-rounded-1"
                  v-model="data_table_pagination"
                  :columns="columns_table"
                  :data="data_table"
                  :separator="separator"
                  v-model:pagination="data_table_pagination"
                  :loading="data_table_loading"
                  :rows-per-page-options="[5, 10, 15, 20, 25, 50, 100]"
                  @request="onRequestGetTraining"
                  row-key="name"
                >
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" />rows-per-page-options
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <!-- <q-td>
                        <q-checkbox v-model="props.selected" :props="props"/>
                      </q-td> -->
                      <q-td key="no" :props="props" class="table-training"> {{ props.row.no }}. </q-td>
                      <q-td key="name" class="text-left table-training" :props="props">
                        <!-- <a
                          href="training/#"
                          @click="openModalTraining('detail', props.row)"
                          class="text-blue"
                          style="text-decoration:none"
                          >{{ props.row.name }}</a
                        > -->
                        <a
                          @click="handleDetail(props.row.id)"
                          class="text-blue cursor-pointer"
                          style="text-decoration:none"
                        >{{ props.row.name.toUpperCase() }}</a
                        >
                      </q-td>
                      <q-td key="training_type" class="table-training" :props="props">
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
                      <q-td key="status" class="table-training" :props="props">
                        <div v-if="is_have_access==true">
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
                            <q-badge outline color="blue" style="padding:5px; border: 0.5px solid currentColor; background-color:#E6F4FF;" class="q-ma-sm text-bold"
                            >Close Registration</q-badge
                            >
                          </span>
                            <span v-else>
                            <q-badge outline color="red" style="padding:5px; border: 0.5px solid currentColor; background-color:#FFECF0;" class="q-ma-sm text-bold">End</q-badge>
                          </span>
                          </div>
                          <span v-else>-</span>
                        </div>
                        <div v-else>
                          <div v-if="props.row.status.toLowerCase() == 'closed'">
                          <span>
                            <q-badge outline color="red" style="padding:5px; border: 0.5px solid currentColor; background-color:#FFECF0;" class="q-ma-sm text-bold"
                            >End</q-badge
                            >
                          </span>
                          </div>
                          <div v-else-if="props.row.ongoing == true">
                          <span>
                            <q-badge style="padding:5px; border: 0.5px solid currentColor;" color="pink-1" :style="{ fontSize: '8px', color:'#d81b60' }" class="q-ma-sm text-bold">
                              On Going
                            </q-badge>
                          </span>
                          </div>
                          <div v-else>
                          <span v-if="props.row.participant_type == 'pending'">
                            <q-badge outline color="orange" style="padding:5px; border: 0.5px solid currentColor; background-color:#FFF7EC;" class="q-ma-sm text-bold"
                            >Waiting for Approval</q-badge
                            >
                          </span>
                            <span v-if="props.row.participant_type == 'registered' && props.row.registration_type === 'personal'">
                            <q-badge outline color="light-green-13" style="padding:5px; border: 0.5px solid currentColor; background-color:#EFFFEA;" class="q-ma-sm text-bold"
                            >Registered</q-badge
                            >
                          </span>
                            <span v-if="props.row.participant_type == 'registered' && props.row.registration_type === 'admin'">
                            <q-badge outline color="light-green-13" style="padding:5px; border: 0.5px solid currentColor; background-color:#EFFFEA;" class="q-ma-sm text-bold"
                            >Registered by Admin</q-badge
                            >
                          </span>
                            <span v-if="props.row.participant_type == 'declined'">
                            <q-badge outline color="red" style="padding:5px; border: 0.5px solid currentColor; background-color:#FFECF0;" class="q-ma-sm text-bold"
                            >Declined</q-badge
                            >
                          </span>
                            <span v-if="props.row.participant_type == 'cancel'">
                            <q-badge outline color="red" style="padding:5px; border: 0.5px solid currentColor; background-color:#FFECF0;" class="q-ma-sm text-bold"
                            >Cancel</q-badge
                            >
                          </span>
                          </div>
                        </div>
                      </q-td>
                      <q-td key="date" class="table-training" :props="props">
                        <div
                          class="cursor-pointer"
                          v-if="props.row.schedule.length > 1"
                          @click="handleGetOtherSchedule(props.row.id)"
                        >
                          {{
                            parseDate(
                              props.row.schedule[0].date_start,
                              'DD MMM '
                            )
                          }}-
                          {{
                            parseDate(
                              props.row.schedule[props.row.schedule.length-1].date_start,
                              ' DD MMM YYYY'
                            )
                          }}
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
                      <q-td key="expertise" class="table-training" :props="props">
                      <span
                        v-for="(item, index) in props.row.expertise"
                        :key="index"
                      >
                        <span v-if="item.expert_type == 'PIC'">
                          {{
                            item.expert_name.toUpperCase()
                          }}
                          <template v-if="index !== props.row.expertise.length - 1">,</template>
                        </span>
                      </span>
                      </q-td>
                      <!-- <q-td key="status" :props="props">
                        {{ handleStatusSchedule(props.row) }}
                      </q-td> -->
                      <q-td key="action" :props="props">
                        <div>
                          <!-- <q-spinner
                              v-if="isLoadingButtonAction==true"
                            color="primary"
                            size="3em"
                          /> -->
                          <div v-if="props.row.participant.length > 0">
                            <div v-if="props.row.participant_type == 'registered'">
                              <q-btn class="action-button-training" :disable="props.row.is_done == true" :color="props.row.is_done == true ? 'grey' : 'red'" label="Feedback" no-caps v-if="is_have_access!=true && props.row.status.toLowerCase() == 'closed'" @click="openModalTraining('feedback', props.row)" />
                            </div>
                          </div>
                          <q-btn-dropdown color="primary" icon="settings" size="sm" v-if="is_have_access==true">
                            <q-list class="action-button-training">
                              <q-item
                                clickable
                                v-close-popup
                                @click="openModalTraining('edit', props.row)"
                              >
                                <q-item-section>
                                  <q-item-label>Edit Training</q-item-label>
                                </q-item-section>
                              </q-item>
                              <!-- <q-item
                                clickable
                                v-close-popup
                                @click="handleDownloadParticipant(props.row)"
                              >
                                <q-item-section>
                                  <q-item-label>Download Participant</q-item-label>
                                </q-item-section>
                              </q-item> -->
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
                                @click="handleUpdateStatus(props.row, 'edit_open')"
                              >
                                <q-item-section>
                                  <q-item-label>Open for Registration</q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-item
                                clickable
                                v-close-popup
                                @click="handleUpdateStatus(props.row, 'edit_close')"
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
                                @click="handleUpdateStatus(props.row, 'end_training')"
                              >
                                <q-item-section>
                                  <q-item-label>End Training</q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-item
                                clickable
                                v-close-popup
                                @click="
                                openModalTraining('delete_training', props.row)
                              "
                              >
                                <q-item-section>
                                  <q-item-label>Delete Training</q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-item
                                clickable
                                v-close-popup
                                @click="openModalTraining('duplicate', props.row)"
                              >
                                <q-item-section>
                                  <q-item-label>Duplicate Training</q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-item
                                clickable
                                v-close-popup
                                @click="openModalCertificates(props.row)"
                              >
                                <q-item-section>
                                  <q-item-label>Certificates</q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-btn-dropdown>
                        </div>
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

                    <div class="pagination-training-list q-pa-lg flex flex-right">
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
        </q-tab-panels>
      </q-card>
    </div>
    <fixed-modal
      :show="modal_add_training"
      :title="`${training_modal_title} Training`"
      width="560vw"
      @on-close="modal_add_training = false"
    >

      <q-card-section class="q-pt-none">
        <div class="text-neutral">Data eLearning</div>
        <q-select
          v-model="elearning_id"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          @filter="filterElearning"
          @input="showLearningName()"
          :options="elearning_option"
          :option-value="'id'"
          :option-label="'name'"
          name="elearning_option"
          dense
          outlined
          autofocus
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
        <div class="text-neutral">Training Name <sup class="text-red">*</sup></div>
        <q-input dense v-model="training_name" outlined  />
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
        <div class="text-title">Banner Training</div>
        <q-img v-show="banner_training" :src="banner_training" height="" style="border: 1px solid #bdbdbd; border-radius: 5px;">
          <q-btn push round dense icon="delete" color="white" text-color="negative" size="md" class="absolute"
                 style="top: 8px; right: 8px" @click="handleDelBanner()"
          />
        </q-img>
        <q-img v-show="!banner_training" src="../../assets/images/upload.png" class="cursor-pointer"  @click="mediaVisible = true"/>
        <Media v-model="mediaVisible" use-tab="media" @select="onMediaSelect" />

        <div class="row text-grey" style="font-size:12px;">
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
      <q-separator />
      <q-card-section class="q-pt-md">
        <div class="text-title text-bold">Training Time</div>
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
              <div :class="!all_day ? 'col-12 col-sm-6 q-pr-md' : 'col-11'">
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
              <div :class="!all_day ? 'col-12 col-sm-6' : 'col-1'">
                <div class="row">
                  <div class="col-5 q-pr-xs" v-if="!all_day">
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
                  <div class="col-1 text-center text-neutral q-pt-lg" v-if="!all_day">To</div>
                  <div class="col-5 q-pl-xs" v-if="!all_day">
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
                  <div :class="!all_day ? 'col-1 text-center text-neutral q-pt-lg' : 'col-12 text-center text-neutral q-pt-lg'">
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
        <div class="text-title text-bold">Narasumber</div>
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
                  size="sm"
                  icon="close"
                  @click="deleteTopic(topic.topic_narasumber, narasumber.users_id)"
                />
              </div>
            </div>
            <div class="row q-mb-xs">
              <div class="col-12 col-sm-6 q-py-xs q-pr-xs">
                <q-select
                  label="Tanggal"
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
            <q-separator class="q-my-sm"/>
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
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-md">
        <div class="text-title text-bold">PIC <sup class="text-red">*</sup></div>
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
      <q-card-section class="q-pt-md" :class="$q.platform.is.mobile ? 'q-px-sm' : ''">
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
                  @filter="FilterPangkat"
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
                  @filter="FilterGolongan"
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
                  @filter="FilterPangkat"
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
                  @filter="FilterGolongan"
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
                <div v-if="whenUpdate">
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
        <div class="text-title q-pb-sm text-bold">Attachments</div>
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
      <q-card-section class="q-pt-md">
        <q-checkbox v-model="ket_notif_email_all" :disable="ket_notif_email == true" right-label :label="label_notif_email" color="Blue" />
        <q-checkbox v-model="ket_notif_email" v-if="whenUpdate" :disable="ket_notif_email_all == true" right-label label="Kirim notifikasi dan email kepada peserta yang baru ditambahkan" color="Blue" />
      </q-card-section>
      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary q-pa-md">
          <q-btn
            size="sm"
            class="q-mr-sm"
            outline
            unelevated
            @click="modal_add_training = false"
          >Cancel</q-btn
          >
          <div class="q-mr-sm">|</div>
          <div class="mobile-only">
            <q-btn-dropdown size="sm" color="primary" label="SAVE AS" unelevated>
              <q-list>
                <q-item v-if="!whenUpdate" clickable v-close-popup @click="saveTraining('draft')">
                  <q-item-section>
                    <q-item-label>DRAFT</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item  clickable v-close-popup @click="saveTraining('open_reg')">
                  <q-item-section>
                    <q-item-label>OPEN REGISTRATION</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="saveTraining('close_reg')">
                  <q-item-section>
                    <q-item-label>CLOSE REGISTRATION</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-if="whenUpdate" clickable v-close-popup @click="saveTraining('save')">
                  <q-item-section>
                    <q-item-label>SAVE</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="whenUpdate" clickable v-close-popup @click="saveTraining('end')">
                  <q-item-section>
                    <q-item-label>END TRAINING</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="desktop-only">
            <q-btn
              v-if="!whenUpdate"
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
            <q-btn
              size="sm"
              class="q-mr-sm publish-button"
              label="Close Registration"
              unelevated
              color="blue"
              @click="saveTraining('close_reg')"
            />
            <q-btn
              v-if="whenUpdate"
              size="sm"
              class="q-mr-sm publish-button"
              label="Save Update"
              color="primary"
              unelevated
              @click="saveTraining('save')"
            />
            <q-btn
              v-if="whenUpdate"
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
            @click="handleUpdateScore('end_table')"
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
                  {{ props.row.pretest_score}}
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
                  {{ props.row.posttest_score }}
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
    <q-dialog v-model="confirm_dialog" persistent>
      <q-card>
        <q-card-section class="text-white bg-km-blue row">
          <div class="text-h6 col">Confirmation</div>
          <q-btn
            class="col-auto q-ml-lg"
            flat
            dense
            round
            icon="close"
            v-close-popup
          />
        </q-card-section>
        <q-card-section class="row items-center">
          <q-item class="q-px-none q-mr-xs">
            <q-item-section avatar>
              <q-avatar icon="email" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Do you want to send notification and email?</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Yes" color="primary" @click="handleConfirm(true)" v-close-popup></q-btn>
          <q-btn class="" outline label="No" color="primary" @click="handleConfirm(false)" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog ref="dialog"  v-model="confirm_dialog_delete">
      <q-card>
        <q-card-section class="bg-negative text-white row">
          <div class="text-h6 col">Konfirmasi</div>
          <q-btn
            class="col-auto q-ml-lg"
            flat
            dense
            round
            icon="close"
            v-close-popup
          />
        </q-card-section>
        <q-card-section>
          <div class="q-my-md">Apakah Anda yakin akan menghapus training?</div>
          <div />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Batal" v-close-popup />
          <q-btn
            label="Hapus"
            color="negative"
            @click="handleDeleteTraining()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
          <treeselect :options="option_direktorat_employee" close-on-select :clearable="false" :normalizer="normalizer" placeholder="" v-model="employee_create.e_organization_id" @blur="$v.employee_create.e_organization_id.$touch" :error="$v.employee_create.e_organization_id.$error" />
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
      <!-- <treeselect
        v-model="direktorat_id"
        :options="direktorat_options_filter"
        close-on-select
        :clearable="false"
        :normalizer="normalizer"
        placeholder=""
        class="vue-treeselect"
        @select="direktoratTreeSelect"
      /> -->
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
                  <div class="col " v-if="tab_training === 'training'">
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
                  <div class="col" v-else>
                    <q-input placeholder="Start Date" outlined dense v-model="start_date_filter_cot">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="start_date_filter_cot"
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
                  <div class="col"  v-if="tab_training === 'training'">
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
                  <div class="col" v-else>
                    <q-input placeholder="End Date" outlined dense v-model="end_date_filter_cot">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="end_date_filter_cot"
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
                  Training Type <sup class="text-red">*</sup>
                </div>
                <q-option-group
                  v-model="modal_training_type"
                  :options="modal_options_training_type"
                  color="primary"
                  type="checkbox"
                />
              </div>
              <div class="col-6" v-if="is_member==true" style="width:300px;">
                <div class="text-subtitle3">
                  Training Status
                </div>
                <q-option-group
                  v-model="modal_status_type_member"
                  :options="modal_options_status_type_member"
                  color="primary"
                  type="checkbox"
                />
              </div>
              <div class="col-6" v-if="is_have_access==true" style="width:300px;">
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
            <q-btn v-close-popup color="primary" v-if="tab_training === 'training'" label="Save"/>
            <q-btn v-close-popup color="primary" @click="onFilterCot()" label="Save" v-else/>
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
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
    <q-dialog v-model="modal_certificates" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Certificates</div>
        </q-card-section>
        <q-card-section>
          <div class="">
            <q-btn @click="openModalCertificatesFromAclc" padding="md" class="full-width" color="blue" icon="home_work" label="Certificate from ACLC" />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="">
            <q-btn @click="openModalCertificatesPublicTraining" padding="md" class="full-width" color="blue" icon="badge" label="Certificate Public Training" />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal_certificates_public_training" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Certificates Public Training</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-neutral">
            {{ total_participant }} Participant in
            <b>{{ this.training_name }}</b>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="col q-pr-sm">
            <UploaderCertificate
              endpoint="./api/api/file/certificate/public"
              title="File certificate"
              multiple
              show-upload-failed
              show-extensions
              :allowed-extensions="['pdf']"
              :extra-params="{ 'training_id': this.training_id }"
              @upload-complete="fileInfos => handleUploadCertificateComplete(fileInfos)"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <q-table
            class="my-sticky-header-table"
            :columns="columns_table_training_certificates"
            :data="data_table_training_certificates"
            row-key="no"
            :loading="data_table_certificate_public_loading"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="no" :props="props"> {{ props.row.no }}. </q-td>
                <q-td key="participant_name" :props="props">
                  <div class="text-blue" style="text-decoration:none">
                    {{ props.row.name }}
                  </div>
                </q-td>
                <q-td key="pretest_score" class="text-blue" :props="props">
                  <div v-if="props.row.certificate==true">
                    <q-icon name="done" class="text-green" size="sm"/>
                  </div>
                  <div v-else>
                    <q-icon name="close" class="text-red" size="sm"/>
                  </div>
                </q-td>
                <q-td key="posttest_score" class="text-blue" :props="props">
                  <div v-if="props.row.certificate==true">
                    <q-btn
                      flat
                      round
                      icon="visibility"
                      class="text-blue"
                      size="sm"
                      @click="handlePreviewFileCertificate(props.row)"
                    />
                    <q-btn
                      flat
                      round
                      icon="delete"
                      class="text-red"
                      size="sm"
                      @click="deleteCertificateTrainingPublic(props.row)"
                    />
                  </div>
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
    <q-dialog v-model="modal_certificates_from_aclc" persistent>
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section>
          <q-icon
            name="close"
            size="24px"
            class="text-neutral float-right"
            v-close-popup
          />
          <div class="text-h6">Certificates From ACLC</div>
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
            :columns="columns_table_training_certificates"
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
                  {{ props.row.pretest_score}}
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
                  {{ props.row.posttest_score }}
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
          <q-btn class="" outline unelevated v-close-popup>Close</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog ref="pdfDialog">
      <q-card style="width: 75vw; max-width: 75vw">
        <q-card-section class="row">
          <div class="col justify-between">
            <span class="text-h6 text-weight-bold">Pratinjau File</span>
            <span class="q-ml-md">{{pdfFilename}}</span>
          </div>
          <div class="col-auto">
            <q-btn icon="close" v-close-popup flat round />
          </div>
        </q-card-section>
        <q-card-section style="height: 75vh; max-height: 75vh">
          <iframe
            :src="pdfFile"
            type="application/pdf"
            width="100%"
            height="100%"
            style="overflow: auto"
          ></iframe>
        </q-card-section>
        <q-card-section></q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="select_directorat" position="top">
      <q-card style="min-width: 350px;height: 380px;" class="q-py-md q-px-sm">
        <div style="border: 1.4px solid #d8d8d8; border-radius: 10px;">
          <treeselect
            v-model="position_value"
            :options="position_options"
            close-on-select
            always-open
            :clearable="false"
            :normalizer="normalizer"
            class="vue-treeselect"
            @select="positionSelect"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
// import _ from 'lodash';
import '../../css/vue-treeselect.css';
import 'vue-advanced-cropper/dist/style.css';
import { required, email } from 'vuelidate/lib/validators';
import { axios } from 'boot/axios';
import { getCredential } from 'src/lib/storage';
import { Notify } from 'quasar';
import moment from 'moment';
import readXlsxFile from 'read-excel-file';
import ListFile from 'components/common/ListFile';
import FixedModal from 'components/common/FixedModal';
import Uploader from 'components/common/Uploader';
import Media from 'components/media/Media';
import UploaderCertificate from 'components/common/UploaderCertificate';
import { Cropper, Preview } from 'vue-advanced-cropper';
import {
  trainingCreate,
  trainingDelete,
  trainingList,
  trainingUpdate,
  trainingParticipantDetail,
  trainingParticipantUpdate,
  trainingParticipantGetOtherByType,
  organizationList,
  organizationListTraining,
  organizationById,
  organizationListDeputi,
  SearchDataAutocomplete,
  fileDelete,
  trainingDetail,
  channelMemberPerson,
  organizationUsers,
  expertiseCreate,
  // exportTrainingToken,
  checkExpertise,
  // checkEmailNotif,
  trainingMethodList,
  trainingTypeList,
  trainingCategoryList,
  userGetByNIP,
  fileUpload,
  nonEmployeeCreate,
  trainingListCot,
  fileUpdate,
  expertiseTopicList,
  trainingExpertiseList,
  getTrainingParticipantCertificateCheck,
  delCertificateTrainingPublic,
  organizationListCustom, trainingElearningList
} from '../../lib/api';
import { aesEncrypt, checkRole } from '../../lib/helper';
import { point } from '../../lib/point';

const date_now = moment().format('YYYY-MM-DD');
const MONTH = moment(date_now).locale('en').format('MMMM');
const MONTH_NUMBER = 1 + moment(date_now).month();

export default {
  components: { ListFile, FixedModal, Uploader, Treeselect, Cropper, Preview, UploaderCertificate, Media },
  data() {
    return {
      // selected_training: [],
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
      always_open: true,
      string_options_topik_pelatihan: [],
      filter_options_topik_pelatihan: [],
      showText: null,
      modal_filter: false,
      status_filter_pagination: 5,
      current_page_pagination: 1,
      separator: 'cell',
      data_cot_pagination: {
        page: 1,
        rowsPerPage: 9,
        rowsNumber: 0,
        total_page: 0,
        total_data: 0
      },
      tab_filter: 'training',
      tab_training: 'cot',
      position_options: [],
      position_value: 0,
      position_title: '',
      position_organization_user: {
        position_sub_title_pangkat_golongan: '',
        position_sub_title_jabatan: '',
        position_sub_title_unit_kerja: ''
      },
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children && node.children.length ? node.children : 0
        };
      },
      methodPost: 'create',
      confirm_dialog: false,
      confirm_state: '',
      confirm_value: null,
      send: true,
      is_select_all_persons: false,
      is_have_access: false,
      is_member: false,
      modal_list_schedule: false,
      modal_add_narasumber: false,
      modal_add_employee: false,
      modal_add_attachment: false,
      list_participant: [],
      list_schedule: [],
      list_person: [],
      list_attachments: [],
      selected_person: [],
      isLoadingDetail: 1,
      training_modal_title: null,
      attachment_name: '',
      attachment_index: null,
      is_edit: false,
      is_public: false,
      training_id: null,
      training_name: '',
      training_description: '',
      training_type: '',
      training_method: '',
      training_category: '',
      training_date: '',
      locations: '',
      certificate_link: '',
      status: '',
      provider: '',
      jam_pelatihan: '',
      topik_pelatihan: [],
      organization_id: null,
      direktorat_id: null,
      jabatan_id: null,
      pangkat_id: null,
      golongan_id: null,
      all_day: false,
      employee: false,
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
      start_date_filter: moment().startOf('year').format('YYYY-MM-DD'),
      end_date_filter: moment().endOf('year').format('YYYY-MM-DD'),
      // start_date_filter_cot: moment().startOf('year').format('YYYY-MM-DD'),
      // end_date_filter_cot: moment().endOf('year').format('YYYY-MM-DD'),
      start_date_filter_cot: '',
      end_date_filter_cot: '',
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
      modal_status_type_member: [],
      modal_options_status_type_member: [
        {
          label: 'Waiting for Approval',
          value: 'pending'
        },
        {
          label: 'Registered',
          value: 'registered'
        },
        {
          label: 'Registered by Admin',
          value: 'registered by admin'
        },
        {
          label: 'Cancel',
          value: 'cancel'
        },
        {
          label: 'Declined',
          value: 'declined'
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
      start_date_custom: [],
      start_time_custom: [],
      end_time_custom: [],
      maximun_capacity: '1',
      recuring: 'Does not repeat',
      filter: '',
      filter_cot: '',
      schedule_custom_array: [],
      schedule_custom_repeat: 1,
      modal_add_training: false,
      modal_delete_training: false,
      modal_update_score_training: false,
      invitation_person_id: null,
      organization_options: [],
      direktorat_options: [],
      jabatan_options: [],
      pangkat_options: [],
      golongan_options: [],
      type_option: [],
      method_option: [],
      schedule_option: [],
      category_option: [],
      organization_options_filter: [],
      direktorat_options_filter: [],
      jabatan_options_filter: [],
      pangkat_options_filter: [],
      golongan_options_filter: [],
      finish_files: [],
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
      limit_date: '',
      tab: 'invitation',
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
      employee_create: {
        e_name: '',
        e_phone: '',
        e_email: '',
        e_organization_id: null
      },
      name_on_db: '',
      notif_name: '',
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
        initial: '',
        organization_id: ''
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
          style: 'max-width:38%; white-space: normal; text-overflow: ellipsis;',
          label: 'Training Name'
        },
        {
          name: 'training_type',
          field: 'training_type',
          align: 'center',
          style: 'max-width:10%; white-space: normal; text-overflow: ellipsis; padding: 7px 0;',
          label: 'Type'
        },
        { name: 'status', style: 'max-width:10%; white-space: normal; text-overflow: ellipsis; padding: 7px 0;', field: 'status', align: 'center', label: 'Status' },
        { name: 'date', style: 'width:120px; max-width:15%; white-space: normal; text-overflow: ellipsis;', field: 'date', align: 'center', label: 'Date' },
        { name: 'expertise', style: 'max-width:17%; white-space: normal; text-overflow: ellipsis;', field: 'expertise', align: 'center', label: 'PIC' },
        {
          name: 'action',
          field: 'action',
          align: 'center',
          label: '',
          style: 'max-width: 6%;'
        }
      ],
      data_table: [],
      data_table_loading: true,
      data_table_from_search: false,
      rowsPerPage: 10,
      page: 1,
      data_table_pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
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
      pic_list_detail: [],
      topic_list: [],
      option_direktorat_0: [],
      option_direktorat: [],
      option_jabatan_0: [],
      option_jabatan: [],
      option_golongan_0: [],
      option_golongan: [],
      select_direktorat: '',
      select_jabatan: '',
      select_golongan: '',
      training_position: 'Data Training',
      sub_training_position:
        'Penata Muda I (III B) • Direktorat Pendidikan & Pelatihan Antikoprupsi',
      total_participant: '',
      registered: 0,
      pending: 0,
      declined: 0,
      cancel: 0,
      status_declined: '',
      check_participant: 0,
      isLoadingButtonAction: false,
      invitation_list: [],
      invitation_reg_list: [],
      persons_option_filter: [],
      persons_option: [],
      persons_pic_option: [],
      persons_direktorat_option_filter: [],
      persons_direktorat_option: [],
      employee_option: [],
      whenUpdate: false,
      id_registration: '',
      registration_type: null,
      file_participant: null,
      banner: null,
      banner_training: null,
      status_filter: ['All type'],
      training_type_filter: ['All type'],
      date_now,
      ket_notif_email_all: false,
      ket_notif_email: false,
      link_online: '',
      password: '',
      confirm_dialog_delete: false,
      label_notif_email: '',
      option_direktorat_employee: null,
      list_data_cot: [],
      loading: false,
      list_participant_pending: [],
      list_participant_declined: [],
      training_month_filter: (
        {
          label: MONTH,
          value: MONTH_NUMBER
        }
      ),
      training_month_options: [
        {
          label: 'All',
          value: 0
        },
        {
          label: 'January',
          value: 1
        },
        {
          label: 'February',
          value: 2
        },
        {
          label: 'March',
          value: 3
        },
        {
          label: 'April',
          value: 4
        },
        {
          label: 'May',
          value: 5
        },
        {
          label: 'June',
          value: 6
        },
        {
          label: 'July',
          value: 7
        },
        {
          label: 'August',
          value: 8
        },
        {
          label: 'September',
          value: 9
        },
        {
          label: 'October',
          value: 10
        },
        {
          label: 'November',
          value: 11
        },
        {
          label: 'December',
          value: 12
        }
      ],
      data_cot_from_search: false,
      label_search: false,
      ket_search: '',
      month_search: '',
      date_search: null,
      status_search: ['All type'],
      training_type_search: ['All type'],
      modal_certificates: false,
      modal_certificates_from_aclc: false,
      modal_certificates_public_training: false,
      columns_table_training_certificates: [
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
          label: 'Status Certificate'
        },
        {
          name: 'posttest_score',
          field: 'posttest_score',
          align: 'center',
          label: 'Action'
        }
      ],
      data_table_training_certificates: [],
      data_table_certificate_public_loading: false,
      url: process.env.QUASAR_API_URL,
      pdfFile: null,
      pdfFilename: null,
      select_directorat: false,
      elearning_option: [],
      elearning_id: null
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
  watch: {
    // position_value(newId, oldId) {
    //   this.always_open = false;
    // },
    tab_training() {
      this.onResetFilter();
      if (this.tab_training === 'cot') {
        this.filter_cot = '';
        this.label_search = false;
        this.getTrainingCot();
      } else {
        this.filter = '';
        this.label_search = false;
        this.getTraining();
      }
    },
    modal_training_type(newId, oldId) {
      this.training_type_filter = this.modal_training_type;
    },
    modal_status_type_member(newId, oldId) {
      this.status_filter = this.modal_status_type_member;
    },
    modal_status_type_km_manager(newId, oldId) {
      this.status_filter = this.modal_status_type_km_manager;
    },
    data_table_pagination(newId, oldId) {
      if (this.is_member === true) {
        this.columns_table[3].label = 'Training Status';
      } else if (this.is_have_access === true) {
        this.columns_table[3].label = 'Training Position';
      }
    },
    rowsPerPage(newId, oldId) {
      this.data_table_pagination.rowsPerPage = this.rowsPerPage;
      this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
      if (this.data_table_from_search === true) {
        this.handleFilterNotSearch(false);
      }
    },
    page(newId, oldId) {
      this.data_table_pagination.page = this.page;
      this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
      if (this.data_table_from_search === true) {
        this.handleFilterNotSearch(false);
      }
    },
    'narasumber_create.name': {
      handler(exp_name) {
        this.notif_name = '';
        if (exp_name !== '') {
          this.getExpertiseName(exp_name);
        }
      },
      deep: true
    },
    'data_cot_pagination.page': {
      handler(page) {
        this.getTrainingCot(page, this.data_cot_pagination.rowsPerPage);
      },
      deep: true
    },
    'data_cot_pagination.rowsPerPage': {
      handler(batas) {
        this.getTrainingCot(this.data_cot_pagination.page, batas);
      },
      deep: true
    },
    training_month_filter() {
      if (this.training_month_filter.value !== 0) {
        this.start_date_filter_cot = '';
        this.end_date_filter_cot = '';
      }
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
  methods: {
    showLearningName() {
      this.training_name = `[SMART] ${this.elearning_id.name}`;
    },
    // orderedUsers(i) {
    //   const filterByText = (arr, text) => {
    //     return arr.filter(v => (
    //       !(
    //         v.user.name.toLowerCase().indexOf(text) === -1
    //       )
    //     )
    //     );
    //   };
    //   const input = this.filter;
    //   const name = filterByText(i, input.toLowerCase());
    //   const sort = name.sort((a, b) => (a.user.name.toLowerCase().indexOf(input.toLowerCase()) > b.user.name.toLowerCase().indexOf(input.toLowerCase()) ? 1 : -1)
    //   );
    //   return sort;
    // },
    scroll_direktorat_filter(id, type) {
      this.always_open = true;
      const element = document.getElementById(id); // Your target element
      const headerOffset = 166;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      if (type === 'mobile') {
        this.select_directorat = true;
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
    onResetFilter() {
      this.status_filter = null;
      this.training_type_filter = null;
      this.position_value = 0;
      this.position_title = 'ALL KPK';
      this.training_month_filter = (
        {
          label: MONTH,
          value: MONTH_NUMBER
        }
      );
      this.start_date_filter_cot = '';
      this.end_date_filter_cot = '';
      this.start_date_filter = moment().startOf('year').format('YYYY-MM-DD');
      this.end_date_filter = moment().endOf('year').format('YYYY-MM-DD');
      this.modal_training_type = [];
      this.modal_status_type_member = [];
      this.modal_status_type_km_manager = [];
    },
    filesBuilder(files) {
      return files.map(({ file }) => ({
        id: file.id,
        fileName: file.filename,
        fileSize: file.filesize,
        path: file.path
      }));
    },
    handleUploadAttachmentComplete(fileInfos, index) {
      fileInfos.map(file => file !== null && this.list_attachments[index].finish_files.push({ file }));
    },
    direktoratTreeSelect(node) {
      setTimeout(() => {
        this.addOrganizationIds('jabatan', node.id);
        this.addOrganizationIds('pangkat', node.id);
        this.addOrganizationIds('golongan', node.id);
      }, 0);
    },
    direktoratTreeSelectInv(node) {
      setTimeout(() => {
        this.addOrganizationIdsInv('jabatan', node.id);
        this.addOrganizationIds('pangkat', node.id);
      }, 0);
    },
    positionSelect(node) {
      this.position_value = node.id;
      this.position_title = node.name;
      if (this.tab_training === 'training') {
        this.handleFilter(true);
      } else {
        this.handleFilterCot(true);
      }

      this.select_directorat = false;
    },
    async openModalTraining(selected, training = null) {
      this.resetTrainingFields();
      if (selected === 'add') {
        this.methodPost = 'create';
        this.label_notif_email = 'Kirim notifikasi dan email';
        this.confirm_value = null;
        this.schedule_custom_array = Array.from(
          Array(this.schedule_custom_repeat).keys()
        );
        this.training_modal_title = 'Add New';
        this.training_name = '';
        this.training_description = '';
        this.training_type = '';
        this.training_method = '';
        this.training_category = '';
        this.locations = '';
        this.certificate_link = '';
        this.provider = '';
        this.all_day = false;
        this.is_regigstration = false;
        this.is_private = false;
        this.maximun_capacity = null;
        this.recuring = 'Does not repeat';
        this.modal_add_training = true;
        this.whenUpdate = false;
        this.getTrainingMethod();
        this.getTrainingType();
        this.getTrainingCategory();
        this.getDirektoratEmployee();
      } else if (selected === 'end_training') {
        const participant_list = await this.getParticipantRegistered(training);
        const token = aesEncrypt(JSON.stringify({ trainingId: training.id }));
        const data = {
          ket_notif_email_all: this.send,
          status: 'closed',
          participant: participant_list,
          link_fb: `${window.location.origin}/training/feedback?token=${token}`,
          link_detail: `${window.location.origin}/training/detail/${training.id}`
        };
        if (training.maximun_capacity < parseInt(participant_list.length, 10)) {
          this.$q.notify({
            message: 'Please add maximum capacity!',
            timeout: 3000,
            type: 'positive',
            color: 'warning',
            icon: 'check'
          });
          return;
        }
        this.data_table_loading = true;
        trainingUpdate(training.id, data).then(res => {
          this.data_table_loading = false;
          this.$q.notify({
            message: 'Training has been Updated.',
            color: 'blue'
          });
          this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
          this.getPoinExpertise(training, null, 'dropdown');
        });
      } else if (selected === 'update_score') {
        this.training_id = training.id;
        this.training_name = training.name;
        this.getTrainingParticipantById('update_score');
      } else if (selected === 'edit') {
        this.getTrainingMethod();
        this.getTrainingType();
        this.getTrainingCategory();
        this.getDirektoratEmployee();
        this.methodPost = 'update';
        this.training_modal_title = 'Edit';
        this.label_notif_email = 'Kirim notifikasi dan email ke semua peserta';
        this.isLoadingButtonAction = true;
        this.whenUpdate = true;
        trainingParticipantGetOtherByType(training.id, {
          participant_type: 'registered'
        }).then(response => {
          const { data } = response;

          this.list_participant = data;
        });
        trainingParticipantGetOtherByType(training.id, {
          participant_type: 'pending',
          registration_type: ''
        }).then(response => {
          const { data } = response;

          this.list_participant_pending = data;
        });
        trainingParticipantGetOtherByType(training.id, {
          participant_type: 'declined',
          registration_type: ''
        }).then(response => {
          const { data } = response;

          this.list_participant_declined = data;
        });
        trainingDetail(training.id).then(response => {
          this.status = training.status;
          this.isLoadingButtonAction = false;
          this.training_id = training.id;
          this.organization_id = training.organization_id;
          // this.direktorat_id = training.direktorat_id;
          // this.jabatan_id = training.jabatan_id;
          // this.pangkat_id = training.pangkat_id;
          this.training_name = training.name;
          this.training_description = training.description;
          this.training_type = training.training_type;
          this.training_method = training.training_method;
          this.training_category = training.training_category;
          this.locations = training.locations;
          this.certificate_link = training.certificate_link;
          this.provider = training.provider;
          this.jam_pelatihan = training.jam_pelatihan;
          if (training.topik_pelatihan[0] === '[') {
            this.topik_pelatihan = JSON.parse(training.topik_pelatihan);
          } else if (training.topik_pelatihan === null) {
            this.topik_pelatihan = [];
          } else {
            this.topik_pelatihan = [training.topik_pelatihan];
          }
          if (training.filter_options_topik_pelatihan.length > 0 && this.filter_options_topik_pelatihan.length > 0) {
            this.filter_options_topik_pelatihan = training.filter_options_topik_pelatihan;
            this.string_options_topik_pelatihan = training.filter_options_topik_pelatihan;
          }
          this.all_day = training.all_day;
          this.is_private = training.is_private;
          this.maximun_capacity = training.maximun_capacity;
          this.recuring = training.recuring;
          this.training_date = training.date;
          this.id_registration = training.id_registration;
          if (training.banner) {
            this.banner_training = `${process.env.QUASAR_API_URL}${training.banner}`;
          }
          this.banner = training.banner;
          this.link_online = training.link;
          this.password = training.password;
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
          if (training.recuring === 'Does not repeat') {
            this.start_date = `${new Date(response.data.schedule[0].date_start).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_start).getDate()).padStart(2, '0')}`;
            this.end_date = `${new Date(response.data.schedule[0].date_end).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_end).getDate()).padStart(2, '0')}`;
            this.start_time = response.data.schedule[0].time_start;
            this.end_time = response.data.schedule[0].time_end;
          } else if (training.recuring === 'Daily') {
            this.start_date = `${new Date(response.data.schedule[0].date_start).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_start).getDate()).padStart(2, '0')}`;
            this.end_date = `${new Date(response.data.schedule[0].date_end).getFullYear()}/${String(new Date(response.data.schedule[0].date_end).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_end).getDate()).padStart(2, '0')}`;
            this.start_time = response.data.schedule[0].time_start;
            this.end_time = response.data.schedule[0].time_end;
            this.ends_after_how_many_occurence = response.data.repeated;
          } else if (training.recuring === 'Custom') {
            this.schedule_custom_array = Array.from(
              Array(training.schedule.length).keys()
            );
            training.schedule.forEach((item, index) => {
              this.start_date_custom.push(item.date_start);
              this.start_time_custom.push(item.time_start);
              this.end_time_custom.push(item.time_end);
            });
          }
          this.total_participant = response.data.participant_list.length;
          this.registered = response.data.registered;
          this.pending = response.data.pending;
          this.declined = response.data.declined;
          this.check_participant = response.data.check_participant;
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
                finish_files: groupByName[item.filename_type],
                status: item.is_public
              };
            }
            return undefined;
          }).filter(item => item !== undefined);

          // if (training.direktorat_id) {
          //   organizationList({ parent: training.direktorat_id, limit: 1000 })
          //     .then(res => {
          //       const hasil = res.data;
          //       if (hasil.length > 0) {
          //         this.jabatan_options = hasil.map(v => (
          //           { id: v.id, name: v.name }
          //         ));
          //         this.jabatan_id = { id: training.jabatan_id, name: response.data.jabatan.name };
          //       }
          //     });
          // }
          // if (training.jabatan_id) {
          //   organizationList({ parent: training.jabatan_id, limit: 1000 })
          //     .then(res => {
          //       const hasil = res.data;
          //       if (hasil.length > 0) {
          //         this.pangkat_options = hasil.map(v => (
          //           { id: v.id, name: v.name }
          //         ));
          //         this.pangkat_id = { id: training.pangkat_id, name: response.data.pangkat.name };
          //       }
          //     });
          // }
          // if (training.direktorat_id || training.jabatan_id || training.pangkat_id) {
          //   organizationUsers({
          //     direktorat_id: training.direktorat_id,
          //     ...(training.jabatan_id !== null && { jabatan_id: training.jabatan_id }),
          //     ...(training.pangkat_id !== null && { pangkat_id: training.pangkat_id })
          //   })
          //     .then(res => {
          //       const { data } = res;
          //       this.persons_direktorat_option = data.map(item => ({
          //         id: item.id,
          //         name: item.name,
          //         roles: 'Person'
          //       }));
          //     });
          // }
        });
        this.isLoadingButtonAction = false;
      } else if (selected === 'position') {
        organizationList({ groups: 'Unit Kerja', limit: 100 }).then(res => {
          const response = res.data;
          this.option_direktorat_0 = response.map(v => ({
            value: v.id,
            label: v.name
          }));
        });
        this.modal_change_position = true;
      } else if (selected === 'edit_open') {
        const invitation_list = await this.getInvitation(training);
        const participant_list = await this.getParticipantRegistered(training);
        const data = {
          ket_notif_email_all: this.send,
          status: 'open_registration',
          invitation: invitation_list,
          participant: participant_list,
          link_detail: `${window.location.origin}/training/detail/${training.id}`
        };
        this.data_table_loading = true;
        trainingUpdate(training.id, data).then(res => {
          this.data_table_loading = false;
          this.$q.notify({
            message: 'Training has been Updated.',
            color: 'blue'
          });
          this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
        });
      } else if (selected === 'edit_close') {
        const invitation_list = await this.getInvitation(training);
        const participant_list = await this.getParticipantRegistered(training);
        const data = {
          ket_notif_email_all: this.send,
          status: 'close_registration',
          participant: participant_list,
          invitation: invitation_list,
          link_detail: `${window.location.origin}/training/detail/${training.id}`
        };
        this.data_table_loading = true;
        trainingUpdate(training.id, data).then(response => {
          this.data_table_loading = false;
          this.$q.notify({
            message: 'Training has been Updated.',
            color: 'blue'
          });
          this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
        });
      } else if (selected === 'feedback') {
        const token = aesEncrypt(JSON.stringify({ trainingId: training.id }));
        this.$router.push({ path: '/training/feedback', query: { token } });
      } else if (selected === 'delete_training') {
        this.confirm_dialog_delete = true;
        this.training_id = training.id;
      } else if (selected === 'duplicate') {
        this.methodPost = 'create';
        this.training_modal_title = 'Duplicate';
        this.label_notif_email = 'Kirim notifikasi dan email ke semua peserta';
        this.isLoadingButtonAction = true;
        this.whenUpdate = false;
        trainingParticipantGetOtherByType(training.id, {
          participant_type: 'registered'
        }).then(response => {
          const { data } = response;

          this.list_participant = data;
        });
        trainingDetail(training.id).then(response => {
          this.status = training.status;
          this.isLoadingButtonAction = false;
          this.training_id = training.id;
          this.organization_id = training.organization_id;
          // this.direktorat_id = training.direktorat_id;
          // this.jabatan_id = training.jabatan_id;
          // this.pangkat_id = training.pangkat_id;
          this.training_name = training.name;
          this.training_description = training.description;
          this.training_type = training.training_type;
          this.training_method = training.training_method;
          this.training_category = training.training_category;
          this.locations = training.locations;
          this.certificate_link = training.certificate_link;
          this.provider = training.provider;
          this.jam_pelatihan = training.jam_pelatihan;
          if (training.topik_pelatihan[0] === '[') {
            this.topik_pelatihan = JSON.parse(training.topik_pelatihan);
          } else if (training.topik_pelatihan === null) {
            this.topik_pelatihan = [];
          } else {
            this.topik_pelatihan = [training.topik_pelatihan];
          }
          if (training.filter_options_topik_pelatihan.length > 0 && this.filter_options_topik_pelatihan.length > 0) {
            this.filter_options_topik_pelatihan = training.filter_options_topik_pelatihan;
            this.string_options_topik_pelatihan = training.filter_options_topik_pelatihan;
          }
          this.all_day = training.all_day;
          this.is_private = training.is_private;
          this.maximun_capacity = training.maximun_capacity;
          this.recuring = training.recuring;
          this.training_date = training.date;
          this.id_registration = training.id_registration;
          this.banner = training.banner;
          if (training.banner) {
            this.banner_training = `${process.env.QUASAR_API_URL}${training.banner}`;
          }
          this.link_online = training.link;
          this.password = training.password;
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
          this.list_participant = [];
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
          if (training.recuring === 'Does not repeat') {
            this.start_date = `${new Date(response.data.schedule[0].date_start).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_start).getDate()).padStart(2, '0')}`;
            this.end_date = `${new Date(response.data.schedule[0].date_end).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_end).getDate()).padStart(2, '0')}`;
            this.start_time = response.data.schedule[0].time_start;
            this.end_time = response.data.schedule[0].time_end;
          } else if (training.recuring === 'Daily') {
            this.start_date = `${new Date(response.data.schedule[0].date_start).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_start).getDate()).padStart(2, '0')}`;
            this.end_date = `${new Date(response.data.schedule[0].date_end).getFullYear()}/${String(new Date(response.data.schedule[0].date_start).getMonth() + 1).padStart(2, '0')}/${String(new Date(response.data.schedule[0].date_end).getDate()).padStart(2, '0')}`;
            this.start_time = response.data.schedule[0].time_start;
            this.end_time = response.data.schedule[0].time_end;
            this.ends_after_how_many_occurence = response.data.repeated;
          } else if (training.recuring === 'Custom') {
            this.schedule_custom_array = Array.from(
              Array(training.schedule.length).keys()
            );
            training.schedule.forEach((item, index) => {
              this.start_date_custom.push(item.date_start);
              this.start_time_custom.push(item.time_start);
              this.end_time_custom.push(item.time_end);
            });
          }
          this.total_participant = response.data.participant_list.length;
          this.registered = response.data.registered;
          this.pending = response.data.pending;
          this.declined = response.data.declined;
          this.check_participant = response.data.check_participant;
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
                finish_files: groupByName[item.filename_type],
                status: item.is_public
              };
            }
            return undefined;
          }).filter(item => item !== undefined);

          // if (training.direktorat_id) {
          //   organizationList({ parent: training.direktorat_id, limit: 1000 })
          //     .then(res => {
          //       const hasil = res.data;
          //       if (hasil.length > 0) {
          //         this.jabatan_options = hasil.map(v => (
          //           { id: v.id, name: v.name }
          //         ));
          //         this.jabatan_id = { id: training.jabatan_id, name: response.data.jabatan.name };
          //       }
          //     });
          // }
          // if (training.jabatan_id) {
          //   organizationList({ parent: training.jabatan_id, limit: 1000 })
          //     .then(res => {
          //       const hasil = res.data;
          //       if (hasil.length > 0) {
          //         this.pangkat_options = hasil.map(v => (
          //           { id: v.id, name: v.name }
          //         ));
          //         this.pangkat_id = { id: training.pangkat_id, name: response.data.pangkat.name };
          //       }
          //     });
          // }
          // if (training.direktorat_id || training.jabatan_id || training.pangkat_id) {
          //   organizationUsers({
          //     direktorat_id: training.direktorat_id,
          //     ...(training.jabatan_id !== null && { jabatan_id: training.jabatan_id }),
          //     ...(training.pangkat_id !== null && { pangkat_id: training.pangkat_id })
          //   })
          //     .then(res => {
          //       const { data } = res;
          //       this.persons_direktorat_option = data.map(item => ({
          //         id: item.id,
          //         name: item.name,
          //         roles: 'Person'
          //       }));
          //     });
          // }
        });
        this.isLoadingButtonAction = false;
      }
    },
    resetFilter() {
      this.direktorat_id = null;
      this.jabatan_id = null;
      this.pangkat_id = null;
      this.golongan_id = null;
      this.invitation_person_id = null;
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
      this.organization_options_filter = this.organization_options;
      this.direktorat_options_filter = this.direktorat_options;
      this.jabatan_options_filter = this.jabatan_options;
      this.pangkat_options_filter = this.pangkat_options;
      this.golongan_options_filter = this.golongan_options;
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
      this.banner = null;
      this.banner_training = null;
      this.link_online = '';
      this.password = '';
      this.ket_notif_email = false;
      this.ket_notif_email_all = true;
      this.employee = false;
      this.employee_option = [];
      this.certificate_link = '';
    },
    getTrainingParticipantById(type) {
      trainingParticipantDetail(this.training_id).then(response => {
        const { data } = response;
        const filter_reg = data.participant.filter(el => el.participant_type === 'registered');
        this.total_participant = filter_reg.length;
        this.data_table_training_score = filter_reg.map(
          (item, index) => ({
            no: index + 1,
            id: item.id,
            user_id: item.employee_type === 'employee' ? item.user.id : null,
            participant_name: item.employee_type === 'employee' ? item.user.name : item.non_employee.name,
            pretest_score: item.pre_test_score,
            posttest_score: item.post_test_score,
            employee_id: item.employee_type === 'non_employee' ? item.non_employee.id : null
          })
        );

        if (type === 'update_score') {
          this.modal_update_score_training = true;
        }
        // else if (type === 'delete') {
        //   this.handleUpdateScore('end_training');
        // }
      });
    },
    onRequestGetTraining(props) {
      // const { page, rowsPerPage } = props.pagination;
      // this.getTraining(page, rowsPerPage);
      this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
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
          this.data_table_loading = false;
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
            if (this.is_have_access === true) {
              if (hasil[0]) {
                if (hasil[0].filter_options_topik_pelatihan.length > 0 && this.filter_options_topik_pelatihan.length > 0) {
                  this.filter_options_topik_pelatihan = hasil[0].filter_options_topik_pelatihan;
                  this.string_options_topik_pelatihan = hasil[0].filter_options_topik_pelatihan;
                }
              }
            }
          }
        });
    },
    getTrainingCot(page = 1, batas = 12) {
      this.loading = true;
      const offset = page;
      const limit = batas;
      if (this.start_date_filter_cot === '' && this.end_date_filter_cot === '') {
        this.start_date_filter_cot = null;
        this.end_date_filter_cot = null;
      }
      if (this.filter_cot === '') {
        this.filter_cot = null;
      }
      trainingListCot({
        offset,
        limit,
        ...({
          // tab_filter: this.tab_filter,
          date_start: this.start_date_filter_cot,
          date_end: this.end_date_filter_cot,
          search_term: this.filter_cot,
          organization_id: this.position_value,
          status_filter: this.status_filter,
          training_type_filter: this.training_type_filter,
          training_month_filter: this.training_month_filter.value
        })
      })
        .then(response => {
          this.loading = false;
          const hasil = response.data;
          if (hasil) {
            this.list_data_cot = hasil.map(item => {
              const dateStart1 = moment(item.schedule[0].date_start).format('D MMM YYYY');
              const dateStart2 = moment(item.schedule[0].date_start).format('D');
              const dateStart3 = moment(item.schedule[0].date_start).format('D MMM ');
              const dateEnd = moment(item.schedule[item.schedule.length - 1].date_start).format('D MMM YYYY');
              const monthStart = moment(item.schedule[0].date_start).format('MMM');
              const monthEnd = moment(item.schedule[item.schedule.length - 1].date_start).format('MMM');
              let date = '';
              if (item.schedule.length > 1) {
                if (monthStart === monthEnd) {
                  date = `${dateStart2} - ${dateEnd}`;
                } else {
                  date = `${dateStart3} - ${dateEnd}`;
                }
              } else {
                date = dateStart1;
              }
              const remaining_quota = item.maximun_capacity - item.participant_registered.length;
              const date_end = moment(item.schedule[item.schedule.length - 1].date_start).add(1, 'days');
              // const date_end = moment(item.schedule[item.schedule.length - 1].date_start);
              const now = moment();
              const check = moment(now).isAfter(date_end);
              const removeDuplicateDirektorat = item.participant_registered.reduce((arr, i) => {
                if (!arr.some(obj => obj.direktorat_id === i.direktorat_id)) arr.push(i);
                return arr;
              }, []);
              const dir = removeDuplicateDirektorat.map(v => {
                if (v.direktorat_id !== null && v.direktorat_id >= 32 && v.organization) {
                  return {
                    name: v.organization.name,
                    id: v.direktorat_id
                  };
                }
                return undefined;
              }).filter(v => v !== undefined);
              let gray = false;
              if (check === true) {
                gray = true;
              } else {
                gray = false;
              }
              let name = '';
              if (item.name.length < 75) {
                name = item.name;
              } else {
                name = item.name.substring(0, 75);
              }
              return {
                id: item.id,
                banner: item.banner ? process.env.QUASAR_API_URL + item.banner : null,
                provider: item.provider,
                date,
                is_invited: item.is_invited,
                is_participant: item.is_participant,
                method: item.training_type,
                type: item.training_method,
                status: item.status,
                max: item.maximun_capacity,
                remaining_quota,
                gray,
                participant: dir,
                name,
                full_name: item.name,
                id_reg: item.id_registration
              };
            });
            const { total_result } = response.meta;
            const { total_page } = response.meta;
            this.data_cot_pagination.total_data = total_result;
            this.data_cot_pagination.total_page = total_page;
            if (this.is_have_access === true) {
              if (hasil[0]) {
                if (hasil[0].filter_options_topik_pelatihan.length > 0 && this.filter_options_topik_pelatihan.length > 0) {
                  this.filter_options_topik_pelatihan = hasil[0].filter_options_topik_pelatihan;
                  this.string_options_topik_pelatihan = hasil[0].filter_options_topik_pelatihan;
                }
              }
            }
          }
        });
    },
    getOrganization() {
      organizationListDeputi({
        ...((checkRole().name === 'km_manager' || checkRole().name === 'training_manager') && { limit: 1000 })
      }).then(response => {
        const hasil = response.data;

        if (checkRole().name === 'km_manager' || checkRole().name === 'training_manager') {
          this.position_title = 'ALL KPK';
          this.position_options = [{ id: 0, name: 'ALL KPK' }, ...hasil];
        }
        if (checkRole().name !== 'km_manager' && checkRole().name !== 'training_manager') this.position_title = hasil.name;
      });
    },
    getOrganizationName() {
      const id_pangkat_golongan = this.user.organization_id;
      if (id_pangkat_golongan !== 0) {
        organizationById(id_pangkat_golongan).then(response => {
          this.position_organization_user.position_sub_title_pangkat_golongan = response.data.name;
          if (response.data.parent !== 0) {
            organizationById(response.data.parent).then(res => {
              this.position_organization_user.position_sub_title_jabatan = res.data.name;
              if (res.data.parent !== 0) {
                organizationById(res.data.parent).then(r => {
                  this.position_organization_user.position_sub_title_unit_kerja = r.data.name;
                });
              }
            });
          }
        });
      }
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
      // organizationList({ groups: 'Unit Kerja', limit: 1000 }).then(response => {
      //   const hasil = response.data;
      //   this.direktorat_options = hasil;
      //   this.direktorat_options_filter = hasil;
      //   this.option_direktorat_employee = hasil;
      // });
      const params = {};
      params.group = 'unit-kerja';
      organizationListTraining(params)
        .then(response => {
          const hasil = response.data;
          this.direktorat_options = [{ id: 0, name: 'ALL KPK' }, ...hasil];
          this.direktorat_options_filter = [{ id: 0, name: 'ALL KPK' }, ...hasil];
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
    handleConfirm(status) {
      this.send = status;
      this.openModalTraining(this.confirm_state, this.confirm_value);
    },
    // async handleModaltraining(training = null, state) {
    //   const openDialogConfirmation = await this.getCheckEmailNotif(training, state);
    //   if (openDialogConfirmation === true) {
    //     this.confirm_dialog = true;
    //     this.confirm_state = state;
    //     this.confirm_value = training;
    //   } else {
    //     this.openModalTraining(state, training);
    //   }
    // },
    handleUpdateStatus(training = null, state) {
      if (state === 'end_training') {
        expertiseTopicList(training.id).then(response => {
          const topic = response.data.length;
          if (topic === 0) {
            this.confirm_dialog = false;
            Notify.create({
              message: 'mohon isi materi narasumber sebelum end training!',
              timeout: 3000,
              type: 'positive',
              color: 'warning',
              icon: 'check'
            });
          } else {
            this.confirm_dialog = true;
            this.confirm_state = state;
            this.confirm_value = training;
          }
        });
      } else {
        this.confirm_dialog = true;
        this.confirm_state = state;
        this.confirm_value = training;
      }
    },
    getParticipantRegistered(training = null) {
      return trainingParticipantGetOtherByType(training.id, {
        participant_type: 'registered'
      }).then(response => {
        const participant_data = [];
        response.data.forEach((v, i) => {
          participant_data.push({
            users_id: v.employee_type === 'employee' ? v.user.id : null,
            organization_id: v.employee_type === 'employee' ? v.user.organization_id : v.non_employee.organization_id,
            name: v.employee_type === 'employee' ? v.user.name : v.non_employee.name,
            roles: 'Person',
            unit_kerja_id: v.direktorat_id,
            pangkat_id: v.pangkat_id,
            jabatan_id: v.jabatan_id,
            golongan_id: v.golongan_id,
            employee_id: v.employee_type === 'non_employee' ? v.non_employee.id : null,
            employee_type: v.employee_type
          });
        });
        return participant_data;
      });
    },
    // getCheckEmailNotif(training = null, state) {
    //   return checkEmailNotif(training.id, {
    //     state
    //   }).then(response => {
    //     const openDialogConfirmation = response.data;
    //     return openDialogConfirmation;
    //   });
    // },
    async getInvitation(training = null) {
      return trainingDetail(training.id).then(response => {
        const invitation_data = [];
        response.data.invitation.forEach((v, i) => {
          invitation_data.push({
            users_id: v.employee_type === 'employee' ? v.user.id : null,
            organization_id: v.employee_type === 'employee' ? v.user.organization_id : v.non_employee.organization_id,
            name: v.employee_type === 'employee' ? v.user.name : v.non_employee.name,
            roles: 'Person',
            unit_kerja_id: v.direktorat_id,
            jabatan_id: v.jabatan_id,
            pangkat_id: v.pangkat_id,
            golongan_id: v.golongan_id,
            employee_id: null,
            employee_type: 'employee'
          });
        });
        return invitation_data;
      });
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
        this.getPoinExpertise(null, this.training_id, 'modal');
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
      if (this.maximun_capacity === null || this.maximun_capacity === 0 || this.maximun_capacity < parseInt(this.total_participant, 10)) {
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
      this.modal_add_training = false;
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
        elearning_id: this.elearning_id ? this.elearning_id.id : null,
        name: this.training_name,
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
        link_detail_create: `${window.location.origin}/training/detail/`,
        banner: this.banner,
        link: this.link_online,
        password: this.password
      };
      this.data_table_loading = true;
      if (this.methodPost === 'create') {
        trainingCreate(data).then(response => {
          this.loading = false;
          this.data_table_loading = false;
          this.$q.notify({
            message: 'Training has been added.',
            color: 'blue'
          });
          if (this.tab_training === 'training') {
            this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
          } else {
            this.getTrainingCot(this.data_cot_pagination.page, this.data_cot_pagination.rowsPerPage);
          }
        });
      } else if (this.methodPost === 'update') {
        trainingUpdate(this.training_id, data).then(response => {
          this.data_table_loading = false;
          this.loading = false;
          this.$q.notify({
            message: 'Training has been Updated.',
            color: 'blue'
          });
          this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
        });
      }
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
    handleDeleteTraining() {
      this.data_table_loading = true;
      trainingDelete(this.training_id).then(response => {
        this.confirm_dialog_delete = false;
        this.data_table_loading = false;
        this.$q.notify({
          message: 'Training has been deleted.',
          color: 'blue'
        });
        this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
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
    getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      if (checkRole().name === 'member') {
        this.is_member = true;
      }
      if (checkRole().name === 'km_manager' || checkRole().name === 'training_manager') {
        this.is_have_access = true;
      }

      // TIDAK DIGUNAKAN LAGI
      // profile.roles.forEach((v, i) => {
      //   if (v.name === 'km_manager') {
      //     this.is_have_access = true;
      //   }
      // });
      // this.position_value = profile.organization_id;
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase(),
        organization_id: profile.organization_id
      };
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
          // this.$q.dialog({
          //   html: true,
          //   message: '<span class="text-center">Narasumber has been added</span>',
          //   persistent: true
          // });
          this.$q.notify({
            message: 'Narasumber has been added.',
            color: 'blue'
          });
        });
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
    deleteTopic(topic, narasumber) {
      const index = this.topic_list.findIndex(t => t.users_id === narasumber && t.topic_narasumber === topic);
      this.topic_list.splice(index, 1);
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
    deleteNarasumber(index, users_id) {
      this.topic_list = this.topic_list.filter(el => el.users_id !== users_id);
      this.narasumber_list.splice(index, 1);
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
          const isExistsParticipantDeclined = this.list_participant_declined.filter(i => (i.users_id === users_id && i.employee_type === 'employee')).length;
          const isExistsParticipantPending = this.list_participant_pending.filter(i => (i.users_id === users_id && i.employee_type === 'employee')).length;
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
    deleteParticipant(index) {
      this.invitation_reg_list.splice(index, 1);
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
    filterElearning(val, update, abort) {
      if (val.length < 3) {
        abort();
        return;
      }
      update(() => {
        trainingElearningList({
          keyword: val.toLowerCase()
        }).then(response => {
          const hasil = response.data;
          this.elearning_option = hasil.map(item => {
            if (item.id) {
              return {
                id: item.id,
                name: item.displayname.toUpperCase()
              };
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
    addOrganizationIds(type, id) {
      this.persons_direktorat_option = [];
      this.is_select_all_persons = false;
      this.invitation_person_id = null;

      if (type === 'jabatan') {
        this.jabatan_id = null;
        this.pangkat_id = null;
        this.golongan_id = null;
        this.jabatan_options = [];
        this.pangkat_options = [];
        this.golongan_options = [];
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
        ...(this.golongan_id !== null && { golongan_id: Object.keys(this.golongan_id).length > 0 ? this.golongan.id : this.golongan_id })
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
      params.jabatan_id = this.jabatan_id;
      params.golongan_id = this.golongan_id;
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
    AddCustomDate() {
      this.schedule_custom_repeat++;
      this.schedule_custom_array = Array.from(
        Array(this.schedule_custom_repeat).keys()
      );
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
    FilterPangkat(val, update) {
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
    FilterGolongan(val, update) {
      if (val === '') {
        update(() => {
          this.golongan_options_filter = this.golongan_options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        const hasil = this.golongan_options.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
        this.golongan_options_filter = hasil;
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
      this.handleFilterCot(true);
    },
    parseDate(date, format = 'DD MMMM YYYY') {
      return moment(new Date(date)).format(format);
    },
    parseDateTime(date, format = 'DD-MM-yyyy, HH:mm:ss') {
      return moment(new Date(date)).format(format);
    },
    parseTime(time) {
      const sTime = time.split(':');
      return `${sTime[0]}:${sTime[1]}`;
    },
    handleUpdateScore(type) {
      this.data_table_loading = true;
      // const token = aesEncrypt(JSON.stringify({ trainingId: this.training_id }));
      trainingParticipantUpdate(this.training_id, {
        type,
        data: this.data_table_training_score
        // send: this.send,
        // link_detail: `${window.location.origin}/training/detail/${this.training_id}`,
        // link_fb: `${window.location.origin}/training/feedback?token=${token}`
      }).then(({ message }) => {
        this.data_table_loading = false;
        if (message === 'OK') {
          this.$q.notify({
            message: 'Successfull update training.',
            color: 'blue'
          });
          this.getTraining(this.data_table_pagination.page, this.data_table_pagination.rowsPerPage);
        } else {
          this.$q.notify({
            message: 'Failed update training.',
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
        this.data_table_loading = false;
        const hasil = response.data.data;
        if (hasil) {
          this.data_table = hasil.map((item, index) => ({ ...item, no: index + limit * (offset - 1) + 1 }));
          const { current_page, total } = response.data;
          this.data_table_pagination.page = current_page;
          this.data_table_pagination.rowsNumber = total;
          this.ket_search = this.filter === '' ? null : this.filter;
          this.status_search = this.status_filter;
          this.training_type_search = this.training_type_filter;
          if (this.start_date_filter === '' && this.end_date_filter === '') {
            this.date_search = null;
          } else {
            const dateStart = moment(this.start_date_filter).format('DD MMMM YYYY');
            const dateStart1 = moment(this.start_date_filter).format('DD MMMM');
            const dateEnd = moment(this.end_date_filter).format('DD MMMM YYYY');
            const dateStartNow = moment().startOf('year').format('DD MMMM YYYY');
            const dateEndNow = moment().endOf('year').format('DD MMMM YYYY');
            const yearStart = moment(this.start_date_filter).format('YYYY');
            const yearEnd = moment(this.end_date_filter).format('YYYY');
            this.date_search = `${dateStart} - ${dateEnd}`;
            if (yearStart === yearEnd) {
              this.date_search = `${dateStart1} - ${dateEnd}`;
            }
            if (dateStart === dateStartNow && dateEnd === dateEndNow) {
              this.date_search = null;
            }
          }

          if (this.ket_search === null && this.status_search.length === 0 && this.training_type_search.length === 0 && this.date_search === null) {
            this.label_search = false;
          } else {
            this.label_search = true;
          }
        }
      });
    },
    handleFilterNotSearch(fromPosition = false) {
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
        this.data_table_loading = false;
        const hasil = response.data.data;
        if (hasil) {
          this.data_table = hasil.map((item, index) => ({ ...item, no: index + limit * (offset - 1) + 1 }));
          const { current_page, total } = response.data;
          this.data_table_pagination.page = current_page;
          this.data_table_pagination.rowsPerPage = limit;
          this.data_table_pagination.rowsNumber = total;
          this.ket_search = this.filter === '' ? null : this.filter;
          this.status_search = this.status_filter;
          this.training_type_search = this.training_type_filter;
          if (this.start_date_filter === '' && this.end_date_filter === '') {
            this.date_search = null;
          } else {
            const dateStart = moment(this.start_date_filter).format('DD MMMM YYYY');
            const dateStart1 = moment(this.start_date_filter).format('DD MMMM');
            const dateEnd = moment(this.end_date_filter).format('DD MMMM YYYY');
            const dateStartNow = moment().startOf('year').format('DD MMMM YYYY');
            const dateEndNow = moment().endOf('year').format('DD MMMM YYYY');
            const yearStart = moment(this.start_date_filter).format('YYYY');
            const yearEnd = moment(this.end_date_filter).format('YYYY');
            this.date_search = `${dateStart} - ${dateEnd}`;
            if (yearStart === yearEnd) {
              this.date_search = `${dateStart1} - ${dateEnd}`;
            }
            if (dateStart === dateStartNow && dateEnd === dateEndNow) {
              this.date_search = null;
            }
          }

          if (this.ket_search === null && this.status_search.length === 0 && this.training_type_search.length === 0 && this.date_search === null) {
            this.label_search = false;
          } else {
            this.label_search = true;
          }
        }
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
    handleSelectAllPersons() {
      if (this.is_select_all_persons) {
        this.invitation_person_id = null;
        this.is_select_all_persons = false;
      } else {
        this.invitation_person_id = this.persons_direktorat_option;
        this.is_select_all_persons = true;
      }
    },
    isValidDate(date) {
      if (date !== null) {
        const sDate = date.split('-');
        return !Number.isNaN(Number(sDate[0])) && !Number.isNaN(Number(sDate[1])) && !Number.isNaN(Number(sDate[2]));
      }
      return null;
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
    getPic(data) {
      const pic = process.env.QUASAR_API_URL + data;
      return pic;
    },
    handleDelBanner() {
      this.banner = null;
      this.banner_training = null;
    },
    toggleText(idx) {
      if (this.showText === idx) {
        this.showText = null;
      } else {
        this.showText = idx;
      }
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
    handleFilterCot(fromPosition = false) {
      this.loading = true;
      let isStartDate = true;
      let isEndDate = true;
      if (this.start_date_filter_cot === '' || !this.isValidDate(this.start_date_filter_cot)) isStartDate = false;
      if (this.end_date_filter_cot === '' || !this.isValidDate(this.end_date_filter_cot)) isEndDate = false;

      const raw_start_date_filter = new Date(this.start_date_filter_cot);
      const year_start_filter = raw_start_date_filter.getFullYear();
      const raw_end_date_filter = new Date(this.end_date_filter_cot);
      const year_end_filter = raw_end_date_filter.getFullYear();
      if (this.start_date_filter_cot === '' && this.end_date_filter_cot === '') {
        this.start_date_filter_cot = null;
        this.end_date_filter_cot = null;
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
        this.loading = false;
        return;
      }

      // this.data_cot_from_search = true;

      const { page: offset, rowsPerPage: limit } = this.data_cot_pagination;
      trainingListCot({
        offset,
        limit,
        // tab_filter: this.tab_filter,
        ...(isStartDate && { date_start: this.start_date_filter_cot }),
        ...(isEndDate && { date_end: this.end_date_filter_cot }),
        ...(this.filter_cot !== '' && { search_term: this.filter_cot }),
        ...({ organization_id: this.position_value }),
        ...({ status_filter: this.status_filter }),
        ...({ training_type_filter: this.training_type_filter }),
        ...({ training_month_filter: this.training_month_filter.value })
      }).then(response => {
        this.loading = false;
        const hasil = response.data;
        if (hasil) {
          this.list_data_cot = hasil.map(item => {
            const dateStart1 = moment(item.schedule[0].date_start).format('D MMM YYYY');
            const dateStart2 = moment(item.schedule[0].date_start).format('D');
            const dateStart3 = moment(item.schedule[0].date_start).format('D MMM ');
            const dateEnd = moment(item.schedule[item.schedule.length - 1].date_start).format('D MMM YYYY');
            const monthStart = moment(item.schedule[0].date_start).format('MMM');
            const monthEnd = moment(item.schedule[item.schedule.length - 1].date_start).format('MMM');
            let date = '';
            if (item.schedule.length > 1) {
              if (monthStart === monthEnd) {
                date = `${dateStart2} - ${dateEnd}`;
              } else {
                date = `${dateStart3} - ${dateEnd}`;
              }
            } else {
              date = dateStart1;
            }


            const remaining_quota = item.maximun_capacity - item.participant_registered.length;

            // const date_end = moment(item.schedule[item.schedule.length - 1].date_start);
            const date_end = moment(item.schedule[item.schedule.length - 1].date_start).add(1, 'days');
            const now = moment();
            const check = moment(now).isAfter(date_end);
            const removeDuplicateDirektorat = item.participant_registered.reduce((arr, i) => {
              if (!arr.some(obj => obj.direktorat_id === i.direktorat_id)) arr.push(i);
              return arr;
            }, []);
            const dir = removeDuplicateDirektorat.map(v => {
              if (v.direktorat_id !== null && v.direktorat_id >= 32 && v.organization) {
                return {
                  name: v.organization.name,
                  id: v.direktorat_id
                };
              }
              return undefined;
            }).filter(v => v !== undefined);
            let gray = false;
            if (check === true) {
              gray = true;
            } else {
              gray = false;
            }
            let name = '';
            if (item.name.length < 75) {
              name = item.name;
            } else {
              name = item.name.substring(0, 75);
            }
            return {
              id: item.id,
              banner: item.banner ? process.env.QUASAR_API_URL + item.banner : null,
              provider: item.provider,
              date,
              is_invited: item.is_invited,
              is_participant: item.is_participant,
              method: item.training_type,
              type: item.training_method,
              status: item.status,
              max: item.maximun_capacity,
              remaining_quota,
              gray,
              participant: dir,
              name,
              full_name: item.name,
              id_reg: item.id_registration
            };
          });
          const { total_result } = response.meta;
          const { total_page } = response.meta;
          this.data_cot_pagination.total_data = total_result;
          this.data_cot_pagination.total_page = total_page;
          this.ket_search = this.filter_cot === '' ? null : this.filter_cot;
          this.status_search = this.status_filter;
          this.training_type_search = this.training_type_filter;
          if (this.training_month_filter.value === 0) {
            this.month_search = 'Seluruh bulan';
          } else if (this.training_month_filter.value === MONTH_NUMBER) {
            this.month_search = '';
          } else {
            this.month_search = this.training_month_filter.label;
          }
          if (this.start_date_filter_cot === null && this.end_date_filter_cot === null) {
            this.date_search = null;
          } else {
            const dateStart = moment(this.start_date_filter_cot).format('DD MMMM YYYY');
            const dateStart1 = moment(this.start_date_filter_cot).format('DD MMMM');
            const dateEnd = moment(this.end_date_filter_cot).format('DD MMMM YYYY');
            const yearStart = moment(this.start_date_filter_cot).format('YYYY');
            const yearEnd = moment(this.end_date_filter_cot).format('YYYY');
            this.date_search = `${dateStart} - ${dateEnd}`;
            if (yearStart === yearEnd) {
              this.date_search = `${dateStart1} - ${dateEnd}`;
            }
          }

          if (this.ket_search === null && this.status_search.length === 0 && this.training_type_search.length === 0 && this.date_search === null && this.month_search === '') {
            this.label_search = false;
          } else {
            this.label_search = true;
          }
        }
      });
    },
    handleDetail(id) {
      this.$router.push({
        name: 'training-detail',
        params: {
          id
        }
      });
    },
    onFilterCot() {
      if ((this.start_date_filter_cot !== '' && this.end_date_filter_cot !== '') || (this.start_date_filter_cot !== null && this.end_date_filter_cot !== null)) {
        this.training_month_filter = (
          {
            label: 'All',
            value: 0
          }
        );
      }
    },
    getTabTraining() {
      const { tab_training } = this.$route.query;
      if (tab_training === 'cot') {
        this.tab_training = tab_training;
      }
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
    async openModalCertificates(training = null) {
      this.modal_certificates = true;
      this.training_id = training.id;
      this.training_name = training.name;
    },
    async openModalCertificatesPublicTraining() {
      this.modal_certificates = false;
      this.modal_certificates_public_training = true;
      this.getDataTrainingParticipantCertificateCheck();
    },
    async handleUploadCertificateComplete(fileInfos) {
      this.getDataTrainingParticipantCertificateCheck();
    },
    async getDataTrainingParticipantCertificateCheck() {
      this.total_participant = 0;
      this.data_table_training_certificates = [];
      this.data_table_certificate_public_loading = true;
      getTrainingParticipantCertificateCheck(this.training_id).then(response => {
        const { data } = response;
        this.total_participant = data.length;
        this.data_table_training_certificates = data;
        this.data_table_certificate_public_loading = false;
      });
    },
    async openModalCertificatesFromAclc() {
      this.modal_certificates = false;
      this.modal_certificates_from_aclc = true;
      trainingParticipantDetail(this.training_id).then(response => {
        const { data } = response;
        this.total_participant = data.length;
        this.data_table_training_certificates = data;
      });
    },
    async deleteCertificateTrainingPublic(row) {
      this.data_table_certificate_public_loading = true;
      const params = {
        users_id: row.users_id,
        training_id: row.training_id
      };
      delCertificateTrainingPublic(params).then(response => {
        this.getDataTrainingParticipantCertificateCheck();
      });
    },
    handlePreviewFileCertificate(fileInfo) {
      axios.get(`api/${fileInfo.path}`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: response.data.type });
          this.pdfFile = URL.createObjectURL(blob);
          this.pdfFilename = fileInfo.name;
          this.loading = false;
          this.$refs.pdfDialog.show();
        })
        .catch(error => {
          Notify.create({
            message: `Error: ${error.message}`,
            timeout: 1000,
            type: 'negative',
            color: 'negative',
            icon: 'warning'
          });
          this.loading = false;
        });
      // this.previewIndex = index;
      // this.previewVisible = !this.previewVisible;
      // this.previewImages = this.fileInfos.map(file => ({ title: file.fileName, src: this.url + file.path }));
    },
    getPoinExpertise(training = null, training_id, type) {
      let id = null;
      if (type === 'modal') {
        id = training_id;
      } else {
        id = training.id;
      }
      return trainingExpertiseList(id).then(response => {
        const hasil = response.data;
        if (hasil.length !== 0) {
          hasil.forEach((v, i) => {
            point('add', { tag: 'training_expertise', training_id: id, account_id: v.users_id });
          });
          // this.$q.notify({
          //   message: 'Poin training berhasil ditambahkan',
          //   color: 'blue'
          // });
        }
      });
    }
  },
  mounted() {
    this.onResetFilter();
    this.getTrainingCot();
    // this.getTree(true);
    this.getUser();
    this.getOrganization();
    this.getOrganizationName();
    this.getDirektorat();
    this.getJabatan();
    this.getGolongan();
    this.getPangkat();
    this.getTabTraining();
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
.pagination-training-list span.q-btn__wrapper:before {
  content: none;
}
.kmp_tree{
  z-index: 999 !important;
}
</style>
