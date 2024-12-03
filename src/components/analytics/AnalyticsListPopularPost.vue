<template>
  <div class="q-px-lg q-pb-lg">
    <q-item v-for="(item, index) in data" :key="index"
            style="border: 1px solid #e5e5e5" class="kmp-rounded-2 q-mb-md">
      <q-item-section>
        <q-item-label class="kmp-font-xs text-grey-7">{{post_date(item.created_at)}}</q-item-label>
        <q-item-label class="text-weight-bold cursor-pointer" @click="goTo(item)">{{item.title}}</q-item-label>
<!--        <q-item-label caption>{{item.description}}</q-item-label>-->
        <q-item-label class="kmp-font-sm row q-pt-xs">
          <div class="q-pr-xs" style="margin-top: -2px">
            <q-icon v-show="item.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />
            <q-icon v-show="item.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />
            <q-icon v-show="item.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />
            <q-icon v-show="item.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />
            <q-icon v-show="item.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />
          </div>
          <div>{{item.channel_name}}</div>
        </q-item-label>
      </q-item-section>
    </q-item>

<!--    <div class="q-mb-lg my-card-profile-post-2 kmp-rounded-2" style="border: 1px solid lightgrey" v-for="(item, index) in data" :key="index">-->
<!--      <div v-if="item.post_type === 'Post'">-->
<!--        <q-card-section>-->
<!--          <div class="row q-mb-sm">-->
<!--            <q-item-section>-->
<!--              <q-item-label class="q-pr-md kmp-time">-->
<!--                {{ post_date(item.updated_at) }}-->
<!--              </q-item-label>-->
<!--            </q-item-section>-->
<!--          </div>-->

<!--          <div class="kmp-post-text-title q-mb-sm">-->
<!--            {{ item.title }}-->
<!--          </div>-->

<!--          <div class="row q-mb-sm kmp-time">-->
<!--                                <span class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span class="">-->
<!--                                  {{ item.post_channel.channel.short_name }}-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length">-->
<!--                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span v-if="item.post_collaboration.length > 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya-->
<!--                                </span>-->
<!--            <span v-else-if="item.post_collaboration.length === 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}-->
<!--                                </span>-->
<!--          </div>-->
<!--          <div hidden class="kmp-post-description" v-html="item.scan.text"></div>-->
<!--          <div hidden v-if="item.scan.linkStatus" class="q-py-sm cursor-pointer" @click="openLinkTumbnail(item.scan.url)">-->
<!--            <link-prevue apiUrl="./prevue/" :url="item.scan.url">-->
<!--              <template slot="loading" style="width: 100%">-->
<!--                <div class="row justify-center q-my-md">-->
<!--                  <q-spinner size="50px" color="primary"/>-->
<!--                </div>-->
<!--              </template>-->
<!--              <template slot-scope="props">-->
<!--                <q-card style="background-color: #EFF1F4">-->
<!--                  <q-card-section v-if="props.img">-->
<!--                    <q-card>-->
<!--                      <q-video v-if="item.scan.mainUrl === 'youtu.be'"-->
<!--                               :ratio="16/9"-->
<!--                               :src="`https://www.youtube.com/embed/${item.scan.url.split('/')[3]}?rel=0`"-->
<!--                      />-->
<!--                      <q-img v-else :src="props.img" fit="fill"/>-->
<!--                    </q-card>-->
<!--                  </q-card-section>-->
<!--                  <q-card-section :class="props.img ? 'q-pt-none' : ''">-->
<!--                    <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{props.title}}</div>-->
<!--                    <div class="text-subtitle2" v-else>{{item.scan.mainUrl}}</div>-->
<!--                    <div class="text-url text-grey-7">{{props.url}}</div>-->
<!--                  </q-card-section>-->
<!--                </q-card>-->
<!--              </template>-->
<!--            </link-prevue>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </div>-->
<!--      <div v-if="item.post_type === 'Poll'">-->
<!--        <q-card-section>-->
<!--          <div class="row q-mb-sm">-->
<!--            <q-item-section>-->
<!--              <q-item-label class="q-pr-md kmp-time">-->
<!--                {{ post_date(item.updated_at) }}-->
<!--              </q-item-label>-->
<!--            </q-item-section>-->
<!--          </div>-->

<!--          <div class="kmp-post-text-title q-mb-sm">-->
<!--            {{ item.title }}-->
<!--          </div>-->

