<template>
  <div>
    <PostLoading v-if="is_loading" :isDashboard="true"/>
    <div v-if="!is_loading">
      <q-card class="q-mb-lg kmp-post"
              :class="item.post_type === 'Notification' ? 'kmp-post-notif' : ''"
              v-for="(item, index) in dataPost" :key="index"
      >
      <div>
        <div v-if="item.post_type === 'Post'">
          <q-card-section>
            <div class="row kmp-time q-mb-sm">
              <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                <q-icon v-if="item.post_channel.channel.channel_type === 'General'" name="public" class="" size="1.5em"/>
              </q-item-section>
              <q-item-section class="text-capitalize">{{ item.post_channel.channel.short_name }} • {{ item.date }}</q-item-section>
            </div>
            <div class="row">
              <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                <Avatar size="xl" :picture="item.profile_picture_custom ? item.profile_picture_custom : ''"
                        :name="item.created_by_user.name"
                />
              </q-item-section>
              <q-item-section>
                <div class="kmp-text-nama">
                  {{ item.created_by_user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </div>
                <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
              </q-item-section>
              <q-item-section side v-if="item.created_by === user.id">
                <div class="col-3 text-right kmp-post-button">
                  <q-btn-group outline class="kmp-color-1 kmp-bg-color-4 kmp-rounded-2">
                    <q-btn size="11px" icon="more_horiz" class="kmp-post-button-group">
                      <q-menu auto-close content-class="kmp-rounded kmp-unelevated" >
                        <q-list style="min-width: 100px" dense class="kmp-rounded-2">
                          <q-item clickable>
                            <q-item-section class="" @click="handleEditPost(item);">Edit</q-item-section>
                          </q-item>
                          <q-item clickable><q-item-section class="">Delete</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-btn-group>
                </div>
              </q-item-section>
            </div>
            <div class="kmp-post-text-title q-mt-md q-mb-sm cursor-pointer"  @click="openUrl(item.id,item.post_channel.channel_id)">
              {{ item.title }}
            </div>
            <div class="kmp-post-description" style="white-space: pre-line;" v-if="item.scan.textLimit === null" v-html="item.scan.text"></div>
            <div v-else="">
              <div v-if="item.showMore === undefined || item.showMore">
                <div class="text-content" style="white-space: pre-line;" v-html="item.scan.textLimit"></div>
                <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3;" @click="handleDescription(index)">
                  Read more
                </div>
              </div>
              <div v-if="item.showMore !== undefined && !item.showMore">
                <div class="text-content" style="white-space: pre-line;" v-html="item.scan.text"></div>
                <!--              <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3" @click="handleDescription(index)">Read less</div>-->
              </div>
            </div>
            <div v-if="item.scan.linkStatus" class="q-py-sm cursor-pointer" @click="openLinkTumbnail(item.scan.url)">
              <link-prevue apiUrl="./prevue/" :url="item.scan.url">
                <template slot="loading" style="width: 100%">
                  <!-- set your custom loading -->
                  <div class="row justify-center q-my-md">
                    <q-spinner size="50px" color="primary"/>
                  </div>
                </template>
                <template slot-scope="props">
                  <q-card style="background-color: #EFF1F4">
                    <q-card-section v-if="props.img.length >0">
                      <q-card>
                        <q-video v-if="['youtu.be','www.youtube.com','youtube.com'].includes(item.scan.mainUrl)"
                                 :ratio="16/9"
                                 :src="`https://www.youtube.com/embed/${(item.scan.url.split('/')[3]).split('&')[0].replace('watch?v=','')}?rel=0`"
                        />
                        <q-img v-else="" :src="props.img[0]" fit="fill"/>
                      </q-card>
                    </q-card-section>
                    <q-card-section :class="props.img.length >0 ? 'q-pt-none' : ''">
                      <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{props.title}}</div>
                      <div class="text-subtitle2" v-else="">{{item.scan.mainUrl}}</div>
                      <div class="text-grey-7" style="line-break: anywhere;">{{props.url}}</div>
                    </q-card-section>
                  </q-card>
                </template>
              </link-prevue>
            </div>
            <div class="row" v-if="item.post_conversation_custom.objConversation.length > 0">
              <div class="col q-mt-sm">
                <span class="text-rep-count">{{ item.post_conversation_custom.objConversation.length }} Replies</span>
              </div>
            </div>
          </q-card-section>
        </div>
        <div v-if="item.post_type === 'Article'">
          <q-card-section>
            <div class="row kmp-time q-mb-sm">
              <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                <q-icon v-if="item.post_channel.channel.channel_type === 'General'" name="public" class="" size="1.5em"/>
              </q-item-section>
              <q-item-section class="text-capitalize">{{ item.post_channel.channel.short_name }} • {{ item.date }}</q-item-section>
            </div>
            <div class="row">
              <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                <Avatar size="xl" :picture="item.profile_picture_custom ? item.profile_picture_custom : ''"
                        :name="item.created_by_user.name"
                />
              </q-item-section>
              <q-item-section>
                <div class="kmp-text-nama">
                  {{ item.created_by_user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </div>
                <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
              </q-item-section>
              <q-item-section side v-if="item.created_by === user.id">
                <div class="col-3 text-right kmp-post-button">
                  <q-btn-group outline class="kmp-color-1 kmp-bg-color-4 kmp-rounded-2">
                    <q-btn size="11px" icon="more_horiz" class="kmp-post-button-group">
                      <q-menu auto-close content-class="kmp-rounded kmp-unelevated" >
                        <q-list style="min-width: 100px" dense class="kmp-rounded-2">
                          <q-item clickable>
                            <q-item-section class="" @click="handleEditPost(item);">Edit</q-item-section>
                          </q-item>
                          <q-item clickable><q-item-section class="">Delete</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-btn-group>
                </div>
              </q-item-section>
            </div>
            <!-- <div class="kmp-post-text-title q-mt-lg q-mb-sm">
              {{ item.title }}
            </div> -->
            <div v-html="item.cover" class="q-mt-md" />
            <div class="kmp-post-text-title q-mt-md cursor-pointer" @click="handleShowArticle(item.id);">
              {{ item.title }}
            </div>
            <div class="kmp-post-description">
              <p style="white-space: pre-line;">{{item.description}}</p>
            </div>
            <div class="text-more kmp-font-small cursor-pointer" @click="handleShowArticle(item.id);">
              Read More
            </div>
            <!--            <q-card class="my-card q-mt-sm q-mb-sm" flat bordered clickable @click="handleShowArticle(item.id);">-->
            <!--              <q-scroll-area style="height: 300px;">-->
            <!--                <div class="kmp-post-description q-pa-md" v-html="item.article"></div>-->
            <!--              </q-scroll-area>-->
            <!--            </q-card>-->
            <q-card v-for="(item1, index) in item.post_file" :key="index">
              <KnowledgeListFile v-if="item1.file !== null" :file="item1.file" :item="item1" :manage="false" :download="true"/>
            </q-card>
            <div class="row" v-if="item.post_conversation_custom.objConversation.length > 0">
              <div class="col q-mt-sm">
                <span class="text-rep-count">{{ item.post_conversation_custom.objConversation.length }} Replies</span>
              </div>
            </div>
          </q-card-section>
        </div>
        <div v-if="item.post_type === 'Post Document'">
          <q-card-section>
            <div class="row kmp-time q-mb-sm">
              <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                <q-icon v-if="item.post_channel.channel.channel_type === 'General'" name="public" class="" size="1.5em"/>
              </q-item-section>
              <q-item-section class="text-capitalize">{{ item.post_channel.channel.short_name }} • {{ item.date }}</q-item-section>
            </div>
            <div class="row">
              <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                <Avatar size="xl" :picture="item.profile_picture_custom ? item.profile_picture_custom : ''"
                        :name="item.created_by_user.name"
                />
              </q-item-section>
              <q-item-section>
                <div class="kmp-text-nama">
                  {{ item.created_by_user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </div>
                <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
              </q-item-section>
              <q-item-section side v-if="item.created_by === user.id">
                <div class="col-3 text-right kmp-post-button">
                  <q-btn-group outline class="kmp-color-1 kmp-bg-color-4 kmp-rounded-2">
                    <q-btn size="11px" icon="more_horiz" class="kmp-post-button-group">
                      <q-menu auto-close content-class="kmp-rounded kmp-unelevated" >
                        <q-list style="min-width: 100px" dense class="kmp-rounded-2">
                          <q-item clickable>
                            <q-item-section class="" @click="handleEditPost(item);">Edit</q-item-section>
                          </q-item>
                          <q-item clickable><q-item-section class="">Delete</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-btn-group>
                </div>
              </q-item-section>
            </div>
            <div class="kmp-post-text-title q-mt-md q-mb-sm cursor-pointer" @click="openUrl(item.id,item.post_channel.channel_id)">
              {{ item.title }}
            </div>
            <div class="kmp-post-description" style="white-space: pre-line;" v-if="item.scan.textLimit === null" v-html="item.scan.text"></div>
            <div v-else="">
              <div v-if="item.showMore === undefined || item.showMore">
                <div class="text-content" style="white-space: pre-line;" v-html="item.scan.textLimit"></div>
                <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3;" @click="handleDescription(index)">
                  Read more
                </div>
              </div>
              <div v-if="item.showMore !== undefined && !item.showMore">
                <div class="text-content" style="white-space: pre-line;" v-html="item.scan.text"></div>
                <!--              <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3" @click="handleDescription(index)">Read less</div>-->
              </div>
            </div>
            <div v-if="item.scan.linkStatus" class="q-py-sm cursor-pointer" @click="openLinkTumbnail(item.scan.url)">
              <link-prevue apiUrl="./prevue/" :url="item.scan.url">
                <template slot="loading" style="width: 100%">
                  <!-- set your custom loading -->
                  <div class="row justify-center q-my-md">
                    <q-spinner size="50px" color="primary"/>
                  </div>
                </template>
                <template slot-scope="props">
                  <q-card style="background-color: #EFF1F4">
                    <q-card-section v-if="props.img.length >0">
                      <q-card>
                        <q-video v-if="['youtu.be','www.youtube.com','youtube.com'].includes(item.scan.mainUrl)"
                                 :ratio="16/9"
                                 :src="`https://www.youtube.com/embed/${(item.scan.url.split('/')[3]).split('&')[0].replace('watch?v=','')}?rel=0`"
                        />
                        <q-img v-else="" :src="props.img[0]" fit="fill"/>
                      </q-card>
                    </q-card-section>
                    <q-card-section :class="props.img.length >0 ? 'q-pt-none' : ''">
                      <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{props.title}}</div>
                      <div class="text-subtitle2" v-else="">{{item.scan.mainUrl}}</div>
                      <div class="text-grey-7" style="line-break: anywhere;">{{props.url}}</div>
                    </q-card-section>
                  </q-card>
                </template>
              </link-prevue>
            </div>
            <q-card v-for="(item1, index) in item.post_file" :key="index">
              <KnowledgeListFile v-if="item1.file !== null" :file="item1.file" :item="item1" :manage="false" :download="true"/>
            </q-card>
            <div class="row" v-if="item.post_conversation_custom.objConversation.length > 0">
              <div class="col q-mt-sm">
                <span class="text-rep-count">{{ item.post_conversation_custom.objConversation.length }} Replies</span>
              </div>
            </div>
          </q-card-section>
        </div>
        <div hidden v-if="item.post_type === 'Post Video'">
          <q-card-section>
            <div class="row kmp-time q-mb-sm">
              <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                <q-icon v-if="item.post_channel.channel.channel_type === 'General'" name="public" class="" size="1.5em"/>
              </q-item-section>
              <q-item-section class="text-capitalize">{{ item.post_channel.channel.short_name }} • {{ item.date }}</q-item-section>
            </div>
            <div class="row">
              <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                <q-avatar size="36px" class="">
                  <img v-if="item.created_by_user.profile_picture !== null" :src="item.profile_picture_custom">
                  <q-avatar size="36px" color="primary" text-color="white" v-else="">
                    {{ item.created_by_user.name.match(/\b(\w)/g).join('').toUpperCase() }}
                  </q-avatar>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div class="kmp-text-nama">
                  {{ item.created_by_user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </div>
                <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
              </q-item-section>
              <q-item-section side v-if="item.created_by === user.id">
                <div class="col-3 text-right kmp-post-button">
                  <q-btn-group outline class="kmp-color-1 kmp-bg-color-4 kmp-rounded-2">
                    <q-btn size="11px" icon="more_horiz" class="kmp-post-button-group">
                      <q-menu auto-close content-class="kmp-rounded kmp-unelevated" >
                        <q-list style="min-width: 100px" dense class="kmp-rounded-2">
                          <q-item clickable>
                            <q-item-section class="" @click="handleEditPost(item);">Edit</q-item-section>
                          </q-item>
                          <q-item clickable><q-item-section class="">Delete</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-btn-group>
                </div>
              </q-item-section>
            </div>
            <div class="kmp-post-text-title q-mt-lg q-mb-sm cursor-pointer" @click="openUrl(item.id,item.post_channel.channel_id)">
              {{ item.title }}
            </div>
            <div class="kmp-post-description" v-html="item.scan.text"></div>
            <div v-if="item.scan.linkStatus" class="q-py-sm cursor-pointer" @click="openLinkTumbnail(item.scan.url)">
              <link-prevue apiUrl="./prevue/" :url="item.scan.url">
                <template slot="loading" style="width: 100%">
                  <!-- set your custom loading -->
                  <div class="row justify-center q-my-md">
                    <q-spinner size="50px" color="primary"/>
                  </div>
                </template>
                <template slot-scope="props">
                  <q-card style="background-color: #EFF1F4">
                    <q-card-section v-if="props.img.length >0">
                      <q-card>
                        <q-video v-if="['youtu.be','www.youtube.com','youtube.com'].includes(item.scan.mainUrl)"
                                 :ratio="16/9"
                                 :src="`https://www.youtube.com/embed/${(item.scan.url.split('/')[3]).split('&')[0].replace('watch?v=','')}?rel=0`"
                        />
                        <q-img v-else="" :src="props.img[0]" fit="fill"/>
                      </q-card>
                    </q-card-section>
                    <q-card-section :class="props.img.length >0 ? 'q-pt-none' : ''">
                      <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{props.title}}</div>
                      <div class="text-subtitle2" v-else="">{{item.scan.mainUrl}}</div>
                      <div class="text-url text-grey-7">{{props.url}}</div>
                    </q-card-section>
                  </q-card>
                </template>
              </link-prevue>
            </div>
            <div class="row" v-if="item.post_conversation_custom.objConversation.length > 0">
              <div class="col q-mt-sm">
                <span class="text-rep-count">{{ item.post_conversation_custom.objConversation.length }} Replies</span>
              </div>
            </div>
          </q-card-section>
        </div>
        <div v-if="item.post_type === 'Post Image'">
          <q-card-section>
            <div class="row kmp-time q-mb-sm">
              <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                <q-icon v-if="item.post_channel.channel.channel_type === 'General'" name="public" class="" size="1.5em"/>
              </q-item-section>
              <q-item-section class="text-capitalize">{{ item.post_channel.channel.short_name }} • {{ item.date }}</q-item-section>
            </div>
            <div class="row">
              <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                <Avatar size="xl" :picture="item.profile_picture_custom ? item.profile_picture_custom : ''"
                        :name="item.created_by_user.name"
                />
              </q-item-section>
              <q-item-section>
                <div class="kmp-text-nama">
                  {{ item.created_by_user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </div>
                <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
              </q-item-section>
              <q-item-section side v-if="item.created_by === user.id">
                <div class="col-3 text-right kmp-post-button">
                  <q-btn-group outline class="kmp-color-1 kmp-bg-color-4 kmp-rounded-2">
                    <q-btn size="11px" icon="more_horiz" class="kmp-post-button-group">
                      <q-menu auto-close content-class="kmp-rounded kmp-unelevated" >
                        <q-list style="min-width: 100px" dense class="kmp-rounded-2">
                          <q-item clickable>
                            <q-item-section class="" @click="handleEditPost(item);">Edit</q-item-section>
                          </q-item>
                          <q-item clickable><q-item-section class="">Delete</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-btn-group>
                </div>
              </q-item-section>
            </div>
            <div class="kmp-post-text-title q-mt-md q-mb-sm cursor-pointer" @click="openUrl(item.id,item.post_channel.channel_id)">
              {{ item.title }}
            </div>
            <div class="kmp-post-description" style="white-space: pre-line;" v-if="item.scan.textLimit === null" v-html="item.scan.text"></div>
            <div v-else="">
              <div v-if="item.showMore === undefined || item.showMore">
                <div class="text-content" style="white-space: pre-line;" v-html="item.scan.textLimit"></div>
                <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3;" @click="handleDescription(index)">
                  Read more
                </div>
              </div>
              <div v-if="item.showMore !== undefined && !item.showMore">
                <div class="text-content" style="white-space: pre-line;" v-html="item.scan.text"></div>
                <!--              <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3" @click="handleDescription(index)">Read less</div>-->
              </div>
            </div>
            <div v-if="item.scan.linkStatus" class="q-py-sm cursor-pointer" @click="openLinkTumbnail(item.scan.url)">
              <link-prevue apiUrl="./prevue/" :url="item.scan.url">
                <template slot="loading" style="width: 100%">
                  <!-- set your custom loading -->
                  <div class="row justify-center q-my-md">
                    <q-spinner size="50px" color="primary"/>
                  </div>
                </template>
                <template slot-scope="props">
                  <q-card style="background-color: #EFF1F4">
                    <q-card-section v-if="props.img.length >0">
                      <q-card>
                        <q-video v-if="['youtu.be','www.youtube.com','youtube.com'].includes(item.scan.mainUrl)"
                                 :ratio="16/9"
                                 :src="`https://www.youtube.com/embed/${(item.scan.url.split('/')[3]).split('&')[0].replace('watch?v=','')}?rel=0`"
                        />
                        <q-img v-else="" :src="props.img[0]" fit="fill"/>
                      </q-card>
                    </q-card-section>
                    <q-card-section :class="props.img.length >0 ? 'q-pt-none' : ''">
                      <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{props.title}}</div>
                      <div class="text-subtitle2" v-else="">{{item.scan.mainUrl}}</div>
                      <div class="text-grey-7" style="line-break: anywhere;">{{props.url}}</div>
                    </q-card-section>
                  </q-card>
                </template>
              </link-prevue>
            </div>
            <div class="q-px-none q-pt-sm">
              <PostListMedia :list_data="item.post_file" :download="true"/>
            </div>
            <div class="row" v-if="item.post_conversation_custom.objConversation.length > 0">
              <div class="col q-mt-sm">
                <span class="text-rep-count">{{ item.post_conversation_custom.objConversation.length }} Replies</span>
              </div>
            </div>
          </q-card-section>
        </div>
        <div v-if="item.post_type === 'Poll'">
          <q-card-section>
            <div class="row kmp-time q-mb-sm">
              <q-item-section avatar style="min-width: 10px" class="q-pr-sm">
                <q-icon v-if="item.post_channel.channel.channel_type === 'General'" name="public" class="" size="1.5em"/>
              </q-item-section>
              <q-item-section class="text-capitalize">{{ item.post_channel.channel.short_name }} • {{ item.date }}</q-item-section>
            </div>
            <div class="row">
              <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                <Avatar size="xl" :picture="item.profile_picture_custom ? item.profile_picture_custom : ''"
                        :name="item.created_by_user.name"
                />
              </q-item-section>
              <q-item-section>
                <div class="kmp-text-nama">
                  {{ item.created_by_user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </div>
                <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
              </q-item-section>
            </div>
            <div class="kmp-font-md kmp-font-bold q-mt-md q-mb-sm cursor-pointer" @click="openUrl(item.id,item.post_channel.channel_id)">
              {{ item.poll.question }}
            </div>
            <div class="poll-container">
              <div v-for="(column, index2) in pollColumns(item.poll.poll_choice)" :key="index2"
                   :class="pollColumns(item.poll.poll_choice).length === 2 ? 'poll-col' : 'poll-col-1'"
              >
                <q-list v-for="(opt, index) in column" :key="index" :class="opt.choice ? 'poll-choice' : ''">
                  <q-item tag="label" dense v-ripple
                          :class="item.poll_user_participant.includes(loginId) || item.poll_expired ? 'q-px-sm' : 'q-pa-none'"
                  >
                    <q-item-section v-show="!(item.poll_user_participant.includes(loginId) || item.poll_expired)" avatar style="min-width: unset;">
                      <q-radio dense v-model="poll_choice_id" :val="opt.value" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <div v-if="opt.picture" :class="item.poll_user_participant.includes(loginId) || item.poll_expired ? 'text-center' : ''">
                        <q-img :src="`${pathPollPicture + opt.picture}`"
                               spinner-color="white"
                               class="q-my-xs border rounded-borders"
                               style="height: 100px; max-width: 180px;"
                               @click="openLinkTumbnail(pathPollPicture + opt.picture)"
                        >
                          <div class="absolute-bottom text-subtitle1 text-center">
                            {{ opt.label }}
                          </div>
                        </q-img>
                        <div v-show="item.poll_user_participant.includes(loginId) || item.poll_expired" class="text-center text-weight-bold">{{ opt.persentase }}%</div>
                      </div>
                      <div hidden
                           v-else-if="opt.picture"
                           class="q-my-xs border rounded-borders"
                      >
                        <iframe :src="`./player?id=pollChoice&src=${opt.picture}&type=video`"
                                style="border: none; overflow: hidden; width: 300px; max-width: 300px; height: 173px;"
                                allowfullscreen
                        />
                        <div class="text-content" v-html="opt.scan.linkStatus ? opt.scan.text : opt.label"></div>
                      </div>
                      <div v-else="">
                        <q-item-label style="overflow-wrap: anywhere;">
                          <div class="row items-center" :class="pollColumns(item.poll_options).length === 2 ? 'poll_text_img' : ''">
                            <div class="text-content" v-html="opt.scan.linkStatus ? opt.scan.text : opt.label"></div>
                          </div>
                        </q-item-label>
                        <div v-show="pollColumns(item.poll_options).length === 2 && (item.poll_user_participant.includes(loginId) || item.poll_expired)" class="text-center text-weight-bold">{{ opt.persentase }}%</div>
                      </div>
                    </q-item-section>
                    <q-space/>
                    <q-item-section v-show="pollColumns(item.poll_options).length === 1 && opt.picture === null && (item.poll_user_participant.includes(loginId) || item.poll_expired)" side>
                      <div class="text-right text-weight-bold">{{ opt.persentase }}%</div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <div :hidden="item.poll_user_participant.includes(loginId) || item.poll_expired">
              <q-btn no-caps color="primary" class="q-mt-md" label="Submit" @click="handleSubmitPoll(poll_choice_id)"/>
            </div>
          </q-card-section>
          <span :hidden="!item.poll_user_participant.includes(loginId)" class="text-vote-desc q-ml-md q-mt-lg">
          {{ (item.poll_user_participant.includes(loginId) ? 'Terima kasih sudah mengikuti polling ini' : '') }}
          </span>
          <q-separator class="q-mx-md"></q-separator>
          <span class="text-vote-desc q-ml-md q-mt-lg">
            Poll closed at {{
              item.poll.end_date_format
            }}</span>
          <q-card-section class="q-pt-none">
            <div class="row" v-if="item.post_conversation_custom.objConversation.length > 0">
              <div class="col q-mt-sm">
                <span class="text-rep-count">{{ item.post_conversation_custom.objConversation.length }} Replies</span>
              </div>
            </div>
          </q-card-section>
        </div>
        <div v-if="item.post_type === 'KMAP'">
          <q-card-section>
            <div class="row">
              <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                <Avatar size="xl" :picture="item.profile_picture_custom ? item.profile_picture_custom : ''"
                        :name="item.created_by_user.name"
                />
              </q-item-section>
              <q-item-section>
                <div class="kmp-text-nama">
                  {{ item.created_by_user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </div>
                <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
              </q-item-section>
            </div>
            <q-card class="my-card q-mt-sm" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-3 flex flex-center">
                  <q-img
                    class="rounded-borders"
                    src="https://cdn.quasar.dev/img/parallax2.jpg"
                  />
                </q-card-section>
                <q-card-section class="q-pt-xs" style="padding-left:0px">
                  <div class="text-title q-mt-sm q-mb-xs">Dokumentasi Kegiatan Direktorat ACLC</div>
                  <div class="kmp-post-description">
                    Halaman ini berisikan tentang semua dokumentasi kegiatan dari Direktorat ACLC
                  </div>
                  <div class="text-desc">
                    Has been updated by Hafidz Noor Fauzi • 09:15
                  </div>
                  <div class="text-more">
                    See More
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
            <div class="row" v-if="item.post_conversation_custom.objConversation.length > 0">
              <div class="col q-mt-sm">
                <span class="text-rep-count">{{ item.post_conversation_custom.objConversation.length }} Replies</span>
              </div>
            </div>
          </q-card-section>
        </div>
        <div v-if="item.post_type === 'Event'">
          <q-card-section>
            <div class="row">
              <q-item-section avatar style="min-width: 10px" class="q-pr-md">
                <Avatar size="xl" :picture="item.profile_picture_custom ? item.profile_picture_custom : ''"
                        :name="item.created_by_user.name"
                />
              </q-item-section>
              <q-item-section>
                <div class="kmp-text-nama">
                  {{ item.created_by_user.name }} <span class="kmp-time q-ml-xs">{{ item.time }}</span>
                </div>
                <PostStatus :post_status="item.status" :channel="item.post_channel ? item.post_channel.channel.short_name : null" />
              </q-item-section>
              <q-item-section side v-if="item.created_by === user.id">
                <div class="col-3 text-right kmp-post-button">
                  <q-btn-group outline class="kmp-color-1 kmp-bg-color-4 kmp-rounded-2">
                    <q-btn size="11px" icon="more_horiz" class="kmp-post-button-group">
                      <q-menu auto-close content-class="kmp-rounded kmp-unelevated" >
                        <q-list style="min-width: 100px" dense class="kmp-rounded-2">
                          <q-item clickable>
                            <q-item-section class="" @click="handleEditPost(item);">Edit</q-item-section>
                          </q-item>
                          <q-item clickable><q-item-section class="">Delete</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-btn-group>
                </div>
              </q-item-section>
            </div>
            <q-card class="my-card q-mt-sm " bordered>
              <q-card-section class="q-pa-none">
                <div class="q-pa-md row items-start q-gutter-md">
                  <q-card class="my-card no-border" flat width="100%">
                    <div v-if="item.event.picture !== null">
                      <q-img :src="getPic(item.event.picture)" style="max-width: 100%" :class="checkEvent(item.event.start_time, item.event.end_date, 'image') === 'past' ? 'img-gray' : ''" />
                    </div>
                    <q-card-section style="padding:0px">
                      <div class="kmp-post-text-event-title q-mt-sm q-mb-xs cursor-pointer" @click="openUrl(item.id,item.post_channel.channel_id)">{{ item.title }}</div>
                      <div class="text-content q-mt-sm">
                        <q-icon name="event" class="check-icon q-mr-sm" size="14px" style=""/>
                        <span>{{ parseDate(item.event.start_date, 'DD MMM YYYY') }} - {{ parseDate(item.event.end_date, 'DD MMM YYYY') }}</span>
                      </div>
                      <div class="text-content q-mt-sm" v-if="item.event.start_time !== null && item.event.end_time !== null">
                        <q-icon name="access_time" class="check-icon q-mr-sm" size="14px" style=""/>
                        {{ `${parseTime(item.event.start_time)} - ${parseTime(item.event.end_time)}` }} WIB
                      </div>
                      <div class="text-content q-mt-sm" v-if="item.event.locations !== null">
                        <q-icon name="pin_drop" class="check-icon q-mr-sm" size="14px" style=""/>
                        {{item.event.locations}}
                      </div>
                      <div class="text-content q-mt-sm" v-if="item.event.link !== null">
                        <q-icon name="link" class="check-icon q-mr-sm" size="14px" style=""/>
                        <a :href="item.event.link" target="_blank" style="word-wrap: break-word; white-space: normal;">{{ item.event.link }}</a>
                      </div>
                      <div class="kmp-post-description q-mt-sm" style="white-space: pre-line;" v-if="item.scan.textLimit === null" v-html="item.scan.text"></div>
                      <div v-else="">
                        <div v-if="item.showMore === undefined || item.showMore">
                          <div class="text-content q-mt-sm" style="white-space: pre-line;" v-html="item.scan.textLimit"></div>
                          <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3;" @click="handleDescription(index)">
                            Read more
                          </div>
                        </div>
                        <div v-if="item.showMore !== undefined && !item.showMore">
                          <div class="text-content q-mt-sm" style="white-space: pre-line;" v-html="item.scan.text"></div>
                          <div class="text-weight-bold cursor-pointer" style="color: #2C8ED3" @click="handleDescription(index)">Read less</div>
                        </div>
                      </div>
                      <!-- <div class="text-channel q-my-md">
                        Created by {{item.created_by_user.name}}
                      </div> -->
                    </q-card-section>
                    <EventExpertise class="q-pt-md" :data="item.event.event_expertise"/>
                    <EventRsvp :is_rsvp="item.event.is_rsvp"
                             :start_time="item.event.start_time"
                             :start_date="item.event.start_date"
                             :participant="item.event.event_participant"
                             :participant_no="item.event.event_participant_no"
                             :id="item.event.id"
                             :loginId="loginId"
                             @update_post="updatePost()"/>
                  </q-card>
                </div>
              </q-card-section>
            </q-card>
            <div class="row" v-if="item.post_conversation_custom.objConversation.length > 0">
              <div class="col q-mt-sm">
                <span class="text-rep-count">{{ item.post_conversation_custom.objConversation.length }} Replies</span>
              </div>
            </div>
          </q-card-section>
        </div>
      </div>
      </q-card>

    </div>
    <PostEdit ref="edit" :data_post="postSelected" :heightObserver="heightObserver" @update_post="updatePost()" :channel="data_channel"/>

    <fixed-modal
      :show="modal_rsvp"
      title="Change RSVP"
      @on-close="modal_rsvp = false"
    >
      <q-card-section class="q-pt-none">
        <div class="text-neutral">RSVP</div>
        <q-select
          v-model="rsvp_answer"
          :options="['Yes','No', 'Maybe']"
          outlined
          dense
        >
        </q-select>
      </q-card-section>
      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated @click="modal_rsvp = false">Cancel</q-btn>
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated
                  @click='handleRsvp(rsvp_answer,event_id);' :disable="rsvp_answer ===  ''"/>
        </q-card-actions>
      </template>
    </fixed-modal>
  </div>
</template>

<script>
import Avatar from 'components/common/Avatar';
import moment from 'moment';
import { Notify, format } from 'quasar';
import { required } from 'vuelidate/lib/validators';
// import { get } from 'src/lib/HttpHelper';
import { dateCustom1, dateFormat, timeCustom1, urlify, getLoginId } from 'src/lib/helper';
import { eventAttendees, pollParticipantCreate } from 'src/lib/api';
import FixedModal from 'components/common/FixedModal';
import PostLoading from 'components/PostLoading';
import PostStatus from 'components/PostStatus';
import KnowledgeListFile from 'components/KnowledgeListFile';
import LinkPrevue from 'link-prevue';
import PostListMedia from 'components/post/PostListMedia';
import EventRsvp from 'components/post/EventRsvp';
import EventExpertise from 'components/post/EventExpertise';
import PostEdit from 'components/post/PostEdit';
import _ from 'lodash';
import bus from 'components/common/EventBus';

const data_dummy = [
  {
    title: '',
    subtitle: '',
    icon: '',
    avatar: '',
    level_icon: '',
    level_title: '',
    level_point: ''
  }
];

export default {
  props: ['is_data', 'today', 'hours', 'user'],
  components: { Avatar, PostLoading, PostStatus, KnowledgeListFile, LinkPrevue, PostListMedia, FixedModal, EventRsvp, EventExpertise, PostEdit },
  data () {
    return {
      leaderboard: {
        title: 'Member',
        data: data_dummy
      },
      answer: 'Jawa',
      answerBool: '',
      group: '',
      options: [
        { label: 'Java', value: 'Java', selected: false },
        { label: 'Jawa', value: 'Jawa', selected: false },
        { label: 'Delphi', value: 'Delphi', selected: false },
        { label: 'Cobol', value: 'Cobol', selected: false }
      ],
      formatQuasar: format,
      is_loading: true,
      dataPost: [],
      loginId: getLoginId(),
      modal_rsvp: false,
      rsvp_answer: '',
      poll_choice_id: null,
      pathPollPicture: `${process.env.QUASAR_API_URL}uploads/files/pollChoice/`,
      postSelected: null,
      heightObserver: 0,
      data_channel: {}
    };
  },
  validations: {
    group: {
      required
    }
  },
  methods: {
    hendleSave() {
      if (this.$v.$invalid) {
        Notify.create({
          message: 'Please choice one!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        this.options.forEach(f => {
          if (f.value === this.group) {
            f.selected = true;
          } else {
            f.selected = false;
          }
        });
        const choice = this.options.filter(f => { return f.selected === true; });
        if (choice[0].value === this.answer) {
          this.answerBool = true;
        } else {
          this.answerBool = false;
        }
        Notify.create({
          message: 'Thank to join this Quiz!',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
      }
    },
    hendleNext() {
      if (this.$v.$invalid) {
        Notify.create({
          message: 'Please choice one!',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
      } else {
        Notify.create({
          message: 'Let\'s get into the next question',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
      }
    },
    handleEditPost(item) {
      this.data_channel = item.post_channel.channel;
      this.postSelected = item;
      if (item.post_type === 'Article') {
        this.$refs.edit.openDialog('edit_article');
        setTimeout(() => {
          this.$refs.edit.getDetailPost(`${item.id}`, `${item.post_type}`);
        }, 1000);
      }
      if (item.post_type === 'Post' || item.post_type === 'Post Document' || item.post_type === 'Post Image' || item.post_type === 'Post Video') {
        this.$refs.edit.openDialog('edit_posts');
        setTimeout(() => {
          this.$refs.edit.getDetailPost(`${item.id}`, `${item.post_type}`);
        }, 1000);
      }
      if (item.post_type === 'Event') {
        this.$refs.edit.openDialog('edit_event');
      }
      if (item.post_type === 'Poll') {
        this.$refs.edit.openDialog('edit_poll');
        setTimeout(() => {
          this.$refs.edit.getDetailPost(`${item.id}`, `${item.post_type}`);
        }, 1000);
      }
    },
    openDialog(content_type, content) {
      if (content_type === 'article') {
        this.article_view = true;
        this.selected_post = content;
      }
    },
    getPostGeneral(data) {
      data.forEach(v => {
        v.cover = '';
        if (v.article !== '' && v.article !== null) {
          const idxStart = v.article.indexOf('<img');
          const idxEnd = v.article.indexOf('>', v.article.indexOf('<img'));
          if (idxStart > -1 && idxEnd > -1) {
            v.cover = v.article.substring(idxStart, idxEnd + 1);
          }
        }
        v.date = dateCustom1(v.created_at);
        v.time = timeCustom1(v.created_at);
        v.profile_picture_custom = v.created_by_user.profile_picture ? process.env.QUASAR_API_URL + v.created_by_user.profile_picture : null;
        v.post_conversation_custom = {
          post_conversation_id: v.id,
          objConversation: v.post_conversation,
          hidden_conversation: true
        };
        if (v.post_type === 'Poll') {
          v.poll_user_participant = [];
          v.poll_options = v.poll.poll_choice.map(m => (
            { value: m.id, label: m.text, picture: m.picture }
          ));
          v.poll_choice_id = null;
          v.poll.end_date_format = dateFormat(v.poll.end_date);
          v.poll_expired = new Date() > new Date(v.poll.end_date);
          v.poll.poll_choice.forEach(e => { e.poll_participant.forEach(m1 => v.poll_user_participant.push(m1.users_id)); });
          v.poll.poll_choice.forEach(f => {
            f.value = f.id;
            f.label = f.text;
            f.scan = urlify(f.label);
            f.persentase = v.poll_user_participant.length > 0
              ? ((f.poll_participant.length / v.poll_user_participant.length) * 100).toFixed() : 0;
            f.choice = _.find(f.poll_participant, f1 => f1.users_id === this.loginId) !== undefined;
          });
        }
        if (v.post_type === 'Post' || v.post_type === 'Post Document' || v.post_type === 'Post Image' || v.post_type === 'Post Video' || v.post_type === 'Event') {
          v.scan = urlify(v.description);
        }
        this.dataPost.push(v);
      });
      this.is_loading = false;
    },
    openLinkTumbnail(url) {
      window.open(url, '_blank');
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
    getPic(data) {
      const pic = process.env.QUASAR_API_URL + data;
      return pic;
    },
    changeRSVP(id, rsvp, time, date) {
      const state = this.checkEvent(time, date, 'rsvp');
      // console.log(state);
      if (state === 'soon') {
        this.rsvp_answer = rsvp;
        this.event_id = id;
        this.modal_rsvp = true;
      }
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
    checkRsvp(value, no = null) {
      const list = [];
      const listno = [];
      let dataAnswer = '';
      value.forEach(f => {
        if (f.users_id === this.loginId) {
          dataAnswer = f.rsvp;
        }
        list.push(f.users_id);
      });
      if (list.includes(this.loginId)) {
        return dataAnswer;
      }
      if (no !== null) {
        no.forEach(f => {
          if (f.users_id === this.loginId) {
            dataAnswer = f.rsvp;
          }
          listno.push(f.users_id);
        });
        if (listno.includes(this.loginId)) {
          return dataAnswer;
        }
      }
      return dataAnswer;
    },
    handleRsvp(dataRsvp, id) {
      this.modal_rsvp = false;
      eventAttendees({
        event_id: id,
        rsvp: dataRsvp,
        users_id: this.loginId
      }).then(res => {
        if (res.message === 'OK') {
          Notify.create({
            message: 'Thank you for your response.',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          setTimeout(() => {
            this.$emit('update_post');
          }, 500);
        }
      });
    },
    pollColumns (item) {
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
            setTimeout(() => {
              this.$emit('update_post');
            }, 500);
          }
        });
      }
    },
    openUrl(post, channel) {
      this.$router.push({
        name: 'channel-detail-post-detail',
        params: {
          id: channel,
          post_id: post
        }
      });
    },
    updatePost() {
      this.$emit('update_post');
    },
    handleDescription(idx) {
      const arraySelected = this.dataPost[idx];
      arraySelected.showMore = arraySelected.showMore === undefined ? false : !arraySelected.showMore;
      this.$set(this.dataPost, idx, arraySelected);
    },
    handleShowArticle(id) {
      bus.$emit('article_selected', id);
    }
  },
  mounted() {
  },
  watch: {
    is_data: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined && _.size(value) > 0) {
          this.getPostGeneral(value);
        }
      }
    }
  }
};
</script>

<style>
.kmp-text-nama {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #4F5A70;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.kmp-time {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #838FA7;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.text-rep-count {
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 160% */
  text-align: center;
  /* Primary/600 */
  color: #2C8ED3;
  /* Inside Auto Layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 4px;
}

.text-vote-desc {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */
  /* Neutral/400 */
  color: #838FA7;
}

.text-more {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */


  /* Primary/600 */

  color: #2C8ED3;


  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 5px 0px;
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
  width: 50%;
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
