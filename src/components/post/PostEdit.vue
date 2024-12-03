<template>
  <div class="q-pr-lg items-start">
    <Media v-model="mediaVisible" :default-tab="defaultTab" @select="onMediaSelect" @delete="onMediaDelete" />
    <q-dialog v-model="edit_posts" :maximized="$q.platform.is.mobile ? true : false">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section class="q-py-none mobile-only row">
          <div class="col-1 q-mt-xs">
            <q-icon name="arrow_back" class="" :size="$q.platform.is.mobile ? '20px' : '30px'"
                    style="" v-close-popup/>
          </div>
          <div class="col-10">
            <q-item-section class="q-ml-sm">
              <q-item-label class="kmp-text-nama">Edit post</q-item-label>
              <q-item-label class="kmp-font-small">#</q-item-label>
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
                   class="q-mb-sm"
                   type="textarea"
                   :rows="$q.platform.is.mobile ? 22 : 6"
                   @input="handleChange($event, 'post_description')"
                   placeholder="Write something"
          />
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
          <div v-for="(person,index) in collab_list" class="row q-mb-sm justify-between" :key="index">
            <span><q-badge color="blue" rounded class="q-pa-xd"><q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">{{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>
            <q-btn flat round icon="close" size="sm" @click="deletePerson(index, null, 'collab')"/>
          </div>
          <div class="row q-mt-md">
            <div class="text-neutral">
              <q-toggle v-model="limit_state"/>
              Limited Post
            </div>
          </div>
          <!-- {{limit_list}} -->
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
          <div v-if="limit_state">
            <div v-for="(user,index_limit) in limit_list" class="row q-mb-sm justify-between" :key="index_limit">
              <span><q-badge color="blue" rounded class="q-pa-xd"><q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">{{ user.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ user.name }}</q-badge></span>
              <q-btn flat round icon="close" size="sm" @click="handleDelLimit(user, index_limit)"/>
            </div>
          </div>
          <div v-if="scan.linkStatus" class="q-mt-sm">
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
          <q-list :hidden="!show_post_file" class="q-mt-sm">
            <div v-for="(item, index) in finish_files" :key="index">
              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage_post="true" @delete_knowledge="handleDelFile(item, index)"/>
            </div>
          </q-list>
          <div :hidden="!show_post_photo" class="q-mt-sm">
            <PostListMedia :list_data="finish_files" :download="false" :delete="true" @update_list="updateList"/>
          </div>
          <!-- <div :hidden="!show_post_file">
            <q-uploader
              :url="handleUpload"
              ref="uploaderDoc"
              label="Document upload"
              multiple
              batch
              auto-upload
              style="width: 100%"
              class="shadow-0 q-uploader--bordered kmp-rounded q-mt-sm"
            />
          </div>
          <div :hidden="!show_post_photo">
            <q-uploader
              :url="handleUpload"
              ref="uploader"
              label="Media upload"
              multiple
              accept=".mp4,.jpg, image/*"
              batch
              auto-upload
              style="width: 100%"
              class="shadow-0 q-uploader--bordered kmp-rounded q-mt-sm"
            />
          </div> -->
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-linear-progress v-if="loading_upload" indeterminate rounded color="negative" class="q-my-sm"/>
        </q-card-section>
        <q-card-section class="q-py-none">
          <div class="row mobile-only q-mb-md">
            <q-icon name="video_camera_back" color="primary" class="q-mr-sm" size="24px" @click="() => { mediaVisible = true; defaultTab = 'media'; }"/>
            <q-icon name="attach_file" class="attach-icon" size="24px" @click="() => { mediaVisible = true; defaultTab = 'document'; }"/>
          </div>
          <div class="row items-center">
            <q-icon name="video_camera_back" color="primary" class="q-mr-sm desktop-only" size="24px" @click="() => { mediaVisible = true; defaultTab = 'media'; }"/>
            <q-icon name="attach_file" class="attach-icon desktop-only" size="24px" @click="() => { mediaVisible = true; defaultTab = 'document'; }"/>
            <q-space class="desktop-only"/>
            <div class="q-mr-sm">
              <label class="label-form">Publish to</label>
              <q-select dense borderless color="primary" class="q-pa-none"
                        v-model="channelValue"
                        :options="optChannel"
                        style="width: 170px;"
              >
              <!-- :disable="this.data_post_value !== null" -->
              </q-select>
            </div>
            <q-space class="mobile-only"/>
            <q-btn no-caps unelevated
                   color="primary"
                   label="Publish"
                   @click="handleUpdate"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="edit_poll">
      <q-card style="min-width: 500px" class="q-py-md q-px-sm">
        <q-card-section class="q-py-none">
          <div class="row items-center">
            <Avatar class="q-mr-md" size="xl" :picture="profile_picture ? profile_picture : ''" :name="profile_name"/>
            <span class="text-primary">{{ profile_name }}</span>
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense v-close-popup/>
          </div>
        </q-card-section>
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
          <div class="row q-mb-sm" v-for="(item, index) in poll_choice" :key="index">
            <div class="col-1">
              <q-icon name="drag_indicator" style="margin-top:0.4rem;font-size: 1.5rem;"/>
            </div>
            <div class="col-10">
              <q-input dense outlined v-model="item.value" @change="handleChange($event, item.class)"
                       :placeholder="item.placeholder">
                <template v-slot:append>
                  <q-icon name="add_photo_alternate" style="color: #4F5A70;" @click="handlePollImg(index)" type="file"/>
                </template>
              </q-input>
              <div v-if="item.picture">
                <q-img v-show="item.picture"
                       :src="`${pathPicture + item.picture}`"
                       spinner-color="white"
                       class="q-mt-sm"
                       style="height: 140px; max-width: 150px;"
                />
                <!--
                <iframe v-show="item.picture.split('.')[1] === 'mp4'"
                        :src="`./player?id=pollChoice&src=${item.picture}&type=video`"
                        style="border: none; overflow: hidden; width: 300px; max-width: 300px; height: 173px;"
                        allowfullscreen
                />
                -->
              </div>
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
          <div class="row" @click="addList">
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
        </q-card-section>
        <q-card-section class="q-py-none">
          <div class="row items-center">
            <q-space/>
            <div class="q-mr-sm">
              <label class="label-form">Publish to</label>
              <q-select dense borderless color="primary" class="q-pa-0"
                        v-model="channelValue"
                        :options="optChannel"
                        style="width: 170px;"
              >
              <!-- :disable="this.data_post_value !== null" -->
              </q-select>
            </div>
            <q-btn no-caps unelevated
                   color="primary"
                   label="Publish"
                   @click="handleUpdate"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="edit_article" style="min-width: 80vw" :maximized="true">
      <PostArticleCreateV2 @onClose="closeDialogArticle" :data_post="data_post" :heightObserver="heightObserver" />
    </q-dialog>
    <q-dialog v-model="edit_event" :maximized="$q.platform.is.mobile ? true : false">
      <q-card :class="$q.platform.is.mobile ? 'kmp-modal-detail-mobile' : 'kmp-modal-detail'">
        <q-card-section class="q-py-none mobile-only row">
          <div class="col-1 q-mt-xs">
            <q-icon name="arrow_back" class="" :size="$q.platform.is.mobile ? '20px' : '30px'"
                    style="" v-close-popup/>
          </div>
          <div class="col-10">
            <q-item-section class="q-ml-sm">
              <q-item-label class="kmp-text-nama">Edit Event</q-item-label>
              <q-item-label class="kmp-font-small">#</q-item-label>
            </q-item-section>
          </div>
        </q-card-section>
        <q-separator class="mobile-only q-mt-sm"/>
        <q-card-section class="q-py-none desktop-only">
          <div class="row items-center">
            <q-avatar size="36px" class="q-mr-md">
              <img v-if="profile_picture !== null" :src="profile_picture">
              <q-avatar size="36px" color="primary" text-color="white" v-else="">
                {{ profile_name.match(/\b(\w)/g).join('').toUpperCase() }}
              </q-avatar>
            </q-avatar>
            <span class="text-primary">{{ profile_name }}</span>
            <q-space/>
            <q-btn icon="close" class="text-neutral" flat round dense v-close-popup/>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-md desktop-only">
          <div class="text-title">Edit Event</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-if="event_picture !== null" class="text-center">
            <q-img :src="getPic(event_picture)" style="max-width: 50%" />
          </div>
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
                    <q-popup-proxy ref="qStartDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="event_startdate" :options="optionsFn" @input="$refs.qStartDateProxy.hide()">
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
                    <q-popup-proxy ref="qStartTimeProxy" transition-show="scale" transition-hide="scale">
                      <q-time v-model="event_starttime" mask="HH:mm" format24h @input="$refs.qStartTimeProxy.hide()">
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
          <!-- {{person_list}} -->
        </q-card-section>
        <q-card-section class="q-pt-none q-mt-md">
          <div v-for="(person,index) in person_list" class="row q-mb-xs" :key="index">
            <div class="col-8">
              <div class="text-neutral">
                <span><q-badge color="blue" rounded class="q-pa-xd"><q-avatar size="sm" class="q-mr-xs" color="primary" text-color="white">{{ person.name.match(/\b(\w)/g).join('').toUpperCase() }}</q-avatar> {{ person.name }}</q-badge></span>
              </div>
            </div>
            <div class="col-4 text-right text-neutral">
              {{ person.roles }} <q-btn flat round icon="close" size="sm" @click="deletePerson(index, person)"/>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-md d-flex justify-between">
          <div class="text-weight-bold kmp-text-blue-2 cursor-pointer text-right" @click="modal_add_external = true">+ Add External Person</div>
          <div class="row">
            <div class="col-6 q-pr-sm">
              <div class="text-neutral">Roles</div>
              <q-select
                v-model="event_roles"
                :options="['Moderator','Speaker', 'Instructor']"
                outlined
                dense
              >
              </q-select>
            </div>
            <div class="col-6 text-neutral">
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
              >
