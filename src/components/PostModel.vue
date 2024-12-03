<template>
  <div>
    <!--    @click="handleSelectPost(item.id, item.post_type)"-->
    <!--    cursor-pointer-->
    <q-card class="q-mb-lg kmp-post"
            :class="item.post_type === 'Notification' ? 'kmp-post-notif' : ''"
            v-for="(item, index) in data" :key="index"

    >
    <!-- <div v-if="item.status_pin">ADA</div>
    <div v-else>KDD</div> -->
      <!--      @click="handleSelectPost(item.id, item.post_type)"-->
      <!-- {{item.status_limit}} -->
    <div  v-if="(!item.pin || (item.pin && checkPin(item) === 'false')) && (item.limited === false || ((item.limited === true && item.status_limit === 'ada') || is_content_manager === true) || item.created_by === loginId)">
      <q-card-section class="q-pt-sm q-pb-none"
                        v-show="highlight_post !== null && highlight_post.toString() === item.id.toString() && (item.status === 'Knowledge' || item.status === 'Kmap')"
      >
      <div class="kmp-ribbon-draft kmp-font-sm text-uppercase" style="max-width: 110px">{{ item.status }}</div>
      </q-card-section>
      <div v-if="item.post_type === 'Post'">
        <q-card-section>
          <PostHeader :data="item" :state="state" :channel="data_channel" :user_uk="user_uk"
                      @reload="updateConversation"
                      @update_channel="updateChannel($route.params.id)"
                      @handle_edit="handleEdit(item)"
                      @handle_delete="handleDelete(item)"
                      @update_post="updatePost()"
          />
          <div class="cursor-pointer" @click="handleSelectPost(item.id, item.post_type)">
            <div class="kmp-post-text-title q-mt-md q-mb-sm">
              {{ item.title }}
            </div>
            <div class="text-content" style="white-space: pre-line;" v-if="item.scan.textLimit === null" v-html="item.scan.text"></div>
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
                    <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{ props.title }}</div>
                    <div class="text-subtitle2" v-else="">{{ item.scan.mainUrl }}</div>
                    <div class="text-grey-7" style="line-break: anywhere;">{{ props.url }}</div>
                  </q-card-section>
                </q-card>
              </template>
            </link-prevue>
          </div>
          <postView v-if="post_detail_mobile && selected_id === item.id" :data="item"/>
          <PostReaction
            class="q-mt-none"
            :channel_id="item.post_channel.channel_id"
            :post_id="item.id"
            :reaction_list="reaction_list"
            :reaction_data="item.reaction_data"
            :replies_count="item.post_conversation.objConversation.length"
            @onRepliesClick="handleSelectPost"
            :post_title="item.title"
            :post_desc="item.description"
          />
          <PostConversation v-if="post_detail_mobile && selected_id === item.id"
            class="q-pt-md" :post_id="item.id"
            :data_conversation="item.post_conversation"
            @update_conversation="updateConversation"
            @update_conv_mobile="handleCommentMob"/>
            <!--          <div class="col q-mt-sm">-->
            <!--            <span-->
            <!--              class="q-mr-sm"-->
            <!--              v-for="(conversation, conversation_index) in item.post_conversation.post_conversation_uniq"-->
            <!--              :key="conversation_index">-->
            <!--              <Avatar-->
            <!--                size="md"-->
            <!--                :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"-->
            <!--                :name="conversation.user.name"-->
            <!--                @click="goToProfile(conversation.user.id)"-->
            <!--              />-->
            <!--            </span>-->
            <!--            <span class="kmp-font-sm kmp-text-blue-2 cursor-pointer" @click="handleSelectPost(item.id);">{{-->
            <!--                item.post_conversation.objConversation.length-->
            <!--              }} Replies</span>-->
            <!--          </div>-->
            <!--          <PostReplies class="q-mt-sm"-->
            <!--                       :replies_data="item.post_conversation"-->
            <!--                       :replies_link="true"-->
            <!--                       @select_post="handleSelectPost"-->
            <!--          />-->

        </q-card-section>
      </div>
      <div v-if="item.post_type === 'Article'">
        <q-card-section class="q-pt-sm q-pb-none" v-if="is_show_draft">
          <div class="kmp-ribbon-draft kmp-font-sm" style="max-width: 70px">DRAFT</div>
        </q-card-section>
        <q-card-section>
          <PostHeader :data="item" :state="state" :channel="data_channel" :user_uk="user_uk"
                      @reload="updateConversation"
                      @update_channel="updateChannel($route.params.id)"
                      @handle_edit="handleEdit(item)"
                      @handle_delete="handleDelete(item)"
                      @update_post="updatePost()"
          />
          <!--          @click="handleShowArticle(item.id);"-->
          <div>
            <div v-if="item.featured_image_file !== null" class="q-mt-md">
              <img :src="`./api/${item.featured_image_file.path}`" alt="cover" class="cursor-pointer" @click="handleShowArticle(item.id, 'post');" />
            </div>
            <div v-else v-html="item.cover" class="q-mt-md cursor-pointer" @click="handleShowArticle(item.id, 'post');"/>
            <div class="kmp-post-text-title cursor-pointer" @click="handleShowArticle(item.id, 'post');">
              {{ item.title }}
            </div>
            <div class="kmp-post-description">
              <p style="white-space: pre-line;">{{item.description}}</p>
            </div>
            <div v-show="is_show_draft" class="kmp-post-description">
              <div class="text-content" style="white-space: pre-line;" v-html="item.scan.textLimit"></div>
            </div>
            <div class="text-more kmp-font-sm cursor-pointer" @click="handleShowArticle(item.id);">
              Read More
            </div>
          </div>

          <PostReaction
            class="q-mt-none"
            :channel_id="item.post_channel.channel_id"
            :post_id="item.id"
            :reaction_list="reaction_list"
            :reaction_data="item.reaction_data"
            :replies_count="item.post_conversation.objConversation.length"
            @onRepliesClick="handleShowArticle"
            :post_title="item.title"
            :post_desc="item.description"

          />
        </q-card-section>
      </div>
      <div v-if="item.post_type === 'ArticleDisabled'">
        <q-card-section>
          <PostHeader :data="item" :state="state" :channel="data_channel" :user_uk="user_uk"
                      @reload="updateConversation"
                      @update_channel="updateChannel($route.params.id)"
                      @handle_edit="handleEdit(item)"
                      @handle_delete="handleDelete(item)"
                      @update_post="updatePost()"
          />
          <q-card class="my-card q-mt-sm q-mb-sm" flat bordered clickable @click="handleShowArticle(item.id, 'disabled');">
            <q-scroll-area style="height: 300px;">
              <div class="text-content q-pa-md" v-html="item.article"></div>
            </q-scroll-area>
          </q-card>
          <q-card v-for="(item1, index) in item.post_file" :key="index">
            <KnowledgeListFile v-if="item1.file !== null" :file="item1.file" :item="item1" :manage="false"
                               :download="true"/>
          </q-card>
          <div class="row" v-if="item.post_conversation.objConversation.length > 0">
            <div class="col q-mt-md">
              <span class="text-rep-count">{{ item.post_conversation.objConversation.length }} Replies</span>
            </div>
          </div>
        </q-card-section>
      </div>
      <div v-if="item.post_type === 'Post Document'">
        <q-card-section>
          <PostHeader :data="item" :state="state" :channel="data_channel" :user_uk="user_uk"
                      @reload="updateConversation"
                      @update_channel="updateChannel($route.params.id)"
                      @handle_edit="handleEdit(item)"
                      @handle_delete="handleDelete(item)"
                      @update_post="updatePost()"
          />
          <div class="cursor-pointer" @click="handleSelectPost(item.id, item.post_type)">
            <div class="kmp-post-text-title q-mt-lg q-mb-sm">
              {{ item.title }}
            </div>
            <div class="text-content" style="white-space: pre-line;" v-if="item.scan.textLimit === null" v-html="item.scan.text"></div>
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
                    <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{ props.title }}</div>
                    <div class="text-subtitle2" v-else="">{{ item.scan.mainUrl }}</div>
                    <div class="text-grey-7" style="line-break: anywhere;">{{ props.url }}</div>
                  </q-card-section>
                </q-card>
              </template>
            </link-prevue>
          </div>
          <div class="row q-mt-md">
              <q-card v-for="(item1, index) in item.post_file" :key="index" :class="$q.platform.is.mobile ? 'col-12 q-px-xs' : 'col-6 q-px-xs'">
                <KnowledgeListFile v-if="item1.file !== null" :file="item1.file" :item="item1" :manage="false"
                                  :download="true"/>
              </q-card>
          </div>

          <PostReaction
            class="q-mt-none"
            :channel_id="item.post_channel.channel_id"
            :post_id="item.id"
            :reaction_list="reaction_list"
            :reaction_data="item.reaction_data"
            :replies_count="item.post_conversation.objConversation.length"
            @onRepliesClick="handleSelectPost"
            :post_title="item.title"
            :post_desc="item.description"
          />
          <PostConversation v-if="post_detail_mobile && selected_id === item.id"
            class="q-pt-md" :post_id="item.id"
            :data_conversation="item.post_conversation"
            @update_conversation="updateConversation"/>
          <!--          <div class="col q-mt-sm">-->
          <!--            <span-->
          <!--              class="q-mr-sm"-->
          <!--              v-for="(conversation, conversation_index) in item.post_conversation.post_conversation_uniq"-->
          <!--              :key="conversation_index">-->
          <!--              <Avatar-->
          <!--                size="md"-->
          <!--                :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"-->
          <!--                :name="conversation.user.name"-->
          <!--                @click="goToProfile(conversation.user.id)"-->
          <!--              />-->
          <!--            </span>-->
          <!--            <span class="kmp-font-sm kmp-text-blue-2 cursor-pointer" @click="handleSelectPost(item.id);">{{-->
          <!--                item.post_conversation.objConversation.length-->
          <!--              }} Replies</span>-->
          <!--          </div>-->
                    <!-- <PostReaction class="q-mt-md"/> -->
                    <!--          <div class="row" v-if="item.post_conversation.objConversation.length > 0">-->
                    <!--            <div class="col q-mt-md">-->
                    <!--              &lt;!&ndash; <q-avatar size="24px" class="q-mr-xs">-->
                    <!--                <img src="https://cdn.quasar.dev/img/avatar1.jpg">-->
                    <!--              </q-avatar>-->
                    <!--              <q-avatar size="24px" class="q-mr-xs" color="yellow" text-color="white">LA</q-avatar>-->
                    <!--              <q-avatar size="24px" class="q-mr-xs" color="orange" text-color="white">LS</q-avatar>-->
                    <!--              <q-avatar size="24px" class="q-mr-xs">-->
                    <!--                <img src="https://cdn.quasar.dev/img/avatar2.jpg">-->
                    <!--              </q-avatar>-->
                    <!--              <q-avatar size="24px" class="q-mr-xs">-->
                    <!--                <img src="https://cdn.quasar.dev/img/avatar3.jpg">-->
                    <!--              </q-avatar> &ndash;&gt;-->
                    <!--              <span class="text-rep-count">{{ item.post_conversation.objConversation.length }} Replies</span>-->
                    <!--            </div>-->
                    <!--          </div>-->
          <!--          <PostReplies class="q-mt-sm"-->
          <!--                       :replies_data="item.post_conversation"-->
          <!--                       :replies_link="true"-->
          <!--                       @select_post="handleSelectPost"-->
          <!--          />-->
        </q-card-section>
      </div>
      <div hidden v-if="item.post_type === 'Post Video'">
        <q-card-section>
          <PostHeader :data="item" :state="state" :channel="data_channel" :user_uk="user_uk"
                      @reload="updateConversation"
                      @update_channel="updateChannel($route.params.id)"
                      @handle_edit="handleEdit(item)"
                      @handle_delete="handleDelete(item)"
                      @update_post="updatePost()"
          />
          <div class="cursor-pointer" @click="handleSelectPost(item.id, item.post_type)">
            <div class="kmp-post-text-title q-mt-lg q-mb-sm">
              {{ item.title }}
            </div>
            <div class="text-content" style="white-space: pre-line;" v-if="item.scan.textLimit === null" v-html="item.scan.text"></div>
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
                    <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{ props.title }}</div>
                    <div class="text-subtitle2" v-else="">{{ item.scan.mainUrl }}</div>
                    <div class="text-grey-7" style="line-break: anywhere;">{{ props.url }}</div>
                  </q-card-section>
                </q-card>
              </template>
            </link-prevue>
          </div>

          <PostReaction
            class="q-mt-none"
            :channel_id="item.post_channel.channel_id"
            :post_id="item.id"
            :reaction_list="reaction_list"
            :reaction_data="item.reaction_data"
            :replies_count="item.post_conversation.objConversation.length"
            @onRepliesClick="handleSelectPost"
            :post_title="item.title"
            :post_desc="item.description"
          />
          <PostConversation v-if="post_detail_mobile && selected_id === item.id"
            class="q-pt-md" :post_id="item.id"
            :data_conversation="item.post_conversation"
            @update_conversation="updateConversation"/>
              <!--          <div class="col q-mt-sm">-->
              <!--            <span-->
              <!--              class="q-mr-sm"-->
              <!--              v-for="(conversation, conversation_index) in item.post_conversation.post_conversation_uniq"-->
              <!--              :key="conversation_index">-->
              <!--              <Avatar-->
              <!--                size="md"-->
              <!--                :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"-->
              <!--                :name="conversation.user.name"-->
              <!--                @click="goToProfile(conversation.user.id)"-->
              <!--              />-->
              <!--            </span>-->
              <!--            <span class="kmp-font-sm kmp-text-blue-2 cursor-pointer" @click="handleSelectPost(item.id);">{{-->
              <!--                item.post_conversation.objConversation.length-->
              <!--              }} Replies</span>-->
              <!--          </div>-->

        </q-card-section>
      </div>
      <div v-if="item.post_type === 'Post Image'">
        <q-card-section>
          <PostHeader :data="item" :state="state" :channel="data_channel" :user_uk="user_uk"
                      @reload="updateConversation"
                      @update_channel="updateChannel($route.params.id)"
                      @handle_edit="handleEdit(item)"
                      @handle_delete="handleDelete(item)"
                      @update_post="updatePost()"
          />

          <div class="cursor-pointer" @click="handleSelectPost(item.id, item.post_type)">
            <div class="kmp-post-text-title q-mt-lg q-mb-sm">
              {{ item.title }}
            </div>
            <div class="text-content" style="white-space: pre-line;" v-if="item.scan.textLimit === null" v-html="item.scan.text"></div>
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
                    <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{ props.title }}</div>
                    <div class="text-subtitle2" v-else="">{{ item.scan.mainUrl }}</div>
                    <div class="text-grey-7" style="line-break: anywhere;">{{ props.url }}</div>
                  </q-card-section>
                </q-card>
              </template>
            </link-prevue>
          </div>
          <div class="q-px-none q-mb-sm">
            <PostListMedia :list_data="item.post_file.filter(x => ['jpeg','jpg','png','mp4'].includes(x.file.filemime.toLowerCase()))" :download="true"/>
          </div>
          <div class="row q-mt-md">
            <q-card v-for="(item1, index) in item.post_file.filter(x => !['jpeg','jpg','png','mp4'].includes(x.file.filemime.toLowerCase()) )" :key="index" :class="$q.platform.is.mobile ? 'col-12 q-px-xs' : 'col-6 q-px-xs'">
              <KnowledgeListFile v-if="item1.file !== null" :file="item1.file" :item="item1" :manage="false" :download="true"/>
            </q-card>
          </div>

          <PostReaction
            class="q-mt-none"
            :channel_id="item.post_channel.channel_id"
            :post_id="item.id"
            :reaction_list="reaction_list"
            :reaction_data="item.reaction_data"
            :replies_count="item.post_conversation.objConversation.length"
            @onRepliesClick="handleSelectPost"
            :post_title="item.title"
            :post_desc="item.description"
          />
          <PostConversation v-if="post_detail_mobile && selected_id === item.id"
          class="q-pt-md" :post_id="item.id"
          :data_conversation="item.post_conversation"
          @update_conversation="updateConversation"/>
                <!--          <div class="col q-mt-sm">-->
                <!--            <span-->
                <!--              class="q-mr-sm"-->
                <!--              v-for="(conversation, conversation_index) in item.post_conversation.post_conversation_uniq"-->
                <!--              :key="conversation_index">-->
                <!--              <Avatar-->
                <!--                size="md"-->
                <!--                :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"-->
                <!--                :name="conversation.user.name"-->
                <!--                @click="goToProfile(conversation.user.id)"-->
                <!--              />-->
                <!--            </span>-->
                <!--            <span class="kmp-font-sm kmp-text-blue-2 cursor-pointer" @click="handleSelectPost(item.id);">{{-->
                <!--                item.post_conversation.objConversation.length-->
                <!--              }} Replies</span>-->
                <!--          </div>-->
                <!--          <PostReplies class="q-mt-sm"-->
                <!--                       :replies_data="item.post_conversation"-->
                <!--                       :replies_link="true"-->
                <!--                       @select_post="handleSelectPost"-->
                <!--          />-->
        </q-card-section>
      </div>
      <div v-if="item.post_type === 'Poll'">
        <q-card-section>
          <PostHeader :data="item" :state="state" :channel="data_channel" :user_uk="user_uk"
                      @reload="updateConversation"
                      @update_channel="updateChannel($route.params.id)"
                      @handle_edit="handleEdit(item)"
                      @handle_delete="handleDelete(item)"
                      @update_post="updatePost()"
          />
          <div class="cursor-pointer" @click="handleSelectPost(item.id, item.post_type)">
            <div class="kmp-font-md kmp-font-bold q-mt-md q-mb-sm">
              {{ item.poll.question }}
            </div>
          </div>
          <div class="poll-container">
            <div v-for="(column, index2) in pollColumns(item.poll.poll_choice)" :key="index2"
                 :class="pollColumns(item.poll_options).length === 2 ? 'poll-col' : 'poll-col-1'"
            >
              <q-list v-for="(opt, index) in column" :key="index" :class="opt.choice ? 'poll-choice' : ''">
                <q-item tag="label" dense v-ripple
                        :class="item.poll_user_participant.includes(loginId) || item.poll_expired ? 'q-px-sm' : 'q-pa-none'"
                >
                  <q-item-section v-show="!(item.poll_user_participant.includes(loginId) || item.poll_expired)" avatar
                                  style="min-width: unset;">
                    <q-radio dense v-model="item.poll_choice_id" :val="opt.value" color="primary"/>
                  </q-item-section>
                  <q-item-section>
                    <div v-if="opt.picture"
                         :class="item.poll_user_participant.includes(loginId) || item.poll_expired ? 'text-center' : ''">
                      <q-img :src="`${pathPicture + opt.picture}`"
                             spinner-color="white"
                             class="q-my-xs border rounded-borders"
                             style="height: 160px; max-width: 180px;"
                             @click="openLinkTumbnail(pathPicture + opt.picture)"
                      >
                        <div class="absolute-bottom text-subtitle1 text-center">
                          {{ opt.label }}
                        </div>
                      </q-img>
                      <div v-show="item.poll_user_participant.includes(loginId) || item.poll_expired"
                           class="text-center text-weight-bold">
                        {{ opt.persentase }}%
                      </div>
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
                        <div class="row items-center"
                             :class="pollColumns(item.poll_options).length === 2 ? 'poll_text_img' : ''">
                          <div class="text-content" v-html="opt.scan.linkStatus ? opt.scan.text : opt.label"></div>
                        </div>
                      </q-item-label>
                      <div
                        v-show="pollColumns(item.poll_options).length === 2 && (item.poll_user_participant.includes(loginId) || item.poll_expired)"
                        class="text-center text-weight-bold">{{ opt.persentase }}%
                      </div>
                    </div>
                  </q-item-section>
                  <q-space/>
                  <q-item-section
                    v-show="pollColumns(item.poll_options).length === 1 && opt.picture === null && (item.poll_user_participant.includes(loginId) || item.poll_expired)"
                    side>
                    <div class="text-right text-weight-bold">{{ opt.persentase }}%</div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          <div :hidden="item.poll_user_participant.includes(loginId) || item.poll_expired">
            <q-btn no-caps color="primary" class="q-mt-md" label="Submit"
                   @click="handleSubmitPoll(item.poll_choice_id, item.id)"/>
          </div>
        </q-card-section>
        <span :hidden="!item.poll_user_participant.includes(loginId)" class="text-vote-desc q-ml-md q-mt-lg">
          {{ (item.poll_user_participant.includes(loginId) ? 'Terima kasih sudah mengikuti polling ini' : '') }}
        </span>
        <q-separator class="q-mx-md"></q-separator>
        <span class="text-vote-desc q-ml-md q-mt-lg">
            <!-- 123 voter(s) • -->
            Poll closed at {{
            item.poll.end_date_format
          }}</span>
        <q-card-section class="q-pt-none">
          <PostReaction
            class="q-mt-none"
            :channel_id="item.post_channel.channel_id"
            :post_id="item.id"
            :reaction_list="reaction_list"
            :reaction_data="item.reaction_data"
            :replies_count="item.post_conversation.objConversation.length"
            @onRepliesClick="handleSelectPost"
            :post_title="item.title"
            :post_desc="item.description"
          />
          <PostConversation v-if="post_detail_mobile && selected_id === item.id"
          class="q-pt-md" :post_id="item.id" :data_conversation="item.post_conversation"
          @update_conversation="updateConversation"/>
              <!--          <div class="col q-mt-sm">-->
              <!--            <span-->
              <!--              class="q-mr-sm"-->
              <!--              v-for="(conversation, conversation_index) in item.post_conversation.post_conversation_uniq"-->
              <!--              :key="conversation_index">-->
              <!--              <Avatar-->
              <!--                size="md"-->
              <!--                :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"-->
              <!--                :name="conversation.user.name"-->
              <!--                @click="goToProfile(conversation.user.id)"-->
              <!--              />-->
              <!--            </span>-->
              <!--            <span class="kmp-font-sm kmp-text-blue-2 cursor-pointer" @click="handleSelectPost(item.id);">{{-->
              <!--                item.post_conversation.objConversation.length-->
              <!--              }} Replies</span>-->
              <!--          </div>-->
              <!--          <PostReplies class="q-mt-sm"-->
              <!--                       :replies_data="item.post_conversation"-->
              <!--                       :replies_link="true"-->
              <!--                       @select_post="handleSelectPost"-->
              <!--          />-->
        </q-card-section>
      </div>
      <div v-if="item.post_type === 'KMAP'">
        <q-card-section>
          <PostHeader :data="item" :state="state" :channel="data_channel" :user_uk="user_uk"
                      @reload="updateConversation"
                      @update_channel="updateChannel($route.params.id)"
                      @update_post="updatePost()"
          />
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
                <div class="text-content">
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
          <PostReaction
            class="q-mt-none"
            :channel_id="item.post_channel.channel_id"
            :post_id="item.id"
            :reaction_list="reaction_list"
            :reaction_data="item.reaction_data"
            :replies_count="item.post_conversation.objConversation.length"
            @onRepliesClick="handleSelectPost"
            :post_title="item.title"
            :post_desc="item.description"
          />
              <!--          <div class="row" v-if="item.post_conversation.objConversation.length > 0">-->
              <!--            <div class="col q-mt-md">-->
              <!--              <q-avatar size="24px" class="q-mr-xs">-->
              <!--                <img src="https://cdn.quasar.dev/img/avatar1.jpg">-->
              <!--              </q-avatar>-->
              <!--              <q-avatar size="24px" class="q-mr-xs" color="yellow" text-color="white">LA</q-avatar>-->
              <!--              <q-avatar size="24px" class="q-mr-xs" color="orange" text-color="white">LS</q-avatar>-->
              <!--              <q-avatar size="24px" class="q-mr-xs">-->
              <!--                <img src="https://cdn.quasar.dev/img/avatar2.jpg">-->
              <!--              </q-avatar>-->
              <!--              <q-avatar size="24px" class="q-mr-xs">-->
              <!--                <img src="https://cdn.quasar.dev/img/avatar3.jpg">-->
              <!--              </q-avatar>-->
              <!--              <span class="text-rep-count">{{ item.post_conversation.objConversation.length }} Replies</span>-->
              <!--            </div>-->
              <!--          </div>-->
              <!--          <PostReaction class="q-mt-md"/>-->
              <!--          <PostReplies class="q-mt-sm"-->
              <!--                       :replies_data="item.post_conversation"-->
              <!--                       :replies_link="true"-->
              <!--                       @select_post="handleSelectPost"-->
              <!--          />-->
        </q-card-section>
      </div>
      <div v-if="item.post_type === 'Event'">
        <q-card-section>
          <PostHeader :data="item" :state="state" :channel="data_channel" :user_uk="user_uk" @reload="updateConversation"
                      @update_post="updatePost()"
                      @update_channel="updateChannel($route.params.id)" @handle_edit="handleEdit(item)"
                      @handle_delete="handleDelete(item)"/>
          <q-card class="my-card q-mt-sm " flat bordered>
            <q-card-section class="q-pa-none">
              <div class="q-pa-md row q-gutter-md">
                <q-card class="my-card no-border" flat bordered>
                  <EventHeader :picture="item.event.picture" :start_time="item.event.start_time"  :end_time="item.event.end_time"
                               :end_date="item.event.end_date" @click_banner="eventBannerClick(item.event.picture)"/>
                  <q-card-section style="padding:0px">
                    <div class="kmp-post-text-event-title q-mt-sm q-mb-xs cursor-pointer" @click="handleSelectPost(item.id, item.post_type)">{{ item.title }}</div>
                    <div class="text-content q-mt-sm">
                      <q-icon name="event" class="check-icon q-mr-sm" size="14px" style=""/>
                      <span v-if="item.event.start_date === item.event.end_date">{{ parseDate(item.event.end_date, 'DD MMM YYYY') }}</span>
                      <span v-if="item.event.start_date !== item.event.end_date">{{
                        parseDate(item.event.start_date, 'DD MMM YYYY')
                      }} - {{ parseDate(item.event.end_date, 'DD MMM YYYY') }}</span>
                    </div>
                    <div class="text-content q-mt-sm"
                         v-if="item.event.start_time !== null && item.event.end_time !== null">
                      <q-icon name="access_time" class="check-icon q-mr-sm" size="14px" style=""/>
                      {{ `${parseTime(item.event.start_time)} - ${parseTime(item.event.end_time)}` }} WIB
                    </div>
                    <div class="text-content q-mt-sm" v-if="item.event.locations !== null">
                      <q-icon name="pin_drop" class="check-icon q-mr-sm" size="14px" style=""/>
                      {{ item.event.locations }}
                    </div>
                    <div class="text-content q-mt-sm" v-if="item.event.link !== null">
                      <q-icon name="link" class="check-icon q-mr-sm" size="14px" style=""/>
                      <a :href="item.event.link" target="_blank" style="word-wrap: break-word; white-space: normal;">{{ item.event.link }}</a>
                    </div>
                    <div class="text-content q-mt-sm" style="white-space: pre-line;" v-if="item.scan.textLimit === null" v-html="item.scan.text"></div>
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
                      Created by {{ item.created_by_user.name }}
                    </div> -->
                    <!-- {{item}} -->
                  </q-card-section>
                  <EventExpertise class="q-pt-md" :data="item.event.event_expertise"/>
                  <!-- <q-card-section>
                    <div class="text-channel q-my-md">
                      {{item.description}}
                    </div>
                    <q-separator/>
                  </q-card-section> -->
                  <EventRsvp :is_rsvp="item.event.is_rsvp"
                             :start_time="item.event.start_time"
                             :start_date="item.event.start_date"
                             :participant="item.event.event_participant"
                             :participant_no="item.event.event_participant_no"
                             :id="item.event.id"
                             :loginId="loginId"
                             @update_post="updatePost()"/>

                  <div v-if="highlight_post && index == 0 && item.event.time_status == 'absensi' && item.event.event_participant.map(x => x.users_id).includes(loginId)">
                    <q-separator class="q-my-md"/>
                    <div v-if="item.event.event_absensi && item.event.event_absensi.filter(f => f.users_id == loginId).length > 0">
                      <span class="text-grey-5 text-weight-bold">Terimakasih, Anda sudah absen pada event ini.</span>
                    </div>
                    <div class="text-right" v-else>
                      <q-btn color="green-8" @click="addEventAbsensi(item.event.id)">Hadir</q-btn>
                    </div>
                  </div>
                </q-card>
              </div>
            </q-card-section>
          </q-card>

          <PostReaction
            class="q-mt-none"
            :channel_id="item.post_channel.channel_id"
            :post_id="item.id"
            :reaction_list="reaction_list"
            :reaction_data="item.reaction_data"
            :replies_count="item.post_conversation.objConversation.length"
            @onRepliesClick="handleSelectPost"
            :post_title="item.title"
            :post_desc="item.description"
          />
          <PostConversation v-if="post_detail_mobile && selected_id === item.id"
          class="q-pt-md" :post_id="item.id" :data_conversation="item.post_conversation"
          @update_conversation="updateConversation"/>
                      <!--          <div class="col q-mt-sm">-->
                      <!--            <span-->
                      <!--              class="q-mr-sm"-->
                      <!--              v-for="(conversation, conversation_index) in item.post_conversation.post_conversation_uniq"-->
                      <!--              :key="conversation_index">-->
                      <!--              <Avatar-->
                      <!--                size="md"-->
                      <!--                :picture="conversation.user.profile_picture ? `./api${conversation.user.profile_picture}` : ''"-->
                      <!--                :name="conversation.user.name"-->
                      <!--                @click="goToProfile(conversation.user.id)"-->
                      <!--              />-->
                      <!--            </span>-->
                      <!--            <span class="kmp-font-sm kmp-text-blue-2 cursor-pointer" @click="handleSelectPost(item.id);">{{-->
                      <!--                item.post_conversation.objConversation.length-->
                      <!--              }} Replies</span>-->
                      <!--          </div>-->
                      <!--          <PostReplies class="q-mt-sm"-->
                      <!--                       :replies_data="item.post_conversation"-->
                      <!--                       :replies_link="true"-->
                      <!--                       @select_post="handleSelectPost"-->
                      <!--          />-->
        </q-card-section>
      </div>
      <div v-if="item.post_type === 'Notification'">
        <q-card-section>
          <div class="row">
            <div class="col-1">
              <q-avatar size="36px" class="q-mr-md">
                <img v-if="item.user.profile_picture !== null" :src="item.user.profile_picture">
                <q-avatar size="36px" color="primary" text-color="white" v-else="">
                  {{ item.user.name.match(/\b(\w)/g).join('').toUpperCase() }}
                </q-avatar>
              </q-avatar>
            </div>
            <div class="col-11">
              <div>
                <span class="kmp-text-nama">{{ item.user.name }} </span>
                <span class="text-content">has been updated </span> <span class="text-doc">Dokumentasi Kegiatan Direktorat ACLC</span>
              </div>
              <div class="kmp-time">{{ item.time }}</div>
            </div>
          </div>
        </q-card-section>
      </div>
    </div>
          <!--      <div hidden v-if="item.post_type !== 'Notification'">-->
          <!--        <PostConversation class="q-px-md" :data_conversation="item.post_conversation"-->
          <!--                          @update_conversation="updateConversation"/>-->
          <!--      </div>-->
    </q-card>
    <PostEdit ref="edit" :data_post="postSelected" :heightObserver="heightObserver" @update_post="updatePost()" :channel="data_channel"/>
    <q-dialog v-model="article_view">
      <q-card style="max-width: 60vw;min-width: 900px">
        <q-card-section class="row items-center q-py-sm">
          <PostHeader :data="selected_post" :state="state" :channel="data_channel" @reload="updateConversation"  :user_uk="user_uk"
                      @update_post="updatePost()"
                      @update_channel="updateChannel($route.params.id)" @handle_edit="handleEdit(selected_post)"
                      @handle_delete="handleDelete(selected_post)"/>
          <q-space/>
          <q-btn unelevated no-caps outline color="primary" label="Edit" class="q-mr-md" size="sm"
          />
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-separator/>

        <q-card-section style="max-height: 80vh" class="scroll">
          <div v-html="selected_post.article"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
     <vue-easy-lightbox
      escDisabled
      moveDisabled
      :visible="preview"
      :imgs="banner_detail"
      @hide="preview = !preview"
    ></vue-easy-lightbox>
  </div>
