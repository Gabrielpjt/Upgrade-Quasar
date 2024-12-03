<template>
  <div class="items-start q-mb-md kmp-sticky" style="margin-top: 50px">
    <q-card v-if="![3].includes(selected_knowledge.level)" class="my-card q-mb-md ">
      <q-card-section>
        <div class="q-mt-xs row">
          <div class="col-1">
            <q-icon name="domain" class="text-neutral q-mr-sm q-mb-sm" size="24px"/>
          </div>
          <div :class="isAuthorized() ? 'col-8' : 'col-11'">
            <div class="title-unitkerja text-capitalize q-ml-md">{{ this.selected_knowledge.label }}</div>
            <div class="subtitle-unitkerja text-capitalize q-ml-md">{{ this.selected_knowledge.story }}</div>
          </div>
          <!--          <q-icon name="close" size="24px" class="text-neutral float-right"/>-->
          <div v-if="isAuthorized()" :class="isAuthorized() ? 'col-3' : ''"
               class="col text-right kmp-text-blue float-right cursor-pointer"
               @click="openDialog('add_target')">
            <span class="text-weight-bold">Target</span>
            <q-icon name="edit" class="q-ml-sm" size="20px"/>
          </div>
        </div>
        <!--        <div>-->
        <!--          <q-icon name="domain" class="text-neutral q-mr-sm q-mb-sm" size="24px"/>-->
        <!--          <span class="title-unitkerja">{{selected_knowledge.label}}</span>-->
        <!--          &lt;!&ndash;          <q-icon name="close" size="24px" class="text-neutral float-right"/>&ndash;&gt;-->
        <!--          <div v-if="user.name === 'admin'" class="col text-right kmp-text-blue float-right cursor-pointer"-->
        <!--               @click="openDialog('add_target')">-->
        <!--            <span class="text-weight-bold">Target</span>-->
        <!--            <q-icon name="edit" class="q-ml-sm" size="20px"/>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="q-mt-lg">
          <span class="text-neutral text-normal">{{
              target_knowledge.length
            }} Target of {{ selected_knowledge.label }}</span>
        </div>
        <q-card class="my-card blue-card q-pa-none q-mt-md" v-for="(item, index) in target_knowledge" :key="index">
          <q-card-section class="q-pa-sm kmp-font-md">
            <div v-html="item.target"/>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
    <q-card v-if="[2].includes(selected_knowledge.level)" class="q-mb-md">
      <q-card-section>
        <div class="q-mt-xs row">
          <div class="col-1">
            <q-icon name="lightbulb" class="text-neutral q-mr-sm q-mb-sm" size="24px"/>
          </div>
          <div class="col-11">
            <div class="title-unitkerja text-capitalize q-ml-md">{{ this.selected_knowledge.label }}</div>
            <div class="subtitle-unitkerja text-capitalize q-ml-md">{{ this.selected_knowledge.story }}</div>
          </div>
          <!--          <q-icon name="close" size="24px" class="text-neutral float-right"/>-->
        </div>
      </q-card-section>
      <q-card-section
        v-if="knowledge_sme_request.length >0"
        class="request kmp-bg-cream q-px-none">
        <div class="text-neutral text-normal q-px-lg q-py-sm">PENDING REQUEST</div>
        <q-list>
          <q-item clickable v-ripple dense class="q-py-sm" v-for="(item, index) in knowledge_sme_request" :key="index">
            <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm">
<!--              <q-avatar size="24px">-->
<!--                <img v-if="item.profile_picture !== null" :src="item.profile_picture">-->
<!--                <q-avatar size="24px" color="primary" text-color="white" v-else="">-->
<!--                  {{ item.name.match(/\b(\w)/g).join('').toUpperCase() }}-->
<!--                </q-avatar>-->
<!--              </q-avatar>-->
              <Avatar size="xl" :picture="item.profile_picture ? `./api${item.profile_picture}` : ''" :name="item.name"/>
            </q-item-section>
            <q-item-section class="" @click="openDialog('detail_expertise', item.id)">
              {{ item.name }}
            </q-item-section>
          </q-item>
        </q-list>
        <!--        <q-item class="q-px-none" :class="index === 0 ? 'q-mt-md' : 'q-mt-none'"-->
        <!--                v-for="(item, index) in knowledge_sme_request" :key="index">-->
        <!--          <q-item-section avatar style="" class="q-pa-none">-->
        <!--            <q-avatar size="24px">-->
        <!--              <img :src="item.profile_picture">-->
        <!--            </q-avatar>-->
        <!--          </q-item-section>-->
        <!--          <q-item-section class="list-member">{{ item.name }}</q-item-section>-->
        <!--          <q-item-section side>-->
        <!--            <div class="kmp-font-small text-right cursor-pointer kmp-text-blue"-->
        <!--                 @click="openDialog('detail_expertise', item.id)">-->
        <!--              See Detail-->
        <!--            </div>-->
        <!--          </q-item-section>-->
        <!--        </q-item>-->
      </q-card-section>
      <q-card-section class="" v-if="!isAuthorized() && request_as_expert_visible">
        <!--        v-if="user.name === 'admin'" v-if="user.name !== 'admin' && !request_as_expert_visible"-->
        <!--        v-if="knowledge_sme_request.length === 0"-->
        <!--        v-if="user.name === 'admin'"-->
        <q-btn
          class="text-primary text-capitalize"
          outline unelevated
          @click="openDialog('add_expertise')"
        >Request as Expert
        </q-btn>
      </q-card-section>
      <q-card-section class="" v-if="isAuthorized()">
        <q-btn
          class="text-primary text-capitalize"
          outline unelevated
          @click="openDialog('manage_expert')"
        >Manage Expertise
        </q-btn>
      </q-card-section>
      <q-card-section class="q-px-none">
        <div class="q-pa-none" style="max-width: 900px;">
          <q-list class="">
            <span/>
            <q-expansion-item
              group="somegroup"
              icon="group"
              label="Subject Matter Expert"
              :caption="knowledge_sme_approved.length + ' Experts'"
              expand-separator
              header-class="title-accordion q-pt-md"
            >
              <q-card>
                <q-card-section class="q-px-none">
                  <q-list>
                    <q-item clickable v-ripple dense class="q-py-sm" v-for="(item, index) in knowledge_sme_approved"
                            :key="index">
                      <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm">
                        <q-avatar size="24px">
                          <img v-if="item.profile_picture !== null" :src="url + item.profile_picture">
                          <q-avatar size="24px" color="primary" text-color="white" v-else="">
                            {{ item.name.match(/\b(\w)/g).join('').toUpperCase() }}
                          </q-avatar>
                        </q-avatar>
                      </q-item-section>
                      <q-item-section class="" @click="openDialog('detail_expertise_approved', item.id)">
                        {{ item.name }}
                      </q-item-section>
                      <!--                      <q-item-section side>-->
                      <!--                        <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer"-->
                      <!--                                @click="handleDelete(item, 'sme')"/>-->
                      <!--                      </q-item-section>-->
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>

          </q-list>
        </div>
      </q-card-section>
      <q-inner-loading :showing="card_visible">
        <q-spinner size="50px" color="primary"/>
      </q-inner-loading>
    </q-card>
    <q-card v-if="[3].includes(selected_knowledge.level)" class="q-mb-md">
      <q-card-section>
        <div class="q-mt-xs row">
          <div class="col-1">
            <q-icon name="description" class="text-neutral q-mr-sm q-mb-sm" size="24px"/>
          </div>
          <div class="col-11">
            <div class="title-unitkerja text-capitalize">{{ this.selected_knowledge.label }}</div>
            <div class="desktop-only subtitle-unitkerja text-capitalize">{{ this.selected_knowledge.story }}</div>
          </div>
          <!--          <q-icon name="close" size="24px" class="text-neutral float-right"/>-->
        </div>
      </q-card-section>
      <q-card-section class="q-mt-none q-pt-none" v-if="$q.platform.is.mobile">
        <q-timeline class="q-pl-md" color="">
          <q-timeline-entry
            :subtitle="data_parent.knowledge_tree.title"
            icon="domain"
            class="time-uk-ico"
          >
          </q-timeline-entry>

          <q-timeline-entry
            :subtitle="data_parent.title"
            icon="article"
            class="time-bp-ico"
          >
          </q-timeline-entry>
          <q-timeline-entry
            :subtitle="this.selected_knowledge.parent_label"
            icon="lightbulb"
            class="time-sa-ico"
          >
          </q-timeline-entry>

          <q-timeline-entry
            :subtitle="this.selected_knowledge.label"
            icon="content_paste"
            class="time-ck-ico"
          >
          </q-timeline-entry>

          <q-timeline-entry
            :subtitle="this.selected_knowledge.story"
            class="time-kn-ico"
            icon="done_all"
          >
          </q-timeline-entry>
        </q-timeline>
        <div v-if="isAuthorized()" class="text-right">
          <q-btn-group class="q-ml-sm"
                       push flat>
            <q-btn flat dense color="primary" icon="mode"
                   class="tools-icon q-ma-none action-select" @click="openDialogsTree('add');"></q-btn>
            <q-btn flat dense color="primary" icon="delete"
                   class="tools-icon q-ma-none action-select" @click="openDialogsTree('delete')"></q-btn>
          </q-btn-group>
        </div>
        <div class="title-unitkerja text-capitalize">{{ this.selected_knowledge.label }}</div>
      </q-card-section>
      <!--      new-->
      <q-card-section
        v-if="knowledge_request.length >0 || knowledge_sme_request.length >0"
        class="request kmp-bg-cream q-px-none">
        <div v-if="knowledge_request.length >0">
          <div class="text-neutral text-normal q-px-lg q-py-sm">PENDING KNOWLEDGE REQUEST</div>
          <q-list>
            <q-item clickable v-ripple dense class="q-py-sm kmp-action" v-for="(item, index) in knowledge_request" :key="index">
              <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm">
                <q-icon v-if="item.file_id !== null" name="description" />
                <q-icon v-if="item.post_id !== null" name="link" />
              </q-item-section>
              <q-item-section v-if="item.file_id !== null" @click="openDialog('detail_knowledge', item.created_by)">
                {{item.file.filename}}
              </q-item-section>
              <q-item-section v-if="item.post_id !== null" @click="openDialog('detail_knowledge', item.created_by)">
                {{item.post.title}}
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn @click="handleApproveDocDirect(item.id)" round color="positive" class="q-ml-xs kmp-action-button" icon="check" style="border-radius: 20px;" size="xs">
                    <q-tooltip>Approve</q-tooltip>
                  </q-btn>
                  <q-btn @click="handleRejectDocDirect(item.id)" round color="negative" class="q-ml-xs kmp-action-button" icon="clear" style="border-radius: 20px;" size="xs">
                    <q-tooltip>Reject</q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
              <!--            <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm">-->
              <!--              <Avatar size="xl" :picture="item.profile_picture ? `./api${item.profile_picture}` : ''" :name="item.name"/>-->
              <!--            </q-item-section>-->
              <!--            <q-item-section class="" @click="openDialog('detail_expertise', item.id)">-->
              <!--              {{ item.name }}-->
              <!--            </q-item-section>-->
            </q-item>
          </q-list>
        </div>
        <div v-if="knowledge_sme_request.length >0">
          <div class="text-neutral text-normal q-px-lg q-py-sm">PENDING EXPERTISE REQUEST</div>
          <q-list>
            <q-item clickable v-ripple dense class="q-py-sm kmp-action" v-for="(item, index) in knowledge_sme_request" :key="index">
              <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm">
                <!--              <q-avatar size="24px">-->
                <!--                <img v-if="item.profile_picture !== null" :src="item.profile_picture">-->
                <!--                <q-avatar size="24px" color="primary" text-color="white" v-else="">-->
                <!--                  {{ item.name.match(/\b(\w)/g).join('').toUpperCase() }}-->
                <!--                </q-avatar>-->
                <!--              </q-avatar>-->
                <Avatar size="xl" :picture="item.profile_picture ? `./api${item.profile_picture}` : ''" :name="item.name"/>
              </q-item-section>
              <q-item-section class="" @click="openDialog('detail_expertise', item.id)">
                {{ item.name }}
              </q-item-section>
              <q-item-section side>
                <div class="row">
                  <q-btn v-if="item.with_doc" @click="openDialog('detail_expertise', item.id)" round color="primary" class="q-ml-xs kmp-action-button" icon="attach_file" style="border-radius: 20px;" size="xs">
                    <q-tooltip>Request with Document</q-tooltip>
                  </q-btn>
                  <q-btn @click="handleApproveDirect(item.id)" round color="positive" class="q-ml-xs kmp-action-button" icon="check" style="border-radius: 20px;" size="xs">
                    <q-tooltip>Approve</q-tooltip>
                  </q-btn>
                  <q-btn @click="handleRejectDirect(item.id)" round color="negative" class="q-ml-xs kmp-action-button" icon="clear" style="border-radius: 20px;" size="xs">
                    <q-tooltip>Reject</q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-section class="" v-if="!isAuthorized() && request_as_expert_visible">
        <!--        v-if="user.name === 'admin'" v-if="user.name !== 'admin' && !request_as_expert_visible"-->
        <!--        v-if="knowledge_sme_request.length === 0"-->
        <!--        v-if="user.name === 'admin'"-->
        <q-btn
          class="text-primary text-capitalize"
          outline unelevated
          @click="openDialog('add_expertise')">Request as Expert</q-btn>
        <q-btn
          class="text-primary text-capitalize q-ml-sm"
          outline unelevated
          @click="openDialog('add_knowledge')">Submit Knowledge</q-btn>
      </q-card-section>
      <!--      end new-->
      <q-card-section class="q-pb-lg q-pt-sm" v-if="isAuthorized()">
        <q-btn
          :class="$q.platform.is.mobile ? 'text-primary q-mr-xs text-13' : 'text-primary q-mr-sm'"
          outline unelevated no-caps
          @click="openDialog('manage_knowledge')"
        >Add Knowledge and Expertise
        </q-btn>
        <!--        new-->
