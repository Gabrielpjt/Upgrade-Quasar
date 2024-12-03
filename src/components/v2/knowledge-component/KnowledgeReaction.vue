<template>
  <div class="kmp-new-font">
    <q-btn-group outline class="full-width justify-between">
      <q-btn dense size="sm" class="knowledge-button-group" >
        <Icon style="margin-right: 8px !important;" icon="lucide:thumbs-up"  width="16" height="16"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" />
        <span class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Likes</span>
      </q-btn>
      <q-btn dense size="sm" class="knowledge-button-group">
        <Icon style="margin-right: 8px !important;" icon="ant-design:comment-outlined"  width="16" height="16"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" />
        <span class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Comment</span>
      </q-btn>
      <q-btn dense size="sm" class="knowledge-button-group">
        <q-icon name="o_share" size="16px"/>
        <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Share</span>
      </q-btn>
      <q-btn dense size="sm" class="knowledge-button-group">
        <q-icon name="bookmark_border" size="16px"/>
        <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Bookmark</span>
      </q-btn>
    </q-btn-group>
    <!-- <q-btn-group flat :spread="$q.platform.is.mobile ? false : true" v-else>
      <q-btn
        class="knowledge-detail-button-group"
        no-caps
        size="sm"
      ><Icon style="margin-right: 8px !important;" icon="lucide:thumbs-up"  width="16" height="16"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" />
      <span class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Like</span></q-btn>
      <q-btn
        class="knowledge-detail-button-group"
        no-caps
        size="sm"
      ><Icon style="margin-right: 8px !important;" icon="ant-design:comment-outlined"  width="16" height="16"  :rotate="2" :horizontalFlip="true" :verticalFlip="true" /><span class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Comment</span>
    </q-btn>
      <q-btn
        class="knowledge-detail-button-group"
        no-caps
        size="sm"
        icon="o_share"
      >
      <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Share</span></q-btn>
      <q-btn
        class="knowledge-detail-button-group"
        no-caps
        size="sm"
        icon="bookmark_border"
        >
      <span style="margin-left: 8px !important;" class="kmp-sm-text kmp-bold-text kmp-line-130 kmp-gray-text">Save</span></q-btn>
    </q-btn-group> -->
</div>
</template>


<script>
import { Icon } from '@iconify/vue2';

export default {
  components: { Icon }
};
</script>
