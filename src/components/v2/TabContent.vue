<template>
  <div>
    <div class="row justify-between q-mt-lg q-mb-md">
        <q-tabs
        class="tab-content"
        v-model="tab"
        dense
        align="left"
        style="color: #666666;"
      >
        <q-tab no-caps name="knowledge" label="Knowledges"/>
        <q-tab no-caps name="expert" label="Expert Insights"/>
      </q-tabs>
        <!-- <q-btn-dropdown dropdown-icon="expand_more" class="kmp-md-text kmp-normal-text button-dropdown-content" no-caps label="Recommended">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label class="kmp-line-125">Recommended</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label class="kmp-line-125">Popular</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label class="kmp-line-125">Latest</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
        <!-- <q-select v-model="model" rounded standout :options="options" class="kmp-md-text kmp-normal-text button-dropdown-content"/> -->
        <q-select
        rounded outlined
        v-model="model"
        :options="options"
        dense
        emit-value
        class="select-knowledge"
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
    <q-tab-panels v-model="tab" animated style="background: none !important">
      <q-tab-panel name="knowledge" style="padding:0px">
        <div v-if="this.library_list_loading">
        <q-card class="knowledge-content cursor-pointer q-mb-md" @click="$router.push({ name: 'v2-library-detail', params: { id: value.id } })"
           v-for="index in 3" :key="index">
          <q-card-section class="q-pa-lg">
            <div>
              <div class="kmp-md-text kmp-bold-text kmp-line-125 kmp-black-text">
                <q-skeleton  type="text" style="height:50px;width:500px" />
              </div>
              <div class="">
                <div class="row">
                  <q-skeleton  type="text" style="height:40px;width:150px" />&nbsp;
                  <q-skeleton  type="text" style="height:40px;width:150px" />
                </div>
              </div>
              <div>
                <q-card-section class="q-pa-none">
                <div class="kmp-new-font">
                  <div class="row">
                    <div class="col">
                      <span>
                        <q-skeleton  type="text" style="height:40px;width:50px" />
                      </span>
                    </div>
                    <div class="col text-right">
                      <div class="row" style="float:right">
                        <q-skeleton  type="text" style="height:40px;width:110px" />&nbsp;
                        <q-skeleton  type="text" style="height:40px;width:110px" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <q-item-section class="col-4">
                    <div class="kmp-new-font">
                      <div>
                        <div class="row">
                          <q-item-section side class="q-pr-sm">
                            <q-skeleton type="circle" size="30px"/>
                          </q-item-section>
                          <q-item-section class="q-pa-none">
                            <div class="kmp-sm-text kmp-bold-text kmp-black-text">
                              <q-skeleton  type="text" style="height:40px;width:200px" />
                            </div>
                          </q-item-section>
                      </div>
                      <div class="row q-mt-sm">
                        <q-item-section class="">
                          <div class="kmp-sm-text kmp-normal-text kmp-line-130 kmp-black-text q-ml-xs q-mt-xs">
                            <q-skeleton  type="text" style="height:40px;width:80px" />
                          </div>
                        </q-item-section>
                      </div>
                    </div>
                  </div>
                  </q-item-section>
                  <q-item-section class="col q-pa-none items-end">
                    <div class="row" style="float:right">
                      <q-skeleton  type="text" style="height:40px;width:100px" />&nbsp;
                      <q-skeleton  type="text" style="height:40px;width:100px" />&nbsp;
                      <q-skeleton  type="text" style="height:40px;width:100px" />
                    </div>
                  </q-item-section>
                </div>
                </q-card-section>
              </div>
            </div>
          </q-card-section>
        </q-card>
        </div>
        <div v-else>
          <q-card class="knowledge-content cursor-pointer q-mb-md" @click="$router.push({ name: 'v2-library-detail', params: { id: value.id } })"
          v-for="(value, index) in this.library_list" :key="index">
          <q-card-section class="q-pa-lg">
            <div>
              <div class="kmp-md-text kmp-bold-text kmp-line-125 kmp-black-text">
                {{ value.knowledge_tree.title }}
              </div>
              <div class="q-my-md">
                <q-badge class="knowledge-gadget-badge-red kmp-line-130 kmp-sm-text kmp-normal-text q-mr-sm">{{ value.knowledge_tree.subtitle }}</q-badge>
                <q-badge class="knowledge-gadget-badge-green kmp-line-30 kmp-sm-text kmp-normal-text ">{{ value.content_type }}</q-badge>
              </div>
              <!-- <div class="link-underscore cursor-pointer kmp-sm-text kmp-bold-text kmp-line-130 kmp-blue-text q-mb-lg" >
                Read more context
              </div> -->
              <div>
                <q-card-section class="q-pa-none">
                  <!-- <div class="kmp-md-text kmp-bold-text kmp-line-125 kmp-black-text">
                    JSONRPC-DBLINK : Database Operations with Dockerized Sequelize and JSON-RPC - Transfer Knowledge
                  </div>
                  <div class="q-my-md">
                    <q-badge class="knowledge-gadget-badge-red kmp-line-130 kmp-sm-text kmp-normal-text q-mr-sm">Pelaporan, Deteksi dan Pemeriksaan Gratifikasi</q-badge>
                    <q-badge class="knowledge-gadget-badge-green kmp-line-30 kmp-sm-text kmp-normal-text ">Explicit Knowledge</q-badge>
                  </div>
                  <div class="link-underscore cursor-pointer kmp-sm-text kmp-bold-text kmp-line-130 kmp-blue-text q-mb-lg" >
                    Read more context
                  </div> -->
                <!-- <KnowledgeReactionInformation class="q-mb-lg" /> -->
                <div class="kmp-new-font">
                  <div class="row">
                    <div class="col q-ml-xs">
                      <span>
                        <span class="cursor-pointer link-underscore kmp-gray-text kmp-sm-text kmp-bold-text kmp-line-130 ">0 likes</span>
                      </span>
                    </div>
                    <div class="col text-right">
                      <span class="cursor-pointer link-underscore kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text">0 Comments</span>
                      <span class="kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text" style="margin: 0px 8px 0px 8px !important">•</span>
                      <span class="cursor-pointer link-underscore kmp-line-130 kmp-gray-text kmp-sm-text kmp-bold-text">0 Shares</span>
                    </div>
                  </div>
                </div>
                <div class="row q-pt-md">
                  <q-item-section class="col-4">
                    <div class="kmp-new-font">
                      <div>
                        <div class="row">
                          <q-item-section side class="q-pr-sm">
                            <Avatar class="cursor-pointer" size="md" :picture="value.created_by_user.profile_picture ? `./api${value.created_by_user.profile_picture}` : ''" :name="value.created_by_user.name"/>
                          </q-item-section>
                          <q-item-section class="q-pa-none">
                            <div class="kmp-sm-text kmp-bold-text kmp-black-text">
                              <span class="kmp-line-130 cursor-pointer link-underscore">{{ value.created_by_user.name }}</span>
                            </div>
                          </q-item-section>
                      </div>
                      <div class="row q-mt-sm">
                        <q-item-section class="">
                          <div class="kmp-sm-text kmp-normal-text kmp-line-130 kmp-black-text q-ml-xs q-mt-xs">0 Collaborator
                          </div>
                        </q-item-section>
                      </div>
                    </div>
                  </div>
                  </q-item-section>
                  <q-item-section class="col q-pa-none items-end">
                    <div class="kmp-new-font">
                      <q-btn-group outline class="full-width justify-between">
                        <q-btn dense size="sm" class="knowledge-button-group" >
                          <Icon style="margin-right: 8px !important;" icon="lucide:thumbs-up"  width="16" height="16"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" />
                          <span class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Like</span>
                        </q-btn>
                        <q-btn dense size="sm" class="knowledge-button-group">
                          <Icon style="margin-right: 8px !important;" icon="ant-design:comment-outlined"  width="16" height="16"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" />
                          <span class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Comment</span>
                        </q-btn>
                        <q-btn dense size="sm" class="knowledge-button-group">
                          <q-icon name="o_share" size="16px"/>
                          <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Share</span>
                        </q-btn>
                        <q-btn dense size="sm" class="knowledge-button-group">
                          <q-icon name="bookmark_border" size="16px"/>
                          <!-- <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Bookmark</span> -->
                        </q-btn>
                      </q-btn-group>
                    </div>
                  </q-item-section>
                </div>
                </q-card-section>
              </div>
            </div>
          </q-card-section>
        </q-card>
          <div>
            <q-pagination
              v-model="library_list_pagination"
              :max="library_list_total_page"
              :max-pages="5"
              direction-links
              gutter="sm"
              class="justify-center"
              @input="changePagination"
            />
        </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="expert" style="padding:0px">
        <div v-if="under_construction">
          <q-card class="knowledge-content cursor-pointer q-mb-md">
            <q-card-section class="q-pa-lg">
              <div>
                <ExpertInsightContentAnswer
                />
              </div>
            </q-card-section>
          </q-card>
          <q-card class="knowledge-content cursor-pointer ">
            <q-card-section class="q-pa-lg">
              <div>
                <ExpertInsightContentQuestion
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import ExpertInsightContentAnswer from 'components/v2/expert-insight-component/ExpertInsightContentAnswer';
import ExpertInsightContentQuestion from 'components/v2/expert-insight-component/ExpertInsightContentQuestion';
import { Icon } from '@iconify/vue2';
import Avatar from 'components/common/Avatar';
import {
  libraryList
} from '../../lib/api';

export default {
  components: { ExpertInsightContentQuestion, ExpertInsightContentAnswer, Icon, Avatar },
  props: ['is_data', 'today', 'hours', 'user'],
  data () {
    return {
      model: 'Latest',
      options: [
        {
          label: 'Latest',
          value: 'Latest'
        }
      ],
      tab: 'knowledge',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?',
      library_list: [],
      library_list_loading: false,
      library_list_pagination: 1,
      library_list_total_page: 0,
      under_construction: false
    };
  },
  methods: {
    getLibraryList(offset) {
      console.log('masukk');
      this.library_list_loading = true;
      const params = {
        limit: 10,
        offset
      };
      libraryList(params).then(response => {
        const hasil = response.data;
        console.log(hasil);
        this.library_list = hasil;
        this.library_list_loading = false;
        this.library_list_total_page = response.meta.total_page;
        this.total_result = response.meta.total_result;
      });
    },
    changePagination(library_list_pagination) {
      const offset = library_list_pagination * 10 - 10;
      this.getLibraryList(offset);
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    this.getLibraryList(0);
  }
};
</script>