<!--        <q-btn-->
<!--          :class="$q.platform.is.mobile ? 'text-primary text-13 text-capitalize' : 'text-primary text-capitalize'"-->
<!--          outline unelevated-->
<!--          @click="openDialog('manage_expert')"-->
<!--        >Manage Expertise-->
<!--        </q-btn>-->
        <!--        end new-->
        <!--        <q-btn-->
        <!--          class="text-primary q-mr-sm"-->
        <!--          outline unelevated no-caps-->
        <!--          @click="openDialog('add_files')"-->
        <!--        >Add from Files-->
        <!--        </q-btn>-->
        <!--        <q-btn-->
        <!--          class="text-primary"-->
        <!--          outline unelevated no-caps-->
        <!--          @click="openDialog('add_posts')"-->
        <!--        >Add from Post-->
        <!--        </q-btn>-->
      </q-card-section>
      <q-card-section class="q-px-none q-pt-none">
        <div class="q-pa-none" style="max-width: 900px;">
          <q-list class="">
            <span/>

            <q-expansion-item
              group="somegroup"
              icon="group"
              label="Subject Matter Expert"
              :caption="knowledge_sme_approved.length + ' Experts'"
              expand-separator
              default-opened
              header-class="title-accordion q-pt-md"
            >
              <q-card>
                <q-card-section class="q-px-none">
                  <q-list>
                    <q-item clickable v-ripple dense class="q-py-sm" v-for="(item, index) in knowledge_sme_approved"
                            :key="index">
                      <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm">
                        <q-avatar size="24px">
                          <img v-if="item.profile_picture !== null" :src="url + item.profile_picture">
                          <q-avatar size="24px" color="primary" text-color="white" v-else="">
                            {{ item.name.match(/\b(\w)/g).join('').toUpperCase() }}
                          </q-avatar>
                        </q-avatar>
                      </q-item-section>
                      <q-item-section class="" @click="openDialog('detail_expertise_approved', item.id)">
                        {{ item.name }}
                      </q-item-section>
                      <!--                      <q-item-section side>-->
                      <!--                        <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer"-->
                      <!--                                @click="handleDelete(item, 'sme')"/>-->
                      <!--                      </q-item-section>-->
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              group="somegroup"
              expand-separator
              icon="attach_file"
              label="Explicit Knowledge"
              :caption="knowledge_explicit_knowledge.length + ' Documents'"
              header-class="title-accordion">
              <q-card>
                <q-card-section>
                  <q-list>
                    <div
                      v-for="(item, index) in knowledge_explicit_knowledge"
                      :key="index"
                    >
                      <KnowledgeListFile
                        v-if="item.file !== null"
                        :file="item.file"
                        :item="item"
                        :manage="isAuthorized() && checkRole().name !== 'content_manager'"
                        :download="selected_knowledge.parent_id_zero === direktorat_can_download"
                        @delete_knowledge="handleDelete(item, 'knowledge')"/>
                      <KnowledgeListPost
                        v-if="item.post !== null"
                        :post="item.post"
                        :item="item"
                        :manage="isAuthorized()"
                        :openlink="selected_knowledge.parent_id_zero === direktorat_can_download"
                        @delete_knowledge="handleDelete(item, 'knowledge')"/>
                    </div>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              group="somegroup"
              expand-separator
              icon="format_list_bulleted"
              :caption="knowledge_best_practice.length + ' Documents'"
              label="Best Practice"
              header-class="title-accordion">
              <q-card>
                <q-card-section>
                  <q-list>
                    <div
                      v-for="(item, index) in knowledge_best_practice"
                      :key="index"
                    >
                      <KnowledgeListFile
                        v-if="item.file !== null"
                        :file="item.file"
                        :item="item"
                        :manage="isAuthorized() && checkRole().name !== 'content_manager'"
                        :download="selected_knowledge.parent_id_zero === direktorat_can_download"
                        @delete_knowledge="handleDelete(item, 'knowledge')"/>
                      <KnowledgeListPost
                        v-if="item.post !== null"
                        :post="item.post"
                        :item="item"
                        :manage="isAuthorized()"
                        :openlink="selected_knowledge.parent_id_zero === direktorat_can_download"
                        @delete_knowledge="handleDelete(item, 'knowledge')"/>
                    </div>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              group="somegroup"
              icon="insert_chart"
              label="Development Needed"
              :caption="knowledge_development_needed.length + ' Documents'"
              header-class="title-accordion"
              expand-separator
            >
              <q-card>
                <q-card-section>
                  <q-list>
                    <div
                      v-for="(item, index) in knowledge_development_needed"
                      :key="index"
                    >
                      <KnowledgeListFile
                        v-if="item.file !== null"
                        :file="item.file"
                        :item="item"
                        :manage="isAuthorized() && checkRole().name !== 'content_manager'"
                        :download="selected_knowledge.parent_id_zero === direktorat_can_download"
                        @delete_knowledge="handleDelete(item, 'knowledge')"/>
                      <KnowledgeListPost
                        v-if="item.post !== null"
                        :post="item.post"
                        :item="item"
                        :manage="isAuthorized()"
                        :openlink="selected_knowledge.parent_id_zero === direktorat_can_download"
                        @delete_knowledge="handleDelete(item, 'knowledge')"/>
                    </div>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-section>
        <KnowledgeConversation :knowledge_id="selected_knowledge.id"/>
      </q-card-section>
      <q-inner-loading :showing="card_visible">
        <q-spinner size="50px" color="primary"/>
      </q-inner-loading>
    </q-card>
    <q-card v-if="[3].includes(selected_knowledge.level) && 1 === 2" class="my-card">
      <q-card-section>
        <div class="q-mt-xs">
          <q-icon name="group" class="text-neutral q-mr-sm q-mb-sm" size="24px"/>
          <span class="title-unitkerja">Discussion</span>
          <q-icon name="close" size="24px" class="text-neutral float-right"/>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <KnowledgeConversation/>
      </q-card-section>

      <q-inner-loading :showing="card_visible">
        <q-spinner size="50px" color="primary"/>
      </q-inner-loading>
    </q-card>
    <q-dialog v-model="request" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Request as Expert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle">Add supporting documents from options below</div>
          <q-input dense v-model="strategic" outlined autofocus @keyup.enter="add_strategic = false"/>
        </q-card-section>
        <q-card-section class="q-pt-none q-mb-md">
          <div align="right q-mb-lg">
            <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Send Request" v-close-popup/>
            <q-btn class="btn-white-color float-right q-mr-sm publish-button" label="Cancel" v-close-popup/>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn class="kmp-button-white" v-close-popup>Cancel</q-btn>
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="add_target" persistent>
      <q-card :style="$q.platform.is.mobile ? 'min-width: 350px' : 'min-width: 500px'" class="q-py-none q-px-sm">
        <q-card-section>
          <div class="q-mt-xs">
            <span class="text-h6">{{ this.selected_knowledge.label }}</span>
            <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
          </div>
          <div class="q-mt-xs">
            <span class="">Diisi dengan tujuan / prioritas / target-target dari unit kerja.</span>
          </div>
        </q-card-section>

        <!--        <q-card-section class="q-pt-none">-->
        <!--          <div class="text-subtitle">Strategic Activity Title</div>-->
        <!--        </q-card-section>-->

        <q-card-section>
          <div class="q-gutter-y-md column">
            <!--            <q-input dense outlined v-model="question" name="question" @change="handleChange($event, 'question')" placeholder="Question" />-->
            <div class="row" v-for="(item, index) in items" :key="index">
              <!--              <div class="col-1">-->
              <!--                <q-icon name="drag_indicator" style="margin-top:0.4rem;font-size: 1.5rem;" />-->
              <!--              </div>-->
              <div class="col-11">
                <label class="label-form kmp-font-small">Tujuan/Target</label>
                <q-input dense outlined
                         autogrow v-model="item.value" @change="handleChange($event, item.class)"
                         placeholder="target"/>
              </div>
              <div class="col-1">
                <q-icon @click="delKnowledgeTarget(item.id, index)" name="delete" class="float-right" color="red"
                        style="margin-top:1.6rem;font-size: 1.5rem;"/>
              </div>
            </div>
            <div class="row" @click="addList">
              <q-icon name="add_circle_outline" color="primary" style="margin-top:0.2rem;margin-right:0.2rem"/>
              <label class="text-primary">Add more target</label>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <!--          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>-->
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated v-close-popup
                 @click="handleAddTarget"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="add_files " persistent>
      <q-card :style="$q.platform.is.mobile ? 'min-width: 350px' : 'min-width: 500px'" class="q-py-md q-px-sm">
        <q-card-section>
          <div class="q-mt-xs">
            <span class="text-h6">Add Document From Files</span>
            <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
          </div>
        </q-card-section>

        <!--        <q-card-section class="q-pt-none">-->
        <!--          <div class="text-subtitle">Expert Name</div>-->
        <!--          <q-select-->
        <!--            ref="optapi"-->
        <!--            v-model="search_person_model"-->
        <!--            outlined-->
        <!--            dense-->
        <!--            use-input-->
        <!--            input-debounce="500"-->
        <!--            :options="person_options"-->
        <!--            @filter="filterFn"-->
        <!--            @filter-abort="abortFilterFn"-->
        <!--            style="width: 100%"-->
        <!--            class="kmp-rounded"-->
        <!--          >-->
        <!--            <template v-slot:option="scope">-->
        <!--              <q-item-->
        <!--                v-bind="scope.itemProps"-->
        <!--                v-on="scope.itemEvents"-->
        <!--              >-->
        <!--                <q-item-section avatar style="">-->
        <!--                  <q-avatar size="24px" color="primary" text-color="white">-->
        <!--                    {{ scope.opt.label.match(/\b(\w)/g).join('').toUpperCase() }}-->
        <!--                  </q-avatar>-->
        <!--                </q-item-section>-->
        <!--                <q-item-section class="list-member text-capitalize">{{ scope.opt.label }}</q-item-section>-->
        <!--              </q-item>-->
        <!--            </template>-->
        <!--          </q-select>-->

        <!--        </q-card-section>-->

        <!--        <q-card-section class="q-pt-none" v-if="add_expertise || manage_expert">-->
        <!--          <div class="text-subtitle">Knowledge Name</div>-->
        <!--          <q-select-->
        <!--            v-model="knowledge_name_model"-->
        <!--            :options="knowledge_name_options"-->
        <!--            outlined-->
        <!--            dense-->
        <!--          >-->
        <!--            <template v-slot:option="scope">-->
        <!--              <q-item-->
        <!--                v-bind="scope.itemProps"-->
        <!--                v-on="scope.itemEvents"-->
        <!--              >-->
        <!--                <q-item-section>-->
        <!--                  <q-item-label v-html="scope.opt.label"/>-->
        <!--                  <q-item-label caption>{{ scope.opt.story }}</q-item-label>-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--            </template>-->
        <!--          </q-select>-->

        <!--        </q-card-section>-->

        <q-card-section class="q-pt-none">
          <div class="text-subtitle">Document Type</div>
          <q-select
            v-model="document_type_model"
            :options="['Explicit Knowledge', 'Best Practice', 'Development Needed']"
            outlined
            dense
          >
          </q-select>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-uploader
            @added="handleUpload"
            ref="uploader"
            label="Individual upload"
            multiple
            batch
            style="width: 100%"
            class="shadow-0 q-uploader--bordered kmp-rounded"
          />
        </q-card-section>

        <q-separator spaced/>

        <q-card-section class="q-pt-none">
          <div class="font-weight-bold q-mb-sm q-mt-md" v-if="finish_files.length > 0">{{ finish_files.length }} Files
            Uploaded
          </div>
          <q-linear-progress v-if="uploaded_files" indeterminate rounded color="negative" class="q-my-sm"/>
          <q-list>
            <div
              v-for="(item, index) in finish_files"
              :key="index"
            >
              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="isAuthorized()"
                                 :download="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>
            </div>
          </q-list>
        </q-card-section>

      </q-card>
    </q-dialog>
    <q-dialog v-model="add_posts" persistent>
      <q-card :style="$q.platform.is.mobile ? 'min-width: 350px' : 'min-width: 500px'" class="q-py-md q-px-sm">
        <q-card-section class="q-py-none">
          <div class="q-mt-xs">
            <span class="text-h6">Add Document From Post</span>
            <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
          </div>
        </q-card-section>

        <!--        <q-card-section class="q-pt-none" v-if="add_expertise || manage_expert">-->
        <!--          <div class="text-subtitle">Knowledge Name</div>-->
        <!--          <q-select-->
        <!--            v-model="knowledge_name_model"-->
        <!--            :options="knowledge_name_options"-->
        <!--            outlined-->
        <!--            dense-->
        <!--          >-->
        <!--            <template v-slot:option="scope">-->
        <!--              <q-item-->
        <!--                v-bind="scope.itemProps"-->
        <!--                v-on="scope.itemEvents"-->
        <!--              >-->
        <!--                <q-item-section>-->
        <!--                  <q-item-label v-html="scope.opt.label"/>-->
        <!--                  <q-item-label caption>{{ scope.opt.story }}</q-item-label>-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--            </template>-->
        <!--          </q-select>-->

        <!--        </q-card-section>-->


        <q-card-section class="q-pt-none">
          <div class="text-subtitle">Select Document from Post</div>
          <!--          <q-input dense v-model="strategic" outlined autofocus @keyup.enter="add_posts = false"/>-->
          <!-- <q-badge color="secondary" multi-line>
            Model: "{{ search_post_model }}"
          </q-badge> -->

          <q-select
            ref="post_search"
            :value="search_post_model"
            v-model="search_post_model"
            fit
            outlined
            dense
            options-dense
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFnPost"
            @filter-abort="abortFilterFn"
            @input="handleAddPost"
            style="width: 100% !important"
            hide-dropdown-icon
            popup-content-class="kmp-rounded-2"
            popup-content-style="width: 300px !important"
          >
            <template v-slot:append>
              <q-icon name="search" @click.stop/>
            </template>
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section class="q-my-xs">
                  <q-item-label v-html="scope.opt.label"/>
                  <q-item-label caption>
                    <div class="ellipsis">
                      {{ scope.opt.description }}
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle">Document Type</div>
          <q-select
            v-model="document_type_model"
            :options="['Explicit Knowledge', 'Best Practice', 'Development Needed']"
            outlined
            dense
          >
          </q-select>
        </q-card-section>

        <q-separator spaced/>
        <q-card-section class="">
          <q-list>
            <div
              v-for="(item, index) in finish_post"
              :key="index"
            >
              <KnowledgeListPost v-if="item.post !== null" :post="item.post" :item="item" :manage="isAuthorized()"
                                 :openlink="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>
            </div>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="manage_knowledge" persistent>
      <q-card :style="$q.platform.is.mobile ? 'min-width: 350px' : 'min-width: 500px'" class="q-pa-none">
        <q-card-section class="q-px-lg">
          <span class="q-mt-xs row">
            <div class="col-1">
              <q-icon name="description" class="text-neutral q-mr-sm q-mb-sm" size="24px"/>
            </div>
            <div class="col-8">
              <div class="title-unitkerja text-capitalize">{{ this.selected_knowledge.label }}</div>
              <div class="subtitle-unitkerja text-capitalize">{{ this.selected_knowledge.story }}</div>
            </div>
            <div class="col-3">
              <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
            </div>
            <!--                      <q-icon name="close" size="24px" class="text-neutral float-right"/>-->
          </span>
        </q-card-section>

        <!--        <q-card-section>-->
        <!--          <span class="text-h6">{{ selected_knowledge.label }}</span>-->
        <!--          <span class="text-h6">{{ selected_knowledge.story }}</span>-->
        <!--          <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>-->
        <!--        </q-card-section>-->

        <q-card-section class="q-pt-none q-px-lg">
          <!--          <div class="text-subtitle">Add {{ selected_knowledge.label.toLowerCase() }} from options below</div>-->
          <!--          <div class="text-neutral text-normal q-mb-md">Add supporting document from options below</div>-->



          <div v-if="!button_add_expertise" class="q-pt-none q-mb-md kmp-text-blue-2 kmp-font-bold cursor-pointer kmp-font-sm-2" @click="button_add_expertise = true">
            Add Expertise <q-icon name="add_circle_outline" />
          </div>

          <div v-if="button_add_expertise" class="q-pt-none q-mb-md">
            <div class="row justify-between">
              <div class="text-subtitle">Add Member as Expertise</div>
              <div><q-btn @click="removeExpertise" label="X" size="xs" color="primary" class="q-px-xs kmp-rounded" unelevated dense /></div>
            </div>
            <div class="">
              <div class="kmp-font-xs" style="width: 92%">Individu yang memiliki kinerja, kemampuan dan tingkat pengetahuan yang tinggi ( advance / innovative knowledge ). dijadikan referensi bagi rekan kerja lain untuk bertanya dan belajar.</div>
            </div>
            <q-select
              ref="select_person"
              :value="search_person_model"
              v-model="search_person_model"
              outlined
              dense
              options-dense
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="search member.."
              :options="person_options"
              @filter="filterFn"
              @filter-abort="abortFilterFn"
              @input="addExpertise"
              style="width: 100% !important"
              hide-dropdown-icon
              popup-content-class="kmp-rounded-2"
              popup-content-style="width: 300px !important"
            >
              <template v-slot:prepend>
                <q-icon name="person_add"/>
              </template>
              <template v-slot:append>
                <q-icon name="search" @click.stop/>
              </template>
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <!--                @click="openDialog('add_expertise_admin', scope.opt.value)"-->
                  <q-item-section avatar style="min-width: 28px!important; padding-right: 8px !important;">
                    <q-avatar size="22px" color="primary" text-color="white">
                      {{ scope.opt.label.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase() }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section class="text-capitalize kmp-font-sm-2">
                    {{ scope.opt.label.toLowerCase() }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div v-if="!button_add_knowledge" class="q-pt-none q-mb-md kmp-text-blue-2 kmp-font-bold cursor-pointer kmp-font-sm-2" @click="button_add_knowledge = true">
            Add Knowledge Document <q-icon name="add_circle_outline" />
          </div>

          <div v-if="button_add_knowledge" class="q-pt-none q-mb-md">
            <div class="row justify-between">
              <div class="text-subtitle">Document Type</div>
              <div><q-btn @click="removeKnowledge" label="x" size="xs" color="primary" class="q-px-xs kmp-rounded" unelevated dense /></div>
            </div>
            <div class="">
              <div v-if="document_type_model === 'Explicit Knowledge'" class="kmp-font-xs" style="width: 96%">Pengalaman keberhasilan dari individu, tim atau organisasi yang berhubungan dengan keberhasilan dalam memanfaatkan pengetahuan untuk menciptakan nilai tambah/manfaat bagi organisasi.</div>
              <div v-if="document_type_model === 'Best Practice'" class="kmp-font-xs" style="width: 96%">Pengalaman keberhasilan dari individu, tim atau organisasi yang berhubungan dengan keberhasilan dalam memanfaatkan pengetahuan untuk menciptakan nilai tambah/manfaat bagi organisasi.</div>
              <div v-if="document_type_model === 'Development Needed'" class="kmp-font-xs" style="width: 96%">Pengembangan yang sesuai untuk setiap pengetahuan.</div>
            </div>
            <q-select
              v-model="document_type_model"
              :options="['Explicit Knowledge', 'Best Practice', 'Development Needed']"
              outlined
              dense
            >
            </q-select>
          </div>

          <div v-if="button_add_knowledge && checkRole().name !== 'content_manager'" class="q-pt-none q-mb-md">
            <div class="text-subtitle">Add From Files</div>
            <q-file
              v-model="files"
              @input="addFile"
              placeholder="choose file.."
              outlined dense clearable multiple>
              <template v-slot:prepend>
                <q-icon name="attach_file"/>
              </template>
            </q-file>
          </div>

          <div v-if="button_add_knowledge" class="q-pt-none q-mb-md">
            <div class="text-subtitle">Add From Post</div>
            <q-select
              ref="post_search" fit outlined dense options-dense clearable use-input hide-selected fill-input
              hide-dropdown-icon
              :value="search_post_model"
              v-model="search_post_model"
              input-debounce="500"
              :options="options"
              placeholder="search post.."
              @filter="filterFnPost"
              @filter-abort="abortFilterFn"
              @input="addPost"
              style="width: 100% !important"
              popup-content-class="kmp-rounded-2"
              popup-content-style="width: 300px !important"
            >
              <template v-slot:prepend>
                <!--                <q-icon name="list_alt" />-->
                <!--                <q-badge class="bg-grey-7" label="Channel ACLC" />-->
                <q-btn
                  dense unelevated
                  class="q-px-xs bg-grey-7 text-white"
                  style="border-radius: 6px"
                  :label="channel_selected_name === null ? 'All Channel': channel_selected_name"
                  size="xs">
                  <q-popup-proxy>
                    <q-list dense class="rounded-borders">
                      <q-item
                        clickable v-ripple v-close-popup
                        v-for="(item, index) in channel_list" :key="index"
                        @click="selectChannel(item)">
                        <q-item-section>
                          {{ item.name }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-popup-proxy>
                </q-btn>
              </template>

              <template v-slot:append>
                <q-icon name="search" @click.stop/>
              </template>
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section class="q-my-xs">
                    <q-item-label v-html="scope.opt.label"/>
                    <q-item-label caption>
                      <div class="ellipsis">
                        {{ scope.opt.description }}
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>


            <!--            <q-input-->
            <!--              ref="channelPostKeyword" outlined dense clearable-->
            <!--              placeholder="search post"-->
            <!--              debounce="500"-->
            <!--              @input="onChannelPostSearch"-->
            <!--              v-model="channel_post_keyword">-->
            <!--              <template v-slot:prepend>-->
            <!--                &lt;!&ndash;                <q-icon name="list_alt" />&ndash;&gt;-->
            <!--                &lt;!&ndash;                <q-badge class="bg-grey-7" label="Channel ACLC" />&ndash;&gt;-->
            <!--                <q-btn-->
            <!--                  dense unelevated-->
            <!--                  class="q-px-xs bg-grey-7 text-white"-->
            <!--                  style="border-radius: 6px"-->
            <!--                  :label="channel_selected_name === null ? 'All Channel': channel_selected_name"-->
            <!--                  size="xs">-->
            <!--                  <q-popup-proxy>-->
            <!--                    <q-list dense class="rounded-borders">-->
            <!--                      <q-item-->
            <!--                        clickable v-ripple v-close-popup-->
            <!--                        v-for="(item, index) in channel_list" :key="index"-->
            <!--                        @click="selectChannel(item)">-->
            <!--                        <q-item-section>-->
            <!--                          {{item.name}}-->
            <!--                        </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </q-list>-->
            <!--                  </q-popup-proxy>-->
            <!--                </q-btn>-->
            <!--              </template>-->

            <!--              <q-popup-proxy ref="searchPostProxy">-->
            <!--                <q-list dense class="rounded-borders">-->
            <!--                  <q-item-->
            <!--                    clickable v-ripple v-close-popup>-->
            <!--                    <q-item-section>-->
            <!--                      ok-->
            <!--                    </q-item-section>-->
            <!--                  </q-item>-->
            <!--                </q-list>-->
            <!--              </q-popup-proxy>-->

            <!--              &lt;!&ndash;              <template v-slot:label>&ndash;&gt;-->
            <!--              &lt;!&ndash;                <span class="q-px-xs bg-grey-6 text-white rounded-borders">Channel Direktorat ACLC</span>&ndash;&gt;-->
            <!--              &lt;!&ndash;              </template>&ndash;&gt;-->
            <!--            </q-input>-->

            <!--              <q-file-->
            <!--                v-model="files"-->
            <!--                outlined dense>-->
            <!--                <template v-slot:prepend>-->
            <!--                  <q-icon name="list_alt" />-->
            <!--                </template>-->
            <!--              </q-file>-->
          </div>

          <div class="q-pt-none hidden">
            <q-uploader
              @added="handleUpload"
              ref="uploader"
              label="Individual upload"
              multiple
              batch
              style="width: 100%"
              class="shadow-0 q-uploader--bordered kmp-rounded"
            />
          </div>

          <q-separator spaced class="hidden"/>

          <div class="q-pt-none hidden">
            <div class="font-weight-bold q-mb-sm q-mt-md" v-if="finish_files.length > 0">{{ finish_files.length }} Files
              Uploaded
            </div>
            <q-linear-progress v-if="uploaded_files" indeterminate rounded color="negative" class="q-my-sm"/>
            <q-list>
              <div
                v-for="(item, index) in finish_files"
                :key="index"
              >
                <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="isAuthorized()"
                                   :download="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>
              </div>
            </q-list>
          </div>

          <div class="row q-mb-none q-mt-sm hidden">
            <div class="col">
              <q-btn outline no-caps size="md" class="q-ma-sm btn-white-color full-width" label="Add from Files"
                     @click="openDialog('add_files')"/>
            </div>
            <div class="col q-ml-md">
              <q-btn outline no-caps size="md" class="q-ma-sm btn-white-color full-width" label="Add from Post"
                     @click="openDialog('add_posts')"/>
            </div>
          </div>
        </q-card-section>

        <q-separator class="q-mb-md"/>

        <q-card-section v-if="finish_files.length + finish_post.length >0" class="q-pt-none q-mt-sm q-px-lg hidden">
          <div class="text-neutral text-normal">{{ finish_files.length + finish_post.length }} Knowledge Added</div>
        </q-card-section>

        <q-card-section class="q-px-lg q-py-none">
          <div v-for="(k, i) in ['Explicit Knowledge', 'Best Practice', 'Development Needed','SME Only']" :key="i">
            <div v-if="knowledge_doc.filter(x => x.content_type === k).length >0">
              <div class="q-mb-xs kmp-font-sm-2 text-bold text-grey-7">{{ k.replace('SME Only','Expertise') }}</div>
              <div class="row">
                <div class="q-pr-sm q-mb-sm" v-for="(item, index) in knowledge_doc.filter(x => x.content_type === k)"
                     :key="index">
                  <div v-if="item.file !== null">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #FFE9EE;">
                      <q-tooltip>
                        {{ item.file.name }}
                      </q-tooltip>
                      <q-icon name="far fa-file" class="" size="12px"/>
                      {{ item.file.name.substr(0, 15) }}
                      ...
                      <q-btn flat round dense icon="close" size="xs" @click="deleteFile(item)"/>
                    </q-card>
                  </div>
                  <div v-if="item.post !== null">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #E0F2FE;">
                      <q-tooltip>
                        {{ item.post.title }}
                      </q-tooltip>
                      <q-icon name="fas fa-link" class="" size="12px"/>
                      {{ item.post.title.substr(0, 15) }}...
                      <q-btn flat round dense icon="close" size="xs" @click="deletePost(item)"/>
                    </q-card>
                  </div>
                  <div v-if="item.user !== null">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #fef8e0;">
                      <q-tooltip>
                        {{ item.user.label }}
                      </q-tooltip>
                      <q-icon name="fas fa-user" class="" size="12px"/>
                      {{ item.user.label.substr(0, 15) }}...
                      <q-btn flat round dense icon="close" size="xs" @click="deleteExpertise(item)"/>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          <div class="row">-->
          <!--          <div class="q-pr-sm q-mb-sm" v-for="(item, index) in finish_files" :key="index">-->
          <!--              <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #FFE9EE;">-->
          <!--                <q-tooltip>-->
          <!--                  {{ item.file.name }}-->
          <!--                </q-tooltip>-->
          <!--                <q-icon name="far fa-file" class="" size="12px"/>-->
          <!--                {{ item.file.name.substr(0, 15) }}-->
          <!--                ...-->
          <!--                <q-btn flat round dense icon="close" size="xs" @click="handleDeleteFile(item, index)"/>-->
          <!--              </q-card>-->
          <!--&lt;!&ndash;              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="isAuthorized()"&ndash;&gt;-->
          <!--&lt;!&ndash;                                 :download="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>&ndash;&gt;-->
          <!--          </div>-->
          <!--          <div class="q-pr-sm q-mb-sm" v-for="(item, index) in finish_post" :key="index">-->
          <!--            <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #E0F2FE;">-->
          <!--              <q-tooltip>-->
          <!--                {{ item.post.title }}-->
          <!--              </q-tooltip>-->
          <!--              <q-icon name="fas fa-link" class="" size="12px"/>-->
          <!--              {{ item.post.title.substr(0, 15) }}...-->
          <!--              <q-btn flat round dense icon="close" size="xs" @click="handleDeleteFile(item, index)"/>-->
          <!--            </q-card>-->
          <!--            &lt;!&ndash;              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="isAuthorized()"&ndash;&gt;-->
          <!--            &lt;!&ndash;                                 :download="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>&ndash;&gt;-->
          <!--          </div>-->
          <!--&lt;!&ndash;            <div&ndash;&gt;-->
          <!--&lt;!&ndash;              v-for="(item, index) in finish_post"&ndash;&gt;-->
          <!--&lt;!&ndash;              :key="index"&ndash;&gt;-->
          <!--&lt;!&ndash;            >&ndash;&gt;-->
          <!--&lt;!&ndash;              {{item}}&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;              <KnowledgeListPost v-if="item.post !== null" :post="item.post" :item="item" :manage="isAuthorized()"&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;                                 :openlink="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;            </div>&ndash;&gt;-->
          <!--            </div>-->
        </q-card-section>

        <q-card-actions class="text-primary q-px-md q-py-lg justify-between">
          <div class="text-neutral text-normal">
            <span v-if="knowledge_doc.length >0">
              <span v-if="knowledgeCount >0">{{ knowledgeCount }} Knowledge</span>
              <span v-if="knowledgeCount >0 && expertiseCount >0"> and </span>
              <span v-if="expertiseCount >0">{{ expertiseCount }} Expertise</span>
              <span> Added</span>
            </span>
          </div>
          <q-btn @click="addKnowledge" class="btn-primary-color float-right q-mr-sm publish-button" label="Save"
                 unelevated v-close-popup/>
        </q-card-actions>
        <!--        <q-card-section class="q-px-lg">-->
        <!--          <div class="" v-for="(test_item, tindex) in test_items" :key="tindex">-->
        <!--            <q-item v-if="test_item.file !== null" class="q-list&#45;&#45;bordered q-mb-sm kmp-file-item kmp-file-text"-->
        <!--                    clickable v-ripple>-->
        <!--              <div class="col-1 q-mt-xs">-->
        <!--                <q-icon name="picture_as_pdf" size="20px" class="q-mr-sm"/>-->
        <!--              </div>-->
        <!--              <div class="col-10">-->
        <!--                <q-item-section>-->
        <!--                  <q-item-label class="kmp-font-medium">{{ test_item.file.filename }}</q-item-label>-->
        <!--                  <q-item-label class="kmp-font-small">{{ test_item.file.filesize }} • PDF</q-item-label>-->
        <!--                </q-item-section>-->
        <!--              </div>-->
        <!--              <div class="col-1 q-mt-xs text-right">-->
        <!--                <q-icon name="delete" size="24px" class="" v-on:click.prevent="deleteKnowledge(test_item.id, tindex)"/>-->
        <!--              </div>-->
        <!--            </q-item>-->
        <!--            <q-item v-if="test_item.post !== null" class="q-list&#45;&#45;bordered q-mb-sm kmp-post-item kmp-post-text"-->
        <!--                    clickable v-ripple>-->
        <!--              <div class="col-1 q-mt-xs">-->
        <!--                <q-icon name="link" size="24px" class="q-mr-sm"/>-->
        <!--              </div>-->
        <!--              <div class="col-10">-->
        <!--                <q-item-section class="q-ml-sm">-->
        <!--                  <q-item-label class="kmp-font-medium">{{ test_item.post.title }}</q-item-label>-->
        <!--                  <q-item-label class="kmp-font-small">{{ test_item.post.description }}</q-item-label>-->
        <!--                </q-item-section>-->
        <!--              </div>-->
        <!--              <div class="col-1 q-mt-xs text-right">-->
        <!--                <q-icon name="delete" size="24px" class="" v-on:click.prevent="deleteKnowledge(test_item.id, tindex)"/>-->
        <!--              </div>-->
        <!--            </q-item>-->
        <!--          </div>-->
        <!--        </q-card-section>-->

      </q-card>
    </q-dialog>
    <q-dialog v-model="manage_expert" persistent>
      <q-card :style="$q.platform.is.mobile ? 'min-width: 350px' : 'min-width: 500px'" class="q-pa-none">
        <q-card-section class="q-px-lg">
          <span class="text-h6">Manage Expertise</span>
          <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
        </q-card-section>

        <q-card-section class="q-pt-none q-px-lg">
          <div class="text-subtitle">Search Person To Add</div>
          <q-select
            ref="select_person"
            :value="search_person_model"
            v-model="search_person_model"
            outlined
            dense
            options-dense
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            placeholder="search member.."
            :options="person_options"
            @filter="filterFn"
            @filter-abort="abortFilterFn"
            style="width: 100% !important"
            hide-dropdown-icon
            popup-content-class="kmp-rounded-2"
            popup-content-style="width: 300px !important"
          >
            <template v-slot:append>
              <q-icon name="search" @click.stop/>
            </template>
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <!--                @click="openDialog('add_expertise_admin', scope.opt.value)"-->
                <q-item-section avatar style="min-width: 28px!important; padding-right: 8px !important;">
                  <q-avatar size="22px" color="primary" text-color="white">
                    {{ scope.opt.label.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase() }}
                  </q-avatar>
                </q-item-section>
                <q-item-section class="text-capitalize kmp-font-sm-2">
                  {{ scope.opt.label.toLowerCase() }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-card-section class="q-pt-none q-px-lg">
          <div class="text-neutral text-normal">Add supporting document from options below</div>
          <div class="row q-mb-none q-mt-sm">
            <div class="col">
              <q-btn outline no-caps size="md" class="q-ma-sm btn-white-color full-width" label="Add from Files"
                     @click="openDialog('add_files')"/>
            </div>
            <div class="col q-pl-md">
              <q-btn outline no-caps size="md" class="q-ma-sm btn-white-color full-width" label="Add from Post"
                     @click="openDialog('add_posts')"/>
            </div>
          </div>
        </q-card-section>
        <q-separator/>

        <q-card-section v-if="finish_files.length + finish_post.length >0" class="q-pt-none q-mt-sm q-px-lg">
          <div class="text-neutral text-normal">{{ finish_files.length + finish_post.length }} Knowledge Added</div>
        </q-card-section>
        <q-card-section class="q-px-lg">
          <q-list>
            <div
              v-for="(item, index) in finish_files"
              :key="index"
            >
              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="isAuthorized()"
                                 :download="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>
            </div>
            <div
              v-for="(item, index) in finish_post"
              :key="index"
            >
              <KnowledgeListPost v-if="item.post !== null" :post="item.post" :item="item" :manage="isAuthorized()"
                                 :openlink="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>
            </div>
          </q-list>
        </q-card-section>
        <q-card-actions align="right" class="text-primary q-px-md q-py-lg">
          <!--          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>-->
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Save" unelevated
                 @click="handleSendRequest"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="manage_expert_old" persistent>
      <q-card class="q-py-md q-px-sm" :class="$q.platform.is.mobile ? 'kmp-modal-mobile1' : 'modal-size'">
        <q-card-section>
          <div class="q-mt-xs">
            <span class="text-h6">{{ selected_knowledge.label }}</span>
            <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle">Search Person To Add</div>
          <q-select
            ref="optapi"
            v-model="search_person_model"
            outlined
            dense
            use-input
            input-debounce="0"
            placeholder="Find person"
            :options="person_options"
            @filter="filterFn"
            @filter-abort="abortFilterFn"
            style="width: 100%"
            class="kmp-rounded"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <!--                @click="openDialog('add_expertise_admin', scope.opt.value)"-->
                <q-item-section>
                  <q-item-label v-html="scope.opt.label"/>
                  <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-scroll-area style="height: 350px;">
            <q-item class="q-pa-none" v-for="(item, index) in person_expertise" :key="index">
              <q-item-section avatar style="" class="">
                <q-avatar size="24px">
                  <img v-if="item.profile_picture.length > 0" :src="item.profile_picture">
                  <q-avatar size="24px" color="primary" text-color="white" v-else="">AA</q-avatar>
                </q-avatar>
              </q-item-section>
              <q-item-section class="list-member">{{ item.name }}</q-item-section>
              <q-item-section side>
                <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer"
                        @click="handleDelete(item.id, 'knowledge')"/>
              </q-item-section>
            </q-item>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="add_expertise_admin" v-if="person_expertise_add !== null" persistent>
      <q-card class="q-py-md q-px-sm" :class="$q.platform.is.mobile ? 'kmp-modal-mobile1' : 'modal-size'">
        <q-card-section>
          <div class="text-h6">Add Expert</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <q-item class="q-px-none">
                <q-item-section avatar style="">
                  <q-avatar size="24px">
                    <img src="https://cdn.quasar.dev/img/avatar1.jpg">
                  </q-avatar>
                </q-item-section>
                <q-item-section class="list-member">{{ person_expertise_add.user.label }}</q-item-section>
                <q-item-section side>
                  <q-btn class="text-primary" outline unelevated no-caps>See Profile
                  </q-btn>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none q-mb-none">
          <div class="text-neutral text-normal">Add supporting document from options below</div>
          <div class="row q-mb-none q-mt-sm">
            <div class="col q-px-sm">
              <q-btn outline no-caps size="md" class="q-ma-sm btn-white-color full-width" label="Add from Files"
                     @click="openDialog('add_files', person_expertise_add.user.value)"/>
            </div>
            <div class="col q-px-sm">
              <q-btn outline no-caps size="md" class="q-ma-sm btn-white-color full-width" label="Add from Post"
                     @click="openDialog('add_posts', person_expertise_add.user.value)"/>
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section v-if="finish_files.length + finish_post.length >0" class="q-pt-none q-mt-sm">
          <div class="text-neutral text-normal">{{ finish_files.length + finish_post.length }} Knowledge Added</div>
        </q-card-section>
        <q-card-section class="">
          <q-list>
            <div
              v-for="(item, index) in finish_files"
              :key="index"
            >
              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="isAuthorized()"
                                 :download="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>
            </div>
            <div
              v-for="(item, index) in finish_post"
              :key="index"
            >
              <KnowledgeListPost v-if="item.post !== null" :post="item.post" :item="item" :manage="isAuthorized()"
                                 :openlink="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>
            </div>
          </q-list>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button"
                 :class="finish_files.length === 0 ? 'disabled' : ''"
                 label="Done" unelevated v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="add_expertise" persistent>
      <q-card class="q-py-sm q-px-sm" :class="$q.platform.is.mobile ? 'kmp-modal-mobile1' : 'modal-size'">
        <q-card-section class="q-pb-none">
          <span class="text-h6">Request As Expert</span>
          <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <span class="">Individu yang memiliki kinerja, kemampuan dan tingkat pengetahuan yang tinggi (advance / innovative knowledge). dijadikan referensi bagi rekan kerja lain untuk bertanya dan belajar.</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="kmp-font-lg text-bold">{{selected_knowledge.label}}</div>
          <div class="">{{selected_knowledge.story}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="!button_add_knowledge" class="q-pt-none q-mb-md kmp-text-blue-2 kmp-font-bold cursor-pointer kmp-font-sm-2" @click="button_add_knowledge = true">
            Add Knowledge Document <q-icon name="add_circle_outline" />
          </div>

          <div v-if="button_add_knowledge" class="q-pt-none q-mb-md">
            <div class="row justify-between">
              <div class="text-subtitle">Document Type</div>
              <div><q-btn @click="removeKnowledge" label="X" size="xs" color="primary" class="q-px-xs kmp-rounded" unelevated dense /></div>
            </div>
            <div class="">
              <div v-if="document_type_model === 'Explicit Knowledge'" class="kmp-font-xs" style="width: 96%">Pengalaman keberhasilan dari individu, tim atau organisasi yang berhubungan dengan keberhasilan dalam memanfaatkan pengetahuan untuk menciptakan nilai tambah/manfaat bagi organisasi.</div>
              <div v-if="document_type_model === 'Best Practice'" class="kmp-font-xs" style="width: 96%">Pengalaman keberhasilan dari individu, tim atau organisasi yang berhubungan dengan keberhasilan dalam memanfaatkan pengetahuan untuk menciptakan nilai tambah/manfaat bagi organisasi.</div>
              <div v-if="document_type_model === 'Development Needed'" class="kmp-font-xs" style="width: 96%">Pengembangan yang sesuai untuk setiap pengetahuan.</div>
            </div>
            <q-select
              v-model="document_type_model"
              :options="['Explicit Knowledge', 'Best Practice', 'Development Needed']"
              outlined
              dense
            >
            </q-select>
          </div>

          <div v-if="button_add_knowledge" class="q-pt-none q-mb-md">
            <div class="text-subtitle">Add From Files</div>
            <q-file
              v-model="files"
              @input="addFile"
              placeholder="choose file.."
              outlined dense clearable multiple>
              <template v-slot:prepend>
                <q-icon name="attach_file"/>
              </template>
            </q-file>
          </div>

          <div v-if="button_add_knowledge" class="q-pt-none q-mb-md">
            <div class="text-subtitle">Add From Post</div>
            <q-select
              ref="post_search" fit outlined dense options-dense clearable use-input hide-selected fill-input
              hide-dropdown-icon
              :value="search_post_model"
              v-model="search_post_model"
              input-debounce="500"
              :options="options"
              placeholder="search post.."
              @filter="filterFnPost"
              @filter-abort="abortFilterFn"
              @input="addPost"
              style="width: 100% !important"
              popup-content-class="kmp-rounded-2"
              popup-content-style="width: 300px !important"
            >
              <template v-slot:prepend>
                <!--                <q-icon name="list_alt" />-->
                <!--                <q-badge class="bg-grey-7" label="Channel ACLC" />-->
                <q-btn
                  dense unelevated
                  class="q-px-xs bg-grey-7 text-white"
                  style="border-radius: 6px"
                  :label="channel_selected_name === null ? 'All Channel': channel_selected_name"
                  size="xs">
                  <q-popup-proxy>
                    <q-list dense class="rounded-borders">
                      <q-item
                        clickable v-ripple v-close-popup
                        v-for="(item, index) in channel_list" :key="index"
                        @click="selectChannel(item)">
                        <q-item-section>
                          {{ item.name }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-popup-proxy>
                </q-btn>
              </template>

              <template v-slot:append>
                <q-icon name="search" @click.stop/>
              </template>
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section class="q-my-xs">
                    <q-item-label v-html="scope.opt.label"/>
                    <q-item-label caption>
                      <div class="ellipsis">
                        {{ scope.opt.description }}
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>


            <!--            <q-input-->
            <!--              ref="channelPostKeyword" outlined dense clearable-->
            <!--              placeholder="search post"-->
            <!--              debounce="500"-->
            <!--              @input="onChannelPostSearch"-->
            <!--              v-model="channel_post_keyword">-->
            <!--              <template v-slot:prepend>-->
            <!--                &lt;!&ndash;                <q-icon name="list_alt" />&ndash;&gt;-->
            <!--                &lt;!&ndash;                <q-badge class="bg-grey-7" label="Channel ACLC" />&ndash;&gt;-->
            <!--                <q-btn-->
            <!--                  dense unelevated-->
            <!--                  class="q-px-xs bg-grey-7 text-white"-->
            <!--                  style="border-radius: 6px"-->
            <!--                  :label="channel_selected_name === null ? 'All Channel': channel_selected_name"-->
            <!--                  size="xs">-->
            <!--                  <q-popup-proxy>-->
            <!--                    <q-list dense class="rounded-borders">-->
            <!--                      <q-item-->
            <!--                        clickable v-ripple v-close-popup-->
            <!--                        v-for="(item, index) in channel_list" :key="index"-->
            <!--                        @click="selectChannel(item)">-->
            <!--                        <q-item-section>-->
            <!--                          {{item.name}}-->
            <!--                        </q-item-section>-->
            <!--                      </q-item>-->
            <!--                    </q-list>-->
            <!--                  </q-popup-proxy>-->
            <!--                </q-btn>-->
            <!--              </template>-->

            <!--              <q-popup-proxy ref="searchPostProxy">-->
            <!--                <q-list dense class="rounded-borders">-->
            <!--                  <q-item-->
            <!--                    clickable v-ripple v-close-popup>-->
            <!--                    <q-item-section>-->
            <!--                      ok-->
            <!--                    </q-item-section>-->
            <!--                  </q-item>-->
            <!--                </q-list>-->
            <!--              </q-popup-proxy>-->

            <!--              &lt;!&ndash;              <template v-slot:label>&ndash;&gt;-->
            <!--              &lt;!&ndash;                <span class="q-px-xs bg-grey-6 text-white rounded-borders">Channel Direktorat ACLC</span>&ndash;&gt;-->
            <!--              &lt;!&ndash;              </template>&ndash;&gt;-->
            <!--            </q-input>-->

            <!--              <q-file-->
            <!--                v-model="files"-->
            <!--                outlined dense>-->
            <!--                <template v-slot:prepend>-->
            <!--                  <q-icon name="list_alt" />-->
            <!--                </template>-->
            <!--              </q-file>-->
          </div>
        </q-card-section>

        <q-separator class="q-mb-md"/>

        <q-card-section class="q-px-lg q-py-none">
          <div v-for="(k, i) in ['Explicit Knowledge', 'Best Practice', 'Development Needed','SME Only']" :key="i">
            <div v-if="knowledge_doc.filter(x => x.content_type === k).length >0">
              <div class="q-mb-xs kmp-font-sm-2 text-bold text-grey-7">{{ k.replace('SME Only','Expertise') }}</div>
              <div class="row">
                <div class="q-pr-sm q-mb-sm" v-for="(item, index) in knowledge_doc.filter(x => x.content_type === k)"
                     :key="index">
                  <div v-if="item.file !== null">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #FFE9EE;">
                      <q-tooltip>
                        {{ item.file.name }}
                      </q-tooltip>
                      <q-icon name="far fa-file" class="" size="12px"/>
                      {{ item.file.name.substr(0, 15) }}
                      ...
                      <q-btn flat round dense icon="close" size="xs" @click="deleteFile(item)"/>
                    </q-card>
                  </div>
                  <div v-if="item.post !== null">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #E0F2FE;">
                      <q-tooltip>
                        {{ item.post.title }}
                      </q-tooltip>
                      <q-icon name="fas fa-link" class="" size="12px"/>
                      {{ item.post.title.substr(0, 15) }}...
                      <q-btn flat round dense icon="close" size="xs" @click="deletePost(item)"/>
                    </q-card>
                  </div>
                  <div v-if="item.user !== null">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #fef8e0;">
                      <q-tooltip>
                        {{ item.user.label }}
                      </q-tooltip>
                      <q-icon name="fas fa-user" class="" size="12px"/>
                      {{ item.user.label.substr(0, 15) }}...
                      <q-btn flat round dense icon="close" size="xs" @click="deleteExpertise(item)"/>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          <div class="row">-->
          <!--          <div class="q-pr-sm q-mb-sm" v-for="(item, index) in finish_files" :key="index">-->
          <!--              <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #FFE9EE;">-->
          <!--                <q-tooltip>-->
          <!--                  {{ item.file.name }}-->
          <!--                </q-tooltip>-->
          <!--                <q-icon name="far fa-file" class="" size="12px"/>-->
          <!--                {{ item.file.name.substr(0, 15) }}-->
          <!--                ...-->
          <!--                <q-btn flat round dense icon="close" size="xs" @click="handleDeleteFile(item, index)"/>-->
          <!--              </q-card>-->
          <!--&lt;!&ndash;              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="isAuthorized()"&ndash;&gt;-->
          <!--&lt;!&ndash;                                 :download="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>&ndash;&gt;-->
          <!--          </div>-->
          <!--          <div class="q-pr-sm q-mb-sm" v-for="(item, index) in finish_post" :key="index">-->
          <!--            <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #E0F2FE;">-->
          <!--              <q-tooltip>-->
          <!--                {{ item.post.title }}-->
          <!--              </q-tooltip>-->
          <!--              <q-icon name="fas fa-link" class="" size="12px"/>-->
          <!--              {{ item.post.title.substr(0, 15) }}...-->
          <!--              <q-btn flat round dense icon="close" size="xs" @click="handleDeleteFile(item, index)"/>-->
          <!--            </q-card>-->
          <!--            &lt;!&ndash;              <KnowledgeListFile v-if="item.file !== null" :file="item.file" :item="item" :manage="isAuthorized()"&ndash;&gt;-->
          <!--            &lt;!&ndash;                                 :download="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>&ndash;&gt;-->
          <!--          </div>-->
          <!--&lt;!&ndash;            <div&ndash;&gt;-->
          <!--&lt;!&ndash;              v-for="(item, index) in finish_post"&ndash;&gt;-->
          <!--&lt;!&ndash;              :key="index"&ndash;&gt;-->
          <!--&lt;!&ndash;            >&ndash;&gt;-->
          <!--&lt;!&ndash;              {{item}}&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;              <KnowledgeListPost v-if="item.post !== null" :post="item.post" :item="item" :manage="isAuthorized()"&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;                                 :openlink="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;            </div>&ndash;&gt;-->
          <!--            </div>-->
        </q-card-section>

        <q-card-actions class="text-primary q-px-md q-py-lg justify-between">
          <div class="text-neutral text-normal">
            <span v-if="knowledge_doc.length >0">
              <span v-if="knowledgeCount >0">{{ knowledgeCount }} Knowledge</span>
              <span> Added</span>
            </span>
            <span v-else>*Send request without Knowledge document</span>
          </div>
          <q-btn @click="addKnowledgeRequestExpertise" class="btn-primary-color float-right q-mr-sm publish-button" label="Send Request"
                 unelevated v-close-popup/>
        </q-card-actions>

        <q-card-actions align="right" class="text-primary hidden">
          <!--          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>-->
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Send Request" unelevated
                 @click="handleSendRequest"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="add_knowledge" persistent>
      <q-card class="q-py-sm q-px-sm" :class="$q.platform.is.mobile ? 'kmp-modal-mobile1' : 'modal-size'">
        <q-card-section class="q-pb-none">
          <span class="text-h6">Submit Knowledge</span>
          <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <span class="">Diisi dengan pengetahuan penting yang dibutuhkan untuk dapat melakukan aktivitas strategis dengan baik.</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="kmp-font-lg text-bold">{{selected_knowledge.label}}</div>
          <div class="">{{selected_knowledge.story}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="!button_add_knowledge" class="q-pt-none q-mb-md kmp-text-blue-2 kmp-font-bold cursor-pointer kmp-font-sm-2" @click="button_add_knowledge = true">
            Add Knowledge Document <q-icon name="add_circle_outline" />
          </div>

          <div v-if="button_add_knowledge" class="q-pt-none q-mb-md">
            <div class="row justify-between">
              <div class="text-subtitle">Document Type</div>
              <div><q-btn @click="removeKnowledge" label="X" size="xs" color="primary" class="q-px-xs kmp-rounded" unelevated dense /></div>
            </div>
            <div class="">
              <div v-if="document_type_model === 'Explicit Knowledge'" class="kmp-font-xs" style="width: 96%">Pengalaman keberhasilan dari individu, tim atau organisasi yang berhubungan dengan keberhasilan dalam memanfaatkan pengetahuan untuk menciptakan nilai tambah/manfaat bagi organisasi.</div>
              <div v-if="document_type_model === 'Best Practice'" class="kmp-font-xs" style="width: 96%">Pengalaman keberhasilan dari individu, tim atau organisasi yang berhubungan dengan keberhasilan dalam memanfaatkan pengetahuan untuk menciptakan nilai tambah/manfaat bagi organisasi.</div>
              <div v-if="document_type_model === 'Development Needed'" class="kmp-font-xs" style="width: 96%">Pengembangan yang sesuai untuk setiap pengetahuan.</div>
            </div>
            <q-select
              v-model="document_type_model"
              :options="['Explicit Knowledge', 'Best Practice', 'Development Needed']"
              outlined
              dense
            >
            </q-select>
          </div>

          <div v-if="button_add_knowledge" class="q-pt-none q-mb-md">
            <div class="text-subtitle">Add From Files</div>
            <q-file
              v-model="files"
              @input="addFile"
              placeholder="choose file.."
              outlined dense clearable multiple>
              <template v-slot:prepend>
                <q-icon name="attach_file"/>
              </template>
            </q-file>
          </div>

          <div v-if="button_add_knowledge" class="q-pt-none q-mb-md">
            <div class="text-subtitle">Add From Post</div>
            <q-select
              ref="post_search" fit outlined dense options-dense clearable use-input hide-selected fill-input
              hide-dropdown-icon
              :value="search_post_model"
              v-model="search_post_model"
              input-debounce="500"
              :options="options"
              placeholder="search post.."
              @filter="filterFnPost"
              @filter-abort="abortFilterFn"
              @input="addPost"
              style="width: 100% !important"
              popup-content-class="kmp-rounded-2"
              popup-content-style="width: 300px !important"
            >
              <template v-slot:prepend>
                <!--                <q-icon name="list_alt" />-->
                <!--                <q-badge class="bg-grey-7" label="Channel ACLC" />-->
                <q-btn
                  dense unelevated
                  class="q-px-xs bg-grey-7 text-white"
                  style="border-radius: 6px"
                  :label="channel_selected_name === null ? 'All Channel': channel_selected_name"
                  size="xs">
                  <q-popup-proxy>
                    <q-list dense class="rounded-borders">
                      <q-item
                        clickable v-ripple v-close-popup
                        v-for="(item, index) in channel_list" :key="index"
                        @click="selectChannel(item)">
                        <q-item-section>
                          {{ item.name }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-popup-proxy>
                </q-btn>
              </template>

              <template v-slot:append>
                <q-icon name="search" @click.stop/>
              </template>
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section class="q-my-xs">
                    <q-item-label v-html="scope.opt.label"/>
                    <q-item-label caption>
                      <div class="ellipsis">
                        {{ scope.opt.description }}
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

          </div>
        </q-card-section>

        <q-separator class="q-mb-md"/>

        <q-card-section class="q-px-lg q-py-none">
          <div v-for="(k, i) in ['Explicit Knowledge', 'Best Practice', 'Development Needed','SME Only']" :key="i">
            <div v-if="knowledge_doc.filter(x => x.content_type === k).length >0">
              <div class="q-mb-xs kmp-font-sm-2 text-bold text-grey-7">{{ k.replace('SME Only','Expertise') }}</div>
              <div class="row">
                <div class="q-pr-sm q-mb-sm" v-for="(item, index) in knowledge_doc.filter(x => x.content_type === k)"
                     :key="index">
                  <div v-if="item.file !== null">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #FFE9EE;">
                      <q-tooltip>
                        {{ item.file.name }}
                      </q-tooltip>
                      <q-icon name="far fa-file" class="" size="12px"/>
                      {{ item.file.name.substr(0, 15) }}
                      ...
                      <q-btn flat round dense icon="close" size="xs" @click="deleteFile(item)"/>
                    </q-card>
                  </div>
                  <div v-if="item.post !== null">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #E0F2FE;">
                      <q-tooltip>
                        {{ item.post.title }}
                      </q-tooltip>
                      <q-icon name="fas fa-link" class="" size="12px"/>
                      {{ item.post.title.substr(0, 15) }}...
                      <q-btn flat round dense icon="close" size="xs" @click="deletePost(item)"/>
                    </q-card>
                  </div>
                  <div v-if="item.user !== null">
                    <q-card bordered class="q-py-xs q-px-sm kmp-font-sm" style="background-color: #fef8e0;">
                      <q-tooltip>
                        {{ item.user.label }}
                      </q-tooltip>
                      <q-icon name="fas fa-user" class="" size="12px"/>
                      {{ item.user.label.substr(0, 15) }}...
                      <q-btn flat round dense icon="close" size="xs" @click="deleteExpertise(item)"/>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="text-primary q-px-md q-py-lg justify-between">
          <div class="text-neutral text-normal">
            <span v-if="knowledge_doc.length >0">
              <span v-if="knowledgeCount >0">{{ knowledgeCount }} Knowledge</span>
              <span> Added</span>
            </span>
          </div>
          <q-btn @click="addKnowledgeOnly" class="btn-primary-color float-right q-mr-sm publish-button" label="Submit Knowledge"
                 unelevated/>
        </q-card-actions>

        <q-card-actions align="right" class="text-primary hidden">
          <!--          <q-btn class="" outline unelevated v-close-popup>Cancel</q-btn>-->
          <q-btn class="btn-primary-color float-right q-mr-sm publish-button" label="Send Request" unelevated
                 @click="handleSendRequest"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="detail_expertise" v-if="detail_expertise_data !== null" persistent>
      <q-card class="q-py-md q-px-sm" :class="$q.platform.is.mobile ? 'kmp-modal-mobile1' : 'modal-size'">
        <q-card-section>
          <span class="text-h6">Expert Detail</span>
          <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <q-item class="q-px-none">
                <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm q-mr-lg">
                  <q-avatar size="36px">
                    <img v-if="detail_expertise_data.profile_picture !== null"
                         :src="url+detail_expertise_data.profile_picture">
                    <q-avatar size="36px" color="primary" text-color="white" v-else="">
                      {{ detail_expertise_data.name.match(/\b(\w)/g).join('').toUpperCase() }}
                    </q-avatar>
                  </q-avatar>
                </q-item-section>
                <q-item-section class="list-member">{{ detail_expertise_data.name }}</q-item-section>
                <q-item-section side>
                  <q-btn class="text-primary" outline unelevated no-caps>See Profile
                  </q-btn>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>

        <q-separator spaced/>

        <q-card-section v-if="detail_expertise_data.knowledges_length >0" class="q-pt-none">
          <div class="text-subtitle"> {{ detail_expertise_data.knowledges_length }} Knowledge Added</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-list>
            <div
              v-for="(item, index) in detail_expertise_data.knowledges"
              :key="index"
            >
              <KnowledgeListFile v-if="!isAuthorized() && item.file !== null" :download="true" :file="item.file"
                                 :item="item"/>
              <KnowledgeListFile v-if="isAuthorized() && item.file !== null"
                                 :file="item.file" :item="item" :download="true"
                                 manage="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>

              <KnowledgeListPost v-if="!isAuthorized() && item.post !== null" :openlink="true" :post="item.post"
                                 :item="item"/>
              <KnowledgeListPost v-if="isAuthorized() && item.post !== null"
                                 :post="item.post" :item="item" :openlink="true"
                                 :manage="isAuthorized()" @delete_knowledge="handleDelete(item, 'knowledge')"/>
            </div>
          </q-list>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <!--          <q-btn v-if="request_as_expert_visible" class="" outline unelevated v-close-popup>Close</q-btn>-->
          <!--          <q-btn v-if="request_as_expert_visible" class="btn-primary-color float-right q-mr-sm publish-button"  unelevated v-close-popup>Cancel Request</q-btn>-->

          <q-btn v-if="isAuthorized() && !detail_expertise_data.approved"
                 unelevated color="positive" dense no-caps label="Approve"
                 @click="handleApprove"/>
          <q-btn v-if="isAuthorized() && !detail_expertise_data.approved"
                 unelevated color="negative" dense no-caps label="Reject"
                 @click="handleReject"/>
          <q-btn v-if="isAuthorized() && detail_expertise_data.approved"
                 unelevated color="negative" dense no-caps label="Delete"
                 @click="handleDelete(detail_expertise_data, 'sme')"/>
<!--          <q-btn v-if="isAuthorized() && !detail_expertise_data.approved"-->
<!--                 class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--                 label="Approve" unelevated-->
<!--                 @click="handleApprove"-->
<!--          />-->
<!--          <q-btn v-if="isAuthorized() && !detail_expertise_data.approved"-->
<!--                 class="" outline unelevated-->
<!--                 @click="handleReject">Reject-->
<!--          </q-btn>-->
<!--          <q-btn v-if="isAuthorized() && detail_expertise_data.approved"-->
<!--                 class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--                 label="Delete" unelevated color="negative"-->
<!--                 @click="handleDelete(detail_expertise_data, 'sme')"-->
<!--          />-->
        </q-card-actions>

        <q-inner-loading :showing="modal_loading">
          <q-spinner size="50px" color="primary"/>
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <q-dialog v-model="detail_knowledge" v-if="detail_expertise_data !== null" persistent>
      <q-card class="q-py-md q-px-sm" :class="$q.platform.is.mobile ? 'kmp-modal-mobile1' : 'modal-size'">
        <q-card-section>
          <span class="text-h6">Knowledge Detail</span>
          <q-icon name="close" size="24px" class="text-neutral float-right cursor-pointer" v-close-popup/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <q-item class="q-px-none">
                <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm q-mr-lg">
                  <q-avatar size="36px">
                    <img v-if="detail_expertise_data.profile_picture !== null"
                         :src="url+detail_expertise_data.profile_picture">
                    <q-avatar size="36px" color="primary" text-color="white" v-else="">
                      {{ detail_expertise_data.name.match(/\b(\w)/g).join('').toUpperCase() }}
                    </q-avatar>
                  </q-avatar>
                </q-item-section>
                <q-item-section class="list-member">{{ detail_expertise_data.name }}</q-item-section>
                <q-item-section side>
                  <q-btn class="text-primary" outline unelevated no-caps>See Profile
                  </q-btn>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>

        <q-separator spaced/>

        <q-card-section v-if="knowledge_request.filter(x => x.created_by === detail_expertise_data.id).length >0" class="q-pt-none">
          <div class="text-subtitle"> {{ knowledge_request.filter(x => x.created_by === detail_expertise_data.id).length }} Knowledge Added</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-list>
            <q-item clickable v-ripple dense class="q-py-sm" v-for="(item, index) in knowledge_request.filter(x => x.created_by === detail_expertise_data.id)" :key="index">
              <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm">
                <q-icon v-if="item.file_id !== null" name="description" />
                <q-icon v-if="item.post_id !== null" name="link" />
              </q-item-section>
              <q-item-section v-if="item.file_id !== null" @click="openDialog('detail_knowledge_approved', item.created_by)">
                {{item.file.filename}}
              </q-item-section>
              <q-item-section v-if="item.post_id !== null" @click="openDialog('detail_knowledge_approved', item.created_by)">
                {{item.post.title}}
              </q-item-section>
              <!--            <q-item-section avatar style="min-width: 48px !important;" class="q-ml-sm">-->
              <!--              <Avatar size="xl" :picture="item.profile_picture ? `./api${item.profile_picture}` : ''" :name="item.name"/>-->
              <!--            </q-item-section>-->
              <!--            <q-item-section class="" @click="openDialog('detail_expertise', item.id)">-->
              <!--              {{ item.name }}-->
              <!--            </q-item-section>-->
            </q-item>
          </q-list>
<!--          <q-list>-->
<!--            <div-->
<!--              v-for="(item, index) in detail_expertise_data.knowledges"-->
<!--              :key="index"-->
<!--            >-->
<!--              <KnowledgeListFile v-if="!isAuthorized() && item.file !== null" :download="true" :file="item.file"-->
<!--                                 :item="item"/>-->
<!--              <KnowledgeListFile v-if="isAuthorized() && item.file !== null"-->
<!--                                 :file="item.file" :item="item" :download="true"-->
<!--                                 manage="true" @delete_knowledge="handleDelete(item, 'knowledge')"/>-->

<!--              <KnowledgeListPost v-if="!isAuthorized() && item.post !== null" :openlink="true" :post="item.post"-->
<!--                                 :item="item"/>-->
<!--              <KnowledgeListPost v-if="isAuthorized() && item.post !== null"-->
<!--                                 :post="item.post" :item="item" :openlink="true"-->
<!--                                 :manage="isAuthorized()" @delete_knowledge="handleDelete(item, 'knowledge')"/>-->
<!--            </div>-->
<!--          </q-list>-->
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <!--          <q-btn v-if="request_as_expert_visible" class="" outline unelevated v-close-popup>Close</q-btn>-->
          <!--          <q-btn v-if="request_as_expert_visible" class="btn-primary-color float-right q-mr-sm publish-button"  unelevated v-close-popup>Cancel Request</q-btn>-->

          <q-btn v-if="isAuthorized() && !detail_expertise_data.approved"
                 unelevated color="positive" dense no-caps label="Approve"
                 @click="handleApproveDoc"/>
          <q-btn v-if="isAuthorized() && !detail_expertise_data.approved"
                 unelevated color="negative" dense no-caps label="Reject"
                 @click="handleRejectDoc"/>
          <q-btn v-if="isAuthorized() && detail_expertise_data.approved"
                 unelevated color="negative" dense no-caps label="Delete"
                 @click="handleDelete(detail_expertise_data, 'sme')"/>


<!--          <q-btn v-if="isAuthorized() && !detail_expertise_data.approved"-->
<!--                 class="" outline unelevated-->
<!--                 @click="handleReject">Reject-->
<!--          </q-btn>-->
<!--          <q-btn v-if="isAuthorized() && !detail_expertise_data.approved"-->
<!--                 class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--                 label="Approve" unelevated-->
<!--                 @click="handleApprove"-->
<!--          />-->
<!--          <q-btn v-if="isAuthorized() && detail_expertise_data.approved"-->
<!--                 class="btn-primary-color float-right q-mr-sm publish-button"-->
<!--                 label="Delete" unelevated color="negative"-->
<!--                 @click="handleDelete(detail_expertise_data, 'sme')"-->
<!--          />-->
        </q-card-actions>

        <q-inner-loading :showing="modal_loading">
          <q-spinner size="50px" color="primary"/>
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import KnowledgeConversation from 'components/kmap/KnowledgeConversation';
import KnowledgeListFile from 'components/KnowledgeListFile';
import KnowledgeListPost from 'components/KnowledgeListPost';
import { axios } from 'boot/axios';
import { Notify } from 'quasar';
import { getCredential } from 'src/lib/storage';
import Avatar from 'components/common/Avatar';
import { channelList, fileUpload, knowledgeCreate, knowledgeDelete, profileDetail, SearchData } from '../lib/api';
import { del, get, post, put } from '../lib/HttpHelper';
import { capitalize, getLoginId, checkRole } from '../lib/helper';

// const { humanStorageSize } = format;
const defaultTarget = [
  { value: '', class: 'knowledge_target', name: 'knowledge_target1' }
];

export default {
  props: ['selected_knowledge', 'default_direktorat', 'data_parent'],
  components: { KnowledgeConversation, KnowledgeListFile, KnowledgeListPost, Avatar },
  computed: {
    knowledgeCount() {
      return this.knowledge_doc.filter(x => x.user === null).length;
    },
    expertiseCount() {
      return this.knowledge_doc.filter(x => x.user !== null).length;
    }
  },
  data() {
    return {
      checkRole,

      kmap_roles: ['km_manager', 'channel_manager', 'content_manager'],
      direktorat_can_download: 0,
      card_visible: true,
      modal_loading: true,
      document_type_model: 'Explicit Knowledge',
      knowledge_name_model: { id: 0, label: '', story: '' },
      knowledge_name_options: [],
      test_items: [],
      tab: 'member',
      url: process.env.QUASAR_API_URL,
      person_options: [],
      person_expertise: [],
      person_expertise_request: [],
      person_expertise_add: null,
      ref_add_expertise: null,
      stringOptions: [],
      options: [],
      // person_options: personOptions,
      request: false,
      strategic: '',
      add_target: false,
      add_files: false,
      add_knowledge_by_admin: false,
      add_posts: false,
      add_expertise: false,
      add_knowledge: false,
      add_expertise_admin: false,
      manage_knowledge: false,
      manage_expert: false,
      manage_expert_old: false,
      detail_expertise: false,
      detail_knowledge: false,
      detail_expertise_data: null,
      detail_knowledge_data: null,
      question: '',
      search_post_model: '',
      search_person_model: '',
      uploaded_files: false,
      request_as_expert_visible: false,
      knowledges: {},
      finish_files: [],
      finish_post: [],
      target_knowledge: [],
      items: defaultTarget,
      val_select: '',
      list_knowledge: [],
      knowledge_sme_approved: [],
      knowledge_sme_request: [],
      knowledge_request: [],
      knowledge_explicit_knowledge: [],
      knowledge_best_practice: [],
      knowledge_development_needed: [],
      knowledge_tab: 'files',
      files: null,
      user: {
        id: '',
        name: '',
        initial: ''
      },
      // is_km_manager: false,
      current_user: {},
      channel_list: [],
      channel_selected_id: null,
      channel_selected_name: null,
      channel_post_keyword: '',
      knowledge_doc: [],
      button_add_knowledge: false,
      button_add_expertise: false,
      expertise: []
    };
  },

  methods: {
    isAuthorized() {
      if (this.kmap_roles.includes(checkRole().name) && checkRole().name === 'channel_manager' && this.current_user.organization) {
        if (this.current_user.organization === this.selected_knowledge.parent_id_zero_name) return true;
        return false;
      }
      return this.kmap_roles.includes(checkRole().name);
    },
    selectChannel(item) {
      this.channel_selected_id = item.id;
      this.channel_selected_name = item.name;
      this.channel_post_keyword = '';
      setTimeout(() => {
        this.$refs.post_search.focus();
      }, 500);
    },
    getListChannel() {
      channelList().then(response => {
        if (response.data.length < 1) {
          this.newMember = true;
        }
        const hasil = response.data;
        this.channel_list = hasil.map(item => {
          const sort_number = {
            General: 0,
            Direktorat: 1,
            COP: 2,
            Project: 3,
            Hobby: 4
          };
          return {
            avatar: item.avatar ? this.url + item.avatar : false,
            channel_type: item.channel_type,
            name: item.name,
            short_name: item.short_name,
            id: item.id,
            is_private: item.is_private,
            sort: sort_number[item.channel_type],
            channel_member: item.channel_member ? item.channel_member : 0
          };
        }).sort((a, b) => a.sort - b.sort);
      });
    },
    deleteObject(tindex) {
      this.$delete(this.test_items, tindex);
    },
    deleteKnowledge(id, index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Anda yakin file ini akan di delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteObject(index);
        knowledgeDelete(id).then(response => {
          this.$q.notify({
            message: 'Knowledge deleted sucessfully!',
            color: 'blue'
          });
        });
      }).onCancel(() => {
      }).onDismiss(() => {
      });
    },
    openDialog(dialogName, id) {
      if (dialogName === 'add_target') {
        if (this.selected_knowledge.label !== '') {
          this.add_target = true;
        } else {
          Notify.create({
            message: 'Select tree terlebih dahulu.',
            timeout: 1000,
            type: 'negative',
            color: 'negative',
            icon: 'warning'
          });
        }
      }
      if (dialogName === 'add_files') {
        // this.finish_files = [];
        if (id) {
          this.add_knowledge_by_admin = true;
        } else {
          this.add_knowledge_by_admin = false;
        }
        this.knowledge_name_model = { id: 0, label: '', story: '' };
        this.knowledge_name_options = this.selected_knowledge.children;
        setTimeout(() => {
          this.add_files = true;
        }, 500);
      }
      if (dialogName === 'add_posts') {
        // this.finish_post = [];
        if (id) {
          this.add_knowledge_by_admin = true;
        } else {
          this.add_knowledge_by_admin = false;
        }
        this.knowledge_name_model = { id: 0, label: '', story: '' };
        this.knowledge_name_options = this.selected_knowledge.children;
        setTimeout(() => {
          this.add_posts = true;
        }, 500);
      }
      if (dialogName === 'add_expertise') {
        this.finish_post = [];
        this.finish_files = [];
        this.knowledge_doc = [];
        this.add_expertise = true;
      }
      if (dialogName === 'add_knowledge') {
        this.finish_post = [];
        this.finish_files = [];
        this.knowledge_doc = [];
        this.add_knowledge = true;
      }
      if (dialogName === 'manage_knowledge') {
        this.finish_post = [];
        this.finish_files = [];
        this.manage_knowledge = true;

        this.button_add_knowledge = false;
        this.button_add_expertise = false;
      }
      if (dialogName === 'manage_expert') {
        this.finish_post = [];
        this.finish_files = [];
        this.manage_expert = true;
      }
      if (dialogName === 'request') this.request = true;
      if (dialogName === 'detail_expertise') {
        this.detail_expertise = true;
        this.getKnowledgeById(this.selected_knowledge.id, this.selected_knowledge.label, `&user_id=${id}`, false);
        // const detail = this.person_expertise_request.find(v => { return v.id === id; });
        // detail.knowledges = this.knowledges.data.filter(v => { return v.user_id === id; });
      }
      if (dialogName === 'detail_knowledge') {
        this.detail_knowledge = true;
        this.getKnowledgeById(this.selected_knowledge.id, this.selected_knowledge.label, '', false);
        // const detail = this.person_expertise_request.find(v => { return v.id === id; });
        // detail.knowledges = this.knowledges.data.filter(v => { return v.user_id === id; });
      }
      if (dialogName === 'detail_expertise_approved') {
        this.detail_expertise = true;
        this.getKnowledgeById(this.selected_knowledge.id, this.selected_knowledge.label, `&user_id=${id}`, true);
        // const detail = this.person_expertise_request.find(v => { return v.id === id; });
        // detail.knowledges = this.knowledges.data.filter(v => { return v.user_id === id; });
      }
      if (dialogName === 'detail_knowledge_approved') {
        this.detail_knowledge = true;
        this.getKnowledgeById(this.selected_knowledge.id, this.selected_knowledge.label, '', true);
        // const detail = this.person_expertise_request.find(v => { return v.id === id; });
        // detail.knowledges = this.knowledges.data.filter(v => { return v.user_id === id; });
      }
      if (dialogName === 'add_expertise_admin') {
        this.add_expertise_admin = true;
        const user = this.person_options.find(v => {
          return v.value === id;
        });
        const data = {
          user
        };
        this.person_expertise_add = data;
      }
    },
    openDialogsTree(tipe) {
      this.$root.$emit('openDialogsTree', (tipe));
      if (tipe === 'delete') {
        this.$root.$emit('changeInfoKmap');
      }
    },
    manageKnowledge() {
      this.manage_knowledge = true;
    },
    addList() {
      const id = this.items.length + 1;
      this.items.push(
        { value: '', class: 'knowledge_target', name: `knowledge_target${id}` }
      );
    },
    handleChange(e, field) {
      if (field === 'question') {
        this.question = e.target.value;
      } else if (field === 'knowledge_target') {
        this.items.filter(f => {
          return f.name === e.target.name;
        }).value = e.target.value;
      } else {
        const name = field;
        this.items.forEach(f => {
          if (f.name !== name) {
            f.correct = false;
          }
        });
      }
    },
    filterFn(val, update, abort) {
      if (val.length < 1) {
        abort();
        return;
      }
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.person_options = [];
          } else {
            const needle = val.toLowerCase();
            get({
              path: `api/searchtopn?keyword=${needle}&includes=user&paging=10`
            }).then(res => {
              const response = res.data;
              const searchFormated = response.map((v, i) => {
                return {
                  label: capitalize(v.user.name),
                  value: v.user.id,
                  description: v.user.name,
                  icon: 'bluetooth',
                  extra: v.user
                };
              });
              const searchFound = JSON.parse(JSON.stringify(searchFormated));
              this.person_options = searchFound;
              this.$refs.optapi = searchFound;
            }).finally(() => {
              setTimeout(() => {
                if (val !== '' && this.$refs.select_person.options.length > 0 && this.$refs.select_person.optionIndex === -1) {
                  this.$refs.select_person.moveOptionSelection(1, true);
                }
              }, 200);
            });
            //    this.options = this.stringOptions;
            //  } else {
            //    const needle = val.toLowerCase();
            //    this.options = this.stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
          }
        });
      }, 300);
    },
    onChannelPostSearch(data) {
      this.$refs.searchPostProxy.show();
    },
    filterFnPost(val, update, abort) {
      if (val.length < 1) {
        abort();
        return;
      }

      setTimeout(() => {
        update(() => {
          this.options = [];
          const needle = val.toLowerCase();
          const channel_id_filter = (this.channel_selected_id === null) ? '' : `&channel_id=${this.channel_selected_id}`;
          get({
            path: `api/search?keyword=${needle}&includes=post${channel_id_filter}`
          }).then(res => {
            const response = res.data;
            const searchFormated = response.map((v, i) => {
              return {
                label: v.post.title,
                value: v.post.id,
                description: v.post.description,
                icon: 'bluetooth'
              };
            });
            this.options = JSON.parse(JSON.stringify(searchFormated));
          }).finally(() => {
            setTimeout(() => {
              if (val !== '' && this.$refs.post_search.options.length > 0 && this.$refs.post_search.optionIndex === -1) {
                this.$refs.post_search.moveOptionSelection(1, true);
              }
            }, 200);
          });
        });
      }, 300);
    },
    handleSendRequest() {
      if (this.manage_expert && this.search_person_model === '') {
        Notify.create({
          message: 'Save Expert Document need Person as requirement',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'check'
        });
        return;
      }

      if (this.finish_files.length === 0 && this.finish_post.length === 0 && !this.manage_expert) {
        Notify.create({
          message: 'Send "Request as Expert" need file or post as requirement',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'check'
        });
        return;
      }

      if (this.finish_files.length === 0 && this.finish_post.length === 0 && this.manage_expert) {
        const params = {
          created_by: this.user.id,
          knowledge_tree_id: this.selected_knowledge.id,
          content_type: 'SME Only',
          seq: 1,
          enabled: true,
          approved: true,
          user_id: this.search_person_model.value
        };
        post(
          {
            path: 'api/knowledge',
            params
          });
      }

      this.finish_files.forEach(data => {
        // const user_id = this.add_knowledge_by_admin ? this.person_expertise_add.user.value : data.created_by;
        const user_id = data.file.created_by;
        const approved = this.manage_expert ? true : this.add_knowledge_by_admin;
        const params = {
          created_by: data.file.created_by,
          knowledge_tree_id: data.knowledge_tree_id,
          content_type: this.document_type_model,
          file_id: data.file.id,
          seq: 1,
          enabled: true
        };
        if (data.file.created_by === 1) {
          params.approved = approved;
          if (this.add_expertise) params.user_id = user_id;
          if (this.manage_expert) params.user_id = this.search_person_model.value;
        } else {
          params.approved = approved;
          if (this.add_expertise) params.user_id = data.file.created_by;
          if (this.manage_expert) params.user_id = this.search_person_model.value;
        }
        post(
          {
            path: 'api/knowledge',
            params
          });
      });

      this.finish_post.forEach(data => {
        // const user_id = this.add_knowledge_by_admin ? this.person_expertise_add.user.value : data.created_by;
        const user_id = data.post.created_by;
        const approved = this.manage_expert ? true : this.add_knowledge_by_admin;
        const params = {
          created_by: data.post.created_by,
          knowledge_tree_id: data.knowledge_tree_id,
          content_type: this.document_type_model,
          post_id: data.post.id,
          seq: 1,
          enabled: true
        };
        if (data.post.created_by === 1) {
          params.approved = approved;
          if (this.add_expertise) params.user_id = user_id;
          if (this.manage_expert) params.user_id = this.search_person_model.value;
        } else {
          params.approved = approved;
          if (this.add_expertise) params.user_id = data.post.created_by;
          if (this.manage_expert) params.user_id = this.search_person_model.value;
        }
        post(
          {
            path: 'api/knowledge',
            params
          });
      });

      if (this.add_expertise) {
        setTimeout(() => {
          Notify.create({
            message: 'Send request as expert is successfully',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
          // this.getKnowledgeSme(this.selected_knowledge.children.map(x => x.id).join(','), this.selected_knowledge.label);
          this.add_expertise = false;
          this.search_post_model = '';
          this.finish_post = [];
          this.finish_files = [];
        }, 1000);
      }

      if (this.manage_knowledge) {
        setTimeout(() => {
          Notify.create({
            message: 'Document is added successfully',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
          this.manage_knowledge = false;
          this.search_post_model = '';
          this.finish_post = [];
          this.finish_files = [];
        }, 1000);
      }

      if (this.manage_expert) {
        setTimeout(() => {
          Notify.create({
            message: 'Expert is added successfully',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
          this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
          this.manage_expert = false;
          this.search_person_model = '';
          this.search_post_model = '';
          this.finish_post = [];
          this.finish_files = [];
        }, 1000);
      }
    },
    removeExpertise() {
      this.button_add_expertise = false;
      // this.expertise = [];
    },
    removeKnowledge() {
      this.button_add_knowledge = false;
      // this.knowledge_doc = [];
    },
    addKnowledge() {
      this.knowledge_doc.forEach(async data => {
        const params = {
          created_by: this.user.id,
          knowledge_tree_id: data.knowledge_tree_id,
          content_type: data.content_type,
          seq: 1,
          enabled: true,
          approved: true
        };

        if (data.file !== null) {
          const formData = new FormData();
          formData.append('file[]', data.file);
          const res = await fileUpload(formData);
          const file = res.data;
          if (file.length > 0) {
            params.file_id = file[0].id;
          }
        }
        if (data.post !== null) {
          params.post_id = data.post.id;
        }
        if (data.user !== null) {
          params.user_id = data.user.value;
        }

        await knowledgeCreate(params);
      });

      setTimeout(() => {
        Notify.create({
          message: 'Knowledge/Expertise is added successfully',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
        this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
        this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
        this.knowledge_doc = [];
      }, 1000);
    },
    async addKnowledgeRequestExpertise() {
      if (this.knowledge_doc.length === 0) {
        const params = {
          created_by: this.user.id,
          user_id: this.user.id,
          knowledge_tree_id: this.selected_knowledge.id,
          content_type: 'SME Only',
          seq: 1,
          enabled: true,
          approved: false
        };
        await knowledgeCreate(params);
      } else {
        this.knowledge_doc.forEach(async data => {
          const params = {
            created_by: this.user.id,
            knowledge_tree_id: data.knowledge_tree_id,
            content_type: data.content_type,
            seq: 1,
            enabled: true,
            approved: false,
            user_id: this.user.id
          };

          if (data.file !== null) {
            const formData = new FormData();
            formData.append('file[]', data.file);
            const res = await fileUpload(formData);
            const file = res.data;
            if (file.length > 0) {
              params.file_id = file[0].id;
            }
          }
          if (data.post !== null) {
            params.post_id = data.post.id;
          }
          if (data.user !== null) {
            params.user_id = data.user.value;
          }

          await knowledgeCreate(params);
        });
      }

      setTimeout(() => {
        Notify.create({
          message: 'Request as Expertise is submitted successfully',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
        this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
        this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
        this.knowledge_doc = [];
      }, 1000);
    },
    async addKnowledgeOnly() {
      if (this.knowledge_doc.length === 0) {
        Notify.create({
          message: 'Upload a document or select a post.',
          timeout: 2000,
          type: 'negative',
          color: 'negative',
          icon: 'check'
        });

        return;
      }
      this.knowledge_doc.forEach(async data => {
        const params = {
          created_by: this.user.id,
          knowledge_tree_id: data.knowledge_tree_id,
          content_type: data.content_type,
          seq: 1,
          enabled: true,
          approved: false
        };

        if (data.file !== null) {
          const formData = new FormData();
          formData.append('file[]', data.file);
          const res = await fileUpload(formData);
          const file = res.data;
          if (file.length > 0) {
            params.file_id = file[0].id;
          }
        }
        if (data.post !== null) {
          params.post_id = data.post.id;
        }
        if (data.user !== null) {
          params.user_id = data.user.value;
        }

        await knowledgeCreate(params);
      });


      setTimeout(() => {
        Notify.create({
          message: 'Request as Expertise is submitted successfully',
          timeout: 1000,
          type: 'positive',
          color: 'positive',
          icon: 'check'
        });
        this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
        this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
        this.knowledge_doc = [];
        this.add_knowledge = false;
      }, 1000);
    },
    deleteExpertise(data) {
      const current = this.knowledge_doc.filter(x => x.user === null);
      this.knowledge_doc = current.concat(this.knowledge_doc.filter(x => x.user !== null && x.user.value !== data.user.value));
    },
    deleteFile(data) {
      const current = this.knowledge_doc.filter(x => x.file === null);
      this.knowledge_doc = current.concat(this.knowledge_doc.filter(x => x.file !== null && x.file.name !== data.file.name));
    },
    deletePost(data) {
      const current = this.knowledge_doc.filter(x => x.post === null);
      this.knowledge_doc = current.concat(this.knowledge_doc.filter(x => x.post !== null && x.post.id !== data.post.id));
    },
    addExpertise() {
      const res = this.knowledge_doc.filter(x => x.user !== null && x.user.value === this.search_person_model.value);
      if (res.length > 0) {
        Notify.create({
          message: 'Member is already added',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
        setTimeout(() => {
          this.search_person_model = null;
        }, 250);

        return;
      }

      this.knowledge_doc.push({
        id: 0,
        file: null,
        post: null,
        user: this.search_person_model,
        knowledge_tree_id: this.selected_knowledge.id,
        content_type: 'SME Only'
      });
      setTimeout(() => {
        this.search_person_model = null;
      }, 250);
    },
    addFile(files, content_type) {
      files.forEach((v, i, a) => {
        this.knowledge_doc.push({
          id: 0,
          file: files[i],
          post: null,
          user: null,
          knowledge_tree_id: this.selected_knowledge.id,
          content_type: this.document_type_model
        });
      });
      setTimeout(() => {
        this.files = null;
      }, 250);
    },
    addPost() {
      const res = this.knowledge_doc.filter(x => x.post !== null && x.post.id === this.search_post_model.value);
      if (res.length > 0) {
        Notify.create({
          message: 'Post is already added',
          timeout: 1000,
          type: 'negative',
          color: 'negative',
          icon: 'warning'
        });
        setTimeout(() => {
          this.search_post_model = null;
        }, 250);

        return;
      }

      this.channel_selected_id = null;
      this.channel_selected_name = null;
      this.channel_post_keyword = '';
      this.knowledge_doc.push({
        id: this.search_post_model.value,
        file: null,
        post: {
          id: this.search_post_model.value,
          title: this.search_post_model.label,
          description: this.search_post_model.description
        },
        user: null,
        knowledge_tree_id: this.selected_knowledge.id,
        content_type: this.document_type_model
      });

      setTimeout(() => {
        this.search_post_model = null;
      }, 250);
    },
    handleUpload(files, content_type) {
      // if (this.add_expertise && this.knowledge_name_model.id === 0) {
      //   Notify.create({
      //     message: 'Select Knowledge Name first',
      //     timeout: 1000,
      //     type: 'negative',
      //     color: 'negative',
      //     icon: 'check'
      //   });
      //   this.$refs.uploader.reset();
      // } else {
      this.uploaded_files = true;
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      files.forEach((v, i, a) => {
        const formData = new FormData();
        formData.append('file[]', files[i]);
        axios.post('./api/api/file', formData, config).then(res => {
          const response = res.data.data[0];
          // this.addKnowledgeFiles(response);
          if (res.data.message === 'OK') {
            if (files.length === i + 1) {
              this.uploaded_files = false;
              this.$refs.uploader.reset();
              this.finish_files.push({
                file: response,
                knowledge_tree_id: this.selected_knowledge.id,
                // knowledge_tree_id: this.add_expertise || this.manage_expert ? this.knowledge_name_model.id : this.selected_knowledge.id,
                content_type: this.document_type_model
              });
            }
          }
        }).catch(error => {
        });

        // if (i === a.length - 1) {
        //   setTimeout(() => {
        //     this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
        //     // this.getExpert(this.selected_knowledge.id, this.selected_knowledge.label);
        //   }, 500);
        // }
      });

      this.files = null;
      // }
    },
    handleDelete(data, type) {
      let msg = '';
      switch (type) {
        case 'file':
          msg = 'Are you sure want to delete this File?';
          break;
        case 'post':
          msg = 'Are you sure want to delete this Post?';
          break;
        case 'sme':
          msg = 'Are you sure want to delete this Expert?';
          break;
        default:
          msg = 'Are you sure want to delete this Document?';
      }
      this.$q.dialog({
        title: 'Confirm',
        message: msg,
        cancel: true,
        persistent: true
      }).onOk(() => {
        if (type === 'knowledge') {
          del({
            path: `api/knowledge/${data.id}`
          }).then(res2 => {
            this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
            Notify.create({
              message: 'Delete Document is Successfully.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          });
        } else if (type === 'sme') {
          get({
            path: `api/knowledge?knowledge_tree_id_in=${this.selected_knowledge.id}&user_id=${data.id}`
          }).then(res => {
            const response = res.data;
            del({
              path: `api/knowledge/${response[0].id}`
            }).then(res2 => {

            });
          }).finally(() => {
            Notify.create({
              message: 'Delete Expert is Successfully.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
            setTimeout(() => {
              this.detail_expertise = false;
              this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
            }, 250);
            // this.getKnowledgeSme(this.selected_knowledge.children.map(x => x.id).join(','), this.selected_knowledge.label);
          });
        } else if (type === 'file') {
          del({
            path: `api/file/${data}`
          }).then(res1 => {
            if (res1.message === 'OK') {
              setTimeout(() => {
                this.getExpert(this.selected_knowledge.parent_id, this.selected_knowledge.label);
              }, 500);
              Notify.create({
                message: 'Delete file berhasil.',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
            }
          });
          get({
            path: `api/knowledge?knowledge_tree_id=${this.selected_knowledge.parent_id}&content_type=${this.selected_knowledge.label}&file_id=${data}`
          }).then(res => {
            const response = res.data;
            del({
              path: `api/knowledge/${response[0].id}`
            }).then(res2 => {

            });
          });
          if (this.detail_expertise) {
            const removeIndex = this.detail_expertise_data.knowledges.findIndex(v => v.file_id === data);
            this.detail_expertise_data.knowledges = this.deleteList(this.detail_expertise_data.knowledges, removeIndex);
          } else {
            const removeIndex = this.finish_files.findIndex(v => v.file.id === data);
            this.finish_files = this.deleteList(this.finish_files, removeIndex);
          }
        } else {
          del({
            path: `api/knowledge/${data}`
          }).then(res3 => {
            if (res3.message === 'OK') {
              setTimeout(() => {
                this.getExpert(this.selected_knowledge.parent_id, this.selected_knowledge.label);
              }, 500);
              Notify.create({
                message: 'Delete knowledge post berhasil.',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
            }
          });
          if (this.detail_expertise) {
            const removeIndex = this.detail_expertise_data.knowledges.findIndex(v => v.post_id === data);
            this.detail_expertise_data.knowledges = this.deleteList(this.detail_expertise_data.knowledges, removeIndex);
          } else {
            const removeIndex = this.finish_post.findIndex(v => v.post.id === data);
            this.finish_post = this.deleteList(this.finish_post, removeIndex);
          }
        }
      }).onCancel(() => {
      }).onDismiss(() => {
      });
    },
    handleAddPost() {
      this.channel_selected_id = null;
      this.channel_selected_name = null;
      this.channel_post_keyword = '';
      this.finish_post.push({
        id: this.search_post_model.value,
        post: {
          id: this.search_post_model.value,
          title: this.search_post_model.label,
          description: this.search_post_model.description
        },
        // knowledge_tree_id: this.add_expertise || this.manage_expert ? this.knowledge_name_model.id : this.selected_knowledge.id,
        knowledge_tree_id: this.selected_knowledge.id,
        content_type: this.document_type_model
      });

      setTimeout(() => {
        this.search_post_model = null;
      }, 250);
    },
    savePostKnowledge() {
      const user_id = this.add_knowledge_by_admin ? this.person_expertise_add.user.value : getLoginId();
      const approved = this.add_knowledge_by_admin;
      const data = this.selected_knowledge.label === 'Subject Matter Expert' ?
        {
          enabled: true,
          // knowledge_tree_id: this.add_expertise ? this.knowledge_name_model.id : this.selected_knowledge.id,
          knowledge_tree_id: this.selected_knowledge.id,
          content_type: this.document_type_model,
          post_id: this.search_post_model.value,
          user_id,
          approved
        } : {
          enabled: true,
          knowledge_tree_id: this.selected_knowledge.id,
          approved: false,
          content_type: this.document_type_model,
          post_id: this.search_post_model.post_id
        };
      const detail_post = [];
      this.search_post_model = '';
      knowledgeCreate(data).then(response => {
        detail_post.push(
          { id: response.data.id, post: response.data.post }
        );
        this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
        if (this.add_expertise) {
          this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
          // this.getKnowledgeSme(this.selected_knowledge.children.map(x => x.id).join(','), this.selected_knowledge.label);
        }
        this.$q.notify({
          message: 'Knowledge Saved !',
          color: 'blue'
        });
        this.finish_post = this.finish_post.concat(detail_post);
      });
    },
    getPost() {
      SearchData({ includes: 'post' }).then(response => {
        const hasil = response.data;
        this.stringOptions = hasil.map(item => {
          return {
            label: item.search_title,
            value: item.id,
            description: item.search_subtitle,
            post_id: item.post_id,
            file_id: item.file_id
          };
        });
      });
    },
    abortFilterFn() {
    },
    addKnowledgeFiles(data) {
      const user_id = this.add_knowledge_by_admin ? this.person_expertise_add.user.value : data.created_by;
      const approved = this.add_knowledge_by_admin;
      const params = {
        created_by: data.created_by,
        // knowledge_tree_id: this.add_expertise ? this.knowledge_name_model.id : this.selected_knowledge.id,
        knowledge_tree_id: this.selected_knowledge.id,
        content_type: this.document_type_model,
        file_id: data.id,
        seq: 1,
        enabled: true
      };
      if (data.created_by === 1) {
        params.approved = approved;
        if (this.add_expertise || this.manage_expert) params.user_id = user_id;
      } else {
        params.approved = approved;
        if (this.add_expertise || this.manage_expert) params.user_id = data.created_by;
      }
      post(
        {
          path: 'api/knowledge',
          params
        })
        .then(res => {
          this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
          if (this.add_expertise) {
            this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
            // this.getKnowledgeSme(this.selected_knowledge.children.map(x => x.id).join(','), this.selected_knowledge.label);
          }
        });
    },
    getKnowledge(knowledge_tree_id, content_type) {
      this.card_visible = true;
      this.knowledge_best_practice = [];
      this.knowledge_development_needed = [];
      this.knowledge_explicit_knowledge = [];
      get({
        path: `api/knowledge?knowledge_tree_id=${knowledge_tree_id}`
      }).then(res => {
        const knowledges = JSON.parse(JSON.stringify(res.data));
        this.card_visible = false;

        this.knowledge_request = knowledges.filter(v => {
          return v.approved === false && v.user_id === null;
        });

        this.knowledge_best_practice = knowledges.filter(v => {
          return v.content_type === 'Best Practice' && v.approved === true;
        });

        this.knowledge_development_needed = knowledges.filter(v => {
          return v.content_type === 'Development Needed' && v.approved === true;
        });

        this.knowledge_explicit_knowledge = knowledges.filter(v => {
          return v.content_type === 'Explicit Knowledge' && v.approved === true;
        });
      });
    },
    getKnowledgeSme(knowledge_tree_id, content_type) {
      this.card_visible = true;
      this.knowledge_sme_approved = [];
      this.knowledge_sme_request = [];
      get({
        path: `api/knowledge?knowledge_tree_id=${knowledge_tree_id}&user_id_not_null=true`
        // path: `api/knowledge?knowledge_tree_id_in=${knowledge_tree_id}&user_id_not_null=true`
      }).then(res => {
        const knowledges = JSON.parse(JSON.stringify(res.data));
        this.card_visible = false;

        const knowledge_sme_approved_tmp = knowledges.filter(v => {
          return v.user !== null && v.approved === true;
        }).map((v, i) => {
          return {
            id: v.user.id,
            name: capitalize(v.user.name),
            profile_picture: v.user.profile_picture
          };
        }).sort((a, b) => (a.name > b.name ? 1 : -1));

        this.knowledge_sme_approved = [
          ...new Map(knowledge_sme_approved_tmp.map(item => [item.name, item])).values()
        ];

        let knowledge_sme_request_tmp = knowledges.filter(v => {
          return v.user !== null && v.approved === false;
        }).map((v, i) => {
          return {
            id: v.user.id,
            name: capitalize(v.user.name),
            profile_picture: v.user.profile_picture,
            with_doc: (v.file_id !== null || v.post_id !== null)
          };
        }).sort((a, b) => (a.name > b.name ? 1 : -1));

        // if (this.user.name !== 'admin') {
        if (!this.isAuthorized()) {
          knowledge_sme_request_tmp = knowledge_sme_request_tmp.filter(x => x.name === capitalize(this.user.name));
        }

        this.knowledge_sme_request = [
          ...new Map(knowledge_sme_request_tmp.map(item => [item.name, item])).values()
        ];

        this.request_as_expert_visible = false;
        const cek = this.knowledge_sme_request.find(x => x.id === this.user.id);
        if (cek === undefined) this.request_as_expert_visible = true;
      });
    },
    getExpert(knowledge_tree_id, content_type) {
      get({
        path: `api/expertise?knowledge_tree_id=${knowledge_tree_id}&content_type=${content_type}`
      }).then(res => {
        const selected = JSON.parse(JSON.stringify(res)).data.filter(v => {
          return v.user !== null;
        });
        // this.request_as_expert_visible = false;
        let dataRequest = selected.filter(v => {
          return v.approved === false;
        }).map((v, i) => {
          return {
            id: v.user.id,
            name: capitalize(v.user.name),
            profile_picture: 'https://cdn.quasar.dev/img/avatar.png'
          };
        });
        // if (this.user.name !== 'admin') {
        if (!this.isAuthorized()) {
          dataRequest = selected.filter(v => {
            return v.approved === false && v.user.id === this.user.id;
          }).map((v, i) => {
            // if (v.user.id === this.user.id) this.request_as_expert_visible = true;
            return {
              id: v.user.id,
              name: capitalize(v.user.name),
              profile_picture: 'https://cdn.quasar.dev/img/avatar.png'
            };
          });
        }
        const dataSme = selected.filter(v => {
          return v.approved === true;
        }).map((v, i) => (
          { id: v.user.id, name: capitalize(v.user.name), profile_picture: 'https://cdn.quasar.dev/img/avatar1.jpg' }
        ));
        this.person_expertise_request = dataRequest;
        this.person_expertise = dataSme;
      });
    },
    searchMember(name) {
      let result = '';
      get({
        path: `api/search?keyword=${name}&includes=user`
      }).then(res => {
        const response = res.data;
        const dataMember = response.map(v => (
          v.user[0]
        ));
        result = dataMember;
      });
      return result;
    },
    handleApproveDirect(id) {
      get({
        path: `api/knowledge?knowledge_tree_id_in=${this.selected_knowledge.id}&user_id=${id}&approved=false`
      }).then(res => {
        const response = res.data;
        this.detail_expertise_data = {
          id: response[0].created_by_user.id,
          name: capitalize(response[0].created_by_user.name),
          profile_picture: response[0].created_by_user.profile_picture,
          approved: response[0].approved,
          knowledges_length: response.filter(x => x.content_type !== 'SME Only').length,
          knowledges: response.filter(x => x.content_type !== 'SME Only'),
          knowledges_sme_only_length: response.filter(x => x.content_type === 'SME Only').length,
          knowledges_sme_only: response.filter(x => x.content_type === 'SME Only')
        };

        this.handleApprove();
      });
    },
    handleRejectDirect(id) {
      get({
        path: `api/knowledge?knowledge_tree_id_in=${this.selected_knowledge.id}&user_id=${id}&approved=false`
      }).then(res => {
        const response = res.data;
        this.detail_expertise_data = {
          id: response[0].created_by_user.id,
          name: capitalize(response[0].created_by_user.name),
          profile_picture: response[0].created_by_user.profile_picture,
          approved: response[0].approved,
          knowledges_length: response.filter(x => x.content_type !== 'SME Only').length,
          knowledges: response.filter(x => x.content_type !== 'SME Only'),
          knowledges_sme_only_length: response.filter(x => x.content_type === 'SME Only').length,
          knowledges_sme_only: response.filter(x => x.content_type === 'SME Only')
        };

        this.handleReject();
      });
    },
    handleApproveDocDirect(id) {
      get({
        path: `api/knowledge?knowledge_tree_id_in=${this.selected_knowledge.id}&approved=false`
      }).then(res => {
        const response = res.data;
        this.detail_expertise_data = {
          id: response[0].created_by_user.id,
          name: capitalize(response[0].created_by_user.name),
          profile_picture: response[0].created_by_user.profile_picture,
          approved: response[0].approved,
          knowledges_length: response.filter(x => x.content_type !== 'SME Only').length,
          knowledges: response.filter(x => x.content_type !== 'SME Only'),
          knowledges_sme_only_length: response.filter(x => x.content_type === 'SME Only').length,
          knowledges_sme_only: response.filter(x => x.content_type === 'SME Only')
        };

        this.handleApproveDoc();
      });
    },
    handleRejectDocDirect(id) {
      get({
        path: `api/knowledge?knowledge_tree_id_in=${this.selected_knowledge.id}&approved=false`
      }).then(res => {
        const response = res.data;
        this.detail_expertise_data = {
          id: response[0].created_by_user.id,
          name: capitalize(response[0].created_by_user.name),
          profile_picture: response[0].created_by_user.profile_picture,
          approved: response[0].approved,
          knowledges_length: response.filter(x => x.content_type !== 'SME Only').length,
          knowledges: response.filter(x => x.content_type !== 'SME Only'),
          knowledges_sme_only_length: response.filter(x => x.content_type === 'SME Only').length,
          knowledges_sme_only: response.filter(x => x.content_type === 'SME Only')
        };

        this.handleRejectDoc();
      });
    },
    handleApproveDoc() {
      const requestExpertise = JSON.parse(JSON.stringify(this.detail_expertise_data));
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure to Approve this Document?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        requestExpertise.knowledges.forEach(async (v, i) => {
          await put({
            path: `api/knowledge/${v.id}`,
            params: { approved: true }
          }).then(res => { });
        });

        requestExpertise.knowledges_sme_only.forEach(async (v, i) => {
          await put({
            path: `api/knowledge/${v.id}`,
            params: { approved: true }
          }).then(res => { });
        });

        setTimeout(() => {
          this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
          this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
          // this.getKnowledgeSme(this.selected_knowledge.children.map(x => x.id).join(','), this.selected_knowledge.label);
          // this.getExpert(this.selected_knowledge.parent_id, this.selected_knowledge.label);

          Notify.create({
            message: 'Knowledge Document Request is Approved',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
        }, 500);
        this.detail_knowledge = false;
        this.detail_expertise = false;
      });
    },
    handleRejectDoc() {
      const requestExpertise = JSON.parse(JSON.stringify(this.detail_expertise_data));
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure to Reject this Document?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        requestExpertise.knowledges.forEach((v, i) => {
          del({
            path: `api/knowledge/${v.id}`
          }).then(res => {
            if (requestExpertise.knowledges.length === (i + 1)) {
              setTimeout(() => {
                this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
                this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
                // this.getKnowledgeSme(this.selected_knowledge.children.map(x => x.id).join(','), this.selected_knowledge.label);
                // this.getExpert(this.selected_knowledge.parent_id, this.selected_knowledge.label);
              }, 500);
              this.detail_expertise = false;
              Notify.create({
                message: 'Document is Rejected',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
            }
          });
        });
      });
    },
    handleApprove() {
      const requestExpertise = JSON.parse(JSON.stringify(this.detail_expertise_data));
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure to Approve this Expertise?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        requestExpertise.knowledges.forEach(async (v, i) => {
          await put({
            path: `api/knowledge/${v.id}`,
            params: { approved: true }
          }).then(res => { });
        });

        requestExpertise.knowledges_sme_only.forEach(async (v, i) => {
          await put({
            path: `api/knowledge/${v.id}`,
            params: { approved: true }
          }).then(res => { });
        });

        setTimeout(() => {
          this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
          this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
          // this.getKnowledgeSme(this.selected_knowledge.children.map(x => x.id).join(','), this.selected_knowledge.label);
          // this.getExpert(this.selected_knowledge.parent_id, this.selected_knowledge.label);

          Notify.create({
            message: 'Expertise Request is Approved',
            timeout: 1000,
            type: 'positive',
            color: 'positive',
            icon: 'check'
          });
        }, 500);
        this.detail_knowledge = false;
        this.detail_expertise = false;
      });
    },
    handleReject() {
      const requestExpertise = JSON.parse(JSON.stringify(this.detail_expertise_data));
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure to Reject this Expertise?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        requestExpertise.knowledges.forEach((v, i) => {
          del({
            path: `api/knowledge/${v.id}`
          }).then(res => {
            if (requestExpertise.knowledges.length === (i + 1)) {
              setTimeout(() => {
                this.getKnowledgeSme(this.selected_knowledge.id, this.selected_knowledge.label);
                this.getKnowledge(this.selected_knowledge.id, this.selected_knowledge.label);
                // this.getKnowledgeSme(this.selected_knowledge.children.map(x => x.id).join(','), this.selected_knowledge.label);
                // this.getExpert(this.selected_knowledge.parent_id, this.selected_knowledge.label);
              }, 500);
              this.detail_expertise = false;
              Notify.create({
                message: 'Expertise is Rejected',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
            }
          });
        });
      });
    },
    handleAddTarget() {
      const knowledgeTreeId = this.selected_knowledge.level === 0 ? this.selected_knowledge.id : this.selected_knowledge.parent_id_zero;
      this.items.forEach((v, i) => {
        if (v.id) {
          put({
            path: `api/knowledge-target/${v.id}`,
            params: {
              target: v.value
            }
          }).then(res => {
            if (res.message === 'OK' && this.items.length === (i + 1)) {
              Notify.create({
                message: 'Target berhasil di tambah.',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
              this.getKnowledgeTarget(knowledgeTreeId);
            }
          });
        } else {
          post({
            path: 'api/knowledge-target',
            params: {
              target: v.value,
              knowledge_tree_id: knowledgeTreeId
            }
          }).then(res => {
            if (res.message === 'OK' && this.items.length === (i + 1)) {
              Notify.create({
                message: 'Target berhasil di tambah.',
                timeout: 1000,
                type: 'positive',
                color: 'positive',
                icon: 'check'
              });
              this.getKnowledgeTarget(knowledgeTreeId);
            }
          });
        }
      });
    },
    getKnowledgeTarget(knowledge_tree_id) {
      get({
        path: `api/knowledge-target?knowledge_tree_id=${knowledge_tree_id}`
      }).then(res => {
        const selected = res.data
          // .map((v, i) => ({ ...v, target: v.target.replace(/(?:\r\n|\r|\n)/g, '<br>') }))
          .sort((a, b) => (a.target > b.target ? 1 : -1));
        const mapTarget = selected.map((v, i) => (
          { id: v.id, value: v.target, class: 'knowledge_target', name: `knowledge_target${i}` }
        ));
        this.target_knowledge = selected.map(x => {
          return { ...x, target: x.target.replace(/\n/g, '<br />') };
        });
        this.items = mapTarget;
      });
    },
    delKnowledgeTarget(id, index) {
      if (id) {
        del({
          path: `api/knowledge-target/${id}`
        }).then(res => {
          if (res.message === 'OK') {
            Notify.create({
              message: 'Delete knowledge target berhasil.',
              timeout: 1000,
              type: 'positive',
              color: 'positive',
              icon: 'check'
            });
          }
        });
      }
      this.items = this.deleteList(this.items, index);
    },
    getKnowledgeById(knowledge_tree_id, content_type, user_id, is_approved) {
      this.detail_expertise_data = [];
      this.modal_loading = true;
      get({
        // path: `api/knowledge?knowledge_tree_id_in=${knowledge_tree_id}&user_id=${user_id}`
        // path: `api/knowledge?knowledge_tree_id_in=${knowledge_tree_id}&created_by=${user_id}&approved=${is_approved}`
        path: `api/knowledge?knowledge_tree_id_in=${knowledge_tree_id}${user_id}&approved=${is_approved}`
      }).then(res => {
        const response = res.data;
        // const selected = JSON.parse(JSON.stringify(res));
        this.detail_expertise_data = {
          id: response[0].created_by_user.id,
          name: capitalize(response[0].created_by_user.name),
          profile_picture: response[0].created_by_user.profile_picture,
          approved: response[0].approved,
          knowledges_length: response.filter(x => x.content_type !== 'SME Only').length,
          knowledges: response.filter(x => x.content_type !== 'SME Only'),
          knowledges_sme_only_length: response.filter(x => x.content_type === 'SME Only').length,
          knowledges_sme_only: response.filter(x => x.content_type === 'SME Only')
        };
        this.modal_loading = false;
      });
    },
    deleteList(object, index) {
      object.splice(index, 1);
      return object;
    },
    async getUser() {
      const user = getCredential();
      const profile = JSON.parse(user.rawProfile);
      this.current_user = profile;
      this.user = {
        id: profile.id,
        name: profile.name,
        initial: profile.name.match(/\b(\w)/g).join('').toUpperCase()
      };
      await profileDetail(profile.id).then(response => {
        let org = '';
        const tmp = response.data.organization;
        if (tmp !== null && tmp.groups === 'Unit Kerja') {
          if (org === '') org = tmp.name;
        }
        Object.keys(tmp).forEach(key => {
          if (key === 'organization') {
            const tmp2 = tmp[key];
            if (tmp2 !== null && tmp2.groups === 'Unit Kerja') {
              if (org === '') org = tmp2.name;
            }
            Object.keys(tmp2).forEach(key2 => {
              if (key2 === 'organization') {
                const tmp3 = tmp2[key2];
                if (key2 === 'organization') {
                  if (tmp3 !== null && tmp3.groups === 'Unit Kerja') {
                    if (org === '') org = tmp3.name;
                  }
                }
              }
            });
          }
        });
        this.current_user.organization = org;
      });
      // this.is_km_manager = profile.roles.filter(f => f.name === 'km_manager').length === 1;
    }
  },
  watch: {
    default_direktorat: {
      immediate: true,
      deep: true,
      handler(value) {
        if (value !== undefined) {
          if (value.length > 0) {
            this.direktorat_can_download = value[0].id;
          }
        }
      }
    },
    selected_knowledge: {
      immediate: true,
      deep: true,
      handler(value) {
        this.getListChannel();
        const selected = JSON.parse(JSON.stringify(value));
        if (selected.label !== '') {
          if ([0].includes(selected.level)) {
            this.getKnowledgeTarget(selected.id);
          }
          if ([2].includes(selected.level)) {
            //   this.getKnowledgeSme(`${selected.children.map(x => x.id).join(',')},${selected.id}`, selected.label);
            //   this.getExpert(selected.id, selected.label);
          }
          if ([3].includes(selected.level)) {
            this.getKnowledgeSme(`${selected.id}`, selected.label);
            this.getKnowledge(selected.id, selected.label);
            this.getExpert(selected.id, selected.label);
          }
        }
      }
    }
  },
  async mounted() {
    this.getPost();
    await this.getUser();
  }
};
</script>

<style>
.text-rep-detail {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #4F5A70;
}
.modal-size {
  min-width: 500px;
}
</style>