<!--          <div class="row kmp-post-text-title q-mb-sm">-->
<!--                                <span class="cursor-pointer" @click="clickKnowledge(item.post_channel.channel, item.id)">-->
<!--                                  <div class="row">-->
<!--                                    <span class="q-pr-xs" style="margin-top: -2px">-->
<!--                                      <q-icon name="poll" color="negative" class="check-icon" size="16px" style="" />-->
<!--                                    </span>-->
<!--                                    <span class="q-pr-xs text-primary">See Poling</span>-->
<!--                                    <span class="text-primary"><q-icon name="open_in_new" color="primary" class="check-icon" size="16px" style="" /></span>-->
<!--                                  </div>-->

<!--                                </span>-->
<!--          </div>-->

<!--          <div class="row q-mb-sm kmp-time">-->
<!--                                <span class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span class="">-->
<!--                                  {{ item.post_channel.channel.short_name }}-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length">-->
<!--                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span v-if="item.post_collaboration.length > 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya-->
<!--                                </span>-->
<!--            <span v-else-if="item.post_collaboration.length === 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}-->
<!--                                </span>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </div>-->
<!--      <div v-if="item.post_type === 'Post Document'">-->
<!--        <q-card-section>-->
<!--          <div class="row q-mb-sm">-->
<!--            <q-item-section>-->
<!--              <q-item-label class="q-pr-md kmp-time">-->
<!--                {{ post_date(item.updated_at) }}-->
<!--              </q-item-label>-->
<!--            </q-item-section>-->
<!--          </div>-->

<!--          <div class="kmp-post-text-title q-mb-sm">-->
<!--            {{ item.title }}-->
<!--          </div>-->

<!--          <div class="row q-gutter-md q-mb-sm">-->
<!--            <q-item v-for="(item2, index) in item.post_file.slice(0,3)" :key="index"-->
<!--                    class="q-list&#45;&#45;bordered kmp-font-medium" style="width: 46%;"-->
<!--                    :class="item2.file.filemime === 'pdf' ? 'kmp-file-item kmp-file-text' : 'kmp-post-item kmp-post-text'">-->
<!--                                  <span class="self-center q-pr-sm">-->
<!--                                    <q-icon v-if="item2.file.filemime === 'pdf'" name="fas fa-file-pdf" class="" size="30px" style=""/>-->
<!--                                    <q-icon v-else-if="item2.file.filemime === 'docx'" name="fas fa-file-word" class="" size="30px" style=""/>-->
<!--                                    <q-icon v-else-if="item2.file.filemime === 'pptx'" name="fas fa-file-powerpoint" class="" size="30px" style=""/>-->
<!--                                    <q-icon v-else name="fas fa-file" class="" size="30px" style=""/>-->
<!--                                  </span>-->
<!--              <span class="self-center">-->
<!--                                    {{ item2.file.filename.split('.')[0] }}-->
<!--                                  </span>-->
<!--            </q-item>-->
<!--            <q-item v-show="item.post_file.length > 3">-->
<!--                                  <span class="self-center">-->
<!--                                    {{ item.post_file.length }} dokumen lainnya-->
<!--                                  </span>-->
<!--            </q-item>-->
<!--          </div>-->
<!--          <div hidden v-for="(item1, index) in item.post_file" :key="index">-->
<!--            <KnowledgeListFile v-if="item1.file !== null" :file="item1.file" :item="item1" :manage="false"/>-->
<!--          </div>-->

<!--          <div class="row q-mb-sm kmp-time">-->
<!--                                <span class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span class="">-->
<!--                                  {{ item.post_channel.channel.short_name }}-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length">-->
<!--                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span v-if="item.post_collaboration.length > 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya-->
<!--                                </span>-->
<!--            <span v-else-if="item.post_collaboration.length === 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}-->
<!--                                </span>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </div>-->
<!--      <div v-if="item.post_type === 'Article'">-->
<!--        <q-card-section>-->
<!--          <div class="row q-mb-sm">-->
<!--            <q-item-section>-->
<!--              <q-item-label class="q-pr-md kmp-time">-->
<!--                {{ post_date(item.updated_at) }}-->
<!--              </q-item-label>-->
<!--            </q-item-section>-->
<!--          </div>-->

<!--          <div class="kmp-post-text-title q-mb-sm">-->
<!--            {{ item.title }}-->
<!--          </div>-->

