<template>
  <div class="items-start kmp-sticky" style="position: -webkit-sticky;position: sticky;top: 146px">
    <PostLoading v-if="!data" is-detail="true"/>
    <q-card v-else="" class="my-card">
      <div v-if="data.post_type === 'Post' || data.post_type === 'Post Document' || data.post_type === 'Post Image' || data.post_type === 'Post Video'">
        <q-card-section>
          <div class="row">
            <q-item-section avatar style="min-width: 10px" class="q-pr-md">
              <Avatar size="xl" :picture="profile_picture ? profile_picture : ''" :name="profile_name"/>
            </q-item-section>
            <q-item-section>
              <div class="kmp-text-nama">
                {{ profile_name }} <span class="kmp-time q-ml-xs">{{ data.time }}</span>
              </div>
              <PostStatus :post_status="data.status" :channel="data.post_channel.channel.name"/>
            </q-item-section>
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense @click="closeDetail"/>
          </div>
        </q-card-section>
        <q-scroll-area :style="scroll_style">
          <q-card-section class="q-pt-none">
            <div class="kmp-post-text-title q-mb-xs">
              {{ data.title }}
            </div>
            <div class="text-content" style="white-space: pre-line;" v-html="data.scan.text"></div>
            <div v-if="data.scan.linkStatus" class="q-py-sm cursor-pointer" @click="openLinkTumbnail(data.scan.url)">
              <link-prevue apiUrl="./prevue/" :url="data.scan.url">
                <template slot="loading" style="width: 100%">
                  <div class="row justify-center q-my-md">
                    <q-spinner size="50px" color="primary"/>
                  </div>
                </template>
                <template slot-scope="props">
                  <q-card style="background-color: #EFF1F4">
                    <q-card-section v-if="props.img.length >0">
                      <q-card>
                        <q-video v-if="['youtu.be','www.youtube.com','youtube.com'].includes(data.scan.mainUrl)"
                                 :ratio="16/9"
                                 :src="`https://www.youtube.com/embed/${(data.scan.url.split('/')[3]).split('&')[0].replace('watch?v=','')}?rel=0`"
                        />
                        <q-img v-else="" :src="props.img[0]" fit="fill"/>
                      </q-card>
                    </q-card-section>
                    <q-card-section :class="props.img.length >0 ? 'q-pt-none' : ''">
                      <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{ props.title }}</div>
                      <div class="text-subtitle2" v-else="">{{ data.scan.mainUrl }}</div>
                      <div class="text-grey-7" style="line-break: anywhere;">{{props.url}}</div>
                    </q-card-section>
                  </q-card>
                </template>
              </link-prevue>
            </div>
            <div v-show="data.post_type === 'Post Image'" class="q-px-none q-mb-sm">
              <PostListMedia :list_data="data.post_file" :download="true"/>
            </div>
            <q-card v-show="data.post_type === 'Post Document'" v-for="(item1, index) in data.post_file" :key="index">
              <KnowledgeListFile v-if="item1.file !== null" :file="item1.file" :item="item1" :manage="false"
                                 :download="true"/>
            </q-card>
            <postView :data="data"/>
            <PostReaction
              class="q-mt-none"
              :reaction_list="reaction_list"
              :reaction_data="reaction_data"
              :replies_count="data.post_conversation.objConversation.length"
            />
            <!--              @onRepliesClick="handleSelectPost"-->
            <!--            <div class="col q-mt-md">-->
            <!--            <span-->
            <!--              class="q-mr-sm"-->
            <!--              v-for="(conversation, conversation_index) in data.post_conversation.post_conversation_uniq"-->
            <!--              :key="conversation_index">-->
            <!--              <Avatar-->
            <!--                size="md"-->
            <!--                :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"-->
            <!--                :name="conversation.user.name"-->
            <!--                @click="goToProfile(conversation.user.id)"-->
            <!--              />-->
            <!--            </span>-->
            <!--              <span class="kmp-font-sm">{{-->
            <!--                  data.post_conversation.objConversation.length-->
            <!--                }} Replies</span>-->
            <!--            </div>-->

            <q-separator v-if="data.post_conversation.objConversation.length > 0"/>
            <!--            <PostReplies class="q-mt-sm"-->
            <!--                         ref="replies"-->
            <!--                         :replies_data="data.post_conversation"-->
            <!--            />-->
            <!--            <q-separator class="q-mt-md" v-if="data.post_conversation.objConversation.length > 0"/>-->
            <PostConversation class="q-pt-md" :post_id="post_id" :data_conversation="data.post_conversation" @update_conversation="updateConversation"/>
          </q-card-section>
        </q-scroll-area>
      </div>
      <div v-if="data.post_type === 'Event'">
        <q-card-section>
          <div class="row">
            <q-item-section avatar style="min-width: 10px" class="q-pr-md">
              <Avatar size="xl" :picture="profile_picture ? profile_picture : ''" :name="profile_name"/>
            </q-item-section>
            <q-item-section>
              <div class="kmp-text-nama">
                {{ profile_name }} <span class="kmp-time q-ml-xs">{{ data.time }}</span>
              </div>
              <PostStatus :post_status="data.status" :channel="data.post_channel.channel.name"/>
            </q-item-section>
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense @click="closeDetail"/>
          </div>
        </q-card-section>
        <q-scroll-area :style="scroll_style">
          <q-card-section class="q-pt-none">
            <div class="q-mt-md q-mb-xs">
              <q-card class="my-card no-border" flat bordered>
                <EventHeader :picture="data.event.picture" :start_time="data.event.start_time" :end_time="data.event.end_time"
                             :end_date="data.event.end_date"/>
                <q-card-section style="padding:0px">
                  <div class="kmp-post-text-event-title q-mt-sm q-mb-xs">{{ data.title }}</div>
                  <div class="text-content q-mt-sm">
                    <q-icon name="event" class="check-icon q-mr-sm" size="14px" style=""/>
                    <span v-if="data.event.start_date === data.event.end_date">{{ parseDate(data.event.end_date, 'DD MMM YYYY') }}</span>
                    <span v-if="data.event.start_date !== data.event.end_date">{{
                        parseDate(data.event.start_date, 'DD MMM YYYY')
                      }} - {{ parseDate(data.event.end_date, 'DD MMM YYYY') }}</span>
                  </div>
                  <div class="text-content q-mt-sm"
                       v-if="data.event.start_time !== null && data.event.end_time !== null">
                    <q-icon name="access_time" class="check-icon q-mr-sm" size="14px" style=""/>
                    {{ `${parseTime(data.event.start_time)} - ${parseTime(data.event.end_time)}` }} WIB
                  </div>
                  <div class="text-content q-mt-sm" v-if="data.event.locations !== null">
                    <q-icon name="pin_drop" class="check-icon q-mr-sm" size="14px" style=""/>
                    {{ data.event.locations }}
                  </div>
                  <div class="text-content q-mt-sm" v-if="data.event.link !== null">
                    <q-icon name="link" class="check-icon q-mr-sm" size="14px" style=""/>
                    <a :href="data.event.link" target="_blank">{{ data.event.link }}</a>
                  </div>
                  <!-- <div class="text-channel q-my-md">
                    Created by {{ data.created_by_user.name }}
                  </div> -->
                  <div class="text-content">
                    <p style="white-space: pre-line;">{{data.description}}</p>
                    <!-- <div v-html="data.description"/> -->
                  </div>
                  <q-separator/>
                </q-card-section>
                <EventExpertise class="q-pt-md" :data="data.event.event_expertise"/>
                <!-- {{data.event.event_participant}} -->
                <q-card-section v-if="data.event.event_participant.length > 0"
                                @click="handleAttendees(data.event.event_participant, data.event.id, data.created_by)">
                  <div class="text-channel q-my-md">
                    <q-avatar
                      v-if="data.event.event_participant[0] && data.event.event_participant[0].user.profile_picture === null"
                      size="24px" color="primary" text-color="white" style="margin-left:-5px">
                      {{ data.event.event_participant[0].user.name.match(/\b(\w)/g).join('').toUpperCase() }}
                    </q-avatar>
                    <q-avatar
                      v-if="data.event.event_participant[0] && data.event.event_participant[0].user.profile_picture !== null"
                      size="24px" style="margin-left:-5px">
                      <img :src="getPic(data.event.event_participant[0].user.profile_picture)">
                    </q-avatar>
                    <q-avatar
                      v-if="data.event.event_participant[1] && data.event.event_participant[1].user.profile_picture === null"
                      size="24px" color="primary" text-color="white" style="margin-left:-5px">
                      {{ data.event.event_participant[1].user.name.match(/\b(\w)/g).join('').toUpperCase() }}
                    </q-avatar>
                    <q-avatar
                      v-if="data.event.event_participant[1] && data.event.event_participant[1].user.profile_picture !== null"
                      size="24px" style="margin-left:-5px">
                      <img :src="getPic(data.event.event_participant[1].user.profile_picture)">
                    </q-avatar>
                    <q-avatar
                      v-if="data.event.event_participant[2] && data.event.event_participant[2].user.profile_picture === null"
                      size="24px" color="primary" text-color="white" style="margin-left:-5px">
                      {{ data.event.event_participant[2].user.name.match(/\b(\w)/g).join('').toUpperCase() }}
                    </q-avatar>
                    <q-avatar
                      v-if="data.event.event_participant[2] && data.event.event_participant[2].user.profile_picture !== null"
                      size="24px" style="margin-left:-5px">
                      <img :src="getPic(data.event.event_participant[2].user.profile_picture)">
                    </q-avatar>
                    {{ data.event.event_participant[0].user.name }} <span
                    v-if="data.event.event_participant.length > 1">& {{ data.event.event_participant.length - 1 }} other attendees</span>
                  </div>
                  <q-separator/>
                </q-card-section>
              </q-card>
            </div>

            <PostReaction
              class="q-mt-none"
              :reaction_list="reaction_list"
              :reaction_data="reaction_data"
              :replies_count="data.post_conversation.objConversation.length"
            />
            <!--            <div class="col q-mt-md">-->
            <!--            <span-->
            <!--              class="q-mr-sm"-->
            <!--              v-for="(conversation, conversation_index) in data.post_conversation.post_conversation_uniq"-->
            <!--              :key="conversation_index">-->
            <!--              <Avatar-->
            <!--                size="md"-->
            <!--                :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"-->
            <!--                :name="conversation.user.name"-->
            <!--                @click="goToProfile(conversation.user.id)"-->
            <!--              />-->
            <!--            </span>-->
            <!--              <span class="kmp-font-sm">{{-->
            <!--                  data.post_conversation.objConversation.length-->
            <!--                }} Replies</span>-->
            <!--            </div>-->

            <q-separator v-if="data.post_conversation.objConversation.length > 0"/>
          <!--            <PostReplies class="q-mt-sm"-->
          <!--                         ref="replies"-->
          <!--                         :replies_data="data.post_conversation"-->
          <!--            />-->
          <!--            <q-separator class="q-mt-md" v-if="data.post_conversation.objConversation.length > 0"/>-->
            <PostConversation class="q-pt-md" :post_id="post_id" :data_conversation="data.post_conversation" @update_conversation="updateConversation"/>
          </q-card-section>
        </q-scroll-area>
      </div>
      <div v-if="data.post_type === 'Poll'">
        <q-card-section>
          <div class="row">
            <q-item-section avatar style="min-width: 10px" class="q-pr-md">
              <Avatar size="xl" :picture="profile_picture ? profile_picture : ''" :name="profile_name"/>
            </q-item-section>
            <q-item-section>
              <div class="kmp-text-nama">
                {{ profile_name }} <span class="kmp-time q-ml-xs">{{ data.time }}</span>
              </div>
              <PostStatus :post_status="data.status" :channel="data.post_channel.channel.name"/>
            </q-item-section>
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense @click="closeDetail"/>
          </div>
        </q-card-section>
        <q-scroll-area :style="scroll_style">
          <q-card-section class="q-pt-none">
            <div class="kmp-post-text-title q-mb-xs">
              {{ data.poll.question }}
            </div>
            <div class="poll-container">
              <div v-for="(column, index2) in pollColumns(data.poll.poll_choice)" :key="index2"
                   :class="pollColumns(data.poll.poll_choice).length === 2 ? 'poll-col' : 'poll-col-1'"
              >
                <q-list v-for="(opt, index) in column" :key="index" :class="opt.choice ? 'poll-choice' : ''">
                  <q-item tag="label" dense v-ripple
                          :class="data.poll_user_participant.includes(loginId) || data.poll_expired ? 'q-px-sm' : 'q-pa-none'"
                  >
                    <q-item-section v-show="!(data.poll_user_participant.includes(loginId) || data.poll_expired)" avatar style="min-width: unset;">
                      <q-radio dense v-model="poll_choice_id" :val="opt.value" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <div v-if="opt.picture" :class="data.poll_user_participant.includes(loginId) || data.poll_expired ? 'text-center' : ''">
                        <q-img :src="`${pathPicture + opt.picture}`"
                               spinner-color="white"
                               class="q-my-xs border rounded-borders"
                               style="height: 100px; max-width: 180px;"
                               @click="openLinkTumbnail(pathPicture + opt.picture)"
                        >
                          <div class="absolute-bottom text-subtitle1 text-center">
                            {{ opt.label }}
                          </div>
                        </q-img>
                        <div v-show="data.poll_user_participant.includes(loginId) || data.poll_expired"
                             class="text-center text-weight-bold">{{ opt.persentase }}%
                        </div>
                      </div>
                      <div v-else="">
                        <q-item-label style="overflow-wrap: anywhere;">
                          <div class="row items-center"
                               :class="pollColumns(data.poll_options).length === 2 ? 'poll_text_img' : ''">
                            <div class="text-content" v-html="opt.scan.linkStatus ? opt.scan.text : opt.label"></div>
                          </div>
                        </q-item-label>
                        <div v-show="pollColumns(data.poll_options).length === 2 && (data.poll_user_participant.includes(loginId) || data.poll_expired)" class="text-center text-weight-bold">{{ opt.persentase }}%</div>
                      </div>
                    </q-item-section>
                    <q-space/>
                    <q-item-section
                      v-show="pollColumns(data.poll_options).length === 1 && opt.picture === null && (data.poll_user_participant.includes(loginId) || data.poll_expired)"
                      side>
                      <div class="text-right text-weight-bold">{{ opt.persentase }}%</div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <div :hidden="data.poll_user_participant.includes(loginId) || data.poll_expired">
              <q-btn no-caps color="primary" class="q-mt-md" label="Submit" @click="handleSubmitPoll(poll_choice_id)"/>
            </div>
            <div class="q-mt-lg">
              <span :hidden="!data.poll_user_participant.includes(loginId)" class="text-vote-desc">
                {{ (data.poll_user_participant.includes(loginId) ? 'Terima kasih sudah mengikuti polling ini' : '') }}
              </span>
            </div>
            <q-separator />
            <span class="text-vote-desc q-mt-lg">
              Poll closed at {{
                data.poll.end_date_format
              }}</span>

            <PostReaction
              class="q-mt-none"
              :reaction_list="reaction_list"
              :reaction_data="reaction_data"
              :replies_count="data.post_conversation.objConversation.length"
            />
              <!--            <div class="col q-mt-md">-->
              <!--            <span-->
              <!--              class="q-mr-sm"-->
              <!--              v-for="(conversation, conversation_index) in data.post_conversation.post_conversation_uniq"-->
              <!--              :key="conversation_index">-->
              <!--              <Avatar-->
              <!--                size="md"-->
              <!--                :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"-->
              <!--                :name="conversation.user.name"-->
              <!--                @click="goToProfile(conversation.user.id)"-->
              <!--              />-->
              <!--            </span>-->
              <!--              <span class="kmp-font-sm">{{-->
              <!--                  data.post_conversation.objConversation.length-->
              <!--                }} Replies</span>-->
              <!--            </div>-->
              <!--            <PostReplies class="q-mt-sm"-->
              <!--                         ref="replies"-->
              <!--                         :replies_data="data.post_conversation"-->
              <!--            />-->
            <q-separator class="q-mt-md" v-if="data.post_conversation.objConversation.length > 0"/>
            <PostConversation class="q-pt-md" :post_id="post_id" :data_conversation="data.post_conversation" @update_conversation="updateConversation"/>
          </q-card-section>
        </q-scroll-area>
      </div>
    </q-card>

    <fixed-modal
      :show="modal_list_participant"
      :title="`Attendees - ${list_participant.length}`"
      @on-close="modal_list_participant = false"
    >
      <div class="col row justify-start q-gutter-sm q-mb-md" v-if="loginId === created_by_id">
        <q-btn outline color="primary" no-caps label="Export Attendees" @click="handleDownloadAttendees(event_id);"/>
      </div>
      <div v-if="list_participant.length > 5">
        <div :hidden="!hidden_participant">
          <span class="text-more cursor-pointer" @click="showParticipant">More</span>
          <div v-for="(item,   index) in list_participant.slice(Math.max(list_participant.length - 5, 1))" :key="index" class="q-gutter-sm items-center"
              :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'">
            <div :class="{ 'row bg-green-2 q-pa-xs items-center': item.rsvp === 'Yes',
                                'row bg-red-2 q-pa-xs items-center': item.rsvp === 'No',
                                'row bg-blue-2 q-pa-xs items-center': item.rsvp === 'Maybe'}">
              <q-avatar class="q-mr-sm" color="primary" text-color="white" size="30px">
                {{ item.name.match(/\b(\w)/g).join('').toUpperCase() }}
              </q-avatar>
              <div class="col">
                <div class="kmp-font-md kmp-font-bold flex">{{ item.name }}</div>
                <div class="kmp-font-md">{{ item.email }}</div>
              </div>
            </div>
          </div>
        </div>
        <div :hidden="hidden_participant">
          <span class="text-more cursor-pointer" @click="showParticipant">Less</span>
          <div v-for="(item,   index) in list_participant" :key="index" class="q-gutter-sm items-center"
              :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'">
            <div :class="{ 'row bg-green-2 q-pa-xs items-center': item.rsvp === 'Yes',
                                'row bg-red-2 q-pa-xs items-center': item.rsvp === 'No',
                                'row bg-blue-2 q-pa-xs items-center': item.rsvp === 'Maybe'}">
              <q-avatar class="q-mr-sm" color="primary" text-color="white" size="30px">
                {{ item.name.match(/\b(\w)/g).join('').toUpperCase() }}
              </q-avatar>
              <div class="col">
                <div class="kmp-font-md kmp-font-bold flex">{{ item.name }}</div>
                <div class="kmp-font-md">{{ item.email }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="(item,   index) in list_participant" :key="index" class="q-gutter-sm items-center"
            :class="index !== 0 ? 'q-mt-sm' : 'q-mt-none'">
          <div :class="{ 'row bg-green-2 q-pa-xs items-center': item.rsvp === 'Yes',
                              'row bg-red-2 q-pa-xs items-center': item.rsvp === 'No',
                              'row bg-blue-2 q-pa-xs items-center': item.rsvp === 'Maybe'}">
            <q-avatar class="q-mr-sm" color="primary" text-color="white" size="30px">
              {{ item.name.match(/\b(\w)/g).join('').toUpperCase() }}
            </q-avatar>
            <div class="col">
              <div class="kmp-font-md kmp-font-bold flex">{{ item.name }}</div>
              <div class="kmp-font-md">{{ item.email }}</div>
            </div>
          </div>
        </div>
      </div>
    </fixed-modal>
  </div>
