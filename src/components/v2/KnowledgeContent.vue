<template>
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
    <KnowledgeReactionInformation class="q-mb-lg" />
    <div class="row">
      <q-item-section class="col-4">
        <KnowledgeHeader :user="this.user"/>
      </q-item-section>
      <q-item-section class="col q-pa-none items-end">
        <KnowledgeReaction />
      </q-item-section>
    </div>
    </q-card-section>
  </div>
</template>

<script>
import KnowledgeReaction from 'components/v2/knowledge-component/KnowledgeReaction.vue';
import KnowledgeReactionInformation from 'components/v2/knowledge-component/KnowledgeReactionInformation.vue';
import KnowledgeHeader from 'components/v2/knowledge-component/KnowledgeHeader.vue';

export default {
  components: { KnowledgeReactionInformation, KnowledgeReaction, KnowledgeHeader },
  props: ['user']
};
</script>