<!--          <div class="row q-mb-sm kmp-time">-->
<!--                                <span class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span class="">-->
<!--                                  {{ item.post_channel.channel.short_name }}-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length">-->
<!--                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span v-if="item.post_collaboration.length > 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya-->
<!--                                </span>-->
<!--            <span v-else-if="item.post_collaboration.length === 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}-->
<!--                                </span>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </div>-->
<!--      <div v-if="item.post_type === 'Post Video'">-->
<!--        <q-card-section>-->
<!--          <div class="row q-mb-md">-->
<!--            <q-item-section avatar style="min-width: 10px" class="q-pr-md">-->
<!--              <Avatar size="xl" :picture="profile_picture ? profile_picture : ''"-->
<!--                      :name="profile_name"-->
<!--              />-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <div class="kmp-text-nama">-->
<!--                {{ profile_name }} <span class="kmp-time q-ml-xs">{{ getTime(item.updated_at) }}</span>-->
<!--              </div>-->
<!--              <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />-->
<!--            </q-item-section>-->
<!--          </div>-->

<!--          <div class="kmp-post-text-title q-mt-lg q-mb-sm">-->
<!--            {{ item.title }}-->
<!--          </div>-->
<!--          <div class="kmp-post-description" v-html="item.scan.text"></div>-->
<!--          <div v-if="item.scan.linkStatus" class="q-py-sm cursor-pointer" @click="openLinkTumbnail(item.scan.url)">-->
<!--            <link-prevue apiUrl="./prevue/" :url="item.scan.url">-->
<!--              <template slot="loading" style="width: 100%">-->
<!--                <div class="row justify-center q-my-md">-->
<!--                  <q-spinner size="50px" color="primary"/>-->
<!--                </div>-->
<!--              </template>-->
<!--              <template slot-scope="props">-->
<!--                <q-card style="background-color: #EFF1F4">-->
<!--                  <q-card-section v-if="props.img">-->
<!--                    <q-card>-->
<!--                      <q-video v-if="item.scan.mainUrl === 'youtu.be'"-->
<!--                               :ratio="16/9"-->
<!--                               :src="`https://www.youtube.com/embed/${item.scan.url.split('/')[3]}?rel=0`"-->
<!--                      />-->
<!--                      <q-img v-else :src="props.img" fit="fill"/>-->
<!--                    </q-card>-->
<!--                  </q-card-section>-->
<!--                  <q-card-section :class="props.img ? 'q-pt-none' : ''">-->
<!--                    <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{props.title}}</div>-->
<!--                    <div class="text-subtitle2" v-else>{{item.scan.mainUrl}}</div>-->
<!--                    <div class="text-url text-grey-7">{{props.url}}</div>-->
<!--                  </q-card-section>-->
<!--                </q-card>-->
<!--              </template>-->
<!--            </link-prevue>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </div>-->
<!--      <div v-if="item.post_type === 'Post Image'">-->
<!--        <q-card-section>-->
<!--          <div class="row q-mb-sm">-->
<!--            <q-item-section>-->
<!--              <q-item-label class="q-pr-md kmp-time">-->
<!--                {{ post_date(item.updated_at) }}-->
<!--              </q-item-label>-->
<!--            </q-item-section>-->
<!--          </div>-->

<!--          <div class="kmp-post-text-title q-mb-sm">-->
<!--            {{ item.title }}-->
<!--          </div>-->

<!--          <div class="row q-gutter-sm q-mb-sm">-->
<!--            <q-item v-for="(item3, index3) in item.post_file" :key="index3"-->
<!--                    class="q-pa-none kmp-file-item" style="width: 13%;background-color: #dedede;">-->
<!--              <q-img v-if="['png','jpg','jpeg'].includes(item3.file.filemime)" style="border-radius: 6px;"-->
<!--                     :src="'./api' + item3.file.path"-->
<!--                     fit="fill"-->
<!--              />-->
<!--              <q-media-player v-else-->
<!--                              type="video"-->
<!--                              :sources="getSourceVideo(item3.file)"-->
<!--                              :bottom-controls="false"-->
<!--                              style="border-radius: 6px; min-width: unset !important; min-height: unset !important;-->
<!--                                      width: 100%; height: 73px; text-align: center;"-->
<!--                              dense-->
<!--              />-->
<!--              &lt;!&ndash;                                  56&ndash;&gt;-->
<!--            </q-item>-->
<!--          </div>-->

