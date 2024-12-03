<template>
  <div class="fit">
    <q-card class="my-card-profile-post q-mb-xs">
      <div class="q-pt-md q-pb-xs q-px-xl">
        <q-card class="q-mb-md my-card-profile-post-2" v-for="(item, index) in list_filter" :key="index">
          <div v-if="item.post_type === 'Post'">
            <q-card-section style="padding: 12px 16px 2px 16px;">
              <div class="row q-mb-xs">
                <q-item-section>
                  <q-item-label class="q-pr-md kmp-time">
                    {{ post_date(item.created_at) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side v-show="is_show_more">
                  <q-btn-dropdown dense flat dropdown-icon="more_horiz" class="self-start q-ma-none" size="sm">
                    <q-item dense clickable v-close-popup style="width: 200px;" @click="handleEdit(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Edit</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item dense clickable v-close-popup @click="handleDelete(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Delete</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-btn-dropdown>
                </q-item-section>
              </div>

              <div class="kmp-post-text-title q-mb-sm cursor-pointer" @click="clickPost(item.post_channel.channel, item.id)">
                {{ item.title }}
              </div>

              <div class="row q-mb-xs kmp-time">
                <span class="q-pr-xs" style="margin-top: -2px">
                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports"
                          class="check-icon" size="16px" style=""/>
                </span>
                <span class="">
                  {{ item.post_channel.channel.short_name }}
                </span>
                <span v-show="item.post_collaboration.length">
                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                </span>
                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                  <q-icon name="group_add" class="check-icon" size="16px" style=""/>
                </span>
                <span v-if="item.post_collaboration.length > 1" class="">
                  {{
                    item.post_collaboration.map(m => m.user.name).slice(0, 1).join(', ')
                  }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                </span>
                <span v-else-if="item.post_collaboration.length === 1" class="">
                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                </span>
              </div>
            </q-card-section>
          </div>
          <div v-if="item.post_type === 'Poll'">
            <q-card-section style="padding: 12px 16px 2px 16px;">
              <div class="row q-mb-xs">
                <q-item-section>
                  <q-item-label class="q-pr-md kmp-time">
                    {{ post_date(item.created_at) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side v-show="is_show_more">
                  <q-btn-dropdown dense flat dropdown-icon="more_horiz" class="self-start q-ma-none" size="sm">
                    <q-item dense clickable v-close-popup style="width: 200px;" @click="handleEdit(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Edit</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item dense clickable v-close-popup @click="handleDelete(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Delete</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-btn-dropdown>
                </q-item-section>
              </div>

              <div class="kmp-post-text-title q-mb-sm cursor-pointer" @click="clickPost(item.post_channel.channel, item.id)">
                {{ item.title }}
              </div>

              <div class="row kmp-post-text-title q-mb-sm">
                    <span class="cursor-pointer" @click="clickKnowledge(item.post_channel.channel, item.id)">
                      <div class="row">
                        <span class="q-pr-xs" style="margin-top: -2px">
                          <q-icon name="poll" color="negative" class="check-icon" size="16px" style=""/>
                        </span>
                        <span class="q-pr-xs text-primary">See Poling</span>
                        <span class="text-primary">
                          <q-icon name="open_in_new" color="primary" class="check-icon" size="16px" style=""/>
                        </span>
                      </div>
                    </span>
              </div>

              <div class="row q-mb-xs kmp-time">
                <span class="q-pr-xs" style="margin-top: -2px">
                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports"
                          class="check-icon" size="16px" style=""/>
                </span>
                <span class="">
                  {{ item.post_channel.channel.short_name }}
                </span>
                <span v-show="item.post_collaboration.length">
                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                </span>
                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                  <q-icon name="group_add" class="check-icon" size="16px" style=""/>
                </span>
                <span v-if="item.post_collaboration.length > 1" class="">
                  {{
                    item.post_collaboration.map(m => m.user.name).slice(0, 1).join(', ')
                  }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                </span>
                <span v-else-if="item.post_collaboration.length === 1" class="">
                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                </span>
              </div>
            </q-card-section>
          </div>
          <div v-if="item.post_type === 'Post Document'">
            <q-card-section style="padding: 12px 16px 2px 16px;">
              <div class="row q-mb-xs">
                <q-item-section>
                  <q-item-label class="q-pr-md kmp-time">
                    {{ post_date(item.created_at) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side v-show="is_show_more">
                  <q-btn-dropdown dense flat dropdown-icon="more_horiz" class="self-start q-ma-none" size="sm">
                    <q-item dense clickable v-close-popup style="width: 200px;" @click="handleEdit(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Edit</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item dense clickable v-close-popup @click="handleDelete(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Delete</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-btn-dropdown>
                </q-item-section>
              </div>

              <div class="kmp-post-text-title q-mb-sm cursor-pointer" @click="clickPost(item.post_channel.channel, item.id)">
                {{ item.title }}
              </div>

              <div class="row q-gutter-md q-mb-sm">
                <q-item v-for="(item2, index) in item.post_file.slice(0,3)" :key="index"
                        class="q-list--bordered kmp-font-medium" style="width: 46%;"
                        :class="item2.file.filemime === 'pdf' ? 'kmp-file-item kmp-file-text' : 'kmp-post-item kmp-post-text'">
                                      <span class="self-center q-pr-sm">
                                        <q-icon v-if="item2.file.filemime === 'pdf'" name="fas fa-file-pdf" class=""
                                                size="30px" style=""/>
                                        <q-icon v-else-if="item2.file.filemime === 'docx'" name="fas fa-file-word"
                                                class="" size="30px" style=""/>
                                        <q-icon v-else-if="item2.file.filemime === 'pptx'" name="fas fa-file-powerpoint"
                                                class="" size="30px" style=""/>
                                        <q-icon v-else name="fas fa-file" class="" size="30px" style=""/>
                                      </span>
                  <span class="self-center">
                                        {{ item2.file.filename.split('.')[0] }}
                                      </span>
                </q-item>
                <q-item v-show="item.post_file.length > 3">
                  <span class="self-center">
                    {{ item.post_file.length - 3 }} dokumen lainnya
                  </span>
                </q-item>
              </div>

              <div class="row q-mb-xs kmp-time">
                <span class="q-pr-xs" style="margin-top: -2px">
                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'"
                          name="public" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'"
                          name="domain" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'"
                          name="chat_bubble" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'"
                          name="sports_esports" class="check-icon" size="16px" style=""/>
                </span>
                <span class="">
                  {{ item.post_channel.channel.short_name }}
                </span>
                <span v-show="item.post_collaboration.length">
                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                </span>
                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                  <q-icon name="group_add" class="check-icon" size="16px" style=""/>
                </span>
                <span v-if="item.post_collaboration.length > 1" class="">
                  {{
                    item.post_collaboration.map(m => m.user.name).slice(0, 1).join(', ')
                  }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                </span>
                <span v-else-if="item.post_collaboration.length === 1" class="">
                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                </span>
              </div>
            </q-card-section>
          </div>
          <div v-if="item.post_type === 'Article'">
            <q-card-section style="padding: 12px 16px 2px 16px;">
              <div class="row q-mb-xs">
                <q-item-section>
                  <q-item-label class="q-pr-md kmp-time">
                    {{ post_date(item.created_at) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side v-show="is_show_more">
                  <q-btn-dropdown dense flat dropdown-icon="more_horiz" class="self-start q-ma-none" size="sm">
                    <q-item dense clickable v-close-popup style="width: 200px;" @click="handleEdit(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Edit</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item dense clickable v-close-popup @click="handleDelete(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Delete</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-btn-dropdown>
                </q-item-section>
              </div>

              <div class="kmp-post-text-title q-mb-sm cursor-pointer" @click="clickPost(item.post_channel.channel, item.id)">
                {{ item.title }}
              </div>

              <div class="row q-mb-xs kmp-time">
                <span class="q-pr-xs" style="margin-top: -2px">
                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'"
                          name="public" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'"
                          name="domain" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'"
                          name="chat_bubble" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'"
                          name="sports_esports" class="check-icon" size="16px" style=""/>
                </span>
                <span class="">
                  {{ item.post_channel.channel.short_name }}
                </span>
                <span v-show="item.post_collaboration.length">
                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                </span>
                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                  <q-icon name="group_add" class="check-icon" size="16px" style=""/>
                </span>
                <span v-if="item.post_collaboration.length > 1" class="">
                  {{
                    item.post_collaboration.map(m => m.user.name).slice(0, 1).join(', ')
                  }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                </span>
                <span v-else-if="item.post_collaboration.length === 1" class="">
                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                </span>
              </div>
            </q-card-section>
          </div>
          <div v-if="item.post_type === 'Post Image'">
            <q-card-section style="padding: 12px 16px 2px 16px;">
              <div class="row q-mb-xs">
                <q-item-section>
                  <q-item-label class="q-pr-md kmp-time">
                    {{ post_date(item.created_at) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side v-show="is_show_more">
                  <q-btn-dropdown dense flat dropdown-icon="more_horiz" class="self-start q-ma-none" size="sm">
                    <q-item dense clickable v-close-popup style="width: 200px;" @click="handleEdit(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Edit</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item dense clickable v-close-popup @click="handleDelete(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Delete</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-btn-dropdown>
                </q-item-section>
              </div>

              <div class="kmp-post-text-title q-mb-sm cursor-pointer" @click="clickPost(item.post_channel.channel, item.id)">
                {{ item.title }}
              </div>

              <div class="row q-gutter-sm q-mb-sm">
                <q-item v-for="(item3, index3) in item.post_file.slice(0,4)" :key="index3"
                        class="q-pa-none kmp-file-item" style="width: 13%;background-color: #dedede;">
                  <q-img v-if="['png','jpg','jpeg'].includes(item3.file.filemime)" style="border-radius: 6px;"
                         :src="'./api' + item3.file.path"
                         fit="fill"
                  />
                  <q-media-player v-else
                                  type="video"
                                  :sources="getSourceVideo(item3.file)"
                                  :bottom-controls="false"
                                  style="border-radius: 6px; min-width: unset !important; min-height: unset !important;
                                          width: 100%; height: 56px; text-align: center;"
                                  dense
                  />
                  <!--                                  56 | 73-->
                </q-item>
                <q-item v-show="item.post_file.length > 4">
                  <span class="self-center">
                    {{ item.post_file.length - 4 }} dokumen lainnya
                  </span>
                </q-item>
              </div>

              <div class="row q-mb-xs kmp-time">
                <span class="q-pr-xs" style="margin-top: -2px">
                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'"
                          name="public" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'"
                          name="domain" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'"
                          name="chat_bubble" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'"
                          name="sports_esports" class="check-icon" size="16px" style=""/>
                </span>
                <span class="">
                  {{ item.post_channel.channel.short_name }}
                </span>
                <span v-show="item.post_collaboration.length">
                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                </span>
                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                  <q-icon name="group_add" class="check-icon" size="16px" style=""/>
                </span>
                <span v-if="item.post_collaboration.length > 1" class="">
                  {{
                    item.post_collaboration.map(m => m.user.name).slice(0, 1).join(', ')
                  }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                </span>
                <span v-else-if="item.post_collaboration.length === 1" class="">
                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                </span>
              </div>
            </q-card-section>
          </div>
          <div v-if="item.post_type === 'Event'">
            <q-card-section style="padding: 12px 16px 2px 16px;">
              <div class="row q-mb-xs">
                <q-item-section>
                  <q-item-label class="q-pr-md kmp-time">
                    {{ post_date(item.created_at) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side v-show="is_show_more">
                  <q-btn-dropdown dense flat dropdown-icon="more_horiz" class="self-start q-ma-none" size="sm">
                    <q-item dense clickable v-close-popup style="width: 200px;" @click="handleEdit(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Edit</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item dense clickable v-close-popup @click="handleDelete(item);">
                      <q-item-section>
                        <q-item-label class="text-primary">Delete</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-btn-dropdown>
                </q-item-section>
              </div>

              <div class="kmp-post-text-title q-mb-sm cursor-pointer" @click="clickPost(item.post_channel.channel, item.id)">
                {{ item.title }}
              </div>

              <div class="row q-gutter-sm q-mb-sm">
                <q-item class="q-pa-none kmp-file-item" style="width: 13%;background-color: #dedede;">
                  <q-img v-if="item.event.picture" style="border-radius: 6px;"
                         :src="'./api' + item.event.picture"
                         fit="fill"
                  />
                </q-item>
                <div class="column justify-between q-ml-md">
                  <div class="col">
                    <div class="row">
                      <span class="q-pr-xs" style="margin-top: -2px">
                        <q-icon name="event" size="16px" style=""/>
                      </span>
                      <span>
                        {{
                          parseDate(item.event.start_date, 'dddd, DD MMM YYYY')
                        }} - {{ parseDate(item.event.end_date, 'dddd, DD MMM YYYY') }}
                      </span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row q-mt-xs">
                      <span class="q-pr-xs" style="margin-top: -2px">
                        <q-icon name="schedule" size="16px" style=""/>
                      </span>
                      <span>
                        {{
                          `${parseTime(item.event.start_time)} - ${parseTime(item.event.end_time)}`
                        }} (GMT+7)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-mb-xs kmp-time">
                <span class="q-pr-xs" style="margin-top: -2px">
                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'"
                          name="public" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'"
                          name="domain" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add"
                          class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'"
                          name="chat_bubble" class="check-icon" size="16px" style=""/>
                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'"
                          name="sports_esports" class="check-icon" size="16px" style=""/>
                </span>
                <span class="">
                  {{ item.post_channel.channel.short_name }}
                </span>
                <span v-show="item.post_collaboration.length">
                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                </span>
                <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">
                  <q-icon name="group_add" class="check-icon" size="16px" style=""/>
                </span>
                <span v-if="item.post_collaboration.length > 1" class="">
                  {{
                    item.post_collaboration.map(m => m.user.name).slice(0, 1).join(', ')
                  }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya
                </span>
                <span v-else-if="item.post_collaboration.length === 1" class="">
                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}
                </span>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>
    </q-card>
    <div v-show="count_page > 1" class="flex flex-center">
      <div v-show="true"
           style="position: absolute; bottom: 3px;">
        <q-pagination
          :unelevated=false
          :outline=false
          v-model="paginate.current"
          :max="count_page"
          direction-links
          boundary-links
          boundary-numbers
          :max-pages="3"
        />
      </div>
    </div>

    <PostEdit ref="edit" :data_post="postSelected" :heightObserver="heightObserver" @update_post="updatePost()"/>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment/moment';
import { postDelete } from 'src/lib/api';
import { point } from 'src/lib/point';
import { Notify } from 'quasar';
import PostEdit from 'components/post/PostEdit';

export default {
  name: 'ProfileTabPost',
  props: ['list_data', 'badge_show', 'type', 'info_height', 'data_own'],
  components: { PostEdit },

  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      paginate: {
        current: 1,
        page_limit: 5,
        page_count: 1
      },
      heightObserver: 0,
      postSelected: null,
      is_show_more: false
    };
  },
  computed: {
    limit_page: {
      get() {
        // eslint-disable-next-line no-nested-ternary
        const pageLimitByType = (this.type === 'Post Document' || this.type === 'Event' || this.type === 'Post Image')
          ? 3
          : (this.type === 'Poll' ? 4 : 5);

        const pageLimit0 = (window.innerWidth > 1300) ? pageLimitByType + 1 : pageLimitByType;
        const pageLimit = pageLimit0; // this.badge_show ? pageLimit0 + 1 : pageLimit0;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.paginate.current = 1;
        return pageLimit;
      }
    },
    count_page: {
      get() {
        const data0 = this.list_data;
        const pageLimit = this.limit_page;
        const tambahan = data0.length % pageLimit > 0 ? 1 : 0;
        const count = data0.length > 0
          ? Math.floor(data0.length / pageLimit) + tambahan
          : 1;

        return count;
      }
    },
    list_filter: {
      get() {
        const data0 = this.list_data;
        const data = _.filter(_.forEach(data0, (v, i) => {
          v.page = i < this.limit_page ? 1 : 1 + Math.floor(i / this.limit_page);
        }), v1 => v1.page === this.paginate.current);
        return data;
      }
    },
    post_model: {
      get() {
        return this.type;
      }
    }
  },
  mounted() {
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      // this.paginate.page_limit = window.innerWidth > 1300
      //   ? this.paginate.page_limit + 1
      //   : this.paginate.page_limit;
    },
    clickKnowledge(channel, post) {
      this.$emit('clickKnowledge', channel, post);
    },
    parseDate(date, formate = 'DD MMMM YYYY') {
      return moment(new Date(date)).format(formate);
    },
    parseTime(time) {
      return time;
    },
    post_date(dateParam) {
      const date = typeof dateParam === 'object' ?
        dateParam :
        new Date(dateParam);
      const MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const day = date.getDate();
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const x = `${day} ${month} ${year} at ${hours}:${minutes}`;
      return x;
    },
    getSourceVideo(data) {
      return [{
        src: `./api/uploads/files/${data.created_by}/${data.filename_unique}`,
        type: 'video/mp4'
      }];
    },
    getInitPage() {
      const data0 = this.list_data.data;
      const pageLimit0 = (window.innerWidth < 1300 && this.info_height > 700) ? this.paginate.page_limit + 1 : this.paginate.page_limit;
      const pageLimit = pageLimit0; // this.badge_show ? pageLimit0 + 1 : pageLimit0;
      const tambahan = data0.length % pageLimit > 0 ? 1 : 0;
      const count = data0.length > 0
        ? Math.floor(data0.length / pageLimit) + tambahan
        : 1;
      this.paginate.page_count = count < 1 ? 1 : count;
      this.paginate.page_limit = pageLimit;
    },
    handleEdit(item) {
      if (item.post_type === 'Article') {
        this.postSelected = item;
        this.$refs.edit.openDialog('edit_article');
        setTimeout(() => {
          this.$refs.edit.getDetailPost(`${item.id}`, `${item.post_type}`);
        }, 1000);
      }
      if (item.post_type === 'Post' || item.post_type === 'Post Document' || item.post_type === 'Post Image' || item.post_type === 'Post Video') {
        this.postSelected = item;
        this.$refs.edit.openDialog('edit_posts');
        setTimeout(() => {
          this.$refs.edit.getDetailPost(`${item.id}`, `${item.post_type}`);
        }, 1000);
      }
      if (item.post_type === 'Event') {
        this.postSelected = item;
        this.$refs.edit.openDialog('edit_event');
      }
      if (item.post_type === 'Poll') {
        this.postSelected = item;
        this.$refs.edit.openDialog('edit_poll');
        setTimeout(() => {
          this.$refs.edit.getDetailPost(`${item.id}`, `${item.post_type}`);
        }, 1000);
      }
    },
    handleDelete(item) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this Post?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        postDelete(item.id).then(res => {
          if (res.message === 'OK') {
            if (item.post_type === 'Poll') {
              point('rollback', { tag: 'polling_create', post_id: item.id });
            } else if (item.post_type !== 'Poll' && item.post_channel.channel.channel_type === 'Project') {
              point('rollback', { tag: 'post_project', post_id: item.id });
            } else if (item.post_type !== 'Poll' && item.post_channel.channel.channel_type !== 'Project') {
              point('rollback', { tag: 'post_general', post_id: item.id });
            }
            this.$emit('update_post');
            Notify.create({
              message: 'Post deleted.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          }
          this.updatePost();
        });
      });
    },
    updatePost() {
      window.location.reload();
      // this.$emit('update_post');
      // this.$emit('select_post', null);
    },
    clickPost(channel, post) {
      this.$emit('clickKnowledge', channel, post);
    }
  },
  watch: {
    data_own: {
      immediate: true,
      deep: true,
      handler(value) {
        this.is_show_more = value;
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
};

</script>

<style lang="sass" scoped>
.kmp-profile-item-list
  padding: 1px
  border-bottom: 1px solid #E5E8ED

.my-card-profile-post
  width: 100%
  max-width: 100%
  height: auto
  border-radius: 8px
  background: #EFF1F4
  box-sizing: border-box
  box-shadow: none

.my-card-profile-post-2
  width: 100%
  max-width: 100%
  height: auto
  border-radius: 8px
  background: #FFFFFF
  box-sizing: border-box
  box-shadow: none


</style>
