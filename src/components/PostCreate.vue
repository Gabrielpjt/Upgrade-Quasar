<template>
  <div :class="$q.platform.is.mobile ? 'items-start' : 'q-pr-lg items-start'">
    <Media v-model="mediaVisible" :default-tab="defaultTab" @select="onMediaSelect" @delete="onMediaDelete" />
    <q-card class="">
      <q-card-section class="q-px-sm q-py-sm">
        <div class="row">
          <div class="col-1 q-mt-sm text-center">
            <Avatar size="xl" :picture="profile_picture ? profile_picture : ''" :name="profile_name"/>
          </div>
          <div :class="$q.platform.is.mobile ? 'col-11 q-pl-sm' : 'col-11'">
            <div :hidden="!show_detail_post">
              <q-input outlined placeholder="This is title post" class="q-ma-sm"/>
            </div>
            <q-input
              dense
              outlined
              placeholder="Write something..."
              class="q-ma-sm"
              @click="handleOpen"/>
          </div>
        </div>
        <div class="row">
          <div class="col-1 q-mt-sm text-center">&nbsp;</div>
          <div class="col-7 q-mt-sm">
            <q-icon name="video_camera_back" icon="" :class="$q.platform.is.mobile ? 'kmp-media-icon-mobile' : 'kmp-media-icon'" size="24px" style="color: #2C8ED3"
                    @click="openDialog('create_photo')">
              <q-tooltip>
                Post with photo and video
              </q-tooltip>
            </q-icon>
            <q-icon name="attach_file" :class="$q.platform.is.mobile ? 'kmp-attach-icon-mobile' : 'kmp-attach-icon'" size="24px"
                    @click="openDialog('create_file')">
              <q-tooltip>
                Post with Document
              </q-tooltip>
            </q-icon>
            <q-icon name="calendar_today" :class="$q.platform.is.mobile ? 'kmp-calendar-icon-mobile' : 'kmp-calendar-icon'" size="24px"
                    @click="openDialog('create_event')">
              <q-tooltip>
                Post an event
              </q-tooltip>
            </q-icon>
            <q-icon v-show="data_channel.channel_type !== 'General' || (data_channel.channel_type === 'General' && is_channel_manager === false && is_content_manager === false)" name="poll" :class="$q.platform.is.mobile ? 'kmp-poll-icon-mobile' : 'kmp-poll-icon'" size="24px"
                    @click="openDialog('create_poll')">
              <q-tooltip>
                Post with polling
              </q-tooltip>
            </q-icon>
            <q-icon name="notes" :class="$q.platform.is.mobile ? 'kmp-notes-icon-mobile' : 'kmp-notes-icon'" size ="24px"
                    @click="openDialog('create_article2')">
              <q-tooltip>
                Post article
              </q-tooltip>
            </q-icon>
          </div>
          <div class="hidden col-8 q-mt-sm">
            <q-icon name="video_camera_back" class="q-ml-lg q-mr-sm queue-icon cursor-pointer" size="24px" style=""/>
            <q-icon name="attach_file" class="q-ml-lg q-mr-sm attach-icon cursor-pointer" size="24px"
                    @click="openDialog('create_file')"/>
<!--            <q-icon name="calendar_today" class="q-ml-lg q-mr-sm calendar-icon cursor-pointer" size="24px" style=""/>-->
            <q-icon name="poll" class="q-ml-lg q-mr-sm poll-icon cursor-pointer" size="24px"
                    @click="openDialog('create_poll')"/>
            <q-icon name="notes" class="q-ml-lg q-mr-sm notes-icon cursor-pointer" size ="24px"
                    @click="openDialog('create_article')"/>
          </div>
          <div class="col-4">
            <q-btn no-caps unelevated color="primary" class="float-right q-mr-sm" label="Publish"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="create_article" style="min-width: 80vw" :maximized="true">
<!--    <q-dialog v-model="create_article" style="min-width: 80vw" :maximized="true">-->
          <PostArticleCreateV2 @onClose="closeDialogArticle" :heightObserver="heightObserver" :data_post_init="post_init"/>
    </q-dialog>

<!--    <PostArticleCreate :is_open="create_article" />-->