<!--                <template v-slot:no-option>-->
<!--                  <q-item>-->
<!--                    <q-item-section class="text-grey">-->
<!--                      No results-->
<!--                    </q-item-section>-->
<!--                  </q-item>-->
<!--                </template>-->
              </q-select>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-py-none">
          <div class="row items-center">
            <q-space/>
            <div class="q-mr-sm">
              <label class="label-form">Publish to</label>
              <q-select dense borderless color="primary" class="q-pa-0"
                        v-model="channelValue"
                        :options="optChannel"
                        style="width: 170px;"
              >
              </q-select>
            </div>
            <q-btn no-caps unelevated
                   color="primary"
                   label="Publish"
                   @click="handleUpdate"
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
import PostListMedia from 'components/post/PostListMedia';
import Media from 'components/media/Media.vue';
import { Notify } from 'quasar';
import FixedModal from 'components/common/FixedModal';
import {
  fileUpload, poollChoiceCreate,
  poollChoiceDelete,
  poollChoicePicture, poollChoiceUpdate,
  poollUpdate,
  postDetail,
  postFileCreate,
  postFileDelete,
  postUpdate,
  eventUpdate,
  SearchDataAutocomplete,
  channelList,
  postLimitDelete
} from 'src/lib/api';
import { getLoginId, getUserLogin, urlify, validateDate, validateTime } from 'src/lib/helper';
// import { post } from 'src/lib/HttpHelper';
import LinkPrevue from 'link-prevue';
import _ from 'lodash';
import moment from 'moment';
import { point } from 'src/lib/point';