</template>

<script>
import moment from 'moment';
import Avatar from 'components/common/Avatar';
import PostStatus from 'components/PostStatus';
import PostLoading from 'components/PostLoading';
import PostConversation from 'components/PostConversation';
import PostListMedia from 'components/post/PostListMedia';
import KnowledgeListFile from 'components/KnowledgeListFile';
import EventHeader from 'components/post/EventHeader';
import PostReaction from 'components/post/PostReaction';
// import PostReplies from 'components/post/PostReplies';
import EventExpertise from 'components/post/EventExpertise';
import PostView from 'components/post/PostView';
import { pollParticipantCreate, postDetail } from 'src/lib/api';
import FixedModal from 'components/common/FixedModal';
import { dateFormat, datePost, getLoginId, urlify } from 'src/lib/helper';
import LinkPrevue from 'link-prevue';
import { Notify } from 'quasar';
import _ from 'lodash';

export default {
  props: ['post_id', 'heightObserver', 'reaction_list'],
  components: {
    Avatar,
    KnowledgeListFile,
    LinkPrevue,
    PostConversation,
    PostListMedia,
    PostLoading,
    PostStatus,
    EventHeader,
    FixedModal,
    PostReaction,
    // PostReplies,
    EventExpertise,
    PostView
  },
  data() {
    return {
      loginId: getLoginId(),
      data: null,
      profile_picture: null,
      profile_name: null,
      path_default: process.env.QUASAR_API_URL,
      pathPicture: `${process.env.QUASAR_API_URL}uploads/files/pollChoice/`,
      poll_choice_id: null,
      scroll_style: {
        height: '645px',
        minHeight: '200px'
      },
      event_id: '',
      created_by_id: '',
      list_participant: '',
      modal_list_participant: false,
      reaction_data: {
        post_id: 0,
        current_member: [],
        counting: []
      },
      hidden_participant: true
    };
  },
  methods: {
    goToProfile(id) {
      this.$router.push({
        name: 'profile-detail',
        params: {
          id
        }
      });
    },
    getPic(data) {
      const pic = process.env.QUASAR_API_URL + data;
      return pic;
    },
    getDetailPost(id) {
      this.data = null;
      postDetail(id).then(res => {
        const response = res.data;
        this.data = res.data;
        this.data.post_conversation = {
          post_conversation_id: response.id,
          post_conversation_uniq: [...new Map(response.post_conversation.map(item => [item.created_by, item])).values()],
          objConversation: response.post_conversation,
          count_replies: response.post_conversation.length,
          hidden_conversation: true
        };
        this.reaction_data = {
          post_id: response.id,
          current_member: response.post_reaction.filter(x => x.created_by === getLoginId()),
          all_member: response.post_reaction,
          reaction_unique_id: [...new Set(response.post_reaction.map(item => item.reaction_id))],
          counting: response.post_reaction.map(({ reaction_id }) => reaction_id)
            .reduce((names, name) => {
              const count = names[name] || 0;
              names[name] = count + 1;
              return names;
            }, {})
        };
        this.data.time = datePost(response.created_at);
        this.profile_name = response.created_by_user.name;
        this.profile_picture = response.created_by_user.profile_picture
          ? this.path_default + response.created_by_user.profile_picture : null;
        if (response.post_type === 'Post' || response.post_type === 'Post Document' || response.post_type === 'Post Image' || response.post_type === 'Post Video') {
          this.data.scan = urlify(response.description);
        }
        if (response.post_type === 'Poll') {
          this.data.poll_user_participant = [];
          this.data.poll_options = response.poll.poll_choice.map(m => (
            { value: m.id, label: m.text, picture: m.picture }
          ));
          this.poll_choice_id = null;
          this.data.poll.end_date_format = dateFormat(response.poll.end_date);
          this.data.poll_expired = new Date() > new Date(response.poll.end_date);
          this.data.poll.poll_choice.forEach(e => {
            e.poll_participant.forEach(m1 => {
              this.data.poll_user_participant.push(m1.users_id);
            });
          });
          this.data.poll.poll_choice.forEach(f => {
            f.value = f.id;
            f.label = f.text;
            f.scan = urlify(f.label);
            f.persentase = this.data.poll_user_participant.length > 0
              ? ((f.poll_participant.length / this.data.poll_user_participant.length) * 100).toFixed() : 0;
            f.choice = _.find(f.poll_participant, f1 => f1.users_id === this.loginId) !== undefined;
          });
        }
        if (response.post_type === 'Event') {
          // console.log('EVENT');
        }
        if (response.post_type === 'Article') {
          this.closeDetail();
          // this.$emit('show_detail_article', true);
        }
      });
    },
    closeDetail() {
      this.$emit('remove_selected');
    },
    updateConversation() {
      this.getDetailPost(this.post_id);
      this.refreshReplies(this.post_id);
      // this.$emit('update_conversation');
    },
    openLinkTumbnail(url) {
      window.open(url, '_blank');
    },
    handleSubmitPoll(choice_id) {
      if (!choice_id) {
        Notify.create({
          message: 'Polling harus dipilih salah satu.',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        pollParticipantCreate({
          poll_choice_id: choice_id,
          users_id: this.loginId
        }).then(res => {
          if (res.message === 'OK') {
            Notify.create({
              message: 'Trimakasih sudah mengikuti polling ini.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            this.updateConversation();
          }
        });
      }
    },
    pollColumns(item) {
      const sortItem = _.orderBy(item, 'id', 'asc');
      const arrCek = item.map(v => {
        if (v.picture !== null) {
          return v.picture.split('.')[1] === 'mp4' ? 'Video' : 'Picture';
        }
        return 'Text';
      });
      const columns = [];
      const countCol = arrCek.includes('Picture') ? 2 : 1;
      const mid = Math.ceil(item.length / countCol);
      for (let col = 0; col < countCol; col++) {
        columns.push(sortItem.slice(col * mid, col * mid + mid));
      }
      return columns;
    },
    parseDate(date, formate = 'DD MMMM YYYY') {
      return moment(new Date(date)).format(formate);
    },
    parseTime(time) {
      if (time !== null) {
        const sTime = time.split(':');
        return `${sTime[0]}:${sTime[1]}`;
      }
      return '';
    },
    checkEvent(time, date, type) {
      let hasil = '';
      if (type === 'rsvp') {
        if (date >= this.today) {
          if (date === this.today && time !== null) {
            const elem = time.split(/[/ :]/);
            const sekarang = this.hours.split(/[/ :]/);
            const hours = elem[0];
            const minutes = elem[1];
            const total = (hours * 60) + parseInt(minutes, 0);
            const totalNow = (sekarang[0] * 60) + parseInt(sekarang[1], 0);
            const dif = total - totalNow;
            if (dif > 120) {
              hasil = 'soon';
            } else {
              hasil = 'past';
            }
          } else if (date === this.today && time === null) {
            hasil = 'past';
          } else {
            hasil = 'soon';
          }
        } else {
          hasil = 'past';
        }
      } else if (type === 'image') {
        if (date >= this.today) {
          if (date === this.today && time !== null && time <= this.hours) {
            hasil = 'past';
          } else if (date === this.today && time === null) {
            hasil = 'past';
          } else {
            hasil = 'soon';
          }
        } else {
          hasil = 'past';
        }
      }
      return hasil;
    },
    handleAttendees(value, id_event, id_creator) {
      this.event_id = id_event;
      this.created_by_id = id_creator;
      this.list_participant = [];
      this.modal_list_participant = true;
      value.forEach(c => {
        this.list_participant.push({
          id: c.users_id,
          name: c.user.name,
          email: c.user.email,
          rsvp: c.rsvp
        });
      });
    },
    handleDownloadAttendees(id) {
      window.open(`./api/api/export-attendees/${id}`);
    },
    refreshReplies(post_id) {
      console.log(post_id);
      this.$refs.replies.refreshCount(post_id);
    },
    showParticipant() {
      if (this.hidden_participant) { this.hidden_participant = !this.hidden_participant; } else {
        this.hidden_participant = true;
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        if (this.data) {
          this.data.access_data = {
            post_id: this.data.id,
            current_member: this.data.post_access.filter(x => x.created_by === getLoginId()),
            all_member: this.data.post_access,
            access_unique_id: [...new Set(this.data.post_access.map(item => item.created_by))],
            counting: this.data.post_access.map(({ created_by }) => created_by)
              .reduce((names, name) => {
                const count = names[name] || 0;
                names[name] = count + 1;
                return names;
              }, {})
          };
        }
      }
    },
    post_id: {
      immediate: true,
      handler(value) {
        this.getDetailPost(value);
      }
    },
    heightObserver: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value > 0) {
          this.scroll_style = {
            ...this.scroll_style,
            height: `${value - 170}px`
          };
        }
      }
    }
  }
};
</script>

<style>
.text-rep-count-here {
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 160% */

  text-align: center;

  /* Primary/600 */

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
}

.kmp-column-2 {
  columns: 100px 2;
}

.poll-container {
  display: flex;
  /*border: 1px solid;*/
}
.poll-col-1 {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.poll-col {
  margin-right: 10px;
  /*border: 1px solid;*/
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.poll_text_img {
  height: 100px;
  max-width: 180px;
}
.poll-choice {
  background-color: #94D5FD;
  border-radius: 8px;
}
</style>