</template>

<script>

import moment from 'moment';
import PostReaction from 'components/post/PostReaction';
import PostEdit from 'components/post/PostEdit';
import { Notify, format } from 'quasar';
import PostHeader from 'components/PostHeader';
import EventHeader from 'components/post/EventHeader';
import EventExpertise from 'components/post/EventExpertise';
import EventRsvp from 'components/post/EventRsvp';
// import PostReaction from 'components/PostReaction';
import KnowledgeListFile from 'components/KnowledgeListFile';
import PostConversation from 'components/PostConversation';
import PostView from 'components/post/PostView';
import bus from 'components/common/EventBus';
import {
  pollParticipantCreate,
  postDelete,
  createPostAccess,
  eventAbsensiCreate
  // UserUk
  // checkLimitPost
// , listAttendees
} from 'src/lib/api';
import LinkPrevue from 'link-prevue';
import PostListMedia from 'components/post/PostListMedia';
import _ from 'lodash';
import { point } from 'src/lib/point';
import VueEasyLightbox from 'vue-easy-lightbox';
import { dateFormat, datePost, getLoginId, urlify, urlifyArticle, checkRole } from '../lib/helper';

require('vue-image-lightbox/dist/vue-image-lightbox.min.css');

export default {
  props: ['data_post', 'state', 'show_draft', 'heightObserver', 'reaction_list', 'jumlah', 'data_pin', 'data_channel'],
  components: {
    PostReaction,
    PostHeader,
    PostEdit,
    PostListMedia,
    KnowledgeListFile,
    LinkPrevue,
    EventHeader,
    EventRsvp,
    EventExpertise,
    PostConversation,
    PostView,
    VueEasyLightbox
  },
  data() {
    return {
      loginId: getLoginId(),
      formatQuasar: format,
      formatDate: dateFormat,
      data: [],
      dataArticle: {},
      showArticle: false,
      postSelected: null,
      deletePost: false,
      pathPicture: `${process.env.QUASAR_API_URL}uploads/files/pollChoice/`,
      modal_list_participant: false,
      list_participant: [],
      event_id: '',
      article_view: false,
      selected_post: {
        article: ''
      },
      hours: '',
      modal_rsvp: false,
      rsvp_answer: '',
      created_by_id: '',
      is_show_draft: false,
      highlight_post: null,
      post_detail_mobile: false,
      post_detail_desktop: false,
      selected_id: '',
      preview: false,
      banner_detail: '',
      is_km_manager: false,
      is_content_manager: false,
      user_uk: ''
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
    openDialog(content_type, content) {
      if (content_type === 'article') {
        this.article_view = true;
        this.selected_post = content;
      }
    },
    updateConversation() {
      this.$emit('update_conversation');
    },
    updateChannel() {
      this.$emit('update_channel', this.$route.params.id);
    },
    updatePost() {
      this.$emit('update_post');
      this.$emit('select_post', null);
    },
    handleShowArticle(id, type) {
      if (type === 'post') {
        createPostAccess({ post_id: id, created_by: this.loginId });
      }
      const data = this.data_post.find(x => {
        return x.id === id;
      });
      this.dataArticle = data;
      this.showArticle = true;
      const pos = window.scrollY;
      this.$emit('open_article', id, pos);
      this.$emit('select_post', null);
      // this.$router.push({
      //   name: 'channel-detail-post-detail',
      //   params: {
      //     id: this.$route.params.id,
      //     post_id: id
      //     // title: item.name
      //     //   .toLowerCase()
      //     //   .replace(/ /g, '-')
      //     //   .replace(/\//g, '-')
      //   }
      // });
    },
    handleEdit(item) {
      if (item.post_type === 'Article') {
        this.postSelected = item;
        this.$refs.edit.openDialog('edit_article');
        setTimeout(() => {
          this.$refs.edit.getDetailPost(`${item.id}`, `${item.post_type}`);
        }, 1000);
        // this.$router.push({
        //   name: 'edit-article',
        //   params: {
        //     id: item.post_channel.channel.id,
        //     post: item.id,
        //     title: item.post_channel.channel.name
        //       .toLowerCase()
        //       .replace(/ /g, '-')
        //       .replace(/\//g, '-')
        //   }
        // });
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
            this.$emit('get_notif', 'Badge');
            this.$emit('update_post');
            bus.$emit('update_point');
            Notify.create({
              message: 'Post deleted.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            this.$emit('select_post', null);
            if (this.jumlah === 1) {
              this.$emit('update_channel', this.$route.params.id);
            }
          }
        });
      });
    },
    handleSubmitPoll(choice_id, id) {
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
            point('add', { tag: 'polling_vote', post_id: id });
            Notify.create({
              message: 'Trimakasih sudah mengikuti polling ini.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            this.$emit('update_post');
          }
        });
      }
    },
    openLinkTumbnail(url) {
      window.open(url, '_blank');
    },
    getPic(data) {
      const pic = process.env.QUASAR_API_URL + data;
      return pic;
    },
    parseDate(date, formate = 'DD MMMM YYYY') {
      return moment(new Date(date)).format(formate);
    },
    handleDescription(idx) {
      const arraySelected = this.data[idx];
      arraySelected.showMore = arraySelected.showMore === undefined ? false : !arraySelected.showMore;
      this.$set(this.data, idx, arraySelected);
    },
    parseTime(time) {
      if (time !== null) {
        const sTime = time.split(':');
        return `${sTime[0]}:${sTime[1]}`;
      }
      return '';
    },
    handleSelectPost(id, type) {
      if (type !== 'Event' && type !== 'Poll') {
        createPostAccess({ post_id: id, created_by: this.loginId });
      }
      this.$emit('select_post', id);
      if (id > 0) {
        point('add', { tag: 'post_read', post_id: id });
      }
      if (this.$q.platform.is.mobile) {
        this.handleCommentMob(id);
      }
    },
    handleCommentDesktop(id, msg) {
      if (msg) {
        this.post_detail_desktop = true;
      } else {
        if (this.selected_id !== id && this.post_detail_desktop) {
          this.post_detail_desktop = false;
        }
        this.post_detail_desktop = !this.post_detail_desktop;
      }
      this.selected_id = id;
    },
    handleCommentMob(id, msg) {
      if (msg) {
        this.post_detail_mobile = true;
      } else {
        if (this.selected_id !== id && this.post_detail_mobile) {
          this.post_detail_mobile = false;
        }
        this.post_detail_mobile = !this.post_detail_mobile;
      }
      this.selected_id = id;
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
    checkPin(data) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const seconds = String(today.getSeconds()).padStart(2, '0');
      const data_hours = `${hours}:${minutes}:${seconds}`;
      today = `${yyyy}-${mm}-${dd}`;
      let hasil = '';
      if (data.pin.start_date < today && data.pin.end_date > today) {
        hasil = 'true';
      } else if (data.pin.start_date === today && data.pin.end_date === today && data.pin.start_time < data_hours && data.pin.end_time > data_hours) {
        hasil = 'true';
      } else if (data.pin.start_date === today && data.pin.end_date > today && data.pin.start_time < data_hours) {
        hasil = 'true';
      } else if (data.pin.start_date < today && data.pin.end_date === today && data.pin.end_time > data_hours) {
        hasil = 'true';
      } else {
        hasil = 'false';
      }
      return hasil;
    },
    eventBannerClick(data) {
      this.banner_detail = process.env.QUASAR_API_URL + data;
      this.preview = true;
    },
    getRole() {
      const Role = checkRole().name;
      if (Role === 'km_manager') {
        this.is_km_manager = true;
      } else if (Role === 'content_manager') {
        this.is_content_manager = true;
      }
      this.getUserUk();
    },
    getUserUk() {
      // UserUk(this.loginId).then(res => {
      //   this.user_uk = res.data;
      // });
    },
    addEventAbsensi(event_id) {
      eventAbsensiCreate({ event_id }).then(res => {
        if (res.message === 'OK') {
          this.$emit('update_post');
        }
      });
    }
  },
  watch: {
    data_post: {
      immediate: true,
      deep: true,
      handler(value) {
        value = [...this.data_pin, ...value];
        if (value.length > 0) {
          value.forEach(v => {
            v.reaction_data = {
              post_id: v.id,
              current_member: v.post_reaction.filter(x => x.created_by === getLoginId()),
              all_member: v.post_reaction,
              reaction_unique_id: [...new Set(v.post_reaction.map(item => item.reaction_id))],
              counting: v.post_reaction.map(({ reaction_id }) => reaction_id)
                .reduce((names, name) => {
                  const count = names[name] || 0;
                  names[name] = count + 1;
                  return names;
                }, {})
            };

            // v.access_data = {
            //   post_id: v.id,
            //   current_member: v.post_access.filter(x => x.created_by === getLoginId()),
            //   all_member: v.post_access,
            //   access_unique_id: [...new Set(v.post_access.map(item => item.created_by))],
            //   counting: v.post_access.map(({ created_by }) => created_by)
            //     .reduce((names, name) => {
            //       const count = names[name] || 0;
            //       names[name] = count + 1;
            //       return names;
            //     }, {})
            // };

            if (this.$q.platform.is.mobile && (v.post_type === 'Post' || v.post_type === 'Post Document' || v.post_type === 'Post Image' || v.post_type === 'Post Video')) {
              v.access_data = {
                post_id: v.id,
                current_member: v.post_access.filter(x => x.created_by === getLoginId()),
                all_member: v.post_access,
                access_unique_id: [...new Set(v.post_access.map(item => item.created_by))],
                counting: v.post_access.map(({ created_by }) => created_by)
                  .reduce((names, name) => {
                    const count = names[name] || 0;
                    names[name] = count + 1;
                    return names;
                  }, {})
              };
            }

            v.cover = '';
            if (v.article !== '' && v.article !== null) {
              const idxStart = v.article.indexOf('<img');
              const idxEnd = v.article.indexOf('>', v.article.indexOf('<img'));
              if (idxStart > -1 && idxEnd > -1) {
                v.cover = v.article.substring(idxStart, idxEnd + 1);
              }
            }
            if (v.limited === true) {
              const a = [];
              v.post_limit.forEach(v2 => {
                a.push(v2.users_id);
              });
              if (a.includes(this.loginId)) {
                v.status_limit = 'ada';
              } else {
                v.status_limit = '';
              }
            }
            v.time = datePost(v.created_at);
            if (v.post_type === 'Post' || v.post_type === 'Post Document' || v.post_type === 'Post Image' || v.post_type === 'Post Video' || v.post_type === 'Event') {
              v.scan = urlify(v.description);
            }
            if (v.post_type === 'Article') {
              v.scan = urlifyArticle(v.article_isi);
            }
            if (v.post_type === 'Poll') {
              v.poll_options.forEach(v1 => {
                v1.scan = urlify(v1.label);
                // v1.persentase = (v1.poll_participant.length / v.poll_user_participant.length) * 100;
              });
              v.poll.poll_choice.forEach(v1 => {
                v1.value = v1.id;
                v1.label = v1.text;
                v1.scan = urlify(v1.label);
                v1.persentase = v.poll_user_participant.length > 0
                  ? ((v1.poll_participant.length / v.poll_user_participant.length) * 100).toFixed() : 0;
                v1.choice = _.find(v1.poll_participant, f => f.users_id === this.loginId) !== undefined;
              });
            }
          });
        }
        this.data = value;

        // if (this.$route.params.post_id !== undefined) {
        //   const data = this.data_post.find(x => {
        //     return x.id === this.$route.params.post_id;
        //   });
        //   this.dataArticle = data;
        //   this.showArticle = true;
        //   this.$emit('open_article', this.$route.params.post_id);
        //   this.$emit('select_post', null);
        // }
      }
    },
    show_draft: {
      immediate: true,
      deep: true,
      handler(value) {
        // if (value !== undefined) {
        this.is_show_draft = value;
        // }
      }
    },
    '$route.params.post_id': {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.highlight_post = value;
        }
      }
    }
  },
  mounted() {
    this.getRole();
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

.kmp-post-notif {
  background: #FFF7EC;
}

.kmp-filesize-info {
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;
}

.kmp-blue-card {
  background: #E0F2FE;
  border: 1px solid #94D5FD;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: none;
  color: #0083C9;
}

.kmp-red-card {
  background: #FFECF0;
  border: 1px solid #FFB4C5;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: none;
  color: #F33F6A;
}

.kmp-yellow-card {
  background: #FFF7EC;
  border: 1px solid #FFDEAC;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: none;
  color: #FFB038;
}

.kmp-grey-card {
  background: #EFF1F4;
  border: 1px solid #65738F;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: none;
  color: #65738F;
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
  width: 50%;
}

.poll_text_img {
  height: 168px;
  max-width: 180px;
}

.poll-choice {
  background-color: #94D5FD;
  border-radius: 8px;
}
</style>
