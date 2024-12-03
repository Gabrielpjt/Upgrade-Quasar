<template>
  <div class="q-mt-lg kmp-new-font">
    <q-card class="kmp-card-rounded" style="padding: 32px;">
      <q-card-section class="q-pa-none">
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="q-mr-sm">
                <Avatar class="cursor-pointer" size="xxl" :picture="data.created_by_user.profile_picture ? `./api${data.created_by_user.profile_picture}` : ''" :name="data.created_by_user.name"/>
              </div>
              <div>
                <div class="">
                  <span class="kmp-line-130t kmp-bold-text kmp-line-120 kmp-black-text q-mr-sm">{{ data.created_by_user.name }}</span><span class="kmp-sm-text kmp-normal-text kmp-line-130 kmp-black-text">{{ data.created_at_convert }}</span>
                </div>
                <div class="kmp-sm-text kmp-normal-text kmp-line-130 kmp-black-text">{{ data.collaborator_total }} Collaborator
                </div>
              </div>
            </div>
          </div>
          <div class="col-2 text-right">
            <q-btn-group outline>
              <q-btn dense size="sm" class="knowledge-button-group" >
                <Icon style="margin-right: 8px !important;" icon="lucide:thumbs-up"  width="16" height="16"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" />
              </q-btn>
              <q-btn dense size="sm" class="knowledge-button-group">
                <q-icon name="o_share" size="16px"/>
              </q-btn>
              <q-btn dense size="sm" class="knowledge-button-group">
                <q-icon name="bookmark_border" size="16px"/>
              </q-btn>
            </q-btn-group>
          </div>
        </div>
        <KnowledgeHeader/>
        <div class="kmp-xl-text kmp-bold-text kmp-line-120 kmp-black-text q-mt-md">
            {{ data.title }}
        </div>
        <div class="q-mt-md">
          <div class="row">
            <div class="q-mr-xs">
                <img style="width:20px;" v-if="data.approved==true"
                src="../../assets/images/verified.png"
              />
              <img style="width:20px;" v-else
                src="../../assets/images/not_verified.png"
              />
            </div>
            <div>
              <q-badge class="knowledge-gadget-badge-red kmp-line-125 kmp-md-text kmp-normal-text q-mr-sm">{{ data.knowledge_tree.subtitle }}</q-badge>
              <q-badge class="knowledge-gadget-badge-green kmp-line-125 kmp-md-text kmp-normal-text ">{{ data.content_type }}</q-badge>
            </div>
          </div>
        </div>
        <div class="q-mt-md">
          <img :src="data.image" alt="cover" class="cursor-pointer" />
        </div>
        <div class="kmp-md-text kmp-line-125 kmp-black-text kmp-normal-text">
          <p style="white-space: pre-line;">
            {{ data.description ? data.description : '-' }}
          </p>
          <!-- <p>
            Mekanika kuantum ini menyatakan bahwa tingkah laku partikel-partikel kecil kayak elektron itu acak dan gak bisa diprediksi secara pasti. Kita cuma bisa hitung probabilitasnya bak main dadu. Misalnya mau nentuin posisi sama momentum elektron secara bersamaan itu mustahil.
          </p> -->
        </div>
        <KnowledgeFile :data="data.file" style="margin-top: 32px;" class="q-mb-sm" />
        <KnowledgeReactionInformation style="margin-top: 32px;" class="q-mb-sm" />
        <q-separator class="q-mb-sm"></q-separator>
        <KnowledgeReaction class="q-mb-sm" />
        <!-- <KnowledgeConversation class="" /> -->
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import KnowledgeReaction from 'components/v2/knowledge-component/KnowledgeReaction.vue';
import KnowledgeReactionInformation from 'components/v2/knowledge-component/KnowledgeReactionInformation.vue';
import KnowledgeFile from 'components/v2/knowledge-component/KnowledgeFile.vue';
// import KnowledgeConversation from 'components/v2/knowledge-component/KnowledgeConversation.vue';
import KnowledgeHeader from 'components/v2/knowledge-component/KnowledgeHeader.vue';
import { Icon } from '@iconify/vue2';
import Avatar from 'components/common/Avatar';

export default {
  props: ['data'],
  components: { KnowledgeReactionInformation, KnowledgeFile, KnowledgeReaction, KnowledgeHeader, Icon, Avatar }
};
</script>