<!--    <PostArticleCreateV2 :is_open="create_article" />-->
    <q-dialog v-model="create_posts" :maximized="$q.platform.is.mobile ? true : false">

      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section class="q-py-none mobile-only row">
          <div class="col-1 q-mt-xs">
            <q-icon name="arrow_back" class="" :size="$q.platform.is.mobile ? '20px' : '30px'"
                    style="" v-close-popup/>
          </div>
          <div class="col-10">
            <q-item-section class="q-ml-sm">
              <q-item-label class="kmp-text-nama">Write a post</q-item-label>
              <q-item-label class="kmp-font-small">#{{data_channel.name}}</q-item-label>
            </q-item-section>
          </div>
        </q-card-section>
        <q-separator class="mobile-only q-mt-sm"/>
        <q-card-section class="q-py-none desktop-only">
          <div class="row items-center">
            <Avatar class="q-mr-md" size="xl" :picture="profile_picture ? profile_picture : ''" :name="profile_name"/>
            <span class="text-primary">{{ profile_name }}</span>
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense v-close-popup/>
          </div>
        </q-card-section>
        <q-card-section>
          <q-input dense outlined autogrow v-model="post_title"
                   class="q-mb-sm"
                   @change="handleChange($event, post_title)"
                   placeholder="Title post"
                   maxlength="255"
          />
          <q-input dense outlined v-model="post_description"
                   type="textarea"
                   class="q-mb-sm"
                   :rows="$q.platform.is.mobile ? 22 : 6"
                   @input="handleChange($event, 'post_description')"
                   placeholder="Write something"
          />
          <span v-if="collab_list.length > 0" class="q-mb-md">Collaborator</span>
          <div v-for="(person,index) in collab_list" class="row q-mb-sm q-mt-sm justify-between" :key="index">
            <span><q-badge color="white" rounded class="q-pa-xd" text-color="black">
              <q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">
              {{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>
            <q-btn flat round icon="close" size="sm" @click="deletePerson(index, 'collab')"/>
          </div>
          <q-select
            class="q-mb-sm"
            v-model="post_collaboration"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @filter="filterCollab"
            @input="addCollab()"
            :options="collab_option"
            :option-value="'id'"
            :option-label="'name'"
            dense
            outlined
            hide-dropdown-icon
            ref="collab"
            placeholder="Add Collabolator"
            behavior="menu"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section class="">{{ scope.opt.name }}</q-item-section>
                <q-item-section side v-show="scope.opt.tag !== undefined">{{ scope.opt.tag }}</q-item-section>
              </q-item>
            </template>
          </q-select>
          <div class="row q-mt-md">
            <div class="text-neutral">
              <q-toggle v-model="limit_state"/>
              Limited Post
            </div>
          </div>
          <span v-if="limit_list.length > 0" class="q-mb-md">Limit access to</span>
          <div v-for="(person,index) in limit_list" class="row q-mb-sm q-mt-sm justify-between" :key="index">
            <span><q-badge color="white" rounded class="q-pa-xd" text-color="black">
              <q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">
              {{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>
            <q-btn flat round icon="close" size="sm" @click="deletePerson(index, 'limit')"/>
          </div>
          <q-select
            class="q-mb-sm"
            v-model="post_limit"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @filter="filterLimit"
            @input="addLimit()"
            :options="limit_option"
            :option-value="'id'"
            :option-label="'name'"
            dense
            outlined
            hide-dropdown-icon
            ref="limit"
            placeholder="Add Limited User"
            behavior="menu"
            v-if="limit_state"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section class="">{{ scope.opt.name }}</q-item-section>
                <q-item-section side v-show="scope.opt.tag !== undefined">{{ scope.opt.tag }}</q-item-section>
              </q-item>
            </template>
          </q-select>
          <div v-if="scan.linkStatus" class="">
            <link-prevue apiUrl="./prevue/" :url="scan.url">
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
                      <q-img :src="props.img[0]" fit="fill"/>
                    </q-card>
                  </q-card-section>
                  <q-card-section :class="props.img.length >0 ? 'q-pt-none' : ''">
                    <div class="text-subtitle2" v-if="props.source === 'YouTube'">{{props.title}}</div>
                    <div class="text-subtitle2" v-else="">{{scan.mainUrl}}</div>
                    <div class="text-url text-grey-7">{{props.url}}</div>
                  </q-card-section>
                </q-card>
              </template>
            </link-prevue>
          </div>
          <div class="cursor-pointer text-right">
          <q-btn outline color="red" class="" size="sm" label="Delete all"  v-if="finish_files.length > 0" @click="handleDelAll()"/>
          </div>
          <!--          <q-list :hidden="!show_post_file" class="q-mt-sm">-->
          <q-list :hidden="finish_files === 0" class="q-mt-sm">
            <div v-for="(item, index) in finish_files" :key="index">
              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage_post="true" @delete_knowledge="handleDelFile(item, 'file')"/>
            </div>
          </q-list>
          <!--          <div :hidden="!show_post_photo" class="q-mt-sm">-->
          <!--            <PostListMedia :list_data="finish_files" :download="false" :delete="true" @update_list="updateList"/>-->
          <!--          </div>-->
          <!--          <div :hidden="!show_post_file">-->
          <!--            <q-uploader-->
          <!--              :url="handleUpload"-->
          <!--              ref="uploaderDoc"-->
          <!--              label="Document upload"-->
          <!--              max-file-size="100000000"-->
          <!--              multiple-->
          <!--              batch-->
          <!--              auto-upload-->
          <!--              style="width: 100%"-->
          <!--              class="shadow-0 q-uploader&#45;&#45;bordered kmp-rounded q-mt-sm"-->
          <!--            />-->
          <!--          </div>-->
          <!--          <div :hidden="!show_post_photo">-->
          <!--            <q-uploader-->
          <!--              :url="handleUpload"-->
          <!--              ref="uploader"-->
          <!--              label="Media upload"-->
          <!--              multiple-->
          <!--              accept=".mp4,.jpg, image/*"-->
          <!--              batch-->
          <!--              auto-upload-->
          <!--              style="width: 100%"-->
          <!--              class="shadow-0 q-uploader&#45;&#45;bordered kmp-rounded q-mt-sm"-->
          <!--            />-->
          <!--          </div>-->
        </q-card-section>
        <q-card-section v-if="finish_files.length > 0">
          <div class="row">
            <div class="kmp-font-sm q-mb-none col-12">Publish at</div>
            <div class="col-12 col-md-6">
              <div class="q-my-sm"><q-radio dense v-model="publish_at" val="now" label="Now" @input="onSchedule" /></div>
              <div class="q-mb-sm"><q-radio dense v-model="publish_at" val="schedule" label="Specific Date and Time" @input="onSchedule" /></div>
              <div class="q-mb-sm" v-if="publish_at === 'schedule'">
                <q-input dense borderless v-model="post_date" style="min-width: 180px">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="post_date" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="post_date" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-linear-progress v-if="loading_upload" indeterminate rounded color="negative" class="q-my-sm"/>
        </q-card-section>
        <q-card-section class="q-py-none">
          <div class="row mobile-only q-mb-md">
            <!--            <q-icon name="video_camera_back" color="primary" class="q-mr-md mobile-only" size="24px" @click="() => { show_post_photo = !show_post_photo; show_post_file = false; }"/>-->
            <!--            <q-icon name="attach_file" class="attach-icon mobile-only" size="24px" @click="() => { show_post_file = !show_post_file; show_post_photo = false; }"/>-->
            <q-icon name="video_camera_back" color="primary" class="q-mr-md mobile-only" size="24px" @click="() => { mediaVisible = true; defaultTab = 'media'; }"/>
            <q-icon name="attach_file" class="attach-icon mobile-only" size="24px" @click="() => { mediaVisible = true; defaultTab = 'document'; }"/>
          </div>
          <div class="row items-center">
            <!--            <q-icon name="video_camera_back" color="primary" class="q-mr-sm desktop-only" size="24px" @click="() => { show_post_photo = !show_post_photo; show_post_file = false; }"/>-->
            <!--            <q-icon name="attach_file" class="attach-icon desktop-only" size="24px" @click="() => { show_post_file = !show_post_file; show_post_photo = false; }"/>-->
            <q-icon name="video_camera_back" color="primary" class="q-mr-sm desktop-only cursor-pointer" size="24px" @click="() => { mediaVisible = true; defaultTab = 'media'; }"/>
            <q-icon name="attach_file" class="attach-icon desktop-only cursor-pointer" size="24px" @click="() => { mediaVisible = true; defaultTab = 'document'; }"/>
            <!-- <span class="q-mx-md text-grey">|</span> -->
            <!-- <q-icon name="insert_emoticon" class="q-mr-sm smile-icon" size="24px" style=""/> -->
            <q-space class="desktop-only"/>
            <div class="q-mr-sm">
              <label class="label-form">Publish to</label>
              <q-select dense borderless color="primary" class="q-pa-none"
                        v-model="channelValue"
                        :options="optChannel"
                        style="width: 170px;"
                        behavior="menu"
              >
              </q-select>
            </div>
            <q-space class="mobile-only"/>
            <q-btn no-caps unelevated
                   color="primary"
                   label="Publish"
                   @click="handlePost"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="create_poll" :maximized="$q.platform.is.mobile ? true : false">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section class="q-py-none mobile-only row">
          <div class="col-1 q-mt-xs">
            <q-icon name="arrow_back" class="" :size="$q.platform.is.mobile ? '20px' : '30px'"
                    style="" v-close-popup/>
          </div>
          <div class="col-10">
            <q-item-section class="q-ml-sm">
              <q-item-label class="kmp-text-nama">Create a Poll</q-item-label>
              <q-item-label class="kmp-font-small">#{{data_channel.name}}</q-item-label>
            </q-item-section>
          </div>
        </q-card-section>
        <q-card-section class="q-py-none desktop-only">
          <div class="row items-center">
            <Avatar class="q-mr-md" size="xl" :picture="profile_picture ? profile_picture : ''" :name="profile_name"/>
            <span class="text-primary">{{ profile_name }}</span>
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense v-close-popup/>
          </div>
        </q-card-section>
        <!-- <q-card-section class="q-pb-none" hidden>
          <q-input dense outlined autogrow v-model="post_title"
                   class="q-mb-sm"
                   @change="handleChange($event, post_title)"
                   placeholder="Title post"
          />
          <q-input dense outlined v-model="post_description"
                   type="textarea"
                   @change="handleChange($event, post_description)"
                   placeholder="Write something"
          />
        </q-card-section> -->
        <q-card-section class="q-py-none">
          <q-separator class="q-my-md"/>
          <q-input dense outlined autogrow v-model="poll_question"
                   class="q-mb-sm"
                   @change="handleChange($event, poll_question)"
                   placeholder="Question"
          />
          <div class="q-mt-md q-mb-sm">
            <label>Choices</label>
          </div>
          <div>
            <draggable class="list-group"
                       v-model="poll_choice"
                       v-bind="dragOptions"
                       group="polling"
                       @start="isDragging = true"
                       @end="isDragging = false"
            >
              <transition-group type="transition" name="flip-list">
                <div class="row q-mb-sm list-group-item" v-for="(item, index) in poll_choice" :key="`${index}`">
                  <div class="col-1">
                    <q-icon class="list-group-icon" name="drag_indicator" style="margin-top:0.4rem;font-size: 1.5rem;"/>
                  </div>
                  <div class="col-10">
                    <q-input dense outlined v-model="item.value" @change="handleChange($event, item.class)"
                             :placeholder="item.placeholder">
                      <template v-slot:append>
                        <q-icon name="add_photo_alternate" style="color: #4F5A70;" @click="handlePollImg(index)" type="file"/>
                      </template>
                    </q-input>
                    <q-img :src="`${pathPicture + item.picture}`"
                           spinner-color="white"
                           class="q-mt-sm"
                           style="height: 140px; max-width: 150px;"
                           v-if="item.picture"
                    />
                    <div hidden>
                      <q-file ref="file" accept=".jpg, image/*" dense clearable filled @input="filePicked($event, index)"></q-file>
                    </div>
                  </div>
                  <div class="col-1 items-center">
                    <q-icon @click="hendleDelChoice(item.id, index)" name="delete" class="float-right"
                            style="color: #4F5A70;margin-top:0.6rem;font-size: 1.5rem;"
                    />
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>
          <div class="row q-mt-sm" @click="addList">
            <q-icon name="add_circle_outline" color="primary" style="margin-top:0.2rem;margin-right:0.2rem"/>
            <label class="text-primary">Add more choice</label>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-separator class="q-my-md"/>
          <div class="row">
            <div class="col-6">
              <q-input dense outlined v-model="poll_enddate"
                       class="q-mr-xs"
                       placeholder="End date"
                       mask="date"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="poll_enddate" :options="optionsFn">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat/>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-6">
              <q-input dense outlined v-model="poll_endtime"
                       class="q-ml-xs"
                       placeholder="End time"
                       mask="time"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time v-model="poll_endtime" mask="HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat/>
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="text-neutral">
              <q-toggle v-model="limit_state"/>
              Limited Post
            </div>
          </div>
          <span v-if="limit_list.length > 0" class="q-mb-md">Limit access to</span>
          <div v-for="(person,index) in limit_list" class="row q-mb-sm q-mt-sm justify-between" :key="index">
            <span><q-badge color="white" rounded class="q-pa-xd" text-color="black">
              <q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">
              {{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>
            <q-btn flat round icon="close" size="sm" @click="deletePerson(index, 'limit')"/>
          </div>
          <q-select
            class="q-mb-sm"
            v-model="post_limit"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @filter="filterLimit"
            @input="addLimit()"
            :options="limit_option"
            :option-value="'id'"
            :option-label="'name'"
            dense
            outlined
            hide-dropdown-icon
            ref="limit"
            placeholder="Add Limited User"
            behavior="menu"
            v-if="limit_state"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section class="">{{ scope.opt.name }}</q-item-section>
                <q-item-section side v-show="scope.opt.tag !== undefined">{{ scope.opt.tag }}</q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section :class="$q.platform.is.mobile ? 'q-py-none fixed-bottom' : 'q-py-none'">
          <div class="row items-center">
            <q-space class="desktop-only"/>
            <div class="q-mr-sm">
              <label class="label-form">Publish to</label>
              <q-select dense borderless color="primary" class="q-pa-0"
                        v-model="channelValue"
                        :options="optChannel"
                        style="width: 170px;"
              >
              </q-select>
            </div>
            <q-space class="mobile-only"/>
            <q-btn no-caps unelevated
                   color="primary"
                   label="Publish"
                   @click="handlePost"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="create_event" :maximized="$q.platform.is.mobile ? true : false">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-event-mobile' : 'kmp-modal-event'">
        <q-card-section class="q-py-none mobile-only row">
          <div class="col-1 q-mt-xs">
            <q-icon name="arrow_back" class="" :size="$q.platform.is.mobile ? '20px' : '30px'"
                    style="" v-close-popup/>
          </div>
          <div class="col-10">
            <q-item-section class="q-ml-sm">
              <q-item-label class="kmp-text-nama">Create an Event</q-item-label>
              <q-item-label class="kmp-font-small">#{{data_channel.name}}</q-item-label>
            </q-item-section>
          </div>
        </q-card-section>
        <q-separator class="mobile-only q-mt-sm"/>
        <q-card-section class="q-py-none desktop-only">
          <div class="row items-center">
            <Avatar class="q-mr-md" size="xl" :picture="profile_picture ? profile_picture : ''" :name="profile_name"/>
            <span class="text-primary">{{ profile_name }}</span>
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense v-close-popup/>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-md desktop-only">
          <div class="text-title">Create an event</div>
        </q-card-section>
        <q-card-section class="q-pt-sm">
          <q-uploader
            :url="handleUploadEvent"
            ref="uploader"
            label="Banner Event"
            max-files="1"
            accept="image/*"
            batch
            auto-upload
            style="width: 100%"
            class="shadow-0 q-uploader--bordered kmp-rounded"
          />
          <div class="q-mt-sm">
            Maks file size 1Mb
          </div>
        </q-card-section>
        <q-card-section class="q-py-none">
          <div class="q-mt-md q-mb-sm">
            <label>Event name</label>
          </div>
          <q-input dense outlined autogrow v-model="event_name"
                  class="q-mb-sm"
                  placeholder=""
          />
          <div class="row">
            <div :class="!all_day ? 'col-6' : 'col-12'">
              <div class="q-mt-md q-mb-sm">
                <label>Start date</label>
              </div>
              <q-input dense outlined v-model="event_startdate"
                       class="q-mr-xs"
                       placeholder="Start date"
                       mask="date"
                       :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale">
                      <q-date v-model="event_startdate" :options="optionsFn" @input="setStartDate()">
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-6" v-if="!all_day">
              <div class="q-mt-md q-mb-sm">
                <label>Start time</label>
              </div>
              <q-input dense outlined v-model="event_starttime"
                       class="q-ml-xs"
                       placeholder="-- : --"
                       mask="time"
                       :rules="['time']"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qTimeProxyStart" transition-show="scale" transition-hide="scale">
                      <q-time v-model="event_starttime" mask="HH:mm" format24h @input="setStartTime()">
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div :class="!all_day ? 'col-6' : 'col-12'">
              <div class="q-mt-md q-mb-sm">
                <label>End date</label>
              </div>
              <q-input dense outlined v-model="event_enddate"
                       class="q-mr-xs"
                       placeholder="End date"
                       mask="date"
                       :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qEndDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="event_enddate" :options="optionsFn" @input="$refs.qEndDateProxy.hide()">
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-6" v-if="!all_day">
              <div class="q-mt-md q-mb-sm">
                <label>End time</label>
              </div>
              <q-input dense outlined v-model="event_endtime"
                       class="q-ml-xs"
                       placeholder="-- : --"
                       mask="time"
                       :rules="['time']"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qEndTimeProxy" transition-show="scale" transition-hide="scale">
                      <q-time v-model="event_endtime" mask="HH:mm" format24h @input="$refs.qEndTimeProxy.hide()">
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="text-neutral">
              <q-toggle v-model="all_day"/>
              All Day Event
            </div>
          </div>
          <div class="q-mt-md q-mb-sm">
            <label>Type</label>
          </div>
          <q-select
              v-model="event_type"
              :options="['Offline', 'Online', 'Hybrid']"
              outlined
              dense
            >
            </q-select>
          <div v-if="event_type === 'Offline' || event_type === 'Hybrid' ">
            <div class="q-mt-md q-mb-sm">
              <label>Locations</label>
            </div>
            <q-input dense outlined autogrow v-model="location"
                    class="q-mb-sm"
                    placeholder="Add location of the event"
            />
          </div>
          <div v-if="event_type === 'Online' || event_type === 'Hybrid' ">
            <div class="q-mt-md q-mb-sm">
              <label>Link</label>
            </div>
            <q-input dense outlined autogrow v-model="link"
                    class="q-mb-sm"
                    placeholder=""
            />
          </div>
          <div class="q-mt-md q-mb-sm">
            <label>Notification reminder</label>
          </div>
          <div class="row">
            <div class="col-6">
              <q-input dense outlined autogrow v-model="reminder"
                      class="q-mb-sm"
                      placeholder=""
                      type="number"
              />
            </div>
            <div class="col-6 q-pl-sm">
              <q-select
                v-model="reminder_type"
                :options="['Hours', 'Day']"
                outlined
                dense
              >
              </q-select>
            </div>
          </div>
          <div class="row">
            <div class="col-5 q-pr-sm q-pt-md text-neutral">
              <q-toggle v-model="is_rsvp"/>
              RSVP for event
            </div>
          </div>
          <div class="q-mt-md q-mb-sm">
            <label>Description</label>
          </div>
          <q-input dense outlined v-model="event_description"
                  placeholder="Topics, schedule, many more."
                  type="textarea"
          />
          <q-separator class="q-my-md"/>
          <div class="text-title">Speaker/Moderator (optional)</div>
        </q-card-section>
        <q-card-section v-if="this.person_list.length > 0" class="q-pt-none q-mt-md">
          <div v-for="(person,index) in this.person_list" class="row q-mb-xs" :key="index">
            <div class="col-8">
              <div class="text-neutral">
                <span><q-badge color="blue" rounded class="q-pa-xd"><q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">{{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>
              </div>
            </div>
            <div class="col-4 text-right text-neutral">
              {{ person.roles }} <q-btn flat round icon="close" size="sm" @click="deletePerson(index)"/>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-md d-flex justify-between">
          <div class="text-title kmp-text-blue-2 cursor-pointer text-right" @click="modal_add_external = true">+ Add External Person</div>
          <div class="row">
            <div :class="$q.platform.is.mobile ? 'col-12 q-mb-sm' : 'col-6 q-pr-sm'">
              <div class="text-neutral">Roles</div>
              <q-select
                v-model="event_roles"
                :options="['Moderator','Speaker', 'Instructor']"
                outlined
                dense
                behavior="menu"
              >
              </q-select>
            </div>
            <div  :class="$q.platform.is.mobile ? 'col-12 text-neutral' : 'col-6 q-pr-sm text-neutral'">
              <div class="text-neutral">Add Person</div>
              <q-select
                v-model="event_person_id"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                @filter="filterPersons"
                @input="addPerson()"
                :options="persons_option"
                :option-value="'id'"
                :option-label="'name'"
                name="persons_option"
                dense
                outlined
                ref="person"
                :disable="event_roles === ''"
                behavior="menu"
              >
              </q-select>
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="text-neutral">
              <q-toggle v-model="limit_state"/>
              Limited Post
            </div>
          </div>
          <span v-if="limit_list.length > 0" class="q-mb-md">Limit access to</span>
          <div v-for="(person,index) in limit_list" class="row q-mb-sm q-mt-sm justify-between" :key="index">
            <span><q-badge color="white" rounded class="q-pa-xd" text-color="black">
              <q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">
              {{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>
            <q-btn flat round icon="close" size="sm" @click="deletePerson(index, 'limit')"/>
          </div>
          <q-select
            class="q-mb-sm"
            v-model="post_limit"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            @filter="filterLimit"
            @input="addLimit()"
            :options="limit_option"
            :option-value="'id'"
            :option-label="'name'"
            dense
            outlined
            hide-dropdown-icon
            ref="limit"
            placeholder="Add Limited User"
            behavior="menu"
            v-if="limit_state"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section class="">{{ scope.opt.name }}</q-item-section>
                <q-item-section side v-show="scope.opt.tag !== undefined">{{ scope.opt.tag }}</q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
        <q-card-section class="q-py-none">
          <div class="row items-center">
            <q-space class="desktop-only"/>
            <div class="q-mr-sm">
              <label class="label-form">Publish to</label>
              <q-select dense borderless color="primary" class="q-pa-0"
                        v-model="channelValue"
                        :options="optChannel"
                        style="width: 170px;"
              >
              </q-select>
            </div>
            <q-space class="mobile-only"/>
            <q-btn no-caps unelevated
                   color="primary"
                   label="Publish"
                   @click="handlePost"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <fixed-modal
      :show="modal_add_external"
      title="Add External Person"
      @on-close="modal_add_external = false"
    >
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Roles</div>
        <q-select
          v-model="external_roles"
          :options="['Moderator','Speaker', 'Instructor']"
          outlined
          dense
          behavior="menu"
        >
        </q-select>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-neutral">Name</div>
        <q-input dense v-model="external_name" outlined/>
      </q-card-section>

      <template #footer>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated @click="modal_add_external = false">Cancel</q-btn>
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated
                  @click='addNewExternal();' :disable="external_roles ===  '' || external_name ===  '' "/>
        </q-card-actions>
      </template>
    </fixed-modal>
  </div>
</template>

<script>
import Avatar from 'components/common/Avatar';
import KnowledgeListFile from 'components/KnowledgeListFile';
import PostArticleCreateV2 from 'components/post/PostArticleCreateV2';
import { Notify, date } from 'quasar';
import {
  channelList,
  fileUpload,
  poollChoicePicture,
  postCreate,
  SearchDataAutocomplete,
  eventCreate,
  getPointActivityByTag,
  getPointHistory,
  channelMemberLatest
} from 'src/lib/api';
import moment from 'moment';
import FixedModal from 'components/common/FixedModal';
import LinkPrevue from 'link-prevue';
// import PostListMedia from 'components/post/PostListMedia';
import draggable from 'vuedraggable';
import bus from 'components/common/EventBus';
import { getCredential } from 'src/lib/storage';
import Media from 'components/media/Media.vue';
import { getLoginId, getUserLogin, urlify, validateDate, validateTime } from '../lib/helper';
import { post } from '../lib/HttpHelper';
import { point } from '../lib/point';

const timeStamp = Date.now();

export default {
  props: ['data_channel', 'heightObserver', 'jumlah', 'is_channel_manager', 'is_content_manager'],
  components: { Media, Avatar, draggable, KnowledgeListFile, LinkPrevue, PostArticleCreateV2, FixedModal },
  data() {
    return {
      defaultTab: 'media',
      mediaVisible: false,
      btnPublishDisable: true,
      listChannel: [],
      optChannel: [],
      channelValue: '',
      scan: {},
      post_id: '',
      post_title: '',
      post_description: '',
      post_collaboration: [],
      poll_question: '',
      poll_choice: [
        { value: '', class: 'answer', name: 'answer1', placeholder: 'Choice 1', picture: null },
        { value: '', class: 'answer', name: 'answer2', placeholder: 'Choice 2', picture: null }
      ],
      poll_enddate: '',
      poll_endtime: '',
      create_article: false,
      create_posts: false,
      create_poll: false,
      show_detail_post: false,
      show_post_file: false,
      show_post_photo: false,
      profile_picture: null,
      profile_name: null,
      profile_id: null,
      loading_upload: false,
      upload_done: false,
      finish_files: [],
      pathUrl: process.env.QUASAR_API_URL,
      pathPicture: `${process.env.QUASAR_API_URL}uploads/files/pollChoice/`,
      event_startdate: '',
      event_starttime: '',
      event_enddate: '',
      event_endtime: '',
      create_event: false,
      all_day: false,
      location: '',
      event_name: '',
      reminder: '',
      reminder_type: '',
      is_rsvp: false,
      event_description: '',
      event_person_id: '',
      event_roles: '',
      persons_option: [],
      collab_option: [],
      link: '',
      event_picture: '',
      external: [],
      modal_add_external: false,
      external_roles: '',
      external_name: '',
      person_list: [],
      collab_list: [],
      event_type: '',
      post_init: '',
      data_point: '',
      limit_list: [],
      post_limit: [],
      limit_option: [],
      limit_state: false,
      apiUrl: process.env.QUASAR_API_URL,
      post_date: date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm'),
      publish_at: 'now'
    };
  },
  methods: {
    onMediaDelete(data) {
      console.log(data);
    },
    onMediaSelect(data) {
      data.forEach(x => {
        this.finish_files.push({
          file: x.item
        });
      });

      this.show_post_photo = false;
      this.show_post_file = false;

      const isPhotoExist = this.finish_files.filter(x => ['jpeg', 'jpg', 'png', 'mp4'].includes(x.file.filemime.toLowerCase()));
      const isDocExist = this.finish_files.filter(x => ['docx', 'xlsx', 'pptx', 'zip', 'pdf'].includes(x.file.filemime.toLowerCase()));

      if (isPhotoExist.length > 0) {
        this.show_post_photo = true;
        this.show_post_file = false;
      } else if (isDocExist.length > 0) {
        this.show_post_photo = false;
        this.show_post_file = true;
      }
    },
    filterLimit (val, update, abort) {
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.limit_option = [];
          } else {
            this.limit_option = [];
            const loginId = getLoginId();
            const limitId = this.limit_list.map(m => m.users_id);
            SearchDataAutocomplete({ includes: 'user', keyword: val.toLowerCase() }).then(response => {
              const hasil = response.data.filter(f => {
                return f.users_id !== loginId;
              });
              if (hasil.length < 1) {
                const datanotfound = [{
                  name: 'Data not found',
                  disable: true
                }];
                this.limit_option = datanotfound;
              } else {
                this.limit_option = hasil.map(item => {
                  if (item.user) {
                    if (limitId.includes(item.user.id)) {
                      return {
                        id: item.user.id,
                        name: item.user.name.toUpperCase(),
                        disable: true,
                        tag: 'already added'
                      };
                    }
                    return {
                      id: item.user.id,
                      name: item.user.name.toUpperCase()
                    };
                  }
                  return undefined;
                }).filter(item => item !== undefined);
              }
              this.$refs.limit.refresh();
            });
          }
        });
      }, 500);
    },
    addLimit() {
      this.limit_list.push({ users_id: this.post_limit.id, name: this.post_limit.name });
      setTimeout(() => {
        this.post_limit = [];
      }, 500);
    },
    closeDialogArticle() {
      this.create_article = false;
      this.$emit('update_post');
    },
    setDefaultPost() {
      this.post_id = '';
      this.post_title = '';
      this.post_description = '';
      this.finish_files = [];
      this.loading_upload = false;
      this.poll_question = '';
      this.poll_choice = [
        { value: '', class: 'answer', name: 'answer1', placeholder: 'Choice 1', picture: null },
        { value: '', class: 'answer', name: 'answer2', placeholder: 'Choice 2', picture: null }
      ];
      this.poll_enddate = '';
      this.poll_endtime = '';
      this.collab_list = [];
      this.scan = {};
      this.publish_at = 'now';
    },
    openDialog(dialogName) {
      this.show_post_file = false;
      this.show_post_photo = false;
      if (dialogName === 'create_article2') {
        this.create_article = true;
        this.scan = {};
        // this.setDefaultPost();
      }
      if (dialogName === 'create_posts') {
        this.create_posts = true;
        this.scan = {};
        // this.setDefaultPost();
      }
      if (dialogName === 'create_poll') {
        this.create_poll = true;
        // this.setDefaultPost();
      }
      if (dialogName === 'create_photo') {
        this.create_posts = true;
        this.show_post_photo = true;
        this.show_post_file = false;
        // this.setDefaultPost();
      }
      if (dialogName === 'create_file') {
        this.create_posts = true;
        this.show_post_file = true;
        this.show_post_photo = false;
        // this.setDefaultPost();
      }
      if (dialogName === 'create_article') {
        this.setDefaultPost();
        // this.$router.push('/article');
        this.$router.push({
          name: 'post-article',
          params: {
            id: this.data_channel.id,
            title: this.data_channel.name
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/\//g, '-')
          }
        });
      }
      if (dialogName === 'create_event') {
        this.create_event = true;
        const today = this.getToday();
        this.event_startdate = today;
        this.event_enddate = today;
        this.setDefaultPost();
      }
    },
    handleOpen() {
      this.openDialog('create_posts');
    },
    handleChange(e, field) {
      if (field === 'post_title') {
        this.post_title = e.target.value;
      } else if (field === 'post_description') {
        this.scan = urlify(e);
        this.post_description = e;
        if (e.length > 1000) {
          this.post_init = { article: e };
          this.create_posts = false;
          this.openDialog('create_article2');
          Notify.create({
            message: 'Switch to Article Editor',
            timeout: 3000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
        }
      } else if (field === 'poll_question') {
        this.poll_question = e.target.value;
      } else if (field === 'answer') {
        this.poll_choice.filter(v => {
          return v.name === e.target.name;
        }).value = e.target.value;
      }
    },
    handleUpload(files, content_type) {
      this.loading_upload = true;
      files.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', files[i]);
        fileUpload(formData).then(res => {
          const response = res.data[0];
          // this.addPostFiles(response);
          if (res.message === 'OK') {
            this.finish_files.push(
              { file: response }
            );
            if (files.length === i + 1) {
              this.loading_upload = false;
              this.$refs.uploader.reset(); this.$refs.uploaderDoc.reset();
              this.upload_done = true;
            }
          }
        });
      });
    },
    handleUploadEvent(files, content_type) {
      files.forEach((v, i, a) => {
        if (files[i].size >= 1 * 1024 * 1024) {
          Notify.create({
            message: `[ ${files[i].name} ] melebihi batas 1MB`,
            color: 'negative',
            icon: 'error'
          });
        } else {
          const formData = new FormData();
          formData.append('file[]', files[i]);
          fileUpload(formData).then(res => {
            this.event_picture = res.data[0].path;
          }).catch(error => {
            // console.log(error.response);
          });
        }
      });
    },
    hendleDelChoice(id, index) {
      this.poll_choice = this.deleteList(this.poll_choice, index);
    },
    addList() {
      const id = this.poll_choice.length + 1;
      this.poll_choice.push(
        { value: '', class: 'answer', name: `answer${id}`, placeholder: `Choice ${id}`, picture: null }
      );
    },
    deleteList(object, index) {
      object.splice(index, 1);
      return object;
    },
    handleDelFile(index, type) {
      this.finish_files = this.deleteList(this.finish_files, index);
    },
    handleDelAll() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete all this file?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.finish_files = [];
      });
    },
    optionChannel() {
      channelList().then(res => {
        const arrayOption = [];
        const mapData = res.data;
        mapData.forEach(v => {
          arrayOption.push(`<span class="text-primary text-weight-bold">${v.short_name}</span>`);
        });
        const list = mapData.map(v => (
          {
            id: v.id,
            name: 'channel',
            type: v.channel_type,
            label: v.short_name,
            labelHtml: `<span class="text-primary text-weight-bold">${v.short_name}</span>`
          }
        ));
        this.listChannel = list;
        this.optChannel = arrayOption;
        const idx = list.findIndex(v => v.id.toString() === this.$route.params.id.toString());
        this.channelValue = `<span class="text-primary text-weight-bold">${list[idx].label}</span>`;
      });
    },
    handlePost() {
      let title_post = '';
      let des = '';
      if (this.create_poll) {
        title_post = this.poll_question;
        des = this.poll_question;
      } else if (this.create_event) {
        title_post = this.event_name;
        des = this.event_description;
      } else {
        title_post = this.post_title;
        des = this.post_description;
      }
      const params = {
        channel_id: this.listChannel.find(v => { return v.labelHtml === this.channelValue; }).id, // this.$route.params.id,
        created_by: getLoginId(),
        enabled: true,
        status: 'Unverified',
        title: title_post,
        description: des,
        channel_type: this.listChannel.find(v => { return v.labelHtml === this.channelValue; }).type,
        post_collaboration: this.collab_list,
        limited: this.limit_state,
        post_limit: this.limit_list
      };
      if (this.create_poll) {
        params.post_type = 'Poll';
        // console.log('POST POLLING', params);
        this.validationCheck(params.post_type);
        setTimeout(() => {
          if (this.btnPublishDisable) {
            this.submitPost(params);
            this.create_poll = false;
          } else {
            Notify.create({
              message: 'Error, this form not complete!',
              timeout: 1000,
              type: 'negative',
              color: 'negative',
              icon: 'warning'
            });
          }
        }, 1000);
      } else if (this.create_posts && this.show_post_file && !this.show_post_photo) {
        if (this.finish_files.length > 0) {
          params.post_type = 'Post Document';
          params.created_at = this.publish_at === 'schedule' ? `${this.post_date}:00` : `${moment(new Date()).format('YYYY-MM-DD HH:mm')}:00`;
        } else params.post_type = 'Post';
        // console.log('POST FILE', params);
        this.validationCheck(params.post_type);
        setTimeout(() => {
          if (this.btnPublishDisable) {
            this.submitPost(params);
            this.create_posts = false;
          } else {
            Notify.create({
              message: 'Error, this form not complete!',
              timeout: 1000,
              type: 'negative',
              color: 'negative',
              icon: 'warning'
            });
          }
        }, 1000);
      } else if (this.create_posts && !this.show_post_file && !this.show_post_photo) {
        params.post_type = 'Post';
        // console.log('POST TEXT', params);
        this.validationCheck(params.post_type);
        setTimeout(() => {
          if (this.btnPublishDisable) {
            this.submitPost(params);
            this.create_posts = false;
          } else {
            Notify.create({
              message: 'Error, this form not complete!',
              timeout: 1000,
              type: 'negative',
              color: 'negative',
              icon: 'warning'
            });
          }
        }, 1000);
      } else if (this.create_posts && !this.show_post_file && this.show_post_photo) {
        if (this.finish_files.length > 0) {
          params.post_type = 'Post Image';
          params.created_at = this.publish_at === 'schedule' ? `${this.post_date}:00` : `${moment(new Date()).format('YYYY-MM-DD HH:mm')}:00`;
        } else params.post_type = 'Post';
        this.validationCheck(params.post_type);
        setTimeout(() => {
          if (this.btnPublishDisable) {
            this.submitPost(params);
            this.create_posts = false;
          } else {
            Notify.create({
              message: 'Error, this form not complete!',
              timeout: 1000,
              type: 'negative',
              color: 'negative',
              icon: 'warning'
            });
          }
        }, 1000);
      } else if (this.create_event) {
        params.post_type = 'Event';
        this.validationCheck(params.post_type);
        setTimeout(() => {
          // console.log(this.event_startdate);
          this.submitPost(params);
          this.create_event = false;
        }, 1000);
      }
    },
    async getPoint(tag_point) {
      const data_activity = await getPointActivityByTag(tag_point);
      this.data_point = data_activity.data.point;
      Notify.create({
        message: `Post created successfully.<br>You got ${this.data_point} point for this post`,
        timeout: 3500,
        type: 'positive',
        color: 'blue-6',
        icon: 'check',
        html: true
      });
    },
    async getBadgeNotif(module) {
      const data = {
        type: 'notif',
        module
      };
      const dataHistory = await getPointHistory(data);
      let badgeTitle = '';
      if (dataHistory.data.length > 0) {
        if (dataHistory.data[0].activity_id === 42) {
          badgeTitle = 'TOP POST ADVANCE';
        } else if (dataHistory.data[0].activity_id === 41) {
          badgeTitle = 'TOP POST INTERMEDIATE';
        } else {
          badgeTitle = 'TOP POST BASIC';
        }

        setTimeout(() => {
          Notify.create({
            message: `Congratulations!!<br>You've Won a Badge "${badgeTitle}"`,
            timeout: 3500,
            type: 'positive',
            color: 'green-6',
            icon: 'check',
            html: true
          });
          bus.$emit('update_point');
        }, 2000);
      }
    },
    submitPost(params) {
      this.$emit('update_loading', true);
      postCreate(params).then(res => {
        this.post_id = res.data.id;

        let tag_point = '';
        if (res.message === 'OK') {
          if (res.data.post_type === 'Poll') {
            tag_point = 'polling_create';
          } else if (res.data.post_type !== 'Poll' && params.channel_type === 'Project') {
            tag_point = 'post_project';
          } else if (res.data.post_type !== 'Poll' && params.channel_type !== 'Project') {
            tag_point = 'post_general';
          }
          point('add', { tag: tag_point, post_id: this.post_id })
            .then(() => {
              this.getBadgeNotif('Badge');
            });
          this.getPoint(tag_point);
          if (params.post_collaboration && params.post_collaboration.length > 0) {
            params.post_collaboration.forEach(f => {
              point('add', { tag: tag_point, post_id: this.post_id, account_id: f.users_id });
            });
          }
        }
        if (res.data.post_type === 'Post') {
          setTimeout(() => {
            this.$emit('update_post');
          }, 500);
        } else if (res.data.post_type === 'Post Document' || res.data.post_type === 'Post Image') {
          this.finish_files.forEach(v => {
            post({
              path: 'api/post-file',
              params: {
                created_by: res.data.created_by,
                enabled: true,
                post_id: res.data.id,
                file_id: v.file.id
              }
            }).then(resPostFile => {
              setTimeout(() => {
                this.$emit('update_post');
              }, 500);
            });
          });
        } else if (res.data.post_type === 'Poll') {
          const pollChoice = this.poll_choice.filter(f => {
            return f.value !== '';
          }).map(v => {
            return {
              value: v.value,
              picture: v.picture
            };
          });
          const dataPoll = {
            created_by: res.data.created_by,
            enabled: true,
            post_id: res.data.id,
            title: this.poll_question,
            description: this.poll_question,
            question: this.poll_question,
            end_date: `${this.poll_enddate.replace(/\//g, '-')} ${this.poll_endtime}:00`,
            poll_choice: pollChoice
          };
          post({
            path: 'api/poll',
            params: dataPoll
          }).then(resPoll => {
            setTimeout(() => {
              this.$emit('update_post');
            }, 500);
          });
        } else if (res.data.post_type === 'Event') {
          const dataEvent = {
            created_by: res.data.created_by,
            enabled: true,
            post_id: res.data.id,
            start_date: this.event_startdate,
            end_date: this.event_enddate,
            all_day: this.all_day,
            start_time: this.event_starttime,
            end_time: this.event_endtime,
            locations: this.location,
            reminder_interval: this.reminder,
            reminder_periode: this.reminder_type,
            name: this.event_name,
            description: this.event_description,
            picture: this.event_picture,
            link: this.link,
            is_rsvp: this.is_rsvp,
            expertise: this.person_list
          };
          eventCreate(dataEvent).then(response => {
            this.person_list.forEach(f => {
              if (f.roles === 'Moderator') {
                point('add', { tag: 'event_moderator', post_id: res.data.id, account_id: f.users_id });
              } else {
                point('add', { tag: 'event_sme', post_id: res.data.id, account_id: f.users_id });
              }
            });
            // console.log(response);
            setTimeout(() => {
              this.$emit('update_post');
              this.clearEventForm();
            }, 500);
          });
        }
        if (this.jumlah === 0) {
          this.$emit('update_channel', this.$route.params.id);
        }
        if (params.channel_type === 'General') {
          channelMemberLatest({ id: this.profile_id, type: 'General' });
        } else {
          channelMemberLatest({ id: params.channel_id, type: 'Channel' });
        }
        this.setDefaultPost();
        bus.$emit('update_point');
      });
    },
    validationCheck(type) {
      if (type === 'Post') {
        const cek = (this.post_title !== '' && this.post_description !== '');
        this.btnPublishDisable = cek;
      } else if (type === 'Post Document' || type === 'Post Image') {
      // && this.finish_files.length !== 0
        const cek = (this.post_title !== '' && this.post_description !== '');
        this.btnPublishDisable = cek;
      } else if (type === 'Poll') {
        const cek = (this.poll_question !== ''
        // const cek = (this.post_title !== '' && this.post_description !== '' && this.poll_question !== ''
          && validateDate(this.poll_enddate) && validateTime(this.poll_endtime)
          && this.poll_choice.filter(v => {
            return v.value !== '';
          }).length !== 0);
        this.btnPublishDisable = cek;
      } else if (type === 'Event') {
        const cek = (this.event_name !== ''
          && validateDate(this.event_enddate)
          && validateTime(this.event_endtime)
          && validateDate(this.event_startdate)
          && validateTime(this.event_starttime)
          && this.event_type !== ''
          && this.event_description !== '');
        this.btnPublishDisable = cek;
      }
    },
    optionsFn(tanggal) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();

      today = `${yyyy}/${mm}/${dd}`;
      return tanggal >= today;
    },
    filePicked(file, index) {
      const formData = new FormData();
      formData.append('file[]', file);
      poollChoicePicture(formData).then(res => {
        const fileName = res.data;
        if (res.message === 'OK') {
          this.poll_choice[index].picture = fileName;
          // this.profilePath = process.env.QUASAR_API_URL + response.path;
          // this.profile_edit.profile_picture = response.path;
        }
      });
    },
    handlePollImg(index) {
      this.$refs.file[index].pickFiles();
    },
    updateList(newItem) {
      if (newItem.length > 0) {
        const new_finish_files = newItem.map(v => (
          { file: v }
        ));
        this.finish_files = new_finish_files;
      } else {
        this.finish_files = [];
      }
    },
    filterPersons (val, update, abort) {
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.persons_option = [];
          } else {
            this.persons_option = [];
            SearchDataAutocomplete({ includes: 'user', keyword: val.toLowerCase() }).then(response => {
              const hasil = response.data;
              if (hasil.length < 1) {
                const datanotfound = [{
                  name: 'Data not found',
                  disable: true
                }];
                this.persons_option = datanotfound;
              } else {
                this.persons_option = hasil.map(item => {
                  if (item.user) {
                    return {
                      id: item.user.id,
                      name: item.user.name.toUpperCase()
                    };
                  }
                  return undefined;
                }).filter(item => item !== undefined);
              }
              this.$refs.person.refresh();
            });
          }
        });
      }, 500);
    },
    addPerson() {
      this.person_list.push({ users_id: this.event_person_id.id, name: this.event_person_id.name, roles: this.event_roles });
      this.event_roles = '';
      this.event_person_id = '';
    },
    filterCollab (val, update, abort) {
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.collab_option = [];
          } else {
            this.collab_option = [];
            const loginId = getLoginId();
            const collabId = this.collab_list.map(m => m.users_id);
            SearchDataAutocomplete({ includes: 'user', keyword: val.toLowerCase() }).then(response => {
              const hasil = response.data.filter(f => {
                return f.users_id !== loginId;
              });
              if (hasil.length < 1) {
                const datanotfound = [{
                  name: 'Data not found',
                  disable: true
                }];
                this.collab_option = datanotfound;
              } else {
                this.collab_option = hasil.map(item => {
                  if (item.user) {
                    if (collabId.includes(item.user.id)) {
                      return {
                        id: item.user.id,
                        name: item.user.name.toUpperCase(),
                        disable: true,
                        tag: 'already added'
                      };
                    }
                    return {
                      id: item.user.id,
                      name: item.user.name.toUpperCase()
                    };
                  }
                  return undefined;
                }).filter(item => item !== undefined);
              }
              this.$refs.collab.refresh();
            });
          }
        });
      }, 500);
    },
    addCollab() {
      if (this.collab_list.length < 5) {
        this.collab_list.push({ users_id: this.post_collaboration.id, name: this.post_collaboration.name });
      } else {
        this.$q.notify({
          message: 'Maksimum collab 5 member',
          timeout: 2000,
          color: 'warning',
          icon: 'info',
          caption: 'Error',
          position: 'bottom'
        });
      }
      setTimeout(() => {
        this.post_collaboration = [];
      }, 500);
    },
    deletePerson(index, type) {
      if (type === 'collab') {
        this.collab_list.splice(index, 1);
      }
      this.person_list.splice(index, 1);
    },
    addNewExternal() {
      this.person_list.push({ users_id: null, name: this.external_name, roles: this.external_roles });
    },
    clearEventForm() {
      this.event_startdate = '';
      this.event_enddate = '';
      this.all_day = false;
      this.event_starttime = '';
      this.event_endtime = '';
      this.location = '';
      this.reminder = '';
      this.reminder_type = '';
      this.event_name = '';
      this.event_description = '';
      this.event_picture = '';
      this.link = '';
      this.is_rsvp = false;
      this.person_list = [];
      this.collab_list = [];
    },
    getToday() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();

      today = `${yyyy}/${mm}/${dd}`;
      return today;
    },
    setStartDate() {
      this.$refs.qDateProxyStart.hide();
      this.event_enddate = this.event_startdate;
    },
    setStartTime() {
      this.$refs.qTimeProxyStart.hide();
      this.event_endtime = this.event_starttime;
    },
    getUser() {
      const userLogin = getUserLogin();
      this.profile_name = userLogin.name;
      this.profile_id = userLogin.id;
      const newPic = getCredential().userPic;
      const path = process.env.QUASAR_API_URL;
      if (newPic !== null) {
        this.profile_picture = path + newPic;
      } else {
        this.profile_picture = userLogin.profile_picture !== null ? path + userLogin.profile_picture : null;
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      deep: true,
      handler(value) {
        this.optionChannel();
      }
    }
  },
  mounted() {
    this.optionChannel();
    this.getUser();
  }
};
</script>

<style>
.btn-primary-color {
  background: #2C8ED3;
  color: white;
}

.publish-button {
  border-radius: 8px;
}

.queue-icon {
  color: #2C8ED3;
}

.smile-icon {
  color: #F19B1A;
}

.label-form {
  display: flex;
  font-weight: normal;
  font-size: 12px;
  line-height: 140%;
  color: #4F5A70;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}
.list-group-icon {
  cursor: move;
}
</style>