<!--          <div class="row q-mb-sm kmp-time">-->
<!--                                <span class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span class="">-->
<!--                                  {{ item.post_channel.channel.short_name }}-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length">-->
<!--                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span v-if="item.post_collaboration.length > 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya-->
<!--                                </span>-->
<!--            <span v-else-if="item.post_collaboration.length === 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}-->
<!--                                </span>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--        <q-card-section style="display: none;">-->
<!--          <div class="q-px-none q-pt-md">-->
<!--            <PostListMedia :list_data="item.post_file" :download="true"/>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </div>-->
<!--      <div v-if="item.post_type === 'sample'">-->
<!--        <q-card-section>-->
<!--          <div class="row q-mb-md">-->
<!--            <q-item-section avatar style="min-width: 10px" class="q-pr-md">-->
<!--              <Avatar size="xl" :picture="profile_picture ? profile_picture : ''"-->
<!--                      :name="profile_name"-->
<!--              />-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <div class="kmp-text-nama">-->
<!--                {{ profile_name }} <span class="kmp-time q-ml-xs">{{ getTime(item.updated_at) }}</span>-->
<!--              </div>-->
<!--              <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />-->
<!--            </q-item-section>-->
<!--          </div>-->

<!--        </q-card-section>-->
<!--      </div>-->
<!--      <div v-if="item.post_type === 'Event'">-->
<!--        <q-card-section>-->
<!--          <div class="row q-mb-sm">-->
<!--            <q-item-section>-->
<!--              <q-item-label class="q-pr-md kmp-time">-->
<!--                {{ post_date(item.updated_at) }}-->
<!--              </q-item-label>-->
<!--            </q-item-section>-->
<!--          </div>-->

<!--          <div class="kmp-post-text-title q-mb-sm">-->
<!--            {{ item.title }}-->
<!--          </div>-->

<!--          <div class="row q-gutter-sm q-mb-sm">-->
<!--            <q-item class="q-pa-none kmp-file-item" style="width: 13%;background-color: #dedede;">-->
<!--              <q-img v-if="item.event.picture" style="border-radius: 6px;"-->
<!--                     :src="'./api' + item.event.picture"-->
<!--                     fit="fill"-->
<!--              />-->
<!--            </q-item>-->
<!--            <div class="column justify-between q-ml-md">-->
<!--              <div class="col">-->
<!--                <div class="row">-->
<!--                                      <span class="q-pr-xs" style="margin-top: -2px">-->
<!--                                        <q-icon name="event" size="16px" style="" />-->
<!--                                      </span>-->
<!--                  <span>-->
<!--                                        {{ parseDate(item.event.start_date, 'dddd, DD MMM YYYY') }} - {{ parseDate(item.event.end_date, 'dddd, DD MMM YYYY') }}-->
<!--                                      </span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col">-->
<!--                <div class="row q-mt-xs">-->
<!--                                      <span class="q-pr-xs" style="margin-top: -2px">-->
<!--                                        <q-icon name="schedule" size="16px" style="" />-->
<!--                                      </span>-->
<!--                  <span>-->
<!--                                        {{ `${parseTime(item.event.start_time)} - ${parseTime(item.event.end_time)}` }} (GMT+7)-->
<!--                                      </span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="row q-mb-sm kmp-time">-->
<!--                                <span class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'General'" name="public" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Direktorat'" name="domain" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'COP'" name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Project'" name="chat_bubble" class="check-icon" size="16px" style="" />-->
<!--                                  <q-icon v-show="item.post_channel.channel.channel_type === 'Hobby'" name="sports_esports" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span class="">-->
<!--                                  {{ item.post_channel.channel.short_name }}-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length">-->
<!--                                  &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;-->
<!--                                </span>-->
<!--            <span v-show="item.post_collaboration.length" class="q-pr-xs" style="margin-top: -2px">-->
<!--                                  <q-icon name="group_add" class="check-icon" size="16px" style="" />-->
<!--                                </span>-->
<!--            <span v-if="item.post_collaboration.length > 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).slice(0,1).join(', ') }} dan {{ item.post_collaboration.length - 1 }} rekan lainnya-->
<!--                                </span>-->
<!--            <span v-else-if="item.post_collaboration.length === 1" class="">-->
<!--                                  {{ item.post_collaboration.map(m => m.user.name).join(', ') }}-->
<!--                                </span>-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>

export default {
  name: 'AnalyticsListPopularPost',
  props: ['modelValue', 'data'],
  emits: ['update:modelValue'],
  computed: {
    dialog_model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    goTo(item) {
      const route = this.$router.resolve({
        name: 'channel-detail-post-detail',
        params: {
          id: item.channel_id,
          post_id: item.id
        }
      });

      window.open(route.href, '_blank');
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
    }
  },
  data() {
    return {
    };
  }
};
</script>