export default {
//  props: ['data_post', 'heightObserver'],
//  components: { Avatar, KnowledgeListFile, LinkPrevue, FixedModal, PostArticleCreate, PostListMedia },

  props: ['channel', 'data_channel', 'data_post', 'heightObserver'],
  components: { Avatar, KnowledgeListFile, LinkPrevue, FixedModal, PostArticleCreateV2, PostListMedia, Media },

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
      post_limit: [],
      poll_question: '',
      poll_choice: [
        { value: '', class: 'answer', name: 'answer1', placeholder: 'Choice 1', picture: null },
        { value: '', class: 'answer', name: 'answer2', placeholder: 'Choice 2', picture: null }
      ],
      poll_choice_new: [],
      poll_enddate: '',
      poll_endtime: '',
      edit_article: false,
      edit_posts: false,
      edit_poll: false,
      show_detail_post: false,
      show_post_file: false,
      show_post_photo: false,
      profile_picture: getUserLogin().profile_picture ? process.env.QUASAR_API_URL + getUserLogin().profile_picture : null,
      profile_name: getUserLogin().name,
      loading_upload: false,
      upload_done: false,
      finish_files: [],
      state_edit: false,
      event_startdate: '',
      event_starttime: '',
      event_enddate: '',
      event_endtime: '',
      edit_event: false,
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
      limit_option: [],
      link: '',
      event_picture: '',
      external: [],
      modal_add_external: false,
      external_roles: '',
      external_name: '',
      person_list: [],
      collab_list: [],
      limit_list: [],
      event_type: '',
      date: '',
      event_id: '',
      finish_files_new: [],
      post_files_id: [],
      pathPicture: `${process.env.QUASAR_API_URL}uploads/files/pollChoice/`,
      limit_state: false,
      data_post_detail: ''
    };
  },
  methods: {
    closeDialogArticle() {
      this.edit_article = false;
      this.$emit('update_post');
    },
    setDefaultPost() {
      this.finish_files = [];
      // this.post_id = '';
      // this.post_title = '';
      // this.post_description = '';
      // this.poll_question = '';
      this.poll_choice = [
        { value: '', class: 'answer', name: 'answer1', placeholder: 'Choice 1', picture: null },
        { value: '', class: 'answer', name: 'answer2', placeholder: 'Choice 2', picture: null }
      ];
      // this.poll_enddate = '';
      // this.poll_endtime = '';
    },
    openDialog(dialogName) {
      this.show_post_file = false;
      this.state_edit = true;
      if (dialogName === 'edit_posts') {
        setTimeout(() => {
          this.post_id = this.data_post_value.id;
          this.post_title = this.data_post_value.title;
          this.post_description = this.data_post_value.description;
          this.edit_posts = true;
          this.scan = urlify(this.data_post_value.description);
          this.collab_list = this.data_post_value.post_collaboration ?
            this.data_post_value.post_collaboration.map(m => { return { users_id: m.user.id, name: m.user.name }; })
            : [];
          this.setDefaultPost();
        }, 500);
      }
      if (dialogName === 'edit_event') {
        setTimeout(() => {
          let type = '';
          if (this.data_post_value.event.locations !== null && this.data_post_value.event.link !== null) {
            type = 'hybrid';
          } else if (this.data_post_value.event.locations !== null && this.data_post_value.event.link === null) {
            type = 'Offline';
          } else if (this.data_post_value.event.locations === null && this.data_post_value.event.link !== null) {
            type = 'Online';
          }
          this.post_id = this.data_post_value.id;
          this.event_id = this.data_post_value.event.id;
          this.post_title = this.data_post_value.title;
          this.post_description = this.data_post_value.description;
          this.event_startdate = this.data_post_value.event.start_date;
          this.event_enddate = this.data_post_value.event.end_date;
          this.all_day = this.data_post_value.event.all_day;
          this.event_starttime = this.data_post_value.event.start_time;
          this.event_endtime = this.data_post_value.event.end_time;
          this.location = this.data_post_value.event.locations;
          this.reminder = this.data_post_value.event.reminder_interval;
          this.reminder_type = this.data_post_value.event.reminder_periode;
          this.event_name = this.data_post_value.event.name;
          this.event_description = this.data_post_value.event.description;
          this.event_picture = this.data_post_value.event.picture;
          this.event_type = type;
          this.link = this.data_post_value.event.link;
          this.is_rsvp = this.data_post_value.event.is_rsvp;
          this.person_list = this.data_post_value.event.event_expertise
            ? this.data_post_value.event.event_expertise.map(item => {
              return {
                users_id: item.user_id,
                name: item.name,
                roles: item.type
              };
            })
            : [];
          // this.person_list = this.data_post_value.event.event_expertise;
          this.edit_event = true;
          // this.scan = urlify(this.data_post_value.description);
          // this.setDefaultPost();
          this.collab_list = this.data_post_value.post_collaboration ?
            this.data_post_value.post_collaboration.map(m => { return { users_id: m.user.id, name: m.user.name }; })
            : [];
        }, 500);
      }
      if (dialogName === 'create_poll') {
        this.create_poll = true;
      }
      if (dialogName === 'edit_poll') {
        setTimeout(() => {
          this.edit_poll = true;
          this.setDefaultPost();
        }, 500);
      }
      if (dialogName === 'create_file') {
        this.edit_posts = true;
        this.show_post_file = true;
        this.setDefaultPost();
      }
      if (dialogName === 'edit_article') {
        setTimeout(() => {
          this.post_id = this.data_post_value.id;
          // this.post_title = this.data_post_value.title;
          // this.post_description = this.data_post_value.description;
          this.edit_article = true;
          this.setDefaultPost();
        }, 500);
        // this.$router.push('/article');
        // this.$router.push({
        //   name: 'post-article',
        //   params: {
        //     id: this.data_channel.id,
        //     title: this.data_channel.name
        //       .toLowerCase()
        //       .replace(/ /g, '-')
        //       .replace(/\//g, '-')
        //   }
        // });
      }
    },
    handleChange(e, field) {
      if (field === 'post_title') {
        this.post_title = e.target.value;
      } else if (field === 'post_description') {
        this.scan = urlify(e);
        this.post_description = e;
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
              this.finish_files_new = _.filter(this.finish_files, f => { return f.id === undefined; });
            }
          }
        });
      });
    },
    hendleDelChoice(id, index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete this Choice?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.poll_choice = this.deleteList(this.poll_choice, index);
        if (id) {
          poollChoiceDelete(id);
        }
      });
    },
    addList() {
      const id = this.poll_choice.length + 1;
      this.poll_choice.push(
        { value: '', class: 'answer', name: `answer${id}`, placeholder: `Choice ${id}`, picture: null }
      );
      this.poll_choice_new = _.filter(this.poll_choice, f => { return f.id === undefined; });
    },
    deleteList(object, index) {
      object.splice(index, 1);
      return object;
    },
    handleDelLimit(data, index) {
      console.log(data);
      this.limit_list.splice(index, 1);
      if (data.id) {
        postLimitDelete(this.post_id, data.users_id).then(res => {
          if (res.message === 'OK') {
            Notify.create({
              message: 'Delete user berhasil.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          }
        });
      }
    },
    handleDelAll() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure want to delete all this file?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        postFileDelete({ state: 'all' }, this.post_id).then(res => {
          if (res.message === 'OK') {
            Notify.create({
              message: 'Delete file berhasil.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          }
        });
        this.finish_files = [];
      });
    },
    handleDelFile(data, index) {
      if (data.id) {
        postFileDelete({ state: 'each' }, data.id).then(res => {
          if (res.message === 'OK') {
            Notify.create({
              message: 'Delete file berhasil.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          }
        });
      }
      this.finish_files = this.deleteList(this.finish_files, index);
      // this.finish_files = this.deleteList(this.finish_files, index);
    },
    optionChannel() {
      // this.channelValue = `<span class="text-primary text-weight-bold">${this.data_post_value.post_channel.channel.short_name}</span>`;
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
        const channel_id = this.$route.name !== 'profile' ? this.data_post_value.post_channel.channel_id.toString() : this.data_post.post_channel.channel_id.toString();
        this.optChannel = arrayOption;
        const idx = list.findIndex(v => v.id.toString() === channel_id);
        this.channelValue = `<span class="text-primary text-weight-bold">${list[idx].label}</span>`;
        // this.channelValue = `<span class="text-primary text-weight-bold">${this.data_post_value.post_channel.channel.short_name}</span>`;
      });
    },
    handleUpdate() {
      let title_post = '';
      let des = '';
      if (this.edit_poll) {
        title_post = this.poll_question;
        des = this.poll_question;
      } else {
        title_post = this.post_title;
        des = this.post_description;
      }
      const params = {
        title: title_post,
        description: des,
        post_collaboration: this.collab_list,
        channel_id: this.listChannel.find(v => { return v.labelHtml === this.channelValue; }).id,
        limited: this.limit_state,
        post_limit: this.limit_list
      };
      if (this.edit_poll) {
        params.post_type = 'Poll';
        // console.log('POST POLLING', params);
        this.validationCheck(params.post_type);
        setTimeout(() => {
          if (this.btnPublishDisable) {
            this.submitPost(this.data_post_value.id, params);
            this.edit_poll = false;
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
      } else if (this.edit_posts && this.show_post_file && !this.show_post_photo) {
        params.post_type = 'Post Document';
        // console.log('POST FILE', params);
        this.validationCheck(params.post_type);
        setTimeout(() => {
          if (this.btnPublishDisable) {
            this.submitPost(this.data_post_value.id, params);
            this.edit_posts = false;
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
      } else if (this.edit_posts && !this.show_post_file && !this.show_post_photo) {
        params.post_type = 'Post';
        // console.log('POST TEXT', params);
        this.validationCheck(params.post_type);
        setTimeout(() => {
          if (this.btnPublishDisable) {
            this.submitPost(this.data_post_value.id, params);
            this.edit_posts = false;
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
      } else if (this.edit_event) {
        params.title = this.event_name;
        params.description = this.event_description;
        params.post_type = 'Event';
        this.validationCheck(params.post_type);
        setTimeout(() => {
          if (this.btnPublishDisable) {
            this.submitPost(this.data_post_value.id, params);
            this.edit_event = false;
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
      } else if (this.edit_posts && !this.show_post_file && this.show_post_photo) {
        params.post_type = 'Post Image';
        this.validationCheck(params.post_type);
        setTimeout(() => {
          if (this.btnPublishDisable) {
            this.submitPost(this.data_post_value.id, params);
            this.edit_event = false;
            this.edit_posts = false;
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
      }
    },
    submitPost(id, params) {
      // console.log('IKE');
      this.$emit('update_loading', true);
      // console.log(params);

      postUpdate(id, params).then(res => {
        this.post_id = res.data.id;

        if (res.message === 'OK') {
          Notify.create({
            message: 'Post updated!',
            timeout: 500,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
        }
        if (res.data.post_type === 'Post') {
          this.$emit('update_post');
        } else if (res.data.post_type === 'Post Document' || res.data.post_type === 'Post Image') {
          const tes = this.finish_files.filter(item => item.id === undefined);
          if (tes.length > 0) {
            tes.forEach(v => {
              postFileCreate({
                created_by: res.data.created_by,
                enabled: true,
                post_id: res.data.id,
                file_id: v.file.id
              }).then(res1 => {
              });
            });
          }
          setTimeout(() => {
            this.$emit('update_post');
          }, 500);
        } else if (res.data.post_type === 'Poll') {
          const dataPoll = {
            created_by: res.data.created_by,
            enabled: true,
            post_id: res.data.id,
            title: this.poll_question,
            description: this.poll_question,
            question: this.poll_question,
            end_date: `${this.poll_enddate.replace(/\//g, '-')} ${this.poll_endtime}:00`
          };
          poollUpdate(this.data_post_value.poll.id, dataPoll).then(resPoll => {
            // create new pollchoice
            const newPollChoice = this.poll_choice_new.filter(f => { return f.value !== ''; });
            const oldPollChoice = this.poll_choice.filter(f => { return f.id !== undefined; });
            if (newPollChoice.length > 0) {
              newPollChoice.filter(f => { return f.value !== ''; }).forEach((v, i) => {
                poollChoiceCreate({
                  created_by: resPoll.data.created_by,
                  enabled: true,
                  poll_id: resPoll.data.id,
                  text: v.value,
                  picture: v.picture
                });
              });
            }
            // update old pollchoice
            if (oldPollChoice.length > 0) {
              oldPollChoice.forEach((v, i) => {
                poollChoiceUpdate(`${v.id}`, {
                  created_by: resPoll.data.created_by,
                  enabled: true,
                  poll_id: resPoll.data.id,
                  text: v.value,
                  picture: v.picture
                });
              });
            }
            setTimeout(() => {
              this.$emit('update_post');
            }, 500);
          });
        } else if (res.data.post_type === 'Event') {
          let data_locations = '';
          let data_link = '';
          if (this.event_type === 'Online') {
            data_link = this.link;
          } else if (this.event_type === 'Offline') {
            data_locations = this.location;
          } else {
            data_locations = this.location;
            data_link = this.link;
          }
          const dataEvent = {
            created_by: res.data.created_by,
            enabled: true,
            post_id: res.data.id,
            start_date: this.event_startdate,
            end_date: this.event_enddate,
            all_day: this.all_day,
            start_time: this.event_starttime,
            end_time: this.event_endtime,
            locations: data_locations,
            reminder_interval: this.reminder,
            reminder_periode: this.reminder_type,
            name: this.event_name,
            description: this.event_description,
            picture: this.event_picture,
            link: data_link,
            is_rsvp: this.is_rsvp,
            expertise: this.person_list
          };
          eventUpdate(this.event_id, dataEvent).then(response => {
            this.person_list.forEach(f => {
              if (f.roles === 'Moderator') {
                point('add', { tag: 'event_moderator', post_id: res.data.id, account_id: f.users_id });
              } else {
                point('add', { tag: 'event_sme', post_id: res.data.id, account_id: f.users_id });
              }
            });
            setTimeout(() => {
              this.$emit('update_post');
            }, 500);
          });
          // post({
          //   path: 'api/poll',
          //   params: dataPoll
          // }).then(resPoll => {
          //   this.poll_choice.filter(f => {
          //     return f.value !== '';
          //   }).forEach((v, i) => {
          //     post({
          //       path: 'api/poll-choice',
          //       params: {
          //         created_by: resPoll.data.created_by,
          //         enabled: true,
          //         poll_id: resPoll.data.id,
          //         text: v.value
          //       }
          //     }).then(resPollChoice => {
          //       if (this.poll_choice.filter(f => {
          //         return f.value !== '';
          //       }).length === i + 1) {
          //         this.$emit('update_post');
          //       }
          //     });
          //   });
          // });
        }
      });
    },
    validationCheck(type) {
      if (type === 'Post') {
        const cek = (this.post_title !== '' && this.post_description !== '');
        this.btnPublishDisable = cek;
      } else if (type === 'Post Document') {
        const cek = (this.post_title !== '' && this.post_description !== '' && this.finish_files.length !== 0);
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
          // && validateDate(this.event_enddate)
          // && validateTime(this.event_endtime)
          // && validateDate(this.event_startdate)
          // && validateTime(this.event_starttime)
          && this.event_type !== ''
          && this.event_description !== '');
        this.btnPublishDisable = cek;
      }
    },
    optionsFn(date) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();

      today = `${yyyy}/${mm}/${dd}`;
      return date >= today;
    },
    handleUploadEvent(files, content_type) {
      files.forEach((v, i, a) => {
        if (files[i].size >= 1 * 1024 * 1024) {
          Notify.create({
            message: `[ ${files[i].name} ] melebihi batas 1MB ${files[i].size}`,
            color: 'negative',
            icon: 'error'
          });
        } else {
          const formData = new FormData();
          formData.append('file[]', files[i]);
          fileUpload(formData).then(res => {
            this.event_picture = res.data[0].path;
          }).catch(error => {
            console.log(error.response);
          });
        }
      });
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
      // this.$refs.person.updateInputValue('');
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
    deletePerson(index, person, type) {
      if (type === 'collab') {
        this.collab_list.splice(index, 1);
      } else if (type === 'limit') {
        this.limit_list.splice(index, 1);
      } else {
        this.person_list.splice(index, 1);
        if (person.roles === 'Moderator') {
          point('rollback', { tag: 'event_moderator', post_id: this.data_post_value.id, account_id: person.users_id });
        } else {
          point('add', { tag: 'event_sme', post_id: this.data_post_value.id, account_id: person.users_id });
        }
      }
    },
    addNewExternal() {
      this.person_list.push({ users_id: null, name: this.external_name, roles: this.external_roles });
    },
    getPic(data) {
      const pic = process.env.QUASAR_API_URL + data;
      return pic;
    },
    filePicked(file, index) {
      const formData = new FormData();
      formData.append('file[]', file);
      poollChoicePicture(formData).then(res => {
        const fileName = res.data;
        if (res.message === 'OK') {
          this.poll_choice[index].picture = fileName;
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
    getDetailPost(id, type) {
      if (type === 'Post Image') {
        this.show_post_photo = true;
      } else if (type === 'Post Document') {
        this.show_post_file = true;
      }
      postDetail(id).then(res => {
        const response = res.data;
        this.data_post_detail = response;
        if (type === 'Post Image' || type === 'Post Document') {
          this.finish_files = response.post_file;
          this.post_files_id = _.map(response.post_file, v => (v.id));
        }
        if (type === 'Poll') {
          this.poll_question = response.poll.question;
          this.poll_choice = _.map(response.poll.poll_choice, v => (
            { id: v.id, value: v.text, picture: v.picture }
          ));
          this.poll_enddate = response.poll.end_date;
          this.poll_endtime = moment(response.poll.end_date).format('HH:mm');
        }
        if (type === 'Article') {
          this.data_post_value = response;
        }
        this.limit_list = this.data_post_detail.post_limit ?
          this.data_post_detail.post_limit.map(m => { return { id: m.id, users_id: m.user.id, name: m.user.name }; })
          : [];
        this.limit_state = this.data_post_detail.limited;
      });
    }
  },
  mounted() {
  },
  watch: {
    state_edit(value) {
      if (value !== false) {
        this.optionChannel();
      }
    },
    data_post: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          this.data_post_value = value;
        }
      }
    }
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
  margin-left: 70px;
}

.attach-icon {
  color: #6BCC49;
}

.calendar-icon {
  color: #FFE34E;
}

.poll-icon {
  color: #F33F6A;
}

.notes-icon {
  color: #FFB038;
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
</style>
